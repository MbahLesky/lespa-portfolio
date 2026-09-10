"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { Typewriter } from "@/components/shared/Typewriter";
import { WordReveal } from "@/components/shared/WordReveal";
import { hero } from "@/content/copy";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Hero.
 *
 * Sequence, per the structure doc: headline types in → role statement types in
 * → subtext moves in (slide/fade, not typed) → CTAs and nav animate in last.
 * Each line is typed exactly once; nothing loops and nothing toggles between
 * variants. The roles themselves are the keywords of the sentence, so they type
 * in the accent colour and carry a hover.
 *
 * Centred, not left-aligned.
 *
 * Background is the dark neutral gradient, painted page-wide on <body>, with two
 * blended fragments at the sides — design on the left, code on the right,
 * mirroring the split the copy makes. Blended, not cards: no border, no shadow.
 *
 * NOTE — this departs from the assets doc (§1, "Background is a CSS gradient …
 * not an image"), on Lespa's instruction to carry the same split composition the
 * About section uses up into the hero. The structure doc's BACKGROUND IMAGERY
 * RULE, which lists Hero among the blended-imagery sections, agrees with this.
 */

/** Named stages, so the order of the sequence is readable. */
const STAGE = {
  HEADLINE: 0,
  ROLE_ONE: 1,
  ROLE_TWO: 2,
  SUBTEXT: 3,
  ACTIONS: 4,
};

/**
 * ── Hero timing. Tune the sequence here. ──────────────────────────────────────
 *
 * READING_PAUSE is the one to change for "give me longer before the buttons
 * appear": it is the gap, in milliseconds, between the subtext's last word
 * settling and the CTAs plus the nav arriving. Raise it to hold the hero on the
 * sentence for longer; lower it to get to the buttons sooner.
 *
 * The other two shape the subtext's own reveal. It arrives a phrase at a time —
 * the phrases are `hero.subtextPhrases` in src/content/copy.js, and regrouping
 * them there changes the rhythm without touching this file. SUBTEXT_STAGGER is
 * the gap between one phrase and the next, and SUBTEXT_DURATION is how long a
 * single phrase takes to fade up. Both in seconds, because that is what Framer
 * Motion takes.
 *
 * Five phrases at 0.2s apart is ~1s to land the line. The same stagger applied
 * word by word would take nearly four.
 */
const READING_PAUSE = 1400;
const SUBTEXT_STAGGER = 0.2;
const SUBTEXT_DURATION = 0.5;

export function Hero({ onIntroComplete }) {
  const reducedMotion = useReducedMotion();
  const [stage, setStage] = useState(STAGE.HEADLINE);
  const [subtextSettled, setSubtextSettled] = useState(false);

  const advanceTo = useCallback(
    (next) => {
      setStage((current) => (current >= next ? current : next));
      if (next === STAGE.ACTIONS) onIntroComplete?.();
    },
    [onIntroComplete],
  );

  // The subtext gets the stage to itself for a beat. Only then do the CTAs and
  // the nav arrive, so the reader is not handed buttons mid-sentence.
  useEffect(() => {
    if (!subtextSettled) return;

    const timer = window.setTimeout(() => advanceTo(STAGE.ACTIONS), READING_PAUSE);
    return () => window.clearTimeout(timer);
  }, [advanceTo, subtextSettled]);

  const moveIn = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <section
      id="hero"
      className="snap-section relative flex min-h-screen items-center overflow-hidden"
    >
      <SplitBackdrop />
      <div className="relative mx-auto flex w-full max-w-content flex-col items-center px-6 pb-24 pt-30 text-center md:px-8">
        {/* The full lines live in aria-label; the typed characters are hidden from
            assistive tech so nothing is read out half-finished. */}
        <h1
          className="flex flex-col items-center text-h1 text-content md:text-h1"
          aria-label={hero.headline}
        >
          <Typewriter
            text={hero.headlineSegments}
            active
            speed={58}
            segmentPause={460}
            onDone={() => advanceTo(STAGE.ROLE_ONE)}
          />
        </h1>

        <p
          className="mt-6 flex flex-col items-center gap-1 text-h3-m text-content-secondary md:text-h4"
          aria-label={hero.roleLines.join(" ")}
        >
          {/* The beat before each line is the pause the reader needs to take
              the previous one in. */}
          <Typewriter
            text={hero.roleSegments[0]}
            active={stage >= STAGE.ROLE_ONE}
            startDelay={520}
            onDone={() => advanceTo(STAGE.ROLE_TWO)}
          />
          <Typewriter
            text={hero.roleSegments[1]}
            active={stage >= STAGE.ROLE_TWO}
            startDelay={420}
            onDone={() => advanceTo(STAGE.SUBTEXT)}
          />
        </p>

        {/* Holds a beat after the last role line lands, then arrives a phrase at
            a time, each lifting from just below — not typed. The CTAs and nav
            wait out READING_PAUSE after its last phrase settles.

            Drop the `groups` line to go back to one word at a time. */}
        <WordReveal
          text={hero.subtext}
          groups={hero.subtextPhrases}
          active={stage >= STAGE.SUBTEXT}
          startDelay={0.5}
          stagger={SUBTEXT_STAGGER}
          duration={SUBTEXT_DURATION}
          onDone={() => setSubtextSettled(true)}
          className="mt-8 max-w-reading text-balance text-body-lg text-content-secondary"
        />

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

/**
 * The hero's blended split: design on the left, code on the right, mirroring the
 * two roles the copy names and echoing the same composition the About section
 * uses.
 *
 * Both fragments are real Lespa work. They are faded hard and masked towards the
 * centre so the centred text always has clear ground under it, and they carry no
 * frame of any kind — they are the background, not images placed on it. Narrower
 * and fainter below lg, where the text reaches closer to the edges.
 *
 * TODO: asset needed — assets doc §6 names the split composition for About only;
 * the hero now uses the same treatment. A dedicated pair — a real code fragment
 * rather than a built UI on the right — would be better than these stand-ins.
 */
function SplitBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="mask-fade-r absolute inset-y-0 left-0 w-2/5 opacity-5 lg:w-1/3 lg:opacity-10">
        <Image
          src="/homepage_project_cards/diwa_concepts.webp"
          alt=""
          fill
          sizes="40vw"
          priority
          className="object-cover"
        />
      </div>
      <div className="mask-fade-l absolute inset-y-0 right-0 w-2/5 opacity-5 lg:w-1/3 lg:opacity-10">
        <Image
          src="/monilog_case_study_images/web_dashboard.webp"
          alt=""
          fill
          sizes="40vw"
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}
