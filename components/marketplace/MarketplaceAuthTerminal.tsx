"use client";

import React, { useState, useRef } from "react";
import M1Logo from "@/components/ui/M1Logo";
import { playSolidDockSound } from "@/lib/audio";

interface StepField {
  label: string;
  placeholder: string;
  type?: string;
  skippable?: boolean;
  options?: string[];
}

const REGISTRATION_STEPS: StepField[] = [
  {
    label: "1. What's your full name?",
    placeholder: "e.g. John Carter",
    type: "text",
  },
  {
    label: "2. Company or organisation?",
    placeholder: "Company name (or Private Principal)",
    type: "text",
    skippable: true,
  },
  {
    label: "3. Your email address?",
    placeholder: "you@business.com",
    type: "email",
  },
  {
    label: "4. Phone number?",
    placeholder: "+1 (555) 000-0000",
    type: "tel",
  },
  {
    label: "5. Where are you based?",
    placeholder: "Select country / territory",
    type: "select",
    options: [
      "United States",
      "United Kingdom",
      "Switzerland",
      "United Arab Emirates",
      "Singapore",
      "Monaco",
      "Germany",
      "France",
      "Saudi Arabia",
      "Canada",
      "Australia",
      "Other Sovereign Jurisdiction",
    ],
  },
  {
    label: "6. How many assets do you own or operate?",
    placeholder: "Select fleet size",
    type: "select",
    options: ["1-2", "3-5", "6-10", "11-20", "21-50", "50+"],
  },
  {
    label: "7. Primary reason for joining?",
    placeholder: "Select acquisition mandate",
    type: "select",
    options: ["Marketplace (Acquisition / Divestment)", "Management (SAIOS Operations)", "Both"],
  },
];

