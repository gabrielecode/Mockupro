import type { IncomingMessage, ServerResponse } from "node:http";
import { generateMockup, type GenerateMockupBody } from "../../server/mockupService";

export const config = {
  maxDuration: 60,
};

type VercelRequest = IncomingMessage & {
  body?: any;
  method?: string;
  headers: Record<string, string | string[] | undefined>;
};

type VercelResponse = ServerResponse & {
  status?: (code: number) => VercelResponse;
  json?: (data: any) => void;
};

function sendJson(res: VercelResponse, status: number, body: Record<string, any>) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

async function readJsonBody(req: VercelRequest): Promise<GenerateMockupBody> {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
    return req.body as GenerateMockupBody;
  }
  if (typeof req.body === "string") {
    return req.body ? (JSON.parse(req.body) as GenerateMockupBody) : {};
  }
  if (Buffer.isBuffer(req.body)) {
    const raw = req.body.toString("utf8");
    return raw ? (JSON.parse(raw) as GenerateMockupBody) : {};
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? (JSON.parse(raw) as GenerateMockupBody) : {};
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method Not Allowed. Use POST." });
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
    sendJson(res, result.status, result.body);
  } catch (error: any) {
    console.error("Vercel /api/mockup/generate error:", error);
    sendJson(res, 500, {
      error: error?.message || "Invalid request or internal server error.",
    });
  }
}
