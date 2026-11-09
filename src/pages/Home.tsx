import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/sections/Hero';
import { Schools } from '../components/sections/Schools';
import { Learning } from '../components/sections/Learning';
import { Programs } from '../components/sections/Programs';
import { Gallery } from '../components/sections/Gallery';
import { About } from '../components/sections/About';
import { Enquire } from '../components/sections/Enquire';
import { scrollToId } from '../lib/scroll';
import { useSeo } from '../lib/seo';

export function Home() {
  const { state, hash } = useLocation();
  useSeo('Apple Play School & Appletree Play School | 13+ Years Experience | Nizamabad', 'Backed by 13+ years of early education experience in Nizamabad. Appletree Play School (Yellama Gutta Road) founded first, and from its roots blossomed Apple Play School (Gangasthan).');
  useEffect(() => {
    const id = (state as { scroll?: string } | null)?.scroll || hash.replace('#', '');
    if (id) setTimeout(() => scrollToId(id), 350);
  }, [state, hash]);
  return (
    <main>
      <Hero />
      <Schools />
      <Learning />
      <Programs />
      <Gallery />
      <About />
      <Enquire />
    </main>
  );
}
