/**
 * Case study and showcase prose, from the per-project documents in /docs.
 *
 * Sources: monilog-case-study-final.md, diwa-case-study-final.md,
 * pikamgo-case-study.md, ronixe-case-study.md, qiroke-showcase-final.md,
 * yisi-showcase.md.
 *
 * Two things to know before editing:
 *
 * DIWA CARRIES A CONFIDENTIALITY RULE. Its final document removes the audit
 * block and the before/after outright, and forbids showing the earlier marks,
 * itemising their flaws, or describing what was wrong with them in specifics —
 * all of that would reveal the contents of a confidential brief. A second
 * document, diwa-audit-block.md, restores exactly that material. The final
 * document wins here. Do not merge the audit block in without the client's
 * written agreement.
 *
 * LESPA IS THE ONE INVENTED ENTRY. Every other project below is transcribed
 * from its document. The Lespa brand case study has not been written yet, so
 * its prose is placeholder and marked [MOCK]. [CONFIRM] marks a real detail
 * that its source document flagged as unverified.
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

/** A titled run of prose. The narrative blocks genuinely differ per project —
 *  one opens on a client, another on a set of constraints — so the ones that
 *  are not shared are carried as these rather than forced into fixed fields. */
export interface Block {
  title: string;
  body: string[];
}

export interface CaseStudy {
  /** Opens the page: the problem, or the client it belongs to. */
  problem: string[];
  /** Defaults to "The problem" where a project opens on something else. */
  problemTitle?: string;
  /**
   * The starting point, where one exists AND may be shown. Absent for a
   * greenfield project, and absent for anything under a confidentiality rule.
   */
  before?: { description: string; callouts: Callout[] };
  /** Stands in for `before`: the brief, the constraints, or a plain statement
   *  that there was nothing there before. */
  brief?: Block;
  whatIDid: string;
  /** Research, or exploration. */
  research?: string[];
  researchTitle?: string;
  decisions: Decision[];
  /** Between the decisions and the system. */
  beforeSystem?: Block[];
  system: string;
  /** Between the system and what shipped. */
  afterSystem?: Block[];
  after: string;
  afterTitle?: string;
  outcomes: string[];
  testimonial?: Testimonial;
  differently?: string;
  /**
   * Renders the design system live inside "The system", from the tokens this
   * site is actually built on. Only true for the brand case study, where the
   * system under discussion is the one drawing the page.
   */
  liveSystem?: boolean;
}

/** The short visual template. */
export interface Showcase {
  context: string;
}

