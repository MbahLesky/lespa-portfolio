"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CAPABILITIES = [
  {
    tag: "01 // BRANDING",
    title: "Graphic Design",
    description:
      "Designs logos, visuals, and complete brand systems including colors, typography, and visual identity for individuals and businesses.",
    image: "/global_assets/lespa_laptop_design.webp",
    alt: "Brand identity design on laptop workstation",
  },
  {
    tag: "02 // ENGINEERING",
    title: "Web Development",
    description:
      "Codes custom websites and web applications from scratch, ranging from one-page sites to full platform web apps.",
    image: "/global_assets/lespa_code.webp",
    alt: "Code and web development on screen",
  },
  {
    tag: "03 // MOBILE",
    title: "Mobile Development",
    description:
      "Builds custom Android and iOS mobile applications tailored for productivity or business needs.",
    image: "/monilog_images/phone_mockup.webp",
    alt: "Smartphone displaying mobile application interface",
  },
];

export function WhatIDo() {
  const reducedMotion = useReducedMotion();
  const [activeCard, setActiveCard] = useState(2); // Card 3 selected by default or on hover

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
            {"// 03. PRODUCTS & SERVICES"}
          </span>

          {/* Heading */}
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            End-to-End Capabilities
          </h2>
        </motion.div>

        {/* 3 Cards Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {CAPABILITIES.map((item, idx) => {
            const isHovered = activeCard === idx;
            return (
              <motion.div
                key={item.tag}
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
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 380px, 100vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Card Info */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  {/* Category Tag */}
                  <span className="font-mono text-xs tracking-wider text-[#00ff88]">
                    {item.tag}
                  </span>

                  {/* Title */}
                  <h3 className="mt-3 font-heading text-2xl font-bold text-white">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm text-content-secondary leading-relaxed">
                    {item.description}
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
