import { motion } from 'framer-motion';

/** Watermelon half-slice: the brand mark of this design language. */
export function Watermelon({ className = '', seeds = true }: { className?: string; seeds?: boolean }) {
  return (
    <svg viewBox="0 0 240 130" className={className} aria-hidden>
      <defs>
        <radialGradient id="wmFlesh" cx="50%" cy="0%" r="100%">
          <stop offset="0" stopColor="#FF8E9B" />
          <stop offset="1" stopColor="#F45B65" />
        </radialGradient>
      </defs>
      <path d="M8 6a112 112 0 0 0 224 0z" fill="#285B40" />
      <path d="M16 6a104 104 0 0 0 208 0z" fill="#75B86A" />
      <path d="M22 6a98 98 0 0 0 196 0z" fill="#FFF9F1" />
      <path d="M28 6a92 92 0 0 0 184 0z" fill="url(#wmFlesh)" />
      {seeds && [[78, 38], [108, 62], [136, 40], [162, 64], [96, 28], [150, 26], [124, 84]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="4.2" ry="7" fill="#252A25" transform={`rotate(${i * 25 - 40} ${x} ${y})`} />
      ))}
    </svg>
  );
}

export function AppleMark({ className = '', fill = '#F45B65', leaf = '#75B86A' }: { className?: string; fill?: string; leaf?: string }) {
  return (
    <svg viewBox="0 0 100 110" className={className} aria-hidden>
      <path d="M50 30C36 20 8 26 8 62c0 28 18 46 33 46 5 0 6-2 9-2s4 2 9 2c15 0 33-18 33-46 0-36-28-42-42-32z" fill={fill} />
      <path d="M26 52c1-9 6-15 13-17" stroke="#fff" strokeOpacity=".5" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M52 28c0-14 8-22 22-24-1 14-8 22-22 24z" fill={leaf} />
      <path d="M50 30c0-6 1-12 4-18" stroke="#285B40" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Leaf({ className = '', fill = '#75B86A' }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d="M8 92C8 40 40 8 92 8c0 52-32 84-84 84z" fill={fill} />
      <path d="M8 92L70 30" stroke="#fff" strokeOpacity=".45" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Blob({ className = '', color = '#FF8E9B', delay = 0 }: { className?: string; color?: string; delay?: number }) {
  return (
    <motion.svg viewBox="0 0 200 200" className={className} aria-hidden
      animate={{ rotate: [0, 8, -6, 0], scale: [1, 1.06, .97, 1] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay }}>
      <path fill={color} d="M45 -60C58 -48 66 -30 70 -10C74 11 73 33 60 49C46 65 22 74 -3 76C-28 78 -57 72 -70 54C-83 36 -80 6 -69 -18C-58 -42 -39 -60 -16 -66C7 -72 32 -72 45 -60Z" transform="translate(100 100)" />
    </motion.svg>
  );
}

export function Squiggle({ className = '', color = '#F45B65' }: { className?: string; color?: string }) {
  return (
    <motion.svg viewBox="0 0 220 24" className={className} fill="none" aria-hidden>
      <motion.path d="M4 12c14-14 24 14 38 0s24 14 38 0 24 14 38 0 24 14 38 0 24 14 38 0" stroke={color} strokeWidth="5" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeOut' }} />
    </motion.svg>
  );
}

export function Sprout({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <path d="M50 96V50" stroke="#285B40" strokeWidth="5" strokeLinecap="round" />
      <path d="M50 58C50 36 34 26 14 28c0 22 14 32 36 30z" fill="#75B86A" />
      <path d="M50 46C50 26 64 16 84 18c0 20-14 30-34 28z" fill="#5BA050" />
    </svg>
  );
}
