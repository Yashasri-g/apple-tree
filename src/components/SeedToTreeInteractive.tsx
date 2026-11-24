import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Play, RotateCcw, Brain } from 'lucide-react';

interface SeedToTreeProps {
  onRedirect?: (schoolId: string) => void;
  className?: string;
  autoPlayInterval?: number;
}

export function SeedToTreeInteractive({ className = '' }: SeedToTreeProps) {
  const navigate = useNavigate();
  // Stages: 0: Seed (13+ Years Ago), 1: Deep Roots, 2: Trunk (The Main Brain), 3: Spreading Branches, 4: Glowing Apple (Branch)
  const [stage, setStage] = useState<number>(4); // Default to full tree with glowing apple
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hoveredPart, setHoveredPart] = useState<'seed' | 'trunk' | 'apple' | null>(null);

  // Auto-play sequence
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStage((prev) => (prev >= 4 ? 0 : prev + 1));
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const stagesInfo = [
    {
      id: 'seed',
      title: 'The Seed (Origin)',
      subtitle: 'Planted 13+ Years Ago on Yellama Gutta Road',
      desc: 'Our journey began with a single vision: to cultivate a warm, joyful sanctuary where young minds could flourish through play.',
      badge: 'Planted 13+ Yrs Ago',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      id: 'roots',
      title: 'Deep Roots of Trust',
      subtitle: 'Rooted in Parental Love & Safety',
      desc: 'Over 13 years, Appletree grew deep roots of community faith, child-first hygiene, verified 4.6★ parent satisfaction, and experienced educators.',
      badge: '4.6★ Parent Trust',
      tagColor: 'bg-leaf-soft text-leaf-deep border-leaf/30',
    },
    {
      id: 'trunk',
      title: 'The Trunk — The Main Brain',
      subtitle: 'Central Foundation & Academic Core',
      desc: 'The trunk is the main brain holding our central curriculum, teacher training, play-based Montessori framework, and safety standards for all branches.',
      badge: 'Central Academic Engine',
      tagColor: 'bg-amber-50 text-amber-900 border-amber-400',
      action: {
        text: 'Visit Foundation Campus (Appletree)',
        link: '/schools/appletree-play-school',
      },
    },
    {
      id: 'branches',
      title: 'Spreading Branches',
      subtitle: 'Assuming to Start Branches Across Nizamabad',
      desc: 'As children flourished, the tree branched out to bring quality early learning closer to families across the city.',
      badge: 'Branch Expansion',
      tagColor: 'bg-leaf/20 text-leaf-deep border-leaf/40',
    },
    {
      id: 'apple',
      title: 'The Glowing Apple (New Branch)',
      subtitle: 'Apple Play School • Gangasthan Branch',
      desc: 'Just as an apple is produced from the tree, Apple Play School blossomed from our 13-year foundation to light up Gangasthan with the same trusted heart!',
      badge: 'Blossomed Sister Campus',
      tagColor: 'bg-wm-soft text-wm border-wm/30',
      action: {
        text: 'Redirect to Gangasthan Branch →',
        link: '/schools/apple-play-school',
      },
    },
  ];

  const currentInfo = stagesInfo[stage];

  return (
    <div className={`relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-white via-cream to-[#f2ede4] p-5 sm:p-7 shadow-glass border-4 border-white ${className}`}>
      
      {/* Header controls & Stage Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-leaf-deep">
            <Sparkles className="h-3.5 w-3.5 text-wm" />
            <span>Interactive Brand Story</span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-ink leading-tight">
            Seed <span className="text-leaf-deep">&rarr;</span> Tree <span className="text-wm">&rarr;</span> Glowing Apple
          </h3>
        </div>

        <div className="flex items-center gap-1.5 bg-white/80 rounded-full p-1 border border-ink/10 shadow-2xs">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-ink hover:text-wm transition"
            title={isPlaying ? 'Pause Story' : 'Auto-Play Growth Story'}
          >
            {isPlaying ? (
              <>
                <span className="h-2 w-2 rounded-full bg-wm animate-ping" />
                <span>Playing...</span>
              </>
            ) : (
              <>
                <Play className="h-3 w-3 fill-current text-leaf-deep" />
                <span>Play Story</span>
              </>
            )}
          </button>
          <button
            onClick={() => { setStage(0); setIsPlaying(true); }}
            className="p-1 rounded-full text-ink-soft hover:text-ink transition"
            title="Restart from Seed"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Stage Selector Tabs */}
      <div className="mt-3 flex items-center justify-between gap-1 overflow-x-auto pb-1 scrollbar-none">
        {stagesInfo.map((st, idx) => (
          <button
            key={st.id}
            onClick={() => { setStage(idx); setIsPlaying(false); }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all whitespace-nowrap ${
              stage === idx
                ? 'bg-ink text-cream shadow-xs scale-103'
                : 'bg-white/60 text-ink-soft hover:bg-white hover:text-ink border border-ink/5'
            }`}
          >
            <span>{idx === 0 ? '🌱 Seed' : idx === 1 ? '🌿 Roots' : idx === 2 ? '🪵 Main Brain' : idx === 3 ? '🌳 Tree' : '🍎 Glowing Apple'}</span>
          </button>
        ))}
      </div>

      {/* Main Interactive Stage Graphics (SVG Canvas) */}
      <div className="relative mt-4 h-72 sm:h-80 w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#eaf4ec] via-[#f7f5ed] to-[#e8decb] border border-ink/10 flex items-center justify-center">
        
        {/* Sky Background with Gentle Sun Glow */}
        <div className="absolute top-4 right-8 h-28 w-28 rounded-full bg-amber-200/40 blur-2xl pointer-events-none" />
        <div className="absolute top-12 left-10 h-24 w-24 rounded-full bg-wm-pink/20 blur-xl pointer-events-none" />

        <svg viewBox="0 0 500 400" className="w-full h-full max-h-[380px] select-none" preserveAspectRatio="xMidYMid meet">
          <defs>
            {/* Trunk bark gradient */}
            <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4A2E1B" />
              <stop offset="35%" stopColor="#7A4C2E" />
              <stop offset="70%" stopColor="#5E3821" />
              <stop offset="100%" stopColor="#3B2213" />
            </linearGradient>

            {/* Glowing Apple Pulse Gradient */}
            <radialGradient id="appleGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F45B65" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FF8E9B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FF8E9B" stopOpacity="0" />
            </radialGradient>

            {/* Brain/Heart core glow */}
            <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE082" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#FFB300" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FF8F00" stopOpacity="0" />
            </radialGradient>

            {/* Leaf cluster gradient */}
            <linearGradient id="leafGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8ED183" />
              <stop offset="100%" stopColor="#4B8C40" />
            </linearGradient>
            <linearGradient id="leafGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#67B15C" />
              <stop offset="100%" stopColor="#285B40" />
            </linearGradient>

            {/* Drop Shadow Filter */}
            <filter id="appleShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#F45B65" floodOpacity="0.5" />
            </filter>
            <filter id="brainShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#FFB300" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Fertile Soil & Ground line */}
          <path
            d="M 0 340 Q 120 330 250 335 T 500 340 L 500 400 L 0 400 Z"
            fill="#563D2D"
            opacity="0.95"
          />
          <path
            d="M 0 336 Q 130 326 260 330 T 500 336 L 500 355 L 0 355 Z"
            fill="#72513B"
            opacity="0.9"
          />
          {/* Grass layer */}
          <path
            d="M 0 335 Q 125 328 250 332 T 500 335"
            stroke="#75B86A"
            strokeWidth="5"
            fill="none"
          />

          {/* ============================================================ */}
          {/* STAGE 0 & 1: THE SEED & ROOTS */}
          {/* ============================================================ */}
          
          {/* Deep Roots (Visible in Stage >= 1) */}
          <AnimatePresence>
            {stage >= 1 && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Central main root */}
                <motion.path
                  d="M 250 340 Q 245 365 248 395"
                  stroke="#4A2E1B"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8 }}
                />
                {/* Left roots */}
                <motion.path
                  d="M 245 345 Q 210 360 185 375"
                  stroke="#5E3821"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                />
                <motion.path
                  d="M 247 360 Q 225 380 205 390"
                  stroke="#5E3821"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
                {/* Right roots */}
                <motion.path
                  d="M 255 345 Q 290 360 315 375"
                  stroke="#5E3821"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                />
                <motion.path
                  d="M 253 360 Q 275 380 295 390"
                  stroke="#5E3821"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                />
              </motion.g>
            )}
          </AnimatePresence>

          {/* The Seed (Visible and prominent in Stage 0, settles into roots in >= 1) */}
          <motion.g
            animate={{
              y: stage === 0 ? [0, -4, 0] : 0,
              scale: stage === 0 ? 1.2 : 0.8,
            }}
            transition={{ repeat: stage === 0 ? Infinity : 0, duration: 2, ease: 'easeInOut' }}
            className="cursor-pointer"
            onClick={() => setStage(0)}
            onMouseEnter={() => setHoveredPart('seed')}
            onMouseLeave={() => setHoveredPart(null)}
          >
            {/* Glowing Seed Aura */}
            {stage === 0 && (
              <circle cx="250" cy="336" r="22" fill="#FFC107" opacity="0.3" className="animate-ping" />
            )}
            <ellipse
              cx="250"
              cy="336"
              rx="9"
              ry="13"
              fill="#D97706"
              stroke="#FFF"
              strokeWidth="2"
              transform="rotate(15 250 336)"
            />
            {/* Seed sprout leaf in stage 0 & 1 */}
            {stage <= 1 && (
              <motion.path
                d="M 250 326 Q 255 315 265 314 Q 260 324 250 326 Z"
                fill="#75B86A"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              />
            )}
          </motion.g>

          {/* ============================================================ */}
          {/* STAGE 2: THE TRUNK — "THE MAIN BRAIN" */}
          {/* ============================================================ */}
          <AnimatePresence>
            {stage >= 2 && (
              <motion.g
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0, scaleY: 0 }}
                style={{ originY: '340px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Main Sturdy Trunk */}
                <path
                  d="M 232 340 C 235 290 236 240 238 200 C 238 185 240 170 242 155 C 248 150 252 150 258 155 C 260 170 262 185 262 200 C 264 240 265 290 268 340 Z"
                  fill="url(#trunkGrad)"
                />

                {/* Left Branch */}
                <path
                  d="M 240 210 C 215 195 190 185 160 180 C 180 195 205 210 238 230 Z"
                  fill="url(#trunkGrad)"
                />
                
                {/* Right Branch (Holds the Glowing Apple!) */}
                <path
                  d="M 260 210 C 285 195 315 185 348 178 C 325 195 295 210 262 230 Z"
                  fill="url(#trunkGrad)"
                />

                {/* Secondary upper branches */}
                <path
                  d="M 244 170 C 230 145 210 135 185 130 C 205 145 225 155 244 175 Z"
                  fill="url(#trunkGrad)"
                />
                <path
                  d="M 256 170 C 270 145 290 135 315 130 C 295 145 275 155 256 175 Z"
                  fill="url(#trunkGrad)"
                />

                {/* ======================================================== */}
                {/* TRUNK CORE: "THE MAIN BRAIN" HEART OF THE SCHOOL */}
                {/* ======================================================== */}
                <g
                  className="cursor-pointer"
                  onClick={() => navigate('/schools/appletree-play-school')}
                  onMouseEnter={() => setHoveredPart('trunk')}
                  onMouseLeave={() => setHoveredPart(null)}
                >
                  {/* Glowing Brain Aura on Trunk */}
                  <circle
                    cx="250"
                    cy="255"
                    r={hoveredPart === 'trunk' ? 30 : 24}
                    fill="url(#brainGlow)"
                    filter="url(#brainShadow)"
                  >
                    <animate
                      attributeName="r"
                      values="22;27;22"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Brain / Core Badge */}
                  <rect
                    x="233"
                    y="238"
                    width="34"
                    height="34"
                    rx="17"
                    fill="#FFF"
                    stroke="#FFB300"
                    strokeWidth="2.5"
                    className="transition-transform hover:scale-110"
                  />
                  
                  {/* Brain SVG Icon */}
                  <g transform="translate(240, 245) scale(0.85)">
                    <path
                      d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z"
                      fill="#D97706"
                    />
                    <path
                      d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z"
                      fill="#F59E0B"
                    />
                  </g>

                  {/* Label: "The Main Brain" */}
                  <rect
                    x="195"
                    y="282"
                    width="110"
                    height="20"
                    rx="10"
                    fill="#285B40"
                    stroke="#FFF"
                    strokeWidth="1.5"
                  />
                  <text
                    x="250"
                    y="295"
                    fill="#FFF"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                    letterSpacing="0.5"
                  >
                    TRUNK: THE MAIN BRAIN
                  </text>
                </g>
              </motion.g>
            )}
          </AnimatePresence>

          {/* ============================================================ */}
          {/* STAGE 3 & 4: TREE CANOPY (BRANCHES & FOLIAGE) */}
          {/* ============================================================ */}
          <AnimatePresence>
            {stage >= 3 && (
              <motion.g
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                style={{ originX: '250px', originY: '170px' }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              >
                {/* Back foliage clusters */}
                <circle cx="180" cy="140" r="48" fill="url(#leafGrad2)" opacity="0.9" />
                <circle cx="320" cy="140" r="48" fill="url(#leafGrad2)" opacity="0.9" />
                <circle cx="250" cy="100" r="54" fill="url(#leafGrad2)" opacity="0.95" />

                {/* Left side foliage */}
                <circle cx="140" cy="170" r="42" fill="url(#leafGrad1)" />
                <circle cx="195" cy="165" r="44" fill="url(#leafGrad1)" />

                {/* Center top foliage */}
                <circle cx="250" cy="115" r="48" fill="url(#leafGrad1)" />
                <circle cx="220" cy="130" r="38" fill="url(#leafGrad1)" />
                <circle cx="280" cy="130" r="38" fill="url(#leafGrad1)" />

                {/* Right side foliage (where the glowing apple will hang) */}
                <circle cx="310" cy="165" r="44" fill="url(#leafGrad1)" />
                <circle cx="360" cy="170" r="40" fill="url(#leafGrad1)" />

                {/* Appletree Campus Badge on the Tree */}
                <g
                  className="cursor-pointer"
                  onClick={() => navigate('/schools/appletree-play-school')}
                >
                  <rect
                    x="110"
                    y="110"
                    width="105"
                    height="22"
                    rx="11"
                    fill="#FFF"
                    stroke="#285B40"
                    strokeWidth="1.5"
                    filter="url(#appleShadow)"
                  />
                  <circle cx="122" cy="121" r="5" fill="#75B86A" />
                  <text
                    x="165"
                    y="125"
                    fill="#285B40"
                    fontSize="9.5"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    🌳 Appletree Campus
                  </text>
                </g>
              </motion.g>
            )}
          </AnimatePresence>

          {/* ============================================================ */}
          {/* STAGE 4: POP UP TREE WITH A GLOWING APPLE (REDIRECT TO BRANCH) */}
          {/* ============================================================ */}
          <AnimatePresence>
            {stage >= 4 && (
              <motion.g
                initial={{ scale: 0, rotate: -25 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -25 }}
                transition={{ type: 'spring', stiffness: 350, damping: 14, delay: 0.1 }}
                className="cursor-pointer group"
                onClick={() => navigate('/schools/apple-play-school')}
                onMouseEnter={() => setHoveredPart('apple')}
                onMouseLeave={() => setHoveredPart(null)}
              >
                {/* Branch Stem Connecting to Apple */}
                <path
                  d="M 330 178 Q 340 188 345 198"
                  stroke="#4A2E1B"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Pulsating Glowing Aura Rings */}
                <circle
                  cx="352"
                  cy="216"
                  r="45"
                  fill="url(#appleGlow)"
                  filter="url(#appleShadow)"
                >
                  <animate
                    attributeName="r"
                    values="36;52;36"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.9;0.3;0.9"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>

                <circle
                  cx="352"
                  cy="216"
                  r="62"
                  fill="none"
                  stroke="#F45B65"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.6"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 352 216"
                    to="360 352 216"
                    dur="12s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Sparkle Stars around the Glowing Apple */}
                <motion.g
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                  style={{ originX: '352px', originY: '216px' }}
                >
                  <circle cx="318" cy="195" r="2.5" fill="#FFE082" />
                  <circle cx="388" cy="202" r="3" fill="#FFF" />
                  <circle cx="360" cy="254" r="2.5" fill="#FFE082" />
                  <circle cx="325" cy="238" r="2" fill="#FFF" />
                </motion.g>

                {/* The Juicy Red Apple Body */}
                <g filter="url(#appleShadow)" transform="translate(328, 192) scale(1.15)">
                  {/* Apple leaf */}
                  <path
                    d="M 21 4 C 23 -3 31 -1 31 6 C 25 7 21 6 21 4 Z"
                    fill="#75B86A"
                    stroke="#FFF"
                    strokeWidth="1"
                  />
                  {/* Apple stem */}
                  <path
                    d="M 20 5 C 19 0 21 -4 23 -6"
                    stroke="#5E3821"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Apple heart-like fruit shape */}
                  <path
                    d="M 21 8 C 16 3 4 5 4 19 C 4 33 16 37 21 38 C 26 37 38 33 38 19 C 38 5 26 3 21 8 Z"
                    fill="#F45B65"
                    stroke="#FFF"
                    strokeWidth="2"
                  />
                  {/* Apple highlight sheen */}
                  <path
                    d="M 10 13 C 8 18 8 26 12 29"
                    stroke="#FFA4AB"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>

                {/* Glowing Apple Pop-up Action Badge with Arrow */}
                <g transform="translate(290, 252)">
                  <rect
                    x="0"
                    y="0"
                    width="135"
                    height="32"
                    rx="16"
                    fill="#F45B65"
                    stroke="#FFF"
                    strokeWidth="2"
                    filter="url(#appleShadow)"
                    className="transition-transform group-hover:scale-105"
                  />
                  <text
                    x="62"
                    y="15"
                    fill="#FFF"
                    fontSize="9.5"
                    fontWeight="bold"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    🍎 Apple Play School
                  </text>
                  <text
                    x="62"
                    y="25"
                    fill="#FFE5E7"
                    fontSize="8"
                    fontWeight="600"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    Tap to visit Gangasthan &rarr;
                  </text>
                </g>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>

        {/* Floating guidance tag on top left */}
        <div className="absolute top-3 left-3 pointer-events-none">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${currentInfo.tagColor}`}>
            <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
            <span>{currentInfo.badge}</span>
          </span>
        </div>

        {/* Quick redirect pill on top right */}
        {stage >= 4 && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate('/schools/apple-play-school')}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-wm hover:bg-wm-dark text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md transition-all hover:scale-105"
          >
            <span>Visit Apple Branch</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </motion.button>
        )}
      </div>

      {/* Description & Action Footer for Selected Stage */}
      <div className="mt-4 rounded-2xl bg-white p-4 sm:p-5 border border-ink/10 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="max-w-md">
          <div className="flex items-center gap-2">
            <h4 className="font-display text-base font-bold text-ink">
              {currentInfo.title}
            </h4>
            <span className="text-xs font-medium text-ink-soft">&bull;</span>
            <span className="text-xs font-semibold text-leaf-deep">{currentInfo.subtitle}</span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-ink-soft leading-relaxed">
            {currentInfo.desc}
          </p>
        </div>

        {/* Direct Action Link if present */}
        {currentInfo.action ? (
          <button
            onClick={() => navigate(currentInfo.action!.link)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink hover:bg-wm text-cream font-display text-xs font-bold transition-all shadow-sm hover:scale-103 shrink-0"
          >
            <span>{currentInfo.action.text}</span>
          </button>
        ) : (
          <button
            onClick={() => setStage((prev) => (prev >= 4 ? 0 : prev + 1))}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-leaf-soft text-leaf-deep hover:bg-leaf/30 text-xs font-bold transition shrink-0"
          >
            <span>Next Stage &rarr;</span>
          </button>
        )}
      </div>

      {/* Interactive Micro-Legend */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-ink-soft pt-2 border-t border-ink/5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/schools/appletree-play-school')}
            className="flex items-center gap-1 font-semibold text-leaf-deep hover:underline"
          >
            <Brain className="h-3 w-3 text-amber-600" />
            <span>Trunk (The Main Brain): Yellama Gutta</span>
          </button>
          <span>&bull;</span>
          <button
            onClick={() => navigate('/schools/apple-play-school')}
            className="flex items-center gap-1 font-semibold text-wm hover:underline"
          >
            <Sparkles className="h-3 w-3 text-wm" />
            <span>Glowing Apple: Gangasthan Branch</span>
          </button>
        </div>

        <span className="text-leaf-deep font-bold">13+ Years of Continuous Growth</span>
      </div>

    </div>
  );
}
