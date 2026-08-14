"use client";

import { useEffect, useRef } from "react";

import {
  INTRO,
  INTRO_END,
  INTRO_REST,
  INTRO_TIMEOUT,
} from "@/lib/intro-timeline";

/** How much larger each element sits at centre before flying to its place. */
const WORDMARK_ZOOM = 2.6;
const TITLE_ZOOM = 1.35;

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/** Fired once the headline has landed, so the role swap can pick up from there. */
export const INTRO_DONE_EVENT = "lespa:intro-done";

/**
 * The opening sequence.
 *
 * The wordmark and the headline are not re-created at the end — each clone is
 * measured against the real element it will become and animated *from* the
 * centre *to* that exact box, so the handoff is pixel-accurate at any viewport
 * size. This is why the clone is positioned from a live getBoundingClientRect
 * rather than from hard-coded coordinates.
 *
 * Each clone simply stays in place once it has landed; the real elements are
 * revealed and the overlay dropped in a single step at the end. Because a clone
 * is already sitting exactly over its target, that swap is invisible — handing
 * over mid-sequence would mean fighting the animation's fill state for control
 * of the same property.
 *
 * The markup is server-rendered and hidden by default; the inline head script
 * decides before first paint whether it runs. Mounting it on the client instead
 * meant a visible flash of the page before the overlay appeared.
 *
 * Nothing is ever left stranded: every exit path clears the classes that hide
 * the real elements, and a hard timeout tears the whole thing down if a
 * measurement or an animation fails.
 */
export function IntroSequence() {
  const scrimRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("intro-active")) return;

    const scrim = scrimRef.current;
    const word = wordRef.current;
    const title = titleRef.current;

    const wordTarget = document.querySelector<HTMLElement>(
      '[data-intro-target="wordmark"]',
    );
    const titleTarget = document.querySelector<HTMLElement>(
      '[data-intro-target="title"]',
    );

    const timers: ReturnType<typeof setTimeout>[] = [];
    let finished = false;

    /**
     * Clear the entrance cues so later renders are not held back by them.
     *
     * Deliberately separate from finish(): resetting these at the end of the
     * overlay also cancelled the hold on the rest of the page, which then swept
     * in before the role line had swapped.
     */
    const clearCues = () => {
      root.style.setProperty("--enter-delay", "0ms");
      root.style.setProperty("--enter-rest", "0ms");
    };

    /** Drop the overlay and hand the page back, whatever happened. */
    const finish = () => {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      root.classList.remove("intro-active");
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
    };

    // Without both targets there is nothing to fly to, so skip rather than
    // hold the page behind an overlay that cannot resolve.
    if (!scrim || !word || !title || !wordTarget || !titleTarget) {
      clearCues();
      finish();
      return;
    }

    /**
     * Lay a clone exactly over its target, then return the transform that puts
     * it at screen centre, scaled up. Animating from that to identity lands it
     * on the real element precisely.
     */
    const placeOver = (clone: HTMLElement, target: HTMLElement, zoom: number) => {
      const rect = target.getBoundingClientRect();
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;

      const dx = window.innerWidth / 2 - (rect.left + rect.width / 2);
      const dy = window.innerHeight / 2 - (rect.top + rect.height / 2);
      return `translate(${dx}px, ${dy}px) scale(${zoom})`;
    };

    // The headline clone borrows its target's type styles, so the two are
    // indistinguishable at the moment of handover.
    const titleStyle = getComputedStyle(titleTarget);
    title.style.font = titleStyle.font;
    title.style.letterSpacing = titleStyle.letterSpacing;
    title.style.color = titleStyle.color;

    const wordStart = placeOver(word, wordTarget, WORDMARK_ZOOM);
    const titleStart = placeOver(title, titleTarget, TITLE_ZOOM);

    word.style.transform = wordStart;
    title.style.transform = titleStart;

    const at = (delay: number, run: () => void) => {
      timers.push(setTimeout(run, delay));
    };

    // 1 — the wordmark fades up at centre.
    at(INTRO.wordIn, () => {
      word.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: INTRO.wordInDur,
        easing: EASE,
        fill: "forwards",
      });
    });

    // 2 — it travels to its place in the navbar.
    at(INTRO.wordFly, () => {
      word.animate(
        [{ transform: wordStart }, { transform: "translate(0, 0) scale(1)" }],
        { duration: INTRO.wordFlyDur, easing: EASE, fill: "forwards" },
      );
    });

    // 3 — the headline appears at centre while the wordmark is still moving.
    at(INTRO.titleIn, () => {
      title.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: INTRO.titleInDur,
        easing: EASE,
        fill: "forwards",
      });
    });

    // 4 — the backdrop clears, so the page is already there behind it.
    at(INTRO.scrimOut, () => {
      scrim.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: INTRO.scrimOutDur,
        easing: EASE,
        fill: "forwards",
      });
    });

    // 5 — the headline rises and shrinks into the hero.
    at(INTRO.titleFly, () => {
      title.animate(
        [{ transform: titleStart }, { transform: "translate(0, 0) scale(1)" }],
        { duration: INTRO.titleFlyDur, easing: EASE, fill: "forwards" },
      );
    });

    // 6 — the overlay goes; the role line is already in place beneath it.
    at(INTRO_END, finish);

    // Safety net, in case an animation never resolves.
    at(INTRO_TIMEOUT, finish);

    // 7 — once the rest of the page has had its cue, the delays are spent.
    const cueTimer = setTimeout(clearCues, INTRO_REST + 1200);

    // A resize mid-sequence invalidates every measurement taken above.
    const onResize = () => {
      clearCues();
      finish();
    };
    window.addEventListener("resize", onResize, { once: true });

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(cueTimer);
      clearCues();
      finish();
    };
  }, []);

  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-scrim" ref={scrimRef} />
      <div className="intro-word" ref={wordRef}>
        <span className="intro-word-mark" />
      </div>
      <div className="intro-title" ref={titleRef}>
        I am Lespa.
      </div>
    </div>
  );
}
