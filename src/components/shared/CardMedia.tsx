"use client";

import { useEffect, useState } from "react";

import { ProjectImage } from "@/components/shared/ProjectImage";
import { useHoverCapable } from "@/hooks/useHoverCapable";
import { cn } from "@/lib/utils";

interface CardMediaProps {
  final: string;
  sketch: string;
  name: string;
  outcome: string;
  featured?: boolean;
  priority?: boolean;
  /** Shows the discovery label. Intended for the first card only. */
  hint?: boolean;
}

/**
 * The signature interaction: the final output crossfades to the wireframe.
 *
 * It says "I show my work" without a line of copy — but only when it can
 * actually do so. The sketch is preloaded on mount and the reveal stays off
 * until that load succeeds, because a reveal to a blank frame is worse than no
 * reveal at all.
 *
 * Hover is a pointer affordance, so touch gets a real Final/Sketch pill rather
 * than an interaction it can never trigger.
 */
export function CardMedia({
  final,
  sketch,
  name,
  outcome,
  featured = false,
  priority = false,
  hint = false,
}: CardMediaProps) {
  const canHover = useHoverCapable();
  const [sketchReady, setSketchReady] = useState(false);
  const [showSketch, setShowSketch] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const image = new window.Image();
    image.onload = () => {
      if (!cancelled) setSketchReady(true);
    };
    image.src = sketch;
    return () => {
      cancelled = true;
    };
  }, [sketch]);

  const showToggle = sketchReady && !canHover;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-md",
        featured ? "ratio-16-9" : "ratio-4-3",
      )}
      data-sketch-ready={sketchReady ? "true" : "false"}
    >
      <ProjectImage
        src={final}
        alt={`${name} — ${outcome}`}
        name={name}
        priority={priority}
        sizes={
          featured
            ? "(min-width: 768px) 1200px, 100vw"
            : "(min-width: 768px) 600px, 100vw"
        }
      />

      {sketchReady && (
        <div
          className="card-sketch absolute inset-0"
          data-shown={showSketch ? "true" : undefined}
          aria-hidden="true"
        >
          <ProjectImage
            src={sketch}
            alt=""
            name={name}
            sizes={
              featured
                ? "(min-width: 768px) 1200px, 100vw"
                : "(min-width: 768px) 600px, 100vw"
            }
          />
        </div>
      )}

      {showToggle && (
        <button
          type="button"
          // The card is a link; without this the tap navigates instead.
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setShowSketch((shown) => !shown);
          }}
          className="card-toggle text-caption"
          aria-pressed={showSketch}
        >
          {showSketch ? "Sketch" : "Final"}
        </button>
      )}

      {hint && sketchReady && canHover && (
        <span className="card-toggle text-caption" aria-hidden="true">
          Hover to see the sketch
        </span>
      )}
    </div>
  );
}
