import { motion, type TargetAndTransition } from 'framer-motion';
import { TREE } from './treeGeometry';

interface TreeCanvasProps {
  scene: 1 | 2 | 3 | 4 | 5;
  instant: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** Realistic apple tree: displaced + lit bark, branch-grown layered foliage, natural apples and grass. */
export function TreeCanvas({ scene, instant }: TreeCanvasProps) {
  const canopy = scene >= 4;
  const fruit = scene >= 5;
  const init = (v: TargetAndTransition) => (instant ? false : v);
  const [back, mid, front] = TREE.passes;

  const leafUse = (l: { x: number; y: number; rot: number; s: number; fill: string }, i: number) => (
    <use key={i} href="#leaf" fill={l.fill} transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.rot}) scale(${l.s.toFixed(2)})`} />
  );

  return (
    <svg viewBox="0 0 1000 900" className="absolute inset-0 h-full w-full overflow-visible pointer-events-none" aria-hidden>
      <defs>
        <g id="leaf">
          <path d="M0 0 C5 -7 17 -11 34 0 C17 11 5 7 0 0 Z" />
          <path d="M1 0 L30 0" stroke="#fff" strokeOpacity="0.16" strokeWidth="0.9" fill="none" />
        </g>

        {/* Realistic apple: red with a warm blush, soft specular, calyx dimple */}
        <radialGradient id="appleBody" cx="36%" cy="30%" r="85%">
          <stop offset="0" stopColor="#E0524A" />
          <stop offset="0.45" stopColor="#B8272B" />
          <stop offset="1" stopColor="#6B1019" />
        </radialGradient>
        <radialGradient id="appleBlush" cx="30%" cy="20%" r="55%">
          <stop offset="0" stopColor="#E6C84A" stopOpacity="0.55" />
          <stop offset="1" stopColor="#E6C84A" stopOpacity="0" />
        </radialGradient>
        <filter id="blur1"><feGaussianBlur stdDeviation="1.6" /></filter>
        <g id="apple">
          <ellipse cx="2" cy="22" rx="15" ry="3" fill="#0B1F08" opacity="0.28" filter="url(#blur1)" />
          <path d="M0 -8 C-9 -15 -22 -9 -21 6 C-20 20 -10 26 0 24 C10 26 20 20 21 6 C22 -9 9 -15 0 -8 Z" fill="url(#appleBody)" />
          <path d="M0 -8 C-9 -15 -22 -9 -21 6 C-20 20 -10 26 0 24 C10 26 20 20 21 6 C22 -9 9 -15 0 -8 Z" fill="url(#appleBlush)" />
          <ellipse cx="-9" cy="-1" rx="4.2" ry="7" fill="#fff" opacity="0.32" filter="url(#blur1)" transform="rotate(18 -9 -1)" />
          <path d="M-3 -7.5 C-1 -5.5 1 -5.5 3 -7.5" stroke="#4A0E12" strokeOpacity="0.6" strokeWidth="1.6" fill="none" />
          <path d="M0.5 -8 C0.5 -13 2.2 -17 5.5 -20" stroke="#4A3524" strokeWidth="1.9" strokeLinecap="round" fill="none" />
        </g>

        {/* Bark: organic edges, vertical grain, directional light */}
        <filter id="bark" x="-12%" y="-6%" width="124%" height="112%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03 0.07" numOctaves="2" seed="4" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="9" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.07 0.5" numOctaves="4" seed="9" result="grain" />
          <feDiffuseLighting in="grain" surfaceScale="2.6" diffuseConstant="1.05" lightingColor="#ffffff" result="lit">
            <feDistantLight azimuth="215" elevation="52" />
          </feDiffuseLighting>
          <feComposite in="shape" in2="lit" operator="arithmetic" k1="1.15" k2="0" k3="0" k4="0" result="textured" />
          <feComposite in="textured" in2="shape" operator="in" />
        </filter>
        <linearGradient id="barkTone" gradientUnits="userSpaceOnUse" x1="340" x2="660" y1="0" y2="0">
          <stop offset="0" stopColor="#9A7656" />
          <stop offset="0.45" stopColor="#7A5A41" />
          <stop offset="1" stopColor="#4A3426" />
        </linearGradient>

        <radialGradient id="groundTone" cx="50%" cy="40%" r="60%">
          <stop offset="0" stopColor="#5C8A33" stopOpacity="0.95" />
          <stop offset="0.7" stopColor="#4A7A2C" stopOpacity="0.7" />
          <stop offset="1" stopColor="#3B6428" stopOpacity="0" />
        </radialGradient>
        <filter id="soft" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="10" /></filter>
        <filter id="softer" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="22" /></filter>
        <radialGradient id="feather">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.82" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id="limbMask" maskUnits="userSpaceOnUse" x="-100" y="-100" width="1200" height="1100">
          <motion.circle cx="500" cy="620" fill="url(#feather)" initial={instant ? { r: 700 } : { r: 0 }} animate={{ r: scene >= 3 ? 700 : 0 }} transition={{ duration: 1.5, delay: instant ? 0 : 0.4, ease: [0.4, 0, 0.2, 1] }} />
        </mask>
        <mask id="leafMask" maskUnits="userSpaceOnUse" x="-100" y="-100" width="1200" height="1100">
          <motion.circle cx="500" cy="600" fill="url(#feather)" initial={instant ? { r: 700 } : { r: 0 }} animate={{ r: scene >= 4 ? 700 : 0 }} transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }} />
        </mask>
        <radialGradient id="sun" cx="30%" cy="18%" r="70%">
          <stop offset="0" stopColor="#FFF3B8" stopOpacity="0.22" />
          <stop offset="1" stopColor="#FFF3B8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ground: cast shadow + turf */}
      <motion.g initial={init({ opacity: 0 })} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
        <ellipse cx="540" cy="852" rx="330" ry="30" fill="#14260F" opacity="0.28" filter="url(#soft)" />
        <ellipse cx="500" cy="850" rx="360" ry="24" fill="url(#groundTone)" />
        {TREE.bladesBack.map((b, i) => <path key={i} d={b.d} fill={b.fill} />)}
      </motion.g>

      {/* Seed */}
      <motion.g
        initial={init({ opacity: 0, scale: 0 })}
        animate={scene === 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.8, ease: EASE }}
        style={{ transformOrigin: '500px 850px' }}
      >
        <ellipse cx="500" cy="848" rx="10" ry="6.5" fill="#6B4A32" />
        <ellipse cx="497" cy="846" rx="4" ry="2" fill="#A2805F" opacity="0.7" />
        <circle cx="500" cy="848" r="18" fill="#FFE9A8" opacity="0.5" filter="url(#blur1)" />
      </motion.g>

      {/* Sprout */}
      <motion.g
        initial={init({ scaleY: 0, opacity: 0 })}
        animate={scene === 2 ? { scaleY: 1, opacity: 1 } : { scaleY: scene > 2 ? 1 : 0, opacity: scene > 2 ? 0 : 0 }}
        transition={{ duration: scene === 2 ? 0.7 : 0.4, ease: EASE }}
        style={{ transformOrigin: '500px 850px' }}
      >
        <path d="M500 850 C500 836 501 822 500 806" stroke="#6E9C3C" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <use href="#leaf" fill="#7FB041" transform="translate(500 812) rotate(-35) scale(1.1)" />
        <use href="#leaf" fill="#8DBE4A" transform="translate(500 806) rotate(-145) scale(1.1)" />
      </motion.g>

      {/* Trunk rises */}
      <motion.g
        initial={init({ opacity: 0, scaleY: 0 })}
        animate={scene >= 3 ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
        transition={{ duration: 1, delay: instant ? 0 : 0.1, ease: EASE }}
        style={{ transformOrigin: '500px 850px' }}
      >
        <g filter="url(#bark)">
          {TREE.trunk.map((d, i) => <path key={i} d={d} fill="url(#barkTone)" />)}
        </g>
      </motion.g>

      {/* Limbs spread outward from the crown fork */}
      <g mask="url(#limbMask)">
        <g filter="url(#bark)">
          {TREE.limbs.map((d, i) => <path key={i} d={d} fill="url(#barkTone)" />)}
        </g>
      </g>

      <g mask="url(#leafMask)">
      {/* Deep shade behind foliage so gaps read as depth */}
      <motion.ellipse
        cx="500" cy="345" rx="330" ry="210" fill="#16380F" opacity="0.85" filter="url(#softer)"
        initial={init({ opacity: 0 })} animate={{ opacity: canopy ? 0.8 : 0 }} transition={{ duration: 1 }}
      />

      {/* Foliage passes */}
      {[back, mid].map((leaves, pi) => (
        <motion.g
          key={pi}
          initial={init({ opacity: 0, scale: 0.9 })}
          animate={canopy ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.1, delay: instant ? 0 : pi * 0.15, ease: EASE }}
          style={{ transformOrigin: '500px 560px' }}
        >
          {leaves.map(leafUse)}
        </motion.g>
      ))}

      {/* Apples sit between mid and front foliage so some are partly covered */}
      {TREE.apples.filter((_, i) => i % 3 === 0).map((a, i) => (
        <motion.g
          key={i}
          initial={init({ scale: 0, opacity: 0 })}
          animate={fruit ? { scale: a.s, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: instant ? 0 : a.delay * 0.6 }}
          style={{ transformOrigin: `${a.x}px ${a.y}px` }}
        >
          <use href="#apple" transform={`translate(${a.x.toFixed(1)} ${a.y.toFixed(1)}) rotate(${a.rot.toFixed(1)})`} />
        </motion.g>
      ))}

      <motion.g
        initial={init({ opacity: 0, scale: 0.92 })}
        animate={canopy ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.8, delay: instant ? 0 : 0.3, ease: EASE }}
        style={{ transformOrigin: '500px 560px' }}
      >
        {front.map(leafUse)}
      </motion.g>

      {/* Most apples sit in front of the foliage so the crown reads as full of fruit */}
      {TREE.apples.filter((_, i) => i % 3 !== 0).map((a, i) => (
        <motion.g
          key={i}
          initial={init({ scale: 0, opacity: 0 })}
          animate={fruit ? { scale: a.s, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: instant ? 0 : a.delay * 0.6 }}
          style={{ transformOrigin: `${a.x}px ${a.y}px` }}
        >
          <use href="#apple" transform={`translate(${a.x.toFixed(1)} ${a.y.toFixed(1)}) rotate(${a.rot.toFixed(1)})`} />
        </motion.g>
      ))}


      </g>

      {/* Sunlight over the crown */}
      <ellipse cx="500" cy="340" rx="400" ry="290" fill="url(#sun)" opacity={canopy ? 1 : 0} style={{ transition: 'opacity 1.2s' }} />

      {/* Front turf */}
      <motion.g initial={init({ opacity: 0 })} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.2 }}>
        {TREE.bladesFront.map((b, i) => <path key={i} d={b.d} fill={b.fill} />)}
      </motion.g>
    </svg>
  );
}
