import React, { useState, useEffect } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle, Mail } from "lucide-react";
import { translations } from "../translations";
import { LEGAL_CONFIG } from "../config/legal";

interface ContactFormProps {
  lang: string;
  defaultEmail?: string;
  defaultTopic?: string;
  onSubmitted?: (referenceId: string) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  lang,
  defaultEmail = "",
  defaultTopic = "support",
  onSubmitted,
}) => {
  const t = translations[lang] || translations.it;

  const [name, setName] = useState("");
  const [email, setEmail] = useState(defaultEmail);
  const [topic, setTopic] = useState(defaultTopic);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  useEffect(() => {
    if (defaultEmail && !email) {
      setEmail(defaultEmail);
    }
  }, [defaultEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      setErrorMsg(t.contactValidationName);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMsg(t.contactValidationEmail);
      return;
    }

    if (trimmedMessage.length < 10) {
      setErrorMsg(t.contactValidationMessage);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          topic,
          message: trimmedMessage,
          lang,
          website,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.success) {
        setErrorMsg(data?.error || t.contactErrorGeneric);
        return;
      }

      const refId = data.referenceId || `MSG-${Date.now().toString(36).toUpperCase()}`;
      setSuccessRef(refId);
      setMessage("");
      onSubmitted?.(refId);
    } catch {
      setErrorMsg(t.contactErrorGeneric);
    } finally {
      setSubmitting(false);
    }
  };

  if (successRef) {
    const mailtoHref = `mailto:${LEGAL_CONFIG.contactEmail}?subject=${encodeURIComponent(
      `[MockupStudio Pro][${successRef}]`
    )}`;

    return (
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 sm:p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 size={24} />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-stone-900">{t.contactSuccessTitle}</h3>
          <p className="text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
            {t.contactSuccessDesc}{" "}
            <span className="font-mono font-bold text-stone-900 tabular-nums">{successRef}</span>.
          </p>
        </div>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setSuccessRef(null)}
            className="px-5 py-2.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-800 text-xs font-bold rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {t.contactSendAnother}
          </button>
          <a
            href={mailtoHref}
            className="px-5 py-2.5 bg-[#F1641E] hover:bg-[#D44E13] text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <Mail size={14} />
            {t.contactOpenMailClient}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {errorMsg && (
        <div
          role="alert"
          className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start gap-2.5"
        >
          <AlertCircle size={16} className="shrink-0 text-rose-600 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-bold text-stone-700 mb-1.5"
          >
            {t.contactNameLabel}
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.contactNamePlaceholder}
            className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#F1641E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1641E]/20 transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-bold text-stone-700 mb-1.5"
          >
            {t.emailLabel}
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#F1641E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1641E]/20 transition-colors"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-topic"
          className="block text-xs font-bold text-stone-700 mb-1.5"
        >
          {t.contactTopicLabel}
        </label>
        <select
          id="contact-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:border-[#F1641E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1641E]/20 transition-colors cursor-pointer"
        >
          <option value="support">{t.contactTopicSupport}</option>
          <option value="sales">{t.contactTopicSales}</option>
          <option value="privacy">{t.contactTopicPrivacy}</option>
          <option value="bug">{t.contactTopicBug}</option>
          <option value="other">{t.contactTopicOther}</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-bold text-stone-700 mb-1.5"
        >
          {t.contactMessageLabel}
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.contactMessagePlaceholder}
          className="w-full bg-white border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#F1641E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F1641E]/20 transition-colors resize-y min-h-[110px]"
        />
      </div>

      <div className="pt-1 flex flex-wrap items-center justify-between gap-3">
        <a
          href={`mailto:${LEGAL_CONFIG.contactEmail}`}
          className="text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors inline-flex items-center gap-1.5"
        >
          <Mail size={13} className="text-[#F1641E]" />
          <span>{LEGAL_CONFIG.contactEmail}</span>
        </a>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 bg-[#F1641E] hover:bg-[#D44E13] disabled:opacity-60 text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
        >
          {submitting ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              <span>{t.contactSendingBtn}</span>
            </>
          ) : (
            <>
              <Send size={14} />
              <span>{t.contactSubmitBtn}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
