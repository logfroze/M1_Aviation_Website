"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import M1Logo from "@/components/ui/M1Logo";
import {
  NAV_ITEMS,
  SUPPORT_EMAIL,
  LINKEDIN_URL,
  X_URL,
} from "@/data/navigation";

// ── Supersonic Afterburner Thrust Fire Effect on Mouse Hover ──
function FooterJetThrustFire() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {/* ── Engine 1: Upper / Farther Engine (Placed exactly at default image fire) ── */}
      <div
        className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out origin-right z-0"
        style={{
          top: "67.5%",
          right: "79.3%",
          width: "12%",
          height: "20px",
          transformOrigin: "right center",
          transform: "translateY(-50%) rotate(-24.5deg)",
        }}
      >
        <div className="relative w-full h-full">
          {/* Ambient Afterburner Radial Glow Bloom */}
          <div className="absolute -inset-2 bg-gradient-to-l from-cyan-400/90 via-orange-500/80 to-transparent blur-md rounded-full opacity-80" />

          {/* Outer Supersonic Afterburner Torch */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(56,189,248,0.95) 16%, rgba(249,115,22,0.92) 46%, rgba(239,68,68,0.75) 75%, transparent 100%)",
              boxShadow: "0 0 16px rgba(249,115,22,0.9), 0 0 26px rgba(56,189,248,0.65)",
              filter: "blur(1.2px)",
            }}
          />

          {/* Inner White-Hot Plasma Needle */}
          <div
            className="absolute top-1/2 right-0 -translate-y-1/2 w-4/5 h-2 rounded-full mix-blend-screen"
            style={{
              background:
                "linear-gradient(to left, #ffffff 0%, rgba(186,230,253,0.95) 30%, rgba(249,115,22,0.85) 65%, transparent 100%)",
              filter: "blur(0.5px)",
              boxShadow: "0 0 10px #ffffff, 0 0 18px #38bdf8",
            }}
          />

          {/* Shock Diamond Pressure Nodes */}
          <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-2 h-2 rotate-45 bg-white/95 shadow-[0_0_8px_#38bdf8]" />
          <div className="absolute top-1/2 right-[45%] -translate-y-1/2 w-1.5 h-1.5 rotate-45 bg-sky-200/90 shadow-[0_0_6px_#f97316]" />

          {/* Nozzle Throat High-Intensity Flare Ring */}
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#38bdf8] mix-blend-screen" />
        </div>
      </div>

      {/* ── Engine 2: Lower / Near Engine (Placed exactly at default image fire) ── */}
      <div
        className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out origin-right z-0"
        style={{
          top: "72.4%",
          right: "62.6%",
          width: "14%",
          height: "22px",
          transformOrigin: "right center",
          transform: "translateY(-50%) rotate(-15.5deg)",
        }}
      >
        <div className="relative w-full h-full">
          {/* Ambient Afterburner Radial Glow Bloom */}
          <div className="absolute -inset-2.5 bg-gradient-to-l from-cyan-400/95 via-orange-500/85 to-transparent blur-md rounded-full opacity-85" />

          {/* Outer Supersonic Afterburner Torch */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(56,189,248,0.95) 16%, rgba(249,115,22,0.95) 48%, rgba(239,68,68,0.8) 78%, transparent 100%)",
              boxShadow: "0 0 18px rgba(249,115,22,0.95), 0 0 32px rgba(56,189,248,0.7)",
              filter: "blur(1.3px)",
            }}
          />

          {/* Inner White-Hot Plasma Needle */}
          <div
            className="absolute top-1/2 right-0 -translate-y-1/2 w-4/5 h-2.5 rounded-full mix-blend-screen"
            style={{
              background:
                "linear-gradient(to left, #ffffff 0%, rgba(186,230,253,0.95) 30%, rgba(249,115,22,0.85) 65%, transparent 100%)",
              filter: "blur(0.5px)",
              boxShadow: "0 0 12px #ffffff, 0 0 20px #38bdf8",
            }}
          />

          {/* Shock Diamond Pressure Nodes */}
          <div className="absolute top-1/2 right-[20%] -translate-y-1/2 w-2.5 h-2.5 rotate-45 bg-white/95 shadow-[0_0_10px_#38bdf8]" />
          <div className="absolute top-1/2 right-[45%] -translate-y-1/2 w-2 h-2 rotate-45 bg-sky-200/90 shadow-[0_0_8px_#f97316]" />

          {/* Nozzle Throat High-Intensity Flare Ring */}
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_14px_#38bdf8] mix-blend-screen" />
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-black text-zinc-400 border-t border-zinc-900 pt-44 sm:pt-48 pb-20 sm:pb-28 overflow-hidden select-none">
      {/* ── Atmospheric Clouds Horizon ─────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-72 overflow-hidden pointer-events-none z-0">
        {/* Sky Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 via-zinc-950/80 to-black" />

        {/* Volumetric Clouds Formations */}
        <div className="absolute -top-10 left-[-10%] w-[120%] h-48 opacity-45 blur-2xl bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.45)_0%,_transparent_65%)] animate-pulse" />
        <div className="absolute top-4 left-[20%] w-[60%] h-40 opacity-35 blur-3xl bg-[radial-gradient(ellipse_at_center,_rgba(200,225,255,0.4)_0%,_transparent_70%)]" />
        <div className="absolute top-16 left-0 right-0 h-28 bg-gradient-to-b from-transparent via-white/5 to-transparent blur-xl" />
      </div>

      {/* ── Left Supersonic Jet (Hovering with Streamlines & Dynamic Afterburner Fire) ── */}
      <div className="absolute left-[-25px] sm:left-0 md:left-6 lg:left-12 top-[-52px] sm:top-[-38px] md:top-[-32px] lg:top-[-28px] w-[340px] sm:w-[460px] md:w-[560px] lg:w-[640px] h-[230px] sm:h-[310px] md:h-[380px] lg:h-[430px] z-10 group pointer-events-auto cursor-pointer">
        <div className="relative w-full h-full flex items-center justify-center rotate-[12deg] transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:-translate-y-3 group-hover:rotate-[14deg] animate-[flightBobLeft_4.5s_easeInOut_infinite]">
          <div className="relative w-full aspect-[1376/768]">
            {/* Small Moving Airflow / Speed Slipstream Lines */}
            <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
              <span className="absolute top-[35%] left-[25%] w-16 sm:w-24 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent blur-[0.5px] animate-[slipstream_1.4s_linear_infinite]" />
              <span className="absolute top-[48%] left-[45%] w-24 sm:w-36 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent blur-[0.5px] animate-[slipstream_1.1s_linear_infinite] delay-300" />
              <span className="absolute top-[62%] left-[18%] w-20 sm:w-28 h-[1.5px] bg-gradient-to-r from-transparent via-sky-300/70 to-transparent blur-[0.5px] animate-[slipstream_1.7s_linear_infinite] delay-700" />
              <span className="absolute top-[22%] left-[55%] w-14 sm:w-20 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[0.5px] animate-[slipstream_1.3s_linear_infinite] delay-500" />
            </div>

            {/* Dynamic Supersonic Afterburner Thrust Fire on Hover */}
            <FooterJetThrustFire />

            {/* Transparent PNG Jet */}
            <Image
              src="/images/footer-jet.png"
              alt="M1 Supersonic Interceptor"
              fill
              sizes="(max-width: 768px) 340px, 640px"
              className="object-contain relative z-10 drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]"
            />
          </div>
        </div>
      </div>

      {/* ── Right Supersonic Jet (Mirrored, Banking toward Top Center & Dynamic Thrust Fire) ── */}
      <div className="absolute right-[-25px] sm:right-0 md:right-6 lg:right-12 top-[-10px] sm:top-2 w-[340px] sm:w-[460px] md:w-[560px] lg:w-[640px] h-[230px] sm:h-[310px] md:h-[380px] lg:h-[430px] z-10 group pointer-events-auto cursor-pointer">
        <div className="relative w-full h-full flex items-center justify-center scale-x-[-1] rotate-[12deg] transition-transform duration-500 ease-out group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:rotate-[14deg] animate-[flightBobRight_4.5s_easeInOut_infinite]">
          <div className="relative w-full aspect-[1376/768]">
            {/* Small Moving Airflow / Speed Slipstream Lines */}
            <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
              <span className="absolute top-[35%] left-[25%] w-16 sm:w-24 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent blur-[0.5px] animate-[slipstream_1.4s_linear_infinite]" />
              <span className="absolute top-[48%] left-[45%] w-24 sm:w-36 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent blur-[0.5px] animate-[slipstream_1.1s_linear_infinite] delay-300" />
              <span className="absolute top-[62%] left-[18%] w-20 sm:w-28 h-[1.5px] bg-gradient-to-r from-transparent via-sky-300/70 to-transparent blur-[0.5px] animate-[slipstream_1.7s_linear_infinite] delay-700" />
              <span className="absolute top-[22%] left-[55%] w-14 sm:w-20 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[0.5px] animate-[slipstream_1.3s_linear_infinite] delay-500" />
            </div>

            {/* Dynamic Supersonic Afterburner Thrust Fire on Hover */}
            <FooterJetThrustFire />

            {/* Transparent PNG Jet */}
            <Image
              src="/images/footer-jet.png"
              alt="M1 Supersonic Fleet Interceptor"
              fill
              sizes="(max-width: 768px) 340px, 640px"
              className="object-contain relative z-10 drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]"
            />
          </div>
        </div>
      </div>

      {/* ── Main Footer Information Grid ─────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 pt-36 sm:pt-44 md:pt-48">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Brand & Contact Info */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="M1 Aviation Home"
            >
              <M1Logo
                width={130}
                height={45}
                className="h-8 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-white text-base sm:text-lg font-light tracking-widest uppercase text-zinc-300 group-hover:text-white transition-colors">
                Aviation
              </span>
            </Link>

            <div className="pt-2 space-y-3 text-sm sm:text-base font-mono">
              <div>
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-zinc-200 hover:text-white transition-colors font-medium"
                >
                  {SUPPORT_EMAIL}
                </a>
              </div>
              {/* Phone Numbers (SRS Requirement) */}
              <div className="text-zinc-300 pt-1 space-y-1">
                <div className="text-xs text-zinc-400 uppercase tracking-widest font-sans font-medium">Corporate Comms</div>
                <a href="tel:+14378945030" className="hover:text-white transition-colors block text-sm sm:text-base">
                  +1 (437) 894-5030
                </a>
              </div>
              <div className="text-zinc-300 space-y-1">
                <div className="text-xs text-zinc-400 uppercase tracking-widest font-sans font-medium">Global Dispatch</div>
                <a href="tel:+923281433211" className="hover:text-white transition-colors block text-sm sm:text-base">
                  +92 328 1433211
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-mono uppercase tracking-[0.2em] text-white font-medium">
              Main Pages
            </h3>
            <ul className="space-y-2.5 text-sm sm:text-base text-zinc-300">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  {item.isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors inline-block"
                    >
                      {item.label} ↗
                    </a>
                  ) : (
                    <Link href={item.href} className="hover:text-white transition-colors inline-block">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Two Operational Locations (SRS Requirement) */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-mono uppercase tracking-[0.2em] text-white font-medium">
              Global Locations
            </h3>
            <div className="space-y-4 text-sm sm:text-base text-zinc-300">
              <div>
                <div className="text-white font-medium mb-1 flex items-center gap-1.5 text-sm sm:text-base">
                  <span>🇨🇦</span> Canada
                </div>
                <div className="text-zinc-400 font-mono text-xs sm:text-sm">
                  Brockroad, Pickering, Ontario
                </div>
              </div>
              <div>
                <div className="text-white font-medium mb-1 flex items-center gap-1.5 text-sm sm:text-base">
                  <span>🇵🇰</span> Pakistan
                </div>
                <div className="text-zinc-400 font-mono text-xs sm:text-sm leading-relaxed">
                  2nd Floor, Hall No. 2, WWIC, UOS, University Road, Sargodha
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Network & Social Media */}
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-mono uppercase tracking-[0.2em] text-white font-medium">
              Connect
            </h3>
            <div className="flex flex-col space-y-3 text-sm sm:text-base text-zinc-300">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>LinkedIn</span>
                <span className="text-xs text-zinc-400">↗</span>
              </a>
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>X (Twitter)</span>
                <span className="text-xs text-zinc-400">↗</span>
              </a>
              <a
                href="https://app.m-1.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5 text-zinc-200"
              >
                <span>M1 Portal</span>
                <span className="text-xs text-zinc-400">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-zinc-400 font-mono">
          <div>© {new Date().getFullYear()} M1 Aviation Ecosystem. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link href="/saios" className="hover:text-zinc-200 transition-colors">SAIOS Core</Link>
            <Link href="/industry-partner" className="hover:text-zinc-200 transition-colors">Partner Program</Link>
            <Link href="/aviation-times" className="hover:text-zinc-200 transition-colors">Aviation Times</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

