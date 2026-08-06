"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface ProjectImageProps {
  src: string;
  alt: string;
  /** Project name, shown in the fallback so an empty box still says what it is. */
  name: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/**
 * Project imagery with a real fallback.
 *
 * None of the mock image files exist yet, so a missing asset is the normal case
 * during the build rather than an edge case. On error this collapses to a solid
 * surface block at the container's ratio with the project name in muted text —
 * never a broken-image icon and never a collapsed layout.
 */
export function ProjectImage({
  src,
  alt,
  name,
  sizes,
  priority = false,
  className,
}: ProjectImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "surface-raised elevated flex h-full w-full items-center justify-center",
          className,
        )}
      >
        <span className="font-body text-body-sm text-content-secondary">
          {name}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
    />
  );
}
