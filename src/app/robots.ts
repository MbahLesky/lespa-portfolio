import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Development harness and the form endpoint — nothing to index.
      disallow: ["/system-test", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
