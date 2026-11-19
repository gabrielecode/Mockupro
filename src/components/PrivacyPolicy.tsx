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
  Database,
  Building2,
  FileCheck
} from "lucide-react";
import { translations } from "../translations";

interface PrivacyPolicyProps {
  lang: string;
  onBack: () => void;
  onEnterStudio?: () => void;
  isLoggedIn?: boolean;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  lang: initialLang,
  onBack,
  onEnterStudio,
  isLoggedIn = false
}) => {
  const [currentLang, setCurrentLang] = useState<string>(initialLang || "it");
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  useEffect(() => {
    document.title =
      currentLang === "it"
        ? "Informativa sulla Privacy • MockupStudio Pro"
        : "Privacy Policy • MockupStudio Pro";

    return () => {
      document.title = "MockupStudio Pro - Da logo a mockup in 15 secondi";
    };
  }, [currentLang]);

  const t = translations[currentLang] || translations.it;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("gestsocialgabriele@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const isItalian = currentLang === "it";

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-stone-900 font-sans selection:bg-orange-100 selection:text-orange-900 py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 print:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-bold text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-100 border border-stone-200 px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <ArrowLeft size={15} />
              <span>{isLoggedIn ? (isItalian ? "Torna allo Studio" : "Back to Studio") : (isItalian ? "Torna alla Home" : "Back to Home")}</span>
            </button>
            {isLoggedIn && onEnterStudio && (
              <button
                onClick={onEnterStudio}
                className="hidden sm:inline-flex items-center gap-2 text-xs font-bold text-white bg-[#F1641E] hover:bg-[#D44E13] px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles size={14} />
                <span>{isItalian ? "Apri Studio Mockup" : "Open Studio"}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {/* Language Selector */}
            <div className="relative flex items-center bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-700 shadow-xs">
              <Globe size={13} className="text-stone-500 mr-2 shrink-0" />
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
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

            {/* Print / Save PDF Button */}
            <button
              onClick={handlePrint}
              title="Stampa o Salva come PDF"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 px-3 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Printer size={14} className="text-stone-500" />
              <span className="hidden sm:inline">{isItalian ? "Stampa / PDF" : "Print / PDF"}</span>
            </button>
          </div>
        </div>

        {/* Main Document Card */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 md:p-14 shadow-sm relative overflow-hidden">
          
          {/* Header Badge & Title */}
          <div className="border-b border-stone-100 pb-8 mb-8">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="p-3 bg-[#FFF2EB] border border-orange-200 rounded-2xl text-[#F1641E]">
                <Shield size={28} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F1641E] bg-orange-50 border border-orange-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  GDPR (UE 2016/679) & D.Lgs. 196/2003
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
                  {isItalian ? "Informativa sulla Privacy e Trattamento Dati" : "Privacy & Data Processing Policy"}
                </h1>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl">
              {isItalian
                ? "Ai sensi dell'art. 13 del Regolamento Generale sulla Protezione dei Dati (GDPR - Regolamento UE 2016/679) e della normativa italiana vigente in materia di protezione dei dati personali. La presente informativa descrive con la massima trasparenza quali dati vengono raccolti (inclusi indirizzo email e consensi), le basi giuridiche del trattamento e i fornitori di Intelligenza Artificiale (AI) impiegati per la generazione dei mockup."
                : "Pursuant to Article 13 of the General Data Protection Regulation (GDPR - EU Regulation 2016/679). This policy transparently explains what data is collected (including email address and consents), legal bases, and the Artificial Intelligence (AI) providers utilized for mockup generation."}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-stone-100 text-[11px] font-medium text-stone-500">
              <span>📅 {isItalian ? "Ultimo aggiornamento: Febbraio 2026" : "Last updated: February 2026"}</span>
              <span>•</span>
              <span>📄 {isItalian ? "Versione: 2.1 (Conforme AI Act & GDPR)" : "Version: 2.1 (GDPR & AI Act compliant)"}</span>
              <span>•</span>
              <span>🔒 {isItalian ? "Stato di conformità: In vigore" : "Status: Active & In Force"}</span>
            </div>
          </div>

          {/* Key Pillars Highlights (3 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4.5">
              <div className="flex items-center gap-2 mb-2 text-stone-900 font-bold text-xs">
                <Mail size={16} className="text-[#F1641E]" />
                <span>{isItalian ? "1. Raccolta Email" : "1. Email Collection"}</span>
              </div>
              <p className="text-[12px] text-stone-600 leading-snug">
                {isItalian
                  ? "Raccogliamo l'indirizzo email esclusivamente per creare l'account, consentire l'accesso sicuro, gestire le password e trasmettere comunicazioni di servizio necessarie."
                  : "We collect email addresses exclusively to create accounts, provide secure authentication, manage passwords, and deliver necessary service notifications."}
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4.5">
              <div className="flex items-center gap-2 mb-2 text-stone-900 font-bold text-xs">
                <CheckCircle2 size={16} className="text-[#F1641E]" />
                <span>{isItalian ? "2. Consenso Facoltativo" : "2. Voluntary Consent"}</span>
              </div>
              <p className="text-[12px] text-stone-600 leading-snug">
                {isItalian
                  ? "La casella marketing non è mai preselezionata (opt-in esplicito). Il consenso è facoltativo, tracciato in modo sicuro e revocabile in qualsiasi momento con un click."
                  : "Marketing checkboxes are never pre-selected (explicit opt-in). Consent is fully voluntary, securely logged, and revocable at any time with a single click."}
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4.5">
              <div className="flex items-center gap-2 mb-2 text-stone-900 font-bold text-xs">
                <Cpu size={16} className="text-[#F1641E]" />
                <span>{isItalian ? "3. Provider AI Trasparente" : "3. Transparent AI Provider"}</span>
              </div>
              <p className="text-[12px] text-stone-600 leading-snug">
                {isItalian
                  ? "Utilizziamo Google Gemini (e opzionalmente OpenRouter). I tuoi loghi e prompt sono elaborati in memoria unicamente per generare il render, senza training di modelli pubblici."
                  : "We use Google Gemini (and optionally OpenRouter). Your logos and prompts are processed in-memory solely to generate the render, without training public models."}
              </p>
            </div>
          </div>

          {/* Quick Table of Contents / Index */}
          <div className="mb-10 p-5 bg-[#FCFAF7] border border-stone-200 rounded-2xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3 flex items-center gap-2">
              <FileText size={14} className="text-[#F1641E]" /> {isItalian ? "Indice dei Contenuti" : "Table of Contents"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-stone-700">
              <a href="#titolare" className="hover:text-[#F1641E] transition-colors flex items-center gap-1.5">
                <span className="text-[#F1641E]">1.</span> {isItalian ? "Titolare del Trattamento" : "Data Controller"}
              </a>
              <a href="#dati-raccolti" className="hover:text-[#F1641E] transition-colors flex items-center gap-1.5">
                <span className="text-[#F1641E]">2.</span> {isItalian ? "Dati Raccolti: Email e Credenziali" : "Collected Data: Email & Credentials"}
              </a>
              <a href="#consenso" className="hover:text-[#F1641E] transition-colors flex items-center gap-1.5">
                <span className="text-[#F1641E]">3.</span> {isItalian ? "Raccolta e Revoca del Consenso" : "Consent Collection & Revocation"}
              </a>
              <a href="#provider-ai" className="hover:text-[#F1641E] transition-colors flex items-center gap-1.5">
                <span className="text-[#F1641E]">4.</span> {isItalian ? "Provider AI (Google Gemini & OpenRouter)" : "AI Providers (Google Gemini & OpenRouter)"}
              </a>
              <a href="#immagini" className="hover:text-[#F1641E] transition-colors flex items-center gap-1.5">
                <span className="text-[#F1641E]">5.</span> {isItalian ? "Trattamento Loghi e Immagini" : "Processing of Logos & Artwork"}
              </a>
              <a href="#subprocessor" className="hover:text-[#F1641E] transition-colors flex items-center gap-1.5">
                <span className="text-[#F1641E]">6.</span> {isItalian ? "Sub-responsabili (Supabase, Hosting)" : "Sub-processors (Supabase, Hosting)"}
              </a>
              <a href="#conservazione" className="hover:text-[#F1641E] transition-colors flex items-center gap-1.5">
                <span className="text-[#F1641E]">7.</span> {isItalian ? "Conservazione e Sicurezza dei Dati" : "Data Retention & Security"}
              </a>
              <a href="#diritti" className="hover:text-[#F1641E] transition-colors flex items-center gap-1.5">
                <span className="text-[#F1641E]">8.</span> {isItalian ? "Diritti dell'Interessato (Artt. 15-22)" : "Data Subject Rights (Articles 15-22)"}
              </a>
            </div>
          </div>

          {/* Legal Text Sections */}
          <div className="space-y-10 text-stone-700 text-sm leading-relaxed">
            
            {/* 1. Titolare del Trattamento */}
            <section id="titolare" className="scroll-mt-6">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2.5 mb-3 border-b border-stone-100 pb-2">
                <Building2 size={20} className="text-[#F1641E]" />
                <span>1. Titolare del Trattamento</span>
              </h2>
              <p className="mb-3">
                Il Titolare del trattamento dei dati personali raccolti attraverso la piattaforma <strong>MockupStudio Pro</strong> è:
              </p>
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4.5 text-xs text-stone-800 space-y-1.5 mb-3">
                <p><strong>Piattaforma:</strong> MockupStudio Pro</p>
                <p><strong>Finalità:</strong> Software-as-a-Service (SaaS) per la generazione di mockup fotografici e commerciali per venditori e-commerce, brand e creator.</p>
                <p>
                  <strong>Email di contatto per la protezione dei dati:</strong>{" "}
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 text-[#F1641E] font-bold hover:underline cursor-pointer"
                  >
                    <span>gestsocialgabriele@gmail.com</span>
                    {copiedEmail ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  </button>
                  {copiedEmail && (
                    <span className="ml-2 text-emerald-700 font-medium">Copiato negli appunti!</span>
                  )}
                </p>
              </div>
              <p className="text-xs text-stone-500">
                Per qualunque informazione riguardante l'applicazione delle normative sulla privacy o l'esercizio dei diritti previsti dal GDPR, l'utente può fare riferimento all'indirizzo email sopra indicato.
              </p>
            </section>

            {/* 2. Dati Raccolti: Email e Credenziali */}
            <section id="dati-raccolti" className="scroll-mt-6">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2.5 mb-3 border-b border-stone-100 pb-2">
                <Mail size={20} className="text-[#F1641E]" />
                <span>2. Dati Raccolti: Indirizzo Email e Credenziali</span>
              </h2>
              <p className="mb-3">
                Nel corso dell'utilizzo di MockupStudio Pro, trattiamo le seguenti categorie di dati personali:
              </p>

              <div className="space-y-3 mb-4">
                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                  <h3 className="font-bold text-xs text-stone-900 mb-1">
                    ✉️ Indirizzo Email (Dato Obbligatorio per la Registrazione)
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    L'indirizzo email viene richiesto durante la creazione del profilo utente ed è <strong>strettamente necessario</strong> per:
                  </p>
                  <ul className="list-disc pl-5 text-xs text-stone-600 mt-1.5 space-y-1">
                    <li>Identificare in modo univoco l'utente e consentire l'accesso allo Studio di generazione mockup;</li>
                    <li>Inviare comunicazioni tecniche e transazionali di servizio (es. conferma registrazione, link di recupero password);</li>
                    <li>Gestire le quote di generazione giornaliere associate al singolo account;</li>
                    <li>Prevenire abusi, bot e violazioni dei Termini di Servizio.</li>
                  </ul>
                  <p className="text-[11px] text-stone-500 mt-2">
                    <strong>Base giuridica:</strong> Art. 6, par. 1, lett. b) GDPR (esecuzione di un contratto o di misure precontrattuali richieste dall'interessato). Il mancato conferimento dell'indirizzo email rende impossibile la creazione dell'account e l'accesso al generatore.
                  </p>
                </div>

                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                  <h3 className="font-bold text-xs text-stone-900 mb-1">
                    🔑 Credenziali di Accesso e Password Hash
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Le password vengono gestite attraverso l'infrastruttura di autenticazione Supabase. Le password <strong>non vengono mai memorizzate in chiaro</strong>, bensì cifrate con algoritmi di hashing non reversibili (Bcrypt/Argon2 con salt crittografico). Il personale di MockupStudio Pro non ha alcun modo di visualizzare o decifrare la tua password.
                  </p>
                </div>

                <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                  <h3 className="font-bold text-xs text-stone-900 mb-1">
                    🛡️ Dati di Log, IP e Rate Limiting
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Per garantire la sicurezza e la stabilità dell'infrastruttura contro attacchi brute force o Denial of Service (DDoS), il server applica un limite di richieste (rate-limiting a massimo 10 chiamate/minuto per IP). Gli indirizzi IP vengono elaborati in modo transiente e protetto.
                  </p>
                  <p className="text-[11px] text-stone-500 mt-1.5">
                    <strong>Base giuridica:</strong> Art. 6, par. 1, lett. f) GDPR (legittimo interesse del titolare a proteggere i sistemi informatici e garantire la continuità operativa del servizio).
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Raccolta e Revoca del Consenso */}
            <section id="consenso" className="scroll-mt-6">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2.5 mb-3 border-b border-stone-100 pb-2">
                <CheckCircle2 size={20} className="text-[#F1641E]" />
                <span>3. Raccolta del Consenso, Tracciamento e Diritto di Revoca</span>
              </h2>
              <p className="mb-3">
                In ottemperanza al principio di trasparenza (Art. 5 GDPR) e di <em>Privacy by Default</em> (Art. 25 GDPR), la gestione del consenso su MockupStudio Pro adotta le seguenti garanzie:
              </p>

              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4.5 mb-4 text-xs text-amber-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-950">
                  <Info size={16} className="text-[#F1641E] shrink-0" />
                  <span>Nessuna Casella Preselezionata (Opt-in Positivo ed Esplicito)</span>
                </div>
                <p className="leading-relaxed">
                  Nel modulo di registrazione, la casella per il consenso marketing (<em>"Accetto di ricevere novità e offerte via email"</em>) è <strong>rigorosamente non spuntata</strong>. L'utente esprime la propria volontà solo mediante un'azione positiva, cosciente e libera (opt-in esplicito).
                </p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="border border-stone-200 rounded-xl p-4">
                  <h4 className="font-bold text-xs text-stone-900 mb-1">
                    a) Consenso ai Termini e alla Privacy Policy (Contrattuale)
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    La presa visione e l'accettazione dell'Informativa sulla Privacy e dei Termini di Servizio costituiscono la base contrattuale indispensabile per poter usufruire del generatore, delle funzioni di salvataggio ZIP e dei servizi cloud.
                  </p>
                </div>

                <div className="border border-stone-200 rounded-xl p-4">
                  <h4 className="font-bold text-xs text-stone-900 mb-1">
                    b) Consenso per Comunicazioni Promozionali (Marketing Facoltativo)
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Il conferimento del consenso per ricevere aggiornamenti, sconti o annunci su nuovi prodotti mockuppabili (<code>marketing_consent</code>) è <strong>totalmente facoltativo</strong>. Negare il consenso marketing non limita in alcun modo l'accesso allo Studio o la generazione dei render.
                  </p>
                </div>

                <div className="border border-stone-200 rounded-xl p-4">
                  <h4 className="font-bold text-xs text-stone-900 mb-1">
                    c) Tracciamento e Registro del Consenso
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Lo stato del consenso espresso dall'utente viene memorizzato nei metadati del profilo utente su database Supabase protetto con timestamp univoco (data, ora e versione dell'informativa accettata), a prova di audit per soddisfare il principio di <em>accountability</em> (Art. 5, par. 2 GDPR).
                  </p>
                </div>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4.5">
                <h4 className="font-bold text-xs text-stone-900 mb-1.5 flex items-center gap-2">
                  <FileCheck size={16} className="text-[#F1641E]" />
                  <span>Come Revocare il Consenso in Qualsiasi Momento</span>
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed mb-2">
                  L'utente può revocare in qualsiasi momento e con effetto immediato il consenso prestato per le comunicazioni commerciali:
                </p>
                <ol className="list-decimal pl-5 text-xs text-stone-600 space-y-1">
                  <li>Cliccando sul link di cancellazione (<em>Unsubscribe / Disiscriviti</em>) presente in calce a qualsiasi email promozionale ricevuta;</li>
                  <li>Inviando una semplice email a <strong className="text-stone-800">gestsocialgabriele@gmail.com</strong> indicando l'indirizzo email da rimuovere dalle comunicazioni marketing;</li>
                  <li>La revoca non pregiudica in alcun modo la liceità del trattamento basata sul consenso prestato prima della revoca, né compromette l'account o la generazione di mockup.</li>
                </ol>
              </div>
            </section>

            {/* 4. Provider di Intelligenza Artificiale (AI) Utilizzati */}
            <section id="provider-ai" className="scroll-mt-6">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2.5 mb-3 border-b border-stone-100 pb-2">
                <Cpu size={20} className="text-[#F1641E]" />
                <span>4. Provider di Intelligenza Artificiale (AI) Utilizzati</span>
              </h2>
              <p className="mb-3">
                MockupStudio Pro si avvale di tecnologie di intelligenza artificiale generativa per convertire loghi, testi e grafiche bidimensionali in render fotorealistici commerciali di prodotti fisici (es. t-shirt con stampa DTG, tazze in ceramica, ricamo 3D in rilievo, packaging commerciale).
              </p>

              <div className="space-y-4 mb-4">
                
                {/* Google Gemini Card */}
                <div className="border border-orange-200 bg-[#FFFBF8] rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-[#FFF2EB] border border-orange-300 flex items-center justify-center text-[#F1641E] font-extrabold text-xs">
                        G
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-stone-900">
                          Google Gemini (Provider Principale)
                        </h3>
                        <p className="text-[11px] text-stone-500">
                          Fornitore: Google Ireland Limited (per utenti SEE/Svizzera) / Google LLC (USA)
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#F1641E] bg-white border border-orange-200 px-2 py-0.5 rounded-full">
                      Default Engine
                    </span>
                  </div>

                  <div className="text-xs text-stone-700 space-y-2 mt-3 leading-relaxed">
                    <p>
                      <strong>Modelli impiegati:</strong> Modelli multimodali visivi ad alta risoluzione della famiglia Google GenAI (inclusi <code>gemini-2.5-flash-image</code>, <code>gemini-3.1-flash-lite-image</code>, <code>gemini-3-pro-image</code>, <code>gemini-3.1-flash-image</code>).
                    </p>
                    <p>
                      <strong>Dati trasmessi alle API Google:</strong> Quando clicchi su <em>"Genera Mockup"</em>, il server trasmette alle API di Google Gemini:
                    </p>
                    <ul className="list-disc pl-5 space-y-0.5 text-stone-600">
                      <li>La porzione grafica elaborata nel canvas (logo o immagine caricata, codificata in base64 tramite canale sicuro SSL/TLS);</li>
                      <li>Le istruzioni testuali (prompt) indicanti il tipo di prodotto, il colore scelto, l'ambientazione e la finitura di stampa selezionata (es. ricamo, lamina oro, DTG).</li>
                    </ul>
                    <p>
                      <strong>Garanzie di riservatezza e No-Training:</strong> In conformità con i Termini di Servizio delle Google Cloud / Google AI API e con il Data Processing Addendum (DPA) sottoscritto con Google:
                    </p>
                    <ul className="list-disc pl-5 space-y-0.5 text-stone-600">
                      <li><strong>Nessun addestramento:</strong> I contenuti dei clienti (loghi, immagini caricate, prompt) <u>non vengono utilizzati da Google</u> per addestrare o migliorare modelli pubblici generali o per altre finalità commerciali autonome;</li>
                      <li><strong>Elaborazione transiente:</strong> L'elaborazione avviene in tempo reale unicamente per produrre e restituire il render finale a 500x500 o 1K pixels.</li>
                    </ul>
                  </div>
                </div>

                {/* OpenRouter Card */}
                <div className="border border-stone-200 bg-white rounded-2xl p-5 shadow-xs">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-stone-100 border border-stone-300 flex items-center justify-center text-stone-800 font-extrabold text-xs">
                        OR
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-stone-900">
                          OpenRouter (Provider Alternativo / BYOK)
                        </h3>
                        <p className="text-[11px] text-stone-500">
                          Fornitore: OpenRouter, Inc. (USA)
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-stone-600 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-full">
                      Opzionale / BYOK
                    </span>
                  </div>

                  <div className="text-xs text-stone-700 space-y-2 mt-3 leading-relaxed">
                    <p>
                      <strong>Utilizzo:</strong> La piattaforma supporta facoltativamente il routing tramite il gateway OpenRouter, ad esempio nel caso in cui l'utente selezioni tale provider nelle Impostazioni o fornisca una propria chiave API personale (BYOK - Bring Your Own Key).
                    </p>
                    <p>
                      <strong>Trattamento dati:</strong> Nel caso di utilizzo di OpenRouter, la richiesta contenente immagine e prompt viene instradata attraverso il protocollo HTTPS sicuro di OpenRouter verso il modello selezionato. OpenRouter applica politiche di privacy "Zero Data Retention" per i modelli che supportano tale direttiva, eliminando i log transitori e non impiegando i dati per training.
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* 5. Trattamento Loghi e Immagini */}
            <section id="immagini" className="scroll-mt-6">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2.5 mb-3 border-b border-stone-100 pb-2">
                <FileText size={20} className="text-[#F1641E]" />
                <span>5. Trattamento dei Loghi, Immagini Caricate e Proprietà Intellettuale</span>
              </h2>
              <div className="space-y-3">
                <p>
                  L'utente mantiene in qualsiasi momento la <strong>piena ed esclusiva titolarità dei diritti di proprietà intellettuale</strong> e del copyright relativi a tutti i file grafici, marchi, loghi, scritte ed elementi visivi caricati nello Studio.
                </p>
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-2">
                  <p>
                    <strong>Elaborazione locale via HTML5 Canvas:</strong> Il posizionamento preliminare, la scalatura, l'applicazione di filtri cromatici, la rimozione dello sfondo (es. green screen o bianco) e l'aggiunta di testi personalizzati avvengono direttamente nel browser web dell'utente tramite la tecnologia HTML5 Canvas, senza trasmissione preventiva a server esterni.
                  </p>
                  <p>
                    <strong>Nessuna cessione a terzi:</strong> Le immagini e i mockup finali prodotti non vengono rivenduti, ceduti, pubblicati o concessi in licenza a terze parti senza l'esplicito consenso scritto dell'utente.
                  </p>
                  <p>
                    <strong>Uso commerciale dei mockup generati:</strong> I render generati possono essere liberamente utilizzati dall'utente per promuovere i propri prodotti sui marketplace e-commerce (Etsy, Shopify, Amazon, WooCommerce, social store), conformemente ai termini di licenza commerciali dei modelli AI adottati.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Sub-responsabili (Supabase, Hosting) */}
            <section id="subprocessor" className="scroll-mt-6">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2.5 mb-3 border-b border-stone-100 pb-2">
                <Server size={20} className="text-[#F1641E]" />
                <span>6. Destinatari dei Dati e Sub-responsabili del Trattamento (Sub-processors)</span>
              </h2>
              <p className="mb-3">
                Per l'erogazione dell'infrastruttura cloud, dell'autenticazione e dei servizi web, MockupStudio Pro ricorre a primari fornitori terzi designati quali Responsabili o Sub-responsabili del Trattamento ai sensi dell'art. 28 GDPR:
              </p>

              <div className="overflow-x-auto border border-stone-200 rounded-2xl mb-4">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-stone-100 text-stone-800 border-b border-stone-200 font-bold">
                      <th className="p-3">Fornitore / Sub-processor</th>
                      <th className="p-3">Ruolo & Funzione</th>
                      <th className="p-3">Dati Trattati</th>
                      <th className="p-3">Sede & Garanzie</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    <tr className="hover:bg-stone-50">
                      <td className="p-3 font-semibold text-stone-900">
                        Supabase, Inc.
                      </td>
                      <td className="p-3">Database cloud, autenticazione, gestione quote RPC e sessioni utente</td>
                      <td className="p-3">Email, password hash, timestamp consenso, ID univoco utente</td>
                      <td className="p-3">USA / UE • SOC2 Tipo II, ISO 27001, SCC UE-USA</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="p-3 font-semibold text-stone-900">
                        Google Cloud / Google Gemini
                      </td>
                      <td className="p-3">Infrastruttura di inferenza AI e generazione grafica fotorealistica</td>
                      <td className="p-3">Prompt descrittivi, base64 delle grafiche caricate</td>
                      <td className="p-3">Irlanda (UE) / USA • DPA conforme GDPR, SCC</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="p-3 font-semibold text-stone-900">
                        OpenRouter, Inc.
                      </td>
                      <td className="p-3">Gateway alternativo di modelli generativi visivi</td>
                      <td className="p-3">Prompt e immagini su selezione utente</td>
                      <td className="p-3">USA • Policy No Data Retention per API conformi</td>
                    </tr>
                    <tr className="hover:bg-stone-50">
                      <td className="p-3 font-semibold text-stone-900">
                        Vercel Inc. / Google Cloud Run
                      </td>
                      <td className="p-3">Hosting dell'applicazione frontend e serverless API router</td>
                      <td className="p-3">Indirizzi IP (per rate-limiting e routing), log di connessione</td>
                      <td className="p-3">USA / Global Edge • SOC2, SCC UE-USA</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-stone-500">
                Tutti i sub-responsabili sono stati selezionati per la loro comprovata affidabilità tecnica e organizzativa in materia di sicurezza delle informazioni e protezione dei dati personali.
              </p>
            </section>

            {/* 7. Conservazione e Sicurezza dei Dati */}
            <section id="conservazione" className="scroll-mt-6">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2.5 mb-3 border-b border-stone-100 pb-2">
                <Lock size={20} className="text-[#F1641E]" />
                <span>7. Periodo di Conservazione dei Dati (Data Retention) e Sicurezza</span>
              </h2>
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                    <h4 className="font-bold text-stone-900 mb-1">Dati dell'Account (Email & Consenso)</h4>
                    <p className="text-stone-600 leading-relaxed">
                      Conservati per l'intera durata di attività dell'account utente. In caso di cancellazione del profilo o richiesta di oblio, i dati identificativi vengono definitivamente rimossi dai sistemi attivi entro 30 giorni, salvo obblighi di legge fiscali o contabili.
                    </p>
                  </div>
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                    <h4 className="font-bold text-stone-900 mb-1">Immagini Caricate e Render Generati</h4>
                    <p className="text-stone-600 leading-relaxed">
                      I mockup e i file grafici vengono elaborati volatilemente nella RAM del server per la composizione e restituiti al browser. I file generati risiedono nella cache locale temporanea dell'utente (Session Storage/State) per consentire il download singolo o il pacchetto ZIP.
                    </p>
                  </div>
                </div>

                <div className="p-4 border border-stone-200 rounded-xl bg-white text-xs space-y-1.5">
                  <h4 className="font-bold text-stone-900">Misure Tecniche e Organizzative di Sicurezza Adottate:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-stone-600">
                    <li>Cifratura end-to-end su protocollo sicuro HTTPS/TLS 1.3 per tutte le trasmissioni client-server;</li>
                    <li>Autenticazione stateless basata su token JSON Web Token (JWT) con firma crittografica e scadenza automatica;</li>
                    <li>Sistemi di rate limiting in-memory a livello IP (massimo 10 chiamate/minuto per IP) e verifica autorizzazioni server-side;</li>
                    <li>Validazione rigorosa del tipo MIME e della dimensione dei file immagine caricati (limite massimo 8MB per payload).</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 8. Diritti dell'Interessato (Artt. 15-22 GDPR) */}
            <section id="diritti" className="scroll-mt-6">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2.5 mb-3 border-b border-stone-100 pb-2">
                <CheckCircle2 size={20} className="text-[#F1641E]" />
                <span>8. Diritti dell'Interessato (Artt. 15-22 GDPR)</span>
              </h2>
              <p className="mb-3">
                In qualità di interessato, il Regolamento Generale sulla Protezione dei Dati ti garantisce i seguenti diritti azionabili in qualsiasi momento a titolo completamente gratuito:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                  <strong>• Diritto di Accesso (Art. 15):</strong> Ottenere la conferma che sia o meno in corso un trattamento di dati personali che ti riguardano e accedere a tali informazioni.
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                  <strong>• Diritto di Rettifica (Art. 16):</strong> Ottenere la correzione tempestiva dei dati inesatti o l'integrazione di dati incompleti.
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                  <strong>• Diritto alla Cancellazione («Diritto all'Oblio», Art. 17):</strong> Richiedere la cancellazione completa del proprio account e dei dati associati.
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                  <strong>• Diritto di Limitazione (Art. 18):</strong> Richiedere la limitazione del trattamento nelle ipotesi contemplate dalla normativa.
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                  <strong>• Diritto alla Portabilità (Art. 20):</strong> Ricevere i dati personali in un formato strutturato, di uso comune e leggibile da dispositivo automatico.
                </div>
                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                  <strong>• Diritto di Opposizione e Revoca (Artt. 21 e 7):</strong> Opporsi in qualsiasi momento al trattamento dei dati e revocare i consensi prestati.
                </div>
              </div>

              <div className="p-4 bg-orange-50/60 border border-orange-200 rounded-2xl text-xs text-stone-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-stone-900">
                  <Shield size={16} className="text-[#F1641E]" />
                  <span>Diritto di Reclamo all'Autorità di Controllo</span>
                </div>
                <p className="leading-relaxed">
                  Qualora ritenessi che il trattamento dei tuoi dati personali violi le disposizioni del GDPR, hai il diritto di proporre reclamo all'Autorità Garante per la Protezione dei Dati Personali (Garante Privacy):
                </p>
                <p className="font-medium text-stone-700">
                  📍 Piazza Venezia n. 11, 00187 Roma • 📧 protocollo@gpdp.it • 🌐{" "}
                  <a
                    href="https://www.garanteprivacy.it"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#F1641E] underline inline-flex items-center gap-0.5"
                  >
                    www.garanteprivacy.it <ExternalLink size={11} />
                  </a>
                </p>
              </div>
            </section>

            {/* 9. Canale di Contatto Dedicato */}
            <section className="bg-stone-900 text-white rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-[#F1641E] uppercase tracking-wider">
                    {isItalian ? "Supporto Privacy & Dati Personali" : "Privacy & Data Protection Support"}
                  </span>
                  <h3 className="text-lg font-bold">
                    {isItalian ? "Hai domande o vuoi esercitare un tuo diritto?" : "Questions or Want to Exercise Your Rights?"}
                  </h3>
                  <p className="text-xs text-stone-400 max-w-md">
                    {isItalian
                      ? "Invia un'email al Titolare del Trattamento indicando la tua richiesta (es. cancellazione account o revoca consenso). Risponderemo entro i termini di legge (massimo 30 giorni)."
                      : "Send an email to the Data Controller specifying your request (e.g. account deletion or consent revocation). We will respond within 30 days."}
                  </p>
                </div>

                <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCopyEmail}
                    className="px-4 py-3 bg-[#F1641E] hover:bg-[#D44E13] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedEmail ? (isItalian ? "Email Copiata!" : "Email Copied!") : "gestsocialgabriele@gmail.com"}</span>
                  </button>
                  <a
                    href="mailto:gestsocialgabriele@gmail.com?subject=Richiesta%20Privacy%20MockupStudio%20Pro"
                    className="px-4 py-3 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold rounded-xl border border-stone-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail size={14} />
                    <span>{isItalian ? "Scrivi Email" : "Send Email"}</span>
                  </a>
                </div>
              </div>
            </section>

          </div>

          {/* Bottom Back Button */}
          <div className="mt-12 pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 print:hidden">
            <span className="text-xs text-stone-500">
              © {new Date().getFullYear()} MockupStudio Pro. {isItalian ? "Tutti i diritti riservati." : "All rights reserved."}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                {isItalian ? "Torna indietro" : "Go back"}
              </button>
              {isLoggedIn && onEnterStudio && (
                <button
                  onClick={onEnterStudio}
                  className="px-5 py-2.5 bg-[#F1641E] hover:bg-[#D44E13] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  {isItalian ? "Entra nello Studio" : "Enter Studio"}
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
