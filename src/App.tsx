import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { EnquiryProvider } from './components/EnquiryContext';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Loader } from './components/Loader';
import { Cursor } from './components/Cursor';
import { SmoothScroll } from './components/SmoothScroll';
import { EnquiryModal } from './components/EnquiryModal';
import { Home } from './pages/Home';
import { SchoolPage } from './pages/SchoolPage';
import { lenis } from './lib/scroll';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { if (lenis) lenis.scrollTo(0, { immediate: true }); else window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <EnquiryProvider>
        <BrowserRouter>
          <SmoothScroll />
          <ScrollTop />
          <Loader />
          <Cursor />
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/schools/:slug" element={<SchoolPage />} />
            {/* legacy URLs */}
            <Route path="/schools" element={<Navigate to="/#schools" replace />} />
            <Route path="/programs" element={<Navigate to="/#programs" replace />} />
            <Route path="/gallery" element={<Navigate to="/#gallery" replace />} />
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route path="/contact" element={<Navigate to="/#enquire" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
          <EnquiryModal />
        </BrowserRouter>
      </EnquiryProvider>
    </MotionConfig>
  );
}
