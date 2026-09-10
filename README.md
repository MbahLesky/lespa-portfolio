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
- **Selected Work themes per project.** Each card scopes its own `--project`
  colour, and its title, tags, link and hover glow read from it rather than the
  site green. A project renders a link only where a live URL exists.
- **Cards vs. blended backgrounds are never the same treatment.** The About photo
  and the Selected Work images are cards. Everything else — the pattern on Intro,
  What I Do and Process, and the split code/sketch composition behind About — is
  blended into the background with no border and no shadow.

## Outstanding

Assets still pending are marked in the code with `// TODO: asset needed —`
comments naming the item in `docs/lespa-restructure-assets.md`, and render a
visible "Asset pending" placeholder rather than a stand-in image. Currently: the
five Process step images, updated project mockups, the final About portrait and
split-background fragments, the tool icon set, and the social icon set.

The contact form validates on both sides but does not deliver yet —
`src/app/api/contact/route.js` logs and acknowledges. Wire a mail provider and
test end to end before launch.

See `docs/README.md` for which documents are current and which are superseded.
