import { Dribbble, Facebook, Github, Linkedin, X } from "lucide-react";

import { Wordmark } from "@/components/phase1/Wordmark";
import { site, socials } from "@/content/phase1";

/**
 * lucide has five of the seven marks. TikTok and Behance are drawn here rather
 * than pulled from a second icon package for two glyphs.
 */
function TikTok(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.5 2h-2.9v13.2a2.5 2.5 0 1 1-2.5-2.5c.2 0 .4 0 .6.1V9.8a5.6 5.6 0 1 0 4.9 5.6V8.9a6.6 6.6 0 0 0 3.9 1.3V7.3a3.7 3.7 0 0 1-3.4-3.7V2Z" />
    </svg>
  );
}

function Behance(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M9.1 5.6c1.9 0 3.2.9 3.2 2.7 0 1.1-.6 1.8-1.4 2.2 1.2.4 1.9 1.3 1.9 2.6 0 2-1.6 3-3.6 3H3V5.6h6.1Zm-.4 4.1c.8 0 1.3-.4 1.3-1.1 0-.8-.5-1.1-1.4-1.1H5.6v2.2h3.1Zm.2 4.5c1 0 1.5-.4 1.5-1.2 0-.9-.6-1.2-1.6-1.2H5.6v2.4h3.3ZM17.9 8.9c2.3 0 3.8 1.6 3.8 4v.7h-5.4c.1 1 .8 1.7 1.8 1.7.8 0 1.3-.3 1.6-.9h1.9c-.4 1.6-1.7 2.6-3.5 2.6-2.3 0-3.9-1.6-3.9-4s1.5-4.1 3.7-4.1Zm1.7 3.3c-.1-1-.7-1.6-1.7-1.6s-1.5.6-1.6 1.6h3.3ZM20.5 6.3v1.4h-4.3V6.3h4.3Z" />
    </svg>
  );
}

const ICONS = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Facebook: Facebook,
  X,
  TikTok,
  Behance,
  Dribbble,
};

/**
 * Persistent across the whole page rather than scoped to Contact, so the social
 * links are reachable from wherever a reader stops.
 *
 * The year is read at render, not written down — a footer that says 2026 in
 * 2027 is the smallest possible way to look unmaintained.
 */
export function Footer() {
  return (
    <footer className="footer">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <a href="#hero" className="footer-mark" aria-label="Lespa — back to top">
            <Wordmark className="h-6 w-auto" />
          </a>

          <ul className="flex flex-wrap items-center gap-2">
            {socials.map((social) => {
              const Icon = ICONS[social.label];
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="social"
                    target="_blank"
                    rel="noreferrer noopener me"
                    aria-label={`${social.label} — opens in a new tab`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="footer-note">{site.handle}</p>
          <p className="footer-note">
            {`© ${new Date().getFullYear()} Lespa · Built with ${site.stack.join(", ")}`}
          </p>
        </div>
      </div>
    </footer>
  );
}
