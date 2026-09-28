"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Dynamic supersonic slipstream air streaks for flight transition
const FLIGHT_AIR_STREAKS = [
  { top: "58%", left: "8%",  width: "28%", delay: "0s",    duration: "0.46s", opacity: 0.60, h: "1.5px" },
  { top: "44%", left: "16%", width: "32%", delay: "0.10s", duration: "0.50s", opacity: 0.65, h: "1.5px" },
  { top: "34%", left: "14%", width: "26%", delay: "0.05s", duration: "0.44s", opacity: 0.55, h: "1.5px" },
  { top: "48%", left: "28%", width: "36%", delay: "0.12s", duration: "0.48s", opacity: 0.60, h: "1.5px" },
  { top: "38%", left: "42%", width: "30%", delay: "0.03s", duration: "0.46s", opacity: 0.55, h: "1.5px" },
  { top: "66%", left: "38%", width: "34%", delay: "0.15s", duration: "0.52s", opacity: 0.50, h: "1.5px" },
  { top: "24%", left: "50%", width: "26%", delay: "0.08s", duration: "0.45s", opacity: 0.55, h: "1.5px" },
  { top: "52%", left: "56%", width: "28%", delay: "0.13s", duration: "0.47s", opacity: 0.52, h: "1.5px" },
  { top: "30%", left: "30%", width: "35%", delay: "0.17s", duration: "0.43s", opacity: 0.50, h: "1.5px" },
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
  afterburnerBoost: number;
}

