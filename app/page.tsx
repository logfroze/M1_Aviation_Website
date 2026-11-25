"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import SectionFocusItem from "@/components/home/SectionFocusItem";
import SectionDivider from "@/components/home/SectionDivider";

// ── Below-the-fold components dynamically code-split for sub-second initial load with full SSR text for AI crawlers ──
const OurLineup = dynamic(() => import("@/components/home/OurLineup"));
const FullStackDeck = dynamic(() => import("@/components/home/FullStackDeck"));
const MarketIntelligenceSection = dynamic(() => import("@/components/home/MarketIntelligenceSection"));
const OneLiner = dynamic(() => import("@/components/home/OneLiner"));
const PartnerStrip = dynamic(() => import("@/components/home/PartnerStrip"));
const VisionTimeline = dynamic(() => import("@/components/home/VisionTimeline"));
const ContactSection = dynamic(() => import("@/components/home/ContactSection"));

export default function Home() {
  return (
    <>
      {/* Main site */}
      <div className="w-full flex flex-col items-center">
        {/* 1. Fullscreen Cinematic Hero */}
        <Hero />

        {/* 2. M1: Market Intelligence */}
        <div className="relative z-20 w-full">
          <MarketIntelligenceSection />
        </div>

        {/* 3. Stacked Products Lineup with Card Scroll Sound Effects */}
        <div id="lineup" className="relative z-20 w-full">
          <OurLineup />
        </div>

        {/* 3b. The Full Stack: 4-Cards Fanned Perspective Deck (Desktop only to prevent card fatigue on mobile) */}
        <div id="fullstack" className="hidden lg:block relative z-10 w-full">
          <FullStackDeck />
        </div>

        <SectionDivider />

        {/* 3. M1 One-Liner Statement (Ecosystem with 3D Jet stationed on platform) */}
        <div id="philosophy" className="relative z-20 w-full">
          <OneLiner />
        </div>

        {/* 4. Industry Partner Logo Strip */}
        <div id="partners" className="relative z-30 w-full">
          <PartnerStrip />
        </div>

        {/* 5. 10-Year Vision Timeline (With dedicated 3D Jet starting on the road) */}
        <SectionFocusItem id="vision">
          <VisionTimeline />
        </SectionFocusItem>

        {/* 6. Contact & Meeting Booking Section (Static watermark jet embedded in form) */}
        <SectionFocusItem id="contact">
          <ContactSection />
        </SectionFocusItem>
      </div>
    </>
  );
}
