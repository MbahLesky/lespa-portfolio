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
import { CursorFollower } from "@/components/shared/CursorFollower";

/**
 * Phase 1 — the whole site, on one page.
 *
 * Section order is fixed by the structure doc: Hero, Intro, Selected Work, What
 * I Do, Process, About, Contact. The footer is persistent and lives in the
 * layout, not here.
 *
 * The nav animates in last, after the hero's typed sequence finishes, so the
 * hero owns that signal and hands it up.
 */
export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      {/* Starts at the hero and persists for everything below it. */}
      <CursorFollower />

      <SiteHeader revealed={introComplete} />

      {/* Clears the pinned footer: two rows below md, one row above it. */}
      <main id="main" className="pb-24 md:pb-20">
        <Hero onIntroComplete={() => setIntroComplete(true)} />
        <Intro />
        <SelectedWork />
        <WhatIDo />
        <Process />
        <About />
        <Contact />
      </main>
    </>
  );
}
