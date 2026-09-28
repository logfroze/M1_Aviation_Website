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

interface CardDynamics {
  translateY: number;
  scale: number;
  rotateX: number;
  shadowY: number;
  shadowBlur: number;
  shadowOpacity: number;
}

export default function OurLineup() {
  const trackRef = useRef<HTMLDivElement>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [vh, setVh] = useState(900);
  const dockedCards = useRef<Set<number>>(new Set());

  // Unlock AudioContext on any direct user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      getSharedAudioContext();
    };

    const events = ["click", "pointerdown", "mousedown", "touchstart", "keydown", "wheel", "scroll"];
    events.forEach((ev) => window.addEventListener(ev, handleUserInteraction, { passive: true }));

    return () => {
      events.forEach((ev) => window.removeEventListener(ev, handleUserInteraction));
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

  // Continuous 60fps/120fps fluid RAF loop with inertia & sound triggers
  useEffect(() => {
    let animId: number;

    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const totalDistance = rect.height - viewH;
      if (totalDistance <= 0) return;

      const rawProgress = -rect.top / totalDistance;
      targetProgressRef.current = Math.max(0, Math.min(1, rawProgress));
    };

    const updateLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.095;
      const p = currentProgressRef.current;
      setSmoothProgress(p);

      // Sound triggers on downward touchdown landing
      if (p >= 0.325 && !dockedCards.current.has(1)) {
        dockedCards.current.add(1);
        playSolidDockSound(1);
      }
      if (p >= 0.615 && !dockedCards.current.has(2)) {
        dockedCards.current.add(2);
        playSolidDockSound(2);
      }
      if (p >= 0.905 && !dockedCards.current.has(3)) {
        dockedCards.current.add(3);
        playSolidDockSound(3);
      }

      // Hysteresis re-arm when scrolling backward
      if (p < 0.26) dockedCards.current.delete(1);
      if (p < 0.55) dockedCards.current.delete(2);
      if (p < 0.84) dockedCards.current.delete(3);

      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Helper to compute card dynamics: Approach -> Uplift -> Cushion Landing
  const getCardDynamics = (index: number): CardDynamics => {
    const p = smoothProgress;

    // Card 0: Resting base card with micro-compression when Card 1 lands
    if (index === 0) {
      let cushion = 0;
      let scale = 1.0;
      if (p >= 0.27 && p <= 0.35) {
        const norm = (p - 0.27) / 0.08;
        cushion = Math.sin(norm * Math.PI) * 2.5;
        scale = 1.0 - 0.003 * Math.sin(norm * Math.PI);
      }
      return {
        translateY: cushion,
        scale,
        rotateX: 0,
        shadowY: 16,
        shadowBlur: 38,
        shadowOpacity: 0.60,
      };
    }

    let pStart = 0;
    let pEnd = 0;

    if (index === 1) {
      pStart = 0.05;
      pEnd = 0.33;
    } else if (index === 2) {
      pStart = 0.34;
      pEnd = 0.62;
    } else if (index === 3) {
      pStart = 0.63;
      pEnd = 0.91;
    }

    // Card hasn't entered yet
    if (p <= pStart) {
      return {
        translateY: vh + 80,
        scale: 0.98,
        rotateX: -2.5,
        shadowY: 12,
        shadowBlur: 24,
        shadowOpacity: 0.35,
      };
    }

    // Card has docked
    if (p >= pEnd) {
      // Cushion compression when the next card lands on this card
      let cushion = 0;
      let scale = 1.0;
      const nextLandStart = index === 1 ? 0.56 : index === 2 ? 0.85 : 999;
      const nextLandEnd = nextLandStart + 0.08;

      if (p >= nextLandStart && p <= nextLandEnd) {
        const norm = (p - nextLandStart) / 0.08;
        cushion = Math.sin(norm * Math.PI) * 2.5;
        scale = 1.0 - 0.003 * Math.sin(norm * Math.PI);
      }

      return {
        translateY: cushion,
        scale,
        rotateX: 0,
        shadowY: 18 + index * 6,
        shadowBlur: 40 + index * 8,
        shadowOpacity: 0.68 + index * 0.08,
      };
    }

    // Card in transit: Approach -> Uplift -> Land
    const t = (p - pStart) / (pEnd - pStart);

    if (t < 0.74) {
      // 1. Approach phase: Glides smoothly upward from bottom
      const normT = t / 0.74;
      const eased = 1 - Math.pow(1 - normT, 2.8);
      const translateY = (1 - eased) * vh;
      const scale = 0.98 + 0.035 * normT;
      const rotateX = -2.5 * (1 - normT);

      return {
        translateY,
        scale,
        rotateX,
        shadowY: 16 + 10 * normT,
        shadowBlur: 30 + 15 * normT,
        shadowOpacity: 0.50 + 0.25 * normT,
      };
    } else {
      // 2. Uplift & Cushion-Landing phase: Lifts gently above card below, then lands flush
      const landT = (t - 0.74) / 0.26; // 0 to 1
      const uplift = -18 * Math.sin(landT * Math.PI);
      const scale = 1.0 + 0.016 * Math.sin(landT * Math.PI);
      const rotateX = -0.7 * Math.sin(landT * Math.PI);

      return {
        translateY: uplift,
        scale,
        rotateX,
        shadowY: 22 + 16 * Math.sin(landT * Math.PI),
        shadowBlur: 42 + 20 * Math.sin(landT * Math.PI),
        shadowOpacity: 0.72 + 0.20 * Math.sin(landT * Math.PI),
      };
    }
  };

  return (
    // Outer scroll runway (280vh for smooth, natural docking intervals)
    <div
      ref={trackRef}
      className="relative w-full"
      style={{ height: "280vh" }}
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
        <div
          className="relative w-full max-w-5xl h-[490px] sm:h-[510px] md:h-[520px]"
          style={{ perspective: "1200px" }}
        >
          {PRODUCTS.map((prod, index) => {
            const cardTop = index * TAB_OFFSET_PX;
            const dyn = getCardDynamics(index);

            return (
              <div
                key={prod.id}
                className={`absolute left-0 right-0 rounded-3xl border pt-3 sm:pt-3.5 px-6 sm:px-8 md:px-10 pb-5 sm:pb-6 h-[460px] sm:h-[475px] md:h-[480px] flex flex-col justify-between will-change-transform ${prod.cardStyle}`}
                style={{
                  top: `${cardTop}px`,
                  zIndex: 10 + index,
                  transform: `translate3d(0, ${dyn.translateY}px, 0) scale(${dyn.scale}) rotateX(${dyn.rotateX}deg)`,
                  transformOrigin: "center top",
                  boxShadow: `0 -4px 18px rgba(0,0,0,0.5), 0 ${dyn.shadowY}px ${dyn.shadowBlur}px rgba(0,0,0,${dyn.shadowOpacity})`,
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
