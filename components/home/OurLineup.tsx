"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";
import ParallelogramButton from "@/components/ui/ParallelogramButton";

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
    tag: "Product 01",
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
      "bg-[#f0e4d0] border-[#b59f80] shadow-[0_30px_70px_rgba(0,0,0,0.55)]",
    badgeStyle: "bg-zinc-950 text-[#f1e6d4] border-zinc-800",
    titleColor: "text-zinc-950 font-normal",
    subtitleColor: "text-zinc-800",
    descColor: "text-zinc-800 font-normal",
    featureColor: "text-zinc-900 font-medium",
  },
  {
    id: "saios",
    tag: "Product 02",
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
      "bg-[#0f1826] border-[#294266] shadow-[0_30px_70px_rgba(0,0,0,0.7)]",
    badgeStyle: "bg-[#16273d] text-[#a3c9f7] border-[#294a73]",
    titleColor: "text-white font-light",
    subtitleColor: "text-[#9fc4f0]",
    descColor: "text-zinc-300",
    featureColor: "text-zinc-200",
  },
  {
    id: "avigram",
    tag: "Product 03",
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
      "bg-[#141221] border-[#362a52] shadow-[0_30px_70px_rgba(0,0,0,0.75)]",
    badgeStyle: "bg-[#251c3d] text-[#d8b4fe] border-[#4f3875]",
    titleColor: "text-white font-light",
    subtitleColor: "text-[#c084fc]",
    descColor: "text-zinc-300",
    featureColor: "text-zinc-200",
  },
  {
    id: "ecosystem",
    tag: "Ecosystem",
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
    ctaVariant: "gold",
    cardStyle:
      "bg-[#1e2127] border-[#5e6675] shadow-[0_35px_80px_rgba(0,0,0,0.85)]",
    badgeStyle: "bg-zinc-800 text-zinc-100 border-zinc-600",
    titleColor: "text-white font-light",
    subtitleColor: "text-zinc-300",
    descColor: "text-zinc-300",
    featureColor: "text-zinc-200",
  },
];

