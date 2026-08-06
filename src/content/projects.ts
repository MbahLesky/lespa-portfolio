/**
 * Project data — from /docs/mock-content.md Part 1.
 *
 * Every value marked [MOCK] is invented placeholder and must be replaced before
 * launch. The markers are deliberately left in source so they stay greppable.
 */

import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "pikamgo",
    name: "Pikamgo",
    tier: "case-study",
    order: 1,
    featured: true,
    outcome: "Cut the booking flow from seven screens to three.", // [MOCK]
    tags: ["Brand", "UI", "Development"],
    client: "Pikamgo",
    role: ["Brand Identity", "Product Design", "Frontend Development"],
    timeline: "6 weeks", // [MOCK]
    year: "2025", // [MOCK]
    stack: ["Figma", "Next.js", "TypeScript", "Tailwind"],
    images: {
      final: "/projects/pikamgo/final.webp",
      sketch: "/projects/pikamgo/wireframe.webp",
      hero: "/projects/pikamgo/hero.webp",
      before: "/projects/pikamgo/before.webp",
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
    timeline: "5 weeks", // [MOCK]
    year: "2025", // [MOCK]
    stack: ["Figma", "Flutter", "Dart"],
    images: {
      final: "/projects/diwa/final.webp",
      sketch: "/projects/diwa/wireframe.webp",
      hero: "/projects/diwa/hero.webp",
      gallery: ["/projects/diwa/01.webp", "/projects/diwa/02.webp"],
    },
  },
  {
    slug: "qiroke",
    name: "Qiroke",
    tier: "case-study",
    order: 3,
    featured: false,
    outcome: "The team now ships new pages without a developer.", // [MOCK]
    tags: ["UI", "Development"],
    client: "Qiroke",
    role: ["Product Design", "Frontend Development"],
    timeline: "4 weeks", // [MOCK]
    year: "2024", // [MOCK]
    stack: ["Figma", "Next.js", "TypeScript"],
    images: {
      final: "/projects/qiroke/final.webp",
      sketch: "/projects/qiroke/wireframe.webp",
      hero: "/projects/qiroke/hero.webp",
      gallery: ["/projects/qiroke/01.webp"],
    },
  },
  {
    slug: "ronixe",
    name: "Ronixe",
    tier: "showcase",
    order: 4,
    featured: false,
    outcome: "A visual identity built to survive scale.", // [MOCK]
    tags: ["Brand"],
    client: "Ronixe",
    role: ["Brand Identity", "Logo Design"],
    timeline: "3 weeks", // [MOCK]
    year: "2024", // [MOCK]
    stack: ["Illustrator", "Figma"],
    images: {
      final: "/projects/ronixe/final.webp",
      sketch: "/projects/ronixe/sketch.webp",
      hero: "/projects/ronixe/hero.webp",
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
    timeline: "3 weeks", // [MOCK]
    year: "2024", // [MOCK]
    stack: ["Figma"],
    images: {
      final: "/projects/monilog/final.webp",
      sketch: "/projects/monilog/wireframe.webp",
      hero: "/projects/monilog/hero.webp",
      gallery: ["/projects/monilog/01.webp"],
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

/** 1-based position, for the "2 of 5" indicator on next-project blocks. */
export const getProjectPosition = (slug: string) => ({
  index: projects.findIndex((p) => p.slug === slug) + 1,
  total: projects.length,
});
