import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/shared/Heading";
import { ProjectImage } from "@/components/shared/ProjectImage";
import { Text } from "@/components/shared/Text";
import type { Project } from "@/types";

/** Full-bleed hero at 70vh, title overlaid bottom-left. */
export function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="project-hero relative">
      <div className="absolute inset-0">
        <ProjectImage
          src={project.images.hero}
          alt=""
          name={project.name}
          sizes="100vw"
          priority
        />
      </div>
      <div className="project-hero-scrim absolute inset-0" />

      <Container className="relative flex h-full flex-col justify-end pb-12">
        <Heading as="h1">{project.name}</Heading>
        <Text size="lg" className="mt-4 max-w-reading text-content-secondary">
          {project.outcome}
        </Text>
      </Container>
    </section>
  );
}
