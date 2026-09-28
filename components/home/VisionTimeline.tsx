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
    cardX: 50,
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
    cardY: 1115,
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
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Smooth lerp loop for scroll progress
  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const headerOffset = 130;
      const scrollableDistance = rect.height - window.innerHeight - headerOffset;
      if (scrollableDistance <= 0) return;

      const raw = (-rect.top - headerOffset) / scrollableDistance;
      targetProgressRef.current = Math.min(1, Math.max(0, raw));
    };

    const updateLoop = () => {
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.12;
      const prog = currentProgressRef.current;
      setSmoothProgress(prog);

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
      { p: 1.00, x: 2060, y: 1040, zoom: 0.98 }, // Step 06 & Extra Large Parked Jet in empty space
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
              {/* ── Wavy Highway Asphalt Path (Right -> Smooth Left Turn -> Smooth Right Turn) ── */}
              <g>
                {/* Outer Shoulder Rims */}
                <path
                  d={ROAD_PATH}
                  fill="none"
                  stroke="#334155"
                  strokeWidth="78"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                {/* Road Base / Asphalt Body */}
                <path
                  d={ROAD_PATH}
                  fill="none"
                  stroke="#121722"
                  strokeWidth="72"
                  strokeLinecap="round"
                />
                {/* Center Dashed Runway Line */}
                <path
                  d={ROAD_PATH}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2.2"
                  strokeDasharray="16 14"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </g>

              {/* ── START OF ROAD: Runway Departure Threshold & Tow Hook Anchor ── */}
              <g id="road-tow-group" transform="translate(60, 160)">
                {/* Tow Cable Latch Shackle Point */}
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

                {/* Runway Threshold Stripes (Piano Keys) */}
                {[-22, -14, -6, 2, 10, 18].map((offsetY, i) => (
                  <line
                    key={`thr-${i}`}
                    x1="0"
                    y1={offsetY}
                    x2="18"
                    y2={offsetY}
                    // stroke="#cbd5e1"
                    strokeWidth="2.5"
                    strokeLinecap="butt"
                    opacity="0.85"
                  />
                ))}

                {/* Runway Designation Markings */}
                {/* <text
                  x="30"
                  y="-18"
                  // fill="#94a3b8"
                  className="font-mono text-[9px] font-bold tracking-widest select-none uppercase"
                >
                  RWY 27L • DEPARTURE
                </text> */}
              </g>

              {/* ── END OF ROAD: Terminal Destination Beacon at Road Tip (x=2140, y=1070) ── */}
              <g transform="translate(2140, 1070)">
                <circle cx="0" cy="0" r="32" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />
                <circle cx="0" cy="0" r="20" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
                {/* <circle cx="0" cy="0" r="6" fill="#38bdf8" />
                <circle cx="0" cy="0" r="14" fill="#38bdf8" opacity="0.25" className="animate-ping" /> */}
              </g>

              {/* ── Stationary Supersonic Jet Parked in Empty Space (Extra Large 820px, Horizontal / Standing Attitude) ── */}
              <g
                id="vision-end-jet-anchor"
                transform="translate(2580, 1030)"
              >
                <g
                  id="vision-end-jet-wrapper"
                  className="transition-opacity duration-200"
                  style={{ opacity: 1 }}
                >
                  {/* Tarmac Ground Shadow (Gives realistic standing/parked weight) */}
                  <ellipse cx="10" cy="130" rx="300" ry="24" fill="#000000" opacity="0.80" filter="blur(16px)" />

                  {/* Extra Large Jet: Rotated clockwise (15deg) so its nose & fuselage sit completely HORIZONTAL */}
                  <image
                    id="vision-end-jet"
                    href="/images/footer-jet.png"
                    x="-410"
                    y="-229"
                    width="820"
                    height="458"
                    transform="rotate(15)"
                    preserveAspectRatio="xMidYMid meet"
                    style={{
                      filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.95))",
                    }}
                  />

                  {/* Subtle Standby Navigation Beacon Accent on Engine Nacelle */}
                  <circle cx="-300" cy="55" r="5" fill="#f97316" opacity="0.75" filter="blur(2px)" />
                  <circle cx="-300" cy="55" r="2" fill="#ffffff" />
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

                return (
                  <g key={m.year} className="group">
                    {/* 1. Curved Connection Line between Card and Road Center */}
                    <path
                      d={connection.path}
                      fill="none"
                      stroke={isActive ? "#ffffff" : "#64748b"}
                      strokeWidth={isActive ? 2.4 : 1.6}
                      strokeDasharray={isActive ? "none" : "4 4"}
                      className="transition-all duration-300"
                    />

                    {/* 2. Anchor Disc on Road Centerline */}
                    <circle
                      cx={m.roadX}
                      cy={m.roadY}
                      r={isActive ? 7 : 5}
                      fill={isActive ? "#ffffff" : "#334155"}
                      stroke={isActive ? "#ffffff" : "#94a3b8"}
                      strokeWidth={1.8}
                    />

                    {/* Small Precision Terminal Dot where Leader Line touches Card Border */}
                    <circle
                      cx={connection.attachX}
                      cy={connection.attachY}
                      r={isActive ? 4 : 3}
                      fill={isActive ? "#ffffff" : "#94a3b8"}
                    />

                    {/* 3. Year Printed Directly on the Road next to the Checkpoint */}
                    <g transform={`translate(${m.roadX}, ${m.roadY})`}>
                      <text
                        x={m.cardX < m.roadX ? 16 : -16}
                        y={m.cardY < m.roadY ? 22 : -16}
                        textAnchor={m.cardX < m.roadX ? "start" : "end"}
                        fill={isActive ? "#ffffff" : "#cbd5e1"}
                        className={`font-mono text-sm font-bold tracking-widest select-none transition-colors duration-300 ${
                          isActive ? "fill-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]" : "fill-zinc-300"
                        }`}
                      >
                        {m.year}
                      </text>
                    </g>

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
