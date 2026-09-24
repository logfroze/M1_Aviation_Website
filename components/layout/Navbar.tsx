"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import M1Logo from "@/components/ui/M1Logo";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* ── Universal Suspended Floating Bottom Navigation Bar (SRS Requirement) ── */}
      <header className="fixed bottom-7 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none select-none">
        <nav
          aria-label="Main Suspended Navigation"
          className="pointer-events-auto flex items-center justify-between sm:justify-center gap-2 md:gap-4 lg:gap-5 px-5 sm:px-8 py-3 rounded-full bg-black/80 backdrop-blur-xl border border-white/20 text-zinc-300 shadow-[0_15px_45px_rgba(0,0,0,0.85)] transition-all max-w-4xl w-auto overflow-x-auto no-scrollbar font-mono text-[11px] sm:text-xs uppercase tracking-wider"
        >
          {/* 1. M1 Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group shrink-0"
            aria-label="M1 Home"
          >
            <M1Logo
              width={80}
              height={26}
              className="h-5 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </Link>

          <span className="text-zinc-600 hidden sm:inline">|</span>

          {/* 2. Aviati */}
          <Link
            href="/aviation-times"
            className={`whitespace-nowrap transition-colors px-2 py-1 rounded-full ${
              pathname === "/aviation-times"
                ? "text-white font-semibold bg-white/10"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Aviation
          </Link>

          <span className="text-zinc-600 hidden sm:inline">|</span>

          {/* 3. Marketplace */}
          <a
            href="https://app.m-1.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-zinc-400 hover:text-white transition-colors px-2 py-1 flex items-center gap-1"
          >
            <span>Marketplace</span>
            <span className="text-[9px] text-zinc-500">↗</span>
          </a>

          <span className="text-zinc-600 hidden sm:inline">|</span>

          {/* 4. Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="whitespace-nowrap text-zinc-400 hover:text-white transition-colors px-2 py-1 cursor-pointer"
          >
            Menu
          </button>

          <span className="text-zinc-600 hidden sm:inline">|</span>

          {/* 5. Industry Partner */}
          <Link
            href="/industry-partner"
            className={`whitespace-nowrap transition-colors px-2 py-1 rounded-full ${
              pathname === "/industry-partner"
                ? "text-white font-semibold bg-white/10"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Industry Partner
          </Link>

          <span className="text-zinc-600 hidden sm:inline">|</span>

          {/* 6. SIOS */}
          <Link
            href="/saios"
            className={`whitespace-nowrap transition-colors px-2 py-1 rounded-full ${
              pathname === "/saios"
                ? "text-white font-semibold bg-white/10"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            SIOS
          </Link>

          <span className="text-zinc-600 hidden sm:inline">|</span>

          {/* 7. Menu Icon (3 lines) */}
          <button
            type="button"
            aria-label="Open Full Navigation Menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 text-zinc-300 hover:text-white transition-colors flex items-center justify-center shrink-0 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </header>

      {/* ── Overlay Menu Modal (triggerable via Menu or 3 lines icon) ── */}
      {menuOpen && (
        <div
          role="dialog"
          aria-label="Navigation Directory"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-6 animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <M1Logo width={90} height={28} className="h-6 w-auto" />
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                  Directory
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="w-8 h-8 rounded-full border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-400 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col space-y-3 font-mono text-sm uppercase tracking-wider">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="py-2.5 px-4 rounded-xl hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors text-left flex items-center justify-between"
              >
                <span>01 // Home</span>
                <span className="text-xs text-zinc-600">Overview</span>
              </Link>
              <Link
                href="/aviation-times"
                onClick={() => setMenuOpen(false)}
                className="py-2.5 px-4 rounded-xl hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors text-left flex items-center justify-between"
              >
                <span>02 // Aviation Times</span>
                <span className="text-xs text-zinc-600">Newsletter</span>
              </Link>
              <a
                href="https://app.m-1.tech"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="py-2.5 px-4 rounded-xl hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors text-left flex items-center justify-between"
              >
                <span>03 // M1 Marketplace</span>
                <span className="text-xs text-zinc-500">app.m-1.tech ↗</span>
              </a>
              <Link
                href="/industry-partner"
                onClick={() => setMenuOpen(false)}
                className="py-2.5 px-4 rounded-xl hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors text-left flex items-center justify-between"
              >
                <span>04 // Industry Partner</span>
                <span className="text-xs text-zinc-600">Alliance</span>
              </Link>
              <Link
                href="/saios"
                onClick={() => setMenuOpen(false)}
                className="py-2.5 px-4 rounded-xl hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors text-left flex items-center justify-between"
              >
                <span>05 // SAIOS Core</span>
                <span className="text-xs text-zinc-600">Flight OS</span>
              </Link>
              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="py-2.5 px-4 rounded-xl hover:bg-zinc-900 text-zinc-300 hover:text-white transition-colors text-left flex items-center justify-between"
              >
                <span>06 // Contact & Advisory</span>
                <span className="text-xs text-zinc-600">Booking</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
