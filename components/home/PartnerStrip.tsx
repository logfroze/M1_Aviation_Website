"use client";

import React from "react";
import Image from "next/image";

export interface PartnerLogo {
  id: string;
  src: string;
  alt: string;
  href: string;
}

export const ALL_LOGOS: PartnerLogo[] = [
  { id: "p-bn-aviation", src: "/images/partners/bn-aviation.png", alt: "BNAvation",   href: "https://britten-norman.com" },
  { id: "p-velari",      src: "/images/partners/velari-jets.png", alt: "Velari Jets", href: "https://velarijets.co" },
  { id: "p-7ivs",        src: "/images/partners/7ivs.png",        alt: "7IVS",        href: "https://www.7ivs.com" },
];

export default function PartnerStrip() {
  // Repeat to guarantee uninterrupted infinite marquee across ultra-wide viewports
  const singleRowLogos = Array.from({ length: 16 }, () => ALL_LOGOS).flat();

  const handleLogoDoubleClick = (url: string) => {
    if (url && typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      aria-label="Industry Partners & Alliances"
      className="relative z-30 w-full py-12 sm:py-16 bg-black overflow-hidden select-none"
    >
      {/* ── Left Edge Blur & Fade ── */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 z-40 pointer-events-none bg-gradient-to-r from-black via-black/80 to-transparent backdrop-blur-[2px]" />

      {/* ── Right Edge Blur & Fade ── */}
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 z-40 pointer-events-none bg-gradient-to-l from-black via-black/80 to-transparent backdrop-blur-[2px]" />

      {/* ── Direct Logos Placement: Single Moving Line on Plain Black Screen ── */}
      <div className="relative w-full overflow-hidden group z-30">
        <div
          className="flex items-center gap-24 sm:gap-36 md:gap-44 lg:gap-52 w-max animate-marquee-rtl group-hover:[animation-play-state:paused] py-2"
          style={{ animationDuration: "80s" }}
        >
          {singleRowLogos.map((logo, i) => (
            <div
              key={`logo-${logo.id}-${i}`}
              onDoubleClick={() => handleLogoDoubleClick(logo.href)}
              title={`Double-click to visit ${logo.alt} (${logo.href})`}
              className="shrink-0 flex items-center justify-center cursor-pointer transition-all duration-300 opacity-90 hover:opacity-100 group/item hover:scale-105 active:scale-95"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={260}
                height={85}
                className="object-contain max-h-[55px] sm:max-h-[70px] w-auto select-none pointer-events-none brightness-[1.8] contrast-[1.15] saturate-[1.2] group-hover/item:brightness-[2.4] group-hover/item:scale-110 group-hover/item:drop-shadow-[0_0_18px_rgba(255,255,255,0.7)] transition-all duration-300"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
