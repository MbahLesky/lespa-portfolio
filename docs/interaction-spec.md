# Lespa Portfolio — Design & Interaction Spec
**v1 · Build-ready · All values from CORE VISUAL.md**

---

## PART 1 — DESIGN PRINCIPLES FOR THIS SITE

Your notes and your brand docs agree on more than they disagree. Where they conflict, brand doc wins — that was your own rule.

**The five that govern every decision below:**

1. **Restraint is the aesthetic.** "Good design is as little design as possible" (your notes) and "calmly confident, never performative" (your brand doc) are the same instruction. Every effect must justify itself.
2. **Motion serves comprehension, not decoration.** If an animation doesn't help someone understand or navigate, cut it.
3. **Nothing dead-ends.** Every page pushes forward — especially case studies.
4. **The work is the design.** Your site should be quiet enough that the projects are the loudest thing on it.
5. **Mobile is not a downgrade.** Your Social-First rule applies. If an interaction only works with a mouse, it needs a touch equivalent or it doesn't ship.

---

## PART 2 — WHAT TO CUT FROM YOUR NOTES

Four items in your notes will actively hurt this site. Reasons given so you can overrule me if you disagree.

| Note | Verdict | Why |
|---|---|---|
| **Ambient sounds & audio** | Cut | Unprompted audio is one of the most reliably disliked patterns on the web. It also contradicts "quietly confident — you don't shout." A portfolio that makes noise is shouting. |
| **Autoplay animations & videos** | Cut autoplay, keep video | Autoplay costs load speed, mobile data, and battery. Use a poster frame + play on hover (desktop) or tap (mobile). Video stays; autoplay goes. |
| **Live chat widget** | Cut for v1 | Only works if you're actually there to answer. An unmanned chat bubble reads as abandoned. Your "reply within two days" promise does the same job honestly. |
| **Email capture + ebook lead magnet** | Defer to v2 | A newsletter signup on a portfolio with no case studies yet is asking for commitment before proving value. Revisit once you have 3 case studies and something worth sending. |

**One note that needs reframing:** your notes say both *"Don't have long scrolling page / have pages"* and *"design like a carousel."* The hybrid structure we agreed on resolves this — homepage scrolls (but earns each section), case studies get their own pages.

---

## PART 3 — THE SIGNATURE INTERACTION

Every portfolio worth remembering has one thing people describe afterwards. Pick **one**. More than one and none of them land.

### Recommended: the hover-reveal project card

This is already in your notes and it's the strongest idea there, because it's not decoration — it demonstrates your process in a single gesture.

**Behaviour**
- Default: final polished output, full colour
- Hover: crossfade to the wireframe, sketch, or before-state
- Duration: 350ms, ease-out
- A small persistent label — `Hover to see the sketch` — on first card only, so people discover it
- Mobile: replace with a two-frame toggle. Small pill button labelled `Final / Sketch` in the card corner. Tap switches. No hover dependency.

**Why it's the right one:** it says "I show my work" without a single word of copy. It's also unusual enough to be memorable and cheap enough to build in an afternoon.

**Implementation:** two stacked images, opacity crossfade, `will-change: opacity`. Preload the second image on card mount so the reveal is instant. If the sketch image hasn't loaded, don't run the interaction at all — a broken reveal is worse than none.

### Rejected alternatives (documented so you don't relitigate)

- **Cursor-follow effects** — overdone, breaks on touch, adds nothing
- **Full-page scroll-jacking** — actively hostile to fast readers
- **The Graphic Designer / Web Designer text swap from your notes** — it's a nice idea, but you have *three* roles and a rotating word makes your positioning feel indecisive. Your H1 already states all three cleanly. If you want it somewhere, use it in the loading transition instead.

---

## PART 4 — MOTION SYSTEM

One system, used everywhere. Consistency of motion is as much a brand signal as consistency of colour.

### Timing tokens
```
--duration-fast     150ms   hover states, button feedback
--duration-base     250ms   most transitions
--duration-slow     400ms   section reveals, page transitions
--duration-reveal   350ms   the project card crossfade

--ease-out          cubic-bezier(0.16, 1, 0.3, 1)     entrances
--ease-in-out       cubic-bezier(0.65, 0, 0.35, 1)    movements
```

Nothing exceeds 400ms. Anything slower feels like the site is thinking.

### Scroll reveals
- Fade from `opacity: 0` and `translateY(16px)` to full
- 400ms, ease-out
- Trigger when the element is 15% into the viewport
- **One reveal per section**, not per element. Staggered cascades of individual items feel fussy and delay reading.
- **Fires once.** Never re-animate on scroll-up — that's disorienting on the way back.

### Hover states
| Element | Behaviour |
|---|---|
| Primary button | Background `#0D6D2B` → `#0F8A36`, 150ms. No lift, no shadow. |
| Secondary button | Border brightens, background fills to 8% white, 150ms |
| Project card | Image crossfade to sketch (350ms) + title shifts to accent green (150ms). No scale, no shadow. |
| Text link | Underline draws left-to-right, 200ms |
| Nav item | Opacity 0.7 → 1, 150ms |

