import Image from "next/image";

import { cn } from "@/lib/utils";

/** Intrinsic size of both wordmark files, used to reserve space and avoid CLS. */
const ASPECT = { width: 170, height: 70 };

interface WordmarkProps {
  /** Rendered height in px; width follows the 170:70 ratio. */
  height?: number;
  className?: string;
}

/**
 * The Lespa wordmark.
 *
 * Nicomedia is never loaded as a web font — the mark ships as SVG. Both theme
 * variants render and CSS picks one, rather than swapping `src` after mount:
 * that keeps it correct in server output and avoids a flash of the wrong mark.
 */
export function Wordmark({ height = 28, className }: WordmarkProps) {
  const width = Math.round((height * ASPECT.width) / ASPECT.height);
  const shared = "h-auto w-auto";

  return (
    // The name lives on the wrapper: whichever variant CSS hides would take its
    // alt text out of the accessibility tree with it.
    <span
      role="img"
      aria-label="Lespa"
      className={cn("inline-flex shrink-0", className)}
      style={{ width, height }}
    >
      <Image
        src="/assets/logos/light-theme/Wordmark.svg"
        alt=""
        width={width}
        height={height}
        priority
        className={cn(shared, "dark:hidden")}
      />
      <Image
        src="/assets/logos/dark-theme/Lespa/Wordmark.svg"
        alt=""
        width={width}
        height={height}
        priority
        className={cn(shared, "hidden dark:block")}
      />
    </span>
  );
}
