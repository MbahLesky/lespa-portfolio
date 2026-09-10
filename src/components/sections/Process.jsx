"use client";

import { useState } from "react";

import { AssetPlaceholder } from "@/components/shared/AssetPlaceholder";
import { EmphasizedText } from "@/components/shared/EmphasizedText";
import { PatternBackdrop } from "@/components/shared/PatternBackdrop";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
// Aliased: `process` is also a Node global, and shadowing it in a module that
// the bundler may rewrite is a needless risk.
import { process as processCopy } from "@/content/copy";
import { useFinePointer } from "@/hooks/useFinePointer";

/**
 * Process — five steps, list on one side and the hovered step's detail on the
 * other (itssharl.ee/work reference). Each step also reveals an image beside its
 * detail text (Brice Clain reference).
 *
 * Hover drives the selection on a precise pointer; tap and keyboard focus drive
 * it otherwise, and the detail renders inline beneath the tapped step on narrow
 * screens where there is no second column to put it in. Step one is selected at
 * rest so the pane is never empty.
 */
export function Process() {
  const finePointer = useFinePointer();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = processCopy.steps[activeIndex];

  return (
    <section id="process" className="relative overflow-hidden py-24 md:py-30">
      <PatternBackdrop />

      <div className="relative mx-auto flex max-w-content flex-col gap-12 px-6 md:px-8">
        <SectionHeading label={processCopy.label} />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-16">
          <Reveal as="ol" className="flex flex-col">
            {processCopy.steps.map((step, index) => {
              const selected = index === activeIndex;

              return (
                <li key={step.title} className="border-b border-border last:border-b-0">
                  <button
                    type="button"
                    aria-current={selected}
                    onMouseEnter={() => finePointer && setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    className="flex w-full items-baseline gap-6 py-6 text-left transition-colors duration-slow"
                  >
                    <span
                      className={`text-caption tabular-nums tracking-eyebrow transition-colors duration-slow ${
                        selected ? "text-accent" : "text-content-secondary"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-heading text-h4-m transition-colors duration-slow md:text-h4 ${
                        selected ? "text-content" : "text-content-secondary"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>

                  {/* No second column below lg, so the detail opens in place. */}
                  <div className={`pb-6 lg:hidden ${selected ? "block" : "hidden"}`}>
                    <StepDetail step={step} />
                  </div>
                </li>
              );
            })}
          </Reveal>

          <div className="hidden lg:sticky lg:top-24 lg:block">
            <StepDetail key={active.title} step={active} />
          </div>
        </div>

        <Reveal>
          <p className="max-w-reading text-body-lg text-content-secondary">
            <EmphasizedText
              text={processCopy.closing.body}
              emphasis={processCopy.closing.emphasis}
            />
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * The hovered step's detail: the image beside the text, not above it — the Brice
 * Clain reference puts the image next to the message. Stacks below sm, where
 * there is not enough width for two columns.
 */
function StepDetail({ step }) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
      {/* TODO: asset needed — assets doc §5, "5 hover-reveal images, one per step
          (Reach Out, Research, Define, Design/Build, Present and Deploy)". */}
      <AssetPlaceholder
        label={step.title}
        className="aspect-card w-full shrink-0 sm:w-60"
      />

      <p className="text-body text-content-secondary">
        <EmphasizedText text={step.body} emphasis={step.emphasis} />
      </p>
    </div>
  );
}
