"use client";

import { useEffect, useState } from "react";

/**
 * Which of the given sections currently fills most of the viewport.
 *
 * Returns "" when none of them is on the page at all, so a page that has none
 * marks nothing as current rather than falsely claiming the first.
 *
 * Pass a stable `ids` array — a literal built inside a render would restart the
 * observer on every pass.
 */
export function useActiveSection(ids: readonly string[], enabled = true) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!enabled) return;

    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The section covering the most of the viewport wins, so passing a
        // short section does not steal the marker from a long one.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.15, 0.5, 0.75] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [ids, enabled]);

  // Derived rather than cleared: on a page with none of these sections there is
  // nothing current, and stale state from a previous page must not show through.
  return enabled ? active : "";
}
