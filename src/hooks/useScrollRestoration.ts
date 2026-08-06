"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const KEY = "lespa:scroll:/projects";

/**
 * Restores scroll position on /projects.
 *
 * Every other route resets to the top on navigation, which is right. The work
 * index is the exception: people scan it, open a case study, and come back —
 * dropping them at the top means finding their place again every time.
 */
export function useScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/projects") return;

    const stored = sessionStorage.getItem(KEY);
    if (stored) {
      // After paint, so the restored offset is not clamped by a page that has
      // not finished laying out.
      requestAnimationFrame(() => window.scrollTo(0, Number(stored)));
    }

    const save = () => sessionStorage.setItem(KEY, String(window.scrollY));
    window.addEventListener("scroll", save, { passive: true });
    return () => {
      save();
      window.removeEventListener("scroll", save);
    };
  }, [pathname]);
}
