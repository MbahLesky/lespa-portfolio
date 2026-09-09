# Lespa — portfolio

The portfolio of Mbah Lesky (Lespa), graphic designer and software engineer, Bamenda, Cameroon. Live at [lespa.vercel.app](https://lespa.vercel.app).

This is Phase 1 of the restructure: **one page, dark only, no light-mode toggle.**

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Stack

Next.js (App Router) · React · Tailwind CSS · Framer Motion · lucide-react · react-hook-form + zod.

**JavaScript, not TypeScript.** Every source file under `src/` is `.js`/`.jsx`. `tailwind.config.ts` and `next.config.ts` are build configuration and stay as they are; `tsconfig.json` is what resolves the `@/*` path alias.

## Layout

```
src/
  app/
    layout.jsx          fonts, metadata, skip link, cursor follow, footer
    page.jsx            the page — eight sections, in order
    globals.css         every design token, and every component class
    api/contact/route.js
    error.jsx  not-found.jsx  robots.js  sitemap.js  opengraph-image.jsx
  components/phase1/    one component per section, plus the shared primitives
  content/phase1.js     all copy, transcribed from the copy doc
  lib/                  contact schema, OG card, site origin, cn()
```

The sections, in the order they appear: Hero, Intro, Selected Work, What I Do, Process, About, Contact. The footer is in the layout, so it is persistent rather than part of Contact.

There are no `/projects`, `/blog` or `/about` routes. Every nav link is an anchor to a section on this page. `/contact` redirects to `/#contact` for anything still pointing at the old URL.

## Where the design decisions live

Four documents, in `docs/`, are the source of truth. Where they and the code disagree, they are right and the code is wrong:

| Document | Governs |
| --- | --- |
| [`core-visual.md`](docs/core-visual.md) | colour, type, spacing, the pattern |
| [`lespa-restructure-structure-and-motion.md`](docs/lespa-restructure-structure-and-motion.md) | structure, motion, background treatment |
| [`lespa-restructure-copy.md`](docs/lespa-restructure-copy.md) | every string on the site |
| [`lespa-restructure-assets.md`](docs/lespa-restructure-assets.md) | the asset checklist |

Everything else in `docs/` is marked either **SUPERSEDED — reference only** (it describes the multi-page site this replaced) or is project content — case studies and showcases — that Phase 1 does not build but a later phase will.

## Conventions

- **No colour literals outside `globals.css`.** Components reference tokens; tokens map to CSS custom properties. The one exception is `src/lib/og.jsx`, because Satori rasterises the share card server-side with no stylesheet to read.
- **8px spacing.** 4px only for micro-adjustment.
- **Copy comes from `src/content/phase1.js`,** never inline in a component, and never paraphrased from the copy doc.
- **A `// TODO: asset needed —` comment names the checklist item** wherever a placeholder is standing in for artwork that has not been supplied.

## What is still missing

Each of these is flagged in the code at the point where it is needed:

- **Per-project brand colours** for Diwa, Ronixe, Qiroke, PikamGo and Yisi. Only Monilog's is documented; the rest fall back to the site accent, which is exactly the theming Selected Work exists to avoid. Assets doc §3, blocking.
- **The five Process hover-reveal images.** Assets doc §5.
- **The About background split composition,** and a final photo. Assets doc §6.
- **Social profile URLs.** The seven platforms are named in the copy doc but no URLs are; the ones in place are derived from the handle and need confirming.
- **Contact delivery.** `src/app/api/contact/route.js` validates and logs; there is no mail provider wired up yet.
