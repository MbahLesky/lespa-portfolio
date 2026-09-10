"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Whether the visitor has a precise pointer that can hover.
 *
 * The cursor-follow effect and the hover-to-reveal sections both need this: on a
 * touch screen there is no cursor to follow, and hover is a tap.
 */
export function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
