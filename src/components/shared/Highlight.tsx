"use client";

import { cn } from "@/lib/utils";
import { useHoverCapable } from "@/hooks/useHoverCapable";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useReveal } from "@/hooks/useReveal";

interface HighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Underline draw instead of the wash. Intended for phrases inside headings. */
  underline?: boolean;
}

/**
 * Emphasis on a positioning phrase — a soft green wash that sweeps in behind
 * the words, or a drawn underline in headings.
 *
 * Maximum three per section; past that it is a highlighter, not emphasis. Never
 * wrap a link: highlight and link have to stay visually distinct.
 *
 * On pointer devices it responds to hover. On touch, where there is no hover,
 * it fires once as the phrase scrolls into view and then persists. Under
 * reduced motion it is simply present from the start, with no sweep.
 */
export function Highlight({
  underline = false,
  className,
  children,
  ...props
}: HighlightProps) {
  const prefersReducedMotion = useReducedMotion();
  const canHover = useHoverCapable();
  const { ref, isVisible } = useReveal<HTMLSpanElement>({ threshold: 0.9 });

  // .is-visible paints the end state permanently, so it is only for pointers
  // that cannot hover. On a mouse, :hover drives the sweep and applying it here
  // as well would leave every phrase highlighted from first scroll.
  const persist = !canHover && isVisible;

  return (
    <span
      ref={ref}
      className={cn(
        underline ? "highlight-underline" : "highlight",
        persist && "is-visible",
        prefersReducedMotion && "motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
