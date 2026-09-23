import { siteUrl } from "@/lib/site";
import { projects } from "@/content/projects";

/**
 * Generates sitemap.xml with canonical page URL, changefrequency, priority,
 * and indexed media assets for Google Image Search discovery.
 */
export default function sitemap() {
  const projectImages = projects
    .filter((project) => project.image)
    .map((project) => `${siteUrl}${project.image}`);

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      images: [
        `${siteUrl}/global_assets/lespa_pic1.webp`,
        `${siteUrl}/global_assets/social_share.webp`,
        `${siteUrl}/global_assets/lespa_laptop_design.webp`,
        ...projectImages,
      ],
    },
  ];
}
