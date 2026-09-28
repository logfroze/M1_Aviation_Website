"use client";

import React from "react";
import Image from "next/image";

const ALL_LOGOS = [
  { id: "r1-1",  src: "/images/partners/row1_1.png",  alt: "Brand Partner" },
  { id: "r1-2",  src: "/images/partners/row1_2.png",  alt: "Recipli" },
  { id: "r1-3",  src: "/images/partners/row1_3.png",  alt: "Shell Aviation" },
  { id: "r1-4",  src: "/images/partners/row1_4.png",  alt: "NCATS Partner" },
  { id: "r1-5",  src: "/images/partners/row1_5.png",  alt: "Askari Bank" },
  { id: "r1-6",  src: "/images/partners/row1_6.png",  alt: "BugatoCare" },
  { id: "r1-7",  src: "/images/partners/row1_7.png",  alt: "RSI" },
  { id: "r1-8",  src: "/images/partners/row1_8.png",  alt: "Naqabi Bakery" },
  { id: "r2-1",  src: "/images/partners/row2_1.png",  alt: "Royal Aviation" },
  { id: "r2-2",  src: "/images/partners/row2_2.png",  alt: "Shopify" },
  { id: "r2-3",  src: "/images/partners/row2_3.png",  alt: "Cameco" },
  { id: "r2-4",  src: "/images/partners/row2_4.png",  alt: "Nutrien Livestock" },
  { id: "r2-5",  src: "/images/partners/row2_5.png",  alt: "Azure" },
  { id: "r2-6",  src: "/images/partners/row2_6.png",  alt: "Aerodynamics Corp" },
  { id: "r2-7",  src: "/images/partners/row2_7.png",  alt: "Gigas" },
];

export default function PartnerStrip() {
  // Repeat 4x to guarantee uninterrupted infinite marquee across ultra-wide viewports
  const singleRowLogos = [...ALL_LOGOS, ...ALL_LOGOS, ...ALL_LOGOS, ...ALL_LOGOS];

  return (
    <section
      aria-label="Industry Partners & Alliances"
      className="relative z-30 w-full py-14 sm:py-20 bg-gradient-to-b from-[#141923] via-[#1a2130] to-[#141923] border-y border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(255,255,255,0.15)] overflow-hidden select-none"
    >
      {/* ── Soft Ambient Center Glow for High Contrast Logo Visibility (Lighter backdrop) ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_50%,rgba(255,255,255,0.12)_0%,transparent_80%)]" />
      </div>

      {/* ── Edge Vignettes for smooth fade matching slate background ── */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-20 pointer-events-none bg-gradient-to-r from-[#141923] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-20 pointer-events-none bg-gradient-to-l from-[#141923] to-transparent" />

      {/* ── Single Moving Line with Vivid, Ultra-Crisp Logos (Zero blur, clear visibility) ── */}
      <div className="relative w-full overflow-hidden group z-30">
        <div className="flex items-center gap-10 sm:gap-14 w-max animate-marquee-rtl group-hover:[animation-play-state:paused] py-2">
          {singleRowLogos.map((logo, i) => (
            <div
              key={`logo-${logo.id}-${i}`}
              className="shrink-0 -skew-x-6 bg-white/[0.07] hover:bg-white/[0.15] border border-white/15 hover:border-white/40 px-6 sm:px-8 py-3.5 transition-all duration-300 cursor-pointer shadow-md group/item flex items-center justify-center"
              style={{ minHeight: 96 }}
            >
              <div className="skew-x-6 flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={280}
                  height={110}
                  className="object-contain max-h-[75px] sm:max-h-[90px] w-auto select-none pointer-events-none opacity-100 brightness-125 contrast-110 group-hover/item:brightness-140 group-hover/item:scale-105 transition-all duration-300 drop-shadow-[0_2px_10px_rgba(255,255,255,0.22)]"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
