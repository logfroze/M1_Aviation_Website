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

// ── Supersonic Afterburner Thrust Fire Effect during Flight ──
function JetFlameTorch({ idPrefix }: { idPrefix: string }) {
  return (
    <div className="relative w-full h-full">
      {/* Tight, sleek atmospheric glow (tight spread, no oversized cloud) */}
      <div className="absolute -inset-x-3 -inset-y-1 bg-[radial-gradient(ellipse_at_80%_50%,_rgba(255,255,255,0.9)_0%,_rgba(56,189,248,0.85)_20%,_rgba(249,115,22,0.85)_50%,_transparent_100%)] blur-sm rounded-full opacity-85 mix-blend-screen" />
      <div className="absolute -inset-x-5 -inset-y-1.5 bg-[radial-gradient(ellipse_at_75%_50%,_rgba(255,140,0,0.65)_0%,_rgba(234,88,12,0.35)_50%,_transparent_80%)] blur-md opacity-70 mix-blend-screen" />
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[radial-gradient(circle,_#ffffff_0%,_#38bdf8_35%,_#f97316_70%,_transparent_100%)] blur-[1.5px] mix-blend-screen opacity-95" />

      {/* Sharp Supersonic Thrust Stream SVG */}
      <svg
        viewBox="0 0 160 30"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full overflow-visible drop-shadow-[0_0_12px_rgba(249,115,22,0.9)]"
      >
        <defs>
          <linearGradient id={`${idPrefix}-torch`} x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="8%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="20%" stopColor="#fef08a" stopOpacity="1" />
            <stop offset="40%" stopColor="#ff7700" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#ff3d00" stopOpacity="0.8" />
            <stop offset="90%" stopColor="#ea580c" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#c2410c" stopOpacity="0" />
          </linearGradient>

          <linearGradient id={`${idPrefix}-core`} x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="25%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.95" />
            <stop offset="75%" stopColor="#fdba74" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>

          <linearGradient id={`${idPrefix}-needle`} x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="85%" stopColor="#bae6fd" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <radialGradient id={`${idPrefix}-throat`} cx="100%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="35%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="70%" stopColor="#f97316" stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Aerodynamic High-Thrust Torch */}
        <path
          d="M 160,11 C 120,8.5 70,5 28,6.5 C 10,7.5 0,11.5 0,15 C 0,18.5 10,22.5 28,23.5 C 70,25 120,21.5 160,19 Z"
          fill={`url(#${idPrefix}-torch)`}
          filter="blur(0.8px)"
        />

        {/* Mid High-Heat Flame Mantle */}
        <path
          d="M 160,12 C 125,10 75,7.5 32,8.5 C 14,10 6,13 6,15 C 6,17 14,20 32,21.5 C 75,22.5 125,20 160,18 Z"
          fill={`url(#${idPrefix}-core)`}
          filter="blur(0.4px)"
        />

        {/* Razor-Sharp Center White-Hot Plasma Needle */}
        <path
          d="M 160,13.8 C 130,13 90,12 42,13 C 22,13.8 12,14.5 12,15 C 12,15.5 22,16.2 42,17 C 90,18 130,17 160,16.2 Z"
          fill={`url(#${idPrefix}-needle)`}
        />

        {/* 4 Crisp Supersonic Mach Shock Diamonds */}
        <polygon points="140,15 144.5,11.5 149,15 144.5,18.5" fill="#ffffff" filter="drop-shadow(0 0 4px #38bdf8)" />
        <polygon points="115,15 120.5,11 126,15 120.5,19" fill="#ffffff" filter="drop-shadow(0 0 6px #ffffff)" />
        <polygon points="88,15 94.5,11.5 101,15 94.5,18.5" fill="#fef08a" filter="drop-shadow(0 0 5px #f97316)" />
        <polygon points="62,15 67.5,12.5 73,15 67.5,17.5" fill="#fed7aa" filter="drop-shadow(0 0 4px #ea580c)" />

        {/* Nozzle Throat Flare */}
        <ellipse cx="160" cy="15" rx="6" ry="9" fill={`url(#${idPrefix}-throat)`} />
        <ellipse cx="160" cy="15" rx="3" ry="5" fill="#ffffff" />
      </svg>
    </div>
  );
}

function ContactJetThrustFire({ opacity }: { opacity: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-visible z-20 transition-opacity duration-150"
      style={{ opacity }}
    >
      {/* ── Engine 1: Upper / Tail Engine ── */}
      <div
        className="absolute origin-right"
        style={{
          top: "67.5%",
          right: "79.3%",
          width: "16%",
          height: "22px",
          transformOrigin: "right center",
          transform: "translateY(-50%) rotate(-24.5deg)",
        }}
      >
        <JetFlameTorch idPrefix="cflight-e1" />
      </div>

      {/* ── Engine 2: Lower / Wing Engine ── */}
      <div
        className="absolute origin-right"
        style={{
          top: "72.4%",
          right: "62.6%",
          width: "16%",
          height: "22px",
          transformOrigin: "right center",
          transform: "translateY(-50%) rotate(-15.5deg)",
        }}
      >
        <JetFlameTorch idPrefix="cflight-e2" />
      </div>
    </div>
  );
}

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
            imgRenderedH = cardH / imgAspect;
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
            className="w-full h-auto object-contain pointer-events-none select-none drop-shadow-[0_24px_50px_rgba(0,0,0,0.85)] brightness-105 relative z-10"
          />

          {/* ── Dynamic Supersonic Afterburner Thrust Fire in Mid-Air Flight ── */}
          {state.afterburnerBoost > 0.02 && (
            <ContactJetThrustFire
              opacity={Math.min(1, Math.max(0, state.afterburnerBoost * 1.5))}
            />
          )}
        </div>
      </div>
    </div>
  );
}
