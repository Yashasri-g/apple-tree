import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Sparkles, ShieldCheck, Heart, Send, CheckCircle2, ArrowLeft } from 'lucide-react';
import type { SchoolSiteData } from '../../data/schoolsData';

interface BranchComingSoonPageProps {
  school: SchoolSiteData;
}

export function BranchComingSoonPage({ school }: BranchComingSoonPageProps) {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    childAge: '2 – 3',
    locationNotes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-white text-ink flex flex-col justify-between">
      {/* Sticky Header with Logo & Menu */}
      <header className="sticky top-0 z-50 w-full px-3 sm:px-6 pt-3 pb-2 backdrop-blur-xl bg-white/80 border-b border-ink/5">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <img
                src={school.logo}
                alt={`${school.name} Logo`}
                className="h-11 sm:h-12 w-auto object-contain"
              />
              <div className="text-left">
                <h1 className="font-display font-semibold text-sm sm:text-base text-ink leading-tight">
                  {school.name}
                </h1>
                <span className="text-[11px] font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full inline-block">
                  Coming Soon Page
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const el = document.getElementById('pre-register');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-full text-xs sm:text-sm font-bold text-white shadow-sm hover:opacity-90 transition-all cursor-pointer"
              style={{ backgroundColor: school.theme.primaryColor }}
            >
              Pre-Register Now
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12 sm:py-20 px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center space-y-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm"
            style={{ backgroundColor: school.theme.primaryColor }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Expanding Across Telangana &bull; {school.branchName}</span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-ink tracking-tight">
              {school.heroHeadline}
            </h2>
            <p className="text-base sm:text-xl text-ink-soft max-w-2xl mx-auto leading-relaxed">
              {school.heroSubheadline}
            </p>
          </div>

          {/* Location & Heritage Note */}
          <div className="p-6 rounded-3xl bg-white shadow-glass border border-ink/10 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                Planned Location
              </span>
              <div className="flex items-center gap-1.5 font-bold text-sm text-ink">
                <MapPin className="h-4 w-4 text-leaf-deep shrink-0" />
                <span>{school.contact.address}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                <Clock className="h-3.5 w-3.5" />
                <span>Opening for 2026-27</span>
              </span>
            </div>
          </div>

          {/* Pre-Registration / Early Inquiry Form */}
          <div
            id="pre-register"
            className="rounded-3xl p-7 sm:p-10 bg-white shadow-xl border border-ink/10 text-left max-w-2xl mx-auto"
          >
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="h-14 w-14 mx-auto rounded-full bg-leaf-soft text-leaf-deep flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-leaf-deep" />
                </div>
                <h3 className="font-display font-bold text-2xl text-ink">
                  Pre-Registration Received!
                </h3>
                <p className="text-sm text-ink-soft max-w-md mx-auto">
                  Thank you! We have reserved early bird admissions priority for <strong>{school.name}</strong>. Our admissions counselor will contact you at <strong>{formData.phone}</strong> as soon as campus visits open.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigate('/')}
                    className="px-6 py-2.5 rounded-full text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: school.theme.primaryColor }}
                  >
                    Return to Campus Tree
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-ink/10 pb-3">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-ink">
                    Pre-Register for {school.branchName}
                  </h3>
                  <p className="text-xs text-ink-soft mt-1">
                    Be the first to receive fee concession announcements, campus walkthrough dates, and admission updates.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-ink">Parent's Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Sharma"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-ink/15 text-sm focus:outline-none focus:border-leaf-deep bg-cream/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-ink">WhatsApp / Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98490 56789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-ink/15 text-sm focus:outline-none focus:border-leaf-deep bg-cream/30"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-ink">Child's Age Group *</label>
                  <select
                    value={formData.childAge}
                    onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-ink/15 text-sm focus:outline-none focus:border-leaf-deep bg-cream/30"
                  >
                    <option value="1.5 – 2.5 (Playgroup)">1.5 – 2.5 Years (Playgroup)</option>
                    <option value="2.5 – 3.5 (Nursery)">2.5 – 3.5 Years (Nursery)</option>
                    <option value="3.5 – 4.5 (LKG)">3.5 – 4.5 Years (LKG)</option>
                    <option value="4.5 – 5.5 (UKG)">4.5 – 5.5 Years (UKG)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-ink">Locality / Landmark in {school.contact.city}</label>
                  <input
                    type="text"
                    placeholder="e.g. Near Bus Stand, Main Road"
                    value={formData.locationNotes}
                    onChange={(e) => setFormData({ ...formData, locationNotes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-ink/15 text-sm focus:outline-none focus:border-leaf-deep bg-cream/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full font-display font-bold text-sm text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  style={{ backgroundColor: school.theme.primaryColor }}
                >
                  {loading ? (
                    <span>Registering...</span>
                  ) : (
                    <>
                      <span>Reserve Early Admission Priority</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Planned Standards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left max-w-3xl mx-auto pt-6">
            <div className="p-5 rounded-2xl bg-white border border-ink/10 space-y-2">
              <ShieldCheck className="h-6 w-6 text-leaf-deep" />
              <h4 className="font-display font-bold text-sm text-ink">13-Year Central Syllabus</h4>
              <p className="text-xs text-ink-soft">
                Same trusted Montessori play-way pedagogy proven over 13+ years.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-ink/10 space-y-2">
              <Heart className="h-6 w-6 text-wm" />
              <h4 className="font-display font-bold text-sm text-ink">Trained Female Caregivers</h4>
              <p className="text-xs text-ink-soft">
                Continuous teacher training and pediatric first-aid certification.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-ink/10 space-y-2">
              <Sparkles className="h-6 w-6 text-amber-500" />
              <h4 className="font-display font-bold text-sm text-ink">Safe Child-Proof Campus</h4>
              <p className="text-xs text-ink-soft">
                24/7 CCTV, air-cooled classrooms, rubberized play turf, and purified water.
              </p>
            </div>
          </div>

          {/* Quick Return to Tree */}
          <div className="pt-8">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-leaf-deep hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Explore Active Campuses on the Tree</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-5 border-t border-ink/10 text-center text-xs text-ink-soft bg-white/70">
        <p>&copy; {new Date().getFullYear()} {school.name}. Part of AppleTree &amp; Apple School Educational Network.</p>
      </footer>
    </div>
  );
}
