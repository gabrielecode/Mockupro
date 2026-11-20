import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Shield,
  Lock,
  Mail,
  FileText,
  CheckCircle2,
  Cpu,
  Server,
  Globe,
  Printer,
  Copy,
  Check,
  Info,
  ExternalLink,
  Sparkles,
  Building2,
  Cookie,
  Scale,
} from "lucide-react";
import { LEGAL_CONFIG } from "../config/legal";
import { PRIVACY_CONTENT, resolveLegalLang } from "../data/legalContent";

interface PrivacyPolicyProps {
  lang: string;
  onBack: () => void;
  onEnterStudio?: () => void;
  onOpenTerms?: () => void;
  onOpenContact?: () => void;
  isLoggedIn?: boolean;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  lang: initialLang,
  onBack,
  onEnterStudio,
  onOpenTerms,
  onOpenContact,
  isLoggedIn = false,
}) => {
  const [currentLang, setCurrentLang] = useState(() => resolveLegalLang(initialLang));
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const copy = PRIVACY_CONTENT[currentLang];

  useEffect(() => {
    setCurrentLang(resolveLegalLang(initialLang));
  }, [initialLang]);

  useEffect(() => {
    document.title = copy.docTitle;
    return () => {
      document.title = "MockupStudio Pro - Da logo a mockup in 15 secondi";
    };
  }, [copy.docTitle]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(LEGAL_CONFIG.contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-stone-900 font-sans selection:bg-orange-100 selection:text-orange-900 py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Top Control Bar */}
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
            {onOpenTerms && (
              <button
                onClick={onOpenTerms}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 px-3 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <Scale size={14} className="text-[#F1641E]" />
                <span>{copy.seeTermsLabel}</span>
              </button>
            )}

            <div className="relative flex items-center bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-700">
              <Globe size={13} className="text-stone-500 mr-2 shrink-0" />
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(resolveLegalLang(e.target.value))}
                aria-label="Lingua informativa"
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
              onClick={handlePrint}
              title={copy.printPdf}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <Printer size={14} className="text-stone-500" />
              <span className="hidden sm:inline">{copy.printPdf}</span>
            </button>
          </div>
        </div>

        {/* Main Document Card */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 md:p-14 shadow-xs">
          {/* Header */}
          <div className="border-b border-stone-100 pb-8 mb-8">
            <div className="flex items-start gap-3.5 mb-4">
              <div className="p-3 bg-[#FFF2EB] border border-orange-200 rounded-2xl text-[#F1641E] shrink-0">
                <Shield size={26} />
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
              <span aria-hidden="true">·</span>
              <span>{copy.statusLabel}</span>
            </div>
          </div>

          {/* Key Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {copy.pillars.map((pillar, idx) => (
              <div key={idx} className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2 text-stone-900 font-bold text-xs">
                  {idx === 0 && <Mail size={15} className="text-[#F1641E]" />}
                  {idx === 1 && <Cookie size={15} className="text-[#F1641E]" />}
                  {idx === 2 && <Cpu size={15} className="text-[#F1641E]" />}
                  <span>{pillar.title}</span>
                </div>
                <p className="text-xs text-stone-600 leading-snug">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* Table of Contents */}
          <div className="mb-10 p-5 bg-[#FCFAF7] border border-stone-200 rounded-2xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3 flex items-center gap-2">
              <FileText size={14} className="text-[#F1641E]" /> {copy.tocTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-stone-700">
              <a href="#titolare" className="hover:text-[#F1641E] transition-colors">{copy.s1Title}</a>
              <a href="#dati-raccolti" className="hover:text-[#F1641E] transition-colors">{copy.s2Title}</a>
              <a href="#consenso" className="hover:text-[#F1641E] transition-colors">{copy.s3Title}</a>
              <a href="#provider-ai" className="hover:text-[#F1641E] transition-colors">{copy.s4Title}</a>
              <a href="#immagini" className="hover:text-[#F1641E] transition-colors">{copy.s5Title}</a>
              <a href="#subprocessor" className="hover:text-[#F1641E] transition-colors">{copy.s6Title}</a>
              <a href="#conservazione" className="hover:text-[#F1641E] transition-colors">{copy.s7Title}</a>
              <a href="#diritti" className="hover:text-[#F1641E] transition-colors">{copy.s8Title}</a>
              <a href="#cookie-policy" className="hover:text-[#F1641E] transition-colors font-semibold text-[#F1641E]">{copy.s9Title}</a>
            </div>
          </div>

          {/* Legal Sections */}
          <div className="space-y-10 text-stone-700 text-sm leading-relaxed">
            {/* 1. Data Controller */}
            <section id="titolare" className="scroll-mt-6">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2.5 mb-3 border-b border-stone-100 pb-2">
                <Building2 size={19} className="text-[#F1641E]" />
                <span>{copy.s1Title}</span>
              </h2>
              <p className="mb-3">{copy.s1Intro}</p>
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs text-stone-800 space-y-1.5 mb-3">
                <p><strong>{copy.s1PlatformLabel}:</strong> {LEGAL_CONFIG.brandName}</p>
                <p><strong>{copy.s1ControllerLabel}:</strong> {LEGAL_CONFIG.dataControllerName}</p>
                <p><strong>{copy.s1AddressLabel}:</strong> {LEGAL_CONFIG.dataControllerAddress}</p>
                {LEGAL_CONFIG.vatNumber && (
                  <p><strong>{copy.s1VatLabel}:</strong> {LEGAL_CONFIG.vatNumber}</p>
                )}
                <p><strong>{copy.s1PurposeLabel}:</strong> {copy.s1PurposeValue}</p>
                <p>
                  <strong>{copy.s1EmailLabel}:</strong>{" "}
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 text-[#F1641E] font-bold hover:underline cursor-pointer"
                  >
                    <span>{LEGAL_CONFIG.contactEmail}</span>
                    {copiedEmail ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  </button>
                  {copiedEmail && (
                    <span className="ml-2 text-emerald-700 font-medium">{copy.copiedLabel}</span>
                  )}
                </p>
              </div>
              <p className="text-xs text-stone-500">{copy.s1Note}</p>
            </section>

            {/* 2. Collected Data */}
            <section id="dati-raccolti" className="scroll-mt-6">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2.5 mb-3 border-b border-stone-100 pb-2">
                <Mail size={19} className="text-[#F1641E]" />
                <span>{copy.s2Title}</span>
              </h2>
              <p className="mb-3">{copy.s2Intro}</p>
              <div className="space-y-3">
                {copy.s2Items.map((item, i) => (
                  <div key={i} className="p-4 bg-stone-50 border border-stone-200 rounded-xl">
                    <h3 className="font-bold text-xs text-stone-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{item.body}</p>
                    <p className="text-[11px] text-stone-500 mt-2 font-medium">{item.legalBasis}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Consent Management */}
            <section id="consenso" className="scroll-mt-6">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2.5 mb-3 border-b border-stone-100 pb-2">
                <CheckCircle2 size={19} className="text-[#F1641E]" />
                <span>{copy.s3Title}</span>
              </h2>
              <p className="mb-3">{copy.s3Intro}</p>

              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 mb-4 text-xs text-amber-950 space-y-1.5">
                <div className="flex items-center gap-2 font-bold">
                  <Info size={15} className="text-[#F1641E] shrink-0" />
                  <span>{copy.s3OptInTitle}</span>
                </div>
                <p className="leading-relaxed text-amber-900">{copy.s3OptInBody}</p>
              </div>

              <div className="space-y-3 mb-4">
                {copy.s3Subitems.map((sub, i) => (
                  <div key={i} className="border border-stone-200 rounded-xl p-4">
                    <h3 className="font-bold text-xs text-stone-900 mb-1">{sub.title}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">{sub.body}</p>
                  </div>
                ))}
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
                <h3 className="font-bold text-xs text-stone-900 mb-1.5">{copy.s3RevokeTitle}</h3>
                <p className="text-xs text-stone-600 mb-2">{copy.s3RevokeIntro}</p>
                <ol className="list-decimal pl-5 text-xs text-stone-600 space-y-1">
                  {copy.s3RevokeSteps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </section>

            {/* 4. AI Providers */}
            <section id="provider-ai" className="scroll-mt-6">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2.5 mb-3 border-b border-stone-100 pb-2">
                <Cpu size={19} className="text-[#F1641E]" />
                <span>{copy.s4Title}</span>
              </h2>
              <p className="mb-3">{copy.s4Intro}</p>
              <div className="space-y-4">
                {copy.s4Cards.map((card, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl p-5 border ${
                      i === 0 ? "border-orange-200 bg-[#FFFBF8]" : "border-stone-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-bold text-sm text-stone-900">{card.title}</h3>
                        <p className="text-[11px] text-stone-500">{card.subtitle}</p>
                      </div>
                      <span className="text-[11px] font-semibold text-[#F1641E] shrink-0">
                        {card.badge}
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed mt-2">{card.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Artwork & IP */}
            <section id="immagini" className="scroll-mt-6">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2.5 mb-3 border-b border-stone-100 pb-2">
                <FileText size={19} className="text-[#F1641E]" />
                <span>{copy.s5Title}</span>
              </h2>
              <p className="mb-3">{copy.s5Intro}</p>
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-2">
                {copy.s5Bullets.map((b, i) => (
                  <p key={i}>
                    <strong>{b.label}</strong> {b.text}
                  </p>
                ))}
              </div>
            </section>

            {/* 6. Sub-processors */}
            <section id="subprocessor" className="scroll-mt-6">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2.5 mb-3 border-b border-stone-100 pb-2">
                <Server size={19} className="text-[#F1641E]" />
                <span>{copy.s6Title}</span>
              </h2>
              <p className="mb-3">{copy.s6Intro}</p>
              <div className="overflow-x-auto border border-stone-200 rounded-2xl mb-3">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-100 text-stone-800 border-b border-stone-200 font-bold">
                      {copy.s6Headers.map((h, i) => (
                        <th key={i} className="p-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {copy.s6Rows.map((row, i) => (
                      <tr key={i} className="hover:bg-stone-50">
                        <td className="p-3 font-semibold text-stone-900">{row.provider}</td>
                        <td className="p-3">{row.role}</td>
                        <td className="p-3">{row.data}</td>
                        <td className="p-3">{row.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-stone-500">{copy.s6Note}</p>
            </section>

            {/* 7. Retention & Security */}
            <section id="conservazione" className="scroll-mt-6">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2.5 mb-3 border-b border-stone-100 pb-2">
                <Lock size={19} className="text-[#F1641E]" />
                <span>{copy.s7Title}</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
                {copy.s7Boxes.map((box, i) => (
                  <div key={i} className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                    <h3 className="font-bold text-stone-900 mb-1">{box.title}</h3>
                    <p className="text-stone-600 leading-relaxed">{box.body}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 border border-stone-200 rounded-xl bg-white text-xs space-y-1.5">
                <h3 className="font-bold text-stone-900">{copy.s7SecurityTitle}</h3>
                <ul className="list-disc pl-5 space-y-1 text-stone-600">
                  {copy.s7SecurityList.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 8. Data Subject Rights */}
            <section id="diritti" className="scroll-mt-6">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2.5 mb-3 border-b border-stone-100 pb-2">
                <CheckCircle2 size={19} className="text-[#F1641E]" />
                <span>{copy.s8Title}</span>
              </h2>
              <p className="mb-3">{copy.s8Intro}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
                {copy.s8Rights.map((r, i) => (
                  <div key={i} className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                    <strong>{r.title}:</strong> {r.desc}
                  </div>
                ))}
              </div>
              <div className="p-4 bg-orange-50/60 border border-orange-200 rounded-2xl text-xs text-stone-800 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-stone-900">
                  <Shield size={15} className="text-[#F1641E]" />
                  <span>{copy.s8AuthorityTitle}</span>
                </div>
                <p className="leading-relaxed">{copy.s8AuthorityBody}</p>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <a
                    href="https://www.edoeb.admin.ch"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#F1641E] underline inline-flex items-center gap-1 font-medium"
                  >
                    www.edoeb.admin.ch (IFPDT) <ExternalLink size={11} />
                  </a>
                  <a
                    href="https://www.garanteprivacy.it"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#F1641E] underline inline-flex items-center gap-1 font-medium"
                  >
                    www.garanteprivacy.it (UE/IT) <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </section>

            {/* 9. Cookie Policy & Local Storage */}
            <section id="cookie-policy" className="scroll-mt-6">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2.5 mb-3 border-b border-stone-100 pb-2">
                <Cookie size={19} className="text-[#F1641E]" />
                <span>{copy.s9Title}</span>
              </h2>
              <p className="mb-3">{copy.s9Intro}</p>

              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 mb-4 text-xs text-emerald-950 space-y-1.5">
                <div className="font-bold flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-700 shrink-0" />
                  <span>{copy.s9NoTrackingBoxTitle}</span>
                </div>
                <p className="leading-relaxed text-emerald-900">{copy.s9NoTrackingBoxBody}</p>
              </div>

              <div className="overflow-x-auto border border-stone-200 rounded-2xl mb-3">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-100 text-stone-800 border-b border-stone-200 font-bold">
                      {copy.s9Headers.map((h, i) => (
                        <th key={i} className="p-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {copy.s9Rows.map((row, i) => (
                      <tr key={i} className="hover:bg-stone-50">
                        <td className="p-3 font-mono text-[11px] font-semibold text-stone-900">{row.key}</td>
                        <td className="p-3">{row.type}</td>
                        <td className="p-3">{row.purpose}</td>
                        <td className="p-3">{row.duration}</td>
                        <td className="p-3 font-medium text-stone-900">{row.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-stone-500">{copy.s9BrowserNote}</p>
            </section>

            {/* Contact Block */}
            <section className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-[#F1641E] tracking-wide">
                    {copy.contactEyebrow}
                  </span>
                  <h3 className="text-lg font-bold">{copy.contactTitle}</h3>
                  <p className="text-xs text-stone-300 max-w-md leading-relaxed">{copy.contactDesc}</p>
                </div>

                <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                  {onOpenContact && (
                    <button
                      type="button"
                      onClick={onOpenContact}
                      className="px-4 py-3 bg-[#F1641E] hover:bg-[#D44E13] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Mail size={14} />
                      <span>{copy.sendEmailLabel}</span>
                    </button>
                  )}
                  <button
                    onClick={handleCopyEmail}
                    className={`px-4 py-3 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                      onOpenContact
                        ? "bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700"
                        : "bg-[#F1641E] hover:bg-[#D44E13] text-white"
                    }`}
                  >
                    {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedEmail ? copy.copiedLabel : LEGAL_CONFIG.contactEmail}</span>
                  </button>
                  {!onOpenContact && (
                    <a
                      href={`mailto:${LEGAL_CONFIG.contactEmail}?subject=Privacy%20MockupStudio%20Pro`}
                      className="px-4 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl border border-stone-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail size={14} />
                      <span>{copy.sendEmailLabel}</span>
                    </a>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 print:hidden">
            <span className="text-xs text-stone-500">
              © {new Date().getFullYear()} {LEGAL_CONFIG.brandName}
            </span>
            <div className="flex items-center gap-3">
              {onOpenTerms && (
                <button
                  onClick={onOpenTerms}
                  className="px-4 py-2.5 bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  {copy.seeTermsLabel}
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
