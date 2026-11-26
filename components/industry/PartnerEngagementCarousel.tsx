"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

export interface IndustryPartnerCard {
  id: string;
  name: string;
  currentPosition: string;
  company: string;
  m1Role: string;
  remarks: string;
  image: string;
  linkedinUrl: string;
  cardStyle: string;
  badgeStyle: string;
  imagePosition?: string;
}

interface PartnerEngagementCarouselProps {
  cards: IndustryPartnerCard[];
}

type SlotRole = "left" | "center" | "right";

interface SlotCoords {
  x: number;
  y: number;
  z: number;
  rotY: number;
  scale: number;
  opacity: number;
  floatWeight: number;
}

interface AnimState {
  fromIndex: number;
  toIndex: number;
  startTime: number;
}

// User Requirement: "cards changes after every 3 seconds"
const AUTO_SWIPE_MS = 3000;
const FLIGHT_DURATION_MS = 800;

// Curtains-2-scrub.mp4 timestamps (browser-safe H.264 yuv420p, keyframe every 2 frames, derived from Curtains-2.mp4)
// Total duration: 11.83s (trimmed at 4.65s of Curtains-2.mp4 so t=0.00 is immediately ready to lift from the floor)
// 0.00s          = White curtain 100% settled on stage floor (fully closed)
// 0.00s to 5.55s = White curtain smoothly lifts upward from floor until 100% hidden behind top red valance
// 5.55s to 11.70s = Stage 100% open (white curtain completely hidden, red velvet curtains gently flutter with air)
// Zone 1 (0.00-0.20): Scroll-driven lift (0.00 → 5.55)
// Zones 2-4 (0.20-1.00): Continuous natural playback looping within 5.55 → 11.70 (curtains stay open)
const T_LIFT_START  = 0.00;
const T_LIFT_END    = 5.55;
const T_OPEN_START  = 5.55;
const T_OPEN_END    = 11.70;

function easeInOutCubic(p: number): number {
  return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
}

