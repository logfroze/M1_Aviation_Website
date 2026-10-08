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
      className="relative pt-6 pb-24 md:pt-10 md:pb-28 px-6 md:px-12 max-w-5xl mx-auto scroll-mt-10 overflow-hidden"
    >
      {/* ── Background Radar Compass & Flight Vector Rings ─────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[600px] h-[600px] rounded-full border border-white/20 animate-[spin_60s_linear_infinite]" />
        <div className="w-[450px] h-[450px] rounded-full border border-dashed border-white/20" />
        <div className="w-[300px] h-[300px] rounded-full border border-white/10" />
      </div>

      <div className="text-center mb-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
          Connect with M1
        </h2>
        <p className="text-xs font-mono text-zinc-400 mt-2 uppercase tracking-widest">
          Executive Aviation Advisory • Fleet Operators • OEM Integration
        </p>
      </div>

      {/* ── White to Black/Grey Gradient Form Card with Black Text and Silver Input Fields ─── */}
      <div className="relative bg-gradient-to-br from-white via-zinc-100 via-35% to-[#0e1017] text-black rounded-3xl p-8 sm:p-12 md:p-14 shadow-[0_25px_60px_rgba(255,255,255,0.06)] border border-zinc-200 overflow-hidden z-10">
        {/* Jet image watermark with white-to-black/grey gradient */}
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
              sizes="100%"
              className="object-cover object-right-bottom"
              priority={false}
            />
          </div>
          {/* Subtle gradient overlay so left/top of form stays clean, bright and readable */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/45 via-45% to-transparent" />
        </div>

        {/* Top Avionics Dispatch Telemetry Header */}
        <div className="pb-6 mb-8 border-b border-zinc-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-black" />
            <span className="font-semibold text-zinc-900 tracking-wider">M1 FLIGHT COMMS // INQUIRY DISPATCH</span>
          </div>
          <div className="tracking-widest uppercase text-zinc-400">
            TRANSMISSION SECURE • CYOO / OPPS LINK
          </div>
        </div>

        {status === "success" ? (
          <div className="text-center py-16 space-y-4">
            <div className="w-14 h-14 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-900 flex items-center justify-center mx-auto text-2xl font-bold shadow-inner">
              ✓
            </div>
            <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-zinc-950">
              Inquiry Dispatched
            </h3>
            <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-zinc-900">{formData.fullName}</span>. Your inquiry has been transmitted to our flight team. An executive will connect at <span className="font-semibold text-zinc-900">{formData.email}</span> shortly.
            </p>
            <div className="pt-6">
              <ParallelogramButton
                onClick={() => setStatus("idle")}
                variant="white"
                className="text-xs border-zinc-400"
              >
                Send Another Dispatch
              </ParallelogramButton>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
                {errorMessage}
              </div>
            )}

            {/* Row 1: 1. Full name & 2. Position */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 block font-medium">
                  1. Full name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">👤</span>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Captain Alexander Vance"
                    className="w-full pl-10 pr-4 py-3.5 text-sm bg-zinc-100 border border-zinc-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder-zinc-400 font-normal"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 block font-medium">
                  2. Position
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">💼</span>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder="e.g. Fleet Director / Chief Executive"
                    className="w-full pl-10 pr-4 py-3.5 text-sm bg-zinc-100 border border-zinc-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder-zinc-400 font-normal"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: 3. Email & 4. Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 block font-medium">
                  3. Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">✉</span>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@aviation-operator.com"
                    className="w-full pl-10 pr-4 py-3.5 text-sm bg-zinc-100 border border-zinc-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder-zinc-400 font-normal"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 block font-medium">
                  4. Phone
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">📞</span>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full pl-10 pr-4 py-3.5 text-sm bg-zinc-100 border border-zinc-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder-zinc-400 font-normal"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: 5. WhatsApp / Signal & 6. Objective */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 block font-medium">
                  5. WhatsApp / Signal
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">💬</span>
                  <input
                    type="text"
                    value={formData.whatsappSignal}
                    onChange={(e) => setFormData({ ...formData, whatsappSignal: e.target.value })}
                    placeholder="+1 (555) 019-2834 or handle"
                    className="w-full pl-10 pr-4 py-3.5 text-sm bg-zinc-100 border border-zinc-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all placeholder-zinc-400 font-normal"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 block font-medium">
                  6. Objective
                </label>
                <select
                  value={formData.objective}
                  onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                  className="w-full px-4 py-3.5 text-sm bg-zinc-100 border border-zinc-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all font-normal"
                >
                  <option value="M1 Marketplace Acquisition">M1 Marketplace Acquisition</option>
                  <option value="Aircraft Listings & Verification">Aircraft Listings & Verification</option>
                  <option value="SIOS Fleet Integration & Pilot Program">SIOS Fleet Integration & Pilot Program</option>
                  <option value="Avigram Early Access & Pre-signup">Avigram Early Access & Pre-signup</option>
                  <option value="M1 Industry Partner Program">M1 Industry Partner Program</option>
                  <option value="Executive Advisory Consultation">Executive Advisory Consultation</option>
                </select>
              </div>
            </div>

            {/* Row 4: 7. Discription */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 block font-medium">
                7. Discription
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Specify your requirements, aircraft fleet, or inquiry details..."
                className="w-full px-4 py-3.5 text-sm bg-zinc-100 border border-zinc-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all resize-none placeholder-zinc-400 font-normal"
              />
            </div>

            {/* Dual Iconic Parallelogram CTAs (Submit & Book Meeting) */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-zinc-200">
              <ParallelogramButton
                onClick={() => {
                  const form = document.querySelector("form");
                  if (form) form.requestSubmit();
                }}
                variant="white"
                className="w-full sm:w-auto text-xs py-4 px-8 border-zinc-400 hover:bg-zinc-100 shadow-md"
              >
                {status === "submitting" ? "Transmitting..." : "Submit Inquiry"}
              </ParallelogramButton>

              <ParallelogramButton
                href={CAL_BOOKING_URL}
                isExternal={true}
                variant="silver"
                className="w-full sm:w-auto text-xs py-4 px-8 shadow-md"
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
