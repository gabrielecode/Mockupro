import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { generateMockup } from "./server/mockupService";
import { createSharedImage, getSharedImage } from "./server/shareStore";

// Load environment variables
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Set up JSON payload limits for image upload and transfer (10mb)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Server-side API proxy for Mockup Generation (supports OpenRouter & Gemini)
app.post("/api/mockup/generate", async (req, res) => {
  const clientIp = req.ip || req.socket.remoteAddress || "unknown";
  const result = await generateMockup(req.body, clientIp);
  return res.status(result.status).json(result.body);
});

app.post("/api/mockup/share", (req, res) => {
  try {
    const { base64Image, mimeType = "image/png" } = req.body || {};
    const result = createSharedImage(base64Image, mimeType);
    return res.status(result.status).json(result.body);
  } catch (err) {
    console.error("Error creating share link:", err);
    return res.status(500).json({ error: "Failed to create share link." });
  }
});

app.get("/api/mockup/share/:filename", (req, res) => {
  const entry = getSharedImage(req.params.filename);
  if (!entry) {
    return res.status(404).send("Mockup image not found or expired.");
  }
  res.setHeader("Content-Type", entry.mimeType);
  res.setHeader("Cache-Control", "public, max-age=86400");
  return res.send(entry.buffer);
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
