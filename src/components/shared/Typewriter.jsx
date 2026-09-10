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
 * `text` is either a plain string or an array of segments — `{ text, keyword }`.
 * Segments type as one continuous line but hold for `segmentPause` at each join,
 * which is what lets "Hi," land before " I am Lespa" follows: a reading beat
 * rather than one flat run of characters. A segment marked `keyword` is the
 * standout phrase in the line, and gets its own colour and hover once typed.
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
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  const { segments, length, pauseAt } = useMemo(() => {
    const list = (Array.isArray(text) ? text : [{ text }]).map((segment) =>
      typeof segment === "string" ? { text: segment } : segment,
    );

    // Character counts at which a segment ends — the points that hold.
    const stops = new Set();
    let total = 0;
    list.forEach((segment, index) => {
      total += segment.text.length;
      if (index < list.length - 1) stops.add(total);
    });

    return { segments: list, length: total, pauseAt: stops };
  }, [text]);

  useEffect(() => {
    if (!active) return;

    // Reduced motion gets the finished line with no animation at all.
    if (reducedMotion) {
      setCount(length);
      setDone(true);
      onDone?.();
      return;
    }

    let timer;
    let typed = 0;

    const tick = () => {
      typed += 1;
      setCount(typed);

      if (typed >= length) {
        setDone(true);
        onDone?.();
        return;
      }

      timer = window.setTimeout(tick, pauseAt.has(typed) ? segmentPause : speed);
    };

    timer = window.setTimeout(tick, startDelay);
    return () => window.clearTimeout(timer);
    // onDone is a stable setter from the parent's sequence reducer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, length, pauseAt, reducedMotion, segmentPause, speed, startDelay]);

  // Each segment renders only the part of itself that has been typed, so a
  // keyword starts taking its colour as it appears rather than after the fact.
  let consumed = 0;

  return (
    <span className={className} aria-hidden="true">
      {segments.map((segment, index) => {
        const visible = segment.text.slice(0, Math.max(0, count - consumed));
        consumed += segment.text.length;

        if (!visible) return null;

        return segment.keyword ? (
          <em key={index} className="emphasis-keyword not-italic">
            {visible}
          </em>
        ) : (
          <span key={index}>{visible}</span>
        );
      })}
      {active && !done ? <span className="type-caret animate-caret-blink" /> : null}
    </span>
  );
}
