import Image from "next/image";

import { cn } from "@/lib/utils";

/** Intrinsic size of the wordmark file, used to reserve space and avoid CLS. */
const ASPECT = { width: 170, height: 70 };

/**
 * The Lespa wordmark.
 *
 * Nicomedia is never loaded as a web font — the mark ships as SVG. Phase 1 is
 * dark-only, so only the on-dark variant renders; the light file stays in the
 * repo for when the toggle returns in a later phase.
 *
 * The accessible name lives on the wrapper rather than on the image, so it is
 * one label rather than a label that moves with the file.
 */
export function Wordmark({ height = 28, className }) {
  const width = Math.round((height * ASPECT.width) / ASPECT.height);

  return (
    <span
      role="img"
      aria-label="Lespa"
      className={cn("inline-flex shrink-0", className)}
      style={{ width, height }}
    >
      <Image
        src="/assets/logos/dark-theme/Lespa/Wordmark.svg"
        alt=""
        width={width}
        height={height}
        priority
        className="h-auto w-auto"
      />
    </span>
  );
}
