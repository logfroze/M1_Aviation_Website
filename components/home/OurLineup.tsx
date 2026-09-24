"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import ParallelogramButton from "@/components/ui/ParallelogramButton";

interface ProductCard {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
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
    subtitle: "Global Aircraft Trading & Intelligence Platform",
    description:
      "A high-liquidity digital marketplace indexing thousands of commercial and executive jets with verified maintenance records, verified ownership, and seamless transaction settlement.",
    features: [
      "5,000+ Curated Aircraft Profiles",
      "Cryptographic Airframe Verification",
      "Instant Escrow & Valuation Telemetry",
    ],
    ctaLabel: "Sign Up",
    ctaHref: "https://app.m-1.tech",
    isExternal: true,
    ctaVariant: "white",
    // Solid opaque beige base so text never shows through from behind
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
      "The world's premier neural flight deck and fleet management system. Powered by predictive maintenance diagnostics and automated FAA/EASA airworthiness tracking.",
    features: [
      "Real-time Predictive Airframe Telemetry",
      "Autonomous Dispatch & Scheduling Engine",
      "Unified Digital Logbook & Passport",
    ],
    ctaLabel: "Register",
    ctaHref: "/saios",
    ctaVariant: "silver",
    // Solid opaque dark navy base so Card 1 text never bleeds through
    cardStyle:
      "bg-[#0f1826] border-[#294266] shadow-[0_30px_70px_rgba(0,0,0,0.7)]",
    badgeStyle: "bg-[#16273d] text-[#a3c9f7] border-[#294a73]",
    titleColor: "text-white font-light",
    subtitleColor: "text-[#9fc4f0]",
    descColor: "text-zinc-300",
    featureColor: "text-zinc-200",
  },
  {
    id: "ecosystem",
    tag: "Product 03",
    title: "Ecosystem",
    subtitle: "Unified Aviation Infrastructure Alliance",
    description:
      "Bridging the disconnect between aircraft operators, maintenance repair organizations (MROs), and parts suppliers into one continuous real-time operating fabric.",
    features: [
      "OEM & Operator Alliance Protocol",
      "Direct Priority Maintenance Channels",
      "Integrated Aviation Times Media Hub",
    ],
    ctaLabel: "Become Part of the Vision",
    ctaHref: "/industry-partner",
    ctaVariant: "gold",
    // Solid opaque dark slate titanium base
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
  const [finaleProgress, setFinaleProgress] = useState(0); // 0..1
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
        const rootFreq = cardIndex === 0 ? 55 : cardIndex === 1 ? 65.4 : 73.4;
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
        ][cardIndex % 3];

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

  // Card Stacking & Blurring Sequence:
  // - Card 1 blurs when Card 2 comes forward
  // - Card 2 blurs when Card 3 comes forward
  // - Active top card is ALWAYS sharp, crisp, and unblurred!
  // - Uniform 34px step between Card 1, 2, and 3 so Card 3 lands smoothly on Card 2
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const vh = window.innerHeight;
          const baseSticky = 80;
          const stepOffset = 34; // Exact equal spacing between card tops

          let activeIdx = 0;

          cardRefs.current.forEach((el, i) => {
            if (!el) return;
            const targetStickyTop = baseSticky + i * stepOffset;
            const nextEl = cardRefs.current[i + 1];

            if (nextEl) {
              const nextTargetSticky = baseSticky + (i + 1) * stepOffset;
              const nextRect = nextEl.getBoundingClientRect();
              
              // Distance of next card from its resting sticky point
              const distToLanding = nextRect.top - nextTargetSticky;
              const transitionDistance = vh * 0.45;

              if (distToLanding < transitionDistance) {
                // Next card is coming forward: blur THIS card as next card takes the stage!
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
                // This card is currently in front and fully active
                el.style.filter = "none";
                el.style.transform = "scale(1)";
              }
            } else {
              // Last card (Card 3): always sharp and unblurred
              el.style.filter = "none";
              el.style.transform = "scale(1)";
              const rect = el.getBoundingClientRect();
              if (rect.top <= targetStickyTop + 40) {
                activeIdx = 2;
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

  // Finale deck progress: driven by the scroll spacer below the cards
  useEffect(() => {
    const handleFinaleScroll = () => {
      if (!finaleRef.current) return;
      const rect = finaleRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when top of spacer enters screen, 1 when bottom of spacer passes
      const raw = 1 - rect.top / vh;
      setFinaleProgress(Math.min(1, Math.max(0, raw)));
    };
    window.addEventListener("scroll", handleFinaleScroll, { passive: true });
    handleFinaleScroll();
    return () => window.removeEventListener("scroll", handleFinaleScroll);
  }, []);

  // Fan angles and offsets for the finale deck (3 cards)
  // Card 0 = bottom of deck (behind), Card 2 = top (front)
  const deckTransforms = [
    // Card 1 (Marketplace) — deepest, tilted left
    { rotate: -14, translateX: -220, translateY: -60, scale: 0.82, zIndex: 10 },
    // Card 2 (SAIOS) — middle
    { rotate: -5, translateX: -70, translateY: -30, scale: 0.9, zIndex: 11 },
    // Card 3 (Ecosystem) — front, slight right tilt
    { rotate: 3, translateX: 60, translateY: 0, scale: 0.96, zIndex: 12 },
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

        {/* Stacked Cards with Uniform 34px Stacking Step */}
        <div className="relative space-y-24">
          {PRODUCTS.map((prod, index) => {
            const stickyTopPx = 80 + index * 34;
            return (
              <div
                key={prod.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`sticky rounded-3xl border p-8 sm:p-12 md:p-16 lg:p-20 min-h-[460px] sm:min-h-[500px] md:min-h-[520px] transition-[filter,transform] duration-200 ease-out origin-top will-change-transform flex flex-col justify-between ${prod.cardStyle}`}
                style={{ top: `${stickyTopPx}px`, zIndex: index + 10 }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                  <div className="max-w-3xl space-y-5">
                    <div className="flex items-center gap-3">
                      <div className={`-skew-x-12 inline-flex items-center px-5 py-2 border shadow-sm ${prod.badgeStyle}`}>
                        <span className="inline-block skew-x-12 text-xs font-mono font-bold tracking-widest uppercase">
                          {prod.tag}
                        </span>
                      </div>
                    </div>
                    <h3 className={`text-4xl sm:text-5xl md:text-6xl tracking-tight ${prod.titleColor}`}>{prod.title}</h3>
                    <h4 className={`text-base sm:text-lg font-mono tracking-wide ${prod.subtitleColor}`}>{prod.subtitle}</h4>
                    <p className={`text-base sm:text-lg leading-relaxed pt-1 ${prod.descColor}`}>{prod.description}</p>
                    <div className="pt-4">
                      <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-mono ${prod.featureColor}`}>
                        {prod.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2.5">
                            <span className="text-base opacity-75">›</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-col items-start lg:items-end justify-center shrink-0 pt-6 lg:pt-0">
                    <ParallelogramButton
                      href={prod.ctaHref}
                      isExternal={prod.isExternal}
                      variant={prod.ctaVariant}
                      className="w-full sm:w-auto text-base py-5 px-10 shadow-xl"
                    >
                      {prod.ctaLabel}
                    </ParallelogramButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FINALE DECK ZONE ────────────────────────────────────────────────
           A tall scroll spacer. As user scrolls through it, the cards
           animate into a beautiful fanned deck visible above the fold. */}
      <div ref={finaleRef} className="relative" style={{ height: "160vh" }}>
        {/* Sticky viewport that holds the deck */}
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Dark vignette background */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.05) 0%, transparent 70%)",
            }}
          />

          {/* Label */}
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
              Three Products. One Ecosystem.
            </h3>
          </div>

          {/* The fanned deck */}
          <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1400px" }}>
            {PRODUCTS.map((prod, index) => {
              const t = deckTransforms[index];
              // Interpolate from neutral to final fan position using finaleProgress
              const fp = Math.min(finaleProgress / 0.85, 1);
              const ease = 1 - Math.pow(1 - fp, 2.5);

              const rotate = t.rotate * ease;
              const tx = t.translateX * ease;
              const ty = t.translateY * ease;
              const sc = 1 - (1 - t.scale) * ease;

              return (
                <div
                  key={prod.id}
                  className={`absolute rounded-2xl border p-6 sm:p-8 w-[72vw] max-w-[520px] min-h-[320px] sm:min-h-[360px] flex flex-col justify-between shadow-2xl ${prod.cardStyle}`}
                  style={{
                    zIndex: t.zIndex,
                    transform: `translateX(${tx}px) translateY(${ty}px) rotate(${rotate}deg) scale(${sc})`,
                    transition: "transform 0.08s linear",
                    willChange: "transform",
                    transformOrigin: "center bottom",
                  }}
                >
                  <div>
                    <div className={`-skew-x-12 inline-flex items-center px-3 py-1 mb-3 border text-[10px] font-mono font-bold tracking-widest uppercase ${prod.badgeStyle}`}>
                      <span className="skew-x-12">{prod.tag}</span>
                    </div>
                    <h3 className={`text-2xl sm:text-3xl tracking-tight ${prod.titleColor}`}>{prod.title}</h3>
                    <p className={`text-sm mt-2 ${prod.subtitleColor}`}>{prod.subtitle}</p>
                  </div>
                  <div className="pt-4">
                    <ul className={`space-y-1 text-xs font-mono ${prod.featureColor} opacity-75`}>
                      {prod.features.slice(0, 2).map((f, i) => (
                        <li key={i}>› {f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll hint — fades out as progress advances */}
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