export default function OurLineup() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastActiveIndex = useRef<number>(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const finaleRef = useRef<HTMLDivElement>(null);
  const [finaleProgress, setFinaleProgress] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize or resume AudioContext
  const getAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  }, []);

  // Prominent Xbox Boot Sound Effect synthesis
  const playXboxBootSound = useCallback(
    (cardIndex: number) => {
      try {
        const ctx = getAudioContext();
        if (!ctx) return;

        const now = ctx.currentTime;

        const comp = ctx.createDynamicsCompressor();
        comp.threshold.setValueAtTime(-18, now);
        comp.knee.setValueAtTime(24, now);
        comp.ratio.setValueAtTime(8, now);
        comp.attack.setValueAtTime(0.003, now);
        comp.release.setValueAtTime(0.25, now);
        comp.connect(ctx.destination);

        // Sub-bass impact swell
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        const subFilter = ctx.createBiquadFilter();

        subOsc.type = "sawtooth";
        const rootFreq = cardIndex === 0 ? 55 : cardIndex === 1 ? 65.4 : cardIndex === 2 ? 73.4 : 82.4;
        subOsc.frequency.setValueAtTime(rootFreq * 0.8, now);
        subOsc.frequency.exponentialRampToValueAtTime(rootFreq * 1.5, now + 0.35);

        subFilter.type = "lowpass";
        subFilter.frequency.setValueAtTime(140, now);
        subFilter.frequency.exponentialRampToValueAtTime(320, now + 0.25);
        subFilter.frequency.exponentialRampToValueAtTime(80, now + 0.7);

        subGain.gain.setValueAtTime(0.001, now);
        subGain.gain.linearRampToValueAtTime(0.35, now + 0.08);
        subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

        subOsc.connect(subFilter);
        subFilter.connect(subGain);
        subGain.connect(comp);

        subOsc.start(now);
        subOsc.stop(now + 0.86);

        // Harmonic celestial chord
        const chordPitches = [
          [220, 277.18, 329.63, 440, 659.25],
          [261.63, 329.63, 392, 523.25, 783.99],
          [293.66, 369.99, 440, 587.33, 880],
          [329.63, 415.30, 493.88, 659.25, 987.77],
        ][cardIndex % 4];

        chordPitches.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = idx % 2 === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq * 0.98, now + 0.05);
          osc.frequency.exponentialRampToValueAtTime(freq, now + 0.2);

          filter.type = "bandpass";
          filter.frequency.setValueAtTime(freq, now);
          filter.Q.setValueAtTime(3.5, now);

          const peakGain = 0.09 / (idx * 0.25 + 1);
          gain.gain.setValueAtTime(0.0001, now + 0.04);
          gain.gain.linearRampToValueAtTime(peakGain, now + 0.14);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(comp);

          osc.start(now + 0.04);
          osc.stop(now + 0.96);
        });

        // Shimmering sparkle
        const shimmer = ctx.createOscillator();
        const shimmerGain = ctx.createGain();
        shimmer.type = "sine";
        shimmer.frequency.setValueAtTime(1320, now + 0.1);
        shimmer.frequency.exponentialRampToValueAtTime(1760, now + 0.35);

        shimmerGain.gain.setValueAtTime(0.0001, now + 0.1);
        shimmerGain.gain.linearRampToValueAtTime(0.045, now + 0.2);
        shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

        shimmer.connect(shimmerGain);
        shimmerGain.connect(comp);

        shimmer.start(now + 0.1);
        shimmer.stop(now + 0.66);
      } catch {
        // Fallback gracefully
      }
    },
    [getAudioContext]
  );

  // Resume audio on first user touch/scroll/click
  useEffect(() => {
    const handleFirstUserInteraction = () => {
      getAudioContext();
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
  }, [getAudioContext]);

  // Card Stacking & Blurring Sequence
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const vh = window.innerHeight;
          const baseSticky = 70;
          const stepOffset = 30;

          let activeIdx = 0;

          cardRefs.current.forEach((el, i) => {
            if (!el) return;
            const targetStickyTop = baseSticky + i * stepOffset;
            const nextEl = cardRefs.current[i + 1];

            if (nextEl) {
              const nextTargetSticky = baseSticky + (i + 1) * stepOffset;
              const nextRect = nextEl.getBoundingClientRect();
              
              const distToLanding = nextRect.top - nextTargetSticky;
              const transitionDistance = vh * 0.45;

              if (distToLanding < transitionDistance) {
                const progress = Math.min(1, Math.max(0, 1 - distToLanding / transitionDistance));
                const blurPx = (progress * 7).toFixed(1);
                const brightness = (1 - progress * 0.35).toFixed(2);
                const scale = (1.0 - progress * 0.025).toFixed(3);

                el.style.filter = `blur(${blurPx}px) brightness(${brightness})`;
                el.style.transform = `scale(${scale})`;

                if (distToLanding <= 20) {
                  activeIdx = i + 1;
                }
              } else {
                el.style.filter = "none";
                el.style.transform = "scale(1)";
              }
            } else {
              el.style.filter = "none";
              el.style.transform = "scale(1)";
              const rect = el.getBoundingClientRect();
              if (rect.top <= targetStickyTop + 40) {
                activeIdx = PRODUCTS.length - 1;
              }
            }
          });

          if (activeIdx !== lastActiveIndex.current) {
            lastActiveIndex.current = activeIdx;
            playXboxBootSound(activeIdx);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [playXboxBootSound]);

  // Finale deck progress
  useEffect(() => {
    const handleFinaleScroll = () => {
      if (!finaleRef.current) return;
      const rect = finaleRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = 1 - rect.top / vh;
      setFinaleProgress(Math.min(1, Math.max(0, raw)));
    };
    window.addEventListener("scroll", handleFinaleScroll, { passive: true });
    handleFinaleScroll();
    return () => window.removeEventListener("scroll", handleFinaleScroll);
  }, []);

  // Symmetrical fan angles and offsets for 4 cards (equal size, exact symmetry)
  const deckTransforms = [
    // Card 0 (Marketplace) — left outer
    { rotate: -9, translateX: -180, translateY: 10, scale: 1, zIndex: 10 },
    // Card 1 (SAIOS) — left inner
    { rotate: -3, translateX: -60,  translateY: 0,  scale: 1, zIndex: 11 },
    // Card 2 (AviGram) — right inner
    { rotate: 3,  translateX: 60,   translateY: 0,  scale: 1, zIndex: 12 },
    // Card 3 (Ecosystem) — right outer
    { rotate: 9,  translateX: 180,  translateY: 10, scale: 1, zIndex: 13 },
  ];

  return (
    <div ref={sectionRef} className="relative">
      <section className="relative pt-24 pb-12 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white mt-2">
            Our Lineup
          </h2>
          <p className="text-xs sm:text-sm font-mono tracking-[0.25em] uppercase text-zinc-500 mt-3">
            Aviation Operating Technology Stack
          </p>
        </div>

        {/* Stacked Cards */}
        <div className="relative space-y-24">
          {PRODUCTS.map((prod, index) => {
            const stickyTopPx = 70 + index * 30;
            return (
              <div
                key={prod.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`sticky rounded-3xl border p-6 sm:p-10 md:p-12 lg:p-14 min-h-[460px] sm:min-h-[500px] transition-[filter,transform] duration-200 ease-out origin-top will-change-transform flex flex-col justify-between ${prod.cardStyle}`}
                style={{ top: `${stickyTopPx}px`, zIndex: index + 10 }}
              >
                {/* Two Column Layout: Text on Left, AI-Generated Image Showcase on Right */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                  <div className="flex-1 space-y-4 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <div className={`-skew-x-12 inline-flex items-center px-4 py-1.5 border shadow-sm ${prod.badgeStyle}`}>
                        <span className="inline-block skew-x-12 text-xs font-mono font-bold tracking-widest uppercase">
                          {prod.tag}
                        </span>
                      </div>
                    </div>
                    <h3 className={`text-3xl sm:text-4xl md:text-5xl tracking-tight ${prod.titleColor}`}>
                      {prod.title}
                    </h3>
                    <h4 className={`text-sm sm:text-base font-mono tracking-wide ${prod.subtitleColor}`}>
                      {prod.subtitle}
                    </h4>
                    <p className={`text-sm sm:text-base leading-relaxed ${prod.descColor}`}>
                      {prod.description}
                    </p>
                    <div className="pt-2">
                      <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-mono ${prod.featureColor}`}>
                        {prod.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-base opacity-75">›</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* AI Generated Product Showcase Image on the Right */}
                  <div className="w-full lg:w-[380px] xl:w-[440px] shrink-0">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                      <Image
                        src={prod.imageSrc}
                        alt={prod.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 440px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Bottom Center: Centered CTA button across all cards */}
                <div className="flex justify-center items-center pt-8 mt-6 border-t border-black/10 dark:border-white/10 w-full">
                  <ParallelogramButton
                    href={prod.ctaHref}
                    isExternal={prod.isExternal}
                    variant={prod.ctaVariant}
                    className="py-4 px-10 text-sm sm:text-base shadow-xl"
                  >
                    {prod.ctaLabel}
                  </ParallelogramButton>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FINALE DECK ZONE ────────────────────────────────────────────────
           Cards animate into a symmetrically fanned deck of equal size,
           flanked by atmospheric black smoke blur overlays. */}
      <div ref={finaleRef} className="relative" style={{ height: "160vh" }}>
        {/* Sticky viewport that holds the deck */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Dark vignette background */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 55%, rgba(255,255,255,0.06) 0%, transparent 65%)",
            }}
          />

          {/* ── Left Atmospheric Black Smoke / Side Blur Overlay ── */}
          <div
            className="absolute inset-y-0 left-0 w-32 sm:w-56 md:w-80 pointer-events-none z-20 flex items-center justify-start overflow-hidden transition-opacity duration-700"
            style={{ opacity: finaleProgress > 0.08 ? Math.min((finaleProgress - 0.08) / 0.3, 1) : 0 }}
          >
            {/* Smooth gradient transition fading inward */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent backdrop-blur-md" />
            {/* Volumetric black smoke blur blobs */}
            <div className="absolute -left-24 top-1/2 -translate-y-1/2 w-80 h-96 rounded-full bg-black blur-3xl opacity-90" />
            <div className="absolute -left-12 top-1/4 w-64 h-64 rounded-full bg-zinc-950 blur-2xl opacity-80" />
            <div className="absolute -left-16 bottom-1/4 w-72 h-72 rounded-full bg-black blur-3xl opacity-90" />
          </div>

          {/* ── Right Atmospheric Black Smoke / Side Blur Overlay ── */}
          <div
            className="absolute inset-y-0 right-0 w-32 sm:w-56 md:w-80 pointer-events-none z-20 flex items-center justify-end overflow-hidden transition-opacity duration-700"
            style={{ opacity: finaleProgress > 0.08 ? Math.min((finaleProgress - 0.08) / 0.3, 1) : 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-black via-black/90 to-transparent backdrop-blur-md" />
            <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-80 h-96 rounded-full bg-black blur-3xl opacity-90" />
            <div className="absolute -right-12 top-1/4 w-64 h-64 rounded-full bg-zinc-950 blur-2xl opacity-80" />
            <div className="absolute -right-16 bottom-1/4 w-72 h-72 rounded-full bg-black blur-3xl opacity-90" />
          </div>

          {/* Section Heading — Removed the word 'Products' */}
          <div
            className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-30"
            style={{
              opacity: finaleProgress > 0.15 ? Math.min((finaleProgress - 0.15) / 0.35, 1) : 0,
              transform: `translateY(${Math.max(0, (1 - finaleProgress) * 20)}px)`,
              transition: "opacity 0.3s ease",
            }}
          >
            <p className="text-[11px] font-mono tracking-[0.35em] uppercase text-zinc-500">
              The Full Stack
            </p>
            <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white mt-1">
              One Unified Ecosystem.
            </h3>
          </div>

          {/* Symmetrical fanned deck with identical card dimensions */}
          <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1400px" }}>
            {PRODUCTS.map((prod, index) => {
              const t = deckTransforms[index];
              const fp = Math.min(finaleProgress / 0.85, 1);
              const ease = 1 - Math.pow(1 - fp, 2.5);

              const rotate = t.rotate * ease;
              const tx = t.translateX * ease;
              const ty = t.translateY * ease;
              const sc = 1 - (1 - t.scale) * ease;

              return (
                <div
                  key={prod.id}
                  className={`absolute rounded-2xl border p-6 sm:p-7 w-[82vw] max-w-[460px] h-[320px] sm:h-[340px] flex flex-col justify-between shadow-2xl overflow-hidden ${prod.cardStyle}`}
                  style={{
                    zIndex: t.zIndex,
                    transform: `translateX(${tx}px) translateY(${ty}px) rotate(${rotate}deg) scale(${sc})`,
                    transition: "transform 0.08s linear",
                    willChange: "transform",
                    transformOrigin: "center bottom",
                  }}
                >
                  <div>
                    <div className={`-skew-x-12 inline-flex items-center px-3.5 py-1 mb-3.5 border text-[10px] font-mono font-bold tracking-widest uppercase ${prod.badgeStyle}`}>
                      <span className="skew-x-12">{prod.tag}</span>
                    </div>
                    <h3 className={`text-2xl sm:text-3xl tracking-tight ${prod.titleColor}`}>{prod.title}</h3>
                    <p className={`text-xs sm:text-sm mt-1.5 font-mono ${prod.subtitleColor}`}>{prod.subtitle}</p>
                  </div>
                  <div className="pt-3 border-t border-black/10 dark:border-white/10">
                    <ul className={`space-y-1.5 text-xs font-mono ${prod.featureColor} opacity-80`}>
                      {prod.features.slice(0, 2).map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="opacity-75">›</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll hint */}
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 text-zinc-600 text-[10px] font-mono tracking-widest uppercase"
            style={{ opacity: Math.max(0, 1 - finaleProgress * 3) }}
          >
            Scroll to continue
          </div>
        </div>
      </div>
    </div>
  );
}
