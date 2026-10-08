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
  ctaVariant: "white" | "silver" | "gold" | "black";
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
    tag: "Product 1",
    title: "M1 Marketplace",
    subtitle: "Acquisition of aircraft made efficient and transparent.",
    description:
      "Acquisition of aircraft made efficient and transparent.",
    features: [
      "7 Step assisted acquisition.",
      "Market Intelligence",
      "Verified Listings.",
      "Off-Market Industry Partners Circle",
    ],
    imageSrc: "/images/marketplace-card.jpg",
    ctaLabel: "Enter Marketplace",
    ctaHref: "https://app.m-1.tech",
    isExternal: true,
    ctaVariant: "black",
    cardStyle:
      "bg-[linear-gradient(135deg,#ffffff_0%,#f1f5f9_16%,#cbd5e1_34%,#e2e8f0_50%,#f6efe5_66%,#cbd5e1_82%,#94a3b8_100%)] border-slate-300 shadow-[inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(148,163,184,0.35)]",
    badgeStyle: "bg-zinc-950 text-[#f1e6d4] border-zinc-800",
    titleColor: "text-zinc-950 font-normal",
    subtitleColor: "text-zinc-800",
    descColor: "text-zinc-800 font-normal",
    featureColor: "text-zinc-900 font-medium",
  },
  {
    id: "saios",
    tag: "Product 2",
    title: "SIOS",
    subtitle: "All aviation operations under one ecosystem/",
    description:
      "All aviation operations under one ecosystem/",
    features: [
      "75+ tools, all integrated.",
      "Efficient MRO and Automated Scheduling",
      "Predictive maintenance",
      "Multidomain data connectivity.",
    ],
    imageSrc: "/images/saios-card.jpg",
    ctaLabel: "Explore SIOS",
    ctaHref: "/saios",
    ctaVariant: "white",
    cardStyle:
      "bg-[linear-gradient(135deg,#020d20_0%,#082048_18%,#12438c_36%,#38bdf8_50%,#93c5fd_62%,#1d4ed8_78%,#04122b_100%)] border-sky-400/70 shadow-[inset_0_2px_4px_rgba(56,189,248,0.6),inset_0_-2px_4px_rgba(29,78,216,0.35)]",
    badgeStyle: "bg-[#09224f] text-[#38bdf8] border-[#0284c7]/70",
    titleColor: "text-white font-light",
    subtitleColor: "text-[#38bdf8]",
    descColor: "text-blue-50/90",
    featureColor: "text-white",
  },
  {
    id: "avigram",
    tag: "Product 3",
    title: "AviGram",
    subtitle: "Instagram but for aviation people.",
    description:
      "Instagram but for aviation people.",
    features: [
      "Interconnected with multiple marketplaces",
      "Features designed for aviation nerds specifically",
      "Aviation community brought togethere.",
      "Opportunity Scrolling: Gain knowledge and explore opportunities while scrolling.",
    ],
    imageSrc: "/images/avigram-card.jpg",
    ctaLabel: "Pre-signup",
    ctaHref: "#avigram",
    isExternal: false,
    ctaVariant: "white",
    cardStyle:
      "bg-[linear-gradient(135deg,#1c0529_0%,#3b0a4e_18%,#6d1369_35%,#c026d3_50%,#f472b6_64%,#9d174d_80%,#260433_100%)] border-pink-400/60 shadow-[inset_0_2px_4px_rgba(244,114,182,0.6),inset_0_-2px_4px_rgba(157,23,77,0.35)]",
    badgeStyle: "bg-[#380b42] text-[#f472b6] border-[#db2777]/60",
    titleColor: "text-white font-light",
    subtitleColor: "text-[#f472b6]",
    descColor: "text-zinc-200",
    featureColor: "text-white",
  },
  {
    id: "ecosystem",
    tag: "Net Effect",
    title: "Ecosystem.",
    subtitle: "One unified ecosystem that handles everything from acquisition to daily operations.",
    description:
      "The compounding effect of M1 efforts will create an era of aviation where acquisition is fast because of data transparency, Daily operations are efficient and cost-effective because of data-based decisions, and AI handles your boring on-the-ground operations like record-keeping.",
    features: [
      "Fast Acquisition & Data Transparency",
      "Efficient & Cost-Effective Daily Operations",
      "AI Handled On-The-Ground Record-Keeping",
    ],
    imageSrc: "/images/ecosystem-card.jpg",
    ctaLabel: "Explore Ecosystem",
    ctaHref: "#philosophy",
    ctaVariant: "black",
    cardStyle:
      "bg-[linear-gradient(135deg,#13161c_0%,#1f242d_18%,#475569_36%,#cbd5e1_50%,#f1f5f9_62%,#64748b_78%,#1a1e24_100%)] border-slate-300/85 shadow-[inset_0_2px_4px_rgba(255,255,255,0.75),inset_0_-2px_4px_rgba(148,163,184,0.35)]",
    badgeStyle: "bg-zinc-800 text-zinc-100 border-zinc-600",
    titleColor: "text-white font-light",
    subtitleColor: "text-zinc-300",
    descColor: "text-zinc-200",
    featureColor: "text-white",
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
      if (p >= 0.275 && !dockedCards.current.has(1)) {
        dockedCards.current.add(1);
        playSolidDockSound(1);
      }
      if (p >= 0.525 && !dockedCards.current.has(2)) {
        dockedCards.current.add(2);
        playSolidDockSound(2);
      }
      if (p >= 0.775 && !dockedCards.current.has(3)) {
        dockedCards.current.add(3);
        playSolidDockSound(3);
      }

      // Hysteresis re-arm when scrolling backward
      if (p < 0.22) dockedCards.current.delete(1);
      if (p < 0.47) dockedCards.current.delete(2);
      if (p < 0.72) dockedCards.current.delete(3);

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
      if (p >= 0.23 && p <= 0.31) {
        const norm = (p - 0.23) / 0.08;
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
      pEnd = 0.28;
    } else if (index === 2) {
      pStart = 0.30;
      pEnd = 0.53;
    } else if (index === 3) {
      pStart = 0.55;
      pEnd = 0.78;
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
      const nextLandStart = index === 1 ? 0.48 : index === 2 ? 0.73 : 999;
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
    // Outer scroll runway (320vh for smooth, natural docking intervals and ample hold on Card 4)
    <div
      ref={trackRef}
      className="relative w-full"
      style={{ height: "320vh" }}
    >
      {/* Sticky Viewport Stage: Pinned in view while the runway scrolls */}
      <div className="sticky top-6 sm:top-8 w-full flex flex-col items-center justify-start overflow-visible pt-1 px-3 sm:px-6 pb-20 sm:pb-28">
        
        {/* Section Header */}
        <div className="text-center mb-4 sm:mb-6 shrink-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white">
            Our Lineup
          </h2>
          <p className="text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-zinc-500 mt-1.5">
            Aviation Operating Technology Stack
          </p>
        </div>

        {/* Stack Stage: Holds all 4 cards in an absolute stack with millimeter-equal tab reveals */}
        <div
          className="relative w-full max-w-5xl xl:max-w-6xl h-[600px] sm:h-[630px] md:h-[660px]"
          style={{ perspective: "1200px" }}
        >
          {PRODUCTS.map((prod, index) => {
            const cardTop = index * TAB_OFFSET_PX;
            const dyn = getCardDynamics(index);

            return (
              <div
                key={prod.id}
                className={`absolute left-0 right-0 rounded-3xl border pt-3 sm:pt-4 px-6 sm:px-8 md:px-10 pb-5 sm:pb-6 h-[480px] sm:h-[505px] md:h-[525px] flex flex-col justify-between will-change-transform ${prod.cardStyle}`}
                style={{
                  top: `${cardTop}px`,
                  zIndex: 10 + index,
                  transform: `translate3d(0, ${dyn.translateY}px, 0) scale(${dyn.scale}) rotateX(${dyn.rotateX}deg)`,
                  transformOrigin: "center top",
                  boxShadow: `0 -4px 18px rgba(0,0,0,0.5), 0 ${dyn.shadowY}px ${dyn.shadowBlur}px rgba(0,0,0,${dyn.shadowOpacity})`,
                }}
              >
                {/* Diagonal Specular Silver Gloss Sheen */}
                <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(125deg,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0.08)_24%,rgba(203,213,225,0.22)_46%,transparent_64%,rgba(255,255,255,0.16)_100%)] pointer-events-none" />

                {/* Two Column Layout: Text on Left, Product Image on Right */}
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 xl:gap-10">
                  <div className="flex-1 space-y-3 max-w-xl xl:max-w-2xl">
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

                  {/* Product Showcase Image on Right (Significantly Enlarged) */}
                  <div className="w-full sm:w-[350px] md:w-[400px] lg:w-[440px] xl:w-[490px] shrink-0 hidden sm:block">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.7)] group">
                      <Image
                        src={prod.imageSrc}
                        alt={prod.title}
                        fill
                        sizes="(max-width: 1024px) 440px, 490px"
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
