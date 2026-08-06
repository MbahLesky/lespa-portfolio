import { Container } from "@/components/layout/Container";
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
  className,
  children,
  ...props
}: SectionProps) {
  const withPattern = pattern && PATTERNABLE.has(variant);

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
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
