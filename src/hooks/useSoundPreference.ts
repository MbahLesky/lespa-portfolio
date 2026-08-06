"use client";

import { useCallback, useEffect, useState } from "react";

import { useReducedMotion } from "./useReducedMotion";

const STORAGE_KEY = "lespa:sound";

/**
 * The sound on/off preference behind the nav and footer toggles.
 *
 * Playback itself is a separate concern; this hook owns only the question of
 * whether sound is permitted, because that answer decides whether the toggle
 * renders at all.
 *
 * Rules, all non-negotiable:
 *   · Default OFF on first visit, always.
 *   · The choice persists, so nobody is asked twice.
 *   · Unavailable on touch devices — people browse in public.
 *   · Unavailable under prefers-reduced-motion, read as a request for reduced
 *     sensory load generally.
 */
export function useSoundPreference() {
  const prefersReducedMotion = useReducedMotion();
  const [isAvailable, setIsAvailable] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    setIsAvailable(!isTouch);

    if (isTouch) return;

    try {
      setEnabled(window.localStorage.getItem(STORAGE_KEY) === "on");
    } catch {
      // Private mode or blocked storage: stay off, which is the safe default.
    }
  }, []);

  const toggle = useCallback(() => {
    setEnabled((previous) => {
      const next = !previous;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      } catch {
        // Preference simply won't survive the session. Not worth surfacing.
      }
      return next;
    });
  }, []);

  return {
    /** False on touch and under reduced motion — hide the toggle entirely. */
    isAvailable: isAvailable && !prefersReducedMotion,
    enabled: enabled && isAvailable && !prefersReducedMotion,
    toggle,
  };
}
