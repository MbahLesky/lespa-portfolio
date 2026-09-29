"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A lightweight, accessible wrapper that introduces a subtle Tailwind-powered
 * fade-and-slide reveal as each section scrolls into the viewport.
 *
 * Characteristics:
 * - Triggers once to avoid distracting resets when scrolling back up.
 * - Hardware-accelerated GPU transitions (opacity and translate-y).
 * - Honors prefers-reduced-motion with instant, zero-offset presentation.
 */
export function RevealSection({
  children,
  className = "",
  threshold = 0.1,
  rootMargin = "0px 0px -10% 0px",
  delay = 0,
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      const timer = window.setTimeout(() => {
        setIsVisible(true);
      }, 0);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [reducedMotion, rootMargin, threshold]);

  const show = reducedMotion || isVisible;

  return (
    <div
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-all duration-700 ease-out will-change-[opacity,transform] ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}
