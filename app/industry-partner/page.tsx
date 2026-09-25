"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import ParallelogramButton from "@/components/ui/ParallelogramButton";
import PlayYourRoleCTA from "@/components/ui/PlayYourRoleCTA";
import { PARTNERS_ROSTER } from "@/data/partners";

const ENGAGEMENT_CARDS = [
  {
    id: "geneva",
    tag: "Protocol 01",
    title: "Geneva Executive Aviation Summit",
    location: "Geneva, Switzerland",
    date: "Q2 2026",
    summary:
      "Strategic roundtable with tier-1 jet operators aligning SAIOS autonomous airframe diagnostics with European business aviation workflows.",
    category: "Symposium & Protocol",
    image: "/images/article-1.jpg",
    stats: "48 Operators • 340 Aircraft Managed",
    ctaLabel: "Review Delegation Protocol",
    cardStyle: "bg-zinc-950 border-zinc-800 shadow-[0_30px_70px_rgba(0,0,0,0.6)]",
    badgeStyle: "bg-zinc-900 text-amber-300 border-amber-500/30",
    buttonVariant: "gold" as const,
  },
  {
    id: "north-america",
    tag: "Trial 02",
    title: "North American Fleet Efficiency Trials",
    location: "Dallas / Fort Worth, TX",
    date: "Q3 2026",
    summary:
      "Field trials verifying automated flight telemetry capture and FAA digital airworthiness synchronization across 40 corporate jet airframes.",
    category: "Operational Trial",
    image: "/images/article-2.jpg",
    stats: "99.8% Telemetry Accuracy • Zero AOG Incidents",
    ctaLabel: "Examine Trial Telemetry",
    cardStyle: "bg-[#0b1320] border-[#1d3557] shadow-[0_30px_70px_rgba(0,0,0,0.7)]",
    badgeStyle: "bg-[#14243b] text-sky-300 border-sky-500/30",
    buttonVariant: "silver" as const,
  },
  {
    id: "transatlantic",
    tag: "Alliance 03",
    title: "Transatlantic MRO Digital Protocol",
    location: "London Luton Airport, UK",
    date: "Q4 2026",
    summary:
      "Ratifying interoperability standards with leading MROs for streamlined avionics component replacement and direct escrow clearance.",
    category: "MRO Alliance",
    image: "/images/article-3.jpg",
    stats: "12 Certified Repair Facilities • Instant Escrow",
    ctaLabel: "Access MRO Framework",
    cardStyle: "bg-[#16181f] border-[#2f3342] shadow-[0_30px_70px_rgba(0,0,0,0.75)]",
    badgeStyle: "bg-[#222530] text-zinc-200 border-zinc-600/40",
    buttonVariant: "white" as const,
  },
];

