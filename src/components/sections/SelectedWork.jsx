"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { projects } from "@/content/projects";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Selected Work — six projects, one on screen at a time, advanced by scrolling.
 *
 * The section is six viewports tall with a sticky viewport-height stage inside
 * it. Scrolling through that height swaps which project the stage shows, so one
 * project is visible at a time and the wheel moves to the next; reaching the
 * last one lets the page carry on to What I Do, and scrolling back up from the
 * first carries on to Intro. Native scroll throughout — nothing is intercepted,
 * so the trackpad, the keyboard, a touch drag and the scrollbar all behave.
 *
 * Each card is a card: bordered, glass, hoverable. Per the background imagery
 * rule these and the About photo are the only things on the page that should
 * read as placed on top of it.
 *
 * Per-project theming: the card scopes its own primary brand colour as
 * --project, and the title, tags, link and hover glow all read from that. No
 * component knows a literal colour — see src/content/projects.js for where each
 * colour comes from.
 *
 * Two independent hovers, deliberately not the same gesture:
 *
 * - group/card — anywhere on the card fades in that project's blended backdrop
 *   behind everything, and lights the border and glow in its colour.
 * - group/photo — the mockup frame only. Crossfades the mockup to that project's
 *   sketch or working artefact. Hovering the copy does not trigger it.
 *
 * A project with no live URL renders no link at all. No placeholder href.
 */
export function SelectedWork() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  // 0 at the moment the stage pins, 1 when it is about to unpin.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(projects.length - 1, Math.floor(progress * projects.length));
    setIndex((current) => (current === next ? current : Math.max(0, next)));
  });

  // Reduced motion gets the plain list: no pinning, no swapping, just six cards.
  if (reducedMotion) {
    return (
      <section id="work" className="relative py-24 md:py-30">
        <div className="mx-auto flex max-w-content flex-col gap-12 px-6 md:px-8">
          <SectionHeading label="Selected Work" />
          <ul className="flex flex-col gap-8">
            {projects.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      id="work"
      ref={sectionRef}
      className="snap-section relative"
      // One viewport of scroll per project. The stage inside stays pinned for
      // all of it, which is what turns vertical scroll into project-stepping.
      style={{ height: `${projects.length * 100}svh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="mx-auto flex w-full max-w-content flex-col gap-8 px-6 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading label="Selected Work" />

            <div className="flex items-center gap-4">
              <span className="text-caption tabular-nums uppercase tracking-eyebrow text-content-secondary">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>

              {/* Progress through the six, not a control — scrolling is the control. */}
              <ul aria-hidden="true" className="flex items-center gap-2">
                {projects.map((project, projectIndex) => (
                  <li
                    key={project.slug}
                    style={{ "--project": `var(${project.accentVar})` }}
                    className={`h-1 rounded-sm transition-all duration-slow ease-out ${
                      projectIndex === index ? "w-8 bg-project" : "w-4 bg-border-strong"
                    }`}
                  />
                ))}
              </ul>
            </div>
          </div>

          {/* All six share one grid cell, so the stage is as tall as the tallest
              card and stepping between them never shifts the layout. They stay
              mounted — hiding the five inactive ones would be cheaper, but then
              only one project would exist in the HTML for a crawler to read.
              Inactive cards are hidden from assistive tech and untabbable. */}
          <div className="grid">
            {projects.map((project, projectIndex) => {
              const active = projectIndex === index;

              return (
                <motion.div
                  key={project.slug}
                  aria-hidden={!active}
                  animate={{ opacity: active ? 1 : 0, y: active ? 0 : 24 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={`col-start-1 row-start-1 ${
                    active ? "" : "pointer-events-none"
                  }`}
                  // Keeps the inactive cards out of the tab order without
                  // removing them from the document.
                  inert={!active}
                >
                  <ProjectCard project={project} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/** "https://monilog.vercel.app" → "monilog.vercel.app". */
function hostOf(url) {
  return new URL(url).host.replace(/^www\./, "");
}

function ProjectCard({ project }) {
  return (
    <article
      // The project's own primary colour, scoped to this card only.
      style={{ "--project": `var(${project.accentVar})` }}
      className="project-card group/card glass relative grid gap-8 overflow-hidden rounded-2xl border border-border p-6 md:grid-cols-2 md:items-center md:p-10"
    >
      {/* Fills the card behind everything, and only on hover. Low opacity and
          masked, so it blends into the card rather than competing with the copy.
          The mockup in its own frame below is untouched by this. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-slow ease-out group-hover/card:opacity-100 group-focus-within/card:opacity-100"
      >
        <div className="mask-fade-l absolute inset-0 opacity-20">
          <Image
            src={project.backdrop}
            alt=""
            fill
            sizes="(min-width: 1024px) 1200px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* The mockup frame — its own hover, independent of the card's.
          `group/photo` scopes it to this frame, so crossfading to the sketch
          happens only when the pointer is over the image itself. Hovering the
          copy or the card's padding leaves the mockup alone and moves only the
          card-wide backdrop above.
          TODO: asset needed — assets doc §3, "Updated project mockup/image …
          one per project (6 total)". Both views use existing real project images;
          only Monilog has a true hand sketch so far. */}
      <div className="group/photo glass-strong relative aspect-card overflow-hidden rounded-xl border border-border">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-opacity duration-slow ease-out group-hover/photo:opacity-0"
        />
        <Image
          src={project.hoverImage}
          alt={project.hoverImageAlt}
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
          className="object-cover opacity-0 transition-opacity duration-slow ease-out group-hover/photo:opacity-100"
        />
      </div>

      <div className="relative flex flex-col gap-6">
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-sm border border-project-soft px-4 py-1 text-caption uppercase tracking-label text-project"
            >
              {tag}
            </li>
          ))}
        </ul>

        <h3 className="text-h3-m text-project md:text-h3">{project.name}</h3>

        <p className="max-w-reading text-body text-content-secondary">{project.subtext}</p>

        {/* Link only where a live site exists, labelled with the host itself —
            the copy doc specifies no link text, so none is invented. */}
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-2 border-b border-project-soft pb-1 text-body-sm text-project transition-colors duration-fast hover:border-project"
          >
            {hostOf(project.liveUrl)}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  );
}
