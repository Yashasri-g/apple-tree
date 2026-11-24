import { TreeGatewayExperience } from '../components/tree/TreeGatewayExperience';
import { useSeo } from '../lib/seo';

export function Home() {
  useSeo(
    'AppleTree School & Apple School | 13+ Years Heritage | Nizamabad',
    'Backed by 13+ years of early education excellence in Nizamabad. Select a branch or touch the foundational trunk to explore our campuses.'
  );

  return (
    <main className="w-screen h-screen overflow-hidden bg-[#FBF8F1]">
      {/* 🌳 First Entry: Pure Tree Animation Alone with Interactive Apples */}
      <TreeGatewayExperience />
    </main>
  );
}
