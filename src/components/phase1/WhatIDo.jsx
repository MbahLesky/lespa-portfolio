"use client";

import { useState } from "react";

import { Emphasis } from "@/components/phase1/Emphasis";
import { Reveal } from "@/components/phase1/Reveal";
import { whatIDo } from "@/content/phase1";

/**
 * Three tracks, each expanding to its detail on hover.
 *
 * Hover is a pointer affordance and nothing else, so the detail is also opened
 * by focus and by tap: the card is a button, and the copy is in the DOM either
 * way rather than being swapped in on hover. A reveal that only a mouse can
 * reach is a reveal half the visitors never see.
 *
 * The detail collapses by grid-template-rows rather than height, so it animates
 * from nothing to its own measured height without anyone hardcoding what that
 * height is.
 *
 * Only a real mouse opens on enter, and only keyboard focus opens on focus. A
 * tap fires pointerenter, focus and click in that order, so a card that reacts
 * to all three opens twice and is then closed again by its own toggle —
 * measured as a card that would not open on a phone at all.
 */
export function WhatIDo() {
  const [open, setOpen] = useState(null);

  return (
    <section
      id="what-i-do"
      className="section-pad has-pattern"
      aria-labelledby="what-i-do-heading"
    >
      <Reveal className="mx-auto w-full max-w-6xl px-6">
        <h2 id="what-i-do-heading" className="section-heading">
          What I Do
        </h2>

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {whatIDo.cards.map((card, index) => (
            <li key={card.label}>
              <button
                type="button"
                className="track"
                aria-expanded={open === index}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setOpen(index);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse") setOpen(null);
                }}
                onFocus={(event) => {
                  if (event.target.matches(":focus-visible")) setOpen(index);
                }}
                onBlur={() => setOpen(null)}
                onClick={() => setOpen(open === index ? null : index)}
              >
                <span className="track-label">{card.label}</span>
                <span className="track-detail" data-open={open === index}>
                  <span className="track-detail-inner">
                    <Emphasis text={card.body} phrases={card.emphasis} />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
