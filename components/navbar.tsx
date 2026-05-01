"use client"

import Image from "next/image"
import { Moon, Sun } from "lucide-react"
import { useEffect } from "react"
import { siteContent } from "@/content/content"
import { assets } from "@/lib/assets"
import { Button } from "@/components/ui/button"

export function Navbar() {
  useEffect(() => {
    const stored = window.localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const nextTheme = stored ?? (prefersDark ? "dark" : "light")

    document.documentElement.classList.toggle("dark", nextTheme === "dark")
  }, [])

  function toggleTheme() {
    const nextIsDark = !document.documentElement.classList.contains("dark")
    document.documentElement.classList.toggle("dark", nextIsDark)
    window.localStorage.setItem("theme", nextIsDark ? "dark" : "light")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface">
      <div className="container flex max-w-[1200px] flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <a href="#top" aria-label="Go to top" className="shrink-0">
          <Image
            src={assets.logo.dark}
            alt="Portfolio wordmark"
            width={170}
            height={70}
            priority
            className="h-10 w-auto dark:hidden"
          />
          <Image
            src={assets.logo.light}
            alt="Portfolio wordmark"
            width={170}
            height={70}
            priority
            className="hidden h-10 w-auto dark:block"
          />
        </a>
        <div className="flex flex-wrap items-center gap-2">
          <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-2">
            {siteContent.nav.links.map((link) => (
              <Button key={link.href} asChild variant="ghost" size="sm">
                <a href={link.href}>{link.label}</a>
              </Button>
            ))}
          </nav>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <Moon className="h-4 w-4 dark:hidden" />
            <Sun className="hidden h-4 w-4 dark:block" />
          </Button>
        </div>
      </div>
    </header>
  )
}
