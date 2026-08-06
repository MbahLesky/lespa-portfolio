/**
 * Loading-transition timings.
 *
 * Kept in a plain module rather than alongside the component: the inline head
 * script is built on the server, and importing a value from a "use client"
 * module there yields a client reference rather than the number — which
 * silently interpolated into the script and broke it.
 */

/**
 * Sequence: icon settles, wordmark wipes in, green rule draws, lockup lifts.
 *
 * A loading screen costs largest-contentful-paint directly, because nothing
 * behind it counts as painted — so this is kept as short as the sequence can
 * read, rather than as long as it could hold.
 */
export const BOOT_HOLD_MS = 850;

/** Matches --duration-slow, the exit animation. */
export const BOOT_EXIT_MS = 400;

/**
 * The entrance starts as the loader begins clearing rather than after it, so
 * the hero is already arriving through the fade. The two motions read as one
 * gesture and the headline is visible sooner.
 */
export const BOOT_ENTER_DELAY_MS = BOOT_HOLD_MS;
