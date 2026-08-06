/**
 * Shared domain and component types.
 *
 * Design-token unions (surfaces, spacing, text sizes) live here so a component
 * cannot invent a variant that has no styling behind it.
 */

/* ---------- Projects ---------- */

/**
 * "case-study" renders the 13-block narrative template.
 * "showcase" renders the short visual template.
 */
export type Tier = "case-study" | "showcase";

export interface ProjectImages {
  /** Card default state. */
  final: string;
  /** Card hover-reveal target — wireframe or sketch. */
  sketch: string;
  hero: string;
  /**
   * Optional. When absent the case study renders the written "before"
   * description and omits the before/after slider entirely.
   */
  before?: string;
  gallery: string[];
}

export interface Project {
  slug: string;
  name: string;
  tier: Tier;
  order: number;
  featured: boolean;
  /** ≤ 12 words. What CHANGED, not what was built. */
  outcome: string;
  tags: string[];
  client: string;
  role: string[];
  timeline: string;
  year: string;
  stack: string[];
  images: ProjectImages;
}

/* ---------- Design system ---------- */

/** Section surface treatments, mapped to the .surface-* classes in globals.css. */
export type SurfaceVariant = "gradient" | "brand" | "warm" | "flat" | "raised";

/** Vertical rhythm: major = 120/80px, standard = 96/64px. */
export type SectionSpacing = "major" | "standard";

export type TextSize = "lg" | "base" | "sm" | "caption";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