export default function IndustryPartnerPage() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const repeatedPartners = [
    ...PARTNERS_ROSTER,
    ...PARTNERS_ROSTER,
    ...PARTNERS_ROSTER,
  ];

  // Identical scroll stacking animation as OurLineup cards
  useEffect(() => {
    const handleScroll = () => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const nextEl = cardRefs.current[i + 1];
        if (nextEl) {
          const nextRect = nextEl.getBoundingClientRect();
          const targetStickyTop = 80 + (i + 1) * 26;
          const distToLanding = nextRect.top - targetStickyTop;
          if (distToLanding < 240 && distToLanding > 0) {
            const progress = 1 - distToLanding / 240;
            const blurPx = (progress * 5).toFixed(1);
            const brightness = (1 - progress * 0.28).toFixed(2);
            const scale = (1.0 - progress * 0.025).toFixed(3);
            el.style.filter = `blur(${blurPx}px) brightness(${brightness})`;
            el.style.transform = `scale(${scale})`;
          } else if (distToLanding <= 0) {
            el.style.filter = "blur(5px) brightness(0.72)";
            el.style.transform = "scale(0.975)";
          } else {
            el.style.filter = "none";
            el.style.transform = "scale(1)";
          }
        } else {
          el.style.filter = "none";
          el.style.transform = "scale(1)";
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full flex flex-col items-center pt-24 pb-32 select-none">
      {/* ── 1. Hero Section ── */}
      <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06)_0%,_transparent_70%)] pointer-events-none" />

        <div className="relative z-10 space-y-5 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1 square-full border border-zinc-800 bg-zinc-950/80">
            {/* <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> */}
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-400">
              Executive Alliance Network
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tight text-white">
            Industry Partner
          </h1>

          <div className="pt-4">
            <ParallelogramButton href="/#contact" variant="gold" className="text-xs px-10 py-4 shadow-xl">
              Apply
            </ParallelogramButton>
          </div>
        </div>

        {/* ── Partner Logo Carousel ── */}
        <div className="w-full max-w-6xl mt-20 pt-6 border-t border-zinc-800/80 relative overflow-hidden">
          <div className="flex items-center gap-8 w-max animate-marquee-ltr cursor-default py-2">
            {repeatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex items-center gap-3 px-6 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950/70 hover:border-zinc-600 transition-colors shrink-0"
              >
                <div className="w-2 h-2 rounded-full bg-zinc-400" />
                <span className="text-xs font-semibold text-zinc-200 tracking-wider">
                  {partner.name}
                </span>
                <span className="text-[9px] font-mono text-zinc-500">
                  {partner.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Partner Engagement Showcase: 3 Separate Stacked Cards (Lineup Style & Animations) ── */}
      <section className="w-full py-28 px-4 sm:px-6 md:px-12 my-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            {/* <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">
              Field Operations & Deployments
            </span> */}
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
              Partner Engagement Showcase
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto">
              Real-world aircraft deployments, avionics trials, and operator summits powering the M1 ecosystem.
            </p>
          </div>

          {/* 3 Separate Cards Stacked with OurLineup sticky scroll animation */}
          <div className="relative space-y-20">
            {ENGAGEMENT_CARDS.map((slide, index) => {
              const stickyTopPx = 76 + index * 26;
              return (
                <div
                  key={slide.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={`sticky rounded-3xl border p-6 sm:p-10 md:p-12 lg:p-14 min-h-[460px] transition-[filter,transform] duration-200 ease-out origin-top will-change-transform flex flex-col justify-between ${slide.cardStyle}`}
                  style={{ top: `${stickyTopPx}px`, zIndex: index + 10 }}
                >
                  {/* Two-Column Content Layout */}
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                    {/* Left Column: Details */}
                    <div className="flex-1 space-y-4 max-w-2xl">
                      <div className="flex items-center gap-3">
                        <div className={`-skew-x-12 inline-flex items-center px-4 py-1.5 border shadow-sm ${slide.badgeStyle}`}>
                          <span className="inline-block skew-x-12 text-xs font-mono font-bold tracking-widest uppercase">
                            {slide.tag}
                          </span>
                        </div>
                        {/* <span className="text-xs font-mono text-zinc-400">
                          {slide.category}
                        </span> */}
                      </div>

                      

                      <h3 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-light text-white leading-snug">
                        {slide.title}
                      </h3>

                      <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                        {slide.summary}
                      </p>

                      <div className="pt-2">
                        <div className="inline-flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/10 text-xs font-mono text-zinc-200">
                          {/* <span className="font-semibold text-white">Telemetry Record:</span> */}
                          
                          <span>{slide.stats}</span>
                        </div>
                        
                      </div>

                      <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                        <span>📍 {slide.location}</span>
                        <span>•</span>
                        <span className="text-zinc-300 font-semibold">{slide.date}</span>
                      </div>
                    </div>

                    {/* Right Column: Featured Image with Hover Zoom */}
                    <div className="w-full lg:w-[420px] xl:w-[480px] shrink-0">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 shadow-2xl group">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 480px"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Center Button across cards (Our Line Up Style) */}
                  <div className="flex justify-center items-center pt-8 mt-6 border-t border-white/10 w-full">
                    <ParallelogramButton
                      href="/#contact"
                      variant={slide.buttonVariant}
                      className="py-4 px-10 text-sm sm:text-base shadow-xl"
                    >
                      {slide.ctaLabel}
                    </ParallelogramButton>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Play Your Role CTA ── */}
      <PlayYourRoleCTA />
    </div>
  );
}
