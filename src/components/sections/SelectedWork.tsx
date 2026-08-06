import Link from "next/link";

import { Heading } from "@/components/shared/Heading";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Section } from "@/components/sections/Section";
import { SectionLabel, Text } from "@/components/shared/Text";
import { projects } from "@/content/projects";
import { selectedWork } from "@/content/copy";

/**
 * Asymmetric bento: the lead project spans the full width at 16:9, the rest run
 * 4:3 in two columns. One asymmetry, then rhythm — five different sizes would
 * read as arbitrary rather than composed.
 *
 * Flat surface, so the work images carry the section rather than a gradient.
 */
export function SelectedWork() {
  const [lead, ...rest] = [...projects].sort((a, b) => a.order - b.order);

  return (
    <Section
      variant="flat"
      spacing="major"
      id="work"
      data-tint="flat"
      aria-labelledby="work-heading"
    >
      <div className="flex flex-col gap-4">
        <SectionLabel>{selectedWork.label}</SectionLabel>
        <Heading as="h2" id="work-heading">
          {selectedWork.heading}
        </Heading>
        <Text muted className="max-w-reading">
          {selectedWork.subline}
        </Text>
      </div>

      <div className="mt-12 flex flex-col gap-8">
        <ProjectCard project={lead} featured priority hint />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <Link href={selectedWork.bottomLink.href} className="link-underline text-body">
          {selectedWork.bottomLink.label} →
        </Link>
      </div>
    </Section>
  );
}
