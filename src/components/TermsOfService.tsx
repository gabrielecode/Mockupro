import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Scale,
  Globe,
  Printer,
  Sparkles,
  FileText,
  Mail,
  Shield,
} from "lucide-react";
import { LEGAL_CONFIG } from "../config/legal";
import { TERMS_CONTENT, resolveLegalLang } from "../data/legalContent";

interface TermsOfServiceProps {
  lang: string;
  onBack: () => void;
  onEnterStudio?: () => void;
  onOpenPrivacy?: () => void;
  onOpenContact?: () => void;
  isLoggedIn?: boolean;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({
  lang: initialLang,
  onBack,
  onEnterStudio,
  onOpenPrivacy,
  onOpenContact,
  isLoggedIn = false,
}) => {
  const [currentLang, setCurrentLang] = useState(() => resolveLegalLang(initialLang));
  const copy = TERMS_CONTENT[currentLang];

  useEffect(() => {
    setCurrentLang(resolveLegalLang(initialLang));
  }, [initialLang]);

  useEffect(() => {
    document.title = copy.docTitle;
    return () => {
      document.title = "MockupStudio Pro - Da logo a mockup in 15 secondi";
    };
  }, [copy.docTitle]);

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-stone-900 font-sans selection:bg-orange-100 selection:text-orange-900 py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 print:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-bold text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-100 border border-stone-200 px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft size={15} />
              <span>{isLoggedIn ? copy.backStudio : copy.backHome}</span>
            </button>
            {isLoggedIn && onEnterStudio && (
              <button
                onClick={onEnterStudio}
                className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-white bg-[#F1641E] hover:bg-[#D44E13] px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                <Sparkles size={14} />
                <span>{copy.openStudio}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {onOpenPrivacy && (
              <button
                onClick={onOpenPrivacy}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 px-3 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <Shield size={14} className="text-[#F1641E]" />
                <span>{copy.seePrivacyLabel}</span>
              </button>
            )}

            <div className="relative flex items-center bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-700">
              <Globe size={13} className="text-stone-500 mr-2 shrink-0" />
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(resolveLegalLang(e.target.value))}
                aria-label="Language"
                className="bg-transparent text-stone-900 font-bold focus:outline-none cursor-pointer uppercase pr-2"
              >
                <option value="it">Italiano (IT)</option>
                <option value="en">English (EN)</option>
                <option value="es">Español (ES)</option>
                <option value="fr">Français (FR)</option>
                <option value="de">Deutsch (DE)</option>
              </select>
            </div>

            <button
              onClick={() => window.print()}
              title={copy.printPdf}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <Printer size={14} className="text-stone-500" />
              <span className="hidden sm:inline">{copy.printPdf}</span>
            </button>
          </div>
        </div>

        {/* Document Card */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 md:p-14 shadow-xs">
          <div className="border-b border-stone-100 pb-8 mb-8">
            <div className="flex items-start gap-3.5 mb-4">
              <div className="p-3 bg-[#FFF2EB] border border-orange-200 rounded-2xl text-[#F1641E] shrink-0">
                <Scale size={26} />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#F1641E] tracking-wide mb-1">
                  {copy.badge}
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 text-balance">
                  {copy.title}
                </h1>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl">
              {copy.intro}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-stone-100 text-xs font-medium text-stone-500">
              <span>{copy.updatedLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{copy.versionLabel}</span>
            </div>
          </div>

          {/* Index */}
          <div className="mb-10 p-5 bg-[#FCFAF7] border border-stone-200 rounded-2xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3 flex items-center gap-2">
              <FileText size={14} className="text-[#F1641E]" /> {copy.tocTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-stone-700">
              {copy.sections.map((sec) => (
                <a key={sec.id} href={`#${sec.id}`} className="hover:text-[#F1641E] transition-colors">
                  {sec.title}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8 text-stone-700 text-sm leading-relaxed">
            {copy.sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="scroll-mt-6">
                <h2 className="text-base sm:text-lg font-bold text-stone-900 mb-2.5 border-b border-stone-100 pb-2">
                  {sec.title}
                </h2>
                <div className="space-y-2.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {sec.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  {sec.bullets && (
                    <ul className="list-disc pl-5 space-y-1.5 pt-1">
                      {sec.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}

            {/* Contact */}
            <section className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold">{copy.contactTitle}</h3>
                  <p className="text-xs text-stone-300 mt-1">{copy.contactDesc}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  {onOpenContact && (
                    <button
                      type="button"
                      onClick={onOpenContact}
                      className="px-4 py-3 bg-[#F1641E] hover:bg-[#D44E13] text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Mail size={14} />
                      <span>{copy.contactTitle}</span>
                    </button>
                  )}
                  <a
                    href={`mailto:${LEGAL_CONFIG.contactEmail}?subject=Termini%20MockupStudio%20Pro`}
                    className={`px-4 py-3 text-xs font-bold rounded-xl transition-colors inline-flex items-center justify-center gap-2 shrink-0 ${
                      onOpenContact
                        ? "bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700"
                        : "bg-[#F1641E] hover:bg-[#D44E13] text-white"
                    }`}
                  >
                    <Mail size={14} />
                    <span>{LEGAL_CONFIG.contactEmail}</span>
                  </a>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 print:hidden">
            <span className="text-xs text-stone-500">
              © {new Date().getFullYear()} {LEGAL_CONFIG.brandName}
            </span>
            <div className="flex items-center gap-3">
              {onOpenPrivacy && (
                <button
                  onClick={onOpenPrivacy}
                  className="px-4 py-2.5 bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  {copy.seePrivacyLabel}
                </button>
              )}
              <button
                onClick={onBack}
                className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                {isLoggedIn ? copy.backStudio : copy.backHome}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
