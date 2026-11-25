"use client";

import React, { useState } from "react";
import Image from "next/image";
import ParallelogramButton from "@/components/ui/ParallelogramButton";

export default function MarketIntelligenceSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedText, setSubmittedText] = useState("");

  return (
    <section
      id="market-intelligence"
      aria-label="M1 Market Intelligence"
      className="relative w-full pt-16 sm:pt-20 lg:pt-24 pb-36 sm:pb-40 px-4 sm:px-6 lg:px-10 bg-[#07080B] text-[#F2F2F0] select-none overflow-hidden"
    >
      {/* ── Realistic Cinematic Aviation Hangar Atmosphere (Full Section Backdrop) ── */}
      <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/mi-hangar-bg.jpg"
          alt="Luxury subterranean aerospace showroom and hangar"
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.70] contrast-105"
          priority={false}
        />

        {/* Ambient Dark Scrims: Enhances readability while preserving floor reflections & side architectural LED lines */}
        <div className="absolute inset-0 bg-[#07080B]/60 backdrop-blur-[0.5px]" />
        {/* Deep Solid Dark Top: Extends across entire header region to eliminate distracting background lights behind text */}
        <div className="absolute inset-x-0 top-0 h-[480px] lg:h-[540px] bg-gradient-to-b from-[#07080B] via-[#07080B]/95 to-transparent z-[1]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#07080B] via-[#07080B]/75 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-28 sm:w-44 bg-gradient-to-r from-[#07080B]/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-28 sm:w-44 bg-gradient-to-l from-[#07080B]/90 to-transparent" />
      </div>

      {/* ── Main Section Content: 90-92% Desktop Viewport Width ── */}
      <div className="relative z-10 w-[92vw] max-w-[1400px] xl:max-w-[1440px] mx-auto flex flex-col gap-8 sm:gap-10">
        {/* ── Header: Left-Aligned Identity & Upper-Right Actions (Exact Ref 1 Layout) ── */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-2">
          {/* Left Column: Eyebrow, Heading (~56px), 2-Line Soft Neutral Description */}
          <div className="max-w-3xl space-y-3.5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="-skew-x-12 inline-flex items-center px-3 py-0.5 border border-white/40 bg-zinc-950">
                <span className="skew-x-12 text-[15px] font-mono font-bold tracking-[0.24em] uppercase text-white">
                  Coming Soon
                </span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-light tracking-tight text-[#F2F2F0] leading-[1.06]">
              M1: Market Intelligence
            </h2>

            {/* Original Copy: 2 Clean Wide Lines on Desktop in Soft Neutral-Grey (~18-20px) */}
            <p className="text-sm sm:text-base lg:text-[18px] xl:text-[19px] text-[#9DA2AB] font-light leading-relaxed">
              M1 Marketplace is now introducing cutting edge market intelligence features, enabling brokers to keep an eye on whole aviation market, discover opportunities, get leads and use multiple ai bots to interact and optimize market signals according to there needs.
            </p>
            
          </div>

          {/* Upper-Right Column: Primary Champagne CTA + Secondary CTA */}
          {/* <div className="flex flex-col items-start lg:items-end gap-3 shrink-0 lg:pt-1">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://5zg3hk5ladl.typeform.com/to/KWgbAMVR"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#E8DCC4] hover:bg-[#F2E8D4] text-[#121417] text-xs font-mono font-bold tracking-[0.16em] uppercase shadow-[0_0_24px_rgba(217,193,139,0.35)] transition-all duration-300"
              >
                Enter Intelligence Terminal ↗
              </a>

              <a
                href="https://5zg3hk5ladl.typeform.com/to/KWgbAMVR"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-xs font-mono tracking-[0.16em] uppercase text-[#F2F2F0] transition-all duration-300 backdrop-blur-md"
              >
                Schedule Private Demo
              </a>
            </div>
          </div> */}
        </div>

        {/* ── Central Wide Flight Radar Terminal Card (Restored Exact Frame Size & Metallic Charcoal Style) ── */}
        <div className="relative w-full rounded-2xl border border-[#32363E] bg-[#0A0D14]/90 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden aspect-[2392/708] group">
          <Image
            src="/images/mi-radar-atlantic-navy-gold-v2.png"
            alt="M1 Market Intelligence Atlantic Corridor Flight Radar Terminal"
            fill
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover object-center brightness-105 contrast-105 transition-transform duration-700 ease-out group-hover:scale-[1.01]"
            priority={true}
          />
        </div>

        {/* ── 4 Intelligence Cards (Metallic Charcoal Panels, Consistent Dimensions & Aligned Bottoms) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {/* ── Card 01: Broker Shield (Exact High-Res Dashboard Card Image with CSS Navy Tint) ── */}
          <div
            className="relative rounded-2xl border border-[#28508a]/80 shadow-[inset_0_1px_1.5px_rgba(186,215,255,0.4),inset_0_0_24px_rgba(15,48,110,0.4),0_20px_50px_rgba(2,10,24,0.85)] overflow-hidden aspect-[1224/840] flex items-center justify-center transition-all duration-300 hover:border-[#4b82d4] group"
            style={{
              background:
                "radial-gradient(ellipse 90% 75% at 50% 50%, #0d2757 0%, #081d45 45%, #030e24 100%)",
            }}
          >
            <Image
              src="/images/mi-card-broker-shield-v2.png"
              alt="01 // BROKER SHIELD - 01-Year Money-Back Guarantee"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center rounded-2xl transition-transform duration-300 group-hover:scale-[1.01] brightness-95 contrast-110"
              loading="lazy"
            />
            {/* CSS Navy Tint Overlays */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none mix-blend-screen"
              style={{
                background:
                  "radial-gradient(ellipse 90% 75% at 50% 50%, rgba(10, 36, 78, 0.85) 0%, rgba(7, 26, 61, 0.9) 50%, rgba(2, 11, 28, 0.75) 100%)",
              }}
            />
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none mix-blend-color opacity-70"
              style={{
                background:
                  "linear-gradient(180deg, #092350 0%, #05142f 100%)",
              }}
            />
          </div>

          {/* ── Card 02: Airframe Registry (Exact High-Res Dashboard Card Image with CSS Navy Tint) ── */}
          <div
            className="relative rounded-2xl border border-[#28508a]/80 shadow-[inset_0_1px_1.5px_rgba(186,215,255,0.4),inset_0_0_24px_rgba(15,48,110,0.4),0_20px_50px_rgba(2,10,24,0.85)] overflow-hidden aspect-[1224/840] flex items-center justify-center transition-all duration-300 hover:border-[#4b82d4] group"
            style={{
              background:
                "radial-gradient(ellipse 90% 75% at 50% 50%, #0d2757 0%, #081d45 45%, #030e24 100%)",
            }}
          >
            <Image
              src="/images/mi-card-airframe-registry.png"
              alt="02 // AIRFRAME REGISTRY - 300,000+ Datasets"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover object-center rounded-2xl transition-transform duration-300 group-hover:scale-[1.01] brightness-95 contrast-110"
              loading="lazy"
            />
            {/* CSS Navy Tint Overlays */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none mix-blend-screen"
              style={{
                background:
                  "radial-gradient(ellipse 90% 75% at 50% 50%, rgba(10, 36, 78, 0.85) 0%, rgba(7, 26, 61, 0.9) 50%, rgba(2, 11, 28, 0.75) 100%)",
              }}
            />
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none mix-blend-color opacity-70"
              style={{
                background:
                  "linear-gradient(180deg, #092350 0%, #05142f 100%)",
              }}
            />
          </div>

          {/* ── Card 03: Live SIOS Telemetry (Polished Glassmorphic Cockpit Panel) ── */}
          <div
            className="relative rounded-2xl border border-[#28508a]/80 shadow-[inset_0_1px_1.5px_rgba(186,215,255,0.4),inset_0_0_24px_rgba(15,48,110,0.4),0_20px_50px_rgba(2,10,24,0.85)] p-5 xl:p-6 flex flex-col justify-between aspect-[1224/840] transition-all duration-300 hover:border-[#4b82d4] overflow-hidden group select-none"
            style={{
              background:
                "radial-gradient(ellipse 90% 75% at 50% 50%, #0d2757 0%, #081d45 45%, #030e24 100%)",
            }}
          >
            {/* 1. Corner Light Shades (Cool Ice-Blue Tint matching Cards 01 & 02) */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none select-none"
              style={{
                background: [
                  "radial-gradient(circle 140px at 0% 0%, rgba(147, 197, 253, 0.25) 0%, rgba(96, 165, 250, 0.05) 50%, transparent 100%)",
                  "radial-gradient(circle 130px at 100% 0%, rgba(147, 197, 253, 0.20) 0%, rgba(96, 165, 250, 0.04) 50%, transparent 100%)",
                  "radial-gradient(circle 100px at 0% 100%, rgba(96, 165, 250, 0.12) 0%, transparent 100%)",
                  "radial-gradient(circle 110px at 100% 100%, rgba(96, 165, 250, 0.14) 0%, transparent 100%)",
                ].join(", "),
              }}
            />

            {/* 2. Left Border Metallic Shine Line & Ambient Glow (Cool Blue Tapered) */}
            <svg
              className="absolute left-0 inset-y-3 w-[2px] h-[calc(100%-24px)] pointer-events-none select-none overflow-visible"
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="card3-left-shine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.3" />
                  <stop offset="25%" stopColor="#dbeafe" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="75%" stopColor="#dbeafe" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path
                d="M 0 0 L 0.4 0 C 1.8 30, 1.8 70, 0.4 100 L 0 100 Z"
                fill="url(#card3-left-shine)"
              />
            </svg>
            <div
              className="absolute left-0 inset-y-5 w-[3.5px] bg-gradient-to-b from-blue-400/10 via-blue-300/35 to-blue-400/10 blur-[2px] pointer-events-none select-none"
              style={{
                clipPath: "polygon(0 0, 25% 0, 100% 35%, 100% 65%, 25% 100%, 0 100%)",
              }}
            />

            {/* 3. Right Border Metallic Shine Line & Ambient Glow (Cool Blue Tapered) */}
            <svg
              className="absolute right-0 inset-y-3 w-[2px] h-[calc(100%-24px)] pointer-events-none select-none overflow-visible"
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="card3-right-shine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.25" />
                  <stop offset="25%" stopColor="#dbeafe" stopOpacity="0.75" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="75%" stopColor="#dbeafe" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.25" />
                </linearGradient>
              </defs>
              <path
                d="M 2 0 L 1.6 0 C 0.2 30, 0.2 70, 1.6 100 L 2 100 Z"
                fill="url(#card3-right-shine)"
              />
            </svg>
            <div
              className="absolute right-0 inset-y-5 w-[3.5px] bg-gradient-to-b from-blue-400/10 via-blue-300/30 to-blue-400/10 blur-[2px] pointer-events-none select-none"
              style={{
                clipPath: "polygon(100% 0, 75% 0, 0 35%, 0 65%, 75% 100%, 100% 100%)",
              }}
            />

            {/* 4. Top & Bottom Specular Shine Lines (Cool Ice-Blue Accent) */}
            <div className="absolute top-0 inset-x-4 h-[1.5px] bg-gradient-to-r from-blue-300/50 via-blue-100/95 to-blue-300/50 pointer-events-none select-none" />
            <div className="absolute bottom-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-blue-400/35 to-transparent pointer-events-none select-none" />

            {/* 5. Realistic Top Glass Specular Arc Reflection */}
            <div
              className="absolute inset-x-0 top-0 h-[50%] pointer-events-none select-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(191, 219, 254, 0.12) 0%, rgba(147, 197, 253, 0.035) 35%, rgba(147, 197, 253, 0.006) 70%, transparent 100%)",
              }}
            />

            {/* Top Row: Metric & Consistent Square Indicator */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] xl:text-[11px] font-mono tracking-[0.24em] uppercase text-[#9DA2AB]">
                <span className="text-[#F2F2F0] font-semibold">03 //</span> LIVE SIOS TELEMETRY
              </span>
              <span className="w-2 h-2 rounded-[2px] bg-[#23D98A] shadow-[0_0_8px_#23D98A]" />
            </div>

            {/* Active Moving Radar + Live SIOS Stream Readout */}
            <div className="relative z-10 flex items-center gap-3.5 my-auto">
              {/* ── Active 360° Rotating Radar Scanner ── */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#03130C]/90 border border-[#23D98A]/50 shadow-[0_0_20px_rgba(35,217,138,0.25),inset_0_1px_2px_rgba(35,217,138,0.4)] flex items-center justify-center shrink-0 overflow-hidden">
                {/* Concentric Range Rings */}
                <span className="absolute inset-1.5 rounded-full border border-[#23D98A]/30" />
                <span className="absolute inset-3.5 rounded-full border border-[#23D98A]/45" />
                <span className="absolute inset-5 rounded-full border border-[#23D98A]/60" />

                {/* Crosshair grid lines */}
                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#23D98A]/25" />
                <span className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#23D98A]/25" />

                {/* 360° Rotating Radar Sweep Wedge */}
                <div
                  className="absolute inset-0 rounded-full animate-[spin_2.8s_linear_infinite] pointer-events-none"
                  style={{
                    background:
                      "conic-gradient(from 0deg, rgba(35, 217, 138, 0.75) 0deg, rgba(35, 217, 138, 0.25) 35deg, transparent 70deg, transparent 360deg)",
                  }}
                />

                {/* Active Aircraft Radar Blip (Detected Target) */}
                <span className="absolute top-[26%] right-[24%] w-1.5 h-1.5 rounded-full bg-[#23D98A] shadow-[0_0_8px_#23D98A] animate-pulse" />
                <span className="absolute bottom-[28%] left-[26%] w-1 h-1 rounded-full bg-[#23D98A]/80 animate-ping" />

                {/* Center Origin Node */}
                <span className="relative w-2 h-2 rounded-full bg-[#23D98A] shadow-[0_0_10px_#23D98A] z-10" />
              </div>

              {/* Telemetry Metric & Live Pill */}
              <div className="space-y-1 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#23D98A]/10 border border-[#23D98A]/40 backdrop-blur-md shadow-[0_0_14px_rgba(35,217,138,0.25)]">
                  <span className="text-[10px] xl:text-[11px] font-mono font-bold tracking-[0.18em] text-[#23D98A] uppercase">
                    Live SIOS Stream
                  </span>
                </div>

                <div>
                  <div className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]">
                    LIVE DATA
                  </div>
                  <div className="text-[11px] xl:text-xs text-[#9DA2AB] font-light truncate">
                    From M1 SIOS Operators
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 space-y-0.5 pt-3 xl:pt-3.5 border-t border-[#1d3c69]/60 text-left">
              <div className="flex items-center justify-between">
                <h3 className="text-xs xl:text-[13px] text-[#F2F2F0] font-medium leading-snug">
                  Active avionics status
                </h3>
                <span className="text-[9px] font-mono text-[#23D98A] tracking-wider uppercase font-semibold px-2 py-0.5 rounded bg-[#23D98A]/10 border border-[#23D98A]/30">
                  SYNCED
                </span>
              </div>
              <p className="text-[11px] xl:text-xs text-[#9DA2AB] leading-relaxed font-light">
                Maintenance dispatch readiness
              </p>
            </div>
          </div>

          {/* ── Card 04: AI Broker Copilot (Polished Glassmorphic Cockpit Panel) ── */}
          <div
            className="relative rounded-2xl border border-[#28508a]/80 shadow-[inset_0_1px_1.5px_rgba(186,215,255,0.4),inset_0_0_24px_rgba(15,48,110,0.4),0_20px_50px_rgba(2,10,24,0.85)] p-5 xl:p-6 flex flex-col justify-between aspect-[1224/840] transition-all duration-300 hover:border-[#4b82d4] overflow-hidden group select-none"
            style={{
              background:
                "radial-gradient(ellipse 90% 75% at 50% 50%, #0d2757 0%, #081d45 45%, #030e24 100%)",
            }}
          >
            {/* 1. Corner Light Shades (Cool Ice-Blue Tint matching Cards 01 & 02) */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none select-none"
              style={{
                background: [
                  "radial-gradient(circle 140px at 0% 0%, rgba(147, 197, 253, 0.25) 0%, rgba(96, 165, 250, 0.05) 50%, transparent 100%)",
                  "radial-gradient(circle 130px at 100% 0%, rgba(147, 197, 253, 0.20) 0%, rgba(96, 165, 250, 0.04) 50%, transparent 100%)",
                  "radial-gradient(circle 100px at 0% 100%, rgba(96, 165, 250, 0.12) 0%, transparent 100%)",
                  "radial-gradient(circle 110px at 100% 100%, rgba(96, 165, 250, 0.14) 0%, transparent 100%)",
                ].join(", "),
              }}
            />

            {/* 2. Left Border Metallic Shine Line & Ambient Glow (Cool Blue Tapered) */}
            <svg
              className="absolute left-0 inset-y-3 w-[2px] h-[calc(100%-24px)] pointer-events-none select-none overflow-visible"
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="card4-left-shine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.3" />
                  <stop offset="25%" stopColor="#dbeafe" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="75%" stopColor="#dbeafe" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path
                d="M 0 0 L 0.4 0 C 1.8 30, 1.8 70, 0.4 100 L 0 100 Z"
                fill="url(#card4-left-shine)"
              />
            </svg>
            <div
              className="absolute left-0 inset-y-5 w-[3.5px] bg-gradient-to-b from-blue-400/10 via-blue-300/35 to-blue-400/10 blur-[2px] pointer-events-none select-none"
              style={{
                clipPath: "polygon(0 0, 25% 0, 100% 35%, 100% 65%, 25% 100%, 0 100%)",
              }}
            />

            {/* 3. Right Border Metallic Shine Line & Ambient Glow (Cool Blue Tapered) */}
            <svg
              className="absolute right-0 inset-y-3 w-[2px] h-[calc(100%-24px)] pointer-events-none select-none overflow-visible"
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="card4-right-shine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.25" />
                  <stop offset="25%" stopColor="#dbeafe" stopOpacity="0.75" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="75%" stopColor="#dbeafe" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.25" />
                </linearGradient>
              </defs>
              <path
                d="M 2 0 L 1.6 0 C 0.2 30, 0.2 70, 1.6 100 L 2 100 Z"
                fill="url(#card4-right-shine)"
              />
            </svg>
            <div
              className="absolute right-0 inset-y-5 w-[3.5px] bg-gradient-to-b from-blue-400/10 via-blue-300/30 to-blue-400/10 blur-[2px] pointer-events-none select-none"
              style={{
                clipPath: "polygon(100% 0, 75% 0, 0 35%, 0 65%, 75% 100%, 100% 100%)",
              }}
            />

            {/* 4. Top & Bottom Specular Shine Lines (Cool Ice-Blue Accent) */}
            <div className="absolute top-0 inset-x-4 h-[1.5px] bg-gradient-to-r from-blue-300/50 via-blue-100/95 to-blue-300/50 pointer-events-none select-none" />
            <div className="absolute bottom-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-blue-400/35 to-transparent pointer-events-none select-none" />

            {/* 5. Realistic Top Glass Specular Arc Reflection */}
            <div
              className="absolute inset-x-0 top-0 h-[50%] pointer-events-none select-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(191, 219, 254, 0.12) 0%, rgba(147, 197, 253, 0.035) 35%, rgba(147, 197, 253, 0.006) 70%, transparent 100%)",
              }}
            />

            {/* Top Row: Metric & Consistent Square Indicator */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] xl:text-[11px] font-mono tracking-[0.24em] uppercase text-[#9DA2AB]">
                <span className="text-[#F2F2F0] font-semibold">04 //</span> AI BROKER COPILOT
              </span>
              <span className="w-2 h-2 rounded-[2px] bg-[#C58AFF] shadow-[0_0_8px_#C58AFF]" />
            </div>

            {/* Interactive Search Input & Prompt Chips */}
            <div className="relative z-10 space-y-2.5 my-auto text-left">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    setIsSubmitted(true);
                    setSubmittedText(searchQuery.trim());
                  }
                }}
                className="relative flex items-center w-full"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (isSubmitted) setIsSubmitted(false);
                  }}
                  placeholder="Interactive AI query bar..."
                  className="w-full py-2 pl-3.5 pr-8 rounded-xl bg-[#040e21]/70 border border-[#27406b]/60 hover:border-white/35 text-[11px] xl:text-xs font-mono text-white placeholder:text-[#9DA2AB]/60 focus:outline-none focus:border-[#C58AFF] focus:ring-1 focus:ring-[#C58AFF]/50 backdrop-blur-md transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
                />
                <button
                  type="submit"
                  aria-label="Submit search query"
                  className="absolute right-2 p-1 text-zinc-400 hover:text-[#C58AFF] transition-colors cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>

              {/* Clickable Quick Prompt Chips / Suggestions */}
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("Automated broker lead discovery");
                    setIsSubmitted(true);
                    setSubmittedText("Automated broker lead discovery");
                  }}
                  className="w-full text-left flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#06142a]/60 hover:bg-[#0c244f]/60 border border-[#1e3458]/60 hover:border-[#C58AFF]/40 text-[11px] text-[#C5C7C9] hover:text-white transition-all cursor-pointer group shadow-sm backdrop-blur-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-[2px] bg-[#C58AFF] shadow-[0_0_6px_#C58AFF] shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="truncate">Automated broker lead discovery</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("Off-market aircraft matching signals");
                    setIsSubmitted(true);
                    setSubmittedText("Off-market aircraft matching signals");
                  }}
                  className="w-full text-left flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#06142a]/60 hover:bg-[#0c244f]/60 border border-[#1e3458]/60 hover:border-[#C58AFF]/40 text-[11px] text-[#C5C7C9] hover:text-white transition-all cursor-pointer group shadow-sm backdrop-blur-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-[2px] bg-[#C58AFF] shadow-[0_0_6px_#C58AFF] shrink-0 group-hover:scale-125 transition-transform" />
                  <span className="truncate">Off-market aircraft matching signals</span>
                </button>
              </div>

              {/* Live Search Response Feedback Pill */}
              {isSubmitted && (
                <div className="flex items-center justify-between px-2.5 py-1 rounded-lg bg-[#C58AFF]/15 border border-[#C58AFF]/35 text-[10px] font-mono text-[#E2C7FF] backdrop-blur-md">
                  <span className="truncate">&quot;{submittedText}&quot;</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setSearchQuery("");
                    }}
                    className="ml-1 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            <div className="relative z-10 space-y-0.5 pt-3 xl:pt-3.5 border-t border-[#1d3c69]/60 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs sm:text-[13px] font-bold text-[#F2F2F0] tracking-wider uppercase leading-snug">
                    1 STEP
                  </span>
                  <span className="text-[11px] text-zinc-300 font-normal">
                    Toward M1 Ecosystem
                  </span>
                </div>
                <span className="text-[9px] font-mono text-[#C58AFF] tracking-wider uppercase font-semibold px-2 py-0.5 rounded bg-[#C58AFF]/10 border border-[#C58AFF]/30">
                  READY
                </span>
              </div>
              <p className="text-[10px] xl:text-[11px] text-[#9DA2AB] font-light truncate">
                Autonomous market signal optimization
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom Dedicated Centered CTA (Sitting Fully Clear of Bottom Navbar) ── */}
        <div className="pt-6 sm:pt-8 flex flex-col items-center justify-center">
          <ParallelogramButton
            href="https://5zg3hk5ladl.typeform.com/to/KWgbAMVR"
            isExternal={true}
            variant="white"
            className="py-3.5 px-12 sm:px-14 text-xs sm:text-sm font-bold tracking-[0.22em] shadow-[0_0_35px_rgba(255,255,255,0.25)] cursor-pointer"
          >
            Register Now ↗
          </ParallelogramButton>
        </div>
      </div>
    </section>
  );
}
