import type { MetadataRoute } from "next";

import { projects } from "@/content/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projects", "/about", "/services"].map(
    (path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    // Case studies are the highest-value pages on the site.
    priority: project.tier === "case-study" ? 0.9 : 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
