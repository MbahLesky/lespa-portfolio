import Image from "next/image";

import { EmphasizedText } from "@/components/shared/EmphasizedText";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { about } from "@/content/copy";

/**
 * About — a section, not a page, in Phase 1.
 *
 * Two background treatments meet here, and they are deliberately different:
 *
 * - The photo sits in a card (bordered, elevated). With the Selected Work images
 *   it is one of only two things on the page that look placed on top of it.
 * - Everything behind it is blended: a real wireframe fragment on one side and a
 *   real sketch fragment on the other, faded into the background with no card, no
 *   border and no shadow, mirroring the Designer/Developer split.
 */
export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-background py-24 md:py-30">
      <SplitBackdrop />

      <div className="relative mx-auto grid max-w-content gap-12 px-6 md:px-8 lg:grid-cols-[320px_1fr] lg:gap-16">
        <Reveal className="flex flex-col gap-8">
          {/* The photo is a card — the exception to the blended rule here. */}
          <figure className="overflow-hidden rounded-xl border border-border bg-surface p-2">
            {/* TODO: asset needed — assets doc §6, "Your photo (card-mounted, not
                blended) — professional". Using the existing portrait until the
                new one is shot. */}
            <div className="relative aspect-portrait overflow-hidden rounded-lg">
              <Image
                src="/global_assets/about-photo-dark.webp"
                alt="Mbah Lesky, known as Lespa."
                fill
                sizes="(min-width: 1024px) 320px, 100vw"
                className="object-cover"
              />
            </div>
          </figure>

          {/* Labelled chips, no descriptive copy — structure doc §6. */}
          {about.tools.map((group) => (
            <div key={group.heading} className="flex flex-col gap-4">
              <h3 className="text-caption uppercase tracking-eyebrow text-accent">
                {group.heading}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-sm border border-border px-4 py-1 text-caption text-content"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>

        <div className="flex flex-col gap-12">
          <SectionHeading label={about.label} />

          <Reveal className="flex max-w-reading flex-col gap-4">
            {about.bio.map((paragraph) => (
              <p key={paragraph.body} className="text-body text-content-secondary">
                <EmphasizedText text={paragraph.body} emphasis={paragraph.emphasis} />
              </p>
            ))}
          </Reveal>

          {/* Two short bullet lists, not prose — Adham Dannaway split structure. */}
          <Reveal className="grid gap-8 md:grid-cols-2">
            {about.roleSplit.map((role) => (
              <div key={role.heading} className="flex flex-col gap-4 border-t border-border pt-6">
                <h3 className="font-heading text-h5 text-content">{role.heading}</h3>
                <ul className="flex flex-col gap-2">
                  {role.items.map((item) => (
                    <li
                      key={item}
                      className="text-body text-content-secondary before:mr-2 before:text-accent before:content-['—']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>

          <Reveal>
            <p className="max-w-reading text-body text-content-secondary">
              <EmphasizedText
                text={about.offHours.body}
                emphasis={about.offHours.emphasis}
              />
            </p>
          </Reveal>

          {/* Its own distinct block, after the role-split lists. */}
          <Reveal className="flex flex-col gap-6 border-t border-border pt-8">
            <h3 className="font-heading text-h4-m text-content md:text-h4">
              {about.boundaries.heading}
            </h3>
            <div className="flex max-w-reading flex-col gap-4">
              {about.boundaries.paragraphs.map((paragraph) => (
                <p key={paragraph.body} className="text-body text-content-secondary">
                  <EmphasizedText text={paragraph.body} emphasis={paragraph.emphasis} />
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * The blended split composition: wireframe on the left, sketch on the right.
 *
 * Both fragments are real Lespa work, not stock. They are faded hard and masked
 * towards the centre so they never reach the copy, and they carry no frame of any
 * kind — they are the background, not an image placed on it.
 *
 * TODO: asset needed — assets doc §6, "Background split composition — real Lespa
 * work, blended: a code/wireframe fragment on one side, a design/sketch fragment
 * on the other". Standing in with the Monilog construction diagram and pencil
 * sketch until the dedicated fragments are exported.
 */
function SplitBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="mask-fade-r absolute inset-y-0 left-0 w-1/2 opacity-10">
        <Image
          src="/monilog_case_study_images/construction_diagram.webp"
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>
      <div className="mask-fade-l absolute inset-y-0 right-0 w-1/2 opacity-10">
        <Image
          src="/monilog_case_study_images/pencil_sketch.webp"
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
