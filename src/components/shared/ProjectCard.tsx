import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CardMedia } from "@/components/shared/CardMedia";
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
  /**
   * Semantic level for the project name. The homepage nests cards under a
   * section h2, so h3 is right there; on /projects the page h1 is the only
   * heading above them and h2 keeps the outline unbroken.
   */
  headingLevel?: "h2" | "h3";
  /** Shows the "hover to see the sketch" label. First card on a page only. */
  hint?: boolean;
  className?: string;
}

/**
 * A project card. The whole card is the link, not just the title.
 *
 * The media handles the hover-reveal crossfade and its touch equivalent; see
 * CardMedia.
 */
export function ProjectCard({
  project,
  featured = false,
  priority = false,
  headingLevel = "h3",
  hint = false,
  className,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn("project-card group flex flex-col gap-4", className)}
    >
      <CardMedia
        final={project.images.final}
        sketch={project.images.sketch}
        name={project.name}
        outcome={project.outcome}
        featured={featured}
        priority={priority}
        hint={hint}
      />

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {/* Said plainly and first, rather than left for the reader to work
              out from the client name further down the page. */}
          {project.selfInitiated && <Tag className="tag-self">Self-initiated</Tag>}
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <Heading as={headingLevel} size="h4" className="project-card-title">
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
