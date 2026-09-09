"use client";

import { useEffect, useState } from "react";

/**
 * Types a run of lines out, once, in order, and then stops.
 *
 * Typed once and never cycled — the structure doc is explicit that the role
 * statement does not loop or toggle between variants. There is no erase pass
 * and no second state to swap to.
 *
 * The untyped remainder of each line stays in the DOM at visibility:hidden
 * rather than being removed, so every line already occupies its final box. The
 * heading wraps exactly as it finally will and nothing below it moves while
 * the text grows — appending character by character instead reflows the page on
 * every keystroke.
 *
 * Decorative. The finished sentences are also rendered as ordinary text for
 * assistive technology, so nothing depends on this running: with reduced motion
 * or without JavaScript the lines are simply there.
 */
export function Typewriter({ lines, speed = 55, startDelay = 0, onDone, as: Tag = "span" }) {
  const [counts, setCounts] = useState(() => lines.map(() => 0));
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setCounts(lines.map((line) => line.length));
      setDone(true);
      onDone?.();
      return;
    }

    let cancelled = false;
    const timers = [];
    let at = startDelay;

    lines.forEach((line, index) => {
      for (let i = 1; i <= line.length; i++) {
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            setCounts((current) => {
              const next = [...current];
              next[index] = i;
              return next;
            });
          }, at + i * speed),
        );
      }
      at += line.length * speed;
      // A beat between lines, so two typed sentences do not read as one.
      at += 240;
    });

    timers.push(
      setTimeout(() => {
        if (cancelled) return;
        setDone(true);
        onDone?.();
      }, at),
    );

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // Lines are static content; re-running on a new callback identity would
    // restart the whole sequence.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag aria-hidden="true">
      {lines.map((line, index) => {
        const shown = counts[index];
        const typing = !done && shown > 0 && shown < line.length;
        return (
          <span key={line} className="type-line">
            {line.slice(0, shown)}
            {typing && <span className="caret" />}
            {shown < line.length && (
              <span className="type-rest">{line.slice(shown)}</span>
            )}
          </span>
        );
      })}
    </Tag>
  );
}
