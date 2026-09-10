/**
 * Every word on the page.
 *
 * Verbatim from /docs/lespa-restructure-copy.md — that document is locked, so
 * nothing here may be paraphrased, trimmed or "improved". Edit the doc first.
 *
 * `emphasis` arrays list the standout phrases inside a body string that get the
 * selective hover treatment (structure doc, MOTION SPEC). Each entry must be an
 * exact substring of the copy it belongs to; a phrase that no longer matches
 * simply renders plain, so the copy can never be altered by an emphasis edit.
 */

export const nav = [
  { label: "Work", href: "#work" },
  { label: "What I Do", href: "#what-i-do" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/**
 * The hero's typed lines, split into the beats they are typed in.
 *
 * The rendered copy is always the segments joined, so adding or moving a beat
 * cannot change a word — the break is purely a pause in the typing.
 */
const headlineSegments = [{ text: "Hi," }, { text: " I am Lespa" }];

/**
 * The two roles are the keywords of the whole hero, so they carry their own
 * colour and a hover.
 *
 * `keyword: true` is the only marker needed — the Typewriter styles that segment
 * and nothing else. The words themselves stay exactly as the copy doc has them,
 * with no brackets or hashes around them.
 */
const roleSegments = [
  [
    { text: "A " },
    { text: "Graphic Designer", keyword: true },
    { text: " who builds products." },
  ],
  [
    { text: "And a " },
    { text: "Software Developer", keyword: true },
    { text: " who designs interfaces." },
  ],
];

const joinSegments = (segments) => segments.map((segment) => segment.text).join("");

export const hero = {
  headlineSegments,
  roleSegments,
  headline: joinSegments(headlineSegments),
  roleLines: roleSegments.map(joinSegments),
  subtext:
    "I design brands and interfaces that feel like you, then build the websites and apps they live in.",
  ctas: {
    primary: { label: "See my work", href: "#work" },
    secondary: { label: "About me", href: "#about" },
  },
};

export const intro = {
  body: "I taught myself design because I didn't like how the interfaces I was coding looked. Then I kept both — so a brand I design doesn't fall apart the moment someone else has to build it. Let me help carry your vision across — from idea to product.",
  emphasis: ["I taught myself", "I kept both", "from idea to product"],
};

export const whatIDo = {
  label: "What I Do",
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
      emphasis: ["Android and iOS"],
    },
  ],
};

export const process = {
  label: "Process",
  steps: [
    {
      title: "Reach Out",
      body: "Tell me the idea — what you're building, or what you want designed. I read every message myself, and I reply within a day.",
      emphasis: ["I reply within a day"],
    },
    {
      title: "Research",
      body: "Before I touch anything visual, I look into what actually fits you — who you're speaking to, what's already out there, what's been tried and didn't work. Not just moodboards. Real digging.",
      emphasis: ["Real digging"],
    },
    {
      title: "Define",
      body: "Then I sketch. Concepts, flow, structure — for the brand, the site, or the app. This is where the idea starts taking real shape, before a single pixel is final.",
      emphasis: ["taking real shape"],
    },
    {
      title: "Design/Build",
      body: "Once we agree on direction, I build it — design and code, myself. Nothing gets lost between the sketch and the real thing, because there's no handoff.",
      emphasis: ["there's no handoff"],
    },
    {
      title: "Present and Deploy",
      body: "I show you how it actually feels, not just how it looks in a mockup. Then we ship it — live, working, yours.",
      emphasis: ["live, working, yours"],
    },
  ],
  closing: {
    body: "At every step, we talk it through — together. The goal was never something generic, something that feels like a template you've scrolled past before. It's something that feels like you. Intentional. From your roots.",
    emphasis: ["feels like you", "From your roots"],
  },
};

