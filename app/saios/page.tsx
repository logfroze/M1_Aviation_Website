"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import PlayYourRoleCTA from "@/components/ui/PlayYourRoleCTA";
import EnergyGrid from "@/components/home/EnergyGrid";

const ACRONYM_ITEMS = [
  { letter: "S", word: "Super", desc: "Extreme compute density for flight envelope telemetry" },
  { letter: "I", word: "Intelligent", desc: "Autonomous decision heuristics across airframe fleets" },
  { letter: "O", word: "Operating", desc: "Ultra-low-latency core interfacing avionics buses" },
  { letter: "S", word: "System", desc: "Connected global grid linking aircraft, crews & MROs" },
];


export default function SaiosPage() {
  const [pixelating, setPixelating] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Transient Tech Pixelation Audio Effect on SIOS Page Load
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
    <div className="relative w-full min-h-screen bg-black flex flex-col items-center pt-20 pb-36 select-none overflow-hidden">
      {/* ── Background Video (Limited to Sections 1 and 2 with smooth fade to black) ── */}
      <div className="absolute top-0 left-0 right-0 h-[1850px] pointer-events-none z-0 overflow-hidden">
        <video
          className="w-full h-full object-cover opacity-35"
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {/* Deep cinematic gradient overlay ensuring high text readability and smooth contrast, fading into pure black */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 via-75% to-black" />
      </div>

      {/* ── 1. Hero Section (In first section, there is nothing but SIOS written in the middle) ── */}
      <section className="relative z-10 w-full h-[85vh] min-h-[580px] flex items-center justify-center text-center px-6 overflow-hidden">
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

        {/* ONLY SIOS in the Middle */}
        <div className="relative z-10">
          <h1
            className={`text-8xl sm:text-[12rem] md:text-[16rem] font-extralight tracking-tighter text-white transition-all duration-700 ${
              pixelating
                ? "blur-md opacity-40 scale-95 tracking-widest text-zinc-400 drop-shadow-[0_0_40px_rgba(56,189,248,0.6)]"
                : "blur-none opacity-100 scale-100 drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            }`}
          >
            SIOS
          </h1>
        </div>
      </section>

      {/* ── 2. Motherboard 6 Core Functions Section ───────────────────────── */}
      <section id="functions" className="relative z-10 py-32 px-6 md:px-12 max-w-6xl mx-auto w-full">
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
              SIOS
            </span>
          </div>

          {/* Grid + Energy Core composite */}
          <EnergyGrid />
        </div>
      </section>

      {/* ── 3. Acronym Breakdown with Centered SIOS, Pointer Lines & Clouds ── */}
      <section className="relative z-10 py-32 px-6 md:px-12 max-w-6xl mx-auto w-full border-t border-zinc-900/80 overflow-hidden">
        {/* Volumetric Clouds on Right and Left */}
        <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-white/15 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-l from-white/15 to-transparent blur-3xl pointer-events-none" />

        <div className="text-center mb-16 space-y-2">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
            Nomenclature Decomposition
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            Super Intelligent Operating System
          </h2>
        </div>

        {/* Central SIOS Node with Pointer Lines */}
        <div className="relative flex flex-col items-center">
          {/* Center SIOS Emblem */}
          <div className="mb-12 px-10 py-5 rounded-full border border-white/20 bg-black/90 backdrop-blur-xl shadow-[0_0_50px_rgba(255,255,255,0.15)] z-20">
            <span className="text-4xl sm:text-6xl font-extralight tracking-widest text-white font-mono">
              SIOS
            </span>
          </div>

          {/* Letter Breakdown Rows with Indicator Connectors */}
          <div className="w-full max-w-4xl space-y-4 relative z-10">
            {ACRONYM_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="group relative cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between p-5 sm:p-6 rounded-2xl border border-zinc-800/90 bg-[#0c0d12]/90 backdrop-blur-md hover:-translate-y-2.5 hover:scale-[1.018] hover:border-zinc-300 hover:shadow-[0_24px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(255,255,255,0.12),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all duration-300 ease-out will-change-transform gap-4 overflow-hidden"
              >
                {/* Ambient Glass Hover Shine */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/[0.06] via-transparent to-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="flex items-center gap-5 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center font-mono text-2xl font-bold text-white shadow-inner group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] transition-all duration-300">
                    {item.letter}
                  </div>
                  <div>
                    <span className="text-lg sm:text-xl font-light text-zinc-100 group-hover:text-white group-hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.45)] tracking-wide transition-all duration-300">
                      {item.word}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                  {/* Subtle Callout Pointer Line */}
                  <div className="hidden md:block w-16 group-hover:w-24 h-[1.5px] bg-gradient-to-r from-transparent to-zinc-600 group-hover:to-white transition-all duration-300" />
                  <p className="text-xs font-mono text-zinc-400 group-hover:text-zinc-200 sm:text-right max-w-md transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Founder Directive Section ─────────────────────────────────── */}
      <section className="relative z-10 py-24 sm:py-32 px-6 md:px-12 max-w-5xl mx-auto w-full border-t border-zinc-900/80">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Left Card: Internal Directive Quote */}
          <div className="md:col-span-7 bg-[#0c0c0e]/95 border border-white/10 rounded-[32px] p-8 sm:p-12 flex flex-col justify-between relative shadow-2xl backdrop-blur-md overflow-hidden min-h-[440px]">
            {/* Ambient Watermark Quote Icon */}
            <div className="absolute -top-6 left-6 text-[120px] font-serif text-white/[0.03] select-none pointer-events-none leading-none">
              “
            </div>

            {/* Directive Pill Tag - Silver/White aesthetic */}
            <div className="flex items-center gap-2 mb-6 relative z-10">
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span className="text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase font-medium">
                FOUNDER&apos;S MESSAGE
              </span>
            </div>

            {/* Main Quote - From SIOS Page copy writing.pdf */}
            <blockquote className="text-lg sm:text-xl md:text-[22px] font-light text-zinc-100 tracking-tight leading-[1.6] relative z-10 my-auto">
              &ldquo;Our Vision with SIOS is to create{" "}
              <span className="text-white italic font-serif underline decoration-white/40 underline-offset-8">
                SuperIntelligences
              </span>{" "}
              so strong that it ends up knowing the aircraft; they&apos;re connected with more than any human naturally is capable of. We need to induce extreme efficiency in aviation and avoid being afraid of emerging technologies, in order to keep with the human curiosity and need to fly and explore the earth and beyond.&rdquo;
            </blockquote>

            {/* Founder Footer Row */}
            <div className="flex items-end justify-between border-t border-white/5 pt-6 mt-6 relative z-10">
              <div>
                <div className="text-base sm:text-lg font-bold text-white tracking-wide">Areez Rao</div>
                <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-zinc-400 uppercase mt-0.5 font-medium">
                  FOUNDER, M1 AVIATION & SIOS
                </div>
              </div>
              <div className="flex items-center gap-1.5 pb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
              </div>
            </div>
          </div>

          {/* Right Card: Studio Founder Portrait */}
          <div className="group md:col-span-5 relative rounded-[32px] overflow-hidden border border-white/10 bg-[#0c0c0e] shadow-2xl min-h-[380px] sm:min-h-[440px] md:min-h-[480px] cursor-pointer transition-all duration-500 hover:border-white/30">
            <Image
              src="/founder.jpg"
              alt="Areez Rao – Founder, M1 Aviation & SIOS"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover object-top filter grayscale contrast-110 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out"
              priority
            />
            {/* Subtle cinematic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
          </div>
        </div>
      </section>

      {/* ── 5. Play Your Role CTA ───────────────────────────────────────── */}
      <div className="relative z-10 w-full">
        <PlayYourRoleCTA />
      </div>
    </div>
  );
}

