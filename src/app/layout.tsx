import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AppChrome } from "@/components/shared/AppChrome";
import { IntroSequence } from "@/components/shared/IntroSequence";
import { introScript } from "@/lib/intro-script";
import { SoundProvider } from "@/components/shared/SoundProvider";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
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
 * is a placeholder until the real domain is registered.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lespa.dev"; // [MOCK] domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Lespa — Brand & Product Designer, Developer | Bamenda, Cameroon",
    template: "%s | Lespa",
  },
  description:
    "I design brands, build the websites and mobile apps they live in, and teach you to run them. Custom-coded. Based in Bamenda, working worldwide.",
};

export const viewport: Viewport = {
  /**
   * The browser chrome colour. This is HTML metadata rather than a style, so it
   * cannot reference a CSS custom property — the value is duplicated from
   * --background in the dark theme and must be kept in step with it. Dark is
   * the default theme regardless of OS preference, so one value is correct.
   */
  themeColor: "#0E1110",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${saira.variable} ${ibmPlexSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        {/* Scroll reveals start at opacity 0 and are only ever un-hidden by
            script. Without JS the content must still be readable. */}
        <noscript>
          <style>
            {
              ".reveal,.enter,.enter-line>*,.enter-rule,[data-intro-target]{opacity:1!important;transform:none!important;animation:none!important}.intro{display:none!important}"
            }
          </style>
        </noscript>
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
          <SoundProvider>
          {/* First focusable element on every page. */}
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <IntroSequence />
          <AppChrome />
          <Navbar />
          {children}
          <Footer />
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
