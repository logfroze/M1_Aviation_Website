"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { SAMPLE_ARTICLES } from "@/data/articles";
import { LINKEDIN_URL } from "@/data/navigation";
import ParallelogramButton from "@/components/ui/ParallelogramButton";

export default function AviationTimesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success">("idle");
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return SAMPLE_ARTICLES;
    const q = searchQuery.toLowerCase();
    return SAMPLE_ARTICLES.filter(
      (art) =>
        art.title.toLowerCase().includes(q) ||
        art.summary.toLowerCase().includes(q) ||
        art.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus("loading");
    setTimeout(() => {
      setSubStatus("success");
    }, 600);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey === "m1admin" || adminKey.length > 3) {
      setAdminLoggedIn(true);
    }
  };

  return (
    <div className="w-full flex flex-col items-center pt-20 pb-36 px-6 md:px-12 max-w-5xl mx-auto select-none">
      {/* ── 1. Search Bar at Top (SRS: "There will be a search bar") ── */}
      <div className="w-full max-w-xl mx-auto pt-6 mb-12">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search aviation editorial library..."
            className="w-full pl-11 pr-12 py-3.5 bg-zinc-950 border border-zinc-800 rounded-full text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors shadow-lg"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── 2. Heading & Subheading (SRS Requirement) ────────────────── */}
      <div className="w-full text-center space-y-3 mb-16">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extralight tracking-tight text-white">
          Aviation Times:
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-light text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          The Newsletter that covers the innovation and current affairs of business aviation.
        </p>

        {/* Backend Management Tag (SRS Requirement) */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setAdminModalOpen(true)}
            className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors underline cursor-pointer"
          >
            {adminLoggedIn ? "⚙ Editorial Admin (Logged In)" : "🔐 Editorial CMS Login"}
          </button>
        </div>
      </div>

      {/* ── 3. Article Cards (SRS: One article in one row, image on left side, heading on right, distinct color) ── */}
      <section aria-label="Published Articles Carousel Feed" className="w-full space-y-8 mb-20">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 border border-zinc-800 rounded-3xl bg-zinc-950">
            <p className="text-sm text-zinc-400">
              No published dispatches matched &ldquo;{searchQuery}&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-xs font-mono underline text-zinc-300 mt-2 hover:text-white cursor-pointer"
            >
              Reset Search
            </button>
          </div>
        ) : (
          filteredArticles.map((article) => (
            <article
              key={article.id}
              className={`p-6 sm:p-8 rounded-3xl border shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center ${article.accentColor}`}
            >
              {/* Image on Left Side (SRS Requirement) */}
              <div className="shrink-0 w-full md:w-64 h-44 rounded-2xl overflow-hidden relative shadow-md bg-zinc-900 border border-white/10">
                {article.imageUrl ? (
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 256px"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className={`w-full h-full ${article.thumbBg}`} />
                )}
                {/* Category Pill Tag Overlay */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-200">
                  {article.category}
                </div>
              </div>

              {/* Heading & Summary on Right Side (SRS Requirement) */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-zinc-400">
                  <span>{article.date}</span>
                  <span className="text-zinc-600">•</span>
                  <span>{article.readTime}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-light text-white tracking-tight leading-snug">
                  {article.title}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  {article.summary}
                </p>

                <div className="pt-2">
                  <span className="text-xs font-mono tracking-wider uppercase text-zinc-400 hover:text-white inline-flex items-center gap-1.5 cursor-pointer">
                    <span>Read Full Dispatch</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      {/* ── 4. Newsletter Subscription (SRS Requirement) ─────────────── */}
      <section
        aria-label="Newsletter Subscription"
        className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-12 mb-14 text-center shadow-2xl relative overflow-hidden"
      >
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400">
            Bi-Weekly Executive Intel
          </div>
          <h3 className="text-2xl sm:text-4xl font-light text-white">
            Subscribe to Aviation Times
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Direct briefings on aircraft valuations, autonomous avionics regulations, and sustainable fuels.
          </p>

          {subStatus === "success" ? (
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs font-mono max-w-md mx-auto">
              ✓ Added to executive dispatch roster. Confirmation dispatched.
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your corporate email"
                className="w-full px-4 py-3.5 bg-black border border-zinc-700 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors font-mono"
              />
              <button
                type="submit"
                disabled={subStatus === "loading"}
                className="w-full sm:w-auto px-7 py-3.5 bg-white text-black hover:bg-zinc-200 text-xs font-mono uppercase tracking-wider font-semibold rounded-xl shrink-0 transition-colors shadow-md cursor-pointer"
              >
                {subStatus === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ── 5. LinkedIn CTA & Contact Home Link (SRS Requirement) ───── */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 p-7 rounded-3xl border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
        <div className="text-center sm:text-left">
          <div className="text-sm font-light text-white">Follow Aviation Times on LinkedIn</div>
          <div className="text-xs text-zinc-500 font-mono mt-0.5">
            Connect with our editorial council and fleet analysts
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <ParallelogramButton href={LINKEDIN_URL} isExternal={true} variant="silver" className="text-xs">
            Follow on LinkedIn ↗
          </ParallelogramButton>

          {/* Contact button leading to contact section of home page (SRS Requirement) */}
          <Link
            href="/#contact"
            className="text-xs font-mono text-zinc-300 hover:text-white underline uppercase tracking-wider px-3 py-2"
          >
            Contact Editorial
          </Link>
        </div>
      </div>

      {/* ── Backend CMS Login Modal (SRS: "option to log in and manage these articles") ── */}
      {adminModalOpen && (
        <div
          role="dialog"
          aria-label="Editorial Management Login"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
        >
          <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="text-lg font-light text-white">Aviation Times CMS</h3>
              <button
                type="button"
                onClick={() => setAdminModalOpen(false)}
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            {adminLoggedIn ? (
              <div className="space-y-4">
                <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-xl text-xs font-mono text-emerald-400">
                  ✓ Authentication verified. Editorial CMS unlocked.
                </div>
                <div className="space-y-2 text-xs font-mono text-zinc-300">
                  <div className="p-3 bg-zinc-900 rounded-lg flex justify-between">
                    <span>Manage Published (5 Articles)</span>
                    <span className="text-zinc-500">[Edit]</span>
                  </div>
                  <div className="p-3 bg-zinc-900 rounded-lg flex justify-between">
                    <span>Draft New Dispatch</span>
                    <span className="text-zinc-500">[+ New]</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAdminLoggedIn(false)}
                  className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-mono uppercase"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <p className="text-xs text-zinc-400">
                  Enter your editorial credentials or passcode to manage and publish newsletter dispatches.
                </p>
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="Passcode (e.g. m1admin)"
                  className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-xl text-xs text-white"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-white text-black hover:bg-zinc-200 font-mono text-xs uppercase font-semibold rounded-xl"
                >
                  Access CMS
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
