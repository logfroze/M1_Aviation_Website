"use client";

import React, { useState } from "react";
import Image from "next/image";

interface EcosystemNode {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  labelX: number;
  labelY: number;
  jetX: number;
  jetY: number;
  pathD: string;
  metric: string;
  status: string;
  details: { label: string; value: string }[];
}

// 4 Corner Nodes only (Requirement 4: 1st top-left, 2nd top-right, 3rd lower-right, 4th lower-left)
const NODES: EcosystemNode[] = [
  {
    id: "aircraft",
    number: "01",
    title: "AIRCRAFT",
    subtitle: "Jet Inventory & Fleet Management",
    labelX: 160,
    labelY: 105,
    jetX: 420,
    jetY: 340,
    pathD: "M 160 105 C 270 105 340 220 420 340",
    metric: "5,000+ Verified Airframes",
    status: "ONLINE // VERIFIED",
    details: [
      { label: "Airframe Index", value: "Curated Global Fleet" },
      { label: "Airworthiness", value: "Cryptographic Audit" },
      { label: "Settlement", value: "Instant Escrow Telemetry" },
    ],
  },
  {
    id: "operators",
    number: "02",
    title: "OPERATORS",
    subtitle: "Charter, Management & Operations",
    labelX: 1045,
    labelY: 105,
    jetX: 780,
    jetY: 260,
    pathD: "M 1045 105 C 930 105 850 180 780 260",
    metric: "340+ Flight Operations",
    status: "DISPATCH READY",
    details: [
      { label: "Active Network", value: "340+ Flight Operations" },
      { label: "Fleet Intelligence", value: "Autonomous SAIOS" },
      { label: "Dispatch Response", value: "< 4 Min SLA" },
    ],
  },
  {
    id: "parts",
    number: "03",
    title: "PARTS",
    subtitle: "Spare Parts & Global Supply Chain",
    labelX: 1045,
    labelY: 550,
    jetX: 830,
    jetY: 450,
    pathD: "M 1045 550 C 960 550 900 490 830 450",
    metric: "Instant OEM Escrow",
    status: "SUPPLY ONLINE",
    details: [
      { label: "Catalog Index", value: "140K+ Certified Parts" },
      { label: "AOG Priority", value: "24/7 Rapid Response" },
      { label: "Procurement", value: "Zero-Latency Settlement" },
    ],
  },
  {
    id: "maintenance",
    number: "04",
    title: "MAINTENANCE",
    subtitle: "MRO & Certified Repair Network",
    labelX: 160,
    labelY: 550,
    jetX: 500,
    jetY: 420,
    pathD: "M 160 550 C 270 550 380 470 500 420",
    metric: "12 Certified Repair Hubs",
    status: "HUBS CONNECTED",
    details: [
      { label: "Facility Network", value: "12 Certified Hubs" },
      { label: "Standard", value: "FAA & EASA Approved" },
      { label: "Turnaround Time", value: "+42% Efficiency" },
    ],
  },
];

// Air-streak definitions for hover flyby effect
const AIR_STREAKS = [
  { top: "60%", left: "10%", width: "24%", delay: "0s",    duration: "0.52s", opacity: 0.42, h: "1px" },
  { top: "48%", left: "19%", width: "28%", delay: "0.14s", duration: "0.56s", opacity: 0.48, h: "1px" },
  { top: "38%", left: "18%", width: "26%", delay: "0.06s", duration: "0.50s", opacity: 0.38, h: "1px" },
  { top: "46%", left: "30%", width: "32%", delay: "0.10s", duration: "0.54s", opacity: 0.45, h: "1px" },
  { top: "37%", left: "44%", width: "28%", delay: "0.04s", duration: "0.52s", opacity: 0.42, h: "1px" },
  { top: "62%", left: "42%", width: "30%", delay: "0.18s", duration: "0.55s", opacity: 0.38, h: "1px" },
  { top: "22%", left: "54%", width: "26%", delay: "0.08s", duration: "0.52s", opacity: 0.40, h: "1px" },
];

