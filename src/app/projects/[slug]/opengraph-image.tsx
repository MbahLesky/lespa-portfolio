import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { getProject, projects } from "@/content/projects";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Lespa case study";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  return ogImage({
    eyebrow: project ? `${project.client} · ${project.year}` : "Lespa",
    title: project ? project.outcome : "Work — Lespa",
  });
}
