import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Heart,
  Palette,
  BookOpen,
  Music,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  Star,
} from 'lucide-react';
import { SCHOOLS } from '../../data/site';
import { SplitWords } from '../motion';
import { useEnquiry } from '../EnquiryContext';

export function SchoolStructure() {
  const { openEnquiry } = useEnquiry();
  const [activeTab, setActiveTab] = useState<'structure' | 'classes' | 'offerings' | 'contact'>('structure');

  const appletree = SCHOOLS['appletree-play-school'];
  const apple = SCHOOLS['apple-play-school'];

  const OFFERINGS = [
    {
      icon: Brain,
      title: 'Montessori & Experiential Play',
      desc: 'Hands-on sensory exploration that fosters curious inquiry and self-confidence rather than rote memorization.',
      color: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      icon: BookOpen,
      title: 'Phonics & Early Math Discovery',
      desc: 'Interactive sound association, vocabulary building, and playful counting through songs and tactile blocks.',
      color: 'text-leaf-deep bg-leaf-soft border-leaf/30',
    },
    {
      icon: Palette,
      title: 'Creative Arts & Messy Play',
      desc: 'Finger-painting, clay sculpturing, paper craft, and drama circles encouraging individual creative expression.',
      color: 'text-wm bg-wm-soft border-wm/30',
    },
    {
      icon: Music,
      title: 'Rhythm, Movement & Gross Motor',
      desc: 'Daily indoor and outdoor play, balance beams, tricycle paths, slides, and group dance routines.',
      color: 'text-blue-700 bg-blue-50 border-blue-200',
    },
    {
      icon: ShieldCheck,
      title: 'Child Safety & CCTV Monitoring',
      desc: 'Rounded furniture, foam safety flooring, sanitized learning spaces, and attentive caregiver vigilance.',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      icon: Heart,
      title: 'Low Ratio & Emotional Care',
      desc: 'Intimate 1:8 to 1:10 student-teacher ratio ensuring every toddler receives gentle maternal attention and encouragement.',
      color: 'text-rose-700 bg-rose-50 border-rose-200',
    },
  ];

  const CLASSES_DETAILED = [
    {
      id: 'playgroup',
      name: 'Playgroup',
      age: '1.5 – 2.5 Years',
      timing: '9:00 AM – 11:30 AM',
      focus: 'Separation transition, sensory play, rhymes, fine motor development, social sharing.',
      keyActivities: ['Sensory tubs & sand play', 'Nursery rhymes & musical movement', 'Color discovery & block stacking'],
      campus: 'Both Campuses',
      color: 'border-amber-300 bg-amber-50/50',
    },
    {
      id: 'nursery',
      name: 'Nursery',
      age: '2.5 – 3.5 Years',
      timing: '8:45 AM – 12:15 PM',
      focus: 'Expressive language, shape & color sorting, gross motor skills, listening comprehension, independence.',
      keyActivities: ['Story circles & picture books', 'Finger painting & clay modeling', 'Early phonemic awareness'],
      campus: 'Both Campuses',
      color: 'border-leaf/30 bg-leaf-soft/40',
    },
    {
      id: 'lkg',
      name: 'LKG (Lower Kindergarten)',
      age: '3.5 – 4.5 Years',
      timing: '8:30 AM – 12:45 PM',
      focus: 'Letter formation, pre-writing pencil grip, number concepts (1–50), environmental curiosity, teamwork.',
      keyActivities: ['Montessori math rods & bead counting', 'Sight words & phonetic reading', 'Science curiosity tables'],
      campus: 'Both Campuses',
      color: 'border-wm/30 bg-wm-soft/40',
    },
    {
      id: 'ukg',
      name: 'UKG (Upper Kindergarten)',
      age: '4.5 – 5.5 Years',
      timing: '8:30 AM – 1:15 PM',
      focus: 'Fluent reading, sentence construction, mental addition, logical sequencing, Grade 1 formal school readiness.',
      keyActivities: ['Creative story-telling & recitation', 'Math puzzles & logical reasoning', 'Confidence building & stage talk'],
      campus: 'Both Campuses',
      color: 'border-leaf-deep/30 bg-emerald-50/50',
    },
    {
      id: 'daycare',
      name: 'Day Care & Activity Club',
      age: '1.5 – 6 Years',
      timing: '11:30 AM – 5:30 PM (Flexible)',
      focus: 'Secure afternoon care, wholesome nutrition habits, nap routines, guided indoor play, homework assistance.',
      keyActivities: ['Nutritious snack time', 'Rest and nap area', 'Board games & free imaginative play'],
      campus: 'Available at Both Campuses',
      color: 'border-purple-200 bg-purple-50/50',
    },
  ];

  return (
    <section id="structure" className="relative overflow-hidden px-5 py-12 sm:px-8 sm:py-16 bg-cream-50/70 border-y border-ink/5">
      <div className="mx-auto max-w-[88rem]">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-leaf-deep mb-2">
              <Layers className="h-3.5 w-3.5 text-leaf" />
              <span>The School Tree &bull; Architecture &bull; Programs</span>
            </div>
            <h2 className="display-lg text-ink">
              <SplitWords text="How Our School Family Grows." /><br />
              <span className="text-leaf-deep">
                <SplitWords text="Roots, Trunk &amp; Blossoms." delay={0.2} />
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-ink-soft leading-relaxed">
              We started assuming to start branches across Nizamabad. With the <strong>Trunk as our Main Brain</strong> holding 13+ years of pedagogical excellence, our branches bring joyful early learning directly to your neighborhood.
            </p>
          </div>

          {/* Quick tab switcher */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-white shadow-xs border border-ink/10 self-start md:self-end">
            {[
              { id: 'structure', label: '🌳 Tree Structure' },
              { id: 'classes', label: '🎒 Classes We Have' },
              { id: 'offerings', label: '✨ What We Offer' },
              { id: 'contact', label: '📍 Contact & Info' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-ink text-cream shadow-2xs scale-102'
                    : 'text-ink-soft hover:text-ink hover:bg-cream'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: SCHOOL STRUCTURE (Roots -> Trunk (Brain) -> Branches) */}
        {/* ============================================================ */}
        {activeTab === 'structure' && (
          <div className="mt-10">
            <div className="grid gap-6 lg:grid-cols-3 items-stretch">
              
              {/* Level 1: Soil & Roots */}
              <div className="flex flex-col justify-between rounded-[2rem] bg-white p-6 sm:p-7 shadow-subtle border border-leaf/20 relative overflow-hidden group hover:shadow-glass transition">
                <div className="absolute top-0 right-0 h-28 w-28 bg-leaf-soft/50 rounded-bl-full pointer-events-none" />
                <div>
                  <span className="rounded-full bg-leaf-soft px-3 py-1 text-xs font-bold text-leaf-deep">
                    Phase 01 &bull; 13+ Years Ago
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold text-ink">
                    🌱 The Roots &amp; Soil
                  </h3>
                  <p className="mt-1 text-xs font-bold text-leaf-deep uppercase tracking-wider">
                    Foundation • Community Trust • Heritage
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-ink-soft leading-relaxed">
                    Planted over 13 years ago on Yellama Gutta Road, Nizamabad. Deep roots of parental trust, child-safety standards, verified 4.6★ reputation, and seasoned educators.
                  </p>

                  <div className="mt-5 space-y-2.5 pt-4 border-t border-ink/10 text-xs">
                    <div className="flex items-center gap-2 text-ink font-semibold">
                      <CheckCircle2 className="h-4 w-4 text-leaf" />
                      <span>Established First (13+ Years Experience)</span>
                    </div>
                    <div className="flex items-center gap-2 text-ink font-semibold">
                      <CheckCircle2 className="h-4 w-4 text-leaf" />
                      <span>Google Rating: 4.6★ (Verified Reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 text-ink font-semibold">
                      <CheckCircle2 className="h-4 w-4 text-leaf" />
                      <span>Generations of Happy Nizamabad Families</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-ink/5">
                  <span className="text-xs text-ink-soft">Location: 5-11-726, Yellama Gutta Road</span>
                </div>
              </div>

              {/* Level 2: The Trunk (The Main Brain) */}
              <div className="flex flex-col justify-between rounded-[2rem] bg-gradient-to-b from-amber-50/80 via-white to-amber-50/30 p-6 sm:p-7 shadow-glass border-2 border-amber-300/80 relative overflow-hidden group">
                <div className="absolute -top-6 -right-6 h-28 w-28 bg-amber-200/50 rounded-full blur-xl pointer-events-none" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <Brain className="h-3.5 w-3.5 text-amber-600" />
                      <span>The Central Engine</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-800">Core Brain</span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-bold text-ink">
                    🪵 Trunk: The Main Brain
                  </h3>
                  <p className="mt-1 text-xs font-bold text-amber-800 uppercase tracking-wider">
                    Pedagogy • Teacher Training • Safety Standards
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-ink-soft leading-relaxed">
                    The trunk is the <strong>central brain</strong> of the whole school system. It maintains the unified Montessori and play-based curriculum, conducts teacher training, ensures safety compliance, and directs growth into branches.
                  </p>

                  <div className="mt-5 space-y-2.5 pt-4 border-t border-amber-200/60 text-xs">
                    <div className="flex items-center gap-2 text-ink font-semibold">
                      <Brain className="h-4 w-4 text-amber-600" />
                      <span>Single Academic Curriculum for all branches</span>
                    </div>
                    <div className="flex items-center gap-2 text-ink font-semibold">
                      <CheckCircle2 className="h-4 w-4 text-amber-600" />
                      <span>Continuous Educator Audits &amp; Low 1:8 Ratio</span>
                    </div>
                    <div className="flex items-center gap-2 text-ink font-semibold">
                      <CheckCircle2 className="h-4 w-4 text-amber-600" />
                      <span>Centralized Health, Hygiene &amp; CCTV Vigilance</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-amber-200/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-900">Powers Both Campuses</span>
                  <Link
                    to="/schools/appletree-play-school"
                    className="inline-flex items-center gap-1 text-xs font-bold text-ink hover:text-leaf-deep"
                  >
                    <span>Root Campus Info</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Level 3: Spreading Branches (The Campuses) */}
              <div className="flex flex-col justify-between rounded-[2rem] bg-white p-6 sm:p-7 shadow-subtle border border-wm/20 relative overflow-hidden group hover:shadow-glass transition">
                <div className="absolute top-0 right-0 h-28 w-28 bg-wm-soft/50 rounded-bl-full pointer-events-none" />
                <div>
                  <span className="rounded-full bg-wm-soft px-3 py-1 text-xs font-bold text-wm flex items-center gap-1.5 w-max">
                    <Sparkles className="h-3.5 w-3.5 text-wm" />
                    <span>Expansion Across Nizamabad</span>
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-bold text-ink">
                    🍎 The Glowing Branches
                  </h3>
                  <p className="mt-1 text-xs font-bold text-wm uppercase tracking-wider">
                    Started Assuming to Start Branches
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-ink-soft leading-relaxed">
                    From the foundational tree blossomed <strong>Apple Play School at Gangasthan</strong> — carrying the exact same 13-year heritage and loving pedagogy, bringing excellence to another neighborhood.
                  </p>

                  <div className="mt-5 space-y-2.5 pt-4 border-t border-ink/10 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-leaf-soft/50 border border-leaf/20">
                      <div>
                        <span className="font-bold text-leaf-deep block">🌳 Appletree Play School</span>
                        <span className="text-[11px] text-ink-soft">Yellama Gutta Road Campus</span>
                      </div>
                      <Link to="/schools/appletree-play-school" className="text-leaf-deep font-bold text-[11px] hover:underline">
                        Explore &rarr;
                      </Link>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-wm-soft/50 border border-wm/20">
                      <div>
                        <span className="font-bold text-wm block">🍎 Apple Play School</span>
                        <span className="text-[11px] text-ink-soft">Gangasthan Campus (The Glowing Apple)</span>
                      </div>
                      <Link to="/schools/apple-play-school" className="text-wm font-bold text-[11px] hover:underline">
                        Explore &rarr;
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-ink/5">
                  <span className="text-xs text-ink-soft">Future branches will sprout with the same brain</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: CLASSES WE HAVE (Playgroup, Nursery, LKG, UKG, Daycare) */}
        {/* ============================================================ */}
        {activeTab === 'classes' && (
          <div className="mt-10">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {CLASSES_DETAILED.map((cls) => (
                <div
                  key={cls.id}
                  className={`rounded-[2rem] p-6 border shadow-xs flex flex-col justify-between transition-transform hover:-translate-y-1 ${cls.color}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ink shadow-2xs border border-ink/5">
                        {cls.age}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-ink-soft">
                        <Clock className="h-3 w-3 text-leaf-deep" />
                        {cls.timing}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-2xl font-bold text-ink">
                      {cls.name}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-ink-soft leading-relaxed">
                      {cls.focus}
                    </p>

                    <div className="mt-4 pt-3 border-t border-ink/10">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-ink block mb-2">
                        Core Activities:
                      </span>
                      <ul className="space-y-1.5 text-xs text-ink-soft">
                        {cls.keyActivities.map((act, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-leaf-deep font-bold">&bull;</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-ink/10 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-leaf-deep">{cls.campus}</span>
                    <button
                      onClick={() => openEnquiry()}
                      className="text-xs font-bold text-ink hover:text-wm flex items-center gap-1"
                    >
                      <span>Enquire</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: WHAT WE ARE OFFERING */}
        {/* ============================================================ */}
        {activeTab === 'offerings' && (
          <div className="mt-10">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {OFFERINGS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-[2rem] bg-white p-6 shadow-subtle border border-ink/10 hover:shadow-glass transition"
                  >
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border ${item.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-ink-soft leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: CONTACT, LOCATIONS & OTHER INFO */}
        {/* ============================================================ */}
        {activeTab === 'contact' && (
          <div className="mt-10">
            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Campus 1: Appletree */}
              <div className="rounded-[2rem] bg-white p-6 sm:p-7 shadow-subtle border border-leaf/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-leaf-soft px-3 py-1 text-xs font-bold text-leaf-deep">
                      {appletree.historyBadge}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      4.6★ (5 Reviews)
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-2xl font-bold text-ink">
                    {appletree.name}
                  </h3>
                  <p className="mt-1 text-xs font-bold text-leaf-deep">
                    The Foundational Root Campus • 13+ Years
                  </p>

                  <div className="mt-5 space-y-3 text-xs sm:text-sm text-ink-soft">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="h-4 w-4 text-leaf-deep shrink-0 mt-0.5" />
                      <span>{appletree.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="h-4 w-4 text-leaf-deep shrink-0" />
                      <span>School Hours: 8:30 AM – 1:30 PM | Day Care till 5:30 PM</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Calendar className="h-4 w-4 text-leaf-deep shrink-0" />
                      <span>Admissions Open: Playgroup, Nursery, LKG, UKG</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-ink/10 flex flex-wrap items-center gap-3">
                  <a
                    href={appletree.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-leaf-soft text-leaf-deep hover:bg-leaf/30 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Get Directions</span>
                  </a>
                  <Link
                    to="/schools/appletree-play-school"
                    className="px-4 py-2 rounded-full bg-ink text-cream hover:bg-leaf-deep text-xs font-bold transition"
                  >
                    View Campus Page
                  </Link>
                </div>
              </div>

              {/* Campus 2: Apple Play School */}
              <div className="rounded-[2rem] bg-white p-6 sm:p-7 shadow-subtle border border-wm/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-wm-soft px-3 py-1 text-xs font-bold text-wm">
                      {apple.historyBadge}
                    </span>
                    <span className="text-xs font-bold text-wm-dark">
                      Plus Code: M4V9+2GM
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-2xl font-bold text-ink">
                    {apple.name}
                  </h3>
                  <p className="mt-1 text-xs font-bold text-wm">
                    The Blossomed Sister Campus • Gangasthan
                  </p>

                  <div className="mt-5 space-y-3 text-xs sm:text-sm text-ink-soft">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="h-4 w-4 text-wm shrink-0 mt-0.5" />
                      <span>{apple.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="h-4 w-4 text-wm shrink-0" />
                      <span>School Hours: 8:30 AM – 1:30 PM | Day Care till 5:30 PM</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Calendar className="h-4 w-4 text-wm shrink-0" />
                      <span>Admissions Open: Playgroup, Nursery, LKG, UKG</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-ink/10 flex flex-wrap items-center gap-3">
                  <a
                    href={apple.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-wm-soft text-wm hover:bg-wm/20 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Get Directions</span>
                  </a>
                  <Link
                    to="/schools/apple-play-school"
                    className="px-4 py-2 rounded-full bg-ink text-cream hover:bg-wm text-xs font-bold transition"
                  >
                    View Campus Page
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
