"use client";

import React, { useRef, useEffect, useCallback } from "react";

const CORE_FUNCTIONS = [
  { num: "01", title: "Predictive Maintenance",   desc: "Neural sensor algorithms foresee component stress cycles and turbine wear before scheduled inspection thresholds." },
  { num: "02", title: "Streamlined Scheduling",   desc: "Autonomous tail routing that dynamically aligns crew duty limits, fuel stops, and airport slot reservations." },
  { num: "03", title: "50+ Aviation Tools Connectivity", desc: "24/7 continuous airframe telemetry and avionics bus diagnostics streaming live to ground dispatch." },
  { num: "04", title: "Compliance Monitoring",    desc: "Automated FAA, EASA, and ICAO log synchronization with real-time auditability and airworthiness directive checks." },
  { num: "05", title: "Digital Passport",         desc: "Tamper-proof lifecycle registry tracking every component, serial number, overhaul history, and structural test." },
  { num: "06", title: "Intelligent Operations",   desc: "Unified mission planning hub integrating dispatchers, pilots, FBO ground handlers, and executive passengers." },
];

// Pulse: a dot travelling along a straight line from center → card
interface Pulse {
  progress: number;   // 0..1
  speed: number;
  cardIndex: number;
  opacity: number;
  size: number;
}

const PULSE_SPEED   = 0.005;
const PAUSE_AFTER_MS = 1000; // wait 1s after all pulses done before next wave

