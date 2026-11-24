import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { EnquiryProvider } from './components/EnquiryContext';
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
          <Routes>
            {/* 🌳 First Page: Pure Tree Animation Gateway Alone */}
            <Route path="/" element={<Home />} />

            {/* 🏫 Independent School Sites (Each isolated with its own logo, header, data, footer) */}
            <Route path="/schools/:slug" element={<SchoolPage />} />

            {/* Direct navigation aliases */}
            <Route path="/schools" element={<Navigate to="/" replace />} />
            <Route path="/appletree" element={<Navigate to="/schools/appletree-school" replace />} />
            <Route path="/appleschool" element={<Navigate to="/schools/apple-school-pragathi-nagar" replace />} />
            <Route path="/programs" element={<Navigate to="/schools/appletree-school" replace />} />
            <Route path="/gallery" element={<Navigate to="/schools/appletree-school" replace />} />
            <Route path="/about" element={<Navigate to="/schools/appletree-school" replace />} />
            <Route path="/contact" element={<Navigate to="/schools/appletree-school" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <EnquiryModal />
        </BrowserRouter>
      </EnquiryProvider>
    </MotionConfig>
  );
}
