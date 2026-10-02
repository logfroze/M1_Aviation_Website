"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ParallelogramButton from "@/components/ui/ParallelogramButton";
import AcquisitionFlightRoadmap from "@/components/marketplace/AcquisitionFlightRoadmap";
import MarketplaceAuthTerminal from "@/components/marketplace/MarketplaceAuthTerminal";
import { playSolidDockSound } from "@/lib/audio";

// ── Background Jet Carousel Card Definition (Exact style from Seller Console / Marketplace Listings) ──
interface HeroCarouselCard {
  model: string;
  price: string;
  category: string;
  year: string;
  location: string;
  badge: "FEATURED" | "VERIFIED";
  image: string;
}

const HERO_CARD_ROW_1: HeroCarouselCard[] = [
  {
    model: "Cessna Citation CJ3+",
    price: "$11.8M",
    category: "Light Jet",
    year: "2022",
    location: "Teterboro, NJ",
    badge: "FEATURED",
    image: "/images/card-citation-cj3.jpg",
  },
  {
    model: "Embraer Phenom 300E",
    price: "$11.1M",
    category: "Light Jet",
    year: "2023",
    location: "Naples, FL",
    badge: "FEATURED",
    image: "/images/card-phenom-300e.jpg",
  },
  {
    model: "HondaJet Elite II",
    price: "$9.7M",
    category: "Light Jet",
    year: "2023",
    location: "Greensboro, NC",
    badge: "FEATURED",
    image: "/images/card-hondajet-elite.jpg",
  },
  {
    model: "Cessna Citation Latitude",
    price: "$21.6M",
    category: "Mid-Size Jet",
    year: "2021",
    location: "Chicago, IL",
    badge: "FEATURED",
    image: "/images/card-citation-latitude.jpg",
  },
  {
    model: "Bombardier Learjet 75 Liberty",
    price: "$19.0M",
    category: "Mid-Size Jet",
    year: "2020",
    location: "Miami, FL",
    badge: "FEATURED",
    image: "/images/article-3.jpg",
  },
  {
    model: "Pilatus PC-24",
    price: "$20.0M",
    category: "Mid-Size Jet",
    year: "2023",
    location: "Zurich, CH",
    badge: "FEATURED",
    image: "/images/realistic-jet-oneliner.jpg",
  },
  {
    model: "Bombardier Challenger 605",
    price: "$35.4M",
    category: "Heavy Jet",
    year: "2019",
    location: "Dubai, UAE",
    badge: "FEATURED",
    image: "/images/jet-global7500-tarmac.jpg",
  },
];

const HERO_CARD_ROW_2: HeroCarouselCard[] = [
  {
    model: "Dassault Falcon 2000S",
    price: "$32.6M",
    category: "Heavy Jet",
    year: "2020",
    location: "Paris, FR",
    badge: "VERIFIED",
    image: "/images/card-falcon-2000s.jpg",
  },
  {
    model: "Gulfstream G280",
    price: "$28.4M",
    category: "Super Mid-Size",
    year: "2021",
    location: "Worldwide",
    badge: "VERIFIED",
    image: "/images/article-5.jpg",
  },
  {
    model: "Gulfstream G650ER",
    price: "$68.9M",
    category: "Long Range Jet",
    year: "2019",
    location: "New York, NY",
    badge: "VERIFIED",
    image: "/images/card-g650er.jpg",
  },
  {
    model: "Bombardier Global 7500",
    price: "$72.4M",
    category: "Long Range Jet",
    year: "2021",
    location: "Montreal, CA",
    badge: "VERIFIED",
    image: "/images/jet-global7500-tarmac.jpg",
  },
  {
    model: "Dassault Falcon 8X",
    price: "$69.6M",
    category: "Long Range Jet",
    year: "2022",
    location: "Los Angeles, CA",
    badge: "VERIFIED",
    image: "/images/marketplace-card.jpg",
  },
  {
    model: "Boeing Business Jet 2",
    price: "$66.7M",
    category: "VIP Airliner",
    year: "2019",
    location: "Washington, DC",
    badge: "VERIFIED",
    image: "/images/summit-engagement.jpg",
  },
  {
    model: "Airbus ACJ319neo",
    price: "$63.2M",
    category: "VIP Airliner",
    year: "2023",
    location: "Abu Dhabi, UAE",
    badge: "VERIFIED",
    image: "/images/jet-executive-cabin.jpg",
  },
];

