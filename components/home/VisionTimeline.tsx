"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Jet3DViewer from "./Jet3DViewer";
import { VISION_MILESTONES } from "@/data/vision";
import { JetColorConfig, LIGHT_PLATINUM_TITANIUM_COLORS } from "./jetModelManager";

const TOTAL = VISION_MILESTONES.length; // Exactly 6 milestones

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

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
    };

    const loop = () => {
      // Silky 60fps / 120fps physics lerp interpolation (smoother, more relaxed cinematic flight pacing)
      smoothRef.current += (targetRef.current - smoothRef.current) * 0.07;
      const p = smoothRef.current;
      setProgress(p);

      // Smoothly map active milestone index across the 6 milestones
      const pContinuous = clamp(((p - 0.06) / 0.60) * 5.0, 0, 5.8);
      const ni = clamp(Math.round(pContinuous), 0, TOTAL - 1);
      setActiveIndex(ni);

      // Strict single-plane handoff synchronized with ScrollFlightJet touchdown
      const isFlightActive =
        typeof window !== "undefined" &&
        !!(window as unknown as { __M1_SCROLL_JET_ACTIVE?: boolean }).__M1_SCROLL_JET_ACTIVE;
      const flightLandingP =
        typeof window !== "undefined"
          ? (window as unknown as { __M1_SCROLL_JET_LANDING_P?: number }).__M1_SCROLL_JET_LANDING_P ?? 1.0
          : 1.0;

      if (isFlightActive) {
        // While flight jet is approaching, keep runway jet hidden.
        // The instant flight jet touches down (flightLandingP >= 0.98), activate runway jet with zero double-plane ghosting
        const isLanded = flightLandingP >= 0.98;
        setLandingProgress(isLanded ? 1.0 : 0.0);
        setIsLandedAtRunway(isLanded || p > 0);
      } else {
        // Fallback when scrolled directly into vision or flight completed
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          setIsLandedAtRunway(rect.top <= 20 || p > 0);
        } else {
          setIsLandedAtRunway(true);
        }
        setLandingProgress(1.0);
      }

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
    // Map milestone index to its focal scroll position across roadmap
    const targetP = 0.06 + (index / (TOTAL - 1)) * 0.60;
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


  // ── 1. CONSTANT LOW-ALTITUDE CRUISE & EXACT ENDING ANGLE MATCH ──
  // User Requirement: "First of all bring the plane lower. Closer to the road. Reduce it's altitude."
  const baseJetBottom = 0.0; // Jet flies low, hugging closely down right above the road surface

  // End of roadmap transition (progress 0.78 -> 0.98)
  const exitProgress = clamp((progress - 0.78) / 0.18, 0, 1);
  const exitEase = exitProgress * exitProgress * (3 - 2 * exitProgress);

  // Synchronized continuous forward motion of rocks and road platform with scroll
  const rocksScale = 1.0 + progress * 0.35 + exitEase * 0.42;
  const rocksTranslateY = progress * 65 + exitEase * 220;
  const roadTranslateY = progress * 55 + exitEase * 420;
  const roadScale = 1.0 + progress * 0.22 + exitEase * 0.30;
  const envOpacity = clamp(1 - exitEase * 1.35, 0, 1);

  // Aerodynamic banking down the runway in True 3D (Refined, smooth flight flow)
  // Continuous milestone progress from 0.0 to 5.8:
  // 0.0 to 5.0 represents milestones 0 to 5; > 5.0 ensures the 6th ring fully passes camera
  const continuousMilestone = clamp(((progress - 0.06) / 0.60) * 5.0, 0, 5.8);
  const cruiseProgress = clamp(continuousMilestone / 5.0, 0, 1);
  const bankWave = Math.sin(cruiseProgress * Math.PI * 3.5);
  const cruisingDrift = bankWave * 36; // Subtle, controlled lateral drift
  const cruisingRoll3D = bankWave * 8.5; // Gentle inward banking (plane leans left when on right, leans right when on left)
  const cruisingYaw = -90 - bankWave * 5.5; // Natural steering cut: tip points subtly inwards without turning heavily sideways
  const cruisingPitch = 0.4; // Level aerodynamic forward cruise pitch

  // Final twist to match ContactFlightJet / footer-jet angle EXACTLY:
  // - yaw: -168° faces the starboard right side with rear-quarter climb
  // - pitch: -16.0° pitches the nose UP showing the underside
  // - roll: 5.5° gentle starboard bank
  // - cameraY: -3.5 drops camera below aircraft to look up at the underside
  const finalYaw = lerp(cruisingYaw, -168, exitEase);
  const finalPitch = lerp(cruisingPitch, -16.0, exitEase);
  const finalLateralX = lerp(cruisingDrift, 58, exitEase);
  const finalBottom = lerp(baseJetBottom, 20.5, exitEase);
  const finalScale = lerp(1.50, 1.68, exitEase);
  const finalRoll3D = lerp(cruisingRoll3D, 0, exitEase);
  const wrapperRotation = lerp(-bankWave * 0.8, 5.5, exitEase);
  const finalCameraY = lerp(0.65, -3.5, exitEase); // Lower camera angle level with road surface

  // Rings appear smoothly as user scrolls into the roadmap (clean start as in Image 3)
  const ringsEntranceOpacity = clamp((progress - 0.015) / 0.04, 0, 1);

  // Visibility handoff to ContactFlightJet at progress >= 0.99
  const jetOpacity = progress < 0.99 ? 1 : clamp(1 - (progress - 0.99) / 0.01, 0, 1);
  const centralJetOpacity = isLandedAtRunway
    ? jetOpacity * (progress > 0.02 ? 1 : landingProgress)
    : 0;

  // ── 2. MILESTONE CARD LOGIC (ALTERNATING SIDES, HIDDEN AT START & AT FINAL EXIT) ──
  const showCards = progress >= 0.035 && progress <= 0.74;
  const isLeftCard = activeIndex % 2 === 0;
  const currentMilestone = VISION_MILESTONES[activeIndex];

  // Dynamic animated winding guide path along the road locked to the aircraft center
  // User Requirement: "The line should follow the current plane path and movement. Like it should resembles that as plane is moving and following that line."
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1440;
  const pPlaneX = 600 + finalLateralX * (1200 / screenWidth);
  const pPlaneY = 745 - finalBottom * 5.0;
  const roadSplinePath = `M 600 482
    C 600 560, ${pPlaneX} 650, ${pPlaneX} ${pPlaneY}
    L ${pPlaneX} 900`;

  return (
    <section
      ref={sectionRef}
      id="vision"
      aria-label="The 10-Year Vision Roadmap"
      className="relative w-full select-none"
      style={{ height: "720vh" }}
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
                <feGaussianBlur in="SourceGraphic" stdDeviation="3.0" result="blur1" />
                <feGaussianBlur in="SourceGraphic" stdDeviation="7.5" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Soft Atmospheric Glow Filter for Upcoming Distant Rings (Clean, distinct, keeps rings visible) */}
              <filter id="cyan-glow-distant" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.0" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Metallic Runway Gradient */}
              <linearGradient id="metallic-road-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#01070e" stopOpacity="0.98" />
                <stop offset="40%" stopColor="#02141e" stopOpacity="0.96" />
                <stop offset="85%" stopColor="#031e2b" stopOpacity="0.94" />
                <stop offset="100%" stopColor="#021622" stopOpacity="0.98" />
              </linearGradient>

              {/* Glowing Spline Gradient */}
              <linearGradient id="spline-cyan-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.90" />
                <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.65" />
              </linearGradient>
            </defs>

            {/* ── A. 6 CONCENTRIC CONICAL NEON TUNNEL RINGS (RENDERED BEHIND ROAD) ── */}
            {/* User Requirement: "Now increase the width of all vision rings in this section. Make them more wide." */}
            {/* User Requirement: "The previous rings should be disappear, and current ring should be fully visbile, and the next rings should be slightly faded." */}
            {/* User Requirement: "transition between rings is very fast and rigid. So make the transition between rings smoother." */}
            <g className="vision-conical-rings">
              {VISION_MILESTONES.map((milestone, i) => {
                // In the end of this road when the plane is about to fly again, ensure all rings have passed
                if (exitProgress > 0) return null;

                const ringDiff = continuousMilestone - i; // positive = passed/previous, negative = upcoming/next

                // Silky continuous focus bell curve around ringDiff === 0
                const focusDist = Math.abs(ringDiff);
                const rawFocus = clamp(1 - focusDist, 0, 1);
                const smoothFocus = rawFocus * rawFocus * (3 - 2 * rawFocus);

                // Perspective concentric tunnel spacing with guaranteed open distance between every ring
                // User Requirement: "increase their width and keep space between all rings."
                let r: number;
                if (ringDiff <= 0) {
                  // Upcoming rings ahead down the tunnel corridor
                  // Geometric 0.58 decay spacing guarantees generous dark space between every ring
                  const z = -ringDiff;
                  r = 440 * Math.pow(0.58, z);
                } else {
                  // Ring passed camera: expands outward smoothly
                  r = 440 + ringDiff * 320;
                }

                // Opacity rules:
                // 1. "The previous rings should be disappear" -> As ring passes viewer (ringDiff > 0), fade to 0 quickly
                // 2. "current ring should be fully visible" -> smoothFocus == 1 -> opacity 1.0
                // 3. "the next rings should be slightly faded" -> All upcoming rings (ringDiff < 0) are kept visible, subtly atmospheric
                let ringOpacity: number;
                if (ringDiff > 0) {
                  // Previous ring: disappears smoothly as user passes it
                  ringOpacity = clamp(1 - ringDiff * 2.5, 0, 1);
                } else {
                  // Upcoming rings: visible in receding tunnel, slightly faded (0.30 to 0.46)
                  const z = -ringDiff;
                  const distanceFade = clamp(0.46 - z * 0.05, 0.26, 0.46);
                  ringOpacity = lerp(distanceFade, 1.0, smoothFocus);
                }

                const finalRingOpacity = ringOpacity * envOpacity * ringsEntranceOpacity;
                if (finalRingOpacity <= 0.005) return null;

                // Wide architectural conical collar band with generous separation distance:
                // User Requirement: "increase their width and keep space between all rings"
                // rInner is 74% of r (collar band is 26% of r wide - thick, substantial, bold neon band!)
                // The 0.58 decay guarantees a clear 14px to 70px dark space gap between all consecutive rings!
                const rInner = Math.max(8, r * 0.74);

                const filterUrl = smoothFocus > 0.4 ? "url(#cyan-glow)" : "url(#cyan-glow-distant)";

                return (
                  <g key={`vision-ring-${milestone.phase}`} opacity={finalRingOpacity}>
                    {/* Conical Tunnel Collar Wall (Wide, glowing cyan band with smooth continuous opacity) */}
                    <path
                      d={`M 600 ${482 - r}
                          A ${r} ${r} 0 1 0 600 ${482 + r}
                          A ${r} ${r} 0 1 0 600 ${482 - r}
                          Z
                          M 600 ${482 - rInner}
                          A ${rInner} ${rInner} 0 1 1 600 ${482 + rInner}
                          A ${rInner} ${rInner} 0 1 1 600 ${482 - rInner}
                          Z`}
                      fill="#00e5ff"
                      fillOpacity={lerp(0.12, 0.36, smoothFocus)}
                      fillRule="evenodd"
                      filter={filterUrl}
                    />

                    {/* Architectural Radial Ribs across the wide ring collar (Subtle on distant rings, crisp on active ring) */}
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((segIdx) => {
                      const angle = (segIdx / 16) * Math.PI * 2;
                      const x1 = 600 + rInner * Math.cos(angle);
                      const y1 = 482 + rInner * Math.sin(angle);
                      const x2 = 600 + r * Math.cos(angle);
                      const y2 = 482 + r * Math.sin(angle);
                      return (
                        <line
                          key={`radial-seg-${segIdx}`}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="#00e5ff"
                          strokeWidth={lerp(1.0, 1.8, smoothFocus)}
                          opacity={lerp(0.08, 0.75, smoothFocus)}
                          filter={filterUrl}
                        />
                      );
                    })}

                    {/* Outer Front Rim (Wider, vibrant neon stroke) */}
                    <circle
                      cx="600"
                      cy="482"
                      r={r}
                      fill="none"
                      stroke="#00e5ff"
                      strokeWidth={lerp(2.4, 4.4, smoothFocus)}
                      filter={filterUrl}
                    />

                    {/* Inner Back Rim */}
                    <circle
                      cx="600"
                      cy="482"
                      r={rInner}
                      fill="none"
                      stroke="#00e5ff"
                      strokeWidth={lerp(1.4, 2.4, smoothFocus)}
                      opacity={lerp(0.60, 0.88, smoothFocus)}
                      filter={filterUrl}
                    />

                    {/* Milestone Indicator Tag (Smoothly fades in on active focal ring) */}
                    {smoothFocus > 0.55 && r > 160 && r < 560 && (
                      <g
                        transform={`translate(${600 + r * Math.cos(-Math.PI * 0.72)}, ${
                          482 + r * Math.sin(-Math.PI * 0.72)
                        })`}
                        filter="url(#cyan-glow)"
                        opacity={clamp((smoothFocus - 0.55) / 0.35, 0, 1)}
                      >
                        <rect
                          x="-28"
                          y="-10"
                          width="56"
                          height="20"
                          rx="10"
                          fill="#00e5ff"
                          stroke="#00e5ff"
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
            </g>

            {/* ── B. THE METALLIC FLIGHT ROAD (RENDERED ON TOP OF RINGS, OCCLUDES BOTTOM OF RINGS) ── */}
            {/* User Requirement: "make the starting point of the road little more wider" -> 210 to 990 (780px wide)
                User Requirement: "parts of rings below road should be hidden" -> Solid opaque base polygon completely blocks rings below
                User Requirement: "make road more minimalist. Like no border shines and less dotted lines visible"
                User Requirement: "remove straight lines below road" */}
            <g
              opacity={envOpacity}
              style={{
                transform: `translateY(${roadTranslateY}px) scale(${roadScale})`,
                transformOrigin: "600px 900px",
                transition: "transform 0.05s linear, opacity 0.08s linear",
              }}
            >
              {/* 100% Opaque Road Underlay (Arrow tip at 600,482 - physically blocks rings below) */}
              {/* User Requirement: "end of the road tips were joined together and seemed like a tip of arrow so restore that" */}
              <polygon
                points="600,482 990,900 210,900"
                fill="#01060c"
              />

              {/* Minimalist Dark Metallic Runway Surface */}
              <polygon
                points="600,482 990,900 210,900"
                fill="url(#metallic-road-grad)"
              />

              {/* Minimalist Runway Border Beams meeting at Arrow Tip (600, 482) */}
              <line
                x1="600"
                y1="482"
                x2="210"
                y2="900"
                stroke="#00e5ff"
                strokeWidth="2.4"
                filter="url(#cyan-glow)"
              />
              <line
                x1="600"
                y1="482"
                x2="990"
                y2="900"
                stroke="#00e5ff"
                strokeWidth="2.4"
                filter="url(#cyan-glow)"
              />

              {/* Perspective Runway Horizontal Markers (Matching Image 4 and Image 2) */}
              {[0, 1, 2, 3, 4, 5].map((idx) => {
                const u = ((idx / 6) + progress * 2.0) % 1;
                const yPos = 482 + (900 - 482) * Math.pow(u, 2.2);
                const halfW = 14 + (280 - 14) * Math.pow(u, 2.0);
                const markerOpacity = u < 0.15 ? u / 0.15 : u > 0.85 ? (1 - u) / 0.15 : 0.65;

                return (
                  <line
                    key={`runway-marker-${idx}`}
                    x1={600 - halfW * 0.42}
                    y1={yPos}
                    x2={600 + halfW * 0.42}
                    y2={yPos}
                    stroke="#00e5ff"
                    strokeWidth={lerp(1.2, 2.6, u)}
                    opacity={markerOpacity * 0.35}
                  />
                );
              })}

              {/* Dynamic Animated Winding Guidance Spline on Road */}
              {/* User Requirement: "make that line move more and faster. The line should follow the current plane path and movement. Like it should resembles that as plane is moving and following that line." */}
              {/* Layer 1: Wide Atmospheric Cyan Neon Glow */}
              <path
                d={roadSplinePath}
                fill="none"
                stroke="url(#spline-cyan-grad)"
                strokeWidth="5.0"
                filter="url(#cyan-glow)"
                opacity="0.95"
              />

              {/* Layer 2: Fast High-Tech Streaming Energy Dash Stream */}
              <path
                d={roadSplinePath}
                fill="none"
                stroke="#00e5ff"
                strokeWidth="3.4"
                strokeDasharray="22 14"
                strokeDashoffset={`${-progress * 680}`}
                filter="url(#cyan-glow)"
                opacity="0.85"
              />

              {/* Layer 3: High-Intensity Razor White Core Beam */}
              <path
                d={roadSplinePath}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.6"
                opacity="0.92"
              />
            </g>
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
            width: "clamp(520px, 46vw, 820px)",
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
                  width: "82%",
                  height: "24px",
                  background:
                    "radial-gradient(ellipse at center, rgba(0,0,0,0.95) 0%, rgba(0, 229, 255, 0.32) 42%, transparent 75%)",
                  filter: "blur(6px)",
                  opacity: 0.90 * envOpacity,
                  transition: "opacity 0.08s linear",
                }}
              />

              {/* 3D Model: Consistently Light Platinum Titanium Silver Aircraft */}
              <div className="w-full h-[320px] sm:h-[390px] relative pointer-events-none select-none">
                <Jet3DViewer
                  yaw={finalYaw}
                  pitch={finalPitch}
                  roll={finalRoll3D}
                  cameraY={finalCameraY}
                  modelScale={1.65}
                  engineThrust={0}
                  lightIntensity={1.4}
                  customColors={LIGHT_PLATINUM_TITANIUM_COLORS}
                  lightingTheme="default"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── 6. LAYER 6: FROSTED GLASS VISION MILESTONE CARDS (SLIDING-APPEAR ANIMATION) ── */}
        {/* User Requirement: "add very basic sliding-appear animation to all cards so that they appears sliding-in from the sides with fade-in effect and disappears to the sides by fade-out." */}
        {VISION_MILESTONES.map((milestone, idx) => {
          const cardDiff = continuousMilestone - idx;
          const dist = Math.abs(cardDiff);

          // Card focus window around active index: appears and disappears smoothly
          const cardFocus = clamp(1 - dist * 1.5, 0, 1);
          const cardEase = cardFocus * cardFocus * (3 - 2 * cardFocus);
          if (cardEase <= 0.005 || !showCards) return null;

          const isLeft = idx % 2 === 0;
          // Smooth slide-in from side (-80px on left, +80px on right) and slide-out to side
          const slideX = isLeft ? -80 * (1 - cardEase) : 80 * (1 - cardEase);
          const cardOpacity = cardEase * envOpacity;

          return (
            <div
              key={milestone.year}
              className="absolute z-[32] will-change-transform pointer-events-auto"
              style={{
                top: "50%",
                left: isLeft ? "clamp(24px, 5.5vw, 110px)" : "auto",
                right: !isLeft ? "clamp(24px, 5.5vw, 110px)" : "auto",
                width: "clamp(310px, 25vw, 410px)",
                opacity: cardOpacity,
                transform: `translateY(-50%) translateX(${slideX}px) scale(${0.92 + 0.08 * cardEase})`,
                transition: "opacity 0.08s linear, transform 0.08s linear",
              }}
            >
              {/* Glass Card Container */}
              <div
                className="relative rounded-[22px] p-6 sm:p-7 flex flex-col gap-4 backdrop-blur-2xl select-text"
                style={{
                  background: "rgba(6, 12, 20, 0.68)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.22)",
                }}
              >
                {/* Top Pill Badge: Solid Turquoise/Cyan Pill with Dark Black Bold Text */}
                <div className="inline-flex self-start items-center px-3.5 py-1 rounded-full bg-[#00e5ff] text-black font-bold text-xs font-mono tracking-wider uppercase shadow-[0_0_12px_rgba(0,229,255,0.4)]">
                  {milestone.phase} / {milestone.year}
                </div>

                {/* Large Bold White Title */}
                <h3 className="text-3xl sm:text-[34px] font-bold text-white tracking-tight leading-tight">
                  {milestone.title}
                </h3>

                {/* Clean Minimal Statement Copy */}
                <p className="text-xs sm:text-[14px] text-zinc-300 font-light leading-relaxed min-h-[44px]">
                  {milestone.statement}
                </p>

                {/* Subtle, Minimal Bottom Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  {/* Minimal Step Indicator Dots */}
                  <div className="flex items-center gap-1.5">
                    {VISION_MILESTONES.map((item, dotIdx) => (
                      <button
                        key={item.year}
                        type="button"
                        onClick={() => scrollToMilestone(dotIdx)}
                        aria-label={`Jump to ${item.year}`}
                        className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                        style={{
                          width: dotIdx === idx ? "20px" : "6px",
                          background: dotIdx === idx ? "#00e5ff" : "rgba(255, 255, 255, 0.2)",
                        }}
                      />
                    ))}
                  </div>

                  {/* Clean Prev / Next Chevrons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={idx === 0}
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
                      disabled={idx === TOTAL - 1}
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
          );
        })}

        {/* ── 7. LAYER 7: TOP HEADER & INTRODUCTION (FADES OUT ON SCROLL) ── */}
        {/* User Requirement: "when user enters this vision section and starts scrolling then we should hide this section title and text from top... so all focus is on animation and scroll" */}
        <div
          className="absolute top-8 left-0 right-0 flex flex-col items-center z-[30] pointer-events-none transition-opacity duration-300"
          style={{
            opacity: clamp(1 - progress / 0.035, 0, 1) * envOpacity,
            pointerEvents: progress < 0.035 ? "auto" : "none",
          }}
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

      </div>
    </section>
  );
}
