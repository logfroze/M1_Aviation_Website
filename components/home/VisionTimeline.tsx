"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { VISION_MILESTONES } from "@/data/vision";

interface MilestoneItem {
  year: string;
  phase: string;
  title: string;
  statement: string;
  side: "right" | "left"; // Alternating: "right" = above/right, "left" = below/left
  roadX: number;
  roadY: number;
  cardX: number;
  cardY: number;
  icon: React.ReactNode;
}

// =========================================================================
// 📍 MANUAL CARD POSITIONS CONFIGURATION
// You can edit the positions of each milestone card manually below:
// - cardX : Horizontal position of the card (larger = further right, smaller = further left)
// - cardY : Vertical position of the card (larger = further down, smaller = further up)
// - roadX : Horizontal coordinate on the road where the year is printed & leader line connects
// - roadY : Vertical coordinate on the road
// - side  : "right" (card is above the road) | "left" (card is below the road)
// =========================================================================
export const MILESTONES: MilestoneItem[] = [
  {
    year: "2027",
    phase: "PHASE 01",
    title: "Marketplace Data",
    statement: VISION_MILESTONES[0].statement,
    side: "right", // Above the road
    roadX: 420,
    roadY: 198,
    cardX: 270,
    cardY: -160, // Elevated with generous clearance above the road
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2 5-2" />
        <path d="M12 15v5s3.03-.55 4.5-2c1.63-1.62 2-5 2-5" />
      </svg>
    ),
  },
  {
    year: "2028",
    phase: "PHASE 02",
    title: "SAIOS Launch",
    statement: VISION_MILESTONES[1].statement,
    side: "left", // Below the road
    roadX: 900,
    roadY: 265,
    cardX: 1120,
    cardY: -10,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
        <path d="m9 16 2 2 4-4" />
      </svg>
    ),
  },
  {
    year: "2029",
    phase: "PHASE 03",
    title: "Enterprise Liquidity",
    statement: VISION_MILESTONES[2].statement,
    side: "right", // Outside right bend
    roadX: 1350,
    roadY: 560,
    cardX: 1470,
    cardY: 520,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <line x1="12" x2="12" y1="20" y2="10" />
        <line x1="18" x2="18" y1="20" y2="4" />
        <line x1="6" x2="6" y1="20" y2="16" />
        <path d="m3 3 6 6 4-4 8 8" />
      </svg>
    ),
  },
  {
    year: "2030",
    phase: "PHASE 04",
    title: "Global Fleet Scale",
    statement: VISION_MILESTONES[3].statement,
    side: "left", // Outside left bend
    roadX: 640,
    roadY: 730,
    cardX: 10,
    cardY: 600,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
        <path d="M12 6v2" />
        <path d="M12 16v2" />
      </svg>
    ),
  },
  {
    year: "2035",
    phase: "PHASE 05",
    title: "Autonomous Network",
    statement: VISION_MILESTONES[4].statement,
    side: "right", // Above the road
    roadX: 1240,
    roadY: 980,
    cardX: 830,
    cardY: 1070,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    year: "2037",
    phase: "PHASE 06",
    title: "Unicorn Ecosystem",
    statement: VISION_MILESTONES[5].statement,
    side: "left", // Below the road
    roadX: 1760,
    roadY: 1030,
    cardX: 1500,
    cardY: 1080,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
];

// ── Wavy Serpentine Road Path: First heads right, sweeps in a big smooth curve left, then sweeps right towards destination ──
const ROAD_PATH =
  "M 60 160 C 340 180, 620 220, 940 270 C 1260 320, 1440 430, 1340 560 C 1220 680, 860 620, 680 720 C 540 800, 600 910, 880 960 C 1200 990, 1680 1015, 2140 1070";

