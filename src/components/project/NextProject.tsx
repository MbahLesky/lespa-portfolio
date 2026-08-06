import Link from "next/link";

import { Heading } from "@/components/shared/Heading";
import { ProjectImage } from "@/components/shared/ProjectImage";
import { Text } from "@/components/shared/Text";
import { getNextProject, getProjectPosition } from "@/content/projects";

/**
 * Full-bleed link to the next project. Mandatory on every project page —
 * nobody should reach the bottom with nothing to do.
 *
 * The order is fixed and cycles, so the last project leads back to the first
 * and the block never points at the page you are already on.
 */
export function NextProject({ slug }: { slug: string }) {
  const next = getNextProject(slug);
  const { index, total } = getProjectPosition(next.slug);

  return (
    <Link href={`/projects/${next.slug}`} className="next-project group block">
      <div className="ratio-16-9 relative w-full overflow-hidden">
        <div className="next-project-image absolute inset-0">
          <ProjectImage
            src={next.images.hero}
            alt=""
            name={next.name}
            sizes="100vw"
          />
        </div>
        <div className="next-project-scrim absolute inset-0" />

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
          <Text size="sm" className="text-content-secondary">
            Next project
          </Text>
          <Heading as="h2" className="text-content">
            {next.name} →
          </Heading>
          {/* Telling people how much is left increases the odds they continue. */}
          <Text size="caption" muted>
            {index} of {total}
          </Text>
        </div>
      </div>
    </Link>
  );
}
