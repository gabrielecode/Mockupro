import type { IncomingMessage, ServerResponse } from "http";
import { createSharedImage } from "../../server/shareStore";

type VercelRequest = IncomingMessage & {
  body?: any;
  method?: string;
};

type VercelResponse = ServerResponse & {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
};

async function readJsonBody(req: VercelRequest): Promise<any> {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed. Use POST." });
    return;
  }

  try {
    const { base64Image, mimeType = "image/png" } = await readJsonBody(req);
    const result = createSharedImage(base64Image, mimeType);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("Error creating share link:", err);
    res.status(500).json({ error: "Failed to create share link." });
  }
}
