import type { Metadata } from "next";

import { About } from "@/components/sections/About";
import { Approach } from "@/components/sections/Approach";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Methodology } from "@/components/sections/Methodology";
import { MicroCta } from "@/components/shared/MicroCta";
import { ProgressRail } from "@/components/shared/ProgressRail";
import { SectionTint } from "@/components/shared/SectionTint";
import { SoftSnap } from "@/components/shared/SoftSnap";
import { Proof } from "@/components/sections/Proof";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Services } from "@/components/sections/Services";
import { ToolsAndSystems } from "@/components/sections/ToolsAndSystems";
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
  { id: "tools", label: "Tools and systems" },
  { id: "methodology", label: "Methodology" },
  { id: "proof", label: "Currently" },
  { id: "about", label: "About" },
  { id: "contact-cta", label: "Contact" },
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

      <Hero />
      <Approach />
      <SelectedWork />
      <MicroCta {...microCtas.afterWork} />
      <Services />
      <ToolsAndSystems />
      <Methodology />
      <MicroCta {...microCtas.afterMethodology} />
      <Proof />
      <About />
      <MicroCta {...microCtas.afterAbout} />
      <FinalCta />
    </main>
  );
}
