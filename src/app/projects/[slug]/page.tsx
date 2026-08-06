import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudy } from "@/components/project/CaseStudy";
import { Showcase } from "@/components/project/Showcase";
import { caseStudies, showcases } from "@/content/case-studies";
import { getProject, projects } from "@/content/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.name} — ${project.outcome}`,
    description: project.outcome,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${project.outcome}`,
      description: project.outcome,
      type: "article",
      images: [{ url: `/projects/${project.slug}/opengraph-image` }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const content =
    project.tier === "case-study" ? caseStudies[slug] : showcases[slug];
  // Data and prose live in separate files, so a project can exist without its
  // write-up. Better a 404 than a page rendered with empty blocks.
  if (!content) notFound();

  /** CreativeWork structured data, per case study. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    abstract: project.outcome,
    creator: { "@type": "Person", name: "Mbah Lesky" },
    dateCreated: project.year,
    keywords: project.tags.join(", "),
    about: project.stack.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {project.tier === "case-study" ? (
        <CaseStudy
          project={project}
          content={content as (typeof caseStudies)[string]}
        />
      ) : (
        <Showcase
          project={project}
          content={content as (typeof showcases)[string]}
        />
      )}
    </>
  );
}
