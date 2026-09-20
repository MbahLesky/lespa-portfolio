"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { whatIDo } from "@/content/copy";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CAPABILITY_IMAGES = [
  {
    image: "/global_assets/lespa_laptop_design.webp",
    tag: "01 // BRANDING",
    alt: "Graphic design and brand identity",
  },
  {
    image: "/global_assets/lespa_code.webp",
    tag: "02 // ENGINEERING",
    alt: "Web development and code architecture",
  },
  {
    image: "/monilog_images/phone_mockup.webp",
    tag: "03 // MOBILE",
    alt: "Custom mobile application development",
  },
];

export function WhatIDo() {
  const reducedMotion = useReducedMotion();
  const [activeCard, setActiveCard] = useState(1);

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <section id="what-i-do" className="snap-section relative overflow-hidden py-20 md:py-28">
      <div className="relative mx-auto w-full max-w-content px-6 md:px-8">
        <motion.div {...fadeUp} className="flex flex-col items-start">
          {/* Eyebrow */}
          <span className="font-mono text-xs uppercase tracking-widest text-[#00ff88]">
            {"// 03. WHAT I DO"}
          </span>

          {/* Heading: What I Do */}
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {whatIDo.label}
          </h2>
        </motion.div>

        {/* 3 Cards Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {whatIDo.cards.map((item, idx) => {
            const meta = CAPABILITY_IMAGES[idx];
            const isHovered = activeCard === idx;

            return (
              <motion.div
                key={item.label}
                {...fadeUp}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setActiveCard(idx)}
                className={`tech-card group flex flex-col overflow-hidden transition-all duration-300 ${
                  isHovered
                    ? "border-[#00ff88] shadow-[0_0_30px_rgba(0,255,136,0.18)]"
                    : "border-[#00ff88]/15"
                }`}
              >
                {/* Mockup Preview Area */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#070b09] p-3">
                  <div className="relative h-full w-full overflow-hidden rounded-lg">
                    <Image
                      src={meta.image}
                      alt={meta.alt}
                      fill
                      sizes="(min-width: 1024px) 380px, 100vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  {/* Category Tag */}
                  <span className="font-mono text-xs tracking-wider text-[#00ff88]">
                    {meta.tag}
                  </span>

                  {/* Title */}
                  <h3 className="mt-3 font-heading text-2xl font-bold text-white">
                    {item.label}
                  </h3>

                  {/* Description from original copy */}
                  <p className="mt-3 text-sm text-content-secondary leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
