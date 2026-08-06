# Lespa Portfolio — Mock Content & Remaining Specs
**Everything marked `[MOCK]` is placeholder. Replace before launch.**

---

## PART 1 — MOCK PROJECT DATA

Structured so you can drop it straight into `content/projects.ts` and swap values later without touching components.

```ts
// src/content/projects.ts

export type Tier = "case-study" | "showcase";

export interface Project {
  slug: string;
  name: string;
  tier: Tier;
  order: number;
  featured: boolean;
  outcome: string;          // ≤ 12 words. What CHANGED.
  tags: string[];
  client: string;
  role: string[];
  timeline: string;
  year: string;
  stack: string[];
  images: {
    final: string;
    sketch: string;         // hover-reveal target
    hero: string;
    before?: string;        // before/after slider
    gallery: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "pikamgo",
    name: "Pikamgo",
    tier: "case-study",
    order: 1,
    featured: true,
    outcome: "Cut the booking flow from seven screens to three.",   // [MOCK]
    tags: ["Brand", "UI", "Development"],
    client: "Pikamgo",
    role: ["Brand Identity", "Product Design", "Frontend Development"],
    timeline: "6 weeks",                                            // [MOCK]
    year: "2025",                                                   // [MOCK]
    stack: ["Figma", "Next.js", "TypeScript", "Tailwind"],
    images: {
      final:   "/projects/pikamgo/final.webp",
      sketch:  "/projects/pikamgo/wireframe.webp",
      hero:    "/projects/pikamgo/hero.webp",
      before:  "/projects/pikamgo/before.webp",
      gallery: [
        "/projects/pikamgo/01.webp",
        "/projects/pikamgo/02.webp",
        "/projects/pikamgo/03.webp",
      ],
    },
  },
  {
    slug: "diwa",
    name: "Diwa",
    tier: "case-study",
    order: 2,
    featured: false,
    outcome: "One brand system across the app, the site, and print.", // [MOCK]
    tags: ["Brand", "Mobile"],
    client: "Diwa",
    role: ["Brand Identity", "Mobile UI", "Design System"],
    timeline: "5 weeks",                                              // [MOCK]
    year: "2025",                                                     // [MOCK]
    stack: ["Figma", "Flutter", "Dart"],
    images: {
      final:   "/projects/diwa/final.webp",
      sketch:  "/projects/diwa/wireframe.webp",
      hero:    "/projects/diwa/hero.webp",
      gallery: ["/projects/diwa/01.webp", "/projects/diwa/02.webp"],
    },
  },
  {
    slug: "qiroke",
    name: "Qiroke",
    tier: "case-study",
    order: 3,
    featured: false,
    outcome: "The team now ships new pages without a developer.",     // [MOCK]
    tags: ["UI", "Development"],
    client: "Qiroke",
    role: ["Product Design", "Frontend Development"],
    timeline: "4 weeks",                                              // [MOCK]
    year: "2024",                                                     // [MOCK]
    stack: ["Figma", "Next.js", "TypeScript"],
    images: {
      final:   "/projects/qiroke/final.webp",
      sketch:  "/projects/qiroke/wireframe.webp",
      hero:    "/projects/qiroke/hero.webp",
      gallery: ["/projects/qiroke/01.webp"],
    },
  },
  {
    slug: "ronixe",
    name: "Ronixe",
    tier: "showcase",
    order: 4,
    featured: false,
    outcome: "A visual identity built to survive scale.",             // [MOCK]
    tags: ["Brand"],
    client: "Ronixe",
    role: ["Brand Identity", "Logo Design"],
    timeline: "3 weeks",                                              // [MOCK]
    year: "2024",                                                     // [MOCK]
    stack: ["Illustrator", "Figma"],
    images: {
      final:   "/projects/ronixe/final.webp",
      sketch:  "/projects/ronixe/sketch.webp",
      hero:    "/projects/ronixe/hero.webp",
      gallery: ["/projects/ronixe/01.webp", "/projects/ronixe/02.webp"],
    },
  },
  {
    slug: "monilog",
    name: "Monilog",
    tier: "showcase",
    order: 5,
    featured: false,
    outcome: "Dashboard UI that non-technical staff can actually read.", // [MOCK]
    tags: ["UI"],
    client: "Monilog",
    role: ["Product Design"],
    timeline: "3 weeks",                                              // [MOCK]
    year: "2024",                                                     // [MOCK]
    stack: ["Figma"],
    images: {
      final:   "/projects/monilog/final.webp",
      sketch:  "/projects/monilog/wireframe.webp",
      hero:    "/projects/monilog/hero.webp",
      gallery: ["/projects/monilog/01.webp"],
    },
  },
];

/** Cyclic next — nobody dead-ends. */
export const getNextProject = (slug: string): Project => {
  const i = projects.findIndex(p => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
```

---

## PART 2 — MOCK CASE STUDY (Pikamgo)

Placeholder prose at the real target length, so you can build and see the layout breathe. **Every claim here is invented — replace all of it.**

