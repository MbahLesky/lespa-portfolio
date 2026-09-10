"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

/** Whether the visitor has asked for reduced motion. */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
