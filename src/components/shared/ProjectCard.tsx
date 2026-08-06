import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectImage } from "@/components/shared/ProjectImage";
import { Heading } from "@/components/shared/Heading";
import { Tag } from "@/components/shared/Tag";
import { Text } from "@/components/shared/Text";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  /** Featured cards run 16:9 and span the grid; the rest are 4:3. */
  featured?: boolean;
  priority?: boolean;
  className?: string;
}

/**
 * A project card. The whole card is the link, not just the title.
 *
 * Shows the final image only in this phase — the hover-reveal crossfade to the
 * sketch is Phase 6.
 */
export function ProjectCard({
  project,
  featured = false,
  priority = false,
  className,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn("project-card group flex flex-col gap-4", className)}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-md",
          featured ? "ratio-16-9" : "ratio-4-3",
        )}
      >
        <ProjectImage
          src={project.images.final}
          alt={`${project.name} — ${project.outcome}`}
          name={project.name}
          priority={priority}
          sizes={
            featured
              ? "(min-width: 768px) 1200px, 100vw"
              : "(min-width: 768px) 600px, 100vw"
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <Heading as="h3" size="h4" className="project-card-title">
          {project.name}
        </Heading>

        <Text muted>{project.outcome}</Text>

        <span className="mt-2 inline-flex items-center gap-2 text-body-sm text-accent-fg">
          View case study
          <ArrowRight className="project-card-arrow h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
