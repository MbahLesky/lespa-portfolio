"use client";

import { useEffect, useState } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Types a single line out once, then reports done.
 *
 * Typed once — never looping, and never toggling between variants. The hero
 * chains several of these by passing `active` only once the previous line has
 * called `onDone`, which is what produces the headline → role → subtext order.
 *
 * The line is exposed to assistive tech in full via the parent's aria-label; the
 * animated characters are hidden from it so a screen reader is not read a
 * half-typed sentence.
 */
export function Typewriter({
  text,
  active = true,
  speed = 55,
  startDelay = 0,
  onDone,
  className = "",
}) {
  const reducedMotion = useReducedMotion();
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;

    // Reduced motion gets the finished line with no animation at all.
    if (reducedMotion) {
      setTyped(text);
      setDone(true);
      onDone?.();
      return;
    }

    let interval;
    const start = window.setTimeout(() => {
      let index = 0;
      interval = window.setInterval(() => {
        index += 1;
        setTyped(text.slice(0, index));

        if (index >= text.length) {
          window.clearInterval(interval);
          setDone(true);
          onDone?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
    // onDone is a stable setter from the parent's sequence reducer.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reducedMotion, speed, startDelay, text]);

  return (
    <span className={className} aria-hidden="true">
      {typed}
      {active && !done ? (
        <span className="type-caret animate-caret-blink" />
      ) : null}
    </span>
  );
}
