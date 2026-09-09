"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/phase1/Reveal";
import { work } from "@/content/phase1";

/**
 * Six projects, one per view, snap-scrolled.
 *
 * Each project wears its own primary brand colour rather than the site green:
 * the title, the link and the tags take it, and so does the card's hover glow.
 * It is set as a custom property on the panel so a single class can reference
 * it — a colour that changes per project cannot be a Tailwind token, and the
 * alternative is a hardcoded value in the markup, which the constraints forbid.
 *
 * A project links out only when it actually has somewhere to go. Where no live
 * URL is documented the link is not rendered at all — no placeholder, no dead
 * href.
 *
 * Snapping is `proximity`, never `mandatory`: mandatory takes the scroll wheel
 * away from the reader, and six full-height panels is a long way to be carried.
 */
export function SelectedWork() {
  return (
    <section
      id="work"
      className="section-pad"
      aria-labelledby="work-heading"
    >
      <Reveal className="mx-auto w-full max-w-6xl px-6">
        <h2 id="work-heading" className="section-heading">
          Selected Work
        </h2>
      </Reveal>

      <div className="work-scroller mt-16">
        {work.projects.map((project) => (
          <article
            key={project.name}
            className="work-panel"
            // TODO: asset needed — per-project primary brand color, assets doc
            // §3. Until each is supplied the panel falls back to the site
            // accent, which is exactly the theming this section is meant to
            // replace, so the fallback is visible rather than silent.
            style={project.color ? { "--project": project.color } : undefined}
            data-untinted={project.color ? undefined : "true"}
          >
            <div className="work-card">
              <Image
                src={project.image}
                alt={project.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="work-copy">
              <h3 className="work-title">{project.name}</h3>
              <p className="work-body">{project.body}</p>

              <ul className="work-tags">
                {project.tags.map((tag) => (
                  <li key={tag} className="work-tag">
                    {tag}
                  </li>
                ))}
              </ul>

              {project.url && (
                <a
                  className="work-link"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Visit site
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">{` — ${project.name}, opens in a new tab`}</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
