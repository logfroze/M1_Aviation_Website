"use client";

import React, { useState, useEffect, useRef } from "react";
import Jet3DViewer from "./Jet3DViewer";

// Dynamic continuous supersonic slipstream air streaks during flight (like ContactFlightJet)
const AIR_STREAKS = [
  { top: "58%", left: "8%",  width: "28%", delay: "0s",    duration: "0.46s", opacity: 0.65, h: "1.5px" },
  { top: "44%", left: "16%", width: "32%", delay: "0.10s", duration: "0.50s", opacity: 0.70, h: "1.5px" },
  { top: "34%", left: "14%", width: "26%", delay: "0.05s", duration: "0.44s", opacity: 0.60, h: "1.5px" },
  { top: "48%", left: "28%", width: "36%", delay: "0.12s", duration: "0.48s", opacity: 0.65, h: "1.5px" },
  { top: "38%", left: "42%", width: "30%", delay: "0.03s", duration: "0.46s", opacity: 0.60, h: "1.5px" },
  { top: "66%", left: "38%", width: "34%", delay: "0.15s", duration: "0.52s", opacity: 0.55, h: "1.5px" },
  { top: "24%", left: "50%", width: "26%", delay: "0.08s", duration: "0.45s", opacity: 0.60, h: "1.5px" },
  { top: "52%", left: "56%", width: "28%", delay: "0.13s", duration: "0.47s", opacity: 0.58, h: "1.5px" },
  { top: "30%", left: "30%", width: "35%", delay: "0.17s", duration: "0.43s", opacity: 0.55, h: "1.5px" },
];

interface FlightState {
  active: boolean;
  progress: number;
  x: number;
  y: number;
  width: number;
  scale: number;
  yaw: number;
  pitch: number;
  roll: number;
  opacity: number;
  showAirStreaks: boolean;
}

