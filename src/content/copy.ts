/**
 * Homepage and site copy.
 *
 * Verbatim from /docs/homepage-copy.md and /docs/about-copy.md, with the hero
 * taken from /docs/design-spec.md Part 3 (the role-swap structure) as the
 * conflict hierarchy requires. Copy is centralised here so sections stay
 * presentational and wording cannot drift between pages.
 */

export const site = {
  name: "Lespa",
  legalName: "Mbah Lesky",
  handle: "@iamlespa",
  email: "hello@lespa.dev", // [MOCK]
  location: "Bamenda, Cameroon",
  timezone: "GMT+1",
  responseTime: "Within 2 working days",
  /** Maintained by hand. True scarcity reads as professional; invented scarcity gets caught. */
  availability: "Taking projects for October", // [MOCK]
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/iamlespa" }, // [MOCK]
    { label: "Dribbble", href: "https://dribbble.com/iamlespa" }, // [MOCK]
    { label: "Behance", href: "https://behance.net/iamlespa" }, // [MOCK]
    { label: "Facebook", href: "https://facebook.com/iamlespa" }, // [MOCK]
    { label: "TikTok", href: "https://tiktok.com/@iamlespa" }, // [MOCK]
  ],
} as const;

export const nav = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;

/* ---------- 1 · Hero ---------- */

export const hero = {
  kicker: "Lespa (Mbah Lesky)",
  /** Line 1 never changes. */
  headlineLead: "I am Lespa.",
  /**
   * Line 2 alternates between two complete, confident claims. Both halves stay
   * true in either state — that is what stops the swap reading as indecisive.
   * State A is the resting state and the reduced-motion fallback.
   */
  roles: [
    { before: "A", word: "Graphic Designer", after: "who builds the products too." },
    { before: "A", word: "Web Developer", after: "who designs them first." },
  ],
  /** Read by screen readers in place of the swapping word. */
  screenReaderLine: "I am Lespa, a graphic designer and web developer.",
  subtext:
    "Brand systems, custom-coded websites and mobile apps — and I teach you how to run what I build.",
  primaryCta: { label: "See the work", href: "/projects" },
  secondaryCta: { label: "Start a project", href: "/contact" },
  trust: "Bamenda, Cameroon · Remote worldwide · @iamlespa",
} as const;

/* ---------- 2 · Approach ---------- */

export const approach = {
  label: "Approach",
  heading: "Design and code are one job, not two.",
  body: "When branding and development are handled by different people, the seams show. Spacing drifts. Colours don't quite match. The site doesn't feel like the logo. I handle the whole chain, so nothing gets lost in the handoff.",
  points: [
    {
      heading: "Emotion and principles",
      body: "Your story, context, and feeling shape the work — but structure holds it together. Skip either one and it falls apart.",
    },
    {
      heading: "Systems, not one-offs",
      body: "You get rules you can repeat: spacing, colour, type, components. Not a single file you're afraid to touch.",
    },
    {
      heading: "Taught, not just delivered",
      body: "I explain every decision as I make it. You finish the project knowing how it works and why.",
    },
  ],
} as const;

/* ---------- 3 · Selected Work ---------- */

export const selectedWork = {
  label: "Selected Work",
  heading: "Five projects. Real clients, real constraints.",
  subline: "Brand, interface, and code — usually all three.",
  bottomLink: { label: "See all work", href: "/projects" },
} as const;

/* ---------- 4 · Skills & Services ---------- */

export const services = {
  label: "What I Do",
  heading: "Three things, done properly.",
  cards: [
    {
      title: "Brand Systems",
      body: "Identity, palette, type, and the rules that hold them together.",
      tags: ["Logo Design", "Design Tokens", "Brand Guidelines"],
    },
    {
      title: "Web & Mobile Development",
      body: "Custom-coded. Next.js on the web, Flutter on mobile.",
      tags: ["React", "TypeScript", "Flutter", "REST APIs"],
    },
    {
      title: "Design Mentorship",
      body: "One-on-one and small-group teaching for designers who want systems.",
      tags: ["Design Systems", "Code Review", "Portfolio Critique"],
    },
  ],
  cta: { label: "See how I work", href: "/services" },
} as const;

/* ---------- 5 · Tools & Systems ---------- */

export const tools = {
  label: "Tools & Systems",
  stack: [
    { group: "Design", items: ["Figma", "Illustrator", "Photoshop"] },
    {
      group: "Build",
      items: ["Next.js", "React", "TypeScript", "Tailwind", "Flutter", "Dart"],
    },
    { group: "Ship", items: ["Vercel", "Git", "Supabase"] },
  ],
  systemHeading: "I don't hand over files. I hand over systems.",
  systemBody:
    "Every project ships with design tokens, a type scale, spacing rules, and documentation.",
} as const;

