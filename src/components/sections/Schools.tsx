import { Link } from 'react-router-dom';
import { ArrowUpRight, Star, MapPin } from 'lucide-react';
import { SCHOOLS, photo, photoAlt } from '../../data/site';
import { SplitWords } from '../motion';

export function Schools() {
  const t = SCHOOLS['appletree-play-school'];
  const a = SCHOOLS['apple-play-school'];

  return (
    <section id="schools" className="relative overflow-hidden px-5 py-10 sm:px-8 sm:py-14 bg-white/50">
      <div className="mx-auto max-w-[88rem]">
        
        {/* Clean Editorial Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-leaf-deep mb-2">
            <span>Our Campuses</span>
            <span>&bull;</span>
            <span className="text-wm">13+ Years in Nizamabad</span>
          </div>
          <h2 className="display-lg text-ink">
            <SplitWords text="From the Tree," /><br />
            <span className="text-wm"><SplitWords text="The Apple Blossoms." delay={.2} /></span>
          </h2>
          <p className="mt-3 text-sm text-ink-soft sm:text-base leading-relaxed">
            Founded first with Appletree on Yellama Gutta Road. Over 13 years of early childhood experience grew into Apple Play School at Gangasthan — like an apple produced from the tree.
          </p>
        </div>

        {/* 2 Clean, Uncluttered Campus Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:gap-8 items-stretch">
          
          {/* Card 1: Appletree Play School (Founded First) */}
          <Link
            to={`/schools/${t.id}`}
            className="group flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white border border-leaf/20 shadow-subtle hover:shadow-glass hover:border-leaf/40 transition-all duration-300 p-6 sm:p-7"
            aria-label={`Explore ${t.name}`}
          >
            <div>
              {/* Header with Authentic Logo and Badges */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="h-20 sm:h-24 w-auto max-w-[140px] sm:max-w-[170px] rounded-2xl bg-white shadow-xs p-2 flex items-center justify-center border border-leaf/30 group-hover:scale-105 transition-transform">
                  <img src="/logos/appletree-play-school-logo.png" alt="Appletree Play School Logo" className="h-full w-full object-contain" />
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="rounded-full bg-leaf-soft px-3 py-1 text-xs font-bold text-leaf-deep">
                    Founded First &bull; 13+ Yrs
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 border border-amber-200">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> 4.6★ (5 Reviews)
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-ink group-hover:text-leaf-deep transition-colors">
                {t.name}
              </h3>
              <p className="mt-1 text-xs sm:text-sm font-semibold text-leaf-deep">
                The Foundational Root Campus
              </p>
              <p className="mt-2 text-xs sm:text-sm text-ink-soft leading-relaxed">
                Where our journey began 13+ years ago. Deep roots, seasoned educators, and generations of happy toddlers on Yellama Gutta Road.
              </p>

              {/* Photo */}
              <div className="mt-5 overflow-hidden rounded-2xl aspect-[16/10] bg-cream">
                <img
                  src={photo(t.hero, 900, 600)}
                  alt={photoAlt(t.hero)}
                  className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Footer Location & CTA */}
            <div className="mt-5 pt-4 border-t border-ink/10 flex items-center justify-between text-xs text-ink-soft">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="h-3.5 w-3.5 text-leaf-deep" />
                <span>Yellama Gutta Road, Nizamabad</span>
              </span>
              <span className="inline-flex items-center gap-1 font-display font-bold text-leaf-deep group-hover:translate-x-1 transition-transform">
                <span>View Campus</span>
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>

          {/* Card 2: Apple Play School (Sister Campus) */}
          <Link
            to={`/schools/${a.id}`}
            className="group flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white border border-wm/20 shadow-subtle hover:shadow-glass hover:border-wm/40 transition-all duration-300 p-6 sm:p-7"
            aria-label={`Explore ${a.name}`}
          >
            <div>
              {/* Header with Authentic Logo and Badges */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="h-20 sm:h-24 w-auto max-w-[170px] sm:max-w-[210px] rounded-2xl bg-white shadow-xs p-2 flex items-center justify-center border border-wm/30 group-hover:scale-105 transition-transform">
                  <img src="/logos/apple-play-school-logo.png" alt="Apple Play School Logo" className="h-full w-full object-contain" />
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="rounded-full bg-wm-soft px-3 py-1 text-xs font-bold text-wm">
                    Born from the Tree
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2.5 py-0.5 text-[11px] font-semibold text-ink-soft border border-ink/10">
                    Gangasthan Campus
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-ink group-hover:text-wm transition-colors">
                {a.name}
              </h3>
              <p className="mt-1 text-xs sm:text-sm font-semibold text-wm">
                The Blossomed Fruit
              </p>
              <p className="mt-2 text-xs sm:text-sm text-ink-soft leading-relaxed">
                Like an apple produced from the tree, created to extend our trusted 13-year educational excellence and warmth to Gangasthan.
              </p>

              {/* Photo */}
              <div className="mt-5 overflow-hidden rounded-2xl aspect-[16/10] bg-cream">
                <img
                  src={photo(a.hero, 900, 600)}
                  alt={photoAlt(a.hero)}
                  className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Footer Location & CTA */}
            <div className="mt-5 pt-4 border-t border-ink/10 flex items-center justify-between text-xs text-ink-soft">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="h-3.5 w-3.5 text-wm" />
                <span>Behind Murali Krishna Mandir</span>
              </span>
              <span className="inline-flex items-center gap-1 font-display font-bold text-wm group-hover:translate-x-1 transition-transform">
                <span>View Campus</span>
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
