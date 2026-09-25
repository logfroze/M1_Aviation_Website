"use client";

import React, { useState, useEffect } from "react";
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
}

const NODES: EcosystemNode[] = [
  {
    id: "aircraft",
    number: "01",
    title: "AIRCRAFT",
    subtitle: "Jet Inventory & Fleet Management",
    labelX: 160,
    labelY: 105,
    jetX: 458,
    jetY: 288,
    pathD: "M 160 105 C 280 105 385 195 458 288",
    metric: "5,000+ Verified Airframes",
  },
  {
    id: "operators",
    number: "02",
    title: "OPERATORS",
    subtitle: "Charter, Management & Operations",
    labelX: 1045,
    labelY: 105,
    jetX: 692,
    jetY: 298,
    pathD: "M 1045 105 C 915 105 795 200 692 298",
    metric: "340+ Flight Operations",
  },
  {
    id: "parts",
    number: "03",
    title: "PARTS",
    subtitle: "Spare Parts & Supply Chain",
    labelX: 1090,
    labelY: 340,
    jetX: 818,
    jetY: 382,
    pathD: "M 1090 340 C 995 340 905 360 818 382",
    metric: "Instant OEM Escrow",
  },
  {
    id: "maintenance",
    number: "04",
    title: "MAINTENANCE",
    subtitle: "MRO & Service Network",
    labelX: 1050,
    labelY: 560,
    jetX: 702,
    jetY: 432,
    pathD: "M 1050 560 C 935 560 815 500 702 432",
    metric: "12 Certified Repair Hubs",
  },
  {
    id: "data",
    number: "05",
    title: "DATA",
    subtitle: "Insights, Analytics & Intelligence",
    labelX: 250,
    labelY: 560,
    jetX: 558,
    jetY: 435,
    pathD: "M 250 560 C 355 560 460 500 558 435",
    metric: "Autonomous Flight Telemetry",
  },
  {
    id: "finance",
    number: "06",
    title: "FINANCE",
    subtitle: "Leasing, Payments & Capital",
    labelX: 120,
    labelY: 370,
    jetX: 375,
    jetY: 330,
    pathD: "M 120 370 C 205 370 295 345 375 330",
    metric: "$450M+ Capital Pipeline",
  },
];

// Air-streak definitions for hover flyby effect (Subtle hairline slipstreams parallel to jet)
const AIR_STREAKS = [
  // 1. Radome / Nose tip
  { top: "60%", left: "10%", width: "24%", delay: "0s",    duration: "0.52s", opacity: 0.42, h: "1px" },

  // 2. Cockpit windshield
  { top: "48%", left: "19%", width: "28%", delay: "0.14s", duration: "0.56s", opacity: 0.48, h: "1px" },

  // 3. Left wing leading edge
  { top: "38%", left: "18%", width: "26%", delay: "0.06s", duration: "0.50s", opacity: 0.38, h: "1px" },

  // 4. Fuselage window beltline
  { top: "46%", left: "30%", width: "32%", delay: "0.10s", duration: "0.54s", opacity: 0.45, h: "1px" },

  // 5. Left engine nacelle
  { top: "37%", left: "44%", width: "28%", delay: "0.04s", duration: "0.52s", opacity: 0.42, h: "1px" },

  // 6. Right wing span
  { top: "62%", left: "42%", width: "30%", delay: "0.18s", duration: "0.55s", opacity: 0.38, h: "1px" },

  // 7. T-tail stabilizer
  { top: "22%", left: "54%", width: "26%", delay: "0.08s", duration: "0.52s", opacity: 0.40, h: "1px" },
];

