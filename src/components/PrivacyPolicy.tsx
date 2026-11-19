import React from "react";
import { ArrowLeft, Shield, Lock, Mail, FileText, CheckCircle2 } from "lucide-react";
import { translations } from "../translations";

interface PrivacyPolicyProps {
  lang: string;
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ lang, onBack }) => {
  const t = translations[lang] || translations.it;

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-stone-900 font-sans py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 shadow-sm">
        
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3.5 py-2 rounded-xl transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft size={14} /> {t.privacyBack || "Torna indietro"}
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-2xl text-[#F1641E]">
            <Shield size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-stone-900">
              {t.privacyTitle || "Informativa sulla Privacy"}
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Ultimo aggiornamento: Febbraio 2026 • Versione 1.0
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-stone-700 leading-relaxed pt-4 border-t border-stone-100">
          <section>
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 mb-2">
              <FileText size={18} className="text-[#F1641E]" /> 1. Informazioni Generali
            </h2>
            <p>
              La tua privacy è fondamentale per <strong>{t.brandTitle}</strong>. Questa informativa descrive come raccogliamo, utilizziamo, proteggiamo e gestiamo i tuoi dati personali in conformità al Regolamento Generale sulla Protezione dei Dati (GDPR - Regolamento UE 2016/679).
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 mb-2">
              <Mail size={18} className="text-[#F1641E]" /> 2. Dati Raccolti e Consenso Marketing
            </h2>
            <p className="mb-2">
              Raccogliamo l'indirizzo email e le credenziali di autenticazione per consentirti l'accesso alla piattaforma e al generatore di mockup.
            </p>
            <p>
              In fase di registrazione, la casella relativa all'invio di novità ed offerte via email <strong>non è preselezionata</strong>. Il consenso al marketing (<code>marketing_consent</code>) è puramente facoltativo e può essere revocato in qualunque momento dalle impostazioni del tuo account o cliccando sul link di disiscrizione presente nelle email.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 mb-2">
              <Lock size={18} className="text-[#F1641E]" /> 3. Sicurezza e Provider Terzi
            </h2>
            <p className="mb-2">
              L'autenticazione degli utenti e la gestione sicura delle sessioni sono fornite tramite infrastruttura protetta <strong>Supabase</strong> conforme agli standard ISO 27001 e SOC2 Tipo II. Le password sono cifrate tramite algoritmi di hashing sicuri e non sono mai visibili in chiaro.
            </p>
            <p>
              Le immagini caricate nello Studio di generazione vengono elaborate in tempo reale unicamente per generare il render del prodotto richiesto e non vengono cedute a terzi né utilizzate per addestrare modelli pubblici.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2 mb-2">
              <CheckCircle2 size={18} className="text-[#F1641E]" /> 4. I Tuoi Diritti
            </h2>
            <p>
              Hai il diritto di accedere ai tuoi dati personali, richiederne la rettifica, la cancellazione o la limitazione del trattamento inviando una richiesta al supporto.
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-200 flex justify-end">
          <button
            onClick={onBack}
            className="px-6 py-2.5 bg-[#F1641E] hover:bg-[#D44E13] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            {t.privacyBack || "Torna alla Home"}
          </button>
        </div>

      </div>
    </div>
  );
};
