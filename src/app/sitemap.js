import { siteUrl } from "@/lib/site";

/**
 * One page. Phase 1 has no project, blog or about routes, so there is nothing
 * else to list — the sections are anchors on this URL, and anchors are not
 * sitemap entries.
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
