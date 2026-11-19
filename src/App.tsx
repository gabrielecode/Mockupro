import React, { useState, useEffect, useRef } from "react";
import {
  ImageIcon,
  Loader2,
  Download,
  RefreshCw,
  Layers,
  Sparkles,
  UploadCloud,
  Settings,
  Sliders,
  FolderArchive,
  History,
  Type,
  ShoppingBag,
  Info,
  X,
  Globe,
  ArrowLeft,
  SlidersHorizontal,
  Share2,
  Check,
  LogOut,
  User,
  Lock,
  CheckCircle2,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import JSZip from "jszip";
import { jsPDF } from "jspdf";
import { PRODUCT_TYPES, COLORS, ENVIRONMENTS, MODEL_TYPES, PRINT_EFFECTS, ProductType, Scenario } from "./data/products";
import { translations } from "./translations";
import { LandingPage } from "./components/LandingPage";
import { AuthModal } from "./components/AuthModal";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { supabase } from "./lib/supabase";
import type { Session } from "@supabase/supabase-js";

// Local static placeholder logo generator using canvas
const generatePlaceholderLogo = (text = "CREATIVE LAB"): string => {
  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // Background
  ctx.fillStyle = "#1E1611"; // Warm timber charcoal
  ctx.fillRect(0, 0, 400, 400);

  // Outer circle
  ctx.strokeStyle = "#F1641E"; // Signature orange
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(200, 160, 65, 0, Math.PI * 2);
  ctx.stroke();

  // Inner dot
  ctx.fillStyle = "#FFF9F5";
  ctx.beginPath();
  ctx.arc(200, 160, 20, 0, Math.PI * 2);
  ctx.fill();

  // Primary text
  ctx.fillStyle = "#FCFAF7";
  ctx.font = "bold 22px monospace";
  ctx.textAlign = "center";
  ctx.fillText(text, 200, 290);

  // Subtitle
  ctx.fillStyle = "#F1641E";
  ctx.font = "11px monospace";
  ctx.fillText("EST. 2026 • STUDIO PRO", 200, 325);

  return canvas.toDataURL("image/png");
};

interface HistoryItem {
  id: string;
  url: string;
  label: string;
  timestamp: string;
}

interface FeedbackMessage {
  type: "success" | "error" | "info";
  text: string;
}

export default function App() {
  const [viewMode, setViewMode] = useState<"landing" | "studio" | "privacy">(() => {
    if (typeof window !== "undefined" && window.location.pathname === "/privacy") {
      return "privacy";
    }
    return "landing";
  });
  const [session, setSession] = useState<Session | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<"signin" | "signup">("signin");

  const [lang, setLang] = useState<string>(() => {
    try {
      return localStorage.getItem("mockup_lang") || "it";
    } catch {
      return "it";
    }
  });
  const t = translations[lang] || translations.it;

  const [showPasswordRecoveryModal, setShowPasswordRecoveryModal] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [recoveryLoading, setRecoveryLoading] = useState<boolean>(false);
  const [recoveryError, setRecoveryError] = useState<string | null>(null);
  const [recoverySuccessNotification, setRecoverySuccessNotification] = useState<string | null>(null);

  // Supabase Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession);
      if (event === "PASSWORD_RECOVERY") {
        setShowPasswordRecoveryModal(true);
      }
      if (!currentSession && viewMode === "studio") {
        setViewMode("landing");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [viewMode]);

  const navigateTo = (mode: "landing" | "studio" | "privacy") => {
    if (typeof window !== "undefined") {
      const targetPath = mode === "privacy" ? "/privacy" : "/";
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ mode }, "", targetPath);
      }
    }
    setViewMode(mode);
  };

  // Handle browser back/forward navigation for /privacy
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === "/privacy") {
        setViewMode("privacy");
      } else {
        setViewMode((prev) => (prev === "privacy" ? (session ? "studio" : "landing") : prev));
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [session]);

  const handleEnterStudio = () => {
    if (session) {
      navigateTo("studio");
    } else {
      setAuthModalTab("signin");
      setShowAuthModal(true);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Sign out error:", err);
    }
    setSession(null);
    navigateTo("landing");
    setFeedbackMessage({ type: "info", text: "Disconnessione effettuata con successo." });
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setRecoveryError(t.passwordTooShort || "La password deve contenere almeno 6 caratteri.");
      return;
    }

    setRecoveryLoading(true);
    setRecoveryError(null);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      setNewPassword("");
      setShowPasswordRecoveryModal(false);
      const successText = t.passwordUpdatedSuccess || "Password aggiornata con successo!";
      setRecoverySuccessNotification(successText);
      setFeedbackMessage({ type: "success", text: successText });
      setTimeout(() => {
        setRecoverySuccessNotification(null);
      }, 5000);
    } catch (err: any) {
      console.error("Password update error:", err);
      setRecoveryError(err.message || t.passwordUpdateError || "Errore durante l'aggiornamento della password.");
    } finally {
      setRecoveryLoading(false);
    }
  };

  // Settings & AI provider state
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const aiProvider = "openrouter";
  const [openrouterApiKey, setOpenrouterApiKey] = useState<string>("");
  const [openrouterModel, setOpenrouterModel] = useState<string>(() => {
    try {
      return localStorage.getItem("mockup_or_model") || "google/gemini-2.5-flash-image";
    } catch {
      return "google/gemini-2.5-flash-image";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("mockup_lang", lang);
    } catch {}
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem("mockup_or_model", openrouterModel);
    } catch {}
  }, [openrouterModel]);

  // Studio generator state
  const [userImage, setUserImage] = useState<string | null>(null);
  const [productType, setProductType] = useState<string>("t-shirt");
  const [productColor, setProductColor] = useState<string>("Nero Opaco / Antracite");
  const [environment, setEnvironment] = useState<string>("studio");
  const [modelType, setModelType] = useState<string>("unisex");
  const [placement, setPlacement] = useState<string>("Centrato sul petto");
  const [scale, setScale] = useState<number>(0.45);
  const [extraDetails, setExtraDetails] = useState<string>("");

  const [printEffect, setPrintEffect] = useState<string>("dtg");
  const [bgRemoval, setBgRemoval] = useState<string>("none");
  const [customText, setCustomText] = useState<string>("");
  const [textFont, setTextFont] = useState<string>("monospace");
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [textPosition, setTextPosition] = useState<string>("below");

  const [generatedMockups, setGeneratedMockups] = useState<Record<string, string>>({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [previewCanvasUrl, setPreviewCanvasUrl] = useState<string>("");
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [zipLoading, setZipLoading] = useState<boolean>(false);

  const [dynamicScenarios, setDynamicScenarios] = useState<Scenario[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<FeedbackMessage | null>(null);
  const [openShareMenuId, setOpenShareMenuId] = useState<string | null>(null);
  const [sharingId, setSharingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!openShareMenuId) return;
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest("[data-share-menu]")) {
        setOpenShareMenuId(null);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenShareMenuId(null);
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [openShareMenuId]);

  useEffect(() => {
    const selectedProd = PRODUCT_TYPES.find((p) => p.id === productType);
    const prodLabel = selectedProd?.label || "Prodotto";

    setDynamicScenarios([
      { id: "sc-1", label: `${prodLabel} - Vista Principale Store`, promptSuffix: `Standard direct retail listing shot showing the entire ${prodLabel} clearly.` },
      { id: "sc-2", label: `${prodLabel} - Angolo Lifestyle`, promptSuffix: `Lifestyle commercial image of the ${prodLabel} in daily use with beautiful background.` },
      { id: "sc-3", label: `${prodLabel} - Zoom Dettaglio Materiale`, promptSuffix: `Extreme macro close-up of the print design on the ${prodLabel}, showing hyper-realistic material texture.` },
      { id: "sc-4", label: `${prodLabel} - Variante Editoriale`, promptSuffix: `Creative, modern aesthetic photograph for an e-commerce shop banner or campaign.` }
    ]);
  }, [productType]);

  // Combined Canvas rendering pipeline
  const compositeAndOptimizeImage = (srcUrl: string, isFinalExport: boolean): Promise<string> => {
    return new Promise((resolve) => {
      if (!srcUrl) return resolve("");
      const img = new Image();
      if (!srcUrl.startsWith("data:")) {
        img.crossOrigin = "anonymous";
      }
      img.src = srcUrl;
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const SIZE = isFinalExport ? 768 : 200;
          canvas.width = SIZE;
          canvas.height = SIZE;
          const ctx = canvas.getContext("2d");
          if (!ctx) return resolve("");

          if (!isFinalExport) {
            const colorHex = COLORS.find((c) => c.label === productColor)?.hex || "#FAF6F0";
            ctx.fillStyle = colorHex;
            ctx.fillRect(0, 0, SIZE, SIZE);
          }
          // isFinalExport has transparent background (no fill)

          const imgWidth = img.width || 1;
          const imgHeight = img.height || 1;

          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = imgWidth;
          tempCanvas.height = imgHeight;
          const tempCtx = tempCanvas.getContext("2d");
          if (!tempCtx) return resolve("");
          tempCtx.drawImage(img, 0, 0);

          if (bgRemoval !== "none") {
            const imgData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
            const data = imgData.data;
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i], g = data[i + 1], b = data[i + 2];
              
              if (bgRemoval === "white" && r > 215 && g > 215 && b > 215) {
                data[i + 3] = 0;
                continue;
              }
              if (bgRemoval === "black" && r < 40 && g < 40 && b < 40) {
                data[i + 3] = 0;
                continue;
              }
              if (bgRemoval === "green" && g > 130 && g > r * 1.3 && g > b * 1.3) {
                data[i + 3] = 0;
                continue;
              }

              const avg = r * 0.299 + g * 0.587 + b * 0.114;
              if (bgRemoval === "grayscale") {
                data[i] = avg;
                data[i + 1] = avg;
                data[i + 2] = avg;
              } else if (bgRemoval === "invert") {
                data[i] = 255 - r;
                data[i + 1] = 255 - g;
                data[i + 2] = 255 - b;
              } else if (bgRemoval === "orange" || bgRemoval === "indigo") {
                const intensity = avg / 255;
                if (bgRemoval === "orange") {
                  data[i] = Math.round(241 * intensity);
                  data[i + 1] = Math.round(100 * intensity);
                  data[i + 2] = Math.round(30 * intensity);
                } else {
                  data[i] = Math.round(99 * intensity);
                  data[i + 1] = Math.round(102 * intensity);
                  data[i + 2] = Math.round(241 * intensity);
                }
              } else if (bgRemoval === "high-contrast") {
                const thresholdVal = avg > 127 ? 255 : 0;
                data[i] = thresholdVal;
                data[i + 1] = thresholdVal;
                data[i + 2] = thresholdVal;
              }
            }
            tempCtx.putImageData(imgData, 0, 0);
          }

          const baseRatio = Math.min(SIZE / imgWidth, SIZE / imgHeight);
          const w = imgWidth * baseRatio * scale;
          const h = imgHeight * baseRatio * scale;

          let x = (SIZE - w) / 2;
          let y = (SIZE - h) / 2;

          const getPlacementId = (pl: string): string => {
            const lower = pl.toLowerCase();
            if (lower.includes("sinistro") || lower.includes("sinistra") || lower.includes("left") || lower.includes("taschino")) return "pocket-left";
            if (lower.includes("destra") || lower.includes("right")) return "pocket-right";
            return "center";
          };

          const placementId = getPlacementId(placement);
          if (placementId === "pocket-left") {
            x = (SIZE - w) * 0.30;
            y = (SIZE - h) * 0.35;
          } else if (placementId === "pocket-right") {
            x = (SIZE - w) * 0.70;
            y = (SIZE - h) * 0.35;
          }

          ctx.drawImage(tempCanvas, x, y, w, h);

          if (customText) {
            ctx.fillStyle = textColor;
            ctx.font = `bold ${Math.max(10, Math.floor(SIZE * 0.06))}px ${textFont}`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            let textY = y + h + SIZE * 0.08;
            if (textPosition === "above") {
              textY = y - SIZE * 0.08;
            }
            ctx.fillText(customText.toUpperCase(), x + w / 2, textY);
          }

          let exported = canvas.toDataURL("image/png");
          // Keep payload well under Vercel's 4.5MB serverless body limit while keeping alpha transparency
          if (isFinalExport && exported.length > 2_200_000) {
            const webpData = canvas.toDataURL("image/webp", 0.9);
            if (webpData.startsWith("data:image/webp")) {
              exported = webpData;
            }
          }
          resolve(exported);
        } catch (error) {
          console.error("Canvas composite failed safely:", error);
          resolve("");
        }
      };
      img.onerror = () => {
        resolve("");
      };
    });
  };

  useEffect(() => {
    if (userImage) {
      compositeAndOptimizeImage(userImage, false).then((url) => setPreviewCanvasUrl(url));
    } else {
      setPreviewCanvasUrl("");
    }
  }, [userImage, productColor, scale, placement, bgRemoval, customText, textFont, textColor, textPosition]);

  const loadExampleImages = () => {
    const demoLogo = generatePlaceholderLogo("STUDIO PRO");
    setUserImage(demoLogo);
    setFeedbackMessage({ type: "success", text: "Logo di esempio caricato con successo!" });
  };

  const generateMockup = async (scenario: Scenario) => {
    if (!userImage || loadingStates[scenario.id]) return;

    // Check / retrieve session access token
    let accessToken = session?.access_token;
    if (!accessToken) {
      const { data: sessionData } = await supabase.auth.getSession();
      accessToken = sessionData.session?.access_token;
      if (sessionData.session) {
        setSession(sessionData.session);
      }
    }

    if (!accessToken) {
      setFeedbackMessage({
        type: "error",
        text: "Accesso richiesto: effettua il login per generare mockup."
      });
      setShowAuthModal(true);
      return;
    }

    setLoadingStates((prev) => ({ ...prev, [scenario.id]: true }));
    setFeedbackMessage(null);

    try {
      const compositeDataUrl = await compositeAndOptimizeImage(userImage, true);
      const mimeMatch = compositeDataUrl.match(/^data:(image\/[a-zA-Z+]+);base64,/);
      const exportMimeType = mimeMatch ? mimeMatch[1] : "image/png";
      const optimizedBase64 = compositeDataUrl.split(",")[1];

      if (!optimizedBase64) {
        throw new Error("Impossibile elaborare l'immagine caricata.");
      }

      const selectedProd = PRODUCT_TYPES.find((p) => p.id === productType);
      const selectedProdLabel = selectedProd?.label || "Prodotto";
      const selectedEnvLabel = ENVIRONMENTS.find((e) => e.id === environment)?.label || "Studio";
      const selectedModelLabel = MODEL_TYPES.find((m) => m.id === modelType)?.label || "Modello";

      const printEffectPrompts: Record<string, string> = {
        dtg: "The print on the product is flat classic high-quality screen print or modern direct-to-garment (DTG).",
        embroidery: "The design is physically rendered as luxury 3D embroidery with real stitch details and raised thread texture.",
        "gold-foil": "The print is gorgeous metallic gold foil with realistic shiny reflections and metal texture.",
        holographic: "The print is a modern holographic rainbow foil with shifting colors and metallic iridescent reflections.",
        embossed: "The design is debossed or embossed into the material, creating clean 3D physical indentations or protrusions on the surface with realistic shadows.",
        glitter: "The design features a high-density sparkling glitter texture that catches the light with small colorful shimmering grains.",
        "laser-carving": "The design is engraved, pyrographed, or carved onto high-quality rustic wood, glass or leather, creating beautiful rich details and burned texture with deep cuts.",
        sublimation: "The design is completely integrated using high-quality all-over dye sublimation print with rich, vibrant colors blended completely into the material.",
        neon: "The design is printed using high-visibility electric fluorescent neon ink that glows beautifully under blacklight or in semi-dark environments.",
        distressed: "The design features a distressed, retro cracked-ink vintage texture with washed-out color."
      };

      const promptText = `GENERATE A PREMIUM PROFESSIONAL E-COMMERCE PRODUCT MOCKUP.
PRODUCT CATEGORY: ${selectedProd?.category || "Goods"}.
PRODUCT DETAILS: A pristine ${selectedProdLabel} in the color/material "${productColor}".
SCENE STYLE: ${selectedEnvLabel}.
PRESENTATION: ${selectedModelLabel} showcasing the product beautifully. 
GRAPHIC MAPPING: The provided graphic is centered on the designated print area (${placement}). It is perfectly integrated into the surface, matching the contours, perspective, and lighting of the object.
PRINT EFFECT: ${printEffectPrompts[printEffect] || printEffectPrompts.dtg}
VARIANT DIRECTION: ${scenario.promptSuffix} ${extraDetails ? `Note: ${extraDetails}.` : ""}
TECHNICAL: Pure commercial aesthetic, highly detailed, perfect 1:1 square ratio (500x500 pixels), optimized for Shopify, Amazon, and online stores.`;

      const response = await fetch("/api/mockup/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          promptText,
          base64Image: optimizedBase64,
          mimeType: exportMimeType,
          provider: aiProvider,
          apiKey: openrouterApiKey,
          model: openrouterModel
        })
      });

      let errorText = "La chiamata API ha fallito";
      if (!response.ok) {
        if (response.status === 401) {
          try {
            const errorData = await response.json();
            errorText = errorData.error || "Non autorizzato (401). Effettua nuovamente l'accesso.";
          } catch {
            errorText = "Non autorizzato (401). Effettua nuovamente l'accesso.";
          }
          setShowAuthModal(true);
        } else if (response.status === 429) {
          try {
            const errorData = await response.json();
            errorText = errorData.error || t.dailyLimitReached;
          } catch {
            errorText = t.dailyLimitReached;
          }
        } else if (response.status === 404) {
          errorText = "Endpoint API non trovato (404). Verifica che le Serverless Functions in /api siano attive sul deploy.";
        } else if (response.status === 413) {
          errorText = "Immagine troppo pesante per il server (413). Prova con un file più leggero.";
        } else if (response.status === 504) {
          errorText = "Timeout del server (504). Il modello AI sta impiegando troppo tempo: riprova.";
        } else {
          try {
            const errorData = await response.json();
            errorText = errorData.error || errorText;
          } catch {
            try {
              const rawText = await response.text();
              if (rawText && !rawText.trim().startsWith("<")) {
                errorText = rawText;
              } else {
                errorText = `Errore HTTP ${response.status} dal server API.`;
              }
            } catch {}
          }
        }
        throw new Error(errorText);
      }

      let result: any;
      try {
        result = await response.json();
      } catch {
        throw new Error("Impossibile analizzare la risposta del server.");
      }

      if (result.success && result.image) {
        const finalUrl = `data:image/png;base64,${result.image}`;
        setGeneratedMockups((prev) => ({ ...prev, [scenario.id]: finalUrl }));

        setHistoryList((prev) => [
          {
            id: Date.now() + scenario.id,
            url: finalUrl,
            label: `${scenario.label} (${productColor})`,
            timestamp: new Date().toLocaleTimeString()
          },
          ...prev
        ].slice(0, 12));
        setFeedbackMessage({ type: "success", text: `Mockup "${scenario.label}" pronto!` });
      } else {
        throw new Error(result.error || "Impossibile estrarre l'immagine dal modello.");
      }
    } catch (err: any) {
      console.error("Errore generazione mockup:", err);
      setFeedbackMessage({
        type: "error",
        text: `Generazione fallita: ${err.message || "Errore di connessione"}`
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [scenario.id]: false }));
    }
  };

  const generateAllMockups = async () => {
    if (!userImage) return;
    setFeedbackMessage({ type: "info", text: "Generazione dei mockup avviata (2 alla volta per stabilità)..." });
    const concurrency = 2;
    for (let i = 0; i < dynamicScenarios.length; i += concurrency) {
      const batch = dynamicScenarios.slice(i, i + concurrency);
      await Promise.all(batch.map((s) => generateMockup(s)));
    }
  };

  const downloadAllAsZip = async () => {
    const activeMockups = Object.entries(generatedMockups);
    if (activeMockups.length === 0) return;
    setZipLoading(true);
    setFeedbackMessage({ type: "info", text: "Preparazione archivio ZIP in corso..." });

    try {
      const zip = new JSZip();
      activeMockups.forEach(([id, base64Url]) => {
        const parts = (base64Url as string).split(",");
        const base64Data = parts.length > 1 ? parts[1] : parts[0];
        zip.file(`mockup-${productType}-${id}.png`, base64Data, { base64: true });
      });

      const content = await zip.generateAsync({ type: "blob" });
      const blobUrl = URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `Mockup-Pack-${productType}-${Date.now()}.zip`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      setFeedbackMessage({ type: "success", text: "Pacchetto ZIP scaricato con successo!" });
    } catch (e: any) {
      console.error("Errore pacchetto ZIP:", e);
      setFeedbackMessage({ type: "error", text: "Impossibile creare l'archivio ZIP." });
    } finally {
      setZipLoading(false);
    }
  };

  const downloadImage = (url: string, id: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `Mockup-Pro-${productType}-${id}.png`;
    link.click();
  };

  const handleDownloadFormat = async (dataUrl: string, scenarioId: string, format: "png" | "jpg" | "pdf") => {
    setOpenShareMenuId(null);
    if (!dataUrl) return;

    if (format === "png") {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `Mockup-Pro-${productType}-${scenarioId}.png`;
      link.click();
    } else if (format === "jpg") {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = dataUrl;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width || 800;
        canvas.height = img.height || 800;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const jpgUrl = canvas.toDataURL("image/jpeg", 0.95);
        const link = document.createElement("a");
        link.href = jpgUrl;
        link.download = `Mockup-Pro-${productType}-${scenarioId}.jpg`;
        link.click();
      };
    } else if (format === "pdf") {
      try {
        const doc = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        doc.setFillColor(30, 22, 17);
        doc.rect(0, 0, 210, 30, "F");

        doc.setTextColor(255, 249, 245);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("MOCKUPSTUDIO PRO", 15, 15);

        doc.setFontSize(10);
        doc.setTextColor(241, 100, 30);
        doc.text("PRODUCTION SPECIFICATION SHEET // SCHEDA TECNICA DI PRODUZIONE", 15, 23);

        doc.setTextColor(60, 60, 60);
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Dettagli Produzione & Specifiche Tecniche", 15, 45);

        const selectedProd = PRODUCT_TYPES.find((p) => p.id === productType);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");

        let y = 55;
        const lineHeight = 7;

        const details = [
          `Data/Ora: ${new Date().toLocaleString()}`,
          `ID Mockup / Scenario: ${scenarioId}`,
          `Prodotto: ${selectedProd?.label || productType} (${selectedProd?.category || "Generale"})`,
          `Colore Base / Materiale: ${productColor}`,
          `Finitura di Stampa / Effetto: ${printEffect}`,
          `Posizionamento Grafica: ${placement}`,
          `Scala Grafica: ${Math.round(scale * 100)}%`,
          `Rimozione Sfondo: ${bgRemoval}`,
          customText ? `Testo Personalizzato: "${customText}" (${textFont}, ${textColor}, ${textPosition})` : null,
          extraDetails ? `Note Extra: ${extraDetails}` : null,
        ].filter(Boolean);

        details.forEach((line) => {
          doc.text(`• ${line}`, 15, y);
          y += lineHeight;
        });

        doc.setFont("helvetica", "bold");
        doc.text("Anteprima Render Fotorealistico:", 15, y + 5);

        try {
          doc.addImage(dataUrl, "PNG", 15, y + 10, 90, 90);
        } catch (e) {
          console.warn("Could not embed image into PDF:", e);
        }

        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("Generato con MockupStudio Pro • Documento ufficiale per uso produttivo e commerciale.", 15, 285);

        doc.save(`Scheda-Tecnica-${productType}-${scenarioId}.pdf`);
        setFeedbackMessage({ type: "success", text: "Scheda tecnica PDF generata con successo!" });
      } catch (err: any) {
        console.error("PDF generation error:", err);
        setFeedbackMessage({ type: "error", text: "Impossibile generare il PDF." });
      }
    }
  };

  const getOrCreateShareUrl = async (dataUrl: string, scenarioId: string = "mockup"): Promise<string> => {
    try {
      const blobRes = await fetch(dataUrl);
      const blob = await blobRes.blob();
      const filename = `Mockup-Pro-${productType}-${scenarioId}.png`;
      const file = new File([blob], filename, {
        type: blob.type || "image/png"
      });

      if (
        typeof navigator.share === "function" &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          title: `Mockup ${scenarioId}`,
          text: `Mockup — ${t.brandTitle}`,
          files: [file]
        });
      } else {
        downloadImage(dataUrl, scenarioId);
      }
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        downloadImage(dataUrl, scenarioId);
      }
    }
    return dataUrl;
  };

  const handleCopyShareLink = async (scenarioId: string) => {
    const scenario = dynamicScenarios.find((s) => s.id === scenarioId);
    if (scenario) {
      await handleNativeShare(scenario);
    } else {
      const dataUrl = generatedMockups[scenarioId];
      if (dataUrl) {
        await getOrCreateShareUrl(dataUrl, scenarioId);
      }
    }
  };

  const handleNativeShare = async (scenario: Scenario) => {
    const dataUrl = generatedMockups[scenario.id];
    if (!dataUrl) return;

    setSharingId(scenario.id);
    try {
      const blobRes = await fetch(dataUrl);
      const blob = await blobRes.blob();
      const filename = `Mockup-Pro-${productType}-${scenario.id}.png`;
      const file = new File([blob], filename, {
        type: blob.type || "image/png"
      });

      if (
        typeof navigator.share === "function" &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          title: scenario.label,
          text: `${scenario.label} — ${t.brandTitle}`,
          files: [file]
        });
      } else {
        downloadImage(dataUrl, scenario.id);
      }
      setOpenShareMenuId(null);
    } catch (err: any) {
      if (err?.name !== "AbortError") {
        console.warn("Share failed, downloading mockup:", err);
        downloadImage(dataUrl, scenario.id);
      }
    } finally {
      setSharingId(null);
    }
  };

  // Grouped products for dropdown separator
  const groupedProducts = PRODUCT_TYPES.reduce<Record<string, ProductType[]>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});

  const renderPasswordRecoveryModal = () => {
    if (!showPasswordRecoveryModal) return null;

    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="recovery-modal-title"
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowPasswordRecoveryModal(false);
            setRecoveryError(null);
            setNewPassword("");
          }
        }}
      >
        <div className="bg-white rounded-2xl max-w-sm w-full border border-stone-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={() => {
              setShowPasswordRecoveryModal(false);
              setRecoveryError(null);
              setNewPassword("");
            }}
            aria-label={t.close || "Chiudi"}
            className="absolute top-4 right-4 p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#FFF2EB] p-2.5 rounded-xl border border-orange-200 text-[#F1641E]">
              <Lock size={20} />
            </div>
            <div>
              <h2 id="recovery-modal-title" className="text-base font-bold text-stone-900 tracking-tight">
                {t.newPasswordTitle}
              </h2>
              <p className="text-xs text-stone-500">
                {t.newPasswordDesc}
              </p>
            </div>
          </div>

          {recoveryError && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-start gap-2">
              <Info size={15} className="text-rose-600 shrink-0 mt-0.5" />
              <span className="leading-snug">{recoveryError}</span>
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                {t.newPasswordTitle}
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t.newPasswordPlaceholder}
                  autoFocus
                  className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-800 focus:border-[#F1641E] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={recoveryLoading || newPassword.length < 6}
              className="w-full py-2.5 bg-[#F1641E] hover:bg-[#D44E13] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {recoveryLoading && <Loader2 size={14} className="animate-spin" />}
              {t.updatePasswordBtn}
            </button>
          </form>
        </div>
      </div>
    );
  };

  const renderRecoverySuccessToast = () => {
    if (!recoverySuccessNotification) return null;

    return (
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-200">
        <CheckCircle2 size={16} className="text-white" />
        <span>{recoverySuccessNotification}</span>
        <button
          onClick={() => setRecoverySuccessNotification(null)}
          className="ml-2 hover:opacity-80 cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>
    );
  };

  if (viewMode === "privacy") {
    return (
      <>
        <PrivacyPolicy
          lang={lang}
          onBack={() => navigateTo(session ? "studio" : "landing")}
          onEnterStudio={() => {
            if (session) {
              navigateTo("studio");
            } else {
              setAuthModalTab("signin");
              setShowAuthModal(true);
            }
          }}
          isLoggedIn={!!session}
        />
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          lang={lang}
          initialTab={authModalTab}
          onSuccess={() => {
            setShowAuthModal(false);
            navigateTo("studio");
          }}
          onOpenPrivacy={() => {
            setShowAuthModal(false);
            navigateTo("privacy");
          }}
        />
        {renderPasswordRecoveryModal()}
        {renderRecoverySuccessToast()}
      </>
    );
  }

  if (viewMode === "landing") {
    return (
      <>
        <LandingPage
          lang={lang}
          setLang={setLang}
          onEnterStudio={handleEnterStudio}
          onOpenSettings={() => setShowSettings(true)}
          session={session}
          onSignOut={handleSignOut}
          onOpenAuth={() => {
            setAuthModalTab("signin");
            setShowAuthModal(true);
          }}
          onOpenPrivacy={() => navigateTo("privacy")}
        />
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          lang={lang}
          initialTab={authModalTab}
          onSuccess={() => {
            setShowAuthModal(false);
            navigateTo("studio");
          }}
          onOpenPrivacy={() => {
            setShowAuthModal(false);
            navigateTo("privacy");
          }}
        />
        {renderPasswordRecoveryModal()}
        {renderRecoverySuccessToast()}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFAF7] p-4 md:p-8 font-sans text-stone-800">
      <div className="max-w-[1700px] mx-auto">
        
        {/* Top Bar / Navigation */}
        <header className="mb-6 bg-white p-5 md:p-6 rounded-2xl border border-stone-200 flex flex-col xl:flex-row xl:items-center justify-between gap-6 shadow-xs relative">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo("landing")}
              className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors flex items-center gap-2 text-xs font-bold cursor-pointer"
            >
              <ArrowLeft size={16} /> {t.navHome}
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-[#FFF2EB] p-3 rounded-xl">
                <ShoppingBag size={24} className="text-[#F1641E]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
                  {t.brandTitle} <span className="text-[#F1641E] font-extrabold">Studio</span>
                </h1>
                <p className="text-stone-500 text-[10px] tracking-wider uppercase font-semibold mt-0.5">
                  {t.aiEngine}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Language Selector */}
            <div className="relative flex items-center bg-stone-100 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-stone-700">
              <Globe size={13} className="text-stone-500 mr-1.5 shrink-0" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                aria-label="Seleziona lingua"
                className="bg-transparent text-stone-900 font-bold focus:outline-none cursor-pointer uppercase pr-2"
              >
                <option value="it" className="bg-white text-stone-900">IT</option>
                <option value="en" className="bg-white text-stone-900">EN</option>
                <option value="es" className="bg-white text-stone-900">ES</option>
                <option value="fr" className="bg-white text-stone-900">FR</option>
                <option value="de" className="bg-white text-stone-900">DE</option>
              </select>
            </div>

            <button
              onClick={() => setShowSettings(true)}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-stone-50 text-stone-700 border border-stone-200 hover:bg-stone-100 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Settings size={14} className="text-[#F1641E]" /> {t.settingsTitle}
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-stone-50 text-stone-700 border border-stone-200 hover:bg-stone-100 transition-all flex items-center gap-2 cursor-pointer"
            >
              <History size={14} className="text-[#F1641E]" /> {t.history} ({historyList.length})
            </button>
            <button
              onClick={loadExampleImages}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-white text-[#F1641E] border border-orange-200 hover:bg-[#FFF2EB] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles size={14} /> {t.loadExample}
            </button>
            <label className="cursor-pointer px-5 py-2.5 rounded-xl font-bold text-xs bg-[#F1641E] text-white hover:bg-[#D44E13] transition-all flex items-center gap-2 shadow-xs">
              <UploadCloud size={15} /> {t.uploadLogo}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const r = new FileReader();
                    r.onload = (f) => {
                      if (f.target?.result) {
                        setUserImage(f.target.result as string);
                        setFeedbackMessage({ type: "success", text: "Immagine caricata correttamente!" });
                      }
                    };
                    r.readAsDataURL(file);
                  }
                }}
                accept="image/*"
              />
            </label>
            {session && (
              <span className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 bg-stone-100 border border-stone-200 px-3 py-2 rounded-xl max-w-[170px] truncate" title={session.user?.email || ""}>
                <User size={13} className="text-[#F1641E] shrink-0" />
                <span className="truncate">{session.user?.email}</span>
              </span>
            )}
            <button
              onClick={handleSignOut}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-stone-100 text-stone-700 border border-stone-200 hover:bg-stone-200 transition-all flex items-center gap-1.5 cursor-pointer"
              title={t.signOut || "Esci"}
            >
              <LogOut size={14} className="text-stone-500" />
              <span>{t.signOut || "Esci"}</span>
            </button>
          </div>
        </header>

        {/* Feedback / Notifications */}
        <AnimatePresence>
          {feedbackMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-6 p-4 rounded-2xl border flex items-center justify-between gap-3 shadow-xs ${
                feedbackMessage.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : feedbackMessage.type === "error"
                  ? "bg-rose-50 border-rose-200 text-rose-800"
                  : "bg-orange-50 border-orange-200 text-orange-850"
              }`}
            >
              <div className="flex items-center gap-2.5 flex-wrap">
                <Info size={16} className="shrink-0 text-[#F1641E]" />
                <span className="text-xs font-medium">{feedbackMessage.text}</span>
                {(feedbackMessage.text.includes("Limite") || feedbackMessage.text === t.dailyLimitReached) && (
                  <button
                    onClick={() => setShowSettings(true)}
                    className="ml-2 px-3 py-1 bg-[#F1641E] hover:bg-[#D44E13] text-white text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    {t.settingsTitle}
                  </button>
                )}
              </div>
              <button
                onClick={() => setFeedbackMessage(null)}
                className="text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Studio Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Column: Configuration Panel */}
          <div className="lg:col-span-4 bg-white border border-stone-200 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-4 mb-5">
              <SlidersHorizontal size={16} className="text-[#F1641E]" />
              <h3 className="font-bold text-stone-900 text-sm tracking-wide">{t.configProduct}</h3>
            </div>

            {/* Preview Box */}
            {previewCanvasUrl && (
              <div className="mb-5 p-4 bg-stone-50 border border-stone-200 rounded-2xl flex flex-col items-center shadow-inner">
                <span className="text-[10px] font-bold text-[#F1641E] mb-2 tracking-wide">{t.previewPos}</span>
                <img
                  src={previewCanvasUrl}
                  alt="Compositing Preview"
                  referrerPolicy="no-referrer"
                  className="w-36 h-36 object-cover border border-stone-200 rounded-xl bg-white shadow-xs"
                />
              </div>
            )}

            {/* 1. Product Category */}
            <div className="mb-4">
              <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-1.5">{t.selectProduct}</label>
              <select
                value={productType}
                onChange={(e) => {
                  setProductType(e.target.value);
                  const availablePlacements = PRODUCT_TYPES.find((p) => p.id === e.target.value)?.placements || [];
                  if (availablePlacements.length > 0) setPlacement(availablePlacements[0]);
                }}
                className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:border-[#F1641E] focus:outline-none shadow-xs"
              >
                {Object.entries(groupedProducts).map(([category, items]) => (
                  <optgroup key={category} label={category.toUpperCase()} className="bg-white text-[#F1641E] font-bold">
                    {items.map((p) => (
                      <option key={p.id} value={p.id} className="text-stone-800 font-normal">
                        {p.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* 2. Color / Material */}
            <div className="mb-4">
              <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-1.5">{t.selectColor}</label>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c.label}
                    onClick={() => setProductColor(c.label)}
                    title={c.label}
                    className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                      productColor === c.label ? "border-[#F1641E] scale-110 shadow-xs" : "border-stone-200 hover:scale-105"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* 3. Print Effect / Finish */}
            <div className="mb-4">
              <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-1.5">{t.printFinish}</label>
              <select
                value={printEffect}
                onChange={(e) => setPrintEffect(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:border-[#F1641E] focus:outline-none"
              >
                {PRINT_EFFECTS.map((pe) => (
                  <option key={pe.id} value={pe.id}>
                    {pe.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Graphic Filter / Background Removal */}
            <div className="mb-4">
              <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-1.5">{t.graphicFilter}</label>
              <select
                value={bgRemoval}
                onChange={(e) => setBgRemoval(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:border-[#F1641E] focus:outline-none"
              >
                <option value="none">Nessuna modifica (Mantieni Sfondo)</option>
                <option value="white">Rendi Trasparente lo Sfondo Bianco</option>
                <option value="black">Rendi Trasparente lo Sfondo Nero</option>
                <option value="green">Rimuovi Sfondo Verde (Chroma Key)</option>
                <option value="grayscale">Converti in Scala di Grigi</option>
                <option value="invert">Inverti Colori (Negativo)</option>
                <option value="orange">Filtro Tonale Arancione Brand</option>
                <option value="high-contrast">Alto Contrasto Bianco/Nero</option>
              </select>
            </div>

            {/* 5. Custom Overlay Text */}
            <div className="mb-4 border border-stone-200 rounded-xl p-3 bg-stone-50/80">
              <div className="flex items-center gap-1.5 mb-2">
                <Type size={13} className="text-[#F1641E]" />
                <label className="text-[10px] uppercase font-bold tracking-wider text-stone-750">{t.customText}</label>
              </div>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="es. BRAND CO. 2026"
                className="w-full bg-white border border-stone-200 rounded-lg px-2 py-1.5 text-xs text-stone-800 focus:border-[#F1641E] focus:outline-none mb-2 font-mono"
              />
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div>
                  <span className="text-[8px] uppercase font-bold text-stone-500">Carattere</span>
                  <select
                    value={textFont}
                    onChange={(e) => setTextFont(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg p-1 text-[10px] text-stone-800"
                  >
                    <option value="monospace">Monospace</option>
                    <option value="sans-serif">Sans-Serif</option>
                    <option value="serif">Serif</option>
                  </select>
                </div>
                <div>
                  <span className="text-[8px] uppercase font-bold text-stone-500">Posizione</span>
                  <select
                    value={textPosition}
                    onChange={(e) => setTextPosition(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-lg p-1 text-[10px] text-stone-800"
                  >
                    <option value="below">Sotto Logo</option>
                    <option value="above">Sopra Logo</option>
                  </select>
                </div>
              </div>
              <div>
                <span className="text-[8px] uppercase font-bold text-stone-500 block mb-1">Colore Testo</span>
                <div className="flex gap-1.5">
                  {["#ffffff", "#000000", "#F1641E", "#475569"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setTextColor(c)}
                      className={`w-5 h-5 rounded-full border cursor-pointer ${
                        textColor === c ? "border-orange-600 ring-2 ring-orange-500/20 scale-110" : "border-stone-200"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 6. Graphic Placement */}
            <div className="mb-4">
              <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-1.5">{t.placement}</label>
              <select
                value={placement}
                onChange={(e) => setPlacement(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:border-[#F1641E] focus:outline-none"
              >
                {(PRODUCT_TYPES.find((p) => p.id === productType)?.placements || []).map((pl) => (
                  <option key={pl} value={pl}>
                    {pl}
                  </option>
                ))}
              </select>
            </div>

            {/* 7. Graphic Scale */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-stone-500">
                  {t.scale} ({Math.round(scale * 100)}%)
                </label>
                <Sliders size={11} className="text-[#F1641E]" />
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full accent-[#F1641E] bg-stone-200 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* 8. Model / Presentation */}
            <div className="mb-4">
              <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-1.5">{t.modelPose}</label>
              <select
                value={modelType}
                onChange={(e) => setModelType(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:border-[#F1641E] focus:outline-none"
              >
                {MODEL_TYPES.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 9. Environment */}
            <div className="mb-4">
              <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-1.5">{t.environment}</label>
              <select
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:border-[#F1641E] focus:outline-none"
              >
                {ENVIRONMENTS.map((env) => (
                  <option key={env.id} value={env.id}>
                    {env.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 10. Extra Prompt Instructions */}
            <div className="mb-1">
              <label className="block text-[10px] uppercase font-bold tracking-wider text-stone-500 mb-1.5">{t.extraPrompt}</label>
              <textarea
                value={extraDetails}
                onChange={(e) => setExtraDetails(e.target.value)}
                placeholder="es. 'illuminazione cinematografica, luce naturale da finestra laterale'..."
                className="w-full h-16 bg-white border border-stone-200 rounded-lg p-2 text-xs text-stone-800 focus:border-[#F1641E] focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Right Column: Generation Workspace */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Batch Action Toolbar */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 rounded-full bg-[#F1641E] animate-pulse" />
                <h4 className="text-[11px] font-bold uppercase text-stone-900 tracking-wide">Multi-Mockup Engine (AI Generator)</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={generateAllMockups}
                  disabled={!userImage || Object.values(loadingStates).some(Boolean)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide flex items-center gap-2 transition-all border cursor-pointer ${
                    userImage
                      ? "bg-[#F1641E] text-white border-transparent hover:bg-[#D44E13] shadow-sm"
                      : "bg-stone-50 border-stone-200 text-stone-400 cursor-not-allowed"
                  }`}
                >
                  <RefreshCw size={13} className={Object.values(loadingStates).some(Boolean) ? "animate-spin" : ""} /> {t.generateAll}
                </button>
                <button
                  onClick={downloadAllAsZip}
                  disabled={Object.keys(generatedMockups).length === 0 || zipLoading}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide flex items-center gap-2 transition-all border cursor-pointer ${
                    Object.keys(generatedMockups).length > 0
                      ? "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                      : "bg-stone-50 border-stone-200 text-stone-400 cursor-not-allowed"
                  }`}
                >
                  {zipLoading ? <Loader2 size={13} className="animate-spin" /> : <FolderArchive size={13} />} {t.downloadZip}
                </button>
              </div>
            </div>

            {/* Scenarios Grid */}
            {!userImage ? (
              <div className="py-24 text-center bg-white rounded-2xl border-2 border-dashed border-stone-200 flex flex-col items-center shadow-xs">
                <div className="w-14 h-14 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center mb-4">
                  <UploadCloud size={24} className="text-[#F1641E]" />
                </div>
                <h2 className="text-stone-900 font-bold tracking-tight text-sm mb-1">{t.uploadLogo}</h2>
                <p className="text-stone-400 text-[10px] uppercase tracking-wider">Trascina un file oppure usa il pulsante Carica Esempio</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {dynamicScenarios.map((scenario) => (
                  <div
                    key={scenario.id}
                    className="bg-white rounded-2xl border border-stone-200 group shadow-xs flex flex-col hover:border-orange-400/40 transition-all duration-300"
                  >
                    <div className="aspect-square bg-stone-50 rounded-t-2xl flex items-center justify-center relative overflow-hidden">
                      {loadingStates[scenario.id] ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 size={28} className="animate-spin text-[#F1641E]" />
                          <span className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Generazione in corso...</span>
                        </div>
                      ) : generatedMockups[scenario.id] ? (
                        <img
                          src={generatedMockups[scenario.id]}
                          alt={scenario.label}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-center p-6">
                          <ImageIcon size={32} className="text-stone-300 mx-auto mb-2" />
                          <p className="text-xs text-stone-500 font-medium">{scenario.label}</p>
                          <p className="text-[10px] text-stone-400 mt-1">Pronto per il render IA</p>
                        </div>
                      )}
                    </div>
                    <div className="p-4 rounded-b-2xl flex items-center justify-between gap-2 border-t border-stone-100 bg-white">
                      <div className="min-w-0">
                        <h5 className="font-bold text-xs text-stone-900 truncate">{scenario.label}</h5>
                        <p className="text-[10px] text-stone-500 mt-0.5 truncate">{productColor}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {generatedMockups[scenario.id] && (
                          <>
                            <button
                              onClick={() => downloadImage(generatedMockups[scenario.id], scenario.id)}
                              className="p-2 rounded-xl bg-stone-50 hover:bg-[#FFF2EB] text-stone-700 hover:text-[#F1641E] border border-stone-200 transition-colors cursor-pointer"
                              title="Scarica Immagine"
                            >
                              <Download size={14} />
                            </button>
                            <div className="relative" data-share-menu>
                              <button
                                type="button"
                                onClick={() =>
                                  setOpenShareMenuId((prev) => (prev === scenario.id ? null : scenario.id))
                                }
                                disabled={sharingId === scenario.id}
                                aria-expanded={openShareMenuId === scenario.id}
                                aria-haspopup="menu"
                                title={t.shareBtn}
                                className={`px-2.5 py-2 rounded-xl border text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ${
                                  openShareMenuId === scenario.id
                                    ? "bg-[#FFF2EB] text-[#F1641E] border-orange-200"
                                    : "bg-stone-50 hover:bg-[#FFF2EB] text-stone-700 hover:text-[#F1641E] border-stone-200"
                                }`}
                              >
                                {sharingId === scenario.id ? (
                                  <Loader2 size={13} className="animate-spin" />
                                ) : (
                                  <Share2 size={13} />
                                )}
                                <span>{t.shareBtn}</span>
                              </button>

                              {openShareMenuId === scenario.id && (
                                <div
                                  role="menu"
                                  className="absolute bottom-full right-0 mb-2 w-64 bg-white border border-stone-200 rounded-xl shadow-lg p-1.5 z-30 flex flex-col gap-1"
                                >
                                  <button
                                    type="button"
                                    role="menuitem"
                                    onClick={() => handleNativeShare(scenario)}
                                    className="w-full px-3 py-2 rounded-lg text-left text-xs font-semibold text-stone-700 hover:bg-[#FFF2EB] hover:text-[#F1641E] transition-colors flex items-center gap-2 cursor-pointer"
                                  >
                                    <Share2 size={14} className="shrink-0" />
                                    <span>{t.nativeShare}</span>
                                  </button>
                                  <div className="border-t border-stone-100 my-1 pt-1">
                                    <button
                                      type="button"
                                      role="menuitem"
                                      onClick={() => handleDownloadFormat(generatedMockups[scenario.id], scenario.id, "png")}
                                      className="w-full px-3 py-2 rounded-lg text-left text-xs font-semibold text-stone-700 hover:bg-[#FFF2EB] hover:text-[#F1641E] transition-colors flex items-center gap-2 cursor-pointer"
                                    >
                                      <Download size={14} className="shrink-0 text-emerald-600" />
                                      <span>{t.downloadPng || "Scarica PNG"}</span>
                                    </button>
                                    <button
                                      type="button"
                                      role="menuitem"
                                      onClick={() => handleDownloadFormat(generatedMockups[scenario.id], scenario.id, "jpg")}
                                      className="w-full px-3 py-2 rounded-lg text-left text-xs font-semibold text-stone-700 hover:bg-[#FFF2EB] hover:text-[#F1641E] transition-colors flex items-center gap-2 cursor-pointer"
                                    >
                                      <Download size={14} className="shrink-0 text-blue-600" />
                                      <span>{t.downloadJpg || "Scarica JPG"}</span>
                                    </button>
                                    <button
                                      type="button"
                                      role="menuitem"
                                      onClick={() => handleDownloadFormat(generatedMockups[scenario.id], scenario.id, "pdf")}
                                      className="w-full px-3 py-2 rounded-lg text-left text-xs font-semibold text-stone-700 hover:bg-[#FFF2EB] hover:text-[#F1641E] transition-colors flex items-center gap-2 cursor-pointer border-t border-stone-100 mt-1 pt-2"
                                    >
                                      <FileText size={14} className="shrink-0 text-[#F1641E]" />
                                      <span>{t.downloadPdf || "Scarica Scheda Tecnica (PDF)"}</span>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                        <button
                          onClick={() => generateMockup(scenario)}
                          disabled={loadingStates[scenario.id]}
                          className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                        >
                          <Sparkles size={12} className="text-orange-400" />
                          {generatedMockups[scenario.id] ? "Rigenera" : "Genera"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* History Drawer Modal */}
        {showHistory && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex justify-end">
            <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <History size={18} className="text-[#F1641E]" />
                  <h3 className="font-bold text-stone-900 text-sm">{t.history} ({historyList.length})</h3>
                </div>
                <button onClick={() => setShowHistory(false)} className="text-stone-400 hover:text-stone-600 cursor-pointer">
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {historyList.length === 0 ? (
                  <p className="text-xs text-stone-400 text-center py-12">Nessun mockup nello storico.</p>
                ) : (
                  historyList.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-stone-50 border border-stone-200 rounded-xl">
                      <img src={item.url} alt="History thumb" className="w-14 h-14 object-cover rounded-lg border border-stone-200" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-stone-900 truncate">{item.label}</p>
                        <p className="text-[10px] text-stone-500 mt-0.5">{item.timestamp}</p>
                      </div>
                      <button
                        onClick={() => downloadImage(item.url, item.id)}
                        className="p-2 bg-white border border-stone-200 rounded-lg hover:bg-stone-100 text-stone-700 cursor-pointer"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 border border-stone-200">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-5">
                <div className="flex items-center gap-2">
                  <Settings size={18} className="text-[#F1641E]" />
                  <h3 className="font-bold text-stone-900 text-sm">{t.settingsTitle}</h3>
                </div>
                <button onClick={() => setShowSettings(false)} className="text-stone-400 hover:text-stone-600 cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-stone-600 mb-2 leading-relaxed">
                    {t.openrouterNotice}{" "}
                    <a
                      href="https://openrouter.ai/keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F1641E] font-bold underline hover:text-[#D44E13]"
                    >
                      openrouter.ai/keys
                    </a>
                  </p>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">{t.openrouterKey}</label>
                  <input
                    type="password"
                    value={openrouterApiKey}
                    onChange={(e) => setOpenrouterApiKey(e.target.value)}
                    placeholder="sk-or-v1-..."
                    className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:border-[#F1641E] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">Modello OpenRouter</label>
                  <input
                    type="text"
                    value={openrouterModel}
                    onChange={(e) => setOpenrouterModel(e.target.value)}
                    placeholder="google/gemini-2.5-flash-image"
                    className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs text-stone-800 focus:border-[#F1641E] focus:outline-none"
                  />
                </div>
                <div className="mt-4 p-3 bg-stone-50 border border-stone-200 rounded-xl text-[11px] text-stone-600 space-y-1">
                  <p className="font-semibold text-stone-800 flex items-center gap-1.5">
                    <Info size={13} className="text-[#F1641E]" />
                    <span>Informativa Privacy & AI Provider</span>
                  </p>
                  <p className="leading-relaxed">
                    Le immagini e i prompt vengono elaborati in tempo reale tramite OpenRouter conformemente al GDPR. Nessun dato viene ceduto a terzi. Leggi la{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setShowSettings(false);
                        navigateTo("privacy");
                      }}
                      className="text-[#F1641E] underline font-bold cursor-pointer hover:text-[#D44E13]"
                    >
                      Informativa sulla Privacy completa
                    </button>
                    .
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-5 py-2.5 bg-[#F1641E] hover:bg-[#D44E13] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  {t.unlimitedKeyBtn}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Studio Footer */}
        <footer className="mt-12 py-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {t.brandTitle}. {t.footerText}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigateTo("privacy")}
              className="text-stone-600 hover:text-stone-900 font-semibold underline transition-colors cursor-pointer"
            >
              {t.privacyTitle || "Informativa sulla Privacy"}
            </button>
          </div>
        </footer>

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          lang={lang}
          initialTab={authModalTab}
          onSuccess={() => {
            setShowAuthModal(false);
          }}
          onOpenPrivacy={() => {
            setShowAuthModal(false);
            navigateTo("privacy");
          }}
        />

        {renderPasswordRecoveryModal()}
        {renderRecoverySuccessToast()}

      </div>
    </div>
  );
}
