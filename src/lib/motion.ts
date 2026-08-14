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
  outMs: 200,
  gapMs: 100,
  inMs: 250,
  holdMs: 3500,
  firstSwapMs: 1400,
  /** Quiet period after load before the sequence starts. See RoleSwap. */
  settleAfterLoadMs: 2000,
  /**
   * The first swap after the opening sequence. Short, because it is the closing
   * beat of the intro — long enough to read State A first, not long enough to
   * feel like a separate event.
   */
  firstSwapAfterIntroMs: 700,
  /** Stops after four cycles, resting on State A. Infinite loops irritate. */
  cycles: 4,
} as const;