const HERO_CARD_ROW_3: HeroCarouselCard[] = [
  {
    model: "Pilatus PC-12 NGX",
    price: "$6.8M",
    category: "Turboprop",
    year: "2023",
    location: "Denver, CO",
    badge: "FEATURED",
    image: "/images/article-1.jpg",
  },
  {
    model: "Beechcraft King Air 360",
    price: "$8.9M",
    category: "Turboprop",
    year: "2022",
    location: "Dallas, TX",
    badge: "VERIFIED",
    image: "/images/article-2.jpg",
  },
  {
    model: "AgustaWestland AW139",
    price: "$14.5M",
    category: "VIP Rotorcraft",
    year: "2021",
    location: "Milan, IT",
    badge: "FEATURED",
    image: "/images/article-4.jpg",
  },
  {
    model: "Sikorsky S-92 VIP",
    price: "$27.0M",
    category: "Heavy Rotorcraft",
    year: "2020",
    location: "London, UK",
    badge: "VERIFIED",
    image: "/images/footer-jet.jpg",
  },
  {
    model: "Embraer Praetor 600",
    price: "$24.8M",
    category: "Super Mid-Size",
    year: "2023",
    location: "São Paulo, BR",
    badge: "FEATURED",
    image: "/images/realistic-jet-oneliner.jpg",
  },
  {
    model: "Cessna Citation Longitude",
    price: "$28.9M",
    category: "Super Mid-Size",
    year: "2023",
    location: "Wichita, KS",
    badge: "VERIFIED",
    image: "/images/jet-g700-flight.jpg",
  },
  {
    model: "Cessna Citation CJ3 Freight",
    price: "$10.5M",
    category: "Special Mission",
    year: "2021",
    location: "Atlanta, GA",
    badge: "FEATURED",
    image: "/images/card-citation-cj3.jpg",
  },
];

// ── Reusable Component for Background Carousel Cards ──
function MarketplaceHeroCardView({ card }: { card: HeroCarouselCard }) {
  return (
    <div className="relative w-[280px] sm:w-[320px] md:w-[340px] h-[190px] sm:h-[210px] md:h-[220px] rounded-2xl overflow-hidden border border-zinc-800/80 bg-[#0e1117] shrink-0 shadow-2xl transition-transform">
      {/* Jet Background Image */}
      <Image
        src={card.image}
        alt={card.model}
        fill
        sizes="(max-width: 768px) 300px, 360px"
        className="object-cover object-center brightness-100 contrast-105"
        unoptimized
      />

      {/* Smooth Dark Gradient Overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 via-40% to-transparent pointer-events-none" />

      {/* Top-Right Diagonal Ribbon Badge */}
      <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none z-10">
        <div
          className={`absolute transform rotate-45 text-[9px] font-mono font-black py-0.5 right-[-32px] top-[16px] w-[115px] text-center tracking-widest uppercase shadow-md ${
            card.badge === "FEATURED"
              ? "bg-[#c8a97e] text-black shadow-[0_2px_8px_rgba(200,169,126,0.35)]"
              : "bg-slate-200 text-black shadow-[0_2px_8px_rgba(255,255,255,0.25)]"
          }`}
        >
          {card.badge}
        </div>
      </div>

      {/* Card Info Overlay */}
      <div className="relative z-10 p-4 h-full flex flex-col justify-end">
        {/* Price Pill Tag */}
        <div className="mb-1.5">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-mono font-bold text-white shadow-md">
            {card.price}
          </span>
        </div>

        {/* Aircraft Model */}
        <h4 className="text-white text-base sm:text-lg font-bold tracking-tight leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] truncate">
          {card.model}
        </h4>

        {/* Details: Category · Year · Location */}
        <div className="text-[11px] text-zinc-400 font-medium flex items-center gap-1.5 mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] truncate">
          <span>{card.category}</span>
          <span className="text-zinc-600">•</span>
          <span>{card.year}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-300">{card.location}</span>
        </div>
      </div>
    </div>
  );
}

