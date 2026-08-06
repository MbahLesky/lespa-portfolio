/**
 * Case study and showcase prose.
 *
 * Pikamgo is transcribed from /docs/mock-content.md Part 2. Diwa and Qiroke are
 * written to the same block structure and target lengths so the template can be
 * built and reviewed at realistic size.
 *
 * EVERY CLAIM IN THIS FILE IS INVENTED. The [MOCK] markers are deliberately
 * left in source so they stay greppable — replace all of it before launch.
 */

export interface Callout {
  marker: string;
  text: string;
}

export interface Decision {
  chose: string;
  rejected: string;
  why: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

/** The 13-block narrative template. */
export interface CaseStudy {
  /** One-line outcome shown under the project name in the hero. */
  problem: string[];
  before: {
    /** Used when images.before is absent — the slider is skipped entirely. */
    description: string;
    callouts: Callout[];
  };
  whatIDid: string;
  research: string[];
  decisions: Decision[];
  system: string;
  after: string;
  outcomes: string[];
  testimonial?: Testimonial;
  differently?: string;
}

/** The short visual template. */
export interface Showcase {
  context: string;
}

export const caseStudies: Record<string, CaseStudy> = {
  pikamgo: {
    // [MOCK] ~80 words
    problem: [
      "Pikamgo had customers, but they were losing most of them at checkout. The booking flow ran seven screens deep, asked for information twice, and gave no indication of progress. Support was fielding the same three questions every day — all of them answerable by the interface, if the interface had bothered to answer them.",
      "The brand had the same problem in a different form: three different logos in circulation and no rule about which to use.",
    ],
    before: {
      description:
        "The original flow spread a single booking across seven screens. Nothing indicated how far along you were, payment details were requested before any price appeared, and a mistyped field sent you back to the start.", // [MOCK]
      callouts: [
        { marker: "01", text: "Seven steps, no progress indicator" },
        { marker: "02", text: "Payment details requested before pricing shown" },
        { marker: "03", text: "No error recovery — one mistake restarts the flow" },
      ],
    },
    // [MOCK] ~50 words
    whatIDid:
      "Full scope: brand identity, design system, and the frontend build. The client's developer handled the backend and payment integration. I owned everything the user sees.",
    // [MOCK] ~80 words
    research: [
      "Six user sessions, all on mid-range Android over mobile data — the actual conditions, not a desktop simulation. Two findings reshaped the work: people abandoned when they couldn't see the total, and most were booking one-handed while doing something else.",
      "Constraint: the existing backend couldn't be changed. Every improvement had to happen in the interface layer.",
    ],
    decisions: [
      {
        chose: "Three-step flow with a persistent price summary",
        rejected: "Single-page form",
        why: "Long forms test worse on mobile than short sequenced steps. Progress visibility mattered more than page count.",
      },
      {
        chose: "Saira for headings",
        rejected: "Inter",
        why: "Needed technical character without coldness. Inter is clean but anonymous — it would have made the brand disappear.",
      },
      {
        chose: "System-native date picker",
        rejected: "Custom calendar component",
        why: "Familiarity beat control. Users already knew how their own picker worked, and it removed an accessibility liability.",
      },
      {
        chose: "Design tokens from day one",
        rejected: "Styling as I went",
        why: "The client planned two more products. Tokens meant the second one starts at week zero, not week six.",
      },
    ],
    // [MOCK] ~40 words
    system:
      "Twelve colour tokens, a six-step type scale, an 8px spacing system, and eighteen components. Documented, versioned, and handed over. The client's developer extended it without asking me a question.",
    after:
      "The rebuilt flow across three screens, shown in context — in hand, at desk, and as a flat interface frame.", // [MOCK]
    // [MOCK] ~60 words
    outcomes: [
      "Booking completion improved noticeably in the first month. Support volume on checkout questions dropped to near zero. The client now updates content and adds pages without involving me — which was the point.",
    ],
    testimonial: {
      quote:
        "[MOCK — real client quote goes here. Two sentences in their own voice. Do not polish it into corporate language.]",
      name: "[Name]",
      role: "[Role], Pikamgo",
    },
    // [MOCK] ~40 words
    differently:
      "I built the component library before validating the flow with users. It worked out, but it was luck. Next time the flow gets tested first and the components follow.",
  },

  diwa: {
    // [MOCK] ~80 words
    problem: [
      "Diwa was three products wearing three different faces. The mobile app, the marketing site, and the printed materials had each been made by whoever was available, and none of them agreed on a colour, a typeface, or even the shape of a button.",
      "Customers who met the brand on paper did not recognise it in the app. Internally, every new screen restarted an argument that had already been had twice.",
    ],
    before: {
      // No before image exists for this project, so the block is written rather
      // than shown, and the before/after slider is skipped entirely.
      description:
        "Three parallel versions of the same brand: a wordmark set in a different typeface on each surface, four greens in circulation, and spacing that ranged from 5px to 22px with no rule behind either number.", // [MOCK]
      callouts: [
        { marker: "01", text: "Four brand greens, none of them documented" },
        { marker: "02", text: "Wordmark set in a different face on each surface" },
        { marker: "03", text: "No shared spacing rule between app and print" },
      ],
    },
    // [MOCK] ~50 words
    whatIDid:
      "Brand identity, the design system, and the mobile UI. The client's team built the Flutter app against the library I handed over. I did not touch the backend or the print production.",
    // [MOCK] ~80 words
    research: [
      "I audited every existing asset first — forty-one files across app, web, and print — and grouped them by what they actually shared rather than what they were supposed to. Two greens accounted for most of the real usage, which made the palette decision straightforward.",
      "Constraint: the app was already in stores with an active user base, so the visual change had to land without a re-onboarding flow.",
    ],
    decisions: [
      {
        chose: "One palette of six, documented as tokens",
        rejected: "A wider palette with usage guidelines",
        why: "Guidelines get read once. Tokens get imported. Fewer colours with a name each survived handover; a longer list would have drifted again inside a quarter.",
      },
      {
        chose: "Shared 8px spacing scale across app and print",
        rejected: "Separate scales per medium",
        why: "One scale meant a layout could move between surfaces without being redrawn. The print team lost some fine control and got consistency in exchange.",
      },
      {
        chose: "Incremental visual rollout",
        rejected: "A single redesign release",
        why: "The app had users who knew where things were. Shipping the system underneath first meant the visible change arrived without moving anything.",
      },
    ],
    // [MOCK] ~40 words
    system:
      "Six colour tokens, a five-step type scale, an 8px spacing system, and a Flutter component library the client's team extends themselves. The print templates read from the same token sheet.",
    after:
      "The system applied across the app, the site, and printed material — the same brand in three places.", // [MOCK]
    // [MOCK] ~60 words
    outcomes: [
      "The team stopped relitigating colour and spacing on every new screen, which was the real cost. New screens now start from the component library instead of a blank file, and the print templates no longer need me to update them.",
    ],
    // [MOCK] ~40 words
    differently:
      "I documented the system after building it rather than alongside it. The documentation was accurate but it arrived a fortnight late, and in that gap the team made three choices I had to go back and fold in.",
  },

  qiroke: {
    // [MOCK] ~80 words
    problem: [
      "Every new page at Qiroke needed a developer. Marketing would write copy, file a ticket, and wait — sometimes a fortnight — for a layout that was almost always a rearrangement of blocks the site already had.",
      "The bottleneck was not capacity. It was that nothing on the site was composable: each page was bespoke markup, so nothing could be reused without being rebuilt.",
    ],
    before: {
      description:
        "Fourteen pages, each hand-built. The same testimonial block appeared on five of them in five slightly different implementations, so a copy change meant five separate edits.", // [MOCK]
      callouts: [
        { marker: "01", text: "Every page hand-built as bespoke markup" },
        { marker: "02", text: "The same block reimplemented five times over" },
        { marker: "03", text: "A copy change required a developer and a deploy" },
      ],
    },
    // [MOCK] ~50 words
    whatIDid:
      "Product design and the frontend build. I defined the block library and implemented it in Next.js. The client's team handled content modelling in the CMS once the components existed.",
    // [MOCK] ~80 words
    research: [
      "I pulled apart all fourteen existing pages and catalogued every distinct block. What looked like fourteen unique layouts turned out to be nine repeating patterns and a handful of one-offs that nobody had asked for.",
      "Constraint: no redesign. The client wanted the site they had, assembled differently — which kept the scope to structure rather than surface.",
    ],
    decisions: [
      {
        chose: "Nine composable blocks",
        rejected: "A general-purpose page builder",
        why: "A builder would have let them make anything, including a mess. A short list of blocks meant every page they assemble is still on-brand without review.",
      },
      {
        chose: "Content modelled in the CMS, layout fixed in code",
        rejected: "Layout controls exposed to editors",
        why: "Editors wanted to publish, not to art-direct. Keeping layout in code removed the decision they did not want to be making.",
      },
      {
        chose: "Progressive enhancement on every block",
        rejected: "Client-rendered composition",
        why: "Pages had to be indexable and fast on mobile data. Server components meant the markup arrives complete and the JavaScript is optional.",
      },
    ],
    // [MOCK] ~40 words
    system:
      "Nine blocks, each with a documented content model, responsive breakpoints, and an accessibility checklist signed off against WCAG AA. Composition happens in the CMS; the rules live in code.",
    after:
      "Pages assembled from the block library, plus the editor view the team now works in.", // [MOCK]
    // [MOCK] ~60 words
    outcomes: [
      "The team ships new pages without a developer, which was the entire brief. Time from copy to published page went from a fortnight to an afternoon, and the shared blocks mean a wording change now happens once instead of five times.",
    ],
    // [MOCK] ~40 words
    differently:
      "I built all nine blocks before anyone had assembled a page with them. Two turned out to be near-duplicates that should have been one, and I only learned that once the team started composing.",
  },
};

export const showcases: Record<string, Showcase> = {
  ronixe: {
    // [MOCK] ~100 words
    context:
      "Ronixe needed an identity that would still hold together at scale — a mark that reads at 16px in a browser tab and at two metres on a trade stand, without a special version for either. The wordmark is drawn rather than set, so the letterforms stay even at small sizes, and the symbol works as a standalone avatar. The palette runs deliberately short: two greens and a neutral, each with a defined role, so nobody has to decide which one to use. Everything ships as tokens alongside the artwork.",
  },
  monilog: {
    // [MOCK] ~100 words
    context:
      "Monilog's dashboard was built for the people who made it. Everyone else — the warehouse staff who actually use it — met a wall of eleven-point tables and unlabelled status codes. The redesign starts from what those staff need to know in the first three seconds: what needs attention, what is on track, and what can wait. Numbers are typeset at a size you can read across a room, status is carried by shape and label rather than colour alone, and the dense table is still there, one tap away, for the people who want it.",
  },
};
