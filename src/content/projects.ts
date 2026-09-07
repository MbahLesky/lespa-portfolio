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
 * Imagery so far covers the global assets, the homepage cards, and the Monilog
 * case study. Each card pairs the default image with what its document says the
 * hover reveals. Where a gallery is still empty the block is skipped rather
 * than rendered as an empty grid, and any path without a file behind it falls
 * back to a labelled frame at the right size rather than a broken image.
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
      // "Mobile dashboard -> hover reveals the pencil sketch."
      final: "/homepage_project_cards/monilog-mobile.webp",
      sketch: "/monilog_case_study_images/pencil_sketch.webp",
      hero: "/monilog_case_study_images/phone_mockup.webp",
      gallery: [
        "/monilog_case_study_images/construction_diagram.webp",
        "/monilog_case_study_images/icon_flat.webp",
        "/monilog_case_study_images/favicon_vs.webp",
        "/monilog_case_study_images/mobile_dashboard.webp",
        "/monilog_case_study_images/mobile_transaction.webp",
        "/monilog_case_study_images/mobile_account.webp",
        "/monilog_case_study_images/web_dashboard.webp",
        "/monilog_case_study_images/mobile_with_web.webp",
        "/monilog_case_study_images/landing_page.webp",
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
      // "diwa_primary_fullmark -> hover reveals the five traced concepts."
      final: "/homepage_project_cards/diwa_logo_on_dress.webp",
      sketch: "/homepage_project_cards/diwa_concepts.webp",
      hero: "/homepage_project_cards/diwa_concepts.webp",
      gallery: [],
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
      // "pikamgo_wordmark_orange on dark -> hover reveals the mark alone."
      final: "/homepage_project_cards/pikamgo-wordmark-dark.webp",
      sketch: "/homepage_project_cards/pikamgo_mobile.webp",
      hero: "/homepage_project_cards/pikamgo-wordmark-dark.webp",
      gallery: [],
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
      // "qiroke_wordmark_gradient on dark -> hover reveals the lettermark."
      final: "/homepage_project_cards/qiroke_homepage.webp",
      sketch: "/homepage_project_cards/qiroke_icon.webp",
      hero: "/homepage_project_cards/qiroke_icon.webp",
      gallery: [],
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
      // "ronixe_fullmark_dark on white -> hover reveals ronixe_icon_light."
      final: "/homepage_project_cards/ronixe_wordmark.webp",
      sketch: "/homepage_project_cards/ronixe-icon-dark.webp",
      hero: "/homepage_project_cards/ronixe_wordmark.webp",
      gallery: [],
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
      // "yisi_wordmark_orange on white -> hover reveals the dark variant."
      final: "/homepage_project_cards/yisi_logo_orange.webp",
      sketch: "/homepage_project_cards/yisi_artboard.webp",
      hero: "/homepage_project_cards/yisi_artboard.webp",
      gallery: [],
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
      // No imagery yet, and null rather than a path that would 404.
      final: null,
      sketch: null,
      hero: null,
      gallery: [],
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