```
─── 01 HERO ───
Pikamgo
Cut the booking flow from seven screens to three.

─── 02 META ───
Client Pikamgo · Role Brand, Product Design, Frontend
Timeline 6 weeks · Stack Next.js, TypeScript, Tailwind · 2025

─── 03 THE PROBLEM ───  [MOCK · ~80 words]
Pikamgo had customers, but they were losing most of them at
checkout. The booking flow ran seven screens deep, asked for
information twice, and gave no indication of progress. Support
was fielding the same three questions every day — all of them
answerable by the interface, if the interface had bothered to
answer them.

The brand had the same problem in a different form: three
different logos in circulation and no rule about which to use.

─── 04 BEFORE ───
[before.webp with annotated callouts]
① Seven steps, no progress indicator
② Payment details requested before pricing shown
③ No error recovery — one mistake restarts the flow

─── 05 WHAT I DID ───  [MOCK · ~50 words]
Full scope: brand identity, design system, and the frontend
build. The client's developer handled the backend and payment
integration. I owned everything the user sees.

─── 06 RESEARCH & CONSTRAINTS ───  [MOCK · ~80 words]
Six user sessions, all on mid-range Android over mobile data —
the actual conditions, not a desktop simulation. Two findings
reshaped the work: people abandoned when they couldn't see the
total, and most were booking one-handed while doing something
else.

Constraint: the existing backend couldn't be changed. Every
improvement had to happen in the interface layer.

[wireframes · user flow diagram]

─── 07 KEY DECISIONS ───  [MOCK]

  Chose      Three-step flow with a persistent price summary
  Rejected   Single-page form
  Why        Long forms test worse on mobile than short
             sequenced steps. Progress visibility mattered
             more than page count.

  Chose      Saira for headings
  Rejected   Inter
  Why        Needed technical character without coldness.
             Inter is clean but anonymous — it would have
             made the brand disappear.

  Chose      System-native date picker
  Rejected   Custom calendar component
  Why        Familiarity beat control. Users already knew
             how their own picker worked, and it removed an
             accessibility liability.

  Chose      Design tokens from day one
  Rejected   Styling as I went
  Why        The client planned two more products. Tokens
             meant the second one starts at week zero, not
             week six.

─── 08 THE SYSTEM ───  [MOCK · ~40 words]
Twelve colour tokens, a six-step type scale, an 8px spacing
system, and eighteen components. Documented, versioned, and
handed over. The client's developer extended it without
asking me a question.

[token sheet · component library screenshot]

─── 09 AFTER ───
[final screens — hand, desktop, flat UI, brand application]
[20s muted screen recording, poster frame, hover to play]

─── 10 BEFORE ↔ AFTER SLIDER ───
[draggable divider on the checkout screen]

─── 11 OUTCOMES ───  [MOCK · ~60 words]
Booking completion improved noticeably in the first month.
Support volume on checkout questions dropped to near zero.
The client now updates content and adds pages without
involving me — which was the point.

"[MOCK — real client quote goes here. Two sentences in their
own voice. Do not polish it into corporate language.]"
— [Name], [Role], Pikamgo

─── 12 WHAT I'D DO DIFFERENTLY ───  [MOCK · ~40 words]
I built the component library before validating the flow with
users. It worked out, but it was luck. Next time the flow gets
tested first and the components follow.

─── 13 NEXT PROJECT ───
Next project · Diwa →
```

**Word count: ~430.** Deliberately under the 800–1,200 target — real case studies gain length from real detail, not padding.

---

## PART 3 — CONTACT SECTION (was missing)

```
Section label   Contact
H2              Have something to build?
Body            Tell me what you're working on. If it's a fit,
                I'll reply within two days with next steps.
                If it isn't, I'll tell you that too — and point
                you somewhere better.
```

**Form fields**
```
Name             text      required
Email            email     required
Project type     select    Brand / Website / Mobile app /
                           Mentorship / Something else
Budget range     select    optional — filters early, saves calls
Message          textarea  required, 4 rows
Submit           "Send message"
```

**Alongside the form**
```
Or email directly:  [your address, click-to-copy]
Response time:      Within 2 working days
Currently:          [Taking projects for MONTH / Booked until MONTH]
Based in:           Bamenda, Cameroon · GMT+1 · working remotely
```

The "Currently" line is worth maintaining manually. Scarcity that's true reads as professional; scarcity that's invented gets caught.

**Validation behaviour**
- Validate on blur, never on keystroke — mid-typing errors are hostile
- Errors below the field, `#2FA86A` on dark, with an icon (never colour alone)
- Submit: button → spinner → checkmark → "Message sent. I'll reply within two days."
- Disable submit while sending; never allow a double-send
- On failure: keep every field populated, show the error, offer the direct email as fallback
- `aria-describedby` linking each error to its field
- Honeypot field for spam, hidden via CSS not `display:none`

---

## PART 4 — FOOTER (expanded)

