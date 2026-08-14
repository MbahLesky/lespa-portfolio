"use client";

import { useEffect, useRef, useState } from "react";

import {
  ERASE_AT,
  GREETING,
  GREETING_AT,
  INTRO,
  INTRO_TIMEOUT_PAD,
  NAME_AT,
  SKIP_OUT_MS,
  TYPE,
  WORD_FLY_AT,
  introEnd,
  nameDoneAt,
  scrimOutAt,
} from "@/lib/intro-timeline";
import { hero } from "@/content/copy";

/** How much larger the wordmark sits at centre before flying to the navbar. */
const WORDMARK_ZOOM = 2.6;
/** How much larger the typed line reads as a title card. */
const TITLE_ZOOM = 1.35;

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Fired once the headline is in place, so the role line can start typing.
 * `detail.skipped` says the visitor cut the sequence short, in which case they
 * have asked for less animation rather than more.
 */
export const INTRO_DONE_EVENT = "lespa:intro-done";

export interface IntroDoneDetail {
  skipped: boolean;
}

/**
 * The opening sequence: a short run of title cards.
 *
 * The wordmark arrives at centre and flies to the navbar; "Hi" is typed, held
 * and cleared; "I am Lespa." is typed and then moves into its place in the
 * hero. The role line picks it up from there.
 *
 * The wordmark and the typed line are measured against the real elements they
 * become and animated from centre *to* that exact box, so each landing is
 * pixel-accurate at any viewport rather than depending on coordinates that
 * would drift.
 *
 * The markup is server-rendered and hidden by default; the inline head script
 * decides before first paint whether it runs. Mounting it on the client instead
 * meant a visible flash of the page before the overlay appeared.
 *
 * Purely decorative — every word here also exists as ordinary, readable markup
 * in the hero underneath, so nothing depends on this running.
 */
