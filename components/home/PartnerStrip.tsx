"use client";

import React from "react";
import Image from "next/image";

/**
 * Real logos extracted from the Logos carousel reference.png.
 * Row1: extracted left-to-right from the top strip.
 * Row2: extracted left-to-right from the bottom strip.
 * Rendered 100% natural, crisp, authentic, and without any artificial blur or drop-shadow.
 */
const ROW_1_LOGOS = [
  { id: "r1-1",  src: "/images/partners/row1_1.png",  alt: "Brand Partner" },
  { id: "r1-2",  src: "/images/partners/row1_2.png",  alt: "Recipli" },
  { id: "r1-3",  src: "/images/partners/row1_3.png",  alt: "Shell Aviation" },
  { id: "r1-4",  src: "/images/partners/row1_4.png",  alt: "NCATS Partner" },
  { id: "r1-5",  src: "/images/partners/row1_5.png",  alt: "Askari Bank" },
  { id: "r1-6",  src: "/images/partners/row1_6.png",  alt: "BugatoCare" },
  { id: "r1-7",  src: "/images/partners/row1_7.png",  alt: "RSI" },
  { id: "r1-8",  src: "/images/partners/row1_8.png",  alt: "Naqabi Bakery" },
];

const ROW_2_LOGOS = [
  { id: "r2-1",  src: "/images/partners/row2_1.png",  alt: "Royal Aviation" },
  { id: "r2-2",  src: "/images/partners/row2_2.png",  alt: "Shopify" },
  { id: "r2-3",  src: "/images/partners/row2_3.png",  alt: "Cameco" },
  { id: "r2-4",  src: "/images/partners/row2_4.png",  alt: "Nutrien Livestock" },
  { id: "r2-5",  src: "/images/partners/row2_5.png",  alt: "Azure" },
  { id: "r2-6",  src: "/images/partners/row2_6.png",  alt: "Aerodynamics Corp" },
  { id: "r2-7",  src: "/images/partners/row2_7.png",  alt: "Gigas" },
];

export default function PartnerStrip() {
  // Repeat each set 5× to guarantee seamless looping at all viewport widths
  const row1 = [...ROW_1_LOGOS, ...ROW_1_LOGOS, ...ROW_1_LOGOS, ...ROW_1_LOGOS, ...ROW_1_LOGOS];
  const row2 = [...ROW_2_LOGOS, ...ROW_2_LOGOS, ...ROW_2_LOGOS, ...ROW_2_LOGOS, ...ROW_2_LOGOS];

  return (
    <section
      aria-label="Industry Partners & Alliances"
      className="relative w-full py-16 sm:py-20 bg-black overflow-hidden select-none border-y border-zinc-900"
    >
      {/* ── Narrow Edge Vignettes (No blur over logos) ── */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-14 z-20 pointer-events-none bg-gradient-to-r from-black to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-14 z-20 pointer-events-none bg-gradient-to-l from-black to-transparent" />

      <div className="relative w-full flex flex-col gap-9 sm:gap-11 z-10">
        {/* ── Row 1: Right → Left ── */}
        <div className="relative w-full overflow-hidden">
          <div className="flex items-center gap-14 sm:gap-20 w-max animate-marquee-rtl">
            {row1.map((logo, i) => (
              <div
                key={`r1-${logo.id}-${i}`}
                className="shrink-0 flex items-center justify-center transition-transform duration-200 hover:scale-105"
                style={{ height: 56 }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={56}
                  className="object-contain max-h-[56px] w-auto select-none pointer-events-none"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Row 2: Left → Right ── */}
        <div className="relative w-full overflow-hidden">
          <div className="flex items-center gap-14 sm:gap-20 w-max animate-marquee-ltr">
            {row2.map((logo, i) => (
              <div
                key={`r2-${logo.id}-${i}`}
                className="shrink-0 flex items-center justify-center transition-transform duration-200 hover:scale-105"
                style={{ height: 56 }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={56}
                  className="object-contain max-h-[56px] w-auto select-none pointer-events-none"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
