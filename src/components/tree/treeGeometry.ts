/** Deterministic, branch-driven apple tree on a 1000x900 canvas. Foliage grows on the branches. */

export interface Leaf { x: number; y: number; rot: number; s: number; fill: string }
export interface Apple { x: number; y: number; s: number; rot: number; tone: number; delay: number }
export interface Blade { d: string; fill: string }

function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// sunlit yellow-green -> deep shade
const TONES = ['#9CC24A', '#80AD3A', '#699A31', '#518327', '#3E6C20', '#2D561A', '#1F4115'];

const f = (n: number) => n.toFixed(1);

/** Filled, tapering limb following a sampled curve. */
function taper(pts: [number, number][], w0: number, w1: number): string {
  const L: string[] = [];
  const R: string[] = [];
  const n = pts.length;
  pts.forEach(([x, y], i) => {
    const [px, py] = pts[Math.max(0, i - 1)];
    const [nx, ny] = pts[Math.min(n - 1, i + 1)];
    let tx = nx - px, ty = ny - py;
    const l = Math.hypot(tx, ty) || 1;
    tx /= l; ty /= l;
    const w = (w0 + (w1 - w0) * (i / (n - 1))) / 2;
    L.push(`${f(x - ty * w)} ${f(y + tx * w)}`);
    R.push(`${f(x + ty * w)} ${f(y - tx * w)}`);
  });
  const [ex, ey] = pts[n - 1];
  const rr = w1 / 2;
  return `M${L.join(' L')} L${R.reverse().join(' L')} Z M${f(ex - rr)} ${f(ey)} a${f(rr)} ${f(rr)} 0 1 0 ${f(rr * 2)} 0 a${f(rr)} ${f(rr)} 0 1 0 ${f(-rr * 2)} 0Z`;
}

function curve(x: number, y: number, x2: number, y2: number, bend: number): [number, number][] {
  const cx = (x + x2) / 2 + bend, cy = (y + y2) / 2;
  const out: [number, number][] = [];
  for (let i = 0; i <= 9; i++) {
    const t = i / 9;
    out.push([(1 - t) ** 2 * x + 2 * (1 - t) * t * cx + t * t * x2, (1 - t) ** 2 * y + 2 * (1 - t) * t * cy + t * t * y2]);
  }
  return out;
}

const LEN = [0, 118, 100, 84, 68, 54];
const MAX_DEPTH = 5;
const ENV = { cx: 500, cy: 345, rx: 372, ry: 262 };
const outside = (x: number, y: number) => ((x - ENV.cx) / ENV.rx) ** 2 + ((y - ENV.cy) / ENV.ry) ** 2 > 1;

