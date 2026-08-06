"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Class-based theming with dark as the default.
 *
 * enableSystem is off deliberately: the brand is dark-first, so a visitor on a
 * light-mode OS should still land on the dark treatment the site was designed
 * around. The toggle remains available in the nav and the footer.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
