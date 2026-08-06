import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";
import type { SectionSpacing, SurfaceVariant } from "@/types";

const SURFACE_CLASS: Record<SurfaceVariant, string> = {
  gradient: "surface-gradient",
  brand: "surface-brand",
  warm: "surface-warm",
  flat: "surface-flat",
  raised: "surface-raised",
};

/** Pattern is permitted on gradient surfaces only — never on flat or raised. */
const PATTERNABLE: ReadonlySet<SurfaceVariant> = new Set<SurfaceVariant>([
  "gradient",
  "brand",
  "warm",
]);

const SPACING_CLASS: Record<SectionSpacing, string> = {
  major: "section-major",
  standard: "section-standard",
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SurfaceVariant;
  /** Requires a gradient variant; silently ignored on flat and raised. */
  pattern?: boolean;
  spacing?: SectionSpacing;
  /** Set false to lay out the children yourself, e.g. for full-bleed content. */
  contained?: boolean;
  /**
   * Scroll reveal, on by default — one per section is the rule, and defaulting
   * to on is what keeps it to one. Turn it off for anything above the fold,
   * which would otherwise fade in on a page the reader is already looking at.
   */
  reveal?: boolean;
}

/**
 * A page section and its surface treatment.
 *
 * Stacking order is fixed by globals.css: gradient background, then the pattern
 * pseudo-element at 50%, then content. Children never carry the pattern's
 * opacity because the pattern is a ::before, not a wrapper.
 */
export function Section({
  variant = "flat",
  pattern = false,
  spacing = "standard",
  contained = true,
  reveal = true,
  className,
  children,
  ...props
}: SectionProps) {
  const withPattern = pattern && PATTERNABLE.has(variant);
  const body = reveal ? <Reveal>{children}</Reveal> : children;

  return (
    <section
      className={cn(
        "snap-section relative",
        SURFACE_CLASS[variant],
        SPACING_CLASS[spacing],
        withPattern && "has-pattern",
        className,
      )}
      {...props}
    >
      {contained ? <Container>{body}</Container> : body}
    </section>
  );
}
