import Lenis from 'lenis';

export let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { lenis = l; };

export function scrollToId(id: string) {
  const el = id === 'top' ? null : document.getElementById(id);
  if (lenis) {
    if (el) lenis.scrollTo(el, { offset: -20, duration: 1.4 });
    else lenis.scrollTo(0, { duration: 1.4 });
  } else {
    el ? el.scrollIntoView({ behavior: 'smooth' }) : window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