export default function MarketplaceAuthTerminal() {
  const [tab, setTab] = useState<"access" | "register">("register");
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    country: "United States",
    assets: "1-2",
    reason: "Marketplace (Acquisition / Divestment)",
    accessEmail: "",
    accessPassword: "",
  });
  const [isMuted, setIsMuted] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    playSolidDockSound(2);
    if (stepIndex < REGISTRATION_STEPS.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      setIsSubmitted(true);
      playSolidDockSound(3);
    }
  };

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSolidDockSound(3);
    setIsSubmitted(true);
  };

  const currentStep = REGISTRATION_STEPS[stepIndex];

  return (
    <section id="signup" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 flex flex-col items-center bg-black overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-slate-800/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Header Tag */}
      <div className="text-center mb-10 space-y-3 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-800 bg-zinc-950 text-[10px] font-mono tracking-[0.25em] text-zinc-400 uppercase">
          Institutional Gateway
        </div>
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
          Enter The Marketplace
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
          Private verified airframe exchange terminal. Authorized buyers, family offices, and certified operators only.
        </p>
      </div>

      {/* ── Main Dual-Pane Modal Terminal (Authentic app.m-1.tech Layout) ── */}
      <div className="relative z-10 w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-white/15 bg-[#121419] shadow-[0_30px_90px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* ── Left Pane: Historical Aviation Footage Video ── */}
        <div className="relative min-h-[300px] md:min-h-[520px] bg-black overflow-hidden flex flex-col justify-end p-6 border-b md:border-b-0 md:border-r border-white/10">
          <video
            ref={videoRef}
            src="/videos/auth-preview.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          {/* Subtle Contrast Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

          {/* Audio Mute/Unmute Toggle */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-all hover:scale-105"
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        </div>

        {/* ── Right Pane: Authentic Terminal Form ── */}
        <div className="relative p-6 sm:p-10 flex flex-col justify-between bg-[#15181f]">
          {/* Top Status Bar & M1 Brand */}
          <div className="flex items-center justify-between">
            <div className="opacity-0 pointer-events-none">spacer</div>
            <div className="flex justify-center -ml-6">
              <M1Logo width={68} height={20} className="h-5 w-auto" />
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span>SECURE SESSION</span>
            </div>
          </div>

          {/* Mode Switcher Tabs (Access / Register) */}
          <div className="grid grid-cols-2 gap-2 mt-6 p-1 rounded-lg bg-black/40 border border-white/10 font-mono text-xs">
            <button
              onClick={() => {
                setTab("access");
                playSolidDockSound(1);
              }}
              className={`py-2 rounded-md transition-all text-center tracking-wider ${
                tab === "access"
                  ? "bg-zinc-800 text-white font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Access
            </button>
            <button
              onClick={() => {
                setTab("register");
                playSolidDockSound(1);
              }}
              className={`py-2 rounded-md transition-all text-center tracking-wider ${
                tab === "register"
                  ? "bg-zinc-800 text-white font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Register
            </button>
          </div>

          {/* Success Notification State */}
          {isSubmitted ? (
            <div className="my-auto py-10 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                ✓
              </div>
              <h3 className="text-xl font-light text-white tracking-tight">
                Mandate Initialized
              </h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                Your cryptographic session key has been dispatched. An M1 aviation sovereign liaison will contact you within 2 business hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setStepIndex(0);
                }}
                className="text-[11px] font-mono text-zinc-400 underline hover:text-white uppercase tracking-wider"
              >
                Restart Session
              </button>
            </div>
          ) : tab === "register" ? (
            /* ── REGISTER FLOW (7 Progressive Step Questions) ── */
            <div className="mt-6 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-base font-semibold text-white tracking-tight">
                  CREATE ACCOUNT
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Quick sign up or register manually below
                </p>

                {/* Google Sign Up Button */}
                <button
                  type="button"
                  onClick={() => handleNextStep()}
                  className="mt-4 w-full py-2.5 px-4 bg-white text-black font-semibold text-xs rounded flex items-center justify-center gap-2.5 shadow hover:bg-zinc-200 transition-all -skew-x-6 group"
                >
                  <span className="skew-x-6 flex items-center gap-2.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>Sign up with Google</span>
                  </span>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                    OR FILL IN DETAILS
                  </span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* 7 Segmented Step Progress Bar */}
                <div className="grid grid-cols-7 gap-1.5 mb-6">
                  {REGISTRATION_STEPS.map((_, idx) => (
                    <div
                      key={`step-dash-${idx}`}
                      className={`h-1 rounded-full transition-all ${
                        idx === stepIndex
                          ? "bg-white shadow-[0_0_8px_#ffffff]"
                          : idx < stepIndex
                          ? "bg-zinc-500"
                          : "bg-zinc-800"
                      }`}
                    />
                  ))}
                </div>

                {/* Dynamic Step Question */}
                <form onSubmit={handleNextStep} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-300 mb-2">
                      {currentStep.label}
                    </label>

                    {currentStep.type === "select" && currentStep.options ? (
                      <select
                        value={formData[currentStep.placeholder] || currentStep.options[0]}
                        onChange={(e) =>
                          setFormData({ ...formData, [currentStep.placeholder]: e.target.value })
                        }
                        className="w-full bg-black/60 border border-white/20 rounded-md py-2.5 px-3 text-xs text-white focus:outline-none focus:border-white transition-all font-mono"
                      >
                        {currentStep.options.map((opt) => (
                          <option key={opt} value={opt} className="bg-zinc-900 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={currentStep.type || "text"}
                        placeholder={currentStep.placeholder}
                        value={formData[currentStep.placeholder] || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, [currentStep.placeholder]: e.target.value })
                        }
                        className="w-full border-b border-white/20 focus:border-white bg-transparent py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-all font-mono tracking-wide"
                      />
                    )}
                  </div>

                  {/* Continue Button with Diagonal Carbon Hatching */}
                  <button
                    type="submit"
                    className="w-full mt-6 py-3 px-6 rounded -skew-x-6 border border-white/30 text-white font-mono text-xs uppercase tracking-widest transition-all hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.06),rgba(255,255,255,0.06)_8px,transparent_8px,transparent_16px)] active:scale-[0.99]"
                  >
                    <span className="skew-x-6 inline-block font-bold">
                      {stepIndex === REGISTRATION_STEPS.length - 1 ? "INITIALIZE MANDATE ✓" : "CONTINUE →"}
                    </span>
                  </button>
                </form>
              </div>

              {/* Bottom Switch to Sign In */}
              <div className="pt-4 border-t border-white/10 text-center font-mono text-[11px] text-zinc-400">
                Have an account?{" "}
                <button
                  type="button"
                  onClick={() => setTab("access")}
                  className="text-white underline hover:text-zinc-300 ml-1"
                >
                  Sign in
                </button>
              </div>
            </div>
          ) : (
            /* ── ACCESS FLOW (Sign In) ── */
            <form onSubmit={handleAccessSubmit} className="mt-6 flex-1 flex flex-col justify-between space-y-6">
              <div>
                <button
                  type="button"
                  onClick={handleAccessSubmit}
                  className="w-full py-2.5 px-4 bg-white text-black font-semibold text-xs rounded flex items-center justify-center gap-2.5 shadow hover:bg-zinc-200 transition-all -skew-x-6"
                >
                  <span className="skew-x-6 flex items-center gap-2.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </span>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                    OR
                  </span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="youremail.com"
                      value={formData.accessEmail}
                      onChange={(e) => setFormData({ ...formData, accessEmail: e.target.value })}
                      className="w-full border-b border-white/20 focus:border-white bg-transparent py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-all font-mono tracking-wide"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                        PASSWORD
                      </label>
                      <button
                        type="button"
                        onClick={() => alert("Password recovery link sent to your registered institutional address.")}
                        className="text-[10px] font-mono text-zinc-400 hover:text-white transition-all uppercase"
                      >
                        FORGOT CREDENTIALS
                      </button>
                    </div>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={formData.accessPassword}
                      onChange={(e) => setFormData({ ...formData, accessPassword: e.target.value })}
                      className="w-full border-b border-white/20 focus:border-white bg-transparent py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none transition-all font-mono tracking-wide"
                    />
                  </div>
                </div>

                {/* Authenticate Button */}
                <button
                  type="submit"
                  className="w-full mt-7 py-3 px-6 rounded -skew-x-6 border border-white/30 text-white font-mono text-xs uppercase tracking-widest transition-all hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.06),rgba(255,255,255,0.06)_8px,transparent_8px,transparent_16px)] active:scale-[0.99]"
                >
                  <span className="skew-x-6 inline-block font-bold">
                    AUTHENTICATE
                  </span>
                </button>
              </div>

              {/* Bottom Switch to Register */}
              <div className="pt-4 border-t border-white/10 text-center font-mono text-[11px] text-zinc-400">
                New here?{" "}
                <button
                  type="button"
                  onClick={() => setTab("register")}
                  className="text-white underline hover:text-zinc-300 ml-1"
                >
                  Create account
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
