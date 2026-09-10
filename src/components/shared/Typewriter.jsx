"use client";

import { useEffect, useMemo, useState } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Types a line out once, then reports done.
 *
 * Typed once — never looping, and never toggling between variants. The hero
 * chains several of these by passing `active` only once the previous line has
 * called `onDone`, which is what produces the headline → role → subtext order.
 *
 * `text` may be a string or an array of segments. Segments type as one continuous
 * line but hold for `segmentPause` at each join, which is what lets "Hi," land
 * before " I am Lespa" follows — a reading beat rather than one flat run of
 * characters.
 *
 * The finished line is exposed to assistive tech via the parent's aria-label; the
 * animated characters are hidden from it so a screen reader is never read a
 * half-typed sentence.
 */
export function Typewriter({
  text,
  active = true,
  speed = 48,
  startDelay = 0,
  segmentPause = 420,
  onDone,
  className = "",
}) {
  const reducedMotion = useReducedMotion();
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  const { full, pauseAt } = useMemo(() => {
    const segments = Array.isArray(text) ? text : [text];

    // Character counts at which a segment ends — the points that hold.
    const stops = new Set();
    let count = 0;
    for (let index = 0; index < segments.length - 1; index += 1) {
      count += segments[index].length;
      stops.add(count);
    }

    return { full: segments.join(""), pauseAt: stops };
  }, [text]);

  useEffect(() => {
    if (!active) return;

    // Reduced motion gets the finished line with no animation at all.
    if (reducedMotion) {
      setTyped(full);
      setDone(true);
      onDone?.();
      return;
    }

    let timer;
    let index = 0;

    const tick = () => {
      index += 1;
      setTyped(full.slice(0, index));

      if (index >= full.length) {
        setDone(true);
        onDone?.();
        return;
      }

      timer = window.setTimeout(tick, pauseAt.has(index) ? segmentPause : speed);
    };

    timer = window.setTimeout(tick, startDelay);
    return () => window.clearTimeout(timer);
    // onDone is a stable setter from the parent's sequence reducer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, full, pauseAt, reducedMotion, segmentPause, speed, startDelay]);

  return (
    <span className={className} aria-hidden="true">
      {typed}
      {active && !done ? <span className="type-caret animate-caret-blink" /> : null}
    </span>
  );
}
