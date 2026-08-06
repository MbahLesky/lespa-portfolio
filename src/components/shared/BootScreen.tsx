"use client";

import { useEffect, useState } from "react";

import { Wordmark } from "@/components/shared/Wordmark";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SESSION_KEY = "lespa:booted";
/** Under this and the screen is pure theatre, so it never appears. */
const SKIP_UNDER_MS = 400;
/** Hard ceiling. Content is never held behind this. */
const MAX_MS = 800;

/**
 * First-visit loading transition: the wordmark on the dark background.
 *
 * Shows once per session, never again. Skipped entirely when the page is
 * already loaded in under 400ms — a loading screen for a site that has already
 * loaded is theatre — and skipped under reduced motion.
 *
 * Rendered above the content rather than in place of it, so nothing is ever
 * gated behind this component.
 */
export function BootScreen() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let seen = true;
    try {
      seen = window.sessionStorage.getItem(SESSION_KEY) === "1";
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Storage blocked: treat it as already seen rather than showing it on
      // every navigation.
    }
    if (seen) return;

    // How long the document actually took. If it was quick, show nothing.
    const elapsed = performance.now();
    if (elapsed < SKIP_UNDER_MS && document.readyState === "complete") return;

    setVisible(true);

    const remaining = Math.max(0, MAX_MS - elapsed);
    const hold = setTimeout(() => setLeaving(true), remaining);
    const clear = setTimeout(() => setVisible(false), remaining + 250);

    return () => {
      clearTimeout(hold);
      clearTimeout(clear);
    };
  }, [prefersReducedMotion]);

  if (!visible) return null;

  return (
    <div className="boot" data-leaving={leaving ? "true" : undefined} aria-hidden="true">
      <Wordmark height={40} forceDark />
    </div>
  );
}
