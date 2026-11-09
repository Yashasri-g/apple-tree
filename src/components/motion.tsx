import { useRef, useState, type ReactNode, type MouseEvent, type ElementType } from 'react';
import {
  motion, useMotionValue, useSpring, useTransform, useScroll, useReducedMotion, type MotionValue,
} from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Word-by-word masked headline reveal. */
export function SplitWords({
  text, className = '', as = 'span', delay = 0, stagger = 0.07, once = true, inline = false,
}: {
  text: string; className?: string; as?: ElementType; delay?: number; stagger?: number; once?: boolean; inline?: boolean;
}) {
  const Tag = as as ElementType;
  const words = text.split(' ');
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className={`${inline ? 'inline-block' : 'inline-block'} overflow-hidden align-bottom pb-[.12em] -mb-[.12em]`}>
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '115%', rotate: 5 }}
            whileInView={{ y: '0%', rotate: 0 }}
            viewport={{ once, margin: '-8% 0px' }}
            transition={{ duration: 1, ease: EASE, delay: delay + i * stagger }}
          >
            {w}{i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Fade + rise on scroll. */
export function Reveal({
  children, delay = 0, y = 40, className = '', x = 0,
}: { children: ReactNode; delay?: number; y?: number; x?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Image with a clip-path mask reveal, inner parallax and hover zoom. */
export function MaskImage({
  src, alt, className = '', imgClass = '', parallax = 40, delay = 0, from = 'bottom', eager = false, sizes,
}: {
  src: string; alt: string; className?: string; imgClass?: string; parallax?: number; delay?: number;
  from?: 'bottom' | 'left' | 'top' | 'right'; eager?: boolean; sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-parallax, parallax]);
  const clip = {
    bottom: ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'],
    top: ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)'],
    left: ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'],
    right: ['inset(0% 0% 0% 100%)', 'inset(0% 0% 0% 0%)'],
  }[from];
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden group ${className}`}
      initial={{ clipPath: clip[0] }}
      whileInView={{ clipPath: clip[1] }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 1.3, ease: EASE, delay }}
      data-cursor="view"
    >
      <motion.img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        style={{ y: reduce ? 0 : y, scale: 1.18 }}
        className={`graded h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06] ${imgClass}`}
      />
    </motion.div>
  );
}

/** 3D tilt following the pointer. */
export function Tilt({
  children, className = '', max = 10, glare = true,
}: { children: ReactNode; className?: string; max?: number; glare?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 160, damping: 18 });
  const sy = useSpring(my, { stiffness: 160, damping: 18 });
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const gx = useTransform(sx, [0, 1], ['0%', '100%']);
  const gy = useTransform(sy, [0, 1], ['0%', '100%']);
  const bg = useTransform([gx, gy] as MotionValue<string>[], ([a, b]: string[]) =>
    `radial-gradient(circle at ${a} ${b}, rgba(255,255,255,.35), transparent 55%)`);
  const move = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const leave = () => { mx.set(0.5); my.set(0.5); };
  return (
    <div style={{ perspective: 1100 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={move}
        onMouseLeave={leave}
        style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full"
      >
        {children}
        {glare && !reduce && (
          <motion.div aria-hidden style={{ background: bg }} className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light" />
        )}
      </motion.div>
    </div>
  );
}

/** Magnetic wrapper: element leans toward the pointer. */
export function Magnetic({ children, strength = 0.3, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const move = (e: MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  return (
    <motion.div ref={ref} style={{ x, y }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }} className={`inline-block ${className}`}>
      {children}
    </motion.div>
  );
}

/** Pointer-driven parallax group. Children use depth via data-depth through context-free `Depth`. */
export function useMouseParallax() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const onMove = (e: MouseEvent) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };
  return { sx, sy, onMove };
}

export function Depth({ sx, sy, depth, children, className = '', style }: {
  sx: MotionValue<number>; sy: MotionValue<number>; depth: number; children: ReactNode; className?: string; style?: React.CSSProperties;
}) {
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth);
  return <motion.div style={{ x, y, ...style }} className={className}>{children}</motion.div>;
}

/** Scroll-velocity marquee. */
export function Marquee({ items, className = '' }: { items: string[]; className?: string }) {
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, (v) => -(v * 0.25) % 1600);
  const reduce = useReducedMotion();
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden>
      <motion.div style={{ x: reduce ? 0 : x }} className="inline-flex items-center gap-10 pr-10">
        {row.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-10">
            <span>{t}</span>
            <span className="inline-block h-[.5em] w-[.5em] rounded-full bg-current opacity-60" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** Button with sliding fill and arrow micro-interaction. */
export function useHover() {
  const [h, setH] = useState(false);
  return { h, bind: { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false), onFocus: () => setH(true), onBlur: () => setH(false) } };
}