// Overshoot spring: rushes past 1.0, bounces back — gives the popup "landing" feel
// t=0 → 0, t=0.7 → ~1.08 (overshoot peak), t=1 → 1.0 (settled)
function easeOutBack(p: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function getSlotRole(cardIdx: number, centerIdx: number, count: number): SlotRole {
  if (cardIdx === centerIdx) return "center";
  if (cardIdx === (centerIdx - 1 + count) % count) return "left";
  return "right";
}

// Slot coordinates:
// - Front card: Dominant 1:1 scale, positioned lower on stage (matches user's red-line annotation)
// - Side cards: Subdued preview cards pulled inward (less horizontal spread per user annotation)
function getSlotCoords(role: SlotRole, shiftX: number): SlotCoords {
  if (role === "center") {
    return {
      x: 0,
      y: 20,       // moved lower (was -18) per annotated screenshot
      z: 32,
      rotY: 0,
      scale: 1,
      opacity: 1,
      floatWeight: 0,
    };
  }
  const sign = role === "left" ? -1 : 1;
  const isMobile = shiftX <= 420;
  return {
    x: sign * (shiftX * (isMobile ? 0.58 : 0.70)),   // pulled inward (was 0.70/0.88)
    y: isMobile ? 15 : 20,                             // matches center y (was -14/-18)
    z: isMobile ? -65 : -90,
    rotY: -sign * (isMobile ? 8 : 12),
    scale: isMobile ? 0.58 : 0.68,
    opacity: 0.65,
    floatWeight: 1,
  };
}

export default function PartnerEngagementCarousel({ cards }: PartnerEngagementCarouselProps) {
  const count = cards.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);
  const [mobileExpandedCardIdx, setMobileExpandedCardIdx] = useState<number | null>(null);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [stageOpacity, setStageOpacity] = useState(0);

  // Choreographed stages progress states: Heading starts in DEAD CENTER
  const [headingY, setHeadingY] = useState(0);
  const [headingScale, setHeadingScale] = useState(0.92);
  const [headingBlur, setHeadingBlur] = useState(10);
  const [headingOpacity, setHeadingOpacity] = useState(0);
  const [carouselY, setCarouselY] = useState(160);
  const [carouselOpacity, setCarouselOpacity] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardWidthRef = useRef(800);
  const timerRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);

  // WebGL context refs
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const videoTextureRef = useRef<WebGLTexture | null>(null);

  // Flight animation state for 3D carousel
  const animRef = useRef<AnimState>({
    fromIndex: 0,
    toIndex: 0,
    startTime: -1,
  });

  // Instant 60fps bidirectional scroll-scrubbing refs
  const targetTimeRef = useRef<number>(T_LIFT_START);
  const currentTimeRef = useRef<number>(T_LIFT_START);
  const lastRenderedVideoTimeRef = useRef<number>(-1);
  // 'scrub' = scroll-driven seek (zones 1 & 5), 'play' = natural forward playback (zones 2-4)
  const videoModeRef = useRef<'scrub' | 'play'>('scrub');

  // Rich cards entrance progression ref (0 = hidden, 1 = fully landed)
  const cardsEntranceRef = useRef<number>(0);

  const triggerFlight = useCallback((nextIndex: number) => {
    const currentTarget = animRef.current.toIndex;
    if (nextIndex === currentTarget) return;

    animRef.current = {
      fromIndex: currentTarget,
      toIndex: nextIndex,
      startTime: performance.now(),
    };
    setActiveIndex(nextIndex);
    setHoveredCardIdx(null);
    setMobileExpandedCardIdx(null);
  }, []);

  const clearAutoSwipeTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetAutoSwipeTimer = useCallback(() => {
    clearAutoSwipeTimer();
    if (count < 2 || isHoveredRef.current || !curtainsOpen) return;
    timerRef.current = window.setInterval(() => {
      const next = (animRef.current.toIndex + 1) % count;
      triggerFlight(next);
    }, AUTO_SWIPE_MS);
  }, [count, triggerFlight, clearAutoSwipeTimer, curtainsOpen]);

  const handleCardHover = useCallback(
    (hovered: boolean, cardIndex?: number) => {
      isHoveredRef.current = hovered;
      if (hovered) {
        clearAutoSwipeTimer();
        if (typeof cardIndex === "number") {
          setHoveredCardIdx(cardIndex);
        }
      } else {
        setHoveredCardIdx(null);
        resetAutoSwipeTimer();
      }
    },
    [clearAutoSwipeTimer, resetAutoSwipeTimer]
  );

  const handleManualTarget = useCallback(
    (nextIndex: number) => {
      triggerFlight(nextIndex);
      resetAutoSwipeTimer();
    },
    [triggerFlight, resetAutoSwipeTimer]
  );

  // Stable full card width used for slot positioning so side cards never jump on hover
  const getBaseCardWidth = (stageWidth: number) => {
    if (stageWidth < 640) return 360;
    if (stageWidth < 768) return 560;
    if (stageWidth < 1024) return 720;
    if (stageWidth < 1280) return 860;
    return 980;
  };

  // ResizeObserver for stage width and stable slot calculation
  useEffect(() => {
    const measureCardWidth = () => {
      const stageEl = stageRef.current;
      const stageW = stageEl ? stageEl.offsetWidth : window.innerWidth;
      cardWidthRef.current = getBaseCardWidth(stageW);
    };
    measureCardWidth();

    const observer = new ResizeObserver(measureCardWidth);
    if (stageRef.current) observer.observe(stageRef.current);
    window.addEventListener("resize", measureCardWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureCardWidth);
    };
  }, []);

  // 3-second auto-swipe effect (active only when in interactive carousel stage)
  useEffect(() => {
    if (curtainsOpen) {
      resetAutoSwipeTimer();
    } else {
      clearAutoSwipeTimer();
    }
    return clearAutoSwipeTimer;
  }, [curtainsOpen, resetAutoSwipeTimer, clearAutoSwipeTimer]);

  // 3D Carousel render loop: ONLY 3 CARDS VISIBLE ON SCREEN (Front, Left, Right)
  // Non-active cards are set to display: none to guarantee zero blurriness and zero stacking
  useEffect(() => {
    let rafId = 0;

    const renderFrame = (now: number) => {
      const anim = animRef.current;
      const cardW = cardWidthRef.current;
      const shiftX = cardW <= 360 ? cardW * 0.90 : cardW * 0.96;
      const pEntrance = cardsEntranceRef.current;

      // Phase 1: During curtain lifting and heading presentation:
      // Cards are 100% hidden below stage horizon
      if (pEntrance <= 0.001) {
        for (let i = 0; i < count; i++) {
          const el = cardRefs.current[i];
          if (el) {
            el.style.display = "none";
            el.style.opacity = "0";
          }
        }
        rafId = requestAnimationFrame(renderFrame);
        return;
      }

      // Phase 2: Rich, Smooth 3D Triptych Bloom Entrance!
      // Cards elevate from below stage horizon with luxury inertia, subtle perspective pitch,
      // and blossom outward horizontally into their flanking wings.
      if (pEntrance < 1.0) {
        // High-order polynomial ease-out for ultra-silky, weighted deceleration
        const easeGlide = 1 - Math.pow(1 - pEntrance, 3.5);
        // Soft landing cushion with subtle hydraulic inertia
        const easeCushion = lerp(easeGlide, easeOutBack(pEntrance), 0.12);

        const centerIdx = anim.toIndex;
        const leftIdx = (anim.toIndex - 1 + count) % count;
        const rightIdx = (anim.toIndex + 1) % count;
        const visibleIndices = [centerIdx, leftIdx, rightIdx];

        for (let i = 0; i < count; i++) {
          const el = cardRefs.current[i];
          if (!el) continue;

          if (!visibleIndices.includes(i)) {
            el.style.display = "none";
            el.style.opacity = "0";
            continue;
          }

          el.style.display = "block";
          const role = i === centerIdx ? "center" : i === leftIdx ? "left" : "right";
          const to = getSlotCoords(role, shiftX);

          // Deep stage arrival parameters:
          // Cards start 230px below horizon, pushed -70px deeper, with an 8deg elevation pitch
          const startY = 230;
          const y = lerp(startY, to.y, easeCushion);
          const z = lerp(to.z - 70, to.z, easeGlide);
          const rotX = (1 - easeGlide) * 8; // gentle forward tilt that levels off as cards land

          let x = 0;
          let rotY = 0;
          let scale = to.scale;
          let opacity = 0;
          let zIndex = 20;

          if (role === "center") {
            x = 0;
            rotY = 0;
            scale = lerp(0.86, to.scale, easeCushion);
            opacity = Math.min(1, Math.pow(pEntrance, 1.2) * 1.8);
            zIndex = 40;
          } else if (role === "left") {
            // Left card starts gathered behind center (30% width), then gracefully unfolds to -shiftX
            x = lerp(to.x * 0.30, to.x, easeGlide);
            rotY = lerp(0, to.rotY, easeGlide);
            scale = lerp(to.scale * 0.82, to.scale, easeCushion);
            opacity = Math.min(to.opacity, Math.pow(pEntrance, 1.3) * to.opacity * 1.5);
            zIndex = 20;
          } else {
            // Right card starts gathered behind center (30% width), then gracefully unfolds to +shiftX
            x = lerp(to.x * 0.30, to.x, easeGlide);
            rotY = lerp(0, to.rotY, easeGlide);
            scale = lerp(to.scale * 0.82, to.scale, easeCushion);
            opacity = Math.min(to.opacity, Math.pow(pEntrance, 1.3) * to.opacity * 1.5);
            zIndex = 20;
          }

          const roundedX = Math.round(x);
          const roundedY = Math.round(y);
          const roundedZ = Math.round(z);

          el.style.transform = `translate3d(${roundedX}px, ${roundedY}px, ${roundedZ}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
          el.style.transformStyle = "preserve-3d";
          el.style.backfaceVisibility = "hidden";
          el.style.opacity = opacity.toFixed(3);
          el.style.zIndex = String(zIndex);
        }

        rafId = requestAnimationFrame(renderFrame);
        return;
      }

      // Phase 3: Interactive 3-Card Carousel Stage (Air waves, Auto-swipe, 3D Flight)

      let rawP = 1;
      if (anim.startTime >= 0) {
        rawP = Math.min(1, (now - anim.startTime) / FLIGHT_DURATION_MS);
      }

      const t = easeInOutCubic(rawP);
      const arc = Math.sin(Math.PI * rawP);

      // Determine active slots: Center, Left, Right
      const targetCenter = anim.toIndex;
      const targetLeft = (anim.toIndex - 1 + count) % count;
      const targetRight = (anim.toIndex + 1) % count;

      const fromCenter = anim.fromIndex;
      const fromLeft = (anim.fromIndex - 1 + count) % count;
      const fromRight = (anim.fromIndex + 1) % count;

      const visibleSet = new Set<number>();
      visibleSet.add(targetCenter);
      visibleSet.add(targetLeft);
      visibleSet.add(targetRight);

      if (rawP < 1) {
        visibleSet.add(fromCenter);
        visibleSet.add(fromLeft);
        visibleSet.add(fromRight);
      }

      for (let i = 0; i < count; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        // User requirement: ONLY keep 3 cards visible at a time on screen
        if (!visibleSet.has(i)) {
          el.style.display = "none";
          el.style.opacity = "0";
          continue;
        }

        el.style.display = "block";

        const fromRole = getSlotRole(i, anim.fromIndex, count);
        const toRole = getSlotRole(i, anim.toIndex, count);
        const from = getSlotCoords(fromRole, shiftX);
        const to = getSlotCoords(toRole, shiftX);

        let x = lerp(from.x, to.x, t);
        let y = lerp(from.y, to.y, t);
        let z = lerp(from.z, to.z, t);
        const rotY = lerp(from.rotY, to.rotY, t);
        let scale = lerp(from.scale, to.scale, t);
        let opacity = lerp(from.opacity, to.opacity, t);
        const floatWeight = lerp(from.floatWeight, to.floatWeight, t);

        let zIndex = 20;
        if (rawP < 1 && fromRole !== toRole) {
          if (toRole === "center") {
            y -= 36 * arc;
            z += 80 * arc;
            zIndex = 40;
          } else if (fromRole === "center") {
            y -= 46 * arc;
            z += 50 * arc;
            zIndex = 30;
          } else {
            z -= 190 * arc;
            y += 16 * arc;
            scale -= 0.08 * arc;
            opacity -= 0.45 * arc;
            zIndex = 10;
          }
        } else {
          zIndex = toRole === "center" ? 40 : 20;
          x = to.x;
          y = to.y;
          z = to.z;
        }

        const floatOffset = floatWeight * 5 * Math.sin(now * 0.0016 + i * 2.1);
        const roundedX = Math.round(x);
        const roundedY = Math.round(y + floatOffset);
        const roundedZ = Math.round(z);

        // Center card gets 0deg rotation and scale 1 so Chrome renders text with 100% native ClearType sharpness
        if (toRole === "center" && rawP >= 1) {
          el.style.transform = `translate3d(${roundedX}px, ${roundedY}px, 0px)`;
          el.style.transformStyle = "flat";
          el.style.backfaceVisibility = "visible";
        } else {
          el.style.transform = `translate3d(${roundedX}px, ${roundedY}px, ${roundedZ}px) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
          el.style.transformStyle = "preserve-3d";
          el.style.backfaceVisibility = "hidden";
        }

        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(zIndex);
      }

      rafId = requestAnimationFrame(renderFrame);
    };

    rafId = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(rafId);
  }, [count]);

  // Set initial curtain resting frame on load & preload into memory Blob for zero-latency seeking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const setInit = () => {
      video.currentTime = T_LIFT_START;
      currentTimeRef.current = T_LIFT_START;
      targetTimeRef.current = T_LIFT_START;
    };
    if (video.readyState >= 1) {
      setInit();
    } else {
      video.addEventListener("loadedmetadata", setInit, { once: true });
    }

    let isMounted = true;
    // Preload video into memory Blob for instant zero-latency seeks on live hosting
    fetch("/videos/curtains-2-scrub.mp4")
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.blob();
      })
      .then((blob) => {
        if (!isMounted || !videoRef.current) return;
        const blobUrl = URL.createObjectURL(blob);
        const v = videoRef.current;
        const prevTime = v.currentTime;
        const wasPaused = v.paused;
        v.src = blobUrl;
        v.currentTime = prevTime;
        if (!wasPaused) v.play().catch(() => {});
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Choreographed Scroll Progression:
  // Zone 1 (0.00-0.20): White Austrian curtain lifts upward matching scroll, revealing Heading in DEAD CENTER
  // Zone 2 (0.20-0.35): Grand Heading presentation pause (red velvet curtains gently wave with air, white curtain 100% hidden)
  // Zone 3 (0.35-0.55): Heading glides UP while cards simultaneously elevate from below into center
  // Zone 4 (0.55-1.00): Interactive 3-card carousel stage (curtains stay 100% open; does NOT pull down on exit)
  useEffect(() => {
    let scrollRafId = 0;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const rawProgress = -rect.top / totalScrollable;
      const progress = Math.max(0, Math.min(1, rawProgress));

      // Zone 1: White Curtain Lifts Up Matching Scroll (0.00 to 0.20)
      if (progress < 0.20) {
        const pLift = Math.max(0, Math.min(1, progress / 0.20));
        targetTimeRef.current = T_LIFT_START + pLift * (T_LIFT_END - T_LIFT_START);
        videoModeRef.current = 'scrub';

        setStageOpacity(pLift >= 0.05 ? Math.min(1, (pLift - 0.05) / 0.40) : 0);

        const pReveal = Math.max(0, Math.min(1, (pLift - 0.10) / 0.90));
        const easeR = easeInOutCubic(pReveal);
        setHeadingOpacity(easeR);
        setHeadingScale(0.92 + easeR * 0.08);
        setHeadingBlur((1 - easeR) * 10);
        setHeadingY(0);
        setCarouselOpacity(0);
        setCarouselY(160);
        setCurtainsOpen(false);
        cardsEntranceRef.current = 0;
      }
      // Zone 2: Grand Heading Presentation Pause (0.20 to 0.35)
      // Red velvet curtains wave with air; white curtain 100% hidden — video PLAYS naturally within open stage
      else if (progress < 0.35) {
        videoModeRef.current = 'play';

        setStageOpacity(1);
        setHeadingOpacity(1);
        setHeadingScale(1.0);
        setHeadingBlur(0);
        setHeadingY(0);
        setCarouselOpacity(0);
        setCarouselY(160);
        setCurtainsOpen(false);
        cardsEntranceRef.current = 0;
      }
      // Zone 3: Heading exits UP while cards simultaneously rise from BOTTOM into center (0.35 to 0.55)
      else if (progress < 0.55) {
        videoModeRef.current = 'play';

        setStageOpacity(1);

        // Heading exits upward cleanly
        const pExit = Math.max(0, Math.min(1, (progress - 0.35) / 0.12));
        const easeExit = easeInOutCubic(pExit);
        setHeadingOpacity(Math.max(0, 1 - easeExit * 1.6));
        setHeadingY(-easeExit * 280);
        setHeadingScale(1.0 + easeExit * 0.04);
        setHeadingBlur(easeExit * 5);

        // Smooth scroll rise for cards:
        const pCards = Math.max(0, Math.min(1, (progress - 0.37) / 0.18));
        const easeEnter = easeInOutCubic(pCards);
        cardsEntranceRef.current = pCards;
        setCarouselOpacity(Math.min(1, easeEnter * 1.5));
        setCarouselY(-35 + (1 - easeEnter) * 195);
        // Enable hover & auto-swap as soon as cards are visible (not just at 90%)
        setCurtainsOpen(pCards > 0.30);
      }
      // Zone 4: Interactive 3-Card Carousel Stage (0.55 to 1.00)
      // Fully interactive carousel; red velvet air waves continue; white curtain stays 100% hidden
      // The white curtain does NOT pull down at section end; it only closes if user scrolls back up into Zone 1 (<0.20)
      else {
        videoModeRef.current = 'play';

        setStageOpacity(1);
        setHeadingOpacity(0);
        setHeadingY(-280);
        setCarouselOpacity(1);
        setCarouselY(-35);
        setCurtainsOpen(true);
        cardsEntranceRef.current = 1.0;
      }
    };

    let scrollScheduled = false;
    const onScroll = () => {
      if (!scrollScheduled) {
        scrollScheduled = true;
        requestAnimationFrame(() => {
          scrollScheduled = false;
          handleScroll();
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    handleScroll();

    // Theatrical Video Loop: Mode-based scrub or play
    const videoLoop = () => {
      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        const mode = videoModeRef.current;

        if (mode === 'scrub') {
          // Pause the video — scroll drives the frame, not playback
          if (!video.paused) video.pause();

          const targetTime = targetTimeRef.current;
          const diff = targetTime - currentTimeRef.current;

          // Snappy, responsive tracking factor (0.55 instead of sluggish 0.28)
          if (Math.abs(diff) > 0.003) {
            if (Math.abs(diff) > 1.5) {
              currentTimeRef.current = targetTime;
            } else {
              currentTimeRef.current += diff * 0.55;
            }
          } else {
            currentTimeRef.current = targetTime;
          }

          // Sync video element: prefer fastSeek if supported for hardware zero-stall decoding
          if (!video.seeking && Math.abs(video.currentTime - currentTimeRef.current) > 0.008) {
            const vAny = video as HTMLVideoElement & { fastSeek?: (t: number) => void };
            if (typeof vAny.fastSeek === 'function') {
              vAny.fastSeek(currentTimeRef.current);
            } else {
              video.currentTime = currentTimeRef.current;
            }
          }
        } else {
          // Play mode: let video run forward naturally; loop within the open stage range
          if (video.paused) video.play().catch(() => {});
          // Loop: if past open end or before open start, jump back to start
          if (video.currentTime >= T_OPEN_END - 0.08 || video.currentTime < T_OPEN_START) {
            video.currentTime = T_OPEN_START;
            currentTimeRef.current = T_OPEN_START;
          } else {
            currentTimeRef.current = video.currentTime;
          }
          targetTimeRef.current = video.currentTime;
        }

        // Render the current video frame into the WebGL canvas
        // Only upload texture when playing or when the video frame has actually updated
        const isPlaying = mode === 'play' && !video.paused;
        const timeDiff = Math.abs(video.currentTime - lastRenderedVideoTimeRef.current);
        if (glRef.current && videoTextureRef.current && (isPlaying || timeDiff > 0.004)) {
          lastRenderedVideoTimeRef.current = video.currentTime;
          const gl = glRef.current;
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, videoTextureRef.current);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
      }

      scrollRafId = requestAnimationFrame(videoLoop);
    };

    scrollRafId = requestAnimationFrame(videoLoop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(scrollRafId);
    };
  }, []);

  // WebGL Solid Theater Curtain Renderer
  // Guarantees:
  // 1. Red velvet proscenium (sides and top) is 100% SOLID OPAQUE velvet at all times (cards tuck behind).
  // 2. White Austrian curtain is 100% SOLID OPAQUE fabric (zero ghosting, zero bleed-through).
  // 3. Open stage aperture is 100% TRANSPARENT when lifted, revealing cards clearly.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
    });

    if (!gl) {
      console.warn("WebGL not supported");
      return;
    }
    glRef.current = gl;

    const vsSource = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = vec2((a_pos.x + 1.0) * 0.5, (1.0 - a_pos.y) * 0.5);
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform sampler2D u_video;
      uniform sampler2D u_mask;
      varying vec2 v_uv;
      void main() {
        vec4 color = texture2D(u_video, v_uv);
        float in_aperture = texture2D(u_mask, v_uv).r;
        
        // Outside stage aperture: ALWAYS 100% SOLID OPAQUE RED VELVET (alpha = 1.0)
        float alpha = 1.0;
        
        // Inside stage aperture:
        // White curtain: bright >= 0.11 -> alpha = 1.0 (SOLID WHITE SILK)
        // Black open stage: bright <= 0.03 -> alpha = 0.0 (TRANSPARENT REVEAL)
        if (in_aperture > 0.5) {
          float bright = max(color.r, max(color.g, color.b));
          alpha = clamp((bright - 0.03) / 0.08, 0.0, 1.0);
        }
        
        gl_FragColor = vec4(color.rgb, alpha);
      }
    `;

    function createShader(type: number, source: string) {
      if (!gl) return null;
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Quad geometry: full-screen quad [-1, -1] to [1, 1]
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uVideo = gl.getUniformLocation(program, "u_video");
    const uMask = gl.getUniformLocation(program, "u_mask");
    gl.uniform1i(uVideo, 0);
    gl.uniform1i(uMask, 1);

    // Video Texture (Texture unit 0)
    const videoTexture = gl.createTexture();
    videoTextureRef.current = videoTexture;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, videoTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Aperture Mask Texture (Texture unit 1)
    const maskTexture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, maskTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Initialize mask texture with 1x1 black (100% solid vision until mask image loads)
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 255])
    );

    // Load actual high-precision proscenium aperture mask
    const maskImg = new window.Image();
    maskImg.src = "/images/theatre-aperture-mask.png";
    maskImg.onload = () => {
      if (!gl) return;
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, maskTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, maskImg);
    };

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);

    return () => {
      glRef.current = null;
      videoTextureRef.current = null;
      if (gl) {
        gl.deleteTexture(videoTexture);
        gl.deleteTexture(maskTexture);
        gl.deleteBuffer(quadBuffer);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[560vh] bg-black select-none"
    >
      {/* ── Sticky Fullscreen Theater Stage ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black">
        {/* Subtle Ambient Radial Lighting */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(14,165,233,0.08)_0%,_transparent_65%)] pointer-events-none z-0 transition-opacity duration-300"
          style={{ opacity: stageOpacity }}
        />

        {/* ── Layer 1: Section Heading & Statements (GUARANTEED DEAD CENTER) ── */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 antialiased"
          style={{
            opacity: headingOpacity,
            display: headingOpacity <= 0.01 ? "none" : "flex",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            textRendering: "optimizeLegibility",
          }}
        >
          <div
            className="text-center space-y-4 max-w-3xl w-full px-6 transition-transform duration-200 ease-out"
            style={{
              transform: `translate3d(0, ${headingY}px, 0) scale(${headingScale})`,
              filter: headingBlur > 0.1 ? `blur(${headingBlur}px)` : "none",
            }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-400/40 bg-[#071325]/90 backdrop-blur-md shadow-xl">
              {/* <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]" /> */}
              <span className="text-[11px] font-mono tracking-[0.25em] text-sky-200 uppercase font-semibold">
                EXECUTIVE ALLIANCE NETWORK
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
              Partner Engagement Showcase
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
              Distinguished aviation brokerage leaders, charter specialists, and frontier technology
              advisors actively guiding the evolution of M1 and SIOS.
            </p>
          </div>
        </div>

        {/* ── Layer 2: Perspective Stage & Cards Carousel ── */}
        {/* Centered naturally in the viewport; glides smoothly into center stage as user scrolls */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 antialiased"
          style={{
            opacity: carouselOpacity,
            transform: `translate3d(0, ${carouselY}px, 0)`,
            pointerEvents: curtainsOpen ? "auto" : "none",
            display: carouselOpacity <= 0.01 ? "none" : "flex",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
            textRendering: "optimizeLegibility",
          }}
        >
          <div className="relative w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center">
            {/* Top Empty Space: 6 Minimal Sharp Indicator Bars Above Center Card */}
            <div className="mb-4 sm:mb-6 flex items-center justify-center gap-2.5 z-40 select-none">
              {cards.map((partner, idx) => {
                const active = idx === activeIndex;
                return (
                  <button
                    key={partner.id}
                    type="button"
                    onClick={() => handleManualTarget(idx)}
                    aria-label={`Focus ${partner.name}`}
                    className={`h-[3px] rounded-full transition-all duration-300 cursor-pointer ${
                      active
                        ? "w-10 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]"
                        : "w-3 bg-slate-700/80 hover:bg-slate-500"
                    }`}
                  />
                );
              })}
            </div>

            {/* Stage Container */}
            <div
              ref={stageRef}
              className="relative w-full h-[460px] sm:h-[480px] md:h-[495px] lg:h-[510px]"
              style={{
                perspective: "1100px",
                perspectiveOrigin: "50% 48%",
                transformStyle: "preserve-3d",
              }}
            >
              {cards.map((partner, index) => {
                const isCenter = index === activeIndex;
                const isCardHovered = hoveredCardIdx === index;
                const isRevealed = isCardHovered || mobileExpandedCardIdx === index;

                return (
                  <div
                    key={partner.id}
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                    onMouseEnter={() => handleCardHover(true, index)}
                    onMouseLeave={() => handleCardHover(false)}
                    onClick={() => {
                      if (!isCenter) {
                        handleManualTarget(index);
                      } else {
                        setMobileExpandedCardIdx((curr) => (curr === index ? null : index));
                      }
                    }}
                    aria-hidden={!isCenter}
                    style={{
                      backfaceVisibility: isCenter ? "visible" : "hidden",
                      WebkitBackfaceVisibility: isCenter ? "visible" : "hidden",
                      transformStyle: isCenter ? "flat" : "preserve-3d",
                    }}
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
                      !isCenter ? "will-change-transform cursor-pointer" : "cursor-pointer sm:cursor-default"
                    }`}
                  >
                    {/* VIP Card Layout - Clean Architectural Frame */}
                    <div
                      className={`group/card relative rounded-2xl p-3 sm:p-4 lg:p-4.5 flex flex-col sm:flex-row items-stretch justify-between overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isCenter
                          ? isRevealed
                            ? "w-[330px] sm:w-[660px] md:w-[760px] lg:w-[840px] xl:w-[890px] h-[440px] sm:h-[445px] md:h-[455px] lg:h-[465px] gap-4 sm:gap-6 lg:gap-7 border border-sky-400/60 bg-[#080d15]/95 shadow-[0_28px_85px_rgba(0,0,0,0.95),0_0_28px_rgba(56,189,248,0.22)] filter-none"
                            : "w-[310px] sm:w-[335px] md:w-[355px] lg:w-[370px] xl:w-[380px] h-[440px] sm:h-[445px] md:h-[455px] lg:h-[465px] gap-0 border border-sky-400/40 bg-[#080d15]/95 shadow-[0_24px_70px_rgba(0,0,0,0.92),0_0_20px_rgba(56,189,248,0.12)] group-hover/card:w-[330px] sm:group-hover/card:w-[660px] md:group-hover/card:w-[760px] lg:group-hover/card:w-[840px] xl:group-hover/card:w-[890px] group-hover/card:gap-4 sm:group-hover/card:gap-6 lg:group-hover/card:gap-7 group-hover/card:border-sky-400/60 filter-none"
                          : "w-[260px] sm:w-[290px] md:w-[320px] lg:w-[340px] xl:w-[350px] h-[390px] sm:h-[400px] md:h-[415px] lg:h-[425px] gap-0 border border-slate-800/70 bg-[#060a10]/85 shadow-[0_20px_50px_rgba(0,0,0,0.85)] filter blur-[2.5px] opacity-60 brightness-[0.70] group/side"
                      }`}
                      style={{
                        textRendering: "optimizeLegibility",
                        imageRendering: "-webkit-optimize-contrast",
                      }}
                    >
                      {/* Top Metallic Specular Hairline */}
                      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400/35 to-transparent pointer-events-none" />

                      {/* ── 1. Image Frame ── */}
                      <div
                        className={`relative rounded-xl overflow-hidden bg-[#04060a] border border-white/10 shadow-[0_12px_28px_rgba(0,0,0,0.7)] shrink-0 group/photo transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isRevealed
                            ? "w-full sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[270px] h-[220px] sm:h-full"
                            : "w-full h-full"
                        }`}
                      >
                        <Image
                          src={partner.image}
                          alt={partner.name}
                          fill
                          unoptimized={true}
                          priority={true}
                          className="object-cover filter brightness-[1.0] contrast-[1.04] transition-transform duration-700 ease-out group-hover/photo:scale-[1.02]"
                          style={{
                            objectPosition: partner.imagePosition || "center 30%",
                          }}
                        />
                        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.08] pointer-events-none" />
                      </div>

                      {/* ── 2. Details (Right Side: EXACTLY 6 requested items) ── */}
                      {isCenter && (
                        <div
                          className={`relative z-10 flex-1 flex flex-col justify-between h-full min-h-0 text-left py-0.5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isRevealed
                              ? "opacity-100 max-w-[600px] translate-x-0 pointer-events-auto overflow-hidden"
                              : "opacity-0 max-w-0 -translate-x-4 pointer-events-none overflow-hidden group-hover/card:opacity-100 group-hover/card:max-w-[600px] group-hover/card:translate-x-0 group-hover/card:pointer-events-auto"
                          }`}
                        >
                          <div className="w-[280px] sm:w-[310px] md:w-[380px] lg:w-[450px] xl:w-[500px] flex flex-col justify-between h-full min-h-0 gap-2.5">
                            {/* 2. Name & 3. Role */}
                            <div className="pt-0.5">
                              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold tracking-tight text-white leading-tight">
                                {partner.name}
                              </h3>
                              <p className="text-sm sm:text-base lg:text-[15px] font-normal text-slate-200 flex flex-wrap items-center gap-2 mt-1.5">
                                <span className="text-sky-300 font-semibold tracking-wide">
                                  {partner.currentPosition}
                                </span>
                                <span className="text-slate-500 font-bold">•</span>
                                <span className="text-white font-medium">
                                  {partner.company}
                                </span>
                              </p>
                            </div>

                            {/* 4. M1 Role */}
                            <div>
                              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg border border-sky-400/40 bg-sky-950/60 select-none shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
                                <span className="text-xs sm:text-[13px] font-sans tracking-wide uppercase text-sky-100 font-semibold">
                                  <span className="text-sky-300 font-bold mr-2">M1 ROLE:</span>
                                  {partner.m1Role}
                                </span>
                              </div>
                            </div>

                            {/* 5. Remarks */}
                            <div className="relative pl-4 border-l-[3px] border-sky-400 my-auto py-1">
                              <blockquote className="text-sm sm:text-[15px] lg:text-[16px] leading-[1.7] text-zinc-100 font-normal tracking-normal line-clamp-5 not-italic">
                                &ldquo;{partner.remarks}&rdquo;
                              </blockquote>
                            </div>

                            {/* 6. Linked Profile Button */}
                            <div className="pt-1 flex items-center justify-end">
                              <a
                                href={partner.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${partner.name} LinkedIn Profile`}
                                className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full border border-sky-400/50 bg-sky-500/15 hover:bg-sky-400 hover:text-black hover:border-sky-400 text-sky-200 text-xs sm:text-[13px] font-sans font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer group/link shadow-md"
                              >
                                <span>Connect</span>
                                <svg
                                  className="w-4 h-4 text-current group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Left Arrow Button - Far Left */}
            <button
              type="button"
              onClick={() => handleManualTarget((activeIndex - 1 + count) % count)}
              aria-label="Previous Partner"
              className="absolute left-2 sm:left-6 md:left-10 lg:left-14 top-[57%] -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#080d15]/85 border border-white/15 text-slate-300 flex items-center justify-center hover:bg-sky-950/60 hover:border-sky-400/70 hover:text-white transition-all duration-300 shadow-2xl cursor-pointer hover:scale-110 active:scale-95 backdrop-blur-md z-40"
            >
              <svg className="w-5 h-5 text-slate-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow Button - Far Right */}
            <button
              type="button"
              onClick={() => handleManualTarget((activeIndex + 1) % count)}
              aria-label="Next Partner"
              className="absolute right-2 sm:right-6 md:right-10 lg:right-14 top-[57%] -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#080d15]/85 border border-white/15 text-slate-300 flex items-center justify-center hover:bg-sky-950/60 hover:border-sky-400/70 hover:text-white transition-all duration-300 shadow-2xl cursor-pointer hover:scale-110 active:scale-95 backdrop-blur-md z-40"
            >
              <svg className="w-5 h-5 text-slate-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Layer 2: Theatrical Proscenium Curtain Canvas (z-30) ── */}
        {/* Hardware-accelerated WebGL Canvas: 100% solid vision on curtains, 100% transparent open stage */}
        {/* Red velvet side drapes sit ON TOP of cards, so side cards naturally stay tucked behind them */}
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-30 select-none scale-x-[1.25] scale-y-[1.04] origin-center"
        />

        {/* Scrub-optimized H.264 (yuv420p, -g 2) derived from Curtains-2.mp4: floor at t=0.00s, open 5.55s–11.70s */}
        <video
          ref={videoRef}
          src="/videos/curtains-2-scrub.mp4"
          playsInline
          muted
          autoPlay={false}
          loop={false}
          preload="auto"
          className="hidden"
        />
      </div>
    </div>
  );
}
