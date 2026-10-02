"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Dynamic supersonic air streaks during flight
const AIR_STREAKS = [
  { top: "60%", left: "10%", width: "26%", delay: "0s",    duration: "0.48s", opacity: 0.55, h: "1.5px" },
  { top: "46%", left: "18%", width: "30%", delay: "0.12s", duration: "0.52s", opacity: 0.60, h: "1.5px" },
  { top: "36%", left: "16%", width: "28%", delay: "0.06s", duration: "0.46s", opacity: 0.50, h: "1.5px" },
  { top: "44%", left: "30%", width: "34%", delay: "0.10s", duration: "0.50s", opacity: 0.55, h: "1.5px" },
  { top: "35%", left: "44%", width: "30%", delay: "0.04s", duration: "0.48s", opacity: 0.52, h: "1.5px" },
  { top: "64%", left: "40%", width: "32%", delay: "0.16s", duration: "0.52s", opacity: 0.48, h: "1.5px" },
  { top: "20%", left: "52%", width: "28%", delay: "0.08s", duration: "0.48s", opacity: 0.50, h: "1.5px" },
  { top: "54%", left: "58%", width: "26%", delay: "0.14s", duration: "0.46s", opacity: 0.52, h: "1.5px" },
  { top: "28%", left: "32%", width: "36%", delay: "0.18s", duration: "0.44s", opacity: 0.48, h: "1.5px" },
];

interface FlightState {
  active: boolean;
  progress: number;
  x: number;
  y: number;
  width: number;
  scale: number;
  rotateZ: number;
  rotateX: number;
  rotateY: number;
  opacity: number;
  showAirStreaks: boolean;
  // Tow Rope State
  ropeVisible: boolean;
  ropeProgress: number;
  ropePath: string;
  jetHookX: number;
  jetHookY: number;
  roadHookX: number;
  roadHookY: number;
}

