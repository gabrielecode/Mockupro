import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Layers, ShoppingBag, ShieldCheck, Zap, Globe, UploadCloud, SlidersHorizontal, FolderArchive, CheckCircle2, Store, Package, Wand2, Type, LayoutGrid, Instagram, ChevronDown, Menu, X } from "lucide-react";
import { translations } from "../translations";
import { PRODUCT_TYPES } from "../data/products";
import heroImg from "../assets/images/mockup_studio_hero_1794995342264.webp";

interface LandingPageProps {
  lang: string;
  setLang: (l: string) => void;
  onEnterStudio: () => void;
  onOpenSettings: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  lang,
  setLang,
  onEnterStudio,
  onOpenSettings
}) => {
  const t = translations[lang] || translations.it;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const categoriesList = [
    { key: "Abbigliamento & Moda", label: t.catApparel, icon: Layers, sample: t.catApparelSample },
    { key: "Packaging & Scatole", label: t.catPackaging, icon: Package, sample: t.catPackagingSample },
    { key: "Casa & Arredamento", label: t.catHome, icon: Store, sample: t.catHomeSample },
    { key: "Cancelleria & Arte", label: t.catStationery, icon: Globe, sample: t.catStationerySample }
  ];

  const faqs = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
    { q: t.faq5Q, a: t.faq5A }
  ];

  const languageLabels: Record<string, string> = {
    it: "Italiano",
    en: "English",
    es: "Español",
    fr: "Français",
    de: "Deutsch"
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-stone-900 font-sans selection:bg-orange-100 selection:text-orange-900 relative">
      {/* Sticky Header with Blur */}
      <header className="sticky top-0 z-50 bg-[#FCFAF7]/90 backdrop-blur-md border-b border-stone-200/85 transition-all">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <div className="flex items-center gap-2.5">
            <div className="bg-[#FFF2EB] p-2 rounded-xl border border-orange-200">
              <ShoppingBag size={20} className="text-[#F1641E]" />
            </div>
            <span className="text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0">
              {t.brandTitle}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
            <a href="#how" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
              {t.navHow}
            </a>
            <a href="#catalog" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
              {t.navProducts}
            </a>
            <a href="#features" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
              {t.navFeatures}
            </a>
            <a href="#marketplaces" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
              {t.navMarketplaces}
            </a>
            <a href="#faq" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
              {t.navFaq}
            </a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            {/* Language Selector */}
            <div className="hidden sm:flex items-center gap-1 bg-stone-100 border border-stone-200 rounded-lg p-1 text-xs font-semibold">
              <Globe size={13} className="text-stone-500 ml-1" />
              {(["it", "en", "es", "fr", "de"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-label={languageLabels[l]}
                  className={`px-2 py-1 rounded transition-colors uppercase ${
                    lang === l ? "bg-white text-stone-900 shadow-xs font-bold" : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={onEnterStudio}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#F1641E] rounded-xl hover:bg-[#D44E13] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 shadow-xs cursor-pointer"
            >
              {t.getStarted} <ArrowRight size={14} />
            </button>

            {/* Hamburger button for mobile (< md) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-stone-100 border border-stone-200 text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#FCFAF7] border-b border-stone-200 shadow-xl px-6 py-6 flex flex-col gap-4 font-medium text-stone-700 z-50">
            <a
              href="#how"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-stone-900 transition-colors py-2 border-b border-stone-100"
            >
              {t.navHow}
            </a>
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-stone-900 transition-colors py-2 border-b border-stone-100"
            >
              {t.navProducts}
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-stone-900 transition-colors py-2 border-b border-stone-100"
            >
              {t.navFeatures}
            </a>
            <a
              href="#marketplaces"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-stone-900 transition-colors py-2 border-b border-stone-100"
            >
              {t.navMarketplaces}
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-stone-900 transition-colors py-2"
            >
              {t.navFaq}
            </a>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-semibold uppercase">Lingua</span>
              <div className="flex items-center gap-1 bg-stone-100 border border-stone-200 rounded-lg p-1 text-xs font-semibold">
                {(["it", "en", "es", "fr", "de"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setMobileMenuOpen(false);
                    }}
                    aria-label={languageLabels[l]}
                    className={`px-2 py-1 rounded transition-colors uppercase ${
                      lang === l ? "bg-white text-stone-900 shadow-xs font-bold" : "text-stone-500 hover:text-stone-900"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF2EB] border border-orange-200 text-[#F1641E] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} /> {t.heroBadge}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-stone-900 leading-[1.1] text-balance">
            {t.heroTitle}
          </h1>
          <p className="text-base text-stone-600 leading-relaxed max-w-xl">
            {t.heroSubtitle}
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onEnterStudio}
                className="px-7 py-4 bg-[#F1641E] hover:bg-[#D44E13] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-3 cursor-pointer"
              >
                {t.ctaPrimary} <ArrowRight size={16} />
              </button>
              <a
                href="#how"
                className="px-6 py-4 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-sm rounded-xl transition-all flex items-center justify-center cursor-pointer"
              >
                {t.ctaSecondary}
              </a>
            </div>
            <p className="text-xs text-stone-500 font-medium flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#F1641E]" /> {t.trustLine}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-200">
            <div>
              <p className="text-xl font-extrabold text-stone-900">{t.stat1Value}</p>
              <p className="text-xs text-stone-500 mt-0.5">{t.stat1Label}</p>
            </div>
            <div>
              <p className="text-xl font-extrabold text-stone-900">{t.stat2Value}</p>
              <p className="text-xs text-stone-500 mt-0.5">{t.stat2Label}</p>
            </div>
            <div>
              <p className="text-xl font-extrabold text-stone-900">{t.stat3Value}</p>
              <p className="text-xs text-stone-500 mt-0.5">{t.stat3Label}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-xl bg-white">
            <img
              src={heroImg}
              alt={t.heroImageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover aspect-video"
            />
          </div>
        </div>
      </section>

      {/* How it Works Section (#how) */}
      <section id="how" className="max-w-[1440px] mx-auto px-6 py-20 border-t border-stone-200">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 mb-4">
            {t.howTitle}
          </h2>
          <p className="text-stone-600 text-sm">
            {t.howSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-6 text-[#F1641E]">
              <UploadCloud size={22} />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">{t.howStep1Title}</h3>
            <p className="text-stone-600 text-sm leading-relaxed">{t.howStep1Desc}</p>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-6 text-[#F1641E]">
              <SlidersHorizontal size={22} />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">{t.howStep2Title}</h3>
            <p className="text-stone-600 text-sm leading-relaxed">{t.howStep2Desc}</p>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-6 text-[#F1641E]">
              <FolderArchive size={22} />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">{t.howStep3Title}</h3>
            <p className="text-stone-600 text-sm leading-relaxed">{t.howStep3Desc}</p>
          </div>
        </div>
      </section>

      {/* From Logo to Mockup Section */}
      <section className="bg-white border-t border-stone-200 py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF2EB] border border-orange-200 text-[#F1641E] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles size={14} /> {t.aiTransformation}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 mb-4">
              {t.compareTitle}
            </h2>
            <p className="text-stone-600 text-sm">
              {t.compareSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 items-center">
            {/* Left: Flat Logo (Inline SVG) */}
            <div className="lg:col-span-5 bg-stone-50 border border-stone-200 rounded-2xl p-8 flex flex-col items-center justify-center shadow-xs relative">
              <div className="absolute top-4 left-4 bg-stone-200 text-stone-700 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                {t.logoSideLabel}
              </div>
              <div className="w-64 h-64 bg-stone-900 rounded-2xl flex flex-col items-center justify-center shadow-inner border border-stone-800 p-6 my-6">
                <svg viewBox="0 0 200 200" className="w-28 h-28 text-[#F1641E]">
                  <circle cx="100" cy="80" r="45" fill="none" stroke="currentColor" strokeWidth="8" />
                  <circle cx="100" cy="80" r="12" fill="#FFF9F5" />
                  <text x="100" y="155" textAnchor="middle" fill="#FCFAF7" fontSize="16" fontFamily="monospace" fontWeight="bold">STUDIO LAB</text>
                </svg>
              </div>
              <p className="text-xs text-stone-500 font-medium text-center">{t.transparencyLabel}</p>
            </div>

            {/* Center: Arrow (Vertical on mobile, horizontal on desktop) */}
            <div className="lg:col-span-1 flex items-center justify-center py-4 lg:py-0">
              <div className="w-12 h-12 rounded-full bg-[#FFF2EB] border border-orange-200 flex items-center justify-center text-[#F1641E] shadow-sm rotate-90 lg:rotate-0">
                <ArrowRight size={22} />
              </div>
            </div>

            {/* Right: Final Mockup Image */}
            <div className="lg:col-span-5 bg-stone-50 border border-stone-200 rounded-2xl p-8 flex flex-col items-center justify-center shadow-xs relative">
              <div className="absolute top-4 left-4 bg-[#FFF2EB] text-[#F1641E] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-orange-200">
                {t.mockupSideLabel}
              </div>
              <div className="w-full rounded-xl overflow-hidden border border-stone-200 shadow-md my-6">
                <img
                  src={heroImg}
                  alt={t.mockupOutputAlt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
              <p className="text-xs text-stone-500 font-medium text-center">{t.renderOutputLabel}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cosa puoi mockuppare (#catalog) */}
      <section id="catalog" className="max-w-[1440px] mx-auto px-6 py-20 border-t border-stone-200">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 mb-4">
            {t.whatYouCanMockupTitle}
          </h2>
          <p className="text-stone-600 text-sm">
            {t.whatYouCanMockupSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesList.map((cat) => {
            const count = PRODUCT_TYPES.filter((p) => p.category === cat.key).length;
            const IconComp = cat.icon;
            return (
              <div key={cat.key} className="bg-white border border-stone-200 rounded-2xl p-7 shadow-xs flex flex-col justify-between hover:border-orange-300 transition-colors">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-5 text-[#F1641E]">
                    <IconComp size={22} />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mb-1">{cat.label}</h3>
                  <p className="text-xs text-stone-500 mb-4">{cat.sample}</p>
                </div>
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F1641E]">{count} {t.productsCountLabel}</span>
                  <button
                    onClick={onEnterStudio}
                    className="text-xs font-bold text-stone-700 hover:text-[#F1641E] flex items-center gap-1 cursor-pointer"
                  >
                    {t.studioBtn} <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section (#features) */}
      <section id="features" className="bg-white border-t border-stone-200 py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 mb-4">
              {t.featuresTitle}
            </h2>
            <p className="text-stone-600 text-sm">
              {t.featuresSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#FCFAF7] border border-stone-200 rounded-2xl p-8 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-6 text-[#F1641E]">
                <Sparkles size={22} />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">{t.feature1Title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{t.feature1Desc}</p>
            </div>

            <div className="bg-[#FCFAF7] border border-stone-200 rounded-2xl p-8 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-6 text-[#F1641E]">
                <Wand2 size={22} />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">{t.feature2Title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{t.feature2Desc}</p>
            </div>

            <div className="bg-[#FCFAF7] border border-stone-200 rounded-2xl p-8 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-6 text-[#F1641E]">
                <Type size={22} />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">{t.feature3Title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{t.feature3Desc}</p>
            </div>

            <div className="bg-[#FCFAF7] border border-stone-200 rounded-2xl p-8 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-6 text-[#F1641E]">
                <LayoutGrid size={22} />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">{t.feature4Title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{t.feature4Desc}</p>
            </div>

            <div className="bg-[#FCFAF7] border border-stone-200 rounded-2xl p-8 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-6 text-[#F1641E]">
                <FolderArchive size={22} />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">{t.feature5Title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{t.feature5Desc}</p>
            </div>

            <div className="bg-[#FCFAF7] border border-stone-200 rounded-2xl p-8 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-6 text-[#F1641E]">
                <Globe size={22} />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">{t.feature6Title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{t.feature6Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplaces & Platforms Banner with Lucide Chips */}
      <section id="marketplaces" className="bg-stone-900 text-white py-16 px-6">
        <div className="max-w-[1440px] mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-orange-400 font-bold mb-4">
            {t.marketplaceSupport}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-balance">
            {t.marketplaceHeading}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: "Shopify Stores", icon: ShoppingBag },
              { label: "Etsy Sellers", icon: Store },
              { label: "Amazon FBA", icon: Package },
              { label: "Instagram Shopping", icon: Instagram },
              { label: "WooCommerce", icon: Globe },
              { label: "B2B Catalogs", icon: Layers }
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <div key={item.label} className="bg-stone-800 border border-stone-700 px-5 py-3 rounded-full flex items-center gap-2.5 shadow-xs">
                  <IconComp size={16} className="text-orange-400" />
                  <span className="text-xs font-bold text-stone-200">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section (#faq) */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 mb-4">
            {t.faqTitle}
          </h2>
          <p className="text-stone-600 text-sm">
            {t.faqSubtitle}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-stone-900 text-sm md:text-base cursor-pointer hover:bg-stone-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#F1641E] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Dark Final CTA Block */}
      <section className="bg-stone-900 text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
            {t.ctaFinalTitle}
          </h2>
          <p className="text-stone-400 text-sm md:text-base leading-relaxed">
            {t.ctaFinalSubtitle}
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onEnterStudio}
              className="px-8 py-4 bg-[#F1641E] hover:bg-[#D44E13] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center gap-3 cursor-pointer"
            >
              {t.getStarted} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer in 3 Columns */}
      <footer className="border-t border-stone-200 bg-white py-12 px-6 text-xs text-stone-500">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Column 1: Brand + Tagline */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="bg-[#FFF2EB] p-2 rounded-xl border border-orange-200">
                <ShoppingBag size={18} className="text-[#F1641E]" />
              </div>
              <span className="text-base font-bold tracking-tight text-stone-900">{t.brandTitle}</span>
            </div>
            <p className="text-stone-500 leading-relaxed max-w-sm">{t.tagline}</p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 font-medium text-stone-600">
            <a href="#how" className="hover:text-stone-900 transition-colors">{t.navHow}</a>
            <a href="#catalog" className="hover:text-stone-900 transition-colors">{t.navProducts}</a>
            <a href="#features" className="hover:text-stone-900 transition-colors">{t.navFeatures}</a>
            <a href="#marketplaces" className="hover:text-stone-900 transition-colors">{t.navMarketplaces}</a>
            <a href="#faq" className="hover:text-stone-900 transition-colors">{t.navFaq}</a>
          </div>

          {/* Column 3: Language & Settings */}
          <div className="flex items-center justify-center md:justify-end gap-4">
            <div className="flex items-center gap-1 bg-stone-100 border border-stone-200 rounded-lg p-1 text-xs font-semibold">
              <Globe size={13} className="text-stone-500 ml-1" />
              {(["it", "en", "es", "fr", "de"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-label={languageLabels[l]}
                  className={`px-2 py-1 rounded transition-colors uppercase ${
                    lang === l ? "bg-white text-stone-900 shadow-xs font-bold" : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button onClick={onOpenSettings} className="font-semibold hover:text-stone-900 cursor-pointer">{t.settingsLabel}</button>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto mt-8 pt-6 border-t border-stone-100 text-center text-stone-400">
          <p>{t.footerText}</p>
        </div>
      </footer>
    </div>
  );
};
