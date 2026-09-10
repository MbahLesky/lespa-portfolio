"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Scroll-in reveal — every section gets one (structure doc, MOTION SPEC:
 * "subtle scroll-in reveal (move-in on entry)"). Moves in once and stays.
 */
export function Reveal({ children, as = "div", delay = 0, className = "" }) {
  const reducedMotion = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reducedMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
