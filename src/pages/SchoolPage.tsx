import { useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, MapPin, Star } from 'lucide-react';
import { SCHOOLS, STAGES, photo, photoAlt, type SchoolId } from '../data/site';
import { EASE, Magnetic, MaskImage, Marquee, Reveal, SplitWords, Tilt } from '../components/motion';
import { AppleMark, Leaf } from '../components/Shapes';
import { useEnquiry } from '../components/EnquiryContext';
import { Lightbox } from '../components/sections/Gallery';
import { useState } from 'react';
import { useSeo } from '../lib/seo';

/** Same grammar for both campuses, but each gets its own motif, shape and colour. */
const THEME = {
  'apple-play-school': {
    accent: 'text-wm', bg: 'bg-wm', soft: 'bg-wm-soft', ring: 'bg-wm/90', dark: 'bg-wm',
    heroShape: 'arch', Motif: AppleMark,
  },
  'appletree-play-school': {
    accent: 'text-leaf-deep', bg: 'bg-leaf-deep', soft: 'bg-leaf-soft', ring: 'bg-leaf', dark: 'bg-leaf-deep',
    heroShape: 'leaf-shape', Motif: Leaf,
  },
} as const;

export function SchoolPage() {
  const { slug } = useParams();
  const school = slug && slug in SCHOOLS ? SCHOOLS[slug as SchoolId] : null;
  if (!school) return <Navigate to="/" replace />;
  return <SchoolInner key={school.id} id={school.id} />;
}

