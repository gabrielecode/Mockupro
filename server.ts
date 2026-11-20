import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { generateMockup } from "./server/mockupService";
import { submitContactForm } from "./server/contactService";

// Load environment variables
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.set("trust proxy", 1);

// Set up JSON payload limits for image upload and transfer (10mb)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Server-side API proxy for Mockup Generation (supports OpenRouter & Gemini)
app.post("/api/mockup/generate", async (req, res) => {
  const clientIp = req.ip || req.socket.remoteAddress || "unknown";
  const authHeader = req.headers.authorization;
  const result = await generateMockup(req.body, clientIp, authHeader);
  return res.status(result.status).json(result.body);
});

// Server-side Contact Form endpoint
app.post("/api/contact", async (req, res) => {
  const clientIp = req.ip || req.socket.remoteAddress || "unknown";
  const result = await submitContactForm(req.body, clientIp);
  return res.status(result.status).json(result.body);
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
