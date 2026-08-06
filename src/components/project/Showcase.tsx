import { Container } from "@/components/layout/Container";
import { MetaBar } from "@/components/project/MetaBar";
import { NextProject } from "@/components/project/NextProject";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ProjectImage } from "@/components/shared/ProjectImage";
import { Text } from "@/components/shared/Text";
import type { Showcase as ShowcaseContent } from "@/content/case-studies";
import type { Project } from "@/types";

/**
 * The short visual template: hero, meta bar, a paragraph of context, the
 * gallery, next project.
 *
 * Not every project warrants a full write-up, and pretending otherwise dilutes
 * the ones that do. Mixing tiers is the honest option.
 */
export function Showcase({
  project,
  content,
}: {
  project: Project;
  content: ShowcaseContent;
}) {
  // The final and sketch frames belong in the gallery too — a showcase wants
  // 4–6 images, and the data carries them separately from `gallery`.
  const images = [
    project.images.final,
    ...project.images.gallery,
    project.images.sketch,
  ];

  return (
    <main id="main">
      <ProjectHero project={project} />
      <MetaBar project={project} />

      <Container>
        <div className="flex flex-col gap-16 py-20">
          <div className="case-body">
            <Text size="lg" muted>
              {content.context}
            </Text>
          </div>

          <div className="case-wide grid gap-6 md:grid-cols-2">
            {images.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="ratio-4-3 relative w-full overflow-hidden rounded-md"
              >
                <ProjectImage
                  src={image}
                  alt={`${project.name} — ${index + 1}`}
                  name={project.name}
                  sizes="(min-width: 768px) 500px, 100vw"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>

      <NextProject slug={project.slug} />
    </main>
  );
}
