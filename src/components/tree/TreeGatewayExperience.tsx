import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';
import { CAMPUSES, type Campus } from '../../data/campuses';
import { TreeCanvas } from './TreeCanvas';
import { CampusApple } from './CampusApple';
import { TreeAtmosphere } from './TreeAtmosphere';

// Campus apples (viewBox coordinates on the 1000x900 canvas)
const TARGETS: Record<string, { x: number; y: number }> = {
  'appletree-school': { x: 255, y: 215 },
  'apple-school-pragathi-nagar': { x: 745, y: 215 },
  'apple-school-kamareddy': { x: 500, y: 118 },
  'apple-school-vinayaka-nagar': { x: 150, y: 400 },
  'apple-school-armoor': { x: 850, y: 400 },
};

const SESSION_KEY = 'tree_gateway_completed';

export function TreeGatewayExperience() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const hasSeenIntro = (() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      return false;
    }
  })();

  // Scene state: 1: Seed, 2: Roots, 3: Tree & Trunk, 4: First Glowing Apple, 5: Multiple Apples (Interactive)
  const [scene, setScene] = useState<1 | 2 | 3 | 4 | 5>(
    hasSeenIntro || reduceMotion ? 5 : 1
  );
  const instant = useRef(hasSeenIntro || !!reduceMotion).current;
  const [runId, setRunId] = useState(0);

  
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Growth sequence controller
  useEffect(() => {
    if (scene === 5) {
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        /* ignore */
      }
      return;
    }

    const timers: NodeJS.Timeout[] = [];

    if (scene === 1) {
      timers.push(setTimeout(() => setScene(2), 800));
    } else if (scene === 2) {
      timers.push(setTimeout(() => setScene(3), 800));
    } else if (scene === 3) {
      timers.push(setTimeout(() => setScene(4), 1800));
    } else if (scene === 4) {
      timers.push(setTimeout(() => setScene(5), 1700));
    }

    return () => timers.forEach(clearTimeout);
  }, [scene]);

  const handleSkip = () => {
    setScene(5);
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* ignore */
    }
  };

  const handleReplay = () => {
    setSelectedCampus(null);
    setRunId((n) => n + 1);
    setScene(1);
  };

  const handleSelectCampus = (campus: Campus) => {
    if (isTransitioning) return;

    setSelectedCampus(campus);

    setIsTransitioning(true);

    setTimeout(() => {
      navigate(campus.route);
    }, 180);
  };

  return (
    <section
      id="tree-gateway"
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#FBF8F1] select-none cursor-default"
      aria-label="Tree and Campus Selection Experience"
    >
      {/* Atmosphere, sunlight & floating particles */}
      <TreeAtmosphere />

      {/* Wordmark */}
      <div className="absolute left-6 top-6 z-30 sm:left-10 sm:top-8">
        <p className="text-[11px] uppercase text-ink/80" style={{ letterSpacing: '0.32em' }}>AppleTree &nbsp;·&nbsp; Apple School</p>
        <p className="mt-1.5 text-[10px] uppercase text-[#9A6B14]/80" style={{ letterSpacing: '0.28em' }}>Nizamabad &nbsp;·&nbsp; Since 2013</p>
      </div>

      {/* Stage sized by the smaller of width/height so nodes stay aligned with the SVG */}
      <div className="relative z-20 aspect-[1000/900] w-[min(100vw,calc(94vh*1.111))]">
        <TreeCanvas key={runId} scene={scene} instant={instant && runId === 0} />

        {CAMPUSES.map((campus, idx) => {
          const first = campus.id === 'appletree-school';
          const tip = TARGETS[campus.id] ?? { x: campus.applePosition.x * 10, y: campus.applePosition.y * 9 };
          return (
            <CampusApple
              key={campus.id}
              campus={campus}
              position={{ x: tip.x / 10, y: tip.y / 9 }}
              isVisible={scene === 5}
              delay={scene === 5 ? (first ? 0 : 0.15 + idx * 0.1) : 0}
              onSelect={handleSelectCampus}
              isTransitioning={isTransitioning}
              isSelected={selectedCampus?.id === campus.id}
            />
          );
        })}
      </div>

      {scene === 5 && (
        <p className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2 text-[10px] uppercase text-ink/45" style={{ letterSpacing: '0.3em' }}>
          Select a campus
        </p>
      )}

      {/* Ultra-Subtle Corner Control: Replay or Skip */}
      <div className="absolute top-4 right-4 z-40">
        {scene < 5 ? (
          <button
            onClick={handleSkip}
            className="p-2 rounded-full bg-white/70 hover:bg-white text-ink/50 hover:text-ink border border-ink/10 transition opacity-60 hover:opacity-100 cursor-pointer"
            title="Skip directly to tree"
            aria-label="Skip to completed tree"
          >
            <span className="text-[11px] font-mono tracking-wider font-semibold">SKIP</span>
          </button>
        ) : (
          <button
            onClick={handleReplay}
            className="p-2.5 rounded-full bg-white/70 hover:bg-white text-ink/50 hover:text-ink border border-ink/10 transition opacity-60 hover:opacity-100 cursor-pointer"
            title="Replay Tree Growth"
            aria-label="Replay growth animation"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </section>
  );
}
