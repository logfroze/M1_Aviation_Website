"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import PlayYourRoleCTA from "@/components/ui/PlayYourRoleCTA";
import EnergyGrid from "@/components/home/EnergyGrid";


const ACRONYM_ITEMS = [
  { letter: "S", word: "Super", desc: "Extreme compute density for flight envelope telemetry" },
  { letter: "A", word: "Artificially", desc: "Machine-learned diagnostic & routing models" },
  { letter: "I", word: "Intelligent", desc: "Autonomous decision heuristics across airframe fleets" },
  { letter: "O", word: "Operating", desc: "Ultra-low-latency core interfacing avionics buses" },
  { letter: "S", word: "System", desc: "Connected global grid linking aircraft, crews & MROs" },
];

export default function SaiosPage() {
  const [pixelating, setPixelating] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Transient Tech Pixelation Audio Effect on SAIOS Page Load (SRS Requirement)
  const playTechEntranceSound = useCallback(() => {
    try {
      if (typeof window === "undefined") return;
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;

      // 1. Digital glitched pixel pulse burst (white noise slice)
      const bufferSize = ctx.sampleRate * 0.15;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(1400, now);
      noiseFilter.Q.setValueAtTime(8, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      whiteNoise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(now);

      // 2. High-tech dual carrier sine chime (880Hz -> 1760Hz)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(660, now + 0.05);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.3);

      oscGain.gain.setValueAtTime(0.0001, now + 0.05);
      oscGain.gain.linearRampToValueAtTime(0.12, now + 0.12);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(now + 0.05);
      osc.stop(now + 0.86);
    } catch {
      // Audio autoplay policy fallback
    }
  }, []);

  useEffect(() => {
    playTechEntranceSound();
    const timer = setTimeout(() => {
      setPixelating(false);
    }, 1400);

    const unlockSound = () => {
      playTechEntranceSound();
      window.removeEventListener("click", unlockSound);
    };
    window.addEventListener("click", unlockSound);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", unlockSound);
    };
  }, [playTechEntranceSound]);

  return (
    <div className="w-full flex flex-col items-center pt-20 pb-36 select-none">
      {/* ── 1. Hero Section (SRS: In first section, there will be nothing but SAIOS written in the middle) ── */}
      <section className="relative w-full h-[85vh] min-h-[580px] flex items-center justify-center text-center px-6 overflow-hidden bg-black">
        {/* Transient Tech Grid & Pixel Matrix Lines */}
        <div
          className={`absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none transition-opacity duration-1000 ${
            pixelating ? "opacity-90" : "opacity-30"
          }`}
        />

        {/* Ambient Center Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.08)_0%,_transparent_70%)] blur-3xl" />
        </div>

        {/* ONLY SAIOS in the Middle (SRS Requirement) */}
        <div className="relative z-10">
          <h1
            className={`text-8xl sm:text-[12rem] md:text-[16rem] font-extralight tracking-tighter text-white transition-all duration-700 ${
              pixelating
                ? "blur-md opacity-40 scale-95 tracking-widest text-zinc-400 drop-shadow-[0_0_40px_rgba(56,189,248,0.6)]"
                : "blur-none opacity-100 scale-100 drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            }`}
          >
            SAIOS
          </h1>
        </div>
      </section>

      {/* ── 2. Motherboard 6 Core Functions Section ───────────────────────── */}
      <section id="functions" className="relative py-32 px-6 md:px-12 max-w-6xl mx-auto w-full">
        <div className="text-center mb-16 space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
            Avionics Neural Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            6 Core Functions
          </h2>
        </div>

        {/* Semi-transparent Grey Motherboard Background Container */}
        <div className="relative rounded-3xl border border-zinc-800 bg-zinc-950/75 backdrop-blur-xl p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl">
          {/* Motherboard Circuit Trace SVG Graphic Background */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none" stroke="#a1a1aa" strokeWidth="1">
              <path d="M 50 100 L 250 100 L 300 150 L 500 150 L 550 200 L 800 200" />
              <path d="M 100 500 L 350 500 L 400 450 L 700 450 L 750 350 L 950 350" />
              <path d="M 500 50 L 500 120 M 500 480 L 500 550" />
              <circle cx="250" cy="100" r="4" fill="#a1a1aa" />
              <circle cx="550" cy="200" r="4" fill="#a1a1aa" />
              <circle cx="400" cy="450" r="4" fill="#a1a1aa" />
              <circle cx="750" cy="350" r="4" fill="#a1a1aa" />
            </svg>
          </div>

          {/* Center Brand Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] select-none">
            <span className="text-[14rem] sm:text-[22rem] font-extralight tracking-tighter text-white font-mono">
              SAIOS
            </span>
          </div>

          {/* Grid + Energy Core composite */}
          <EnergyGrid />
        </div>
      </section>

      {/* ── 3. Acronym Breakdown with Centered SAIOS, Pointer Lines & Clouds (SRS Requirement) ── */}
      <section className="relative py-32 px-6 md:px-12 max-w-6xl mx-auto w-full border-t border-zinc-900 overflow-hidden">
        {/* Volumetric Clouds on Right and Left (SRS: "clouds on right and left so we portray SAIOS as being in the air") */}
        <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-white/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-l from-white/15 to-transparent blur-3xl pointer-events-none" />

        <div className="text-center mb-16 space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
            Nomenclature Decomposition
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            SuperArtificially Intelligent Operating System
          </h2>
        </div>

        {/* Central SAIOS Node with Pointer Lines */}
        <div className="relative flex flex-col items-center">
          {/* Center SAIOS Emblem */}
          <div className="mb-12 px-10 py-5 rounded-full border border-white/20 bg-black/90 backdrop-blur-xl shadow-[0_0_50px_rgba(255,255,255,0.15)] z-20">
            <span className="text-4xl sm:text-6xl font-extralight tracking-widest text-white font-mono">
              SAIOS
            </span>
          </div>

          {/* Letter Breakdown Rows with Indicator Connectors */}
          <div className="w-full max-w-4xl space-y-4 relative z-10">
            {ACRONYM_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="relative flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-md hover:border-zinc-600 transition-all gap-4"
              >
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center font-mono text-2xl font-bold text-white shadow-inner">
                    {item.letter}
                  </div>
                  <div>
                    <span className="text-lg sm:text-xl font-light text-white tracking-wide">
                      {item.word}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Subtle Callout Pointer Line */}
                  <div className="hidden md:block w-16 h-[1px] bg-gradient-to-r from-transparent to-zinc-600" />
                  <p className="text-xs font-mono text-zinc-400 sm:text-right max-w-md">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Founder Message Section (SRS: Founder message and picture provided) ── */}
      <section className="relative py-28 px-6 md:px-12 max-w-4xl mx-auto w-full border-t border-zinc-900">
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 shadow-2xl">
          {/* Founder Portrait */}
          <div className="shrink-0 w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border border-zinc-700 relative shadow-xl">
            <Image
              src="/founder.jpg"
              alt="Daniyal – Founder, RSI Studio & M1"
              fill
              sizes="(max-width: 768px) 144px, 176px"
              className="object-cover object-top"
            />
          </div>

          <div className="space-y-4 text-center md:text-left">
            <blockquote className="text-lg sm:text-xl font-light italic text-zinc-200 leading-relaxed">
              &ldquo;Our vision with RSI Studio is to lead with a perfection in pixels philosophy, in the international and national market.&rdquo;
            </blockquote>
            <div>
              <div className="text-sm font-semibold text-white">Daniyal</div>
              <div className="text-xs text-zinc-400 font-mono">
                Founder, RSI Studio / M1 Aviation Ecosystem
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Play Your Role CTA (SRS Requirement) ─────────────────── */}
      <PlayYourRoleCTA />
    </div>
  );
}
