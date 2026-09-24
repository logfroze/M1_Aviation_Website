"use client";

import React, { useState, useEffect } from "react";
import { VISION_MILESTONES, VISION_DURATION_MS } from "@/data/vision";

export default function VisionTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Continuous auto-play transition without background audio
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % VISION_MILESTONES.length);
    }, VISION_DURATION_MS);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % VISION_MILESTONES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + VISION_MILESTONES.length) % VISION_MILESTONES.length);
  };

  const activeMilestone = VISION_MILESTONES[activeIndex];
  const isEven = activeIndex % 2 === 0;

  return (
    <section
      aria-label="10-Year Vision"
      className="relative py-32 px-6 md:px-12 max-w-5xl mx-auto overflow-hidden select-none"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
          The 10-Year Vision
        </h2>
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500 mt-2">
          Chronological Strategic Milestones
        </p>
      </div>

      {/* Interactive Alternating Spotlight Container with Side Arrows */}
      <div className="relative flex items-center justify-between gap-2 sm:gap-6">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Vision Milestone"
          className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-zinc-700 bg-zinc-950/90 text-zinc-300 hover:text-white hover:border-zinc-400 hover:bg-zinc-800 transition-all flex items-center justify-center shadow-xl active:scale-90 z-20 group cursor-pointer"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Central Spotlight Display Card */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[260px] flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-950 via-zinc-900/60 to-black shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Active Spotlight Cone */}
          <div
            className={`absolute top-0 w-72 sm:w-96 h-full bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.12)_0%,_transparent_70%)] pointer-events-none transition-all duration-700 ${
              isEven ? "left-1/4 sm:left-1/3" : "right-1/4 sm:right-1/3"
            }`}
          />

          {/* Central Vision & Year Badge in the Middle (SRS Requirement) */}
          <div className="relative z-10 flex flex-col items-center justify-center mb-6">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400 mb-1">
              Vision Milestone
            </span>
            <div className="px-7 py-2 rounded-full border border-zinc-600 bg-black/90 shadow-[0_0_20px_rgba(255,255,255,0.12)] text-2xl sm:text-3xl font-mono font-medium tracking-widest text-white">
              {activeMilestone.year}
            </div>
          </div>

          {/* Statement alternating Right / Left pattern */}
          <div
            key={activeMilestone.year}
            className={`relative z-10 w-full max-w-2xl transition-all duration-700 ease-out animate-in fade-in zoom-in-95 ${
              isEven ? "text-center sm:text-right" : "text-center sm:text-left"
            }`}
          >
            <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-2">
              Phase 0{activeIndex + 1} • Cycle 2027–2037
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-100 leading-snug">
              &ldquo;{activeMilestone.statement}&rdquo;
            </p>
          </div>

          {/* 3-Second Active Progress Bar */}
          <div className="relative z-10 w-full max-w-xs mt-8 bg-zinc-800/80 h-1 rounded-full overflow-hidden">
            <div
              key={activeIndex}
              className="h-full bg-white rounded-full animate-[progress_3s_linear]"
              style={{
                animationDuration: `${VISION_DURATION_MS}ms`,
              }}
            />
          </div>

          {/* Step Pill Indicators */}
          <div className="relative z-10 mt-5 flex items-center gap-2.5">
            {VISION_MILESTONES.map((m, idx) => (
              <button
                key={m.year}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Jump to year ${m.year}`}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  idx === activeIndex
                    ? "w-8 bg-white shadow-[0_0_8px_#ffffff]"
                    : "w-2.5 bg-zinc-700 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Vision Milestone"
          className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-zinc-700 bg-zinc-950/90 text-zinc-300 hover:text-white hover:border-zinc-400 hover:bg-zinc-800 transition-all flex items-center justify-center shadow-xl active:scale-90 z-20 group cursor-pointer"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
