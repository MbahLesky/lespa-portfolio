"use client";

import { Fragment, useEffect } from "react";
import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Fades a line in word by word, each word lifting from just below its resting
 * position.
 *
 * Quick and tightly staggered, so it reads as one sentence arriving rather than
 * as individual words being counted out — the point is to make the line easy to
 * read, not to make the animation the subject.
 *
 * Words are offset rather than clipped: a clipping wrapper shifts the inline
 * baseline and breaks apart on a line wrap, and this line wraps on small screens.
 *
 * The whole string stays available to assistive tech via the wrapper's aria-label;
 * the animated words are hidden from it, so a screen reader gets the sentence
 * once, intact.
 */
export function WordReveal({
  text,
  active = true,
  stagger = 0.045,
  duration = 0.42,
  startDelay = 0,
  onDone,
  className = "",
}) {
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");

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
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <motion.span
            aria-hidden="true"
            className="inline-block"
            initial={{ opacity: 0, y: 10 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              duration,
              delay: active ? startDelay + index * stagger : 0,
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
