/**
 * Project data, from the per-project documents in /docs.
 *
 * Sources: monilog-case-study-final.md, diwa-case-study-final.md,
 * pikamgo-case-study.md, qiroke-showcase-final.md, ronixe-case-study.md,
 * yisi-showcase.md, and the ordering and tiering in
 * portfolio-project-tier-list.md.
 *
 * Anything still marked [CONFIRM] is real work with a detail the source
 * document flagged as unverified. The markers are deliberately left in source
 * so they stay greppable — see the open items at the foot of each doc.
 *
 * No image files exist yet. Every path below is where its file will go, named
 * after the image list in that project's document; until one lands the slot
 * renders a labelled frame at the right size rather than a broken image.
 */

import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "monilog",
    name: "Monilog",
    tier: "case-study",
    order: 1,
    featured: true,
    selfInitiated: true,
    outcome: "A finance app that works with no signal and no sign-up.",
    hero: "A finance app that works with no signal and no sign-up.",
    tags: ["Brand", "Product Design", "Flutter", "React"],
    meta: [
      { label: "Product", value: "Monilog Finance Tracker" },
      { label: "Client", value: "Self-initiated" },
      {
        label: "Role",
        value: "Brand Identity · Product Design · Mobile & Web Development",
      },
      { label: "Stack", value: "Flutter · Drift (SQLite) · React · Vercel" },
      { label: "Platforms", value: "Android · Web" },
      // "In beta" is accurate. Not "launched", not "on the Play Store", until
      // it is — the first person to check will be deciding whether to hire.
      { label: "Status", value: "v1.0 in beta" },
      { label: "Year", value: "2026" },
    ],
    client: "Self-initiated",
    role: [
      "Brand Identity",
      "Product Design",
      "Mobile & Web Development",
    ],
    year: "2026",
    stack: ["Flutter", "Drift (SQLite)", "React", "Vercel"],
    liveUrl: "https://monilog.vercel.app",
    images: {
      final: "/projects/monilog/mobile-dashboard.webp",
      sketch: "/projects/monilog/pencil-sketch.webp",
      hero: "/projects/monilog/phone-mockup-teal.webp",
      gallery: [
        "/projects/monilog/mark-construction-diagram.webp",
        "/projects/monilog/colour-swatches.webp",
        "/projects/monilog/add-transaction.webp",
        "/projects/monilog/accounts-list.webp",
        "/projects/monilog/web-and-mobile.webp",
        "/projects/monilog/marketing-site-hero.webp",
      ],
    },
  },
  {
    slug: "diwa",
    name: "Diwa",
    tier: "case-study",
    order: 2,
    featured: false,
    outcome: "The mark had to say cool. Three of my concepts said fire.",
    hero: "The mark had to say cool. Three of my concepts said fire.",
    tags: ["Brand Identity", "Logo Design", "Guidelines"],
    meta: [
      { label: "Client", value: "Diwa Innovation — Maroua, Cameroon" },
      {
        label: "Role",
        value: "Brand Identity · Logo Design · Brand Guidelines",
      },
      { label: "Sector", value: "Climate innovation · Solar evaporative cooling" },
      { label: "Market", value: "B2C — Sahel region" },
      { label: "Timeline", value: "2 weeks" },
      { label: "Tools", value: "Illustrator · Figma" },
      { label: "Delivered", value: "May 2026" },
      // Identity only — the website is the client's team. Cheap to say, and
      // the kind of precision people notice.
      { label: "Scope", value: "Identity only — the website is their team" },
    ],
    client: "Diwa Innovation",
    role: ["Brand Identity", "Logo Design", "Brand Guidelines"],
    year: "2026",
    stack: ["Illustrator", "Figma"],
    liveUrl: "https://diwa-air.com",
    images: {
      final: "/projects/diwa/primary-fullmark.webp",
      sketch: "/projects/diwa/five-traced-concepts.webp",
      hero: "/projects/diwa/five-traced-concepts.webp",
      gallery: [
        "/projects/diwa/pencil-sheet-01.webp",
        "/projects/diwa/pencil-sheet-02.webp",
        "/projects/diwa/three-finalist-lockups.webp",
        "/projects/diwa/d-form-breakdown.webp",
        "/projects/diwa/icon-colourways.webp",
        "/projects/diwa/guidelines-pages.webp",
        "/projects/diwa/site-header.webp",
        "/projects/diwa/site-loading-state.webp",
      ],
    },
  },
  {
    slug: "pikamgo",
    name: "PikamGo",
    tier: "case-study",
    order: 3,
    featured: false,
    outcome:
      "Co-founded the logistics app built to fix how packages move across a Cameroonian city.",
    hero: "One app for pickups, errands, and local delivery.",
    tags: ["Brand Identity", "Product Design"],
    meta: [
      { label: "Client", value: "PikamGo (Qiroke) — co-founded venture" },
      {
        label: "Role",
        value: "Creative Director — Brand Identity, Product Design",
      },
      { label: "Scope", value: "Logo system, brand identity, mobile app UI/UX" },
      { label: "Tools", value: "Figma" },
      { label: "Year", value: "2024–2025" },
    ],
    client: "PikamGo (Qiroke)",
    role: ["Brand Identity", "Product Design"],
    year: "2024–2025",
    stack: ["Figma"],
    images: {
      final: "/projects/pikamgo/wordmark-orange.webp",
      sketch: "/projects/pikamgo/six-logo-directions.webp",
      hero: "/projects/pikamgo/wordmark-on-dark.webp",
      before: "/projects/pikamgo/six-logo-directions.webp",
      gallery: [
        "/projects/pikamgo/mark-construction.webp",
        "/projects/pikamgo/orange-scale.webp",
        "/projects/pikamgo/pickers-directory.webp",
        "/projects/pikamgo/delivery-detail.webp",
        "/projects/pikamgo/home-screen.webp",
      ],
    },
  },
  {
    slug: "qiroke",
    name: "Qiroke",
    tier: "showcase",
    order: 4,
    featured: false,
    selfInitiated: true,
    outcome:
      "Co-founded a tech collective. Built the brand that had to represent five services under one name.",
    hero: "A brand system built for a team, not a single product.",
    tags: ["Brand Identity", "Web UX"],
    meta: [
      // [CONFIRM] the title — the source doc flags it as unverified.
      { label: "Role", value: "Co-founder, Creative Director — Brand & Web" },
      {
        label: "Scope",
        value: "Logo system, brand guidelines, homepage structure & copy",
      },
      { label: "Tools", value: "Figma · Chillax · Switzer" },
      { label: "Year", value: "2024" },
    ],
    client: "Qiroke — co-founded",
    role: ["Brand Identity", "Web UX"],
    year: "2024",
    stack: ["Figma"],
    images: {
      final: "/projects/qiroke/wordmark-gradient.webp",
      sketch: "/projects/qiroke/lettermark-construction.webp",
      hero: "/projects/qiroke/wordmark-on-dark.webp",
      gallery: [
        "/projects/qiroke/variant-grid.webp",
        "/projects/qiroke/colour-type-system.webp",
        "/projects/qiroke/homepage-hero.webp",
      ],
    },
  },
  {
    slug: "ronixe",
    name: "Ronixe",
    tier: "case-study",
    order: 5,
    featured: false,
    outcome:
      "A mark for a software company that had to say launch without a rocket or a bracket.",
    hero: "A brand mark built around momentum, not machinery.",
    tags: ["Brand Identity"],
    meta: [
      { label: "Role", value: "Brand Identity Design" },
      {
        label: "Scope",
        value: "Wordmark, standalone icon, full lockup — light & dark",
      },
      { label: "Tools", value: "Adobe Illustrator" },
      { label: "Year", value: "2026" },
      { label: "Live at", value: "ronixe.com" },
    ],
    client: "Ronixe",
    role: ["Brand Identity"],
    year: "2026",
    stack: ["Adobe Illustrator"],
    liveUrl: "https://ronixe.com",
    images: {
      final: "/projects/ronixe/fullmark-dark.webp",
      sketch: "/projects/ronixe/icon-light.webp",
      hero: "/projects/ronixe/full-lockup.webp",
      gallery: [
        "/projects/ronixe/icon-construction.webp",
        "/projects/ronixe/light-dark-variants.webp",
        "/projects/ronixe/live-site-header.webp",
      ],
    },
  },
  {
    slug: "yisi",
    name: "Yisi Catering Services",
    tier: "showcase",
    order: 6,
    featured: false,
    outcome: "A wordmark built entirely from cutlery — no icon needed beside it.",
    hero: "Logo & brand mark.",
    tags: ["Brand Identity"],
    meta: [
      // [CONFIRM] role, tools and year — all three are open in the source doc.
      { label: "Role", value: "Brand Identity" },
      { label: "Scope", value: "Logo & wordmark design" },
    ],
    client: "Yisi Catering Services",
    role: ["Brand Identity"],
    year: "",
    stack: [],
    images: {
      final: "/projects/yisi/wordmark-orange-on-white.webp",
      sketch: "/projects/yisi/wordmark-white-on-orange.webp",
      hero: "/projects/yisi/logo-for-black-background.webp",
      gallery: [
        "/projects/yisi/texture-pattern.webp",
        "/projects/yisi/contact-card.webp",
      ],
    },
  },
  {
    // The tier list flags this one: real work, but the only entry here whose
    // write-up has not been written. Everything in its case study is [MOCK],
    // which is why it sits last. See the note at the head of case-studies.ts.
    slug: "lespa-brand",
    name: "Lespa",
    tier: "case-study",
    order: 7,
    featured: false,
    selfInitiated: true,
    outcome: "A brand system that builds its own portfolio.", // [MOCK]
    hero: "The system this page is drawn with.",
    tags: ["Brand", "Design System", "Development"],
    meta: [
      { label: "Client", value: "Self-initiated" },
      {
        label: "Role",
        value: "Brand Identity · Design System · Frontend Development",
      },
      { label: "Tools", value: "Figma · Next.js · TypeScript · Tailwind" },
      { label: "Timeline", value: "Ongoing" }, // [MOCK]
      { label: "Year", value: "2025" }, // [MOCK]
    ],
    client: "Self-initiated",
    role: ["Brand Identity", "Design System", "Frontend Development"],
    year: "2025", // [MOCK]
    stack: ["Figma", "Next.js", "TypeScript", "Tailwind"],
    images: {
      final: "/projects/lespa-brand/final.webp",
      sketch: "/projects/lespa-brand/wireframe.webp",
      hero: "/projects/lespa-brand/hero.webp",
      gallery: [
        "/projects/lespa-brand/01.webp",
        "/projects/lespa-brand/02.webp",
      ],
    },
  },
];

/** Cyclic next — nobody dead-ends. */
export const getNextProject = (slug: string): Project => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

/** 1-based position, for the "2 of 6" indicator on next-project blocks. */
export const getProjectPosition = (slug: string) => ({
  index: projects.findIndex((p) => p.slug === slug) + 1,
  total: projects.length,
});
