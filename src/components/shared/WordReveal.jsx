"use client";

import { Fragment, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Fades a line in, each part lifting from just below its resting position.
 *
 * Two rhythms, chosen with `groups`:
 *
 * - Without it, one word at a time.
 * - With it, a phrase at a time — every word in a phrase shares one delay, so the
 *   phrase arrives as a unit. Better for a long line, where word-by-word at a
 *   readable stagger takes too long to finish.
 *
 * Either way the animated unit is still the individual word, never the phrase.
 * A phrase wrapped in one inline-block could not break across lines and would
 * overflow a narrow screen; separate words wrap normally and, sharing a delay,
 * are indistinguishable from a single phrase arriving.
 *
 * `groups` must join back to `text` exactly. If it does not, the grouping is
 * ignored and the line falls back to word-by-word — the copy is always rendered
 * from `text`, so a bad grouping can never drop or alter a word.
 *
 * The whole string stays available to assistive tech via the wrapper's
 * aria-label; the animated words are hidden from it, so a screen reader gets the
 * sentence once, intact.
 */
export function WordReveal({
  text,
  groups,
  active = true,
  stagger = 0.045,
  duration = 0.42,
  startDelay = 0,
  onDone,
  className = "",
}) {
  const reducedMotion = useReducedMotion();

  // Each word, paired with the step it animates on. Words sharing a step appear
  // together.
  const words = useMemo(() => {
    const grouped = Array.isArray(groups) && groups.length > 0;
    const matches = grouped && groups.join(" ") === text;

    if (grouped && !matches && process.env.NODE_ENV !== "production") {
      console.warn(
        "WordReveal: `groups` does not join back to `text`, so the grouping was " +
          "ignored. Check the spaces and punctuation in the group list.",
      );
    }

    if (!matches) {
      return text.split(" ").map((word, index) => ({ word, step: index }));
    }

    return groups.flatMap((phrase, step) =>
      phrase.split(" ").map((word) => ({ word, step })),
    );
  }, [groups, text]);

  // Reduced motion shows the finished line, but the caller still needs to know
  // the line has landed — whatever follows it is waiting on that signal.
  useEffect(() => {
    if (reducedMotion && active) onDone?.();
    // onDone is a stable setter from the parent's sequence.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reducedMotion]);

  if (reducedMotion) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p className={className} aria-label={text}>
      {words.map(({ word, step }, index) => (
        <Fragment key={`${word}-${index}`}>
          <motion.span
            aria-hidden="true"
            className="inline-block"
            initial={{ opacity: 0, y: 10 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration,
              delay: active ? startDelay + step * stagger : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
            // The last word settling is the signal that the line has landed.
            onAnimationComplete={
              index === words.length - 1 && active ? onDone : undefined
            }
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}
