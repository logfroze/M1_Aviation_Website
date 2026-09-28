"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ParallelogramButton from "@/components/ui/ParallelogramButton";
import { playSolidDockSound, getSharedAudioContext } from "@/lib/audio";

interface ProductCard {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  imageSrc: string;
  ctaLabel: string;
  ctaHref: string;
  isExternal?: boolean;
  ctaVariant: "white" | "silver" | "gold";
  cardStyle: string;
  badgeStyle: string;
  titleColor: string;
  subtitleColor: string;
  descColor: string;
  featureColor: string;
}

const PRODUCTS: ProductCard[] = [
  {
    id: "marketplace",
    tag: "PRODUCT 01",
    title: "Marketplace",
    subtitle: "Global Aircraft Trading Platform",
    description:
      "High-liquidity digital exchange indexing verified commercial and private aircraft with instant escrow and valuation telemetry.",
    features: [
      "5,000+ Curated Aircraft Profiles",
      "Cryptographic Airframe Verification",
      "Instant Escrow & Settlement",
    ],
    imageSrc: "/images/marketplace-card.jpg",
    ctaLabel: "Sign Up",
    ctaHref: "https://app.m-1.tech",
    isExternal: true,
    ctaVariant: "white",
    cardStyle:
      "bg-[#f0e4d0] border-[#b59f80]",
    badgeStyle: "bg-zinc-950 text-[#f1e6d4] border-zinc-800",
    titleColor: "text-zinc-950 font-normal",
    subtitleColor: "text-zinc-800",
    descColor: "text-zinc-800 font-normal",
    featureColor: "text-zinc-900 font-medium",
  },
  {
    id: "saios",
    tag: "PRODUCT 02",
    title: "SAIOS",
    subtitle: "Super Artificially Intelligent Operating System",
    description:
      "Premier neural flight deck and fleet management system automating predictive airframe diagnostics, dispatch, and airworthiness tracking.",
    features: [
      "Real-time Predictive Airframe Telemetry",
      "Autonomous Dispatch & Scheduling",
      "Unified Digital Logbook & Passport",
    ],
    imageSrc: "/images/saios-card.jpg",
    ctaLabel: "Register",
    ctaHref: "/saios",
    ctaVariant: "silver",
    cardStyle:
      "bg-[#0f1826] border-[#294266]",
    badgeStyle: "bg-[#16273d] text-[#a3c9f7] border-[#294a73]",
    titleColor: "text-white font-light",
    subtitleColor: "text-[#9fc4f0]",
    descColor: "text-zinc-300",
    featureColor: "text-zinc-200",
  },
  {
    id: "avigram",
    tag: "PRODUCT 03",
    title: "AviGram",
    subtitle: "The Premier Aviation Social Network",
    description:
      "The dedicated visual community connecting pilots, aerospace engineers, aircraft owners, and aviation enthusiasts across the globe.",
    features: [
      "Cockpit & Hangar Visual Feeds",
      "Verified Aviator & Fleet Profiles",
      "Global Aero Community Dispatch",
    ],
    imageSrc: "/images/avigram-card.jpg",
    ctaLabel: "Explore AviGram",
    ctaHref: "https://www.instagram.com",
    isExternal: true,
    ctaVariant: "silver",
    cardStyle:
      "bg-[#141221] border-[#362a52]",
    badgeStyle: "bg-[#251c3d] text-[#d8b4fe] border-[#4f3875]",
    titleColor: "text-white font-light",
    subtitleColor: "text-[#c084fc]",
    descColor: "text-zinc-300",
    featureColor: "text-zinc-200",
  },
  {
    id: "ecosystem",
    tag: "ECOSYSTEM",
    title: "Ecosystem",
    subtitle: "Unified Aviation Infrastructure Alliance",
    description:
      "Compounding synergy bridging aircraft operators, MROs, and suppliers into one continuous real-time operating fabric.",
    features: [
      "OEM & Operator Alliance Protocol",
      "Direct Priority Maintenance Channels",
      "Integrated Aviation Times Media Hub",
    ],
    imageSrc: "/images/ecosystem-card.jpg",
    ctaLabel: "Become Part of the Vision",
    ctaHref: "/industry-partner",
    ctaVariant: "silver",
    cardStyle:
      "bg-[#1e2127] border-[#5e6675]",
    badgeStyle: "bg-zinc-800 text-zinc-100 border-zinc-600",
    titleColor: "text-white font-light",
    subtitleColor: "text-zinc-300",
    descColor: "text-zinc-300",
    featureColor: "text-zinc-200",
  },
];

// Tab spacing for each stacked card in pixels (matching Cards stacking reference.png)
const TAB_OFFSET_PX = 42;

