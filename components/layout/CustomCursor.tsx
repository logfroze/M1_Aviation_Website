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
          transform: `scale(${isClicking ? 0.88 : isHovered ? 1.15 : 1})`,
        }}
      >
        {/* Supersonic Jet Vector Graphic (inspired by image copy.png & Azenis) */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] drop-shadow-[0_0_12px_rgba(200,225,255,0.45)]"
        >
          <defs>
            {/* Metallic fuselage gradient */}
            <linearGradient id="fuselageGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#d4d8e0" />
              <stop offset="80%" stopColor="#7a8290" />
              <stop offset="100%" stopColor="#353b45" />
            </linearGradient>

            {/* Glowing cockpit canopy */}
            <linearGradient id="canopyGrad" x1="6" y1="6" x2="18" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a8e0ff" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            {/* Afterburner flame gradient */}
            <linearGradient id="afterburnerGrad" x1="24" y1="24" x2="38" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor={isHovered ? "#38bdf8" : "#fbbf24"} />
              <stop offset="70%" stopColor={isHovered ? "#0284c7" : "#f97316"} />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            <filter id="jetGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Afterburner Thruster Plume */}
          <path
            d="M26 26L36 36L29 39L23 29Z"
            fill="url(#afterburnerGrad)"
            opacity={isHovered ? 0.95 : 0.75}
            className="animate-pulse"
          />

          {/* Fighter Jet Airframe Body (Nose at 0,0, angled -45 deg) */}
          {/* Main swept delta wings and fuselage */}
          <path
            d="M1 1
               L14 9
               L29 3
               L24 16
               L37 11
               L26 26
               L22 23
               L20 31
               L17 21
               L9 26
               L11 14
               L1 1Z"
            fill="url(#fuselageGrad)"
            stroke="#ffffff"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />

          {/* Left Winglet */}
          <path
            d="M29 3L32 1L30 6Z"
            fill="#a1a8b5"
            stroke="#ffffff"
            strokeWidth="0.5"
          />

          {/* Fuselage Spine Shadow & Trim Lines */}
          <path
            d="M1 1L24 24"
            stroke="#ffffff"
            strokeWidth="0.75"
            strokeOpacity="0.8"
          />

          {/* High-Tech Avionics Glass Canopy */}
          <ellipse
            cx="10"
            cy="10"
            rx="4.2"
            ry="2.2"
            transform="rotate(45 10 10)"
            fill="url(#canopyGrad)"
            stroke="#bae6fd"
            strokeWidth="0.5"
            filter="url(#jetGlow)"
          />

          {/* Targeting Crosshair / Radar Beacon on Hover */}
          {isHovered && (
            <circle
              cx="1"
              cy="1"
              r="2.5"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.75"
              className="animate-ping"
            />
          )}
        </svg>
      </div>
    </div>
  );
}
