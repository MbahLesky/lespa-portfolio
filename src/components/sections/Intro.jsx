"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SKILL_TAGS = [
  "GRAPHIC DESIGNER",
  "LOGO",
  "BRAND IDENTITY",
  "SOFTWARE ENGINEER",
  "WEB DESIGN",
  "WEB DEVELOPER",
  "MOBILE APP",
  "FLUTTER",
  "NEXT.JS",
];

export function Intro() {
  const reducedMotion = useReducedMotion();

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <section id="about" className="snap-section relative overflow-hidden py-20 md:py-28">
      <div className="relative mx-auto w-full max-w-content px-6 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left Column: Copy & Badges */}
          <motion.div {...fadeUp} className="flex flex-col items-start">
            {/* Eyebrow */}
            <span className="font-mono text-xs uppercase tracking-widest text-[#00ff88]">
              {"// 01. ABOUT LESPA"}
            </span>

            {/* Section Title */}
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Digital Craftsmanship From Scratch
            </h2>

            {/* Highlighted Quote Callout */}
            <div className="mt-6 border-l-2 border-[#00ff88] pl-4 sm:pl-5">
              <p className="text-base sm:text-lg font-medium text-white leading-relaxed">
                Lespa is a digital creative studio operated by designer and developer Mbah Lesky in
                Bamenda, Cameroon.
              </p>
            </div>

            {/* Description */}
            <p className="mt-5 text-sm sm:text-base text-content-secondary leading-relaxed">
              We specialize in creating custom visuals, interfaces, and code built entirely from
              scratch for individuals and businesses. Rather than assembling generic templates,
              every visual identity, web app, and mobile application is forged with high-contrast
              precision and modern tech-noir aesthetic.
            </p>

            {/* Tech Badges */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              {SKILL_TAGS.map((tag) => (
                <span key={tag} className="tech-badge">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Layered Visual Cards */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center justify-center lg:items-end"
          >
            <div className="relative w-full max-w-[440px]">
              {/* Top Card: Mbah Lesky Portrait */}
              <div className="tech-card relative overflow-hidden p-3 shadow-2xl">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#070b09]">
                  <Image
                    src="/global_assets/lespa_pic1.webp"
                    alt="Mbah Lesky in Bamenda"
                    fill
                    sizes="(min-width: 1024px) 440px, 100vw"
                    className="object-cover object-top transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Bottom Overlapping Card: Desk Workspace */}
              <div className="tech-card relative -mt-16 ml-auto w-[85%] overflow-hidden p-2.5 shadow-2xl transition-transform duration-500 hover:-translate-y-1 sm:-mt-20">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#070b09]">
                  <Image
                    src="/global_assets/lespa_workspace1.webp"
                    alt="Workstation desk with laptop, coffee, notebook"
                    fill
                    sizes="(min-width: 1024px) 380px, 80vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
