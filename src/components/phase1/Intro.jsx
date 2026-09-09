import { Emphasis } from "@/components/phase1/Emphasis";
import { Reveal } from "@/components/phase1/Reveal";
import { intro } from "@/content/phase1";

/**
 * Two or three sentences stating the position, on the pattern background.
 *
 * The pattern is blended — laid straight onto the gradient with no border and
 * no shadow, so it reads as part of the surface rather than as something placed
 * on it. See `.has-pattern` in globals.css for the layer order.
 */
export function Intro() {
  return (
    <section
      id="intro"
      className="section-pad has-pattern"
      aria-labelledby="intro-heading"
    >
      <Reveal className="mx-auto w-full max-w-3xl px-6 text-center">
        <h2 id="intro-heading" className="sr-only">
          Design and code are one job
        </h2>
        <p className="intro-body">
          <Emphasis text={intro.body} phrases={intro.emphasis} />
        </p>
      </Reveal>
    </section>
  );
}
