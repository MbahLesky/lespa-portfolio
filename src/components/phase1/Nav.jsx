"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

import { Wordmark } from "@/components/phase1/Wordmark";
import { nav } from "@/content/phase1";

/**
 * Anchor nav with a scroll-progress indicator, per the Monilog pattern.
 *
 * It animates in last, with the hero's calls to action — `ready` is raised by
 * the hero once its sequence has finished, so nothing here appears while the
 * headline is still typing.
 *
 * The current link follows whichever section fills most of the viewport. The
 * observer is the one place that knows, so the bar cannot disagree with the
 * page about where the reader is.
 */
export function Nav({ ready }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const targets = nav
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The section covering the most of the viewport wins, so passing a
        // short section does not steal the marker from a long one.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.15, 0.5, 0.75] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className="nav"
      // Both states are declared and reduced motion is a zero-length
      // transition, not an absent one — see the note in Hero.jsx.
      initial={{ opacity: 0, y: -12 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
      transition={{ duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-8 px-6">
        <a href="#hero" className="nav-mark" aria-label="Lespa — back to top">
          <Wordmark height={24} />
        </a>

        <nav aria-label="Sections">
          <ul className="flex items-center gap-6">
            {nav.map((item) => (
              <li key={item.id} className="hidden sm:block">
                <a
                  href={`#${item.id}`}
                  className="nav-link"
                  aria-current={active === item.id ? "location" : undefined}
                  data-active={active === item.id ? "true" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Position, not a control — hidden from assistive technology, which is
          already told where it is by the current link above. */}
      <motion.div
        className="nav-progress"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
    </motion.header>
  );
}
