"use client";

import { useEffect, useState } from "react";

import { hero } from "@/content/copy";
import { roleSwap } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Line two of the hero headline, alternating between two complete claims.
 *
 * Both states are always rendered, stacked into a single CSS grid cell, so the
 * box is permanently sized to the wider of the two and the swap cannot shift
 * the layout by a pixel.
 *
 * Both are hidden from assistive technology and the hero supplies one clean
 * sentence instead — a screen reader should not hear a stuttering headline.
 *
 * Timing: first swap at 1400ms, then hold 3500ms. Out is 200ms, a 100ms gap,
 * in is 250ms. Stops after four cycles resting on State A; an infinite loop
 * becomes irritating on a page people spend two minutes with.
 */
export function RoleSwap() {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let cycles = 0;
    let swapTimer: ReturnType<typeof setTimeout>;
    let settleTimer: ReturnType<typeof setTimeout>;

    const scheduleNext = (delay: number) => {
      swapTimer = setTimeout(() => {
        setLeaving(true);

        settleTimer = setTimeout(() => {
          setIndex((current) => (current + 1) % hero.roles.length);
          setLeaving(false);
          cycles += 1;

          // A cycle is a full there-and-back. Stop only on State A, so the
          // resting state is always the primary claim.
          if (cycles >= roleSwap.cycles * hero.roles.length) return;
          scheduleNext(roleSwap.holdMs);
        }, roleSwap.outMs + roleSwap.gapMs);
      }, delay);
    };

    // Held until the page has finished loading. Animating a large
    // above-the-fold element re-triggers the browser's largest-contentful-paint
    // candidate on every swap, which charges the page for motion the reader has
    // already seen settle. Waiting also means the headline is never moving
    // while the rest of the page is still arriving.
    let startTimer: ReturnType<typeof setTimeout>;
    const begin = () => {
      startTimer = setTimeout(() => scheduleNext(roleSwap.firstSwapMs), roleSwap.settleAfterLoadMs);
    };

    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });

    return () => {
      window.removeEventListener("load", begin);
      clearTimeout(startTimer);
      clearTimeout(swapTimer);
      clearTimeout(settleTimer);
    };
  }, [prefersReducedMotion]);

  // Reduced motion rests on State A and never animates.
  const current = prefersReducedMotion ? 0 : index;

  return (
    <span className="role-swap" aria-hidden="true">
      {hero.roles.map((role, i) => (
        // The role carries the accent and the copy around it drops to the
        // secondary tone, so the swapping words are the brightest thing on the
        // line. On Brand Deep that reads as white against 72% white — green on
        // green would fail contrast outright.
        <span
          key={role.word}
          className={cn(
            "role-swap-state text-content-secondary",
            i === current && leaving && "is-leaving",
          )}
          data-current={i === current ? "true" : undefined}
        >
          {role.before}{" "}
          <span className="text-accent-fg">{role.word}</span> {role.after}
        </span>
      ))}
    </span>
  );
}
