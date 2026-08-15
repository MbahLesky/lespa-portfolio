import type { Metadata } from "next";

import { About } from "@/components/sections/About";
import { Approach } from "@/components/sections/Approach";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Methodology } from "@/components/sections/Methodology";
import { MicroCta } from "@/components/shared/MicroCta";
import { ProgressRail } from "@/components/shared/ProgressRail";
import { SectionTint } from "@/components/shared/SectionTint";
import { SoftSnap } from "@/components/shared/SoftSnap";
import { Proof } from "@/components/sections/Proof";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Services } from "@/components/sections/Services";
import { microCtas, site } from "@/content/copy";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** One dot per section, in scroll order. */
const RAIL_SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "approach", label: "Approach" },
  { id: "work", label: "Selected work" },
  { id: "services", label: "Services" },
  { id: "methodology", label: "Methodology" },
  { id: "proof", label: "Currently" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mbah Lesky",
  alternateName: "Lespa",
  jobTitle: "Brand & Product Designer, Software Engineer",
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bamenda",
    addressCountry: "CM",
  },
  url: "/",
  sameAs: site.socials.map((social) => social.href),
  knowsAbout: [
    "Brand identity",
    "Design systems",
    "Next.js",
    "Flutter",
    "Design mentorship",
  ],
};

/**
 * Section order and surface treatment per the design spec's colour map. Hero
 * and Final CTA share the brand treatment, bookending the scroll; the two warm
 * sections form one human block in the lower third.
 */
export default function Home() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <SoftSnap />
      <SectionTint />
      <ProgressRail sections={RAIL_SECTIONS} />

      {/* Every section the nav points at lives here, in full. The dedicated
          pages behind each "see all" are the deeper version, not the only
          version — the nav never sends anyone away from a section they are
          about to scroll into. */}
      <Hero />
      <Approach />
      <SelectedWork />
      <MicroCta {...microCtas.afterWork} />
      <Services />
      <Methodology />
      <MicroCta {...microCtas.afterMethodology} />
      <Proof />
      <About />
      {/* No nudge toward contact here: contact is the next thing on the page. */}
      <Contact />
    </main>
  );
}
