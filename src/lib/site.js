/**
 * The site's public origin.
 *
 * Automatically detects:
 * 1. NEXT_PUBLIC_SITE_URL (custom domain or explicitly configured production URL)
 * 2. VERCEL_PROJECT_PRODUCTION_URL (injected by Vercel on production deployments)
 * 3. VERCEL_URL (injected by Vercel for preview deployments)
 * 4. Default fallback: https://lespa.vercel.app
 */
function resolveSiteUrl() {
  const custom = process.env.NEXT_PUBLIC_SITE_URL;
  if (custom && custom.trim().length > 0) {
    return custom.startsWith("http") ? custom.replace(/\/$/, "") : `https://${custom}`.replace(/\/$/, "");
  }

  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProd && vercelProd.trim().length > 0) {
    return `https://${vercelProd.replace(/\/$/, "")}`;
  }

  const vercelPreview = process.env.VERCEL_URL;
  if (vercelPreview && vercelPreview.trim().length > 0) {
    return `https://${vercelPreview.replace(/\/$/, "")}`;
  }

  return "https://lespa.vercel.app";
}

export const siteUrl = resolveSiteUrl();
