import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
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

export const metadata: Metadata = {
  title: {
    default:
      "Lespa — Brand & Product Designer, Developer | Bamenda, Cameroon",
    template: "%s | Lespa",
  },
  description:
    "I design brands, build the websites and mobile apps they live in, and teach you to run them. Custom-coded. Based in Bamenda, working worldwide.",
};

export const viewport: Viewport = {
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
        {/* Scroll reveals start at opacity 0 and are only ever un-hidden by
            script. Without JS the content must still be readable. */}
        <noscript>
          <style>{".reveal{opacity:1;transform:none}"}</style>
        </noscript>
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
          {/* First focusable element on every page. */}
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
