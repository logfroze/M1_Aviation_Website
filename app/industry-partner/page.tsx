"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import ParallelogramButton from "@/components/ui/ParallelogramButton";
import PlayYourRoleCTA from "@/components/ui/PlayYourRoleCTA";
import { ALL_LOGOS } from "@/components/home/PartnerStrip";

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
    cardStyle:
      "bg-[linear-gradient(135deg,#13161c_0%,#1f242d_18%,#475569_36%,#cbd5e1_50%,#f1f5f9_62%,#64748b_78%,#1a1e24_100%)] border-slate-300/85 shadow-[inset_0_2px_4px_rgba(255,255,255,0.75),inset_0_-2px_4px_rgba(148,163,184,0.35)] shadow-[0_30px_70px_rgba(0,0,0,0.6)]",
    badgeStyle: "bg-zinc-950 text-zinc-100 border-zinc-700",
    buttonVariant: "silver" as const,
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
    cardStyle:
      "bg-[linear-gradient(135deg,#0a1322_0%,#13243d_18%,#334155_36%,#94a3b8_50%,#e2e8f0_62%,#475569_78%,#0f172a_100%)] border-slate-400/80 shadow-[inset_0_2px_4px_rgba(255,255,255,0.65),inset_0_-2px_4px_rgba(148,163,184,0.3)] shadow-[0_30px_70px_rgba(0,0,0,0.7)]",
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
    cardStyle:
      "bg-[linear-gradient(135deg,#130e24_0%,#24173d_18%,#4a3b66_36%,#94a3b8_50%,#e2e8f0_62%,#5b467e_78%,#19122c_100%)] border-slate-400/70 shadow-[inset_0_2px_4px_rgba(255,255,255,0.65),inset_0_-2px_4px_rgba(148,163,184,0.3)] shadow-[0_30px_70px_rgba(0,0,0,0.75)]",
    badgeStyle: "bg-[#251c3d] text-[#d8b4fe] border-[#4f3875]",
    buttonVariant: "silver" as const,
  },
];

import { playSolidDockSound, getSharedAudioContext } from "@/lib/audio";

