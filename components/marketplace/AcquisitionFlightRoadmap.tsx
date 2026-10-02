"use client";

import React, { useState, useEffect, useRef } from "react";
import { playSolidDockSound } from "@/lib/audio";

interface AcquisitionStep {
  step: string;
  altitude: string;
  title: string;
  description: string;
  deliverable: string;
  image: string;
  x: number; // Platform X
  y: number; // Platform Y
  cardX: number; // Opposite Details Card X
  cardSide: "left" | "right" | "center";
}

// ── 7 Acquisition Phases across Minimalist Zigzag Flight Coordinates ──
const STEPS: AcquisitionStep[] = [
  {
    step: "01",
    altitude: "10,000 FT",
    title: "Mission Envelope & Portfolio Audit",
    description:
      "Calculating annual flight profile, city-pair range thresholds, and tax jurisdiction to isolate the optimal airframe category.",
    deliverable: "Customized Airframe Feasibility Matrix",
    image: "/images/jet-evolution-1.png",
    x: 960, // Center Round Platform
    y: 520, // Positioned so card (y:100, h:175) is 100% visible with plenty of breathing room
    cardX: 720, // Center Card directly above
    cardSide: "center",
  },
  {
    step: "02",
    altitude: "18,000 FT",
    title: "Sovereign Intelligence & Off-Market Indexing",
    description:
      "Deploying proprietary M1 telemetry scanners and operator backchannels to access unlisted corporate airframes before public listing.",
    deliverable: "Confidential Off-Market Inventory Dossier",
    image: "/images/jet-evolution-2.png",
    x: 1620, // Spread outwards to the right edge
    y: 1100,
    cardX: 70, // Card on Left (at same Y = 1100)
    cardSide: "left",
  },
  {
    step: "03",
    altitude: "27,000 FT",
    title: "Telemetric Logbook & Maintenance Verification",
    description:
      "Complete cross-referencing of turbine cycles, APU hours, structural modifications, and FAA/EASA Airworthiness compliance.",
    deliverable: "Certified Digital Airframe Passport",
    image: "/images/jet-evolution-3.png",
    x: 300, // Spread outwards to the left edge
    y: 1680,
    cardX: 1370, // Card on Right (at same Y = 1680)
    cardSide: "right",
  },
  {
    step: "04",
    altitude: "35,000 FT",
    title: "On-Site Aerospace Pre-Purchase Inspection",
    description:
      "Deploying aerospace engineers to conduct physical borescope turbine scans, non-destructive testing, and avionics diagnostics.",
    deliverable: "Comprehensive 400-Point Technical PPI Report",
    image: "/images/jet-evolution-4.png",
    x: 1620, // Spread outwards to the right edge
    y: 2260,
    cardX: 70, // Card on Left (at same Y = 2260)
    cardSide: "left",
  },
  {
    step: "05",
    altitude: "41,000 FT",
    title: "Cryptographic Escrow & Title Structure",
    description:
      "Direct escrow funds locking through licensed institutional partners with synchronized FAA/EASA registry filings and lien clearance.",
    deliverable: "Insured Instantaneous Deed & Escrow Release",
    image: "/images/jet-evolution-5.png",
    x: 300, // Spread outwards to the left edge
    y: 2840,
    cardX: 1370, // Card on Right (at same Y = 2840)
    cardSide: "right",
  },
  {
    step: "06",
    altitude: "47,000 FT",
    title: "International Ferry Routing & Customs Induction",
    description:
      "Type-rated flight crew dispatch, worldwide overflight and landing permits, oceanic routing, and frictionless import clearance.",
    deliverable: "Turnkey Airframe Delivery to Home Base",
    image: "/images/jet-evolution-6.png",
    x: 1620, // Spread outwards to the right edge
    y: 3420,
    cardX: 70, // Card on Left (at same Y = 3420)
    cardSide: "left",
  },
  {
    step: "07",
    altitude: "51,000 FT",
    title: "SAIOS Operational Induction & Asset Yield",
    description:
      "Integration into M1 SAIOS neural flight deck, continuous telemetry maintenance tracking, and optional high-yield charter fleet dispatch.",
    deliverable: "Continuous Real-Time Operational Fleet Link",
    image: "/images/jet-evolution-7.png",
    x: 960, // Center Round Platform (Flagship Stage)
    y: 4000,
    cardX: 720, // Centered directly BELOW platform
    cardSide: "center",
  },
];

// ── JET AIRFRAME CONFIGURATIONS ──
interface JetDisplayConfig {
  baseScaleX: number; // 1 or -1
  fuselageAngle: number; // Exact fuselage centerline angle relative to horizontal
  width: number;
  height: number;
  xOffset: number;
  yOffset: number;
}

// Enlarged aircraft sizes (+35%) across all phases with calibrated airframe fuselage angles
const JET_CONFIGS: JetDisplayConfig[] = [
  { baseScaleX: -1, fuselageAngle: -25.7, width: 840, height: 469, xOffset: 0, yOffset: 0 }, // P01: wireframe flat horizontal at -25.7deg (flies right)
  { baseScaleX: 1, fuselageAngle: -22.5, width: 840, height: 469, xOffset: 0, yOffset: 0 },  // P02: frame jet naturally facing lower-left towards P03
  { baseScaleX: 1, fuselageAngle: 8.5, width: 850, height: 474, xOffset: -10, yOffset: 10 },  // P03: cabin jet naturally facing right towards P04
  { baseScaleX: 1, fuselageAngle: -20.5, width: 840, height: 469, xOffset: 0, yOffset: 0 },  // P04: silver jet naturally facing lower-left towards P05
  { baseScaleX: 1, fuselageAngle: -5.7, width: 840, height: 469, xOffset: 0, yOffset: 0 },   // P05: supersonic jet naturally facing right towards P06
  { baseScaleX: 1, fuselageAngle: -21.0, width: 840, height: 469, xOffset: 0, yOffset: 0 },  // P06: avalon sst naturally facing lower-left towards P07
  { baseScaleX: 1, fuselageAngle: 6.6, width: 880, height: 491, xOffset: 0, yOffset: 0 },    // P07: flagship supersonic flat horizontal at 6.6deg
];