export default function ContactFlightJet() {
  const [state, setState] = useState<FlightState>({
    active: false,
    progress: 0,
    x: 0,
    y: 0,
    width: 820,
    scale: 1,
    rotateZ: 15,
    rotateX: 0,
    rotateY: 0,
    opacity: 0,
    showAirStreaks: false,
    afterburnerBoost: 0,
  });

  // Smooth lerp loop refs for fluid, non-snapping 60fps/120fps motion
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const takeoffPosRef = useRef<{ x: number; y: number; width: number } | null>(null);

  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      const visionEl = document.getElementById("vision");
      const contactEl = document.getElementById("contact");
      if (!visionEl || !contactEl) return;

      const vh = window.innerHeight;
      const visionRect = visionEl.getBoundingClientRect();
      const contactRect = contactEl.getBoundingClientRect();

      // Takeoff trigger: Begins once user finishes the Vision timeline roadmap (visionRect.bottom <= vh)
      const gap = Math.max(0, contactRect.top - visionRect.bottom);
      const flightStartContactTop = vh + gap;
      // Landing trigger: Docks comfortably as the Contact form card enters view
      const flightEndContactTop = vh * 0.22;
      // Generous flight distance so flight feels expansive and deliberate
      const flightDistance = Math.max(750, flightStartContactTop - flightEndContactTop);

      const currentScrolled = flightStartContactTop - contactRect.top;
      const rawProgress = currentScrolled / flightDistance;

      targetProgressRef.current = Math.min(1.05, Math.max(-0.05, rawProgress));
    };

    const updateLoop = () => {
      const visionEl = document.getElementById("vision");
      const contactEl = document.getElementById("contact");
      const anchorEl = document.getElementById("vision-end-jet-anchor") || document.getElementById("vision-end-jet");
      const roadJetWrapper = document.getElementById("vision-end-jet-wrapper");
      const contactJetDest = document.getElementById("contact-jet-destination");

      const vh = window.innerHeight;
      const vw = window.innerWidth;

      // Sample exact center of parked jet in screen coordinates
      if (anchorEl) {
        const r = anchorEl.getBoundingClientRect();
        if (r.width > 20 && r.bottom > -200 && r.top < vh + 200) {
          takeoffPosRef.current = {
            x: r.left + r.width * 0.5,
            y: r.top + r.height * 0.5,
            width: 820,
          };
        }
      }

      // Smooth physics lerp
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.09;
      const flightP = currentProgressRef.current;

      // ── STRICT SINGLE-PLANE VISIBILITY HANDOFF ──
      // 1. P <= 0.01: Parked on the Vision road end (opacity: 1), Contact plane hidden
      if (flightP <= 0.01) {
        if (roadJetWrapper) roadJetWrapper.style.opacity = "1";
        if (contactJetDest) contactJetDest.style.opacity = "0";
        setState((prev) => (prev.active ? { ...prev, active: false, opacity: 0 } : prev));
        animId = requestAnimationFrame(updateLoop);
        return;
      }

      // 2. P >= 0.99: Landed in Contact form (opacity: 1), Road plane hidden
      if (flightP >= 0.99) {
        if (roadJetWrapper) roadJetWrapper.style.opacity = "0";
        if (contactJetDest) contactJetDest.style.opacity = "1";
        setState((prev) => (prev.active ? { ...prev, active: false, opacity: 0 } : prev));
        animId = requestAnimationFrame(updateLoop);
        return;
      }

      // 3. 0.01 < P < 0.99: Mid-flight overlay ACTIVE (Only 1 plane exists in entire document)
      if (roadJetWrapper) roadJetWrapper.style.opacity = "0";
      if (contactJetDest) contactJetDest.style.opacity = "0";

      const pClamped = Math.max(0, Math.min(1, flightP));

      // 1. Takeoff Position (from empty space anchor)
      const takeoff = takeoffPosRef.current || {
        x: vw * 0.82,
        y: vh * 0.65,
        width: 820,
      };

      // 2. Destination Position (inside Contact white form card)
      let destX = vw * 0.65;
      let destY = vh * 0.58;
      let destW = Math.min(vw * 0.95, 1040);

      if (contactJetDest) {
        const destRect = contactJetDest.getBoundingClientRect();
        if (destRect.width > 20 && destRect.height > 20) {
          const cardW = destRect.width;
          const cardH = destRect.height;
          const imgAspect = 1376 / 768; // ~1.791667

          let imgRenderedW = cardW;
          let imgRenderedH = cardH;

          if (cardW / cardH < imgAspect) {
            imgRenderedH = cardH;
            imgRenderedW = cardH * imgAspect;
            destX = destRect.right - imgRenderedW * 0.5;
            destY = destRect.bottom - imgRenderedH * 0.5;
          } else {
            imgRenderedW = cardW;
            imgRenderedH = cardW / imgAspect;
            destX = destRect.right - imgRenderedW * 0.5;
            destY = destRect.bottom - imgRenderedH * 0.5;
          }

          destW = imgRenderedW;
        }
      }

      // Smooth cubic trajectory easing
      const easeT = pClamped < 0.5 ? 2 * pClamped * pClamped : -1 + (4 - 2 * pClamped) * pClamped;

      // Lateral sweep and altitude arc
      const lateralSweep = Math.sin(pClamped * Math.PI) * (vw * 0.11);
      const altitudeClimb = Math.sin(pClamped * Math.PI) * 75;

      const curX = takeoff.x + (destX - takeoff.x) * easeT - lateralSweep;
      const curY = takeoff.y + (destY - takeoff.y) * easeT - altitudeClimb;

      // Smooth width scaling from 820px into contact watermark width
      const curWidth = takeoff.width + (destW - takeoff.width) * easeT;

      // ── SMOOTH, GRADUAL ROTATION TRANSITION (NO SNAPPING) ──
      // 1. Initial liftoff (p: 0 -> 0.18): Maintains horizontal stance (15deg) as it takes off
      // 2. Mid-air transition (p: 0.18 -> 0.75): Slowly, gracefully rotates from 15deg down to 0deg
      // 3. Final approach (p: 0.75 -> 1.00): Settles level at 0deg to dock seamlessly into Contact card
      const rotProgress = Math.min(1, Math.max(0, (pClamped - 0.18) / 0.57));
      const rotEase = rotProgress * rotProgress * (3 - 2 * rotProgress);
      // Gentle pitch-up climb accent during mid-flight (maximum 3.5 deg, completely smooth)
      const gentleClimb = -3.5 * Math.sin(rotEase * Math.PI);
      const curRotateZ = 15 - 15 * rotEase + gentleClimb;

      // Subtle 3D banking
      const curRotateX = -4 * Math.sin(pClamped * Math.PI);
      const curRotateY = -6 * Math.sin(pClamped * Math.PI);

      // Air streaks active during mid-flight
      const showAirStreaks = pClamped > 0.08 && pClamped < 0.90;
      const afterburnerBoost = Math.sin(pClamped * Math.PI);

      setState({
        active: true,
        progress: pClamped,
        x: curX,
        y: curY,
        width: curWidth,
        scale: 1,
        rotateZ: curRotateZ,
        rotateX: curRotateX,
        rotateY: curRotateY,
        opacity: 1,
        showAirStreaks,
        afterburnerBoost,
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

  if (!state.active) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
      style={{ perspective: 1200 }}
    >
      {/* ── Supersonic Aircraft in Fluid 60fps Flight from Vision Road to Contact Form ── */}
      <div
        className="absolute top-0 left-0 will-change-transform"
        style={{
          transform: `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%) scale(${state.scale}) rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg) rotateZ(${state.rotateZ}deg)`,
          width: state.width,
          maxWidth: "96vw",
          opacity: state.opacity,
        }}
      >
        <div className="relative w-full h-auto">
          {/* ── Dynamic Glowing Afterburner Exhaust Plumes ── */}
          {state.afterburnerBoost > 0.05 && (
            <div
              className="absolute pointer-events-none z-10"
              style={{
                top: "62%",
                left: "17%",
                transform: "translate(-50%, -50%) rotate(15deg)",
                opacity: Math.min(1, state.afterburnerBoost * 1.3),
              }}
            >
              {/* Central Afterburner Core Flame */}
              <div
                className="w-16 h-5 rounded-full"
                style={{
                  background:
                    "radial-gradient(ellipse at left, rgba(255,255,255,0.95) 0%, rgba(56,189,248,0.85) 30%, rgba(249,115,22,0.7) 65%, transparent 100%)",
                  filter: "blur(2.5px)",
                  boxShadow: "0 0 16px rgba(56,189,248,0.7), 0 0 28px rgba(249,115,22,0.5)",
                }}
              />
              {/* Lower Engine Auxiliary Flame */}
              <div
                className="w-12 h-3.5 rounded-full -mt-1 ml-1"
                style={{
                  background:
                    "radial-gradient(ellipse at left, rgba(255,255,255,0.95) 0%, rgba(249,115,22,0.8) 45%, transparent 100%)",
                  filter: "blur(2px)",
                }}
              />
            </div>
          )}

          {/* ── Flight Air Streaks Effect during High-Speed Transit ── */}
          {state.showAirStreaks && (
            <div
              className="absolute inset-0 pointer-events-none overflow-visible z-20"
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              {FLIGHT_AIR_STREAKS.map((s, i) => (
                <div
                  key={i}
                  className="contact-slipstream-streak"
                  style={
                    {
                      position: "absolute",
                      top: s.top,
                      left: s.left,
                      width: s.width,
                      height: s.h,
                      background: `linear-gradient(to right, transparent 0%, rgba(255,255,255,${s.opacity}) 35%, rgba(186,230,253,${s.opacity * 0.7}) 70%, transparent 100%)`,
                      boxShadow: "0 0 5px rgba(255,255,255,0.5)",
                      filter: "blur(0.2px)",
                      "--dur": s.duration,
                      "--delay": s.delay,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          )}

          {/* High-Detail M1 Velocity S1 Supersonic Aircraft */}
          <Image
            src="/images/footer-jet.png"
            alt=""
            width={1376}
            height={768}
            priority
            draggable={false}
            className="w-full h-auto object-contain pointer-events-none select-none drop-shadow-[0_24px_50px_rgba(0,0,0,0.85)] brightness-105"
          />
        </div>
      </div>
    </div>
  );
}
