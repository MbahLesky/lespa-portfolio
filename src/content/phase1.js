/**
 * Phase 1 content.
 *
 * Every string is transcribed verbatim from /docs/lespa-restructure-copy.md,
 * which is marked LOCKED section by section. Nothing here is paraphrased and
 * nothing is invented — if a value is missing it carries a TODO naming the
 * checklist item in /docs/lespa-restructure-assets.md that would supply it.
 */

export const site = {
  handle: "@iamlespa",
  /** Named in the footer, per the structure doc's "built with" line. */
  stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
};

/** Anchor nav. Single page, so every destination is a section on it. */
export const nav = [
  { label: "Work", id: "work" },
  { label: "What I Do", id: "what-i-do" },
  { label: "Process", id: "process" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

/* ---------- 1 · Hero ---------- */

export const hero = {
  headline: "Hi, I am Lespa",
  /**
   * Typed once, in sequence — not cycled.
   *
   * FLAG — the structure doc and the copy doc disagree on this text. The
   * structure doc has "A Designer who builds the products too." / "A Developer
   * who designs them first."; the copy doc, which is the locked source for all
   * copy, has the two lines below. Following the copy doc.
   */
  roles: [
    "A Graphic Designer who builds products.",
    "A Developer who designs interfaces.",
  ],
  subtext:
    "I design brands that feel like you, then build the websites and apps they live in.",
  /** Words inside the subtext that take the inline hover emphasis. */
  subtextEmphasis: ["brands that feel like you"],
  ctas: [
    { label: "See my work", id: "work" },
    { label: "About me", id: "about" },
  ],
};

/* ---------- 2 · Intro ---------- */

export const intro = {
  body: "I taught myself design because I didn't like how the interfaces I was coding looked. Then I kept both — so a brand I design doesn't fall apart the moment someone else has to build it. Let me help carry your vision across — from idea to product.",
  emphasis: ["I kept both", "from idea to product"],
};

/* ---------- 3 · Selected Work ---------- */

/**
 * Six projects, in the order the copy doc lists them.
 *
 * `color` is each project's own primary brand colour, used for its title, link
 * and tags and for the card's hover glow instead of the site green.
 *
 * TODO: asset needed — "Per-project primary brand color (hex value)" and
 * "Updated project mockup/image (one per project)" are both listed as blocking
 * in /docs/lespa-restructure-assets.md §3. Only Monilog's palette is documented
 * (teal #0F766E / mint #2DD4BF, from its case study). The rest fall back to the
 * site accent below and are flagged individually.
 */
export const work = {
  projects: [
    {
      name: "Monilog",
      tags: ["Brand", "Product Design", "Flutter", "React"],
      body: "A personal finance app for people without reliable internet or a bank account. Works offline, no sign-up required. I designed and built it myself, brand to code.",
      color: "#2DD4BF",
      url: "https://monilog.vercel.app",
      image: "/homepage_project_cards/monilog-mobile.webp",
      alt: "Monilog's mobile dashboard",
    },
    {
      name: "Diwa",
      tags: ["Brand Identity", "Logo Design", "Guidelines"],
      body: "Brand identity for a solar-powered cooling company in Cameroon. Logo, colors, and a full guidelines system, built to work in one color on any surface.",
      // TODO: asset needed — per-project primary brand color, assets doc §3.
      color: null,
      url: "https://diwa-air.com",
      image: "/homepage_project_cards/diwa_logo_on_dress.webp",
      alt: "The Diwa mark applied to a garment",
    },
    {
      name: "Ronixe",
      tags: ["Brand Identity"],
      body: "Brand identity for a software development company. A wordmark and icon built around momentum, live on their site today.",
      // TODO: asset needed — per-project primary brand color, assets doc §3.
      color: null,
      url: "https://ronixe.com",
      image: "/homepage_project_cards/ronixe_wordmark.webp",
      alt: "The Ronixe wordmark",
    },
    {
      name: "Qiroke",
      tags: ["Brand Identity", "Web UX"],
      body: "Brand and web design for a tech collective I co-founded, offering five services under one identity.",
      // TODO: asset needed — per-project primary brand color, assets doc §3.
      color: null,
      /** No live URL documented, so no link renders at all. */
      url: null,
      image: "/homepage_project_cards/qiroke_homepage.webp",
      alt: "The Qiroke homepage",
    },
    {
      name: "PikamGo",
      tags: ["Brand Identity", "Logistics"],
      body: "A delivery app for tracking packages from pickup to drop-off, built under Qiroke.",
      // TODO: asset needed — per-project primary brand color, assets doc §3.
      color: null,
      url: null,
      image: "/homepage_project_cards/pikamgo-wordmark-dark.webp",
      alt: "The PikamGo wordmark",
    },
    {
      name: "Yisi",
      tags: ["Brand Identity"],
      body: "Brand identity for Ndzi Ernestine's catering service. A wordmark built entirely from cutlery.",
      // TODO: asset needed — per-project primary brand color, assets doc §3.
      color: null,
      url: null,
      image: "/homepage_project_cards/yisi_logo_orange.webp",
      alt: "The Yisi wordmark",
    },
  ],
};

/* ---------- 4 · What I Do ---------- */

export const whatIDo = {
  cards: [
    {
      label: "Graphic Design",
      body: "I design logos, visuals, and full brand systems — colors, typography, the whole identity — for individuals and businesses. Not just a logo on its own, but everything that has to work together around it.",
      emphasis: ["full brand systems"],
    },
    {
      label: "Web Development",
      body: "I code websites for individuals and businesses, from simple one-page sites to full platform web apps — all by hand. No templates, no page builders.",
      emphasis: ["all by hand"],
    },
    {
      label: "Mobile Development",
      body: "I build custom Android and iOS applications for productivity or business use.",
      emphasis: ["custom Android and iOS"],
    },
  ],
};

/* ---------- 5 · Process ---------- */

export const process = {
  steps: [
    {
      label: "Reach Out",
      body: "Tell me the idea — what you're building, or what you want designed. I read every message myself, and I reply within a day.",
      emphasis: ["I reply within a day"],
      // TODO: asset needed — one of five process hover-reveal images, assets doc §5.
      image: null,
    },
    {
      label: "Research",
      body: "Before I touch anything visual, I look into what actually fits you — who you're speaking to, what's already out there, what's been tried and didn't work. Not just moodboards. Real digging.",
      emphasis: ["Real digging"],
      // TODO: asset needed — one of five process hover-reveal images, assets doc §5.
      image: null,
    },
    {
      label: "Define",
      body: "Then I sketch. Concepts, flow, structure — for the brand, the site, or the app. This is where the idea starts taking real shape, before a single pixel is final.",
      emphasis: ["taking real shape"],
      // TODO: asset needed — one of five process hover-reveal images, assets doc §5.
      image: null,
    },
    {
      label: "Design/Build",
      body: "Once we agree on direction, I build it — design and code, myself. Nothing gets lost between the sketch and the real thing, because there's no handoff.",
      emphasis: ["there's no handoff"],
      // TODO: asset needed — one of five process hover-reveal images, assets doc §5.
      image: null,
    },
    {
      label: "Present and Deploy",
      body: "I show you how it actually feels, not just how it looks in a mockup. Then we ship it — live, working, yours.",
      emphasis: ["live, working, yours"],
      // TODO: asset needed — one of five process hover-reveal images, assets doc §5.
      image: null,
    },
  ],
  closing:
    "At every step, we talk it through — together. The goal was never something generic, something that feels like a template you've scrolled past before. It's something that feels like you. Intentional. From your roots.",
  closingEmphasis: ["feels like you"],
};

/* ---------- 6 · About ---------- */

export const about = {
  bio: [
    "I'm Mbah Lesky. Call me Lespa. I'm a graphic designer and software engineer based in Bamenda, Cameroon.",
    "I started building simple websites in 2019. They worked, but I didn't like how they looked, mine or most other people's. So in 2021 I got into graphic design, chasing better colors, fonts, and structure. But even with that, something didn't click. The feel was missing. A nice interface still isn't the same as an easy one. So in 2022 I moved into UI/UX to fix that. By late 2022, I'd picked up Flutter and mobile development too.",
    "I taught myself all of it. No mentor, no bootcamp, just building things, breaking them, and building again. Across client work, business projects, and a long list of personal ones, some of which made it online and some didn't. Somewhere in that process, graphic design and software development stopped feeling like two jobs with UI/UX standing between them. They became one job to me.",
    "While studying software engineering at university, I had a part-time job teaching web development and graphic design. Mostly, I was figuring out alongside my students what I actually wanted to be good at. What I landed on is simple: brands and products that feel intentional, not generic. That's still the standard I hold every project to, whether I'm building the brand, the visuals, or acting as creative director on someone else's.",
  ],
  bioEmphasis: ["They became one job to me", "intentional, not generic"],
  day: {
    label: "By Day, I am a Part Designer",
    items: [
      "Brand identity & logo design",
      "Visual systems & style guides",
      "UI/UX design",
      "Making it feel like you, not a template",
    ],
  },
  night: {
    label: "By Night, I am a Part Coder",
    items: [
      "React & Next.js",
      "Flutter, for Android and iOS",
      "Clean, maintainable code",
      "No page builders, ever",
    ],
  },
  offHours:
    "When I'm not working, I'm watching a movie or halfway through whatever series or anime has my attention that week. I read too, when I remember to put the screen down.",
  wontDo: {
    label: "What I don't do",
    body: [
      "I use AI, mostly in research, to get ideas moving faster. I don't let it think for me, design for me, or build something I don't understand myself. I don't use AI-generated visuals, and I don't hand a project to AI without knowing exactly what's happening underneath it.",
      "I don't use page builders or templates either. Every project gets designed and built from scratch, because a template can look nice, but it can't feel like you.",
      "And I don't rush. I have a process for a reason. Each of the outlined steps above needs its own time to come out right.",
    ],
    emphasis: ["designed and built from scratch", "I don't rush"],
  },
  tools: [
    {
      label: "Design Tools",
      items: [
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Adobe InDesign",
        "Affinity",
        "Canva",
        "Figma",
      ],
    },
    {
      label: "Development Tools",
      items: [
        "HTML / CSS / JavaScript",
        "React / Next.js",
        "Tailwind CSS",
        "Flutter",
        "XAMPP",
        "Firebase / Supabase",
      ],
    },
  ],
  photo: {
    src: "/global_assets/about-photo-dark.webp",
    // TODO: asset needed — "Your photo (card-mounted, not blended)", assets doc
    // §6. The file below is the one already in the repo; the alt text describes
    // the frame and should be rewritten against the final image.
    alt: "Lespa — portrait",
  },
};

/* ---------- 7 · Contact ---------- */

export const contact = {
  intro: "Have something to design/build? Tell me about it.",
  fields: [
    { name: "name", label: "Name", type: "text", autoComplete: "name" },
    { name: "email", label: "Email", type: "email", autoComplete: "email" },
    { name: "message", label: "Message", type: "textarea", autoComplete: "off" },
  ],
  submit: "Send message",
  sending: "Sending…",
  success: "Thanks — that's with me. I'll reply within a day.",
  failure: "That didn't send. Email me directly and I'll pick it up.",
};

/* ---------- 8 · Footer ---------- */

/**
 * The seven platforms are named in the copy doc; the URLs are not, in any of the
 * four source documents.
 *
 * Each one below is derived from the locked handle (@iamlespa) on that
 * platform's standard profile path. That is a guess about the account, not
 * copy — every one of these needs confirming before launch, and any that is
 * wrong is a dead link in the footer of every page.
 *
 * TODO: asset needed — profile URLs for the seven social icons listed in
 * /docs/lespa-restructure-assets.md §8. The icons themselves are in place.
 */
export const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/iamlespa" },
  { label: "GitHub", href: "https://github.com/iamlespa" },
  { label: "Facebook", href: "https://facebook.com/iamlespa" },
  { label: "X", href: "https://x.com/iamlespa" },
  { label: "TikTok", href: "https://tiktok.com/@iamlespa" },
  { label: "Behance", href: "https://behance.net/iamlespa" },
  { label: "Dribbble", href: "https://dribbble.com/iamlespa" },
];