// ── Supersonic Air Flying Lines Definitions (Dynamic, visibly streaming along calibrated fuselage axis) ──
const ACQUISITION_AIR_STREAKS = [
  { top: "52%", left: "10%", width: "32%", delay: "0s", duration: "0.42s", opacity: 0.85, h: "2px" },
  { top: "40%", left: "18%", width: "36%", delay: "0.08s", duration: "0.46s", opacity: 0.90, h: "2px" },
  { top: "32%", left: "14%", width: "26%", delay: "0.04s", duration: "0.40s", opacity: 0.75, h: "1.5px" },
  { top: "46%", left: "26%", width: "42%", delay: "0.12s", duration: "0.44s", opacity: 0.95, h: "2.5px" },
  { top: "36%", left: "38%", width: "34%", delay: "0.02s", duration: "0.42s", opacity: 0.80, h: "2px" },
  { top: "60%", left: "32%", width: "38%", delay: "0.14s", duration: "0.48s", opacity: 0.75, h: "2px" },
  { top: "26%", left: "46%", width: "28%", delay: "0.06s", duration: "0.42s", opacity: 0.70, h: "1.5px" },
  { top: "48%", left: "52%", width: "32%", delay: "0.10s", duration: "0.44s", opacity: 0.85, h: "2px" },
  { top: "30%", left: "30%", width: "38%", delay: "0.16s", duration: "0.40s", opacity: 0.75, h: "1.5px" },
  { top: "56%", left: "20%", width: "36%", delay: "0.18s", duration: "0.46s", opacity: 0.80, h: "2px" },
  { top: "64%", left: "42%", width: "28%", delay: "0.05s", duration: "0.40s", opacity: 0.65, h: "1.5px" },
  { top: "34%", left: "54%", width: "30%", delay: "0.09s", duration: "0.42s", opacity: 0.70, h: "1.5px" },
];

