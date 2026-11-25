/**
 * Luxury Aviation Audio Synthesizer (Web Audio API)
 * Synthesizes authentic cockpit avionic switch toggles, executive cabin chimes,
 * tactile relays, and solid dock latches with zero external asset latency.
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

/**
 * 1. Cockpit Avionics Switch Snap / Heavy Aircraft Toggle
 * Authentic dual-transient mechanical switch toggle (Audible, crisp, satisfying)
 */
export function playCockpitSwitchSound(isOff = false) {
  try {
    const ctx = getSharedAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    const now = ctx.currentTime;
    const baseFreq = isOff ? 1650 : 2100;

    // Transient noise click (contact mechanical snap)
    const bufferSize = Math.floor(ctx.sampleRate * 0.016);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(baseFreq, now);
    noiseFilter.Q.setValueAtTime(4.2, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);

    // Metallic lever detent ping
    const detentOsc = ctx.createOscillator();
    const detentGain = ctx.createGain();
    detentOsc.type = "sine";
    detentOsc.frequency.setValueAtTime(baseFreq * 0.65, now);
    detentOsc.frequency.exponentialRampToValueAtTime(320, now + 0.04);

    detentGain.gain.setValueAtTime(0.22, now);
    detentGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    detentOsc.connect(detentGain);
    detentGain.connect(ctx.destination);
    detentOsc.start(now);
    detentOsc.stop(now + 0.05);
  } catch {
    // Autoplay policy fallback
  }
}

/**
 * 2. Executive Luxury Cabin Chime (Pressurized Gulfstream/Global 7500 Cabin Note)
 * Pure harmonic two-tone sine chime (784Hz [G5] to 1046Hz [C6])
 */
export function playCabinChimeSound() {
  try {
    const ctx = getSharedAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    const now = ctx.currentTime;

    // Tone 1: High fundamental
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(1046.5, now); // C6

    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.22, now + 0.012);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 1.25);

    // Tone 2: Warm fifth harmonic support
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(783.99, now); // G5

    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.linearRampToValueAtTime(0.18, now + 0.015);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 1.45);
  } catch {
    // Graceful fallback
  }
}

/**
 * 3. Tactile Avionic Interface Click (Micro-Relay)
 */
export function playTactileClickSound() {
  try {
    const ctx = getSharedAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(2400, now);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.018);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.022);
  } catch {
    // Fallback
  }
}

/**
 * 4. Solid Heavy Mechanical Dock Synthesizer
 */
export function playSolidDockSound(cardIndex = 0) {
  try {
    const ctx = getSharedAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

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

    // 1. Crisp Mechanical Latch Click
    const bufferSize = Math.floor(ctx.sampleRate * 0.024);
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

    // 2. Secondary Latch Tongue Clack
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

    // 3. Metallic Body Thud
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

    // 4. Solid Sub-Bass Foundation
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
