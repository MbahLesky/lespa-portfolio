import { BOOT_ENTER_DELAY_MS } from "@/lib/boot-timing";

/**
 * Runs synchronously in the document head, before the first paint.
 *
 * It decides whether the loading screen runs at all and sets the entrance delay
 * that above-the-fold animations read. Doing this from a mounted component
 * instead produced a visible flash of the page before the loader appeared, and
 * left the hero's entrance playing underneath it.
 *
 * Every path ends with a decision, so content is never left waiting on a branch
 * that threw.
 */
export const bootScript = `(function(){
  var d = document.documentElement;
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (sessionStorage.getItem('lespa:booted') === '1') return;
    sessionStorage.setItem('lespa:booted', '1');
    d.classList.add('boot-active');
    d.style.setProperty('--enter-delay', '${BOOT_ENTER_DELAY_MS}ms');
  } catch (e) {
    d.classList.remove('boot-active');
  }
})();`;
