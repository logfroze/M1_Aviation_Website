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
      className="relative z-30 w-full py-12 sm:py-16 bg-black overflow-hidden select-none"
    >
      {/* ── Left Edge Blur & Fade ── */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 z-40 pointer-events-none bg-gradient-to-r from-black via-black/80 to-transparent backdrop-blur-[2px]" />

      {/* ── Right Edge Blur & Fade ── */}
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 z-40 pointer-events-none bg-gradient-to-l from-black via-black/80 to-transparent backdrop-blur-[2px]" />

      {/* ── Direct Logos Placement: Single Moving Line on Plain Black Screen ── */}
      <div className="relative w-full overflow-hidden group z-30">
        <div
          className="flex items-center gap-14 sm:gap-20 w-max animate-marquee-rtl group-hover:[animation-play-state:paused] py-2"
          style={{ animationDuration: "68s" }}
        >
          {singleRowLogos.map((logo, i) => (
            <div
              key={`logo-${logo.id}-${i}`}
              className="shrink-0 flex items-center justify-center cursor-pointer transition-all duration-300 opacity-85 hover:opacity-100 group/item"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={260}
                height={85}
                className="object-contain max-h-[55px] sm:max-h-[70px] w-auto select-none pointer-events-none brightness-115 contrast-110 group-hover/item:brightness-135 group-hover/item:scale-105 transition-all duration-300"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
