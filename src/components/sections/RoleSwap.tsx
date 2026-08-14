"use client";

import { useEffect, useState } from "react";

import {
  INTRO_DONE_EVENT,
  type IntroDoneDetail,
} from "@/components/shared/IntroSequence";
import {
  Typewriter,
  segmentsLength,
  type TypeSegment,
} from "@/components/shared/Typewriter";
import { hero } from "@/content/copy";
import { roleSwap } from "@/lib/motion";
import { TYPE } from "@/lib/intro-timeline";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * A role as typed runs. The role itself carries the accent, so the green is
 * there while the word appears rather than being applied once it lands.
 */
const segmentsFor = (index: number): TypeSegment[] => {
  const role = hero.roles[index];
  return [
    { text: `${role.before} ` },
    { text: role.word, className: "text-accent-fg" },
    { text: ` ${role.after}` },
  ];
};

/**
 * Line two of the hero headline.
 *
 * On a first visit it is typed out as the closing card of the opening sequence.
 * After that — and on every later visit — it alternates between the two claims
 * by crossfade, resting on the first.
 *
 * Both states are always in the DOM, stacked into one grid cell, so the box is
 * permanently sized to the wider of the two and neither the typing nor the
 * swapping can shift the layout by a pixel.
 *
 * Both are hidden from assistive technology; the hero supplies one clean
 * sentence instead, so a screen reader never hears a stuttering headline.
 */
export function RoleSwap() {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  /** null once typing is done — from then on the full line is shown. */
  const [typedCount, setTypedCount] = useState<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Blank the line for the whole of the opening sequence. Waiting until the
    // handover to do this left the finished sentence painted for a frame
    // before the first character was typed.
    const introRunning =
      document.documentElement.classList.contains("intro-active");
    if (introRunning) setTypedCount(0);

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const hold = (delay: number, run: () => void) => {
      timers.push(
        setTimeout(() => {
          if (!cancelled) run();
        }, delay),
      );
    };

    let cycles = 0;
    const scheduleNext = (delay: number) => {
      hold(delay, () => {
        setLeaving(true);
        hold(roleSwap.outMs + roleSwap.gapMs, () => {
          setIndex((current) => (current + 1) % hero.roles.length);
          setLeaving(false);
          cycles += 1;
          // A cycle is a full there-and-back. Stop only on the first claim, so
          // the resting state is always the primary one.
          if (cycles >= roleSwap.cycles * hero.roles.length) return;
          scheduleNext(roleSwap.holdMs);
        });
      });
    };

    /** Type the first claim out, then hand over to the usual alternation. */
    const typeThenCycle = (event: Event) => {
      // Skipping the opening sequence is a request for less of this, not more:
      // the line is simply there, and the swap waits to be earned like it does
      // on any later visit.
      if ((event as CustomEvent<IntroDoneDetail>).detail?.skipped) {
        setTypedCount(null);
        armInteraction();
        return;
      }

      const total = segmentsLength(segmentsFor(0));
      setTypedCount(0);
      for (let i = 1; i <= total; i++) {
        hold(i * TYPE.role, () => setTypedCount(i));
      }
      hold(total * TYPE.role, () => setTypedCount(null));
      scheduleNext(total * TYPE.role + roleSwap.firstSwapAfterIntroMs);
    };

    // The second claim rests at opacity 0, so the browser does not see it until
    // the first swap paints it — and a large piece of text appearing for the
    // first time several seconds in is recorded as a late largest-contentful
    // paint. Waiting for the visitor to do something avoids that entirely:
    // the first interaction, scrolling included, closes the measurement window,
    // and a visitor who never interacts simply reads the resting claim.
    const INTERACTIONS = ["pointerdown", "keydown", "scroll", "touchstart"];
    const onInteract = () => {
      INTERACTIONS.forEach((type) =>
        window.removeEventListener(type, onInteract),
      );
      scheduleNext(roleSwap.firstSwapMs);
    };
    const armInteraction = () => {
      INTERACTIONS.forEach((type) =>
        window.addEventListener(type, onInteract, {
          once: true,
          passive: true,
        }),
      );
    };

    // On a first visit the opening sequence owns the headline until it lands,
    // and says so: the swap there is the closing beat of the sequence, not
    // ambient motion, so it plays on its own. Afterwards it is decoration and
    // waits to be earned.
    if (introRunning) {
      window.addEventListener(INTRO_DONE_EVENT, typeThenCycle, { once: true });
    } else {
      armInteraction();
    }

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      INTERACTIONS.forEach((type) =>
        window.removeEventListener(type, onInteract),
      );
      window.removeEventListener(INTRO_DONE_EVENT, typeThenCycle);
    };
  }, [prefersReducedMotion]);

  // Reduced motion rests on the first claim and never animates.
  const current = prefersReducedMotion ? 0 : index;

  return (
    <span className="role-swap" aria-hidden="true">
      {hero.roles.map((role, i) => {
        const isCurrent = i === current;
        // Only the first claim is ever typed, and only while the count is set.
        const typing = isCurrent && i === 0 && typedCount !== null;

        return (
          // The role carries the accent and the copy around it drops to the
          // secondary tone, so the swapping words are the brightest thing on
          // the line.
          <span
            key={role.word}
            className={cn(
              "role-swap-state text-content-secondary",
              isCurrent && leaving && "is-leaving",
            )}
            data-current={isCurrent ? "true" : undefined}
          >
            {typing ? (
              <Typewriter segments={segmentsFor(i)} count={typedCount} caret />
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
