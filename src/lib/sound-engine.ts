/**
 * The sound set, synthesised rather than sampled.
 *
 * The brief calls for organic, dry, wooden sounds with no discernible musical
 * pitch — which is exactly what a short noise burst through a band-pass filter
 * with a fast decay produces. Generating them means the payload is zero bytes
 * against a 40KB budget, there is no network request to fail, and the character
 * stays tunable. Real recordings can replace these by swapping decodeAudioData
 * buffers into the same map.
 *
 * Web Audio throughout, never <audio>: lower latency, and it lets one sound
 * cancel another cleanly.
 */

export type SoundName =
  | "buttonHover"
  | "buttonClick"
  | "cardHover"
  | "pageTransition"
  | "formSuccess";

interface Recipe {
  /** Seconds. */
  duration: number;
  /** 0–1, from the spec's volume table. */
  gain: number;
  /** Band-pass centre in Hz. Low and wide reads as wooden, not electronic. */
  frequency: number;
  q: number;
  /** Higher decays faster; a fast decay is what makes it dry rather than tonal. */
  decay: number;
  /** Optional second hit, for the two-part success cue. */
  second?: { at: number; frequency: number };
}

const RECIPES: Record<SoundName, Recipe> = {
  buttonHover: { duration: 0.04, gain: 0.08, frequency: 2000, q: 1.2, decay: 60 },
  buttonClick: { duration: 0.08, gain: 0.12, frequency: 420, q: 1.6, decay: 40 },
  cardHover: { duration: 0.12, gain: 0.06, frequency: 900, q: 0.7, decay: 18 },
  pageTransition: { duration: 0.2, gain: 0.1, frequency: 260, q: 0.5, decay: 10 },
  formSuccess: {
    duration: 0.3,
    gain: 0.15,
    frequency: 640,
    q: 1.4,
    decay: 16,
    second: { at: 0.12, frequency: 980 },
  },
};

/** Hover sounds are debounced so a fast mouse cannot machine-gun them. */
const HOVER_DEBOUNCE_MS = 80;
const HOVER_SOUNDS: ReadonlySet<SoundName> = new Set([
  "buttonHover",
  "cardHover",
]);

/** Scrolling counts as "still scrolling" for this long after the last event. */
const SCROLL_QUIET_MS = 150;

function renderBuffer(context: AudioContext, recipe: Recipe): AudioBuffer {
  const { sampleRate } = context;
  const length = Math.ceil(recipe.duration * sampleRate);
  const buffer = context.createBuffer(1, length, sampleRate);
  const channel = buffer.getChannelData(0);

  // Two-pole band-pass, applied by hand so the whole sound bakes into one
  // buffer and playing it costs a single node.
  const omega = (2 * Math.PI * recipe.frequency) / sampleRate;
  const alpha = Math.sin(omega) / (2 * recipe.q);
  const b0 = alpha;
  const b2 = -alpha;
  const a0 = 1 + alpha;
  const a1 = -2 * Math.cos(omega);
  const a2 = 1 - alpha;

  let x1 = 0;
  let x2 = 0;
  let y1 = 0;
  let y2 = 0;

  for (let i = 0; i < length; i++) {
    const t = i / sampleRate;
    const x = Math.random() * 2 - 1;
    const y = (b0 * x + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    x2 = x1;
    x1 = x;
    y2 = y1;
    y1 = y;

    // Fast exponential decay, plus a 2ms fade-in so the attack does not click.
    const envelope = Math.exp(-recipe.decay * t) * Math.min(1, t / 0.002);
    channel[i] = y * envelope;
  }

  if (recipe.second) {
    // Layer a second, brighter burst for the rise, offset in time.
    const offset = Math.floor(recipe.second.at * sampleRate);
    const w = (2 * Math.PI * recipe.second.frequency) / sampleRate;
    const a = Math.sin(w) / (2 * recipe.q);
    const d0 = 1 + a;
    const d1 = -2 * Math.cos(w);
    const d2 = 1 - a;
    x1 = x2 = y1 = y2 = 0;

    for (let i = offset; i < length; i++) {
      const t = (i - offset) / sampleRate;
      const x = Math.random() * 2 - 1;
      const y = (a * x - a * x2 - d1 * y1 - d2 * y2) / d0;
      x2 = x1;
      x1 = x;
      y2 = y1;
      y1 = y;
      channel[i] += y * Math.exp(-recipe.decay * t) * Math.min(1, t / 0.002) * 0.8;
    }
  }

  return buffer;
}

class SoundEngine {
  private context: AudioContext | null = null;
  private buffers = new Map<SoundName, AudioBuffer>();
  private current: AudioBufferSourceNode | null = null;
  private lastHoverAt = 0;
  private scrollingUntil = 0;
  private scrollBound = false;

  /**
   * Builds the AudioContext and renders all five sounds.
   *
   * Called from the toggle, never on page load — both because the spec says so
   * and because a context created outside a user gesture starts suspended.
   */
  async prepare(): Promise<void> {
    if (this.context) {
      if (this.context.state === "suspended") await this.context.resume();
      return;
    }

    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return;

    const context = new Ctor();
    this.context = context;

    for (const name of Object.keys(RECIPES) as SoundName[]) {
      this.buffers.set(name, renderBuffer(context, RECIPES[name]));
    }

    if (!this.scrollBound) {
      window.addEventListener("scroll", this.onScroll, { passive: true });
      this.scrollBound = true;
    }
  }

  private onScroll = () => {
    this.scrollingUntil = Date.now() + SCROLL_QUIET_MS;
  };

  play(name: SoundName): void {
    const context = this.context;
    const buffer = this.buffers.get(name);
    if (!context || !buffer || context.state !== "running") return;

    // Never during scroll.
    if (Date.now() < this.scrollingUntil) return;

    if (HOVER_SOUNDS.has(name)) {
      const now = Date.now();
      if (now - this.lastHoverAt < HOVER_DEBOUNCE_MS) return;
      this.lastHoverAt = now;
    }

    // Hard cap of one at a time: the later sound cancels the earlier.
    if (this.current) {
      try {
        this.current.stop();
      } catch {
        // Already ended. Nothing to stop.
      }
    }

    const source = context.createBufferSource();
    source.buffer = buffer;

    const gain = context.createGain();
    gain.gain.value = RECIPES[name].gain;

    source.connect(gain).connect(context.destination);
    source.onended = () => {
      if (this.current === source) this.current = null;
    };
    source.start();
    this.current = source;
  }

  async suspend(): Promise<void> {
    if (this.context && this.context.state === "running") {
      await this.context.suspend();
    }
  }
}

export const soundEngine = new SoundEngine();
