import type { IncomingMessage, ServerResponse } from "http";
import { getSharedImage } from "../../../server/shareStore";

type VercelRequest = IncomingMessage & {
  query?: Record<string, string | string[]>;
  method?: string;
};

type VercelResponse = ServerResponse & {
  status: (code: number) => VercelResponse;
  send: (body: any) => void;
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.status(405).send("Method Not Allowed.");
    return;
  }

  const rawFilename = req.query?.filename;
  const filename = Array.isArray(rawFilename) ? rawFilename[0] : rawFilename || "";
  const entry = getSharedImage(filename);

  if (!entry) {
    res.status(404).send("Mockup image not found or expired.");
    return;
  }

  res.setHeader("Content-Type", entry.mimeType);
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(entry.buffer);
}
