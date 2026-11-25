"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero({ paused = false }: { paused?: boolean }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);

  // ── Scroll → fade away / fade to black transition (Buffered in RAF to prevent forced reflow) ──
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const vh = window.innerHeight;
          const progress = Math.min(Math.max((scrollY - vh * 0.1) / (vh * 0.7), 0), 1);
          if (overlayRef.current) {
            overlayRef.current.style.opacity = String(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Video Playback: normal 1.0x speed, 0s-10s -> skip -> 20s to 55s trim, continuous loop ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly guarantee muted attributes for strict browser autoplay compliance
    video.muted = true;
    video.defaultMuted = true;
    video.playbackRate = 1.0;

    const playVideo = () => {
      if (video.paused && !paused) {
        video.play().catch(() => {});
      }
    };

    playVideo();
    window.addEventListener("touchstart", playVideo, { once: true, passive: true });
    window.addEventListener("scroll", playVideo, { once: true, passive: true });
    window.addEventListener("click", playVideo, { once: true, passive: true });

    const handleTimeUpdate = () => {
      // Skip the 10th to 20th seconds window
      if (video.currentTime >= 10 && video.currentTime < 20) {
        video.currentTime = 20;
      }
      // Trim at 55 seconds: do not play past 55 seconds, loop seamlessly back to 0
      if (video.currentTime >= 55) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else if (video.duration && video.currentTime >= video.duration - 0.2) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("canplay", playVideo);

    return () => {
      window.removeEventListener("touchstart", playVideo);
      window.removeEventListener("scroll", playVideo);
      window.removeEventListener("click", playVideo);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("canplay", playVideo);
    };
  }, [paused]);

  return (
    <section className="relative w-full h-screen min-h-[650px] flex items-center justify-center overflow-hidden bg-black select-none">

      {/* ── Background Video (Served from Global Cloudinary Edge CDN for sub-second start) ── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        src={
          process.env.NEXT_PUBLIC_CLOUDINARY_HERO_VIDEO_URL ||
          "https://res.cloudinary.com/gf2v9kfu/video/upload/v1794257278/m1-aviation/videos/hero.mp4"
        }
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      {/* Subtle dark tint over video for visual contrast */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Soft dark base gradient smoothly blending into following black section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />

      {/* ── Scroll Fade Overlay (smooth transition as user scrolls down) ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-500 ease-out z-20"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />

      {/* ── Centered M1 Logo — Transparent for the Hero Page ─────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="sr-only">M1 Aviation – Business Aviation Digital Ecosystem & Private Jet Marketplace</h1>
        <div className="w-[280px] sm:w-[420px] md:w-[560px] lg:w-[680px] max-w-[90vw] transition-all duration-700 hover:scale-[1.02]">
          <Image
            src="/m1-logo.png"
            alt="M1 Aviation – Premier Business Aviation Digital Ecosystem, Private Jet Marketplace & SIOS Operating Intelligence"
            width={1302}
            height={461}
            priority
            fetchPriority="high"
            className="w-full h-auto object-contain opacity-90 hover:opacity-100 transition-opacity drop-shadow-[0_0_50px_rgba(255,255,255,0.18)]"
          />
        </div>
        <h2 className="sr-only">
          Unifying pre-owned business jet acquisition, SIOS autonomous operating intelligence, and accredited industry partner deal rooms.
        </h2>
        <p className="sr-only">
          M1 Aviation replaces fragmented aviation workflows with a modern digital ecosystem: 100% verified aircraft listings, 7-step assisted acquisition, Part 145 inspection oversight, real-time market intelligence, and predictive maintenance telemetry.
        </p>
      </div>

    </section>
  );
}
