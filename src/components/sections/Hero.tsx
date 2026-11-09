import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, MapPin, Award } from 'lucide-react';
import { photo, photoAlt } from '../../data/site';
import { EASE, Magnetic, SplitWords, Tilt } from '../motion';
import { useGo } from '../Nav';
import { INTRO_DELAY } from '../Loader';

const D = INTRO_DELAY - 2;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const go = useGo();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-6 pb-8 sm:pt-8 sm:pb-12">
      {/* Soft, calm background gradient */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-wm-pink/15 blur-[100px]" />
        <div className="absolute -left-32 top-1/2 h-[26rem] w-[26rem] rounded-full bg-leaf/15 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[88rem] px-5 sm:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          
          {/* Left Column: Clean Editorial Content */}
          <motion.div style={{ y: reduce ? 0 : textY }} className="relative z-10 lg:col-span-7">
            
            {/* Clean Experience Badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + D, duration: .6 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full glass px-3.5 py-1 text-xs font-semibold text-ink"
            >
              <Award className="h-3.5 w-3.5 text-leaf-deep" />
              <span className="font-display font-bold text-leaf-deep">13+ Years of Experience</span>
              <span className="text-ink/30">&bull;</span>
              <span className="text-ink-soft">Nizamabad, Telangana</span>
            </motion.div>

            <h1 className="display-xl font-bold text-ink">
              <SplitWords text="Little Steps." delay={2.0 + D} /><br />
              <span className="text-wm"><SplitWords text="Big Dreams." delay={2.2 + D} /></span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6 + D, duration: .8, ease: EASE }}
              className="mt-4 max-w-lg text-base text-ink-soft sm:text-lg leading-relaxed"
            >
              First founded with <strong className="font-semibold text-ink">Appletree Play School</strong> over 13 years ago. As children flourished, <strong className="font-semibold text-wm">Apple Play School</strong> was born — like fruit from the tree, sharing the same trusted heart.
            </motion.p>

            {/* Prominently Featured Official Logos Showcase with Gentle Floating Animations */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.75 + D, duration: .8, ease: EASE }}
              className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                animate={reduce ? undefined : { y: [0, -4, 0] }}
                transition={{
                  y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' },
                  scale: { type: 'spring', stiffness: 400, damping: 25 },
                }}
                className="flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-glass border border-leaf/30 transition-shadow hover:shadow-[0_12px_28px_-6px_rgba(117,184,106,0.35)]"
              >
                <img
                  src="/logos/appletree-play-school-logo.png"
                  alt="Appletree Play School Logo"
                  className="h-13 sm:h-16 w-auto object-contain max-w-[100px] sm:max-w-[135px]"
                />
                <div className="text-left border-l border-ink/10 pl-3.5">
                  <span className="block text-xs sm:text-sm font-display font-bold text-leaf-deep leading-tight">Appletree Play School</span>
                  <span className="block text-[11px] text-ink-soft font-medium">Founded First &bull; 13+ Years</span>
                </div>
              </motion.div>

              <span className="hidden sm:inline-block text-base font-bold text-ink/30 animate-pulse">&rarr;</span>

              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                animate={reduce ? undefined : { y: [0, 4, 0] }}
                transition={{
                  y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.6 },
                  scale: { type: 'spring', stiffness: 400, damping: 25 },
                }}
                className="flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-glass border border-wm/30 transition-shadow hover:shadow-[0_12px_28px_-6px_rgba(244,91,101,0.35)]"
              >
                <img
                  src="/logos/apple-play-school-logo.png"
                  alt="Apple Play School Logo"
                  className="h-13 sm:h-16 w-auto object-contain max-w-[120px] sm:max-w-[160px]"
                />
                <div className="text-left border-l border-ink/10 pl-3.5">
                  <span className="block text-xs sm:text-sm font-display font-bold text-wm leading-tight">Apple Play School</span>
                  <span className="block text-[11px] text-ink-soft font-medium">Sister Campus &bull; Gangasthan</span>
                </div>
              </motion.div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.9 + D, duration: .8, ease: EASE }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <button
                  onClick={() => go('schools')}
                  className="group relative flex items-center gap-2.5 overflow-hidden rounded-full bg-ink py-2.5 pl-6 pr-2.5 font-display text-sm font-semibold text-cream sm:text-base"
                >
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-wm transition-transform duration-500 ease-out group-hover:scale-y-100" />
                  <span className="relative">Discover Campuses</span>
                  <span className="relative grid h-8 w-8 place-items-center rounded-full bg-cream text-ink transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={() => go('enquire')}
                  className="glass group flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-semibold text-ink transition hover:bg-white sm:text-base"
                >
                  Explore Admissions <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </button>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* Right Column: Clean, Pristine Photo Card without clutter */}
          <div className="relative lg:col-span-5">
            <motion.div style={{ y: reduce ? 0 : imgY }}>
              <Tilt max={5}>
                <div className="relative overflow-hidden rounded-[2rem] shadow-glass border-4 border-white bg-cream aspect-[4/5] sm:aspect-[4/5]">
                  <img
                    src={photo('play', 1000, 1250)}
                    alt={photoAlt('play')}
                    fetchPriority="high"
                    className="graded h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent pointer-events-none" />

                  {/* Clean bottom glass pill */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="glass px-3.5 py-1.5 rounded-full text-xs font-semibold text-ink flex items-center gap-1.5 shadow-sm">
                      <MapPin className="h-3.5 w-3.5 text-wm" />
                      <span>Two Campuses in Nizamabad</span>
                    </div>
                    <span className="glass px-3 py-1.5 rounded-full text-xs font-bold text-leaf-deep">
                      4.6★ Rated
                    </span>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