export default function VisionTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const roadPathRef = useRef<SVGPathElement>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fillerHead, setFillerHead] = useState({ x: 60, y: 160 });

  // Smooth lerp loop for scroll progress
  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const headerOffset = 30;
      const bottomHold = 420; // Hold view at end of road so content stays comfortably on screen before unpinning
      const scrollableDistance = rect.height - window.innerHeight - headerOffset - bottomHold;
      if (scrollableDistance <= 0) return;

      const raw = (-rect.top - headerOffset) / scrollableDistance;
      targetProgressRef.current = Math.min(1, Math.max(0, raw));
    };

    const updateLoop = () => {
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.12;
      const prog = currentProgressRef.current;
      setSmoothProgress(prog);

      // Track exact (x, y) coordinates of the silver fill head along the curved road
      if (roadPathRef.current) {
        try {
          const totalLength = roadPathRef.current.getTotalLength();
          const currentLen = totalLength * Math.min(1, Math.max(0, prog));
          const pt = roadPathRef.current.getPointAtLength(currentLen);
          setFillerHead({ x: pt.x, y: pt.y });
        } catch {
          // ignore before SVG mount
        }
      }

      const idx = Math.min(
        MILESTONES.length - 1,
        Math.max(0, Math.floor(prog * MILESTONES.length + 0.15))
      );
      setActiveIndex(idx);

      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Camera tracking waypoints along the big wavy curves
  const getCameraWaypoint = (p: number) => {
    const t = Math.max(0, Math.min(1, p));
    const WAYPOINTS = [
      { p: 0.00, x: 440,  y: 220, zoom: 1.00 }, // Runway departure, Step 01 & Parked Jet
      { p: 0.18, x: 820,  y: 290, zoom: 1.03 }, // Step 02 (heading right)
      { p: 0.40, x: 1240, y: 520, zoom: 1.06 }, // Step 03 (sweeping right bend)
      { p: 0.62, x: 580,  y: 730, zoom: 1.08 }, // Step 04 (sweeping left bend)
      { p: 0.82, x: 1220, y: 920, zoom: 1.10 }, // Step 05 (sweeping right east)
      { p: 1.00, x: 1540, y: 860, zoom: 1.02 }, // Step 06 & Terminal Jet - perfectly centered so content fills screen without blank void
    ];

    for (let i = 0; i < WAYPOINTS.length - 1; i++) {
      const w1 = WAYPOINTS[i];
      const w2 = WAYPOINTS[i + 1];
      if (t >= w1.p && t <= w2.p) {
        const segT = (t - w1.p) / (w2.p - w1.p);
        const ease = segT * segT * (3 - 2 * segT);
        return {
          x: w1.x + (w2.x - w1.x) * ease,
          y: w1.y + (w2.y - w1.y) * ease,
          zoom: w1.zoom + (w2.zoom - w1.zoom) * ease,
        };
      }
    }
    return WAYPOINTS[WAYPOINTS.length - 1];
  };

  const cameraTransform = (() => {
    const cam = getCameraWaypoint(smoothProgress);
    const viewportCenterX = 850;
    const viewportCenterY = 480;

    const translateX = viewportCenterX - cam.x * cam.zoom;
    const translateY = viewportCenterY - cam.y * cam.zoom;

    return { translateX, translateY, zoomScale: cam.zoom };
  })();

  // Calculate live road completion percentage and recharge status
  const percentage = Math.min(100, Math.max(0, Math.round(smoothProgress * 100)));
  const isNearEnd = smoothProgress >= 0.88;
  const isRecharged = smoothProgress >= 0.95;
  const rechargeRatio = isNearEnd ? Math.min(1, Math.max(0, (smoothProgress - 0.88) / 0.12)) : 0;

  return (
    <div
      ref={containerRef}
      aria-label="The 10-Year Vision Roadmap"
      className="relative w-full h-[320vh] bg-[#04060a]"
    >
      {/* ── Relative Section Header (Moves naturally up and out of the way as user scrolls down) ── */}
      <div className="relative z-30 pt-14 sm:pt-20 pb-4 px-6 max-w-5xl mx-auto text-center pointer-events-none">
        <div className="inline-flex items-center px-3 py-1 rounded bg-zinc-900 border border-zinc-700/80 mb-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-300 font-semibold">
            Strategic Flight Horizon
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
          The 10-Year Vision
        </h2>
        <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.24em] text-zinc-400 mt-1">
          Chronological Trajectory • Scroll to Travel Along Road
        </p>
      </div>

      {/* ── Sticky Fullscreen Viewport for the Road Scene ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-start select-none">
        {/* Subtle Dark Matte Background */}
        <div className="absolute inset-0 pointer-events-none z-0 bg-[#04060a]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#04060a] via-[#080b10] to-[#04060a]" />
        </div>

        {/* ── Minimalist Viewport Telemetry: Live Percentage Readout ── */}
        <div className="absolute top-6 right-6 sm:right-10 z-30 flex items-center gap-3 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-md shadow-xl pointer-events-none">
          <div
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              isRecharged
                ? "bg-cyan-400 shadow-[0_0_8px_#38bdf8]"
                : "bg-white shadow-[0_0_8px_#ffffff]"
            }`}
          />
          <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase font-semibold">
            Road Completion
          </span>
          <span className="text-sm sm:text-base font-mono font-black text-white tracking-wider">
            {percentage}%
          </span>
        </div>

        {/* ── Road Scene along the Wavy Serpentine Path ── */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-auto overflow-hidden">
          <div
            className="relative w-full h-full max-w-[2200px] max-h-[1450px] will-change-transform"
            style={{
              transform: `translate3d(${cameraTransform.translateX}px, ${cameraTransform.translateY}px, 0) scale(${cameraTransform.zoomScale})`,
              transformOrigin: "0 0",
            }}
          >
            {/* ── SVG Road & Interactive Milestones ── */}
            <svg
              viewBox="0 0 2200 1450"
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full overflow-visible"
            >
              <defs>
                {/* Silver/White Roadbed Fill Gradients */}
                <linearGradient id="roadSilverGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
                  <stop offset="50%" stopColor="#cbd5e1" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.65" />
                </linearGradient>

                <linearGradient id="roadSilverBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.85" />
                  <stop offset="35%" stopColor="#94a3b8" stopOpacity="0.55" />
                  <stop offset="70%" stopColor="#f8fafc" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
                </linearGradient>

                <radialGradient id="rechargeThrustGlow" cx="100%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#f97316" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* ── Solid Highway Track Structure (Sharp Geometric Edges, Heavy Asphalt Foundation) ── */}
              <g id="road-track-solid">
                {/* 1. Outer Heavy Curb Foundation Line */}
                <path
                  d={ROAD_PATH}
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="82"
                  strokeLinecap="butt"
                />
                {/* 2. Crisp Shoulder Curb Edges (White/Slate boundary) */}
                <path
                  d={ROAD_PATH}
                  fill="none"
                  stroke="#475569"
                  strokeWidth="78"
                  strokeLinecap="butt"
                />
                {/* 3. Solid Deep Black Tarmac Roadbed */}
                <path
                  d={ROAD_PATH}
                  fill="none"
                  stroke="#090d16"
                  strokeWidth="72"
                  strokeLinecap="butt"
                />
                {/* 4. Sharp Dashed Runway Guidance Centerline */}
                <path
                  d={ROAD_PATH}
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="2.5"
                  strokeDasharray="18 12"
                  strokeLinecap="butt"
                  opacity="0.85"
                />

                {/* ── PROGRESSIVE SILVER/WHITE SOLID ROAD FILLER ── */}
                {/* 1. Underlying Solid Silver Base Layer */}
                <path
                  d={ROAD_PATH}
                  fill="none"
                  stroke="url(#roadSilverGlow)"
                  strokeWidth="72"
                  strokeLinecap="butt"
                  pathLength={1000}
                  strokeDasharray="1000"
                  strokeDashoffset={1000 * (1 - smoothProgress)}
                  opacity={0.55}
                />

                {/* 2. Core Solid Metallic Highway Slab */}
                <path
                  d={ROAD_PATH}
                  fill="none"
                  stroke="url(#roadSilverBeam)"
                  strokeWidth="64"
                  strokeLinecap="butt"
                  pathLength={1000}
                  strokeDasharray="1000"
                  strokeDashoffset={1000 * (1 - smoothProgress)}
                  opacity={0.98}
                />

                {/* 3. Razor-Sharp Solid White Progress Centerline */}
                <path
                  ref={roadPathRef}
                  d={ROAD_PATH}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="4"
                  strokeLinecap="butt"
                  pathLength={1000}
                  strokeDasharray="1000"
                  strokeDashoffset={1000 * (1 - smoothProgress)}
                />
              </g>

              {/* ── Traveling Head of the Road Fill with Prominent Solid Percentage Display ── */}
              {smoothProgress > 0.005 && (
                <g
                  transform={`translate(${fillerHead.x}, ${fillerHead.y})`}
                  className="pointer-events-none transition-transform duration-75"
                >
                  {/* Razor-sharp cut bar across the roadbed at the fill head */}
                  <line
                    x1="0"
                    y1="-36"
                    x2="0"
                    y2="36"
                    stroke="#ffffff"
                    strokeWidth="4"
                    strokeLinecap="butt"
                  />
                  <rect
                    x="-4"
                    y="-4"
                    width="8"
                    height="8"
                    fill="#ffffff"
                    stroke="#000000"
                    strokeWidth="1.2"
                  />

                  {/* Floating Sharp Solid Percentage Badge */}
                  <g transform="translate(0, -50)">
                    {/* Sharp Solid Connection Stalk */}
                    <line
                      x1="0"
                      y1="22"
                      x2="0"
                      y2="44"
                      stroke="#ffffff"
                      strokeWidth="2.2"
                      strokeLinecap="butt"
                    />

                    {/* Sharp Solid Rectangular Container */}
                    <rect
                      x="-105"
                      y="-22"
                      width="210"
                      height="44"
                      rx="0"
                      fill="#06090e"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                    />

                    {/* Prominent Large Percentage Word & Value */}
                    <text
                      x="0"
                      y="7"
                      textAnchor="middle"
                      fill="#ffffff"
                      className="font-mono text-[19px] font-black tracking-widest select-none uppercase fill-white"
                    >
                      PERCENTAGE {percentage}%
                    </text>
                  </g>
                </g>
              )}

              {/* ── ALL YEARS ON THE ROAD: Large, Solid, Sharp Station Labels (Always Visible) ── */}
              <g id="road-year-stations">
                {MILESTONES.map((m, idx) => {
                  const isActive = idx === activeIndex;
                  const isPassed = smoothProgress >= (idx / (MILESTONES.length - 1)) * 0.95;

                  return (
                    <g key={`road-station-${m.year}`} className="transition-all duration-300">
                      {/* Sharp diamond station checkpoint on the road centerline */}
                      <rect
                        x={m.roadX - 7}
                        y={m.roadY - 7}
                        width="14"
                        height="14"
                        transform={`rotate(45 ${m.roadX} ${m.roadY})`}
                        fill={isActive ? "#ffffff" : isPassed ? "#cbd5e1" : "#090d16"}
                        stroke={isActive ? "#ffffff" : isPassed ? "#ffffff" : "#64748b"}
                        strokeWidth="2"
                      />

                      {/* Enlarged Year label printed prominently along the road */}
                      <text
                        x={
                          m.year === "2029"
                            ? m.roadX - 32
                            : m.year === "2030"
                            ? m.roadX + 32
                            : m.roadX
                        }
                        y={
                          m.year === "2027" || m.year === "2028"
                            ? m.roadY + 56
                            : m.year === "2035" || m.year === "2037"
                            ? m.roadY - 38
                            : m.roadY + 9
                        }
                        textAnchor={
                          m.year === "2029"
                            ? "end"
                            : m.year === "2030"
                            ? "start"
                            : "middle"
                        }
                        fill={isActive ? "#ffffff" : isPassed ? "#e2e8f0" : "#94a3b8"}
                        className={`font-mono text-[26px] font-black tracking-widest select-none transition-all duration-300 ${
                          isActive
                            ? "fill-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                            : isPassed
                            ? "fill-zinc-100"
                            : "fill-zinc-400"
                        }`}
                      >
                        {m.year}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* ── START OF ROAD: Solid Sharp Departure Threshold ── */}
              <g id="road-start-threshold" transform="translate(60, 160)">
                {/* Tow Cable Latch Shackle Point (Used by ScrollFlightJet to hitch and pull road) */}
                <circle
                  id="road-tow-anchor"
                  cx="0"
                  cy="0"
                  r="9"
                  fill="#090d14"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  opacity="1"
                />

                {/* Sharp Perpendicular Threshold Border Line (seals the 72px road mouth) */}
                <line
                  x1="0"
                  y1="-36"
                  x2="0"
                  y2="36"
                  stroke="#ffffff"
                  strokeWidth="4"
                  strokeLinecap="butt"
                />
                {/* Secondary Precision Stop Line */}
                <line
                  x1="6"
                  y1="-36"
                  x2="6"
                  y2="36"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                  strokeLinecap="butt"
                />
                {/* Runway Piano Key Stripes */}
                {[-26, -18, -10, -2, 6, 14, 22].map((offsetY, i) => (
                  <line
                    key={`thr-${i}`}
                    x1="12"
                    y1={offsetY}
                    x2="30"
                    y2={offsetY}
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinecap="butt"
                    opacity="0.9"
                  />
                ))}
              </g>

              {/* ── END OF ROAD: Solid Sharp Terminal Edge (x=2140, y=1070) ── */}
              <g id="road-end-threshold" transform="translate(2140, 1070)">
                {/* Primary Sharp Terminal Boundary Line across 72px road width */}
                <line
                  x1="-4.5"
                  y1="-36"
                  x2="4.5"
                  y2="36"
                  stroke="#ffffff"
                  strokeWidth="4"
                  strokeLinecap="butt"
                />
                {/* Secondary Terminal Precision Line */}
                <line
                  x1="-10.5"
                  y1="-36"
                  x2="-1.5"
                  y2="36"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeLinecap="butt"
                />
                {isNearEnd && (
                  <line
                    x1="1.5"
                    y1="-36"
                    x2="10.5"
                    y2="36"
                    stroke="#ffffff"
                    strokeWidth={isRecharged ? 3.5 : 2}
                    strokeLinecap="butt"
                    opacity={rechargeRatio}
                  />
                )}
              </g>

              {/* ── Power Conduit Transfer Line (from Sharp Terminal into Jet) ── */}
              {isNearEnd && (
                <g className="transition-opacity duration-300 pointer-events-none">
                  <line
                    x1="2140"
                    y1="1070"
                    x2="2350"
                    y2="1030"
                    stroke="#ffffff"
                    strokeWidth={isRecharged ? 3 : 1.8}
                    strokeDasharray="8 6"
                    strokeLinecap="butt"
                    opacity={0.8 + rechargeRatio * 0.2}
                    filter="drop-shadow(0 0 8px rgba(255,255,255,0.85))"
                  />
                  <rect
                    x={2140 + (2350 - 2140) * Math.min(1, (smoothProgress - 0.88) / 0.1) - 4}
                    cy={1070 + (1030 - 1070) * Math.min(1, (smoothProgress - 0.88) / 0.1) - 4}
                    width="8"
                    height="8"
                    fill="#ffffff"
                    filter="drop-shadow(0 0 8px #ffffff)"
                  />
                </g>
              )}

              {/* ── Stationary Supersonic Jet with Power Recharged Boost Effect ── */}
              <g
                id="vision-end-jet-anchor"
                transform={`translate(2580, ${1030 - rechargeRatio * 18})`}
              >
                <g
                  id="vision-end-jet-wrapper"
                  className="transition-all duration-300"
                  style={{ opacity: 1 }}
                >
                  {/* Tarmac Ground Shadow (softens and shrinks slightly as plane lifts) */}
                  <ellipse
                    cx="10"
                    cy={130 + rechargeRatio * 18}
                    rx={300 - rechargeRatio * 25}
                    ry={24 - rechargeRatio * 6}
                    fill="#000000"
                    opacity={0.80 - rechargeRatio * 0.25}
                    filter="blur(16px)"
                  />


                  {/* Supersonic Jet: Rotated to horizontal, lifts and pitches up slightly on full recharge */}
                  <image
                    id="vision-end-jet"
                    href="/images/footer-jet.png"
                    x="-410"
                    y="-229"
                    width="820"
                    height="458"
                    transform={`rotate(${15 - rechargeRatio * 4})`}
                    preserveAspectRatio="xMidYMid meet"
                    style={{
                      filter: isRecharged
                        ? "drop-shadow(0 0 35px rgba(255,255,255,0.75)) drop-shadow(0 24px 48px rgba(0,0,0,0.95))"
                        : "drop-shadow(0 24px 48px rgba(0,0,0,0.95))",
                      transition: "filter 0.3s ease",
                    }}
                  />

                  {/* Subtle Standby Navigation Beacon Accent on Engine Nacelle */}
                  <circle cx="-300" cy="55" r="5" fill="#f97316" opacity="0.75" filter="blur(2px)" />
                  <circle cx="-300" cy="55" r="2" fill="#ffffff" />

                  {/* Power Recharged Engine Thrusters Boost Flames */}
                  {isNearEnd && (
                    <g
                      className="transition-opacity duration-300 pointer-events-none"
                      style={{ opacity: rechargeRatio }}
                      transform={`rotate(${15 - rechargeRatio * 4})`}
                    >
                      {/* Upper Engine Nozzle Thrust Stream */}
                      <g transform="translate(-320, 52)">
                        <ellipse cx="-40" cy="0" rx="40" ry="6" fill="url(#rechargeThrustGlow)" />
                        <ellipse cx="-22" cy="0" rx="22" ry="3.5" fill="#ffffff" filter="drop-shadow(0 0 10px #ffffff)" />
                        <line x1="-15" y1="-5" x2="-15" y2="5" stroke="#ffffff" strokeWidth="1.5" />
                        <line x1="-32" y1="-4" x2="-32" y2="4" stroke="#38bdf8" strokeWidth="1.2" />
                      </g>

                      {/* Lower Engine Nozzle Thrust Stream */}
                      <g transform="translate(-300, 72)">
                        <ellipse cx="-40" cy="0" rx="40" ry="6" fill="url(#rechargeThrustGlow)" />
                        <ellipse cx="-22" cy="0" rx="22" ry="3.5" fill="#ffffff" filter="drop-shadow(0 0 10px #ffffff)" />
                        <line x1="-15" y1="-5" x2="-15" y2="5" stroke="#ffffff" strokeWidth="1.5" />
                        <line x1="-32" y1="-4" x2="-32" y2="4" stroke="#38bdf8" strokeWidth="1.2" />
                      </g>
                    </g>
                  )}

                </g>
              </g>

              {/* ── 6 Alternating Milestones (Enlarged Cards with Parallelogram Tilted Pointy Corners) ── */}
              {MILESTONES.map((m, idx) => {
                const isActive = idx === activeIndex;
                const isRight = m.side === "right";

                // Enlarged card dimensions (longer cards for better readability)
                const cardW = 540;
                const cardH = 250;
                const slant = 28;

                // Dedicated, clean leader line attachment coordinates per milestone card
                const getCardConnection = () => {
                  if (m.year === "2027") {
                    // Step 01: Card is above the road, attaches cleanly to bottom edge
                    const attachX = m.cardX + cardW * 0.55;
                    const attachY = m.cardY + cardH;
                    const midY = (attachY + m.roadY) / 2;
                    return {
                      attachX,
                      attachY,
                      path: `M ${attachX} ${attachY} C ${attachX} ${midY}, ${m.roadX} ${midY}, ${m.roadX} ${m.roadY}`,
                    };
                  }
                  if (m.year === "2028") {
                    // Step 02: Card is above the road, attaches cleanly to bottom edge
                    const attachX = m.cardX + cardW * 0.35;
                    const attachY = m.cardY + cardH;
                    const midY = (attachY + m.roadY) / 2;
                    return {
                      attachX,
                      attachY,
                      path: `M ${attachX} ${attachY} C ${attachX} ${midY}, ${m.roadX} ${midY}, ${m.roadX} ${m.roadY}`,
                    };
                  }
                  if (m.year === "2029") {
                    // Step 03: Card is to the right of the road curve -> attaches to SLANTED LEFT EDGE
                    const t = 0.20; // 20% down the card
                    const attachX = m.cardX + slant * (1 - t);
                    const attachY = m.cardY + cardH * t;
                    const midX = (m.roadX + attachX) / 2;
                    return {
                      attachX,
                      attachY,
                      path: `M ${m.roadX} ${m.roadY} C ${midX} ${m.roadY}, ${midX} ${attachY}, ${attachX} ${attachY}`,
                    };
                  }
                  if (m.year === "2030") {
                    // Step 04: Card is to the left of the road curve -> attaches to SLANTED RIGHT EDGE
                    const t = 0.45;
                    const attachX = m.cardX + cardW - slant * t;
                    const attachY = m.cardY + cardH * t;
                    const midX = (m.roadX + attachX) / 2;
                    return {
                      attachX,
                      attachY,
                      path: `M ${m.roadX} ${m.roadY} C ${midX} ${m.roadY}, ${midX} ${attachY}, ${attachX} ${attachY}`,
                    };
                  }
                  if (m.year === "2035") {
                    // Step 05: Card is BELOW the road -> attaches strictly to TOP EDGE of card (no line through bottom!)
                    const attachX = m.cardX + cardW * 0.65;
                    const attachY = m.cardY;
                    const midY = (m.roadY + attachY) / 2;
                    return {
                      attachX,
                      attachY,
                      path: `M ${m.roadX} ${m.roadY} C ${m.roadX} ${midY}, ${attachX} ${midY}, ${attachX} ${attachY}`,
                    };
                  }
                  if (m.year === "2037") {
                    // Step 06: Card is BELOW the road -> attaches strictly to TOP EDGE of card
                    const attachX = m.cardX + cardW * 0.38;
                    const attachY = m.cardY;
                    const midY = (m.roadY + attachY) / 2;
                    return {
                      attachX,
                      attachY,
                      path: `M ${m.roadX} ${m.roadY} C ${m.roadX} ${midY}, ${attachX} ${midY}, ${attachX} ${attachY}`,
                    };
                  }
                  // Fallback
                  const isAbove = m.cardY + cardH < m.roadY;
                  const attachX = m.cardX + cardW * 0.5;
                  const attachY = isAbove ? m.cardY + cardH : m.cardY;
                  const midY = (attachY + m.roadY) / 2;
                  return {
                    attachX,
                    attachY,
                    path: `M ${attachX} ${attachY} C ${attachX} ${midY}, ${m.roadX} ${midY}, ${m.roadX} ${m.roadY}`,
                  };
                };

                const connection = getCardConnection();
                const dist = Math.abs(idx - activeIndex);
                const isNearby = dist <= 1;

                return (
                  <g
                    key={m.year}
                    className="group transition-opacity duration-400"
                    style={{
                      opacity: isActive ? 1 : isNearby ? 0.75 : 0,
                      pointerEvents: isNearby ? "auto" : "none",
                    }}
                  >
                    {/* 1. Curved Connection Line between Card and Road Center */}
                    <path
                      d={connection.path}
                      fill="none"
                      stroke={isActive ? "#ffffff" : "#64748b"}
                      strokeWidth={isActive ? 2.4 : 1.6}
                      strokeDasharray={isActive ? "none" : "6 4"}
                      strokeLinecap="butt"
                      className="transition-all duration-300"
                    />

                    {/* 2. Small Precision Terminal Square where Leader Line touches Card Border */}
                    <rect
                      x={connection.attachX - 3.5}
                      y={connection.attachY - 3.5}
                      width="7"
                      height="7"
                      fill={isActive ? "#ffffff" : "#94a3b8"}
                    />

                    {/* 4. Milestone Card Slanted Parallelogram with Highly Visible 4-Sided Borders (Top, Right, Bottom, Left) */}
                    <g className="transition-all duration-300">
                      {/* Full 4-sided Parallelogram Body Surface */}
                      <polygon
                        points={`${m.cardX + slant},${m.cardY} ${m.cardX + cardW},${m.cardY} ${m.cardX + cardW - slant},${m.cardY + cardH} ${m.cardX},${m.cardY + cardH}`}
                        fill="#050811"
                        stroke={isActive ? "#ffffff" : "#475569"}
                        strokeWidth={isActive ? 2.5 : 1.8}
                        className="transition-all duration-300"
                        style={{
                          filter: isActive
                            ? "drop-shadow(0 0 24px rgba(255,255,255,0.45)) drop-shadow(0 16px 36px rgba(0,0,0,0.98))"
                            : "drop-shadow(0 10px 28px rgba(0,0,0,0.95))",
                        }}
                      />

                      {/* Side 1: Top Visible Border Accent */}
                      <line
                        x1={m.cardX + slant}
                        y1={m.cardY}
                        x2={m.cardX + cardW}
                        y2={m.cardY}
                        stroke={isActive ? "#ffffff" : "#cbd5e1"}
                        strokeWidth={isActive ? 3 : 2}
                        strokeLinecap="round"
                        opacity={isActive ? 1 : 0.9}
                      />

                      {/* Side 2: Right Slanted Visible Border Accent */}
                      <line
                        x1={m.cardX + cardW}
                        y1={m.cardY}
                        x2={m.cardX + cardW - slant}
                        y2={m.cardY + cardH}
                        stroke={isActive ? "#ffffff" : "#cbd5e1"}
                        strokeWidth={isActive ? 3 : 2}
                        strokeLinecap="round"
                        opacity={isActive ? 1 : 0.9}
                      />

                      {/* Side 3: Bottom Visible Border Accent */}
                      <line
                        x1={m.cardX}
                        y1={m.cardY + cardH}
                        x2={m.cardX + cardW - slant}
                        y2={m.cardY + cardH}
                        stroke={isActive ? "#ffffff" : "#cbd5e1"}
                        strokeWidth={isActive ? 3 : 2}
                        strokeLinecap="round"
                        opacity={isActive ? 1 : 0.9}
                      />

                      {/* Side 4: Left Slanted Visible Border Accent */}
                      <line
                        x1={m.cardX}
                        y1={m.cardY + cardH}
                        x2={m.cardX + slant}
                        y2={m.cardY}
                        stroke={isActive ? "#ffffff" : "#cbd5e1"}
                        strokeWidth={isActive ? 3 : 2}
                        strokeLinecap="round"
                        opacity={isActive ? 1 : 0.9}
                      />

                      {/* Text & Icon Content inside ForeignObject (Clean layout, enhanced typography) */}
                      <foreignObject
                        x={m.cardX + 16}
                        y={m.cardY + 8}
                        width={cardW - 32}
                        height={cardH - 16}
                        className="pointer-events-none overflow-visible"
                      >
                        <div className="p-6 space-y-4 select-none">
                          {/* Header: Phase & Icon */}
                          <div className="flex items-center justify-between gap-3">
                            <span
                              className={`text-base sm:text-lg font-mono font-black tracking-[0.28em] uppercase transition-colors ${
                                isActive
                                  ? "text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                                  : "text-zinc-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
                              }`}
                            >
                              {m.phase}
                            </span>
                            <span
                              className={`transition-colors p-2 rounded bg-zinc-900/90 border ${
                                isActive
                                  ? "text-white border-white shadow-[0_0_14px_rgba(255,255,255,0.5)]"
                                  : "text-zinc-200 border-zinc-500/70"
                              }`}
                            >
                              {m.icon}
                            </span>
                          </div>

                          {/* Title */}
                          <h4
                            className={`text-xl sm:text-2xl font-mono font-black tracking-wide leading-snug transition-colors ${
                              isActive
                                ? "text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.95)]"
                                : "text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]"
                            }`}
                          >
                            {m.title}
                          </h4>

                          {/* Statement */}
                          <p
                            className={`text-sm sm:text-base font-mono font-normal leading-relaxed transition-colors ${
                              isActive
                                ? "text-zinc-100 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                                : "text-zinc-200"
                            }`}
                          >
                            {m.statement}
                          </p>
                        </div>
                      </foreignObject>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
