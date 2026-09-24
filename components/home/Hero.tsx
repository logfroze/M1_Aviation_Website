"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

// Trim point: play only the first N seconds, then loop from 0
const TRIM_END_SECONDS = 10;

export default function Hero({ paused = false }: { paused?: boolean }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);

  // ── Scroll → fade away / fade to black transition ──────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // Fade away effect as user scrolls down:
      // Starts smoothly as soon as scrolling begins, fully dark as leaving section
      const progress = Math.min(Math.max((scrollY - vh * 0.1) / (vh * 0.7), 0), 1);
      if (overlayRef.current) {
        overlayRef.current.style.opacity = String(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Control playback via `paused` prop ──────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (paused) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [paused]);

  // ── 10-second trim: restart video when it passes TRIM_END_SECONDS ─────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= TRIM_END_SECONDS) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[650px] flex items-center justify-center overflow-hidden bg-black select-none">

      {/* ── Background Video ────────────────────────────────────────────── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src="/videos/hero.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Subtle dark tint over video for visual contrast */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* ── Realistic White Clouds Formations across bottom of Hero (SRS/User Request) ── */}
      <div className="absolute bottom-0 left-0 right-0 h-56 sm:h-72 pointer-events-none z-15 overflow-hidden select-none">
        {/* Soft base gradient blending into next black section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

        {/* ── Left Heavy Defined Cloud Bank ── */}
        <div className="absolute -bottom-8 -left-12 w-[340px] sm:w-[480px] md:w-[580px] h-[220px] sm:h-[280px] pointer-events-none">
          {/* Deep white core */}
          <div className="absolute bottom-2 left-6 w-72 sm:w-96 h-48 rounded-full bg-white/70 blur-2xl" />
          <div className="absolute bottom-12 left-20 w-64 sm:w-80 h-40 rounded-full bg-zinc-100/60 blur-xl" />
          <div className="absolute -bottom-4 left-0 w-80 sm:w-[420px] h-36 rounded-full bg-white/85 blur-lg" />
          {/* Defined cumulus billows */}
          <svg viewBox="0 0 500 250" className="w-full h-full text-white/50 fill-current filter drop-shadow-[0_-10px_25px_rgba(255,255,255,0.45)]">
            <path d="M 0 250 L 0 160 Q 35 110 80 130 Q 120 70 190 90 Q 250 40 330 80 Q 400 90 440 160 Q 480 180 500 250 Z" />
          </svg>
        </div>

        {/* ── Right Heavy Defined Cloud Bank ── */}
        <div className="absolute -bottom-8 -right-12 w-[340px] sm:w-[480px] md:w-[580px] h-[220px] sm:h-[280px] pointer-events-none scale-x-[-1]">
          {/* Deep white core */}
          <div className="absolute bottom-2 left-6 w-72 sm:w-96 h-48 rounded-full bg-white/70 blur-2xl" />
          <div className="absolute bottom-12 left-20 w-64 sm:w-80 h-40 rounded-full bg-zinc-100/60 blur-xl" />
          <div className="absolute -bottom-4 left-0 w-80 sm:w-[420px] h-36 rounded-full bg-white/85 blur-lg" />
          {/* Defined cumulus billows */}
          <svg viewBox="0 0 500 250" className="w-full h-full text-white/50 fill-current filter drop-shadow-[0_-10px_25px_rgba(255,255,255,0.45)]">
            <path d="M 0 250 L 0 160 Q 35 110 80 130 Q 120 70 190 90 Q 250 40 330 80 Q 400 90 440 160 Q 480 180 500 250 Z" />
          </svg>
        </div>

        {/* ── Center Soft Floating Cloud Wisps (Lighter and Lower towards Center) ── */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] max-w-[850px] h-28 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.45)_0%,_rgba(255,255,255,0.15)_40%,_transparent_75%)] blur-2xl" />
          <svg viewBox="0 0 600 120" className="w-full h-full text-white/20 fill-current blur-sm -translate-y-4">
            <path d="M 50 120 Q 150 70 240 85 Q 300 55 380 75 Q 460 65 550 120 Z" />
          </svg>
        </div>
      </div>

      {/* ── Scroll Fade Overlay (smooth transition as user scrolls down) ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-500 ease-out z-20"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />

      {/* ── Centered M1 Logo — Transparent for the Hero Page ─────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6">
        <h1 className="sr-only">M1 Aviation</h1>
        <div className="w-[280px] sm:w-[420px] md:w-[560px] lg:w-[680px] max-w-[90vw] transition-all duration-700 hover:scale-[1.02]">
          <Image
            src="/m1-logo.png"
            alt="M1 Logo"
            width={1302}
            height={461}
            priority
            className="w-full h-auto object-contain opacity-90 hover:opacity-100 transition-opacity drop-shadow-[0_0_50px_rgba(255,255,255,0.18)]"
          />
        </div>
      </div>

    </section>
  );
}
