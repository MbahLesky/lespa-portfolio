"use client";

import { useEffect, useRef, useState } from "react";

import {
  ERASE_AT,
  FONT_WAIT_MS,
  GREETING,
  GREETING_AT,
  INTRO,
  INTRO_TIMEOUT_PAD,
  NAME_AT,
  SKIP_OUT_MS,
  TYPE,
  WORD_FLY_AT,
  introEnd,
  pushAt,
  roleAt,
  scrimOutAt,
  settleAt,
} from "@/lib/intro-timeline";
import {
  Typewriter,
  segmentsLength,
  type TypeSegment,
} from "@/components/shared/Typewriter";
import { hero } from "@/content/copy";

/** How much larger the wordmark sits at centre before flying to the navbar. */
const WORDMARK_ZOOM = 2.6;
/** How much larger the name reads while it is alone at centre. */
const SOLO_ZOOM = 1.55;
/** And once it has settled up to make room for the line beneath it. */
const PAIR_ZOOM = 1.18;
/** Breathing room kept between an enlarged card and the edge of the screen. */
const EDGE = 24;

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Fired once the headline is in place, so the role line can be handed back.
 * `detail.skipped` says the visitor cut the sequence short, in which case they
 * have asked for less animation rather than more.
 */
export const INTRO_DONE_EVENT = "lespa:intro-done";

export interface IntroDoneDetail {
  skipped: boolean;
}

/** The role line as typed runs, with the role itself carrying the accent. */
const roleSegments = (): TypeSegment[] => {
  const role = hero.roles[0];
  return [
    { text: `${role.before} ` },
    { text: role.word, className: "text-accent-fg" },
    { text: ` ${role.after}` },
  ];
};

const roleText = () =>
  roleSegments()
    .map((segment) => segment.text)
    .join("");

