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

    const now = ctx.currentTime;

    // Fast brickwall limiter / punch compressor
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.setValueAtTime(-14, now);
    comp.knee.setValueAtTime(12, now);
    comp.ratio.setValueAtTime(14, now);
    comp.attack.setValueAtTime(0.001, now);
    comp.release.setValueAtTime(0.12, now);
    comp.connect(ctx.destination);

    // 1. Deep Sub-Bass Mechanical Thud (Fast pitch drop from 110Hz -> 38Hz)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    const subFilter = ctx.createBiquadFilter();

    subOsc.type = "sine";
    const baseFreq = 95 - Math.min(cardIndex * 4, 16);
    subOsc.frequency.setValueAtTime(baseFreq * 1.35, now);
    subOsc.frequency.exponentialRampToValueAtTime(36, now + 0.09);

    subFilter.type = "lowpass";
    subFilter.frequency.setValueAtTime(180, now);
    subFilter.frequency.exponentialRampToValueAtTime(55, now + 0.12);

    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.linearRampToValueAtTime(0.48, now + 0.008);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    subOsc.connect(subFilter);
    subFilter.connect(subGain);
    subGain.connect(comp);

    subOsc.start(now);
    subOsc.stop(now + 0.19);

    // 2. Solid Body Resonance (Heavy metallic body tone)
    const bodyOsc = ctx.createOscillator();
    const bodyGain = ctx.createGain();
    const bodyFilter = ctx.createBiquadFilter();

    bodyOsc.type = "triangle";
    bodyOsc.frequency.setValueAtTime(160, now);
    bodyOsc.frequency.exponentialRampToValueAtTime(75, now + 0.07);

    bodyFilter.type = "bandpass";
    bodyFilter.frequency.setValueAtTime(150, now);
    bodyFilter.Q.setValueAtTime(4.0, now);

    bodyGain.gain.setValueAtTime(0.001, now);
    bodyGain.gain.linearRampToValueAtTime(0.28, now + 0.006);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

    bodyOsc.connect(bodyFilter);
    bodyFilter.connect(bodyGain);
    bodyGain.connect(comp);

    bodyOsc.start(now);
    bodyOsc.stop(now + 0.15);

    // 3. Crisp Mechanical Latch Click (Dampened high-precision mechanical transient)
    const bufferSize = Math.floor(ctx.sampleRate * 0.015); // 15ms noise burst
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }

    const clickSource = ctx.createBufferSource();
    clickSource.buffer = buffer;

    const clickFilter = ctx.createBiquadFilter();
    clickFilter.type = "bandpass";
    clickFilter.frequency.setValueAtTime(1350, now);
    clickFilter.Q.setValueAtTime(3.0, now);

    const clickGain = ctx.createGain();
    clickGain.gain.setValueAtTime(0.22, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

    clickSource.connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(comp);

    clickSource.start(now);
  } catch {
    // Graceful fallback
  }
}
