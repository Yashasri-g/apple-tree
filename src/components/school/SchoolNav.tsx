import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, TreePine, MapPin } from 'lucide-react';
import type { SchoolSiteData } from '../../data/schoolsData';

interface SchoolNavProps {
  school: SchoolSiteData;
  activeSection?: string;
  onNavigateSection: (sectionId: string) => void;
  onOpenEnquiry: () => void;
}

export function SchoolNav({
  school,
  activeSection = 'home',
  onNavigateSection,
  onOpenEnquiry,
}: SchoolNavProps) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'what-classes', label: 'What Classes' },
    { id: 'type-of-education', label: 'Type of Education' },
    { id: 'staff', label: 'Staff' },
  ];

  const subPages = [
    { id: 'about', label: 'About School' },
    { id: 'gallery', label: 'Photo Gallery' },
    { id: 'facilities', label: 'Campus Facilities' },
    { id: 'contact', label: 'Contact & Admissions' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    setPagesDropdownOpen(false);
    onNavigateSection(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 px-3 sm:px-6 pt-2.5 sm:pt-4 ${
          scrolled ? 'pt-1.5 sm:pt-2' : ''
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <nav
            aria-label={`${school.name} Navigation`}
            className={`flex w-full items-center justify-between rounded-2xl sm:rounded-full py-2.5 px-3.5 sm:px-6 transition-all duration-300 backdrop-blur-xl border ${
              scrolled
                ? 'bg-white/95 shadow-sm border-ink/10 py-2'
                : 'bg-white/80 border-ink/5'
            }`}
          >
            {/* Left: School Logo (Clearly visible, large size) */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleLinkClick('home')}
                className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
                aria-label={`${school.name} Home`}
              >
                <img
                  src={school.logo}
                  alt={`${school.name} Logo`}
                  className="h-11 sm:h-12 w-auto object-contain"
                />
                <div className="flex flex-col">
                  <span className="font-display font-semibold text-sm sm:text-base text-ink leading-tight group-hover:text-leaf-deep transition-colors">
                    {school.name}
                  </span>
                  <span className="text-[11px] font-medium text-ink-soft flex items-center gap-1">
                    <MapPin className="h-2.5 w-2.5" />
                    {school.contact.area}
                  </span>
                </div>
              </button>
            </div>

            {/* Desktop Navigation Menu Items (Exact requested list) */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    activeSection === item.id
                      ? 'text-white shadow-xs'
                      : 'text-ink-soft hover:text-ink hover:bg-black/5'
                  }`}
                  style={{
                    backgroundColor: activeSection === item.id ? school.theme.primaryColor : undefined,
                  }}
                >
                  {item.label}
                </button>
              ))}

              {/* "pages" Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
                  onBlur={() => setTimeout(() => setPagesDropdownOpen(false), 200)}
                  className={`flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    pagesDropdownOpen || ['about', 'gallery', 'facilities', 'contact'].includes(activeSection)
                      ? 'text-ink bg-black/5'
                      : 'text-ink-soft hover:text-ink hover:bg-black/5'
                  }`}
                >
                  <span>Pages</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      pagesDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {pagesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-white/95 backdrop-blur-xl shadow-xl border border-ink/10 p-2 z-50 text-left"
                    >
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-soft border-b border-ink/5">
                        {school.shortName} Sections
                      </div>
                      {subPages.map((sp) => (
                        <button
                          key={sp.id}
                          onClick={() => handleLinkClick(sp.id)}
                          className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-ink hover:bg-black/5 hover:text-leaf-deep transition-colors flex items-center justify-between"
                        >
                          <span>{sp.label}</span>
                        </button>
                      ))}
                      <div className="my-1 border-t border-ink/10" />
                      <button
                        onClick={() => navigate('/')}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-leaf-deep hover:bg-leaf/10 transition-colors flex items-center gap-1.5"
                      >
                        <TreePine className="h-3.5 w-3.5" />
                        <span>Return to Campus Tree</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Action: Enquire Now & Call */}
            <div className="flex items-center gap-2">
              <a
                href={`tel:${school.contact.phone}`}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-ink-soft hover:text-ink border border-ink/10 hover:border-ink/20 transition-all"
                title={`Call ${school.name}`}
              >
                <Phone className="h-3.5 w-3.5 text-leaf-deep" />
                <span>Call Us</span>
              </a>

              <button
                onClick={onOpenEnquiry}
                className="px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold text-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                style={{ backgroundColor: school.theme.primaryColor }}
              >
                Enquire Now
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full bg-black/5 hover:bg-black/10 text-ink focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between border-b border-ink/10 pb-4 mb-6">
                  <div className="flex items-center gap-2.5">
                    <img src={school.logo} alt={school.name} className="h-10 w-auto object-contain" />
                    <div>
                      <div className="font-display font-bold text-sm text-ink">{school.name}</div>
                      <div className="text-[11px] text-ink-soft">{school.branchName}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-full bg-black/5 text-ink"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-ink-soft px-3 py-1">
                    Menu Items
                  </div>
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleLinkClick(item.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-semibold transition-all ${
                        activeSection === item.id
                          ? 'text-white'
                          : 'text-ink hover:bg-black/5'
                      }`}
                      style={{
                        backgroundColor: activeSection === item.id ? school.theme.primaryColor : undefined,
                      }}
                    >
                      {item.label}
                    </button>
                  ))}

                  <div className="text-[10px] font-bold uppercase tracking-wider text-ink-soft px-3 pt-4 pb-1">
                    Pages &amp; Details
                  </div>
                  {subPages.map((sp) => (
                    <button
                      key={sp.id}
                      onClick={() => handleLinkClick(sp.id)}
                      className="w-full text-left px-4 py-2 rounded-xl text-sm font-medium text-ink-soft hover:text-ink hover:bg-black/5"
                    >
                      {sp.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-ink/10 space-y-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnquiry();
                  }}
                  className="w-full py-3 rounded-xl text-center font-bold text-white shadow-md"
                  style={{ backgroundColor: school.theme.primaryColor }}
                >
                  Admissions Enquiry
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/');
                  }}
                  className="w-full py-2.5 rounded-xl text-center text-xs font-semibold text-leaf-deep bg-leaf/10 flex items-center justify-center gap-1.5"
                >
                  <TreePine className="h-4 w-4" />
                  <span>Return to Campus Tree</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
