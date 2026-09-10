"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ChevronUp, Dribbble, Facebook, Github, Linkedin } from "lucide-react";

import { footer, socials } from "@/content/copy";

/**
 * Persistent footer — pinned, so it is present at every scroll position rather
 * than confined to the end of the page (Brittany Chiang / Brice Clain pattern of
 * always-visible social links).
 *
 * On a phone it is deliberately small: one row of social icons and a chevron,
 * nothing else, so it costs the page as little height as possible. The chevron
 * expands it to show the handle and the credit line. On lg and up there is room
 * for everything at once, so the toggle is not rendered and the detail is always
 * visible.
 *
 * The collapsed height is what the page reserves as bottom padding. Expanding is
 * a deliberate act, so it is allowed to overlay the content beneath it.
 */
const ICONS = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Facebook: Facebook,
  Dribbble: Dribbble,
};

export function SiteFooter() {
  const [expanded, setExpanded] = useState(false);
  const detailId = useId();
  const year = new Date().getFullYear();

  return (
    <footer className="glass-chrome fixed inset-x-0 bottom-0 z-40 border-t border-border">
      <div className="mx-auto flex max-w-content flex-col gap-2 px-6 py-2 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-4">
        {/* Always visible: the icons, and the toggle that reveals the rest. */}
        <div className="flex items-center justify-between gap-4">
          <ul className="flex flex-wrap items-center gap-2">
            {socials.map((social) => (
              <li key={social.label}>
                <SocialLink social={social} />
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            aria-expanded={expanded}
            aria-controls={detailId}
            aria-label={expanded ? "Hide footer details" : "Show footer details"}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-border text-content-secondary transition-colors duration-fast hover:border-accent hover:text-accent lg:hidden"
          >
            <ChevronUp
              className={`h-4 w-4 transition-transform duration-slow ease-out ${
                expanded ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Collapsed to nothing below lg until the chevron is pressed; always
            open from lg up, where the row has the width for it. */}
        <div
          id={detailId}
          className={`grid transition-all duration-slow ease-out lg:contents lg:opacity-100 ${
            expanded ? "grid-rows-expanded opacity-100" : "grid-rows-collapsed opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2 overflow-hidden lg:contents">
            <div className="flex items-center gap-4 pt-2 lg:order-first lg:pt-0">
              <Image
                src="/global_assets/lespa_icon_green_dark.svg"
                alt="Lespa"
                width={24}
                height={24}
              />
              <span className="text-body-sm text-content">{footer.handle}</span>
            </div>

            <p className="pb-2 text-caption text-content-secondary lg:pb-0 lg:text-right">
              © {year} Lespa · {footer.builtWith}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * TODO: asset needed — assets doc §8, "Social icon set (7)". lucide-react covers
 * LinkedIn, GitHub, Facebook and Dribbble; it has no X, TikTok or Behance mark,
 * so those three show an initial in the same tile rather than a stand-in logo.
 * Swap all seven for the real icon set when it lands.
 */
function SocialLink({ social }) {
  const Icon = ICONS[social.label];

  return (
    <a
      href={social.href}
      target="_blank"
      rel="noreferrer"
      aria-label={social.label}
      className="flex h-8 w-8 items-center justify-center rounded-sm border border-border text-content-secondary transition-colors duration-fast hover:border-accent hover:text-accent"
    >
      {Icon ? (
        <Icon className="h-4 w-4" aria-hidden="true" />
      ) : (
        <span aria-hidden="true" className="font-heading text-caption">
          {social.label.charAt(0)}
        </span>
      )}
    </a>
  );
}
