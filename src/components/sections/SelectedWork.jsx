"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { projects as fallbackProjects } from "@/content/projects";
import { urlForImage } from "@/sanity/image";

export function SelectedWork({ projects: initialProjects }) {
  const reducedMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(null);

  const items =
    initialProjects && initialProjects.length > 0 ? initialProjects : fallbackProjects;

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      };

  const getImageSrc = (proj) => {
    if (proj?.coverImage) {
      return (
        urlForImage(proj.coverImage)?.width(1000).height(625).fit("crop").url() ||
        proj.coverImage.asset?.url ||
        proj.image
      );
    }
    return proj?.image || "";
  };

  const getImageAlt = (proj) => {
    return (
      proj?.coverImage?.alt ||
      proj?.imageAlt ||
      proj?.name ||
      "Project mockup"
    );
  };

  return (
    <section id="work" className="snap-section relative overflow-hidden py-20 md:py-28">
      <div className="relative mx-auto w-full max-w-content px-6 md:px-8">
        <motion.div {...fadeUp} className="flex flex-col items-start">
          {/* Eyebrow */}
          <span className="font-mono text-xs uppercase tracking-widest text-[#00ff88]">
            {"// 02. SELECTED WORK"}
          </span>

          {/* Heading */}
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Selected Work
          </h2>
        </motion.div>

        {/* Hierarchical Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {items.map((project, idx) => {
            // Hierarchical layout: Item 0 and Item 3 are featured wide cards spanning 2 columns
            const isFeatured = idx === 0 || idx === 3;
            const isHovered = activeIdx === idx;
            const imageSrc = getImageSrc(project);
            const imageAlt = getImageAlt(project);
            const lqip = project.coverImage?.asset?.metadata?.lqip;

            return (
              <motion.div
                key={project.slug || project.name}
                key={project.slug || project.name || idx}
                {...fadeUp}
                transition={{
                  duration: 0.5,
                  delay: (idx % 2) * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                className={`tech-card group relative flex flex-col overflow-hidden transition-all duration-300 ${
                  isFeatured ? "sm:col-span-2" : "sm:col-span-1"
                } ${
                  isHovered
                    ? "border-[#00ff88] shadow-[0_0_30px_rgba(0,255,136,0.18)]"
                    : "border-[#00ff88]/15"
                }`}
              >
                {isFeatured ? (
                  /* Featured Wide Card: 2-column internal layout on medium+ screens */
                  <div className="grid h-full items-center md:grid-cols-12">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070b09] p-3 md:col-span-7 md:h-full">
                      <div className="relative h-full w-full overflow-hidden rounded-lg">
                        <Image
                          src={project.image}
                          alt={project.imageAlt || project.name}
                          fill
                          sizes="(min-width: 1024px) 700px, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {imageSrc && (
                          <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            placeholder={lqip ? "blur" : "empty"}
                            blurDataURL={lqip || undefined}
                            sizes="(min-width: 1024px) 700px, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-5">
                      <div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags?.map((tag) => (
                            <span key={tag} className="tech-badge">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Title */}
                        <h3 className="mt-4 font-heading text-2xl sm:text-3xl font-bold text-white">
                          {project.name}
                        </h3>

                        {/* Description */}
                        <p className="mt-3 text-sm sm:text-base text-content-secondary leading-relaxed">
                          {project.subtext}
                        </p>
                      </div>

                      {/* Live Link */}
                      {project.liveUrl ? (
                        <div className="mt-6 pt-4 border-t border-white/5">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#00ff88] hover:underline"
                          >
                            <span>Live Project</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  /* Standard Card: Stacked layout */
                  <div className="flex h-full flex-col">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070b09] p-3">
                      <div className="relative h-full w-full overflow-hidden rounded-lg">
                        <Image
                          src={project.image}
                          alt={project.imageAlt || project.name}
                          fill
                          sizes="(min-width: 1024px) 600px, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {imageSrc && (
                          <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            placeholder={lqip ? "blur" : "empty"}
                            blurDataURL={lqip || undefined}
                            sizes="(min-width: 1024px) 600px, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                      <div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags?.slice(0, 3).map((tag) => (
                            <span key={tag} className="tech-badge">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Title */}
                        <h3 className="mt-3 font-heading text-xl sm:text-2xl font-bold text-white">
                          {project.name}
                        </h3>

                        {/* Description */}
                        <p className="mt-2 text-sm text-content-secondary leading-relaxed">
                          {project.subtext}
                        </p>
                      </div>

                      {/* Live Link */}
                      {project.liveUrl ? (
                        <div className="mt-4 pt-4 border-t border-white/5">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#00ff88] hover:underline"
                          >
                            <span>Live Project</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
