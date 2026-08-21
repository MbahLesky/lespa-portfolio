/**
 * Motion tokens, mirrored from globals.css for use in Framer Motion variants.
 *
 * CSS handles anything CSS can handle; these exist only where JS drives the
 * animation. Nothing here exceeds 400ms — past that the site feels like it is
 * thinking.
 */

export const duration = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
  reveal: 0.35,
  section: 0.6,
} as const;

export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

/** Section entry: fade up from 16px. One per section, never per element. */
export const revealVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: easeOut },
  },
} as const;

/** Page transition: fade only. No slide, no wipe, no curtain. */
export const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.base } },
  exit: { opacity: 0, transition: { duration: duration.base } },
} as const;

/**
 * Role-swap timings, in milliseconds — the one place where exact numbers matter
 * more than the shape of the curve.
 */
export const roleSwap = {
  /**
   * How long the finished line is left alone before the rest of the page comes
   * in behind it. The hero has just said the one thing it exists to say;
   * bringing everything else in on top of that reads as impatience.
   */
  secondaryRevealMs: 2000,
  /**
   * How long a finished claim rests before it is rewritten. A swap is a visible
   * rewrite rather than a crossfade, so it needs to be rare: long enough to
   * read the sentence, look away, and look back.
   */
  holdMs: 6000,
  /** Beat between the name landing and line two starting to type. */
  afterIntroMs: 280,
  /** Beat between the visitor's first interaction and the first swap. */
  firstSwapMs: 2400,
  /**
   * The first swap after the opening sequence — the closing beat of the intro.
   * Long enough to read the whole of the first claim after it finishes typing,
   * since the swap is what reveals that there is a second one.
   */
  firstSwapAfterIntroMs: 2600,
  /**
   * Stops after two cycles, resting on State A. Infinite loops irritate, and a
   * rewrite draws far more attention than the crossfade it replaced — the
   * point is made in two passes.
   */
  cycles: 2,
} as const;

/**
 * The scroll hint below the hero. It waits out the opening sequence and the
 * typing of line two, then a beat more, so it reads as an invitation rather
 * than an interruption.
 */
export const scrollCue = {
  /** After the opening, the typing, the beat that follows it, and the page
   *  entering behind all three — an invitation to scroll that arrives before
   *  there is anything to scroll to is just a distraction. */
  appearAfterMs: 11500,
} as const;

/**
 * The settle that tidies a scroll which stops just short of a section.
 *
 * Deliberately small. This is not scroll snapping — it corrects a near-miss
 * and is invisible the rest of the time, so a long section reads normally all
 * the way down and only its edges are ever nudged.
 */
/**
 * Marks <html> while the scroll is being corrected. The auto-hiding nav reads
 * it and holds its state: a scroll the page performed on the visitor's behalf
 * is not the visitor scrolling, and letting a downward correction re-hide the
 * bar meant an upward flick could reveal it and lose it again in one gesture.
 */
export const SETTLING_ATTR = "data-settling";

export const softSnap = {
  /** How close to a boundary a resting position must be to be corrected. */
  rangePx: 96,
  /** Inside this it is already aligned, and moving would be noise. */
  deadPx: 4,
  /** Quiet time after the last scroll event before deciding it has stopped. */
  idleMs: 140,
  /** Long enough for the correction to land before listening again. */
  cooldownMs: 700,
} as const;
