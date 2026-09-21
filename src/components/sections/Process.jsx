"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { ChatExchange } from "@/components/shared/ChatExchange";
import { EmphasizedText } from "@/components/shared/EmphasizedText";
import { process as processCopy } from "@/content/copy";
import { useFinePointer } from "@/hooks/useFinePointer";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const STEP_IMAGES = [
  "/global_assets/lespa_whatsapp_bg.webp",
  "/global_assets/lespa_researching.webp",
  "/monilog_images/monilog_sketch.webp",
  "/global_assets/lespa_android_studio.webp",
  "/monilog_images/lespa_monilog_web.webp",
];

export function Process() {
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = processCopy.steps[activeIndex];

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <section id="process" className="snap-section relative overflow-hidden py-20 md:py-28">
      <div className="relative mx-auto w-full max-w-content px-6 md:px-8">
        <motion.div {...fadeUp} className="flex flex-col items-start">
          {/* Eyebrow */}
          <span className="font-mono text-xs uppercase tracking-widest text-[#00ff88]">
            {"// 04. PROCESS"}
          </span>

          {/* Heading */}
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {processCopy.label}
          </h2>
        </motion.div>

        {/* 2-Column interactive layout: Step List on Left, Detail & Image on Right */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start lg:gap-16">
          {/* Left Column: Numbered Step List */}
          <div className="flex flex-col gap-3">
            {processCopy.steps.map((step, index) => {
              const selected = index === activeIndex;

              return (
                <div key={step.title} className="flex flex-col">
                  <button
                    type="button"
                    aria-current={selected}
                    onMouseEnter={() => finePointer && setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    className={`tech-card flex w-full items-center gap-5 p-5 text-left transition-all duration-300 ${
                      selected
                        ? "border-[#00ff88] bg-[#00ff88]/5 shadow-[0_0_20px_rgba(0,255,136,0.12)]"
                        : "border-white/5 bg-[#0d1411]/60 hover:border-[#00ff88]/40 hover:bg-[#0d1411]"
                    }`}
                  >
                    <span
                      className={`font-mono text-sm font-bold transition-colors duration-200 ${
                        selected ? "text-[#00ff88]" : "text-content-secondary"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <span
                      className={`font-heading text-lg font-bold transition-colors duration-200 sm:text-xl ${
                        selected ? "text-white" : "text-content-secondary"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>

                  {/* Mobile inline expansion (when below lg) */}
                  <div className={`pt-4 pb-2 lg:hidden ${selected ? "block" : "hidden"}`}>
                    <StepContent
                      step={step}
                      index={index}
                      image={STEP_IMAGES[index]}
                      exchange={index === 0 ? processCopy.reachOutExchange : null}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Text displays ABOVE (before) the image */}
          <div className="hidden lg:sticky lg:top-28 lg:block">
            <AnimatePresence mode="wait">
              <StepContent
                key={active.title}
                step={active}
                index={activeIndex}
                image={STEP_IMAGES[activeIndex]}
                exchange={activeIndex === 0 ? processCopy.reachOutExchange : null}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Closing Note */}
        <motion.div {...fadeUp} className="mt-16 max-w-3xl border-t border-white/10 pt-8">
          <p className="text-base sm:text-lg text-content-secondary leading-relaxed">
            <EmphasizedText
              text={processCopy.closing.body}
              emphasis={processCopy.closing.emphasis}
            />
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Renders the step description ABOVE the image, and the image directly below/beside it.
 * No text overlaid with scrim on top of the image.
 */
function StepContent({ step, index, image, exchange }) {
  const reducedMotion = useReducedMotion();

  const enter = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <motion.div {...enter} className="tech-card flex flex-col p-6 sm:p-8">
      {/* 1. Text displays ABOVE (before) the image */}
      <div className="flex flex-col gap-2 pb-6">
        {/* <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#00ff88]">
            Step {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-white/20">{"//"}</span>
          <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
            {step.title}
          </h3>
        </div> */}

        <p className="mt-2 text-sm sm:text-base text-content-secondary leading-relaxed">
          <EmphasizedText text={step.body} emphasis={step.emphasis} />
        </p>
      </div>

      {/* 2. Image displays BELOW the text (not with text overlaid on top) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/10 bg-[#070b09]">
        {exchange ? (
          <ChatExchange
            exchange={exchange}
            label={`A sample first exchange for the ${step.title} step.`}
            className="h-full"
            contentClassName="p-4"
          />
        ) : (
          <Image
            src={image}
            alt={step.title}
            fill
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        )}
      </div>
    </motion.div>
  );
}