/**
 * The opening sequence: a short run of title cards.
 *
 * The wordmark arrives at centre and flies to the navbar; "Hi" is typed, held
 * and cleared; "I am Lespa." is typed at centre, held, then settles up the
 * screen and shrinks; the role line types itself beneath it; and only once
 * that line is finished do the two push left together into the hero.
 *
 * Both stand-ins are measured against the real elements they become and
 * animated from centre *to* that exact box, so each landing is pixel-accurate
 * at any viewport rather than depending on coordinates that would drift. The
 * enlargements are clamped to the screen, so a card is never scaled up past
 * the edge on a narrow one.
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
  const roleRef = useRef<HTMLDivElement>(null);

  const [typed, setTyped] = useState("");
  const [caret, setCaret] = useState(false);
  const [roleCount, setRoleCount] = useState(0);
  const [roleCaret, setRoleCaret] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("intro-active")) return;

    const scrim = scrimRef.current;
    const word = wordRef.current;
    const name = nameRef.current;
    const role = roleRef.current;

    const wordTarget = document.querySelector<HTMLElement>(
      '[data-intro-target="wordmark"]',
    );
    const nameTarget = document.querySelector<HTMLElement>(
      '[data-intro-target="title"]',
    );
    const roleTarget = document.querySelector<HTMLElement>("[data-intro-hold]");

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
    if (
      !scrim ||
      !word ||
      !name ||
      !role ||
      !wordTarget ||
      !nameTarget ||
      !roleTarget
    ) {
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
    const type = (
      to: number,
      from: number,
      speed: number,
      set: (count: number) => void,
    ) => {
      const step = to > from ? 1 : -1;
      for (let i = 1; i <= Math.abs(to - from); i++) {
        const count = from + i * step;
        timers.push(
          setTimeout(() => {
            if (!cancelled) set(count);
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

    /**
     * The transform that scales a box by `zoom` and puts it at the centre of
     * the screen, pivoting on a given point.
     *
     * Each axis takes its own pivot. Passing the box's own centre centres the
     * box on that axis; passing the pair's centre makes the box hold its place
     * within the pair, so the two lines scale and travel as one group. The
     * lines are centred individually across and grouped down the screen: they
     * are two cards stacked, not a block of the hero moved wholesale.
     */
    const place = (
      rect: DOMRect,
      zoom: number,
      pivotX: number,
      pivotY: number,
    ) => {
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = window.innerWidth / 2 + zoom * (cx - pivotX) - cx;
      const dy = window.innerHeight / 2 + zoom * (cy - pivotY) - cy;
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
      borrowType(role, roleTarget);

      // Read every target where it will actually rest. See .intro-measuring.
      root.classList.add("intro-measuring");
      const wordRect = placeOver(word, wordTarget);
      const nameRect = placeOver(name, nameTarget);
      const roleRect = placeOver(role, roleTarget);
      root.classList.remove("intro-measuring");

      const mid = (rect: DOMRect) => ({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      const wordMid = mid(wordRect);
      const nameMid = mid(nameRect);
      const roleMid = mid(roleRect);
      /** Where the pair balances vertically, once both lines are on screen. */
      const pairY = (nameRect.top + roleRect.bottom) / 2;

      const soloZoom = fit(SOLO_ZOOM, nameRect.width, nameRect.height);
      const pairZoom = fit(
        PAIR_ZOOM,
        Math.max(nameRect.width, roleRect.width),
        roleRect.bottom - nameRect.top,
      );

      const wordStart = place(
        wordRect,
        fit(WORDMARK_ZOOM, wordRect.width, wordRect.height),
        wordMid.x,
        wordMid.y,
      );
      /** Alone at centre, at full size. */
      const nameSolo = place(nameRect, soloZoom, nameMid.x, nameMid.y);
      /** Settled up and shrunk, sharing the screen with the line below. */
      const namePaired = place(nameRect, pairZoom, nameMid.x, pairY);
      const rolePaired = place(roleRect, pairZoom, roleMid.x, pairY);
      const LANDED = "translate(0, 0) scale(1)";

      word.style.transform = wordStart;
      name.style.transform = nameSolo;
      // The role line waits in its paired position, so when it fades up it is
      // already where it belongs and only its text moves.
      role.style.transform = rolePaired;

      const nameText = hero.headlineLead;
      const line = roleText();
      const settle = settleAt(nameText);
      const roleStart = roleAt(nameText);
      const push = pushAt(nameText, line);
      const endAt = introEnd(nameText, line);

      // The head script parks both cues far in the future so nothing can enter
      // underneath the overlay before this knows the real timings.
      //
      // The headline is released immediately: it is hidden behind the overlay
      // anyway, so its entrance plays unseen and the element is already opaque
      // when the stand-ins land on it. Everything else waits until they have —
      // the rest of the page arrives once there is nothing left to read.
      root.style.setProperty("--enter-delay", "0ms");
      root.style.setProperty("--enter-rest", `${endAt + 240}ms`);

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
        type(GREETING.length, 0, TYPE.greeting, (count) =>
          setTyped(GREETING.slice(0, count)),
        );
      });

      // 4 — cleared again.
      at(ERASE_AT, () =>
        type(0, GREETING.length, TYPE.erase, (count) =>
          setTyped(GREETING.slice(0, count)),
        ),
      );

      // 5 — "I am Lespa.", typed and held.
      at(NAME_AT, () =>
        type(nameText.length, 0, TYPE.name, (count) =>
          setTyped(nameText.slice(0, count)),
        ),
      );

      // 6 — it settles up the screen and shrinks, opening the space beneath it.
      //     The caret goes with it: the line is finished, and a caret left
      //     blinking on it would promise more of the same sentence.
      at(settle, () => {
        setCaret(false);
        name.animate([{ transform: nameSolo }, { transform: namePaired }], {
          duration: INTRO.settleDur,
          easing: EASE,
          fill: "forwards",
        });
      });

      // 7 — the role line types itself into the space that opened up.
      at(roleStart, () => {
        setRoleCaret(true);
        role.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: INTRO.roleFadeDur,
          easing: EASE,
          fill: "forwards",
        });
        type(segmentsLength(roleSegments()), 0, TYPE.role, setRoleCount);
      });

      // 8 — the backdrop clears, so the page is there for the pair to land into.
      at(scrimOutAt(nameText, line), () => {
        scrim.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: INTRO.scrimOutDur,
          easing: EASE,
          fill: "forwards",
        });
      });

      // 9 — held, then both lines push left into the hero together.
      at(push, () => {
        setRoleCaret(false);
        name.animate([{ transform: namePaired }, { transform: LANDED }], {
          duration: INTRO.pushDur,
          easing: EASE,
          fill: "forwards",
        });
        role.animate([{ transform: rolePaired }, { transform: LANDED }], {
          duration: INTRO.pushDur,
          easing: EASE,
          fill: "forwards",
        });
      });

      // 10 — hand over. The rest of the page follows.
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
      clearCues();
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
      clearCues();
      finish();
    };
    window.addEventListener("resize", onResize, { once: true });

    return () => {
      window.removeEventListener("resize", onResize);
      SKIPS.forEach((kind) => window.removeEventListener(kind, onSkip));
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
      <div className="intro-name" ref={nameRef}>
        <span>{typed}</span>
        {caret && <span className="caret" />}
      </div>
      <div className="intro-role" ref={roleRef}>
        <Typewriter
          segments={roleSegments()}
          count={roleCount}
          caret={roleCaret}
        />
      </div>
    </div>
  );
}
