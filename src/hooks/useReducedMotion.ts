"use client";

import { useEffect, useState } from "react";

/**
 * Tracks prefers-reduced-motion.
 *
 * Returns false during SSR and the first client render so markup matches, then
 * settles to the real value. Callers must treat "false" as "not yet known" and
 * avoid starting long-running animations before mount.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
