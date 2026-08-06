/**
 * The site's public origin.
 *
 * Canonical URLs, the sitemap, and OG image URLs all have to be absolute, so
 * this needs to be right in production. Set NEXT_PUBLIC_SITE_URL in the
 * deployment environment; the fallback is a placeholder until the real domain
 * is registered.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lespa.dev"; // [MOCK] domain
