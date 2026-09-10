import { siteUrl } from "@/lib/site";

/**
 * Phase 1 is a single page — every section is an anchor on "/", so there is one
 * URL to list. Project and About pages arrive in Phase 2.
 */
export default function sitemap() {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
