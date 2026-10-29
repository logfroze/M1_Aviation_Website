"use client";

import React, { useState, useEffect, useRef } from "react";
import Jet3DViewer from "./Jet3DViewer";
import { LIGHT_PLATINUM_TITANIUM_COLORS } from "./jetModelManager";

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
  takeoffX?: number;
  takeoffY?: number;
}

export default function ScrollFlightJet() {
  const [state, setState] = useState<FlightState>({
    active: false,
    progress: 0,
    x: 0,
    y: 0,
    width: 1100,
    scale: 1.0,
    yaw: 28,
    pitch: 2,
    roll: 0,
    opacity: 0,
    takeoffX: undefined,
    takeoffY: undefined,
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

      // Platform center in document coordinates
      const docPlatformCenter = scrollY + sourceRect.top + sourceRect.height * 0.5;
      const docVisionTop = scrollY + visionRect.top;

      // Liftoff begins as user scrolls down past the Ecosystem platform
      const takeoffScroll = docPlatformCenter - vh * 0.15;
      const landingScroll = docVisionTop;
      // Generous flight distance ensuring the 3D maneuver has ample cinematic scroll runway
      const flightDistance = Math.max(900, landingScroll - takeoffScroll);

      const rawProgress = (scrollY - takeoffScroll) / flightDistance;
      targetProgressRef.current = Math.min(1.05, Math.max(-0.05, rawProgress));
    };

    const updateLoop = () => {
      const sourceEl = document.getElementById("ecosystem-jet-source");

      const vh = window.innerHeight;
      const vw = window.innerWidth;

      // ── FLUID 60FPS/120FPS PHYSICS LERP (Responsive & Buttery Smooth) ──
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.10;
      const flightP = currentProgressRef.current;

      // Continuously sample platform anchor while at or near the platform
      if (sourceEl && flightP <= 0.08) {
        const sr = sourceEl.getBoundingClientRect();
        if (sr.width > 20 && sr.top < vh + 300 && sr.bottom > -300) {
          takeoffPosRef.current = {
            x: sr.left + sr.width * 0.5,
            y: sr.top + sr.height * 0.5,
          };
        }
      }

      // Continuously record live turntable angle of platform aircraft while parked or taking off
      if (typeof window !== "undefined" && flightP <= 0.04) {
        const livePlatformYaw = (window as unknown as { __M1_PLATFORM_JET_YAW?: number }).__M1_PLATFORM_JET_YAW;
        if (typeof livePlatformYaw === "number") {
          initialPlatformYawRef.current = livePlatformYaw;
        }
      }

      // ── 1. STRICT SINGLE-PLANE VISIBILITY HANDOFF WITH IMPERCEPTIBLE CROSSFADE ──
      // While parked on pedestal (flightP <= 0.002)
      if (flightP <= 0.002) {
        if (typeof window !== "undefined") {
          (window as unknown as { __M1_SCROLL_JET_ACTIVE?: boolean }).__M1_SCROLL_JET_ACTIVE = false;
          (window as unknown as { __M1_SCROLL_JET_LANDING_P?: number }).__M1_SCROLL_JET_LANDING_P = 0;
          delete (window as unknown as { __M1_SCROLL_JET_LANDING_YAW?: number }).__M1_SCROLL_JET_LANDING_YAW;
        }
        if (sourceEl) {
          sourceEl.style.opacity = "1";
          sourceEl.style.pointerEvents = "auto";
        }

        setState((prev) => (prev.active ? { ...prev, active: false, opacity: 0, progress: 0 } : prev));
        animId = requestAnimationFrame(updateLoop);
        return;
      }

      // Active flight registered in window for synchronized components
      if (typeof window !== "undefined") {
        (window as unknown as { __M1_SCROLL_JET_ACTIVE?: boolean }).__M1_SCROLL_JET_ACTIVE = true;
      }

      // Seamless crossfade between pedestal jet and flying jet (p in 0.00 -> 0.06)
      if (sourceEl) {
        if (flightP < 0.06) {
          const fadeOut = Math.max(0, 1 - flightP / 0.06);
          sourceEl.style.opacity = String(fadeOut);
          sourceEl.style.pointerEvents = "none";
        } else {
          sourceEl.style.opacity = "0";
          sourceEl.style.pointerEvents = "none";
        }
      }

      // Once landed into Vision runway (flightP >= 0.98)
      if (flightP >= 0.98) {
        if (typeof window !== "undefined") {
          (window as unknown as { __M1_SCROLL_JET_ACTIVE?: boolean }).__M1_SCROLL_JET_ACTIVE = false;
          (window as unknown as { __M1_SCROLL_JET_LANDING_P?: number }).__M1_SCROLL_JET_LANDING_P = 1.0;
        }
        setState((prev) => (prev.active ? { ...prev, active: false, opacity: 0, progress: 0 } : prev));
        animId = requestAnimationFrame(updateLoop);
        return;
      }

      const pClamped = Math.max(0, Math.min(1, flightP));

      if (typeof window !== "undefined") {
        (window as unknown as { __M1_SCROLL_JET_LANDING_P?: number }).__M1_SCROLL_JET_LANDING_P = pClamped;
      }

      // ── 2. TAKEOFF & DESTINATION COORDINATES ──
      const startX = takeoffPosRef.current ? takeoffPosRef.current.x : vw * 0.5;
      const startY = takeoffPosRef.current ? takeoffPosRef.current.y : vh * 0.50;

      // Destination on the blue road runway (exact pixel alignment with Vision runway jet)
      const runwayJetAnchor =
        document.getElementById("vision-end-jet-anchor") ||
        document.getElementById("vision-end-jet");

      let landingX = vw * 0.5;
      let landingY = vh - 195;

      if (runwayJetAnchor) {
        const r = runwayJetAnchor.getBoundingClientRect();
        if (r.width > 20 && r.height > 20 && r.top < vh + 100) {
          landingX = r.left + r.width * 0.5;
          landingY = r.top + r.height * 0.5;
        }
      }

      const jetWidth = 1100;
      const targetJetW = Math.max(540, Math.min(820, vw * 0.46));
      const landingScale = targetJetW / jetWidth;

      // Waypoints for the multi-stage 3D flight maneuver
      const p1X = vw * 0.26;
      const p1Y = vh * 0.35;

      const p2X = vw * 0.74;
      const p2Y = vh * 0.46;

      const p3Y = vh * 0.74;

      let curX = startX;
      let curY = startY;
      let curYaw = 28;
      let curPitch = 2;
      let curRoll = 0;
      let curScale = 1.0;

      // 1. Instantaneous heading of aircraft at the moment user initiated liftoff
      const rawPlatformYaw = initialPlatformYawRef.current ?? 28;
      const startYawNorm = ((rawPlatformYaw % 360) + 360) % 360;
      // Target heading for climb towards left foreground (48 deg)
      let diff = (48 - startYawNorm) % 360;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;

      // ── 3. DYNAMIC 3-PHASE FLIGHT TRAJECTORY (PURE BUTTERY FLOW) ──
      if (pClamped <= 0.30) {
        // Phase 1 (0.00 -> 0.30): Liftoff & Smooth Climb towards left foreground
        const t1 = pClamped / 0.30;
        const ease1 = t1 * t1 * (3 - 2 * t1);
        curX = startX + (p1X - startX) * ease1;
        curY = startY + (p1Y - startY) * ease1;

        // Smooth shortest-path rotation across entire liftoff phase:
        // Starts AT startYawNorm when p=0, smoothly blending into 48 degrees!
        curYaw = startYawNorm + diff * ease1;

        curPitch = 2 + (14 - 2) * ease1;
        curRoll = 0 + (-16 - 0) * ease1;
        curScale = 1.0 + (1.22 - 1.0) * ease1;
      } else if (pClamped <= 0.68) {
        // Phase 2 (0.30 -> 0.68): Big Smooth Round Swoop & Bank Across Screen (Left to Right)
        const t2 = (pClamped - 0.30) / 0.38;
        const ease2 = t2 * t2 * (3 - 2 * t2);

        curX = p1X + (p2X - p1X) * ease2;
        const arcDip = Math.sin(t2 * Math.PI) * (vh * 0.08);
        curY = p1Y + (p2Y - p1Y) * ease2 + arcDip;

        curScale = 1.22 + 0.10 * Math.sin(t2 * Math.PI) + (1.18 - 1.22) * ease2;
        curYaw = 48 + (-60 - 48) * ease2;
        curRoll = -16 + (32 - (-16)) * ease2; // Dynamic bank twist from -16 deg to +32 deg
        curPitch = 14 + (2 - 14) * ease2;
      } else if (pClamped <= 0.88) {
        // Phase 3 (0.68 -> 0.88): Align Inwards with Runway Centerline
        const t3 = (pClamped - 0.68) / 0.20;
        const ease3 = t3 * t3 * (3 - 2 * t3);

        curX = p2X + (landingX - p2X) * ease3;
        curY = p2Y + (p3Y - p2Y) * ease3;

        curRoll = 32 * (1 - ease3); // Levels wings back to 0
        curYaw = -60 + (-90 - (-60)) * ease3; // Aligns straight down runway heading (-90)
        curPitch = 2 + (0 - 2) * ease3;
        curScale = 1.18 + (landingScale - 1.18) * ease3;
      } else {
        // Phase 4 (0.88 -> 1.00): Touchdown onto Blue Road Runway
        const t4 = (pClamped - 0.88) / 0.12;
        const ease4 = t4 * t4 * (3 - 2 * t4);

        curX = landingX;
        curY = p3Y + (landingY - p3Y) * ease4;

        curRoll = 0;
        curYaw = -90;
        curPitch = 0;
        curScale = landingScale;
      }

      // Synchronize landing angle back to platform turntable for reverse scroll
      if (typeof window !== "undefined" && pClamped <= 0.08) {
        (window as unknown as { __M1_SCROLL_JET_LANDING_YAW?: number }).__M1_SCROLL_JET_LANDING_YAW = curYaw;
      }

      // Opacity: smooth crossfade in at liftoff and solid throughout flight until touchdown
      let opacity = 1;
      if (pClamped < 0.04) {
        opacity = Math.min(1, pClamped / 0.02);
      } else if (pClamped >= 0.98) {
        opacity = 0;
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
        takeoffX: startX,
        takeoffY: startY,
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
              left: state.takeoffX ?? "50%",
              top: (state.takeoffY ?? 450) + 60,
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
              left: state.takeoffX ?? "50%",
              top: (state.takeoffY ?? 450) + 60,
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

      {/* ── 3D Aircraft in Fluid 60fps Flight: Constant Radiant Light Platinum Titanium Silver ── */}
      <div
        className="absolute top-0 left-0 will-change-transform z-15"
        style={{
          transform: `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%) scale(${state.scale})`,
          width: state.width || 1100,
          height: (state.width || 1100) * 0.58,
          maxWidth: "96vw",
          opacity: state.opacity,
        }}
      >
        <div className="relative w-full h-full">
          {/* Real-time 3D Bombardier Windjet 365: Consistently Light Platinum Titanium */}
          <Jet3DViewer
            yaw={state.yaw}
            pitch={state.pitch}
            roll={state.roll}
            modelScale={1.55}
            lightIntensity={1.4}
            immediate={true}
            customColors={LIGHT_PLATINUM_TITANIUM_COLORS}
            lightingTheme="default"
          />
        </div>
      </div>
    </div>
  );
}
