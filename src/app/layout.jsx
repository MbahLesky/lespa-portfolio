import localFont from "next/font/local";

import { Footer } from "@/components/layout/Footer";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lespa.dev";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lespa — Brand & Product Designer, Developer | Bamenda, Cameroon",
    template: "%s | Lespa",
  },
  description:
    "I design brands, build the websites and mobile apps they live in, and teach you to run them. Custom-coded. Based in Bamenda, working worldwide.",
  icons: {
    icon: [
      {
        url: "/global_assets/lespa_icon_green_dark.svg",
        media: "(prefers-color-scheme: dark)",
        type: "image/svg+xml",
      },
    ],
  },
};

export const viewport = {
  themeColor: "#0E1110",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${saira.variable} ${ibmPlexSans.variable} dark`}
      suppressHydrationWarning
    >
      <body className="font-body antialiased bg-[var(--color-dark-background)] text-[var(--color-dark-text)]">
        <a href="#main" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        {children}
        <Footer />
      </body>
    </html>
  );
}
