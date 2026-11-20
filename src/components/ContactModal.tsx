import React, { useEffect, useState } from "react";
import { X, Mail, Copy, Check, MapPin } from "lucide-react";
import { translations } from "../translations";
import { LEGAL_CONFIG } from "../config/legal";
import { ContactForm } from "./ContactForm";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: string;
  defaultEmail?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  lang,
  defaultEmail = "",
}) => {
  const t = translations[lang] || translations.it;
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(LEGAL_CONFIG.contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white border border-stone-200 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        <button
          type="button"
          onClick={onClose}
          aria-label={t.close || "Chiudi"}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-3 pr-10 mb-6 pb-5 border-b border-stone-200">
          <div className="bg-[#FFF2EB] p-2.5 rounded-xl border border-orange-200 shrink-0">
            <Mail size={20} className="text-[#F1641E]" />
          </div>
          <div>
            <h2 id="contact-modal-title" className="text-lg font-bold text-stone-900">
              {t.contactTitle}
            </h2>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              {t.contactSubtitle}
            </p>
          </div>
        </div>

        <ContactForm lang={lang} defaultEmail={defaultEmail} />

        <div className="mt-6 pt-5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <MapPin size={13} className="text-[#F1641E] shrink-0" />
            <span>{LEGAL_CONFIG.dataControllerAddress}</span>
          </div>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-1.5 font-semibold text-stone-700 hover:text-[#F1641E] transition-colors cursor-pointer"
          >
            {copiedEmail ? (
              <>
                <Check size={13} className="text-emerald-600" />
                <span className="text-emerald-700">{t.contactEmailCopied}</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>{t.contactCopyEmail}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
