import { siteUrl } from "@/lib/site";
import { projects } from "@/content/projects";

/**
 * Sitemap structured strictly adhering to Next.js App Router MetadataRoute.Sitemap conventions.
 *
 * Generates sitemap.xml with canonical homepage, ISO lastModified timestamp,
 * high indexing priority, weekly change frequency, and media asset endpoints for image crawlers.
 */
export default function sitemap() {
  const projectImages = projects
    .filter((project) => Boolean(project.image))
    .map((project) => `${siteUrl}${project.image}`);

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1.0,
      images: [
        `${siteUrl}/global_assets/lespa_pic1.webp`,
        `${siteUrl}/global_assets/lespa_laptop_design.webp`,
        `${siteUrl}/global_assets/social_share.webp`,
        ...projectImages,
      ],
    },
  ];
}
