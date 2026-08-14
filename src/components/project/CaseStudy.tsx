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
import type { Project } from "@/types";

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
 * The 13-block case study template.
 *
 * Body copy is held to the 760px reading measure; imagery breaks out to 1000px.
 * Block 10 (the before/after slider) is conditional — see below.
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
          {/* 03 */}
          <Block title="The problem" id="problem">
            {content.problem.map((paragraph) => (
              <Text key={paragraph.slice(0, 24)} size="lg" muted>
                {paragraph}
              </Text>
            ))}
          </Block>

          {/* 04 — the annotated before state. When no before image exists the
              description carries the block on its own, and block 10 is skipped
              rather than rendered broken. */}
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
                  name={project.name}
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
          <Block title="Research and constraints" id="research">
            {content.research.map((paragraph) => (
              <Text key={paragraph.slice(0, 24)} muted>
                {paragraph}
              </Text>
            ))}
          </Block>

          {/* 07 */}
          <div className="case-body">
            <KeyDecisionsBlock decisions={content.decisions} />
          </div>

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

          {/* 09 */}
          <section className="flex flex-col gap-6" aria-labelledby="after">
            <div className="case-body flex flex-col gap-6">
              <Heading as="h2" size="h3" id="after">
                After
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
                    name={project.name}
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
