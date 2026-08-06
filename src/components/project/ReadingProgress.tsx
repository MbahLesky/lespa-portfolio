"use client";

import { useEffect, useState } from "react";

/**
 * Reading progress across a case study. 2px, top, Brand Lift gradient.
 *
 * Case studies are long and people want to know how long. Purely decorative to
 * assistive technology — the information is duplicated by the scrollbar — so it
 * is hidden from the tree rather than announced.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="reading-progress" aria-hidden="true">
      <div
        className="reading-progress-bar bg-gradient-brand-lift"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
