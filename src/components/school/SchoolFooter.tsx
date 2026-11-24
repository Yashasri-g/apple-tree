import { Link, useNavigate } from 'react-router-dom';
import { TreePine, Phone, Mail, MapPin } from 'lucide-react';
import type { SchoolSiteData } from '../../data/schoolsData';

interface SchoolFooterProps {
  school: SchoolSiteData;
  onNavigateSection?: (sectionId: string) => void;
  onOpenEnquiry?: () => void;
}

export function SchoolFooter({ school, onNavigateSection, onOpenEnquiry }: SchoolFooterProps) {
  const navigate = useNavigate();

  return (
    <footer className="relative bg-ink text-cream pt-16 pb-12 px-5 sm:px-8 overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full blur-[140px] opacity-20"
        style={{ backgroundColor: school.theme.accentColor }}
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Logo */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-14 sm:h-16 w-auto p-2 rounded-2xl bg-white shadow-md flex items-center justify-center">
                <img
                  src={school.logo}
                  alt={school.name}
                  className="h-full w-auto object-contain max-h-12 sm:max-h-14"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">{school.name}</h3>
                <p className="text-xs text-cream/70">{school.branchName}</p>
              </div>
            </div>

            <p className="text-sm text-cream/80 max-w-sm leading-relaxed">
              {school.tagline}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all"
              >
                <TreePine className="h-3.5 w-3.5 text-leaf" />
                <span>Return to Campus Tree</span>
              </button>
              {school.rating && (
                <span className="text-xs font-medium text-amber-300">
                  ★ {school.rating.score} on {school.rating.source}
                </span>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">
              {school.shortName} Sections
            </h4>
            <ul className="space-y-2 text-sm text-cream/75">
              <li>
                <button
                  onClick={() => onNavigateSection?.('home')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection?.('what-classes')}
                  className="hover:text-white transition cursor-pointer"
                >
                  What Classes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection?.('type-of-education')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Type of Education
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection?.('staff')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Staff &amp; Educators
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection?.('about')}
                  className="hover:text-white transition cursor-pointer"
                >
                  About This Campus
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection?.('gallery')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Photo Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Location */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-white">
              Campus Location
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-cream/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{school.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-leaf shrink-0" />
                <a href={`tel:${school.contact.phone}`} className="hover:text-white transition">
                  {school.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-wm shrink-0" />
                <a href={`mailto:${school.contact.email}`} className="hover:text-white transition">
                  {school.contact.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenEnquiry}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold text-white shadow-sm transition hover:opacity-90"
                style={{ backgroundColor: school.theme.primaryColor }}
              >
                Apply for Admission &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/50">
          <p>
            &copy; {new Date().getFullYear()} {school.name}. All rights reserved. Backed by 13+ years early education experience.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-cream transition flex items-center gap-1">
              <TreePine className="h-3.5 w-3.5" />
              <span>Campus Tree Gateway</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
