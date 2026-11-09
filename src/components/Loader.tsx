import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppleMark } from './Shapes';
import { EASE } from './motion';

const KEY = 'aps-intro-seen';

const wasSeen = (() => { try { return sessionStorage.getItem(KEY) === '1'; } catch { return false; } })();
/** Hero entrance offset: waits for the loader on first visit only. */
export const INTRO_DELAY = wasSeen ? 0.1 : 2.0;

export function Loader() {
  const seen = wasSeen;
  const [show, setShow] = useState(!seen);

  useEffect(() => {
    if (!show) return;
    document.documentElement.style.overflow = 'hidden';
    const t = setTimeout(() => {
      setShow(false);
      try { sessionStorage.setItem(KEY, '1'); } catch { /* ignore */ }
    }, 1900);
    return () => { clearTimeout(t); document.documentElement.style.overflow = ''; };
  }, [show]);

  return (
    <AnimatePresence onExitComplete={() => { document.documentElement.style.overflow = ''; }}>
      {show && (
        <motion.div
          key="loader"
          aria-label="Loading"
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-wm"
          exit={{ clipPath: 'circle(0% at 50% 50%)' }}
          initial={{ clipPath: 'circle(150% at 50% 50%)' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="flex flex-col items-center gap-6 text-cream">
            <motion.div initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 160, damping: 12, delay: .1 }}>
              <AppleMark className="h-24 w-auto" fill="#FFF9F1" leaf="#285B40" />
            </motion.div>
            <div className="overflow-hidden">
              <motion.p className="font-display text-3xl font-semibold" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: .9, ease: EASE, delay: .45 }}>
                Little Steps. Big Dreams.
              </motion.p>
            </div>
            <div className="h-1 w-40 overflow-hidden rounded-full bg-white/25">
              <motion.div className="h-full rounded-full bg-cream" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, ease: 'easeInOut' }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
