"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const FEATURED_SHOWCASE = [
  {
    category: "Graphic Design / Identity",
    title: "Brand System Studio Workstation",
    subtext: "Complete visual identity, artboard guidelines, and cohesive design system.",
    image: "/global_assets/lespa_laptop_design.webp",
    liveUrl: null,
  },
  {
    category: "Visual Design",
    title: "Vector & Layout Engineering",
    subtext: "Precision vector typography, flyer campaigns, and structured layout architecture.",
    image: "/global_assets/lespa_researching.webp",
    liveUrl: null,
  },
  {
    category: "Web Application",
    title: "Custom Frontend Platform",
    subtext: "Interactive dashboards and responsive high-performance web applications built from scratch.",
    image: "/global_assets/lespa_skuulabs_web.webp",
    liveUrl: "https://skuulabs.com",
  },
  {
    category: "Code Aesthetics",
    title: "Minimalist Tech-Noir Texture",
    subtext: "Clean, maintainable source code architecture with minimalist dark aesthetics.",
    image: "/global_assets/lespa_code.webp",
    liveUrl: null,
  },
  {
    category: "Community & Knowledge",
    title: "Digital Skills & Tech Workshops in Bamenda",
    subtext: "Mentoring upcoming software engineers and designers in modern web and mobile stacks.",
    image: "/global_assets/lespa_at_night.webp",
    liveUrl: null,
  },
];

export function SelectedWork({ projects }) {
  const reducedMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(null);

  // Combine passed projects or use featured showcase list
  const displayItems =
    projects && projects.length > 0
      ? projects.map((p, i) => ({
          category: p.tags?.[0] ? `${p.tags[0]} / Engineering` : "Digital Craftsmanship",
          title: p.name,
          subtext: p.subtext,
          image: p.image || FEATURED_SHOWCASE[i % FEATURED_SHOWCASE.length].image,
          liveUrl: p.liveUrl || null,
          tags: p.tags,
        }))
      : FEATURED_SHOWCASE;

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <section id="work" className="snap-section relative overflow-hidden py-20 md:py-28">
      <div className="relative mx-auto w-full max-w-content px-6 md:px-8">
        <motion.div {...fadeUp} className="flex flex-col items-start">
          {/* Eyebrow */}
          <span className="font-mono text-xs uppercase tracking-widest text-[#00ff88]">
            {"// 04. DIGITAL CRAFTSMANSHIP"}
          </span>

          {/* Heading */}
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Selected Visuals &amp; Systems
          </h2>
        </motion.div>

        {/* 2-Column Responsive Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {displayItems.map((item, idx) => {
            const isWide = idx === 4 && displayItems.length === 5;
            const isHovered = activeIdx === idx;

            return (
              <motion.div
                key={item.title + idx}
                {...fadeUp}
                transition={{
                  duration: 0.5,
                  delay: (idx % 2) * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                className={`tech-card group flex flex-col overflow-hidden transition-all duration-300 ${
                  isWide ? "sm:col-span-2" : ""
                } ${
                  isHovered
                    ? "border-[#00ff88] shadow-[0_0_30px_rgba(0,255,136,0.18)]"
                    : "border-[#00ff88]/15"
                }`}
              >
                {/* Image Container */}
                <div
                  className={`relative w-full overflow-hidden bg-[#070b09] p-3 ${
                    isWide ? "aspect-[21/9]" : "aspect-[16/10]"
                  }`}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 600px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Content info */}
                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    {/* Category */}
                    <span className="font-mono text-xs tracking-wider text-[#00ff88]">
                      {item.category}
                    </span>

                    {/* Title */}
                    <h3 className="mt-2 font-heading text-xl sm:text-2xl font-bold text-white">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-sm text-content-secondary leading-relaxed">
                      {item.subtext}
                    </p>
                  </div>

                  {/* Optional Live link */}
                  {item.liveUrl ? (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-xs text-[#00ff88] hover:underline"
                      >
                        <span>Visit live site</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
