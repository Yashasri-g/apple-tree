import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Campus } from '../../data/campuses';

interface CampusAppleProps {
  campus: Campus;
  position: { x: number; y: number }; // percent of stage
  isVisible: boolean;
  delay?: number;
  onSelect: (campus: Campus) => void;
  isTransitioning?: boolean;
  isSelected?: boolean;
}

const GOLD = '#B8893A';
const INK = '#1F2A22';
const serif = { fontFamily: '"Cormorant Garamond", Georgia, serif' };

/** A campus node: a small luminous point on a branch tip with an editorial label. */
export function CampusApple({ campus, position, isVisible, delay = 0, onSelect, isTransitioning = false, isSelected = false }: CampusAppleProps) {
  const [hovered, setHovered] = useState(false);
  const soon = campus.status === 'coming-soon';
  const open = (hovered || isSelected) && !isTransitioning;
  const side: 'left' | 'right' | 'top' = position.x < 42 ? 'left' : position.x > 58 ? 'right' : 'top';

  if (!isVisible) return null;

  const name = soon ? campus.shortName.replace(' Branch', '') : campus.shortName;
  const sub = soon ? 'Coming soon' : campus.branchName;

  const labelPos =
    side === 'left' ? 'right-full mr-2 flex-row-reverse text-right top-1/2 -translate-y-1/2 max-sm:right-auto max-sm:mr-0 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:top-full max-sm:mt-0.5 max-sm:translate-y-0 max-sm:flex-col max-sm:items-center max-sm:text-center'
    : side === 'right' ? 'left-full ml-2 flex-row text-left top-1/2 -translate-y-1/2 max-sm:ml-0 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:top-full max-sm:mt-0.5 max-sm:translate-y-0 max-sm:flex-col max-sm:items-center max-sm:text-center'
    : 'bottom-full mb-2 flex-col-reverse items-center text-center left-1/2 -translate-x-1/2';

  return (
    <div
      className={`absolute -translate-x-1/2 -translate-y-1/2 ${open ? 'z-50' : 'z-30'}`}
      style={{ left: `${position.x}%`, top: `${position.y}%`, width: '6%' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.button
        type="button"
        onClick={() => onSelect(campus)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: open ? 1.14 : 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay }}
        className="relative block aspect-square w-full cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9922E]"
        aria-label={`${campus.name}${soon ? ' (coming soon)' : ''}`}
      >
        {(
          <motion.span
            aria-hidden
            className="absolute inset-[-14%] rounded-full"
            style={{ border: soon ? '1.5px dashed rgba(255,255,255,.9)' : `1.5px solid ${GOLD}` }}
            animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeOut' }}
          />
        )}
        <svg viewBox="-28 -28 56 60" className="absolute inset-0 h-full w-full overflow-visible" style={{ filter: 'drop-shadow(0 6px 8px rgba(10,25,8,.35))' }}>
          <defs>
            <radialGradient id={`ca-${campus.id}`} cx="36%" cy="30%" r="85%">
              <><stop offset="0" stopColor="#E0524A" /><stop offset="0.45" stopColor="#B8272B" /><stop offset="1" stopColor="#6B1019" /></>
            </radialGradient>
          </defs>
          <path d="M0 -8 C-9 -15 -22 -9 -21 6 C-20 20 -10 26 0 24 C10 26 20 20 21 6 C22 -9 9 -15 0 -8 Z" fill={`url(#ca-${campus.id})`} />
          <ellipse cx="-9" cy="-1" rx="4.2" ry="7" fill="#fff" opacity="0.34" transform="rotate(18 -9 -1)" />
          <path d="M0.5 -8 C0.5 -13 2.2 -17 5.5 -20" stroke="#4A3524" strokeWidth="1.9" strokeLinecap="round" fill="none" />
          <path d="M3 -15 C8 -22 16 -20 16 -14 C11 -11 5 -12 3 -15 Z" fill="#5F942C" />
        </svg>
      </motion.button>

      {/* Editorial label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.6 }}
        className={`pointer-events-none absolute flex items-center gap-2 whitespace-nowrap ${labelPos}`}
      >
        {side !== 'top' && (
          <span className="block h-px w-6 sm:w-9 max-sm:hidden" style={{ background: soon ? 'rgba(31,42,34,.25)' : 'rgba(154,107,20,.6)' }} />
        )}
        <span className="block rounded-lg border border-ink/5 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-md">
          <span
            className="block leading-none"
            style={{ ...serif, fontSize: 'clamp(15px, 1.7vw, 22px)', fontWeight: 500, color: soon ? 'rgba(31,42,34,.6)' : INK }}
          >
            {name}
          </span>
          <span
            className="mt-1 block uppercase"
            style={{ fontSize: 'clamp(8px, 0.7vw, 10px)', letterSpacing: '0.2em', color: soon ? 'rgba(31,42,34,.42)' : '#9A6B14' }}
          >
            {sub}
          </span>
        </span>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onSelect(campus)}
            className={`absolute top-full mt-6 w-64 cursor-pointer rounded-xl border border-ink/10 bg-white/90 p-5 text-left shadow-xl backdrop-blur-xl ${
              position.x > 62 ? 'right-0' : position.x < 38 ? 'left-0' : 'left-1/2 -translate-x-1/2'
            }`}
          >
            <p className="text-[10px] uppercase" style={{ letterSpacing: '0.2em', color: GOLD }}>{campus.badgeText}</p>
            <h4 className="mt-2 text-xl leading-tight" style={{ ...serif, color: INK, fontWeight: 500, letterSpacing: 0 }}>{campus.name}</h4>
            <p className="mt-1 text-xs" style={{ color: 'rgba(31,42,34,.55)' }}>{campus.area}, Nizamabad</p>
            <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-3 text-xs" style={{ color: INK }}>
              <span className="tracking-wide">{soon ? 'Preview' : 'Enter site'}</span>
              <ArrowUpRight className="h-4 w-4" style={{ color: GOLD }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