export default function ScrollFlightJet() {
  const [state, setState] = useState<FlightState>({
    active: false,
    progress: 0,
    x: 0,
    y: 0,
    width: 920,
    scale: 1,
    rotateZ: 0,
    rotateX: 0,
    rotateY: 0,
    opacity: 0,
    showAirStreaks: false,
    ropeVisible: false,
    ropeProgress: 0,
    ropePath: "",
    jetHookX: 0,
    jetHookY: 0,
    roadHookX: 0,
    roadHookY: 0,
  });

  useEffect(() => {
    let animId: number;

    const updateFlight = () => {
      const sourceEl = document.getElementById("ecosystem-jet-source");
      const visionContainer = document.getElementById("vision");

      if (!sourceEl || !visionContainer) return;

      const vh = window.innerHeight;
      const vw = window.innerWidth;

      const sourceRect = sourceEl.getBoundingClientRect();
      const visionRect = visionContainer.getBoundingClientRect();

      // Takeoff trigger: smooth launch when Ecosystem scrolls up
      const takeoffThreshold = vh * 0.10;
      // Landing trigger: When Vision timeline arrives into view
      const landingThreshold = vh * 0.18;

      // Distance from takeoff threshold down to vision arrival
      const flightDistance = (visionRect.top - landingThreshold) - (sourceRect.top - takeoffThreshold);

      if (flightDistance <= 0) return;

      // Progress calculation
      const scrolled = takeoffThreshold - sourceRect.top;
      const progressRaw = scrolled / flightDistance;
      const progress = Math.max(0, progressRaw);

      // Active when flight starts, and stays active throughout the entire Vision section
      const isActive = progress > 0.01 && visionRect.bottom > vh * 0.1;

      if (!isActive) {
        setState((prev) => (prev.active ? { ...prev, active: false, opacity: 0 } : prev));
        return;
      }

      // Flight progress (0 to 1 for the transition from Ecosystem to Vision)
      const flightP = Math.min(1, progress);

      // =========================================================================
      // ✈️ 1. LANDING PLANE SIZE CONFIGURATION:
      // Edit LANDING_SCALE below to change the landing plane size:
      // - 1.0  = Full original size
      // - 0.70 = 30% smaller (CURRENT: reduced by ~30%)
      // - 0.50 = 50% smaller (half size)
      // =========================================================================
      const LANDING_SCALE = 0.70;

      // Exact width of the original plane on the platform
      const jetWidth = sourceRect.width > 50 ? sourceRect.width : 920;

      // Scale smoothly transitions from 1.0 (takeoff) down to LANDING_SCALE (landing)
      const curScale = 1.0 - flightP * (1.0 - LANDING_SCALE);
      const jetW = jetWidth * curScale;
      const jetH = jetW * (768 / 1376);

      // ── Precise Fixed Road Anchor Point ──
      // Tracks the physical starting threshold of the road (#road-tow-anchor)
      const roadAnchor = document.getElementById("road-tow-anchor") as SVGCircleElement | null;
      let roadHookX = 0;
      let roadHookY = 0;
      let hasValidAnchor = false;

      if (roadAnchor) {
        const rRect = roadAnchor.getBoundingClientRect();
        if (rRect.width > 0 && rRect.height > 0) {
          roadHookX = rRect.left + rRect.width * 0.5;
          roadHookY = rRect.top + rRect.height * 0.5;
          hasValidAnchor = true;
        } else {
          // Native SVG coordinate matrix transform fallback if rect is empty
          try {
            const svg = roadAnchor.ownerSVGElement;
            if (svg) {
              const ctm = typeof roadAnchor.getScreenCTM === "function" ? roadAnchor.getScreenCTM() : null;
              if (ctm) {
                const pt = svg.createSVGPoint();
                pt.x = roadAnchor.cx.baseVal.value || 0;
                pt.y = roadAnchor.cy.baseVal.value || 0;
                const screenPt = pt.matrixTransform(ctm);
                roadHookX = screenPt.x;
                roadHookY = screenPt.y;
                hasValidAnchor = true;
              }
            }
          } catch (e) {
            // Ignore error
          }
        }
      }

      // =========================================================================
      // 📍 2. LANDING & FIXED STRING CONFIGURATION:
      // - FIXED_STRING_LENGTH: Exact taut length of the towing cable (stays strictly constant)
      // - landingX, landingY: Landing position aligned with road tow anchor
      // =========================================================================
      const FIXED_STRING_LENGTH = 110;
      const landingX = hasValidAnchor ? (roadHookX - FIXED_STRING_LENGTH) - jetW * 0.16 : 500;
      // Vertically aligns plane's tow hook (curY + jetH * 0.08) exactly with the road anchor (roadHookY)
      const targetLevelY = hasValidAnchor ? roadHookY - jetH * 0.08 : vh * 0.42;
      const landingY = targetLevelY;

      // Starting coordinate (center of Ecosystem platform jet in viewport)
      const startX = sourceRect.left + sourceRect.width * 0.5;
      const startY = sourceRect.top + sourceRect.height * 0.5;

      // Smooth flight trajectory curve:
      // Standard Hermite ease has 1.50x peak acceleration at midpoint (crossing the logo section).
      // Blending 82% linear + 18% hermite slows down the midpoint speed to ~1.09x,
      // keeping the plane perfectly synchronized with the user's screen scroll without rushing ahead.
      const hermite = flightP * flightP * (3 - 2 * flightP);
      const easeT = 0.82 * flightP + 0.18 * hermite;
      const lateralArc = Math.sin(flightP * Math.PI) * 28;

      const flightX = startX + (landingX - startX) * easeT - lateralArc;
      const flightY = startY + (landingY - startY) * easeT;

      // ── Road Journey Scroll (Inside Vision Timeline) ──
      // Once landed, the plane is physically hitched to the road anchor by the fixed-length cable.
      // As the road moves to the left with scroll, the plane travels in absolute lockstep with
      // the road anchor (#road-tow-anchor), ensuring the string stays at a fixed length and NEVER stretches.
      const curX = flightP >= 1
        ? (hasValidAnchor ? (roadHookX - FIXED_STRING_LENGTH) - jetW * 0.16 : landingX)
        : flightX;
      const curY = flightP >= 1 ? targetLevelY : flightY;

      // ── Tow Rope Hook Coordinates ──
      const jetHookX = curX + jetW * 0.16;
      const jetHookY = curY + jetH * 0.08;

      // ── Animated Tow Rope Unwrap & Attachment ──
      // String attaches ONLY once plane has landed at Step 01 (flightP >= 0.98),
      // locks strictly to the real road anchor point without drifting,
      // and stays consistently attached at a fixed length until the plane exits the frame
      let ropeVisible = false;
      let ropeProgress = 0;
      let ropePath = "";

      const planeRightEdge = curX + jetW * 0.5;
      const isPlaneInFrame = planeRightEdge > -60;

      if (flightP >= 0.98 && isPlaneInFrame && hasValidAnchor) {
        ropeVisible = true;
        if (flightP < 1.0) {
          // Snappy smooth unwrap right on touchdown (0.98 -> 1.0)
          ropeProgress = (flightP - 0.98) / 0.02;
        } else {
          ropeProgress = 1.0; // Fully latched to road anchor!
        }

        const targetX = jetHookX + (roadHookX - jetHookX) * ropeProgress;
        const targetY = jetHookY + (roadHookY - jetHookY) * ropeProgress;

        // When pulling under tension, cable straightens taut
        const sag = Math.max(0, 14 * (1 - ropeProgress));
        const midX = (jetHookX + targetX) / 2;
        const midY = (jetHookY + targetY) / 2 + sag;

        ropePath = `M ${jetHookX} ${jetHookY} Q ${midX} ${midY} ${targetX} ${targetY}`;
      }

      // 3D Banking & Pitch during flight — settles level (0deg) once landed in Vision section
      const rollMidFlight = -14 * Math.sin(flightP * Math.PI);
      const curRotateZ = flightP >= 1 ? 0 : rollMidFlight * (1 - flightP);
      const curRotateX = flightP >= 1 ? 0 : -6 * Math.sin(flightP * Math.PI);
      const curRotateY = flightP >= 1 ? 0 : -10 * Math.sin(flightP * Math.PI);

      // Air streaks active ONLY in flight, completely OFF once landed!
      const showAirStreaks = flightP > 0.08 && flightP < 0.95;

      // Opacity:
      // 1. Fades in on takeoff
      // 2. Full opacity (1.0) when landed at Step 01
      // 3. Stays 100% visible (NO premature fading!) as it pulls the road to the left
      // 4. Only disappears once it has actually moved outside the left frame
      let opacity = 1;
      if (flightP < 0.06) {
        opacity = flightP / 0.06;
      } else if (flightP >= 1.0) {
        if (planeRightEdge < 0) {
          // Has crossed past the left screen edge
          opacity = Math.max(0, 1 + planeRightEdge / 120);
        } else {
          // Solid 100% visible while towing on screen!
          opacity = 1;
        }
      } else {
        opacity = 1;
      }

      setState({
        active: true,
        progress: flightP,
        x: curX,
        y: curY,
        width: jetWidth,
        scale: curScale,
        rotateZ: curRotateZ,
        rotateX: curRotateX,
        rotateY: curRotateY,
        opacity,
        showAirStreaks,
        ropeVisible,
        ropeProgress,
        ropePath,
        jetHookX,
        jetHookY,
        roadHookX,
        roadHookY,
      });
    };

    // Continuous requestAnimationFrame loop: synchronizes frame-by-frame with VisionTimeline's camera lerp
    const loop = () => {
      updateFlight();
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  if (!state.active) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none"
      style={{ perspective: 1200 }}
    >
      {/* ── Dynamic Animated Tow Rope pulling the Road into view ── */}
      {state.ropeVisible && state.ropeProgress > 0.05 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-20"
          style={{ opacity: state.opacity }}
        >
          <defs>
            <filter id="towRopeGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Luminous Glow Behind Cable */}
          <path
            d={state.ropePath}
            fill="none"
            stroke="rgba(186, 230, 253, 0.45)"
            strokeWidth="7"
            strokeLinecap="round"
            filter="url(#towRopeGlow)"
          />

          {/* Core High-Tension Braided Steel Aircraft Tow Cable */}
          <path
            d={state.ropePath}
            fill="none"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Woven Steel Strands Texture */}
          <path
            d={state.ropePath}
            fill="none"
            stroke="#64748b"
            strokeWidth="1.5"
            strokeDasharray="5 3"
            strokeLinecap="round"
          />

          {/* Aircraft Tow Hitch Anchor on Fuselage */}
          <circle
            cx={state.jetHookX}
            cy={state.jetHookY}
            r="6"
            fill="#090d14"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <circle cx={state.jetHookX} cy={state.jetHookY} r="2.5" fill="#38bdf8" />

          {/* Titanium Shackle / Carabiner at Road Tip (Shows when rope connects to road) */}
          {state.ropeProgress >= 0.90 && (
            <g>
              <circle
                cx={state.roadHookX}
                cy={state.roadHookY}
                r="7.5"
                fill="#090d14"
                stroke="#ffffff"
                strokeWidth="2.4"
              />
              <circle
                cx={state.roadHookX}
                cy={state.roadHookY}
                r="3.5"
                fill="#38bdf8"
              />
            </g>
          )}
        </svg>
      )}

      {/* ── High-Detail M1 Aircraft in Flight / Parked ── */}
      <div
        className="absolute top-0 left-0 will-change-transform z-15"
        style={{
          transform: `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%) scale(${state.scale}) rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg) rotateZ(${state.rotateZ}deg)`,
          opacity: state.opacity,
          transition: "opacity 0.15s ease-out",
          width: state.width || 920,
          maxWidth: "92vw",
        }}
      >
        <div className="relative w-full h-auto">
          {/* ── Flight Air Lines Effect (Slipstream streaks active on flight and landing approach) ── */}
          {state.showAirStreaks && (
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
                      boxShadow: "0 0 4px rgba(255,255,255,0.45)",
                      filter: "blur(0.3px)",
                      "--dur": s.duration,
                      "--delay": s.delay,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          )}

          {/* High-detail M1 Jet in 3D Flight */}
          <Image
            src="/images/ecosystem-jet-transparent.png"
            alt=""
            width={1376}
            height={768}
            priority
            draggable={false}
            className="w-full h-auto object-contain pointer-events-none select-none drop-shadow-[0_28px_56px_rgba(0,0,0,0.85)] brightness-105"
          />
        </div>
      </div>
    </div>
  );
}
