import Hero from "@/components/home/Hero";
import OurLineup from "@/components/home/OurLineup";
import FullStackDeck from "@/components/home/FullStackDeck";
import AviGramSection from "@/components/home/AviGramSection";
import OneLiner from "@/components/home/OneLiner";
import PartnerStrip from "@/components/home/PartnerStrip";
import VisionTimeline from "@/components/home/VisionTimeline";
import ScrollFlightJet from "@/components/home/ScrollFlightJet";
import ContactFlightJet from "@/components/home/ContactFlightJet";
import ContactSection from "@/components/home/ContactSection";
import SectionFocusItem from "@/components/home/SectionFocusItem";
import SectionDivider from "@/components/home/SectionDivider";

export default function Home() {
  return (
    <>
      {/* Main site */}
      <div className="w-full flex flex-col items-center">
        {/* 1. Fullscreen Cinematic Hero */}
        <Hero />

        {/* 2. Stacked Products Lineup with Card Scroll Sound Effects */}
        <div id="lineup" className="w-full">
          <OurLineup />
        </div>

        {/* 2b. The Full Stack: 4-Cards Fanned Perspective Deck */}
        <SectionFocusItem id="fullstack">
          <FullStackDeck />
        </SectionFocusItem>

        {/* 2c. M1 AviGram: The High-Altitude Aviation Social Network */}
        <SectionFocusItem id="avigram">
          <AviGramSection />
        </SectionFocusItem>

        <SectionDivider />

        {/* 3D Flying Jet connecting Ecosystem -> Logos -> Vision Timeline */}
        <ScrollFlightJet />

        {/* 3. M1 One-Liner Statement */}
        <SectionFocusItem id="philosophy">
          <OneLiner />
        </SectionFocusItem>

        {/* 4. Industry Partner Logo Strip (Crisp, fully legible, z-30 in front of flying jet) */}
        <div id="partners" className="relative z-30 w-full">
          <PartnerStrip />
        </div>

        {/* 5. 10-Year Vision Timeline */}
        <SectionFocusItem id="vision">
          <VisionTimeline />
        </SectionFocusItem>

        {/* 3D Flying Jet connecting Vision Roadmap End -> Contact Section Form */}
        <ContactFlightJet />

        {/* 6. Contact & Meeting Booking Section */}
        <SectionFocusItem id="contact">
          <ContactSection />
        </SectionFocusItem>
      </div>
    </>
  );
}
