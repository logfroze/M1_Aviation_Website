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
    <div className="w-full min-h-screen bg-white text-zinc-900 pt-24 pb-36 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col items-center">
        {/* ── 1. Search Bar at Top ── */}
        <div className="w-full max-w-xl mx-auto pt-2 mb-12">
          <div className="relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search aviation editorial library..."
              className="w-full pl-12 pr-12 py-4 bg-zinc-100 border border-zinc-300 rounded-full text-sm sm:text-base text-zinc-900 placeholder-zinc-500 focus:outline-none focus:border-zinc-900 focus:bg-white transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-500 hover:text-black cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ── 2. Editorial Heading & Subheading ── */}
        <div className="w-full text-center space-y-4 mb-20">
          {/* <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-zinc-200 bg-zinc-100 text-[10px] font-mono tracking-[0.25em] text-zinc-600 uppercase">
          </div> */}

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-zinc-950">
            Aviation Times:
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-normal text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            The Newsletter that covers the innovation and current affairs of business aviation.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setAdminModalOpen(true)}
              className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors underline cursor-pointer"
            >
              {adminLoggedIn ? "⚙ Editorial Admin (Logged In)" : "🔐 Editorial CMS Login"}
            </button>
          </div>
        </div>

        {/* ── 3. Significantly Enlarged Article Cards ── */}
        <section aria-label="Published Articles Feed" className="w-full space-y-12 mb-24">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20 border border-zinc-200 rounded-3xl bg-zinc-50">
              <p className="text-base text-zinc-600">
                No published dispatches matched &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs font-mono underline text-zinc-900 mt-3 hover:text-black cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <article
                key={article.id}
                className="p-8 sm:p-10 md:p-12 lg:p-14 rounded-3xl border border-zinc-200/90 bg-zinc-50/80 hover:bg-white shadow-[0_15px_45px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col md:flex-row gap-8 lg:gap-12 items-center"
              >
                {/* Enlarged Image on Left */}
                <div className="shrink-0 w-full md:w-[380px] lg:w-[440px] h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden relative shadow-md bg-zinc-100 border border-zinc-200 group">
                  {article.imageUrl ? (
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 440px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-200" />
                  )}
                  {/* Category Pill Tag Overlay */}
                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-md bg-black/85 backdrop-blur-md text-white text-xs font-mono tracking-wider">
                    {article.category}
                  </div>
                </div>

                {/* Enlarged Heading & Summary on Right */}
                <div className="flex-1 space-y-4 w-full">
                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono text-zinc-500">
                    <span className="font-medium text-zinc-700">{article.date}</span>
                    <span className="text-zinc-400">•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-zinc-950 tracking-tight leading-snug hover:text-zinc-700 transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
                    {article.summary}
                  </p>

                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-mono tracking-wider uppercase text-zinc-950 font-bold inline-flex items-center gap-2 hover:translate-x-1 transition-transform cursor-pointer">
                      <span>Read Full Dispatch</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>

        {/* ── 4. Newsletter Subscription ── */}
        <section
          aria-label="Newsletter Subscription"
          className="w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-10 sm:p-16 mb-16 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400">
              Bi-Weekly Executive Intel
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white">
              Subscribe to Aviation Times
            </h3>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Direct briefings on aircraft valuations, autonomous avionics regulations, and sustainable fuels.
            </p>

            {subStatus === "success" ? (
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs font-mono max-w-md mx-auto">
                ✓ Added to executive dispatch roster. Confirmation dispatched.
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your corporate email"
                  className="w-full px-5 py-4 bg-black border border-zinc-700 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 transition-colors font-mono"
                />
                <button
                  type="submit"
                  disabled={subStatus === "loading"}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-zinc-200 text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold rounded-xl shrink-0 transition-colors shadow-md cursor-pointer"
                >
                  {subStatus === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ── 5. LinkedIn CTA & Contact Home Link ── */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10 rounded-3xl border border-zinc-200 bg-zinc-50 shadow-sm">
          <div className="text-center sm:text-left">
            <div className="text-base sm:text-lg font-light text-zinc-950">Follow Aviation Times on LinkedIn</div>
            <div className="text-xs sm:text-sm text-zinc-500 font-mono mt-1">
              Connect with our editorial council and fleet analysts
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <ParallelogramButton href={LINKEDIN_URL} isExternal={true} variant="gold" className="text-xs px-8 py-3.5">
              Follow on LinkedIn ↗
            </ParallelogramButton>

            <Link
              href="/#contact"
              className="text-xs sm:text-sm font-mono text-zinc-700 hover:text-black underline uppercase tracking-wider px-3 py-2 font-medium"
            >
              Contact Editorial
            </Link>
          </div>
        </div>

        {/* ── Backend CMS Login Modal ── */}
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
                  className="text-zinc-500 hover:text-white cursor-pointer"
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
                    className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-mono uppercase cursor-pointer"
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
                    className="w-full py-3 bg-white text-black hover:bg-zinc-200 font-mono text-xs uppercase font-semibold rounded-xl cursor-pointer"
                  >
                    Access CMS
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
