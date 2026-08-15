"use client";

import { useEffect } from "react";

import { SETTLING_ATTR, softSnap } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Settles a scroll that stops just short of a section.
 *
 * When scrolling stops within a short distance of a section's start, this
 * closes the gap so the heading sits under the nav rather than a little above
 * or below it. Further away than that it does nothing at all, which is what
 * keeps a long section readable: you scroll through the middle of it normally,
 * and only its edges are ever tidied.
 *
 * Not CSS scroll snapping. `scroll-snap-type: proximity` turned every boundary
 * into a magnet about a fifth of the viewport wide — a scroll of up to 200px
 * either way was swallowed entirely, the page did not move, and the auto-hiding
 * nav read the snap-back as a downward scroll and stayed hidden. The threshold
 * is not adjustable in CSS, so the behaviour is written out here where it can
 * be a small number.
 *
 * The visitor always wins: any deliberate input cancels a pending or running
 * correction, and none of this runs at all under reduced motion.
 */
export function SoftSnap() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const root = document.documentElement;
    let idle: ReturnType<typeof setTimeout> | undefined;
    let cooldown: ReturnType<typeof setTimeout> | undefined;
    let settling = false;

    const stopSettling = () => {
      settling = false;
      root.removeAttribute(SETTLING_ATTR);
    };

    const cancel = () => {
      clearTimeout(idle);
      clearTimeout(cooldown);
      stopSettling();
    };

    const settle = () => {
      // Never while the opening sequence still owns the page.
      if (settling || root.classList.contains("intro-active")) return;

      const y = window.scrollY;
      const limit = root.scrollHeight - window.innerHeight;
      // Leave the two ends alone: nudging away from the top or the bottom of
      // the document reads as the page refusing to stay where it was put.
      if (y <= softSnap.rangePx || y >= limit - softSnap.rangePx) return;

      const offset =
        parseInt(getComputedStyle(root).getPropertyValue("--nav-height"), 10) ||
        0;

      let best: { top: number; distance: number } | undefined;
      for (const section of document.querySelectorAll("section[id]")) {
        const top = Math.round(section.getBoundingClientRect().top + y - offset);
        if (top <= 0 || top >= limit) continue;
        const distance = Math.abs(top - y);
        if (distance < softSnap.deadPx || distance > softSnap.rangePx) continue;
        if (!best || distance < best.distance) best = { top, distance };
      }
      if (!best) return;

      settling = true;
      // Flagged for the nav, which must not read a correction as the visitor
      // scrolling down and hide itself again.
      root.setAttribute(SETTLING_ATTR, "");
      window.scrollTo({ top: best.top, behavior: "smooth" });
      cooldown = setTimeout(stopSettling, softSnap.cooldownMs);
    };

    const onScroll = () => {
      if (settling) return;
      clearTimeout(idle);
      idle = setTimeout(settle, softSnap.idleMs);
    };

    // Anything the visitor does themselves outranks a correction, including one
    // already under way — the browser abandons a smooth scroll on real input,
    // and this makes sure nothing schedules another straight afterwards.
    const INPUTS = ["wheel", "touchstart", "keydown", "pointerdown"];

    window.addEventListener("scroll", onScroll, { passive: true });
    INPUTS.forEach((kind) =>
      window.addEventListener(kind, cancel, { passive: true }),
    );

    return () => {
      window.removeEventListener("scroll", onScroll);
      INPUTS.forEach((kind) => window.removeEventListener(kind, cancel));
      clearTimeout(idle);
      clearTimeout(cooldown);
      root.removeAttribute(SETTLING_ATTR);
    };
  }, [prefersReducedMotion]);

  return null;
}
