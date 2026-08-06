import { cn } from "@/lib/utils";
import type { TextSize } from "@/types";

const SIZE_CLASS: Record<TextSize, string> = {
  lg: "text-body-lg",
  base: "text-body",
  sm: "text-body-sm",
  caption: "text-caption",
};

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  size?: TextSize;
  /** Drops to secondary text colour. Never the only signal for meaning. */
  muted?: boolean;
  /** Render as something other than a paragraph — span, div, li. */
  as?: "p" | "span" | "div" | "li";
}

export function Text({
  size = "base",
  muted = false,
  as: Tag = "p",
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(
        "font-body",
        SIZE_CLASS[size],
        muted && "text-content-secondary",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/**
 * The small tracked label that opens a section ("Approach", "Selected Work").
 * Takes the accent role, which resolves to the readable green for whichever
 * surface it lands on.
 */
export function SectionLabel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "section-label font-body text-body-sm uppercase text-accent-fg",
        className,
      )}
      {...props}
    >
      <span className="section-label-rule" aria-hidden="true" />
      {children}
    </p>
  );
}
