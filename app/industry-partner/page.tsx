"use client";

import React, { useState } from "react";
import Image from "next/image";
import ParallelogramButton from "@/components/ui/ParallelogramButton";
import PlayYourRoleCTA from "@/components/ui/PlayYourRoleCTA";
import { PARTNERS_ROSTER } from "@/data/partners";

const ENGAGEMENT_SLIDES = [
  {
    title: "Geneva Executive Aviation Summit",
    location: "Geneva, Switzerland",
    date: "Q2 2026",
    summary:
      "Strategic roundtable with tier-1 jet operators aligning SAIOS autonomous airframe diagnostics with European business aviation workflows.",
    category: "Symposium & Protocol",
    image: "/images/article-1.jpg",
    stats: "48 Operators • 340 Aircraft Managed",
  },
  {
    title: "North American Fleet Efficiency Trials",
    location: "Dallas / Fort Worth, TX",
    date: "Q3 2026",
    summary:
      "Field trials verifying automated flight telemetry capture and FAA digital airworthiness synchronization across 40 corporate jet airframes.",
    category: "Operational Trial",
    image: "/images/article-2.jpg",
    stats: "99.8% Telemetry Accuracy • Zero AOG Incidents",
  },
  {
    title: "Transatlantic MRO Digital Protocol",
    location: "London Luton Airport, UK",
    date: "Q4 2026",
    summary:
      "Ratifying interoperability standards with leading MROs for streamlined avionics component replacement and direct escrow clearance.",
    category: "MRO Alliance",
    image: "/images/article-3.jpg",
    stats: "12 Certified Repair Facilities • Instant Escrow",
  },
];

export default function IndustryPartnerPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const repeatedPartners = [
    ...PARTNERS_ROSTER,
    ...PARTNERS_ROSTER,
    ...PARTNERS_ROSTER,
  ];

  return (
    <div className="w-full flex flex-col items-center pt-24 pb-32 select-none">
      {/* ── 1. Hero Section (SRS: "Industry Partner" in middle with CTA: Apply) ── */}
      <section className="relative w-full min-h-[65vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.06)_0%,_transparent_70%)] pointer-events-none" />

        <div className="relative z-10 space-y-5 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-zinc-800 bg-zinc-950/80">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-400">
              Executive Alliance Network
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-tight text-white">
            Industry Partner
          </h1>

          <div className="pt-4">
            <ParallelogramButton href="/#contact" variant="gold" className="text-xs px-10 py-4 shadow-xl">
              Apply
            </ParallelogramButton>
          </div>
        </div>

        {/* ── Logo Carousel at Bottom of Hero (SRS: "just like we had on the home page") ── */}
        <div className="w-full max-w-6xl mt-20 pt-6 border-t border-zinc-800/80 relative overflow-hidden">
          <div className="flex items-center gap-8 w-max animate-marquee-ltr cursor-default py-2">
            {repeatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex items-center gap-3 px-6 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950/70 hover:border-zinc-600 transition-colors shrink-0"
              >
                <div className="w-2 h-2 rounded-full bg-zinc-400" />
                <span className="text-xs font-semibold text-zinc-200 tracking-wider">
                  {partner.name}
                </span>
                <span className="text-[9px] font-mono text-zinc-500">
                  {partner.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Partner Engagement Gallery (White Background, Device/Card Carousel) ── */}
      <section className="w-full bg-white text-black py-28 px-6 md:px-12 my-12 border-y border-zinc-200 shadow-xl">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">
              Field Operations & Deployments
            </span>
            <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-950">
              Partner Engagement Showcase
            </h2>
            <p className="text-sm text-zinc-600 max-w-xl mx-auto">
              Real-world aircraft deployments, avionics trials, and operator summits powering the M1 ecosystem.
            </p>
          </div>

          {/* Interactive Showcase Carousel */}
          <div className="relative bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Image Showcase */}
              <div className="lg:col-span-7 h-64 sm:h-96 rounded-2xl overflow-hidden relative shadow-md border border-zinc-300 bg-zinc-900">
                <Image
                  src={ENGAGEMENT_SLIDES[activeSlide].image}
                  alt={ENGAGEMENT_SLIDES[activeSlide].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover transition-all duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-mono">
                  {ENGAGEMENT_SLIDES[activeSlide].category}
                </div>
              </div>

              {/* Right Column: Slide Information */}
              <div className="lg:col-span-5 space-y-5">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>📍 {ENGAGEMENT_SLIDES[activeSlide].location}</span>
                  <span className="font-semibold text-zinc-700">{ENGAGEMENT_SLIDES[activeSlide].date}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-zinc-900">
                  {ENGAGEMENT_SLIDES[activeSlide].title}
                </h3>

                <p className="text-sm text-zinc-600 leading-relaxed">
                  {ENGAGEMENT_SLIDES[activeSlide].summary}
                </p>

                <div className="p-3.5 bg-zinc-200/60 rounded-xl border border-zinc-300 text-xs font-mono text-zinc-800">
                  <span className="font-semibold">Telemetry Record:</span> {ENGAGEMENT_SLIDES[activeSlide].stats}
                </div>

                {/* Carousel Navigation Buttons */}
                <div className="pt-4 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlide(
                        (prev) => (prev - 1 + ENGAGEMENT_SLIDES.length) % ENGAGEMENT_SLIDES.length
                      )
                    }
                    className="w-10 h-10 rounded-full border border-zinc-300 bg-white hover:bg-zinc-100 flex items-center justify-center text-zinc-800 shadow-sm transition-colors cursor-pointer"
                    aria-label="Previous Engagement Slide"
                  >
                    ←
                  </button>
                  <span className="text-xs font-mono text-zinc-500">
                    {activeSlide + 1} / {ENGAGEMENT_SLIDES.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveSlide((prev) => (prev + 1) % ENGAGEMENT_SLIDES.length)
                    }
                    className="w-10 h-10 rounded-full border border-zinc-300 bg-white hover:bg-zinc-100 flex items-center justify-center text-zinc-800 shadow-sm transition-colors cursor-pointer"
                    aria-label="Next Engagement Slide"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Reused Play Your Role CTA (SRS Requirement) ───────────── */}
      <PlayYourRoleCTA />
    </div>
  );
}
