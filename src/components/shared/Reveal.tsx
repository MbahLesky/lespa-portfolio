"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useReveal } from "@/hooks/useReveal";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Stagger direct children by 60ms each. Use once per section at most — a
   * cascade of individually animated items feels fussy and delays reading.
   */
  stagger?: boolean;
}

/**
 * Scroll reveal wrapper: fades up 16px when 15% into view, once.
 *
 * Under reduced motion the children are returned unwrapped, so no transition
 * class, observer, or extra element is introduced at all.
 */
export function Reveal({
  stagger = false,
  className,
  children,
  ...props
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isVisible } = useReveal<HTMLDivElement>({
    enabled: !prefersReducedMotion,
  });

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "reveal",
        stagger && "reveal-stagger",
        isVisible && "is-visible",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
