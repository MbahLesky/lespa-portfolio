"use client";

import { useEffect, useState } from "react";

import {
  INTRO_DONE_EVENT,
  type IntroDoneDetail,
} from "@/components/shared/IntroSequence";
import {
  Typewriter,
  segmentsLength,
  sharedPrefix,
  type TypeSegment,
} from "@/components/shared/Typewriter";
import { hero } from "@/content/copy";
import { roleSwap } from "@/lib/motion";
import { HOLD_REST_CLASS, TYPE } from "@/lib/intro-timeline";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A claim as typed runs. The role carries the accent, so the green is there
 * while the word appears rather than being applied once it lands.
 */
const segmentsFor = (index: number): TypeSegment[] => {
  const role = hero.roles[index];
  return [
    { text: `${role.before} ` },
    { text: role.word, className: "text-accent-fg" },
    { text: ` ${role.after}` },
  ];
};

const lengthOf = (index: number) => segmentsLength(segmentsFor(index));

const textOf = (index: number) =>
  segmentsFor(index)
    .map((segment) => segment.text)
    .join("");

/**
 * Every line the rewrite passes through, in both directions.
 *
 * Sizing the box to the two finished claims is not enough: half way through,
 * the line is the head of one sentence joined to the tail of the other, and the
 * join can be wider than either — "Wraphic" is wider than "Graphic", because W
 * is a wider glyph than G. At some widths that is enough to push the sentence
 * onto a row neither finished version needs.
 *
 * Rather than guess at a margin, the box is measured against every state the
 * line will ever hold. They are laid out once, hidden, stacked in a single grid
 * cell, so the cell is the tallest of them by construction — and the reserved
 * row appears only at the widths that actually need it.
 */
const everyState = () => {
  const states = new Set<string>();
  for (let i = 0; i < hero.roles.length; i++) {
    const from = textOf(i);
    const to = textOf((i + 1) % hero.roles.length);
    states.add(to);
    for (let cursor = 0; cursor <= Math.max(from.length, to.length); cursor++) {
      states.add(to.slice(0, cursor) + from.slice(cursor));
    }
  }
  return [...states];
};

/**
 * Line two of the hero headline.
 *
 * It types itself out, holds, and is then rewritten into the other claim in a
 * single left-to-right pass — never erased to nothing first. The two sentences
 * share their opening, so the cursor starts where they diverge and everything
 * past it is still the outgoing line: what you read is one sentence turning
 * into another, with no blank gap in the middle and no caret jumping home.
 *
 * Both claims are always in the DOM, stacked into one grid cell, so the box is
 * permanently sized to the larger of the two and neither the typing nor the
 * rewriting can shift the layout by a pixel. Only one is ever visible.
 *
 * Both are hidden from assistive technology; the hero supplies one clean
 * sentence instead, so a screen reader never hears a stuttering headline.
 */
