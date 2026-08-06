"use client";

import { useEffect, useState } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useReveal } from "@/hooks/useReveal";

/**
 * Counts a number up when it scrolls into view, over 800ms.
 *
 * Preserves any leading zero in the source ("01" counts to "01", not "1") so
 * the methodology numbering keeps its shape. Under reduced motion the final
 * value is simply printed.
 */
export function CountUp({ value }: { value: string }) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isVisible } = useReveal<HTMLSpanElement>({ threshold: 0.5 });
  const target = Number(value);
  const pad = value.length;

  const [display, setDisplay] = useState(prefersReducedMotion ? target : 0);

  useEffect(() => {
    if (prefersReducedMotion || !isVisible || !Number.isFinite(target)) {
      setDisplay(target);
      return;
    }

    let frame = 0;
    let start: number | undefined;

    const step = (now: number) => {
      start ??= now;
      const progress = Math.min((now - start) / 800, 1);
      // Ease-out so it decelerates into the final value.
      setDisplay(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, prefersReducedMotion, target]);

  if (!Number.isFinite(target)) return <span ref={ref}>{value}</span>;

  return <span ref={ref}>{String(display).padStart(pad, "0")}</span>;
}
