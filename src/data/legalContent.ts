import { LEGAL_CONFIG } from "../config/legal";

export type LegalLang = "it" | "en" | "es" | "fr" | "de";

export interface StorageItemDoc {
  key: string;
  type: string;
  purpose: string;
  duration: string;
  category: string;
}

export interface SubprocessorDoc {
  provider: string;
  role: string;
  data: string;
  location: string;
}

export interface PrivacyCopy {
  docTitle: string;
  badge: string;
  title: string;
  intro: string;
  updatedLabel: string;
  versionLabel: string;
  statusLabel: string;
  backHome: string;
  backStudio: string;
  openStudio: string;
  printPdf: string;
  tocTitle: string;
  pillars: { title: string; desc: string }[];
  s1Title: string;
  s1Intro: string;
  s1PlatformLabel: string;
  s1ControllerLabel: string;
  s1AddressLabel: string;
  s1VatLabel: string;
  s1PurposeLabel: string;
  s1PurposeValue: string;
  s1EmailLabel: string;
  s1Note: string;
  s2Title: string;
  s2Intro: string;
  s2Items: { title: string; body: string; legalBasis: string }[];
  s3Title: string;
  s3Intro: string;
  s3OptInTitle: string;
  s3OptInBody: string;
  s3Subitems: { title: string; body: string }[];
  s3RevokeTitle: string;
  s3RevokeIntro: string;
  s3RevokeSteps: string[];
  s4Title: string;
  s4Intro: string;
  s4Cards: { badge: string; title: string; subtitle: string; body: string }[];
  s5Title: string;
  s5Intro: string;
  s5Bullets: { label: string; text: string }[];
  s6Title: string;
  s6Intro: string;
  s6Headers: [string, string, string, string];
  s6Rows: SubprocessorDoc[];
  s6Note: string;
  s7Title: string;
  s7Boxes: { title: string; body: string }[];
  s7SecurityTitle: string;
  s7SecurityList: string[];
  s8Title: string;
  s8Intro: string;
  s8Rights: { title: string; desc: string }[];
  s8AuthorityTitle: string;
  s8AuthorityBody: string;
  s9Title: string;
  s9Intro: string;
  s9NoTrackingBoxTitle: string;
  s9NoTrackingBoxBody: string;
  s9Headers: [string, string, string, string, string];
  s9Rows: StorageItemDoc[];
  s9BrowserNote: string;
  contactEyebrow: string;
  contactTitle: string;
  contactDesc: string;
  copiedLabel: string;
  sendEmailLabel: string;
  seeTermsLabel: string;
}

