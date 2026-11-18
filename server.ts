import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Set up JSON payload limits for image upload and transfer (10mb)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Rate limiter in-memory per IP (10 requests/min)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;

  let timestamps = rateLimitMap.get(ip) || [];
  timestamps = timestamps.filter(t => now - t < windowMs);

  if (timestamps.length >= maxRequests) {
    return false;
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return true;
}

// Server-side API proxy for Mockup Generation (supports OpenRouter & Gemini)
app.post("/api/mockup/generate", async (req, res) => {
  try {
    const clientIp = req.ip || req.socket.remoteAddress || "unknown";
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({ error: "Rate limit exceeded. Maximum 10 requests per minute." });
    }

    const { promptText, base64Image, mimeType = "image/jpeg", provider = "gemini", apiKey, model } = req.body;

    // Validate provider
    const validProviders = ["gemini", "openrouter"];
    if (!validProviders.includes(provider)) {
      return res.status(400).json({ error: "Invalid provider. Allowed: gemini, openrouter." });
    }

    // Validate mimeType (only image/png, image/jpeg, image/webp)
    const validMimeTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!validMimeTypes.includes(mimeType)) {
      return res.status(400).json({ error: "Invalid mimeType. Only image/png, image/jpeg, and image/webp are allowed." });
    }

    if (!base64Image) {
      return res.status(400).json({ error: "Missing base64Image data." });
    }

    // Validate base64Image size (~8MB binary)
    try {
      const buffer = Buffer.from(base64Image, 'base64');
      if (buffer.length > 8 * 1024 * 1024) {
        return res.status(400).json({ error: "Image size exceeds 8MB limit." });
      }
    } catch (e) {
      return res.status(400).json({ error: "Invalid base64 encoding." });
    }

    if (!promptText) {
      return res.status(400).json({ error: "Missing promptText instruction." });
    }

    const activeApiKey = apiKey || process.env.GEMINI_API_KEY;

    let generatedBase64 = null;
    let textResponse = "";

    // Check if OpenRouter is requested
    if (provider === "openrouter") {
      if (!apiKey) {
        return res.status(400).json({ error: "User API Key is required for OpenRouter." });
      }

      const selectedModel = model || "google/gemini-2.5-flash-image";
      
      const orResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://aistudio.google.com",
          "X-Title": "MockupStudio Pro"
        },
        body: JSON.stringify({
          model: selectedModel,
          modalities: ["image", "text"],
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: promptText
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${mimeType};base64,${base64Image}`
                  }
                }
              ]
            }
          ]
        })
      });

      if (!orResponse.ok) {
        const errJson = await orResponse.json().catch(() => ({}));
        throw new Error(errJson.error?.message || `OpenRouter API error: ${orResponse.statusText}`);
      }

      const orData = await orResponse.json() as any;
      const message = orData.choices?.[0]?.message || {};
      textResponse = typeof message.content === "string" ? message.content : JSON.stringify(message.content || "");

      if (message.images?.[0]?.image_url?.url) {
        const imgUrl = message.images[0].image_url.url;
        const dataUriMatch = imgUrl.match(/data:image\/[a-zA-Z+]+;base64,(.+)/);
        if (dataUriMatch) {
          generatedBase64 = dataUriMatch[1];
        } else if (imgUrl.includes("base64,")) {
          generatedBase64 = imgUrl.split("base64,")[1];
        } else {
          generatedBase64 = imgUrl;
        }
      }
    } else {
      // Default Gemini model
      if (!activeApiKey) {
        return res.status(400).json({ error: "GEMINI_API_KEY is missing and no user API key was provided." });
      }
      const customAi = new GoogleGenAI({
        apiKey: activeApiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const response = await customAi.models.generateContent({
        model: model || "gemini-2.5-flash-image",
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Image,
                mimeType: mimeType,
              },
            },
            {
              text: promptText,
            },
          ],
        },
      });

      if (response?.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            generatedBase64 = part.inlineData.data;
          } else if (part.text) {
            textResponse += part.text;
          }
        }
      }
    }

    if (!generatedBase64) {
      return res.status(502).json({
        error: "The model did not return any image data.",
        text: textResponse,
      });
    }

    return res.json({
      success: true,
      image: generatedBase64,
      text: textResponse,
    });
  } catch (error: any) {
    console.error("Error generating mockup on server:", error);
    return res.status(500).json({
      error: error?.message || "Internal server error occurred.",
    });
  }
});

// Configure Vite middleware or index.html serving
async function configureApp() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`MockupStudio Pro server running on http://localhost:${PORT}`);
  });
}

configureApp();