export function RoleSwap() {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  /** Characters shown. null means the line is simply there, in full. */
  const [count, setCount] = useState<number | null>(null);
  /**
   * The claim being typed over, while one is replacing another. Everything
   * past the cursor is still this one, so the line is never blank mid-swap.
   */
  const [replacing, setReplacing] = useState<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const root = document.documentElement;
    const introRunning = root.classList.contains("intro-active");

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const hold = (delay: number, run: () => void) => {
      timers.push(
        setTimeout(() => {
          if (!cancelled) run();
        }, delay),
      );
    };

    /**
     * Type or erase between two lengths, one character per tick, starting at
     * `after`. Returns the moment it finishes, so the next beat can be booked
     * against it.
     */
    const type = (after: number, from: number, to: number, speed: number) => {
      const steps = Math.abs(to - from);
      const step = to > from ? 1 : -1;
      for (let i = 1; i <= steps; i++) {
        const shown = from + i * step;
        hold(after + i * speed, () => setCount(shown));
      }
      return after + steps * speed;
    };

    /**
     * Release the rest of the page. It waits for line two so the hero is read
     * before anything else arrives — the opening parks this cue and leaves it
     * to here, since only this knows when the typing ends.
     */
    const releaseRest = () => root.classList.remove(HOLD_REST_CLASS);

    /** The line is finished, and stands as an ordinary sentence again. */
    const finishLine = () => {
      setReplacing(null);
      setCount(null);
    };

    /** Finished, and the page may come in behind it. */
    const settle = () => {
      finishLine();
      releaseRest();
    };

    /** Removes whichever listener is currently armed, whatever stage we are at. */
    let dropListeners = () => {};

    /** Which claim is on screen. Tracked here as well as in state, so the
     *  schedule can be built without re-running this effect on every swap. */
    let claim = 0;
    let cycles = 0;

    /**
     * Type one claim over the other in a single left-to-right pass, and book
     * the next round.
     *
     * Not erase-then-retype. The two claims already share their opening, so
     * the cursor starts where they diverge and every character past it is
     * still the outgoing sentence: the line reads as being rewritten rather
     * than deleted and typed again, and it is never blank. Where one claim is
     * longer, the surplus is typed in or dropped by the same pass rather than
     * a separate phase.
     */
    const swapAt = (when: number) => {
      hold(when, () => {
        const previous = claim;
        const next = (claim + 1) % hero.roles.length;
        const start = sharedPrefix(segmentsFor(previous), segmentsFor(next));
        const end = Math.max(lengthOf(previous), lengthOf(next));

        claim = next;
        setIndex(next);
        setReplacing(previous);
        setCount(start);

        const written = type(0, start, end, TYPE.role);
        hold(written, () => {
          setReplacing(null);
          setCount(null);
        });

        cycles += 1;
        // A cycle is a full there-and-back. Stop only on the first claim, so
        // the resting state is always the primary one.
        if (cycles < roleSwap.cycles * hero.roles.length) {
          swapAt(written + roleSwap.holdMs);
        }
      });
    };

    // The second claim is only ever painted after a swap, and a large piece of
    // text appearing for the first time several seconds in is recorded as a
    // late largest-contentful paint. Waiting for the visitor to do something
    // avoids that entirely: the first interaction, scrolling included, closes
    // the measurement window, and a visitor who never interacts simply reads
    // the resting claim.
    const INTERACTIONS = ["pointerdown", "keydown", "scroll", "touchstart"];
    const onInteract = () => {
      INTERACTIONS.forEach((kind) =>
        window.removeEventListener(kind, onInteract),
      );
      swapAt(roleSwap.firstSwapMs);
    };
    const armInteraction = () => {
      INTERACTIONS.forEach((kind) =>
        window.addEventListener(kind, onInteract, {
          once: true,
          passive: true,
        }),
      );
      dropListeners = () =>
        INTERACTIONS.forEach((kind) =>
          window.removeEventListener(kind, onInteract),
        );
    };

    /** Type the first claim out, then hand over to the usual alternation. */
    const typeThenSwap = (event: Event) => {
      // Skipping the opening sequence is a request for less of this, not more:
      // the line is simply there, and the swap waits to be earned.
      if ((event as CustomEvent<IntroDoneDetail>).detail?.skipped) {
        settle();
        armInteraction();
        return;
      }

      // Blank the line before the page is revealed. This runs in the same task
      // as the reveal, so the finished sentence is never painted for a frame
      // ahead of its first character.
      setCount(0);
      const first = timers.length;
      const written = type(roleSwap.afterIntroMs, 0, lengthOf(0), TYPE.role);
      hold(written, finishLine);
      // The line lands, and is then left alone for a beat before anything else
      // moves — the hero has just said the one thing it exists to say, and
      // bringing the rest of the page in on top of that reads as impatience.
      hold(written + roleSwap.secondaryRevealMs, releaseRest);
      /** Just the typing, captured before the swap is booked on top of it. */
      const typing = timers.slice(first);
      swapAt(written + roleSwap.firstSwapAfterIntroMs);

      // The page below is held back until this line is read, which is fine
      // while the visitor is reading it and not fine the moment they scroll
      // instead. Any input finishes the line at once and lets the rest in,
      // rather than leaving them looking at empty sections. Only the typing is
      // dropped — the swap keeps the schedule it was given, so the line does
      // not lurch straight into a rewrite.
      const onImpatient = () => {
        INTERACTIONS.forEach((kind) =>
          window.removeEventListener(kind, onImpatient),
        );
        typing.forEach(clearTimeout);
        settle();
      };
      INTERACTIONS.forEach((kind) =>
        window.addEventListener(kind, onImpatient, {
          once: true,
          passive: true,
        }),
      );
      dropListeners = () =>
        INTERACTIONS.forEach((kind) =>
          window.removeEventListener(kind, onImpatient),
        );
    };

    if (introRunning) {
      window.addEventListener(INTRO_DONE_EVENT, typeThenSwap, { once: true });
    } else {
      armInteraction();
    }

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      dropListeners();
      window.removeEventListener(INTRO_DONE_EVENT, typeThenSwap);
    };
  }, [prefersReducedMotion]);

  // Reduced motion rests on the first claim and never animates.
  const current = prefersReducedMotion ? 0 : index;

  return (
    <span className="role-swap" aria-hidden="true">
      {/* Sets the box, and is the only thing that does — see everyState. The
          line you actually read sits out of flow above this, so nothing it
          does at any point in the rewrite can move the heading. */}
      <span className="role-swap-sizer">
        {everyState().map((state) => (
          <span key={state} className="role-swap-measure">
            {state}
          </span>
        ))}
      </span>

      {hero.roles.map((role, i) => {
        const isCurrent = i === current;
        return (
          // The role carries the accent and the copy around it drops to the
          // secondary tone, so the swapping words are the brightest thing on
          // the line. Only the current claim is visible; the other stays in the
          // flow, unseen, so the box never changes size.
          <span
            key={role.word}
            className="role-swap-state text-content-secondary"
            data-current={isCurrent ? "true" : undefined}
          >
            {isCurrent && count !== null ? (
              <Typewriter
                to={segmentsFor(i)}
                from={
                  replacing === null ? undefined : segmentsFor(replacing)
                }
                count={count}
                caret
              />
            ) : (
              <>
                {role.before}{" "}
                <span className="text-accent-fg">{role.word}</span>{" "}
                {role.after}
              </>
            )}
          </span>
        );
      })}
    </span>
  );
}
