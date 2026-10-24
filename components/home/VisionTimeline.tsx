"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Jet3DViewer from "./Jet3DViewer";
import { VISION_MILESTONES } from "@/data/vision";

const TOTAL = VISION_MILESTONES.length;

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export default function VisionTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const targetRef = useRef(0);
  const smoothRef = useRef(0);

  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [landingProgress, setLandingProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      targetRef.current = clamp(-rect.top / scrollable, 0, 1);

      // Smooth landing transition:
      // rect.top moves from 450 down to 20: incoming flight touches down & runway plane materializes
      const landingRatio = clamp((450 - rect.top) / 400, 0, 1);
      setLandingProgress(landingRatio);
    };

    const loop = () => {
      // Smooth dampening for high-refresh displays
      smoothRef.current += (targetRef.current - smoothRef.current) * 0.09;
      const p = smoothRef.current;
      setProgress(p);

      const ni = clamp(Math.floor(p * TOTAL), 0, TOTAL - 1);
      setActiveIndex(ni);

      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToMilestone = (index: number) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const docTop = scrollY + rect.top;
    const scrollable = sectionRef.current.offsetHeight - window.innerHeight;
    // Position the milestone in the sweet spot of its range
    const targetP = (index + 0.35) / TOTAL;
    window.scrollTo({
      top: docTop + targetP * scrollable,
      behavior: "smooth",
    });
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex > 0) {
      scrollToMilestone(activeIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex < TOTAL - 1) {
      scrollToMilestone(activeIndex + 1);
    }
  };

  const eased = easeInOut(progress);

  // ── 3D Jet Perspective & Position Dynamics ──
  // Plane starts placed securely on the blue road runway above the progress bar & dock.
  // As user scrolls, view zooms in: plane scales up to 1.55 and STAYS LARGE and zoomed-in
  // until the end of the road (never shrinking into distance).
  const jetBottom = lerp(11, 26, eased);
  const jetScale = lerp(1.20, 1.55, Math.min(1, eased * 2.2));
  const jetOpacity = progress < 0.96 ? 1 : clamp(1 - (progress - 0.96) / 0.04, 0, 1);

  // Crossfade from incoming flight to stationary runway plane
  const centralJetOpacity = jetOpacity * Math.max(landingProgress, progress > 0 ? 1 : 0);
  const centralJetBlur = progress > 0 ? 0 : (1 - landingProgress) * 4;

  // ── Tunnel Camera Zoom Effect ──
  // Pushes road, neon rings, and vanishing point towards camera while outer rock frame stays static
  const tunnelScale = 1.0 + eased * 0.85;
  const tunnelY = eased * 6.5;

  // ── Circular Progress Arc (Right side of outer ring, matching reference HUD) ──
  const ARC_R = 365;
  const arcLength = Math.PI * ARC_R * 0.45;
  const arcDashOffset = arcLength * (1 - progress);

  const currentMilestone = VISION_MILESTONES[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="vision"
      aria-label="The 10-Year Vision Roadmap"
      className="relative w-full select-none"
      style={{ height: "600vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">

        {/* ── 1. CINEMATIC ZOOMING INNER LAYER (ROAD, RINGS, VANISHING POINT GRID) ── */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none origin-center will-change-transform"
          style={{
            transform: `scale(${tunnelScale}) translateY(${tunnelY}%)`,
            transition: "transform 0.05s linear",
          }}
        >
          <Image
            src="/images/vision-tunnel-backdrop.jpg"
            alt="Futuristic Neon Tunnel with Runway"
            fill
            priority
            className="object-cover w-full h-full select-none"
          />

          {/* Vignette & Depth Shadow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, transparent 45%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          {/* Glowing Winding Spline Path / Cable from Jet into Tunnel */}
          <svg
            viewBox="0 0 1000 900"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 w-full h-full pointer-events-none z-[12]"
            style={{ overflow: "visible" }}
          >
            <defs>
              <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d={`M 500 ${880 - eased * 350} 
                  C 515 ${760 - eased * 240}, 
                    ${480 + Math.sin(progress * Math.PI * 4) * 12} ${620 - eased * 150}, 
                    500 480`}
              fill="none"
              stroke="rgba(56, 189, 248, 0.9)"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#neon-glow)"
              strokeDasharray="8 6"
              className="opacity-80"
            />
          </svg>
        </div>

        {/* ── 2. STATIC OUTER ROCK WALLS FRAME (REMAINS EXACT SAME SIZE & VIEW) ── */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-[15]">
          <Image
            src="/images/vision-rock-frame.png"
            alt="Cavern Rock Walls Perimeter"
            fill
            priority
            className="object-cover w-full h-full select-none"
          />
        </div>

        {/* ── 3. HUD CIRCULAR PROGRESS GAUGE (RIGHT SIDE NEON RING) ── */}
        <svg
          viewBox="0 0 1000 900"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full pointer-events-none z-[18]"
          style={{ overflow: "visible" }}
        >
          <path
            d="M 820 460 A 365 365 0 0 1 650 780"
            fill="none"
            stroke="rgba(56, 189, 248, 0.15)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 820 460 A 365 365 0 0 1 650 780"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={arcDashOffset}
            filter="url(#neon-glow)"
          />
          <text
            x="675"
            y="795"
            fill="#38bdf8"
            fontSize="15"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="1.5"
            filter="url(#neon-glow)"
          >
            {Math.round(progress * 100)}%
          </text>
        </svg>

        {/* ── 4. REALISTIC REAR-VIEW 3D BOMBARDIER JET CRUISING DOWN RUNWAY ── */}
        <div
          className="absolute left-1/2 z-[20] pointer-events-none origin-bottom will-change-transform"
          style={{
            bottom: `${jetBottom}%`,
            transform: `translateX(-50%) scale(${jetScale})`,
            width: "clamp(420px, 36vw, 620px)",
            opacity: centralJetOpacity,
            filter: centralJetBlur > 0.1 ? `blur(${centralJetBlur}px)` : undefined,
            transition:
              "bottom 0.05s linear, transform 0.05s linear, opacity 0.08s linear, filter 0.08s linear",
          }}
          id="vision-end-jet-anchor"
        >
          <div id="vision-end-jet-wrapper">
            <div id="vision-end-jet" className="relative w-full">
              {/* Runway Ground Reflection & Contact Shadow */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
                style={{
                  width: "82%",
                  height: "30px",
                  background:
                    "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(56,189,248,0.28) 42%, transparent 75%)",
                  filter: "blur(7px)",
                }}
              />

              {/* 3D Bombardier Windjet 365 on Runway (facing inwards into tunnel) */}
              <div className="w-full h-[270px] sm:h-[330px] relative pointer-events-none select-none">
                <Jet3DViewer
                  yaw={-90}
                  pitch={0}
                  roll={0}
                  modelScale={1.35}
                  engineThrust={0.4 + eased * 0.6}
                  lightIntensity={1.3}
                />
              </div>

              {/* Dynamic Engine Afterburner Heat Distortion & Glow onto Runway */}
              <div
                className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 rounded-full pointer-events-none animate-pulse"
                style={{
                  width: "48%",
                  height: "36px",
                  background:
                    "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.8) 0%, rgba(56, 189, 248, 0.22) 50%, transparent 80%)",
                  filter: "blur(11px)",
                }}
              />
            </div>
          </div>
        </div>

        {/* ── 5. VISION PHASE CARD (LEFT SIDE, EXACT HIGH-TECH FROSTED GLASS STYLE) ── */}
        <div
          className="absolute z-[32] pointer-events-auto transition-all duration-300"
          style={{
            left: "clamp(20px, 5.5vw, 90px)",
            top: "47%",
            transform: "translateY(-50%)",
            width: "clamp(300px, 25vw, 430px)",
          }}
        >
          <div
            className="relative rounded-3xl p-6 sm:p-7 flex flex-col gap-3.5 backdrop-blur-2xl transition-all duration-300 select-text"
            style={{
              background:
                "linear-gradient(135deg, rgba(8, 16, 26, 0.88) 0%, rgba(2, 6, 12, 0.94) 100%)",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              boxShadow:
                "0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(56, 189, 248, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.18)",
            }}
          >
            {/* Top Row: Pill Badge & Previous/Next Navigation Controls */}
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 shadow-[0_0_12px_rgba(56,189,248,0.3)]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] font-mono font-semibold tracking-widest text-cyan-300 uppercase">
                  10-Year Vision Milestone
                </span>
              </div>

              {/* Prev / Next Chevrons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  aria-label="Previous milestone"
                  className="w-7 h-7 rounded-full flex items-center justify-center border border-zinc-700/60 bg-zinc-900/70 text-zinc-300 hover:text-white hover:border-cyan-400/60 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={activeIndex === TOTAL - 1}
                  aria-label="Next milestone"
                  className="w-7 h-7 rounded-full flex items-center justify-center border border-zinc-700/60 bg-zinc-900/70 text-zinc-300 hover:text-white hover:border-cyan-400/60 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Target Year & Phase Badge */}
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-3xl sm:text-4xl font-extralight tracking-tight text-white font-mono transition-all duration-300">
                {currentMilestone.year}
              </span>
              <span className="px-3 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-mono text-[11px] font-semibold tracking-wider uppercase transition-all duration-300">
                {currentMilestone.phase}
              </span>
            </div>

            {/* Milestone Title */}
            <div>
              <div className="text-[11px] font-mono tracking-[0.2em] text-zinc-400 uppercase mb-0.5">
                {currentMilestone.cycle || "CYCLE 2027–2037"}
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight leading-snug transition-all duration-300">
                {currentMilestone.title}
              </h3>
            </div>

            {/* Glowing Accent Line */}
            <div className="h-px w-full bg-gradient-to-r from-cyan-400/60 via-cyan-400/20 to-transparent" />

            {/* Milestone Copy Statement */}
            <p className="text-xs sm:text-[13px] text-zinc-300 font-light leading-relaxed min-h-[54px] transition-all duration-300">
              &ldquo;{currentMilestone.statement}&rdquo;
            </p>

            {/* Quick 6-step interactive pill dots */}
            <div className="flex items-center gap-1.5 pt-2">
              {VISION_MILESTONES.map((item, i) => (
                <button
                  key={item.year}
                  type="button"
                  onClick={() => scrollToMilestone(i)}
                  aria-label={`Jump to ${item.year}`}
                  className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width: i === activeIndex ? "24px" : "8px",
                    background:
                      i === activeIndex
                        ? "#38bdf8"
                        : i < activeIndex
                        ? "rgba(56, 189, 248, 0.45)"
                        : "rgba(255, 255, 255, 0.15)",
                    boxShadow: i === activeIndex ? "0 0 10px rgba(56, 189, 248, 0.8)" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── 6. PROMINENT 10-YEAR HORIZONTAL TIMELINE PROGRESS BAR (ABOVE BOTTOM DOCK) ── */}
        <div className="absolute bottom-[92px] sm:bottom-[98px] left-1/2 -translate-x-1/2 z-[34] w-[92%] max-w-3xl pointer-events-auto">
          <div
            className="rounded-2xl px-5 py-3 sm:px-7 sm:py-3.5 backdrop-blur-2xl transition-all duration-300"
            style={{
              background:
                "linear-gradient(180deg, rgba(10, 18, 28, 0.92) 0%, rgba(3, 8, 14, 0.96) 100%)",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              boxShadow:
                "0 20px 45px rgba(0, 0, 0, 0.9), 0 0 30px rgba(56, 189, 248, 0.16), inset 0 1px 1px rgba(255, 255, 255, 0.15)",
            }}
          >
            {/* Top Strip: Status Beacon, Current Phase Info & Percentage */}
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <div className="flex items-center gap-2 text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="tracking-widest uppercase text-[10px] sm:text-xs font-semibold text-cyan-300">
                  Strategic Roadmap
                </span>
                <span className="text-zinc-600 hidden sm:inline">•</span>
                <span className="text-zinc-300 hidden sm:inline font-medium">
                  {currentMilestone.phase}: {currentMilestone.title} ({currentMilestone.year})
                </span>
              </div>
              <div className="text-cyan-400 font-bold tracking-wider text-xs sm:text-sm drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]">
                {Math.round(progress * 100)}% <span className="text-zinc-500 font-normal">COMPLETE</span>
              </div>
            </div>

            {/* Continuous Progress Track with Clickable Milestone Nodes */}
            <div className="relative w-full py-1">
              {/* Background Rail */}
              <div className="h-1.5 w-full bg-zinc-800/90 rounded-full relative overflow-hidden">
                {/* Active Cyan Progress Fill */}
                <div
                  className="h-full rounded-full transition-all duration-75 ease-out"
                  style={{
                    width: `${progress * 100}%`,
                    background: "linear-gradient(90deg, #0284c7 0%, #38bdf8 70%, #a5f3fc 100%)",
                    boxShadow: "0 0 12px rgba(56, 189, 248, 0.9)",
                  }}
                />
              </div>

              {/* 6 Milestone Step Nodes Along the Track */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
                {VISION_MILESTONES.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  const isCompleted = idx < activeIndex;

                  return (
                    <button
                      key={item.year}
                      type="button"
                      onClick={() => scrollToMilestone(idx)}
                      aria-label={`Go to phase ${item.phase}: ${item.year}`}
                      className="pointer-events-auto group relative flex flex-col items-center focus:outline-none cursor-pointer -translate-x-1/2 first:translate-x-0 last:translate-x-0"
                    >
                      {/* Node Dot */}
                      <div
                        className="rounded-full transition-all duration-300 flex items-center justify-center"
                        style={{
                          width: isActive ? "18px" : "12px",
                          height: isActive ? "18px" : "12px",
                          background: isActive
                            ? "#ffffff"
                            : isCompleted
                            ? "#38bdf8"
                            : "rgba(113, 113, 122, 0.8)",
                          boxShadow: isActive
                            ? "0 0 0 3px rgba(56, 189, 248, 0.4), 0 0 14px rgba(56, 189, 248, 0.9)"
                            : isCompleted
                            ? "0 0 8px rgba(56, 189, 248, 0.7)"
                            : "none",
                        }}
                      >
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />}
                      </div>

                      {/* Tooltip on Hover */}
                      <div className="absolute -top-8 px-2 py-0.5 rounded bg-zinc-900 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                        {item.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Row: Years Label Strip */}
            <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono text-zinc-400 mt-2 px-0.5">
              {VISION_MILESTONES.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => scrollToMilestone(idx)}
                    className={`transition-colors cursor-pointer hover:text-cyan-300 ${
                      isActive ? "text-cyan-400 font-bold drop-shadow-[0_0_6px_rgba(56,189,248,0.7)]" : ""
                    }`}
                  >
                    {item.year}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── 7. TOP HEADER (CLEAN FADE OUT UPON SCROLLING DEEP INTO RUNWAY) ── */}
        <div
          className="absolute top-8 left-0 right-0 flex flex-col items-center z-[30] pointer-events-none transition-opacity duration-300"
          style={{ opacity: clamp(1 - progress * 4.0, 0, 1) }}
        >
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-zinc-700/60 bg-zinc-950/70 backdrop-blur-md mb-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            <span className="text-[11px] font-mono tracking-[0.25em] text-zinc-300 uppercase">
              Let&apos;s Travel Together
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-5xl font-extralight tracking-tight text-white uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            10 YEARS LONG VISION.
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400 font-mono tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            A journey towards the next era of Aviation.
          </p>
        </div>

        {/* ── 8. SCROLL HINT (FADES AWAY AS USER SCROLLS) ── */}
        <div
          className="absolute bottom-44 left-0 right-0 flex flex-col items-center gap-1.5 z-[28] pointer-events-none transition-opacity duration-300"
          style={{ opacity: clamp(1 - progress * 8, 0, 0.7) }}
        >
          <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-400 uppercase">
            Scroll to explore roadmap
          </span>
          <div className="w-px h-5 bg-gradient-to-b from-cyan-400/60 to-transparent animate-pulse" />
        </div>

      </div>
    </section>
  );
}
