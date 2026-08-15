"use client";

import { useEffect, useRef, useState } from "react";

import {
  ERASE_AT,
  FONT_WAIT_MS,
  GREETING,
  GREETING_AT,
  HOLD_REST_CLASS,
  INTRO,
  INTRO_TIMEOUT_PAD,
  NAME_AT,
  SKIP_OUT_MS,
  SOLO_ZOOM,
  TYPE,
  WORD_FLY_AT,
  introEnd,
  pushAt,
  scrimOutAt,
} from "@/lib/intro-timeline";
import { hero } from "@/content/copy";

/** How much larger the wordmark sits at centre before flying to the navbar. */
const WORDMARK_ZOOM = 2.6;
/** Breathing room kept between an enlarged card and the edge of the screen. */
const EDGE = 24;

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Fired once the name is in place, so the role line can start typing.
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
 * and cleared; "I am Lespa." is typed at centre, held, and moves into its place
 * in the hero. Line two is not part of this — it types itself underneath once
 * the name has landed, and RoleSwap owns it from there.
 *
 * The stand-ins are measured against the real elements they become and animated
 * from centre *to* that exact box, so each landing is pixel-accurate at any
 * viewport rather than depending on coordinates that would drift. The
 * enlargements are clamped to the screen, so a card is never scaled up past the
 * edge on a narrow one.
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
  const nameRef = useRef<HTMLDivElement>(null);

  const [typed, setTyped] = useState("");
  const [caret, setCaret] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("intro-active")) return;

    const scrim = scrimRef.current;
    const word = wordRef.current;
    const name = nameRef.current;

    const wordTarget = document.querySelector<HTMLElement>(
      '[data-intro-target="wordmark"]',
    );
    const nameTarget = document.querySelector<HTMLElement>(
      '[data-intro-target="title"]',
    );

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    /** Let the page below enter, whether or not the hero got to finish. */
    const releaseRest = () => root.classList.remove(HOLD_REST_CLASS);

    let finished = false;
    /** Drop the overlay and hand the page back, whatever happened. */
    const finish = (skipped = false) => {
      if (finished) return;
      finished = true;
      cancelled = true;
      timers.forEach(clearTimeout);
      // Announce before revealing. Line two blanks itself in response, and
      // doing it in this same task means the finished sentence is never
      // painted for a frame before its first character is typed. The reveal is
      // in a finally: a listener that throws must not leave the page hidden.
      try {
        window.dispatchEvent(
          new CustomEvent<IntroDoneDetail>(INTRO_DONE_EVENT, {
            detail: { skipped },
          }),
        );
      } finally {
        root.classList.remove("intro-active");
      }
    };

    // Nothing to fly to means nothing to show; skip rather than hold the page
    // behind an overlay that cannot resolve.
    if (!scrim || !word || !name || !wordTarget || !nameTarget) {
      releaseRest();
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
    const type = (to: number, from: number, speed: number, text: string) => {
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

    /** Lay a stand-in exactly over the element it will become. */
    const placeOver = (clone: HTMLElement, target: HTMLElement) => {
      const rect = target.getBoundingClientRect();
      clone.style.left = `${rect.left}px`;
      clone.style.top = `${rect.top}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      return rect;
    };

    /** Copy the target's type styles, so the two are indistinguishable at the
     *  moment of handover. */
    const borrowType = (clone: HTMLElement, target: HTMLElement) => {
      const style = getComputedStyle(target);
      clone.style.font = style.font;
      clone.style.letterSpacing = style.letterSpacing;
      clone.style.color = style.color;
    };

    /** An enlargement that still leaves the card inside the screen. */
    const fit = (zoom: number, width: number, height: number) =>
      Math.max(
        1,
        Math.min(
          zoom,
          (window.innerWidth - EDGE * 2) / width,
          (window.innerHeight - EDGE * 2) / height,
        ),
      );

    /** The transform that scales a box and puts it at the screen's centre. */
    const centre = (rect: DOMRect, zoom: number) => {
      const dx = window.innerWidth / 2 - (rect.left + rect.width / 2);
      const dy = window.innerHeight / 2 - (rect.top + rect.height / 2);
      return `translate(${dx}px, ${dy}px) scale(${zoom})`;
    };

    /**
     * Measure, then run. Everything below depends on where the targets sit, so
     * it cannot begin until they sit still — text measured against the fallback
     * font moves by a few pixels when the real one arrives, and a stand-in laid
     * over the old box lands beside the element it is meant to become. The
     * overlay is already covering the page, so the wait costs nothing visible.
     */
    const begin = () => {
      if (cancelled) return;

      borrowType(name, nameTarget);

      // Read every target where it will actually rest. See .intro-measuring.
      root.classList.add("intro-measuring");
      const wordRect = placeOver(word, wordTarget);
      const nameRect = placeOver(name, nameTarget);
      root.classList.remove("intro-measuring");

      const wordStart = centre(
        wordRect,
        fit(WORDMARK_ZOOM, wordRect.width, wordRect.height),
      );
      const nameStart = centre(
        nameRect,
        fit(SOLO_ZOOM, nameRect.width, nameRect.height),
      );
      const LANDED = "translate(0, 0) scale(1)";

      word.style.transform = wordStart;
      name.style.transform = nameStart;

      const nameText = hero.headlineLead;
      const push = pushAt(nameText);
      const endAt = introEnd(nameText);

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
        word.animate([{ transform: wordStart }, { transform: LANDED }], {
          duration: INTRO.wordFlyDur,
          easing: EASE,
          fill: "forwards",
        });
      });

      // 3 — "Hi", typed and held.
      at(GREETING_AT, () => {
        setCaret(true);
        name.style.opacity = "1";
        type(GREETING.length, 0, TYPE.greeting, GREETING);
      });

      // 4 — cleared again.
      at(ERASE_AT, () => type(0, GREETING.length, TYPE.erase, GREETING));

      // 5 — "I am Lespa.", typed and held.
      at(NAME_AT, () => type(nameText.length, 0, TYPE.name, nameText));

      // 6 — the backdrop clears, so the page is there for it to land into.
      at(scrimOutAt(nameText), () => {
        scrim.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: INTRO.scrimOutDur,
          easing: EASE,
          fill: "forwards",
        });
      });

      // 7 — the caret goes and the name moves into the hero.
      at(push, () => {
        setCaret(false);
        name.animate([{ transform: nameStart }, { transform: LANDED }], {
          duration: INTRO.pushDur,
          easing: EASE,
          fill: "forwards",
        });
      });

      // 8 — hand over. Line two types itself from here.
      at(endAt, finish);

      // Safety net, in case an animation never resolves.
      at(endAt + INTRO_TIMEOUT_PAD, finish);
    };

    // A sequence long enough to be read is long enough to be unwanted. Any
    // deliberate input cuts it short: the overlay fades out over a couple of
    // frames rather than jump-cutting, and the page is handed straight over.
    // Armed before the measuring wait, so an early input is never ignored.
    const SKIPS = ["pointerdown", "keydown", "wheel", "touchstart"];
    const onSkip = () => {
      SKIPS.forEach((kind) => window.removeEventListener(kind, onSkip));
      if (finished) return;
      const overlay = scrim.parentElement;
      // Reveal the real page first, then fade the stand-ins off the top of it —
      // fading the overlay while the page is still hidden shows a blank frame.
      releaseRest();
      root.classList.remove("intro-active");
      overlay?.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: SKIP_OUT_MS,
        easing: EASE,
        fill: "forwards",
      });
      finish(true);
    };
    SKIPS.forEach((kind) =>
      window.addEventListener(kind, onSkip, { once: true, passive: true }),
    );

    // Start once the fonts are settled, and start regardless if they stall —
    // a page held behind this overlay by a font that never arrives would be
    // far worse than a landing that is a pixel or two out.
    if (document.fonts?.status === "loaded") {
      begin();
    } else {
      let started = false;
      const once = () => {
        if (started) return;
        started = true;
        begin();
      };
      document.fonts?.ready.then(once, once);
      at(FONT_WAIT_MS, once);
    }

    // A resize mid-sequence invalidates every measurement taken above.
    const onResize = () => {
      releaseRest();
      finish();
    };
    window.addEventListener("resize", onResize, { once: true });

    return () => {
      window.removeEventListener("resize", onResize);
      SKIPS.forEach((kind) => window.removeEventListener(kind, onSkip));
      releaseRest();
      finish();
    };
  }, []);

  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-scrim" ref={scrimRef} />
      <div className="intro-word" ref={wordRef}>
        <span className="intro-word-mark" />
      </div>
      <div className="intro-name" ref={nameRef}>
        <span>{typed}</span>
        {caret && <span className="caret" />}
      </div>
    </div>
  );
}
