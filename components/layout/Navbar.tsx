"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import M1Logo from "@/components/ui/M1Logo";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hiddenAtBottom, setHiddenAtBottom] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );

      // Hide navbar when scrolled into the bottom footer banner area (M1 AVIATION)
      if (scrollY + viewportHeight >= docHeight - 320) {
        setHiddenAtBottom(true);
      } else {
        setHiddenAtBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── Universal Suspended Floating Bottom Navigation Bar ── */}
      <header
        className={`fixed bottom-7 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none select-none transition-all duration-500 ease-out ${
          hiddenAtBottom ? "translate-y-28 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        }`}
      >
        <nav
          aria-label="Main Suspended Navigation"
          className="pointer-events-auto flex items-center justify-between sm:justify-center gap-3 sm:gap-6 md:gap-8 lg:gap-10 px-5 sm:px-8 md:px-10 py-1.5 sm:py-2 -skew-x-6 backdrop-blur-2xl border border-slate-300/40 hover:border-slate-200/60 text-white transition-all max-w-5xl md:max-w-5xl lg:max-w-6xl w-full sm:w-auto overflow-x-auto no-scrollbar font-mono text-[11px] sm:text-xs uppercase tracking-wider"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(20, 26, 36, 0.45) 50%, rgba(8, 12, 18, 0.60) 100%)",
            boxShadow:
              "0 15px 40px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.5), inset 0 -1px 1px rgba(0, 0, 0, 0.6), 0 0 25px rgba(203, 213, 225, 0.15)",
          }}
        >
          {/* Inner content un-skewed */}
          <div className="skew-x-6 flex items-center justify-between sm:justify-center gap-3 sm:gap-6 md:gap-8 lg:gap-10 w-full">
            {/* 1. M1 Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group shrink-0"
              aria-label="M1 Home"
            >
              <M1Logo
                width={80}
                height={24}
                className="h-4 sm:h-4.5 w-auto opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] transition-all"
              />
            </Link>

            <span className="text-slate-400/50 hidden sm:inline select-none font-light leading-none">|</span>

            {/* 2. Aviation */}
            <Link
              href="/aviation-times"
              className={`whitespace-nowrap transition-all duration-200 px-3 sm:px-3.5 py-0.5 sm:py-1 -skew-x-3 border font-bold tracking-[0.16em] ${
                pathname === "/aviation-times"
                  ? "text-white bg-white/20 border-white/60 shadow-[0_0_14px_rgba(255,255,255,0.45)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                  : "text-zinc-100 hover:text-white border-transparent hover:border-slate-300/40 hover:bg-white/10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
              }`}
            >
              <span className="inline-block skew-x-3">Aviation</span>
            </Link>

            <span className="text-slate-400/50 hidden sm:inline select-none font-light leading-none">|</span>

            {/* 3. Marketplace */}
            <a
              href="https://app.m-1.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap text-zinc-100 hover:text-white transition-all duration-200 px-3 sm:px-3.5 py-0.5 sm:py-1 -skew-x-3 border border-transparent hover:border-slate-300/40 hover:bg-white/10 flex items-center gap-1.5 font-bold tracking-[0.16em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
            >
              <span className="inline-block skew-x-3">Marketplace</span>
              <span className="inline-block skew-x-3 text-[9px] text-slate-200 font-bold">↗</span>
            </a>

            <span className="text-slate-400/50 hidden sm:inline select-none font-light leading-none">|</span>

            {/* 4. Industry Partner */}
            <Link
              href="/industry-partner"
              className={`whitespace-nowrap transition-all duration-200 px-3 sm:px-3.5 py-0.5 sm:py-1 -skew-x-3 border font-bold tracking-[0.16em] ${
                pathname === "/industry-partner"
                  ? "text-white bg-white/20 border-white/60 shadow-[0_0_14px_rgba(255,255,255,0.45)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                  : "text-zinc-100 hover:text-white border-transparent hover:border-slate-300/40 hover:bg-white/10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
              }`}
            >
              <span className="inline-block skew-x-3">Industry Partner</span>
            </Link>

            <span className="text-slate-400/50 hidden sm:inline select-none font-light leading-none">|</span>

            {/* 5. SIOS */}
            <Link
              href="/saios"
              className={`whitespace-nowrap transition-all duration-200 px-3 sm:px-3.5 py-0.5 sm:py-1 -skew-x-3 border font-bold tracking-[0.16em] ${
                pathname === "/saios"
                  ? "text-white bg-white/20 border-white/60 shadow-[0_0_14px_rgba(255,255,255,0.45)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                  : "text-zinc-100 hover:text-white border-transparent hover:border-slate-300/40 hover:bg-white/10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
              }`}
            >
              <span className="inline-block skew-x-3">SIOS</span>
            </Link>

            <span className="text-slate-400/50 hidden sm:inline select-none font-light leading-none">|</span>

            {/* 6. Hamburger icon */}
            <button
              type="button"
              aria-label="Open Full Navigation Menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1 sm:p-1.5 text-white hover:text-cyan-200 hover:bg-white/10 border border-transparent hover:border-slate-300/40 transition-all flex items-center justify-center shrink-0 cursor-pointer -skew-x-3"
            >
              <span className="skew-x-3 flex items-center justify-center">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Overlay Menu Modal ── */}
      {menuOpen && (
        <div
          role="dialog"
          aria-label="Navigation Directory"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-6 animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-lg bg-zinc-950/95 border border-slate-400/40 p-8 sm:p-10 shadow-2xl text-center space-y-6 -skew-x-2">
            <div className="skew-x-2">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <M1Logo width={90} height={28} className="h-6 w-auto" />
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                    Directory
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 border border-slate-600 text-zinc-300 hover:text-white hover:border-slate-300 flex items-center justify-center cursor-pointer -skew-x-3"
                >
                  <span className="skew-x-3">✕</span>
                </button>
              </div>

              <div className="flex flex-col space-y-2 font-mono text-sm uppercase tracking-wider mt-4">
                {[
                  { href: "/",                 label: "01 // Home",                 sub: "Overview",     external: false },
                  { href: "/aviation-times",   label: "02 // Aviation Times",       sub: "Newsletter",   external: false },
                  { href: "https://app.m-1.tech", label: "03 // M1 Marketplace",   sub: "app.m-1.tech ↗", external: true },
                  { href: "/industry-partner", label: "04 // Industry Partner",     sub: "Alliance",     external: false },
                  { href: "/saios",            label: "05 // SAIOS Core",           sub: "Flight OS",    external: false },
                  { href: "/#contact",         label: "06 // Contact & Advisory",   sub: "Booking",      external: false },
                ].map(({ href, label, sub, external }) => {
                  const cls = "py-2.5 px-4 -skew-x-3 border border-transparent hover:border-slate-500/50 hover:bg-white/10 text-zinc-100 hover:text-white transition-all text-left flex items-center justify-between group font-semibold";
                  const content = (
                    <>
                      <span className="inline-block skew-x-3">{label}</span>
                      <span className="inline-block skew-x-3 text-xs text-slate-400 group-hover:text-zinc-200">{sub}</span>
                    </>
                  );
                  return external ? (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className={cls}>{content}</a>
                  ) : (
                    <Link key={href} href={href} onClick={() => setMenuOpen(false)} className={cls}>{content}</Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
