"use client";

import { useEffect, useRef, useState } from "react";

interface UseRevealOptions {
  /** Fraction of the element that must be visible before it fires. */
  threshold?: number;
  /** When false the element is treated as already revealed. */
  enabled?: boolean;
}

/**
 * Fires once when an element scrolls 15% into view.
 *
 * Never re-arms on scroll-up — re-animating on the way back is disorienting.
 * When disabled (reduced motion, no IntersectionObserver) it reports visible
 * immediately so content is never left hidden by a failed animation.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  enabled = true,
}: UseRevealOptions = {}) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, enabled]);

  return { ref, isVisible };
}
