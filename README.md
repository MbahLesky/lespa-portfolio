# Lespa Portfolio

Single-page, dark-only portfolio for Mbah Lesky (Lespa). Next.js App Router,
JavaScript (no TypeScript in `src/`), Tailwind CSS, Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Phase 1 scope

One page, one theme. Sections in order: Hero, Intro, Selected Work, What I Do,
Process, About, Contact — plus a persistent footer that renders at every scroll
position.

There are deliberately no other routes. Dedicated project/case-study pages, an
About page and the mentorship track are Phase 2, and the full motion layer is
Phase 3. Dark mode is fixed on `<html>`; there is no theme toggle in Phase 1.

## Where things live

| Path | Holds |
|---|---|
| `src/app/page.jsx` | Composes the seven sections. |
| `src/app/layout.jsx` | Fonts, metadata, the persistent footer. |
| `src/app/globals.css` | Every design token, as CSS variables from `docs/core-visual.md`. |
| `tailwind.config.ts` | Maps Tailwind tokens onto those variables. No hex literals. |
| `src/content/copy.js` | Every word on the page, verbatim from the locked copy doc. |
| `src/content/projects.js` | The six projects, their per-project brand colours and live URLs. |
| `src/components/sections/` | One component per section. |
| `src/components/shared/` | Typewriter, cursor-follow, scroll reveal, pattern backdrop, emphasis. |

## Conventions

- **No colour literals in components.** Components use Tailwind tokens; the tokens
  resolve to CSS variables in `globals.css`. Translucent shades are their own
  tokens (`accent-soft`, `project-soft`) because Tailwind's slash-opacity syntax
  cannot apply to a hex-valued custom property.
- **8px spacing scale only** (4px for micro-adjustment), per `docs/core-visual.md`.
- **Copy changes start in `docs/lespa-restructure-copy.md`,** then land in
  `src/content/copy.js`. That document is locked; nothing is paraphrased.
- **The hero's reveal rhythm lives in the copy, not the component.**
  `hero.headlineSegments` and `hero.roleSegments` are the typing beats;
  `hero.subtextPhrases` are the phrases the subtext arrives in. Each list joins
  back to its sentence, so regrouping cannot drop or alter a word. Timing knobs
  are the labelled block at the top of `Hero.jsx`.
- **Selected Work themes per project.** Each card scopes its own `--project`
  colour, and its title, tags, link and hover glow read from it rather than the
  site green. A project renders a link only where a live URL exists.
- **One gradient for the whole page.** It is painted once on `body`, fixed to the
  viewport, so no seam appears at a section boundary. Sections are transparent;
  anything that needs to read as a surface uses `.glass` over it. A fixed
  pointer-reactive wash (`BackdropField`) sits above the gradient and below the
  content, and swells while the pointer is dragged.
- **Sections snap.** `scroll-snap-type: y proximity` on `html`, `.snap-section` on
  each section. Proximity rather than mandatory, so sections taller than the
  viewport still scroll freely.
- **Selected Work turns vertical scroll into project-stepping.** The section is six
  viewports tall with a pinned stage inside; scrolling swaps which project shows,
  and reaching either end releases to the neighbouring section. Native scroll —
  no wheel interception. All six cards stay in the DOM so every project is in the
  HTML; the five inactive ones are `inert` and hidden from assistive tech.
- **Cards vs. blended backgrounds are never the same treatment.** The About photo
  and the Selected Work images are cards. Everything else — the pattern on Intro,
  What I Do and Process, and the split design/code compositions behind the Hero
  and About — is blended into the background with no border and no shadow.
- **Process lays each step's description over its media,** not above it, so the
  pane costs one image's height rather than two blocks. `max-h-pane` caps it so
  no step can push the section past the viewport.
- **About's left column is sticky** while the story scrolls past it. Neither it
  nor the Process pane can stick if an ancestor has `overflow-hidden`, which is
  why neither section carries it — the backdrops clip themselves instead.
- **Reach Out shows a sample exchange, not an image.** The other four Process
  steps reveal an image; the first reveals `process.reachOutExchange` drawn as a
  messaging thread (`ChatExchange`). The message text is locked copy; the times
  and the day divider are the mock's chrome and can be changed freely. `from`
  decides the side — `"lespa"` is the phone's owner, right and green.
- **Project cards carry two independent hovers.** `group/card` — anywhere on the
  card — fades in that project's blended backdrop and lights its glow.
  `group/photo` — the mockup frame only — crossfades the mockup to that project's
  sketch. Hovering the copy does not change the image.

## Outstanding

Every image slot holds a real existing Lespa image chosen to fit it — there are
no placeholder frames anywhere. Slots still waiting on their intended asset carry
a `// TODO: asset needed —` comment naming the item in
`docs/lespa-restructure-assets.md`: four Process step images (Reach Out uses the
sample exchange instead), updated project
mockups, the final About portrait and split-background fragments, the tool icon
set, and the social icon set.

The contact section's email is the personal address on file, marked
`TODO: confirm` in `src/content/copy.js`.

The contact form validates on both sides but does not deliver yet —
`src/app/api/contact/route.js` logs and acknowledges. Wire a mail provider and
test end to end before launch.

## SEO

`src/lib/seo.js` builds the description and the JSON-LD from the same content
modules the page renders, so a search result and the page cannot describe
different things. The graph is a Person, a WebSite, a ProfilePage and an ItemList
of the six projects; `sameAs` comes from the footer's own social list. Metadata,
Open Graph and Twitter cards live in `app/layout.jsx`, alongside `sitemap.js`
and `robots.js`.

See `docs/README.md` for what each remaining document is for.
