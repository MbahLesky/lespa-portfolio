import localFont from "next/font/local";

import { SiteFooter } from "@/components/layout/SiteFooter";
import {
  buildJsonLd,
  jobTitle,
  locality,
  country,
  personName,
  siteDescription,
  siteName,
} from "@/lib/seo";
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

const title = `${personName} | ${jobTitle} in ${locality}, ${country}`;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    // Phase 2's project and About pages will set their own.
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: personName, url: siteUrl }],
  creator: personName,
  publisher: personName,
  keywords: [
    "graphic designer Cameroon",
    "brand identity designer",
    "logo design Bamenda",
    "web developer Cameroon",
    "Next.js developer",
    "Flutter developer",
    "UI UX designer",
    "Lespa",
    "Mbah Lesky",
  ],
  category: "Design & Development",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/global_assets/lespa_icon_green_dark.svg", type: "image/svg+xml" }],
    apple: [{ url: "/global_assets/lespa_icon_green_dark.svg" }],
  },
  openGraph: {
    type: "profile",
    firstName: "Mbah",
    lastName: "Lesky",
    username: "iamlespa",
    url: siteUrl,
    siteName,
    title,
    description: siteDescription,
    locale: "en_US",
    images: [
      {
        url: "/global_assets/social_share.webp",
        width: 1200,
        height: 630,
        alt: `${personName} — ${jobTitle}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteDescription,
    creator: "@iamlespa",
    images: ["/global_assets/social_share.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
      <head>
        {/* Structured data — who this is, what the site is, and the work on it.
            Built from the same content modules the page renders, so it cannot
            describe something the page does not say. */}
        <script
          type="application/ld+json"
          // The payload is our own content, serialised here; nothing user-supplied
          // reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
      </head>
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
