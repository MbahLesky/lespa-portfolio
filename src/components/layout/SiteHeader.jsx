"use client";

import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";

import { nav } from "@/content/copy";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Anchor nav with a scroll-progress indicator (Monilog pattern).
 *
 * Animates in last, after the hero's text has finished — `revealed` is handed
 * down from the hero's sequence.
 */
export function SiteHeader({ revealed = false }) {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.header
      initial={reducedMotion ? undefined : { opacity: 0, y: -16 }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/90 backdrop-blur"
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-8 px-6 py-4 md:px-8">
        <a href="#hero" aria-label="Lespa — back to top" className="flex items-center">
          <Image
            src="/global_assets/lespa_wordmark_green_dark.svg"
            alt="Lespa"
            width={96}
            height={24}
            priority
          />
        </a>

        <nav aria-label="Sections">
          <ul className="flex items-center gap-6">
            {nav.map((link) => (
              <li key={link.href} className="hidden md:block">
                <a
                  href={link.href}
                  className="text-caption uppercase tracking-eyebrow text-content-secondary transition-colors duration-fast hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="md:hidden">
              <a
                href="#contact"
                className="text-caption uppercase tracking-eyebrow text-accent"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Scroll progress. Transform-only, so it never triggers layout. */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: reducedMotion ? scrollYProgress : progress }}
        className="h-1 origin-left bg-accent"
      />
    </motion.header>
  );
}
