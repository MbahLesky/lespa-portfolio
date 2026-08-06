"use client";

import { useEffect } from "react";

/**
 * Cross-section colour transition.
 *
 * The flat and raised surfaces sit only a shade apart, and cutting between them
 * on every section boundary reads as a seam. Instead the page canvas itself
 * carries the colour and interpolates over 600ms, so the scroll feels like one
 * continuous surface that shifts rather than a stack of panels.
 *
 * Progressive enhancement: the neutral sections only give up their own
 * background once this has mounted and set `tint-active`. Without JavaScript
 * they keep painting themselves and nothing changes.
 *
 * Gradient, brand, and warm sections are opaque and paint over the canvas —
 * a gradient cannot be interpolated this way. They still register their
 * nearest neutral so the transition back out is smooth.
 */
export function SectionTint() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-tint]"),
    );
    if (!sections.length) return;

    root.classList.add("tint-active");

    const apply = (tint: string) => {
      root.style.setProperty(
        "--page-tint",
        tint === "raised" ? "var(--surface)" : "var(--background)",
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) apply((visible.target as HTMLElement).dataset.tint ?? "flat");
      },
      { threshold: [0.1, 0.5, 0.9] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      root.classList.remove("tint-active");
      root.style.removeProperty("--page-tint");
    };
  }, []);

  return null;
}
