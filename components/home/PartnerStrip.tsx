"use client";

import React from "react";
import { PARTNERS_ROSTER } from "@/data/partners";

export default function PartnerStrip() {
  const repeatedPartners = [
    ...PARTNERS_ROSTER,
    ...PARTNERS_ROSTER,
    ...PARTNERS_ROSTER,
    ...PARTNERS_ROSTER,
  ];

  return (
    <section
      aria-label="Industry Partners Alliances"
      className="relative w-full py-20 bg-black overflow-hidden select-none border-b border-zinc-900/80"
    >
      {/* ── Overhead Stage Spotlight Fixture & Downward Beam (Restored) ────────── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-25 pointer-events-none flex flex-col items-center">
        {/* Stage Light Fixture */}
        <div className="w-10 h-2.5 bg-zinc-700 rounded-b-md border border-zinc-500 shadow-[0_0_12px_rgba(255,255,255,0.85)]" />
        <div className="w-3.5 h-1.5 bg-white rounded-full blur-[1px] shadow-[0_0_16px_#ffffff]" />

        {/* Conical Stage Spotlight Beam */}
        <div
          className="w-[300px] sm:w-[420px] h-[230px] bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.28)_0%,_rgba(255,255,255,0.07)_45%,_transparent_75%)] pointer-events-none"
          style={{
            clipPath: "polygon(42% 0%, 58% 0%, 100% 100%, 0% 100%)",
          }}
        />
      </div>

      {/* Center Spotlight Target Pool on the Marquee Row */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 sm:w-72 h-26 rounded-full bg-white/12 blur-2xl pointer-events-none z-15 shadow-[0_0_45px_rgba(255,255,255,0.22)]" />

      {/* ── Silver / White Cloud Formations at Both Ends ───────────── */}
      {/* Left Cloud Bank */}
      <div className="absolute left-0 top-0 bottom-0 w-36 sm:w-56 z-20 pointer-events-none flex items-center">
        {/* Soft edge fade gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10" />

        {/* Layered Silver-White Cloud Puffs */}
        <div className="relative w-full h-full opacity-70">
          <div className="absolute -left-6 top-4 w-28 h-28 rounded-full bg-gradient-to-r from-white/30 to-zinc-300/10 blur-xl" />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-36 h-28 rounded-full bg-gradient-to-br from-white/40 via-zinc-200/25 to-transparent blur-2xl" />
          <div className="absolute -left-4 bottom-3 w-32 h-24 rounded-full bg-gradient-to-tr from-zinc-300/35 to-white/15 blur-xl" />
          {/* Stylized cloud SVG silhouettes */}
          <svg className="absolute -left-2 top-1/2 -translate-y-1/2 w-44 h-32 text-zinc-300/20 fill-current blur-sm" viewBox="0 0 200 120">
            <path d="M20 80 A30 30 0 0 1 70 50 A40 40 0 0 1 140 55 A30 30 0 0 1 170 80 A20 20 0 0 1 160 110 L30 110 A20 20 0 0 1 20 80 Z" />
          </svg>
        </div>
      </div>

      {/* Right Cloud Bank */}
      <div className="absolute right-0 top-0 bottom-0 w-36 sm:w-56 z-20 pointer-events-none flex items-center justify-end">
        {/* Soft edge fade gradient */}
        <div className="absolute inset-0 bg-gradient-to-l from-black via-black/90 to-transparent z-10" />

        {/* Layered Silver-White Cloud Puffs */}
        <div className="relative w-full h-full opacity-70">
          <div className="absolute -right-6 top-4 w-28 h-28 rounded-full bg-gradient-to-l from-white/30 to-zinc-300/10 blur-xl" />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 w-36 h-28 rounded-full bg-gradient-to-bl from-white/40 via-zinc-200/25 to-transparent blur-2xl" />
          <div className="absolute -right-4 bottom-3 w-32 h-24 rounded-full bg-gradient-to-tl from-zinc-300/35 to-white/15 blur-xl" />
          {/* Stylized cloud SVG silhouettes */}
          <svg className="absolute -right-2 top-1/2 -translate-y-1/2 w-44 h-32 text-zinc-300/20 fill-current blur-sm scale-x-[-1]" viewBox="0 0 200 120">
            <path d="M20 80 A30 30 0 0 1 70 50 A40 40 0 0 1 140 55 A30 30 0 0 1 170 80 A20 20 0 0 1 160 110 L30 110 A20 20 0 0 1 20 80 Z" />
          </svg>
        </div>
      </div>

      {/* ── Continuous Partner Marquee Line ────────────────────────── */}
      <div className="relative w-full overflow-hidden flex items-center py-4 z-10">
        <div className="flex items-center gap-6 sm:gap-10 w-max animate-marquee-ltr cursor-default">
          {repeatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="group relative flex items-center gap-4 shrink-0 px-7 py-3.5 rounded-2xl border border-zinc-800/90 bg-zinc-950/80 backdrop-blur-md hover:border-zinc-500 transition-all duration-300"
            >
              {/* Partner Logo Emblem */}
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-300 font-mono text-xs font-bold shadow-inner group-hover:text-white group-hover:border-zinc-400 transition-colors">
                {partner.name.slice(0, 2).toUpperCase()}
              </div>

              {/* Partner Name & Roster Tag */}
              <div className="flex flex-col text-left">
                <span className="text-xs font-medium text-zinc-200 tracking-wider uppercase whitespace-nowrap group-hover:text-white transition-colors">
                  {partner.name}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 whitespace-nowrap">
                  {partner.tagline}
                </span>
              </div>

              {/* Subtle silver gleam bar */}
              <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-zinc-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
