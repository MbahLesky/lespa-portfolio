import { cn } from "@/lib/utils";

/**
 * A small pill for role and stack labels.
 *
 * Deliberately not a link or a button in v1 — the site has no filtering, and a
 * clickable-looking tag that does nothing is worse than a plain one.
 */
export function Tag({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("tag font-body text-caption", className)} {...props}>
      {children}
    </span>
  );
}
