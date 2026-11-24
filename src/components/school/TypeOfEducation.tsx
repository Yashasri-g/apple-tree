import { Sparkles, Brain, Shield, Heart, Palette, Shapes, CheckCircle } from 'lucide-react';
import type { SchoolSiteData } from '../../data/schoolsData';

interface TypeOfEducationProps {
  school: SchoolSiteData;
}

export function TypeOfEducation({ school }: TypeOfEducationProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'brain':
        return <Brain className="h-6 w-6 text-amber-600" />;
      case 'shield':
        return <Shield className="h-6 w-6 text-leaf-deep" />;
      case 'heart':
        return <Heart className="h-6 w-6 text-wm" />;
      case 'palette':
        return <Palette className="h-6 w-6 text-purple-600" />;
      case 'blocks':
      default:
        return <Shapes className="h-6 w-6 text-leaf-deep" />;
    }
  };

  return (
    <section id="type-of-education" className="py-16 sm:py-24 px-5 sm:px-8 bg-[#FAF6EE] text-left">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="max-w-2xl space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-leaf-deep px-3 py-1 rounded-full bg-leaf/10">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Pedagogical Philosophy</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink tracking-tight">
            Type of Education at {school.name}
          </h2>
          <p className="text-base sm:text-lg text-ink-soft">
            Rooted in our central 13-year framework: combining experiential Montessori discovery, synthetic phonics, emotional security, and sensory play.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {school.educationPillars.map((pillar, i) => (
            <div
              key={i}
              className="rounded-3xl p-7 sm:p-9 bg-white shadow-sm border border-ink/10 space-y-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3.5">
                <div className="h-12 w-12 rounded-2xl bg-cream flex items-center justify-center shadow-xs border border-ink/5">
                  {getIcon(pillar.icon)}
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-ink leading-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-leaf-deep">{pillar.subtitle}</p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                {pillar.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-ink/5">
                {pillar.highlights.map((h, hi) => (
                  <div key={hi} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink">
                    <CheckCircle className="h-4 w-4 text-leaf-deep shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 13-Year Pedagogy Banner */}
        <div className="mt-12 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-ink via-ink/95 to-ink-soft text-cream flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              The 13-Year Advantage
            </span>
            <h4 className="font-display text-xl sm:text-2xl font-bold text-white">
              Why Our Educational Approach Stands Out in Nizamabad
            </h4>
            <p className="text-xs sm:text-sm text-cream/80 max-w-2xl leading-relaxed">
              Unlike generic daycare or rote-learning preschools, our curriculum was organically developed and tested over 13+ years right here in Nizamabad. Children learn how to learn — carrying self-assurance, clear speech, and boundless curiosity into primary school.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-4">
            <div className="text-center px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-2xl sm:text-3xl font-display font-semibold text-amber-300">1,500+</div>
              <div className="text-[11px] text-cream/70">Happy Alumni</div>
            </div>
            <div className="text-center px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
              <div className="text-2xl sm:text-3xl font-display font-semibold text-leaf">4.6★</div>
              <div className="text-[11px] text-cream/70">Parent Trust</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
