"use client";

import React, { useState } from "react";
import Image from "next/image";
import ParallelogramButton from "@/components/ui/ParallelogramButton";
import { CAL_BOOKING_URL } from "@/data/navigation";
import { ContactFormData } from "@/types";

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    position: "",
    email: "",
    phone: "",
    whatsappSignal: "",
    objective: "M1 Marketplace Acquisition",
    description: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.fullName) {
      setErrorMessage("Please provide your full name and a valid email address.");
      return;
    }

    setErrorMessage("");
    setStatus("submitting");

    // Client-side confirmation state simulation
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Inquiries"
      className="relative pt-4 pb-16 sm:pt-6 sm:pb-20 md:pt-10 md:pb-28 px-4 sm:px-6 lg:px-10 w-full max-w-[1400px] xl:max-w-[1500px] mx-auto scroll-mt-10 overflow-hidden"
    >
      {/* ── Background Radar Compass & Flight Vector Rings ─────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 md:opacity-20">
        <div className="w-[600px] h-[600px] rounded-full border border-white/20 animate-[spin_60s_linear_infinite]" />
        <div className="w-[450px] h-[450px] rounded-full border border-dashed border-white/20" />
        <div className="w-[300px] h-[300px] rounded-full border border-white/10" />
      </div>

      <div className="text-center mb-6 sm:mb-8 relative z-10">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white">
          Connect with M1
        </h2>
        <p className="text-xs sm:text-sm font-mono text-zinc-300 mt-2 sm:mt-2.5 uppercase tracking-widest">
          Executive Aviation Advisory • Fleet Operators • OEM Integration
        </p>
      </div>

      {/* ── White to Black/Grey Gradient Form Card with High-Contrast Typography ─── */}
      <div className="relative bg-gradient-to-br from-white via-zinc-100 via-35% to-[#0e1017] text-black rounded-2xl sm:rounded-3xl p-5 sm:p-10 md:p-16 shadow-[0_25px_60px_rgba(255,255,255,0.06)] border border-zinc-200 overflow-hidden z-10">
        {/* Jet image watermark with white-to-black/grey gradient (Large on PC/wide view) */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          {/* Base gradient layer: white to black/grey */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-[#eef0f4] via-35% to-[#090b10]" />

          <div
            id="contact-jet-destination"
            className="absolute -bottom-4 -right-8 sm:right-0 sm:bottom-0 w-full h-full transition-opacity duration-200"
            style={{ opacity: 1 }}
          >
            <Image
              src="/images/footer-jet.png"
              alt="M1 Velocity S1 Supersonic Aircraft"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover object-right-bottom"
              priority={true}
            />
          </div>
          {/* Subtle gradient overlay so left/top of form stays clean, bright and readable */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/45 via-45% to-transparent" />
        </div>

        {/* Top Avionics Dispatch Telemetry Header */}
        <div className="pb-4 sm:pb-6 mb-5 sm:mb-8 border-b border-zinc-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-xs sm:text-sm font-mono text-zinc-600 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-black shadow-sm" />
            <span className="font-bold text-zinc-950 tracking-wider">M1 FLIGHT COMMS // INQUIRY DISPATCH</span>
          </div>
          <div className="tracking-widest uppercase text-zinc-500 text-[11px] sm:text-xs font-semibold">
            TRANSMISSION SECURE • CYOO / OPPS LINK
          </div>
        </div>

        {status === "success" ? (
          <div className="text-center py-10 sm:py-16 space-y-3 sm:space-y-4 relative z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-900 flex items-center justify-center mx-auto text-2xl sm:text-3xl font-bold shadow-inner">
              ✓
            </div>
            <h3 className="text-2xl sm:text-4xl font-light tracking-tight text-zinc-950">
              Inquiry Dispatched
            </h3>
            <p className="text-sm sm:text-base text-zinc-700 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-bold text-zinc-950">{formData.fullName}</span>. Your inquiry has been transmitted to our flight team. An executive will connect at <span className="font-bold text-zinc-950">{formData.email}</span> shortly.
            </p>
            <div className="pt-4 sm:pt-6">
              <ParallelogramButton
                onClick={() => setStatus("idle")}
                variant="white"
                className="text-xs sm:text-sm py-3 px-8 border-zinc-400 font-bold"
              >
                Send Another Dispatch
              </ParallelogramButton>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 md:space-y-7 relative z-10">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-mono">
                {errorMessage}
              </div>
            )}

            {/* 3-Row Grid: Row 1 (Fields 1-3), Row 2 (Fields 4-6), Row 3 (Field 7 - Full Width) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Field 1: Full name */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-900 block font-bold">
                  1. Full name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">👤</span>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Captain Alexander Vance"
                    className="w-full pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base bg-white/95 border border-zinc-300 rounded-xl text-zinc-950 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder:text-zinc-500 font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Field 2: Position */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-900 block font-bold">
                  2. Position
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">💼</span>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="Fleet Director / Chief Executive"
                    className="w-full pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base bg-white/95 border border-zinc-300 rounded-xl text-zinc-950 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder:text-zinc-500 font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Field 3: Email */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-900 block font-bold">
                  3. Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">✉️</span>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@aviation-operator.com"
                    className="w-full pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base bg-white/95 border border-zinc-300 rounded-xl text-zinc-950 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder:text-zinc-500 font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Field 4: Phone */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-900 block font-bold">
                  4. Phone
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">📞</span>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base bg-white/95 border border-zinc-300 rounded-xl text-zinc-950 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder:text-zinc-500 font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Field 5: WhatsApp / Signal */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-900 block font-bold">
                  5. WhatsApp / Signal
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">💬</span>
                  <input
                    type="text"
                    value={formData.whatsappSignal}
                    onChange={(e) => setFormData({ ...formData, whatsappSignal: e.target.value })}
                    placeholder="+1 (555) 019-2834 or handle"
                    className="w-full pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base bg-white/95 border border-zinc-300 rounded-xl text-zinc-950 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder:text-zinc-500 font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Field 6: Objective */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-900 block font-bold">
                  6. Objective
                </label>
                <select
                  value={formData.objective}
                  onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                  className="w-full px-4 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base bg-white/95 border border-zinc-300 rounded-xl text-zinc-950 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all font-medium shadow-sm"
                >
                  <option value="M1 Marketplace Acquisition">M1 Marketplace Acquisition</option>
                  <option value="M1: Market Intelligence Registration">M1: Market Intelligence Registration</option>
                  <option value="Aircraft Listings & Verification">Aircraft Listings & Verification</option>
                  <option value="SIOS Fleet Integration & Pilot Program">SIOS Fleet Integration & Pilot Program</option>
                  <option value="Avigram Early Access & Pre-signup">Avigram Early Access & Pre-signup</option>
                  <option value="M1 Industry Partner Program">M1 Industry Partner Program</option>
                  <option value="Executive Advisory Consultation">Executive Advisory Consultation</option>
                </select>
              </div>

              {/* Field 7: Description (Spans full width across 3 columns) */}
              <div className="md:col-span-3 space-y-1.5 sm:space-y-2">
                <label className="text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-900 block font-bold">
                  7. Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Specify your requirements, fleet composition, or inquiry details..."
                  className="w-full px-4 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base bg-white/95 border border-zinc-300 rounded-xl text-zinc-950 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none placeholder:text-zinc-500 font-medium shadow-sm"
                />
              </div>
            </div>

            {/* Dual Iconic Parallelogram CTAs (Submit & Book Meeting) */}
            <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 border-t border-zinc-200">
              <ParallelogramButton
                onClick={() => {
                  const form = document.querySelector("form");
                  if (form) form.requestSubmit();
                }}
                variant="white"
                className="w-full sm:w-auto text-xs sm:text-sm py-3.5 sm:py-4 px-8 sm:px-10 border-zinc-400 hover:bg-zinc-100 shadow-md font-bold"
              >
                {status === "submitting" ? "Transmitting..." : "Submit Inquiry"}
              </ParallelogramButton>

              <ParallelogramButton
                href={CAL_BOOKING_URL}
                isExternal={true}
                variant="silver"
                className="w-full sm:w-auto text-xs sm:text-sm py-3.5 sm:py-4 px-8 sm:px-10 shadow-md font-bold"
              >
                Book a Direct Meeting ↗
              </ParallelogramButton>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
