import { CheckCircle2, Sparkles, Building2 } from 'lucide-react';
import type { SchoolSiteData } from '../../data/schoolsData';

interface SchoolAboutProps {
  school: SchoolSiteData;
  onOpenEnquiry?: () => void;
}

export function SchoolAbout({ school, onOpenEnquiry }: SchoolAboutProps) {
  return (
    <section id="about" className="py-16 sm:py-24 px-5 sm:px-8 bg-white text-left">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* About Campus Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-leaf-deep px-3 py-1 rounded-full bg-leaf/10">
              <Sparkles className="h-3.5 w-3.5" />
              <span>About Our Campus</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
              {school.aboutStory.headline}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-ink-soft leading-relaxed">
              {school.aboutStory.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="space-y-2 pt-2">
              {school.aboutStory.keyPoints.map((kp, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink font-medium">
                  <CheckCircle2 className="h-4 w-4 text-leaf-deep shrink-0 mt-0.5" />
                  <span>{kp}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#FFFDF9] via-white to-cream shadow-glass border border-ink/10 space-y-4">
            <div className="flex items-center gap-3 border-b border-ink/10 pb-4">
              <img src={school.logo} alt={school.name} className="h-12 w-auto object-contain" />
              <div>
                <h4 className="font-display font-bold text-base text-ink">{school.name}</h4>
                <p className="text-xs text-ink-soft">{school.branchName}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-ink-soft">
              <div className="flex justify-between py-1 border-b border-ink/5">
                <span className="font-medium">Founding Legacy:</span>
                <span className="font-bold text-ink">{school.establishedYear || '13+ Years'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-ink/5">
                <span className="font-medium">Curriculum:</span>
                <span className="font-bold text-ink">Montessori Play-Way</span>
              </div>
              <div className="flex justify-between py-1 border-b border-ink/5">
                <span className="font-medium">Admissions:</span>
                <span className="font-bold text-leaf-deep">Ages 1.5 to 5.5 Years</span>
              </div>
              <div className="flex justify-between py-1 border-b border-ink/5">
                <span className="font-medium">Location:</span>
                <span className="font-bold text-ink truncate max-w-[200px]">{school.contact.area}</span>
              </div>
            </div>

            <button
              onClick={onOpenEnquiry}
              className="w-full mt-2 py-3 rounded-full text-xs font-bold text-white shadow-sm hover:opacity-95 transition-all"
              style={{ backgroundColor: school.theme.primaryColor }}
            >
              Book a Guided Campus Tour
            </button>
          </div>
        </div>

        {/* Facilities Section */}
        <div id="facilities" className="pt-8 border-t border-ink/10">
          <div className="max-w-2xl space-y-2 mb-10">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
              Campus Facilities &amp; Safe Spaces
            </h3>
            <p className="text-sm text-ink-soft">
              Every square foot is tailored for tiny toddlers: rounded safety corners, sanitized play turf, and interactive curiosity nooks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {school.facilities.map((fac, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#FAF6EE] border border-ink/10 space-y-3 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="h-10 w-10 rounded-xl bg-white shadow-xs flex items-center justify-center text-leaf-deep">
                  <Building2 className="h-5 w-5" />
                </div>
                <h4 className="font-display font-bold text-base text-ink">{fac.name}</h4>
                <p className="text-xs text-ink-soft leading-relaxed">{fac.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
