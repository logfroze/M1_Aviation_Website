import Hero from "@/components/home/Hero";
import OurLineup from "@/components/home/OurLineup";
import OneLiner from "@/components/home/OneLiner";
import PartnerStrip from "@/components/home/PartnerStrip";
import VisionTimeline from "@/components/home/VisionTimeline";
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
