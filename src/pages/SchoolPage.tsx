import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SCHOOLS_DATA, type SchoolBranchId, type SchoolSiteData } from '../data/schoolsData';
import { SchoolNav } from '../components/school/SchoolNav';
import { SchoolHero } from '../components/school/SchoolHero';
import { WhatClasses } from '../components/school/WhatClasses';
import { TypeOfEducation } from '../components/school/TypeOfEducation';
import { SchoolStaff } from '../components/school/SchoolStaff';
import { SchoolAbout } from '../components/school/SchoolAbout';
import { SchoolGallery } from '../components/school/SchoolGallery';
import { SchoolEnquirySection } from '../components/school/SchoolEnquirySection';
import { SchoolFooter } from '../components/school/SchoolFooter';
import { BranchComingSoonPage } from '../components/school/BranchComingSoonPage';
import { useEnquiry } from '../components/EnquiryContext';
import { useSeo } from '../lib/seo';

export function SchoolPage() {
  const { slug } = useParams<{ slug: string }>();
  const { openEnquiry } = useEnquiry();
  const [activeSection, setActiveSection] = useState('home');

  // Resolve school data from slug (direct ID match or alias match)
  const school: SchoolSiteData | undefined = (() => {
    if (!slug) return undefined;
    if (slug in SCHOOLS_DATA) {
      return SCHOOLS_DATA[slug as SchoolBranchId];
    }
    // Search aliases
    return Object.values(SCHOOLS_DATA).find((s) => s.aliases.includes(slug));
  })();

  useSeo(
    school
      ? `${school.name} | ${school.contact.city}, Telangana`
      : 'School | AppleTree & Apple School',
    school
      ? `${school.name} (${school.branchName}): ${school.heroSubheadline}`
      : 'Early childhood education backed by 13+ years experience.'
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  // Track active section via scroll
  useEffect(() => {
    if (!school || school.status === 'coming-soon') return;

    const sections = ['home', 'what-classes', 'type-of-education', 'staff', 'about', 'facilities', 'gallery', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [school]);

  if (!school) {
    return <Navigate to="/" replace />;
  }

  // If this branch is Coming Soon, render its dedicated coming soon site
  if (school.status === 'coming-soon') {
    return <BranchComingSoonPage school={school} />;
  }

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleOpenEnquiry = () => {
    // Map school branch ID to enquiry context ID if needed, or open modal
    const enquiryCampus = school.id === 'appletree-school' ? 'appletree-play-school' : 'apple-play-school';
    openEnquiry(enquiryCampus);
  };

  return (
    <div className="min-h-screen bg-white text-ink flex flex-col justify-between selection:bg-leaf/20 selection:text-ink">
      {/* 1. School Header (Respective Logo & Exact Menu Items) */}
      <SchoolNav
        school={school}
        activeSection={activeSection}
        onNavigateSection={scrollToSection}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* 2. Isolated Site Sections */}
      <main className="flex-1">
        {/* Home / Hero */}
        <SchoolHero
          school={school}
          onOpenEnquiry={handleOpenEnquiry}
          onExploreClasses={() => scrollToSection('what-classes')}
        />

        {/* What Classes */}
        <WhatClasses
          school={school}
          onSelectClass={() => handleOpenEnquiry()}
        />

        {/* Type of Education */}
        <TypeOfEducation school={school} />

        {/* Staff & Faculty */}
        <SchoolStaff
          school={school}
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* About & Facilities */}
        <SchoolAbout
          school={school}
          onOpenEnquiry={handleOpenEnquiry}
        />

        {/* Photo Gallery */}
        <SchoolGallery school={school} />

        {/* Admissions & Contact with Map */}
        <SchoolEnquirySection school={school} />
      </main>

      {/* 3. School Footer (Respective Logo & Info) */}
      <SchoolFooter
        school={school}
        onNavigateSection={scrollToSection}
        onOpenEnquiry={handleOpenEnquiry}
      />

    </div>
  );
}
