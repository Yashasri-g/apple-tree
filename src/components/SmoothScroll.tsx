import { useEffect } from 'react';
import Lenis from 'lenis';
import { setLenis } from '../lib/scroll';

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const l = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    setLenis(l);
    let raf = 0;
    const loop = (t: number) => { l.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); l.destroy(); setLenis(null); };
  }, []);
  return null;
}
