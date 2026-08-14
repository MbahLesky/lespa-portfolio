import { INTRO_END, INTRO_REST } from "@/lib/intro-timeline";

/**
 * Runs synchronously in the document head, before the first paint.
 *
 * It decides whether the opening sequence runs and sets the entrance delay the
 * rest of the page reads. Deciding this from a mounted component instead
 * produced a visible flash of the page before the overlay appeared, and left
 * the hero's entrance playing underneath it.
 *
 * Every path ends with a decision, so content is never left waiting on a branch
 * that threw.
 */
export const introScript = `(function(){
  var d = document.documentElement;
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (sessionStorage.getItem('lespa:intro') === '1') return;
    sessionStorage.setItem('lespa:intro', '1');
    d.classList.add('intro-active');
    d.style.setProperty('--enter-delay', '${INTRO_END}ms');
    d.style.setProperty('--enter-rest', '${INTRO_REST}ms');
  } catch (e) {
    d.classList.remove('intro-active');
  }
})();`;