export default function OneLiner() {
  // Details only show when user manually hovers over a box (Requirement 4)
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [jetHovered, setJetHovered] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleContainerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  const handleContainerMouseLeave = () => {
    setJetHovered(false);
    setMouseOffset({ x: 0, y: 0 });
    setActiveNode(null);
  };

  return (
    <section
      aria-label="What We Are - Ecosystem"
      className="relative w-full py-24 sm:py-32 bg-[#04060a] overflow-hidden select-none"
    >
      {/* 1. Atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Image
          src="/images/ecosystem-clouds-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#04060a] via-transparent via-30% to-[#04060a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_58%,rgba(255,255,255,0.10)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_50%_62%,rgba(200,210,220,0.08)_0%,transparent_60%)]" />
      </div>

      {/* 2. Header */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto space-y-4 mb-8 sm:mb-14">
        <div className="inline-flex items-center">
          <div
            className="relative flex items-center gap-2 px-5 py-1.5 bg-zinc-900/95 border border-zinc-600/80 backdrop-blur-sm"
            style={{ clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)" }}
          >
            <span className="text-[20px] font-mono tracking-[0.42em] text-zinc-300 uppercase font-semibold">
              WHAT WE ARE
            </span>
          </div>
        </div>
        <div className="text-xs sm:text-sm font-mono tracking-[0.42em] text-zinc-400 font-medium uppercase">
          MORE THAN A MARKETPLACE.
        </div>
        <h2
          className="text-7xl sm:text-9xl md:text-[8rem] font-black tracking-[0.14em] sm:tracking-[0.18em] uppercase leading-none"
          style={{
            background: "linear-gradient(180deg,#ffffff 0%,#e2e8f0 30%,#94a3b8 70%,#475569 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 4px 24px rgba(0,0,0,0.9))",
          }}
        >
          ECOSYSTEM
        </h2>
        <p className="text-xs sm:text-sm font-mono tracking-[0.38em] text-zinc-400 font-medium uppercase">
          THE OPERATING LAYER CONNECTING AVIATION.
        </p>
      </div>

      {/* 3. Desktop centerpiece */}
      <div
        className="hidden lg:block relative max-w-[1280px] mx-auto px-4 w-full"
        style={{ height: 680 }}
        onMouseMove={handleContainerMouseMove}
        onMouseLeave={handleContainerMouseLeave}
      >
        {/* SVG: Clean metallic platform + thick hover connecting lines */}
        <svg
          viewBox="0 0 1200 680"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          <defs>
            <radialGradient id="platTopSurface" cx="50%" cy="38%" rx="55%" ry="55%">
              <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.75" />
              <stop offset="28%" stopColor="#cbd5e1" stopOpacity="0.58" />
              <stop offset="62%" stopColor="#64748b" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.04" />
            </radialGradient>
            <linearGradient id="platSideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" stopOpacity="0.92" />
              <stop offset="50%" stopColor="#1e293b" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.82" />
            </linearGradient>
            <linearGradient id="platTopRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" stopOpacity="0.0" />
              <stop offset="18%" stopColor="#94a3b8" stopOpacity="0.65" />
              <stop offset="38%" stopColor="#f1f5f9" stopOpacity="1.0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="1.0" />
              <stop offset="62%" stopColor="#f1f5f9" stopOpacity="1.0" />
              <stop offset="82%" stopColor="#94a3b8" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="platBotRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000" stopOpacity="0.0" />
              <stop offset="35%" stopColor="#334155" stopOpacity="0.58" />
              <stop offset="50%" stopColor="#475569" stopOpacity="0.72" />
              <stop offset="65%" stopColor="#334155" stopOpacity="0.58" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.0" />
            </linearGradient>
            <radialGradient id="platShadow" cx="50%" cy="50%" rx="50%" ry="50%">
              <stop offset="0%" stopColor="#000" stopOpacity="0.72" />
              <stop offset="55%" stopColor="#000" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.0" />
            </radialGradient>
            <filter id="silverGlow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="3.0" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Clean, Plain Aesthetic Floating Platform (Extra dotted lines removed per Requirement 4) */}
          <g>
            <ellipse cx="600" cy="452" rx="385" ry="62" fill="url(#platShadow)" />
            <ellipse cx="600" cy="432" rx="408" ry="132" fill="url(#platSideGrad)" />
            <ellipse cx="600" cy="412" rx="408" ry="132" fill="url(#platTopSurface)" />
            <ellipse cx="600" cy="432" rx="408" ry="132" fill="none" stroke="url(#platBotRim)" strokeWidth="2.5" />
            <ellipse cx="600" cy="412" rx="408" ry="132" fill="none" stroke="url(#platTopRim)" strokeWidth="2.8" />
            {/* Grounding shadow cast by aircraft directly onto platform surface */}
            <ellipse cx="600" cy="416" rx="270" ry="50" fill="rgba(0,0,0,0.55)" filter="blur(16px)" />
          </g>

          {/* Connecting lines — Only thick white line shown on hover, no dotted lines, no tiny dots */}
          {NODES.map((n) => {
            const isActive = activeNode === n.id;
            if (!isActive) return null;
            return (
              <g key={`line-${n.id}`}>
                {/* Thick white luminous connecting line */}
                <path
                  d={n.pathD}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3.2"
                  filter="url(#silverGlow)"
                  className="transition-all duration-300"
                />
              </g>
            );
          })}
        </svg>

        {/* Aircraft centered directly on top of metallic platform */}
        <div
          id="ecosystem-jet-source"
          className="absolute top-[80%] left-[87%] -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[920px] z-20 cursor-pointer pointer-events-auto"
          onMouseEnter={() => setJetHovered(true)}
          onMouseLeave={() => setJetHovered(false)}
          style={{
            transform: `translate3d(calc(-50% + ${mouseOffset.x * 20}px), calc(-50% + ${mouseOffset.y * 14}px), 0) rotateX(${-mouseOffset.y * 6}deg) rotateY(${mouseOffset.x * 10}deg)`,
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            perspective: 1200,
          }}
        >
          {jetHovered && (
            <div
              className="absolute inset-0 pointer-events-none overflow-visible z-25"
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              {AIR_STREAKS.map((s, i) => (
                <div
                  key={i}
                  className="jet-slipstream-streak"
                  style={
                    {
                      position: "absolute",
                      top: s.top,
                      left: s.left,
                      width: s.width,
                      height: s.h,
                      background: `linear-gradient(to right, transparent 0%, rgba(255,255,255,${s.opacity}) 35%, rgba(186,230,253,${s.opacity * 0.7}) 70%, transparent 100%)`,
                      boxShadow: "0 0 3px rgba(255,255,255,0.35)",
                      filter: "blur(0.4px)",
                      "--dur": s.duration,
                      "--delay": s.delay,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          )}
          <Image
            src="/images/ecosystem-jet-transparent.png"
            alt="M1 Autonomous Business Jet"
            width={1376}
            height={768}
            priority
            draggable={false}
            className={`w-full h-auto object-contain pointer-events-none select-none transition-all duration-500 ${
              jetHovered ? "brightness-110 drop-shadow-[0_40px_70px_rgba(0,0,0,0.99)]" : "brightness-105 drop-shadow-[0_28px_56px_rgba(0,0,0,0.95)]"
            }`}
          />
        </div>

        {/* 4 Corner Point Boxes with Hover Popups (Box does not extend, popup appears above/below) */}
        {NODES.map((n) => {
          const isActive = activeNode === n.id;
          const isRight = n.labelX > 600;
          const isBottom = n.labelY > 300;

          return (
            <div
              key={n.id}
              onMouseEnter={() => setActiveNode(n.id)}
              onMouseLeave={() => setActiveNode(null)}
              className="absolute z-30 cursor-pointer pointer-events-auto select-none"
              style={{
                left: `${(n.labelX / 1200) * 100}%`,
                top: `${(n.labelY / 680) * 100}%`,
                transform: isRight ? "translate(0%, -50%)" : "translate(-100%, -50%)",
              }}
            >
              {/* Compact Fixed-Width Sleek Aerospace Button (Never extends on hover!) */}
              <div
                className="relative flex items-center gap-3 px-5 py-3 border transition-all duration-300 group shadow-lg"
                style={{
                  clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(38, 52, 72, 0.98) 0%, rgba(18, 26, 38, 0.98) 100%)"
                    : "linear-gradient(135deg, rgba(20, 24, 34, 0.92) 0%, rgba(10, 14, 20, 0.95) 100%)",
                  borderColor: isActive ? "rgba(255, 255, 255, 0.95)" : "rgba(160, 185, 215, 0.4)",
                  boxShadow: isActive
                    ? "0 0 28px rgba(255, 255, 255, 0.35), 0 0 12px rgba(186, 230, 253, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.5)"
                    : "0 6px 20px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.15)",
                  transform: isActive ? "scale(1.05)" : "scale(1)",
                  backdropFilter: "blur(14px)",
                }}
              >
                {/* Number */}
                <span
                  className="text-[12px] font-mono font-bold tracking-[0.25em] shrink-0 transition-colors"
                  style={{ color: isActive ? "#ffffff" : "#cbd5e1" }}
                >
                  {n.number}
                </span>

                {/* Divider */}
                <span
                  className="w-[1.5px] h-4 shrink-0 transition-colors"
                  style={{ background: isActive ? "rgba(255, 255, 255, 0.9)" : "rgba(148, 163, 184, 0.4)" }}
                />

                {/* Title */}
                <span
                  className="text-[15px] font-mono font-black tracking-[0.16em] whitespace-nowrap transition-colors"
                  style={{
                    color: isActive ? "#ffffff" : "#f1f5f9",
                    textShadow: isActive ? "0 0 14px rgba(255, 255, 255, 0.7)" : "0 1px 2px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  {n.title}
                </span>

                {/* Subtle Live Beacon Indicator */}
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ml-1 ${
                    isActive
                      ? "bg-cyan-400 shadow-[0_0_8px_#38bdf8] scale-125"
                      : "bg-slate-500/60"
                  }`}
                />
              </div>

              {/* Tilted Sharp-Edged Aerospace Hover Card (Moved inwards, reduced length, increased height) */}
              {isActive && (() => {
                const isTopRow = n.number === "01" || n.number === "02";
                return (
                  <div
                    className={`absolute z-50 w-[265px] sm:w-[275px] pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95 ${
                      isTopRow ? "top-[calc(100%+14px)]" : "bottom-[calc(100%+14px)]"
                    } ${isRight ? "right-4 sm:right-8" : "left-4 sm:left-8"}`}
                  >
                    {/* Tilted Sharp-Edged Outer Border Container */}
                    <div
                      className="relative p-[1.5px] shadow-[0_16px_36px_rgba(0,0,0,0.95)]"
                      style={{
                        clipPath: "polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)",
                        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(148, 163, 184, 0.35) 45%, rgba(56, 189, 248, 0.7) 100%)",
                      }}
                    >
                      {/* Tilted Sharp-Edged Inner Card Body */}
                      <div
                        className="relative w-full min-h-[175px] p-5 flex flex-col justify-between backdrop-blur-xl text-left"
                        style={{
                          clipPath: "polygon(13.5px 0%, 100% 0%, calc(100% - 13.5px) 100%, 0% 100%)",
                          background: "linear-gradient(135deg, rgba(20, 28, 40, 0.98) 0%, rgba(10, 14, 22, 0.98) 100%)",
                        }}
                      >
                        {/* Header: Node & Live Status */}
                        <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800/80">
                          <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-cyan-300 uppercase">
                            {n.number} // {n.title}
                          </span>
                          <span className="text-[10px] font-mono tracking-wider text-emerald-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                            {n.status}
                          </span>
                        </div>

                        {/* Content: Metric & Subtitle */}
                        <div className="space-y-1.5 my-2">
                          <div className="text-[15px] font-mono font-bold text-white tracking-tight leading-snug">
                            {n.metric}
                          </div>
                          <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                            {n.subtitle}
                          </p>
                        </div>

                        {/* Telemetry Footer */}
                        <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                          <span className="uppercase tracking-widest">{n.details[0]?.label || "TELEMETRY"}</span>
                          <span className="text-zinc-300 font-semibold">{n.details[0]?.value || "ACTIVE"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        })}
      </div>

      {/* 4. Mobile Layout (First 4 cards) */}
      <div className="lg:hidden relative max-w-xl mx-auto px-4 z-20 space-y-4">
        <div className="relative w-full max-w-md mx-auto aspect-[16/10] flex items-center justify-center">
          <div className="absolute inset-x-8 bottom-4 h-20 rounded-full bg-slate-400/10 blur-2xl pointer-events-none" />
          <Image
            src="/images/ecosystem-jet-transparent.png"
            alt="M1 Aircraft"
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-contain"
            style={{ filter: "brightness(1.08) contrast(1.04) drop-shadow(0 20px 40px rgba(0,0,0,0.95))" }}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {NODES.map((n) => {
            const isActive = activeNode === n.id;
            return (
              <div
                key={`mob-${n.id}`}
                onClick={() => setActiveNode(activeNode === n.id ? null : n.id)}
                className="cursor-pointer transition-all duration-300 p-3.5 flex flex-col gap-1 border"
                style={{
                  clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(38, 52, 72, 0.98) 0%, rgba(18, 26, 38, 0.98) 100%)"
                    : "linear-gradient(135deg, rgba(20, 24, 34, 0.92) 0%, rgba(10, 14, 20, 0.95) 100%)",
                  borderColor: isActive ? "rgba(255, 255, 255, 0.95)" : "rgba(160, 185, 215, 0.4)",
                  boxShadow: isActive ? "0 0 18px rgba(255, 255, 255, 0.3)" : "none",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-white tracking-widest">{n.number}</span>
                  <span className="w-px h-3 bg-slate-600 shrink-0" />
                  <span className="text-[13px] font-mono font-black text-white tracking-wider">{n.title}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Tilted Sharp-Edged Card */}
        {activeNode && (() => {
          const n = NODES.find((item) => item.id === activeNode);
          if (!n) return null;
          return (
            <div
              className="relative p-[1.5px] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
              style={{
                clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(148, 163, 184, 0.35) 45%, rgba(56, 189, 248, 0.7) 100%)",
              }}
            >
              <div
                className="p-5 flex flex-col justify-between min-h-[160px] text-left space-y-2 backdrop-blur-xl"
                style={{
                  clipPath: "polygon(11.5px 0%, 100% 0%, calc(100% - 11.5px) 100%, 0% 100%)",
                  background: "linear-gradient(135deg, rgba(20, 28, 40, 0.98) 0%, rgba(10, 14, 22, 0.98) 100%)",
                }}
              >
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <span className="text-xs font-mono font-semibold tracking-wider text-cyan-300 uppercase">
                    {n.number} // {n.title}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">
                    {n.status}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-base font-mono font-bold text-white">{n.metric}</div>
                  <p className="text-xs text-zinc-400 font-light">{n.subtitle}</p>
                </div>
                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span className="uppercase">{n.details[0]?.label || "TELEMETRY"}</span>
                  <span className="text-zinc-300 font-semibold">{n.details[0]?.value || "ACTIVE"}</span>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}

