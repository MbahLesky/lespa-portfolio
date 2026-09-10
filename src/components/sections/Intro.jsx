import Image from "next/image";

import { EmphasizedText } from "@/components/shared/EmphasizedText";
import { PatternBackdrop } from "@/components/shared/PatternBackdrop";
import { Reveal } from "@/components/shared/Reveal";
import { intro } from "@/content/copy";

/**
 * Intro — the "design and code are one job" position, in three sentences.
 *
 * Blended throughout: the abstract pattern behind the section, and a real work
 * fragment on the right that fades into the page rather than sitting in a card.
 * No card, no border, no shadow (structure doc, BACKGROUND IMAGERY RULE).
 */
export function Intro() {
  return (
    <section id="intro" className="snap-section relative overflow-hidden py-24 md:py-30">
      <PatternBackdrop />

      <div className="relative mx-auto grid max-w-content items-center gap-12 px-6 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal>
          <p className="max-w-reading text-balance text-h5-m text-content md:text-h5">
            <EmphasizedText text={intro.body} emphasis={intro.emphasis} />
          </p>
        </Reveal>

        {/* Blended, not a card: masked and faded so it reads as part of the page.
            Hidden below lg, where it would crowd the copy rather than frame it. */}
        <Reveal className="relative hidden aspect-card lg:block" delay={0.15}>
          <div aria-hidden="true" className="mask-fade-l absolute inset-0 opacity-25">
            <Image
              src="/monilog_case_study_images/construction_diagram.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 480px, 0px"
              className="object-contain"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
