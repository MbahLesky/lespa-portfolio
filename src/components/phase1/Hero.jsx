"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Emphasis } from "@/components/phase1/Emphasis";
import { Typewriter } from "@/components/phase1/Typewriter";
import { hero } from "@/content/phase1";

/** Where the role statement starts, once the headline has finished. */
const ROLE_DELAY = 900;

const EASE = [0.16, 1, 0.3, 1];
const HIDDEN = { opacity: 0, y: 16 };
const SHOWN = { opacity: 1, y: 0 };

/**
 * The hero.
 *
 * Centred, on the dark gradient, with no image behind it — the asset list is
 * explicit that this section needs no new imagery.
 *
 * The order is the whole point: headline types, then the role statement types,
 * then the subtext moves in, and the calls to action come last. Each stage
 * waits for the one before rather than running on a guessed delay, so the
 * sequence holds however long the typing actually takes.
 *
 * Both states of every animated element are declared, and reduced motion is
 * expressed as a zero-length transition rather than as an absent one. That is
 * deliberate: useReducedMotion reports false on the first render and only
 * corrects after mount, so anything that decides *whether* to animate from it
 * ends up applying the hidden state and then never leaving it — measured as a
 * hero that stayed blank under reduced motion, with the nav never appearing.
 */
export function Hero({ onReady }) {
  const reduced = useReducedMotion();
  const [rolesDone, setRolesDone] = useState(false);

  return (
    <section
      id="hero"
      className="hero-surface relative flex min-h-screen items-center justify-center px-6 py-40 text-center"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8">
        <h1 id="hero-heading" className="hero-heading">
          {/* The plain sentences, for anything that does not watch them type. */}
          <span className="sr-only">
            {hero.headline}. {hero.roles.join(" ")}
          </span>

          <Typewriter lines={[hero.headline]} speed={70} as="span" />

          <span className="hero-roles">
            <Typewriter
              lines={hero.roles}
              speed={42}
              startDelay={ROLE_DELAY}
              onDone={() => setRolesDone(true)}
              as="span"
            />
          </span>
        </h1>

        {/* Moves in rather than typing — the copy doc calls this one out. */}
        <motion.p
          className="hero-subtext"
          initial={HIDDEN}
          animate={rolesDone ? SHOWN : HIDDEN}
          transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
        >
          <Emphasis text={hero.subtext} phrases={hero.subtextEmphasis} />
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={HIDDEN}
          animate={rolesDone ? SHOWN : HIDDEN}
          transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.24, ease: EASE }}
          onAnimationComplete={() => rolesDone && onReady?.()}
        >
          {hero.ctas.map((cta, index) => (
            <a
              key={cta.id}
              href={`#${cta.id}`}
              className={index === 0 ? "btn btn-primary" : "btn btn-secondary"}
            >
              {cta.label}
            </a>
          ))}
        </motion.div>
      </div>

      <motion.span
        aria-hidden="true"
        className="hero-rule"
        initial={{ opacity: 0 }}
        animate={{ opacity: rolesDone ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.4 }}
      />
    </section>
  );
}
