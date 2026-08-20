import { Container } from "@/components/layout/Container";
import { BeforeAfterSlider } from "@/components/project/BeforeAfterSlider";
import { KeyDecisionsBlock } from "@/components/project/KeyDecisions";
import { LiveSystem } from "@/components/project/LiveSystem";
import { MetaBar } from "@/components/project/MetaBar";
import { NextProject } from "@/components/project/NextProject";
import { ProjectHero } from "@/components/project/ProjectHero";
import { ReadingProgress } from "@/components/project/ReadingProgress";
import { StickyNextBar } from "@/components/project/StickyNextBar";
import { Heading } from "@/components/shared/Heading";
import { ProjectImage } from "@/components/shared/ProjectImage";
import { Text } from "@/components/shared/Text";
import type { CaseStudy as CaseStudyContent } from "@/content/case-studies";
import { getNextProject } from "@/content/projects";
import { fileLabel } from "@/lib/utils";
import type { Project } from "@/types";

/** A stable, linkable id from a block's title. */
const blockId = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function Block({
  title,
  id,
  children,
}: {
  title: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section className="case-body flex flex-col gap-6" aria-labelledby={id}>
      <Heading as="h2" size="h3" id={id}>
        {title}
      </Heading>
      {children}
    </section>
  );
}

/**
 * The case study template.
 *
 * A spine rather than a fixed thirteen blocks: problem, starting point, what I
 * did, research, decisions, system, what shipped, outcomes. Most of it is
 * optional, and each project carries its own named blocks for the parts that
 * are only true of it — a set of finalists, the mark, the interface, the build.
 * Forcing every project through the same thirteen headings produced blocks with
 * nothing in them, and the write-ups genuinely differ.
 *
 * Body copy is held to the 760px reading measure; imagery breaks out to 1000px.
 */