/* ---------- 6 · Methodology ---------- */

export const methodology = {
  label: "Methodology",
  heading: "How a project actually runs.",
  subline: "Same four phases every time. You always know where we are.",
  phases: [
    {
      number: "01",
      title: "Discover",
      body: "Stakeholder interviews, competitive audit, user research. You get a written brief before anything gets designed.",
      output: "Project brief, user personas",
    },
    {
      number: "02",
      title: "Define",
      body: "Information architecture, user flows, wireframes. Structure gets approved before visuals exist.",
      output: "Sitemap, wireframes, content plan",
    },
    {
      number: "03",
      title: "Design",
      body: "Design system first, screens second. Component library, tokens, responsive specs.",
      output: "Figma library, prototype, design tokens",
    },
    {
      number: "04",
      title: "Build",
      body: "Custom code, component-driven, tested on real devices. Accessibility checked, not assumed.",
      output: "Live product, documentation, handover",
    },
  ],
  footerLine: "Typical project: 3–6 weeks. I don't take rush jobs.",
} as const;

/* ---------- 7 · Proof ---------- */

/**
 * No real testimonial yet, so this uses the "Currently" variant from
 * /docs/homepage-copy.md §6. An unattributed quote reads as invented; in-progress
 * work reads as momentum. Swap to a named quote the moment one exists.
 */
export const proof = {
  label: "Currently",
  heading: "What I'm working on right now.",
  body: "Rebuilding the Pikamgo booking flow as a three-step checkout, and writing the design-token documentation that ships with it.", // [MOCK]
} as const;

/* ---------- 8 · About ---------- */

export const about = {
  label: "About",
  heading: "I'm Lesky.",
  opening: [
    "I'm a software engineer and designer in Bamenda, Cameroon. I build brands, websites, and mobile apps for people who want something that actually feels like them.",
    "I started as a developer. The problem was that I didn't like how the interfaces I was building looked, so I started redesigning them myself. That's how I got into design.",
  ],
  whyAllThree:
    "Somewhere in that process I fell for logo and brand design — because that's the first thing anyone sees of a business, and usually the thing that decides whether they stay. So now I do all three: the mark, the interface, and the code underneath. It turns out that's where most projects break anyway — in the gaps between them.",
  beliefsLabel: "What I believe",
  beliefs: [
    {
      name: "Authenticity",
      body: "Your brand should sound like you, not like the five brands you sent me as references.",
    },
    {
      name: "Mentorship",
      body: "I explain what I'm doing while I do it. Knowledge that isn't shared isn't worth much.",
    },
    {
      name: "Consistency",
      body: "A system you can repeat beats a design you can't maintain.",
    },
  ],
  wontDo:
    "I don't chase trends, build on WordPress, or take rushed work. Not because I'm precious about it — those three things are just how projects end up looking generic.",
  /**
   * The one optional line in the section: a true, small, non-work sentence.
   * Ships omitted until it exists rather than filled with something invented.
   */
  beyondWork: null as string | null,
  close: "If any of that sounds like how you'd want to work, say hello.",
  primaryCta: { label: "See the work", href: "/projects" },
  secondaryCta: { label: "Start a project", href: "/contact" },
} as const;

/* ---------- 9 · Final CTA ---------- */

export const finalCta = {
  heading: "Have something to build?",
  body: "Tell me what you're working on. If it's a fit, I'll reply within two days with next steps. If it isn't, I'll tell you that too — and point you somewhere better.",
  cta: { label: "Start a project", href: "/contact" },
} as const;

/* ---------- Micro-CTAs ---------- */

/** Maximum three on the page. Text links, not buttons. */
export const microCtas = {
  afterWork: { label: "Want something like this?", href: "/contact" },
  afterMethodology: {
    label: "Curious what yours would look like?",
    href: "/contact",
  },
  afterAbout: { label: "Still reading? Let's talk.", href: "/contact" },
} as const;

/* ---------- Footer ---------- */

export const footer = {
  tagline: "Designer, developer, and teacher.",
  location: "Bamenda, Cameroon.",
  copyright: `© 2026 ${site.name} — ${site.legalName}`,
  colophon: "Built with Next.js and too much coffee.",
} as const;

/* ---------- Error states ---------- */

export const errors = {
  notFound: {
    heading: "This page doesn't exist.",
    body: "It might have moved, or the link might be wrong.",
  },
  serverError: {
    heading: "Something broke on my end.",
    body: "Not your fault. Try again, or email me directly.",
  },
} as const;
