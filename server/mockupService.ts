import { GoogleGenAI } from "@google/genai";

// Rate limiter in-memory per IP (10 requests/min per instance)
const rateLimitMap = new Map<string, number[]>();

export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 10;

  let timestamps = rateLimitMap.get(ip) || [];
  timestamps = timestamps.filter((t) => now - t < windowMs);

  if (timestamps.length >= maxRequests) {
    return false;
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return true;
}

export interface GenerateMockupBody {
  promptText?: string;
  base64Image?: string;
  mimeType?: string;
  provider?: string;
  apiKey?: string;
  model?: string;
}

export interface ServiceResult {
  status: number;
  body: Record<string, any>;
}

export async function generateMockup(
  payload: GenerateMockupBody,
  clientIp: string = "unknown"
): Promise<ServiceResult> {
  try {
    if (!checkRateLimit(clientIp)) {
      return {
        status: 429,
        body: { error: "Rate limit exceeded. Maximum 10 requests per minute." },
      };
    }

    const {
      promptText,
      base64Image,
      mimeType = "image/jpeg",
      provider = "gemini",
      apiKey,
      model,
    } = payload || {};

    const validProviders = ["gemini", "openrouter"];
    if (!validProviders.includes(provider)) {
      return {
        status: 400,
        body: { error: "Invalid provider. Allowed: gemini, openrouter." },
      };
    }

    const validMimeTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!validMimeTypes.includes(mimeType)) {
      return {
        status: 400,
        body: {
          error:
            "Invalid mimeType. Only image/png, image/jpeg, and image/webp are allowed.",
        },
      };
    }

    if (!base64Image || typeof base64Image !== "string") {
      return {
        status: 400,
        body: { error: "Missing base64Image data." },
      };
    }

    try {
      const buffer = Buffer.from(base64Image, "base64");
      if (buffer.length === 0) {
        return {
          status: 400,
          body: { error: "Empty base64Image data." },
        };
      }
      if (buffer.length > 8 * 1024 * 1024) {
        return {
          status: 400,
          body: { error: "Image size exceeds 8MB limit." },
        };
      }
    } catch {
      return {
        status: 400,
        body: { error: "Invalid base64 encoding." },
      };
    }

    if (!promptText || typeof promptText !== "string") {
      return {
        status: 400,
        body: { error: "Missing promptText instruction." },
      };
    }

    const activeApiKey = (apiKey && apiKey.trim()) || process.env.GEMINI_API_KEY;

    let generatedBase64: string | null = null;
    let textResponse = "";

    if (provider === "openrouter") {
      const activeOpenRouterKey =
        (apiKey && apiKey.trim()) || process.env.OPENROUTER_API_KEY;
      if (!activeOpenRouterKey) {
        return {
          status: 400,
          body: {
            error:
              "OpenRouter API Key is missing. Set OPENROUTER_API_KEY on Vercel or enter your key in Settings.",
          },
        };
      }

      const selectedModel = (model && model.trim()) || "google/gemini-2.5-flash-image";
      const referer =
        process.env.APP_URL ||
        (process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "https://aistudio.google.com");

      const orResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${activeOpenRouterKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": referer,
          "X-Title": "MockupStudio Pro",
        },
        body: JSON.stringify({
          model: selectedModel,
          modalities: ["image", "text"],
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: promptText },
                {
                  type: "image_url",
                  image_url: { url: `data:${mimeType};base64,${base64Image}` },
                },
              ],
            },
          ],
        }),
      });

      if (!orResponse.ok) {
        const errJson = (await orResponse.json().catch(() => ({}))) as any;
        return {
          status: orResponse.status >= 400 ? orResponse.status : 502,
          body: {
            error:
              errJson?.error?.message ||
              `OpenRouter API error (${orResponse.status}): ${orResponse.statusText}`,
          },
        };
      }

      const orData = (await orResponse.json()) as any;
      const message = orData.choices?.[0]?.message || {};

      let rawImageCandidate: string | null =
        message.images?.[0]?.image_url?.url ||
        message.images?.[0]?.url ||
        null;

      if (typeof message.content === "string") {
        textResponse = message.content;
        if (!rawImageCandidate) {
          const mdDataUri = message.content.match(
            /data:image\/[a-zA-Z0-9+.-]+;base64,[A-Za-z0-9+/=]+/
          );
          if (mdDataUri) rawImageCandidate = mdDataUri[0];
        }
      } else if (Array.isArray(message.content)) {
        const textParts: string[] = [];
        for (const part of message.content) {
          if (part?.type === "text" && typeof part.text === "string") {
            textParts.push(part.text);
          } else if (!rawImageCandidate) {
            const candidateUrl =
              part?.image_url?.url || part?.url || part?.image?.url;
            if (typeof candidateUrl === "string") {
              rawImageCandidate = candidateUrl;
            } else if (typeof part?.inlineData?.data === "string") {
              generatedBase64 = part.inlineData.data;
            }
          }
        }
        textResponse = textParts.join("\n");
      } else if (message.content) {
        textResponse = JSON.stringify(message.content);
      }

      if (!generatedBase64 && rawImageCandidate) {
        const dataUriMatch = rawImageCandidate.match(
          /^data:image\/[a-zA-Z0-9+.-]+;base64,(.+)$/
        );
        if (dataUriMatch) {
          generatedBase64 = dataUriMatch[1];
        } else if (rawImageCandidate.includes("base64,")) {
          generatedBase64 = rawImageCandidate.split("base64,")[1];
        } else if (/^https?:\/\//i.test(rawImageCandidate)) {
          const imgRes = await fetch(rawImageCandidate);
          if (imgRes.ok) {
            const arrBuf = await imgRes.arrayBuffer();
            generatedBase64 = Buffer.from(arrBuf).toString("base64");
          }
        } else {
          generatedBase64 = rawImageCandidate;
        }
      }
    } else {
      if (!activeApiKey) {
        return {
          status: 400,
          body: {
            error:
              "GEMINI_API_KEY is not configured on the server and no user Gemini API key was provided in Settings.",
          },
        };
      }

      const customAi = new GoogleGenAI({
        apiKey: activeApiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const geminiModel =
        model && !model.includes("/") ? model : "gemini-3.1-flash-lite-image";

      const response = await customAi.models.generateContent({
        model: geminiModel,
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Image,
                mimeType,
              },
            },
            {
              text: promptText,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
          },
        },
      });

      if (response?.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            generatedBase64 = part.inlineData.data;
          } else if (part.text) {
            textResponse += part.text;
          }
        }
      }
    }

    if (!generatedBase64) {
      return {
        status: 502,
        body: {
          error: "The model did not return any image data.",
          text: textResponse,
        },
      };
    }

    return {
      status: 200,
      body: {
        success: true,
        image: generatedBase64,
        text: textResponse,
      },
    };
  } catch (error: any) {
    console.error("Error generating mockup on server:", error);
    const status = typeof error?.status === "number" ? error.status : 500;
    return {
      status: status >= 400 && status < 600 ? status : 500,
      body: {
        error: error?.message || "Internal server error occurred.",
      },
    };
  }
}
