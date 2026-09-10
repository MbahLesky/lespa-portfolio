"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { Brush, Code2, Smartphone } from "lucide-react";

import { EmphasizedText } from "@/components/shared/EmphasizedText";
import { PatternBackdrop } from "@/components/shared/PatternBackdrop";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { whatIDo } from "@/content/copy";

/**
 * What I Do — three hover-to-reveal tracks (Tamal Sen reference).
 *
 * At rest a card is only its title and icon with its padding — compact, no empty
 * space held open for copy that is not showing. Hovering expands it: the card
 * grows to fit the detail copy, the copy fades up, and a blended work fragment
 * appears behind it. Each card is a button, so hover, focus and tap all reach the
 * same reveal; a pointer is not required.
 *
 * The section background is the blended pattern: no border and no shadow on the
 * pattern itself. The cards above it stay restrained — glass and a hairline that
 * warms on hover, no heavy elevation — so the pattern still reads as the page
 * rather than as something framed.
 */
const ICONS = [Brush, Code2, Smartphone];

/**
 * One blended fragment per track, behind the copy on hover.
 *
 * Real Lespa work rather than decoration: a brand sheet for the design track, a
 * built dashboard for web, app screens for mobile.
 */
const BACKDROPS = [
  "/homepage_project_cards/diwa_concepts.webp",
  "/monilog_case_study_images/web_dashboard.webp",
  "/monilog_case_study_images/mobile_dashboard.webp",
];

export function WhatIDo() {
  const [openIndex, setOpenIndex] = useState(null);
  const baseId = useId();

  return (
    <section id="what-i-do" className="snap-section relative overflow-hidden py-24 md:py-30">
      <PatternBackdrop />

      <div className="relative mx-auto flex max-w-content flex-col gap-12 px-6 md:px-8">
        <SectionHeading label={whatIDo.label} />

        <ul className="grid items-start gap-6 md:grid-cols-3">
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
                  className={`glass relative flex flex-col overflow-hidden rounded-xl border p-6 text-left transition-colors duration-slow ease-out ${
                    open ? "border-accent-soft" : "border-border"
                  }`}
                >
                  {/* Blended fragment, only while the card is open. */}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-slow ease-out ${
                      open ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span className="mask-fade-l absolute inset-0 block opacity-15">
                      <Image
                        src={BACKDROPS[index]}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 380px, 100vw"
                        className="object-cover"
                      />
                    </span>
                  </span>

                  <span className="relative flex items-center justify-between gap-6">
                    <span className="font-heading text-h5 text-content">{card.label}</span>
                    <Icon
                      className={`h-6 w-6 shrink-0 transition-colors duration-slow ${
                        open ? "text-accent" : "text-content-secondary"
                      }`}
                      aria-hidden="true"
                    />
                  </span>

                  {/* Collapsed to nothing at rest, so the card is only as tall as
                      its title. grid-rows keeps the copy in the document — it is
                      never unmounted — while still animating to zero height. */}
                  <span
                    className={`relative grid transition-all duration-slow ease-out ${
                      open ? "grid-rows-expanded pt-6 opacity-100" : "grid-rows-collapsed pt-0 opacity-0"
                    }`}
                  >
                    <span id={bodyId} className="overflow-hidden text-body text-content-secondary">
                      <EmphasizedText text={card.body} emphasis={card.emphasis} />
                    </span>
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
