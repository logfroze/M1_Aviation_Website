"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import OurLineup from "@/components/home/OurLineup";
import OneLiner from "@/components/home/OneLiner";
import PartnerStrip from "@/components/home/PartnerStrip";
import VisionTimeline from "@/components/home/VisionTimeline";
import ContactSection from "@/components/home/ContactSection";
import SectionFocusItem from "@/components/home/SectionFocusItem";
import SectionDivider from "@/components/home/SectionDivider";

// Dynamically import so canvas only runs client-side
const IntroAnimation = dynamic(
  () => import("@/components/home/IntroAnimation"),
  { ssr: false }
);

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {/* Full-screen intro: warp speed + M1 logo fly-in */}
      {!introDone && <IntroAnimation onDone={() => setIntroDone(true)} />}

      {/* Main site — rendered behind the intro, revealed on finish */}
      <div
        className="w-full flex flex-col items-center"
        style={{
          opacity: introDone ? 1 : 0,
          transition: introDone ? "opacity 0.6s ease" : "none",
          pointerEvents: introDone ? "auto" : "none",
        }}
      >
        {/* 1. Fullscreen Cinematic Hero — video waits for intro to finish */}
        <Hero paused={!introDone} />

        {/* 2. Stacked Products Lineup with Card Scroll Sound Effects */}
        <SectionFocusItem id="lineup">
          <OurLineup />
        </SectionFocusItem>

        <SectionDivider />

        {/* 3. M1 One-Liner Statement */}
        <SectionFocusItem id="philosophy">
          <OneLiner />
        </SectionFocusItem>

        <SectionDivider />

        {/* 4. Industry Partner Logo Strip */}
        <SectionFocusItem id="partners">
          <PartnerStrip />
        </SectionFocusItem>

        <SectionDivider />

        {/* 5. 10-Year Vision Timeline */}
        <SectionFocusItem id="vision">
          <VisionTimeline />
        </SectionFocusItem>

        <SectionDivider />

        {/* 6. Contact & Meeting Booking Section */}
        <SectionFocusItem id="contact">
          <ContactSection />
        </SectionFocusItem>
      </div>
    </>
  );
}
