"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { useSound } from "@/components/shared/SoundProvider";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";

/**
 * Client-side chrome that belongs to the whole app rather than any one page:
 * the first-visit loading transition, scroll restoration, and the page
 * transition cue.
 */
export function AppChrome() {
  const pathname = usePathname();
  const { play } = useSound();
  const previousPath = useRef(pathname);

  useScrollRestoration();

  useEffect(() => {
    // Skip the first render — this is a navigation cue, not an arrival one.
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    play("pageTransition");
  }, [pathname, play]);

  return null;
}
