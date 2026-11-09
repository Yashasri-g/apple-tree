import { useState } from 'react';
import { STAGES } from '../../data/site';
import { SplitWords } from '../motion';
import { Check } from 'lucide-react';

export function Programs() {
  const [active, setActive] = useState(0);
  const cur = STAGES[active];

  return (
    <section id="programs" className="relative overflow-hidden px-5 py-10 sm:px-8 sm:py-14 bg-cream-50">
      <div className="mx-auto max-w-[88rem]">
        
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-leaf-deep">
            Preschool Journey &bull; Ages 1.5 – 5.5
          </span>
          <h2 className="display-lg text-ink mt-1">
            <SplitWords text="Every Stage." /><br />
            <span className="text-leaf-deep"><SplitWords text="A New Discovery." delay={.2} /></span>
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Thoughtfully tailored developmental milestones at both Apple Play School and Appletree Play School.
          </p>
        </div>

        {/* 4 Clean Stage Cards Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((s, idx) => {
            const isSelected = idx === active;
            return (
              <button
                key={s.id}
                onClick={() => setActive(idx)}
                className={`flex flex-col justify-between text-left rounded-2xl p-5 transition-all duration-200 border ${
                  isSelected
                    ? 'bg-white border-leaf shadow-sm ring-1 ring-leaf/30 -translate-y-1'
                    : 'bg-white/70 border-ink/10 hover:bg-white hover:border-ink/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-leaf-deep">0{idx + 1}</span>
                    <span className="rounded-full bg-leaf-soft px-2.5 py-0.5 text-[11px] font-bold text-leaf-deep">
                      {s.age}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-ink">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-xs text-ink-soft leading-relaxed">
                    {s.line}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-ink/5 flex items-center gap-1.5 text-xs font-semibold text-leaf-deep">
                  <Check className="h-3.5 w-3.5 text-leaf" />
                  <span>Both Campuses</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Quick Highlight Banner */}
        <div className="mt-6 rounded-2xl glass p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-white/80">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-wm">Active Stage &bull; {cur.name} ({cur.age})</span>
            <p className="text-sm text-ink font-medium mt-0.5">{cur.line} Daily play, sensory activities, and social development.</p>
          </div>
          <a
            href="#enquire"
            className="rounded-full bg-ink hover:bg-black text-white text-xs font-semibold px-5 py-2.5 shrink-0 transition"
          >
            Enquire for {cur.name}
          </a>
        </div>

      </div>
    </section>
  );
}