export const about = {
  label: "About",
  bio: [
    {
      body: "I'm Mbah Lesky, but call me Lespa. I'm a graphic designer and software engineer based in Bamenda, Cameroon.",
      emphasis: ["Bamenda, Cameroon"],
    },
    {
      body: "I started building simple websites in 2019. They worked, but I didn't like how they looked, mine or most other people's. So in 2021 I got into graphic design, chasing better colors, fonts, and structure. But even with that, something didn't click. The feel was missing. A nice interface still isn't the same as an easy one. So in 2022 I moved into UI/UX to fix that. By late 2022, I'd picked up Flutter and mobile development too.",
      emphasis: ["The feel was missing"],
    },
    {
      body: "I taught myself all of it. No mentor, no bootcamp, just building things, breaking them, and building again. Across client work, business projects, and a long list of personal ones, some of which made it online and some didn't. Somewhere in that process, graphic design and software development stopped feeling like two jobs with UI/UX standing between them. They became one job to me.",
      emphasis: ["I taught myself", "They became one job to me"],
    },
    {
      body: "While studying software engineering at university, I had a part-time job teaching web development and graphic design. Mostly, I was figuring out alongside my students what I actually wanted to be good at. What I landed on is simple: brands and products that feel intentional, not generic. That's still the standard I hold every project to, whether I'm building the brand, the visuals, or acting as creative director on someone else's.",
      emphasis: ["intentional, not generic"],
    },
  ],
  roleSplit: [
    {
      heading: "By Day, I am a Part Designer",
      items: [
        "Brand identity & logo design",
        "Visual systems & style guides",
        "UI/UX design",
        "Making it feel like you, not a template",
      ],
    },
    {
      heading: "By Night, I am a Part Coder",
      items: [
        "React & Next.js",
        "Flutter, for Android and iOS",
        "Clean, maintainable code",
        "No page builders, ever",
      ],
    },
  ],
  offHours: {
    body: "When I'm not working, I'm watching a movie or halfway through whatever series or anime has my attention that week. I read too, when I remember to put the screen down.",
    emphasis: ["put the screen down"],
  },
  boundaries: {
    heading: "What I don't do",
    paragraphs: [
      {
        body: "I use AI, mostly in research, to get ideas moving faster. I don't let it think for me, design for me, or build something I don't understand myself. I don't use AI-generated visuals, and I don't hand a project to AI without knowing exactly what's happening underneath it.",
        emphasis: ["I don't let it think for me"],
      },
      {
        body: "I don't use page builders or templates either. Every project gets designed and built from scratch, because a template can look nice, but it can't feel like you.",
        emphasis: ["built from scratch"],
      },
      {
        body: "And I don't rush. I have a process for a reason. Each of the outlined steps above needs its own time to come out right.",
        emphasis: ["I don't rush"],
      },
    ],
  },
  /**
   * Labelled chips, no descriptive copy (structure doc §6).
   *
   * TODO: asset needed — assets doc §6, "Tool icon set (12 total, as logo marks
   * or simple icon chips)". Text chips stand in until those SVGs are provided.
   */
  tools: [
    {
      heading: "Design Tools",
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
      heading: "Development Tools",
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
};

export const contact = {
  label: "Contact",
  introLine: "Have something to design/build? Tell me about it.",
  fields: {
    name: "Name",
    email: "Email",
    message: "Message",
  },
  submit: "Send message",
  success: "Thanks — your message is in. I'll reply within a day.",
  failure: "That didn't send. Try again, or email me directly.",
  /**
   * Direct routes, beside the form. The footer keeps its icon row; here the same
   * accounts are spelled out as handles so they can be read and copied.
   *
   * TODO: confirm before launch — `email` is the personal address on file. Swap
   * in whichever address should be public.
   */
  direct: {
    heading: "Or reach me directly",
    email: "mbahlesky4@gmail.com",
    phone: "+237 6 79 68 26 26",
  },
};

export const footer = {
  handle: "@iamlespa",
  builtWith: "Built with Next.js, Tailwind CSS and Framer Motion.",
};

/**
 * TODO: asset needed — assets doc §8 lists the seven social icons but no
 * handles. These URLs follow the @iamlespa handle from the copy doc; confirm
 * each profile URL before launch.
 */
export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/iamlespa" },
  { label: "GitHub", href: "https://github.com/iamlespa" },
  { label: "Facebook", href: "https://www.facebook.com/iamlespa" },
  { label: "X", href: "https://x.com/iamlespa" },
  { label: "TikTok", href: "https://www.tiktok.com/@iamlespa" },
  { label: "Behance", href: "https://www.behance.net/iamlespa" },
  { label: "Dribbble", href: "https://dribbble.com/iamlespa" },
];
