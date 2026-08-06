# BUILD PROMPT — Lespa Portfolio

---

## HOW TO USE THIS

**1. Put the reference documents in the repo first.** The agent can only read what's in the project.

```
/docs
  ├── design-spec.md        ← lespa-design-spec-v2.md
  ├── structure-spec.md     ← lespa-portfolio-spec.md
  ├── homepage-copy.md      ← lespa-homepage-copy.md
  ├── about-copy.md         ← lespa-about-section.md
  ├── mock-content.md       ← lespa-mock-content-and-specs.md
  └── core-visual.md        ← CORE VISUAL.docx, exported as markdown

/src/app/globals.css        ← globals.css (place before running)
/tailwind.config.ts         ← tailwind.config.ts (place before running)
```

**2. Run the phases one at a time.** Do not paste the whole prompt at once. Each phase ends in something you can look at. Review before continuing — an agent that runs six phases unsupervised produces six phases of compounding drift.

**3. Stop at the Phase 4 checkpoint and deploy.** Motion comes after the static site is real.

---

# ═══════════════════════════════════════
# THE PROMPT
# ═══════════════════════════════════════

## CONTEXT — read before executing any phase

You are a senior frontend engineer building a personal portfolio for **Lespa (Mbah Lesky)** — a designer, developer, and educator based in Bamenda, Cameroon.

**Stack:** Next.js (App Router, TypeScript), Tailwind CSS, Framer Motion, shadcn/ui, lucide-react, next-themes, react-hook-form, zod.

### Source of truth — read these before writing any code

| Document | Governs |
|---|---|
| `/docs/design-spec.md` | Typography, colour, motion, components, interactions |
| `/docs/structure-spec.md` | Site architecture, page structure |
| `/docs/homepage-copy.md` | Every word on the homepage |
| `/docs/about-copy.md` | The About section, final copy |
| `/docs/mock-content.md` | Project data, contact, footer, SEO, error states |
| `/docs/core-visual.md` | Raw brand values |
| `/src/app/globals.css` | Design tokens — already written, do not regenerate |
| `/tailwind.config.ts` | Token mapping — already written, do not regenerate |

### Conflict hierarchy

When documents disagree, resolve in this order:

```
1. design-spec.md          ← already resolves known conflicts, with reasoning
2. globals.css / tailwind.config.ts
3. core-visual.md
4. everything else
```

Three conflicts are **already resolved**. Do not revert them:
- **H2 is SemiBold 600**, not ExtraBold
- **Body text is Regular 400**, not Light
- **Two brand gradients:** Deep (`#0D6D2B → #075520`) for large surfaces, Lift (`#0D6D2B → #2FA86A`) for small accents only

### Absolute constraints

```
✗ No hex values in any component. Tokens only.
✗ No arbitrary spacing. 8px scale only — no mt-[22px].
✗ No #0D6D2B as text on dark. Fails contrast. Use #2FA86A.
✗ No scroll-snap-type: mandatory. Proximity only.
✗ No localStorage/sessionStorage assumptions beyond theme + sound preference.
✗ No lorem ipsum. Use the mock content provided.
✗ No pattern on cards, inputs, or small components. Gradients only.
✗ No drop shadows. Use inset borders for elevation.
✗ Nicomedia is NOT a web font. The wordmark is an SVG. Never load it.

✓ darkMode: "class". Dark is the default theme.
✓ Every animation under 400ms.
✓ Every interactive element keyboard accessible with visible focus.
✓ prefers-reduced-motion honoured throughout.
✓ Every hover interaction has a touch equivalent.
```

Produce working code. No TODOs, no pseudo-code, no placeholder comments describing work not done.

---

## PHASE 1 — SCAFFOLD & TOKENS

Read `/docs/design-spec.md` Parts 1 and 2 before starting.

