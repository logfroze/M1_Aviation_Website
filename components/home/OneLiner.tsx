"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function OneLiner() {
  const sectionRef = useRef<HTMLElement>(null);
  const marketplaceRef = useRef<HTMLSpanElement>(null);
  const ecosystemRef = useRef<HTMLSpanElement>(null);
  const forCircleRef = useRef<HTMLDivElement>(null);
  const jetBoxRef = useRef<HTMLDivElement>(null);

  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });
  const [paths, setPaths] = useState({
    forPath: "",
    marketPath: "",
    forStartX: 0, forStartY: 0,
    forEndX: 0, forEndY: 0,
    marketStartX: 0, marketStartY: 0,
    marketEndX: 0, marketEndY: 0,
  });

  const updatePaths = useCallback(() => {
    if (
      !sectionRef.current ||
      !marketplaceRef.current ||
      !ecosystemRef.current ||
      !forCircleRef.current ||
      !jetBoxRef.current
    )
      return;

    // Use section as SVG root — everything relative to section's top-left
    const sRect = sectionRef.current.getBoundingClientRect();
    const mRect = marketplaceRef.current.getBoundingClientRect();
    const eRect = ecosystemRef.current.getBoundingClientRect();
    const fRect = forCircleRef.current.getBoundingClientRect();
    const jRect = jetBoxRef.current.getBoundingClientRect();

    setSvgSize({ w: sRect.width, h: sRect.height });

    // ── Line 1: Marketplace → Ecosystem ──────────────────────────────
    // Start: top-center of the Marketplace word (strike-through midpoint, going up)
    const m_x = mRect.left + mRect.width / 2 - sRect.left;
    const m_y = mRect.top - sRect.top;

    // End: bottom-center of the "Ecosystem" word
    const e_x = eRect.left + eRect.width / 2 - sRect.left;
    const e_y = eRect.bottom - sRect.top;

    // Graceful upward curve
    const mp_cp1x = m_x;
    const mp_cp1y = m_y - (m_y - e_y) * 0.4;
    const mp_cp2x = e_x;
    const mp_cp2y = e_y + (m_y - e_y) * 0.25;
    const marketPath = `M ${m_x} ${m_y} C ${mp_cp1x} ${mp_cp1y}, ${mp_cp2x} ${mp_cp2y}, ${e_x} ${e_y}`;

    // ── Line 2: For Circle → Jet Box ─────────────────────────────────
    // Start: right edge of For circle
    const f_x = fRect.right - sRect.left;
    const f_y = fRect.top + fRect.height / 2 - sRect.top;

    // End: left edge of jet box, at 45% height
    const j_x = jRect.left - sRect.left;
    const j_y = jRect.top + jRect.height * 0.45 - sRect.top;

    const dx = j_x - f_x;
    // Smooth wave arc
    const fp_cp1x = f_x + dx * 0.3;
    const fp_cp1y = f_y + 60;
    const fp_cp2x = f_x + dx * 0.65;
    const fp_cp2y = j_y - 50;
    const forPath = `M ${f_x} ${f_y} C ${fp_cp1x} ${fp_cp1y}, ${fp_cp2x} ${fp_cp2y}, ${j_x} ${j_y}`;

    setPaths({
      forPath,
      marketPath,
      forStartX: f_x, forStartY: f_y,
      forEndX: j_x, forEndY: j_y,
      marketStartX: m_x, marketStartY: m_y,
      marketEndX: e_x, marketEndY: e_y,
    });
  }, []);

  useEffect(() => {
    // Run after fonts & images have settled
    const run = () => { updatePaths(); };
    run();
    window.addEventListener("resize", run);
    // Re-run after layout settles
    const t1 = setTimeout(run, 100);
    const t2 = setTimeout(run, 500);
    return () => {
      window.removeEventListener("resize", run);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [updatePaths]);

  return (
    <section
      ref={sectionRef}
      aria-label="Ecosystem Architecture"
      className="relative py-24 md:py-32 px-4 sm:px-6 md:px-12 flex flex-col items-center justify-center text-center overflow-hidden bg-black border-y border-zinc-900/80 select-none"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06)_0%,_rgba(0,0,0,0.85)_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Connecting SVG — absolutely covers the entire section */}
      {svgSize.w > 0 && (
        <svg
          className="absolute top-0 left-0 pointer-events-none z-30 hidden lg:block"
          width={svgSize.w}
          height={svgSize.h}
          viewBox={`0 0 ${svgSize.w} ${svgSize.h}`}
          overflow="visible"
        >
          <defs>
            <linearGradient id="forJetGrad" gradientUnits="userSpaceOnUse"
              x1={paths.forStartX} y1={paths.forStartY}
              x2={paths.forEndX} y2={paths.forEndY}>
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#67e8f9" stopOpacity="1" />
            </linearGradient>

            <linearGradient id="mktEcoGrad" gradientUnits="userSpaceOnUse"
              x1={paths.marketStartX} y1={paths.marketStartY}
              x2={paths.marketEndX} y2={paths.marketEndY}>
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
              <stop offset="50%" stopColor="#a5f3fc" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>

            <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ── For Circle → Jet Image ── */}
          {paths.forPath && (
            <g>
              {/* Glow halo */}
              <path d={paths.forPath} stroke="#38bdf8" strokeWidth="8" strokeOpacity="0.22" fill="none" filter="url(#lineGlow)" />
              {/* Main dashed wave */}
              <path d={paths.forPath} stroke="url(#forJetGrad)" strokeWidth="2.5" strokeDasharray="9 5" strokeLinecap="round" fill="none" />
              {/* Start dot at For circle edge */}
              <circle cx={paths.forStartX} cy={paths.forStartY} r="5" fill="#38bdf8" filter="url(#lineGlow)" />
              <circle cx={paths.forStartX} cy={paths.forStartY} r="2.5" fill="#ffffff" />
              {/* Arrowhead at jet box left edge */}
              <polygon
                points={`${paths.forEndX},${paths.forEndY} ${paths.forEndX - 13},${paths.forEndY - 7} ${paths.forEndX - 13},${paths.forEndY + 7}`}
                fill="#ffffff"
                filter="url(#lineGlow)"
              />
            </g>
          )}

          {/* ── Marketplace → Ecosystem ── */}
          {paths.marketPath && (
            <g>
              {/* Glow halo */}
              <path d={paths.marketPath} stroke="#38bdf8" strokeWidth="7" strokeOpacity="0.2" fill="none" filter="url(#lineGlow)" />
              {/* Main dashed connector */}
              <path d={paths.marketPath} stroke="url(#mktEcoGrad)" strokeWidth="2.25" strokeDasharray="5 4" strokeLinecap="round" fill="none" />
              {/* Start dot at Marketplace strikethrough */}
              <circle cx={paths.marketStartX} cy={paths.marketStartY} r="5" fill="#38bdf8" filter="url(#lineGlow)" />
              <circle cx={paths.marketStartX} cy={paths.marketStartY} r="2.5" fill="#ffffff" />
              {/* Arrowhead pointing into Ecosystem text bottom */}
              <polygon
                points={`${paths.marketEndX},${paths.marketEndY} ${paths.marketEndX - 7},${paths.marketEndY + 13} ${paths.marketEndX + 7},${paths.marketEndY + 13}`}
                fill="#38bdf8"
                filter="url(#lineGlow)"
              />
            </g>
          )}
        </svg>
      )}

      <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col items-center w-full">
        {/* 1. What We Are Badge */}
        <div className="-skew-x-12 inline-flex items-center px-5 py-2 bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.25)] border border-white mb-6">
          <span className="inline-block skew-x-12 text-xs font-mono font-bold tracking-[0.25em] uppercase text-black">
            What We Are
          </span>
        </div>

        {/* 2. Big ECOSYSTEM Title */}
        <div className="relative mb-16 sm:mb-20">
          <span
            ref={ecosystemRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 block"
          >
            <u>Ecosystem</u>
          </span>
          <div className="absolute -inset-x-8 top-1/2 -translate-y-1/2 h-16 bg-white/5 blur-3xl pointer-events-none" />
        </div>

        {/* 3. Split Layout: Left (equation + For) | Right (jet) */}
        <div className="relative w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-16">
          {/* Left: Equation card + For circle */}
          <div className="flex flex-col items-start text-left z-20 shrink-0">
            {/* M1 = Marketplace + Operating System — single line */}
            <div className="p-4 sm:p-5 md:p-6 rounded-2xl border border-zinc-800/90 bg-zinc-950/95 backdrop-blur-xl shadow-2xl whitespace-nowrap">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extralight tracking-tight text-white flex items-center gap-2 sm:gap-3 leading-none">
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                  M1
                </span>
                <span className="text-zinc-500 font-light">=</span>

                {/* Marketplace with cutting strike-through */}
                <span ref={marketplaceRef} className="relative inline-block px-1.5">
                  <span className="text-zinc-200 font-normal">Marketplace</span>
                  <span className="absolute left-[-8px] right-[-8px] top-1/2 -translate-y-1/2 h-[2.5px] bg-gradient-to-r from-red-500 via-cyan-300 to-white shadow-[0_0_10px_#38bdf8] rounded-full pointer-events-none" />
                  <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_6px_#ef4444]" />
                  <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_6px_#38bdf8]" />
                </span>

                <span className="text-zinc-500 font-light">+</span>
                <span className="text-zinc-200 font-normal">Operating System</span>
              </p>
            </div>

            {/* Only the 'For' circle — no extra text */}
            <div className="pt-10 sm:pt-14">
              <div
                ref={forCircleRef}
                className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-zinc-400 bg-gradient-to-b from-zinc-700 via-zinc-900 to-black flex items-center justify-center shadow-[0_0_35px_rgba(255,255,255,0.4)] z-20"
              >
                <span className="text-white font-serif italic font-bold text-2xl sm:text-3xl drop-shadow-[0_0_10px_rgba(255,255,255,0.95)]">
                  For
                </span>
                <div className="absolute inset-0 rounded-full border border-white/70 animate-pulse pointer-events-none" />
                <div className="absolute -inset-1 rounded-full bg-cyan-400/25 blur-sm pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right: Jet image — pushed to far right */}
          <div
            ref={jetBoxRef}
            className="relative w-full lg:w-[560px] xl:w-[640px] 2xl:w-[700px] h-[300px] sm:h-[380px] md:h-[440px] lg:h-[460px] rounded-2xl overflow-hidden border border-zinc-800/90 bg-black shadow-[0_0_90px_rgba(0,0,0,0.95)] group shrink-0 lg:ml-auto z-20"
          >
            <Image
              src="/images/realistic-jet-oneliner.jpg"
              alt="M1 Supersonic Aerospace Jet"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            {/* Edge vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none" />
            {/* Docking indicator where For line attaches */}
            <div className="absolute left-0 top-[45%] -translate-y-1/2 w-1.5 h-14 bg-gradient-to-b from-cyan-400 via-white to-cyan-400 rounded-r shadow-[0_0_14px_#38bdf8]" />
            {/* HUD labels */}
            <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center pointer-events-none">
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase bg-black/70 px-3 py-1 rounded backdrop-blur-sm border border-zinc-800">
                M1 Supersonic Fleet
              </span>
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase bg-black/70 px-3 py-1 rounded backdrop-blur-sm border border-zinc-800">
                Mach 2.2 Cruise
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
