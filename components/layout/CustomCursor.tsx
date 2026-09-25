"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Disable entirely on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a") ||
        target?.closest("button") ||
        target?.closest("input") ||
        target?.closest("select") ||
        target?.closest("textarea") ||
        target?.getAttribute("role") === "button" ||
        target?.classList.contains("cursor-pointer")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        willChange: "transform",
      }}
    >
      {/* 
        The fighter jet's needle-sharp nose is aligned exactly at (0, 0)
        so clicking is 100% pixel-accurate.
      */}
      <div
        className="relative transition-transform duration-100 ease-out origin-top-left"
        style={{
          transform: `scale(${isClicking ? 0.88 : isHovered ? 1.18 : 1})`,
        }}
      >
        {/* Supersonic Metallic Fighter Jet (Modeled precisely after image copy.png & Azenis chrome) */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] drop-shadow-[0_0_10px_rgba(56,189,248,0.35)]"
        >
          <defs>
            {/* Polished Chrome Port Facet (Upper-Right) */}
            <linearGradient id="chromePort" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="18%" stopColor="#f1f5f9" />
              <stop offset="38%" stopColor="#cbd5e1" />
              <stop offset="55%" stopColor="#ffffff" />
              <stop offset="72%" stopColor="#64748b" />
              <stop offset="90%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Brushed Titanium Starboard Facet (Lower-Left) */}
            <linearGradient id="chromeStarboard" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="22%" stopColor="#94a3b8" />
              <stop offset="42%" stopColor="#475569" />
              <stop offset="60%" stopColor="#cbd5e1" />
              <stop offset="78%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Specular Razor Spine Gleam */}
            <linearGradient id="spineHighlight" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
            </linearGradient>

            {/* Sapphire Avionics Glass Canopy */}
            <linearGradient id="sapphireCanopy" x1="11" y1="11" x2="21" y2="21" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="25%" stopColor="#7dd3fc" />
              <stop offset="60%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#082f49" />
            </linearGradient>

            {/* Supersonic Afterburner Plasma Flame */}
            <linearGradient id="afterburnerFlame" x1="28" y1="28" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="20%" stopColor="#67e8f9" />
              <stop offset="50%" stopColor={isHovered ? "#38bdf8" : "#0284c7"} />
              <stop offset="80%" stopColor={isHovered ? "#818cf8" : "#2563eb"} />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>

            {/* Wingtip Missile Rail Accent */}
            <linearGradient id="missileRail" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            <filter id="plasmaGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ── Supersonic Afterburner Exhaust Plume ── */}
          <path
            d="M 28 28
               L 41 41
               L 36 43
               L 32 37
               L 28 39
               L 30 33
               L 26 26 Z"
            fill="url(#afterburnerFlame)"
            opacity={isHovered ? 0.95 : 0.8}
            className="animate-pulse"
            filter="url(#plasmaGlow)"
          />

          {/* Core Mach Shock Diamond */}
          <polygon
            points="31,31 36,36 34,37 29,32"
            fill="#ffffff"
            opacity={isHovered ? 0.9 : 0.7}
          />

          {/* ── Starboard (Lower-Left) Airframe Half ── */}
          {/* Exact silhouette from image copy.png: nose -> strake -> wing with tip rail -> waist -> stabilizer -> tail */}
          <path
            d="M 1 1
               L 9 17
               L 5 31
               L 3 33
               L 7 35
               L 9 32
               L 18 25
               L 22 27
               L 24 37
               L 30 34
               L 28 29
               L 33 33
               L 29 29
               L 1 1 Z"
            fill="url(#chromeStarboard)"
            stroke="#64748b"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />

          {/* ── Port (Upper-Right) Airframe Half ── */}
          {/* Mirror facet for 3D beveled metallic fuselage reflection */}
          <path
            d="M 1 1
               L 17 9
               L 31 5
               L 33 3
               L 35 7
               L 32 9
               L 25 18
               L 27 22
               L 37 24
               L 34 30
               L 29 28
               L 33 33
               L 29 29
               L 1 1 Z"
            fill="url(#chromePort)"
            stroke="#94a3b8"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />

          {/* ── Wingtip Missile Rails (Matching image copy.png) ── */}
          {/* Port Wingtip Launcher */}
          <polygon
            points="31,5 33,3 35,7 32,9"
            fill="url(#missileRail)"
            stroke="#ffffff"
            strokeWidth="0.4"
          />
          {/* Starboard Wingtip Launcher */}
          <polygon
            points="5,31 3,33 7,35 9,32"
            fill="url(#missileRail)"
            stroke="#ffffff"
            strokeWidth="0.4"
          />

          {/* Tiny Wingtip Navigation Strobes */}
          <circle cx="34" cy="4" r="0.75" fill="#38bdf8" />
          <circle cx="4" cy="34" r="0.75" fill="#ef4444" />

          {/* ── Beveled Fuselage Spine & Specular Reflection Edge ── */}
          <line
            x1="1"
            y1="1"
            x2="28"
            y2="28"
            stroke="url(#spineHighlight)"
            strokeWidth="0.9"
            strokeLinecap="round"
          />

          {/* Wing Leading Edge Specular Lines */}
          <line x1="17" y1="9" x2="31" y2="5" stroke="#ffffff" strokeWidth="0.6" strokeOpacity="0.85" />
          <line x1="9" y1="17" x2="5" y2="31" stroke="#cbd5e1" strokeWidth="0.5" strokeOpacity="0.7" />

          {/* ── Central Glass Cockpit Canopy (Oval from image copy.png) ── */}
          {/* Outer Chrome Canopy Rim */}
          <ellipse
            cx="14"
            cy="14"
            rx="5.4"
            ry="2.6"
            transform="rotate(45 14 14)"
            fill="#1e293b"
            stroke="#f8fafc"
            strokeWidth="0.6"
          />
          {/* Sapphire Polarized Glass */}
          <ellipse
            cx="14"
            cy="14"
            rx="4.6"
            ry="2.1"
            transform="rotate(45 14 14)"
            fill="url(#sapphireCanopy)"
          />
          {/* Canopy Specular Glare Reflection */}
          <path
            d="M 12 11 Q 14 12 16 15"
            stroke="#ffffff"
            strokeWidth="0.6"
            strokeLinecap="round"
            strokeOpacity="0.9"
          />

          {/* Titanium Engine Nozzle Ring */}
          <circle
            cx="29"
            cy="29"
            r="1.8"
            fill="#0f172a"
            stroke="#cbd5e1"
            strokeWidth="0.6"
          />

          {/* ── Precision HUD Reticle / Targeting Beacon on Hover ── */}
          {isHovered && (
            <>
              <circle
                cx="1"
                cy="1"
                r="3.5"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="0.75"
                strokeDasharray="2 1.5"
                className="animate-spin"
                style={{ animationDuration: "3s" }}
              />
              <circle
                cx="1"
                cy="1"
                r="1.2"
                fill="#38bdf8"
                className="animate-ping"
              />
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
