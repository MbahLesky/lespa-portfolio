"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { Typewriter } from "@/components/shared/Typewriter";
import { hero } from "@/content/copy";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Hero.
 *
 * Sequence, per the structure doc: headline types in → role statement types in
 * → subtext moves in (slide/fade, not typed) → CTAs and nav animate in last.
 * Each line is typed exactly once; nothing loops and nothing toggles between
 * variants.
 *
 * Centred, not left-aligned.
 *
 * Background is the dark neutral gradient (#0E1110 → #141A17) with no image.
 *
 * FLAG — conflict between source documents: the structure doc's Hero section and
 * the assets doc (§1, "Background is a CSS gradient … not an image") both
 * specify gradient only, while the structure doc's BACKGROUND IMAGERY RULE lists
 * Hero among the sections using the abstract SVG pattern. Built gradient-only
 * here, matching the two specific statements; resolve in the docs if the pattern
 * is wanted.
 */

/** Named stages, so the order of the sequence is readable. */
const STAGE = {
  HEADLINE: 0,
  ROLE_ONE: 1,
  ROLE_TWO: 2,
  SUBTEXT: 3,
  ACTIONS: 4,
};

export function Hero({ onIntroComplete }) {
  const reducedMotion = useReducedMotion();
  const [stage, setStage] = useState(STAGE.HEADLINE);

  const advanceTo = useCallback(
    (next) => {
      setStage((current) => (current >= next ? current : next));
      if (next === STAGE.ACTIONS) onIntroComplete?.();
    },
    [onIntroComplete],
  );

  const moveIn = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-dark-surface"
    >
      <div className="relative mx-auto flex w-full max-w-content flex-col items-center px-6 pb-24 pt-30 text-center md:px-8">
        {/* The full lines live in aria-label; the typed characters are hidden from
            assistive tech so nothing is read out half-finished. */}
        <h1
          className="flex flex-col items-center text-h1-m text-content md:text-h1"
          aria-label={hero.headline}
        >
          <Typewriter
            text={hero.headline}
            active
            onDone={() => advanceTo(STAGE.ROLE_ONE)}
          />
        </h1>

        <p
          className="mt-6 flex flex-col items-center gap-1 text-h4-m text-content md:text-h4"
          aria-label={hero.roleLines.join(" ")}
        >
          <Typewriter
            text={hero.roleLines[0]}
            active={stage >= STAGE.ROLE_ONE}
            onDone={() => advanceTo(STAGE.ROLE_TWO)}
          />
          <Typewriter
            text={hero.roleLines[1]}
            active={stage >= STAGE.ROLE_TWO}
            onDone={() => advanceTo(STAGE.SUBTEXT)}
          />
        </p>

        <motion.p
          {...moveIn}
          animate={
            stage >= STAGE.SUBTEXT ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
          }
          onAnimationComplete={() => {
            if (stage >= STAGE.SUBTEXT) advanceTo(STAGE.ACTIONS);
          }}
          className="mt-8 max-w-reading text-balance text-body-lg text-content-secondary"
        >
          {hero.subtext}
        </motion.p>

        <motion.div
          {...moveIn}
          animate={
            stage >= STAGE.ACTIONS ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
          }
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={hero.ctas.primary.href}
            className="inline-flex items-center gap-2 rounded-md bg-action px-8 py-4 text-body-sm uppercase tracking-label text-action-fg transition-colors duration-fast hover:bg-action-hover"
          >
            {hero.ctas.primary.label}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={hero.ctas.secondary.href}
            className="inline-flex items-center gap-2 rounded-md border border-border-strong px-8 py-4 text-body-sm uppercase tracking-label text-content transition-colors duration-fast hover:border-accent hover:text-accent"
          >
            {hero.ctas.secondary.label}
          </a>
        </motion.div>
      </div>

      <motion.div
        {...moveIn}
        animate={stage >= STAGE.ACTIONS ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        className="pointer-events-none absolute inset-x-0 bottom-12 flex justify-center"
        aria-hidden="true"
      >
        <ArrowDown className="h-4 w-4 animate-pulse-down text-content-secondary" />
      </motion.div>
    </section>
  );
}
