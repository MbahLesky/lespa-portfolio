"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { SoundToggle } from "@/components/shared/SoundToggle";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Wordmark } from "@/components/shared/Wordmark";
import { nav } from "@/content/copy";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const { isScrolled, isHidden } = useScrollDirection();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the overlay on navigation so the menu never survives a route change.
  useEffect(() => setMenuOpen(false), [pathname]);

  /**
   * Project detail pages open on a full-bleed hero behind a transparent nav.
   * The hero scrim is dark in both themes, so the bar has to render on-dark
   * there — in light mode its normal dark-on-light text would disappear into
   * the image. Once the nav takes its own scrim, the usual treatment applies.
   */
  const overHero =
    /^\/projects\/[^/]+$/.test(pathname) && !isScrolled && !menuOpen;

  // Lock the page behind the full-screen menu.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition duration ease-smooth",
        // Auto-hide gives the full screen to the work; scrolling up brings it
        // back in one gesture. Never hides while the menu is open.
        isHidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
        (isScrolled || menuOpen) && "nav-scrim",
        overHero && "nav-over-hero",
      )}
    >
      <Container>
        <div className="nav-inner flex items-center justify-between gap-6">
          <Link
            href="/"
            className="flex min-h-11 items-center rounded-sm"
            aria-label="Lespa — home"
          >
            <span data-intro-target="wordmark" className="flex">
              <Wordmark height={26} forceDark={overHero} />
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn("nav-link text-body-sm", active && "is-active")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <SoundToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="btn-base btn-ghost btn-icon md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </Container>
    </header>

      {/* Full-screen overlay, deliberately a sibling of <header> rather than a
          child. The header carries a backdrop-filter and a transform, either of
          which makes it the containing block for fixed-position descendants —
          the overlay would size itself to the 64px bar instead of the viewport.

          The one place a stagger is justified: a short list, and the motion
          covers the transition. Mounted only while open so it replays. */}
      {menuOpen && (
        <div id="mobile-menu" className="mobile-menu md:hidden">
          <Container>
            <nav aria-label="Primary mobile">
              <ul className="flex flex-col gap-6">
                {nav.map((item, index) => (
                  <li
                    key={item.href}
                    className="mobile-menu-item"
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    <Link
                      href={item.href}
                      aria-current={
                        isActive(pathname, item.href) ? "page" : undefined
                      }
                      className={cn(
                        "nav-link font-heading text-h4-m",
                        isActive(pathname, item.href) && "is-active",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Container>
        </div>
      )}
    </>
  );
}