export default function OneLiner() {
  const [activeNode, setActiveNode] = useState<string>("aircraft");
  const [jetHovered, setJetHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((curr) => {
        const idx = NODES.findIndex((n) => n.id === curr);
        return NODES[(idx + 1) % NODES.length].id;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

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
      <div className="hidden lg:block relative max-w-[1280px] mx-auto px-4 w-full" style={{ height: 680 }}>
        {/* SVG: platform + connection lines */}
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
            <linearGradient id="activeLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.6" />
            </linearGradient>
            <filter id="silverGlow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="dotGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Solid silver platform */}
          <g>
            <ellipse cx="600" cy="452" rx="385" ry="62" fill="url(#platShadow)" />
            <ellipse cx="600" cy="432" rx="408" ry="132" fill="url(#platSideGrad)" />
            <ellipse cx="600" cy="412" rx="408" ry="132" fill="url(#platTopSurface)" />
            <ellipse cx="600" cy="432" rx="408" ry="132" fill="none" stroke="url(#platBotRim)" strokeWidth="2.5" />
            <ellipse cx="600" cy="412" rx="408" ry="132" fill="none" stroke="url(#platTopRim)" strokeWidth="2.8" />
            <ellipse
              cx="600"
              cy="412"
              rx="312"
              ry="100"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="0.9"
              strokeDasharray="12 9"
              opacity="0.35"
            />
            <ellipse
              cx="600"
              cy="412"
              rx="200"
              ry="64"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="0.8"
              strokeDasharray="6 5"
              opacity="0.28"
            />
            <ellipse
              cx="600"
              cy="412"
              rx="95"
              ry="30"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="0.6"
              opacity="0.22"
            />
            <ellipse cx="600" cy="412" rx="18" ry="6" fill="#f8fafc" opacity="0.35" />
            <line x1="192" y1="412" x2="248" y2="412" stroke="#94a3b8" strokeWidth="0.7" opacity="0.30" />
            <line x1="952" y1="412" x2="1008" y2="412" stroke="#94a3b8" strokeWidth="0.7" opacity="0.30" />
          </g>

          {/* Connection lines */}
          {NODES.map((n) => {
            const isActive = activeNode === n.id;
            return (
              <g key={`line-${n.id}`}>
                {/* Connecting Path */}
                <path
                  d={n.pathD}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1.2"
                  strokeOpacity={isActive ? 0 : 0.55}
                  strokeDasharray="5 4"
                />
                {isActive && (
                  <path
                    d={n.pathD}
                    fill="none"
                    stroke="url(#activeLineGrad)"
                    strokeWidth="2.2"
                    filter="url(#silverGlow)"
                  />
                )}

                {/* Badge End Connector Dot */}
                <circle
                  cx={n.labelX}
                  cy={n.labelY}
                  r={isActive ? 4.5 : 3}
                  fill={isActive ? "#ffffff" : "#cbd5e1"}
                  filter={isActive ? "url(#dotGlow)" : undefined}
                  opacity={isActive ? 1 : 0.8}
                />
                {isActive && (
                  <circle
                    cx={n.labelX}
                    cy={n.labelY}
                    r={9}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1"
                    className="animate-ping"
                    opacity={0.4}
                  />
                )}

                {/* Jet End Beacon Dot */}
                <circle
                  cx={n.jetX}
                  cy={n.jetY}
                  r={isActive ? 5.5 : 3.5}
                  fill={isActive ? "#ffffff" : "#94a3b8"}
                  filter={isActive ? "url(#dotGlow)" : undefined}
                  opacity={isActive ? 1 : 0.65}
                />
                {isActive && (
                  <circle
                    cx={n.jetX}
                    cy={n.jetY}
                    r={13}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                    className="animate-ping"
                    opacity={0.5}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Aircraft + hover air-stream (Single-direction, streaming backward from left to right) */}
        <div
          className="absolute top-[43%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[900px] z-20 cursor-pointer"
          onMouseEnter={() => setJetHovered(true)}
          onMouseLeave={() => setJetHovered(false)}
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
            className={`w-full h-auto object-contain pointer-events-none select-none transition-all duration-700 ${
              jetHovered ? "jet-hover-float" : ""
            }`}
            style={{
              filter: "brightness(1.10) contrast(1.05) drop-shadow(0 32px 64px rgba(0,0,0,0.98))",
            }}
          />
        </div>

        {/* Node labels — parallelogram sharp-edge boxes (Brighter & Larger) */}
        {NODES.map((n) => {
          const isActive = activeNode === n.id;
          const isRight = n.labelX > 600;
          return (
            <div
              key={n.id}
              onClick={() => setActiveNode(n.id)}
              onMouseEnter={() => setActiveNode(n.id)}
              className="absolute z-30 cursor-pointer transition-all duration-300"
              style={{
                left: `${(n.labelX / 1200) * 100}%`,
                top: `${(n.labelY / 680) * 100}%`,
                transform: isRight ? "translate(0%, -50%)" : "translate(-100%, -50%)",
              }}
            >
              <div
                className="relative flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-3.5 border transition-all duration-300 group"
                style={{
                  clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(38, 52, 72, 0.98) 0%, rgba(18, 26, 38, 0.98) 100%)"
                    : "linear-gradient(135deg, rgba(24, 30, 42, 0.94) 0%, rgba(12, 16, 24, 0.96) 100%)",
                  borderColor: isActive ? "rgba(255, 255, 255, 0.95)" : "rgba(160, 185, 215, 0.65)",
                  boxShadow: isActive
                    ? "0 0 28px rgba(255, 255, 255, 0.35), 0 0 12px rgba(186, 230, 253, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.5)"
                    : "0 6px 20px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
                  transform: isActive ? "scale(1.08)" : "scale(1)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Number */}
                <span
                  className="text-[12px] sm:text-[13px] font-mono font-bold tracking-[0.25em] shrink-0 transition-colors"
                  style={{ color: isActive ? "#ffffff" : "#cbd5e1" }}
                >
                  {n.number}
                </span>

                {/* Divider */}
                <span
                  className="w-[1.5px] h-4.5 shrink-0 transition-colors"
                  style={{ background: isActive ? "rgba(255, 255, 255, 0.85)" : "rgba(148, 163, 184, 0.5)" }}
                />

                {/* Title */}
                <span
                  className="text-[16px] sm:text-[18px] font-mono font-black tracking-[0.16em] whitespace-nowrap transition-colors"
                  style={{
                    color: isActive ? "#ffffff" : "#f1f5f9",
                    textShadow: isActive ? "0 0 14px rgba(255, 255, 255, 0.7)" : "0 1px 2px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  {n.title}
                </span>

                {/* Active metric — shown inline after title */}
                {isActive && (
                  <span className="text-[11px] sm:text-[12px] font-mono tracking-wider text-cyan-200 font-semibold whitespace-nowrap pl-2.5 border-l border-slate-500/80 ml-1">
                    {n.metric}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Mobile */}
      <div className="lg:hidden relative max-w-xl mx-auto px-4 z-20 space-y-6">
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
                onClick={() => setActiveNode(n.id)}
                className="cursor-pointer transition-all duration-300 p-3.5 flex items-center gap-2.5 border"
                style={{
                  clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(38, 52, 72, 0.98) 0%, rgba(18, 26, 38, 0.98) 100%)"
                    : "linear-gradient(135deg, rgba(24, 30, 42, 0.94) 0%, rgba(12, 16, 24, 0.96) 100%)",
                  borderColor: isActive ? "rgba(255, 255, 255, 0.95)" : "rgba(160, 185, 215, 0.65)",
                  boxShadow: isActive ? "0 0 18px rgba(255, 255, 255, 0.3)" : "none",
                }}
              >
                <span
                  className="text-[11px] font-mono font-bold tracking-widest"
                  style={{ color: isActive ? "#ffffff" : "#cbd5e1" }}
                >
                  {n.number}
                </span>
                <span className="w-px h-3.5 bg-slate-600 shrink-0" />
                <span
                  className="text-[13px] font-mono font-black tracking-wider"
                  style={{ color: isActive ? "#ffffff" : "#f1f5f9" }}
                >
                  {n.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
