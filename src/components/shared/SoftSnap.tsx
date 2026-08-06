"use client";

import { useEffect } from "react";

/**
 * Soft scroll snap for the homepage.
 *
 * `proximity` nudges toward alignment without trapping. `mandatory` hijacks the
 * wheel and is the single most complained-about scroll pattern on the web — it
 * is never used here.
 *
 * Applied from a component rather than in CSS because it belongs to one route,
 * and the document element is the scroll container.
 */
export function SoftSnap() {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollSnapType;
    root.style.scrollSnapType = "y proximity";
    return () => {
      root.style.scrollSnapType = previous;
    };
  }, []);

  return null;
}
