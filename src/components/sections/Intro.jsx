"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EmphasizedText } from "@/components/shared/EmphasizedText";
import { intro } from "@/content/copy";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Intro({ content }) {
  const reducedMotion = useReducedMotion();

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      };

  const bodyText = content?.introBody || intro.body;
  const emphasisPhrases = content?.introEmphasis || intro.emphasis;

  return (
    <section id="intro" className="snap-section relative overflow-hidden py-20 md:py-28">
      <div className="relative mx-auto w-full max-w-content px-6 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left Column: Intro Copy */}
          <motion.div {...fadeUp} className="flex flex-col items-start">
            {/* Eyebrow */}
            <span className="font-mono text-xs uppercase tracking-widest text-[#00ff88]">
              {"// 01. INTRO"}
            </span>

            {/* Title */}
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Design &amp; Code As One Job
            </h2>

            {/* Intro Copy with original text and emphasis */}
            <div className="mt-6 border-l-2 border-[#00ff88] pl-5 sm:pl-6">
              <p className="text-lg sm:text-xl font-normal text-gray-400 leading-relaxed">
                <EmphasizedText text={bodyText} emphasis={emphasisPhrases} />
              </p>
            </div>
          </motion.div>

          {/* Right Column: Only Computer / Laptop Image */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center justify-center lg:items-end"
          >
            <div className="tech-card relative w-full max-w-[480px] overflow-hidden p-3 shadow-2xl">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-lg bg-[#070b09]">
                <Image
                  src="/global_assets/lespa_laptop_design.webp"
                  alt="Laptop workstation displaying design and code architecture"
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
