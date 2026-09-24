"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface Streak {
  x: number;      // normalized -1..1 from center
  y: number;
  z: number;      // depth 0..1, lower = near
  speed: number;
}

const NUM_STREAKS = 380;
const WARP_DURATION   = 3000;   // ms pure warp
const LOGO_APPEAR_AT  = 1600;   // ms before logo starts growing
const LOGO_GROW_DURATION = 2200;
const FADE_OUT_START  = WARP_DURATION + LOGO_GROW_DURATION - 600;

function make(): Streak[] {
  return Array.from({ length: NUM_STREAKS }, () => ({
    x: (Math.random() - 0.5) * 2,
    y: (Math.random() - 0.5) * 2,
    z: 0.05 + Math.random() * 0.95,
    speed: 0.006 + Math.random() * 0.022,
  }));
}

export default function IntroAnimation({ onDone }: { onDone: () => void }) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const streaksRef  = useRef<Streak[]>(make());
  const startRef    = useRef<number>(0);
  const rafRef      = useRef<number>(0);
  const doneRef     = useRef(false);

  const [logoScale,     setLogoScale]     = useState(0.008);
  const [logoOpacity,   setLogoOpacity]   = useState(0);
  const [overlayOpacity,setOverlayOpacity]= useState(1);
  const [visible,       setVisible]       = useState(true);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
    setTimeout(() => setVisible(false), 200);
  }, [onDone]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    startRef.current = performance.now();

    function draw(now: number) {
      if (!canvas || !ctx) return;

      const elapsed    = now - startRef.current;
      const W = canvas.width;
      const H = canvas.height;
      const cx = W * 0.5;
      const cy = H * 0.5;

      // warpPhase: 0→1 over WARP_DURATION
      const warpPhase  = Math.min(elapsed / WARP_DURATION, 1);
      // Acceleration: slow at first, hyper at end
      const speed      = 0.6 + warpPhase * warpPhase * 22;

      // ── Trail persistence: low alpha fill keeps long tails visible ──
      // alpha 0.10 = long trail, 0.22 = medium. Keep very low for dramatic streaks.
      ctx.fillStyle = "rgba(0,0,0,0.10)";
      ctx.fillRect(0, 0, W, H);

      for (const s of streaksRef.current) {
        const prevZ = s.z;
        s.z -= s.speed * speed * 0.01;

        if (s.z <= 0.001) {
          s.z = 0.9 + Math.random() * 0.1;
          s.x = (Math.random() - 0.5) * 2;
          s.y = (Math.random() - 0.5) * 2;
          continue;
        }

        // Project current and previous positions
        const sc  = 1 / s.z;
        const psc = 1 / prevZ;
        const sx  = cx + s.x * sc  * W * 0.5;
        const sy  = cy + s.y * sc  * H * 0.5;
        const px  = cx + s.x * psc * W * 0.5;
        const py  = cy + s.y * psc * H * 0.5;

        // Clip far-offscreen
        if (sx < -200 || sx > W + 200 || sy < -200 || sy > H + 200) continue;

        // Brightness based on proximity (low z = near = bright)
        const proximity = Math.pow(Math.min(1, (1 - s.z) * 1.6), 1.4);
        const warpBoost = Math.min(warpPhase * 3.5, 1);
        const alpha     = Math.min(proximity * warpBoost, 1);
        if (alpha < 0.04) continue;

        const lineW = 0.8 + proximity * 4.5;

        // ── GLOW PASS (wide, very soft) ──
        ctx.beginPath();
        ctx.strokeStyle = `rgba(200,225,255,${(alpha * 0.18).toFixed(2)})`;
        ctx.lineWidth   = lineW * 5;
        ctx.lineCap     = "round";
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        // ── CORE STREAK (sharp, bright) ──
        const grad = ctx.createLinearGradient(px, py, sx, sy);
        grad.addColorStop(0,   `rgba(255,255,255,0)`);
        grad.addColorStop(0.55,`rgba(200,230,255,${(alpha * 0.65).toFixed(2)})`);
        grad.addColorStop(1,   `rgba(255,255,255,${alpha.toFixed(2)})`);

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth   = lineW;
        ctx.lineCap     = "round";
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        // ── BRIGHT HOTSPOT at tip ──
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${(alpha * 0.9).toFixed(2)})`;
        ctx.arc(sx, sy, lineW * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── M1 logo zoom-in ──
      if (elapsed > LOGO_APPEAR_AT) {
        const lp    = Math.min((elapsed - LOGO_APPEAR_AT) / LOGO_GROW_DURATION, 1);
        const eased = 1 - Math.pow(1 - lp, 3);
        setLogoScale(0.01 + eased * 0.99);
        setLogoOpacity(Math.min(lp * 3, 1));
      }

      // ── Fade out overlay ──
      if (elapsed > FADE_OUT_START) {
        const fp = Math.min((elapsed - FADE_OUT_START) / 900, 1);
        setOverlayOpacity(1 - fp);
        if (fp >= 1) { cancelAnimationFrame(rafRef.current); finish(); return; }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [finish]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ opacity: overlayOpacity, background: "#000" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Edge vignette — keeps corners dark so streaks pop from center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 65% at center, transparent 0%, rgba(0,0,0,0.72) 100%)",
        }}
      />

      {/* M1 Logo */}
      <div
        className="relative z-10 pointer-events-none select-none"
        style={{
          transform:  `scale(${logoScale})`,
          opacity:    logoOpacity,
          willChange: "transform, opacity",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/m1-logo.png"
          alt="M1 Aviation"
          style={{
            width:     "420px",
            maxWidth:  "90vw",
            objectFit: "contain",
            filter:
              "brightness(1.25) contrast(1.1) drop-shadow(0 0 90px rgba(255,255,255,0.7)) drop-shadow(0 0 30px rgba(180,210,255,0.5))",
          }}
        />
      </div>

      {/* Skip */}
      <button
        onClick={finish}
        className="absolute bottom-8 right-8 z-20 text-zinc-600 hover:text-white text-[11px] font-mono tracking-[0.25em] uppercase transition-colors duration-200"
      >
        Skip ›
      </button>
    </div>
  );
}
