import Image from "next/image";
import { Dribbble, Facebook, Github, Linkedin } from "lucide-react";

import { footer, socials } from "@/content/copy";

/**
 * Persistent footer — pinned, so it is present at every scroll position rather
 * than confined to the end of the page (Brittany Chiang / Brice Clain pattern of
 * always-visible social links).
 *
 * Three breakpoints, because the seven icons and the built-with line will not sit
 * on one row on a phone:
 *
 * - below sm: two stacked rows — identity and icons, then the credit line.
 * - sm to lg: identity and icons on one row, credit centred beneath.
 * - lg and up: one row, identity left, icons centre, credit right.
 *
 * Its height is predictable at each of those, and the page reserves exactly that
 * much bottom padding, so the footer never covers content.
 */
const ICONS = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Facebook: Facebook,
  Dribbble: Dribbble,
};

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="glass-chrome fixed inset-x-0 bottom-0 z-40 border-t border-border py-2 md:py-4">
      <div className="mx-auto flex max-w-content flex-col gap-2 px-6 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 lg:justify-start">
          <div className="flex items-center gap-4">
            <Image
              src="/global_assets/lespa_icon_green_dark.svg"
              alt="Lespa"
              width={24}
              height={24}
            />
            <span className="text-body-sm text-content">{footer.handle}</span>
          </div>

          <ul className="flex flex-wrap items-center gap-2 lg:hidden">
            {socials.map((social) => (
              <li key={social.label}>
                <SocialLink social={social} />
              </li>
            ))}
          </ul>
        </div>

        <ul className="hidden items-center gap-2 lg:flex">
          {socials.map((social) => (
            <li key={social.label}>
              <SocialLink social={social} />
            </li>
          ))}
        </ul>

        <p className="text-caption text-content-secondary sm:text-center lg:text-right">
          © {year} Lespa · {footer.builtWith}
        </p>
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
