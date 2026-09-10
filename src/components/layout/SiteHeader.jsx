"use client";

import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { LayoutGrid, Mail, Sparkles } from "lucide-react";

import { nav } from "@/content/copy";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Anchor nav with a scroll-progress indicator (Monilog pattern).
 *
 * Animates in last, after the hero's text has finished — `revealed` is handed
 * down from the hero's sequence.
 *
 * Two layouts:
 *
 * - md and up: avatar and wordmark on the left, the named sections on the right.
 * - below md: the labels will not fit, so the row becomes icons — the Lespa mark
 *   back to the hero, then Work, What I Do, Contact, and the avatar for About.
 *   Process is reachable by scrolling; the five that earn a tap target are the
 *   ones someone jumps to.
 *
 * The avatar carries the visitor's first look at Lespa, so it sits in the chrome
 * rather than waiting for them to reach About.
 */

/** Which sections get an icon on the small-screen row, and which icon. */
const MOBILE_NAV = [
  { href: "#work", label: "Work", icon: LayoutGrid },
  { href: "#what-i-do", label: "What I Do", icon: Sparkles },
  { href: "#contact", label: "Contact", icon: Mail },
];

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
      className="glass-chrome fixed inset-x-0 top-0 z-40 border-b border-border"
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-6 py-2 md:gap-6 md:px-8 md:pt-4">
        {/* Small screens: the mark alone is the way home. */}
        <a href="#hero" aria-label="Lespa — back to top" className="flex items-center">
          <Image
            src="/global_assets/lespa_icon_green_dark.svg"
            alt="Lespa"
            width={28}
            height={28}
            priority
            className="md:hidden"
          />
          <span className="hidden items-center gap-4 md:flex">
            <Avatar className="h-8 w-8" />
            <Image
              src="/global_assets/lespa_wordmark_green_dark.svg"
              alt="Lespa"
              width={80}
              height={24}
              priority
            />
          </span>
        </a>

        <nav aria-label="Sections">
          <ul className="hidden items-center gap-6 md:flex">
            {nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-caption uppercase tracking-eyebrow text-content-secondary transition-colors duration-fast hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Icons below md, where the labels stop fitting. */}
          <ul className="flex items-center gap-2 md:hidden">
            {MOBILE_NAV.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-label={link.label}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-content-secondary transition-colors duration-fast hover:border-accent hover:text-accent"
                >
                  <link.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
            <li>
              <a
                href="#about"
                aria-label="About"
                className="flex items-center rounded-full border border-border transition-colors duration-fast hover:border-accent"
              >
                <Avatar className="h-10 w-10" />
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

function Avatar({ className = "" }) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-full border border-border-strong ${className}`}
    >
      <Image
        src="/global_assets/hero-photo-dark.webp"
        alt="Mbah Lesky, known as Lespa."
        fill
        sizes="40px"
        className="object-cover"
      />
    </span>
  );
}
