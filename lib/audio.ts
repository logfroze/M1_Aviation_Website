/**
 * Solid Mechanical Dock Sound Synthesizer (Web Audio API)
 * Generates an authoritative, deep mechanical latch / heavy solid dock sound
 * with sub-bass impact, crisp latch transient, and dampened acoustic resonance.
 */

let sharedAudioCtx: AudioContext | null = null;

export function getSharedAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new AudioContextClass();
  }
  if (sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

export function playSolidDockSound(cardIndex = 0) {
  try {
    const ctx = getSharedAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // Master Output Stage with safety limiter
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.92, now);
    masterGain.connect(ctx.destination);

    const comp = ctx.createDynamicsCompressor();
    comp.threshold.setValueAtTime(-5, now);
    comp.knee.setValueAtTime(6, now);
    comp.ratio.setValueAtTime(4, now);
    comp.attack.setValueAtTime(0.001, now);
    comp.release.setValueAtTime(0.09, now);
    comp.connect(masterGain);

    // 1. Crisp Mechanical Latch Click & Snap (Audible on any speaker)
    const bufferSize = Math.floor(ctx.sampleRate * 0.024); // 24ms crisp burst
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.22));
    }

    const clickSource = ctx.createBufferSource();
    clickSource.buffer = buffer;

    const clickFilter = ctx.createBiquadFilter();
    clickFilter.type = "bandpass";
    clickFilter.frequency.setValueAtTime(1950, now);
    clickFilter.Q.setValueAtTime(2.6, now);

    const clickGain = ctx.createGain();
    clickGain.gain.setValueAtTime(0.72, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.026);

    clickSource.connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(comp);
    clickSource.start(now);

    // 2. Secondary Latch Tongue Clack (Mid-range mechanical impact)
    const clackOsc = ctx.createOscillator();
    const clackGain = ctx.createGain();
    const clackFilter = ctx.createBiquadFilter();

    clackOsc.type = "triangle";
    clackOsc.frequency.setValueAtTime(780, now);
    clackOsc.frequency.exponentialRampToValueAtTime(280, now + 0.035);

    clackFilter.type = "bandpass";
    clackFilter.frequency.setValueAtTime(540, now);
    clackFilter.Q.setValueAtTime(2.2, now);

    clackGain.gain.setValueAtTime(0.001, now);
    clackGain.gain.linearRampToValueAtTime(0.55, now + 0.003);
    clackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);

    clackOsc.connect(clackFilter);
    clackFilter.connect(clackGain);
    clackGain.connect(comp);
    clackOsc.start(now);
    clackOsc.stop(now + 0.06);

    // 3. Audible Metallic Body Thud (Punchy mid-bass that cuts through laptop speakers)
    const bodyOsc = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    const bodyFilter = ctx.createBiquadFilter();

    bodyOsc.type = "triangle";
    const bodyBaseFreq = 210 - Math.min(cardIndex * 12, 40);
    bodyOsc.frequency.setValueAtTime(bodyBaseFreq, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(78, now + 0.09);

    bodyFilter.type = "lowpass";
    bodyFilter.frequency.setValueAtTime(320, now);
    bodyFilter.frequency.exponentialRampToValueAtTime(95, now + 0.12);

    bodyGain.gain.setValueAtTime(0.001, now);
    bodyGain.gain.linearRampToValueAtTime(0.85, now + 0.006);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

    bodyOsc.connect(bodyFilter);
    bodyFilter.connect(bodyGain);
    bodyGain.connect(comp);
    bodyOsc.start(now);
    bodyOsc.stop(now + 0.17);

    // 4. Solid Sub-Bass Foundation (Physical weight and heft)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();

    subOsc.type = "sine";
    const subBase = 125 - Math.min(cardIndex * 8, 24);
    subOsc.frequency.setValueAtTime(subBase, now);
    subOsc.frequency.exponentialRampToValueAtTime(44, now + 0.10);

    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.linearRampToValueAtTime(0.78, now + 0.008);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.20);

    subOsc.connect(subGain);
    subGain.connect(comp);
    subOsc.start(now);
    subOsc.stop(now + 0.21);
  } catch {
    // Graceful fallback
  }
}