export default function AcquisitionFlightRoadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const prevStepRef = useRef(0);
  const [viewportSize, setViewportSize] = useState({ w: 1920, h: 1080 });

  // Physics lerp loop refs for fluid, non-snapping 60fps/120fps motion (inspired by ContactFlightJet)
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // Dynamically adapt SVG viewBox so no content is ever clipped on any screen aspect ratio
  useEffect(() => {
    const updateSize = () => {
      setViewportSize({ w: window.innerWidth, h: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Synchronous scroll progress tracking with 60fps/120fps physics lerping loop
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const bottomHold = window.innerHeight * 0.8;
      const scrollableDistance = rect.height - window.innerHeight - bottomHold;
      if (scrollableDistance <= 0) return;

      const raw = -rect.top / scrollableDistance;
      targetProgressRef.current = Math.min(1, Math.max(0, raw));
    };

    const updateLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.00005) {
        currentProgressRef.current += diff * 0.09;
        setSmoothProgress(currentProgressRef.current);
      } else if (currentProgressRef.current !== targetProgressRef.current) {
        currentProgressRef.current = targetProgressRef.current;
        setSmoothProgress(currentProgressRef.current);
      }

      // Active phase advances strictly upon touchdown on destination platform (at 88% of segment)
      const totalSegs = STEPS.length - 1;
      const rawSeg = currentProgressRef.current * totalSegs;
      const curSeg = Math.min(totalSegs - 1, Math.floor(rawSeg));
      const segProg = Math.max(0, Math.min(1, rawSeg - curSeg));
      const currentIdx =
        segProg >= 0.88 ? Math.min(totalSegs, curSeg + 1) : curSeg;

      if (currentIdx !== prevStepRef.current) {
        prevStepRef.current = currentIdx;
        setActiveStepIndex(currentIdx);
        playSolidDockSound(2);
      }

      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    animFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Direct jump to a specific step
  const jumpToStep = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const bottomHold = window.innerHeight * 0.8;
    const scrollableDistance = rect.height - window.innerHeight - bottomHold;
    const targetProg = index / (STEPS.length - 1);
    const containerTop = window.scrollY + rect.top;
    const targetScrollY = containerTop + targetProg * scrollableDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
    playSolidDockSound(3);
  };

  // Fixed departure orientations for each aircraft (already facing their flight direction)
  const DEPARTURE_SCALEX = [-1, 1, 1, 1, 1, 1, 1];

  // Compute Jet coordinates & flight vector across 6 segments
  const totalSegments = STEPS.length - 1; // 6 segments across 7 platforms
  const rawSegment = smoothProgress * totalSegments;
  const currentSegment = Math.min(totalSegments - 1, Math.floor(rawSegment));
  const segProgress = Math.max(0, Math.min(1, rawSegment - currentSegment));

  const startPlatform = STEPS[currentSegment];
  const nextIdx = Math.min(STEPS.length - 1, currentSegment + 1);
  const endPlatform = STEPS[nextIdx];
  const dx = endPlatform.x - startPlatform.x;
  const dy = endPlatform.y - startPlatform.y;

  // ── FLIGHT vs TOUCHDOWN TRANSFORMATION PARTITION ──
  let jetX: number;
  let jetY: number;
  let isFlying = 0; // 0 (parked) to 1.0 (full supersonic cruise)
  let dynamicScaleX = DEPARTURE_SCALEX[currentSegment];
  let dynamicRotate = 0;
  let displayJetIndex = currentSegment;

  // Seamless metamorphosis state (zero twisting, pure gentle light transformation)
  let isTransforming = false;
  let transformLight = 0; // 0 to 1 back to 0
  let prevPlaneOpacity = 1;
  let nextPlaneOpacity = 0;
  let prevScaleX = DEPARTURE_SCALEX[currentSegment];
  let nextScaleX = DEPARTURE_SCALEX[nextIdx];
  let prevRotate = 0;
  let nextRotate = 0;

  const touchdownThreshold = 0.88; // Platform docking occurs at 88% segment progress

  if (segProgress < touchdownThreshold) {
    // ── IN-FLIGHT JOURNEY (Liftoff, High-Altitude Cruise Arc, Flare & Descent) ──
    const flightNorm = segProgress / touchdownThreshold; // 0.0 to 1.0

    // Smooth cubic trajectory easing (matching ContactFlightJet.tsx)
    const easeT =
      flightNorm < 0.5
        ? 2 * flightNorm * flightNorm
        : -1 + (4 - 2 * flightNorm) * flightNorm;

    // Aerodynamic Altitude Climb Arc (arches upward into the atmosphere during flight)
    const altitudeArc = -80 * Math.sin(easeT * Math.PI);

    // Aerodynamic lateral curve
    const lateralSweep = Math.sin(easeT * Math.PI) * (dx > 0 ? 25 : -25);

    jetX = startPlatform.x + dx * easeT + lateralSweep;
    jetY = startPlatform.y + dy * easeT + altitudeArc;

    // Aerodynamic flight intensity / speed:
    // Builds up smoothly on liftoff (0 -> 0.14), cruises at full speed (0.14 -> 0.82),
    // and eases down softly on final approach (0.82 -> 1.0)
    if (flightNorm < 0.14) {
      isFlying = flightNorm / 0.14;
    } else if (flightNorm > 0.82) {
      isFlying = Math.max(0, (1 - flightNorm) / 0.18);
    } else {
      isFlying = 1.0;
    }

    displayJetIndex = currentSegment;
    dynamicScaleX = DEPARTURE_SCALEX[currentSegment];

    // Flight attitude angle
    const baseFlightAngle = (dy / Math.max(1, Math.abs(dx))) * 4 * (dx > 0 ? 1 : -1);

    // Gentle pitch climb accent during mid-flight (pitches nose up during climb, levels out at apex)
    const gentleClimb = -4.5 * Math.sin(easeT * Math.PI);

    if (currentSegment === 0) {
      // Initial platform (P01) flat resting position:
      // When stopped at initial platform (segProgress == 0), place plane COMPLETELY FLAT horizontally (-25.7deg).
      // As user scrolls, it smoothly lifts off and rotates into flight climb attitude!
      const flatRestAngle = -25.7; // 0.00deg horizontal level
      const liftoffBlend = Math.min(1, segProgress / 0.14);
      const liftoffEase = liftoffBlend * liftoffBlend * (3 - 2 * liftoffBlend);
      dynamicRotate = flatRestAngle * (1 - liftoffEase) + (baseFlightAngle + gentleClimb) * liftoffEase;
    } else {
      dynamicRotate = baseFlightAngle + gentleClimb;
    }

    isTransforming = false;
    transformLight = 0;
    prevPlaneOpacity = 1;
    nextPlaneOpacity = 0;
  } else {
    // ── TOUCHDOWN ON PLATFORM & GENTLE LIGHT METAMORPHOSIS (NO TWISTING) ──
    jetX = endPlatform.x;
    jetY = endPlatform.y;
    isFlying = 0;
    displayJetIndex = nextIdx;

    const t = (segProgress - touchdownThreshold) / (1 - touchdownThreshold); // 0 to 1
    const tEase = (1 - Math.cos(t * Math.PI)) / 2;

    isTransforming = true;
    transformLight = Math.sin(t * Math.PI); // Consistent gentle light bloom across all phases

    // Previous plane smoothly dissolves out in its arrival direction
    prevPlaneOpacity = Math.max(0, 1 - tEase * 2.2);

    // Upgraded plane smoothly materializes already oriented in its departure direction
    nextPlaneOpacity = Math.min(1, Math.max(0, (tEase - 0.45) * 2.2));

    // Incoming plane orientation (remains in its arrival direction without turning)
    prevScaleX = DEPARTURE_SCALEX[currentSegment];
    prevRotate = (dy / Math.max(1, Math.abs(dx))) * 4 * (dx > 0 ? 1 : -1);

    // Next plane orientation (already facing the direction it will fly in!)
    nextScaleX = DEPARTURE_SCALEX[nextIdx];

    if (nextIdx === 6) {
      // Platform 7 (Flagship Stage): rests flat horizontal at 6.6deg
      nextRotate = 6.6;
    } else {
      const nextEnd = STEPS[Math.min(STEPS.length - 1, nextIdx + 1)];
      const nextDx = nextEnd.x - endPlatform.x;
      const nextDy = nextEnd.y - endPlatform.y;
      nextRotate = (nextDy / Math.max(1, Math.abs(nextDx))) * 4 * (nextDx > 0 ? 1 : -1);
    }
  }

  const currentDisplayStep = STEPS[displayJetIndex];
  const currentJetConfig = JET_CONFIGS[displayJetIndex];

  // Camera tracking: Smoothly centers the active zone vertically with plenty of headroom for P01 and P07
  const cameraY = Math.max(0, Math.min(3400, jetY - 520));

  // Responsive SVG viewBox computation to prevent ANY clipping
  const aspect = viewportSize.w / Math.max(1, viewportSize.h);
  let viewW = 1920;
  let viewH = 1080;
  let viewX = 0;
  let viewY = cameraY;

  if (aspect >= 1920 / 1080) {
    viewW = 1080 * aspect;
    viewX = (1920 - viewW) / 2;
    viewY = cameraY;
  } else {
    viewH = 1920 / aspect;
    viewX = 0;
    viewY = cameraY - (viewH - 1080) / 2;
  }

  // ── Depth-of-Field Blur Helper for Previous & Next Phases ──
  // Keeps current phase 100% crisp, gently blurs previous/next phase, and softly fades distant phases
  const getPhaseDepthStyle = (idx: number) => {
    const dist = Math.abs(idx - activeStepIndex);
    if (dist === 0) {
      return {
        filter: "none",
        opacity: 1,
        transition: "filter 0.5s ease, opacity 0.5s ease",
      };
    }
    if (dist === 1) {
      return {
        filter: "blur(2.8px)",
        opacity: 0.68,
        transition: "filter 0.5s ease, opacity 0.5s ease",
      };
    }
    return {
      filter: "blur(5.5px)",
      opacity: 0.35,
      transition: "filter 0.5s ease, opacity 0.5s ease",
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520vh] bg-black text-white select-none"
    >
      {/* ── Relative Section Heading: Scrolls Away Naturally as User Scrolls Down ── */}
      <div className="relative z-20 pt-20 sm:pt-24 pb-8 px-4 sm:px-6 max-w-4xl mx-auto text-center pointer-events-auto">
        {/* <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-slate-700 bg-zinc-950/90 backdrop-blur-md text-[10px] font-mono tracking-[0.25em] text-zinc-300 uppercase shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
          <span>Protocol 01-07</span>
        </div> */}
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mt-3 drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
          Our Acquisition System
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto mt-2 leading-relaxed">
          Autonomous 7-step executive aircraft onboarding corridor.
        </p>
      </div>

      {/* ── Sticky Viewport Stage (Sticks for exploration after heading scrolls away) ── */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        {/* Subtle Ambient Radial Glow */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.04)_0%,rgba(0,0,0,0.98)_85%)] pointer-events-none" /> */}

        {/* ── Floating Top Phase Selector Tabs on Right ── */}
        {/* <div className="absolute top-6 sm:top-8 right-6 sm:right-10 z-30 pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full border border-white/20 bg-black/85 backdrop-blur-xl overflow-x-auto no-scrollbar shadow-2xl">
          {STEPS.map((s, idx) => (
            <button
              key={`tab-${s.step}`}
              onClick={() => jumpToStep(idx)}
              className={`px-3 py-1.5 rounded-full font-mono text-[10px] tracking-wider uppercase transition-all ${
                idx === activeStepIndex
                  ? "bg-white text-black font-bold shadow-[0_0_14px_#ffffff]"
                  : "text-zinc-400 hover:text-white hover:bg-white/10"
              }`}
            >
              P{s.step}
            </button>
          ))}
        </div> */}

        {/* ── Fullscreen Interactive SVG Canvas ── */}
        <svg
          viewBox={`${viewX} ${viewY} ${viewW} ${viewH}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            {/* White Soft Platform Glow */}
            <radialGradient id="platformGlowWhite" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#cbd5e1" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* Quantum Light Transformation Aura Gradient */}
            <radialGradient id="quantumTransformGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#e2e8f0" stopOpacity="0.75" />
              <stop offset="65%" stopColor="#94a3b8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* Ecosystem Supersonic Slipstream Air Streaks Gradient */}
            <linearGradient id="ecosystemAirStreak" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.92)" />
              <stop offset="65%" stopColor="rgba(186,230,253,0.78)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>

            {/* ── Plain Silver Round Platform Gradients (Refined Compact Scale) ── */}
            <radialGradient id="platTopSurface" cx="50%" cy="38%" rx="55%" ry="55%">
              <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.85" />
              <stop offset="28%" stopColor="#cbd5e1" stopOpacity="0.68" />
              <stop offset="62%" stopColor="#64748b" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.05" />
            </radialGradient>
            <linearGradient id="platSideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#1e293b" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.88" />
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
              <stop offset="0%" stopColor="#000" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#000" stopOpacity="0.40" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.0" />
            </radialGradient>
          </defs>

          {/* ── Minimalist Airway Flight Corridor Paths (Only shine line for next phase landing) ── */}
          {STEPS.map((s, idx) => {
            if (idx === STEPS.length - 1) return null;
            const next = STEPS[idx + 1];
            const midY = (s.y + next.y) / 2 - 50;
            const pathD = `M ${s.x} ${s.y} Q ${(s.x + next.x) / 2} ${midY}, ${next.x} ${next.y}`;

            const isNextLandingLine = activeStepIndex === idx;

            return (
              <g key={`corridor-${idx}`}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={
                    isNextLandingLine
                      ? "#ffffff"
                      : "rgba(71,85,105,0.35)"
                  }
                  strokeWidth={isNextLandingLine ? "2.6" : "1.3"}
                  strokeDasharray={isNextLandingLine ? "none" : "8 8"}
                  opacity={isNextLandingLine ? 1 : 0.35}
                />
              </g>
            );
          })}

          {/* ── Guide Line for Phase 01 (SOLID White/Silver between Card and Platform) ── */}
          {(() => {
            const isActive = activeStepIndex === 0;
            const p1 = STEPS[0];
            const cardBottom = 100 + 175; // card y=100, height=175 -> 275
            const platformTop = p1.y - 78; // reduced platform top rim -> 442

            return (
              <g
                key="leader-01"
                style={getPhaseDepthStyle(0)}
                className="transition-all duration-300"
              >
                <line
                  x1={p1.x}
                  y1={cardBottom}
                  x2={p1.x}
                  y2={platformTop}
                  stroke={isActive ? "#ffffff" : "rgba(100,116,139,0.35)"}
                  strokeWidth={isActive ? "2" : "1"}
                  strokeDasharray={isActive ? "none" : "6 6"}
                  opacity={isActive ? 1 : 0.35}
                />
                <circle cx={p1.x} cy={cardBottom} r={isActive ? 3.5 : 2} fill={isActive ? "#ffffff" : "#64748b"} />
                <circle cx={p1.x} cy={platformTop} r={isActive ? 3.5 : 2} fill={isActive ? "#ffffff" : "#64748b"} />
              </g>
            );
          })()}

          {/* ── Guide Lines between Platform & Opposite Details Card (SOLID White/Silver for Phases 02 to 06) ── */}
          {STEPS.slice(1, 6).map((step, idx) => {
            const actualIdx = idx + 1;
            const isActive = activeStepIndex === actualIdx;
            const platformSize = 280;
            const cardWidth = 480;

            let lineX1 = 0;
            let lineX2 = 0;

            if (step.cardSide === "left") {
              lineX1 = step.cardX + cardWidth;
              lineX2 = step.x - platformSize / 2;
            } else {
              lineX1 = step.x + platformSize / 2;
              lineX2 = step.cardX;
            }

            return (
              <g
                key={`leader-${step.step}`}
                style={getPhaseDepthStyle(actualIdx)}
                className="transition-all duration-300"
              >
                <line
                  x1={lineX1}
                  y1={step.y}
                  x2={lineX2}
                  y2={step.y}
                  stroke={isActive ? "#ffffff" : "rgba(100,116,139,0.35)"}
                  strokeWidth={isActive ? "2" : "1"}
                  strokeDasharray={isActive ? "none" : "6 6"}
                  opacity={isActive ? 1 : 0.35}
                />
                <circle
                  cx={step.cardSide === "left" ? lineX1 : lineX2}
                  cy={step.y}
                  r={isActive ? 3.5 : 2}
                  fill={isActive ? "#ffffff" : "#64748b"}
                />
                <circle
                  cx={step.cardSide === "left" ? lineX2 : lineX1}
                  cy={step.y}
                  r={isActive ? 3.5 : 2}
                  fill={isActive ? "#ffffff" : "#64748b"}
                />
              </g>
            );
          })}

          {/* ── Guide Line for Phase 07 (SOLID White/Silver vertical connecting below Platform 07) ── */}
          {(() => {
            const isActive = activeStepIndex === 6;
            const p7 = STEPS[6];
            const platformBottom = p7.y + 78; // reduced platform bottom rim -> 4078
            const cardTop = p7.y + 200; // top of card below platform -> 4200

            return (
              <g
                key="leader-07"
                style={getPhaseDepthStyle(6)}
                className="transition-all duration-300"
              >
                <line
                  x1={p7.x}
                  y1={platformBottom}
                  x2={p7.x}
                  y2={cardTop}
                  stroke={isActive ? "#ffffff" : "rgba(100,116,139,0.35)"}
                  strokeWidth={isActive ? "2" : "1"}
                  strokeDasharray={isActive ? "none" : "6 6"}
                  opacity={isActive ? 1 : 0.35}
                />
                <circle cx={p7.x} cy={platformBottom} r={isActive ? 3.5 : 2} fill={isActive ? "#ffffff" : "#64748b"} />
                <circle cx={p7.x} cy={cardTop} r={isActive ? 3.5 : 2} fill={isActive ? "#ffffff" : "#64748b"} />
              </g>
            );
          })()}

          {/* ── 7 LANDING PLATFORMS (Compact Reduced Size for 1st & 7th, Depth Blur for Inactive) ── */}
          {STEPS.map((step, idx) => {
            const isCurrentLanded = activeStepIndex === idx && isFlying < 0.2;
            const isPast = activeStepIndex > idx;
            const isRoundPlatform = idx === 0 || idx === STEPS.length - 1; // 1st & 7th

            if (isRoundPlatform) {
              // ── COMPACT REFINED SILVER ROUND PLATFORM (Reduced by 30% to rx:260, ry:78) ──
              return (
                <g
                  key={`platform-${step.step}`}
                  transform={`translate(${step.x}, ${step.y})`}
                  style={getPhaseDepthStyle(idx)}
                  className="transition-all duration-300 cursor-pointer"
                  onClick={() => jumpToStep(idx)}
                >
                  {/* Ambient Touchdown Glow */}
                  {isCurrentLanded && (
                    <circle
                      cx="0"
                      cy="10"
                      r="220"
                      fill="url(#platformGlowWhite)"
                      className="animate-pulse"
                    />
                  )}

                  {/* Refined Compact Round Silver Platform (rx:260 ry:78) */}
                  <ellipse cx="0" cy="34" rx="240" ry="42" fill="url(#platShadow)" />
                  <ellipse cx="0" cy="18" rx="260" ry="78" fill="url(#platSideGrad)" />
                  <ellipse cx="0" cy="4" rx="260" ry="78" fill="url(#platTopSurface)" />
                  <ellipse cx="0" cy="18" rx="260" ry="78" fill="none" stroke="url(#platBotRim)" strokeWidth="2.2" />
                  <ellipse cx="0" cy="4" rx="260" ry="78" fill="none" stroke="url(#platTopRim)" strokeWidth="2.4" />
                  <ellipse cx="0" cy="4" rx="257" ry="75" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

                  {/* Platform Phase Label */}
                  <text
                    x="0"
                    y="-95"
                    textAnchor="middle"
                    fill={isCurrentLanded ? "#ffffff" : "#94a3b8"}
                    className="font-mono text-xs font-bold tracking-widest uppercase select-none drop-shadow-md"
                  >
                    PHASE {step.step} • {idx === 0 ? "CONCEPT INCEPTION" : "FLAGSHIP STAGE"}
                  </text>
                </g>
              );
            }

            // ── SQUARED MINIMALIST LANDING PADS (Phases 02 to 06 with Depth Blur) ──
            const size = 280;
            return (
              <g
                key={`platform-${step.step}`}
                transform={`translate(${step.x}, ${step.y})`}
                style={getPhaseDepthStyle(idx)}
                className="transition-all duration-300 cursor-pointer"
                onClick={() => jumpToStep(idx)}
              >
                {/* Touchdown Soft White Ambient Glow */}
                {isCurrentLanded && (
                  <circle
                    cx="0"
                    cy="0"
                    r="250"
                    fill="url(#platformGlowWhite)"
                    className="animate-pulse"
                  />
                )}

                {/* Ground Shadow */}
                <rect
                  x={-size / 2 + 6}
                  y={-size / 2 + 10}
                  width={size}
                  height={size}
                  rx="24"
                  fill="#000000"
                  opacity="0.95"
                />

                {/* Minimalist Landing Pad Base */}
                <rect
                  x={-size / 2}
                  y={-size / 2}
                  width={size}
                  height={size}
                  rx="24"
                  fill={isCurrentLanded ? "#0e1117" : "#08090c"}
                  stroke={isCurrentLanded ? "#ffffff" : isPast ? "#94a3b8" : "#334155"}
                  strokeWidth={isCurrentLanded ? "2.5" : "1.2"}
                  className="transition-colors duration-300"
                />

                {/* Subtle Minimalist Corner Tick Marks */}
                {[-1, 1].map((cx) =>
                  [-1, 1].map((cy) => (
                    <path
                      key={`bracket-${cx}-${cy}`}
                      d={`M ${cx * (size / 2 - 20)} ${cy * (size / 2 - 10)} L ${cx * (size / 2 - 10)} ${cy * (size / 2 - 10)} L ${cx * (size / 2 - 10)} ${cy * (size / 2 - 20)}`}
                      fill="none"
                      stroke={isCurrentLanded ? "#ffffff" : isPast ? "#64748b" : "#3f3f46"}
                      strokeWidth="2"
                    />
                  ))
                )}

                {/* Minimalist Center Crosshairs Indicator */}
                <circle
                  cx="0"
                  cy="0"
                  r="10"
                  fill="none"
                  stroke={isCurrentLanded ? "#ffffff" : "#334155"}
                  strokeWidth="1.5"
                />

                {/* Clean Platform Phase Label */}
                <text
                  x="0"
                  y={-size / 2 - 18}
                  textAnchor="middle"
                  fill={isCurrentLanded ? "#ffffff" : "#94a3b8"}
                  className="font-mono text-xs font-bold tracking-widest uppercase select-none drop-shadow-md"
                >
                  PHASE {step.step}
                </text>
              </g>
            );
          })}

          {/* ── PHASE 01 DETAILS CARD (Positioned Fully Visible at y=100 with Depth Blur) ── */}
          {(() => {
            const p1 = STEPS[0];
            const isActive = activeStepIndex === 0;
            const cardWidth = 480;
            const cardHeight = 175;
            const cardTop = 100;

            return (
              <foreignObject
                key="card-fo-01"
                x={p1.cardX}
                y={cardTop}
                width={cardWidth}
                height={cardHeight}
                style={getPhaseDepthStyle(0)}
                className="overflow-visible"
              >
                <div
                  onClick={() => jumpToStep(0)}
                  className={`relative w-full h-full rounded-2xl border p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 select-none overflow-hidden ${
                    isActive
                      ? "border-white bg-[linear-gradient(135deg,#101318_0%,#1f2530_45%,#3a4659_70%,#13171e_100%)] shadow-[0_0_35px_rgba(255,255,255,0.25),0_20px_45px_rgba(0,0,0,0.9),inset_0_1.5px_2px_rgba(255,255,255,0.45)] scale-[1.02]"
                      : "border-slate-700/60 bg-zinc-950/85 hover:border-white/50 shadow-[0_15px_35px_rgba(0,0,0,0.85)] opacity-85 hover:opacity-100"
                  }`}
                >
                  {/* Specular Sheen */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(125deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.04)_30%,transparent_60%)] pointer-events-none" />
                  )}

                  {/* Top Row: Phase & Altitude */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isActive ? "bg-white shadow-[0_0_8px_#ffffff]" : "bg-slate-400"}`} />
                      <span className={`font-mono text-xs font-bold tracking-[0.2em] uppercase ${isActive ? "text-white" : "text-zinc-400"}`}>
                        PHASE 01
                      </span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-zinc-400">
                      {p1.altitude}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="relative z-10 space-y-1 my-auto">
                    <h3 className={`text-xl font-light tracking-tight transition-colors line-clamp-1 ${isActive ? "text-white font-normal" : "text-zinc-200"}`}>
                      {p1.title}
                    </h3>
                    <p className="text-xs text-zinc-300 font-light leading-relaxed line-clamp-2">
                      {p1.description}
                    </p>
                  </div>

                  {/* Deliverable Footer */}
                  <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span>Deliverable:</span>
                    <span className="text-white font-semibold truncate max-w-[280px]">
                      {p1.deliverable}
                    </span>
                  </div>
                </div>
              </foreignObject>
            );
          })()}

          {/* ── MINIMALIST OPPOSITE-SIDE DETAILS CARDS (Phases 02 to 06 with Depth Blur) ── */}
          {STEPS.slice(1, 6).map((step, idx) => {
            const actualIdx = idx + 1;
            const isCurrentActive = activeStepIndex === actualIdx;
            const isPast = activeStepIndex > actualIdx;
            const cardWidth = 480;
            const cardHeight = 190;
            const cardTop = step.y - cardHeight / 2;

            return (
              <foreignObject
                key={`card-fo-${step.step}`}
                x={step.cardX}
                y={cardTop}
                width={cardWidth}
                height={cardHeight}
                style={getPhaseDepthStyle(actualIdx)}
                className="overflow-visible"
              >
                <div
                  onClick={() => jumpToStep(actualIdx)}
                  className={`relative w-full h-full rounded-2xl border p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 select-none overflow-hidden ${
                    isCurrentActive
                      ? "border-white bg-[linear-gradient(135deg,#101318_0%,#1f2530_45%,#3a4659_70%,#13171e_100%)] shadow-[0_0_35px_rgba(255,255,255,0.25),0_20px_45px_rgba(0,0,0,0.9),inset_0_1.5px_2px_rgba(255,255,255,0.45)] scale-[1.02]"
                      : isPast
                      ? "border-slate-700/60 bg-zinc-950/85 hover:border-white/50 hover:bg-zinc-900/90 shadow-[0_15px_35px_rgba(0,0,0,0.85)] opacity-85 hover:opacity-100"
                      : "border-zinc-800 bg-zinc-950/70 hover:border-zinc-500 hover:bg-zinc-900/80 shadow-[0_10px_25px_rgba(0,0,0,0.7)] opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* Diagonal Specular Sheen for Active Phase */}
                  {isCurrentActive && (
                    <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(125deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.04)_30%,transparent_60%)] pointer-events-none" />
                  )}

                  {/* Top Row: Phase & Altitude */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isCurrentActive
                            ? "bg-white shadow-[0_0_8px_#ffffff]"
                            : isPast
                            ? "bg-slate-400"
                            : "bg-zinc-600"
                        }`}
                      />
                      <span
                        className={`font-mono text-xs font-bold tracking-[0.2em] uppercase ${
                          isCurrentActive ? "text-white" : "text-zinc-400"
                        }`}
                      >
                        PHASE {step.step}
                      </span>
                    </div>

                    <span className="font-mono text-xs font-semibold text-zinc-400">
                      {step.altitude}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="relative z-10 space-y-1 my-auto">
                    <h3
                      className={`text-xl font-light tracking-tight transition-colors line-clamp-1 ${
                        isCurrentActive ? "text-white font-normal" : "text-zinc-200"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs text-zinc-300 font-light leading-relaxed line-clamp-2">
                      {step.description}
                    </p>
                  </div>

                  {/* Minimalist Deliverable Footer */}
                  <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span>Deliverable:</span>
                    <span className="text-white font-semibold truncate max-w-[280px]">
                      {step.deliverable}
                    </span>
                  </div>
                </div>
              </foreignObject>
            );
          })}

          {/* ── PHASE 07 DETAILS CARD (Positioned Directly Below Platform 07 with Depth Blur) ── */}
          {(() => {
            const p7 = STEPS[6];
            const isActive = activeStepIndex === 6;
            const cardWidth = 480;
            const cardHeight = 190;
            const cardTop = p7.y + 200; // Positioned directly below platform 07

            return (
              <foreignObject
                key="card-fo-07"
                x={p7.cardX}
                y={cardTop}
                width={cardWidth}
                height={cardHeight}
                style={getPhaseDepthStyle(6)}
                className="overflow-visible"
              >
                <div
                  onClick={() => jumpToStep(6)}
                  className={`relative w-full h-full rounded-2xl border p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 select-none overflow-hidden ${
                    isActive
                      ? "border-white bg-[linear-gradient(135deg,#101318_0%,#1f2530_45%,#3a4659_70%,#13171e_100%)] shadow-[0_0_35px_rgba(255,255,255,0.25),0_20px_45px_rgba(0,0,0,0.9),inset_0_1.5px_2px_rgba(255,255,255,0.45)] scale-[1.02]"
                      : "border-slate-700/60 bg-zinc-950/85 hover:border-white/50 hover:bg-zinc-900/90 shadow-[0_15px_35px_rgba(0,0,0,0.85)] opacity-85 hover:opacity-100"
                  }`}
                >
                  {/* Diagonal Specular Sheen */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(125deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.04)_30%,transparent_60%)] pointer-events-none" />
                  )}

                  {/* Top Row: Phase & Altitude */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isActive ? "bg-white shadow-[0_0_8px_#ffffff]" : "bg-slate-400"}`} />
                      <span className={`font-mono text-xs font-bold tracking-[0.2em] uppercase ${isActive ? "text-white" : "text-zinc-400"}`}>
                        PHASE 07
                      </span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-zinc-400">
                      {p7.altitude}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="relative z-10 space-y-1 my-auto">
                    <h3 className={`text-xl font-light tracking-tight transition-colors line-clamp-1 ${isActive ? "text-white font-normal" : "text-zinc-200"}`}>
                      {p7.title}
                    </h3>
                    <p className="text-xs text-zinc-300 font-light leading-relaxed line-clamp-2">
                      {p7.description}
                    </p>
                  </div>

                  {/* Deliverable Footer */}
                  <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span>Deliverable:</span>
                    <span className="text-white font-semibold truncate max-w-[280px]">
                      {p7.deliverable}
                    </span>
                  </div>
                </div>
              </foreignObject>
            );
          })()}

          {/* ── Dynamic Animated Jet (Centering offsets, clean flight vector & gentle shining effect) ── */}
          <g
            transform={`translate(${jetX}, ${jetY})`}
            className="transition-transform duration-75"
          >
            {/* Dynamic Ground Shadow: ONLY rendered in flight or on square landing pads */}
            {!(displayJetIndex === 0 || displayJetIndex === 6) && (
              <ellipse
                cx={isFlying > 0.1 ? 0 : currentJetConfig.xOffset}
                cy={isFlying > 0.1 ? 130 : 55 + currentJetConfig.yOffset}
                rx={(isFlying > 0.1 ? 190 : 250) * (0.65 + 0.35 * Math.abs(dynamicScaleX))}
                ry={isFlying > 0.1 ? 30 : 44}
                fill="#000000"
                opacity={isFlying > 0.1 ? 0.5 : 0.92}
              />
            )}

            {/* Jet Rendering: During In-Flight vs Touchdown Transformation (No Twisting) */}
            {!isTransforming ? (
              <g
                transform={`rotate(${dynamicRotate}) scale(${dynamicScaleX}, 1)`}
                className="transition-all duration-150"
              >
                {/* Aircraft Body Image */}
                <image
                  href={STEPS[displayJetIndex].image}
                  x={-currentJetConfig.width / 2 + currentJetConfig.xOffset}
                  y={-currentJetConfig.height / 2 + currentJetConfig.yOffset}
                  width={currentJetConfig.width}
                  height={currentJetConfig.height}
                  preserveAspectRatio="xMidYMid meet"
                  style={{
                    filter:
                      displayJetIndex === 6
                        ? "drop-shadow(0 0 35px rgba(255,255,255,0.85)) drop-shadow(0 15px 35px rgba(0,0,0,0.95))"
                        : "drop-shadow(0 20px 40px rgba(0,0,0,0.85))",
                  }}
                />

                {/* ── Proper Dynamic Supersonic Slipstream Air Flying Lines (Moving Continuously like Ecosystem/Contact) ── */}
                {isFlying > 0.03 && (
                  <foreignObject
                    x={-currentJetConfig.width / 2}
                    y={-currentJetConfig.height / 2}
                    width={currentJetConfig.width}
                    height={currentJetConfig.height}
                    className="pointer-events-none overflow-visible z-20"
                  >
                    <div
                      className="relative w-full h-full pointer-events-none"
                      style={{
                        opacity: Math.min(1, isFlying * 1.3),
                        transition: "opacity 0.2s ease-out",
                        transform: `rotate(${currentJetConfig.fuselageAngle}deg)`,
                        transformOrigin: "center center",
                      }}
                    >
                      {ACQUISITION_AIR_STREAKS.map((s, i) => {
                        const isReverse = currentSegment === 0 ? true : dx < 0;
                        return (
                          <div
                            key={`slipstream-${i}`}
                            className={isReverse ? "acquisition-slipstream-streak-reverse" : "acquisition-slipstream-streak"}
                            style={
                              {
                                position: "absolute",
                                top: s.top,
                                left: s.left,
                                width: s.width,
                                height: s.h,
                                background:
                                  isReverse
                                    ? `linear-gradient(to left, transparent 0%, rgba(255,255,255,${s.opacity}) 30%, rgba(186,230,253,${s.opacity * 0.75}) 70%, transparent 100%)`
                                    : `linear-gradient(to right, transparent 0%, rgba(255,255,255,${s.opacity}) 30%, rgba(186,230,253,${s.opacity * 0.75}) 70%, transparent 100%)`,
                                boxShadow: "0 0 5px rgba(255,255,255,0.7), 0 0 10px rgba(56,189,248,0.45)",
                                filter: "blur(0.2px)",
                                "--dur": s.duration,
                                "--delay": s.delay,
                              } as React.CSSProperties
                            }
                          />
                        );
                      })}
                    </div>
                  </foreignObject>
                )}
              </g>
            ) : (
              // ── Touchdown & Gentle Shining Metamorphosis (Zero Twisting, Pure Shining Effect) ──
              <>
                {/* Incoming Aircraft (fades out in its arrival flight orientation) */}
                {prevPlaneOpacity > 0.01 && (
                  <g
                    transform={`rotate(${prevRotate}) scale(${prevScaleX}, 1)`}
                    style={{ opacity: prevPlaneOpacity }}
                  >
                    <image
                      href={STEPS[currentSegment].image}
                      x={-JET_CONFIGS[currentSegment].width / 2 + JET_CONFIGS[currentSegment].xOffset}
                      y={-JET_CONFIGS[currentSegment].height / 2 + JET_CONFIGS[currentSegment].yOffset}
                      width={JET_CONFIGS[currentSegment].width}
                      height={JET_CONFIGS[currentSegment].height}
                      preserveAspectRatio="xMidYMid meet"
                      style={{
                        filter: `drop-shadow(0 20px 40px rgba(0,0,0,0.85)) drop-shadow(0 0 ${transformLight * 30}px rgba(255,255,255,${transformLight * 0.9}))`,
                      }}
                    />
                  </g>
                )}

                {/* Upgraded Next Phase Aircraft (emerges already in its departure direction!) */}
                {nextPlaneOpacity > 0.01 && (
                  <g
                    transform={`rotate(${nextRotate}) scale(${nextScaleX}, 1)`}
                    style={{ opacity: nextPlaneOpacity }}
                  >
                    <image
                      href={STEPS[nextIdx].image}
                      x={-JET_CONFIGS[nextIdx].width / 2 + JET_CONFIGS[nextIdx].xOffset}
                      y={-JET_CONFIGS[nextIdx].height / 2 + JET_CONFIGS[nextIdx].yOffset}
                      width={JET_CONFIGS[nextIdx].width}
                      height={JET_CONFIGS[nextIdx].height}
                      preserveAspectRatio="xMidYMid meet"
                      style={{
                        filter:
                          nextIdx === 6
                            ? "drop-shadow(0 0 35px rgba(255,255,255,0.85)) drop-shadow(0 15px 35px rgba(0,0,0,0.95))"
                            : `drop-shadow(0 20px 40px rgba(0,0,0,0.85)) drop-shadow(0 0 ${transformLight * 30}px rgba(255,255,255,${transformLight * 0.9}))`,
                      }}
                    />
                  </g>
                )}

                {/* ── Pure Shining Light Transformation Effect (Zero Dotted Orbital Lines) ── */}
                {transformLight > 0.02 && (
                  <g className="pointer-events-none">
                    {/* Ethereal Soft Core Ambient Light Glow */}
                    <circle
                      cx="0"
                      cy="0"
                      r={240 + transformLight * 160}
                      fill="url(#quantumTransformGlow)"
                      opacity={transformLight * 0.92}
                    />

                    {/* Radiant Specular Core Flare */}
                    <ellipse
                      cx="0"
                      cy="0"
                      rx={120 + transformLight * 90}
                      ry={36 + transformLight * 28}
                      fill="#ffffff"
                      opacity={Math.pow(transformLight, 2) * 0.85}
                      style={{ filter: "blur(14px)" }}
                    />

                    {/* Specular Horizontal Shining Flash Beam */}
                    <ellipse
                      cx="0"
                      cy="0"
                      rx={240 + transformLight * 150}
                      ry={14 + transformLight * 10}
                      fill="#ffffff"
                      opacity={Math.pow(transformLight, 1.5) * 0.65}
                      style={{ filter: "blur(8px)" }}
                    />
                  </g>
                )}
              </>
            )}

            {/* Active Touchdown Navigation Beacon */}
            {isFlying < 0.2 && !isTransforming && (
              <circle
                cx="0"
                cy="0"
                r="6"
                fill="#ffffff"
                className="animate-ping"
                opacity="0.9"
              />
            )}
          </g>
        </svg>
      </div>
    </div>
  );
}
