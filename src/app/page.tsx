import type { Metadata } from "next";

import { About } from "@/components/sections/About";
import { Approach } from "@/components/sections/Approach";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Methodology } from "@/components/sections/Methodology";
import { MicroCta } from "@/components/shared/MicroCta";
import { Proof } from "@/components/sections/Proof";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Services } from "@/components/sections/Services";
import { ToolsAndSystems } from "@/components/sections/ToolsAndSystems";
import { microCtas } from "@/content/copy";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Section order and surface treatment per the design spec's colour map. Hero
 * and Final CTA share the brand treatment, bookending the scroll; the two warm
 * sections form one human block in the lower third.
 */
export default function Home() {
  return (
    <main id="main">
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
