/**
 * Single source of truth for all editable content.
 * Items flagged `confirm: true` must be verified by the schools before publishing.
 */

const u = (id: string, w = 1200, h?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=75`;

/** Illustrative stock photography. Swap `id` for real campus photos (any URL via `src`). */
export const PHOTOS = {
  play: { id: '1502086223501-7ea6ecd79368', alt: 'Children leaping to catch a ball in a green park' },
  paint: { id: '1503454537195-1dcabb73ffb9', alt: 'Laughing girl with colourful paint on her face' },
  camera: { id: '1516627145497-ae6968895b74', alt: 'Toddler holding a toy camera' },
  art: { id: '1596464716127-f2a82984de30', alt: 'Child painting stones with markers and watercolours' },
  blocks: { id: '1587654780291-39c9404d746b', alt: 'Colourful building blocks' },
  laugh: { id: '1472162072942-cd5147eb3902', alt: 'Boy laughing with a book on a wooden bench' },
  write: { id: '1560785496-3c9d27877182', alt: 'Boy writing with a pencil at a wooden table' },
  class: { id: '1588072432836-e10032774350', alt: 'Child drawing at a busy classroom table' },
  reading: { id: '1544776193-352d25ca82cd', alt: 'Young girl reading together with a teacher' },
  wow: { id: '1485546246426-74dc88dec4d9', alt: 'Surprised little boy holding an open book' },
  apple: { id: '1503676260728-1c00da094a0b', alt: 'Red apple on a stack of books with coloured pencils' },
  slide: { id: '1575783970733-1aaedde1db74', alt: 'Colourful playground slide under a blue sky' },
} as const;

export type PhotoKey = keyof typeof PHOTOS;
export const photo = (k: PhotoKey, w = 1200, h?: number) => u(PHOTOS[k].id, w, h);
export const photoAlt = (k: PhotoKey) => PHOTOS[k].alt;

export type SchoolId = 'apple-play-school' | 'appletree-play-school';

export interface School {
  id: SchoolId;
  name: string;
  short: string;
  area: string;
  address: string;
  postal: string;
  logo: string;
  tagline: string;
  role: string;
  historyBadge: string;
  intro: string;
  hero: PhotoKey;
  secondary: PhotoKey;
  gallery: PhotoKey[];
  activities: string[];
  mapsUrl: string;
  embedUrl: string;
  rating?: { score: number; reviews: number; source: string };
}

export const BRAND_STORY = {
  years: 13,
  headline: 'From the Tree, the Apple Blossoms.',
  subheadline: '13+ Years of Proven Early Education Experience in Nizamabad',
  shortStory:
    'Appletree Play School was established first on Yellama Gutta Road. Over 13 years, it built deep roots of trust and excellence. Just as an apple is produced from the tree, Apple Play School was born to extend that 13-year heritage to Gangasthan.',
};

export const SCHOOLS: Record<SchoolId, School> = {
  'appletree-play-school': {
    id: 'appletree-play-school',
    name: 'Appletree Play School',
    short: 'Appletree',
    area: 'Yellama Gutta Road',
    address: '5-11-726, Yellama Gutta Road, Nizamabad, Telangana',
    postal: '503001',
    logo: '/logos/appletree-play-school-logo.png',
    tagline: 'The Foundation. 13+ Years of Deep Roots.',
    role: 'Established First • 13+ Years Experience',
    historyBadge: 'The Root Campus (13+ Yrs)',
    intro:
      'Established first with 13+ years of experience in early childhood education. This is where our journey began on Yellama Gutta Road, nurturing generations of curious children.',
    hero: 'play',
    secondary: 'slide',
    gallery: ['camera', 'art', 'reading', 'write'],
    activities: ['Garden play', 'Puzzles', 'Craft', 'Songs'],
    mapsUrl: 'https://maps.google.com/?q=5-11-726,+Yellama+Gutta+Road,+Nizamabad,+Telangana',
    embedUrl:
      'https://www.google.com/maps?q=5-11-726,Yellama+Gutta+Road,Nizamabad,Telangana&output=embed',
    rating: { score: 4.6, reviews: 5, source: 'Google' },
  },
  'apple-play-school': {
    id: 'apple-play-school',
    name: 'Apple Play School',
    short: 'Apple',
    area: 'Gangasthan',
    address: 'Behind Murali Krishna Mandir, Gangasthan, Nizamabad, Telangana',
    postal: '503002',
    logo: '/logos/apple-play-school-logo.png',
    tagline: 'Born from the Tree. Carrying 13 Years of Love.',
    role: 'Blossomed from Appletree • Gangasthan Campus',
    historyBadge: 'The Fruit of 13 Yrs Legacy',
    intro:
      'Just like an apple is produced from the tree, Apple Play School was born from the 13-year foundation of Appletree to bring our trusted warmth and play-based learning to Gangasthan.',
    hero: 'apple',
    secondary: 'laugh',
    gallery: ['paint', 'blocks', 'wow', 'class'],
    activities: ['Block play', 'Story circle', 'Painting', 'Rhymes'],
    mapsUrl: 'https://maps.google.com/?q=M4V9%2B2GM+Nizamabad+Telangana',
    embedUrl: 'https://www.google.com/maps?q=M4V9%2B2GM,Nizamabad,Telangana&output=embed',
  },
};

export const STAGES = [
  { id: 'playgroup', name: 'Playgroup', age: '1.5 – 2.5 yrs', line: 'First friends, songs and sensory play.', confirm: true },
  { id: 'nursery', name: 'Nursery', age: '2.5 – 3.5 yrs', line: 'Words, colours and curious hands.', confirm: true },
  { id: 'lkg', name: 'LKG', age: '3.5 – 4.5 yrs', line: 'Letters, numbers and big questions.', confirm: true },
  { id: 'ukg', name: 'UKG', age: '4.5 – 5.5 yrs', line: 'Confident readers, ready for Grade 1.', confirm: true },
];

export const LEARNING = [
  { id: 'play', title: 'Play-based learning', line: 'Questions begin where play does.', img: 'play' as PhotoKey },
  { id: 'create', title: 'Creativity', line: 'Messy hands. Brave ideas.', img: 'art' as PhotoKey },
  { id: 'explore', title: 'Exploration', line: 'Every corner is a discovery.', img: 'camera' as PhotoKey },
  { id: 'social', title: 'Social interaction', line: 'Sharing, listening, belonging.', img: 'reading' as PhotoKey },
  { id: 'early', title: 'Early learning', line: 'Strong foundations, gently built.', img: 'write' as PhotoKey },
];

export const WHY = [
  '13+ years of experience.',
  'Learning through play.',
  'Deep roots, happy branches.',
  'From Tree to Apple.',
];

export const GALLERY: { key: PhotoKey; span: 'tall' | 'wide' | 'square'; caption: string }[] = [
  { key: 'paint', span: 'tall', caption: 'Colour everywhere' },
  { key: 'play', span: 'wide', caption: 'Outdoor joy' },
  { key: 'camera', span: 'square', caption: 'Little explorers' },
  { key: 'art', span: 'square', caption: 'Art table' },
  { key: 'laugh', span: 'tall', caption: 'Story time giggles' },
  { key: 'blocks', span: 'wide', caption: 'Building worlds' },
  { key: 'reading', span: 'square', caption: 'Reading together' },
  { key: 'wow', span: 'tall', caption: 'Wide-eyed wonder' },
  { key: 'class', span: 'wide', caption: 'Classroom focus' },
];

export const CAMPUS_OPTIONS = [
  { value: 'apple-play-school', label: 'Apple', sub: 'Gangasthan' },
  { value: 'appletree-play-school', label: 'Appletree', sub: 'Yellama Gutta Rd' },
  { value: 'not-sure', label: 'Not sure yet', sub: 'Help me choose' },
] as const;

export const AGE_OPTIONS = ['Under 2', '2 – 3', '3 – 4', '4 – 5', '5+'];

/** Add verified social URLs here; the footer renders whatever is present. */
export const SOCIALS: { label: string; href: string }[] = [];

/** Optional: POST endpoint (Formspree, Getform, own API). Set VITE_ENQUIRY_ENDPOINT in .env */
export const ENQUIRY_ENDPOINT: string | undefined = import.meta.env.VITE_ENQUIRY_ENDPOINT;