**Structure**
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css              (already present — do not overwrite)
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── projects/page.tsx
│   ├── projects/[slug]/page.tsx
│   ├── about/page.tsx
│   ├── services/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/     Container, Navbar, Footer
│   ├── sections/   Section + homepage sections
│   ├── shared/     Heading, Text, Button, Tag, Reveal
│   └── ui/         shadcn
├── content/        projects.ts, copy.ts
├── lib/            utils, motion helpers
├── hooks/          useReveal, useSound, useScrollDirection
└── types/
```

**Tasks**
1. Verify `globals.css` and `tailwind.config.ts` are in place. Do not regenerate them.
2. Self-host **Saira** and **IBM Plex Sans** via `next/font/local`. Subset to Latin. Weights: Saira 400/500/600, IBM Plex Sans 400/500. Bind to `--font-heading` and `--font-body`. `font-display: swap`.
3. Root layout: `ThemeProvider` from next-themes, class-based, **dark as default**.
4. Populate `/src/content/projects.ts` from `/docs/mock-content.md` Part 1 — including the `getNextProject` cycler.
5. Confirm `/public/assets/pattern-light.svg` and `pattern-dark.svg` exist. If missing, generate simple geometric line patterns matching the reference — thin strokes, organic maze-like paths, single colour, tileable, under 15KB each.

**Output:** compiling project, fonts loading, tokens resolving, no visual work yet.

---

## PHASE 2 — PRIMITIVES

Read `/docs/design-spec.md` Part 2 (surfaces) and Part 9 (micro-interactions).

Build, using only tokens:

```
Container       Max-width + responsive padding. Wraps .container-base.

Section         variant: "gradient" | "brand" | "warm" | "flat" | "raised"
                pattern?: boolean
                spacing: "major" | "standard"
                Correct stacking: gradient → pattern 50% → content.
                Pattern only on gradient variants.

Heading         as: h1–h6, size override optional.
                Saira. Responsive: drops one step below md.

Text            size: "lg" | "base" | "sm" | "caption"
                muted?: boolean
                IBM Plex Sans.

Button          variant: "primary" | "secondary" | "ghost"
                Press: scale 0.98 / 100ms. No lift, no shadow.
                Min touch target 44×44.

Tag             Small pill. Border brightens on hover.
                NOT clickable in v1 — don't imply filtering that
                doesn't exist.

Reveal          Wrapper. IntersectionObserver at 15% threshold.
                Fires once. Adds .is-visible.
                Returns children unwrapped under reduced-motion.

Highlight       Inline span. .highlight (wash) or
                .highlight-underline. Max 3 per section.
```

**Output:** a `/system-test` route rendering every primitive, every variant, every state, both themes. This page is for you and gets deleted before launch.

---

## PHASE 3 — LAYOUT SHELL

**Navbar**
- SVG wordmark left, links right: Work · About · Services · Contact
- Theme toggle + sound toggle
- Height 72px desktop, 64px mobile
- Transparent at top → `#0E1110` at 92% with backdrop blur past 80px scroll, 250ms
- **Hides on scroll down, reappears on scroll up**
- Active page: 2px `#2FA86A` underline
- Mobile: full-screen overlay, links at H4, 40ms stagger in
- Skip-to-content as first focusable element

**Footer**
- Structure exactly as `/docs/mock-content.md` Part 4
- `© 2026 Lespa — Mbah Lesky` — **not LSA**
- Theme + sound toggles

**Output:** shell working on every route, both themes, mobile menu functional.

---

## PHASE 4 — HOMEPAGE, STATIC

**Zero animation in this phase.** Structure and content only.

Copy comes verbatim from `/docs/homepage-copy.md` and `/docs/about-copy.md`. Do not rewrite, expand, or improve it.

Section order and surface treatment per `/docs/design-spec.md` Part 2:

```
1   Hero              brand + pattern
2   Approach          gradient
3   Selected Work     flat #0E1110
4   Skills & Services gradient
5   Tools & Systems   raised #141A17
6   Methodology       gradient + pattern
7   Proof             warm
8   About             warm
9   Final CTA         brand + pattern
10  Footer            flat
```

