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

export default function Footer() {
  return (
    <footer className="relative bg-black text-zinc-400 border-t border-zinc-900 pt-52 pb-0 overflow-hidden select-none">
      {/* ── Atmospheric Clouds Horizon ─────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-72 overflow-hidden pointer-events-none z-0">
        {/* Sky Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 via-zinc-950/80 to-black" />

        {/* Volumetric Clouds Formations */}
        <div className="absolute -top-10 left-[-10%] w-[120%] h-48 opacity-45 blur-2xl bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.45)_0%,_transparent_65%)] animate-pulse" />
        <div className="absolute top-4 left-[20%] w-[60%] h-40 opacity-35 blur-3xl bg-[radial-gradient(ellipse_at_center,_rgba(200,225,255,0.4)_0%,_transparent_70%)]" />
        <div className="absolute top-16 left-0 right-0 h-28 bg-gradient-to-b from-transparent via-white/5 to-transparent blur-xl" />
      </div>

      {/* ── Left Supersonic Jet (Hovering with Streamlines, Closer to Top Line) ── */}
      <div className="absolute left-[-25px] sm:left-0 md:left-6 lg:left-12 top-[-52px] sm:top-[-38px] md:top-[-32px] lg:top-[-28px] w-[340px] sm:w-[460px] md:w-[560px] lg:w-[640px] h-[230px] sm:h-[310px] md:h-[380px] lg:h-[430px] z-10 group pointer-events-auto cursor-pointer">
        <div className="relative w-full h-full rotate-[12deg] transition-transform duration-500 ease-out group-hover:translate-x-3 group-hover:-translate-y-3 group-hover:rotate-[14deg] animate-[flightBobLeft_4.5s_easeInOut_infinite]">
          {/* Small Moving Airflow / Speed Slipstream Lines */}
          <div className="absolute inset-0 pointer-events-none overflow-visible">
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
        </div>
      </div>

      {/* ── Right Supersonic Jet (Mirrored, Banking toward Top Center) ── */}
      <div className="absolute right-[-25px] sm:right-0 md:right-6 lg:right-12 top-[-10px] sm:top-2 w-[340px] sm:w-[460px] md:w-[560px] lg:w-[640px] h-[230px] sm:h-[310px] md:h-[380px] lg:h-[430px] z-10 group pointer-events-auto cursor-pointer">
        <div className="relative w-full h-full scale-x-[-1] rotate-[12deg] transition-transform duration-500 ease-out group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:rotate-[14deg] animate-[flightBobRight_4.5s_easeInOut_infinite]">
          {/* Small Moving Airflow / Speed Slipstream Lines */}
          <div className="absolute inset-0 pointer-events-none overflow-visible">
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

      {/* ── Massive Edge-to-Edge Brand Display: M1 AVIATION (Elevated above bottom) ── */}
      <div className="w-full relative z-10 overflow-hidden select-none pointer-events-none mt-10 sm:mt-14 flex items-end justify-center px-0 pb-10 sm:pb-16 md:pb-20 leading-none">
        <h2
          className="text-[13.5vw] sm:text-[11vw] font-black italic tracking-tighter uppercase leading-[0.72] -skew-x-6 text-center whitespace-nowrap select-none -translate-y-2 sm:-translate-y-4"
          style={{
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #E4E4E7 25%, #71717A 48%, #27272A 68%, #09090B 85%, #000000 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(0,0,0,0.65) 70%, rgba(0,0,0,0.25) 88%, rgba(0,0,0,0.05) 100%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(0,0,0,0.65) 70%, rgba(0,0,0,0.25) 88%, rgba(0,0,0,0.05) 100%)',
          }}
        >
          M1 AVIATION
        </h2>
      </div>
    </footer>
  );
}