export const caseStudies: Record<string, CaseStudy> = {
  monilog: {
    problem: [
      "Most personal finance apps assume two things: a stable internet connection and a bank account. In Cameroon, neither is safe to assume.",
      "Money moves through MTN MoMo and Orange Money as much as through banks — but global finance apps treat mobile money as a footnote, if they support it at all. Connectivity drops. Data is expensive. And nearly every one of them opens with a sign-up wall demanding an email address before it will show you anything.",
      "The people who most need to track their money have the least usable tools for doing it.",
    ],
    brief: {
      title: "The constraints",
      body: [
        "Four rules, set before any design work started.",
        "Works with no connection. Not offline mode as a fallback — local storage as the single source of truth, with sync added later as a feature rather than a dependency.",
        "No sign-up. No email, no password, no verification code. First transaction recorded inside two minutes.",
        "Mobile money is a first-class account type, not a spending category.",
        "Bilingual from day one. Cameroon is officially EN/FR, and shipping English-only would exclude half the market.",
      ],
    },
    whatIDid:
      "Everything the user sees and most of what they don't: brand identity, product design, the Flutter mobile app, the React web companion, and the marketing site. Self-initiated. I set the scope, made every call, and shipped it — which also means every weakness in it is mine.",
    decisions: [
      {
        chose: "Local database as the source of truth",
        rejected: "Cloud-first with an offline cache",
        why: "Offline-as-fallback breaks in exactly the conditions it's meant for — the app opens, waits on a request, and hangs. Building on Drift over SQLite means there is no network call in the critical path at all. Sync arrives in v2 as an addition, not a repair.",
      },
      {
        chose: "No account, no email, no password",
        rejected: "Standard registration",
        why: "Every sign-up field is a place people leave. For a finance app the objection is sharper — you're asking for an email before showing any value, in a category where people are already wary about who sees their money. No account also means nothing to breach.",
      },
      {
        chose: "Mobile money as an account type",
        rejected: "Mobile money as a transaction category",
        why: "MoMo isn't a kind of spending, it's where the money lives. As a category, users couldn't see a MoMo balance — which is the number most of them check most often.",
      },
      {
        chose: "Dark-first with a single bright accent",
        rejected: "Light-first",
        why: "The app gets opened at the counter, in the market, in the evening. Dark reads better in low light and costs less battery on OLED. One accent means every positive number and every primary action share a colour, so there's one thing to learn instead of four.",
      },
    ],
    beforeSystem: [
      {
        title: "The mark",
        body: [
          "The name gave me an M. The product gave me three other things to say — tracking, growth, and money — and I wanted the letter to carry all of them rather than sit beside icons that did.",
          "Three rounded bars make the M. They're also a bar chart: unequal heights, which is what a month of spending actually looks like. The arrow rises through the valley of the M, so growth is drawn by the letterform instead of added to it. And the middle bar carries a single dot — the wallet clasp, straight from the sketch.",
          "One shape. Four readings. Nothing bolted on.",
        ],
      },
    ],
    system:
      "Deep teal #0F766E carries structure — bars, headings, the weight of the mark. Mint #2DD4BF carries movement: the arrow, every positive number, every primary action. Two colours, two jobs. On a dark interface that means the eye learns one accent instead of sorting four.",
    afterSystem: [
      {
        title: "The interface",
        body: [
          "The dashboard answers one question first: how much do I have right now? Balance at the top, income and expenses beneath it, then four cards — total in, total out, today's spending, month balance.",
          "Below that, accounts. Cash, bank, MoMo, savings, each with its own balance, because one combined number hides the thing people actually need to see.",
          "Five items in the bottom bar, Add Transaction raised in the centre. Recording money is the daily action. Everything else is occasional.",
        ],
      },
      {
        title: "Built, not just designed",
        body: [
          "Flutter for mobile, with Drift over SQLite as the local store. React for the web companion. Both run on the same brand system — same tokens, same type scale, same components — so the phone and the browser feel like one product rather than two builds that happen to share a logo.",
          "Import and export in CSV, JSON, and XLSX, because data you can't take out isn't really yours. Local backup. Daily reminders. No backend at all in v1.",
        ],
      },
    ],
    afterTitle: "In use",
    after:
      "v1.0 is in beta at monilog.vercel.app. Android app and web companion, both live.",
    outcomes: [
      "v1.0 is in beta — offline Flutter app, React web companion, and marketing site, all live. Play Store release is next.",
      "v2 adds cloud sync through Supabase and PowerSync, so the offline-first architecture gains sync without giving up local storage as the source of truth. v3 is the one I'm most interested in: recording a transaction by sending a WhatsApp message.",
    ],
    // [MOCK] The source document leaves this one deliberately unwritten: it
    // wants a real finding from beta, and says a specific finding beats a
    // plausible one because readers can tell the difference. Replace it.
    differently:
      "I designed the full account model before testing whether anyone wanted six account types. If beta shows most people use two or three, the extra options add setup friction at exactly the moment I was trying to remove it.",
  },

  diwa: {
    // Confidentiality: nothing here describes the earlier marks, their flaws,
    // or the brief. See the note at the head of this file.
    problemTitle: "The client",
    problem: [
      "Diwa Innovation builds solar-powered air coolers and refrigerators out of porous terracotta. Founded in Maroua, in Cameroon's Far North, by an energy engineer who holds a patent on the technology.",
      "The product works on physics rather than electricity: water evaporating through fired clay pulls heat out of the air. It cools without a grid connection, in a region where 40°C is a normal afternoon and the grid is unreliable.",
      "They won first prize at EDF Pulse Africa in Paris, and a pan-African TotalEnergies award. The engineering had already been recognised. They came to me to rework the visual identity.",
    ],
    brief: {
      title: "The brief",
      body: [
        "The mark had to do four things at once.",
        "Carry the name — \"Diwa\" means water, life, and gentleness across several Lake Chad basin languages. Carry the product — evaporative cooling, terracotta, sun. Survive one colour, because it prints on white plastic, brown cardboard, adhesive tape, and vehicle panels. And hold at favicon size, because the brand lives on WhatsApp Business as much as anywhere else.",
        "No gradients. No photographic elements. Flat first, everything else after.",
      ],
    },
    whatIDid:
      "Concept development, logo design, colour and type system, and a 31-page guidelines document. Fifteen files across four formats. Two weeks from brief to delivery. The client's team handles engineering, product, and the website — I owned the mark and the rules around it.",
    researchTitle: "Exploration",
    research: [
      "Paper first. Four ideas kept coming back: water drop, breeze lines, leaf, and the letters D and A.",
      "Five made it into vector. Two built from the D, three from the A. Each drawn as a single flat shape before anything else — if it doesn't work in one colour at 20 pixels, nothing else about it matters.",
      "That's where the problem showed up.",
    ],
    decisions: [
      {
        chose: "Killed three of my own concepts",
        rejected: "02, 03, and 04",
        why: "They read as flames. 02 as a flame swirl, 03 as fire if used at the wrong size, 04 unmistakably. Diwa sells cooling in a region where 40°C is normal. A mark that reads as fire isn't a stylistic miss — it's the opposite of the product. Two of them were the most interesting shapes I drew. They still had to go.",
      },
      {
        chose: "One shape carrying three ideas",
        rejected: "Adding elements to signal the product",
        why: "The obvious move is to bolt on airflow lines or fan blades so people know what's being sold. That makes a diagram, not a mark. Instead the D became a water drop, a breeze line cuts through it, and that cut forms a leaf inside the drop. Water, air, and terracotta ecology — one object, no added parts.",
      },
      {
        chose: "The D as the mark",
        rejected: "A separate icon beside the wordmark",
        why: "An icon next to a name is two things to maintain and two things to misuse. Building the drop into the D means the icon and the wordmark are the same object. Pull the D out for a favicon and the brand is still legible.",
      },
      {
        chose: "Merriweather and Inter",
        rejected: "System defaults",
        why: "Georgia and Calibri read as \"document\", not \"brand\". Merriweather keeps editorial warmth with proper display weights. Inter holds at 12pt on a packaging back panel.",
      },
    ],
    beforeSystem: [
      {
        title: "Three finalists",
        body: [
          "Three concepts made it to full lockups, and each had a risk I wrote down before showing them.",
          "01 — the A as a drop with a leaf inside. Clean, but it could read as \"diw\" plus a symbol.",
          "02 — sun, breeze, and a leaflet built from the d. Conceptually the richest, but it risked reading as \"siwa\".",
          "03 — the D as drop, breeze, and leaf in one form. No reading ambiguity, one object, scales cleanly.",
          "I presented two. They chose the D.",
        ],
      },
      {
        title: "The mark",
        body: [
          "The D is a water drop. A breeze line cuts through it, and the cut forms a leaf inside the drop. Three meanings, one shape.",
          "It works in blue, green, ochre, black, or reversed to white. As a fullmark with the tagline, as a wordmark alone, or as the D on its own at 20 pixels.",
        ],
      },
    ],
    system:
      "Three variants — icon, wordmark, fullmark — each with a defined use and a defined misuse. Four approved colour versions. Clear space at a quarter of the logo width. Minimum sizes down to 20px. Eight explicit prohibitions, each with a picture, because a rule without an example gets broken. Thirty-one pages. Fifteen files. Four formats each.",
    afterTitle: "In use",
    after:
      "Live at diwa-air.com. The same lockup runs white on the dark hero and blue on the loading screen — both pulled from the delivered files, neither redrawn.",
    outcomes: [
      "Two weeks from brief to delivered system.",
      "The mark is live at diwa-air.com in two colourways, working as a header lockup and a loading state without either being redrawn. The icon holds at favicon size. The fullmark holds at vehicle scale. Same files.",
    ],
    // Testimonial pending from Didier Dinamou, Founder & CEO. Deliberately
    // absent rather than empty: ship the section without a proof block rather
    // than with a box waiting to be filled.
    differently:
      "The tagline lockup only exists in French. Their site already has an English toggle, and the expansion plan runs into anglophone markets. I should have drawn the English lockup alongside the French one instead of leaving a gap the client will eventually have to fill without me.",
  },

  pikamgo: {
    problem: [
      "In Bamenda, sending a package meant finding someone going that way, negotiating a price, and hoping it arrived. No tracking, no verified courier, no way to confirm a price before committing. Small vendors lost time coordinating deliveries by phone; individuals had no on-demand option for errands or parcels.",
      "As Creative Director at Qiroke, the studio I co-founded, I was brought in to give this problem a product and a face — a brand and an app that could make local delivery feel as reliable as it should already be.",
    ],
    before: {
      description:
        "Six early logo directions, explored in parallel: a hand cradling a package with a literal palm and fingers, a hexagonal \"G\" grip, a two-block \"TG\" monogram, a plain cube icon. Every non-hand direction tried to signal trust through pure geometry — a box, a grip shape, a monogram — with nothing carrying the idea of care. The literal hand-and-package sketch carried the right meaning but was too illustrative to survive a 24px app icon.",
      callouts: [
        { marker: "01", text: "Geometry signalling trust, nothing carrying care" },
        { marker: "02", text: "The literal hand was too illustrative at 24px" },
        { marker: "03", text: "Three name spellings in circulation at once" },
      ],
    },
    whatIDid:
      "As Creative Director at Qiroke — the studio I co-founded — I led the full identity for PikamGo, our own product: naming direction, logo system, colour palette, and the UI for the app's core screens (Pickers directory, delivery tracking, package detail). Development sat with our CTO; my scope was everything the user sees.",
    research: [
      "The name itself needed settling first — PicknGo, PiknGo, and PikamGo all appeared across early drafts before PikamGo locked in, chosen for clearer pronunciation across Bamenda's English/French-mixed context.",
      "The mark had to work as a full-colour hero image and as a single-colour 24px app icon, on white, black, and brand-orange backgrounds. And it had to avoid reading like the generic \"package + hand\" mark every delivery app defaults to.",
    ],
    decisions: [
      {
        chose:
          "The \"P\" abstracted into a folded package cradled by arm and hand forms — carrying, not just holding",
        rejected: "Pure geometric marks: hexagonal grip, \"TG\" monogram, plain cube icon",
        why: "Geometry alone made PikamGo interchangeable with any delivery brand. The arm and hand construction keeps the safety-and-care idea structural, not decorative, while abstracting it enough to survive a 24px icon.",
      },
      {
        chose: "PikamGo as the final name",
        rejected: "PicknGo / PiknGo",
        why: "One spelling, one pronunciation, one search term — inconsistent naming across pitch materials was actively costing recall.",
      },
      {
        chose:
          "Flare Motion palette — International Orange #FF5900 core, warm supporting tones, Cod Gray #1B1B1B for contrast",
        rejected: "An earlier cool-blue cube exploration",
        why: "Blue read as generic corporate tech and didn't differentiate from every other delivery app on the App Store. Orange signals urgency and motion — the actual product promise.",
      },
      {
        chose: "A condensed, geometric wordmark",
        rejected: "A motion-trail glitch treatment on the P, built from dashes and scan-lines",
        why: "Visually the most distinctive option, but illegible at favicon size — the dashes vanished before the letterform did.",
      },
    ],
    system:
      "One primary mark — package and arms carrying it, safety and care built into the \"P\" — plus a monochrome icon-only variant for small placements, and a three-tier orange scale running from #FF5900 down to a soft #FCDED3 tint, anchored by Cod Gray #1B1B1B for text and contrast.",
    after:
      "The mark and palette carried straight into the product: a Pickers directory showing verified couriers with ratings and live availability, a delivery detail screen breaking down package size, priority, and drop-off info, and a home screen surfacing the user's current delivery status at a glance. Same orange, same type, same spacing logic — brand and product built as one system rather than a logo applied after the fact.",
    outcomes: [
      // [CONFIRM] pilot status before publishing — the plan targets a Q3 2025
      // Bamenda launch, and this paragraph says "planned" until that is known.
      "A single, consistent identity now runs across the app, the pitch deck, and the business plan used to raise pilot funding — no small thing after three name variants and six visual directions were floating across separate documents. The pilot launch in Bamenda is planned, with a founding team of five now working from one brand system instead of five interpretations of it.",
    ],
    differently:
      "Lock the name before producing collateral, not after. Three spellings sat in circulation for longer than they should have, and every doc built during that window had to be corrected once PikamGo was confirmed.",
  },

  ronixe: {
    problem: [
      "Ronixe is a software development company in Bamenda, Cameroon — web, mobile, e-commerce, UI/UX, API integration, ongoing support. Their own positioning is \"we build applications from conception to launch.\"",
      "The mark needed to say technical and forward-moving without leaning on the two clichés every dev agency reaches for: a literal code bracket, or a generic rocket.",
    ],
    brief: {
      title: "The starting point",
      body: [
        "There wasn't one. No prior identity existed — this was greenfield, not a redesign, so there is no before to show and no transformation to claim.",
      ],
    },
    whatIDid:
      "Designed the full identity system: wordmark, standalone icon usable alone as a favicon or app icon, and a combined lockup — each built for both light and dark surfaces, since the product itself ships dark-themed.",
    research: [
      "The icon had to hold up at favicon size and as a full lockup on a marketing site, and needed to work on Ronixe's actual dark UI as well as light contexts like documents and stationery.",
    ],
    decisions: [
      {
        chose:
          "A diagonal upward arrow set inside an open rounded-square frame, with the R built from the negative space where the arrow crosses the frame's edge",
        rejected: "A literal code-bracket mark",
        why: "Every second dev-agency logo reaches for a bracket. An upward arrow reads as momentum and launch — which is Ronixe's own stated positioning — and doubles as the letterform instead of sitting beside it. The same design position runs through Diwa, Monilog, Qiroke and Yisi: meaning built into the letter, not added next to it.",
      },
      {
        chose: "Full light and dark variant sets for wordmark, icon and lockup independently",
        rejected: "A single-colour mark with opacity shifts for dark mode",
        why: "The live product runs a dark theme by default. A mark that was only adapted for dark rather than purpose-built for it would have looked like an afterthought on the actual site.",
      },
    ],
    system:
      "A clean geometric wordmark paired with the icon; a standalone R-mark that works down to favicon size; and the two combined as a lockup. Each asset ships light and dark — six files covering every surface the brand would meet.",
    after:
      "Live in production at ronixe.com — the mark appears in the site header, the favicon, and the social meta images, running on the dark theme it was built for.",
    outcomes: [
      "Unlike brand work that ends at a guidelines PDF, this one is verifiable: the mark is live, in production, on a real client's real site — not a mockup. That is the proof point for this page.",
    ],
    differently:
      "No formal guidelines document shipped alongside the assets — just the file set. It works because the system is simple enough to hold together on its own, but Diwa and Qiroke both got a documented clear-space and misuse spec, and a live production brand arguably needed that discipline too.",
  },

  "lespa-brand": {
    // [MOCK] Every line of this entry is invented. It is the only case study
    // here without a source document — see portfolio-project-tier-list.md,
    // which flags the Lespa brand as not yet written up.
    problem: [
      "I had been building brands for other people for three years and had none of my own. My work went out under three different marks depending on which file I opened last, my proposals were typeset in whatever the template came with, and the site I sent people to was a template I had not touched since I bought it.",
      "The gap that mattered was not vanity. I was asking clients to trust me with their identity while visibly not having solved my own.",
    ],
    before: {
      description:
        "Three logo variants in circulation, no palette written down anywhere, and a portfolio built on a theme whose spacing I could not change without fighting it. Every new proposal started by hunting for the file I used last time.",
      callouts: [
        { marker: "01", text: "Three marks, no rule about which to use" },
        { marker: "02", text: "No documented palette or type scale" },
        { marker: "03", text: "Portfolio on a theme I could not extend" },
      ],
    },
    whatIDid:
      "All of it, which is the point: the mark, the system it implies, and the site that proves the system works. No handoff, because there was nobody to hand off to — and no excuse for a seam anywhere.",
    research: [
      "The audience is two groups who want opposite things. Founders want to see finished work and be reassured. Developers and students want to see the reasoning and the file underneath. A brand that speaks only to one loses the other.",
      "Constraint I set myself: everything the site is built on has to be publishable. If a token could not be shown on the page without embarrassment, it was the wrong token.",
    ],
    decisions: [
      {
        chose: "One wordmark, drawn, with a single symbol",
        rejected: "A family of marks for different contexts",
        why: "A family is a rule you have to remember. One mark that works everywhere is a rule you cannot get wrong.",
      },
      {
        chose: "A green that is not the safe green",
        rejected: "The blue every developer portfolio uses",
        why: "Blue would have made me indistinguishable from the field. The green carries the Cameroon connection without being a flag.",
      },
      {
        chose: "Tokens as CSS custom properties, no hard-coded colour anywhere",
        rejected: "A Tailwind config with values inline",
        why: "Custom properties can be read at runtime, which is what lets this page render its own palette instead of a picture of one.",
      },
      {
        chose: "Publishing the system on the site itself",
        rejected: "A PDF brand guide",
        why: "A PDF goes stale the day it is exported. The swatches below are read from the running stylesheet, so they cannot disagree with the site.",
      },
    ],
    system:
      "Everything below is read from the stylesheet this page is using — not a screenshot, not a copy. If a value here is wrong, the site is wrong with it, which is the only way a system stays honest.",
    liveSystem: true,
    after: "The mark in use across the site, the proposal template, and the social set.",
    outcomes: [
      "Proposals now start from a template instead of a search. The site is the portfolio and the brand guide at once, so there is one thing to keep current rather than two. And the system has already been lifted wholesale as the starting point for two client projects.",
    ],
    differently:
      "I drew the mark before writing a word about who it was for, and spent two weeks refining letterforms for a positioning I had not settled. The palette and the type scale came out of the writing, and they came out quickly. The mark should have waited.",
  },
};

export const showcases: Record<string, Showcase> = {
  qiroke: {
    context:
      "Qiroke is a tech collective I co-founded, offering software development, web development, branding, and digital marketing. The brand needed to represent a team, not a product — a mark flexible enough to hold across five services without picking a lane. I built the full identity system: a flowing \"Q\" with meaning constructed into the letterform itself, a four-variant colour system for every background it would meet, and a homepage structured around the visitor's problem rather than a service list. Real stakeholder feedback — on weight, contrast, hierarchy, spacing — got addressed directly. The typography and colour system are documented down to letter-spacing, so nothing downstream is guesswork.",
  },
  yisi: {
    context:
      "Yisi's wordmark builds the brand's identity directly into the letterform: the Y becomes a fork, the I a spoon, the S a place setting curve, the final I another fork — all resting on a plate, under a chef's hat replacing the dot. No separate icon sits beside the name; the name is the icon. It's the same design position carried through Diwa, Monilog, and Qiroke — meaning constructed into the letters themselves rather than bolted on beside them.",
  },
};