**Hero** — headline is two lines:
```
Line 1    I am Lespa.
Line 2    A Graphic Designer who builds the products too.
```
Render line 2 **statically** in this phase. The role swap is Phase 6.
Fixed-width container around the swapping words, sized to the longer of "Graphic Designer" / "Web Developer" — no layout shift later.

**Selected Work** — asymmetric bento: project 1 spans full width at 16:9, projects 2–5 in a 2-column 4:3 grid. Single column below 768px. Cards show final image only for now.

**Tools & Systems** — render the live token display: colour swatches with hex labels, the type ramp at real sizes, the 8px spacing scale as bars. **Read from CSS variables at runtime, not hardcoded.**

**Methodology** — four phases with `Output:` lines, per `/docs/design-spec.md` Part 4.

**About** — copy exactly as `/docs/about-copy.md`. Photo placeholder at 4:5, correct dimensions reserved. Beliefs block as a two-column text list with `#E4EAE6` dividers above and below — **not cards**. Value names in accent green, three only.

### ▶ CHECKPOINT — DEPLOY HERE

Before continuing:
- [ ] Lighthouse ≥ 90 on mobile throttling
- [ ] No hex outside `globals.css`
- [ ] Full keyboard navigation
- [ ] Both themes correct
- [ ] Real mid-range Android tested

**Deploy this.** A static site with real structure beats an animated site with placeholders. Do not proceed until it is live.

---

## PHASE 5 — PROJECT PAGES

Read `/docs/design-spec.md` Part 5.

**`/projects`** — full grid, all five, same card component as the homepage.

**`/projects/[slug]`** — two tiers driven by `project.tier`:

```
tier: "case-study"    13-block template, design-spec.md Part 5
tier: "showcase"      Hero, meta bar, 4–6 images, ~100 words, next project
```

Case study blocks, in order:
```
01 Hero (full-bleed, 70vh)      08 The System
02 Meta bar (sticky under nav)  09 After
03 The Problem                  10 Before ↔ After slider
04 Before (annotated)           11 Outcomes
05 What I Did                   12 What I'd Do Differently
06 Research & Constraints       13 Next Project (full-bleed)
07 Key Decisions (expandable)
```

**Requirements**
- Body constrained to 760px. Images break out to 1000px.
- Reading progress bar: 2px, top, Brand Lift gradient.
- **Key Decisions**: expandable rows, `Chose → Rejected → Why`. Native `<details>` or accessible disclosure. Keyboard operable.
- **Before/After slider**: draggable divider, plus tap-to-toggle on mobile. **If `project.images.before` is undefined, render the annotated description instead and skip the slider entirely.** Do not render a broken slider.
- **Next Project**: full-bleed, mandatory, cyclic via `getNextProject`. Dimmed 40% → 80% on hover, image scale 1.02. Include a `2 of 5` indicator.
- Sticky bottom bar at 80% scroll: `Next: [Project] →`, dismissible.

Content from `/docs/mock-content.md` Part 2. All of it is placeholder — keep `[MOCK]` markers visible in the source so they are findable later.

---

## PHASE 6 — MOTION

Read `/docs/design-spec.md` Parts 3, 8, and 9.

**Order matters — build in this sequence:**

1. **Scroll reveals** — one per section, 15% threshold, fires once, never re-animates on scroll-up.
2. **Hover states** — buttons, cards, links, nav, per the Part 4 table.
3. **Page transitions** — 250ms fade out / fade in. No slide. Scroll resets to top, except returning to `/projects` where position is restored.
4. **Role swap** —
   ```
   State A   A Graphic Designer who builds the products too.
   State B   A Web Developer who designs them first.

   Out: fade + translateY(-8px), 200ms ease-in
   Gap: 100ms
   In:  fade + translateY(8px → 0), 250ms ease-out
   Hold 3500ms · first swap at 1400ms · stops after 4 cycles on State A
   Swapping word only. Fixed-width container. Zero layout shift.
   Swapping word #2FA86A, rest #E7ECE9.
   aria-live="off" + visually-hidden static line:
     "I am Lespa, a graphic designer and web developer."
   Reduced motion: static State A.
   ```