export default function OurLineup() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [vh, setVh] = useState(900);
  const lastActiveIndex = useRef<number>(-1);

  // Resume audio on first user interaction
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

  // Update viewport height
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

          // Card landing phases
          // Phase 1 (Card 1 docks): ~0.36
          // Phase 2 (Card 2 docks): ~0.62
          // Phase 3 (Card 3 docks): ~0.88
          let currentActive = 0;
          if (p >= 0.86) {
            currentActive = 3;
          } else if (p >= 0.60) {
            currentActive = 2;
          } else if (p >= 0.34) {
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

  // Helper to compute card translateY based on scroll progress
  // Card 0: always translateY = 0
  // Card 1: slides up between p=0.10 and p=0.36
  // Card 2: slides up between p=0.36 and p=0.62
  // Card 3: slides up between p=0.62 and p=0.88
  // Between p=0.88 and 1.00: All 4 cards stay docked together in final stacked state
  const getCardTransform = (index: number) => {
    if (index === 0) return 0;

    let pStart = 0;
    let pEnd = 0;

    if (index === 1) {
      pStart = 0.10;
      pEnd = 0.36;
    } else if (index === 2) {
      pStart = 0.36;
      pEnd = 0.62;
    } else if (index === 3) {
      pStart = 0.62;
      pEnd = 0.88;
    }

    if (scrollProgress <= pStart) {
      return vh;
    }
    if (scrollProgress >= pEnd) {
      return 0;
    }

    const t = (scrollProgress - pStart) / (pEnd - pStart);
    // Smooth ease-out cubic
    const eased = 1 - Math.pow(1 - t, 2.5);
    return (1 - eased) * vh;
  };

  return (
    // Outer scroll runway (260vh for smooth, natural docking intervals)
    <div
      ref={trackRef}
      className="relative w-full"
      style={{ height: "260vh" }}
    >
      {/* Sticky Viewport Stage: Pinned in view while the runway scrolls */}
      <div className="sticky top-12 sm:top-14 w-full flex flex-col items-center justify-start overflow-visible pt-2 px-3 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-5 sm:mb-7 shrink-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
            Our Lineup
          </h2>
          <p className="text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-zinc-500 mt-1.5">
            Aviation Operating Technology Stack
          </p>
        </div>

        {/* Stack Stage: Holds all 4 cards in an absolute stack with millimeter-equal tab reveals */}
        <div className="relative w-full max-w-5xl h-[490px] sm:h-[510px] md:h-[520px]">
          {PRODUCTS.map((prod, index) => {
            const cardTop = index * TAB_OFFSET_PX;
            const translateY = getCardTransform(index);

            return (
              <div
                key={prod.id}
                className={`absolute left-0 right-0 rounded-3xl border pt-3 sm:pt-3.5 px-6 sm:px-8 md:px-10 pb-5 sm:pb-6 h-[460px] sm:h-[475px] md:h-[480px] flex flex-col justify-between will-change-transform ${prod.cardStyle}`}
                style={{
                  top: `${cardTop}px`,
                  zIndex: 10 + index,
                  transform: `translateY(${translateY}px) translateZ(0)`,
                  boxShadow: `0 -4px 18px rgba(0,0,0,0.5), 0 ${16 + index * 6}px ${40 + index * 8}px rgba(0,0,0,${0.65 + index * 0.08})`,
                }}
              >
                {/* Two Column Layout: Text on Left, Product Image on Right */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10">
                  <div className="flex-1 space-y-3 max-w-2xl">
                    {/* Badge Tab (Header Bar) */}
                    <div className="flex items-center gap-3">
                      <div className={`-skew-x-12 inline-flex items-center px-3.5 py-1 border shadow-sm ${prod.badgeStyle}`}>
                        <span className="inline-block skew-x-12 text-[11px] font-mono font-bold tracking-widest uppercase">
                          {prod.tag}
                        </span>
                      </div>
                    </div>

                    <h3 className={`text-2xl sm:text-3xl md:text-4xl tracking-tight leading-tight ${prod.titleColor}`}>
                      {prod.title}
                    </h3>

                    <h4 className={`text-xs sm:text-sm font-mono tracking-wide ${prod.subtitleColor}`}>
                      {prod.subtitle}
                    </h4>

                    <p className={`text-xs sm:text-sm leading-relaxed ${prod.descColor}`}>
                      {prod.description}
                    </p>

                    <div className="pt-1">
                      <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono ${prod.featureColor}`}>
                        {prod.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-sm opacity-75">›</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Product Showcase Image on Right */}
                  <div className="w-full lg:w-[330px] xl:w-[370px] shrink-0 hidden sm:block">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                      <Image
                        src={prod.imageSrc}
                        alt={prod.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 370px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Bottom Center: Centered CTA button across all cards */}
                <div className="flex justify-center items-center pt-3 border-t border-black/10 dark:border-white/10 w-full shrink-0">
                  <ParallelogramButton
                    href={prod.ctaHref}
                    isExternal={prod.isExternal}
                    variant={prod.ctaVariant}
                    className="py-2.5 px-8 text-xs sm:text-sm shadow-xl"
                  >
                    {prod.ctaLabel}
                  </ParallelogramButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
