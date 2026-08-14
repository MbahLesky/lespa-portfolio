"use client";

import { useEffect, useState } from "react";

import { scrollCue } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface ScrollCueProps {
  /** The id of the section it scrolls to, without the hash. */
  target: string;
  /** The word on the button. */
  label: string;
  /**
   * The accessible name. Says where the button goes, which the single visible
   * word cannot — and contains that word, so voice control still matches it.
   */
  description: string;
}

/**
 * A quiet invitation to scroll, floating below the hero.
 *
 * It appears only after the hero has been sitting still for a few seconds —
 * long enough to mean "there is more below" rather than "hurry up" — and
 * retires the moment the visitor scrolls at all, since by then it has either
 * worked or is no longer needed. It never comes back.
 *
 * A real button, not a decoration: it is in the tab order, it is 44px, and it
 * scrolls to the same place the nav does. Scrolling is smooth unless the
 * visitor has asked for less motion, and the bob is dropped entirely then.
 */
export function ScrollCue({ target, label, description }: ScrollCueProps) {
  const prefersReducedMotion = useReducedMotion();
  const [shown, setShown] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Anything the visitor does themselves makes the hint redundant.
    const retire = () => setDismissed(true);
    const timer = setTimeout(() => setShown(true), scrollCue.appearAfterMs);
    window.addEventListener("scroll", retire, { once: true, passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", retire);
    };
  }, [dismissed]);

  const go = () => {
    setDismissed(true);
    document.getElementById(target)?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <button
      type="button"
      onClick={go}
      aria-label={description}
      // Hidden from everything, not just from view, once it is not offered:
      // a button nobody can see must not still be reachable by keyboard.
      hidden={!shown || dismissed}
      className={cn("scroll-cue", shown && !dismissed && "is-shown")}
    >
      <span className="scroll-cue-label">{label}</span>
      <span className="scroll-cue-arrow" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
          <path
            d="M8 3v10M3.5 8.5 8 13l4.5-4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
