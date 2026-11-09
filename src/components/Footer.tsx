import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { SCHOOLS, SOCIALS } from '../data/site';
import { Logo } from './Logo';
import { Magnetic, SplitWords } from './motion';
import { useEnquiry } from './EnquiryContext';
import { useGo } from './Nav';

export function Footer() {
  const { openEnquiry } = useEnquiry();
  const go = useGo();
  const quick = [['Our Schools', 'schools'], ['Learning', 'learning'], ['Gallery', 'gallery'], ['About', 'about']];
  return (
    <footer className="relative overflow-hidden bg-leaf-night text-cream">
      <div className="mx-auto max-w-[88rem] px-5 pt-10 sm:px-8 sm:pt-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display-lg max-w-3xl"><SplitWords text="Let’s take the first little step." /></h2>
          <Magnetic>
            <button onClick={() => openEnquiry()} className="group flex items-center gap-3 rounded-full bg-wm py-2.5 pl-6 pr-2.5 font-display text-lg font-semibold text-white sm:py-3 sm:pl-7 sm:pr-3 sm:text-xl">
              Enquire Now <span className="grid h-10 w-10 place-items-center rounded-full bg-cream text-ink transition-transform duration-500 group-hover:rotate-45 sm:h-11 sm:w-11"><ArrowUpRight /></span>
            </button>
          </Magnetic>
        </div>

        <div className="mt-8 grid gap-8 border-t border-white/15 pt-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo light />
            <p className="mt-3 max-w-xs text-sm text-cream/70">
              Rooted in 13+ years of early childhood education. From the Tree blossoms the Apple. Nizamabad, Telangana.
            </p>
          </div>
          <div className="space-y-4 md:col-span-4">
            {Object.values(SCHOOLS).map((s) => (
              <div key={s.id}>
                <Link to={`/schools/${s.id}`} className="font-display text-lg font-semibold transition hover:text-wm-pink sm:text-xl">{s.name}</Link>
                <a href={s.mapsUrl} target="_blank" rel="noreferrer" className="mt-0.5 flex items-start gap-2 text-xs text-cream/60 transition hover:text-cream sm:text-sm"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />{s.address}</a>
              </div>
            ))}
          </div>
          <nav aria-label="Footer" className="md:col-span-2">
            <ul className="space-y-1.5 text-sm">{quick.map(([l, id]) => <li key={id}><button onClick={() => go(id)} className="text-cream/70 transition hover:translate-x-1 hover:text-cream">{l}</button></li>)}</ul>
          </nav>
          <div className="md:col-span-2">
            {SOCIALS.length > 0 && <ul className="space-y-1.5 text-sm">{SOCIALS.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="text-cream/70 hover:text-cream">{s.label}</a></li>)}</ul>}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-between gap-2 border-t border-white/10 py-4 text-xs text-cream/50 sm:text-sm">
          <span>© {new Date().getFullYear()} Apple &amp; Appletree Play Schools</span>
          <span>13+ Years of Early Education &bull; Nizamabad, Telangana</span>
        </div>
      </div>
    </footer>
  );
}
