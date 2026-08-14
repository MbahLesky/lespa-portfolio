import type { Metadata } from "next";

import { Section } from "@/components/sections/Section";
import { Heading } from "@/components/shared/Heading";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { SectionLabel, Text } from "@/components/shared/Text";
import { selectedWork, workPage } from "@/content/copy";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Five client projects — brand systems, websites, and mobile apps. Case studies and showcases from Lespa, designer and developer in Bamenda, Cameroon.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const ordered = [...projects].sort((a, b) => a.order - b.order);

  return (
    <main id="main">
      <Section variant="gradient" spacing="major" className="below-nav">
        <div className="flex flex-col gap-4">
          <SectionLabel>{selectedWork.label}</SectionLabel>
          <Heading as="h1">{workPage.heading}</Heading>
          <Text muted className="max-w-reading">
            {workPage.intro}
          </Text>
        </div>
      </Section>

      <Section variant="flat" spacing="major">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {ordered.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              headingLevel="h2"
              priority={index < 2}
              hint={index === 0}
            />
          ))}
        </div>
      </Section>
    </main>
  );
}