// ── Marketplace Version 2.0 Specifications & Laws ──
const V2_LAWS = [
  {
    number: "01",
    title: "Instant Cryptographic Escrow",
    law: "Autonomous Multilateral Clearance Law",
    summary:
      "Eliminates standard 21-day escrow latency by integrating verified smart contracts with institutional aviation banks, releasing title in under 4 minutes.",
    metric: "4-Minute Title Settlement",
    detail: "FAA & EASA Digital Registry Synchronization",
  },
  {
    number: "02",
    title: "Continuous Telemetric Audit",
    law: "Zero-Tamper Airframe History Protocol",
    summary:
      "Automated inspection engines parse continuous SAIOS turbine vibration records, APU cycle logs, and unscheduled maintenance filings directly from airframe avionics.",
    metric: "100% Neural Logbook Integrity",
    detail: "Zero Paper-Logbook Discrepancy",
  },
  {
    number: "03",
    title: "Zero-Spread Liquidity Swaps",
    law: "Multilateral Fleet Rebalancing Matrix",
    summary:
      "Execute bilateral and multi-asset exchanges across whole-airframe, dry-lease, and fractional portfolios without traditional intermediary broker markups.",
    metric: "<0.02% Execution Drift",
    detail: "Direct Institutional Liquidity Pool",
  },
  {
    number: "04",
    title: "Algorithmic Valuation Index",
    law: "Live Global Sovereign Pricing Standard",
    summary:
      "Real-time airframe depreciation curves updated continuously against global fuel consumption telemetry, engine cycle depreciation, and component supply times.",
    metric: "Microsecond Pricing Refresh",
    detail: "Predictive Lifecycle Residual Valuation",
  },
];

// ── Highlighted Aircraft Listings ──
const HIGHLIGHT_LISTINGS = [
  {
    id: "g700",
    model: "Gulfstream G700",
    year: "2024",
    category: "Ultra Long Range",
    price: "$78,500,000 USD",
    image: "/images/jet-g700-flight.jpg",
    specs: {
      range: "7,750 nm",
      speed: "Mach 0.925",
      hours: "120 hrs",
      capacity: "19 Pax",
    },
    status: "Escrow Ready",
    featuredBadge: "Flagship Delivery",
  },
  {
    id: "global7500",
    model: "Bombardier Global 7500",
    year: "2023",
    category: "Ultra Long Range",
    price: "$73,200,000 USD",
    image: "/images/jet-global7500-tarmac.jpg",
    specs: {
      range: "7,700 nm",
      speed: "Mach 0.90",
      hours: "410 hrs",
      capacity: "16 Pax",
    },
    status: "Immediate Inspection",
    featuredBadge: "Audited by SAIOS",
  },
  {
    id: "falcon10x",
    model: "Dassault Falcon 10X",
    year: "2025",
    category: "New Allocation",
    price: "$81,000,000 USD",
    image: "/images/realistic-jet-oneliner.jpg",
    specs: {
      range: "7,500 nm",
      speed: "Mach 0.925",
      hours: "0 hrs (New)",
      capacity: "18 Pax",
    },
    status: "Production Slot",
    featuredBadge: "Direct Allocation",
  },
  {
    id: "praetor600",
    model: "Embraer Praetor 600",
    year: "2023",
    category: "Super Mid-Size",
    price: "$24,800,000 USD",
    image: "/images/article-1.jpg",
    specs: {
      range: "4,018 nm",
      speed: "Mach 0.83",
      hours: "290 hrs",
      capacity: "12 Pax",
    },
    status: "Verified Seller",
    featuredBadge: "Off-Market",
  },
  {
    id: "g650er",
    model: "Gulfstream G650ER",
    year: "2022",
    category: "Ultra Long Range",
    price: "$49,500,000 USD",
    image: "/images/article-2.jpg",
    specs: {
      range: "7,500 nm",
      speed: "Mach 0.90",
      hours: "880 hrs",
      capacity: "16 Pax",
    },
    status: "Turnkey Ready",
    featuredBadge: "Prime Provenance",
  },
  {
    id: "longitude",
    model: "Cessna Citation Longitude",
    year: "2023",
    category: "Super Mid-Size",
    price: "$28,900,000 USD",
    image: "/images/article-3.jpg",
    specs: {
      range: "3,500 nm",
      speed: "Mach 0.84",
      hours: "350 hrs",
      capacity: "10 Pax",
    },
    status: "Fresh C-Check",
    featuredBadge: "Turnkey Airframe",
  },
];

