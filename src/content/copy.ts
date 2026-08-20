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

/**
 * The nav points at sections of the home page, not at separate pages: every
 * one of these exists on the home page in full, and sending people away from a
 * section they are about to scroll past is what made the site feel scattered.
 *
 * `section` is the id it scrolls to. `page` is the fuller version behind a
 * "see all" link, and is what marks the nav item current when the visitor is
 * on it — so the bar still says where they are away from home.
 */
export const nav = [
  { label: "Work", href: "/#work", section: "work", page: "/projects" },
  { label: "About", href: "/#about", section: "about", page: "/about" },
  {
    label: "Services",
    href: "/#services",
    section: "services",
    page: "/services",
  },
  { label: "Contact", href: "/#contact", section: "contact", page: null },
] as const;

/** The action, kept out of the link list: navigation and doing are different. */
export const navCta = { label: "Start a project", href: "/#contact" } as const;

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
    { before: "A", word: "Web & Mobile Developer", after: "who designs them first." },
  ],
  /** Read by screen readers in place of the swapping word. */
  screenReaderLine:
    "I am Lespa, a graphic designer and a web and mobile developer.",
  subtext:
    "Brand systems, custom-coded websites and mobile apps — and I teach you how to run what I build.",
  primaryCta: { label: "See the work", href: "/#work" },
  secondaryCta: { label: "Start a project", href: "/#contact" },
  trust: "Bamenda, Cameroon · Remote worldwide · @iamlespa",
  /**
   * The hint that appears under the hero once it has been left alone. The
   * description is the accessible name and contains the visible label, so
   * "click Scroll" still works for anyone driving the page by voice.
   */
  scrollCue: {
    label: "Scroll",
    description: "Scroll to the selected work",
    target: "work",
  },
  /**
   * [MOCK] The hero visual. Nothing exists at this path yet, so the slot renders
   * its reserved frame instead — the box is already the right size, so dropping
   * the real file in cannot shift the page.
   *
   * Wants a portrait-orientation frame: a working shot, or a piece of brand
   * work strong enough to carry the top of the page. The alt text below
   * describes the placeholder and must be rewritten to describe the real image.
   */
  image: {
    /**
     * Null until a real file exists. Pointing this at a path that 404s made the
     * slot preload a missing resource at top priority, which put a failed
     * request on the critical path and cost roughly half the performance score.
     * Set the path and alt text together when the image is ready.
     */
    src: null as string | null,
    alt: "",
    label: "Hero image",
    ratio: "Portrait · 4:5",
  },
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
  heading: "Real constraints, real outcomes.",
  subline: "Brand, interface, and code — usually all three.",
  bottomLink: { label: "See all work", href: "/projects" },
  /**
   * How many appear on the home page. The rest are behind the link — a
   * "see all" that shows everything already is not an invitation, it is a
   * label for a button that does nothing.
   */
  homeCount: 3,
} as const;

/**
 * The full index, where the count is worth stating.
 *
 * The split is deliberately exact. Two are client engagements, two are
 * ventures I co-founded, and three are my own — and a co-founded product
 * described as client work is a claim that does not survive being asked about.
 */
export const workPage = {
  heading: "Seven projects. Real constraints, real outcomes.",
  intro:
    "Client brands, two co-founded ventures, and the products I built for myself. Brand, interface, and code — usually all three.",
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

/* ---------- Services page ---------- */

/**
 * The detailed offer. Publishing a starting-from number filters unserious
 * enquiries before they cost time — but every figure below is [MOCK] and needs
 * replacing with real numbers before launch.
 */
export const servicesPage = {
  heading: "What working with me actually looks like.",
  intro:
    "Three services. Each one ends with you understanding the thing you now own.",
  offers: [
    {
      title: "Brand Systems",
      forWho: "Founders and small businesses who need an identity that holds up across every surface.",
      includes: [
        "Logo, wordmark, and symbol",
        "Colour palette documented as design tokens",
        "Type scale and spacing rules",
        "Brand guidelines, written to be used rather than filed",
        "Social and print templates",
      ],
      timeline: "3–4 weeks",
      needed: "Your story, a sense of who you are talking to, and any existing material — even if you dislike it.",
      price: "Projects typically start at 400,000 XAF", // [MOCK]
    },
    {
      title: "Web & Mobile Development",
      forWho: "Anyone who needs a site or app that is fast today and maintainable next year.",
      includes: [
        "Custom-coded in Next.js on the web, Flutter on mobile",
        "Component library and design tokens",
        "Responsive breakpoints tested on real devices",
        "WCAG AA accessibility checked, not assumed",
        "Documentation and a handover walkthrough",
      ],
      timeline: "4–6 weeks",
      needed: "Content, or a plan for getting it. Missing copy is the single most common reason projects slip.",
      price: "Projects typically start at 700,000 XAF", // [MOCK]
    },
    {
      title: "Design Mentorship",
      forWho: "Designers and developers who want to build systems, not copy layouts.",
      includes: [
        "One-on-one or small-group sessions",
        "Design system and token reviews",
        "Code review with written feedback",
        "Portfolio critique",
      ],
      timeline: "Ongoing, or a fixed block of six sessions",
      needed: "Work in progress. Bring something real — a live project teaches more than an exercise.",
      price: "Get a quote in 24 hours", // [MOCK]
    },
  ],
  notFor: {
    heading: "Who this isn't for",
    items: [
      "People who want a fast, cheap, template-based site",
      "Anyone needing WordPress or page-builder work",
      "Rushed, last-minute projects",
    ],
  },
  workingTogether: {
    heading: "What's it like to work with me?",
    body: [
      "You hear from me at least twice a week, whether or not there is something to show. Silence is where projects go wrong, so I would rather send a short update than a polished one.",
      "Two rounds of revisions are included at each stage, and I will tell you plainly when I think a change makes the work worse. Everything is done in the open — you see the structure before the visuals, and the visuals before the code.",
      "At the end you get the files, the documentation, and a walkthrough. If you want to run it yourself afterwards, that was the point.",
    ],
  },
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
  primaryCta: { label: "See the work", href: "/#work" },
  secondaryCta: { label: "Start a project", href: "/#contact" },
  /** The fuller version, for anyone this section did not exhaust. */
  moreLink: { label: "Read the whole story", href: "/about" },
} as const;

/* ---------- 9 · Final CTA ---------- */

export const finalCta = {
  heading: "Have something to build?",
  body: "Tell me what you're working on. If it's a fit, I'll reply within two days with next steps. If it isn't, I'll tell you that too — and point you somewhere better.",
  cta: { label: "Start a project", href: "/#contact" },
} as const;

/* ---------- Micro-CTAs ---------- */

/** Maximum three on the page. Text links, not buttons. */
export const microCtas = {
  afterWork: { label: "Want something like this?", href: "/#contact" },
  afterMethodology: {
    label: "Curious what yours would look like?",
    href: "/#contact",
  },
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
