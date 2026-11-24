import { Users, Award, GraduationCap, CheckCircle2 } from 'lucide-react';
import type { SchoolSiteData } from '../../data/schoolsData';

interface SchoolStaffProps {
  school: SchoolSiteData;
  onOpenEnquiry?: () => void;
}

export function SchoolStaff({ school }: SchoolStaffProps) {
  return (
    <section id="staff" className="py-16 sm:py-24 px-5 sm:px-8 bg-white text-left">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="max-w-2xl space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-leaf-deep px-3 py-1 rounded-full bg-leaf/10">
            <Users className="h-3.5 w-3.5" />
            <span>Dedicated Faculty &amp; Caregivers</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-ink tracking-tight">
            Our Staff &amp; Educators at {school.shortName}
          </h2>
          <p className="text-base sm:text-lg text-ink-soft">
            Experienced, patient, and motherly educators who are certified in early childhood pedagogy, phonics, and pediatric safety.
          </p>
        </div>

        {/* Staff Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {school.staff.map((member, i) => (
            <div
              key={i}
              className="rounded-3xl p-6 bg-gradient-to-b from-[#FFFDF9] via-white to-cream/40 shadow-sm border border-ink/10 flex flex-col justify-between space-y-4 hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="space-y-3">
                {/* Avatar Placeholder / Photo */}
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cream via-white to-amber-100 p-1 shadow-sm border border-ink/10 flex items-center justify-center text-xl font-bold font-display text-ink">
                  {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-ink leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold text-leaf-deep mt-0.5">{member.role}</p>
                </div>

                <div className="space-y-1.5 text-xs text-ink-soft pt-1 border-t border-ink/5">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-ink">
                    <Award className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    <span>{member.experience}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-ink-soft">
                    <GraduationCap className="h-3.5 w-3.5 text-leaf-deep shrink-0" />
                    <span className="truncate">{member.qualification}</span>
                  </div>
                </div>

                <p className="text-xs text-ink-soft leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-leaf-deep">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Certified Early Educator</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Staff Training & Care Standard Highlight */}
        <div className="mt-12 rounded-3xl p-6 sm:p-8 bg-[#FAF6EE] border border-ink/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-xs shrink-0 text-leaf-deep font-bold">
              1:10
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-ink">Low Teacher-Child Ratio</h4>
              <p className="text-xs text-ink-soft mt-0.5">
                Each classroom has a dedicated lead educator and an attentive female assistant.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-xs shrink-0 text-amber-600 font-bold">
              100%
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-ink">Police &amp; Background Verified</h4>
              <p className="text-xs text-ink-soft mt-0.5">
                Every teacher, nanny, and security staff is rigorously verified before joining our school.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-xs shrink-0 text-wm font-bold">
              CPD
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-ink">Monthly Pediatric Training</h4>
              <p className="text-xs text-ink-soft mt-0.5">
                Continuous training in child psychology, speech milestone detection, and pediatric first aid.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
