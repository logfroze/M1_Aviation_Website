"use client";

import React, { useState } from "react";
import Image from "next/image";
import ParallelogramButton from "@/components/ui/ParallelogramButton";

export default function AviGramSection() {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(1428);

  const toggleLike = () => {
    if (liked) {
      setLikesCount((prev) => prev - 1);
      setLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setLiked(true);
    }
  };

  return (
    <section
      id="avigram"
      aria-label="M1 AviGram Platform"
      className="relative w-full py-28 sm:py-36 bg-[#08070d] text-white select-none overflow-hidden"
    >
      {/* ── Background Instagram Theme Ambient Halos (Zero gold/yellow, pure silver, white, ruby & violet) ── */}
      <div className="absolute top-1/4 -left-36 w-[550px] h-[550px] bg-gradient-to-tr from-[#833ab4]/25 via-[#e1306c]/18 to-white/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-36 w-[600px] h-[600px] bg-gradient-to-bl from-[#833ab4]/20 via-[#c13584]/20 to-slate-400/10 blur-[130px] pointer-events-none" />
      
      {/* Subtle Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 z-10">
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 space-y-4">
          {/* Tilted Sharp-Cornered Pill Badge (M1 Presents) */}
          <div className="-skew-x-12 inline-flex items-center gap-2.5 px-5 py-2 border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_0_25px_rgba(225,48,108,0.25)]">
            <span className="skew-x-12 inline-block text-[11px] font-mono tracking-[0.40em] uppercase font-bold text-zinc-100">
              M1 Presents
            </span>
          </div>

          {/* Heading: Avigram in Instagram 2010 retro cursive script font */}
          <h2
            className="text-6xl sm:text-8xl md:text-9xl tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-[#e1306c] drop-shadow-[0_0_25px_rgba(225,48,108,0.35)] py-1"
            style={{
              fontFamily: "'Grand Hotel', 'Brush Script MT', 'Segoe Script', cursive, sans-serif",
              fontWeight: 400,
            }}
          >
            Avigram
          </h2>

          <p className="text-lg sm:text-2xl text-zinc-200 font-light leading-relaxed tracking-wide">
            Aviation needs its own socializing platform
          </p>
        </div>

        {/* ── Interactive Grid Layout: Feed Mockup + Feature Breakdown ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Ultra-Clean Post Feed Card (Picture + Description Only) */}
          <div className="lg:col-span-7 flex justify-center">
            {/* Tilted Sharp-Cornered Device Chassis */}
            <div className="relative w-full max-w-[480px] -skew-x-2 sm:-skew-x-3 p-[2px] bg-gradient-to-b from-white/90 via-[#e1306c] to-[#833ab4] shadow-[0_25px_80px_rgba(131,58,180,0.35),0_0_35px_rgba(255,255,255,0.12)]">
              {/* Inner Chassis Body */}
              <div className="w-full bg-[#0d0c13] p-4 sm:p-5 overflow-hidden border border-white/15 space-y-4">
                
                {/* 1. Cinematic Post Visual (Hero focus) */}
                <div className="relative w-full h-[320px] sm:h-[370px] border border-white/15 group overflow-hidden">
                  <Image
                    src="/images/avigram-card.jpg"
                    alt="AviGram cockpit flight feed sunset view"
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />

                  {/* Top-Right Minimal AviGram Brand Tag */}
                  {/* <div className="absolute top-3 right-3 -skew-x-12 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-mono text-zinc-200 flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 bg-white animate-ping inline-block" />
                    <span className="skew-x-12 font-bold tracking-wider">AVIGRAM DISPATCH</span>
                  </div> */}

                  {/* HUD Telemetry Overlay: Tilted Sharp Box with White/Silver & Ruby */}
                  <div className="absolute bottom-3 left-3 -skew-x-12 px-3 py-1.5 bg-black/85 backdrop-blur-md border border-white/25 text-[10px] font-mono text-white flex items-center gap-2 shadow-lg">
                    <div className="skew-x-12 flex items-center gap-2">
                      <span className="text-white font-bold">ALT</span> 43,000 FT
                      <span className="text-zinc-500">|</span>
                      <span className="text-[#e1306c] font-bold">MACH</span> 0.90
                      <span className="text-zinc-500">|</span>
                      <span className="text-slate-300 font-bold">OAT</span> -56°C
                    </div>
                  </div>

                  {/* Sunset Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* 2. Post Action Buttons (Like, Comment, Dispatch, Bookmark) */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-4">
                    {/* Heart Like Button */}
                    <button
                      type="button"
                      onClick={toggleLike}
                      className="flex items-center gap-1.5 focus:outline-none transition-transform active:scale-125"
                    >
                      <svg
                        className={`w-5 h-5 transition-colors ${
                          liked ? "text-[#e1306c] fill-[#e1306c]" : "text-white fill-none"
                        }`}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span className="text-xs font-mono font-bold text-zinc-200">
                        {likesCount.toLocaleString()}
                      </span>
                    </button>

                    {/* Comment Bubble */}
                    <div className="flex items-center gap-1.5 text-zinc-300">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-xs font-mono text-zinc-400">84</span>
                    </div>

                    {/* Paper Plane / Avionics Dispatch */}
                    <button type="button" className="text-zinc-300 hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>

                  {/* Bookmark */}
                  <button type="button" className="text-zinc-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>

                {/* 3. Post Description Caption & Flight Route */}
                <div className="space-y-1.5 pt-1 border-t border-white/10">
                  <p className="text-xs text-zinc-200 leading-relaxed">
                    <span className="font-semibold text-white mr-1.5">Capt. Vance</span>
                    <br />
                    Cruising at FL430 above the cloud blanket. <br />SIOS auto-telemetry optimized our climb profile, saving 180kg of Jet-A.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Platform Features & Access Invitation (Col 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Feature 1: Opportunity Scrolling */}
            <div className="-skew-x-6 sm:-skew-x-12 p-6 bg-zinc-950/80 border border-white/15 hover:border-white/40 hover:bg-zinc-900/80 transition-all duration-300 group shadow-lg">
              <div className="skew-x-6 sm:skew-x-12">
                <div className="flex items-center gap-3.5 mb-2.5">
                  <div className="-skew-x-12 w-9 h-9 border border-white/30 bg-gradient-to-br from-white via-slate-200 to-slate-400 text-black flex items-center justify-center font-black text-xs shadow-md">
                    <span className="skew-x-12">01</span>
                  </div>
                  <h3 className="text-lg font-medium text-white group-hover:text-slate-200 transition-colors">
                    Opportunity Scrolling
                  </h3>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed pl-12">
                  Gain knowledge and explore opportunities while scrolling.
                </p>
              </div>
            </div>

            {/* Feature 2: Nerds Togethere */}
            <div className="-skew-x-6 sm:-skew-x-12 p-6 bg-zinc-950/80 border border-white/15 hover:border-white/40 hover:bg-zinc-900/80 transition-all duration-300 group shadow-lg">
              <div className="skew-x-6 sm:skew-x-12">
                <div className="flex items-center gap-3.5 mb-2.5">
                  <div className="-skew-x-12 w-9 h-9 border border-white/30 bg-gradient-to-br from-[#e1306c] to-[#833ab4] text-white flex items-center justify-center font-black text-xs shadow-md">
                    <span className="skew-x-12">02</span>
                  </div>
                  <h3 className="text-lg font-medium text-white group-hover:text-rose-200 transition-colors">
                    Nerds Togethere
                  </h3>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed pl-12">
                  Aviation community brought togethere.
                </p>
              </div>
            </div>

            {/* Feature 3: Aviation Exclusivity */}
            <div className="-skew-x-6 sm:-skew-x-12 p-6 bg-zinc-950/80 border border-white/15 hover:border-white/40 hover:bg-zinc-900/80 transition-all duration-300 group shadow-lg">
              <div className="skew-x-6 sm:skew-x-12">
                <div className="flex items-center gap-3.5 mb-2.5">
                  <div className="-skew-x-12 w-9 h-9 border border-white/30 bg-gradient-to-br from-slate-200 via-slate-300 to-zinc-400 text-black flex items-center justify-center font-black text-xs shadow-md">
                    <span className="skew-x-12">03</span>
                  </div>
                  <h3 className="text-lg font-medium text-white group-hover:text-slate-200 transition-colors">
                    Aviation Exclusivity
                  </h3>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed pl-12">
                  Made for you, built for you, built by M1. Features designed for aviation nerds specifically.
                </p>
              </div>
            </div>

            {/* CTA Box with Parallelogram Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <ParallelogramButton
                href="/#contact"
                variant="white"
                className="w-full sm:w-auto text-xs py-4 px-10 shadow-[0_0_30px_rgba(225,48,108,0.35)] font-bold tracking-widest"
              >
                Pre-signup ↗
              </ParallelogramButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
