"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import ParallelogramButton from "@/components/ui/ParallelogramButton";
import { playTactileClickSound, playCockpitSwitchSound } from "@/lib/audio";

export interface AviationTool {
  id: number;
  name: string;
  description: string;
  image: string;
  cardBg: string; // hex color string e.g. "#0e2e64"
}

export const AVIATION_TOOLS: AviationTool[] = [
  // 1-8: EFB & Flight Planning
  {
    id: 1,
    name: "ForeFlight Mobile",
    description: "Delivers integrated flight planning, geo-referenced charts, weather briefings, weight and balance, and runway analysis for iOS devices.",
    image: "/images/sios-tools/1-ForeFlight Mobile.png",
    cardBg: "#0e2e64",
  },
  {
    id: 2,
    name: "Garmin Pilot",
    description: "Provides multi-platform flight planning, synthetic vision, NOTAMs, and two-way Connext integration with Garmin cockpit avionics.",
    image: "/images/sios-tools/2-Garmin Pilot.png",
    cardBg: "#ffffff",
  },
  {
    id: 3,
    name: "Jeppesen FliteDeck Pro",
    description: "Supplies commercial and business operators with global enroute data, terminal charts, and airline-grade navigation workflows.",
    image: "/images/sios-tools/3-Jeppesen FliteDeck Pro.png",
    cardBg: "#5354a2",
  },
  {
    id: 4,
    name: "SkyDemon",
    description: "Offers dynamic moving maps, airspace warnings, and offline chart support tailored for European VFR operations.",
    image: "/images/sios-tools/4-SkyDemon.png",
    cardBg: "#ffffff",
  },
  {
    id: 5,
    name: "OzRunways",
    description: "Serves operators in Australia and New Zealand with official regional charts, flight plan filing, and terrain awareness.",
    image: "/images/sios-tools/5-OzRunways.png",
    cardBg: "#020e72",
  },
  {
    id: 6,
    name: "FlyQ+ EFB",
    description: "Focuses on streamlined iPad flight planning, graphical weather briefings, and glide-ring situational awareness.",
    image: "/images/sios-tools/6-FlyQ+ EFB.png",
    cardBg: "#1c2235",
  },
  {
    id: 7,
    name: "Air Navigation Pro",
    description: "Provides real-time GPS moving maps, global aeronautical databases, and customizable operator modules.",
    image: "/images/sios-tools/7-Air Navigation Pro.png",
    cardBg: "#f5e9c8",
  },
  {
    id: 8,
    name: "AvPlan EFB",
    description: "Combines multi-leg flight planning, fuel calculations, and live traffic overlays for international operators.",
    image: "/images/sios-tools/8-AvPlan EFB.png",
    cardBg: "#f37f1f",
  },

  // 9-17: Flight Operations, Dispatch & Scheduling
  {
    id: 9,
    name: "FL3XX",
    description: "Centralizes charter quoting, crew rostering, dispatch, and compliance tracking for business aviation operators.",
    image: "/images/sios-tools/9-FL3XX.png",
    cardBg: "#1d1c20",
  },
  {
    id: 10,
    name: "Leon Software",
    description: "Manages crew scheduling, flight watch, sales quoting, and flight time limitations for commercial and charter fleets.",
    image: "/images/sios-tools/10-Leon Software.png",
    cardBg: "#1c1c1e",
  },
  {
    id: 11,
    name: "Portside",
    description: "Delivers cloud-based fleet scheduling, owner reporting, and operational analytics for aircraft managers.",
    image: "/images/sios-tools/11-Portside.png",
    cardBg: "#ffffff",
  },
  {
    id: 12,
    name: "Collins ARINCDirect",
    description: "Supports global flight departments with international trip support, flight planning, and cabin connectivity.",
    image: "/images/sios-tools/12-Collins ARINCDirect.png",
    cardBg: "#ffffff",
  },
  {
    id: 13,
    name: "PPS Flight Planning",
    description: "Automates route optimization, fuel analysis, NOTAM updates, and ATC filing for operations control centers.",
    image: "/images/sios-tools/13-PPS Flight Planning.png",
    cardBg: "#ffffff",
  },
  {
    id: 14,
    name: "Airplane Manager",
    description: "Provides lightweight fleet scheduling, conflict detection, and real-time aircraft positioning.",
    image: "/images/sios-tools/14-Airplane Manager.png",
    cardBg: "#39628a",
  },
  {
    id: 15,
    name: "Myairops",
    description: "Handles trip management, crew duty compliance, and FBO coordination for business and charter operators.",
    image: "/images/sios-tools/15-Myairops.png",
    cardBg: "#090f1a",
  },
  {
    id: 16,
    name: "FlightOps Crew",
    description: "Connects flight crews with offline-capable duty rosters, journey logs, transport tracking, and training records.",
    image: "/images/sios-tools/16-FlightOps Crew.png",
    cardBg: "#006bf7",
  },
  {
    id: 17,
    name: "PDC FlightCharter",
    description: "Streamlines end-to-end charter coordination, crew duty tracking, and automated schedule updates.",
    image: "/images/sios-tools/17-PDC FlightCharter.png",
    cardBg: "#111827",
  },

  // 18-23: Maintenance, MRO & Compliance
  {
    id: 18,
    name: "Veryon Tracking",
    description: "Tracks airframe maintenance schedules, predictive analytics, and technical publications across fleets.",
    image: "/images/sios-tools/18-Veryon Tracking.png",
    cardBg: "#2a2a28",
  },
  {
    id: 19,
    name: "Ramco Aviation",
    description: "Offers enterprise maintenance, repair, and overhaul (MRO) management, engineering, and supply chain tools.",
    image: "/images/sios-tools/19-Ramco Aviation.png",
    cardBg: "#ffffff",
  },
  {
    id: 20,
    name: "Quantum Control",
    description: "Manages MRO work orders, parts inventory, and shop-floor scheduling.",
    image: "/images/sios-tools/20-Quantum Control.png",
    cardBg: "#1a1a1a",
  },
  {
    id: 21,
    name: "WinAir",
    description: "Provides real-time aircraft maintenance tracking, inventory control, and regulatory compliance workflows.",
    image: "/images/sios-tools/21-WinAir.png",
    cardBg: "#b8bdca",
  },
  {
    id: 22,
    name: "Comply365",
    description: "Distributes operational manuals, safety forms, and regulatory updates to flight crews.",
    image: "/images/sios-tools/22-Comply365.png",
    cardBg: "#ffffff",
  },
  {
    id: 23,
    name: "IQSMS",
    description: "Supports safety management systems (SMS), hazard reporting, and quality assurance audits for operators.",
    image: "/images/sios-tools/23-IQSMS.png",
    cardBg: "#b61021",
  },

  // 24-30: Weather, Tracking & Crew Utilities
  {
    id: 24,
    name: "Windy",
    description: "Visualizes global wind patterns, cloud bases, turbulence, and freezing levels across multiple flight altitudes.",
    image: "/images/sios-tools/24-Windy.png",
    cardBg: "#ffffff",
  },
  {
    id: 25,
    name: "AeroWeather",
    description: "Decodes global METARs, TAFs, NOTAMs, and runway conditions with custom flight-category alerts.",
    image: "/images/sios-tools/25-AeroWeather.png",
    cardBg: "#172c7a",
  },
  {
    id: 26,
    name: "WeatherSpork",
    description: "Provides vertical route weather profiles, meteograms, and departure timing advisors.",
    image: "/images/sios-tools/26-WeatherSpork.png",
    cardBg: "#0d1117",
  },
  {
    id: 27,
    name: "FlightAware",
    description: "Delivers real-time global aircraft tracking, inbound delay alerts, and FBO flight status monitoring.",
    image: "/images/sios-tools/27-FlightAware.png",
    cardBg: "#ffffff",
  },
  {
    id: 28,
    name: "Flightradar24",
    description: "Monitors live global ADS-B air traffic, fleet movements, and airport arrival/departure boards.",
    image: "/images/sios-tools/28-Flightradar24.png",
    cardBg: "#f9810a",
  },
  {
    id: 29,
    name: "LogTen Pro",
    description: "Automates pilot flight-time logging, duty-limit warnings, and currency tracking with cloud sync.",
    image: "/images/sios-tools/29-LogTen Pro.png",
    cardBg: "#1a2744",
  },
  {
    id: 30,
    name: "CloudAhoy",
    description: "Records GPS flight tracks for 3D post-flight debriefing, maneuver grading, and safety analysis.",
    image: "/images/sios-tools/30-CloudAhoy.png",
    cardBg: "#1b6ca8",
  },
];

