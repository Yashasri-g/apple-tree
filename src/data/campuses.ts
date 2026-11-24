/**
 * Configurable Campus Data Structure for the Central Tree Gateway
 * Maps each school branch to exact coordinates on the custom vector apple tree.
 */

export interface Campus {
  id: string;
  name: string;
  shortName: string;
  branchName: string;
  location: string;
  area: string;
  route: string;
  status: 'active' | 'coming-soon';
  tag: string;
  rating?: { score: number; reviews: number; source: string };
  badgeText: string;
  description: string;
  applePosition: {
    x: number;
    y: number;
  };
  accentColor: string;
  glowColor: string;
}

export const CAMPUSES: Campus[] = [
  {
    id: 'appletree-school',
    name: 'AppleTree School',
    shortName: 'AppleTree',
    branchName: 'Foundation Campus',
    area: 'Yellama Gutta Road',
    location: '5-11-726, Yellama Gutta Road, Nizamabad, Telangana – 503001',
    route: '/schools/appletree-school',
    status: 'active',
    tag: 'Foundation Campus • 13+ Yrs',
    rating: { score: 4.6, reviews: 5, source: 'Google' },
    badgeText: 'Root Campus • 13+ Yrs',
    description:
      'Where our journey began 13+ years ago on Yellama Gutta Road. Deep roots, seasoned educators, and generations of happy toddlers.',
    applePosition: { x: 36, y: 41 }, // Left foundational bough
    accentColor: '#285B40',
    glowColor: '#75B86A',
  },
  {
    id: 'apple-school-pragathi-nagar',
    name: 'Apple School - Pragathi Nagar Branch',
    shortName: 'Apple School',
    branchName: 'Pragathi Nagar Branch',
    area: 'Pragathi Nagar / Gangasthan',
    location: 'Behind Murali Krishna Mandir, Pragathi Nagar / Gangasthan, Nizamabad, Telangana – 503002',
    route: '/schools/apple-school-pragathi-nagar',
    status: 'active',
    tag: 'Blossomed Sister Branch',
    rating: { score: 4.8, reviews: 12, source: 'Parent Reviews' },
    badgeText: 'Blossomed from the Tree',
    description:
      'Like an apple produced from the tree, carrying our trusted 13-year educational excellence and warmth to Pragathi Nagar.',
    applePosition: { x: 64, y: 41 }, // Right prominent glowing apple
    accentColor: '#F45B65',
    glowColor: '#FF8E9B',
  },
  {
    id: 'apple-school-kamareddy',
    name: 'Apple School - Kamareddy Branch',
    shortName: 'Kamareddy Branch',
    branchName: 'Kamareddy Branch',
    area: 'Kamareddy District',
    location: 'Central Expansion Zone, Kamareddy, Telangana – 503111',
    route: '/schools/apple-school-kamareddy',
    status: 'coming-soon',
    tag: 'Regional Expansion',
    badgeText: 'Coming Soon',
    description:
      'A new chapter of joyful early learning is unfolding in Kamareddy. Backed by our 13-year central Montessori curriculum.',
    applePosition: { x: 50, y: 24 }, // Top crown apple
    accentColor: '#059669',
    glowColor: '#34D399',
  },
  {
    id: 'apple-school-armoor',
    name: 'Apple School - Armoor Branch',
    shortName: 'Armoor Branch',
    branchName: 'Armoor Branch',
    area: 'Armoor Corridor',
    location: 'Main Corridor Expansion Area, Armoor, Nizamabad District, Telangana – 503224',
    route: '/schools/apple-school-armoor',
    status: 'coming-soon',
    tag: 'New Branch Expansion',
    badgeText: 'Coming Soon',
    description:
      'Expanding our branches to Armoor! Certified early educators and a modern play-based campus opening soon.',
    applePosition: { x: 74.5, y: 52 }, // Outer right bough apple
    accentColor: '#D97706',
    glowColor: '#FBBF24',
  },
  {
    id: 'apple-school-vinayaka-nagar',
    name: 'Apple School - Vinayaka Nagar Branch',
    shortName: 'Vinayaka Nagar Branch',
    branchName: 'Vinayaka Nagar Branch',
    area: 'Vinayaka Nagar',
    location: 'Vinayaka Nagar Main Road, Nizamabad, Telangana – 503001',
    route: '/schools/apple-school-vinayaka-nagar',
    status: 'coming-soon',
    tag: 'Neighborhood Branch',
    badgeText: 'Coming Soon',
    description:
      'A loving, playful neighborhood sanctuary coming to Vinayaka Nagar, Nizamabad. Safe, close to home, and full of joy.',
    applePosition: { x: 25.5, y: 52 }, // Upper left bough apple
    accentColor: '#7C3AED',
    glowColor: '#A78BFA',
  },
];
