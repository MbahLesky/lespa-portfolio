"use client";

import { useState } from "react";

import { ProjectImage } from "@/components/shared/ProjectImage";
import { Text } from "@/components/shared/Text";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  name: string;
}

/**
 * Draggable before/after comparison.
 *
 * The divider is a real range input rather than a mouse-only drag handle, which
 * makes it keyboard operable and gives screen readers a value to report for
 * free. A visible Before/After toggle sits alongside it, so the comparison is
 * usable by tap without any dragging at all.
 *
 * Only rendered when a before image exists — the case study falls back to the
 * written description otherwise. A broken slider is worse than none.
 */
export function BeforeAfterSlider({
  before,
  after,
  name,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <figure className="flex flex-col gap-4">
      <div className="ba-slider ratio-16-9 relative overflow-hidden rounded-md">
        <div className="absolute inset-0">
          <ProjectImage
            src={after}
            alt={`${name} — after`}
            name={`${name} — after`}
            sizes="(min-width: 1024px) 1000px, 100vw"
          />
        </div>

        {/* Clipped to the divider so the before state reveals from the left. */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <ProjectImage
            src={before}
            alt={`${name} — before`}
            name={`${name} — before`}
            sizes="(min-width: 1024px) 1000px, 100vw"
          />
        </div>

        <div
          className="ba-divider"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        />

        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="ba-range"
          aria-label={`Reveal the before and after states of ${name}`}
          aria-valuetext={`${position}% before`}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPosition(100)}
            className="btn-base btn-secondary text-body-sm"
            aria-pressed={position === 100}
          >
            Before
          </button>
          <button
            type="button"
            onClick={() => setPosition(0)}
            className="btn-base btn-secondary text-body-sm"
            aria-pressed={position === 0}
          >
            After
          </button>
        </div>
        <figcaption>
          <Text size="caption" muted>
            Drag the divider, or tap to compare.
          </Text>
        </figcaption>
      </div>
    </figure>
  );
}