**Note on cards:** your notes list "sticky, bento grid, hover effects, background colour change" as a set. Applying all four at once is exactly the clutter your KISS note warns about. The crossfade alone is enough.

### Page transitions
- 250ms fade out, 250ms fade in
- No slide, no wipe, no curtain
- Scroll resets to top on navigation, except when returning to `/projects` — restore scroll position there so people don't lose their place after viewing a case study

### Loading transition
Your notes ask for one. Keep it minimal and only on first visit:
- Wordmark centred on `#0E1110`, fades in over 300ms
- Holds until content is ready, max 800ms
- Fades out, content fades in
- **Session-stored** — shows once, never again during that visit
- If assets load in under 400ms, skip it entirely. A loading screen for a site that's already loaded is theatre.

### Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
Content must be fully visible and fully functional with all motion disabled. The hover-reveal falls back to a static toggle.

---

## PART 5 — LAYOUT SYSTEM

### Grid
| Breakpoint | Columns | Margin | Gutter |
|---|---|---|---|
| Desktop ≥1280px | 12 | 120px | 24px |
| Laptop 1024–1279px | 12 | 80px | 24px |
| Tablet 768–1023px | 8 | 48px | 24px |
| Mobile <768px | 4 | 24px | 16px |

Max content width: 1200px. Reading-heavy blocks (case study body, About): 680–760px.

### Vertical rhythm
```
Major section breaks    120px desktop / 80px mobile
Standard sections       96px desktop / 64px mobile
Within-section blocks   48px
Related elements        24px
Tight pairs             16px
```

### Section rhythm — the scroll experience
Alternate background treatment so the page has a pulse. Never two identical adjacent sections.

```
Hero            Brand gradient + pattern    dark, heavy
Approach        Dark surface                calm
Selected Work   Dark background             the main event
Services        Dark surface                calm
Process         Dark background             structured
Proof           Warm Sand #EDE7DB           ← warm break
About           Warm Sand #EDE7DB           ← the human moment
Final CTA       Brand gradient + pattern    closes as it opened
Footer          Dark background             quiet
```

The two Warm Sand sections back-to-back create one deliberate warm block in the lower third — the human part of the page. Hero and CTA share a treatment, which bookends the scroll.

This is your notes' "background colour change," done systematically instead of per-scroll.

---

## PART 6 — COMPONENT SPECIFICATIONS

### Navigation
- Sticky, but **hides on scroll down, reappears on scroll up.** Gives full screen to the work while keeping nav one gesture away.
- Height 72px desktop, 64px mobile
- Background: transparent at top, `#0E1110` at 92% with backdrop blur once scrolled past 80px. 250ms transition.
- Active page: accent green underline, 2px
- Mobile: full-screen overlay menu. Links at H4 size, generous spacing, animate in with a 40ms stagger. This is the one place stagger is justified — it's a short list and it covers the transition.

### Buttons
```
Primary
  Background   #0D6D2B → #0F8A36 on hover
  Text         #FFFFFF
  Padding      16px vertical, 32px horizontal
  Radius       8px
  Font         IBM Plex Sans Medium 16px
  Focus        2px offset outline, accent green

Secondary
  Background   transparent
  Border       1px rgba(255,255,255,0.15) → 0.30 on hover
  Text         #E7ECE9
  Same padding, radius, font

Text link
  Colour       #2FA86A on dark, #0D6D2B on light
  Underline    draws in on hover, 200ms
```

Minimum touch target 44×44px everywhere.

### Project card
```
Structure
  Image container   4:3, radius 12px, overflow hidden
  ├─ Final image    default
  └─ Sketch image   opacity 0, crossfades in on hover
  Meta row          role tags — small, muted, 8px gap
  Title             Saira Medium 24px
  Outcome line      IBM Plex Sans Light 16px, secondary text
  Arrow             → shifts 4px right on hover, 150ms

Card padding    0 (image bleeds to card edge)
Gap between     32px desktop, 24px mobile
Grid            2-column desktop, 1-column below 768px
Entire card is the link. Not just the title.
```

**Bento variation:** if you want the layout from your notes, make the first project span both columns with a 16:9 image, then the rest in a 2-column grid. That single asymmetry gives the grid character without becoming a puzzle. Don't do a full bento of five different sizes — with only five projects it reads as arbitrary.

### Case study page
```
Hero            Full-bleed image, 70vh, title overlaid bottom-left
Meta bar        Sticky under nav — Role · Timeline · Tools · Client
                Collapses to a single line on mobile
Body            760px max width, centred
Images          Break out to 1000px — wider than text, so they
                punctuate rather than interrupt
Pull quotes     Saira 32px, accent green, 64px vertical margin
Next project    Full-bleed, edge to edge, at the very bottom
```

**The "next project" block is non-negotiable** — it's in your notes and it's correct. Nobody should reach the bottom of a case study with nothing to do. Full-bleed image, project name, `Next →`. It should be the most visually prominent thing on the lower half of the page.

Add a **reading progress bar** at the very top: 2px, accent green, fills as you scroll. Case studies are long; people want to know how long.

