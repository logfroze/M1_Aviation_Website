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

      // Hide only at the very bottom copyright edge if needed
      if (scrollY + viewportHeight >= docHeight - 80) {
        setHiddenAtBottom(true);
      } else {
        setHiddenAtBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when menu drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ── Suspended Floating Bottom Navigation Bar (Rounded & Transparent) ── */}
      <header
        className={`fixed bottom-7 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none select-none transition-all duration-500 ease-out ${
          hiddenAtBottom ? "translate-y-28 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        }`}
      >
        <nav
          aria-label="Main Suspended Navigation"
          className="pointer-events-auto flex items-center justify-between sm:justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-6 sm:px-8 md:px-10 py-2 sm:py-2.5 rounded-full backdrop-blur-xl border border-white/20 hover:border-white/35 text-white transition-all max-w-5xl md:max-w-5xl lg:max-w-6xl w-full sm:w-auto overflow-x-auto no-scrollbar font-mono text-[11px] sm:text-xs uppercase tracking-wider shadow-[0_12px_40px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.3)]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(10, 15, 25, 0.22) 50%, rgba(5, 8, 14, 0.28) 100%)",
          }}
        >
          {/* Inner content */}
          <div className="flex items-center justify-between sm:justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full">
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

            {/* 2. AVI Times */}
            <Link
              href="/aviation-times"
              className={`whitespace-nowrap transition-all duration-200 px-3.5 py-1 rounded-full font-bold tracking-[0.16em] ${
                pathname === "/aviation-times"
                  ? "text-white bg-white/20 border border-white/60 shadow-[0_0_14px_rgba(255,255,255,0.4)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                  : "text-zinc-200 hover:text-white border border-transparent hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <span>AVI Times</span>
            </Link>

            {/* 3. Marketplace */}
            <Link
              href="/marketplace"
              className={`whitespace-nowrap transition-all duration-200 px-3.5 py-1 rounded-full font-bold tracking-[0.16em] ${
                pathname === "/marketplace"
                  ? "text-white bg-white/20 border border-white/60 shadow-[0_0_14px_rgba(255,255,255,0.4)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                  : "text-zinc-200 hover:text-white border border-transparent hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <span>Marketplace</span>
            </Link>

            {/* 4. Industry Partner */}
            <Link
              href="/industry-partner"
              className={`whitespace-nowrap transition-all duration-200 px-3.5 py-1 rounded-full font-bold tracking-[0.16em] ${
                pathname === "/industry-partner"
                  ? "text-white bg-white/20 border border-white/60 shadow-[0_0_14px_rgba(255,255,255,0.4)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                  : "text-zinc-200 hover:text-white border border-transparent hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <span>Industry Partner</span>
            </Link>

            {/* 5. SIOS */}
            <Link
              href="/saios"
              className={`whitespace-nowrap transition-all duration-200 px-3.5 py-1 rounded-full font-bold tracking-[0.16em] ${
                pathname === "/saios"
                  ? "text-white bg-white/20 border border-white/60 shadow-[0_0_14px_rgba(255,255,255,0.4)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                  : "text-zinc-200 hover:text-white border border-transparent hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <span>SIOS</span>
            </Link>

            {/* 6. Hamburger Menu Button */}
            <button
              type="button"
              aria-label="Open Extended Menu Drawer"
              onClick={() => setMenuOpen(true)}
              className="p-1.5 rounded-full text-white hover:text-cyan-200 hover:bg-white/15 border border-transparent hover:border-white/30 transition-all flex items-center justify-center shrink-0 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* ── Slide-in Menu Panel Drawer (Image 5 Reference) ── */}
      {/* 1. Backdrop with blur */}
      <div
        className={`fixed inset-0 z-50 bg-black/65 backdrop-blur-md transition-opacity duration-300 pointer-events-auto ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* 2. Slide-over Right Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Extended Navigation Menu"
        className={`fixed top-0 right-0 bottom-0 w-full max-w-[340px] sm:max-w-[400px] z-50 bg-[#08090c] border-l border-white/10 p-8 sm:p-10 flex flex-col justify-between shadow-[0_0_80px_rgba(0,0,0,0.95)] transition-transform duration-300 ease-out select-none ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Header Row: Brand + Sharp Close Button */}
          <div className="flex items-center justify-between pb-8">
            <div className="flex items-center gap-2.5">
              <M1Logo width={85} height={26} className="h-5 w-auto" />
              <span className="text-white font-bold tracking-wider text-base uppercase">
                Aviation
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close Menu"
              className="w-9 h-9 rounded-none border border-white/20 hover:border-white text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer bg-white/5 hover:bg-white/10"
            >
              <span className="text-sm">✕</span>
            </button>
          </div>

          {/* Subheader: EXTENDED MENU (Website colors: Silver/Grey) */}
          <div className="mb-6">
            <span className="text-[11px] font-mono tracking-[0.28em] text-zinc-400 uppercase font-bold">
              EXTENDED MENU
            </span>
          </div>

          {/* Navigation Links List (Large, bold, modern typography) */}
          <nav className="flex flex-col space-y-3.5">
            {[
              { href: "/",                 label: "Home",                 sub: "Overview" },
              { href: "/aviation-times",   label: "AVI Times",            sub: "Journal" },
              { href: "/marketplace",      label: "Marketplace",          sub: "Exchange" },
              { href: "/industry-partner", label: "Industry Partner",     sub: "Alliance" },
              { href: "/saios",            label: "SIOS",                 sub: "Flight OS" },
              { href: "/#contact",         label: "Contact",              sub: "Dispatch" },
            ].map(({ href, label, sub }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between text-2xl sm:text-[28px] font-bold text-zinc-200 hover:text-white transition-all py-1 hover:translate-x-2"
              >
                <span>{label}</span>
                <span className="text-xs font-mono text-zinc-500 group-hover:text-zinc-300 font-normal">
                  {sub}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Drawer Bottom: Platform Brand Info */}
        <div className="pt-6 border-t border-zinc-900 mt-auto">
          <div className="text-center text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
            M1 Global Aviation Platform
          </div>
        </div>
      </aside>
    </>
  );
}

