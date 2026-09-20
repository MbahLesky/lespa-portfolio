"use client";

import { useState } from "react";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Process } from "@/components/sections/Process";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Values } from "@/components/sections/Values";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { BackdropField } from "@/components/shared/BackdropField";
import { CursorFollower } from "@/components/shared/CursorFollower";

/**
 * The interactive client shell for the home page.
 *
 * Sequence matches the reference site:
 * 1. Hero
 * 2. About Lespa (Intro)
 * 3. Core Values
 * 4. Products & Services (Capabilities)
 * 5. Digital Craftsmanship (Selected Work Grid)
 * 6. Methodology (Process)
 * 7. About Details
 * 8. Contact & Manifest
 */
export function HomeShell({ projects }) {
  const [introComplete, setIntroComplete] = useState(true);

  return (
    <>
      {/* The page gradient's pointer-reactive light. Behind everything. */}
      <BackdropField />

      {/* Starts at the hero and persists for everything below it. */}
      <CursorFollower />

      <SiteHeader revealed={introComplete} />

      {/* Clears the pinned footer */}
      <main id="main" className="relative z-10 pb-16 lg:pb-20">
        <Hero onIntroComplete={() => setIntroComplete(true)} />
        <Intro />
        <Values />
        <WhatIDo />
        <SelectedWork projects={projects} />
        <Process />
        <About />
        <Contact />
      </main>
    </>
  );
}
