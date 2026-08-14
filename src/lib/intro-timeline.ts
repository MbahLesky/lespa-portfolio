/**
 * The opening sequence, as a script of title cards.
 *
 *   blank
 *   -> the wordmark arrives at centre, is held, and flies to the navbar
 *   -> "Hi" is typed, held, and cleared
 *   -> "I am Lespa." is typed and held
 *   -> the backdrop clears and that line moves into its place in the hero
 *   -> the role line types itself
 *   -> the rest of the page arrives
 *
 * Every card is given time to be read: a card that finishes typing and moves
 * on immediately is a card nobody read. The holds below are the point of the
 * sequence, not padding around it — each one is the stillness after something
 * lands and before the next thing happens.
 *
 * Kept in a plain module rather than beside the component: the inline head
 * script is built on the server, and importing a value from a "use client"
 * module there yields a client reference instead of the number.
 */

/** Per-character typing speeds, in milliseconds. */
export const TYPE = {
  greeting: 105,
  name: 68,
  role: 38,
  /** Erasing runs faster than typing, as it does on a real keyboard. */
  erase: 55,
} as const;

export const GREETING = "Hi";

export const INTRO = {
  /** Wordmark fades up at centre. */
  wordIn: 200,
  wordInDur: 420,
  /** Stillness once it has arrived, so the mark registers as a mark. */
  wordHold: 620,
  /** Wordmark leaves for the navbar. */
  wordFlyDur: 620,

  /** Beat after the wordmark sets off, before the greeting starts typing. */
  greetingGap: 220,
  /** "Hi" sits finished on screen for this long before it is cleared. */
  greetingHold: 820,

  /** Beat between the greeting clearing and the name starting. */
  nameGap: 200,
  /** The finished name is held still before it moves into the hero. */
  nameHold: 780,
  /** The typed line travels to its place in the hero. */
  titleFlyDur: 620,

  /** The backdrop starts clearing this long before the line moves, so the
   *  page is already behind the card when it travels. */
  scrimOutBefore: 700,
  scrimOutDur: 500,
} as const;

/** Length of a typed string in milliseconds. */
export const typeMs = (text: string, speed: number) => text.length * speed;

/** The wordmark sets off for the navbar. */
export const WORD_FLY_AT = INTRO.wordIn + INTRO.wordInDur + INTRO.wordHold;

/** "Hi" begins while the wordmark is still travelling — the two overlap so the
 *  sequence never sits empty between cards. */
export const GREETING_AT = WORD_FLY_AT + INTRO.greetingGap;

/** The greeting starts being erased. */
export const ERASE_AT =
  GREETING_AT + typeMs(GREETING, TYPE.greeting) + INTRO.greetingHold;

/** When "I am Lespa." starts typing. */
export const NAME_AT = ERASE_AT + typeMs(GREETING, TYPE.erase) + INTRO.nameGap;

/** When the typed line starts moving to the hero — after it has been read. */
export const nameDoneAt = (name: string) =>
  NAME_AT + typeMs(name, TYPE.name) + INTRO.nameHold;

/** When the backdrop starts clearing. */
export const scrimOutAt = (name: string) =>
  nameDoneAt(name) - INTRO.scrimOutBefore;

/** The overlay is gone and the headline is in place. */
export const introEnd = (name: string) =>
  nameDoneAt(name) + INTRO.titleFlyDur;

/** How quickly the overlay gets out of the way when the visitor skips it. */
export const SKIP_OUT_MS = 240;

/**
 * Safety net. If a measurement fails or an animation never resolves, the
 * sequence is torn down anyway — the page must never stay hidden behind it.
 */
export const INTRO_TIMEOUT_PAD = 1500;
