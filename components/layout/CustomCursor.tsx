"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
        // Nose tip of F-16 is positioned at (2, 2) in the source image,
        // so offset by -2px, -2px aligns click hotspot pixel-perfectly
        transform: `translate3d(${pos.x - 2}px, ${pos.y - 2}px, 0)`,
        willChange: "transform",
      }}
    >
      <div
        className="relative transition-transform duration-100 ease-out origin-top-left"
        style={{
          transform: `scale(${isClicking ? 0.88 : isHovered ? 1.15 : 1})`,
        }}
      >
        {/* 3D Silver F-16 Fighter Jet Cursor */}
        <div className="relative w-[50px] h-auto select-none pointer-events-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
          <Image
            src="/images/cursor-silver-f16.png"
            alt=""
            width={241}
            height={194}
            priority
            className={`w-[50px] h-auto select-none pointer-events-none transition-all duration-200 ${
              isHovered
                ? "brightness-110 drop-shadow-[0_0_14px_rgba(255,255,255,0.75)]"
                : "brightness-100"
            }`}
          />
        </div>

        {/* Tactical HUD Reticle beacon on interactive hover */}
        {isHovered && (
          <div className="absolute top-0.5 left-0.5 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-3 h-3 rounded-full border border-white/80 animate-ping opacity-60" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/90 shadow-[0_0_6px_#ffffff]" />
          </div>
        )}
      </div>
    </div>
  );
}

