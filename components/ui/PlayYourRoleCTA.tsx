import React from "react";
import Image from "next/image";
import ParallelogramButton from "./ParallelogramButton";

const LEFT_IMAGES = [
  "/images/article-1.jpg",
  "/images/saios-card.jpg",
  "/images/article-2.jpg",
  "/images/footer-jet.jpg",
];

const RIGHT_IMAGES = [
  "/images/article-3.jpg",
  "/images/marketplace-card.jpg",
  "/images/avigram-card.jpg",
  "/images/ecosystem-card.jpg",
];

export default function PlayYourRoleCTA({ className = "" }: { className?: string }) {
  const leftCarousel = [...LEFT_IMAGES, ...LEFT_IMAGES];
  const rightCarousel = [...RIGHT_IMAGES, ...RIGHT_IMAGES];

  return (
    <section
      aria-label="Partner Program"
      className={`relative py-24 px-6 md:px-12 max-w-5xl mx-auto border-t border-zinc-800/80 ${className}`}
    >
      <div className="relative z-10 bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-12 md:p-14 text-center overflow-hidden shadow-2xl flex flex-col items-center">
        {/* ── Left Background Image Carousel ── */}
        <div className="absolute left-0 top-0 bottom-0 w-36 sm:w-52 pointer-events-none select-none opacity-20 overflow-hidden z-0">
          <div className="flex flex-col gap-4 animate-marquee-ltr" style={{ animationDuration: "24s" }}>
            {leftCarousel.map((src, i) => (
              <div key={`left-img-${i}`} className="relative w-full h-32 rounded-xl overflow-hidden shrink-0">
                <Image src={src} alt="" fill sizes="200px" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-950/60 to-zinc-950" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
        </div>

        {/* ── Right Background Image Carousel ── */}
        <div className="absolute right-0 top-0 bottom-0 w-36 sm:w-52 pointer-events-none select-none opacity-20 overflow-hidden z-0">
          <div className="flex flex-col gap-4 animate-marquee-rtl" style={{ animationDuration: "24s" }}>
            {rightCarousel.map((src, i) => (
              <div key={`right-img-${i}`} className="relative w-full h-32 rounded-xl overflow-hidden shrink-0">
                <Image src={src} alt="" fill sizes="200px" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-zinc-950/60 to-zinc-950" />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-transparent to-zinc-950" />
        </div>

        {/* ── Centered Concise Content (Less text, clean hierarchy) ── */}
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 text-[10px] font-mono tracking-[0.25em] text-zinc-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Partnership Opportunities
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
            Play your role
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Join our exclusive alliance of aircraft operators, fleet managers, and aerospace OEMs co-piloting the next generation of intelligent aviation.
          </p>

          {/* Punchy concise highlights */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-mono text-zinc-400 pt-2">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" /> Early Flight Deck Intelligence
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" /> Executive Roundtable Network
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" /> Priority Ecosystem Access
            </span>
          </div>
        </div>

        {/* ── Button Moved to Bottom of Card ── */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full pt-8 mt-6 border-t border-zinc-800/80">
          <ParallelogramButton href="/#contact" variant="gold" className="text-sm px-12 py-4 shadow-xl">
            Apply Now
          </ParallelogramButton>
          <span className="text-[11px] text-zinc-500 font-mono mt-3">
            Review cycle: 2–3 business days
          </span>
        </div>
      </div>
    </section>
  );
}
