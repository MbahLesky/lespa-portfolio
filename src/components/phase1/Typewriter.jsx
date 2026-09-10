"use client";

import { useEffect, useState } from "react";

/**
 * Types a run of lines out, once, in order, and then stops.
 *
 * Typed once and never cycled — the structure doc is explicit that the role
 * statement does not loop or toggle between variants. There is no erase pass
 * and no second state to swap to.
 *
 * Each line is drawn twice: the finished sentence, invisible, holding its final
 * box open, and the typed characters laid over it. So the heading wraps exactly
 * as it finally will, nothing below it moves while the text grows, and the text
 * stays centred rather than creeping out from the left edge of that box.
 * Appending character by character into the flow instead reflows the page on
 * every keystroke.
 *
 * Decorative. The finished sentences are also rendered as ordinary text for
 * assistive technology, so nothing depends on this running: with reduced motion
 * or without JavaScript the lines are simply there.
 */
export function Typewriter({
  lines,
  speed = 55,
  startDelay = 0,
  start = true,
  onDone,
  as: Tag = "span",
}) {
  const [counts, setCounts] = useState(() => lines.map(() => 0));
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Held until the run before this one finishes. The element is mounted the
    // whole time regardless, so its final box is already reserved and nothing
    // shifts when the typing does start.
    if (!start) return;

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
  }, [start]);

  return (
    <Tag aria-hidden="true">
      {lines.map((line, index) => {
        const shown = counts[index];
        const typing = !done && shown > 0 && shown < line.length;
        return (
          <span key={line} className="type-line">
            {/* The finished line, invisible, holding the box open. */}
            <span className="type-sizer">{line}</span>
            {/* The typed text sits on top of that box rather than inside its
                flow, so it stays centred as it grows instead of creeping out
                from the left edge of the space its finished self will fill. */}
            <span className="type-shown">
              {line.slice(0, shown)}
              {typing && <span className="caret" />}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