export interface TermsCopy {
  docTitle: string;
  badge: string;
  title: string;
  intro: string;
  updatedLabel: string;
  versionLabel: string;
  backHome: string;
  backStudio: string;
  openStudio: string;
  printPdf: string;
  tocTitle: string;
  sections: {
    id: string;
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  contactTitle: string;
  contactDesc: string;
  seePrivacyLabel: string;
}

const SUBPROCESSORS_IT: SubprocessorDoc[] = [
  {
    provider: "Supabase, Inc.",
    role: "Autenticazione utenti, database profili, gestione quote giornaliere RPC",
    data: "Email, password hash, metadati consenso (versione e timestamp), ID univoco utente",
    location: "UE / USA · Garanzie SCC UE-USA",
  },
  {
    provider: "OpenRouter, Inc.",
    role: "Gateway API per l'instradamento delle richieste di generazione immagini AI",
    data: "Prompt descrittivi e immagine grafica codificata in base64",
    location: "USA · Elaborazione API transiente secondo impostazioni privacy OpenRouter",
  },
  {
    provider: "Google LLC (modelli Gemini via OpenRouter)",
    role: "Modello di inferenza generativa per la creazione del mockup fotorealistico",
    data: "Prompt e grafica inviati tramite richiesta API OpenRouter",
    location: "UE / USA · Termini API Google Cloud / OpenRouter",
  },
  {
    provider: "Vercel Inc. / Google Cloud Run",
    role: "Hosting frontend e funzioni API server-side",
    data: "Indirizzo IP (rate-limiting 10 req/min), log tecnici di connessione HTTP",
    location: "UE / Global Edge · SOC2, SCC UE-USA",
  },
];

const SUBPROCESSORS_EN: SubprocessorDoc[] = [
  {
    provider: "Supabase, Inc.",
    role: "User authentication, profile database, daily quota RPC management",
    data: "Email, password hash, consent metadata (version and timestamp), unique user ID",
    location: "EU / USA · EU-US SCCs",
  },
  {
    provider: "OpenRouter, Inc.",
    role: "API gateway routing AI image generation requests",
    data: "Descriptive prompts and base64-encoded uploaded artwork",
    location: "USA · Transient API processing per OpenRouter privacy settings",
  },
  {
    provider: "Google LLC (Gemini models via OpenRouter)",
    role: "Generative inference model creating photorealistic mockups",
    data: "Prompts and graphics routed via OpenRouter API request",
    location: "EU / USA · Google Cloud / OpenRouter API terms",
  },
  {
    provider: "Vercel Inc. / Google Cloud Run",
    role: "Frontend hosting and serverless/Node API proxy",
    data: "IP address (rate-limiting 10 req/min), HTTP technical connection logs",
    location: "EU / Global Edge · SOC2, EU-US SCCs",
  },
];

export const PRIVACY_CONTENT: Record<LegalLang, PrivacyCopy> = {
  it: {
    docTitle: "Privacy e Cookie Policy • MockupStudio Pro",
    badge: "LPD Svizzera · GDPR (UE 2016/679) · ePrivacy",
    title: "Informativa sulla Privacy e Cookie Policy",
    intro:
      "Ai sensi della Legge federale svizzera sulla protezione dei dati (LPD), dell'art. 13 del Regolamento (UE) 2016/679 (GDPR, applicabile agli utenti nello SEE/UE), delle norme ePrivacy sui Cookie e degli obblighi di trasparenza del Regolamento (UE) 2024/1689 (AI Act). La Svizzera beneficia di una decisione di adeguatezza della Commissione Europea per i trasferimenti di dati dall'UE. Questa pagina spiega in modo trasparente quali dati raccogliamo, come funzionano i consensi, i fornitori AI e l'archiviazione locale nel browser.",
    updatedLabel: `Ultimo aggiornamento: ${LEGAL_CONFIG.lastUpdatedIt}`,
    versionLabel: `Versione: ${LEGAL_CONFIG.privacyVersion}`,
    statusLabel: "In vigore",
    backHome: "Torna alla Home",
    backStudio: "Torna allo Studio",
    openStudio: "Apri Studio Mockup",
    printPdf: "Stampa / PDF",
    tocTitle: "Indice dei Contenuti",
    pillars: [
      {
        title: "1. Raccolta Email & Account",
        desc: "Raccogliamo l'email esclusivamente per creare l'account, gestire l'accesso sicuro, le quote giornaliere e le comunicazioni di servizio.",
      },
      {
        title: "2. Consensi & Cookie Tecnici",
        desc: "Nessuna casella marketing preselezionata, nessun cookie pubblicitario o di profilazione e font serviti localmente senza invii a terzi.",
      },
      {
        title: "3. Elaborazione AI Trasparente",
        desc: "I tuoi loghi sono elaborati su HTML5 Canvas nel browser e inviati via OpenRouter al modello AI solo per generare il render richiesto.",
      },
    ],
    s1Title: "1. Titolare del Trattamento",
    s1Intro: `Il Titolare del trattamento dei dati personali raccolti tramite la piattaforma ${LEGAL_CONFIG.brandName} è:`,
    s1PlatformLabel: "Piattaforma",
    s1ControllerLabel: "Titolare",
    s1AddressLabel: "Sede / Recapito",
    s1VatLabel: "Partita IVA / C.F.",
    s1PurposeLabel: "Finalità",
    s1PurposeValue:
      "Applicazione web SaaS per la generazione assistita da AI di mockup fotografici per e-commerce, brand e creator.",
    s1EmailLabel: "Email di contatto privacy",
    s1Note:
      "Per esercitare i diritti GDPR o richiedere informazioni sul trattamento dati puoi scrivere in qualsiasi momento all'indirizzo email indicato.",
    s2Title: "2. Dati Personali Raccolti",
    s2Intro: `Durante la navigazione e l'utilizzo di ${LEGAL_CONFIG.brandName}, trattiamo esclusivamente le seguenti categorie di dati:`,
    s2Items: [
      {
        title: "Indirizzo Email e Metadati Account",
        body: "Richiesti in fase di registrazione per identificare univocamente l'utente, inviare link di conferma o recupero password, applicare la quota gratuita giornaliera (15 generazioni/giorno) e registrare i consensi espressi.",
        legalBasis: "Base giuridica: Art. 6, par. 1, lett. b) GDPR (esecuzione del servizio richiesto dall'utente).",
      },
      {
        title: "Credenziali di Accesso (Password Hash)",
        body: "Le password sono gestite direttamente da Supabase Auth mediante algoritmi crittografici di hashing sicuri e non reversibili. Il Titolare non ha mai accesso alle password in chiaro.",
        legalBasis: "Base giuridica: Art. 6, par. 1, lett. b) e f) GDPR (esecuzione contrattuale e sicurezza account).",
      },
      {
        title: "Dati Tecnici di Connessione e Rate Limiting",
        body: "Per proteggere le API da abusi, bot e sovraccarichi, il server applica un rate limiting in memoria fino a 10 richieste/minuto per indirizzo IP. L'indirizzo IP è trattato in modo transiente nella RAM del server e nei log infrastrutturali dell'hosting.",
        legalBasis: "Base giuridica: Art. 6, par. 1, lett. f) GDPR (legittimo interesse alla sicurezza informatica).",
      },
      {
        title: "Chiave API Personale (BYOK - Opzionale)",
        body: "Se inserisci una chiave API OpenRouter personale nelle Impostazioni, questa rimane esclusivamente nella memoria temporanea della sessione browser corrente (non viene salvata in localStorage né nel database) ed è inoltrata solo nella singola richiesta di generazione.",
        legalBasis: "Base giuridica: Art. 6, par. 1, lett. b) GDPR (esecuzione della funzionalità richiesta dall'utente).",
      },
    ],
    s3Title: "3. Gestione dei Consensi, Tracciamento e Revoca",
    s3Intro:
      "In conformità ai principi di trasparenza e Privacy by Default (Artt. 5 e 25 GDPR), distinguiamo nettamente tra presa visione contrattuale e consenso promozionale facoltativo:",
    s3OptInTitle: "Nessuna Casella Preselezionata (Opt-in Esplicito)",
    s3OptInBody:
      "Nel modulo di registrazione, sia l'accettazione dei Termini e Condizioni (previa presa visione di questa informativa) sia la casella facoltativa per novità e offerte via email sono rigorosamente deselezionate di default.",
    s3Subitems: [
      {
        title: "a) Presa visione Privacy e Accettazione Termini",
        body: "Indispensabili per creare l'account e utilizzare lo Studio di generazione mockup.",
      },
      {
        title: "b) Consenso Marketing Facoltativo (marketing_consent)",
        body: "Del tutto opzionale. Rifiutare o revocare il consenso marketing non limita in alcun modo l'accesso alle 15 generazioni giornaliere o alle funzioni dell'app.",
      },
      {
        title: "c) Registro di Audit su Supabase",
        body: "Alla registrazione (e ad ogni modifica dalle Impostazioni), vengono registrati nei metadati utente Supabase lo stato booleano del consenso marketing, i timestamp UTC (marketing_consent_updated_at, privacy_acknowledged_at, terms_accepted_at) e le versioni dei documenti accettati.",
      },
    ],
    s3RevokeTitle: "Come Revocare il Consenso o Eliminare i Dati",
    s3RevokeIntro: "Puoi modificare o revocare le tue scelte in qualsiasi momento:",
    s3RevokeSteps: [
      "Direttamente dentro l'app: aprendo Impostazioni → Sezione Privacy e Consensi (toggle immediato con salvataggio su Supabase).",
      "Tramite il link di disiscrizione (Unsubscribe) presente in ogni eventuale email promozionale.",
      `Scrivendo a ${LEGAL_CONFIG.contactEmail} per richiedere la revoca o la cancellazione completa dell'account.`,
    ],
    s4Title: "4. Provider di Intelligenza Artificiale (AI)",
    s4Intro:
      "La trasformazione delle grafiche 2D in render fotorealistici avviene tramite modelli di intelligenza artificiale generativa accessibili attraverso il gateway OpenRouter:",
    s4Cards: [
      {
        badge: "Motore Principale",
        title: "OpenRouter + Modelli Google Gemini Image",
        subtitle: "openrouter.ai · Modelli google/gemini-2.5-flash-image e derivati",
        body: "Il backend invia il prompt testuale e la grafica composita (base64) tramite HTTPS alle API di OpenRouter, che instrada la richiesta al modello Google selezionato e restituisce l'immagine generata. Si applicano le policy di trattamento dati API di OpenRouter e del fornitore del modello; l'app non conserva copie delle immagini sui propri server o database.",
      },
      {
        badge: "Opzionale / BYOK",
        title: "Modalità Chiave Personale (Bring Your Own Key)",
        subtitle: "Controllo diretto dell'utente sul proprio account OpenRouter",
        body: "L'utente può inserire la propria chiave OpenRouter nelle Impostazioni. La chiave resta solo nella RAM del browser fino alla chiusura o ricarica della pagina e consente di applicare direttamente le preferenze di Zero Data Retention configurate sul proprio account OpenRouter.",
      },
    ],
    s5Title: "5. Loghi, Immagini Caricate e Trasparenza AI Act",
    s5Intro:
      "L'utente resta l'unico titolare dei diritti di proprietà intellettuale sui loghi e sui file grafici caricati nello Studio.",
    s5Bullets: [
      {
        label: "Pre-elaborazione locale HTML5 Canvas:",
        text: "Ridimensionamento, posizionamento, rimozione sfondo (chroma key) e aggiunta di testo avvengono interamente nel browser prima dell'invio.",
      },
      {
        label: "Nessuna archiviazione permanente lato server:",
        text: "I file caricati e i mockup generati non vengono salvati su storage cloud del Titolare; restano nella memoria temporanea della scheda browser per consentire il download singolo (PNG/JPG/PDF) o in pacchetto ZIP.",
      },
      {
        label: "Trasparenza AI (Reg. UE 2024/1689):",
        text: "I mockup prodotti sono contenuti visivi sintetici generati tramite intelligenza artificiale a partire dalla grafica fornita dall'utente.",
      },
    ],
    s6Title: "6. Destinatari dei Dati e Sub-responsabili",
    s6Intro:
      "Per l'erogazione tecnica del servizio ci avvaliamo di fornitori infrastrutturali selezionati ai sensi dell'Art. 28 GDPR:",
    s6Headers: ["Fornitore", "Ruolo", "Dati Trattati", "Sede e Garanzie"],
    s6Rows: SUBPROCESSORS_IT,
    s6Note:
      "Eventuali trasferimenti extra-UE avvengono nel rispetto del Capo V GDPR (Clausole Contrattuali Standard - SCC o framework di adeguatezza applicabili).",
    s7Title: "7. Conservazione dei Dati e Sicurezza",
    s7Boxes: [
      {
        title: "Dati dell'Account",
        body: "Conservati finché l'account resta attivo. In caso di richiesta di cancellazione, il profilo e i dati associati vengono rimossi dai sistemi attivi entro massimo 30 giorni, salvi eventuali obblighi di legge.",
      },
      {
        title: "Immagini & Render",
        body: "Elaborazione transiente in memoria per la singola richiesta API. Nessun archivio persistente su database o bucket lato server; la cronologia nello Studio risiede solo nello stato temporaneo della sessione browser.",
      },
    ],
    s7SecurityTitle: "Misure tecniche adottate:",
    s7SecurityList: [
      "Trasporto cifrato HTTPS/TLS per tutte le comunicazioni tra browser, server e API AI.",
      "Autenticazione tramite token JWT firmati verificati lato server ad ogni chiamata di generazione.",
      "Rate limiting per IP (10 richieste/minuto) e validazione MIME/peso (max 8 MB) sui file caricati.",
      "Self-hosting dei font tipografici locali: nessuna richiesta esterna verso Google Fonts.",
    ],
    s8Title: "8. Diritti dell'Interessato (Artt. 15–22 GDPR)",
    s8Intro: "Puoi esercitare gratuitamente in qualsiasi momento i seguenti diritti:",
    s8Rights: [
      { title: "Accesso (Art. 15)", desc: "Ottenere conferma e copia dei dati trattati." },
      { title: "Rettifica (Art. 16)", desc: "Correggere o aggiornare dati inesatti." },
      { title: "Cancellazione / Oblio (Art. 17)", desc: "Ottenere l'eliminazione dell'account e dei dati." },
      { title: "Limitazione (Art. 18)", desc: "Limitare il trattamento nei casi previsti dalla legge." },
      { title: "Portabilità (Art. 20)", desc: "Ricevere i tuoi dati in formato strutturato." },
      { title: "Opposizione e Revoca (Artt. 7 e 21)", desc: "Revocare il consenso o opporti al trattamento." },
    ],
    s8AuthorityTitle: "Reclamo all'Autorità di Controllo (IFPDT Svizzera / Garante UE)",
    s8AuthorityBody:
      "Puoi rivolgerti all'Incaricato federale della protezione dei dati e della trasparenza (IFPDT, Feldeggweg 1, 3003 Berna · www.edoeb.admin.ch) o, se risiedi nell'UE/SEE, all'autorità di controllo del tuo Paese (in Italia: Garante Privacy, Piazza Venezia 11, 00187 Roma · protocollo@gpdp.it · www.garanteprivacy.it).",
    s9Title: "9. Cookie Policy e Archiviazione Locale (localStorage)",
    s9Intro:
      "Questa sezione costituisce l'informativa estesa sull'uso di cookie e tecnologie equivalenti (Web Storage / localStorage) ai sensi della Direttiva ePrivacy e delle Linee Guida del Garante Privacy del 10 giugno 2021.",
    s9NoTrackingBoxTitle: "Solo Strumenti Tecnici — Nessun Cookie di Profilazione o Analytics",
    s9NoTrackingBoxBody:
      "MockupStudio Pro non installa cookie pubblicitari, pixel di tracciamento (es. Meta/Google Ads) né script di analytics di terze parti. Anche i font tipografici sono ospitati localmente sul server dell'applicazione. Ai sensi della normativa vigente, l'utilizzo esclusivo di strumenti tecnici strettamente necessari all'erogazione del servizio non richiede un banner preventivo di consenso cookie.",
    s9Headers: ["Chiave / Nome", "Tecnologia", "Finalità", "Durata", "Categoria"],
    s9Rows: [
      {
        key: "sb-*-auth-token",
        type: "localStorage (Supabase Auth)",
        purpose: "Mantiene attiva e sicura la sessione autenticata dell'utente nello Studio",
        duration: "Fino al logout o scadenza del refresh token",
        category: "Tecnico / Necessario",
      },
      {
        key: "mockup_or_model",
        type: "localStorage",
        purpose: "Memorizza l'identificativo del modello AI scelto nelle Impostazioni",
        duration: "Persistente finché non viene cancellata dal browser",
        category: "Tecnico / Preferenza UI",
      },
      {
        key: "mockup_lang",
        type: "localStorage (sola lettura)",
        purpose: "Eventuale preferenza linguistica salvata per suggerire la lingua dell'interfaccia",
        duration: "Solo lettura se presente nel browser",
        category: "Tecnico / Preferenza UI",
      },
      {
        key: "Stato sessione React (RAM)",
        type: "Memoria volatile browser",
        purpose: "Mantiene temporaneamente il logo caricato, i mockup generati e l'eventuale chiave BYOK",
        duration: "Eliminato alla chiusura o ricarica della scheda",
        category: "Tecnico / Volatile",
      },
    ],
    s9BrowserNote:
      "Puoi visualizzare, bloccare o eliminare in qualsiasi momento le chiavi salvate in localStorage dalle impostazioni sulla privacy/dati dei siti del tuo browser (Chrome, Firefox, Safari, Edge). La rimozione di sb-*-auth-token comporta semplicemente la disconnessione dall'account.",
    contactEyebrow: "Supporto Privacy & Esercizio Diritti",
    contactTitle: "Domande o richieste sui tuoi dati?",
    contactDesc:
      "Scrivi al Titolare indicando la tua richiesta (accesso, revoca consenso o cancellazione account). Risponderemo entro 30 giorni.",
    copiedLabel: "Email Copiata!",
    sendEmailLabel: "Scrivi Email",
    seeTermsLabel: "Leggi i Termini di Servizio",
  },
  en: {
    docTitle: "Privacy & Cookie Policy • MockupStudio Pro",
    badge: "GDPR (EU 2016/679) · ePrivacy · EU AI Act",
    title: "Privacy & Cookie Policy",
    intro:
      "Pursuant to Article 13 of the General Data Protection Regulation (EU Regulation 2016/679 - GDPR), ePrivacy rules, and transparency obligations under Regulation (EU) 2024/1689 (AI Act). This policy transparently explains what personal data we collect, how consent is logged, our AI providers, and browser local storage usage.",
    updatedLabel: `Last updated: ${LEGAL_CONFIG.lastUpdatedEn}`,
    versionLabel: `Version: ${LEGAL_CONFIG.privacyVersion}`,
    statusLabel: "Active",
    backHome: "Back to Home",
    backStudio: "Back to Studio",
    openStudio: "Open Mockup Studio",
    printPdf: "Print / PDF",
    tocTitle: "Table of Contents",
    pillars: [
      {
        title: "1. Email & Account Data",
        desc: "We collect your email exclusively for account creation, secure authentication, daily generation quotas, and essential service messages.",
      },
      {
        title: "2. Explicit Consent & Technical Storage",
        desc: "No pre-ticked marketing boxes, zero advertising/analytics trackers, and self-hosted local fonts with no third-party font requests.",
      },
      {
        title: "3. Transparent AI Processing",
        desc: "Your logos are pre-processed via HTML5 Canvas in your browser and routed via OpenRouter solely to generate the requested mockup.",
      },
    ],
    s1Title: "1. Data Controller",
    s1Intro: `The Data Controller responsible for personal data processed via ${LEGAL_CONFIG.brandName} is:`,
    s1PlatformLabel: "Platform",
    s1ControllerLabel: "Data Controller",
    s1AddressLabel: "Location / Address",
    s1VatLabel: "VAT / Tax ID",
    s1PurposeLabel: "Purpose",
    s1PurposeValue: "SaaS web application for AI-assisted photographic product mockup generation.",
    s1EmailLabel: "Privacy Contact Email",
    s1Note: "For any privacy inquiry or to exercise your GDPR rights, contact us at the email address above.",
    s2Title: "2. Personal Data Collected",
    s2Intro: `When using ${LEGAL_CONFIG.brandName}, we process only the following categories of data:`,
    s2Items: [
      {
        title: "Email Address & Account Metadata",
        body: "Required at sign-up to uniquely identify your account, send confirmation or password-recovery emails, enforce the 15 free daily generations quota, and log consent records.",
        legalBasis: "Legal basis: Art. 6(1)(b) GDPR (performance of a contract / requested service).",
      },
      {
        title: "Login Credentials (Password Hash)",
        body: "Passwords are managed by Supabase Auth using strong non-reversible cryptographic hashing. The Data Controller can never view plaintext passwords.",
        legalBasis: "Legal basis: Art. 6(1)(b) and (f) GDPR.",
      },
      {
        title: "Transient Connection Logs & Rate Limiting",
        body: "To prevent abuse and DDoS attacks, the server enforces an in-memory rate limit of 10 requests/minute per IP address. IP addresses are processed transiently in server RAM and standard hosting HTTP logs.",
        legalBasis: "Legal basis: Art. 6(1)(f) GDPR (legitimate interest in platform security).",
      },
      {
        title: "Personal API Key (BYOK - Optional)",
        body: "If you enter a personal OpenRouter API key in Settings, it stays exclusively in temporary browser session memory (never saved to localStorage or any database) and is forwarded only during the active generation request.",
        legalBasis: "Legal basis: Art. 6(1)(b) GDPR.",
      },
    ],
    s3Title: "3. Consent Management, Logging & Withdrawal",
    s3Intro:
      "In accordance with transparency and Privacy by Default principles (Arts. 5 & 25 GDPR), we keep contractual acceptance separate from optional promotional consent:",
    s3OptInTitle: "No Pre-Ticked Checkboxes (Explicit Opt-In)",
    s3OptInBody:
      "In the registration form, both the Terms & Conditions checkbox (with Privacy Policy link) and the optional marketing checkbox are strictly unchecked by default.",
    s3Subitems: [
      {
        title: "a) Privacy Acknowledgement & Terms Acceptance",
        body: "Required to create an account and access the mockup generator.",
      },
      {
        title: "b) Optional Marketing Consent (marketing_consent)",
        body: "Completely voluntary. Refusing or withdrawing marketing consent never restricts Studio access or your daily free quota.",
      },
      {
        title: "c) Audit Record in Supabase",
        body: "Upon registration (and whenever updated in Settings), Supabase user metadata records the marketing consent boolean, UTC timestamps (marketing_consent_updated_at, privacy_acknowledged_at, terms_accepted_at), and document versions.",
      },
    ],
    s3RevokeTitle: "How to Withdraw Consent or Delete Your Data",
    s3RevokeIntro: "You may withdraw consent or request deletion at any time:",
    s3RevokeSteps: [
      "Directly in-app under Settings → Privacy & Consents (one-click toggle synced to Supabase).",
      "Via the Unsubscribe link in any promotional email.",
      `By emailing ${LEGAL_CONFIG.contactEmail} to request withdrawal or full account deletion.`,
    ],
    s4Title: "4. Artificial Intelligence (AI) Providers",
    s4Intro:
      "Photorealistic product renders are generated using generative AI models accessed through the OpenRouter API gateway:",
    s4Cards: [
      {
        badge: "Primary Engine",
        title: "OpenRouter + Google Gemini Image Models",
        subtitle: "openrouter.ai · google/gemini-2.5-flash-image and allowed variants",
        body: "Our backend sends the prompt and composited artwork (base64) over HTTPS to OpenRouter, which routes the request to the selected Google model and returns the rendered image. API privacy policies of OpenRouter and the model provider apply; our app does not persist uploaded or generated images on our servers.",
      },
      {
        badge: "Optional / BYOK",
        title: "Bring Your Own Key (BYOK)",
        subtitle: "Direct user control under your own OpenRouter account",
        body: "You may provide your own OpenRouter key in Settings. It remains solely in browser memory until you close or reload the tab and uses your own OpenRouter privacy/retention settings.",
      },
    ],
    s5Title: "5. Logos, Uploaded Artwork & AI Act Transparency",
    s5Intro: "You retain 100% ownership and intellectual property rights over all logos and artwork uploaded to the Studio.",
    s5Bullets: [
      {
        label: "Client-side HTML5 Canvas processing:",
        text: "Scaling, placement, background removal, and text overlays run locally in your browser before transmission.",
      },
      {
        label: "No permanent server storage:",
        text: "Uploaded logos and generated mockups are not stored in our cloud buckets or database; they stay in temporary browser memory for PNG/JPG/PDF/ZIP download.",
      },
      {
        label: "AI Transparency (EU Regulation 2024/1689):",
        text: "Generated mockups are synthetic visual outputs produced by artificial intelligence from your artwork.",
      },
    ],
    s6Title: "6. Data Recipients & Sub-processors",
    s6Intro: "To operate the cloud infrastructure and AI pipeline, we rely on the following sub-processors under Art. 28 GDPR:",
    s6Headers: ["Provider", "Role", "Data Processed", "Location & Safeguards"],
    s6Rows: SUBPROCESSORS_EN,
    s6Note: "Any cross-border transfers occur under Chapter V GDPR safeguards (EU Standard Contractual Clauses).",
    s7Title: "7. Data Retention & Security",
    s7Boxes: [
      {
        title: "Account Data",
        body: "Retained while your account remains active. Upon deletion request, identifying profile data is permanently erased from active systems within 30 days unless retention is required by law.",
      },
      {
        title: "Images & Renders",
        body: "Processed transiently in memory per API call. No persistent server-side image storage; Studio history lives strictly in temporary browser session state.",
      },
    ],
    s7SecurityTitle: "Technical security measures:",
    s7SecurityList: [
      "HTTPS/TLS encryption across all client, server, and AI provider connections.",
      "Signed JWT verification on every server-side generation request.",
      "IP rate limiting (10 req/min) and strict MIME/payload size validation (max 8 MB).",
      "Self-hosted local web fonts: zero external requests to Google Fonts.",
    ],
    s8Title: "8. Data Subject Rights (Arts. 15–22 GDPR)",
    s8Intro: "You may exercise the following GDPR rights free of charge at any time:",
    s8Rights: [
      { title: "Access (Art. 15)", desc: "Obtain confirmation and a copy of your personal data." },
      { title: "Rectification (Art. 16)", desc: "Correct inaccurate or incomplete data." },
      { title: "Erasure (Art. 17)", desc: "Request full deletion of your account and data." },
      { title: "Restriction (Art. 18)", desc: "Restrict processing in statutory circumstances." },
      { title: "Portability (Art. 20)", desc: "Receive your data in a structured machine-readable format." },
      { title: "Objection & Withdrawal (Arts. 7 & 21)", desc: "Withdraw consent or object to processing." },
    ],
    s8AuthorityTitle: "Right to Lodge a Complaint (FDPIC Switzerland / EU DPA)",
    s8AuthorityBody:
      "You may contact the Swiss Federal Data Protection and Information Commissioner (FDPIC, Feldeggweg 1, 3003 Bern · www.edoeb.admin.ch) or, for EU/EEA residents, your local EU Data Protection Authority (e.g. Garante Privacy in Italy · www.garanteprivacy.it).",
    s9Title: "9. Cookie Policy & Local Storage",
    s9Intro:
      "This section serves as our Cookie & Browser Storage Policy pursuant to the EU ePrivacy Directive and European Data Protection guidelines.",
    s9NoTrackingBoxTitle: "Strictly Technical Storage Only — Zero Advertising or Analytics Cookies",
    s9NoTrackingBoxBody:
      "MockupStudio Pro uses no advertising cookies, profiling pixels, or third-party analytics trackers, and hosts all web fonts locally. Because only strictly necessary technical browser storage is used to deliver authentication and core preferences, no intrusive cookie consent banner is required.",
    s9Headers: ["Key / Name", "Technology", "Purpose", "Duration", "Category"],
    s9Rows: [
      {
        key: "sb-*-auth-token",
        type: "localStorage (Supabase Auth)",
        purpose: "Keeps your authenticated Studio session active and secure",
        duration: "Until sign-out or token expiration",
        category: "Strictly Necessary",
      },
      {
        key: "mockup_or_model",
        type: "localStorage",
        purpose: "Remembers your selected AI image model in Settings",
        duration: "Persistent until cleared in browser",
        category: "Technical Preference",
      },
      {
        key: "mockup_lang",
        type: "localStorage (read-only)",
        purpose: "Optional saved language preference for UI language suggestions",
        duration: "Read-only if present",
        category: "Technical Preference",
      },
      {
        key: "React Session State (RAM)",
        type: "Volatile browser memory",
        purpose: "Temporarily holds uploaded artwork, generated mockups, and optional BYOK key",
        duration: "Cleared on tab close or reload",
        category: "Volatile Technical",
      },
    ],
    s9BrowserNote:
      "You can inspect or clear localStorage items anytime in your browser site-data settings. Clearing sb-*-auth-token will simply sign you out.",
    contactEyebrow: "Privacy Support & GDPR Requests",
    contactTitle: "Questions or want to exercise your rights?",
    contactDesc: "Email the Data Controller specifying your request (access, consent withdrawal, or account deletion). We respond within 30 days.",
    copiedLabel: "Email Copied!",
    sendEmailLabel: "Send Email",
    seeTermsLabel: "Read Terms of Service",
  },
  es: {
    docTitle: "Política de Privacidad y Cookies • MockupStudio Pro",
    badge: "RGPD (UE 2016/679) · ePrivacy · AI Act",
    title: "Política de Privacidad y Cookies",
    intro:
      "De conformidad con el art. 13 del Reglamento General de Protección de Datos (RGPD - UE 2016/679), la normativa ePrivacy y las obligaciones de transparencia del Reglamento (UE) 2024/1689 (AI Act).",
    updatedLabel: `Última actualización: ${LEGAL_CONFIG.lastUpdatedEs}`,
    versionLabel: `Versión: ${LEGAL_CONFIG.privacyVersion}`,
    statusLabel: "Vigente",
    backHome: "Volver al Inicio",
    backStudio: "Volver al Estudio",
    openStudio: "Abrir Estudio",
    printPdf: "Imprimir / PDF",
    tocTitle: "Índice de Contenidos",
    pillars: [
      {
        title: "1. Correo y Cuenta",
        desc: "Recopilamos tu email únicamente para crear la cuenta, autenticar el acceso, gestionar la cuota diaria y enviar avisos del servicio.",
      },
      {
        title: "2. Consentimiento y Storage Técnico",
        desc: "Sin casillas premarcadas, sin cookies publicitarias ni analytics de terceros, y con fuentes alojadas localmente.",
      },
      {
        title: "3. Proveedores AI Transparentes",
        desc: "Tus logotipos se preprocesan en tu navegador (HTML5 Canvas) y se envían vía OpenRouter únicamente para generar el mockup.",
      },
    ],
    s1Title: "1. Responsable del Tratamiento",
    s1Intro: `El responsable del tratamiento de los datos recogidos a través de ${LEGAL_CONFIG.brandName} es:`,
    s1PlatformLabel: "Plataforma",
    s1ControllerLabel: "Responsable",
    s1AddressLabel: "Ubicación / Dirección",
    s1VatLabel: "NIF / IVA",
    s1PurposeLabel: "Finalidad",
    s1PurposeValue: "Plataforma SaaS web para la generación de mockups fotorrealistas con IA.",
    s1EmailLabel: "Email de contacto de privacidad",
    s1Note: "Para ejercer tus derechos RGPD puedes escribirnos en cualquier momento al correo indicado.",
    s2Title: "2. Datos Personales Recopilados",
    s2Intro: `Al utilizar ${LEGAL_CONFIG.brandName}, tratamos únicamente las siguientes categorías de datos:`,
    s2Items: [
      {
        title: "Correo Electrónico y Metadatos de Cuenta",
        body: "Necesarios para crear la cuenta, confirmar el registro, recuperar contraseñas, gestionar las 15 generaciones gratuitas diarias y registrar los consentimientos.",
        legalBasis: "Base jurídica: Art. 6.1.b RGPD (ejecución del servicio).",
      },
      {
        title: "Credenciales de Acceso (Hash de Contraseña)",
        body: "Gestionadas por Supabase Auth mediante algoritmos criptográficos irreversibles. Nunca almacenamos contraseñas en texto plano.",
        legalBasis: "Base jurídica: Art. 6.1.b y 6.1.f RGPD.",
      },
      {
        title: "Registros Técnicos y Límite de Peticiones",
        body: "Para proteger la API contra abusos, el servidor aplica un límite en memoria de 10 peticiones/minuto por IP.",
        legalBasis: "Base jurídica: Art. 6.1.f RGPD (interés legítimo en la seguridad).",
      },
      {
        title: "Clave API Personal (BYOK - Opcional)",
        body: "Si introduces tu propia clave de OpenRouter en Ajustes, permanece solo en la memoria temporal del navegador y no se guarda en bases de datos ni en localStorage.",
        legalBasis: "Base jurídica: Art. 6.1.b RGPD.",
      },
    ],
    s3Title: "3. Consentimiento, Registro y Revocación",
    s3Intro: "Cumplimos con la privacidad por defecto (Arts. 5 y 25 RGPD):",
    s3OptInTitle: "Sin Casillas Premarcadas (Opt-in Explícito)",
    s3OptInBody:
      "Tanto la aceptación de Términos y Condiciones como la casilla opcional de marketing están desmarcadas por defecto en el registro.",
    s3Subitems: [
      { title: "a) Términos y Privacidad", body: "Obligatorios para crear cuenta y usar el Estudio." },
      { title: "b) Marketing Opcional (marketing_consent)", body: "Totalmente voluntario; negarlo no limita el uso gratuito." },
      { title: "c) Registro en Supabase", body: "Se guardan estado booleano, marcas de tiempo UTC y versión de los textos legales aceptados." },
    ],
    s3RevokeTitle: "Cómo Revocar o Eliminar tu Cuenta",
    s3RevokeIntro: "Puedes gestionar tus preferencias en cualquier momento:",
    s3RevokeSteps: [
      "En la app: Ajustes → Privacidad y Consentimientos.",
      "Desde el enlace de baja incluido en cualquier correo promocional.",
      `Escribiendo a ${LEGAL_CONFIG.contactEmail} para solicitar la baja o eliminación total de la cuenta.`,
    ],
    s4Title: "4. Proveedores de Inteligencia Artificial (IA)",
    s4Intro: "Generamos los mockups mediante modelos de IA a través de OpenRouter:",
    s4Cards: [
      {
        badge: "Motor Principal",
        title: "OpenRouter + Modelos Google Gemini Image",
        subtitle: "openrouter.ai",
        body: "El servidor envía el prompt y la imagen en base64 por HTTPS a OpenRouter para generar el render. No almacenamos tus imágenes en nuestros servidores.",
      },
      {
        badge: "Opcional / BYOK",
        title: "Clave API Propia (Bring Your Own Key)",
        subtitle: "Control directo desde tu cuenta OpenRouter",
        body: "La clave se mantiene solo en memoria RAM del navegador durante la sesión activa.",
      },
    ],
    s5Title: "5. Logotipos, Imágenes y Transparencia AI Act",
    s5Intro: "Conservas la plena titularidad intelectual sobre todos los logotipos e imágenes que subas.",
    s5Bullets: [
      { label: "Procesamiento local HTML5 Canvas:", text: "El recorte, escala, texto y eliminación de fondo ocurren en tu navegador." },
      { label: "Sin almacenamiento permanente:", text: "Las imágenes no se guardan en nuestros servidores; se mantienen en memoria temporal para descargar en PNG/JPG/PDF/ZIP." },
      { label: "Transparencia AI Act (UE 2024/1689):", text: "Los renders generados son imágenes sintéticas creadas por inteligencia artificial." },
    ],
    s6Title: "6. Subencargados del Tratamiento",
    s6Intro: "Utilizamos los siguientes proveedores de infraestructura conforme al Art. 28 RGPD:",
    s6Headers: ["Proveedor", "Función", "Datos Tratados", "Ubicación y Garantías"],
    s6Rows: SUBPROCESSORS_EN,
    s6Note: "Las transferencias internacionales cuentan con Cláusulas Contractuales Tipo (SCC) aprobadas por la UE.",
    s7Title: "7. Conservación y Seguridad",
    s7Boxes: [
      { title: "Datos de Cuenta", body: "Conservados mientras la cuenta esté activa; eliminados en un máximo de 30 días tras solicitud de supresión." },
      { title: "Imágenes y Renders", body: "Procesamiento volátil en memoria sin almacenamiento en disco o buckets." },
    ],
    s7SecurityTitle: "Medidas de seguridad:",
    s7SecurityList: [
      "Cifrado HTTPS/TLS en todas las comunicaciones.",
      "Validación JWT en servidor para cada generación.",
      "Límite de 10 req/min por IP y máximo 8 MB por imagen.",
      "Fuentes tipográficas alojadas localmente sin llamadas externas a Google Fonts.",
    ],
    s8Title: "8. Derechos del Interesado (Arts. 15–22 RGPD)",
    s8Intro: "Puedes ejercer gratuitamente en cualquier momento los derechos de:",
    s8Rights: [
      { title: "Acceso (Art. 15)", desc: "Confirmar y obtener copia de tus datos." },
      { title: "Rectificación (Art. 16)", desc: "Corregir datos inexactos." },
      { title: "Supresión (Art. 17)", desc: "Solicitar la eliminación de tu cuenta." },
      { title: "Limitación (Art. 18)", desc: "Limitar el tratamiento cuando proceda." },
      { title: "Portabilidad (Art. 20)", desc: "Recibir tus datos en formato estructurado." },
      { title: "Oposición y Revocación (Arts. 7 y 21)", desc: "Retirar el consentimiento en cualquier momento." },
    ],
    s8AuthorityTitle: "Reclamación ante la Autoridad de Control",
    s8AuthorityBody:
      "Puedes acudir al Comisionado Federal de Protección de Datos de Suiza (IFPDT / FDPIC, www.edoeb.admin.ch) o, si resides en la UE/EEE, a tu autoridad nacional de control (p. ej. AEPD en España o Garante Privacy en Italia).",
    s9Title: "9. Política de Cookies y Almacenamiento Local",
    s9Intro: "Declaramos el uso de tecnologías de almacenamiento en el navegador conforme a la Directiva ePrivacy.",
    s9NoTrackingBoxTitle: "Solo Almacenamiento Técnico — Sin Cookies Publicitarias ni Analytics",
    s9NoTrackingBoxBody:
      "MockupStudio Pro no utiliza cookies publicitarias, píxeles de seguimiento ni analytics de terceros. Al emplear únicamente almacenamiento técnico necesario y fuentes locales, no se requiere banner de consentimiento de cookies.",
    s9Headers: ["Clave", "Tecnología", "Finalidad", "Duración", "Categoría"],
    s9Rows: [
      {
        key: "sb-*-auth-token",
        type: "localStorage (Supabase Auth)",
        purpose: "Mantiene iniciada la sesión del usuario en el Estudio",
        duration: "Hasta cerrar sesión o expirar el token",
        category: "Técnico / Necesario",
      },
      {
        key: "mockup_or_model",
        type: "localStorage",
        purpose: "Guarda el modelo AI seleccionado en Ajustes",
        duration: "Persistente hasta borrar datos del navegador",
        category: "Preferencia técnica",
      },
      {
        key: "Estado React (RAM)",
        type: "Memoria volátil",
        purpose: "Almacena temporalmente el logo, los mockups generados y la clave BYOK",
        duration: "Se borra al cerrar o recargar la pestaña",
        category: "Técnico / Volátil",
      },
    ],
    s9BrowserNote: "Puedes borrar los datos de localStorage en cualquier momento desde la configuración de tu navegador.",
    contactEyebrow: "Soporte de Privacidad",
    contactTitle: "¿Dudas o solicitudes sobre tus datos?",
    contactDesc: "Escríbenos especificando tu solicitud (acceso, revocación o eliminación). Respondemos en un máximo de 30 días.",
    copiedLabel: "¡Email Copiado!",
    sendEmailLabel: "Enviar Email",
    seeTermsLabel: "Ver Términos de Servicio",
  },
  fr: {
    docTitle: "Politique de Confidentialité & Cookies • MockupStudio Pro",
    badge: "RGPD (UE 2016/679) · ePrivacy · AI Act",
    title: "Politique de Confidentialité & Cookies",
    intro:
      "Conformément à l'article 13 du RGPD (Règlement UE 2016/679), à la directive ePrivacy et aux obligations de transparence du Règlement (UE) 2024/1689 (AI Act).",
    updatedLabel: `Dernière mise à jour : ${LEGAL_CONFIG.lastUpdatedFr}`,
    versionLabel: `Version : ${LEGAL_CONFIG.privacyVersion}`,
    statusLabel: "En vigueur",
    backHome: "Retour à l'accueil",
    backStudio: "Retour au Studio",
    openStudio: "Ouvrir le Studio",
    printPdf: "Imprimer / PDF",
    tocTitle: "Sommaire",
    pillars: [
      {
        title: "1. E-mail & Compte",
        desc: "Nous collectons votre e-mail uniquement pour la création du compte, l'authentification sécurisée et la gestion du quota quotidien.",
      },
      {
        title: "2. Consentement & Stockage Technique",
        desc: "Aucune case précochée, aucun traceur publicitaire ou analytics tiers, et polices hébergées localement.",
      },
      {
        title: "3. Fournisseurs IA Transparents",
        desc: "Vos logos sont traités localement via HTML5 Canvas puis routés via OpenRouter uniquement pour générer le mockup.",
      },
    ],
    s1Title: "1. Responsable du Traitement",
    s1Intro: `Le responsable du traitement des données collectées via ${LEGAL_CONFIG.brandName} est :`,
    s1PlatformLabel: "Plateforme",
    s1ControllerLabel: "Responsable",
    s1AddressLabel: "Adresse",
    s1VatLabel: "N° TVA / SIRET",
    s1PurposeLabel: "Finalité",
    s1PurposeValue: "Plateforme SaaS web de génération de mockups photoréalistes assistée par IA.",
    s1EmailLabel: "E-mail de contact",
    s1Note: "Pour exercer vos droits RGPD, contactez-nous à tout moment à l'adresse e-mail ci-dessus.",
    s2Title: "2. Données Personnelles Collectées",
    s2Intro: `Lors de l'utilisation de ${LEGAL_CONFIG.brandName}, nous traitons uniquement :`,
    s2Items: [
      {
        title: "Adresse E-mail & Métadonnées",
        body: "Nécessaires pour l'inscription, la confirmation d'e-mail, la réinitialisation du mot de passe, le quota gratuit (15/jour) et l'audit des consentements.",
        legalBasis: "Base légale : Art. 6.1.b RGPD.",
      },
      {
        title: "Identifiants (Mot de passe chiffré)",
        body: "Gérés par Supabase Auth via hachage cryptographique irréversible.",
        legalBasis: "Base légale : Art. 6.1.b et 6.1.f RGPD.",
      },
      {
        title: "Journaux Techniques & Rate Limiting",
        body: "Limite en mémoire de 10 requêtes/minute par IP pour protéger l'API contre les abus.",
        legalBasis: "Base légale : Art. 6.1.f RGPD.",
      },
      {
        title: "Clé API Personnelle (BYOK - Optionnelle)",
        body: "Conservée uniquement en mémoire RAM du navigateur le temps de la session (jamais enregistrée en base ni en localStorage).",
        legalBasis: "Base légale : Art. 6.1.b RGPD.",
      },
    ],
    s3Title: "3. Consentement, Traçabilité et Révocation",
    s3Intro: "Conformément aux articles 5 et 25 du RGPD (Privacy by Default) :",
    s3OptInTitle: "Aucune Case Précochée (Opt-in Explicite)",
    s3OptInBody: "L'acceptation des Conditions d'Utilisation et le consentement marketing optionnel sont décochés par défaut.",
    s3Subitems: [
      { title: "a) Conditions & Confidentialité", body: "Nécessaires pour accéder au Studio." },
      { title: "b) Marketing Optionnel (marketing_consent)", body: "Facultatif ; le refus n'affecte pas le quota gratuit." },
      { title: "c) Journalisation Supabase", body: "Enregistrement du statut, de la date UTC et des versions acceptées." },
    ],
    s3RevokeTitle: "Comment Révoquer ou Supprimer Votre Compte",
    s3RevokeIntro: "Vous pouvez retirer votre consentement à tout moment :",
    s3RevokeSteps: [
      "Dans l'application : Paramètres → Confidentialité & Consentements.",
      "Via le lien de désinscription présent dans nos e-mails promotionnels.",
      `Par e-mail à ${LEGAL_CONFIG.contactEmail} pour demander la suppression complète du compte.`,
    ],
    s4Title: "4. Fournisseurs d'Intelligence Artificielle",
    s4Intro: "La génération s'appuie sur OpenRouter et les modèles Google Gemini Image :",
    s4Cards: [
      {
        badge: "Moteur Principal",
        title: "OpenRouter + Google Gemini Image",
        subtitle: "openrouter.ai",
        body: "Les requêtes sont transmises par HTTPS pour le rendu sans conservation d'images sur nos serveurs.",
      },
      {
        badge: "Optionnel / BYOK",
        title: "Clé API Personnelle",
        subtitle: "Gestion directe sous votre compte OpenRouter",
        body: "Reste uniquement en mémoire volatile du navigateur jusqu'au rechargement de l'onglet.",
      },
    ],
    s5Title: "5. Propriété Intellectuelle & Transparence AI Act",
    s5Intro: "Vous conservez l'entière propriété intellectuelle de vos logos et visuels.",
    s5Bullets: [
      { label: "Traitement local HTML5 Canvas :", text: "Le cadrage, le texte et la suppression de fond sont exécutés dans votre navigateur." },
      { label: "Aucun stockage serveur :", text: "Les images restent en mémoire temporaire pour téléchargement PNG/JPG/PDF/ZIP." },
      { label: "Transparence AI Act (UE 2024/1689) :", text: "Les rendus sont des images synthétiques générées par IA." },
    ],
    s6Title: "6. Sous-traitants (Art. 28 RGPD)",
    s6Intro: "Nous collaborons avec les sous-traitants suivants :",
    s6Headers: ["Fournisseur", "Rôle", "Données", "Localisation & Garanties"],
    s6Rows: SUBPROCESSORS_EN,
    s6Note: "Tout transfert hors UE est encadré par des Clauses Contractuelles Types (SCC).",
    s7Title: "7. Conservation et Sécurité",
    s7Boxes: [
      { title: "Données du Compte", body: "Conservées tant que le compte est actif ; supprimées sous 30 jours maximum sur demande." },
      { title: "Images & Rendus", body: "Traitement transitoire en RAM sans archivage cloud côté serveur." },
    ],
    s7SecurityTitle: "Mesures techniques :",
    s7SecurityList: [
      "Chiffrement HTTPS/TLS sur toutes les communications.",
      "Vérification JWT côté serveur à chaque génération.",
      "Limitation à 10 req/min par IP et 8 Mo max par fichier.",
      "Polices hébergées localement sans appel externe à Google Fonts.",
    ],
    s8Title: "8. Vos Droits (Arts. 15–22 RGPD)",
    s8Intro: "Vous disposez gratuitement des droits suivants :",
    s8Rights: [
      { title: "Accès (Art. 15)", desc: "Obtenir une copie de vos données." },
      { title: "Rectification (Art. 16)", desc: "Corriger vos informations." },
      { title: "Effacement (Art. 17)", desc: "Supprimer votre compte et vos données." },
      { title: "Limitation (Art. 18)", desc: "Limiter certains traitements." },
      { title: "Portabilité (Art. 20)", desc: "Recevoir vos données dans un format structuré." },
      { title: "Opposition & Retrait (Arts. 7 & 21)", desc: "Retirer votre consentement à tout moment." },
    ],
    s8AuthorityTitle: "Réclamation auprès de l'Autorité de Contrôle",
    s8AuthorityBody: "Vous pouvez contacter le Préposé fédéral suisse (PFPDT, www.edoeb.admin.ch) ou, si vous résidez dans l'UE/EEE, votre autorité nationale (CNIL, Garante Privacy, etc.).",
    s9Title: "9. Politique de Cookies & Stockage Local",
    s9Intro: "Information relative aux cookies et au stockage local (localStorage) conformément à la directive ePrivacy.",
    s9NoTrackingBoxTitle: "Stockage Technique Uniquement — Aucun Traceur Publicitaire",
    s9NoTrackingBoxBody:
      "MockupStudio Pro n'utilise aucun cookie publicitaire, pixel ou outil d'analytics tiers, et héberge ses polices localement. Aucune bannière de consentement aux cookies n'est requise pour ce stockage strictement technique.",
    s9Headers: ["Clé", "Technologie", "Finalité", "Durée", "Catégorie"],
    s9Rows: [
      {
        key: "sb-*-auth-token",
        type: "localStorage (Supabase Auth)",
        purpose: "Maintient votre session authentifiée dans le Studio",
        duration: "Jusqu'à déconnexion ou expiration",
        category: "Strictement nécessaire",
      },
      {
        key: "mockup_or_model",
        type: "localStorage",
        purpose: "Mémorise le modèle IA choisi dans les Paramètres",
        duration: "Jusqu'à suppression dans le navigateur",
        category: "Préférence technique",
      },
      {
        key: "État React (RAM)",
        type: "Mémoire volatile",
        purpose: "Conserve temporairement le logo, les mockups et la clé BYOK",
        duration: "Effacé à la fermeture de l'onglet",
        category: "Technique volatile",
      },
    ],
    s9BrowserNote: "Vous pouvez supprimer ces données à tout moment depuis les paramètres de votre navigateur.",
    contactEyebrow: "Support Confidentialité",
    contactTitle: "Des questions ou demandes RGPD ?",
    contactDesc: "Écrivez-nous pour exercer vos droits (accès, révocation ou suppression). Réponse sous 30 jours.",
    copiedLabel: "E-mail Copié !",
    sendEmailLabel: "Envoyer un E-mail",
    seeTermsLabel: "Voir les Conditions d'Utilisation",
  },
  de: {
    docTitle: "Datenschutz- & Cookie-Richtlinie • MockupStudio Pro",
    badge: "DSGVO (EU 2016/679) · ePrivacy · EU AI Act",
    title: "Datenschutz- & Cookie-Richtlinie",
    intro:
      "Gemäß Art. 13 der Datenschutz-Grundverordnung (DSGVO), der ePrivacy-Richtlinie und den Transparenzpflichten der Verordnung (EU) 2024/1689 (AI Act).",
    updatedLabel: `Stand: ${LEGAL_CONFIG.lastUpdatedDe}`,
    versionLabel: `Version: ${LEGAL_CONFIG.privacyVersion}`,
    statusLabel: "Aktiv",
    backHome: "Zurück zur Startseite",
    backStudio: "Zurück zum Studio",
    openStudio: "Studio öffnen",
    printPdf: "Drucken / PDF",
    tocTitle: "Inhaltsverzeichnis",
    pillars: [
      {
        title: "1. E-Mail & Konto",
        desc: "Wir erfassen Ihre E-Mail ausschließlich für Kontoerstellung, sichere Anmeldung und das tägliche Nutzungskontingent.",
      },
      {
        title: "2. Explizites Opt-in & Lokaler Speicher",
        desc: "Keine vorausgewählten Häkchen, keine Werbe- oder Analyse-Tracker und lokal gehostete Schriftarten ohne Google-Fonts-Abruf.",
      },
      {
        title: "3. Transparente KI-Verarbeitung",
        desc: "Ihre Logos werden lokal im Browser (HTML5 Canvas) vorbereitet und nur zur Generierung über OpenRouter gesendet.",
      },
    ],
    s1Title: "1. Verantwortlicher",
    s1Intro: `Verantwortlicher für die Datenverarbeitung auf ${LEGAL_CONFIG.brandName} ist:`,
    s1PlatformLabel: "Plattform",
    s1ControllerLabel: "Verantwortlicher",
    s1AddressLabel: "Standort / Anschrift",
    s1VatLabel: "USt-IdNr.",
    s1PurposeLabel: "Zweck",
    s1PurposeValue: "Web-SaaS-Plattform zur KI-gestützten Erstellung fotorealistischer Produkt-Mockups.",
    s1EmailLabel: "Datenschutz-Kontakt",
    s1Note: "Zur Ausübung Ihrer DSGVO-Rechte kontaktieren Sie uns jederzeit unter der angegebenen E-Mail-Adresse.",
    s2Title: "2. Erhobene Daten",
    s2Intro: `Bei der Nutzung von ${LEGAL_CONFIG.brandName} verarbeiten wir ausschließlich:`,
    s2Items: [
      {
        title: "E-Mail-Adresse & Kontodaten",
        body: "Erforderlich für Registrierung, Passwort-Reset, tägliches Freikontingent (15/Tag) und Einwilligungsnachweis.",
        legalBasis: "Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.",
      },
      {
        title: "Zugangsdaten (Passwort-Hash)",
        body: "Verwaltet durch Supabase Auth mittels nicht umkehrbarer kryptografischer Hash-Verfahren.",
        legalBasis: "Rechtsgrundlage: Art. 6 Abs. 1 lit. b & f DSGVO.",
      },
      {
        title: "Technische Verbindungsdaten & Rate Limiting",
        body: "Schutz vor Missbrauch durch In-Memory-Rate-Limiting (max. 10 Anfragen/Minute pro IP).",
        legalBasis: "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.",
      },
      {
        title: "Eigener API-Schlüssel (BYOK - Optional)",
        body: "Verbleibt ausschließlich im flüchtigen Arbeitsspeicher des Browsers und wird nicht gespeichert.",
        legalBasis: "Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.",
      },
    ],
    s3Title: "3. Einwilligungen, Protokollierung & Widerruf",
    s3Intro: "Gemäß Art. 5 und 25 DSGVO (Privacy by Default):",
    s3OptInTitle: "Keine vorausgewählten Checkboxen (Explizites Opt-in)",
    s3OptInBody: "Sowohl die Nutzungsbedingungen als auch optionale Marketing-Einwilligungen sind standardmäßig deaktiviert.",
    s3Subitems: [
      { title: "a) Nutzungsbedingungen & Datenschutz", body: "Erforderlich für die Nutzung des Studios." },
      { title: "b) Optionales Marketing (marketing_consent)", body: "Freiwillig; eine Ablehnung schränkt die kostenlose Nutzung nicht ein." },
      { title: "c) Protokollierung in Supabase", body: "Speicherung von Status, UTC-Zeitstempel und akzeptierter Dokumentversion." },
    ],
    s3RevokeTitle: "Widerruf & Kontolöschung",
    s3RevokeIntro: "Sie können Einwilligungen jederzeit widerrufen:",
    s3RevokeSteps: [
      "Direkt in der App unter Einstellungen → Datenschutz & Einwilligungen.",
      "Über den Abmelde-Link in jeder Werbe-E-Mail.",
      `Per E-Mail an ${LEGAL_CONFIG.contactEmail} zur vollständigen Kontolöschung.`,
    ],
    s4Title: "4. KI-Anbieter",
    s4Intro: "Die Bildgenerierung erfolgt über OpenRouter und Google Gemini Image Modelle:",
    s4Cards: [
      {
        badge: "Haupt-Engine",
        title: "OpenRouter + Google Gemini Image",
        subtitle: "openrouter.ai",
        body: "Übertragung per HTTPS ausschließlich zur Erstellung des Mockups; keine Speicherung Ihrer Bilder auf unseren Servern.",
      },
      {
        badge: "Optional / BYOK",
        title: "Eigener API-Schlüssel",
        subtitle: "Direkte Kontrolle über Ihr OpenRouter-Konto",
        body: "Bleibt nur bis zum Schließen oder Neuladen des Tabs im Browser-Arbeitsspeicher.",
      },
    ],
    s5Title: "5. Urheberrecht & AI-Act-Transparenz",
    s5Intro: "Sie behalten sämtliche Rechte an Ihren hochgeladenen Logos und Grafiken.",
    s5Bullets: [
      { label: "Lokale HTML5-Canvas-Vorbereitung:", text: "Skalierung, Text und Hintergrundentfernung laufen direkt im Browser." },
      { label: "Keine Serverspeicherung:", text: "Mockups werden nur temporär im Browser für PNG/JPG/PDF/ZIP-Export gehalten." },
      { label: "AI-Act-Transparenz (EU 2024/1689):", text: "Erstellte Mockups sind KI-generierte synthetische Bilder." },
    ],
    s6Title: "6. Auftragsverarbeiter (Art. 28 DSGVO)",
    s6Intro: "Wir nutzen folgende Infrastruktur-Dienstleister:",
    s6Headers: ["Anbieter", "Rolle", "Daten", "Standort & Garantien"],
    s6Rows: SUBPROCESSORS_EN,
    s6Note: "Internationale Datentransfers erfolgen auf Basis von EU-Standardvertragsklauseln (SCC).",
    s7Title: "7. Speicherdauer & Sicherheit",
    s7Boxes: [
      { title: "Kontodaten", body: "Gespeichert bis zur Kontolöschung; endgültige Entfernung innerhalb von 30 Tagen nach Anfrage." },
      { title: "Bilder & Renderings", body: "Nur flüchtige Verarbeitung im Arbeitsspeicher ohne dauerhafte Speicherung." },
    ],
    s7SecurityTitle: "Sicherheitsmaßnahmen:",
    s7SecurityList: [
      "HTTPS/TLS-Verschlüsselung aller Verbindungen.",
      "Serverseitige JWT-Überprüfung bei jeder Generierung.",
      "IP-Rate-Limiting (10 Anfragen/Min.) und 8-MB-Limit.",
      "Lokal gehostete Schriftarten ohne externe Google-Fonts-Anfragen.",
    ],
    s8Title: "8. Betroffenenrechte (Art. 15–22 DSGVO)",
    s8Intro: "Sie können jederzeit kostenlos folgende Rechte geltend machen:",
    s8Rights: [
      { title: "Auskunft (Art. 15)", desc: "Kopie und Bestätigung Ihrer Daten." },
      { title: "Berichtigung (Art. 16)", desc: "Korrektur unrichtiger Daten." },
      { title: "Löschung (Art. 17)", desc: "Löschung Ihres Kontos und Ihrer Daten." },
      { title: "Einschränkung (Art. 18)", desc: "Einschränkung der Verarbeitung." },
      { title: "Datenübertragbarkeit (Art. 20)", desc: "Bereitstellung in strukturiertem Format." },
      { title: "Widerspruch & Widerruf (Art. 7, 21)", desc: "Jederzeitiger Widerruf erteilter Einwilligungen." },
    ],
    s8AuthorityTitle: "Beschwerderecht",
    s8AuthorityBody: "Sie können sich an den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB, Bern · www.edoeb.admin.ch) oder bei Wohnsitz im EWR/EU an Ihre zuständige Datenschutz-Aufsichtsbehörde wenden.",
    s9Title: "9. Cookie-Richtlinie & LocalStorage",
    s9Intro: "Hinweise zu Cookies und lokalem Browser-Speicher gemäß ePrivacy-Richtlinie.",
    s9NoTrackingBoxTitle: "Nur technisch notwendiger Speicher — Keine Werbe- oder Analyse-Cookies",
    s9NoTrackingBoxBody:
      "MockupStudio Pro setzt keine Werbe-Cookies, Tracking-Pixel oder Drittanbieter-Analytics ein und hostet alle Schriftarten lokal. Für rein technisch notwendigen Speicher ist kein Cookie-Einwilligungsbanner erforderlich.",
    s9Headers: ["Schlüssel", "Technologie", "Zweck", "Speicherdauer", "Kategorie"],
    s9Rows: [
      {
        key: "sb-*-auth-token",
        type: "localStorage (Supabase Auth)",
        purpose: "Hält Ihre angemeldete Sitzung im Studio aktiv",
        duration: "Bis zur Abmeldung oder Token-Ablauf",
        category: "Technisch erforderlich",
      },
      {
        key: "mockup_or_model",
        type: "localStorage",
        purpose: "Speichert das gewählte KI-Modell aus den Einstellungen",
        duration: "Bis zur manuellen Löschung im Browser",
        category: "Technische Präferenz",
      },
      {
        key: "React-Status (RAM)",
        type: "Flüchtiger Browserspeicher",
        purpose: "Hält temporär Logo, generierte Mockups und optionalen BYOK-Schlüssel",
        duration: "Gelöscht beim Schließen/Neuladen",
        category: "Flüchtig / Technisch",
      },
    ],
    s9BrowserNote: "Sie können gespeicherte localStorage-Daten jederzeit in den Browser-Einstellungen löschen.",
    contactEyebrow: "Datenschutz-Support",
    contactTitle: "Fragen oder DSGVO-Anfragen?",
    contactDesc: "Schreiben Sie uns (Auskunft, Widerruf oder Kontolöschung). Antwort innerhalb von 30 Tagen.",
    copiedLabel: "E-Mail kopiert!",
    sendEmailLabel: "E-Mail senden",
    seeTermsLabel: "Nutzungsbedingungen lesen",
  },
};

export const TERMS_CONTENT: Record<LegalLang, TermsCopy> = {
  it: {
    docTitle: "Termini e Condizioni di Servizio • MockupStudio Pro",
    badge: "Termini di Servizio · Licenza d'Uso · AI Act",
    title: "Termini e Condizioni di Servizio",
    intro:
      "I presenti Termini e Condizioni disciplinano l'accesso e l'utilizzo della piattaforma web MockupStudio Pro. Creando un account o utilizzando lo Studio, l'utente accetta integralmente le presenti condizioni contrattuali.",
    updatedLabel: `Ultimo aggiornamento: ${LEGAL_CONFIG.lastUpdatedIt}`,
    versionLabel: `Versione: ${LEGAL_CONFIG.termsVersion}`,
    backHome: "Torna alla Home",
    backStudio: "Torna allo Studio",
    openStudio: "Apri Studio Mockup",
    printPdf: "Stampa / PDF",
    tocTitle: "Indice dei Termini",
    sections: [
      {
        id: "oggetto",
        title: "1. Oggetto del Servizio",
        paragraphs: [
          `${LEGAL_CONFIG.brandName} è un'applicazione web SaaS che consente agli utenti registrati di pre-elaborare grafiche nel browser e generare mockup fotografici di prodotti tramite modelli di intelligenza artificiale accessibili via API OpenRouter.`,
        ],
      },
      {
        id: "account",
        title: "2. Registrazione, Requisiti di Età e Sicurezza",
        paragraphs: [
          "L'accesso allo Studio richiede la creazione di un account personale tramite indirizzo email valido e password (minimo 6 caratteri).",
        ],
        bullets: [
          "L'utente dichiara di avere almeno 18 anni (o l'età minima legale prevista nel proprio Paese per concludere contratti vincolanti).",
          "L'utente è responsabile della riservatezza delle proprie credenziali e di ogni attività svolta tramite il proprio account.",
          "È vietato creare account multipli automatizzati o aggirare i limiti giornalieri tramite bot.",
        ],
      },
      {
        id: "quote",
        title: "3. Quote Gratuite e Modalità BYOK (Chiave Personale)",
        paragraphs: [
          "Ogni account registrato dispone di una quota gratuita di 15 generazioni di mockup al giorno tramite la chiave API del servizio (salvo disponibilità e limiti tecnici).",
          "In alternativa, l'utente può inserire nelle Impostazioni una propria chiave API OpenRouter personale (BYOK - Bring Your Own Key). In tale modalità, i costi di generazione sono addebitati direttamente da OpenRouter all'account dell'utente secondo il listino OpenRouter.",
        ],
      },
      {
        id: "ip-manleva",
        title: "4. Proprietà Intellettuale sui Loghi Caricati e Manleva",
        paragraphs: [
          "L'utente conserva ogni diritto sulle grafiche, sui marchi e sui loghi caricati nella piattaforma.",
          "Caricando qualsiasi file grafico o testo, l'utente dichiara e garantisce di esserne il legittimo titolare o di disporre di tutte le necessarie licenze d'uso. L'utente si impegna a manlevare e tenere indenne il Titolare della piattaforma da qualsiasi pretesa, reclamo o richiesta risarcitoria di terzi derivante da violazione di copyright, marchi registrati o diritti di proprietà intellettuale.",
        ],
      },
      {
        id: "output-ai",
        title: "5. Output Generati dall'IA, Uso Commerciale e Trasparenza",
        paragraphs: [
          "I mockup generati sono immagini sintetiche prodotte da modelli di intelligenza artificiale generativa (ai sensi dell'Art. 50 del Regolamento UE 2024/1689 - AI Act).",
          "L'utente può utilizzare i mockup generati per scopi personali o commerciali (es. schede prodotto su Etsy, Shopify, Amazon, WooCommerce, cataloghi e social media), nel rispetto dei termini d'uso di OpenRouter e del fornitore del modello AI selezionato.",
        ],
      },
      {
        id: "divieti",
        title: "6. Usi Vietati",
        paragraphs: ["È severamente vietato utilizzare la piattaforma per:"],
        bullets: [
          "Generare contenuti illeciti, diffamatori, violenti, pornografici, discriminatori o contraffatti.",
          "Riprodurre senza autorizzazione marchi di terzi per vendita di merce contraffatta.",
          "Effettuare reverse engineering, scraping automatico o attacchi informatici contro i server o le API.",
        ],
      },
      {
        id: "responsabilita",
        title: "7. Disponibilità del Servizio e Limitazione di Responsabilità",
        paragraphs: [
          'Il servizio è fornito "così com’è" (as-is) e "secondo disponibilità" (as-available). Poiché la generazione dipende da servizi esterni (OpenRouter, Google Gemini, Supabase, infrastruttura cloud), non garantiamo continuità assoluta, tempi fissi di risposta o assenza di imperfezioni visive nei render AI.',
          "Nella misura massima consentita dalla legge applicabile, il Titolare non risponde per mancati guadagni, perdita di dati locali nella sessione browser o interruzioni temporanee del servizio.",
        ],
      },
      {
        id: "legge",
        title: "8. Modifiche, Cancellazione e Legge Applicabile",
        paragraphs: [
          "Il Titolare può aggiornare i presenti Termini comunicando la nuova versione all'interno della piattaforma. L'utente può cessare l'utilizzo e richiedere la cancellazione dell'account in qualsiasi momento.",
          "I presenti Termini sono regolati dal diritto sostanziale svizzero (foro competente presso la sede del Titolare nel Cantone Ticino, Svizzera), fatta salva l'applicazione delle norme inderogabili a tutela dei consumatori previste nel Paese di residenza dell'utente.",
        ],
      },
    ],
    contactTitle: "Domande sui Termini di Servizio?",
    contactDesc: `Per chiarimenti contrattuali o segnalazioni di abuso scrivi a ${LEGAL_CONFIG.contactEmail}.`,
    seePrivacyLabel: "Leggi la Privacy e Cookie Policy",
  },
  en: {
    docTitle: "Terms of Service • MockupStudio Pro",
    badge: "Terms of Service · Commercial License · EU AI Act",
    title: "Terms & Conditions of Service",
    intro:
      "These Terms & Conditions govern access to and use of the MockupStudio Pro web application. By creating an account or using the Studio, you agree to be bound by these Terms.",
    updatedLabel: `Last updated: ${LEGAL_CONFIG.lastUpdatedEn}`,
    versionLabel: `Version: ${LEGAL_CONFIG.termsVersion}`,
    backHome: "Back to Home",
    backStudio: "Back to Studio",
    openStudio: "Open Mockup Studio",
    printPdf: "Print / PDF",
    tocTitle: "Table of Contents",
    sections: [
      {
        id: "scope",
        title: "1. Scope of the Service",
        paragraphs: [
          `${LEGAL_CONFIG.brandName} is a web SaaS application enabling registered users to prepare graphics in-browser and generate photorealistic product mockups via generative AI models routed through OpenRouter.`,
        ],
      },
      {
        id: "account",
        title: "2. Account Registration & Eligibility",
        paragraphs: ["Access to the Studio requires registering an account with a valid email address and password (min. 6 characters)."],
        bullets: [
          "You represent that you are at least 18 years old or of legal majority in your jurisdiction.",
          "You are responsible for safeguarding your login credentials and all activity under your account.",
          "Automated account creation or bypassing daily quotas is strictly prohibited.",
        ],
      },
      {
        id: "quotas",
        title: "3. Free Quotas & BYOK (Bring Your Own Key)",
        paragraphs: [
          "Each registered account receives up to 15 free mockup generations per day subject to server and upstream API availability.",
          "Optionally, you may supply your own OpenRouter API key in Settings (BYOK). In BYOK mode, usage charges are billed directly to your OpenRouter account according to OpenRouter's pricing.",
        ],
      },
      {
        id: "ip",
        title: "4. Uploaded Artwork Ownership & Indemnification",
        paragraphs: [
          "You retain full intellectual property rights over all logos, graphics, and text you upload.",
          "By uploading artwork, you warrant that you own or hold valid rights/licenses to use it, and you agree to indemnify the Service Operator against any third-party trademark, copyright, or IP claims arising from your uploaded materials.",
        ],
      },
      {
        id: "ai-output",
        title: "5. AI-Generated Outputs, Commercial Use & Transparency",
        paragraphs: [
          "Generated mockups are synthetic visual outputs produced by artificial intelligence (EU Regulation 2024/1689 - AI Act transparency).",
          "You may use generated mockups for personal or commercial purposes (such as Etsy, Shopify, Amazon, WooCommerce, and marketing campaigns), subject to OpenRouter and model provider terms.",
        ],
      },
      {
        id: "prohibited",
        title: "6. Prohibited Uses",
        paragraphs: ["You may not use the platform to:"],
        bullets: [
          "Generate illegal, infringing, counterfeit, defamatory, or harmful content.",
          "Upload third-party trademarks without authorization to create counterfeit listings.",
          "Reverse engineer, scrape, overload, or attack our servers or APIs.",
        ],
      },
      {
        id: "liability",
        title: "7. Availability & Limitation of Liability",
        paragraphs: [
          'The service is provided "as-is" and "as-available". Because generation depends on third-party infrastructure (OpenRouter, Google Gemini, Supabase, cloud hosting), uninterrupted availability or error-free AI outputs are not guaranteed.',
          "To the maximum extent permitted by law, the Operator shall not be liable for indirect damages, lost profits, or loss of unsaved browser session state.",
        ],
      },
      {
        id: "law",
        title: "8. Changes, Termination & Governing Law",
        paragraphs: [
          "We may update these Terms from time to time and notify changes via the updated document version. You may stop using the service and request account deletion at any time.",
          "These Terms are governed by Swiss substantive law (place of jurisdiction at the Operator's domicile in Canton Ticino, Switzerland), without prejudice to mandatory consumer protection laws applicable in your country of residence.",
        ],
      },
    ],
    contactTitle: "Questions about these Terms?",
    contactDesc: `Contact us at ${LEGAL_CONFIG.contactEmail} for legal inquiries or abuse reports.`,
    seePrivacyLabel: "Read Privacy & Cookie Policy",
  },
  es: {
    docTitle: "Términos y Condiciones • MockupStudio Pro",
    badge: "Términos de Servicio · Licencia · AI Act",
    title: "Términos y Condiciones de Servicio",
    intro:
      "Estos Términos regulan el acceso y uso de MockupStudio Pro. Al registrarte o utilizar el Estudio, aceptas íntegramente estas condiciones.",
    updatedLabel: `Última actualización: ${LEGAL_CONFIG.lastUpdatedEs}`,
    versionLabel: `Versión: ${LEGAL_CONFIG.termsVersion}`,
    backHome: "Volver al Inicio",
    backStudio: "Volver al Estudio",
    openStudio: "Abrir Estudio",
    printPdf: "Imprimir / PDF",
    tocTitle: "Índice",
    sections: [
      {
        id: "objeto",
        title: "1. Objeto del Servicio",
        paragraphs: [
          `${LEGAL_CONFIG.brandName} es una plataforma SaaS para generar mockups fotorrealistas con IA a través de OpenRouter.`,
        ],
      },
      {
        id: "cuenta",
        title: "2. Registro y Requisitos",
        paragraphs: ["Requiere cuenta con correo electrónico válido y contraseña (mín. 6 caracteres). Debes ser mayor de 18 años."],
      },
      {
        id: "cuotas",
        title: "3. Cuotas Gratuitas y BYOK",
        paragraphs: [
          "15 generaciones gratuitas al día por usuario registrado. Con clave propia de OpenRouter (BYOK), el consumo se factura directamente en tu cuenta OpenRouter.",
        ],
      },
      {
        id: "propiedad",
        title: "4. Propiedad Intelectual y Responsabilidad",
        paragraphs: [
          "Conservas los derechos sobre tus logotipos y garantizas poseer las licencias necesarias, eximiendo al titular de reclamaciones de terceros.",
        ],
      },
      {
        id: "ia",
        title: "5. Uso Comercial y Transparencia IA",
        paragraphs: [
          "Los mockups son imágenes sintéticas generadas por IA (AI Act UE) y pueden usarse comercialmente conforme a los términos del proveedor de IA.",
        ],
      },
      {
        id: "responsabilidad",
        title: "6. Disponibilidad y Ley Aplicable",
        paragraphs: [
          'Servicio prestado "tal cual". Regido por el derecho suizo (Cantón del Tesino, Suiza), sin perjuicio de las normas imperativas de consumo aplicables en tu país de residencia.',
        ],
      },
    ],
    contactTitle: "¿Dudas sobre los Términos?",
    contactDesc: `Escríbenos a ${LEGAL_CONFIG.contactEmail}.`,
    seePrivacyLabel: "Ver Política de Privacidad y Cookies",
  },
  fr: {
    docTitle: "Conditions d'Utilisation • MockupStudio Pro",
    badge: "Conditions d'Utilisation · Licence · AI Act",
    title: "Conditions Générales d'Utilisation",
    intro:
      "Les présentes Conditions régissent l'utilisation de MockupStudio Pro. En créant un compte, vous acceptez ces conditions.",
    updatedLabel: `Dernière mise à jour : ${LEGAL_CONFIG.lastUpdatedFr}`,
    versionLabel: `Version : ${LEGAL_CONFIG.termsVersion}`,
    backHome: "Retour à l'accueil",
    backStudio: "Retour au Studio",
    openStudio: "Ouvrir le Studio",
    printPdf: "Imprimer / PDF",
    tocTitle: "Sommaire",
    sections: [
      {
        id: "objet",
        title: "1. Objet du Service",
        paragraphs: [
          `${LEGAL_CONFIG.brandName} est un service SaaS de génération de mockups par IA via OpenRouter.`,
        ],
      },
      {
        id: "compte",
        title: "2. Compte & Éligibilité",
        paragraphs: ["Inscription requise (e-mail valide, mot de passe d'au moins 6 caractères, 18 ans minimum)."],
      },
      {
        id: "quotas",
        title: "3. Quotas Gratuits & Clé BYOK",
        paragraphs: [
          "15 générations gratuites par jour. Avec votre propre clé OpenRouter, la consommation est facturée sur votre compte OpenRouter.",
        ],
      },
      {
        id: "propriete",
        title: "4. Propriété Intellectuelle",
        paragraphs: [
          "Vous conservez vos droits sur vos logos et garantissez détenir les autorisations nécessaires pour les visuels importés.",
        ],
      },
      {
        id: "ia",
        title: "5. Usage Commercial & Transparence IA",
        paragraphs: [
          "Les mockups sont des images synthétiques générées par IA (AI Act UE), utilisables commercialement selon les conditions du fournisseur IA.",
        ],
      },
      {
        id: "loi",
        title: "6. Responsabilité & Droit Applicable",
        paragraphs: [
          'Service fourni "en l\'état". Soumis au droit suisse (Canton du Tessin, Suisse), sous réserve des règles impératives de protection des consommateurs.',
        ],
      },
    ],
    contactTitle: "Questions sur nos Conditions ?",
    contactDesc: `Contactez-nous à ${LEGAL_CONFIG.contactEmail}.`,
    seePrivacyLabel: "Voir la Politique de Confidentialité & Cookies",
  },
  de: {
    docTitle: "Nutzungsbedingungen • MockupStudio Pro",
    badge: "Nutzungsbedingungen · Lizenz · EU AI Act",
    title: "Allgemeine Nutzungsbedingungen",
    intro:
      "Diese Nutzungsbedingungen regeln den Zugang zu MockupStudio Pro. Mit der Registrierung stimmen Sie diesen Bedingungen zu.",
    updatedLabel: `Stand: ${LEGAL_CONFIG.lastUpdatedDe}`,
    versionLabel: `Version: ${LEGAL_CONFIG.termsVersion}`,
    backHome: "Zurück zur Startseite",
    backStudio: "Zurück zum Studio",
    openStudio: "Studio öffnen",
    printPdf: "Drucken / PDF",
    tocTitle: "Inhaltsverzeichnis",
    sections: [
      {
        id: "gegenstand",
        title: "1. Leistungsgegenstand",
        paragraphs: [
          `${LEGAL_CONFIG.brandName} ist eine Web-SaaS-Plattform zur Erstellung KI-generierter Produkt-Mockups über OpenRouter.`,
        ],
      },
      {
        id: "konto",
        title: "2. Registrierung & Mindestalter",
        paragraphs: ["Erforderlich sind eine gültige E-Mail-Adresse, ein Passwort (mind. 6 Zeichen) sowie Volljährigkeit (18+)."],
      },
      {
        id: "kontingent",
        title: "3. Freikontingent & BYOK",
        paragraphs: [
          "15 kostenlose Generierungen pro Tag. Bei Nutzung eines eigenen OpenRouter-API-Schlüssels erfolgt die Abrechnung direkt über Ihr OpenRouter-Konto.",
        ],
      },
      {
        id: "urheberrecht",
        title: "4. Urheberrechte & Freistellung",
        paragraphs: [
          "Sie behalten alle Rechte an Ihren Logos und sichern zu, über alle erforderlichen Nutzungsrechte zu verfügen.",
        ],
      },
      {
        id: "ki",
        title: "5. Kommerzielle Nutzung & AI Act",
        paragraphs: [
          "Generierte Mockups sind KI-erzeugte synthetische Bilder und dürfen im Rahmen der Bedingungen des jeweiligen KI-Anbieters kommerziell genutzt werden.",
        ],
      },
      {
        id: "haftung",
        title: "6. Haftung & Anwendbares Recht",
        paragraphs: [
          "Bereitstellung ohne Gewähr auf unterbrechungsfreie Verfügbarkeit. Es gilt schweizerisches Recht (Kanton Tessin, Schweiz) vorbehaltlich zwingender Verbraucherschutzvorschriften.",
        ],
      },
    ],
    contactTitle: "Fragen zu den Nutzungsbedingungen?",
    contactDesc: `Kontaktieren Sie uns unter ${LEGAL_CONFIG.contactEmail}.`,
    seePrivacyLabel: "Datenschutz- & Cookie-Richtlinie lesen",
  },
};

export function resolveLegalLang(lang: string): LegalLang {
  if (lang === "en" || lang === "es" || lang === "fr" || lang === "de") return lang;
  return "it";
}
