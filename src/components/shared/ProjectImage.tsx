"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface ProjectImageProps {
  src: string;
  alt: string;
  /** Shown in the fallback, so an empty frame still says what belongs there. */
  name: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/**
 * Imagery with a real fallback, used for project media and the hero slot.
 *
 * None of the image files exist yet, so a missing asset is the normal case
 * during the build rather than an edge case. On error this collapses to a solid
 * surface block at the container's reserved ratio, labelled in muted text —
 * never a broken-image icon and never a collapsed layout.
 */
/**
 * The reserved frame: a solid surface block at the container's ratio, labelled
 * with whatever belongs there. Used both when an image fails to load and when
 * a slot has no image configured yet.
 */
export function MediaFallback({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
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

export function ProjectImage({
  src,
  alt,
  name,
  sizes,
  priority = false,
  className,
}: ProjectImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return <MediaFallback name={name} className={className} />;

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
