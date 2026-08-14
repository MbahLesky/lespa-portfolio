/**
 * The opening sequence, in milliseconds from the moment it starts.
 *
 * Kept in a plain module rather than beside the component: the inline head
 * script is built on the server, and importing a value from a "use client"
 * module there yields a client reference instead of the number.
 *
 * The shape of it:
 *   blank screen
 *   -> wordmark fades in at centre
 *   -> wordmark flies to its place in the navbar, while "I am Lespa." fades
 *      in at centre and the backdrop clears to reveal the page
 *   -> the headline rises and shrinks into its place in the hero
 *   -> the role line swaps, then the rest of the page arrives
 */
export const INTRO = {
  /** Beat of blank screen before anything appears. */
  wordIn: 120,
  wordInDur: 280,

  /** Wordmark leaves the centre for the navbar. */
  wordFly: 700,
  wordFlyDur: 560,

  /** The headline appears at centre while the wordmark is still travelling. */
  titleIn: 700,
  titleInDur: 300,

  /** Backdrop clears, so the page is already behind the moving headline. */
  scrimOut: 1000,
  scrimOutDur: 350,

  /** Headline rises and shrinks into the hero. */
  titleFly: 1350,
  titleFlyDur: 520,
} as const;

/** The headline has landed. The role line arrives with it. */
export const INTRO_END = INTRO.titleFly + INTRO.titleFlyDur;

/**
 * Long enough for the role line to be read once and swap: the first swap plus
 * its out-and-in. The rest of the page waits for this, so the sequence reads
 * headline -> role -> swap -> everything else, rather than dropping the whole
 * page in and swapping a word afterwards.
 */
export const INTRO_SWAP_WINDOW = 1400;

/** When everything other than the headline and role line enters. */
export const INTRO_REST = INTRO_END + INTRO_SWAP_WINDOW;

/**
 * Safety net. If a measurement fails or an animation never resolves, the
 * sequence is torn down anyway — the page must never stay hidden behind it.
 */
export const INTRO_TIMEOUT = INTRO_END + 1200;
