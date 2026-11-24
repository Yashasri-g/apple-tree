import { useState } from 'react';
import { Clock, UserCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import type { SchoolSiteData, ClassOffering } from '../../data/schoolsData';

interface WhatClassesProps {
  school: SchoolSiteData;
  onSelectClass?: (classOffering: ClassOffering) => void;
}

export function WhatClasses({ school, onSelectClass }: WhatClassesProps) {
  const [selectedClassId, setSelectedClassId] = useState<string>(
    school.classes[0]?.id || ''
  );

  const selectedClass =
    school.classes.find((c) => c.id === selectedClassId) || school.classes[0];

  return (
    <section id="what-classes" className="py-16 sm:py-24 px-5 sm:px-8 bg-white text-left">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="max-w-2xl space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-leaf-deep px-3 py-1 rounded-full bg-leaf/10">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Programs &amp; Age Groups</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink tracking-tight">
            What Classes We Offer at {school.shortName}
          </h2>
          <p className="text-base sm:text-lg text-ink-soft">
            Age-appropriate, joyful early learning stages designed around child curiosity, motor coordination, and primary school readiness.
          </p>
        </div>

        {/* Class Selection Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-10 pb-2 border-b border-ink/10">
          {school.classes.map((cls) => {
            const isSelected = cls.id === selectedClassId;
            return (
              <button
                key={cls.id}
                onClick={() => setSelectedClassId(cls.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'text-white shadow-md'
                    : 'bg-black/5 text-ink-soft hover:text-ink hover:bg-black/10'
                }`}
                style={{
                  backgroundColor: isSelected ? school.theme.primaryColor : undefined,
                }}
              >
                <span>{cls.name.split(' (')[0]}</span>
                <span className="text-xs opacity-80">({cls.ageGroup})</span>
              </button>
            );
          })}
        </div>

        {/* Active Class Highlight Card */}
        {selectedClass && (
          <div className="rounded-3xl p-6 sm:p-10 shadow-glass border border-ink/10 bg-gradient-to-br from-[#FFFDF9] via-white to-[#F9F5EC] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Details */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-2xs"
                  style={{ backgroundColor: school.theme.primaryColor }}
                >
                  {selectedClass.badge}
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-soft bg-white px-3 py-1 rounded-full border border-ink/10 shadow-2xs">
                  <UserCheck className="h-3.5 w-3.5 text-leaf-deep" />
                  <span>Age: {selectedClass.ageGroup}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-soft bg-white px-3 py-1 rounded-full border border-ink/10 shadow-2xs">
                  <Clock className="h-3.5 w-3.5 text-amber-600" />
                  <span>{selectedClass.timings}</span>
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                {selectedClass.name}
              </h3>

              <p className="text-base text-ink-soft leading-relaxed">
                {selectedClass.description}
              </p>

              {/* Weekly Highlights */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink">
                  Key Activities &amp; Practical Routines:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedClass.activities.map((act, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs sm:text-sm font-medium text-ink bg-white/80 p-2.5 rounded-xl border border-ink/5"
                    >
                      <CheckCircle2 className="h-4 w-4 text-leaf-deep shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Focus Areas Pills */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-ink-soft">Core Growth:</span>
                {selectedClass.focusAreas.map((fa, i) => (
                  <span
                    key={i}
                    className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cream text-ink border border-ink/10"
                  >
                    {fa}
                  </span>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onSelectClass?.(selectedClass)}
                  className="px-6 py-3 rounded-full text-sm font-bold text-white shadow-md hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
                  style={{ backgroundColor: school.theme.primaryColor }}
                >
                  <span>Enquire for {selectedClass.name.split(' (')[0]}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Class Snapshot Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-white shadow-sm border border-ink/10 space-y-2">
                <div className="text-2xl font-display font-semibold text-ink">1:10</div>
                <div className="text-xs font-bold text-ink">Teacher Ratio</div>
                <p className="text-[11px] text-ink-soft">Close personalized attention for every child.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white shadow-sm border border-ink/10 space-y-2">
                <div className="text-2xl font-display font-semibold text-ink">100%</div>
                <div className="text-xs font-bold text-ink">Play-Based</div>
                <p className="text-[11px] text-ink-soft">Zero rote memorization; stress-free learning.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white shadow-sm border border-ink/10 space-y-2">
                <div className="text-2xl font-display font-semibold text-ink">Daily</div>
                <div className="text-xs font-bold text-ink">Outdoor Play</div>
                <p className="text-[11px] text-ink-soft">Fresh air, motor skills, and garden discovery.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white shadow-sm border border-ink/10 space-y-2">
                <div className="text-2xl font-display font-semibold text-ink">CCTV</div>
                <div className="text-xs font-bold text-ink">Campus Safety</div>
                <p className="text-[11px] text-ink-soft">Verified visitor access &amp; monitored spaces.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
