"use client";

import { useState } from "react";

import { SiteHeader } from "@/components/layout/SiteHeader";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Process } from "@/components/sections/Process";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { BackdropField } from "@/components/shared/BackdropField";
import { CursorFollower } from "@/components/shared/CursorFollower";

/**
 * The interactive client shell for the home page.
 *
 * Sequence:
 * 1. Hero
 * 2. Intro
 * 3. Selected Work (hierarchical grid)
 * 4. What I Do
 * 5. Process
 * 6. About
 * 7. Contact & Manifest
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
        <SelectedWork projects={projects} />
        <WhatIDo />
        <Process />
        <About />
        <Contact />
      </main>
    </>
  );
}
