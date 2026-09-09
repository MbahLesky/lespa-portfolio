import localFont from "next/font/local";

import { CursorFollow } from "@/components/phase1/CursorFollow";
import { Footer } from "@/components/phase1/Footer";
import "./globals.css";

/**
 * Self-hosted, latin-subset variable fonts. Nicomedia is deliberately absent —
 * the wordmark is an SVG and the face is never loaded as a web font.
 */
const saira = localFont({
  src: "../fonts/Saira-Variable-latin.woff2",
  variable: "--font-heading",
  weight: "400 600",
  style: "normal",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const ibmPlexSans = localFont({
  src: "../fonts/IBMPlexSans-Variable-latin.woff2",
  variable: "--font-body",
  weight: "400 500",
  style: "normal",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

/**
 * Canonical URLs have to be absolute, so metadata needs to know where the site
 * lives. Set NEXT_PUBLIC_SITE_URL in the deployment environment; the fallback
 * is the current deployment.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lespa.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Lespa — Graphic Designer & Developer | Bamenda, Cameroon",
  description:
    "I design brands that feel like you, then build the websites and apps they live in.",
  /**
   * The mark is drawn for each theme, so the tab icon follows suit.
   *
   * These key off the operating system rather than the site's own theme, and
   * that is correct: the icon sits in the browser's chrome, not on the page, so
   * it should match the chrome around it. favicon.ico stays as the fallback for
   * anything that will not take an SVG.
   */
  icons: {
    icon: [
      {
        url: "/global_assets/lespa_icon_green_light.svg",
        media: "(prefers-color-scheme: light)",
        type: "image/svg+xml",
      },
      {
        url: "/global_assets/lespa_icon_green_dark.svg",
        media: "(prefers-color-scheme: dark)",
        type: "image/svg+xml",
      },
    ],
  },
};

export const viewport = {
  /**
   * The browser chrome colour. HTML metadata rather than a style, so it cannot
   * reference a custom property — the value is duplicated from
   * --color-dark-background and must be kept in step with it. Phase 1 is dark
   * only, so one value is correct.
   */
  themeColor: "#0E1110",
};

/**
 * Phase 1 is dark only. `.dark` is on <html> so the class-based Tailwind theme
 * is already in the state a later light-mode phase would toggle out of, and
 * nothing has to move when the toggle arrives.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`dark ${saira.variable} ${ibmPlexSans.variable}`}>
      <body>
        {/* First focusable element on the page. */}
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        {/* Mounted here rather than in the hero so the ring survives the whole
            page — it initialises in the hero because that is the first thing on
            screen, not because it belongs to that section. */}
        <CursorFollow />

        {children}

        <Footer />
      </body>
    </html>
  );
}