export default function ScrollFlightJet() {
  const [state, setState] = useState<FlightState>({
    active: false,
    progress: 0,
    x: 0,
    y: 0,
    width: 1100,
    scale: 1.0,
    yaw: 24,
    pitch: 2,
    roll: 0,
    opacity: 0,
    showAirStreaks: false,
  });

  // Smooth lerp physics refs for fluid, non-snapping 60fps/120fps motion
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const takeoffPosRef = useRef<{ x: number; y: number } | null>(null);
  const initialPlatformYawRef = useRef<number | null>(null);

  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      const sourceEl = document.getElementById("ecosystem-jet-source");
      const visionContainer = document.getElementById("vision");
      if (!sourceEl || !visionContainer) return;

      const vh = window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;

      const sourceRect = sourceEl.getBoundingClientRect();
      const visionRect = visionContainer.getBoundingClientRect();

      // Document scroll coordinates of platform center and vision entrance
      const docPlatformCenter = scrollY + sourceRect.top + sourceRect.height * 0.5;
      const docVisionTop = scrollY + visionRect.top;

      // Liftoff begins smoothly as user scrolls past Ecosystem platform
      const takeoffScroll = docPlatformCenter - vh * 0.45;
      // Landing completes when vision section arrives at top
      const landingScroll = docVisionTop - vh * 0.05;
      const flightDistance = Math.max(650, landingScroll - takeoffScroll);

      const rawProgress = (scrollY - takeoffScroll) / flightDistance;
      targetProgressRef.current = Math.min(1.05, Math.max(-0.05, rawProgress));
    };

    const updateLoop = () => {
      const sourceEl = document.getElementById("ecosystem-jet-source");
      const visionContainer = document.getElementById("vision");

      const vh = window.innerHeight;
      const vw = window.innerWidth;

      // ── FLUID 60FPS/120FPS PHYSICS LERP (Exact same mechanism as ContactFlightJet) ──
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.085;
      const flightP = currentProgressRef.current;

      // Continuously sample platform anchor while at or near the platform
      if (sourceEl && flightP <= 0.05) {
        const sr = sourceEl.getBoundingClientRect();
        if (sr.width > 20 && sr.top < vh + 300 && sr.bottom > -300) {
          takeoffPosRef.current = {
            x: sr.left + sr.width * 0.5,
            y: sr.top + sr.height * 0.5,
          };
        }
      }

      // ── 1. STRICT SINGLE-PLANE VISIBILITY HANDOFF ──
      // While parked on pedestal (flightP <= 0.005)
      if (flightP <= 0.005) {
        if (sourceEl) {
          sourceEl.style.opacity = "1";
          sourceEl.style.pointerEvents = "auto";
        }
        // Continuously record live turntable angle of platform aircraft
        const livePlatformYaw = typeof window !== "undefined" ? (window as any).__M1_PLATFORM_JET_YAW : undefined;
        initialPlatformYawRef.current = typeof livePlatformYaw === "number" ? livePlatformYaw : 24;

        setState((prev) => (prev.active ? { ...prev, active: false, opacity: 0, progress: 0 } : prev));
        animId = requestAnimationFrame(updateLoop);
        return;
      }

      // Hide pedestal jet once liftoff begins so only 1 jet exists
      if (sourceEl) {
        if (flightP < 0.04) {
          const fade = flightP / 0.04;
          sourceEl.style.opacity = Math.max(0, 1 - fade).toString();
          sourceEl.style.pointerEvents = "none";
        } else {
          sourceEl.style.opacity = "0";
          sourceEl.style.pointerEvents = "none";
        }
      }

      // Once landed into Vision runway (flightP >= 0.99)
      if (flightP >= 0.99) {
        setState((prev) => (prev.active ? { ...prev, active: false, opacity: 0 } : prev));
        animId = requestAnimationFrame(updateLoop);
        return;
      }

      const pClamped = Math.max(0, Math.min(1, flightP));

      // ── 2. TAKEOFF & DESTINATION COORDINATES ──
      const startX = takeoffPosRef.current ? takeoffPosRef.current.x : vw * 0.5;
      const startY = takeoffPosRef.current ? takeoffPosRef.current.y : vh * 0.50;

      // Destination on the blue road runway
      const runwayJetAnchor =
        document.getElementById("vision-end-jet-anchor") ||
        document.getElementById("vision-end-jet");

      let landingX = vw * 0.5;
      let landingY = vh * 0.82;

      if (runwayJetAnchor) {
        const r = runwayJetAnchor.getBoundingClientRect();
        if (r.width > 20 && r.height > 20) {
          landingX = r.left + r.width * 0.5;
          landingY = r.top + r.height * 0.5;
        }
      }

      const jetWidth = 1100;
      const targetJetW = Math.max(460, Math.min(700, vw * 0.40));
      const landingScale = targetJetW / jetWidth;

      // ── 3. SMOOTH AERODYNAMIC TRAJECTORY (FLUID LATERAL SWEEP & CLIMB) ──
      let curX = startX;
      let curY = startY;
      let curYaw = 24;
      let curPitch = 2;
      let curRoll = 0;
      let curScale = 1.0;

      // Shortest circular turn calculation from pedestal turntable heading to base takeoff heading (24 deg)
      const rawPlatformYaw = initialPlatformYawRef.current ?? 24;
      const startYawNorm = ((rawPlatformYaw % 360) + 360) % 360;
      const baseFlightYaw = 24;
      let diff = (baseFlightYaw - startYawNorm) % 360;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;

      if (pClamped <= 0.30) {
        // Phase 1 (0.00 -> 0.30): Liftoff from platform, climb and bank towards left foreground
        const t1 = pClamped / 0.30;
        const ease1 = t1 * t1 * (3 - 2 * t1);

        const targetP1X = vw * 0.26;
        const targetP1Y = vh * 0.35;

        curX = startX + (targetP1X - startX) * ease1;
        curY = startY + (targetP1Y - startY) * ease1;

        // Swivel along shortest circular path to face flight direction (first 0.08 segment)
        const turnT = Math.min(1, pClamped / 0.08);
        const turnEase = turnT * turnT * (3 - 2 * turnT);
        const headingAtLiftoff = startYawNorm + diff * turnEase;

        // Continue seamlessly into the left turn & climb (48 deg)
        const climbT = Math.max(0, (pClamped - 0.08) / 0.22);
        const climbEase = climbT * climbT * (3 - 2 * climbT);
        curYaw = headingAtLiftoff + (48 - 24) * climbEase;

        // Dynamic climb pitch and banking turn to the left (-16 deg)
        curPitch = 2 + (13 - 2) * ease1;
        curRoll = -16 * ease1;
        curScale = 1.0 + (1.20 - 1.0) * ease1;
      } else if (pClamped <= 0.70) {
        // Phase 2 (0.30 -> 0.70): Big graceful round turn near screen (left to right) with full dynamic twist & roll
        const t2 = (pClamped - 0.30) / 0.40;
        const ease2 = t2 * t2 * (3 - 2 * t2);

        const p1X = vw * 0.26;
        const p1Y = vh * 0.35;
        const p2X = vw * 0.74;
        const p2Y = vh * 0.46;

        curX = p1X + (p2X - p1X) * ease2;
        const arcDip = Math.sin(t2 * Math.PI) * (vh * 0.08);
        curY = p1Y + (p2Y - p1Y) * ease2 + arcDip;

        curScale = 1.20 + (1.28 - 1.20) * Math.sin(t2 * Math.PI);

        // Dynamic heading sweep across the screen: 48 deg -> -60 deg
        curYaw = 48 + (-60 - 48) * ease2;

        // Dynamic roll/bank reverses from -16 deg (left bank) to +30 deg (right bank) as it swoops across
        curRoll = -16 + (30 - (-16)) * ease2;

        // Pitch eases level during the swooping arc
        curPitch = 13 + (2 - 13) * ease2;
      } else {
        // Phase 3 (0.70 -> 1.00): Inward glide and touchdown alignment onto Vision Runway
        const t3 = (pClamped - 0.70) / 0.30;
        const ease3 = t3 * t3 * (3 - 2 * t3);

        const p2X = vw * 0.74;
        const p2Y = vh * 0.46;

        curX = p2X + (landingX - p2X) * ease3;
        curY = p2Y + (landingY - p2Y) * ease3;

        // Bank levels off smoothly from +30 deg back to level (0 deg)
        curRoll = 30 * (1 - ease3);
        // Heading turns smoothly inward to align straight down the runway (-90 deg)
        curYaw = -60 + (-90 - (-60)) * ease3;
        // Pitch settles level onto the road
        curPitch = 2 * (1 - ease3);
        curScale = 1.20 + (landingScale - 1.20) * ease3;
      }

      // ── 4. CONTINUOUS AIR LINES EFFECT (STREAMING AIR DURING FLIGHT) ──
      // Air streaks active continuously throughout mid-flight (just like ContactFlightJet)
      const showAirStreaks = pClamped > 0.04 && pClamped < 0.94;

      // Opacity crossfade: fade in smoothly on takeoff, blend smoothly onto runway
      let opacity = 1;
      if (pClamped < 0.04) {
        opacity = pClamped / 0.04;
      } else if (pClamped >= 0.92) {
        const blend = (pClamped - 0.92) / 0.08;
        opacity = Math.max(0, 1 - blend);
      } else {
        opacity = 1;
      }

      setState({
        active: true,
        progress: pClamped,
        x: curX,
        y: curY,
        width: jetWidth,
        scale: curScale,
        yaw: curYaw,
        pitch: curPitch,
        roll: curRoll,
        opacity,
        showAirStreaks,
      });

      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[45] overflow-hidden select-none"
      style={{
        opacity: state.active ? state.opacity : 0,
        visibility: state.active && state.opacity > 0.01 ? "visible" : "hidden",
      }}
    >
      {/* ── LIFTOFF DOWNWASH & CONTACT SHADOW (Only in initial 18% of takeoff) ── */}
      {state.progress > 0.002 && state.progress < 0.18 && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Expanding Aerodynamic Thrust Air Ring Shockwave */}
          <div
            style={{
              position: "absolute",
              left: takeoffPosRef.current ? takeoffPosRef.current.x : "50%",
              top: (takeoffPosRef.current ? takeoffPosRef.current.y : 450) + 60,
              transform: `translate(-50%, -50%) scale(${1 + (state.progress / 0.18) * 3.2})`,
              width: "300px",
              height: "90px",
              borderRadius: "50%",
              border: `1.5px solid rgba(186, 230, 253, ${Math.max(0, 1 - state.progress / 0.18) * 0.75})`,
              boxShadow: `0 0 20px rgba(56, 189, 248, ${Math.max(0, 1 - state.progress / 0.18) * 0.45})`,
              opacity: Math.max(0, 1 - state.progress / 0.18),
              filter: "blur(1px)",
            }}
          />

          {/* Dissipating Platform Contact Shadow */}
          <div
            style={{
              position: "absolute",
              left: takeoffPosRef.current ? takeoffPosRef.current.x : "50%",
              top: (takeoffPosRef.current ? takeoffPosRef.current.y : 450) + 60,
              transform: `translate(-50%, -50%) scale(${1 + (state.progress / 0.18) * 1.4})`,
              width: "340px",
              height: "65px",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.70)",
              filter: `blur(${10 + (state.progress / 0.18) * 24}px)`,
              opacity: Math.max(0, 1 - state.progress / 0.16),
            }}
          />
        </div>
      )}

      {/* ── 3D Aircraft in Fluid 60fps Flight: Sweeping elegantly across towards Runway ── */}
      <div
        className="absolute top-0 left-0 will-change-transform z-15"
        style={{
          transform: `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%) scale(${state.scale})`,
          width: state.width || 1100,
          height: (state.width || 1100) * 0.58,
          maxWidth: "96vw",
        }}
      >
        <div className="relative w-full h-full">
          {/* ── Continuous Flight Air Lines Effect (Slipstream streaks flowing during flight) ── */}
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
                      boxShadow: "0 0 5px rgba(255,255,255,0.5)",
                      filter: "blur(0.3px)",
                      "--dur": s.duration,
                      "--delay": s.delay,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          )}

          {/* Real-time 3D Bombardier Windjet 365 in Executive Light Platinum Titanium */}
          <Jet3DViewer
            yaw={state.yaw}
            pitch={state.pitch}
            roll={state.roll}
            modelScale={1.55}
            lightIntensity={1.3}
            immediate={true}
          />
        </div>
      </div>
    </div>
  );
}
