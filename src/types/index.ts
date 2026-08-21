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

/** One row of the sticky bar under the project hero. */
export interface MetaField {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  name: string;
  tier: Tier;
  order: number;
  featured: boolean;
  /** ≤ 12 words, on the card. What CHANGED, not what was built. */
  outcome: string;
  /** The line under the name on the project's own hero. */
  hero: string;
  tags: string[];
  /**
   * The meta bar, in the order it should read. A list rather than fixed fields
   * because the rows genuinely differ: one project ships a stack and platforms,
   * another a sector and a market, and a blank "Timeline" on a project that
   * never had one reads worse than no row at all.
   */
  meta: MetaField[];
  /**
   * Structured duplicates of what machines need — the OG image, the JSON-LD,
   * and the role list on the case study. The bar above is what people read;
   * these are what is read about the page.
   */
  client: string;
  role: string[];
  year: string;
  stack: string[];
  /** Where it can be seen running, when that is a real place. */
  liveUrl?: string;
  /**
   * Mine rather than a client's. Labelled in the grid: a self-initiated piece
   * shown unmarked among client engagements invites the reader to work out the
   * difference for themselves, and think less of the work for it.
   */
  selfInitiated?: boolean;
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
