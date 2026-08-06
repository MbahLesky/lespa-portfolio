"use client";

import { useEffect, useState } from "react";

/**
 * Whether the primary pointer can hover.
 *
 * Used to decide whether an interaction can rely on hover at all, or needs its
 * touch equivalent — every hover behaviour on this site has one.
 *
 * Returns false until mounted, so server output matches the first client render.
 */
export function useHoverCapable(): boolean {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    setCanHover(query.matches);

    const onChange = (event: MediaQueryListEvent) => setCanHover(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return canHover;
}
