"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/shared/Button";

/**
 * Dark/light toggle. Lives in both the nav and the footer.
 *
 * Renders a fixed-size placeholder until mounted: the resolved theme is unknown
 * during SSR, and swapping the icon after hydration would otherwise shift the
 * layout around it.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className="block h-11 w-11" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      icon
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
    >
      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </Button>
  );
}
