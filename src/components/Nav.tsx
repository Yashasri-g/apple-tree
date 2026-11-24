import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { useEnquiry } from './EnquiryContext';
import { EASE, Magnetic } from './motion';
import { scrollToId } from '../lib/scroll';

const LINKS = [
  { id: 'tree-gateway', label: 'Campus Tree' },
  { id: 'structure', label: 'School Structure' },
  { id: 'schools', label: 'Our Schools' },
  { id: 'learning', label: 'Learning' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'about', label: 'About' },
];

export function useGo() {
  const { pathname } = useLocation();
  const nav = useNavigate();
  return (id: string) => {
    if (pathname === '/') scrollToId(id);
    else nav('/', { state: { scroll: id } });
  };
}

export function Nav() {
  const { pathname } = useLocation();
  const go = useGo();
  const { openEnquiry } = useEnquiry();
  const [active, setActive] = useState('top');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHomePage = pathname === '/';
  const [showNav, setShowNav] = useState(!isHomePage);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 20);
    if (isHomePage) {
      setShowNav(y > 350);
    } else {
      setShowNav(true);
    }
  });

  useEffect(() => {
    if (!isHomePage) setShowNav(true);
    else setShowNav(window.scrollY > 350);
  }, [isHomePage]);

  useEffect(() => {
    if (pathname !== '/') { setActive(''); return; }
    const ids = LINKS.map((l) => l.id).filter((i) => i !== 'top');
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((i) => { const el = document.getElementById(i); el && io.observe(el); });
    const top = () => window.scrollY < 300 && setActive('top');
    window.addEventListener('scroll', top, { passive: true });
    top();
    return () => { io.disconnect(); window.removeEventListener('scroll', top); };
  }, [pathname]);

  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);

  const pick = (id: string) => { setOpen(false); setTimeout(() => go(id), open ? 350 : 0); };

  return (
    <>
      {/* Sticky & Frosted Glassmorphic Header - Hidden on the initial tree entry, smoothly slides in when scrolling into content */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full px-3 pt-2 sm:px-6 sm:pt-3 transition-all duration-500 ease-out ${
          showNav
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <nav
            aria-label="Primary"
            className={`flex w-full items-center justify-between rounded-3xl sm:rounded-full py-2 pl-2.5 sm:pl-4 pr-2.5 transition-all duration-300 glass-morphic ${
              scrolled
                ? 'shadow-[0_16px_40px_-8px_rgba(37,42,37,0.16)] !bg-white/95'
                : 'shadow-[0_10px_35px_rgba(0,0,0,0.07)]'
            }`}
          >
            <Link
              to="/"
              onClick={(e) => {
                if (pathname === '/') {
                  e.preventDefault();
                  scrollToId('tree-gateway');
                }
              }}
              aria-label="Apple and Appletree Play Schools, home"
              className="focus:outline-none"
            >
              <Logo />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => go(l.id)}
                    className="relative rounded-full px-4 py-2 text-sm font-semibold text-ink transition-colors hover:text-wm"
                    aria-current={active === l.id ? 'page' : undefined}
                  >
                    {active === l.id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white shadow-xs ring-1 ring-ink/10"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <Magnetic strength={.25} className="hidden sm:inline-block">
                <button
                  onClick={() => openEnquiry()}
                  className="group relative overflow-hidden rounded-full bg-wm px-5 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-playful-sm transition-all"
                >
                  <span className="absolute inset-0 translate-y-full bg-ink transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  <span className="relative">Enquire Now</span>
                </button>
              </Magnetic>
              <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/80 shadow-2xs border border-ink/10 lg:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-leaf-night px-6 pb-8 pt-28 text-cream lg:hidden"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }} animate={{ clipPath: 'circle(150% at 92% 4%)' }} exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: .8, ease: EASE }}
          >
            <ul className="space-y-1">
              {LINKS.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.button initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: .25 + i * .06, duration: .8, ease: EASE }} onClick={() => pick(l.id)} className="flex w-full items-baseline gap-3 py-1 text-left font-display text-5xl font-semibold">
                    <span className="text-base text-wm-pink">0{i + 1}</span>{l.label}
                  </motion.button>
                </li>
              ))}
            </ul>
            <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7 }} onClick={() => { setOpen(false); openEnquiry(); }} className="w-full rounded-full bg-wm py-4 font-display text-xl font-semibold text-white">
              Enquire Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