export default function EnergyGrid() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const coreRef        = useRef<HTMLDivElement>(null);
  const cardRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const pulsesRef      = useRef<Pulse[]>([]);
  const rafRef         = useRef<number>(0);
  // Wave state machine
  const waveStateRef   = useRef<"idle" | "firing" | "waiting">("idle");
  const waveTimerRef   = useRef<number>(0); // timestamp when waiting started

  // Returns center-point of an element relative to the canvas
  const center = useCallback((el: HTMLDivElement | null, canvasRect: DOMRect) => {
    if (!el) return { x: 0, y: 0 };
    const r = el.getBoundingClientRect();
    return {
      x: r.left + r.width  / 2 - canvasRect.left,
      y: r.top  + r.height / 2 - canvasRect.top,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to container
    const sync = () => {
      const r = container.getBoundingClientRect();
      canvas.width  = r.width;
      canvas.height = r.height;
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(container);

    function draw(now: number) {
      if (!canvas || !ctx || !coreRef.current) { rafRef.current = requestAnimationFrame(draw); return; }

      const canvasRect = canvas.getBoundingClientRect();
      const src = center(coreRef.current, canvasRect);

      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dim connector lines from core to each card
      for (let i = 0; i < 6; i++) {
        const dst = center(cardRefs.current[i], canvasRect);
        ctx.beginPath();
        ctx.moveTo(src.x, src.y);
        ctx.lineTo(dst.x, dst.y);
        ctx.strokeStyle = "rgba(255,255,255,0.10)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ── Wave state machine ──────────────────────────────────────────────
      if (waveStateRef.current === "idle") {
        // Launch 6 simultaneous pulses
        for (let i = 0; i < 6; i++) {
          pulsesRef.current.push({
            progress: 0,
            speed:    PULSE_SPEED + Math.random() * 0.0008,
            cardIndex: i,
            opacity:  0.9 + Math.random() * 0.1,
            size:     4 + Math.random() * 1.5,
          });
        }
        waveStateRef.current = "firing";
      } else if (waveStateRef.current === "firing") {
        // All 6 pulses done when every one exceeds progress 1.05
        const allDone = pulsesRef.current.length > 0 &&
          pulsesRef.current.every(p => p.progress > 1.05);
        if (allDone) {
          pulsesRef.current = [];
          waveTimerRef.current = now;
          waveStateRef.current = "waiting";
        }
      } else if (waveStateRef.current === "waiting") {
        if (now - waveTimerRef.current >= PAUSE_AFTER_MS) {
          waveStateRef.current = "idle";
        }
      }

      // Update & draw pulses (don't filter yet — keep until wave declared done)
      for (const p of pulsesRef.current) {
        p.progress += p.speed;
        const t   = Math.min(p.progress, 1);
        const dst = center(cardRefs.current[p.cardIndex], canvasRect);

        const x = src.x + (dst.x - src.x) * t;
        const y = src.y + (dst.y - src.y) * t;

        // Fade in/out at start and end
        const fade = t < 0.12 ? t / 0.12 : t > 0.85 ? (1 - t) / 0.15 : 1;
        const alpha = p.opacity * fade;

        // Glow halo — white/silver
        const grd = ctx.createRadialGradient(x, y, 0, x, y, p.size * 4);
        grd.addColorStop(0,   `rgba(255,255,255,${(alpha * 0.65).toFixed(2)})`);
        grd.addColorStop(0.4, `rgba(200,200,200,${(alpha * 0.28).toFixed(2)})`);
        grd.addColorStop(1,   "rgba(180,180,180,0)");
        ctx.beginPath();
        ctx.fillStyle = grd;
        ctx.arc(x, y, p.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Bright core dot
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(2)})`;
        ctx.arc(x, y, p.size * 0.65, 0, Math.PI * 2);
        ctx.fill();

        // Trailing sparkle — light grey
        const tx = x - (dst.x - src.x) * 0.04;
        const ty = y - (dst.y - src.y) * 0.04;
        ctx.beginPath();
        ctx.fillStyle = `rgba(220,220,220,${(alpha * 0.45).toFixed(2)})`;
        ctx.arc(tx, ty, p.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [center]);

  return (
    <div ref={containerRef} className="relative z-10">
      {/* Canvas layer — sits on top of cards but pointer-events-none */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20"
        aria-hidden="true"
      />

      {/* Row 1: cards 0–2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 md:gap-8 mb-4 sm:mb-8">
        {CORE_FUNCTIONS.slice(0, 3).map((func, i) => (
          <div
            key={func.num}
            ref={el => { cardRefs.current[i] = el; }}
            className="group p-4 sm:p-5 md:p-7 rounded-xl sm:rounded-2xl border border-[#1b3664]/80 bg-[#0a1832]/85 hover:bg-[#0e2246] hover:border-sky-400/60 transition-all duration-300 shadow-[0_14px_35px_rgba(4,16,42,0.65)] hover:shadow-[0_20px_45px_rgba(4,20,55,0.85),0_0_25px_rgba(56,189,248,0.15)] relative overflow-hidden"
          >
            <div className="flex items-center mb-2.5 sm:mb-5">
              {/* Tilted sharp-edge parallelogram badge */}
              <div className="-skew-x-12 inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 bg-[#050e1d] border border-sky-500/40 shadow-[inset_0_0_8px_rgba(56,189,248,0.15)]">
                <span className="skew-x-12 text-[10px] sm:text-[11px] font-black font-mono tracking-[0.22em] uppercase text-sky-200">
                  S-{func.num}
                </span>
              </div>
            </div>
            <h3 className="text-base sm:text-xl font-medium text-white mb-1.5 sm:mb-2.5 group-hover:text-sky-200 transition-colors">{func.title}</h3>
            <p className="text-[11px] sm:text-xs text-slate-300/80 leading-relaxed">{func.desc}</p>
          </div>
        ))}
      </div>

      {/* Center Energy Source */}
      <div className="flex justify-center items-center py-3 sm:py-6 relative">
        {/* Outer pulsing rings — white */}
        <div className="absolute w-20 sm:w-28 h-20 sm:h-28 rounded-full border border-white/20 animate-ping" style={{ animationDuration: "2.4s" }} />
        <div className="absolute w-16 sm:w-20 h-16 sm:h-20 rounded-full border border-white/30 animate-ping" style={{ animationDuration: "1.8s", animationDelay: "0.4s" }} />
        {/* Ambient glow — white */}
        <div className="absolute w-28 sm:w-36 h-28 sm:h-36 rounded-full bg-white/8 blur-2xl" />
        {/* Core node */}
        <div
          ref={coreRef}
          className="relative w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-black border border-zinc-400/70 flex items-center justify-center shadow-[0_0_35px_rgba(255,255,255,0.35),inset_0_0_16px_rgba(255,255,255,0.08)] z-10"
        >
          {/* Capital S — white */}
          <span
            className="text-white font-serif font-bold select-none text-xl sm:text-[1.75rem]"
            style={{
              lineHeight: 1,
              textShadow: "0 0 20px rgba(255,255,255,0.95), 0 0 8px rgba(255,255,255,0.5)",
              letterSpacing: "-0.02em",
            }}
          >
            S
          </span>
          {/* Hot center glow — white */}
          <div className="absolute inset-0 rounded-full bg-white/10 blur-sm" />
        </div>
      </div>

      {/* Row 2: cards 3–5 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-6 md:gap-8 mt-4 sm:mt-8">
        {CORE_FUNCTIONS.slice(3).map((func, i) => (
          <div
            key={func.num}
            ref={el => { cardRefs.current[i + 3] = el; }}
            className="group p-4 sm:p-5 md:p-7 rounded-xl sm:rounded-2xl border border-[#1b3664]/80 bg-[#0a1832]/85 hover:bg-[#0e2246] hover:border-sky-400/60 transition-all duration-300 shadow-[0_14px_35px_rgba(4,16,42,0.65)] hover:shadow-[0_20px_45px_rgba(4,20,55,0.85),0_0_25px_rgba(56,189,248,0.15)] relative overflow-hidden"
          >
            <div className="flex items-center mb-2.5 sm:mb-5">
              {/* Tilted sharp-edge parallelogram badge */}
              <div className="-skew-x-12 inline-flex items-center px-3 py-1 sm:px-4 sm:py-1.5 bg-[#050e1d] border border-sky-500/40 shadow-[inset_0_0_8px_rgba(56,189,248,0.15)]">
                <span className="skew-x-12 text-[10px] sm:text-[11px] font-black font-mono tracking-[0.22em] uppercase text-sky-200">
                  S-{func.num}
                </span>
              </div>
            </div>
            <h3 className="text-base sm:text-xl font-medium text-white mb-1.5 sm:mb-2.5 group-hover:text-sky-200 transition-colors">{func.title}</h3>
            <p className="text-[11px] sm:text-xs text-slate-300/80 leading-relaxed">{func.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
