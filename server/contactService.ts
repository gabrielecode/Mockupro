import { createClient } from "@supabase/supabase-js";

export interface ContactPayload {
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
  lang?: string;
  website?: string; // honeypot
}

export interface ContactServiceResult {
  status: number;
  body: Record<string, any>;
}

const contactRateLimitMap = new Map<string, number[]>();

function checkContactRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  let timestamps = contactRateLimitMap.get(ip) || [];
  timestamps = timestamps.filter((t) => now - t < windowMs);

  if (timestamps.length >= maxRequests) {
    return false;
  }

  timestamps.push(now);
  contactRateLimitMap.set(ip, timestamps);
  return true;
}

const ALLOWED_TOPICS = ["support", "sales", "privacy", "bug", "other"] as const;

export async function submitContactForm(
  payload: ContactPayload,
  clientIp: string = "unknown"
): Promise<ContactServiceResult> {
  try {
    // Honeypot anti-spam check
    if (typeof payload?.website === "string" && payload.website.trim().length > 0) {
      return {
        status: 200,
        body: {
          success: true,
          referenceId: `MSG-${Date.now().toString(36).toUpperCase()}`,
          emailDelivered: false,
        },
      };
    }

    if (!checkContactRateLimit(clientIp)) {
      return {
        status: 429,
        body: {
          error: "Too many contact requests. Please wait a few minutes before trying again.",
        },
      };
    }

    const name = typeof payload?.name === "string" ? payload.name.trim() : "";
    const email = typeof payload?.email === "string" ? payload.email.trim() : "";
    const rawTopic = typeof payload?.topic === "string" ? payload.topic.trim().toLowerCase() : "support";
    const topic = (ALLOWED_TOPICS as readonly string[]).includes(rawTopic) ? rawTopic : "support";
    const message = typeof payload?.message === "string" ? payload.message.trim() : "";
    const lang = typeof payload?.lang === "string" ? payload.lang.trim().slice(0, 5) : "it";

    if (name.length < 2 || name.length > 120) {
      return {
        status: 400,
        body: { error: "Please provide a valid name (2-120 characters)." },
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 200) {
      return {
        status: 400,
        body: { error: "Please provide a valid email address." },
      };
    }

    if (message.length < 10 || message.length > 4000) {
      return {
        status: 400,
        body: { error: "Message must be between 10 and 4000 characters." },
      };
    }

    const referenceId = `MSG-${Date.now().toString(36).toUpperCase()}`;
    let emailDelivered = false;

    // Optional email delivery via Resend if configured
    const resendKey = (process.env.RESEND_API_KEY || "").trim();
    const contactRecipient = (process.env.CONTACT_EMAIL || "mockupro@proton.me").trim();
    if (resendKey) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || "MockupStudio Pro <onboarding@resend.dev>",
            to: [contactRecipient],
            reply_to: email,
            subject: `[MockupStudio Pro][${topic.toUpperCase()}][${referenceId}] ${name}`,
            text: `Reference: ${referenceId}\nName: ${name}\nEmail: ${email}\nTopic: ${topic}\nLanguage: ${lang}\nIP: ${clientIp}\n\nMessage:\n${message}`,
          }),
        });
        emailDelivered = resendRes.ok;
        if (!resendRes.ok) {
          const errText = await resendRes.text().catch(() => "");
          console.warn(`Resend API error (${resendRes.status}):`, errText);
        }
      } catch (emailErr) {
        console.warn("Resend contact notification failed:", emailErr);
      }
    }

    // Optional persistence in Supabase if table exists
    const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const SUPABASE_KEY =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.VITE_SUPABASE_ANON_KEY;

    if (SUPABASE_URL && SUPABASE_KEY && !SUPABASE_URL.includes("placeholder")) {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
        const { error: dbError } = await supabase.from("contact_messages").insert({
          reference_id: referenceId,
          name,
          email,
          topic,
          message,
          lang,
        });
        if (dbError) {
          console.debug("Optional contact_messages insert skipped:", dbError.message);
        }
      } catch {
        // Non-blocking if contact_messages table is not provisioned
      }
    }

    console.info(`[Contact][${referenceId}] topic=${topic} from=${email}`);

    return {
      status: 200,
      body: {
        success: true,
        referenceId,
        emailDelivered,
      },
    };
  } catch (error: any) {
    console.error("Contact form processing error:", error);
    return {
      status: 500,
      body: {
        error: error?.message || "Internal server error occurred.",
      },
    };
  }
}
