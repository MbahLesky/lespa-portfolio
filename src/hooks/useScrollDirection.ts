"use client";

import { useEffect, useState } from "react";

/** Scroll distance before the nav swaps to its solid, blurred treatment. */
const SOLID_AFTER = 80;

/** Ignore jitter below this so the nav doesn't flicker on trackpad noise. */
const DIRECTION_THRESHOLD = 8;

interface ScrollState {
  /** True once past SOLID_AFTER — drives the background and blur. */
  isScrolled: boolean;
  /** True while scrolling down past the nav's own height — drives auto-hide. */
  isHidden: boolean;
}

/**
 * Nav auto-hide state: hides on scroll down, reappears on scroll up.
 *
 * Reads scroll position inside a rAF so the listener itself stays passive and
 * never blocks the scroll thread.
 */
export function useScrollDirection(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    isScrolled: false,
    isHidden: false,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;

      if (Math.abs(delta) < DIRECTION_THRESHOLD) {
        setState((prev) =>
          prev.isScrolled === y > SOLID_AFTER
            ? prev
            : { ...prev, isScrolled: y > SOLID_AFTER },
        );
        return;
      }

      // Never hide while near the top — there is nothing to reclaim there.
      const isHidden = delta > 0 && y > SOLID_AFTER;
      lastY = y;

      setState((prev) =>
        prev.isScrolled === y > SOLID_AFTER && prev.isHidden === isHidden
          ? prev
          : { isScrolled: y > SOLID_AFTER, isHidden },
      );
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return state;
}
