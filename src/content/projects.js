/**
 * Selected Work — 6 projects, copy verbatim from
 * /docs/lespa-restructure-copy.md §3.
 *
 * `accentVar` names the CSS variable holding that project's own primary brand
 * colour (defined in globals.css). Selected Work scopes it onto the card as
 * --project, so the title, link, tags and hover glow all theme to the project
 * rather than the site green. Provenance of each colour is noted inline.
 *
 * `liveUrl` is present only where a live site actually exists — per the
 * structure doc, a project with no live URL renders no link at all, not a
 * placeholder. The copy doc's project table carries no URL column, so the three
 * URLs below come from the case-study docs in /docs (Ronixe) and the project
 * records kept from the previous build (Monilog, Diwa).
 *
 * `image` is the card's mockup; `backdrop` is a second image from the same
 * project that fills the card behind everything on hover, at low opacity.
 *
 * TODO: asset needed — assets doc §3, "Updated project mockup/image … one per
 * project (6 total)". Both use the real existing Lespa project images; swap each
 * for its updated mockup when those are produced.
 */
export const projects = [
  {
    slug: "monilog",
    name: "Monilog",
    tags: ["Brand", "Product Design", "Flutter", "React"],
    subtext:
      "A personal finance app for people without reliable internet or a bank account. Works offline, no sign-up required. I designed and built it myself, brand to code.",
    // Monilog mint — docs/monilog-case-study-final.md: "Mint #2DD4BF carries movement".
    accentVar: "--project-monilog",
    liveUrl: "https://monilog.vercel.app",
    image: "/homepage_project_cards/monilog-mobile.webp",
    imageAlt: "Monilog's mobile app screens beside its brand mark.",
    hoverImage: "/monilog_case_study_images/pencil_sketch.webp",
    hoverImageAlt: "Monilog's mark sketched by hand.",
    backdrop: "/homepage_project_cards/monilog-logo-green.webp",
  },
  {
    slug: "diwa",
    name: "Diwa",
    tags: ["Brand Identity", "Logo Design", "Guidelines"],
    subtext:
      "Brand identity for a solar-powered cooling company in Cameroon. Logo, colors, and a full guidelines system, built to work in one color on any surface.",
    // Diwa blue — sampled from the delivered mark, lifted to clear AA on #0E1110.
    accentVar: "--project-diwa",
    liveUrl: "https://diwa-air.com",
    image: "/homepage_project_cards/diwa_logo_on_dress.webp",
    imageAlt: "The Diwa mark applied to a garment.",
    hoverImage: "/homepage_project_cards/diwa_concepts.webp",
    hoverImageAlt: "Diwa's annotated concept sheet.",
    backdrop: "/homepage_project_cards/diwa_concepts.webp",
  },
  {
    slug: "ronixe",
    name: "Ronixe",
    tags: ["Brand Identity"],
    subtext:
      "Brand identity for a software development company. A wordmark and icon built around momentum, live on their site today.",
    // TODO: asset needed — assets doc §3, "per-project primary brand color (hex
    // value)". Ronixe's mark is monochrome and no brand hex is recorded in any
    // doc, so this is a warm neutral standing in until the real value arrives.
    accentVar: "--project-ronixe",
    liveUrl: "https://ronixe.com",
    image: "/homepage_project_cards/ronixe_wordmark.webp",
    imageAlt: "The Ronixe wordmark and icon lockup.",
    hoverImage: "/homepage_project_cards/ronixe-icon-dark.webp",
    hoverImageAlt: "The Ronixe icon on its dark theme.",
    backdrop: "/homepage_project_cards/ronixe-icon-dark.webp",
  },
  {
    slug: "qiroke",
    name: "Qiroke",
    tags: ["Brand Identity", "Web UX"],
    subtext:
      "Brand and web design for a tech collective I co-founded, offering five services under one identity.",
    // Qiroke aqua — sampled from the delivered icon.
    accentVar: "--project-qiroke",
    image: "/homepage_project_cards/qiroke_homepage.webp",
    imageAlt: "The Qiroke icon, a flowing Q.",
    hoverImage: "/homepage_project_cards/qiroke_icon.webp",
    hoverImageAlt: "The Qiroke icon, a flowing Q.",
    backdrop: "/homepage_project_cards/qiroke_homepage.webp",
  },
  {
    slug: "pikamgo",
    name: "PikamGo",
    tags: ["Brand Identity", "Logistics"],
    subtext:
      "A delivery app for tracking packages from pickup to drop-off, built under Qiroke.",
    // PikamGo International Orange — docs/pikamgo-case-study.md (#FF5900),
    // lifted slightly for AA on #0E1110.
    accentVar: "--project-pikamgo",
    image: "/homepage_project_cards/pikamgo_mobile.webp",
    imageAlt: "PikamGo's delivery tracking screens.",
    hoverImage: "/homepage_project_cards/pikamgo-wordmark-dark.webp",
    hoverImageAlt: "The PikamGo wordmark on dark.",
    backdrop: "/homepage_project_cards/pikamgo-wordmark-dark.webp",
  },
  {
    slug: "yisi",
    name: "Yisi",
    tags: ["Brand Identity"],
    subtext:
      "Brand identity for Ndzi Ernestine's catering service. A wordmark built entirely from cutlery.",
    // Yisi orange — sampled from the delivered wordmark.
    accentVar: "--project-yisi",
    image: "/homepage_project_cards/yisi_logo_orange.webp",
    imageAlt: "The Yisi wordmark, drawn from cutlery.",
    hoverImage: "/homepage_project_cards/yisi_artboard.webp",
    hoverImageAlt: "The Yisi wordmark drawn out on its artboard.",
    backdrop: "/homepage_project_cards/yisi_artboard.webp",
  },
];
