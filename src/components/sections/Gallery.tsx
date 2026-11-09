import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GALLERY, photo, photoAlt, type PhotoKey } from '../../data/site';
import { EASE, MaskImage, SplitWords } from '../motion';
import { lenis } from '../../lib/scroll';

const ratio = { tall: 'aspect-[3/4]', wide: 'aspect-[4/3]', square: 'aspect-square' } as const;

export function Lightbox({ items, index, onClose, onIndex }: { items: PhotoKey[]; index: number | null; onClose: () => void; onIndex: (i: number) => void }) {
  const open = index !== null;
  const step = useCallback((d: number) => index !== null && onIndex((index + d + items.length) % items.length), [index, items.length, onIndex]);
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); };
    window.addEventListener('keydown', k);
    return () => { lenis?.start(); window.removeEventListener('keydown', k); };
  }, [open, onClose, step]);
  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[85] grid place-items-center bg-leaf-night/90 p-4 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white transition hover:rotate-90 hover:bg-white/25"><X /></button>
          <button onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photo" className="absolute left-3 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 sm:left-8"><ChevronLeft /></button>
          <button onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photo" className="absolute right-3 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25 sm:right-8"><ChevronRight /></button>
          <AnimatePresence mode="wait">
            <motion.img
              key={items[index]}
              src={photo(items[index], 1800)} alt={photoAlt(items[index])}
              onClick={(e) => e.stopPropagation()}
              drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={.4}
              onDragEnd={(_, info) => { if (info.offset.x < -80) step(1); else if (info.offset.x > 80) step(-1); }}
              className="max-h-[85vh] max-w-full cursor-grab rounded-3xl object-contain shadow-lift active:cursor-grabbing"
              initial={{ opacity: 0, scale: .92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .5, ease: EASE }}
            />
          </AnimatePresence>
          <p className="absolute bottom-5 text-sm text-white/70">{index + 1} / {items.length}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const keys = GALLERY.map((g) => g.key);
  return (
    <section id="gallery" className="relative px-5 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-[88rem]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display-lg text-ink">
            <SplitWords text="Little Moments." /><br />
            <span className="text-wm"><SplitWords text="Big Memories." delay={.2} /></span>
          </h2>
          <p className="max-w-[16rem] text-xs text-ink-soft sm:text-sm">Illustrative photography. Real campus moments will be added here.</p>
        </div>

        <div className="mt-6 columns-2 gap-3 sm:gap-4 lg:columns-3">
          {GALLERY.map((g, i) => (
            <motion.button
              key={g.key}
              onClick={() => setOpen(i)}
              aria-label={`Open photo: ${g.caption}`}
              className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-[1.25rem] text-left sm:mb-4 sm:rounded-[1.75rem]"
              whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <MaskImage src={photo(g.key, 900)} alt={photoAlt(g.key)} className={`${ratio[g.span]} w-full`} parallax={24} delay={(i % 3) * .1} sizes="(min-width:1024px) 30vw, 50vw" />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-leaf-night/80 to-transparent p-3 pt-10 font-display text-base font-semibold text-cream transition-transform duration-500 ease-out group-hover:translate-y-0 sm:p-4 sm:pt-12 sm:text-lg">{g.caption}</span>
            </motion.button>
          ))}
        </div>
      </div>
      <Lightbox items={keys} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}
