"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { projects } from "@/content/projects";

/**
 * Selected Work — six projects, one per view, snap-scrolled.
 *
 * Each card is a card: bordered, elevated, hoverable. Per the background imagery
 * rule these and the About photo are the only things on the page that should
 * read as placed on top of it.
 *
 * Per-project theming: the card scopes its own primary brand colour as
 * --project, and the title, tags, link and hover glow all read from that. No
 * component knows a literal colour — see src/content/projects.js for where each
 * colour comes from.
 *
 * A project with no live URL renders no link at all. No placeholder href.
 */
export function SelectedWork() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  // Derive the active slide from the scroll position, so dragging, a trackpad
  // swipe and the arrow buttons all stay in agreement.
  const syncIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", syncIndex, { passive: true });
    return () => track.removeEventListener("scroll", syncIndex);
  }, [syncIndex]);

  const scrollTo = (next) => {
    const track = trackRef.current;
    if (!track) return;

    const clamped = Math.max(0, Math.min(projects.length - 1, next));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
  };

  return (
    <section id="work" className="relative bg-background py-24 md:py-30">
      <div className="mx-auto flex max-w-content flex-col gap-12 px-6 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading label="Selected Work" />

          <Reveal className="flex items-center gap-4">
            <span className="text-caption uppercase tracking-eyebrow text-content-secondary">
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-2">
              <CarouselButton
                label="Previous project"
                onClick={() => scrollTo(index - 1)}
                disabled={index === 0}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </CarouselButton>
              <CarouselButton
                label="Next project"
                onClick={() => scrollTo(index + 1)}
                disabled={index === projects.length - 1}
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </CarouselButton>
            </div>
          </Reveal>
        </div>

        {/* One project per view. Each slide is exactly the track's width, so a
            snap position always lands on a whole multiple of clientWidth and the
            index stays in step with the scroll offset. */}
        <Reveal>
          <ul
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
          >
            {projects.map((project) => (
              <li key={project.slug} className="w-full shrink-0 snap-start">
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="flex items-center justify-center gap-2">
          {projects.map((project, projectIndex) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => scrollTo(projectIndex)}
              aria-label={`Go to ${project.name}`}
              aria-current={projectIndex === index}
              style={{ "--project": `var(${project.accentVar})` }}
              className={`h-1 rounded-sm transition-all duration-slow ease-out ${
                projectIndex === index ? "w-8 bg-project" : "w-4 bg-border-strong"
              }`}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/** "https://monilog.vercel.app" → "monilog.vercel.app". */
function hostOf(url) {
  return new URL(url).host.replace(/^www\./, "");
}

function CarouselButton({ label, onClick, disabled, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-content transition-colors duration-fast hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function ProjectCard({ project }) {
  return (
    <article
      // The project's own primary colour, scoped to this card only.
      style={{ "--project": `var(${project.accentVar})` }}
      className="project-card grid h-full gap-8 rounded-2xl border border-border bg-surface p-6 md:grid-cols-2 md:items-center md:p-10"
    >
      <div className="relative aspect-card overflow-hidden rounded-xl border border-border bg-background">
        {/* TODO: asset needed — assets doc §3, "Updated project mockup/image …
            one per project (6 total)". Showing the existing real project image
            until the updated mockup is produced. */}
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-6">
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
