import { cn } from "@/lib/utils";
import type { HeadingLevel } from "@/types";

/**
 * Every heading drops one step below md, per the mobile ramp in the spec:
 * H1 48->40, H2 40->32, H3 32->28, H4 28->24. H5 and H6 are already at the
 * floor and do not step down.
 */
const SIZE_CLASS: Record<HeadingLevel, string> = {
  h1: "text-h1-m md:text-h1",
  h2: "text-h2-m md:text-h2",
  h3: "text-h3-m md:text-h3",
  h4: "text-h4-m md:text-h4",
  h5: "text-h5",
  h6: "text-h6",
};

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** The semantic level. Keep document order correct; use `size` to restyle. */
  as?: HeadingLevel;
  /** Visual size override, when the outline needs one level and the design another. */
  size?: HeadingLevel;
  /**
   * Balanced line lengths, on by default because it is what makes a short
   * heading sit well. Turn it off for a heading whose text changes after it is
   * painted: the balancer re-breaks the lines every time the content does, so
   * a heading that types itself would jump a line mid-word.
   */
  balance?: boolean;
}

export function Heading({
  as = "h2",
  size,
  balance = true,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = as;

  return (
    <Tag
      className={cn(
        "font-heading",
        balance && "text-balance",
        SIZE_CLASS[size ?? as],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
