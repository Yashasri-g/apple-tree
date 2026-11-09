import { photo } from '../../data/site';
import { SCHOOLS } from '../../data/site';
import { EnquiryForm } from '../EnquiryForm';
import { MapPin } from 'lucide-react';
import { Reveal, SplitWords } from '../motion';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { CampusChoice } from '../EnquiryContext';

export function Enquire({ campus = 'not-sure', heading = true }: { campus?: CampusChoice; heading?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section id="enquire" ref={ref} className="relative isolate overflow-hidden px-5 py-10 sm:px-8 sm:py-14">
      <motion.div aria-hidden style={{ y }} className="absolute -inset-y-[10%] inset-x-0 -z-20">
        <img src={photo('paint', 1800)} alt="" loading="lazy" className="h-full w-full object-cover" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-leaf-night/95 via-leaf-deep/90 to-wm-dark/80" />

      <div className="mx-auto grid max-w-[88rem] items-center gap-8 lg:grid-cols-12">
        <div className="text-cream lg:col-span-6">
          <span className="text-xs font-bold uppercase tracking-wider text-leaf-soft">
            Admissions Open &bull; 13+ Years of Trust
          </span>
          {heading && (
            <h2 className="display-lg mt-1">
              <SplitWords text="Ready for Their" /><br />
              <span className="text-wm-pink"><SplitWords text="First Big Adventure?" delay={.2} /></span>
            </h2>
          )}
          <p className="mt-3 text-sm sm:text-base text-cream/80 max-w-md">
            Schedule a counseling visit or enquiry for Apple Play School (Gangasthan) or Appletree Play School (Yellama Gutta Road).
          </p>

          <Reveal delay={.2}>
            <div className="mt-6 space-y-3">
              {Object.values(SCHOOLS).map((s) => (
                <a
                  key={s.id}
                  href={s.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3.5 p-3.5 rounded-2xl glass-dark hover:bg-white/20 transition-all border border-white/10"
                >
                  <div className="h-14 w-20 shrink-0 rounded-xl bg-white p-1.5 flex items-center justify-center">
                    <img src={s.logo} alt={s.name} className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-base font-bold text-cream truncate">{s.name}</span>
                      <span className="text-[10px] rounded-full bg-white/20 px-2 py-0.2 text-cream/90 font-semibold">{s.historyBadge}</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-cream/70 truncate">
                      <MapPin className="h-3 w-3 shrink-0 text-wm-pink" />
                      {s.area}, Nizamabad
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6" y={30}>
          <div className="glass rounded-[1.75rem] !bg-white/90 p-5 sm:p-7 shadow-lift">
            <EnquiryForm initialCampus={campus} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
