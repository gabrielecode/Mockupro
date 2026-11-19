import type { IncomingMessage, ServerResponse } from "http";
import { generateMockup, GenerateMockupBody } from "../../server/mockupService";

export const config = {
  maxDuration: 60,
};

type VercelRequest = IncomingMessage & {
  body?: any;
  method?: string;
  headers: Record<string, string | string[] | undefined>;
};

type VercelResponse = ServerResponse & {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
};

async function readJsonBody(req: VercelRequest): Promise<GenerateMockupBody> {
  if (req.body && typeof req.body === "object") {
    return req.body as GenerateMockupBody;
  }
  if (typeof req.body === "string") {
    return JSON.parse(req.body) as GenerateMockupBody;
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? (JSON.parse(raw) as GenerateMockupBody) : {};
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed. Use POST." });
    return;
  }

  try {
    const body = await readJsonBody(req);
    const forwardedFor = req.headers["x-forwarded-for"];
    const clientIp = Array.isArray(forwardedFor)
      ? forwardedFor[0]
      : forwardedFor?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";
    const authHeader = Array.isArray(req.headers.authorization)
      ? req.headers.authorization[0]
      : req.headers.authorization;

    const result = await generateMockup(body, clientIp, authHeader);
    res.status(result.status).json(result.body);
  } catch (error: any) {
    console.error("Vercel /api/mockup/generate error:", error);
    res.status(500).json({
      error: error?.message || "Invalid request or internal server error.",
    });
  }
}
