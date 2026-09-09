import Image from "next/image";

import { Emphasis } from "@/components/phase1/Emphasis";
import { Reveal } from "@/components/phase1/Reveal";
import { about } from "@/content/phase1";

/**
 * About, as a section rather than a page.
 *
 * The one place both background treatments appear at once, and the distinction
 * matters: the photo sits in a card — bordered, elevated, placed on top of the
 * page — while the split composition behind everything is blended straight into
 * the background with no border and no shadow at all.
 *
 * The Day/Night split is two short lists, not prose. "What I don't do" is its
 * own block after them.
 */
export function About() {
  return (
    <section id="about" className="section-pad about-surface" aria-labelledby="about-heading">
      {/* TODO: asset needed — "Background split composition" (real code or
          wireframe fragment on one side, a design or sketch fragment on the
          other), assets doc §6. Blended, not a card. The two halves below are
          the reserved areas; they carry nothing until the artwork lands. */}
      <div className="about-split" aria-hidden="true">
        <span className="about-split-half" data-side="code" />
        <span className="about-split-half" data-side="design" />
      </div>

      <Reveal className="relative mx-auto w-full max-w-6xl px-6">
        <h2 id="about-heading" className="section-heading">
          About
        </h2>

        <div className="mt-16 grid gap-16 lg:grid-cols-12">
          <div className="flex flex-col gap-8 lg:col-span-5">
            {/* The card exception: bordered and elevated, deliberately placed
                on top of the page rather than blended into it. */}
            <div className="about-photo">
              <Image
                src={about.photo.src}
                alt={about.photo.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>

            {/* Under the photo, on the left, per the structure doc. */}
            <div className="flex flex-col gap-8">
              {about.tools.map((group) => (
                <div key={group.label} className="flex flex-col gap-4">
                  <h3 className="tools-label">{group.label}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-7">
            {about.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="body-copy">
                <Emphasis text={paragraph} phrases={about.bioEmphasis} />
              </p>
            ))}

            <div className="grid gap-8 sm:grid-cols-2">
              {[about.day, about.night].map((split) => (
                <div key={split.label} className="flex flex-col gap-4">
                  <h3 className="split-label">{split.label}</h3>
                  <ul className="flex flex-col gap-2">
                    {split.items.map((item) => (
                      <li key={item} className="split-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="body-copy">{about.offHours}</p>

            <div className="wont-do">
              <h3 className="split-label">{about.wontDo.label}</h3>
              {about.wontDo.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="body-copy">
                  <Emphasis text={paragraph} phrases={about.wontDo.emphasis} />
                </p>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
