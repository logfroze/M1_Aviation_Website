"use client";

import React, { useState, useRef } from "react";
import M1Logo from "@/components/ui/M1Logo";
import { playSolidDockSound } from "@/lib/audio";

export default function MarketplaceAuthTerminal() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

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
            className="absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-all hover:scale-105 cursor-pointer"
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

        {/* ── Right Pane: Direct Terminal Gateway ── */}
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

          {/* Center Call-to-Action */}
          <div className="my-auto py-8 text-center sm:text-left space-y-6">
            <div className="space-y-2">
              <div className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                Institutional Terminal
              </div>
              <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                M1 Marketplace Terminal
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Connect directly to our sovereign airframe exchange to browse verified fleet inventory, initiate acquisition mandates, and access real-time valuation telemetry.
              </p>
            </div>

            {/* Terminal Specs / Highlights */}
            <div className="space-y-2.5 pt-1 pb-1 font-mono text-[11px] text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Verified Principal & Operator Directory</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Live SAIOS Telemetry & Flight Logs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Direct Multi-Currency Escrow Settlement</span>
              </div>
            </div>

            {/* Direct Enter Marketplace Button */}
            <div className="pt-2">
              <a
                href="https://app.m-1.tech"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSolidDockSound(2)}
                className="w-full py-4 px-6 rounded -skew-x-6 bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] active:scale-[0.99] cursor-pointer group"
              >
                <span className="skew-x-6 flex items-center gap-2.5">
                  <span>Enter Marketplace</span>
                  <span className="text-base transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </span>
              </a>

              <p className="text-center font-mono text-[10px] text-zinc-500 mt-3">
                Secure gateway • Redirects to app.m-1.tech
              </p>
            </div>
          </div>

          {/* Bottom Security Footer */}
          <div className="pt-4 border-t border-white/10 text-center font-mono text-[10px] text-zinc-400">
            Account registration and single sign-on authentication are handled securely on the official terminal.
          </div>
        </div>
      </div>
    </section>
  );
}
