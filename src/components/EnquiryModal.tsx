import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEnquiry } from './EnquiryContext';
import { EnquiryForm } from './EnquiryForm';
import { EASE } from './motion';
import { lenis } from '../lib/scroll';

export function EnquiryModal() {
  const { open, campus, close } = useEnquiry();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const key = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', key);
    return () => { lenis?.start(); document.body.style.overflow = ''; window.removeEventListener('keydown', key); prev?.focus?.(); };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] grid place-items-end sm:place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-leaf-night/60 backdrop-blur-md" onClick={close} />
          <motion.div
            ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Admission enquiry"
            data-lenis-prevent
            className="glass relative max-h-[94vh] w-full overflow-y-auto rounded-t-[2rem] p-6 outline-none sm:max-w-xl sm:rounded-[2rem] sm:p-9"
            initial={{ y: 80, opacity: 0, scale: .97 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 60, opacity: 0 }}
            transition={{ duration: .7, ease: EASE }}
          >
            <button onClick={close} aria-label="Close" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-ink/5 transition hover:rotate-90 hover:bg-ink/10"><X className="h-5 w-5" /></button>
            <h2 className="mb-6 pr-10 text-3xl text-ink sm:text-4xl">Ready for their first big adventure?</h2>
            <EnquiryForm initialCampus={campus} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
