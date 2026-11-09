import { SplitWords } from '../motion';
import { Award, Heart, Sparkles, Compass } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Award,
    title: '13+ Years of Experience',
    desc: 'Founded first with Appletree Play School on Yellama Gutta Road, nurturing generations of toddlers.',
    color: 'text-leaf-deep',
    bg: 'bg-leaf-soft',
  },
  {
    icon: Sparkles,
    title: 'Play-Led Learning',
    desc: 'Sensory discovery, storytelling circles, rhymes, and foundational phonics in a warm setting.',
    color: 'text-wm',
    bg: 'bg-wm-soft',
  },
  {
    icon: Compass,
    title: 'Two Sister Campuses',
    desc: 'Appletree on Yellama Gutta Road and Apple Play School in Gangasthan, both rooted in the same care.',
    color: 'text-leaf-deep',
    bg: 'bg-leaf-soft',
  },
  {
    icon: Heart,
    title: 'Safe & Happy Environment',
    desc: 'Caring, experienced educators who treat every child with patience, respect, and encouragement.',
    color: 'text-wm',
    bg: 'bg-wm-soft',
  },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white px-5 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto max-w-[88rem]">
        
        {/* Editorial Story Header */}
        <div className="grid items-end gap-6 lg:grid-cols-12 pb-8 border-b border-ink/10">
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-wider text-leaf-deep">
              Our 13-Year Story &bull; Nizamabad
            </span>
            <h2 className="display-md mt-1 text-ink">
              <SplitWords text="From the tree," /><br />
              <span className="text-wm"><SplitWords text="The apple blossoms." delay={.2} /></span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm text-ink-soft sm:text-base leading-relaxed">
              We first established <strong className="font-semibold text-ink">Appletree Play School</strong> with a mission to give childhood a happy beginning. With <strong className="font-semibold text-leaf-deep">over 13 years of experience</strong> in early education, those deep roots blossomed into <strong className="font-semibold text-wm">Apple Play School</strong> — like an apple produced from the tree, extending our trusted care to Gangasthan.
            </p>
          </div>
        </div>

        {/* 4 Clean Value Cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.title}
                className="rounded-2xl p-5 bg-cream/50 border border-ink/5 hover:bg-white hover:shadow-subtle transition-all duration-200"
              >
                <span className={`grid h-10 w-10 place-items-center rounded-xl ${h.bg} ${h.color} mb-3`}>
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-display font-bold text-lg text-ink">
                  {h.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-ink-soft leading-relaxed">
                  {h.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
