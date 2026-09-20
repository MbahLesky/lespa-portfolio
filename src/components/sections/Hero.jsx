"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Hero({ onIntroComplete }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    onIntroComplete?.();
  }, [onIntroComplete]);

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <section
      id="hero"
      className="snap-section relative flex min-h-screen items-center overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-20"
    >
      {/* Background subtle radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#00ff88]/5 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-40 h-[600px] w-[600px] rounded-full bg-[#00e575]/5 blur-[140px]"
      />

      <div className="relative mx-auto w-full max-w-content px-6 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Left Column: Headline & Bio & Action */}
          <motion.div {...fadeUp} className="flex flex-col items-start text-left">
            {/* System Status Pill */}
            <div className="tech-pill mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff88] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff88]" />
              </span>
              <span>SYSTEM OPERATIONAL // BAMENDA, CM</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold leading-[1.12] tracking-tight text-white">
              I design brands and interfaces that{" "}
              <span className="inline-block text-[#00ff88] drop-shadow-[0_0_24px_rgba(0,255,136,0.35)]">
                feel like you.
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 max-w-xl text-base sm:text-lg text-content-secondary leading-relaxed">
              End-to-end brand identity design, custom web development, and mobile applications
              engineered entirely from scratch by designer &amp; developer Mbah Lesky.
            </p>

            {/* CTA Button */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#what-i-do"
                className="inline-flex items-center gap-2.5 rounded-lg border border-[#00ff88]/30 bg-[#00ff88]/10 px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-[#00ff88] transition-all duration-300 hover:border-[#00ff88] hover:bg-[#00ff88]/20 hover:shadow-[0_0_25px_rgba(0,255,136,0.35)]"
              >
                <span>EXPLORE CAPABILITIES</span>
                <span className="text-sm">↓</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Laptop Mockup & Avatar Badge */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center lg:items-end"
          >
            <div className="tech-card relative w-full overflow-hidden p-3 sm:p-4">
              {/* Laptop screen preview */}
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-lg bg-[#070b09]">
                <Image
                  src="/global_assets/lespa_android_studio.webp"
                  alt="Workstation with code and mobile application"
                  fill
                  priority
                  sizes="(min-width: 1024px) 520px, 100vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>

              {/* Floating Badge below mockup */}
              <div className="mt-3.5 flex items-center gap-3 rounded-lg border border-white/10 bg-[#080c0a]/90 p-2.5 backdrop-blur-md">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#00ff88]/40">
                  <Image
                    src="/global_assets/lespa_pic1.webp"
                    alt="Mbah Lesky"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">Mbah Lesky</span>
                  <span className="font-mono text-xs text-[#00ff88]/80">Founder &amp; Engineer</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