export function CaseStudy({
  project,
  content,
}: {
  project: Project;
  content: CaseStudyContent;
}) {
  const next = getNextProject(project.slug);
  const hasBefore = Boolean(project.images.before);

  return (
    <main id="main">
      <ReadingProgress />

      {/* 01 */}
      <ProjectHero project={project} />

      {/* 02 */}
      <MetaBar project={project} />

      <Container>
        <div className="flex flex-col gap-20 py-20">
          {/* 03 — not always a problem. Diwa opens on the client, because the
              engagement was a rework and the brief itself is confidential. */}
          <Block title={content.problemTitle ?? "The problem"} id="problem">
            {content.problem.map((paragraph) => (
              <Text key={paragraph.slice(0, 24)} size="lg" muted>
                {paragraph}
              </Text>
            ))}
          </Block>

          {/* 04 — the starting point.

              Not every project has one that can be shown. A greenfield brand
              had nothing before it; a project under a confidentiality rule had
              something that may not be described. Both say so in `brief`
              instead, and the before/after slider is skipped with them. */}
          {content.before && (
            <section className="flex flex-col gap-6" aria-labelledby="before">
              <div className="case-body flex flex-col gap-6">
                <Heading as="h2" size="h3" id="before">
                  Before
                </Heading>
                <Text muted>{content.before.description}</Text>
              </div>

              {hasBefore && (
                <div className="case-wide ratio-16-9 relative w-full overflow-hidden rounded-md">
                  <ProjectImage
                    src={project.images.before as string}
                    alt={`${project.name} before the redesign`}
                    name={fileLabel(project.images.before as string)}
                    sizes="(min-width: 1024px) 1000px, 100vw"
                  />
                </div>
              )}

              <ol className="case-body flex flex-col gap-3">
                {content.before.callouts.map((callout) => (
                  <li key={callout.marker} className="flex gap-4">
                    <Text size="sm" as="span" className="text-accent-fg">
                      {callout.marker}
                    </Text>
                    <Text as="span" muted>
                      {callout.text}
                    </Text>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {content.brief && (
            <Block title={content.brief.title} id="brief">
              {content.brief.body.map((paragraph) => (
                <Text key={paragraph.slice(0, 24)} muted>
                  {paragraph}
                </Text>
              ))}
            </Block>
          )}

          {/* 05 */}
          <Block title="What I did" id="what-i-did">
            <Text muted>{content.whatIDid}</Text>
            <div className="flex flex-wrap gap-2">
              {project.role.map((role) => (
                <Text key={role} size="caption" as="span" muted>
                  {role}
                </Text>
              ))}
            </div>
          </Block>

          {/* 06 */}
          {content.research && (
            <Block
              title={content.researchTitle ?? "Research and constraints"}
              id="research"
            >
              {content.research.map((paragraph) => (
                <Text key={paragraph.slice(0, 24)} muted>
                  {paragraph}
                </Text>
              ))}
            </Block>
          )}

          {/* 07 */}
          <div className="case-body">
            <KeyDecisionsBlock decisions={content.decisions} />
          </div>

          {/* Whatever this project has between the decisions and the system —
              a set of finalists, the mark itself. Named blocks rather than
              fixed fields, because they differ per project. */}
          {content.beforeSystem?.map((block) => (
            <Block key={block.title} title={block.title} id={blockId(block.title)}>
              {block.body.map((paragraph) => (
                <Text key={paragraph.slice(0, 24)} muted>
                  {paragraph}
                </Text>
              ))}
            </Block>
          ))}

          {/* 08 */}
          <Block title="The system" id="system">
            <Text muted>{content.system}</Text>
          </Block>

          {/* The system rendered from the live tokens, where the case study is
              about the system drawing the page. Full width: swatches and a type
              scale need the room, and this is the artefact, not an aside. */}
          {content.liveSystem && (
            <div className="case-wide">
              <LiveSystem />
            </div>
          )}

          {/* Whatever comes between the system and what shipped — the
              interface, the build. Same reasoning as beforeSystem. */}
          {content.afterSystem?.map((block) => (
            <Block key={block.title} title={block.title} id={blockId(block.title)}>
              {block.body.map((paragraph) => (
                <Text key={paragraph.slice(0, 24)} muted>
                  {paragraph}
                </Text>
              ))}
            </Block>
          ))}

          {/* 09 — what shipped. "After" only reads as after when there was a
              before; where there wasn't, the project names this block itself. */}
          <section className="flex flex-col gap-6" aria-labelledby="after">
            <div className="case-body flex flex-col gap-6">
              <Heading as="h2" size="h3" id="after">
                {content.afterTitle ?? "After"}
              </Heading>
              <Text muted>{content.after}</Text>
            </div>
            <div className="case-wide grid gap-6 md:grid-cols-2">
              {project.images.gallery.map((image, index) => (
                <div
                  key={image}
                  className="ratio-4-3 relative w-full overflow-hidden rounded-md"
                >
                  <ProjectImage
                    src={image}
                    alt={`${project.name} — final screen ${index + 1}`}
                    name={fileLabel(image)}
                    sizes="(min-width: 768px) 500px, 100vw"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* 10 — only when there is genuinely something to compare. */}
          {hasBefore && (
            <section className="case-wide flex flex-col gap-6" aria-labelledby="compare">
              <Heading as="h2" size="h3" id="compare" className="case-body">
                Before and after
              </Heading>
              <BeforeAfterSlider
                before={project.images.before as string}
                after={project.images.final}
                name={project.name}
              />
            </section>
          )}

          {/* 11 */}
          <Block title="Outcomes" id="outcomes">
            {content.outcomes.map((paragraph) => (
              <Text key={paragraph.slice(0, 24)} size="lg" muted>
                {paragraph}
              </Text>
            ))}
            {content.testimonial && (
              <figure className="flex flex-col gap-4 border-l border-border pl-6">
                <blockquote>
                  <Text size="lg">{content.testimonial.quote}</Text>
                </blockquote>
                <figcaption>
                  <Text size="sm" muted>
                    — {content.testimonial.name}, {content.testimonial.role}
                  </Text>
                </figcaption>
              </figure>
            )}
          </Block>

          {/* 12 */}
          {content.differently && (
            <Block title="What I'd do differently" id="differently">
              <Text muted>{content.differently}</Text>
            </Block>
          )}
        </div>
      </Container>

      {/* 13 */}
      <NextProject slug={project.slug} />

      <StickyNextBar name={next.name} href={`/projects/${next.slug}`} />
    </main>
  );
}