function SchoolInner({ id }: { id: SchoolId }) {
  const s = SCHOOLS[id];
  const th = THEME[id];
  const isApple = id === 'apple-play-school';
  const { openEnquiry } = useEnquiry();
  const reduce = useReducedMotion();
  const [lb, setLb] = useState<number | null>(null);
  const hero = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  useSeo(`${s.name} | ${s.area}, Nizamabad`, `${s.name} on ${s.area}, Nizamabad, Telangana. ${s.intro}`);

  return (
    <main>
      {/* HERO */}
      <section ref={hero} className={`relative overflow-hidden px-5 pb-10 pt-6 sm:px-8 sm:pb-14 sm:pt-8 ${isApple ? '' : 'bg-leaf-soft/50'}`}>
        <div aria-hidden className={`pointer-events-none absolute -right-32 -top-32 h-[36rem] w-[36rem] rounded-full blur-[120px] ${isApple ? 'bg-wm-pink/30' : 'bg-leaf/30'}`} />
        <div className="relative mx-auto grid max-w-[88rem] items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Link to="/" className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition hover:-translate-x-1 hover:text-ink"><ArrowLeft className="h-4 w-4" /> All schools</Link>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.08, rotate: isApple ? 2 : -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className={`h-16 sm:h-22 p-2.5 rounded-2xl bg-white shadow-sm border ${isApple ? 'border-wm/30' : 'border-leaf/30'} flex items-center justify-center cursor-pointer`}
              >
                <img src={s.logo} alt={`${s.name} logo`} className="h-full w-auto object-contain max-w-[140px] sm:max-w-[190px]" />
              </motion.div>
              <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-semibold text-ink">
                <span className={`h-2 w-2 rounded-full ${isApple ? 'bg-wm' : 'bg-leaf'} animate-pulse`} />
                <span className="font-display font-bold">{s.historyBadge}</span>
                <span className="text-ink/40">&bull;</span>
                <span className="text-ink-soft">{isApple ? 'Blossomed from Appletree' : 'Established First • 13+ Years'}</span>
              </span>
            </div>
            <h1 className="display-xl text-[clamp(2.8rem,7.5vw,7rem)] font-bold text-ink">
              <SplitWords text={s.short} delay={.1} /><br />
              <span className={th.accent}><SplitWords text="Play School." delay={.25} /></span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7, duration: 1, ease: EASE }} className="mt-4 max-w-md text-lg text-ink-soft sm:text-xl">{s.tagline}</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .85, duration: 1, ease: EASE }} className="mt-6 flex flex-wrap items-center gap-3">
              <Magnetic>
                <button onClick={() => openEnquiry(id)} className={`group relative flex items-center gap-3 overflow-hidden rounded-full py-2.5 pl-6 pr-2.5 font-display text-base font-semibold text-white sm:text-lg ${th.bg}`}>
                  <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  <span className="relative">Enquire Now</span>
                  <span className="relative grid h-9 w-9 place-items-center rounded-full bg-cream text-ink transition-transform duration-500 group-hover:rotate-45 sm:h-10 sm:w-10"><ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" /></span>
                </button>
              </Magnetic>
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold sm:text-sm"><MapPin className={`h-4 w-4 ${th.accent}`} />{s.area}, Nizamabad</span>
              {s.rating && <span className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold sm:text-sm"><Star className="h-4 w-4 fill-amber-400 text-amber-400" />{s.rating.score} on {s.rating.source}</span>}
            </motion.div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:col-span-5">
            <motion.div style={{ y: reduce ? 0 : y }}>
              <Tilt max={6}>
                <div className="relative overflow-hidden rounded-[2rem] shadow-glass border-4 border-white aspect-[4/5] bg-cream">
                  <MaskImage src={photo(s.hero, 1000, 1250)} alt={photoAlt(s.hero)} eager className="h-full w-full object-cover" />
                </div>
              </Tilt>
            </motion.div>
          </div>
        </div>
      </section>

      <div className={`py-2.5 font-display text-2xl font-semibold uppercase text-cream sm:py-3.5 sm:text-4xl ${th.dark}`}><Marquee items={s.activities} /></div>

      {/* INTRO */}
      <section className="px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto grid max-w-[88rem] items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-wider text-leaf-deep">
              {isApple ? 'Sister Campus &bull; Born from Appletree' : 'Foundation Campus &bull; 13+ Years of Experience'}
            </span>
            <h2 className="display-md mt-1"><SplitWords text={s.intro} /></h2>
            <p className="mt-4 text-base text-ink-soft sm:text-lg leading-relaxed">
              {isApple
                ? 'Just as an apple is produced from the tree, Apple Play School was born from the 13-year foundation of Appletree. Our Gangasthan campus brings the exact same seasoned educators, loving care, and play-based discovery closer to your home.'
                : 'Over 13 years of proven early childhood excellence in Nizamabad. Appletree Play School was established first on Yellama Gutta Road, building strong roots of trust that blossomed into our sister campus, Apple Play School.'}
            </p>
            <Reveal delay={.2}><img src={s.logo} alt={`${s.name} logo`} loading="lazy" className="mt-6 h-24 w-auto rounded-2xl bg-white p-3 shadow-glass sm:h-32 sm:rounded-3xl" /></Reveal>
          </div>
          <div className="relative lg:col-span-5 lg:col-start-8">
            <MaskImage src={photo(s.secondary, 900, 1000)} alt={photoAlt(s.secondary)} from="right" className={`aspect-[5/6] shadow-lift ${isApple ? 'blob-a' : 'blob-b'}`} />
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className={`px-5 py-10 sm:px-8 sm:py-14 ${th.soft}`}>
        <div className="mx-auto max-w-[88rem]">
          <h2 className="display-md"><SplitWords text="Every stage, a new discovery." /></h2>
          <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-3 sm:gap-5" data-lenis-prevent>
            {STAGES.map((st, i) => (
              <motion.div key={st.id} whileHover={{ y: -8, rotate: i % 2 ? 1 : -1 }} className="w-64 shrink-0 snap-start rounded-[1.75rem] bg-white p-5 shadow-glass sm:w-72 sm:p-6">
                <p className={`font-display text-xs font-semibold ${th.accent} sm:text-sm`}>0{i + 1}</p>
                <h3 className="mt-4 text-4xl sm:text-5xl">{st.name}</h3>
                <p className="mt-2 font-display text-base font-semibold text-ink-soft sm:text-lg">{st.age}</p>
                <p className="mt-1 text-sm text-ink-soft">{st.line}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section className="px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto max-w-[88rem]">
          <h2 className="display-md"><SplitWords text="A day full of doing." /></h2>
          <ul className="mt-6 sm:mt-8">
            {s.activities.map((a, i) => (
              <li key={a} className="group border-t border-ink/15 last:border-b">
                <Reveal delay={i * .05} y={20}>
                  <div className="flex items-center justify-between py-3 sm:py-4">
                    <span className="flex items-baseline gap-4 sm:gap-8">
                      <span className={`font-display text-base font-semibold ${th.accent} sm:text-lg`}>0{i + 1}</span>
                      <span className="font-display text-3xl font-bold transition-all duration-500 group-hover:translate-x-3 group-hover:text-wm sm:text-5xl lg:text-6xl">{a}</span>
                    </span>
                    <ArrowUpRight className="h-6 w-6 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 sm:h-9 sm:w-9" />
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GALLERY */}
      <section className="px-5 pb-10 sm:px-8 sm:pb-14">
        <div className="mx-auto max-w-[88rem]">
          <h2 className="display-md"><SplitWords text="Little moments." /></h2>
          <p className="mt-1.5 text-xs text-ink-soft sm:text-sm">Illustrative photography. Real campus moments coming soon.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {s.gallery.map((k, i) => (
              <button key={k} onClick={() => setLb(i)} aria-label={`Open photo ${i + 1}`} className={`overflow-hidden rounded-[1.25rem] sm:rounded-[1.75rem] ${i % 2 ? 'lg:mt-3' : ''}`}>
                <MaskImage src={photo(k, 700)} alt={photoAlt(k)} className="aspect-[3/4]" parallax={20} delay={i * .08} />
              </button>
            ))}
          </div>
        </div>
        <Lightbox items={s.gallery} index={lb} onClose={() => setLb(null)} onIndex={setLb} />
      </section>

      {/* LOCATION */}
      <section className="bg-white px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto grid max-w-[88rem] items-stretch gap-6 sm:gap-8 lg:grid-cols-12">
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <h2 className="display-md"><SplitWords text="Come say hello." /></h2>
              <Reveal delay={.1}>
                <p className="mt-4 text-lg sm:text-xl">{s.address}</p>
                <p className="text-sm text-ink-soft">PIN {s.postal}</p>
              </Reveal>
            </div>
            <a href={s.mapsUrl} target="_blank" rel="noreferrer" className={`group mt-6 inline-flex w-fit items-center gap-3 rounded-full py-2.5 pl-6 pr-2.5 font-display text-base font-semibold text-white sm:text-lg ${th.bg}`}>
              Get directions <span className="grid h-9 w-9 place-items-center rounded-full bg-cream text-ink transition-transform duration-500 group-hover:rotate-45 sm:h-10 sm:w-10"><ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" /></span>
            </a>
          </div>
          <Reveal className="lg:col-span-7">
            <div className="glass overflow-hidden rounded-[1.75rem] p-2">
              <iframe title={`${s.name} location map`} src={s.embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[20rem] w-full rounded-[1.25rem] border-0 sm:h-[24rem]" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className={`relative overflow-hidden px-5 py-10 text-center text-white sm:px-8 sm:py-14 ${isApple ? 'bg-wm' : 'bg-leaf-deep'}`}>
        <div aria-hidden className="absolute inset-0 opacity-20"><Marquee items={['Hello', 'Welcome', 'Enquire']} className="pt-4 font-display text-[22vw] font-bold leading-none" /></div>
        <div className="relative">
          <h2 className="display-lg mx-auto max-w-4xl"><SplitWords text="Ready for their first big adventure?" /></h2>
          <div className="mt-6"><Magnetic><button onClick={() => openEnquiry(id)} className="rounded-full bg-cream px-8 py-3.5 font-display text-lg font-semibold text-ink transition hover:scale-105 sm:px-9 sm:py-4 sm:text-xl">Enquire Now</button></Magnetic></div>
        </div>
      </section>
    </main>
  );
}
