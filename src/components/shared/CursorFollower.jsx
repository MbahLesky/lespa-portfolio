"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { useFinePointer } from "@/hooks/useFinePointer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Cursor-follow effect (Ewan Kerboas reference). Mounted at the top of the page
 * so it starts at the hero and persists for everything below it.
 *
 * A ring that trails the pointer with a spring, drawn in the brand accent. Pure
 * CSS — the optional custom cursor graphic in the assets doc (§1) is not needed
 * for this shape, so nothing is loaded for it.
 *
 * Absent for touch pointers (no cursor to follow) and for reduced motion.
 */
const RING = 32;

export function CursorFollower() {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();

  const x = useMotionValue(-RING);
  const y = useMotionValue(-RING);
  const springX = useSpring(x, { stiffness: 240, damping: 28, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 240, damping: 28, mass: 0.45 });

  const enabled = finePointer && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event) => {
      x.set(event.clientX - RING / 2);
      y.set(event.clientY - RING / 2);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 h-8 w-8 rounded-full border border-accent-soft bg-accent-faint mix-blend-screen"
      style={{ x: springX, y: springY }}
    />
  );
}
