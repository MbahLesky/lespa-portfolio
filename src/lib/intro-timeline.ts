/**
 * The opening sequence, as a script of title cards.
 *
 *   blank
 *   -> the wordmark arrives at centre, is held, and flies to the navbar
 *   -> "Hi" is typed, held, and cleared
 *   -> "I am Lespa." is typed at centre and held
 *   -> it settles up the screen and shrinks, making room beneath it
 *   -> the role line types itself, still centred
 *   -> the backdrop clears, the pair is held, then both lines push left into
 *      their places in the hero
 *   -> the rest of the page arrives
 *
 * Both lines are typed at the centre of the screen and only move into the
 * left-aligned hero once the second one is finished, so nothing travels while
 * there is still something to read.
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
  /** The finished name is held at full size before it settles. */
  nameHold: 520,
  /** The name shifts up and shrinks, opening the space beneath it. */
  settleDur: 500,
  /** Beat between the name settling and the role line starting to type. */
  roleGap: 180,
  /** The role line fades up as its first characters arrive. */
  roleFadeDur: 260,

  /** The finished pair is held, centred, before it moves. */
  pushHold: 650,
  /** Both lines travel left into their places in the hero. */
  pushDur: 600,

  /** The backdrop starts clearing this long before the pair moves, so the
   *  page is already there for them to land into. */
  scrimOutBefore: 900,
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

/** When the name shifts up and shrinks — after it has been read. */
export const settleAt = (name: string) =>
  NAME_AT + typeMs(name, TYPE.name) + INTRO.nameHold;

/** When the role line starts typing, beneath the settled name. */
export const roleAt = (name: string) =>
  settleAt(name) + INTRO.settleDur + INTRO.roleGap;

/** When both lines start moving into the hero. */
export const pushAt = (name: string, role: string) =>
  roleAt(name) + typeMs(role, TYPE.role) + INTRO.pushHold;

/** When the backdrop starts clearing. */
export const scrimOutAt = (name: string, role: string) =>
  pushAt(name, role) - INTRO.scrimOutBefore;

/** The overlay is gone and the headline is in place. */
export const introEnd = (name: string, role: string) =>
  pushAt(name, role) + INTRO.pushDur;

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
