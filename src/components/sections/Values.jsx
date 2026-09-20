"use client";

import { motion } from "framer-motion";
import { Compass, Fingerprint, GitBranch } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const VALUES = [
  {
    icon: GitBranch,
    title: "Craftsmanship",
    description:
      "Every line of code and every pixel is created from scratch. No bloated frameworks, no pre-made templates—just bespoke, precision craftsmanship.",
  },
  {
    icon: Fingerprint,
    title: "Authenticity",
    description:
      "Your visual identity and functional interfaces should reflect your true character. We design systems that look and feel authentically like you.",
  },
  {
    icon: Compass,
    title: "Intentionality",
    description:
      "Every UI component, color choice, and architectural decision serves a practical purpose. Minimalist form aligned directly with utility.",
  },
];

export function Values() {
  const reducedMotion = useReducedMotion();

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <section id="values" className="snap-section relative overflow-hidden py-20 md:py-28">
      <div className="relative mx-auto w-full max-w-content px-6 md:px-8">
        <motion.div {...fadeUp} className="flex flex-col items-start">
          {/* Eyebrow */}
          <span className="font-mono text-xs uppercase tracking-widest text-[#00ff88]">
            {"// 02. CORE VALUES"}
          </span>

          {/* Heading */}
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Built on Code &amp; Character
          </h2>
        </motion.div>

        {/* 3 Value Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {VALUES.map((val, idx) => {
            const Icon = val.icon;
            return (
              <motion.div
                key={val.title}
                {...fadeUp}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="tech-card flex flex-col p-8 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88]">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl font-bold text-white">{val.title}</h3>

                {/* Description */}
                <p className="mt-4 text-sm text-content-secondary leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
