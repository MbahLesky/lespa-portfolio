import {
  Dribbble,
  Facebook,
  Github,
  Linkedin,
  Music2,
  Palette,
  Twitter,
} from "lucide-react";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "X", href: "https://x.com", icon: Twitter },
  { label: "TikTok", href: "https://tiktok.com", icon: Music2 },
  { label: "Behance", href: "https://www.behance.net", icon: Palette },
  { label: "Dribbble", href: "https://dribbble.com", icon: Dribbble },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[var(--color-dark-background)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[var(--color-dark-surface)] text-xs font-medium tracking-[0.18em] text-[var(--color-dark-text)]">
            L
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-[var(--color-dark-text)]">Lespa</div>
            <div className="text-xs text-[var(--color-dark-muted)]">@iamlespa</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[var(--color-dark-surface)] text-[var(--color-dark-text)] transition hover:border-white/20"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <div className="text-right text-[10px] uppercase tracking-[0.2em] text-[var(--color-dark-muted)]">
          <div>© {year}</div>
          <div className="mt-1 text-[9px] tracking-[0.18em] text-[var(--color-dark-text)]">Built with Next.js, TypeScript, Tailwind CSS, Framer Motion.</div>
        </div>
      </div>
    </footer>
  );
}
