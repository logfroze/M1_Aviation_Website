"use client";

import React, { useState, useEffect, useRef } from "react";
import Jet3DViewer from "./Jet3DViewer";

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
  yaw: number;
  pitch: number;
  roll: number;
  thrust: number;
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
    yaw: 28,
    pitch: 6,
    roll: 22,
    thrust: 0.35,
    opacity: 0,
    showAirStreaks: false,
  });

  // Tracking timestamps and references for the 2-3s delay and scroll-locking
  const viewEnteredAtRef = useRef<number | null>(null);
  const takeoffScrollRef = useRef<number | null>(null);
  const takeoffPosRef = useRef<{ x: number; y: number } | null>(null);
  const isScrollingRef = useRef(false);
  const scrollIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevProgressRef = useRef(0);

  useEffect(() => {
    const updateFlight = () => {
      const sourceEl = document.getElementById("ecosystem-jet-source");
      const visionContainer = document.getElementById("vision");

      if (!sourceEl || !visionContainer) return;

      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const scrollY = window.scrollY || window.pageYOffset;

      const sourceRect = sourceEl.getBoundingClientRect();
      const visionRect = visionContainer.getBoundingClientRect();

      // Detection: Ecosystem centerpiece view is in the viewport
      // (The exact view in the user's reference image where the pedestal aircraft is visible)
      const isInEcosystemView = sourceRect.top < vh * 0.70 && sourceRect.bottom > vh * 0.20;

      // ── 1. DELAY TAKEOFF BY 2-3 SECONDS ──
      // When user first reaches/crosses this view, start a 2.5s timer.
      if (isInEcosystemView) {
        if (viewEnteredAtRef.current === null) {
          viewEnteredAtRef.current = Date.now();
        }
      } else if (sourceRect.top >= vh * 0.70) {
        // Scrolled back up above Ecosystem view, reset timer and takeoff anchor
        viewEnteredAtRef.current = null;
        takeoffScrollRef.current = null;
        takeoffPosRef.current = null;
      }

      const FLIGHT_DELAY_MS = 2500; // 2.5 seconds (within user's requested 2-3s)
      const elapsed = viewEnteredAtRef.current !== null ? Date.now() - viewEnteredAtRef.current : 0;
      const delayCompleted = viewEnteredAtRef.current !== null && elapsed >= FLIGHT_DELAY_MS;

      // If delay hasn't completed or user hasn't reached view, lock to pedestal
      if (!delayCompleted) {
        if (sourceEl) {
          sourceEl.style.opacity = "1";
          sourceEl.style.pointerEvents = "auto";
        }
        setState((prev) =>
          prev.active || prev.opacity > 0
            ? {
                ...prev,
                active: false,
                opacity: 0,
                progress: 0,
                showAirStreaks: false,
              }
            : prev
        );
        return;
      }

      // ── 2. ESTABLISH STABLE TAKEOFF BASELINE ──
      // Once delay has elapsed, record the exact scroll baseline where flight begins
      if (takeoffScrollRef.current === null) {
        takeoffScrollRef.current = scrollY;
        takeoffPosRef.current = {
          x: vw * 0.5,
          y: Math.max(vh * 0.25, Math.min(vh * 0.65, sourceRect.top + sourceRect.height * 0.5)),
        };
      }

      const takeoffScroll = takeoffScrollRef.current;
      // Landing completes exactly when Vision section arrives at the top of the viewport
      const docVisionTop = scrollY + visionRect.top;
      const landingScroll = docVisionTop - vh * 0.05;
      const flightDistance = Math.max(500, landingScroll - takeoffScroll);

      // Scrolled distance beyond takeoff trigger
      const scrolled = scrollY - takeoffScroll;
      const rawProgress = scrolled / flightDistance;
      const flightP = Math.min(1.0, Math.max(0, rawProgress));

      // ── 3. STRICT SINGLE-PLANE VISIBILITY & PROGRESS GATING ──
      const isTakingOff = flightP > 0.002;

      // When scroll is 0 or less, plane stays 100% parked on pedestal
      if (!isTakingOff) {
        if (sourceEl) {
          sourceEl.style.opacity = "1";
          sourceEl.style.pointerEvents = "auto";
        }
        setState((prev) =>
          prev.active || prev.opacity > 0
            ? {
                ...prev,
                active: false,
                opacity: 0,
                progress: 0,
                showAirStreaks: false,
              }
            : prev
        );
        return;
      }

      // Pedestal fade out upon liftoff
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

      // Measure exact destination on the runway from DOM anchor if available
      const runwayJetAnchor =
        document.getElementById("vision-end-jet-anchor") ||
        document.getElementById("vision-end-jet");

      let landingX = vw * 0.5;
      let landingY = vh * 0.86;

      if (runwayJetAnchor) {
        const r = runwayJetAnchor.getBoundingClientRect();
        if (r.width > 20 && r.height > 20) {
          landingX = r.left + r.width * 0.5;
          landingY = r.top + r.height * 0.5;
        }
      }

      // Jet initial and target width
      const jetWidth = sourceRect.width > 50 ? sourceRect.width : 1100;
      const targetJetW = Math.max(440, Math.min(680, vw * 0.38));
      const landingScale = targetJetW / jetWidth;

      const startX = takeoffPosRef.current ? takeoffPosRef.current.x : vw * 0.5;
      const startY = takeoffPosRef.current ? takeoffPosRef.current.y : vh * 0.52;

      // Waypoints for the multi-stage 3D flight maneuver:
      const p1X = vw * 0.26;
      const p1Y = vh * 0.35;

      const p2X = vw * 0.76;
      const p2Y = vh * 0.46;

      const p3Y = vh * 0.74;

      let curX = startX;
      let curY = startY;
      let curYaw = 28;
      let curPitch = 6;
      let curRoll = 22;
      let curScale = 1.0;
      let curThrust = 0.35;

      // ── 4. C1-CONTINUOUS FLIGHT TRAJECTORY (ZERO JITTER / ZERO YANK) ──
      if (flightP <= 0.25) {
        // Phase 1 (0.00 -> 0.25): Liftoff from platform & Climb towards left foreground
        const t1 = flightP / 0.25;
        const ease1 = t1 * t1 * (3 - 2 * t1);
        curX = startX + (p1X - startX) * ease1;
        curY = startY + (p1Y - startY) * ease1;

        curYaw = 28 + (48 - 28) * ease1;
        curPitch = 6 + (14 - 6) * ease1;
        curRoll = 22 + (-16 - 22) * ease1;
        curScale = 1.0 + (1.20 - 1.0) * ease1;
        curThrust = 0.4 + 0.55 * ease1;
      } else if (flightP <= 0.65) {
        // Phase 2 (0.25 -> 0.65): Big Smooth Round Turn Near Screen (Left to Right)
        const t2 = (flightP - 0.25) / 0.40;
        const ease2 = t2 * t2 * (3 - 2 * t2);

        curX = p1X + (p2X - p1X) * ease2;
        const arcDip = Math.sin(t2 * Math.PI) * (vh * 0.08);
        curY = p1Y + (p2Y - p1Y) * ease2 + arcDip;

        curScale = 1.20 + (1.30 - 1.20) * Math.sin(t2 * Math.PI) + (1.18 - 1.20) * ease2;
        curYaw = 48 + (-60 - 48) * ease2;
        curRoll = -16 + (32 - (-16)) * ease2;
        curPitch = 14 + (2 - 14) * ease2;
        curThrust = 0.95;
      } else if (flightP <= 0.86) {
        // Phase 3 (0.65 -> 0.86): Align Inwards with Runway Centerline
        const t3 = (flightP - 0.65) / 0.21;
        const ease3 = t3 * t3 * (3 - 2 * t3);

        curX = p2X + (landingX - p2X) * ease3;
        curY = p2Y + (p3Y - p2Y) * ease3;

        curRoll = 32 * (1 - ease3);
        curYaw = -60 + (-90 - (-60)) * ease3;
        curPitch = 2 + (-2 - 2) * ease3;
        curScale = 1.18 + (landingScale - 1.18) * ease3;
        curThrust = 0.65;
      } else {
        // Phase 4 (0.86 -> 1.00): Touchdown onto Blue Road Runway (Facing INWARDS)
        const t4 = (flightP - 0.86) / 0.14;
        const ease4 = t4 * t4 * (3 - 2 * t4);

        curX = landingX;
        curY = p3Y + (landingY - p3Y) * ease4;

        curRoll = 0;
        curYaw = -90;
        curPitch = -2 + 4 * Math.sin(t4 * Math.PI);
        curScale = landingScale;
        curThrust = 0.65 * (1 - ease4) + 0.20 * ease4;
      }

      // Air streaks active ONLY during active scrolling & cruising
      const showAirStreaks = isScrollingRef.current && flightP > 0.05 && flightP < 0.75;
      // Thrust settles to gentle idle glow when user stops scrolling
      const effectiveThrust = isScrollingRef.current ? curThrust : 0.22;

      // Flight jet opacity: fade in upon takeoff, blend into runway at touchdown
      let opacity = 0;
      if (flightP < 0.04) {
        opacity = flightP / 0.04;
      } else if (flightP >= 0.90) {
        const blend = (flightP - 0.90) / 0.10;
        opacity = Math.max(0, 1 - blend);
      } else {
        opacity = 1;
      }

      const isActive = isTakingOff && flightP < 1.0 && visionRect.top > -20;

      prevProgressRef.current = flightP;

      setState({
        active: isActive,
        progress: flightP,
        x: curX,
        y: curY,
        width: jetWidth,
        scale: curScale,
        yaw: curYaw,
        pitch: curPitch,
        roll: curRoll,
        thrust: effectiveThrust,
        opacity,
        showAirStreaks,
      });
    };

    const onScroll = () => {
      isScrollingRef.current = true;
      if (scrollIdleTimerRef.current) {
        clearTimeout(scrollIdleTimerRef.current);
      }
      scrollIdleTimerRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        // Trigger flight update to cleanly hide air streaks and lower thrust to idle
        updateFlight();
      }, 100);

      updateFlight();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Initial check
    updateFlight();

    // Check timer expiration in case user paused at Ecosystem view
    const timerInterval = setInterval(() => {
      if (viewEnteredAtRef.current !== null && takeoffScrollRef.current === null) {
        updateFlight();
      }
    }, 200);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearInterval(timerInterval);
      if (scrollIdleTimerRef.current) {
        clearTimeout(scrollIdleTimerRef.current);
      }
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
      {/* ── LIFTOFF THRUST AIR EFFECT ON PLATFORM (SHOCKWAVE RINGS & DOWNWASH) ── */}
      {state.progress > 0.002 && state.progress < 0.24 && (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Expanding Aerodynamic Thrust Air Ring Shockwave 1 */}
          <div
            style={{
              position: "absolute",
              left: takeoffPosRef.current ? takeoffPosRef.current.x : "50%",
              top: (takeoffPosRef.current ? takeoffPosRef.current.y : 450) + 70,
              transform: `translate(-50%, -50%) scale(${1 + (state.progress / 0.24) * 3.8})`,
              width: "320px",
              height: "100px",
              borderRadius: "50%",
              border: `2px solid rgba(56, 189, 248, ${Math.max(0, 1 - state.progress / 0.22) * 0.75})`,
              boxShadow: `0 0 25px rgba(56, 189, 248, ${Math.max(0, 1 - state.progress / 0.22) * 0.5}), inset 0 0 15px rgba(255, 255, 255, ${Math.max(0, 1 - state.progress / 0.22) * 0.4})`,
              opacity: Math.max(0, 1 - state.progress / 0.22),
              filter: "blur(1.5px)",
            }}
          />

          {/* Expanding Aerodynamic Thrust Air Ring Shockwave 2 */}
          <div
            style={{
              position: "absolute",
              left: takeoffPosRef.current ? takeoffPosRef.current.x : "50%",
              top: (takeoffPosRef.current ? takeoffPosRef.current.y : 450) + 70,
              transform: `translate(-50%, -50%) scale(${0.6 + (state.progress / 0.24) * 2.6})`,
              width: "240px",
              height: "75px",
              borderRadius: "50%",
              border: `1.5px solid rgba(186, 230, 253, ${Math.max(0, 1 - state.progress / 0.20) * 0.85})`,
              boxShadow: `0 0 35px rgba(56, 189, 248, ${Math.max(0, 1 - state.progress / 0.20) * 0.6})`,
              opacity: Math.max(0, 1 - state.progress / 0.20),
              filter: "blur(0.8px)",
            }}
          />

          {/* Dissipating Platform Contact Shadow */}
          <div
            style={{
              position: "absolute",
              left: takeoffPosRef.current ? takeoffPosRef.current.x : "50%",
              top: (takeoffPosRef.current ? takeoffPosRef.current.y : 450) + 70,
              transform: `translate(-50%, -50%) scale(${1 + (state.progress / 0.24) * 1.5})`,
              width: "360px",
              height: "70px",
              borderRadius: "50%",
              background: "rgba(0, 0, 0, 0.75)",
              filter: `blur(${12 + (state.progress / 0.24) * 30}px)`,
              opacity: Math.max(0, 1 - state.progress / 0.18),
            }}
          />

          {/* Dual Turbine Downwash Air Streaks */}
          <div
            style={{
              position: "absolute",
              left: (takeoffPosRef.current ? takeoffPosRef.current.x : 500) - 45,
              top: (takeoffPosRef.current ? takeoffPosRef.current.y : 450) + 30,
              width: "18px",
              height: `${60 + (state.progress / 0.24) * 90}px`,
              background: "linear-gradient(to bottom, rgba(56,189,248,0.7) 0%, rgba(255,255,255,0.4) 40%, transparent 100%)",
              filter: "blur(3px)",
              transform: "rotate(-12deg)",
              opacity: Math.max(0, 1 - state.progress / 0.22),
            }}
          />
          <div
            style={{
              position: "absolute",
              left: (takeoffPosRef.current ? takeoffPosRef.current.x : 500) + 35,
              top: (takeoffPosRef.current ? takeoffPosRef.current.y : 450) + 30,
              width: "18px",
              height: `${60 + (state.progress / 0.24) * 90}px`,
              background: "linear-gradient(to bottom, rgba(56,189,248,0.7) 0%, rgba(255,255,255,0.4) 40%, transparent 100%)",
              filter: "blur(3px)",
              transform: "rotate(12deg)",
              opacity: Math.max(0, 1 - state.progress / 0.22),
            }}
          />
        </div>
      )}

      {/* ── 3D Bombardier Windjet 365 Aircraft in Flight / Swooping into Runway ── */}
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
          {/* ── Flight Air Lines Effect (Slipstream streaks active during cruising) ── */}
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

          {/* Real-time 3D Bombardier Windjet 365 WebGL Jet */}
          <Jet3DViewer
            yaw={state.yaw}
            pitch={state.pitch}
            roll={state.roll}
            engineThrust={state.thrust}
            modelScale={1.55}
            lightIntensity={1.2}
            immediate={true}
          />
        </div>
      </div>
    </div>
  );
}
