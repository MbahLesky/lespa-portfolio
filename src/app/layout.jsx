import localFont from "next/font/local";

import { SiteFooter } from "@/components/layout/SiteFooter";
import { siteUrl } from "@/lib/site";
import "./globals.css";

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

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Lespa — A Graphic Designer who builds products",
  description:
    "I design brands that feel like you, then build the websites and apps they live in. Graphic designer and software engineer, based in Bamenda, Cameroon.",
  icons: {
    icon: [{ url: "/global_assets/lespa_icon_green_dark.svg", type: "image/svg+xml" }],
  },
};

export const viewport = {
  themeColor: "#0E1110",
};

/**
 * Dark-first and, in Phase 1, dark-only: the `dark` class is fixed on <html> and
 * there is no theme toggle. The footer lives here rather than in the page so it
 * persists across every route.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${saira.variable} ${ibmPlexSans.variable} dark`}>
      <body className="bg-background font-body text-content antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-50 focus:rounded-md focus:bg-surface focus:px-6 focus:py-4 focus:text-body-sm focus:text-content"
        >
          Skip to content
        </a>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
