import crypto from "crypto";

interface SharedImageEntry {
  buffer: Buffer;
  mimeType: string;
  createdAt: number;
}

const sharedImagesMap = new Map<string, SharedImageEntry>();

export function createSharedImage(base64Image: string, mimeType: string = "image/png") {
  const validMimeTypes = ["image/png", "image/jpeg", "image/webp"];
  if (!validMimeTypes.includes(mimeType)) {
    return { status: 400, body: { error: "Invalid mimeType." } };
  }
  if (!base64Image || typeof base64Image !== "string") {
    return { status: 400, body: { error: "Missing base64Image data." } };
  }

  const buffer = Buffer.from(base64Image, "base64");
  if (buffer.length === 0 || buffer.length > 10 * 1024 * 1024) {
    return { status: 400, body: { error: "Invalid image size." } };
  }

  const now = Date.now();
  for (const [key, entry] of sharedImagesMap.entries()) {
    if (now - entry.createdAt > 24 * 60 * 60 * 1000) {
      sharedImagesMap.delete(key);
    }
  }
  if (sharedImagesMap.size >= 100) {
    const oldestKey = sharedImagesMap.keys().next().value;
    if (oldestKey) sharedImagesMap.delete(oldestKey);
  }

  const id = crypto.randomBytes(8).toString("hex");
  sharedImagesMap.set(id, { buffer, mimeType, createdAt: now });

  const ext = mimeType === "image/jpeg" ? "jpg" : mimeType === "image/webp" ? "webp" : "png";
  return {
    status: 200,
    body: {
      success: true,
      id,
      url: `/api/mockup/share/${id}.${ext}`,
    },
  };
}

export function getSharedImage(filename: string): SharedImageEntry | undefined {
  const id = filename.replace(/\.(png|jpg|jpeg|webp)$/i, "");
  return sharedImagesMap.get(id);
}
