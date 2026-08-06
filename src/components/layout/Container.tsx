import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Narrows to the 760px reading measure for body-heavy blocks. */
  reading?: boolean;
}

/**
 * Max-width and responsive gutters. Wraps .container-base so the breakpoint
 * padding lives in one place rather than in every section.
 */
export function Container({
  reading = false,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn("container-base", reading && "container-reading", className)}
      {...props}
    >
      {children}
    </div>
  );
}