const M1_DEFAULT_TOOL: AviationTool = {
  id: 0,
  name: "M1 SIOS Unified Grid",
  description:
    "SIOS natively interconnects 30+ leading global aviation software platforms, Electronic Flight Bags, and telemetry networks into a synchronized operational mesh.",
  image: "/images/m1-logo.png",
  cardBg: "#000000",
};

export default function SiosToolsMatrix() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredTool, setHoveredTool] = useState<AviationTool | null>(null);
  const [selectedTool, setSelectedTool] = useState<AviationTool | null>(null);
  const [viewportWidth, setViewportWidth] = useState(1440);

  // Responsive screen width listener for edge-to-edge carousel calculation
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filtered tools based on search query
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return AVIATION_TOOLS;
    const q = searchQuery.toLowerCase();
    return AVIATION_TOOLS.filter((tool) => {
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  // Decoupled detail card: shows hovered tool, or clicked tool, or defaults to M1
  const activeTool = hoveredTool || selectedTool || M1_DEFAULT_TOOL;

  // Continuous floating position offset (0 to filteredTools.length)
  const [progress, setProgress] = useState(0);
  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Update progress continuously with smooth uninterrupted movement
  useEffect(() => {
    const total = Math.max(1, filteredTools.length);

    const step = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = time - lastTimeRef.current;
        // Continuous smooth movement: gracefully slows to 0.25x when inspecting a specific logo
        const currentSpeedMultiplier = (hoveredTool || selectedTool) ? 0.25 : 1.0;
        const speed = (delta / 45000) * total * currentSpeedMultiplier;
        setProgress((prev) => (prev + speed) % total);
      }
      lastTimeRef.current = time;
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [hoveredTool, selectedTool, filteredTools.length]);

  // Manual stepping handlers
  const handlePrev = useCallback(() => {
    playTactileClickSound();
    setProgress((prev) => {
      const total = Math.max(1, filteredTools.length);
      return (prev - 1 + total) % total;
    });
  }, [filteredTools.length]);

  const handleNext = useCallback(() => {
    playTactileClickSound();
    setProgress((prev) => {
      const total = Math.max(1, filteredTools.length);
      return (prev + 1) % total;
    });
  }, [filteredTools.length]);

  // Inverted trapezoid clip path (wide top, tapered narrower bottom where button sits)
  const polygonPath =
    viewportWidth < 640
      ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
      : "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

  return (
    <section
      onClick={() => setSelectedTool(null)}
      className="relative z-20 w-full pt-12 pb-16 sm:pt-16 sm:pb-20 px-2 sm:px-4 bg-black border-t border-zinc-800/80 overflow-hidden"
    >
      {/* Ambient Silver & Platinum Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-b from-white/[0.06] via-zinc-500/[0.02] to-transparent blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-zinc-400/[0.04] blur-[120px] pointer-events-none" />

      {/* Subtle Coordinate Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full mx-auto relative z-10 flex flex-col items-center">
        {/* Header Title */}
        <div className="text-center space-y-2 max-w-3xl mx-auto mb-5 px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
            Operational Intelligence Matrix
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
            SIOS natively interconnects with the world’s leading Electronic Flight Bags, Dispatch engines, MRO compliance databases, and real-time atmospheric tracking networks.
          </p>
        </div>

        {/* ── CENTER SPACE INSPECTION HUD (Horizontal Layout: Logo | Info | CTA) ── */}
        <div
          className="w-full max-w-3xl sm:max-w-4xl lg:max-w-5xl relative px-4 flex justify-center mb-0"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Metallic Silver Border Wrapper */}
          <div
            className="relative w-full p-[1.5px] rounded-2xl transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.08)]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(161,161,170,0.3) 40%, rgba(255,255,255,0.5) 100%)",
            }}
          >
            {/* Inner Dark Glass Console */}
            <div
              className="relative w-full rounded-[14px] backdrop-blur-2xl bg-gradient-to-b from-[#12141a]/98 via-[#0b0c10]/98 to-black/98 overflow-hidden"
            >
              {/* Subtle top specular line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              {/* ── HORIZONTAL ROW: [Logo] [Name + Description] [CTA Button] ── */}
              <div className="flex flex-row items-center gap-5 sm:gap-8 py-5 sm:py-6 px-5 sm:px-8">

                {/* LEFT: Logo Box — same size as CTA box */}
                <div className="flex-shrink-0">
                  <div
                    className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.8)] border border-white/20 overflow-hidden"
                    style={{ backgroundColor: activeTool.cardBg }}
                  >
                    <div className="relative w-[85%] h-[85%] drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                      <Image
                        src={activeTool.image}
                        alt={activeTool.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, 144px"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* CENTER: Tool Name & Description */}
                <div className="flex-1 flex flex-col justify-center space-y-2 min-h-[112px] sm:min-h-[128px]">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-tight text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] leading-tight">
                    {activeTool.name}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light min-h-[44px] sm:min-h-[52px] flex items-center">
                    {activeTool.description}
                  </p>
                </div>

                

              </div>
              {/* Bottom subtle line */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* ── SEARCH BAR: Matching bottom width of card with metallic silver border ── */}
        <div
          className="w-full max-w-[340px] sm:max-w-[480px] md:max-w-[540px] mt-2 mb-1 px-2 flex justify-center z-30"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="relative w-full p-[1.5px] rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(161,161,170,0.25) 50%, rgba(255,255,255,0.45) 100%)",
            }}
          >
            <div className="relative w-full rounded-[10px] bg-gradient-to-b from-[#12141a]/98 via-[#0b0c10]/98 to-black/98 flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by tool name or capability..."
                className="w-full py-2 pl-9 pr-4 rounded-[10px] bg-transparent text-xs font-mono text-white placeholder:text-zinc-500 focus:outline-none transition-all"
              />
              <svg
                className="w-4 h-4 text-zinc-300 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── CTA BUTTON: Sharp-edged tilted shiny silver parallelogram button (like Apply Now) ── */}
        <div
          className="mt-3 mb-2 flex justify-center z-30"
          onClick={(e) => e.stopPropagation()}
        >
          <ParallelogramButton
            href="https://forms.gle/pNLZwCgvpNes3fXz5"
            isExternal={true}
            variant="shiny-silver"
            onClick={() => playTactileClickSound()}
            className="text-xs sm:text-sm px-8 sm:px-12 py-3 sm:py-3.5 font-bold tracking-widest shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:shadow-[0_0_35px_rgba(255,255,255,0.8)]"
          >
            Connect System to SIOS →
          </ParallelogramButton>
        </div>

                
        {/* ── 3D CURVATURE SHAPE CAROUSEL (Solid Non-Transparent Logo Boxes) ── */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-screen h-[340px] sm:h-[380px] flex items-center justify-center overflow-visible select-none -mt-4 sm:-mt-6"
          style={{ perspective: "1100px" }}
        >

          {/* Dynamic 3D Continuous Item Renderer */}
          {(() => {
            const total = filteredTools.length;
            if (total === 0) return null;

            // Stretch ends well outside the screen side borders so logos enter from one side and exit into the other
            const xSpread = Math.max(520, viewportWidth * 0.64);
            const visibleRadius = Math.min(13, Math.floor(total / 2));
            const items = [];

            // Compute continuous floating position for every tool along the loop
            for (let i = 0; i < total; i++) {
              const tool = filteredTools[i];
              if (!tool) continue;

              // Continuous floating offset relative to progress
              let diff = (i - progress) % total;
              if (diff < -total / 2) diff += total;
              if (diff > total / 2) diff -= total;

              // Skip if outside visible amphitheater arc window
              if (Math.abs(diff) > visibleRadius) continue;

              const u = diff / visibleRadius; // Continuous float in [-1, 1]
              const absU = Math.abs(u);

              // 1. Non-linear horizontal projection (front cards spaced far apart, back cards tight)
              const xPos = Math.sign(u) * Math.pow(absU, 0.76) * xSpread;

              // 2. Vertical position: Center is lifted closer to card (y = 40), Sides curve high up (y = -120)
              const yPos = 100 - Math.pow(absU, 1.55) * 800;

              // 3. Depth (Z): Center is NEAR (z = 70), Sides are FAR (z = -440)
              const zPos = 70 - Math.pow(absU, 1.45) * 480;

              // 4. Inward Rotation
              const rotY = -u * 46;
              const rotX = Math.pow(absU, 1.25) * 14;

              // 5. Scale & Opacity: Front cards are much bigger (1.34), back cards get smaller (down to 0.48)
              const scale = 1.34 - Math.pow(absU, 1.25) * 0.84;
              const opacity = Math.max(0.15, 1.0 - Math.pow(absU, 1.3) * 0.75);
              const zIndex = Math.round(100 - absU * 65);

              const isHovered = (hoveredTool?.id === tool.id) || (selectedTool?.id === tool.id);

              // Determine whether the cardBg is light or dark to pick contrasting pill/border colors
              const hex = tool.cardBg.replace("#", "");
              const r = parseInt(hex.substring(0, 2), 16);
              const g = parseInt(hex.substring(2, 4), 16);
              const b = parseInt(hex.substring(4, 6), 16);
              const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
              const isLight = luminance > 0.55;

              // Pill: on light bg use dark pill; on dark bg use white pill
              const pillBgClass = isLight
                ? "bg-zinc-900 text-white border-zinc-700 font-bold"
                : "bg-white text-zinc-900 border-zinc-200 font-bold";
              const solidBgClass = ""; // bg color applied via inline style

              items.push(
                <div
                  key={`tool-arc-${tool.id}`}
                  onMouseEnter={() => {
                    setHoveredTool(tool);
                    playTactileClickSound();
                  }}
                  onMouseLeave={() => {
                    setHoveredTool(null);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTool((prev) => (prev?.id === tool.id ? null : tool));
                    playCockpitSwitchSound();
                  }}
                  className={`absolute cursor-pointer transition-all duration-300 ease-out will-change-transform ${
                    isHovered ? "z-50" : ""
                  }`}
                  style={{
                    transform: `translate3d(${xPos}px, ${yPos}px, ${zPos}px) rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${
                      isHovered ? scale * 1.2 : scale
                    })`,
                    zIndex,
                    opacity: isHovered ? 1.0 : opacity,
                  }}
                >
                  {/* Tool Logo Card: 100% Solid exact-match Background */}
                  <div
                    className={`relative w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-2xl sm:rounded-3xl p-3 sm:p-4 flex flex-col items-center justify-center transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.85)] ${
                      isHovered
                        ? "border-2 border-white shadow-[0_0_35px_rgba(255,255,255,0.85),0_15px_30px_rgba(0,0,0,0.95)] scale-110"
                        : "border border-white/20"
                    }`}
                    style={{ backgroundColor: tool.cardBg }}
                  >
                    {/* Tool Logo Image */}
                    <div className="relative w-20 h-20 sm:w-26 sm:h-26 lg:w-28 lg:h-28 drop-shadow-[0_4px_12px_rgba(0,0,0,0.18)]">
                      <Image
                        src={tool.image}
                        alt={tool.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 80px, (max-width: 1024px) 104px, 112px"
                      />
                    </div>

                    {/* Tool Number Pill on Top Center */}
                    <div
                      className={`absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-1 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase border transition-all duration-200 ${pillBgClass} ${
                        isHovered ? "shadow-[0_0_20px_rgba(255,255,255,0.7)]" : ""
                      }`}
                    >
                      {String(tool.id).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              );
            }

            return items;
          })()}

          {/* Navigation Controls: Left & Right Stepping Buttons (Polished Silver) */}
          <button
            onClick={handlePrev}
            aria-label="Previous Tool"
            className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full border border-white/30 bg-zinc-900/80 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:scale-110"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Tool"
            className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full border border-white/30 bg-zinc-900/80 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] hover:scale-110"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