```
┌──────────────────────────────────────────────────┐
│  [Lespa wordmark SVG]                            │
│                                                  │
│  Designer, developer, and teacher.               │
│  Bamenda, Cameroon.                              │
│                                                  │
│  Navigate        Connect         Contact         │
│  Work            LinkedIn        [email]         │
│  About           Dribbble        Response: 2 days│
│  Services        Behance                         │
│  Contact         Facebook                        │
│                  TikTok                          │
│                  All @iamlespa                   │
│                                                  │
│  ────────────────────────────────────────────    │
│  © 2026 Lespa — Mbah Lesky    [☾ theme] [🔊 sound]│
└──────────────────────────────────────────────────┘
```

Fixes the current `© 2026 LSA`. Theme and sound toggles live here as well as in the nav.

---

## PART 5 — SEO & METADATA (was missing)

```ts
// Root
title:       "Lespa — Brand & Product Designer, Developer | Bamenda, Cameroon"
description: "I design brands, build the websites and mobile apps they live
              in, and teach you to run them. Custom-coded. Based in Bamenda,
              working worldwide."

// Per page
/projects            "Work — Lespa"
/projects/[slug]     "{name} — {outcome} | Lespa"
/about               "About Lesky — Designer & Developer | Lespa"
/services            "Services — Brand, Web, Mobile, Mentorship | Lespa"
/contact             "Contact — Lespa"
```

**Also needed**
- OG image per page, 1200×630. Brand Deep gradient + pattern + wordmark + page title.
- `Person` structured data on the homepage: name, jobTitle, address, sameAs (all socials)
- `CreativeWork` structured data per case study
- `sitemap.xml` and `robots.txt`
- Canonical URLs
- **Custom domain before launch.** `.vercel.app` reads as unfinished, and it splits any SEO you build.

---

## PART 6 — ERROR & EMPTY STATES (was missing)

**404**
```
H1     This page doesn't exist.
Body   It might have moved, or the link might be wrong.
CTA    [ See the work ]  [ Go home ]
```
Brand Deep gradient + pattern. Same nav and footer as everywhere else.

**500**
```
H1     Something broke on my end.
Body   Not your fault. Try again, or email me directly.
CTA    [ Try again ]  [ Email me ]
```

**Image load failure**
Solid `--surface` block at correct aspect ratio with the project name in muted text. Never a broken-image icon, never a layout collapse.

**Form success** — replace the form entirely with the confirmation. Don't leave an empty form sitting under a success message.

---

## PART 7 — WHAT I STILL CAN'T GIVE YOU

Everything below needs you, and the site can't launch without it.

| Item | Why it's blocking |
|---|---|
| **Real project outcomes** | Every outcome line above is invented. These are the most-read words on the site. |
| **Project images** | Final screens, wireframes, and before-states. No image, no hover-reveal and no slider. |
| **Before-state screenshots** | If none exist for Pikamgo or Diwa, the before/after slider gets cut and section 04 becomes a written description instead. Tell me and I'll respec it. |
| **Client testimonials** | One real quote with a name beats three anonymous ones. Ask by WhatsApp — two sentences is enough. |
| **Your photo** | Portrait, natural light. The About section doesn't work without it. |
| **The non-work line** | One true sentence for the About section. |
| **Real timelines and years** | All mocked above. |
| **Domain** | Buy it now — DNS propagation is the one thing you can't rush at the end. |
| **Email address** | For the contact section. |

---

## PART 8 — PRE-LAUNCH CHECKLIST

**Content**
- [ ] Every `[MOCK]` replaced
- [ ] No lorem ipsum anywhere, including inside mockups
- [ ] Every case study read aloud for typos
- [ ] Footer says Lespa, not LSA
- [ ] All social links resolve

**Design**
- [ ] No hex values outside `globals.css`
- [ ] `#2FA86A` on `#0E1110` verified at 16px
- [ ] No `#0D6D2B` as text on dark anywhere
- [ ] All spacing on the 8px scale
- [ ] Pattern only on gradient backgrounds, never on cards

**Interaction**
- [ ] Role swap causes zero layout shift
- [ ] Hover-reveal has a working mobile toggle
- [ ] Snap is `proximity`, not `mandatory`
- [ ] Sound off by default, choice persists, disabled on touch
- [ ] Every case study links to a next project
- [ ] Full site usable with all motion disabled

**Technical**
- [ ] Lighthouse ≥ 90 on mobile throttling
- [ ] LCP < 2.0s, CLS < 0.1
- [ ] Fonts self-hosted and subset
- [ ] Contact form tested end to end
- [ ] Custom domain live with SSL
- [ ] Analytics installed
- [ ] Tested on a real mid-range Android

**Accessibility**
- [ ] Keyboard-navigable throughout
- [ ] Focus visible everywhere
- [ ] Alt text on every image
- [ ] One `<h1>` per page, headings in order
- [ ] Skip link present
- [ ] `prefers-reduced-motion` honoured
