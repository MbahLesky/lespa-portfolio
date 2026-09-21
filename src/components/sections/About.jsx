import Image from "next/image";

import { EmphasizedText } from "@/components/shared/EmphasizedText";
import { Reveal } from "@/components/shared/Reveal";
import { about } from "@/content/copy";

export function About() {
  return (
    <section id="about" className="snap-section relative py-20 md:py-28">
      <div className="relative mx-auto grid max-w-content items-start gap-12 px-6 md:px-8 lg:grid-cols-[320px_1fr] lg:gap-16">
        {/* Left Sticky Column: Portrait & Tools */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal className="flex flex-col gap-8">
            <figure className="tech-card overflow-hidden p-2.5 shadow-xl">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#070b09]">
                <Image
                  src="/global_assets/social_share.webp"
                  alt="Mbah Lesky, known as Lespa."
                  fill
                  sizes="(min-width: 1024px) 320px, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>

            {/* Tool Chips: Design Tools, Development Tools, then Specializations */}
            {about.tools.map((group) => (
              <div key={group.heading} className="flex flex-col gap-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#00ff88]">
                  {group.heading}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((tool) => (
                    <li key={tool} className="tech-badge cursor-default">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Right Column: Bio Prose, Roles, and Boundaries */}
        <div className="flex flex-col gap-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#00ff88]">
              {"// 05. ABOUT"}
            </span>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white">
              The Journey Behind The Code
            </h2>
          </div>

          <Reveal className="flex max-w-reading flex-col gap-4">
            {about.bio.map((paragraph) => (
              <p key={paragraph.body} className="text-base text-content-secondary leading-relaxed">
                <EmphasizedText text={paragraph.body} emphasis={paragraph.emphasis} />
              </p>
            ))}
          </Reveal>

          {/* Role Split */}
          <Reveal className="grid gap-6 sm:grid-cols-2">
            {about.roleSplit.map((role) => (
              <div key={role.heading} className="tech-card flex flex-col p-6">
                <h3 className="font-heading text-lg font-bold text-white">{role.heading}</h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {role.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-content-secondary before:mr-2 before:text-[#00ff88] before:content-['—']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>

          {/* Boundaries / What I Don't Do */}
          <Reveal className="tech-card flex flex-col gap-4 p-6 sm:p-8">
            <h3 className="font-heading text-xl font-bold text-white">
              {about.boundaries.heading}
            </h3>
            <div className="flex max-w-reading flex-col gap-3">
              {about.boundaries.paragraphs.map((paragraph) => (
                <p key={paragraph.body} className="text-sm text-content-secondary leading-relaxed">
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
