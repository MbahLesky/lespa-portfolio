/**
 * The site's public origin.
 *
 * Canonical URLs and the OG image URL have to be absolute, so this needs to be
 * right in production. Set NEXT_PUBLIC_SITE_URL in the deployment environment.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lespa.vercel.app";