export default function IndustryPartnerPage() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastActiveIndex = useRef<number>(-1);

  // Repeat 4x to guarantee uninterrupted infinite marquee across ultra-wide viewports
  const repeatedLogos = [
    ...ALL_LOGOS,
    ...ALL_LOGOS,
    ...ALL_LOGOS,
    ...ALL_LOGOS,
  ];

  // Resume audio on first user touch/scroll/click
  useEffect(() => {
    const handleFirstUserInteraction = () => {
      getSharedAudioContext();
      window.removeEventListener("scroll", handleFirstUserInteraction);
      window.removeEventListener("click", handleFirstUserInteraction);
      window.removeEventListener("touchstart", handleFirstUserInteraction);
    };

    window.addEventListener("scroll", handleFirstUserInteraction, { passive: true });
    window.addEventListener("click", handleFirstUserInteraction);
    window.addEventListener("touchstart", handleFirstUserInteraction, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleFirstUserInteraction);
      window.removeEventListener("click", handleFirstUserInteraction);
      window.removeEventListener("touchstart", handleFirstUserInteraction);
    };
  }, []);

  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [vh, setVh] = useState(900);

  useEffect(() => {
    const updateDimensions = () => {
      setVh(window.innerHeight);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Compute scroll progress through the track
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!trackRef.current) {
            ticking = false;
            return;
          }

          const rect = trackRef.current.getBoundingClientRect();
          const viewH = window.innerHeight;
          const totalDistance = rect.height - viewH;

          if (totalDistance <= 0) {
            ticking = false;
            return;
          }

          const rawProgress = -rect.top / totalDistance;
          const p = Math.max(0, Math.min(1, rawProgress));
          setScrollProgress(p);

          let currentActive = 0;
          if (p >= 0.78) {
            currentActive = 2;
          } else if (p >= 0.38) {
            currentActive = 1;
          } else {
            currentActive = 0;
          }

          if (currentActive !== lastActiveIndex.current) {
            lastActiveIndex.current = currentActive;
            if (currentActive > 0) {
              playSolidDockSound(currentActive);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCardTransform = (index: number) => {
    if (index === 0) return 0;
    let pStart = 0;
    let pEnd = 0;
    if (index === 1) {
      pStart = 0.10;
      pEnd = 0.38;
    } else if (index === 2) {
      pStart = 0.38;
      pEnd = 0.70;
    }
    if (scrollProgress <= pStart) return vh;
    if (scrollProgress >= pEnd) return 0;
    const t = (scrollProgress - pStart) / (pEnd - pStart);
    const eased = 1 - Math.pow(1 - t, 2.5);
    return (1 - eased) * vh;
  };

  return (
    <div className="w-full flex flex-col items-center pt-24 pb-32 select-none">
      {/* ── 1. Hero Section ── */}
      <section className="relative w-full min-h-[55vh] flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06)_0%,_transparent_70%)] pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto flex flex-col items-center px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 border border-zinc-800 bg-zinc-950/80 rounded-full">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-400">
              Executive Alliance Network
            </span>
          </div>

          {/* Single-line text for Industry Partner */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-white whitespace-nowrap">
            Industry Partner
          </h1>

          <div className="pt-2">
            <ParallelogramButton href="/#contact" variant="silver" className="text-xs px-10 py-4 shadow-xl">
              Apply
            </ParallelogramButton>
          </div>
        </div>

        {/* ── Partner Logos Carousel (Clean, Plain Screen, Doubled Size, Bright White/Silver & Shine) ── */}
        <div
          aria-label="Industry Partners & Alliances"
          className="relative z-20 w-full mt-10 sm:mt-14 py-4 sm:py-6 overflow-hidden select-none group/marquee"
        >
          {/* ── Left Edge Blur & Fade ── */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-44 z-30 pointer-events-none bg-gradient-to-r from-black via-black/80 to-transparent" />

          {/* ── Right Edge Blur & Fade ── */}
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-44 z-30 pointer-events-none bg-gradient-to-l from-black via-black/80 to-transparent" />

          {/* Continuous Moving Logos Row */}
          <div className="relative w-full overflow-hidden">
            <div
              className="flex items-center gap-16 sm:gap-24 md:gap-32 w-max animate-marquee-rtl group-hover/marquee:[animation-play-state:paused] py-3"
              style={{ animationDuration: "70s" }}
            >
              {repeatedLogos.map((logo, i) => (
                <div
                  key={`industry-logo-${logo.id}-${i}`}
                  className="shrink-0 flex items-center justify-center cursor-pointer transition-transform duration-300 group/logo"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={400}
                    height={130}
                    className="object-contain max-h-[85px] sm:max-h-[110px] md:max-h-[125px] w-auto select-none pointer-events-none brightness-[2.0] contrast-[1.15] saturate-[1.2] opacity-95 group-hover/logo:opacity-100 group-hover/logo:scale-115 group-hover/logo:brightness-[2.8] group-hover/logo:drop-shadow-[0_0_24px_rgba(255,255,255,0.85)] group-hover/logo:drop-shadow-[0_0_12px_rgba(147,197,253,0.5)] transition-all duration-300 ease-out"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Partner Engagement Showcase: 3 Separate Stacked Cards (Pinned Stage Pattern) ── */}
      <section className="relative z-20 w-full px-4 sm:px-6 md:px-12 my-8">
        <div ref={trackRef} className="relative w-full max-w-6xl mx-auto" style={{ height: "260vh" }}>
          <div className="sticky top-12 w-full flex flex-col items-center justify-start overflow-visible pt-2 pb-24 sm:pb-32">
            <div className="text-center mb-6 space-y-2 shrink-0">
              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
                Partner Engagement Showcase
              </h2>
              <p className="text-sm text-zinc-400 max-w-xl mx-auto">
                Real-world aircraft deployments, avionics trials, and operator summits powering the M1 ecosystem.
              </p>
            </div>

            {/* 3 Separate Cards Stacked with Pinned Stage Animation */}
            <div className="relative w-full max-w-5xl h-[500px]">
              {ENGAGEMENT_CARDS.map((slide, index) => {
                const cardTop = index * 42;
                const translateY = getCardTransform(index);

                return (
                  <div
                    key={slide.id}
                    className={`absolute left-0 right-0 rounded-3xl border pt-3.5 sm:pt-4 px-6 sm:px-8 md:px-10 pb-6 sm:pb-8 h-[460px] md:h-[480px] flex flex-col justify-between will-change-transform overflow-hidden ${slide.cardStyle}`}
                    style={{
                      top: `${cardTop}px`,
                      zIndex: index + 10,
                      transform: `translateY(${translateY}px) translateZ(0)`,
                      boxShadow: `0 -4px 18px rgba(0,0,0,0.5), 0 ${18 + index * 8}px ${45 + index * 10}px rgba(0,0,0,${0.55 + index * 0.08})`,
                    }}
                  >
                    {/* Diagonal Specular Silver Gloss Sheen */}
                    <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(125deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_25%,rgba(203,213,225,0.20)_46%,transparent_64%,rgba(255,255,255,0.14)_100%)] pointer-events-none" />

                    {/* Two-Column Content Layout */}
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                      {/* Left Column: Details */}
                      <div className="flex-1 space-y-4 max-w-2xl">
                        <div className="flex items-center gap-3">
                          <div className={`-skew-x-12 inline-flex items-center px-4 py-1.5 border shadow-sm ${slide.badgeStyle}`}>
                            <span className="inline-block skew-x-12 text-xs font-mono font-bold tracking-widest uppercase">
                              {slide.tag}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-3xl sm:text-4xl md:text-5xl tracking-tight font-light text-white leading-snug">
                          {slide.title}
                        </h3>

                        <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                          {slide.summary}
                        </p>

                        <div className="pt-2">
                          <div className="inline-flex items-center gap-2 p-3 bg-white/5 rounded-xl border border-white/10 text-xs font-mono text-zinc-200">
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
                      <div className="w-full lg:w-[420px] xl:w-[480px] shrink-0 hidden sm:block">
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
                    <div className="relative z-10 flex justify-center items-center pt-6 mt-4 border-t border-white/10 w-full shrink-0">
                      <ParallelogramButton
                        href="/#contact"
                        variant={slide.buttonVariant}
                        className="py-3 px-10 text-sm sm:text-base shadow-xl"
                      >
                        {slide.ctaLabel}
                      </ParallelogramButton>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Play Your Role CTA ── */}
      <PlayYourRoleCTA />
    </div>
  );
}

