import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LEARNING, photo, photoAlt } from '../../data/site';
import { EASE, SplitWords } from '../motion';

export function Learning() {
  const [i, setI] = useState(0);
  const cur = LEARNING[i];

  return (
    <section id="learning" className="relative overflow-hidden bg-leaf-night py-10 text-cream sm:py-14">
      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-leaf-soft">
            Play-Led Curriculum
          </span>
          <h2 className="display-lg mt-1">
            <SplitWords text="Learning Should" /><br />
            <span className="text-wm-pink"><SplitWords text="Feel Like Play." delay={.2} /></span>
          </h2>
        </div>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-12">
          {/* Clean Image Window */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm rounded-3xl overflow-hidden shadow-lift border border-white/15">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={cur.id}
                  src={photo(cur.img, 900, 1100)}
                  alt={photoAlt(cur.img)}
                  className="graded absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: .6, ease: EASE }}
                />
              </AnimatePresence>
              <div className="glass-dark absolute bottom-4 right-4 rounded-full px-4 py-1.5 font-display text-xs font-semibold">
                0{i + 1} <span className="text-cream/50">/ 0{LEARNING.length}</span>
              </div>
            </div>
          </div>

          {/* Interactive List */}
          <ul className="lg:col-span-7 lg:pl-6">
            {LEARNING.map((l, idx) => {
              const on = idx === i;
              return (
                <li key={l.id} className="border-t border-white/15 last:border-b">
                  <button
                    onMouseEnter={() => setI(idx)}
                    onFocus={() => setI(idx)}
                    onClick={() => setI(idx)}
                    aria-pressed={on}
                    className="group flex w-full items-center justify-between gap-4 py-3.5 text-left transition-colors"
                  >
                    <span>
                      <span className={`block font-display text-2xl font-semibold transition-all duration-300 sm:text-3xl lg:text-4xl ${on ? 'translate-x-2 text-cream' : 'text-cream/40 group-hover:text-cream/75'}`}>
                        {l.title}
                      </span>
                      <motion.span
                        initial={false}
                        animate={{ height: on ? 'auto' : 0, opacity: on ? 1 : 0 }}
                        transition={{ duration: .4, ease: EASE }}
                        className="block overflow-hidden"
                      >
                        <span className="block pt-1 pl-2 text-sm text-cream/75 sm:text-base">{l.line}</span>
                      </motion.span>
                    </span>
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-300 ${on ? 'bg-wm scale-125' : 'bg-transparent'}`} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
