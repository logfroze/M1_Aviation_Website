"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface DeckCard {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  cardStyle: string;
  badgeStyle: string;
  titleColor: string;
  subtitleColor: string;
  descColor: string;
  featureColor: string;
}

const DECK_CARDS: DeckCard[] = [
  {
    id: "marketplace",
    tag: "PRODUCT 01",
    title: "Marketplace",
    subtitle: "Global Aircraft Trading & Escrow",
    description: "High-liquidity digital exchange indexing verified commercial and private aircraft with instant escrow telemetry.",
    features: ["5,000+ Curated Aircraft", "Cryptographic Airframe Verification", "Instant Settlement"],
    cardStyle: "bg-[#f0e4d0] border-[#b59f80] text-zinc-950",
    badgeStyle: "bg-zinc-950 text-[#f1e6d4] border-zinc-800",
    titleColor: "text-zinc-950 font-medium",
    subtitleColor: "text-zinc-800 font-mono text-xs",
    descColor: "text-zinc-700 text-xs",
    featureColor: "text-zinc-900 font-mono text-[11px]",
  },
  {
    id: "saios",
    tag: "PRODUCT 02",
    title: "SAIOS",
    subtitle: "Super Artificially Intelligent OS",
    description: "Premier neural flight deck and fleet management system automating predictive diagnostics and dispatch.",
    features: ["Real-time Predictive Telemetry", "Autonomous Dispatch", "Unified Digital Logbook"],
    cardStyle: "bg-[#0f1826] border-[#294266] text-white",
    badgeStyle: "bg-[#16273d] text-[#a3c9f7] border-[#294a73]",
    titleColor: "text-white font-light",
    subtitleColor: "text-[#9fc4f0] font-mono text-xs",
    descColor: "text-zinc-300 text-xs",
    featureColor: "text-zinc-200 font-mono text-[11px]",
  },
  {
    id: "avigram",
    tag: "PRODUCT 03",
    title: "AviGram",
    subtitle: "The Premier Aviation Social Network",
    description: "Dedicated visual network connecting pilots, aerospace engineers, and private jet owners across the globe.",
    features: ["Cockpit & Hangar Feeds", "Verified Aviator Profiles", "Global Aero Dispatch"],
    cardStyle: "bg-[#141221] border-[#362a52] text-white",
    badgeStyle: "bg-[#251c3d] text-[#d8b4fe] border-[#4f3875]",
    titleColor: "text-white font-light",
    subtitleColor: "text-[#c084fc] font-mono text-xs",
    descColor: "text-zinc-300 text-xs",
    featureColor: "text-zinc-200 font-mono text-[11px]",
  },
  {
    id: "ecosystem",
    tag: "ECOSYSTEM",
    title: "Ecosystem",
    subtitle: "Unified Aviation Alliance",
    description: "Compounding synergy bridging aircraft operators, MROs, and suppliers into one continuous real-time operating fabric.",
    features: ["OEM & Alliance Protocol", "Direct Priority Channels", "Aviation Times Media Hub"],
    cardStyle: "bg-[#1e2127] border-[#5e6675] text-white",
    badgeStyle: "bg-zinc-800 text-zinc-100 border-zinc-600",
    titleColor: "text-white font-light",
    subtitleColor: "text-zinc-300 font-mono text-xs",
    descColor: "text-zinc-300 text-xs",
    featureColor: "text-zinc-200 font-mono text-[11px]",
  },
];

export default function FullStackDeck() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalScroll = rect.height - vh;
      if (totalScroll <= 0) return;

      const raw = -rect.top / totalScroll;
      setScrollProgress(Math.min(1, Math.max(0, raw)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fanned deck transforms matching Image 1
  const deckTransforms = [
    // Card 0 (Marketplace) — tilted left
    { rotate: -13, translateX: -240, translateY: 22, scale: 0.95, zIndex: 10 },
    // Card 1 (SAIOS) — tilted slight left
    { rotate: -5, translateX: -80, translateY: 10, scale: 0.98, zIndex: 11 },
    // Card 2 (AviGram) — tilted slight right
    { rotate: 3, translateX: 80, translateY: 4, scale: 1.00, zIndex: 12 },
    // Card 3 (Ecosystem) — tilted right in front
    { rotate: 11, translateX: 240, translateY: 16, scale: 1.02, zIndex: 13 },
  ];

  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div
      ref={containerRef}
      aria-label="The Full Stack Ecosystem Showcase"
      className="relative w-full pt-10 sm:pt-14 pb-24 sm:pb-32 bg-black select-none overflow-hidden"
    >
      {/* Dark radial glow backdrop */}
      <div className="absolute inset-0 bg-black pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto flex flex-col items-center justify-center px-4">
        {/* Section Heading matching Image 1 */}
        <div className="relative z-30 text-center mb-10 sm:mb-14">
          <span className="text-[11px] font-mono tracking-[0.38em] uppercase text-zinc-500 font-semibold block mb-2">
            THE FULL STACK
          </span>
          <h3 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white">
            Four Products. One Ecosystem.
          </h3>
        </div>

        {/* Symmetrical fanned deck (matching Image 1 exactly) */}
        <div
          className="relative w-full max-w-5xl h-[420px] sm:h-[460px] flex items-center justify-center mb-6"
          style={{ perspective: "1500px" }}
        >
          {DECK_CARDS.map((card, index) => {
            const t = deckTransforms[index];
            const isHovered = hoveredCard === card.id;

            // Fanned out as in Image 1, responsive to scroll and hover
            const rotate = isHovered ? 0 : t.rotate;
            const tx = isHovered ? t.translateX * 1.08 : t.translateX;
            const ty = isHovered ? t.translateY - 24 : t.translateY;
            const sc = isHovered ? 1.05 : t.scale;
            const zIdx = isHovered ? 40 : t.zIndex;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`absolute rounded-3xl border p-6 sm:p-8 w-[86vw] max-w-[440px] h-[340px] sm:h-[370px] flex flex-col justify-between shadow-[0_25px_65px_rgba(0,0,0,0.92)] cursor-pointer transition-all duration-300 ease-out will-change-transform ${card.cardStyle}`}
                style={{
                  zIndex: zIdx,
                  transform: `translateX(${tx}px) translateY(${ty}px) rotate(${rotate}deg) scale(${sc})`,
                  transformOrigin: "center bottom",
                }}
              >
                <div>
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className={`-skew-x-12 inline-flex items-center px-3.5 py-1 border text-[10px] font-mono font-bold tracking-widest uppercase shadow-sm ${card.badgeStyle}`}>
                      <span className="skew-x-12">{card.tag}</span>
                    </div>

                    {/* Jet Cursor on Ecosystem Card (matching Image 1) */}
                    {card.id === "ecosystem" && (
                      <div className="flex items-center gap-1 opacity-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className={`text-2xl sm:text-3xl tracking-tight leading-tight ${card.titleColor}`}>
                    {card.title}
                  </h4>
                  <p className={`mt-1 font-mono ${card.subtitleColor}`}>
                    {card.subtitle}
                  </p>

                  {/* Short Description */}
                  <p className={`mt-3 leading-relaxed text-xs line-clamp-2 ${card.descColor}`}>
                    {card.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="pt-3 border-t border-black/10 dark:border-white/10">
                  <ul className={`space-y-1.5 ${card.featureColor}`}>
                    {card.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="opacity-60 text-xs">›</span>
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Subtext info */}
        {/* <p className="text-center text-zinc-500 font-mono text-[11px] tracking-widest uppercase mt-4">
          Hover to inspect platform architecture
        </p> */}
      </div>
    </div>
  );
}
