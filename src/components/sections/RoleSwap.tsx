"use client";

import { useEffect, useState } from "react";

import {
  INTRO_DONE_EVENT,
  type IntroDoneDetail,
} from "@/components/shared/IntroSequence";
import { hero } from "@/content/copy";
import { roleSwap } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Line two of the hero headline.
 *
 * It alternates between the two claims by crossfade, resting on the first.
 * On a first visit the line is typed out by the opening sequence before it
 * ever appears here, so this only picks up the alternation afterwards.
 *
 * Both states are always in the DOM, stacked into one grid cell, so the box is
 * permanently sized to the wider of the two and the swap cannot shift the
 * layout by a pixel.
 *
 * Both are hidden from assistive technology; the hero supplies one clean
 * sentence instead, so a screen reader never hears a stuttering headline.
 */
export function RoleSwap() {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

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

    // On a first visit the opening sequence types this line out and lands it
    // here, and the swap is the closing beat of that sequence rather than
    // ambient motion — so it plays on its own. Skipping the sequence is a
    // request for less of it, and afterwards the swap waits to be earned.
    const onIntroDone = (event: Event) => {
      const { skipped } = (event as CustomEvent<IntroDoneDetail>).detail ?? {};
      scheduleNext(
        skipped ? roleSwap.firstSwapMs : roleSwap.firstSwapAfterIntroMs,
      );
    };

    const introRunning =
      document.documentElement.classList.contains("intro-active");

    if (introRunning) {
      window.addEventListener(INTRO_DONE_EVENT, onIntroDone, { once: true });
    } else {
      armInteraction();
    }

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      INTERACTIONS.forEach((type) =>
        window.removeEventListener(type, onInteract),
      );
      window.removeEventListener(INTRO_DONE_EVENT, onIntroDone);
    };
  }, [prefersReducedMotion]);

  // Reduced motion rests on the first claim and never animates.
  const current = prefersReducedMotion ? 0 : index;

  return (
    <span className="role-swap" aria-hidden="true">
      {hero.roles.map((role, i) => (
        // The role carries the accent and the copy around it drops to the
        // secondary tone, so the swapping words are the brightest thing on
        // the line.
        <span
          key={role.word}
          className={cn(
            "role-swap-state text-content-secondary",
            i === current && leaving && "is-leaving",
          )}
          data-current={i === current ? "true" : undefined}
        >
          {role.before} <span className="text-accent-fg">{role.word}</span>{" "}
          {role.after}
        </span>
      ))}
    </span>
  );
}
