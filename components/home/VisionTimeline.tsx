"use client";

import React, { useState, useEffect } from "react";
import { VISION_MILESTONES, VISION_DURATION_MS } from "@/data/vision";

/**
 * 3-Tier Flight Map Layout:
 * Line 1 (top):    1st 3 cards  (2027 @ 18%, 2028 @ 50%, 2029 @ 82%)
 * Line 2 (middle): 4th card     (2030 @ 50%)
 * Line 3 (bottom): Rest 2 cards (2035 @ 33%, 2037 @ 67%)
 *
 * Coordinates are mapped to a 1000 × 680 SVG coordinate space.
 * Nodes sit inside a centered, bounded max-w-5xl container with breathing room on sides.
 */
const NODES = [
  { x: 18, y: 75,  svgX: 180, svgY: 75  }, // 0: 2027 (Line 1 - Left)
  { x: 50, y: 75,  svgX: 500, svgY: 75  }, // 1: 2028 (Line 1 - Center)
  { x: 82, y: 75,  svgX: 820, svgY: 75  }, // 2: 2029 (Line 1 - Right)
  { x: 50, y: 300, svgX: 500, svgY: 300 }, // 3: 2030 (Line 2 - Center)
  { x: 33, y: 525, svgX: 330, svgY: 525 }, // 4: 2035 (Line 3 - Left)
  { x: 67, y: 525, svgX: 670, svgY: 525 }, // 5: 2037 (Line 3 - Right)
];

// Continuous smooth flight trajectory connecting all 6 nodes across the 3 lines
const SVG_PATH = "M 180 75 Q 340 68 500 75 Q 660 68 820 75 C 970 75, 970 300, 500 300 C 130 300, 130 525, 330 525 Q 500 518 670 525";

