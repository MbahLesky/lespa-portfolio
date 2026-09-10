"use client";

import { useId, useState } from "react";
import { Brush, Code2, Smartphone } from "lucide-react";

import { EmphasizedText } from "@/components/shared/EmphasizedText";
import { PatternBackdrop } from "@/components/shared/PatternBackdrop";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { whatIDo } from "@/content/copy";

/**
 * What I Do — three hover-to-reveal tracks (Tamal Sen reference).
 *
 * Resting state is the label alone. On hover the card expands and the detail copy
 * fades up underneath it. Each card is a button, so hover, focus and tap all
 * reach the same reveal — a pointer is not required.
 *
 * The section background is the blended pattern: no border and no shadow on the
 * pattern itself. The cards above it stay restrained — surface fill and a
 * hairline that warms on hover, no heavy elevation — so the pattern still reads
 * as the page rather than as something framed.
 */
const ICONS = [Brush, Code2, Smartphone];

export function WhatIDo() {
  const [openIndex, setOpenIndex] = useState(null);
  const baseId = useId();

  return (
    <section id="what-i-do" className="relative overflow-hidden py-24 md:py-30">
      <PatternBackdrop />

      <div className="relative mx-auto flex max-w-content flex-col gap-12 px-6 md:px-8">
        <SectionHeading label={whatIDo.label} />

        <ul className="grid gap-6 md:grid-cols-3">
          {whatIDo.cards.map((card, index) => {
            const Icon = ICONS[index];
            const open = openIndex === index;
            const bodyId = `${baseId}-${index}`;

            return (
              <li key={card.label} className="contents">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={bodyId}
                  onMouseEnter={() => setOpenIndex(index)}
                  onMouseLeave={() => setOpenIndex(null)}
                  onFocus={() => setOpenIndex(index)}
                  onBlur={() => setOpenIndex(null)}
                  onClick={() => setOpenIndex(open ? null : index)}
                  className={`flex h-full min-h-80 flex-col justify-between gap-8 rounded-xl border bg-surface p-8 text-left transition-colors duration-slow ease-out ${
                    open ? "border-accent-soft" : "border-border"
                  }`}
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="text-h5 font-heading text-content">{card.label}</span>
                    <Icon
                      className={`h-6 w-6 shrink-0 transition-colors duration-slow ${
                        open ? "text-accent" : "text-content-secondary"
                      }`}
                      aria-hidden="true"
                    />
                  </span>

                  {/* Expands rather than unmounting, so the copy stays in the
                      document for search engines and assistive tech. */}
                  <span
                    id={bodyId}
                    className={`block text-body text-content-secondary transition-all duration-slow ease-out ${
                      open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                    }`}
                  >
                    <EmphasizedText text={card.body} emphasis={card.emphasis} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