export function IntroSequence() {
  const scrimRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const [typed, setTyped] = useState("");
  const [caret, setCaret] = useState(false);

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

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    /** Clear the entrance cues so later renders are not held back by them. */
    const clearCues = () => {
      root.style.setProperty("--enter-delay", "0ms");
      root.style.setProperty("--enter-rest", "0ms");
    };

    let finished = false;
    /** Drop the overlay and hand the page back, whatever happened. */
    const finish = (skipped = false) => {
      if (finished) return;
      finished = true;
      cancelled = true;
      timers.forEach(clearTimeout);
      root.classList.remove("intro-active");
      window.dispatchEvent(
        new CustomEvent<IntroDoneDetail>(INTRO_DONE_EVENT, {
          detail: { skipped },
        }),
      );
    };

    // Nothing to fly to means nothing to show; skip rather than hold the page
    // behind an overlay that cannot resolve.
    if (!scrim || !word || !title || !wordTarget || !titleTarget) {
      clearCues();
      finish();
      return;
    }

    const at = (delay: number, run: () => void) => {
      timers.push(
        setTimeout(() => {
          if (!cancelled) run();
        }, delay),
      );
    };

    /** Types or erases toward a target length, one character per tick. */
    const run = (text: string, to: number, from: number, speed: number) => {
      const step = to > from ? 1 : -1;
      for (let i = 1; i <= Math.abs(to - from); i++) {
        const count = from + i * step;
        timers.push(
          setTimeout(() => {
            if (!cancelled) setTyped(text.slice(0, count));
          }, i * speed),
        );
      }
    };

    /**
     * Lay a clone exactly over its target, then return the transform that puts
     * it at screen centre, scaled up. Animating that to identity lands it on
     * the real element precisely.
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

    // The typed line borrows its target's type styles, so the two are
    // indistinguishable at the moment of handover.
    const titleStyle = getComputedStyle(titleTarget);
    title.style.font = titleStyle.font;
    title.style.letterSpacing = titleStyle.letterSpacing;
    title.style.color = titleStyle.color;

    const wordStart = placeOver(word, wordTarget, WORDMARK_ZOOM);
    const titleStart = placeOver(title, titleTarget, TITLE_ZOOM);
    word.style.transform = wordStart;
    title.style.transform = titleStart;

    const name = hero.headlineLead;
    const flyAt = nameDoneAt(name);
    const endAt = introEnd(name);

    // The head script parks both cues far in the future so nothing can enter
    // underneath the overlay before this knows the real timings.
    //
    // The headline is released immediately: it is hidden behind the overlay
    // anyway, so its entrance plays unseen and the element is already opaque
    // when the stand-in lands on it. The rest of the hero follows it in just
    // after, rising while the role line types itself — holding it back until
    // the typing finished left the hero standing empty under two lines of
    // headline for the better part of two seconds.
    root.style.setProperty("--enter-delay", "0ms");
    root.style.setProperty("--enter-rest", `${endAt + 240}ms`);

    // A sequence long enough to be read is long enough to be unwanted. Any
    // deliberate input cuts it short: the overlay fades out over a couple of
    // frames rather than jump-cutting, and the page is handed straight over.
    const SKIPS = ["pointerdown", "keydown", "wheel", "touchstart"];
    const onSkip = () => {
      SKIPS.forEach((type) => window.removeEventListener(type, onSkip));
      if (finished) return;
      const overlay = scrim.parentElement;
      // Reveal the real page first, then fade the stand-in off the top of it —
      // fading the overlay while the page is still hidden shows a blank frame.
      clearCues();
      root.classList.remove("intro-active");
      overlay
        ?.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: SKIP_OUT_MS,
          easing: EASE,
          fill: "forwards",
        })
        ?.finished.catch(() => {});
      finish(true);
    };
    SKIPS.forEach((type) =>
      window.addEventListener(type, onSkip, { once: true, passive: true }),
    );

    // 1 — the wordmark fades up at centre.
    at(INTRO.wordIn, () => {
      word.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: INTRO.wordInDur,
        easing: EASE,
        fill: "forwards",
      });
    });

    // 2 — is held, then travels to its place in the navbar.
    at(WORD_FLY_AT, () => {
      word.animate(
        [{ transform: wordStart }, { transform: "translate(0, 0) scale(1)" }],
        { duration: INTRO.wordFlyDur, easing: EASE, fill: "forwards" },
      );
    });

    // 3 — "Hi", typed and held.
    at(GREETING_AT, () => {
      setCaret(true);
      title.style.opacity = "1";
      run(GREETING, GREETING.length, 0, TYPE.greeting);
    });

    // 4 — cleared again.
    at(ERASE_AT, () => run(GREETING, 0, GREETING.length, TYPE.erase));

    // 5 — "I am Lespa.", typed and held.
    at(NAME_AT, () => run(name, name.length, 0, TYPE.name));

    // 6 — the backdrop clears, so the page is already there behind the card.
    at(scrimOutAt(name), () => {
      scrim.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: INTRO.scrimOutDur,
        easing: EASE,
        fill: "forwards",
      });
    });

    // 7 — the caret goes and the line moves into the hero.
    at(flyAt, () => {
      setCaret(false);
      title.animate(
        [{ transform: titleStart }, { transform: "translate(0, 0) scale(1)" }],
        { duration: INTRO.titleFlyDur, easing: EASE, fill: "forwards" },
      );
    });

    // 8 — hand over. The role line takes it from here.
    at(endAt, finish);

    // Safety net, in case an animation never resolves.
    at(endAt + INTRO_TIMEOUT_PAD, finish);

    // A resize mid-sequence invalidates every measurement taken above.
    const onResize = () => {
      clearCues();
      finish();
    };
    window.addEventListener("resize", onResize, { once: true });

    return () => {
      window.removeEventListener("resize", onResize);
      SKIPS.forEach((type) => window.removeEventListener(type, onSkip));
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
        <span>{typed}</span>
        {caret && <span className="caret" />}
      </div>
    </div>
  );
}