export default function VisionTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActiveIndex((p) => (p + 1) % VISION_MILESTONES.length),
      VISION_DURATION_MS
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      aria-label="10-Year Vision"
      className="relative py-20 sm:py-28 overflow-hidden select-none"
    >
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16 relative z-20 px-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white">
          The 10-Year Vision
        </h2>
        <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-zinc-500 mt-3">
          Chronological Strategic Milestones • Mapped Flight Route
        </p>
      </div>

      {/* ── DESKTOP: 3-Line Mapped Flight Trail ── */}
      <div className="hidden lg:block relative max-w-5xl mx-auto px-4 w-full" style={{ height: 680 }}>
        {/* SVG flight route with super shiny silver/chrome glow */}
        <svg
          viewBox="0 0 1000 680"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          <defs>
            <linearGradient id="silverFlightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="20%"  stopColor="#E4E4E7" stopOpacity="0.85" />
              <stop offset="38%"  stopColor="#A1A1AA" stopOpacity="0.75" />
              <stop offset="52%"  stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="70%"  stopColor="#71717A" stopOpacity="0.75" />
              <stop offset="85%"  stopColor="#E4E4E7" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
            </linearGradient>
            <filter id="silverGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 1   0 1 0 0 1   0 0 1 0 1  0 0 0 0.85 0"
                in="blur"
                result="glow"
              />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Subtle dashed silver-zinc base path */}
          <path
            d={SVG_PATH}
            fill="none"
            stroke="#3f3f46"
            strokeWidth="2"
            strokeDasharray="8 6"
            opacity="0.6"
          />
          {/* Super shiny silver glowing path */}
          <path
            d={SVG_PATH}
            fill="none"
            stroke="url(#silverFlightGrad)"
            strokeWidth="3"
            filter="url(#silverGlow)"
          />
        </svg>

        {/* Milestone beacon nodes + sharp tilted cards */}
        {VISION_MILESTONES.map((m, idx) => {
          const node = NODES[idx];
          const isActive = idx === activeIndex;

          return (
            <div
              key={m.year}
              onClick={() => setActiveIndex(idx)}
              className="absolute z-20 cursor-pointer"
              style={{
                left: `${node.x}%`,
                top: `${node.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Dot Beacon */}
              <div className="relative flex items-center justify-center">
                {/* Silver Pulse Ring on Active */}
                {isActive && (
                  <div className="absolute w-14 h-14 rounded-full border border-white/80 bg-white/15 animate-ping pointer-events-none" />
                )}
                {/* Outer Ring */}
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-xl ${
                    isActive
                      ? "border-white bg-zinc-950 shadow-[0_0_24px_rgba(255,255,255,0.95),_0_0_45px_rgba(220,225,240,0.6)]"
                      : "border-zinc-700 bg-zinc-950 hover:border-zinc-400"
                  }`}
                >
                  {/* Core Pin */}
                  <div
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-white shadow-[0_0_12px_#ffffff,_0_0_20px_#e4e4e7]"
                        : "bg-zinc-500"
                    }`}
                  />
                </div>
              </div>

              {/* Connector Pin downward from dot to card */}
              <div
                className={`absolute left-1/2 -translate-x-px w-px top-5 h-5 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-b from-white to-zinc-400 shadow-[0_0_8px_#ffffff]"
                    : "bg-zinc-800"
                }`}
              />

              {/* Tilted Sharp Parallelogram Card */}
              <div
                className="absolute top-[28px] left-1/2 -translate-x-1/2 transition-all duration-500"
                style={{ width: 250 }}
              >
                <div
                  className={`-skew-x-6 border transition-all duration-500 ${
                    isActive
                      ? "bg-zinc-950/95 border-white shadow-[0_0_32px_rgba(255,255,255,0.35),_0_12px_36px_rgba(0,0,0,0.95)]"
                      : "bg-zinc-950/85 border-zinc-800/80 hover:border-zinc-600"
                  }`}
                >
                  <div className="skew-x-6 p-3.5">
                    {/* Year badge + Phase */}
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`-skew-x-6 inline-flex items-center px-2.5 py-0.5 border text-[11px] font-mono font-bold tracking-widest ${
                          isActive
                            ? "bg-gradient-to-r from-white via-zinc-200 to-zinc-300 border-white text-black shadow-[0_0_15px_rgba(255,255,255,0.7)]"
                            : "bg-zinc-900 border-zinc-700 text-zinc-300"
                        }`}
                      >
                        <span className="skew-x-6">{m.year}</span>
                      </div>
                      <span
                        className={`text-[9px] font-mono uppercase tracking-widest transition-colors ${
                          isActive ? "text-zinc-300 font-semibold" : "text-zinc-500"
                        }`}
                      >
                        Phase {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Statement */}
                    <p
                      className={`text-[11px] leading-relaxed transition-colors ${
                        isActive ? "text-white font-medium" : "text-zinc-400 font-light"
                      }`}
                    >
                      {m.statement}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── MOBILE / TABLET: Vertical Timeline (Polished Silver Theme) ── */}
      <div className="lg:hidden relative max-w-lg mx-auto px-4 space-y-5">
        {/* Shiny Silver Vertical Route Line */}
        <div className="absolute left-[26px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-white via-zinc-400 to-zinc-700 shadow-[0_0_10px_rgba(255,255,255,0.3)]" />

        {VISION_MILESTONES.map((m, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={m.year}
              onClick={() => setActiveIndex(idx)}
              className="relative flex items-start gap-5 cursor-pointer pl-1"
            >
              {/* Dot */}
              <div
                className={`shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center z-10 transition-all ${
                  isActive
                    ? "border-white bg-zinc-950 shadow-[0_0_16px_rgba(255,255,255,0.85)]"
                    : "border-zinc-700 bg-zinc-950"
                }`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    isActive ? "bg-white shadow-[0_0_8px_#ffffff]" : "bg-zinc-600"
                  }`}
                />
              </div>

              {/* Card */}
              <div
                className={`flex-1 -skew-x-3 border p-4 transition-all ${
                  isActive
                    ? "bg-zinc-950 border-white shadow-[0_0_24px_rgba(255,255,255,0.25)]"
                    : "bg-zinc-950/60 border-zinc-800"
                }`}
              >
                <div className="skew-x-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className={`-skew-x-3 inline-flex px-2.5 py-0.5 border text-xs font-mono font-bold ${
                        isActive
                          ? "bg-gradient-to-r from-white via-zinc-200 to-zinc-300 border-white text-black shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                          : "bg-zinc-800 border-zinc-700 text-zinc-300"
                      }`}
                    >
                      <span className="skew-x-3">{m.year}</span>
                    </div>
                    <span
                      className={`text-[9px] font-mono uppercase tracking-widest ${
                        isActive ? "text-zinc-300 font-semibold" : "text-zinc-500"
                      }`}
                    >
                      Phase {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      isActive ? "text-white font-medium" : "text-zinc-400"
                    }`}
                  >
                    {m.statement}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
