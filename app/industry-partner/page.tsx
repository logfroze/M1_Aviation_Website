"use client";

import React, { useRef, useEffect, useState } from "react";
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
    badgeStyle: "bg-zinc-900 text-zinc-100 border-zinc-700",
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

import { playSolidDockSound, getSharedAudioContext } from "@/lib/audio";

export default function IndustryPartnerPage() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastActiveIndex = useRef<number>(-1);

  const repeatedPartners = [
    ...PARTNERS_ROSTER,
    ...PARTNERS_ROSTER,
    ...PARTNERS_ROSTER,
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
      pStart = 0.12;
      pEnd = 0.42;
    } else if (index === 2) {
      pStart = 0.42;
      pEnd = 0.78;
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
      <section className="relative w-full min-h-[55vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06)_0%,_transparent_70%)] pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1 border border-zinc-800 bg-zinc-950/80 rounded-full">
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-400">
              Executive Alliance Network
            </span>
          </div>

          {/* Single-line text for Industry Partner (Requirement 8) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-white whitespace-nowrap">
            Industry Partner
          </h1>

          <div className="pt-2">
            <ParallelogramButton href="/#contact" variant="silver" className="text-xs px-10 py-4 shadow-xl">
              Apply
            </ParallelogramButton>
          </div>
        </div>

        {/* ── Partner Logo Carousel ── */}
        <div className="w-full max-w-6xl mt-16 pt-6 border-t border-zinc-800/80 relative overflow-hidden">
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

      {/* ── 2. Partner Engagement Showcase: 3 Separate Stacked Cards (Pinned Stage Pattern) ── */}
      <section className="w-full px-4 sm:px-6 md:px-12 my-8">
        <div ref={trackRef} className="relative w-full max-w-6xl mx-auto" style={{ height: "220vh" }}>
          <div className="sticky top-14 w-full flex flex-col items-center justify-start overflow-visible pt-2">
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
                    className={`absolute left-0 right-0 rounded-3xl border pt-3.5 sm:pt-4 px-6 sm:px-8 md:px-10 pb-6 sm:pb-8 h-[460px] md:h-[480px] flex flex-col justify-between will-change-transform ${slide.cardStyle}`}
                    style={{
                      top: `${cardTop}px`,
                      zIndex: index + 10,
                      transform: `translateY(${translateY}px) translateZ(0)`,
                      boxShadow: `0 -4px 18px rgba(0,0,0,0.5), 0 ${18 + index * 8}px ${45 + index * 10}px rgba(0,0,0,${0.55 + index * 0.08})`,
                    }}
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
                    <div className="flex justify-center items-center pt-6 mt-4 border-t border-white/10 w-full shrink-0">
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

