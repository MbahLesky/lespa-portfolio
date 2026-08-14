/**
 * The opening sequence, as a script of title cards.
 *
 *   blank
 *   -> the wordmark arrives at centre, is held, and flies to the navbar
 *   -> "Hi" is typed, held, and cleared
 *   -> "I am Lespa." is typed at centre and held
 *   -> the backdrop clears and the name moves into its place in the hero
 *   -> the role line types itself underneath, where it belongs
 *   -> the rest of the page arrives
 *
 * The name lands before the second line exists: nothing is still being read
 * when something moves, and nothing moves once it has landed.
 *
 * Every card is given time to be read: a card that finishes typing and moves
 * on immediately is a card nobody read. The holds below are the point of the
 * sequence, not padding around it — each one is the stillness after something
 * lands and before the next thing happens.
 *
 * The role line is not scripted here. It is typed by RoleSwap, in the hero,
 * once this hands over — that component owns line two from its first character
 * through every later swap.
 *
 * Kept in a plain module rather than beside the component: the inline head
 * script is built on the server, and importing a value from a "use client"
 * module there yields a client reference instead of the number.
 */

/** Per-character typing speeds, in milliseconds. */
export const TYPE = {
  greeting: 105,
  name: 68,
  /** The longest line, and the one being read rather than recognised. */
  role: 48,
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
  greetingHold: 700,

  /** Beat between the greeting clearing and the name starting. */
  nameGap: 200,
  /** The finished name is held at centre before it moves. */
  nameHold: 560,
  /** The name travels to its place in the hero. */
  pushDur: 620,

  /** The backdrop starts clearing this long before the name moves, so the
   *  page is already there for it to land into. */
  scrimOutBefore: 700,
  scrimOutDur: 500,
} as const;

/** How much larger the name reads while it is alone at centre. */
export const SOLO_ZOOM = 1.55;

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

/** When the name starts moving into the hero — after it has been read. */
export const pushAt = (name: string) =>
  NAME_AT + typeMs(name, TYPE.name) + INTRO.nameHold;

/** When the backdrop starts clearing. */
export const scrimOutAt = (name: string) =>
  pushAt(name) - INTRO.scrimOutBefore;

/** The overlay is gone and the name is in place. */
export const introEnd = (name: string) => pushAt(name) + INTRO.pushDur;

/** How quickly the overlay gets out of the way when the visitor skips it. */
export const SKIP_OUT_MS = 240;

/**
 * How long the sequence waits for the fonts before measuring anyway. Text laid
 * out in the fallback face is a few pixels off, and the stand-ins are measured
 * against the real elements they land on — but a font that never arrives must
 * not hold the page behind the overlay.
 */
export const FONT_WAIT_MS = 800;

/**
 * Safety net. If a measurement fails or an animation never resolves, the
 * sequence is torn down anyway — the page must never stay hidden behind it.
 */
export const INTRO_TIMEOUT_PAD = 1500;
