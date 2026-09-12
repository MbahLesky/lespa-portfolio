"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { ChatExchange } from "@/components/shared/ChatExchange";
import { EmphasizedText } from "@/components/shared/EmphasizedText";
import { PatternBackdrop } from "@/components/shared/PatternBackdrop";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
// Aliased: `process` is also a Node global, and shadowing it in a module that
// the bundler may rewrite is a needless risk.
import { process as processCopy } from "@/content/copy";
import { useFinePointer } from "@/hooks/useFinePointer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Process — five steps, list on one side and the hovered step's detail on the
 * other (itssharl.ee/work reference). Each step reveals its own image alongside
 * the detail text (Brice Clain reference): the description leads, the image fills
 * the pane beneath it.
 *
 * Hover drives the selection on a precise pointer; tap and keyboard focus drive
 * it otherwise, and the detail renders inline beneath the tapped step on narrow
 * screens where there is no second column to put it in. Step one is selected at
 * rest so the pane is never empty.
 */

/**
 * One image per step, revealed with its detail text.
 *
 * TODO: asset needed — assets doc §5, "5 hover-reveal images, one per step". Real
 * project work stands in, chosen to match each step: a concept sheet for
 * research, an artboard for sketching, app-and-web together for the build, a
 * shipped landing page for the deploy. Reach Out uses the sample exchange rather
 * than an image, so its slot here is unused.
 */
const STEP_IMAGES = [
  "/monilog_case_study_images/phone_mockup.webp",
  "/homepage_project_cards/diwa_concepts.webp",
  "/homepage_project_cards/yisi_artboard.webp",
  "/monilog_case_study_images/mobile_with_web.webp",
  "/monilog_case_study_images/landing_page.webp",
];

export function Process() {
  const finePointer = useFinePointer();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = processCopy.steps[activeIndex];

  return (
    <section id="process" className="snap-section relative overflow-hidden py-24 md:py-30">
      <PatternBackdrop />

      <div className="relative mx-auto flex max-w-content flex-col gap-12 px-6 md:px-8">
        <SectionHeading label={processCopy.label} />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-16">
          <Reveal as="ol" className="flex flex-col">
            {processCopy.steps.map((step, index) => {
              const selected = index === activeIndex;

              return (
                <li key={step.title} className="border-b border-border last:border-b-0">
                  <button
                    type="button"
                    aria-current={selected}
                    onMouseEnter={() => finePointer && setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    className="flex w-full items-baseline gap-6 py-6 text-left transition-colors duration-slow"
                  >
                    <span
                      className={`text-caption tabular-nums tracking-eyebrow transition-colors duration-slow ${
                        selected ? "text-accent" : "text-content-secondary"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-heading text-h4-m transition-colors duration-slow md:text-h4 ${
                        selected ? "text-content" : "text-content-secondary"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>

                  {/* No second column below lg, so the detail opens in place. */}
                  <div className={`pb-6 lg:hidden ${selected ? "block" : "hidden"}`}>
                    <StepDetail
                      step={step}
                      image={STEP_IMAGES[index]}
                      exchange={index === 0 ? processCopy.reachOutExchange : null}
                    />
                  </div>
                </li>
              );
            })}
          </Reveal>

          <div className="hidden lg:sticky lg:top-24 lg:block">
            <StepDetail
              key={active.title}
              step={active}
              image={STEP_IMAGES[activeIndex]}
              exchange={activeIndex === 0 ? processCopy.reachOutExchange : null}
            />
          </div>
        </div>

        <Reveal>
          <p className="max-w-reading text-body-lg text-content-secondary">
            <EmphasizedText
              text={processCopy.closing.body}
              emphasis={processCopy.closing.emphasis}
            />
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * The hovered step's detail: the description first, then the image filling the
 * rest of the pane beneath it.
 *
 * Both move in rather than appearing — the text leads, the image follows a beat
 * later, so switching steps reads as a change rather than a flicker. The
 * component is keyed on the step at the call site, so changing step remounts it
 * and the entry animation replays.
 */
function StepDetail({ step, image, exchange }) {
  const reducedMotion = useReducedMotion();

  const enter = (delay) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <div className="flex flex-col gap-6">
      <motion.p {...enter(0)} className="text-body text-content-secondary">
        <EmphasizedText text={step.body} emphasis={step.emphasis} />
      </motion.p>

      {/* Reach Out shows the sample exchange in the slot the other steps give to
          an image — what reaching out actually looks like, rather than a picture
          of it. */}
      {exchange ? (
        <motion.div {...enter(0.1)}>
          <ChatExchange
            exchange={exchange}
            label={`A sample first exchange for the ${step.title} step.`}
          />
        </motion.div>
      ) : (
        // Fills the remaining width of the pane. Shorter on mobile, where the
        // detail sits inside the list and the pane is the full column.
        <motion.div
          {...enter(0.1)}
          className="glass relative aspect-video w-full overflow-hidden rounded-xl border border-border sm:aspect-card"
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover"
          />
        </motion.div>
      )}
    </div>
  );
}