// ── Marketplace Network Telemetry Stats ──
const MARKETPLACE_STATS = [
  { value: "$4.8B+", label: "Transacted Volume", desc: "Institutional asset volume cleared" },
  { value: "18,500+", label: "Active Recipients", desc: "Verified corporate & private bidders" },
  { value: "1,420+", label: "Charter Fleets", desc: "Certified airframe operators on-grid" },
  { value: "99.98%", label: "Escrow Execution", desc: "Frictionless title release success" },
  { value: "42", label: "Sovereign Jurisdictions", desc: "Worldwide cross-border clearance" },
];

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const bottomBlurRef = useRef<HTMLDivElement>(null);
  const bottomGradientRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);

  // ── Scroll-reactive bottom blur & dissolve to black (matching main website hero) ──
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const vh = window.innerHeight;
          // Progress from 0 to 1 as user scrolls down the hero section
          const progress = Math.min(Math.max(scrollY / (vh * 0.7), 0), 1);

          if (bottomBlurRef.current) {
            // Progressive blur starts at 0 and intensifies up to 28px as user scrolls down
            const blurPx = progress * 28;
            bottomBlurRef.current.style.backdropFilter = `blur(${blurPx}px)`;
            bottomBlurRef.current.style.setProperty("-webkit-backdrop-filter", `blur(${blurPx}px)`);
          }

          if (bottomGradientRef.current) {
            // Bottom gradient transitions smoothly from subtle baseline feather (0.35) into deep solid black (1.0)
            bottomGradientRef.current.style.opacity = String(0.35 + progress * 0.65);
          }

          if (heroOverlayRef.current) {
            // Smooth overall fade into black as hero scrolls out into Section 2
            const fadeProgress = Math.min(Math.max((scrollY - vh * 0.12) / (vh * 0.68), 0), 1);
            heroOverlayRef.current.style.opacity = String(fadeProgress);
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

  const filteredListings =
    activeCategory === "All"
      ? HIGHLIGHT_LISTINGS
      : HIGHLIGHT_LISTINGS.filter((l) => l.category === activeCategory);

  return (
    <div className="w-full flex flex-col items-center select-none bg-black text-white">
      {/* ── 1. Fullscreen Hero Page with Vivid, High-Visibility Background Jet Carousels ── */}
      <section className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center text-center overflow-hidden pt-20 pb-16">
        {/* ── Background Moving Carousel Streams: Authentic Marketplace Cards (Moving continuously) ── */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center gap-5 sm:gap-7 overflow-hidden pointer-events-none opacity-85 sm:opacity-90">
          {/* Row 1: Right to Left (Featured Listings) */}
          <div className="relative w-full overflow-hidden flex items-center">
            <div
              className="flex items-center gap-4 sm:gap-6 w-max animate-marquee-rtl py-1"
              style={{ animationDuration: "48s" }}
            >
              {[...HERO_CARD_ROW_1, ...HERO_CARD_ROW_1].map((card, i) => (
                <MarketplaceHeroCardView key={`r1-card-${card.model}-${i}`} card={card} />
              ))}
            </div>
          </div>

          {/* Row 2: Left to Right (Verified Aircraft) */}
          <div className="relative w-full overflow-hidden flex items-center">
            <div
              className="flex items-center gap-4 sm:gap-6 w-max animate-marquee-ltr py-1"
              style={{ animationDuration: "54s" }}
            >
              {[...HERO_CARD_ROW_2, ...HERO_CARD_ROW_2].map((card, i) => (
                <MarketplaceHeroCardView key={`r2-card-${card.model}-${i}`} card={card} />
              ))}
            </div>
          </div>

          {/* Row 3: Right to Left (Additional Selection / Turboprops & Rotorcraft) */}
          <div className="relative w-full overflow-hidden flex items-center">
            <div
              className="flex items-center gap-4 sm:gap-6 w-max animate-marquee-rtl py-1"
              style={{ animationDuration: "50s" }}
            >
              {[...HERO_CARD_ROW_3, ...HERO_CARD_ROW_3].map((card, i) => (
                <MarketplaceHeroCardView key={`r3-card-${card.model}-${i}`} card={card} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Side & Vertical Edge Soft Fades for Seamless Conveyor Effect ── */}
        <div className="absolute inset-y-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-1" />
        <div className="absolute inset-y-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-1" />

        {/* ── Seamless Top Edge Feather ── */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black via-black/40 to-transparent pointer-events-none z-1" />

        {/* ── Dynamic Bottom Scroll Blur & Dark Gradient Dissolve (Matching main website hero) ── */}
        <div
          ref={bottomBlurRef}
          className="absolute bottom-0 left-0 right-0 h-[50vh] sm:h-[65vh] pointer-events-none z-10"
          style={{
            backdropFilter: "blur(0px)",
            WebkitBackdropFilter: "blur(0px)",
            maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0) 100%)",
          }}
          aria-hidden="true"
        />

        <div
          ref={bottomGradientRef}
          className="absolute bottom-0 left-0 right-0 h-[55vh] sm:h-[70vh] pointer-events-none z-10 transition-opacity duration-150 ease-out"
          style={{
            background: "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.55) 60%, transparent 100%)",
            opacity: 0.35,
          }}
          aria-hidden="true"
        />

        {/* ── Scroll Fade Overlay (smooth black transition into Section 2) ── */}
        <div
          ref={heroOverlayRef}
          className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-300 ease-out z-10"
          style={{ opacity: 0 }}
          aria-hidden="true"
        />

        {/* ── Centered MARKETPLACE Title with Subtle Ambient Backdrop Blur ── */}
        <div className="relative z-10 flex items-center justify-center pointer-events-none px-4 py-8">
          <div className="relative px-8 sm:px-14 md:px-20 py-4 sm:py-6 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.85)]">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tight text-white uppercase whitespace-nowrap drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
              MARKETPLACE
            </h1>
          </div>
        </div>

        {/* ── Two Hero Action Buttons In Both Bottom Corners ── */}
        <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-12 z-20">
          <ParallelogramButton
            href="#highlights"
            variant="silver"
            className="py-3 sm:py-3.5 px-8 sm:px-10 text-xs sm:text-sm font-mono font-bold tracking-wider shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
          >
            EXPLORE ASSETS
          </ParallelogramButton>
        </div>

        <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-12 z-20">
          <ParallelogramButton
            href="#signup"
            variant="white"
            className="py-3 sm:py-3.5 px-8 sm:px-10 text-xs sm:text-sm font-mono font-bold tracking-wider shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
          >
            REQUEST ACCESS
          </ParallelogramButton>
        </div>
      </section>

      {/* ── 2. Version 2.0 Specifications & Laws Section ── */}
      <section id="v2" className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        <div className="text-center mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-800 bg-zinc-950 text-[10px] font-mono tracking-[0.25em] text-zinc-400 uppercase">
            Protocol Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
            Marketplace Version 2.0
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
            Governed by autonomous execution laws engineered to eliminate broker arbitrage and
            guarantee institutional clearing speed.
          </p>
        </div>

        {/* 4 Law Cards with Smooth, Diffused Metallic Gradients (Zero Sharp Lines) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {V2_LAWS.map((law) => (
            <div
              key={law.number}
              className="relative rounded-3xl border border-white/15 p-7 sm:p-9 flex flex-col justify-between overflow-hidden bg-[linear-gradient(145deg,#0d1016_0%,#151a23_30%,#1f2633_60%,#283243_85%,#161b24_100%)] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.25)] group hover:border-white/35 transition-all duration-300"
            >
              {/* Soft, Diffused Ambient Light Sheen (Smooth radial fade without harsh edge cuts) */}
              <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08)_0%,rgba(148,163,184,0.03)_40%,transparent_75%)] pointer-events-none" />
              <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,transparent_50%,rgba(0,0,0,0.35)_100%)] pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-zinc-200">
                    LAW {law.number}
                  </span>
                  <div className="px-3 py-1 rounded-full border border-white/20 bg-black/50 text-[10px] font-mono tracking-wider text-zinc-200 backdrop-blur-sm">
                    Autonomous Protocol
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                    {law.title}
                  </h3>
                  <div className="text-xs font-mono text-zinc-300 tracking-wider mt-0.5 uppercase">
                    {law.law}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-200 font-light leading-relaxed">
                  {law.summary}
                </p>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold text-white tracking-wide">
                  {law.metric}
                </span>
                <span className="text-[11px] font-mono text-zinc-300">
                  {law.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. HIGHLIGHTED LISTINGS: Continuous Smooth Moving Carousel (Right to Left) ── */}
      <section id="highlights" className="relative z-20 w-full py-20 sm:py-28 overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950 text-[10px] font-mono tracking-[0.25em] text-zinc-400 uppercase">
              Curated Portfolio
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white">
              Highlighted Listings
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              Turnkey executive aircraft with verified telemetry logbooks ready for immediate escrow locking. Gliding continuous live orderbook.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2.5">
            {["All", "Ultra Long Range", "Super Mid-Size"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  playSolidDockSound(1);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                  activeCategory === cat
                    ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Continuous Moving Carousel Track (Right to Left) ── */}
        <div className="relative w-full overflow-hidden flex items-center group">
          {/* Subtle edge fade gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

          {/* Infinite Moving Marquee Line from Right to Left */}
          <div
            className="flex items-center gap-6 sm:gap-8 w-max animate-marquee-rtl py-4 px-4 hover:[animation-play-state:paused]"
            style={{ animationDuration: "55s" }}
          >
            {[...filteredListings, ...filteredListings, ...filteredListings].map((item, idx) => (
              <div
                key={`listing-card-${item.id}-${idx}`}
                className="relative w-[380px] sm:w-[460px] md:w-[500px] rounded-3xl border border-slate-400/40 p-6 sm:p-7 flex flex-col justify-between shrink-0 bg-[linear-gradient(135deg,#101318_0%,#1b2029_25%,#334155_50%,#cbd5e1_75%,#12151c_100%)] shadow-[0_25px_60px_rgba(0,0,0,0.85),inset_0_2px_4px_rgba(255,255,255,0.5)] transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
              >
                {/* Diagonal Specular Sheen */}
                <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(125deg,rgba(255,255,255,0.20)_0%,rgba(255,255,255,0.05)_25%,rgba(203,213,225,0.16)_48%,transparent_65%,rgba(255,255,255,0.10)_100%)] pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  {/* Top Header Badge & Status */}
                  <div className="flex items-center justify-between">
                    <div className="-skew-x-12 inline-flex items-center px-3.5 py-1 border border-zinc-700 bg-zinc-950 text-white shadow-sm">
                      <span className="skew-x-12 text-[10px] font-mono font-bold tracking-widest uppercase">
                        {item.featuredBadge}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-zinc-200">
                      {item.status}
                    </span>
                  </div>

                  {/* Jet Photograph (Significantly Enlarged) */}
                  <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-zinc-900">
                    <Image
                      src={item.image}
                      alt={item.model}
                      fill
                      sizes="(max-width: 768px) 380px, 500px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Model & Year */}
                  <div>
                    <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
                      {item.year} • {item.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white mt-0.5">
                      {item.model}
                    </h3>
                  </div>

                  {/* Asking Valuation Banner */}
                  <div className="p-4 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      Asking Valuation
                    </span>
                    <span className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
                      {item.price}
                    </span>
                  </div>
                </div>

                {/* Inspect Action Button */}
                <div className="relative z-10 pt-5 mt-4 border-t border-white/15">
                  <ParallelogramButton
                    href="#signup"
                    variant="silver"
                    className="w-full py-3.5 text-xs font-mono font-bold uppercase tracking-wider shadow-lg"
                  >
                    INSPECT TELEMETRY & BID
                  </ParallelogramButton>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ── 4. OUR ACQUISITION SYSTEM (Scroll-Based Animated Zigzag Flight Roadmap) ── */}
      <AcquisitionFlightRoadmap />

      {/* ── 5. STATS Section Showcasing Active Telemetry & Network Scale (Moving Marquee Carousel) ── */}
      <section className="relative z-20 w-full py-16 sm:py-24 border-t border-zinc-900 overflow-hidden">
        <div className="text-center mb-10 space-y-2 px-4 max-w-6xl mx-auto">
          <div className="text-[10px] font-mono tracking-[0.25em] text-zinc-500 uppercase">
            Network Telemetry
          </div>
          <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-white">
            Active Marketplace Scale
          </h2>
        </div>

        {/* ── Continuous Moving Telemetry Carousel Line (Logos Style) ── */}
        <div
          aria-label="Active Marketplace Scale Feed"
          className="relative z-20 w-full py-4 overflow-hidden select-none group/marquee"
        >
          {/* Left Edge Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-44 z-30 pointer-events-none bg-gradient-to-r from-black via-black/85 to-transparent" />

          {/* Right Edge Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-44 z-30 pointer-events-none bg-gradient-to-l from-black via-black/85 to-transparent" />

          {/* Moving Cards Row */}
          <div className="relative w-full overflow-hidden">
            <div
              className="flex items-stretch gap-6 sm:gap-8 w-max animate-marquee-rtl group-hover/marquee:[animation-play-state:paused] py-3"
              style={{ animationDuration: "35s" }}
            >
              {[...MARKETPLACE_STATS, ...MARKETPLACE_STATS, ...MARKETPLACE_STATS, ...MARKETPLACE_STATS].map((stat, i) => (
                <div
                  key={`stat-carousel-${i}`}
                  className="w-64 sm:w-72 p-6 rounded-2xl border border-white/15 bg-[linear-gradient(135deg,#0c0e12_0%,#181d26_50%,#283241_75%,#0d1015_100%)] backdrop-blur-xl flex flex-col justify-between space-y-3 text-center shrink-0 hover:border-white/60 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-300"
                >
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-zinc-200 tracking-wider uppercase">
                    {stat.label}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 leading-snug">
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Broadcast Telemetry Footer */}
        <div className="mt-8 flex justify-center items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>M1 Global Aviation Trading Grid Active • Telemetry Synced</span>
        </div>
      </section>

      {/* ── 6. AUTHENTIC MARKETPLACE ACCESS & SIGNUP TERMINAL (At the Very End of Page) ── */}
      <MarketplaceAuthTerminal />
    </div>
  );
}
