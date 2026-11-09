import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/** Soft glass cursor that swells over links and images. Fine pointers only. */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: .4 });
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: .4 });
  const [mode, setMode] = useState<'idle' | 'link' | 'view'>('idle');
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    setFine(mq.matches);
    if (!mq.matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX); y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      if (t?.closest('[data-cursor="view"]')) setMode('view');
      else if (t?.closest('a,button,input,select,textarea,[role="button"]')) setMode('link');
      else setMode('idle');
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  if (!fine) return null;
  const size = mode === 'idle' ? 14 : mode === 'link' ? 54 : 84;
  return (
    <motion.div
      aria-hidden
      className="cursor-dot pointer-events-none fixed left-0 top-0 z-[90] grid place-items-center rounded-full text-[11px] font-bold uppercase tracking-widest text-white"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: size, height: size, backgroundColor: mode === 'view' ? 'rgba(244,91,101,.92)' : mode === 'link' ? 'rgba(244,91,101,.18)' : 'rgba(244,91,101,1)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {mode === 'view' && 'View'}
    </motion.div>
  );
}
