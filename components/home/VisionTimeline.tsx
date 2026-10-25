"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Jet3DViewer from "./Jet3DViewer";
import { VISION_MILESTONES } from "@/data/vision";
import { JetColorConfig } from "./jetModelManager";

const TOTAL = VISION_MILESTONES.length; // Exactly 6 milestones

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Executive Light Luxury Platinum Titanium Paint Scheme
// (Exact match to the 3D model in ScrollFlightJet that flies down into this section)
const EXECUTIVE_TITANIUM_COLORS: JetColorConfig = {
  fuselageColor: "#c2cdda", // Light Luxury Platinum Titanium Silver airframe
  accentColor: "#0ea5e9",   // Luminous Sapphire Blue wingpod & aerodynamic accents
  trimMetalColor: "#d4af37",// Champagne Gold / Titanium nacelles & deicing trim
  glassColor: "#050e18",    // Deep Tinted Sapphire Aerospace Cockpit Glass
};

export default function VisionTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const targetRef = useRef(0);
  const smoothRef = useRef(0);

  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [landingProgress, setLandingProgress] = useState(0);
  const [isLandedAtRunway, setIsLandedAtRunway] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      // Global normalized scroll progress from 0.0 to 1.0
      const p = clamp(-rect.top / scrollable, 0, 1);
      targetRef.current = p;

      // Strict single-plane handoff from previous section
      const landingRatio = clamp((40 - rect.top) / 40, 0, 1);
      setLandingProgress(landingRatio);
      setIsLandedAtRunway(rect.top <= 40 || p > 0);
    };

    const loop = () => {
      // Silky 60fps / 120fps physics lerp interpolation
      smoothRef.current += (targetRef.current - smoothRef.current) * 0.085;
      const p = smoothRef.current;
      setProgress(p);

      // Smoothly map active milestone index across the 6 milestones (p in [0.04, 0.82])
      const roadmapSegment = clamp((p - 0.04) / 0.76, 0, 0.999);
      const ni = clamp(Math.floor(roadmapSegment * TOTAL), 0, TOTAL - 1);
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
    // Map milestone index to its focal scroll position
    const targetP = 0.08 + index * 0.125;
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

  // ── 1. CONSTANT LOW-ALTITUDE CRUISE & EXACT ENDING ANGLE MATCH ──
  // User Requirement: "make sure plane stays at the same distance above from the road."
  // User Requirement: "Match the ending angle of vision time line plane to exactly as that next contact section plane is."
  const baseJetBottom = 11.5; // Locked constant distance directly above the metallic road

  // End of roadmap transition (progress 0.83 -> 1.00)
  const exitProgress = clamp((progress - 0.83) / 0.14, 0, 1);
  const exitEase = exitProgress * exitProgress * (3 - 2 * exitProgress);

  // Synchronized continuous forward motion of rocks and road platform with scroll
  const rocksScale = 1.0 + progress * 0.35 + exitEase * 0.42;
  const rocksTranslateY = progress * 65 + exitEase * 220;
  const roadTranslateY = progress * 55 + exitEase * 420;
  const roadScale = 1.0 + progress * 0.22 + exitEase * 0.30;
  const envOpacity = clamp(1 - exitEase * 1.35, 0, 1);

  // Normal pilot aerodynamic banking while cruising down the road
  const bankWave = Math.sin(progress * Math.PI * TOTAL);
  const cruisingDrift = bankWave * 26;
  const cruisingRoll = bankWave * 2.8;
  const cruisingYaw = -90 - bankWave * 1.2; // Rear view down runway
  const cruisingPitch = 0.8;

  // Final twist to match ContactFlightJet / footer-jet angle EXACTLY:
  // In Three.js with model pivot:
  // - yaw: -176° turns the aircraft to face right (+X) with starboard/right profile facing user
  // - pitch: -14.0° pitches the nose UP by +14° to the right (climbing angle)
  // - roll: 0°
  // - 2D wrapper rotation: 0°
  const finalYaw = lerp(cruisingYaw, -176, exitEase);
  const finalPitch = lerp(cruisingPitch, -14.0, exitEase);
  const finalLateralX = lerp(cruisingDrift, 58, exitEase);
  const finalBottom = lerp(baseJetBottom, 20.5, exitEase);
  const finalScale = lerp(1.35, 1.48, exitEase);
  const wrapperRotation = lerp(cruisingRoll, 0, exitEase);

  // Rear exhaust afterburners fade down as plane turns side-on
  const afterburnerOpacity = clamp(1 - exitEase * 2.2, 0, 1) * (0.92 + eased * 0.08);

  // Visibility handoff to ContactFlightJet at progress >= 0.99
  const jetOpacity = progress < 0.99 ? 1 : clamp(1 - (progress - 0.99) / 0.01, 0, 1);
  const centralJetOpacity = isLandedAtRunway
    ? jetOpacity * Math.max(landingProgress, progress > 0 ? 1 : 0)
    : 0;

  // ── 2. MILESTONE CARD LOGIC (ALTERNATING SIDES, HIDDEN AT START & AT FINAL EXIT) ──
  const showCards = progress >= 0.035 && progress <= 0.82;
  const isLeftCard = activeIndex % 2 === 0;
  const currentMilestone = VISION_MILESTONES[activeIndex];

  // Dynamic spline cable anchor at jet tail (follows aircraft lateral banking)
  const splineStartX = 600 + finalLateralX * 0.72;
  const splineStartY = 765;

  return (
    <section
      ref={sectionRef}
      id="vision"
      aria-label="The 10-Year Vision Roadmap"
      className="relative w-full select-none"
      style={{ height: "600vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#01050a] flex items-center justify-center">

        {/* ── 1. LAYER 1: DEEP BLACK SPACE & STARS (VISIBLE THROUGHOUT, REVEALED AT END) ── */}
        <div className="absolute inset-0 w-full h-full pointer-events-none bg-[#01050a] z-0">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 150px 120px, #7dd3fc, rgba(0,0,0,0)), radial-gradient(1px 1px at 280px 320px, #38bdf8, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 450px 80px, #ffffff, rgba(0,0,0,0)), radial-gradient(1px 1px at 700px 220px, #ffffff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 900px 180px, #7dd3fc, rgba(0,0,0,0)), radial-gradient(1px 1px at 1100px 340px, #ffffff, rgba(0,0,0,0))",
              backgroundSize: "600px 450px",
            }}
          />
        </div>

        {/* ── 2. LAYER 2: CLEAN CAVERN BACKDROP (SYNCHRONIZED CONTINUOUS SCROLL MOTION) ── */}
        {/* User Requirement: "move the side rocks and bottom platform with same speed as user scrolls" */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none select-none z-[10] will-change-transform"
          style={{
            opacity: envOpacity,
            transform: `scale(${rocksScale}) translateY(${rocksTranslateY}px)`,
            transformOrigin: "50% 53.6%",
            transition: "transform 0.05s linear, opacity 0.08s linear",
          }}
        >
          <Image
            src="/images/vision-cave-backdrop.jpg"
            alt="Futuristic Cavern Portal to Deep Space"
            fill
            priority
            className="object-cover w-full h-full select-none"
          />
        </div>

        {/* ── 3. LAYER 3: DYNAMIC PERSPECTIVE ELEMENTS (6 WIDE STRIP RINGS + SYNCHRONIZED ROAD) ── */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-[16]">
          <svg
            viewBox="0 0 1200 900"
            preserveAspectRatio="xMidYMid slice"
            className="w-full h-full"
            style={{ overflow: "hidden" }}
          >
            <defs>
              {/* Controlled Cyan Neon Glow Filter for Active Ring */}
              <filter id="cyan-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="9.0" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Depth of Field Blur Filters for Previous & Next Inactive Rings */}
              <filter id="dof-blur-near" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="7.0" />
              </filter>

              <filter id="dof-blur-far" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="15.0" />
              </filter>

              {/* Metallic Runway Gradient */}
              <linearGradient id="metallic-road-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#01070e" stopOpacity="0.95" />
                <stop offset="40%" stopColor="#02141e" stopOpacity="0.90" />
                <stop offset="85%" stopColor="#031e2b" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#021622" stopOpacity="0.95" />
              </linearGradient>

              {/* Glowing Spline Gradient */}
              <linearGradient id="spline-cyan-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.90" />
                <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.65" />
              </linearGradient>
            </defs>

            {/* ── A. THE METALLIC FLIGHT ROAD (SYNCHRONIZED FORWARD TRAVEL WITH SCROLL) ── */}
            <g
              opacity={envOpacity}
              style={{
                transform: `translateY(${roadTranslateY}px) scale(${roadScale})`,
                transformOrigin: "600px 900px",
                transition: "transform 0.05s linear, opacity 0.08s linear",
              }}
            >
              {/* Dark Metallic Runway Surface */}
              <polygon
                points="588,482 612,482 860,900 340,900"
                fill="url(#metallic-road-grad)"
              />

              {/* Illuminated Runway Border Beams */}
              <line
                x1="588"
                y1="482"
                x2="340"
                y2="900"
                stroke="#00e5ff"
                strokeWidth="3.2"
                filter="url(#cyan-glow)"
              />
              <line
                x1="612"
                y1="482"
                x2="860"
                y2="900"
                stroke="#00e5ff"
                strokeWidth="3.2"
                filter="url(#cyan-glow)"
              />

              {/* Dynamic Perspective Runway Markers streaming forward as user scrolls */}
              {[0, 1, 2, 3, 4, 5, 6].map((idx) => {
                const u = ((idx / 7) + progress * 2.2) % 1;
                const yPos = 482 + (900 - 482) * Math.pow(u, 2.2);
                const halfW = 12 + (260 - 12) * Math.pow(u, 2.0);
                const markerOpacity = u < 0.15 ? u / 0.15 : u > 0.85 ? (1 - u) / 0.15 : 0.75;

                return (
                  <line
                    key={`runway-marker-${idx}`}
                    x1={600 - halfW * 0.45}
                    y1={yPos}
                    x2={600 + halfW * 0.45}
                    y2={yPos}
                    stroke="#00e5ff"
                    strokeWidth={lerp(1.2, 3.5, u)}
                    opacity={markerOpacity * 0.6}
                    filter="url(#cyan-glow)"
                  />
                );
              })}

              {/* Glowing Winding Spline Data Cable */}
              <path
                d={`M ${splineStartX} ${splineStartY} 
                    C ${600 + 48 + Math.sin(progress * 12) * 16} 710, 
                      ${600 - 46 - Math.sin(progress * 12) * 16} 595, 
                      ${600 + 14 + Math.sin(progress * 12) * 8} 525
                    S 596 495, 600 482`}
                fill="none"
                stroke="url(#spline-cyan-grad)"
                strokeWidth="5.0"
                filter="url(#cyan-glow)"
                className="opacity-95"
              />
              <path
                d={`M ${splineStartX} ${splineStartY} 
                    C ${600 + 48 + Math.sin(progress * 12) * 16} 710, 
                      ${600 - 46 - Math.sin(progress * 12) * 16} 595, 
                      ${600 + 14 + Math.sin(progress * 12) * 8} 525
                    S 596 495, 600 482`}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.4"
                className="opacity-95"
              />
            </g>

            {/* ── B. STRICTLY 6 CONCENTRIC NEON TUNNEL RINGS (THICK WIDE STRIPS + DOF BLUR) ── */}
            {/* User Requirement: "Reduce the rings passing by speed a little bit."
                User Requirement: "And make all the rings thicker. Like wide strips."
                User Requirement: "when user starts scrolling, then blurrs the previous and next vision rings and only properly show the current rings." */}
            {VISION_MILESTONES.map((milestone, i) => {
              // Focal scroll position where ring reaches primary framing radius (~382px)
              const focusP = 0.08 + i * 0.125;
              const delta = progress - focusP;

              let r: number;
              let ringOpacity: number;

              if (delta < 0) {
                // Slower, majestic perspective approach from distance
                const z = Math.max(0, 1.0 + delta * 1.85);
                r = 24 + (382 - 24) * Math.pow(z, 2.0);
                ringOpacity = z < 0.1 ? z / 0.1 : 0.88;
              } else {
                // Smooth, majestic expansion as ring passes viewer
                const passT = Math.min(1, delta * 2.1);
                r = 382 + 450 * Math.pow(passT, 1.3);
                ringOpacity = Math.max(0, 0.88 * (1 - passT));
              }

              const finalRingOpacity = ringOpacity * envOpacity;
              if (finalRingOpacity <= 0.01) return null;

              const isCurrent = i === activeIndex;
              const dist = Math.abs(i - activeIndex);

              // ── Depth of Field: Blur previous and next rings while scrolling, only current is sharp ──
              const isScrolling = progress >= 0.02 && progress <= 0.84;
              let filterUrl = "url(#cyan-glow)";
              let ringDimFactor = 1.0;

              if (isScrolling && !isCurrent) {
                if (dist === 1) {
                  filterUrl = "url(#dof-blur-near)";
                  ringDimFactor = 0.38;
                } else {
                  filterUrl = "url(#dof-blur-far)";
                  ringDimFactor = 0.15;
                }
              }

              // ── Wide Strip Thickness Dimensions ──
              // Strip width scales dynamically with perspective radius
              const stripThickness = isCurrent
                ? lerp(8, 26, Math.min(1, r / 382))
                : lerp(5, 16, Math.min(1, r / 382));

              return (
                <g key={`vision-ring-${milestone.phase}`} opacity={finalRingOpacity * ringDimFactor}>
                  {/* Layer 1: Wide Outer Atmospheric Neon Glow Aura */}
                  <circle
                    cx="600"
                    cy="482"
                    r={r}
                    fill="none"
                    stroke="#00e5ff"
                    strokeWidth={stripThickness * 1.6}
                    filter={filterUrl}
                    opacity={isCurrent ? 0.45 : 0.20}
                  />

                  {/* Layer 2: Wide Architectural Luminous Band / Strip Body */}
                  <circle
                    cx="600"
                    cy="482"
                    r={r}
                    fill="none"
                    stroke={isCurrent ? "#00e5ff" : "rgba(0, 229, 255, 0.72)"}
                    strokeWidth={stripThickness}
                    filter={filterUrl}
                    opacity={isCurrent ? 0.95 : 0.65}
                  />

                  {/* Layer 3: Razor Sharp White Energy Core Strip */}
                  <circle
                    cx="600"
                    cy="482"
                    r={r}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={isCurrent ? Math.max(1.5, stripThickness * 0.22) : Math.max(0.8, stripThickness * 0.14)}
                    filter={isCurrent ? undefined : filterUrl}
                    opacity={isCurrent ? 0.95 : 0.45}
                  />

                  {/* Milestone Indicator Tag (Only displayed clearly on the active ring to prevent clutter) */}
                  {isCurrent && r > 160 && r < 560 && (
                    <g
                      transform={`translate(${600 + r * Math.cos(-Math.PI * 0.72)}, ${
                        482 + r * Math.sin(-Math.PI * 0.72)
                      })`}
                      filter="url(#cyan-glow)"
                    >
                      <rect
                        x="-28"
                        y="-10"
                        width="56"
                        height="20"
                        rx="10"
                        fill="#00e5ff"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fill="#000000"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                        letterSpacing="0.08em"
                      >
                        {milestone.phase}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* ── 4. LAYER 4: TOP ATMOSPHERIC VIGNETTE (CRISP HIGH-CONTRAST HEADING READABILITY) ── */}
        <div
          className="absolute top-0 left-0 right-0 h-44 pointer-events-none z-[18]"
          style={{
            opacity: envOpacity,
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.5) 60%, transparent 100%)",
          }}
        />

        {/* ── 5. LAYER 5: 3D EXECUTIVE PLATINUM TITANIUM AIRCRAFT (z-[20]) ── */}
        {/* User Requirement: "Change the colors of this plane similar to that 3d model that comes fly down here."
            User Requirement: "make sure plane stays at the same distance above from the road."
            User Requirement: "Match the ending angle of vision time line plane to exactly as that next contact section plane is." */}
        <div
          className="absolute left-1/2 z-[20] pointer-events-none origin-bottom will-change-transform"
          style={{
            bottom: `${finalBottom}%`,
            transform: `translateX(calc(-50% + ${finalLateralX}px)) scale(${finalScale})`,
            width: "clamp(420px, 36vw, 640px)",
            opacity: centralJetOpacity,
            transition: "bottom 0.05s linear, opacity 0.08s linear",
          }}
          id="vision-end-jet-anchor"
        >
          <div id="vision-end-jet-wrapper">
            <div
              id="vision-end-jet"
              className="relative w-full"
              style={{
                transform: `rotate(${wrapperRotation}deg)`,
                transition: "transform 0.05s linear",
              }}
            >
              {/* Soft Diffuse Runway Contact Shadow (stays directly beneath plane on the road) */}
              <div
                className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
                style={{
                  bottom: "-6px",
                  width: "78%",
                  height: "20px",
                  background:
                    "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0, 229, 255, 0.28) 42%, transparent 75%)",
                  filter: "blur(6px)",
                  opacity: 0.90 * envOpacity,
                  transition: "opacity 0.08s linear",
                }}
              />

              {/* 3D Model: Executive Platinum Titanium Silver (Identical to ScrollFlightJet) */}
              <div className="w-full h-[270px] sm:h-[330px] relative pointer-events-none select-none">
                <Jet3DViewer
                  yaw={finalYaw}
                  pitch={finalPitch}
                  roll={0}
                  modelScale={1.35}
                  engineThrust={0.65 + eased * 0.75}
                  lightIntensity={1.35}
                  customColors={EXECUTIVE_TITANIUM_COLORS}
                  lightingTheme="default"
                />
              </div>

              {/* ── DUAL SUPERSONIC TURBINE ENGINE EXHAUST AFTERBURNERS (EXACT NOZZLE ALIGNMENT) ── */}
              {/* Left Engine Turbine Glow */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-75"
                style={{
                  left: "46.8%",
                  top: "62.0%",
                  width: `${20 + eased * 8}px`,
                  height: `${20 + eased * 8}px`,
                  background:
                    "radial-gradient(circle, #ffffff 15%, #38bdf8 45%, #00e5ff 75%, transparent 100%)",
                  boxShadow: `0 0 16px #00e5ff, 0 0 28px rgba(0, 229, 255, 0.9), 0 0 45px rgba(0, 229, 255, 0.5)`,
                  opacity: afterburnerOpacity,
                }}
              />
              {/* Right Engine Turbine Glow */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-75"
                style={{
                  left: "53.2%",
                  top: "62.0%",
                  width: `${20 + eased * 8}px`,
                  height: `${20 + eased * 8}px`,
                  background:
                    "radial-gradient(circle, #ffffff 15%, #38bdf8 45%, #00e5ff 75%, transparent 100%)",
                  boxShadow: `0 0 16px #00e5ff, 0 0 28px rgba(0, 229, 255, 0.9), 0 0 45px rgba(0, 229, 255, 0.5)`,
                  opacity: afterburnerOpacity,
                }}
              />
            </div>
          </div>
        </div>

        {/* ── 6. LAYER 6: FROSTED GLASS VISION MILESTONE CARD (EXACT STYLE MATCH TO REFERENCE IMAGE) ── */}
        <div
          className="absolute z-[32] transition-all duration-500 ease-out"
          style={{
            top: "50%",
            transform: `translateY(-50%) ${
              showCards
                ? "translateX(0) scale(1)"
                : isLeftCard
                ? "translateX(-70px) scale(0.92)"
                : "translateX(70px) scale(0.92)"
            }`,
            left: isLeftCard ? "clamp(24px, 5.5vw, 110px)" : "auto",
            right: !isLeftCard ? "clamp(24px, 5.5vw, 110px)" : "auto",
            width: "clamp(310px, 25vw, 410px)",
            opacity: showCards ? 1 : 0,
            pointerEvents: showCards ? "auto" : "none",
          }}
        >
          {/* Glass Card Container */}
          <div
            key={currentMilestone.year}
            className="relative rounded-[22px] p-6 sm:p-7 flex flex-col gap-4 backdrop-blur-2xl transition-all duration-300 select-text"
            style={{
              background: "rgba(6, 12, 20, 0.68)",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.22)",
            }}
          >
            {/* Top Pill Badge: Solid Turquoise/Cyan Pill with Dark Black Bold Text */}
            <div className="inline-flex self-start items-center px-3.5 py-1 rounded-full bg-[#00e5ff] text-black font-bold text-xs font-mono tracking-wider uppercase shadow-[0_0_12px_rgba(0,229,255,0.4)]">
              {currentMilestone.phase} / {currentMilestone.year}
            </div>

            {/* Large Bold White Title */}
            <h3 className="text-3xl sm:text-[34px] font-bold text-white tracking-tight leading-tight">
              {currentMilestone.title}
            </h3>

            {/* Clean Minimal Statement Copy */}
            <p className="text-xs sm:text-[14px] text-zinc-300 font-light leading-relaxed min-h-[44px]">
              {currentMilestone.statement}
            </p>

            {/* Subtle, Minimal Bottom Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              {/* Minimal Step Indicator Dots */}
              <div className="flex items-center gap-1.5">
                {VISION_MILESTONES.map((item, i) => (
                  <button
                    key={item.year}
                    type="button"
                    onClick={() => scrollToMilestone(i)}
                    aria-label={`Jump to ${item.year}`}
                    className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                    style={{
                      width: i === activeIndex ? "20px" : "6px",
                      background: i === activeIndex ? "#00e5ff" : "rgba(255, 255, 255, 0.2)",
                    }}
                  />
                ))}
              </div>

              {/* Clean Prev / Next Chevrons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeIndex === 0}
                  aria-label="Previous milestone"
                  className="w-6 h-6 rounded-full flex items-center justify-center border border-zinc-700/60 bg-zinc-900/60 text-zinc-300 hover:text-white disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={activeIndex === TOTAL - 1}
                  aria-label="Next milestone"
                  className="w-6 h-6 rounded-full flex items-center justify-center border border-zinc-700/60 bg-zinc-900/60 text-zinc-300 hover:text-white disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── 7. LAYER 7: TOP HEADER & INTRODUCTION (EXACT MATCH TO REFERENCE IMAGE) ── */}
        <div
          className="absolute top-8 left-0 right-0 flex flex-col items-center z-[30] pointer-events-none transition-opacity duration-300"
          style={{ opacity: clamp(1 - progress * 4.2, 0, 1) * envOpacity }}
        >
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-zinc-700/60 bg-zinc-950/70 backdrop-blur-md mb-2 shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            <span className="text-[11px] font-mono tracking-[0.25em] text-zinc-300 uppercase">
              Let&apos;s Travel Together
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            10 YEARS LONG VISION.
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400 font-mono tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            A journey towards the next era of Aviation.
          </p>
        </div>

        {/* ── 8. LAYER 8: SCROLL HINT (FADES AWAY AS USER SCROLLS) ── */}
        <div
          className="absolute bottom-24 left-0 right-0 flex flex-col items-center gap-1.5 z-[28] pointer-events-none transition-opacity duration-300"
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
