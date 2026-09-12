# Lespa Portfolio — Phase 1 Asset List
**Companion to lespa-restructure-structure-and-motion.md and lespa-restructure-copy.md**

Format guidance (per CORE VISUAL conventions): SVG for vector/logos/icons, PNG for UI screenshots and anything needing transparency, JPG for photo mockups.

---

## 1. HERO
- No new image assets required. Background is a CSS gradient (dark neutral tokens), not an image.
- *Optional:* custom cursor graphic, if the cursor-follow effect uses a shape/icon rather than a pure CSS/canvas dot or ring. Confirm whether this is needed before build.

## 2. INTRO
- Reuses the existing abstract SVG pattern asset (`pattern-dark.svg`, per CORE VISUAL — dark-first, so only the dark variant is needed for Phase 1).

## 3. SELECTED WORK (×6 projects)
For each of Monilog, Diwa, Ronixe, Qiroke, PikamGo, Yisi:
- [ ] **Updated project mockup/image** — replacing what's currently live. One per project (6 total).
- [ ] **Per-project primary brand color** (hex value) — needed for the title/link/tag color theming and hover glow. Not an image, but required data before this can be built. (E.g. Monilog's teal/mint, Diwa's palette, etc. — pull from each project's own brand system where documented.)

## 4. WHAT I DO
- Reuses the abstract SVG pattern asset (same as Intro).
- No per-card images specified in current spec — flag if you want an icon or mockup per card (Graphic Design / Web Development / Mobile Development) beyond the pattern background.

## 5. PROCESS (×5 steps)
- Reuses the abstract SVG pattern asset for the section background.
- [ ] **4 hover-reveal images**, one per remaining step (Research, Define, Design/Build, Present and Deploy) — abstract/illustrative placeholders, not literal photos. **Confirmed:** these stay generic, no project-specific real visuals needed (unlike Reach Out).
- [ ] **Reach Out step:** no static image needed here instead, a WhatsApp chatbot-style chat UI (the sample exchange already locked in the copy doc). **Needs:** WhatsApp background/wallpaper reference image from Lespa to match the styling.

## 6. ABOUT
- [ ] **Your photo** (card-mounted, not blended) — professional, per earlier note that the Adham-style hero image reference "should be more professional."
- [ ] **Background split composition** — real Lespa work, blended (not cards): a code/wireframe fragment on one side, a design/sketch fragment on the other, mirroring the Designer/Developer split. Must be authentic work, not stock.
- [ ] **Tool icon set** (12 total, as logo marks or simple icon chips):
  - Design: Adobe Photoshop, Adobe Illustrator, Adobe InDesign, Affinity, Canva, Figma
  - Development: HTML/CSS/JavaScript, React/Next.js, Tailwind CSS, Flutter, XAMPP, Firebase/Supabase
  - *Note:* these are typically available as standard brand-icon SVGs (e.g. via Simple Icons) rather than custom-made — flag if you want custom-styled versions instead of standard logo marks.

## 7. CONTACT
- No new image assets required.

## 8. FOOTER
- [ ] **Logo/wordmark** — already have this (Lespa wordmark + icon variants, light/dark, from earlier brand asset share).
- [ ] **Social icon set** (7): LinkedIn, GitHub, Facebook, X, TikTok, Behance, Dribbble — standard icon library is fine unless you want custom-styled versions.

## GLOBAL / SITE-WIDE
- [ ] **Favicon** — per your CORE VISUAL "Icon Extraction Rule," derived directly from the wordmark's cursor-modified "A," not redrawn separately. Already specified in brand docs; just needs exporting at favicon size.
- [ ] **OG/social share preview image** — not previously discussed, but standard for any live site (what shows up when the link is shared on social/WhatsApp). Flag if you want this in Phase 1 or deferred.

---

## PRIORITY ORDER (blocking → nice-to-have)
1. **Blocking for Selected Work:** 6 project mockups + 6 primary colors
2. **Blocking for About:** your photo + the code/design split background
3. **Blocking for Footer:** logo (have it) + favicon export
4. Tool icon set — can use standard library icons as a placeholder, swap later if custom versions wanted
5. Process step images — can ship with the pattern background only and add these in a pass after
6. OG image, custom cursor graphic — safe to defer past initial build
