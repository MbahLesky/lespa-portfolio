/**
 * The opening sequence, as a script of title cards.
 *
 *   blank
 *   -> the wordmark arrives at centre and flies to its place in the navbar
 *   -> "Hi" is typed, held, and cleared
 *   -> "I am Lespa." is typed
 *   -> the backdrop clears and that line moves into its place in the hero
 *   -> the role line types itself
 *   -> the rest of the page arrives
 *
 * Kept in a plain module rather than beside the component: the inline head
 * script is built on the server, and importing a value from a "use client"
 * module there yields a client reference instead of the number.
 */

/** Per-character typing speeds, in milliseconds. */
export const TYPE = {
  greeting: 80,
  name: 55,
  role: 20,
  /** Erasing runs faster than typing, as it does on a real keyboard. */
  erase: 45,
} as const;

export const GREETING = "Hi";

export const INTRO = {
  /** Wordmark fades up at centre. */
  wordIn: 150,
  wordInDur: 280,

  /** Wordmark leaves for the navbar. */
  wordFly: 650,
  wordFlyDur: 520,

  /** "Hi" — typed, held, cleared. */
  greetingAt: 850,
  greetingHold: 420,

  /** "I am Lespa." begins once the greeting is gone. */
  nameGap: 60,

  /** Backdrop clears while the name is still being typed. */
  scrimOut: 1900,
  scrimOutDur: 400,

  /** The typed line moves into its place in the hero. */
  titleFlyDur: 480,
  /** Beat between finishing the name and moving it. */
  titleFlyGap: 140,
} as const;

/** Length of a typed string in milliseconds. */
export const typeMs = (text: string, speed: number) => text.length * speed;

const greetingDone =
  INTRO.greetingAt +
  typeMs(GREETING, TYPE.greeting) +
  INTRO.greetingHold +
  typeMs(GREETING, TYPE.erase);

/** When "I am Lespa." starts typing. */
export const NAME_AT = greetingDone + INTRO.nameGap;

/** When the typed line starts moving to the hero. Set by the component from
 *  the real headline text, but this is the floor the scrim is timed against. */
export const nameDoneAt = (name: string) =>
  NAME_AT + typeMs(name, TYPE.name) + INTRO.titleFlyGap;

/** The overlay is gone and the headline is in place. */
export const introEnd = (name: string) =>
  nameDoneAt(name) + INTRO.titleFlyDur;

/**
 * Safety net. If a measurement fails or an animation never resolves, the
 * sequence is torn down anyway — the page must never stay hidden behind it.
 */
export const INTRO_TIMEOUT_PAD = 1500;
