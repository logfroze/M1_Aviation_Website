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
function JetFlameTorch({ idPrefix }: { idPrefix: string }) {
  return (
    <div className="relative w-full h-full">
      {/* Tight, sleek atmospheric glow (tight spread, no oversized cloud) */}
      <div className="absolute -inset-x-3 -inset-y-1 bg-[radial-gradient(ellipse_at_80%_50%,_rgba(255,255,255,0.9)_0%,_rgba(56,189,248,0.85)_20%,_rgba(249,115,22,0.85)_50%,_transparent_100%)] blur-sm rounded-full opacity-85 mix-blend-screen" />
      <div className="absolute -inset-x-5 -inset-y-1.5 bg-[radial-gradient(ellipse_at_75%_50%,_rgba(255,140,0,0.65)_0%,_rgba(234,88,12,0.35)_50%,_transparent_80%)] blur-md opacity-70 mix-blend-screen" />
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[radial-gradient(circle,_#ffffff_0%,_#38bdf8_35%,_#f97316_70%,_transparent_100%)] blur-[1.5px] mix-blend-screen opacity-95" />

      {/* Sharp Supersonic Thrust Stream SVG */}
      <svg
        viewBox="0 0 160 30"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full overflow-visible drop-shadow-[0_0_12px_rgba(249,115,22,0.9)]"
      >
        <defs>
          <linearGradient id={`${idPrefix}-torch`} x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="8%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="20%" stopColor="#fef08a" stopOpacity="1" />
            <stop offset="40%" stopColor="#ff7700" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#ff3d00" stopOpacity="0.8" />
            <stop offset="90%" stopColor="#ea580c" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#c2410c" stopOpacity="0" />
          </linearGradient>

          <linearGradient id={`${idPrefix}-core`} x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="25%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.95" />
            <stop offset="75%" stopColor="#fdba74" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>

          <linearGradient id={`${idPrefix}-needle`} x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="85%" stopColor="#bae6fd" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <radialGradient id={`${idPrefix}-throat`} cx="100%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="35%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="70%" stopColor="#f97316" stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Aerodynamic High-Thrust Torch */}
        <path
          d="M 160,11 C 120,8.5 70,5 28,6.5 C 10,7.5 0,11.5 0,15 C 0,18.5 10,22.5 28,23.5 C 70,25 120,21.5 160,19 Z"
          fill={`url(#${idPrefix}-torch)`}
          filter="blur(0.8px)"
        />

        {/* Mid High-Heat Flame Mantle */}
        <path
          d="M 160,12 C 125,10 75,7.5 32,8.5 C 14,10 6,13 6,15 C 6,17 14,20 32,21.5 C 75,22.5 125,20 160,18 Z"
          fill={`url(#${idPrefix}-core)`}
          filter="blur(0.4px)"
        />

        {/* Razor-Sharp Center White-Hot Plasma Needle */}
        <path
          d="M 160,13.8 C 130,13 90,12 42,13 C 22,13.8 12,14.5 12,15 C 12,15.5 22,16.2 42,17 C 90,18 130,17 160,16.2 Z"
          fill={`url(#${idPrefix}-needle)`}
        />

        {/* 4 Crisp Supersonic Mach Shock Diamonds */}
        <polygon points="140,15 144.5,11.5 149,15 144.5,18.5" fill="#ffffff" filter="drop-shadow(0 0 4px #38bdf8)" />
        <polygon points="115,15 120.5,11 126,15 120.5,19" fill="#ffffff" filter="drop-shadow(0 0 6px #ffffff)" />
        <polygon points="88,15 94.5,11.5 101,15 94.5,18.5" fill="#fef08a" filter="drop-shadow(0 0 5px #f97316)" />
        <polygon points="62,15 67.5,12.5 73,15 67.5,17.5" fill="#fed7aa" filter="drop-shadow(0 0 4px #ea580c)" />

        {/* Nozzle Throat Flare */}
        <ellipse cx="160" cy="15" rx="6" ry="9" fill={`url(#${idPrefix}-throat)`} />
        <ellipse cx="160" cy="15" rx="3" ry="5" fill="#ffffff" />
      </svg>
    </div>
  );
}

function FooterJetThrustFire() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
      {/* ── Engine 1: Upper / Tail Engine ── */}
      <div
        className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out origin-right"
        style={{
          top: "67.5%",
          right: "79.3%",
          width: "16%",
          height: "22px",
          transformOrigin: "right center",
          transform: "translateY(-50%) rotate(-24.5deg)",
        }}
      >
        <JetFlameTorch idPrefix="e1" />
      </div>

      {/* ── Engine 2: Lower / Wing Engine ── */}
      <div
        className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out origin-right"
        style={{
          top: "72.4%",
          right: "62.6%",
          width: "16%",
          height: "22px",
          transformOrigin: "right center",
          transform: "translateY(-50%) rotate(-15.5deg)",
        }}
      >
        <JetFlameTorch idPrefix="e2" />
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

            {/* Transparent PNG Jet */}
            <Image
              src="/images/footer-jet.png"
              alt="M1 Supersonic Interceptor"
              fill
              sizes="(max-width: 768px) 340px, 640px"
              className="object-contain relative z-10 drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]"
            />

            {/* Dynamic Supersonic Afterburner Thrust Fire on Hover */}
            <FooterJetThrustFire />
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

            {/* Transparent PNG Jet */}
            <Image
              src="/images/footer-jet.png"
              alt="M1 Supersonic Fleet Interceptor"
              fill
              sizes="(max-width: 768px) 340px, 640px"
              className="object-contain relative z-10 drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)]"
            />

            {/* Dynamic Supersonic Afterburner Thrust Fire on Hover */}
            <FooterJetThrustFire />
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

