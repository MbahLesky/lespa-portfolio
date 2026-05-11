"use client"

import Image from "next/image"
import { Menu, Moon, Sun, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { siteContent } from "@/content/content"
import { assets } from "@/lib/assets"
import { useTheme } from "@/lib/use-theme"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const updateScrolled = () => {
      setIsScrolled(window.scrollY > 8)
    }

    updateScrolled()
    window.addEventListener("scroll", updateScrolled, { passive: true })

    return () => window.removeEventListener("scroll", updateScrolled)
  }, [])

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", closeOnOutsideClick)
    document.addEventListener("keydown", closeOnEscape)

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [])

  function renderNavigationLinks() {
    return siteContent.nav.links.map((link) => (
      <Button key={link.href} asChild variant="ghost" size="sm">
        <a href={link.href} onClick={() => setIsMenuOpen(false)}>
          {link.label}
        </a>
      </Button>
    ))
  }

  return (
    <header
      ref={navRef}
      className="fixed inset-x-0 top-4 z-50 pointer-events-none px-4"
    >
      <div
        className={cn(
          "nav-glass container pointer-events-auto flex max-w-[1200px] items-center justify-between gap-4 rounded-lg border px-4 py-4 transition-colors md:px-6",
          isScrolled ? "border-border" : "border-transparent"
        )}
      >
        <a href="#top" aria-label="Go to top" className="shrink-0">
          <Image
            src={assets.logo.dark}
            alt="Portfolio wordmark"
            width={140}
            height={50}
            priority
            className="h-8 w-auto dark:hidden"
          />
          <Image
            src={assets.logo.light}
            alt="Portfolio wordmark"
            width={170}
            height={70}
            priority
            className="hidden h-8 w-auto dark:block"
          />
        </a>
        <div className="flex items-center gap-2">
          <nav aria-label="Main navigation" className="hidden items-center gap-2 md:flex">
            {renderNavigationLinks()}
          </nav>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            aria-pressed={isDark}
            onClick={toggleTheme}
          >
            <Moon className="h-4 w-4 dark:hidden" />
            <Sun className="hidden h-4 w-4 dark:block" />
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="md:hidden"
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={cn(
          "nav-glass container pointer-events-auto mt-2 grid max-w-[1200px] gap-2 rounded-lg border border-border p-4 transition-colors md:hidden",
          isMenuOpen ? "grid" : "hidden"
        )}
      >
        {renderNavigationLinks()}
      </nav>
    </header>
  )
}
