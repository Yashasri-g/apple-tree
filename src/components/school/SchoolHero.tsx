import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Star, ShieldCheck, HeartHandshake, Sparkles, Phone, Award } from 'lucide-react';
import type { SchoolSiteData } from '../../data/schoolsData';

interface SchoolHeroProps {
  school: SchoolSiteData;
  onOpenEnquiry: () => void;
  onExploreClasses: () => void;
}

export function SchoolHero({ school, onOpenEnquiry, onExploreClasses }: SchoolHeroProps) {
  const isApple = school.id === 'apple-school-pragathi-nagar';

  return (
    <section id="home" className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 px-5 sm:px-8 overflow-hidden bg-[#FAF6EE]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-soft">
              <span
                className="inline-flex items-center gap-2 font-semibold uppercase tracking-[0.14em] text-xs"
                style={{ color: school.theme.primaryColor }}
              >
                <Award className="h-3.5 w-3.5" />
                {school.heritageBadge}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {school.contact.area}, Nizamabad
              </span>
              {school.rating && (
                <span className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {school.rating.score} · {school.rating.source}
                </span>
              )}
            </div>

            {/* School Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-ink tracking-tight leading-[1.1]"
            >
              {school.heroHeadline}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl"
            >
              {school.heroSubheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="pt-2 flex flex-wrap items-center gap-3.5"
            >
              <button
                onClick={onOpenEnquiry}
                className="px-7 py-3.5 rounded-full font-body text-base font-semibold text-white shadow-sm hover:opacity-90 transition-all cursor-pointer flex items-center gap-2"
                style={{ backgroundColor: school.theme.primaryColor }}
              >
                <span>Admissions Open (2026-27)</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onExploreClasses}
                className="px-6 py-3.5 rounded-full font-body text-base font-semibold text-ink bg-white hover:bg-black/5 border border-ink/10 transition-all cursor-pointer"
              >
                Explore Classes
              </button>

              <a
                href={`tel:${school.contact.phone}`}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full text-sm font-semibold text-ink-soft hover:text-ink transition-colors"
              >
                <Phone className="h-4 w-4 text-leaf-deep" />
                <span>{school.contact.phone}</span>
              </a>
            </motion.div>

            {/* Key Trust Badges */}
            <div className="pt-6 border-t border-ink/10 grid grid-cols-3 gap-4 text-left">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                  <ShieldCheck className="h-4 w-4 text-leaf-deep" />
                  <span>100% Safe</span>
                </div>
                <p className="text-[11px] text-ink-soft">24/7 CCTV &amp; Child Safe</p>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                  <HeartHandshake className="h-4 w-4 text-wm" />
                  <span>10:1 Ratio</span>
                </div>
                <p className="text-[11px] text-ink-soft">Individual Toddler Care</p>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>13+ Years</span>
                </div>
                <p className="text-[11px] text-ink-soft">Montessori Heritage</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              <div className="relative overflow-hidden rounded-3xl bg-white p-2 shadow-lg border border-ink/5">
                <div className="relative aspect-[4/5] rounded-[1.25rem] overflow-hidden bg-cream">
                  <img
                    src={
                      isApple
                        ? 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80'
                        : 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1000&q=80'
                    }
                    alt={`${school.name} classroom joy`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md">
                      {school.branchName}
                    </span>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white mt-1.5">
                      {school.tagline}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