5. **Hover-reveal cards** — crossfade final → sketch, 350ms. Preload sketch on mount; **if it hasn't loaded, don't run the interaction at all.** Mobile: `Final / Sketch` pill toggle in the card corner.
6. **Text highlight** — max 3 per section, positioning phrases only, never on links. Mobile: fires on scroll-into-view, once, then persists.
7. **Section colour interpolation** — backgrounds transition over 600ms between sections.
8. **Soft snap** — `proximity`, `scroll-snap-stop: normal`. **Never mandatory.**
9. **Progress rail** — right edge, desktop only, one dot per section, clickable, fades after 2s idle.
10. **Micro-interactions** — form focus, copy-to-clipboard, image blur-up, number count-up, arrow shifts.
11. **Loading transition** — wordmark on `#0E1110`, session-stored, max 800ms, **skipped entirely if assets load under 400ms**.
12. **Micro-CTAs** — maximum three, after Work / Methodology / About. Text links, not buttons.

---

## PHASE 7 — CONTACT, SEO, ERROR STATES

Read `/docs/mock-content.md` Parts 3, 5, and 6.

**Contact** — react-hook-form + zod.
- Validate **on blur**, never on keystroke
- Errors below field, with icon — never colour alone
- Submit: spinner → checkmark → confirmation. Replace the form entirely on success.
- Failure: keep all fields populated, show error, offer direct email
- Honeypot hidden via CSS, not `display:none`
- `aria-describedby` linking errors to fields

**SEO** — metadata per page, OG images at 1200×630 (Brand Deep + pattern + wordmark + title), `Person` schema on home, `CreativeWork` per case study, sitemap, robots, canonicals.

**Error states** — 404 and 500 per spec. Image fallback: solid `--surface` block at correct ratio with project name in muted text. Never a broken-image icon.

---

## PHASE 8 — SOUND

Read `/docs/design-spec.md` Part 10. **Every rule below is non-negotiable.**

```
Default OFF. Always.
Toggle in nav and footer. Choice persists via localStorage.
Disabled entirely on touch devices.
Disabled under prefers-reduced-motion.
Preload on toggle-on, never on page load.
Web Audio API, not <audio>.
Debounce hover sounds at 80ms.
One sound at a time — later cancels earlier.
Total payload under 40KB.
Never during scroll.

Five sounds only:
  Button hover      8%   40ms
  Button click     12%   80ms
  Card hover        6%  120ms
  Page transition  10%  200ms
  Form success     15%  300ms

Character: organic, dry, wooden. No digital beeps, no synth,
no discernible musical pitch.
```

---

## PHASE 9 — AUDIT

Run the full checklist in `/docs/mock-content.md` Part 8. Fix every failure before reporting done.

Additionally:
- Delete `/system-test`
- Verify `#2FA86A` on `#0E1110` passes WCAG AA at 16px
- Grep for hex values outside `globals.css` — there must be none
- Grep for arbitrary Tailwind values (`[` in class strings) — there must be none
- Confirm every case study links to a next project
- Disable all JavaScript and confirm content is still readable
- Test on a real mid-range Android over throttled mobile data

**Report:** what passed, what failed, what you changed. Do not report done with open failures.

---

# ═══════════════════════════════════════

## PER-PHASE SHORT PROMPT

If your tool works better with brief instructions:

```
Read /docs/design-spec.md, /docs/structure-spec.md, and
/docs/mock-content.md before starting.

Execute PHASE [N] of /docs/build-prompt.md.

Constraints: no hex outside globals.css, 8px spacing scale only,
tokens only, dark default, every animation under 400ms,
prefers-reduced-motion honoured, keyboard accessible throughout.

Where documents conflict, design-spec.md wins.

Working code only. No TODOs.
```
