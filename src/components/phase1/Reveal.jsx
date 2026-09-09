"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The scroll-in every section gets: a short rise and fade as it enters the
 * viewport, once.
 *
 * `once` matters. A reveal that replays every time a section passes the fold
 * turns scrolling back up into a slideshow, and the structure doc asks for
 * subtle. Reduced motion drops the movement and the fade entirely rather than
 * shortening them — a fast animation is still an animation.
 */
export function Reveal({ as = "div", delay = 0, className, children, ...rest }) {
  const reduced = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