function build() {
  const r = rng(53);
  const trunk: string[] = [];
  const limbs: string[] = [];
  const ends: { x: number; y: number; depth: number }[] = [];

  // Trunk: wide, slightly curved, flaring at the base
  const trunkPts = curve(500, 850, 500, 612, -9);
  trunk.push(taper(trunkPts, 160, 98));
  // Surface roots
  trunk.push(taper(curve(450, 840, 360, 862, 6), 52, 6));
  trunk.push(taper(curve(550, 840, 640, 864, -6), 52, 6));
  trunk.push(taper(curve(500, 848, 462, 876, -10), 38, 5));

  const grow = (x: number, y: number, a: number, depth: number, w: number) => {
    const len = LEN[depth] * (0.92 + r() * 0.2);
    const x2 = x + Math.sin(a) * len;
    const y2 = y - Math.cos(a) * len;
    const w1 = Math.max(w * 0.72, 2.2);
    limbs.push(taper(curve(x, y, x2, y2, (r() - 0.5) * 0.28 * len), w, w1));
    ends.push({ x: x2, y: y2, depth });
    if (depth >= MAX_DEPTH || (depth >= 3 && outside(x2, y2))) return;
    const pull = -a * 0.22;
    const spread = 0.42 - depth * 0.025 + r() * 0.14;
    grow(x2, y2, a + pull - spread, depth + 1, w1);
    grow(x2, y2, a + pull + spread, depth + 1, w1);
    if (depth <= 2 && r() < 0.45) grow(x2, y2, a + pull + (r() - 0.5) * 0.3, depth + 1, w1 * 0.8);
  };
  [-0.78, 0.04, 0.8].forEach((a, i) => grow(500, 612, a + (r() - 0.5) * 0.08, 1, i === 1 ? 62 : 58));

  // Foliage clumps grow from branch ends (denser at the tips)
  const passes: Leaf[][] = [[], [], []];
  const clumps: { x: number; y: number; rad: number }[] = [];
  const addLeaf = (cx: number, cy: number, rad: number, pass: number) => {
    const ang = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * rad;
    const x = cx + Math.cos(ang) * d;
    const y = cy + Math.sin(ang) * d * 0.85;
    const t = ((y - 110) / 520) * 0.62 + ((x - 400) / 600) * 0.14 + (r() - 0.5) * 0.5 + 0.12 + (pass === 0 ? 0.26 : pass === 2 ? -0.16 : 0);
    const idx = Math.max(0, Math.min(TONES.length - 1, Math.round(t * (TONES.length - 1))));
    passes[pass].push({ x, y, rot: Math.round(r() * 360), s: 1.1 + r() * 0.6, fill: TONES[idx] });
  };
  ends.forEach((e) => {
    if (e.depth < 3) return;
    const tip = e.depth >= 4;
    const rad = tip ? 68 : 52;
    clumps.push({ x: e.x, y: e.y, rad });
    const n = tip ? 46 : 24;
    for (let i = 0; i < n; i++) addLeaf(e.x, e.y, rad, r() < 0.28 ? 0 : r() < 0.72 ? 1 : 2);
  });
  // Back fill so gaps read as deep shade, not holes
  for (let i = 0; i < 800; i++) {
    const ang = r() * Math.PI * 2;
    const d = Math.sqrt(r());
    addLeaf(ENV.cx + Math.cos(ang) * d * (ENV.rx - 10), ENV.cy + Math.sin(ang) * d * (ENV.ry - 10), 30, 0);
  }

  // Apples hang inside foliage clumps
  const reserved = [[500, 118], [255, 215], [745, 215], [150, 400], [850, 400]];
  const apples: Apple[] = [];
  const pool = clumps.filter((c) => c.y > 150 && c.y < 520);
  let guard = 0;
  while (apples.length < 38 && guard++ < 900) {
    const c = pool[Math.floor(r() * pool.length)];
    const x = c.x + (r() - 0.5) * c.rad * 1.1;
    const y = c.y + r() * c.rad * 0.5;
    if (reserved.some(([rx, ry]) => (rx - x) ** 2 + (ry - y) ** 2 < 80 ** 2)) continue;
    if (apples.some((a) => (a.x - x) ** 2 + (a.y - y) ** 2 < 52 ** 2)) continue;
    apples.push({ x, y, s: 0.66 + r() * 0.3, rot: (r() - 0.5) * 34, tone: r(), delay: 0.4 + r() * 1 });
  }

  // Grass: fine, layered, uneven blades
  const mk = (n: number, lo: number, hi: number, cols: string[], spread: number) => {
    const out: Blade[] = [];
    for (let i = 0; i < n; i++) {
      const u = (r() + r() + r()) / 3; // cluster toward the middle
      const x = 500 + (u - 0.5) * 2 * spread;
      const edge = Math.abs(x - 500) / spread;
      const y = 848 + (r() - 0.3) * 10 + edge * 4;
      const h = (lo + r() * (hi - lo)) * (1 - edge * 0.45);
      const lean = (r() - 0.5) * 16;
      const w = 1.1 + r() * 1.3;
      out.push({
        d: `M${f(x)} ${f(y)} Q${f(x + lean * 0.35)} ${f(y - h * 0.6)} ${f(x + lean)} ${f(y - h)} Q${f(x + lean * 0.4 + w)} ${f(y - h * 0.55)} ${f(x + w)} ${f(y)} Z`,
        fill: cols[Math.floor(r() * cols.length)],
      });
    }
    return out;
  };
  const bladesBack = mk(230, 12, 30, ['#35591F', '#436B24', '#4F7A2A'], 330);
  const bladesFront = mk(190, 10, 26, ['#5A8A30', '#6B9A36', '#7FAA42', '#4A7A28'], 300);

  return { trunk, limbs, passes, apples, bladesBack, bladesFront };
}

export const TREE = build();
