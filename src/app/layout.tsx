import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

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
      <body className="font-body antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
