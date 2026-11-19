import { createClient } from "@supabase/supabase-js";

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

// Whitelist of allowed image generation models (only models with "/")
export const ALLOWED_MODELS = [
  "google/gemini-2.5-flash-image",
  "google/gemini-3.1-flash-lite-image",
  "google/gemini-3.1-flash-image",
] as const;

export const DEFAULT_OPENROUTER_MODEL = "google/gemini-2.5-flash-image";

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
  clientIp: string = "unknown",
  authHeader?: string
): Promise<ServiceResult> {
  try {
    // 1. Authorization check: token must be provided
    if (!authHeader || typeof authHeader !== "string" || !authHeader.trim()) {
      return {
        status: 401,
        body: { error: "Non autorizzato. Token mancante." },
      };
    }

    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!token) {
      return {
        status: 401,
        body: { error: "Non autorizzato. Token mancante." },
      };
    }

    // Check OpenRouter API key configuration
    const userApiKey =
      typeof payload?.apiKey === "string" ? payload.apiKey.trim() : "";
    const serverOpenRouterKey = (process.env.OPENROUTER_API_KEY || "").trim();
    const hasUserApiKey = userApiKey.length > 0;

    // Se manca OPENROUTER_API_KEY e manca apiKey rispondi 503
    if (!hasUserApiKey && !serverOpenRouterKey) {
      return {
        status: 503,
        body: { error: "OPENROUTER_API_KEY non configurata sul server." },
      };
    }

    // 2. Supabase client setup
    const SUPABASE_URL =
      process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const SUPABASE_ANON_KEY =
      process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      return {
        status: 503,
        body: { error: "Servizio temporaneamente non disponibile" },
      };
    }

    const Authorization = authHeader.startsWith("Bearer ")
      ? authHeader
      : `Bearer ${authHeader}`;

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization,
        },
      },
    });

    const {
      promptText,
      base64Image,
      mimeType = "image/jpeg",
      model,
    } = payload || {};

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

    // Se il body ha apiKey non vuota: salta rpc("use_generation") e verifica solo il token con createClient(...,{global:{headers:{Authorization}}}).auth.getUser(); se non valido 401.
    // Senza apiKey: usa OPENROUTER_API_KEY del server, con rpc use_generation come ora.
    if (hasUserApiKey) {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        return {
          status: 401,
          body: { error: "Token non valido o sessione scaduta." },
        };
      }
    } else {
      const { data: allowed, error: rpcError } = await supabase.rpc("use_generation");

      if (rpcError) {
        console.error("Supabase RPC use_generation error:", rpcError);
        const errMsg = (rpcError.message || "").toLowerCase();
        const errDetails = ((rpcError as any).details || "").toLowerCase();
        const isAuthError =
          rpcError.code === "PGRST301" ||
          (rpcError as any).status === 401 ||
          errMsg.includes("jwt") ||
          errMsg.includes("unauthorized") ||
          errMsg.includes("auth") ||
          errDetails.includes("jwt") ||
          errDetails.includes("unauthorized");

        if (isAuthError) {
          return {
            status: 401,
            body: { error: "Token non valido o sessione scaduta." },
          };
        }

        return {
          status: 503,
          body: { error: "Servizio temporaneamente non disponibile" },
        };
      }

      if (allowed === false) {
        return {
          status: 429,
          body: { error: "Limite giornaliero raggiunto" },
        };
      }
    }

    // Rate limiter
    if (!checkRateLimit(clientIp)) {
      return {
        status: 429,
        body: { error: "Rate limit exceeded. Maximum 10 requests per minute." },
      };
    }

    // Forza provider "openrouter"
    const activeOpenRouterKey = hasUserApiKey ? userApiKey : serverOpenRouterKey;

    // Whitelist solo modelli con "/" e default google/gemini-2.5-flash-image
    const rawModel = typeof model === "string" ? model.trim() : "";
    const isModelAllowed =
      rawModel.includes("/") &&
      (ALLOWED_MODELS as readonly string[]).includes(rawModel);

    const selectedModel = isModelAllowed ? rawModel : DEFAULT_OPENROUTER_MODEL;

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

    let generatedBase64: string | null = null;
    let textResponse = "";

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