### Micro-CTAs
From your notes — small conversational prompts placed between sections rather than saving all asking for the end:

- After Selected Work → `Want something like this? →`
- After Process → `Curious what your project would look like? →`
- After About → `Still reading? Let's talk. →`

Style them as text links at Body S, secondary colour, not buttons. They're invitations, not demands. **Maximum three on the page.**

---

## PART 7 — IMAGERY & MOCKUPS

Your notes are emphatic about this, and rightly — mockup quality is the fastest read on whether a designer is good.

**Rules**
- Vary the environment. Not five identical laptop-on-desk shots. Mix: device in hand, screen close-up, print/brand application, flat UI frame with no device at all.
- Every screen shows **real content**. No lorem ipsum, ever. It's the single clearest amateur signal.
- Consistent lighting and perspective within a project, varied across projects.
- Export at 2x, compress hard. WebP with JPG fallback.
- `loading="lazy"` on everything below the fold, `priority` on the hero only.
- Every image needs alt text that describes the work, not the file.

**On video:** your notes want animated mockups. One short screen-recording per case study — 15–30 seconds, muted, looping, poster frame, plays on hover or tap. Not on the homepage. Not autoplay.

---

## PART 8 — ACCESSIBILITY

Non-negotiable, and it's also craft — your Values doc says "broken user experience is not acceptable."

- Contrast: WCAG AA minimum. **Check `#2FA86A` on `#0E1110`** — it should pass, but verify before shipping. `#0D6D2B` on dark will not pass and must not be used for text there.
- Focus visible on every interactive element. 2px offset outline, accent green. Never `outline: none` without a replacement.
- Full keyboard navigation. Tab order matches visual order. Skip-to-content link as the first focusable element.
- Semantic HTML: one `<h1>` per page, headings in order, real `<button>` and `<a>` elements.
- Alt text on every image. Decorative images get `alt=""`.
- Text never below 14px.
- Never rely on colour alone to convey meaning.
- All hover interactions have a touch or keyboard equivalent.

---

## PART 9 — PERFORMANCE BUDGET

| Metric | Target |
|---|---|
| Largest Contentful Paint | < 2.0s |
| Cumulative Layout Shift | < 0.1 |
| Interaction to Next Paint | < 200ms |
| Total page weight (homepage) | < 1.5MB |
| Lighthouse Performance | ≥ 90 |

**Practical rules**
- Self-host Saira and IBM Plex Sans. Subset to the weights you actually use. `font-display: swap`.
- Reserve dimensions on every image container to prevent layout shift.
- Pattern SVGs should be under 15KB each — optimise before shipping.
- Framer Motion only where needed; don't animate what CSS can handle.
- Run Lighthouse on mobile throttling, not desktop. Desktop scores lie.

**Your notes say "PDF portfolio, max 10MB."** Still true if you make one — but build the site first. A PDF is a fallback for applications that demand one, not a parallel product.

---

## PART 10 — WHAT MAKES THIS SITE YOURS

Everything above is craft. This is differentiation. Pick **two**, not all four.

**1. The sketch reveal** *(recommended — already covered)*
Demonstrates process in a gesture. Nobody else in your market is doing it.

**2. Show the system, not just the output**
You have a documented design system most designers never write down. One short section — or a `/system` page — showing your actual tokens, spacing scale, and type ramp, rendered live. It proves the "systems, not one-offs" claim instead of asserting it. Cheap to build; you already have the CSS variables.

**3. A "Decisions" module in every case study**
Three collapsed rows per project: *what I chose · what I rejected · why.* Expand on click. This is the section that gets people hired, and giving it a distinct visual treatment makes it findable.

**4. The 1-minute tour** *(from your notes — defer to v2)*
A short screen-recorded walkthrough with you narrating. Powerful, but it needs the site finished first. Note it and move on.

**My picks: 1 and 2.** They're both cheap, both prove claims you're already making, and neither depends on assets you don't have yet.

---

## PART 11 — BUILD ORDER FOR THE INTERACTION LAYER

Ship it working before you ship it delightful.

**Stage 1 — Structure works**
Static site, all content, responsive, accessible. No animation at all. **Deploy this.** A static site with real case studies beats an animated site with placeholders.

**Stage 2 — Core motion**
Scroll reveals, hover states, page transitions, motion tokens.

**Stage 3 — The signature**
Hover-reveal cards + mobile toggle. The system section.

**Stage 4 — Polish**
Loading transition, reading progress, micro-CTAs, next-project blocks.

**Stage 5 — Measure**
Analytics in, then check: where do people drop off, do case studies get read to the bottom, does anyone use the sketch toggle. Iterate on data, not taste.

---

## PART 12 — THE FINAL CHECK

Before you call it done, answer honestly:

- Can a stranger say what you do within 5 seconds of landing?
- Is there real work visible without scrolling past two screens?
- Does every project card link to something real?
- Would you send this to a client you badly wanted?
- Does it work on a mid-range Android over a slow connection?
- Is there a single typo anywhere? *(Your notes flag this. Read every line aloud.)*
- If you removed every animation, would it still be good?

That last one is the real test. Motion should make a good site better, never make a thin site look full.
