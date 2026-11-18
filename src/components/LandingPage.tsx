import React from "react";
import { Sparkles, ArrowRight, Layers, ShoppingBag, ShieldCheck, Zap, Globe } from "lucide-react";
import { translations } from "../translations";
import heroImg from "../assets/images/mockup_studio_hero_1794995342264.jpg";

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

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-stone-900 font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* Top Bar Contract: 3 zones */}
      <header className="max-w-[1440px] mx-auto px-6 py-5 flex items-center justify-between gap-8 border-b border-stone-200">
        <div className="flex items-center gap-2.5">
          <div className="bg-[#FFF2EB] p-2 rounded-xl border border-orange-200">
            <ShoppingBag size={20} className="text-[#F1641E]" />
          </div>
          <span className="text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0">
            {t.brandTitle}
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a href="#features" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
            {t.navFeatures}
          </a>
          <a href="#marketplaces" className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0">
            {t.navMarketplaces}
          </a>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-stone-100 border border-stone-200 rounded-lg p-1 text-xs font-semibold">
            <Globe size={13} className="text-stone-500 ml-1" />
            {(["it", "en", "es", "fr", "de"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF2EB] border border-orange-200 text-[#F1641E] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} /> Universal AI Mockup Engine
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-stone-900 leading-[1.1] text-balance">
            {t.heroTitle}
          </h1>
          <p className="text-base text-stone-600 leading-relaxed max-w-xl">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onEnterStudio}
              className="px-7 py-4 bg-[#F1641E] hover:bg-[#D44E13] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-3 cursor-pointer"
            >
              {t.getStarted} <ArrowRight size={16} />
            </button>
            <button
              onClick={onOpenSettings}
              className="px-6 py-4 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-bold text-sm rounded-xl transition-all cursor-pointer"
            >
              {t.apiOpenrouterSettings}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-200">
            <div>
              <p className="text-xl font-extrabold text-stone-900">1K+</p>
              <p className="text-xs text-stone-500 mt-0.5">Photorealistic Output</p>
            </div>
            <div>
              <p className="text-xl font-extrabold text-stone-900">~15s</p>
              <p className="text-xs text-stone-500 mt-0.5">Generation Speed</p>
            </div>
            <div>
              <p className="text-xl font-extrabold text-stone-900">100%</p>
              <p className="text-xs text-stone-500 mt-0.5">Universal Platforms</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-xl bg-white">
            <img
              src={heroImg}
              alt="Mockup Studio Hero Showcase"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover aspect-video"
            />
          </div>
        </div>
      </section>

      {/* Marketplaces & Platforms Banner */}
      <section id="marketplaces" className="bg-stone-900 text-white py-16 px-6">
        <div className="max-w-[1440px] mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-orange-400 font-bold mb-4">
            {t.marketplaceSupport}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-balance">
            {t.marketplaceHeading}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {["Shopify Stores", "Amazon FBA", "Etsy Sellers", "WooCommerce", "Instagram Shopping", "B2B Catalogs"].map((item) => (
              <div key={item} className="bg-stone-800 border border-stone-700 p-5 rounded-xl text-center">
                <span className="text-sm font-bold text-stone-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-[1440px] mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-stone-900 mb-4">
            {t.featuresTitle}
          </h2>
          <p className="text-stone-600 text-sm">
            {t.featuresSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-6 text-[#F1641E]">
              <Zap size={22} />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">{t.feature1Title}</h3>
            <p className="text-stone-600 text-sm leading-relaxed">{t.feature1Desc}</p>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-6 text-[#F1641E]">
              <Layers size={22} />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">{t.feature2Title}</h3>
            <p className="text-stone-600 text-sm leading-relaxed">{t.feature2Desc}</p>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center mb-6 text-[#F1641E]">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-2">{t.feature3Title}</h3>
            <p className="text-stone-600 text-sm leading-relaxed">{t.feature3Desc}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-8 px-6 text-center text-xs text-stone-500">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>{t.footerText}</p>
          <div className="flex gap-6">
            <button onClick={onEnterStudio} className="hover:text-stone-900 font-semibold cursor-pointer">Studio</button>
            <button onClick={onOpenSettings} className="hover:text-stone-900 font-semibold cursor-pointer">{t.settingsLabel}</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
