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
    tag: "Product 1",
    title: "M1 Marketplace",
    subtitle: "Acquisition of aircraft made efficient and transparent.",
    description: "Acquisition of aircraft made efficient and transparent.",
    features: [
      "7 Step assisted acquisition.",
      "Market Intelligence",
      "Verified Listings.",
      "Off-Market Industry Partners Circle",
    ],
    cardStyle: "bg-[linear-gradient(135deg,#ffffff_0%,#f1f5f9_16%,#cbd5e1_34%,#e2e8f0_50%,#f6efe5_66%,#cbd5e1_82%,#94a3b8_100%)] border-slate-300 shadow-[inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(148,163,184,0.35)]",
    badgeStyle: "bg-zinc-950 text-[#f1e6d4] border-zinc-800",
    titleColor: "text-zinc-950 font-medium",
    subtitleColor: "text-zinc-800 font-mono text-xs",
    descColor: "text-black text-xs font-medium",
    featureColor: "text-black font-mono text-[11px] font-medium",
  },
  {
    id: "saios",
    tag: "Product 2",
    title: "SIOS",
    subtitle: "All aviation operations under one ecosystem/",
    description: "All aviation operations under one ecosystem/",
    features: [
      "75+ tools, all integrated.",
      "Efficient MRO and Automated Scheduling",
      "Predictive maintenance",
      "Multidomain data connectivity.",
    ],
    cardStyle: "bg-[linear-gradient(135deg,#020d20_0%,#082048_18%,#12438c_36%,#38bdf8_50%,#93c5fd_62%,#1d4ed8_78%,#04122b_100%)] border-sky-400/70 shadow-[inset_0_2px_4px_rgba(56,189,248,0.6),inset_0_-2px_4px_rgba(29,78,216,0.35)]",
    badgeStyle: "bg-[#09224f] text-[#38bdf8] border-[#0284c7]/70",
    titleColor: "text-white font-light",
    subtitleColor: "text-[#38bdf8] font-mono text-xs",
    descColor: "text-blue-50/90 text-xs font-normal",
    featureColor: "text-white font-mono text-[11px] font-medium",
  },
  {
    id: "avigram",
    tag: "Product 3",
    title: "AviGram",
    subtitle: "Instagram but for aviation people.",
    description: "Instagram but for aviation people.",
    features: [
      "Interconnected with multiple marketplaces",
      "Features designed for aviation nerds specifically",
      "Aviation community brought togethere.",
      "Opportunity Scrolling: Gain knowledge and explore opportunities while scrolling.",
    ],
    cardStyle: "bg-[linear-gradient(135deg,#1c0529_0%,#3b0a4e_18%,#6d1369_35%,#c026d3_50%,#f472b6_64%,#9d174d_80%,#260433_100%)] border-pink-400/60 shadow-[inset_0_2px_4px_rgba(244,114,182,0.6),inset_0_-2px_4px_rgba(157,23,77,0.35)]",
    badgeStyle: "bg-[#380b42] text-[#f472b6] border-[#db2777]/60",
    titleColor: "text-white font-light",
    subtitleColor: "text-[#f472b6] font-mono text-xs",
    descColor: "text-zinc-200 text-xs font-normal",
    featureColor: "text-white font-mono text-[11px] font-medium",
  },
  {
    id: "ecosystem",
    tag: "Net Effect",
    title: "Ecosystem.",
    subtitle: "One unified ecosystem that handles everything from acquisition to daily operations.",
    description: "The compounding effect of M1 efforts will create an era of aviation where acquisition is fast because of data transparency, Daily operations are efficient and cost-effective because of data-based decisions, and AI handles your boring on-the-ground operations like record-keeping.",
    features: [
      "Fast Acquisition & Data Transparency",
      "Efficient & Cost-Effective Operations",
      "AI Handled Ground Record-Keeping",
    ],
    cardStyle: "bg-[linear-gradient(135deg,#13161c_0%,#1f242d_18%,#475569_36%,#cbd5e1_50%,#f1f5f9_62%,#64748b_78%,#1a1e24_100%)] border-slate-300/85 shadow-[inset_0_2px_4px_rgba(255,255,255,0.75),inset_0_-2px_4px_rgba(148,163,184,0.35)]",
    badgeStyle: "bg-zinc-800 text-zinc-100 border-zinc-600",
    titleColor: "text-white font-light",
    subtitleColor: "text-zinc-300 font-mono text-xs",
    descColor: "text-black text-xs font-medium",
    featureColor: "text-black font-mono text-[11px] font-medium",
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
      className="relative w-full pt-16 sm:pt-24 pb-24 sm:pb-32 bg-black select-none overflow-hidden"
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
                className={`absolute rounded-3xl border p-6 sm:p-8 w-[86vw] max-w-[440px] h-[340px] sm:h-[370px] flex flex-col justify-between shadow-[0_25px_65px_rgba(0,0,0,0.92)] cursor-pointer transition-all duration-300 ease-out will-change-transform overflow-hidden ${card.cardStyle}`}
                style={{
                  zIndex: zIdx,
                  transform: `translateX(${tx}px) translateY(${ty}px) rotate(${rotate}deg) scale(${sc})`,
                  transformOrigin: "center bottom",
                }}
              >
                {/* Diagonal Specular Silver Gloss Sheen */}
                <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(125deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.06)_25%,rgba(203,213,225,0.20)_46%,transparent_64%,rgba(255,255,255,0.14)_100%)] pointer-events-none" />

                <div className="relative z-10">
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
                <div className="relative z-10 pt-3 border-t border-black/20">
                  <ul className={`space-y-1.5 ${card.featureColor}`}>
                    {card.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="opacity-80 text-xs font-bold text-black">›</span>
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
