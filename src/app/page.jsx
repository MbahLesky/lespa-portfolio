"use client";

import { useState } from "react";

import { About } from "@/components/phase1/About";
import { Contact } from "@/components/phase1/Contact";
import { Hero } from "@/components/phase1/Hero";
import { Intro } from "@/components/phase1/Intro";
import { Nav } from "@/components/phase1/Nav";
import { Process } from "@/components/phase1/Process";
import { SelectedWork } from "@/components/phase1/SelectedWork";
import { WhatIDo } from "@/components/phase1/WhatIDo";

/**
 * The site: one page, eight sections, in the order the structure doc sets.
 *
 * The nav lives here rather than in the layout because it enters last, with the
 * hero's calls to action, and the hero is the only thing that knows when its
 * sequence has finished. One piece of state carries that across, so the nav
 * cannot appear while the headline is still typing.
 */
export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Nav ready={ready} />

      <main id="main">
        <Hero onReady={() => setReady(true)} />
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
