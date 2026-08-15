"use client";

import { useEffect, useState } from "react";

import { SETTLING_ATTR } from "@/lib/motion";

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

      // Never hide while near the top — there is nothing to reclaim there, and
      // never on a scroll the page made for the visitor: a correction that
      // moves down a few dozen pixels is not them scrolling away, and treating
      // it as such let an upward flick reveal the bar and lose it again in the
      // same gesture. See SETTLING_ATTR.
      const settling = document.documentElement.hasAttribute(SETTLING_ATTR);
      const scrolled = y > SOLID_AFTER;
      const goingDown = delta > 0 && scrolled;
      lastY = y;

      setState((prev) => {
        const isHidden = settling ? prev.isHidden : goingDown;
        return prev.isScrolled === scrolled && prev.isHidden === isHidden
          ? prev
          : { isScrolled: scrolled, isHidden };
      });
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
