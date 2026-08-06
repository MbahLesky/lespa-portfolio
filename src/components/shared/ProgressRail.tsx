"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/** Idle time before the rail fades out of the way. */
const IDLE_MS = 2000;

interface Section {
  id: string;
  label: string;
}

/**
 * Section dots down the right edge. Desktop only, clickable, and fading after
 * two seconds of stillness.
 *
 * Gives the sense of position a carousel would, without taking control of the
 * scroll to do it.
 */
export function ProgressRail({ sections }: { sections: Section[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [awake, setAwake] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const wake = useCallback(() => {
    setAwake(true);
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setAwake(false), IDLE_MS);
  }, []);

  useEffect(() => {
    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The section covering the most of the viewport wins, so passing a
        // short section does not steal the marker from a long one.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { threshold: [0.15, 0.5, 0.75] },
    );

    targets.forEach((target) => observer.observe(target));
    window.addEventListener("scroll", wake, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", wake);
      clearTimeout(idleTimer.current);
    };
  }, [sections, wake]);

  return (
    <nav
      className={cn("progress-rail", awake && "is-active")}
      aria-label="Page sections"
      onMouseEnter={wake}
    >
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="rail-dot"
          aria-current={section.id === activeId ? "true" : undefined}
          aria-label={section.label}
          onClick={(event) => {
            event.preventDefault();
            document.getElementById(section.id)?.scrollIntoView({
              behavior: prefersReducedMotion ? "auto" : "smooth",
              block: "start",
            });
          }}
        />
      ))}
    </nav>
  );
}
