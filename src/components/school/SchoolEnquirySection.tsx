import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import type { SchoolSiteData } from '../../data/schoolsData';

interface SchoolEnquirySectionProps {
  school: SchoolSiteData;
}

export function SchoolEnquirySection({ school }: SchoolEnquirySectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    childAge: '2 – 3',
    program: 'nursery',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-5 sm:px-8 bg-white text-left">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Campus Information & Map */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span
                className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white inline-block shadow-2xs"
                style={{ backgroundColor: school.theme.primaryColor }}
              >
                {school.branchName} Admissions
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
                Visit {school.shortName}
              </h2>
              <p className="text-sm sm:text-base text-ink-soft">
                Schedule a personal campus walkthrough. Experience our playrooms, meet our teachers, and explore how our 13-year heritage nurtures your child.
              </p>
            </div>

            <div className="space-y-3.5 rounded-3xl p-6 bg-[#FAF6EE] border border-ink/10 text-xs sm:text-sm text-ink">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-ink block">Campus Address:</span>
                  <span className="text-ink-soft">{school.contact.address}</span>
                  <span className="block text-[11px] text-ink-soft/75 mt-0.5">({school.contact.landmark})</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-leaf-deep shrink-0" />
                <div>
                  <span className="font-bold text-ink block">Direct Helpline:</span>
                  <a href={`tel:${school.contact.phone}`} className="text-leaf-deep font-semibold hover:underline">
                    {school.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-wm shrink-0" />
                <div>
                  <span className="font-bold text-ink block">Admissions Email:</span>
                  <a href={`mailto:${school.contact.email}`} className="text-ink-soft hover:underline">
                    {school.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-ink-soft shrink-0" />
                <div>
                  <span className="font-bold text-ink block">Visiting Hours:</span>
                  <span className="text-ink-soft">Monday to Saturday: 8:30 AM – 4:00 PM</span>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-3xl overflow-hidden shadow-sm border border-ink/10 aspect-video bg-cream">
              <iframe
                title={`${school.name} Google Map Location`}
                src={school.contact.embedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Isolated Enquiry Form */}
          <div className="lg:col-span-7 rounded-3xl p-7 sm:p-10 bg-gradient-to-br from-[#FFFDF9] via-white to-cream/40 shadow-xl border border-ink/10">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-leaf-soft text-leaf-deep flex items-center justify-center">
                  <CheckCircle2 className="h-10 w-10 text-leaf-deep" />
                </div>
                <h3 className="font-display font-bold text-2xl text-ink">
                  Enquiry Submitted Successfully!
                </h3>
                <p className="text-sm text-ink-soft max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to <strong>{school.name}</strong>. Our admissions coordinator will call you shortly at <strong>{formData.phone}</strong> to schedule your campus visit.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: school.theme.primaryColor }}
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-ink/10 pb-4">
                  <h3 className="font-display font-bold text-2xl text-ink">
                    Apply for Admissions ({school.shortName})
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-soft mt-1">
                    Fill out this form and our academic team will get in touch with fee structures and seat availability.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-ink">Parent's Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Reddy"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-ink/15 text-sm focus:outline-none focus:border-leaf-deep bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-ink">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98490 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-ink/15 text-sm focus:outline-none focus:border-leaf-deep bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-ink">Child's Current Age *</label>
                    <select
                      value={formData.childAge}
                      onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-ink/15 text-sm focus:outline-none focus:border-leaf-deep bg-white"
                    >
                      <option value="Under 2">Under 2 Years</option>
                      <option value="2 – 3">2 – 3 Years</option>
                      <option value="3 – 4">3 – 4 Years</option>
                      <option value="4 – 5">4 – 5 Years</option>
                      <option value="5+">5+ Years</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-ink">Interested Class *</label>
                    <select
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-ink/15 text-sm focus:outline-none focus:border-leaf-deep bg-white"
                    >
                      <option value="playgroup">Playgroup (1.5 - 2.5 yrs)</option>
                      <option value="nursery">Nursery (2.5 - 3.5 yrs)</option>
                      <option value="lkg">LKG (3.5 - 4.5 yrs)</option>
                      <option value="ukg">UKG (4.5 - 5.5 yrs)</option>
                      <option value="daycare">Extended Daycare</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-ink">Questions or Special Requests (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your child's interests, previous schooling, or queries..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-ink/15 text-sm focus:outline-none focus:border-leaf-deep bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full font-display text-base font-bold text-white shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  style={{ backgroundColor: school.theme.primaryColor }}
                >
                  {loading ? (
                    <span>Submitting Enquiry...</span>
                  ) : (
                    <>
                      <span>Submit Admissions Enquiry for {school.shortName}</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
