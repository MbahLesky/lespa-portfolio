"use client";

import { useEffect } from "react";
import Image from "next/image";

import { BOOT_EXIT_MS, BOOT_HOLD_MS } from "@/lib/boot-timing";


/**
 * First-visit loading transition: the Lespa mark assembling on the dark
 * background, then lifting away as the page enters behind it.
 *
 * The markup is server-rendered and hidden by default. Whether it runs is
 * decided by the inline script in the document head, before the first paint —
 * mounting this on the client instead meant a visible flash of the page before
 * the loader appeared.
 *
 * This component only drives the exit; it never gates the content behind it.
 */
export function BootScreen() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("boot-active")) return;

    const exit = setTimeout(() => {
      root.dataset.bootLeaving = "true";
    }, BOOT_HOLD_MS);

    const done = setTimeout(() => {
      root.classList.remove("boot-active");
      delete root.dataset.bootLeaving;
      root.style.setProperty("--enter-delay", "0ms");
    }, BOOT_HOLD_MS + BOOT_EXIT_MS);

    return () => {
      clearTimeout(exit);
      clearTimeout(done);
    };
  }, []);

  return (
    <div className="boot" aria-hidden="true">
      <div className="boot-lockup">
        <Image
          src="/assets/logos/dark-theme/Lespa/Icon.svg"
          alt=""
          width={36}
          height={36}
          priority
          className="boot-icon"
        />
        <Image
          src="/assets/logos/dark-theme/Lespa/Wordmark.svg"
          alt=""
          width={112}
          height={46}
          priority
          className="boot-word"
        />
        <span className="boot-rule" />
      </div>
    </div>
  );
}
