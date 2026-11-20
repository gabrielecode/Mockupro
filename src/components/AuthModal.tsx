import React, { useState } from "react";
import { X, Mail, Lock, Loader2, ArrowLeft, CheckCircle2, AlertCircle, ShoppingBag, Info } from "lucide-react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { translations } from "../translations";
import { LEGAL_CONFIG } from "../config/legal";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: string;
  initialTab?: "signin" | "signup";
  onSuccess?: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  lang = "it",
  initialTab = "signin",
  onSuccess,
  onOpenPrivacy,
  onOpenTerms
}) => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">(initialTab);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false); // NON preselezionata
  const [marketingConsent, setMarketingConsent] = useState<boolean>(false); // NON preselezionata
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);
  const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const t = translations[lang] || translations.it;

  const resetFormState = () => {
    setErrorMsg(null);
    setResetSuccess(false);
    setSignUpSuccess(false);
    setLoading(false);
  };

  const handleTabChange = (tab: "signin" | "signup") => {
    setActiveTab(tab);
    setIsForgotPassword(false);
    resetFormState();
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMsg("Compila tutti i campi obbligatori.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        onSuccess?.();
        onClose();
      }
    } catch (err: any) {
      console.error("Sign in error:", err);
      setErrorMsg(err.message || "Errore durante l'accesso. Verifica le credenziali inserite.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setErrorMsg("Compila tutti i campi obbligatori.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("La password deve contenere almeno 6 caratteri.");
      return;
    }

    if (!termsAccepted) {
      setErrorMsg(
        t.termsRequiredError ||
          "Per registrarti devi accettare i Termini e Condizioni dopo aver preso visione della Privacy Policy."
      );
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const nowIso = new Date().toISOString();
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            marketing_consent: marketingConsent,
            marketing_consent_updated_at: nowIso,
            privacy_policy_version: LEGAL_CONFIG.privacyVersion,
            privacy_acknowledged_at: nowIso,
            terms_version: LEGAL_CONFIG.termsVersion,
            terms_accepted_at: nowIso
          }
        }
      });

      if (error) {
        throw error;
      }

      setSignUpSuccess(true);
    } catch (err: any) {
      console.error("Sign up error:", err);
      setErrorMsg(err.message || "Errore durante la registrazione. Riprova con un'altra email.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg("Inserisci l'indirizzo email associato al tuo account.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: window.location.origin
      });

      if (error) {
        throw error;
      }

      setResetSuccess(true);
    } catch (err: any) {
      console.error("Reset password error:", err);
      setErrorMsg(err.message || "Impossibile inviare l'email di recupero.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl max-w-md w-full border border-stone-200 shadow-2xl p-6 sm:p-8 relative my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label={t.close || "Chiudi"}
          className="absolute top-5 right-5 p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#FFF2EB] p-2.5 rounded-xl border border-orange-200">
            <ShoppingBag size={22} className="text-[#F1641E]" />
          </div>
          <div>
            <h2 id="auth-modal-title" className="text-lg font-bold text-stone-900 tracking-tight">
              {t.brandTitle} <span className="text-[#F1641E]">Studio</span>
            </h2>
            <p className="text-xs text-stone-500">
              {t.authRequiredNotice}
            </p>
          </div>
        </div>

        {/* Supabase unconfigured warning hint if variables are missing */}
        {!isSupabaseConfigured && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-850 text-xs flex items-start gap-2">
            <Info size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900">Configurazione Supabase</p>
              <p className="text-[11px] text-amber-800 mt-0.5">
                {t.configSupabaseNotice}
              </p>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-start gap-2">
            <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMsg}</span>
          </div>
        )}

        {/* Sign Up Success View: "Controlla la tua email per confermare" */}
        {signUpSuccess ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={30} />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-stone-900">
                {t.signUpSuccessTitle}
              </h3>
              <p className="text-sm font-semibold text-[#F1641E]">
                {t.signUpSuccessDesc}
              </p>
              <p className="text-xs text-stone-500 max-w-xs mx-auto pt-1">
                Ti abbiamo inviato un link di conferma a <strong>{email}</strong>. Clicca sul link per attivare il tuo profilo.
              </p>
            </div>
            <div className="pt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setSignUpSuccess(false);
                  setActiveTab("signin");
                }}
                className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                {t.tabSignIn}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                {t.close || "Chiudi"}
              </button>
            </div>
          </div>
        ) : isForgotPassword ? (
          /* Forgot Password View */
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  resetFormState();
                }}
                className="p-1 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
              >
                <ArrowLeft size={16} />
              </button>
              <h3 className="text-sm font-bold text-stone-900">
                {t.resetPasswordTitle}
              </h3>
            </div>
            <p className="text-xs text-stone-600">
              {t.resetPasswordDesc}
            </p>

            {resetSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle2 size={24} className="text-emerald-600 mx-auto" />
                <p className="text-xs font-medium text-emerald-800">
                  {t.resetLinkSent}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(false);
                    resetFormState();
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  {t.backToSignIn}
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {t.emailLabel}
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-800 focus:border-[#F1641E] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#F1641E] hover:bg-[#D44E13] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {loading && <Loader2 size={14} className="animate-spin" />}
                  {t.sendResetLink}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(false);
                      resetFormState();
                    }}
                    className="text-xs text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                  >
                    {t.backToSignIn}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Main Tabs: Accedi / Registrati */
          <div className="space-y-5">
            {/* Tab Switcher */}
            <div className="flex bg-stone-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => handleTabChange("signin")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === "signin"
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                {t.tabSignIn}
              </button>
              <button
                type="button"
                onClick={() => handleTabChange("signup")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === "signup"
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                {t.tabSignUp}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={activeTab === "signin" ? handleSignIn : handleSignUp} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t.emailLabel}
                </label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-800 focus:border-[#F1641E] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-stone-700">
                    {t.passwordLabel}
                  </label>
                  {activeTab === "signin" && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotPassword(true);
                        resetFormState();
                      }}
                      className="text-[11px] text-[#F1641E] hover:underline cursor-pointer font-medium"
                    >
                      {t.forgotPassword}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-800 focus:border-[#F1641E] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Sign Up Exclusive: Explicit checkboxes (never pre-checked) & links to /privacy and /terms */}
              {activeTab === "signup" && (
                <div className="space-y-3 pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-stone-300 text-[#F1641E] accent-[#F1641E] focus:ring-[#F1641E] cursor-pointer shrink-0"
                    />
                    <span className="text-xs text-stone-700 leading-snug">
                      {t.privacyTextBefore}{" "}
                      <a
                        href="/privacy"
                        onClick={(e) => {
                          if (onOpenPrivacy) {
                            e.preventDefault();
                            onOpenPrivacy();
                          }
                        }}
                        className="text-[#F1641E] underline hover:text-[#D44E13] font-semibold"
                      >
                        {t.privacyLink}
                      </a>{" "}
                      {t.termsAndWord || "e accetto i"}{" "}
                      <a
                        href="/terms"
                        onClick={(e) => {
                          if (onOpenTerms) {
                            e.preventDefault();
                            onOpenTerms();
                          }
                        }}
                        className="text-[#F1641E] underline hover:text-[#D44E13] font-semibold"
                      >
                        {t.termsLink || "Termini e Condizioni"}
                      </a>
                      . <span className="text-rose-600">*</span>
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer select-none pt-1 border-t border-stone-100">
                    <input
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-stone-300 text-[#F1641E] accent-[#F1641E] focus:ring-[#F1641E] cursor-pointer shrink-0"
                    />
                    <span className="text-xs text-stone-600 leading-snug">
                      {t.marketingConsent}
                    </span>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 bg-[#F1641E] hover:bg-[#D44E13] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {loading && <Loader2 size={14} className="animate-spin" />}
                {activeTab === "signin" ? t.signInBtn : t.signUpBtn}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
