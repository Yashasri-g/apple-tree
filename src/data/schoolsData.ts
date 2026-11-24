/**
 * Isolated Data Models for Independent School Sites
 * Each school sits like an individual site with no mixture of information.
 */

export type SchoolBranchId =
  | 'appletree-school'
  | 'apple-school-pragathi-nagar'
  | 'apple-school-armoor'
  | 'apple-school-kamareddy'
  | 'apple-school-vinayaka-nagar';

export interface ClassOffering {
  id: string;
  name: string;
  ageGroup: string;
  timings: string;
  badge: string;
  description: string;
  activities: string[];
  focusAreas: string[];
}

export interface EducationPillar {
  title: string;
  subtitle: string;
  description: string;
  icon: 'brain' | 'sparkles' | 'heart' | 'shield' | 'palette' | 'blocks';
  highlights: string[];
}

export interface StaffMember {
  name: string;
  role: string;
  experience: string;
  qualification: string;
  bio: string;
  image?: string;
  gender: 'female' | 'male';
}

export interface SchoolFacility {
  name: string;
  description: string;
  icon: string;
}

export interface SchoolSiteData {
  id: SchoolBranchId;
  aliases: string[];
  name: string;
  shortName: string;
  branchName: string;
  logo: string;
  status: 'active' | 'coming-soon';
  establishedYear?: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heritageBadge: string;
  rating?: { score: number; reviews: number; source: string };
  contact: {
    address: string;
    landmark: string;
    area: string;
    city: string;
    postal: string;
    phone: string;
    email: string;
    mapsUrl: string;
    embedUrl: string;
  };
  theme: {
    primaryColor: string;
    accentColor: string;
    softBg: string;
    darkBg: string;
    borderGlow: string;
  };
  classes: ClassOffering[];
  educationPillars: EducationPillar[];
  staff: StaffMember[];
  facilities: SchoolFacility[];
  galleryImages: { url: string; title: string; category: string }[];
  aboutStory: {
    headline: string;
    paragraphs: string[];
    keyPoints: string[];
  };
}

export const SCHOOLS_DATA: Record<SchoolBranchId, SchoolSiteData> = {
  // =========================================================================
  // 1. APPLETREE SCHOOL (FOUNDATION CAMPUS - 13+ YEARS)
  // =========================================================================
  'appletree-school': {
    id: 'appletree-school',
    aliases: ['appletree-play-school', 'appletree'],
    name: 'AppleTree School',
    shortName: 'AppleTree',
    branchName: 'Foundation Campus',
    logo: '/logos/appletree-play-school-logo.png',
    status: 'active',
    establishedYear: '2013 (13+ Years Legacy)',
    tagline: 'The Foundation. 13+ Years of Deep Roots and Joyful Learning.',
    heroHeadline: 'Where 13+ Years of Love, Play & Curiosity Flourish.',
    heroSubheadline:
      'The foundational campus of AppleTree School on Yellama Gutta Road. Rooted in child-first safety, verified 4.6★ parental trust, and experienced educators who treat every toddler like family.',
    heritageBadge: 'Root Campus • 13+ Yrs Heritage',
    rating: { score: 4.6, reviews: 5, source: 'Google Verified' },
    contact: {
      address: '5-11-726, Yellama Gutta Road, Nizamabad, Telangana – 503001',
      landmark: 'Near Yellama Gutta Road Junction',
      area: 'Yellama Gutta Road',
      city: 'Nizamabad',
      postal: '503001',
      phone: '+91 94408 81234',
      email: 'admissions@appletreeschool.in',
      mapsUrl: 'https://maps.google.com/?q=5-11-726,+Yellama+Gutta+Road,+Nizamabad,+Telangana',
      embedUrl:
        'https://www.google.com/maps?q=5-11-726,Yellama+Gutta+Road,Nizamabad,Telangana&output=embed',
    },
    theme: {
      primaryColor: '#285B40',
      accentColor: '#75B86A',
      softBg: '#F3F9F1',
      darkBg: '#1B4021',
      borderGlow: 'rgba(117, 184, 106, 0.4)',
    },
    classes: [
      {
        id: 'playgroup',
        name: 'Playgroup (Toddler Explorers)',
        ageGroup: '1.5 – 2.5 Years',
        timings: '9:00 AM – 12:00 PM',
        badge: 'First Steps Away from Home',
        description:
          'A warm, loving introduction to social play. Children build fine motor grip, enjoy sensory bins, sing nursery rhymes, and gently adapt to a school routine.',
        activities: [
          'Sensory play with textured blocks & sand',
          'Rhyme circle & musical movement',
          'Gentle potty training & handwashing routines',
          'Finger painting & tactile crafts',
        ],
        focusAreas: ['Social Comfort', 'Motor Coordination', 'Speech Initiation', 'Emotional Security'],
      },
      {
        id: 'nursery',
        name: 'Nursery (Curious Discoverers)',
        ageGroup: '2.5 – 3.5 Years',
        timings: '9:00 AM – 12:30 PM',
        badge: 'Vocabulary & Sensorial Discovery',
        description:
          'Explosive language and concept growth. Children explore colors, shapes, conversational English, storytelling, and self-expression through guided Montessori materials.',
        activities: [
          'Interactive storybook sessions',
          'Montessori cylinder blocks & shape sorters',
          'Outdoor grass play & obstacle balance',
          'Basic numeracy & color sorting games',
        ],
        focusAreas: ['Vocabulary Expansion', 'Color & Shape Mastery', 'Fine Motor Control', 'Sharing & Manners'],
      },
      {
        id: 'lkg',
        name: 'LKG (Lower Kindergarten)',
        ageGroup: '3.5 – 4.5 Years',
        timings: '9:00 AM – 1:00 PM',
        badge: 'Phonics & Numeracy Foundations',
        description:
          'Structured yet playful learning. We introduce synthetic phonics (letter sounds), quantitative number sense (1 to 20), logical sequencing, and creative problem solving.',
        activities: [
          'Jolly Phonics letter sound recognition',
          'Number counting beads & quantity matching',
          'Science discovery: plants, weather & animals',
          'Art, paper folding & scissor safety skills',
        ],
        focusAreas: ['Phonics Reading', 'Pre-Math Logic', 'Curiosity & Inquiry', 'Independence'],
      },
      {
        id: 'ukg',
        name: 'UKG (Upper Kindergarten)',
        ageGroup: '4.5 – 5.5 Years',
        timings: '9:00 AM – 1:30 PM',
        badge: 'Grade 1 Readiness & Fluency',
        description:
          'Preparing confident, expressive leaders. Graduating students write three-letter words, read simple readers, understand addition concepts, and present confidently on stage.',
        activities: [
          'Sight word reading & sentence writing',
          'Hands-on addition & subtraction concepts',
          'Show-and-tell & stage speaking confidence',
          'General awareness & environmental science',
        ],
        focusAreas: ['Reading Fluency', 'Math Foundations', 'Stage Confidence', 'Primary School Ready'],
      },
      {
        id: 'daycare',
        name: 'Extended Daycare & Activity Club',
        ageGroup: '1.5 – 8.0 Years',
        timings: '12:30 PM – 6:30 PM',
        badge: 'Supervised Love & Homework Care',
        description:
          'Safe, motherly after-school care for working parents. Includes healthy home-style meals, peaceful nap cots, guided homework help, and indoor recreational play.',
        activities: [
          'Nutritious evening snacks & fruit breaks',
          'Peaceful nap room with individual cots',
          'Lego construction & board puzzles',
          'Teacher-assisted homework completion',
        ],
        focusAreas: ['Homelike Warmth', 'Safety & Hygiene', 'Productive Evenings', 'Parent Peace of Mind'],
      },
    ],
    educationPillars: [
      {
        title: 'Montessori & Experiential Blend',
        subtitle: 'Hands-on Learning Through Doing',
        description:
          'Children do not sit passively at desks. They manipulate authentic wooden Montessori apparatus, explore sensory materials, and understand abstract concepts concretely.',
        icon: 'blocks',
        highlights: [
          'Self-correcting learning apparatus',
          'Freedom of choice within structured bounds',
          'Focus on concentration and intrinsic motivation',
        ],
      },
      {
        title: 'Structured Synthetic Phonics',
        subtitle: 'Reading with Joy and Accuracy',
        description:
          'Rather than rote alphabet memorization, we teach 42 phonics sounds, blending, and digraphs. Children decode unfamiliar words independently by age 4.5.',
        icon: 'brain',
        highlights: [
          'Multi-sensory sound actions & jingles',
          'Daily interactive library storytelling',
          'Confident conversational English immersion',
        ],
      },
      {
        title: 'Total Emotional & Safety Sanctuary',
        subtitle: 'Safe, Clean & Nurturing Environment',
        description:
          'Every classroom is 100% child-proofed with rounded wooden corners, non-toxic colors, 24/7 CCTV surveillance, and dedicated female attendants trained in pediatric first aid.',
        icon: 'shield',
        highlights: [
          'Full-facility CCTV monitored continuously',
          'Strict verified guardian pickup ID system',
          'Daily multi-step sanitization & purified water',
        ],
      },
      {
        title: '13+ Years Pedagogy Foundation',
        subtitle: 'Tested, Proven Early Childhood Excellence',
        description:
          'For over a decade, AppleTree has nurtured thousands of toddlers into top-ranking primary school students in Nizamabad. Our seasoned syllabus is constantly refined.',
        icon: 'heart',
        highlights: [
          'Alumni thriving in premier ICSE & CBSE schools',
          'Annual sports days and cultural stage festivals',
          'Quarterly detailed child developmental portfolios',
        ],
      },
    ],
    staff: [
      {
        name: 'Mrs. S. Radhika',
        role: 'Headmistress & Early Education Director',
        experience: '14+ Years in Montessori Pedagogy',
        qualification: 'M.Ed., Certified AMI Montessori Early Childhood Diplomat',
        bio: 'Leading AppleTree since its inception, Radhika has trained over 50 educators and personally nurtured more than 1,200 toddlers with motherly warmth.',
        gender: 'female',
      },
      {
        name: 'Ms. K. Manasa',
        role: 'Lead Kindergarten & Phonics Educator',
        experience: '8 Years at AppleTree',
        qualification: 'B.Ed., Jolly Phonics Certified Trainer',
        bio: 'Specializes in converting shy toddlers into expressive, fluent readers. Known for her creative drama-based storytelling circles.',
        gender: 'female',
      },
      {
        name: 'Mrs. P. Vani',
        role: 'Senior Nursery & Toddler Care Specialist',
        experience: '10 Years at AppleTree',
        qualification: 'Diploma in Early Childhood Education (DECE)',
        bio: 'The heart of our toddler adaptation program. Children settle within their first week under her soothing, patient care.',
        gender: 'female',
      },
      {
        name: 'Ms. T. Anitha',
        role: 'Creative Arts & Motor Skills Coordinator',
        experience: '6 Years Early Education',
        qualification: 'B.A., Fine Arts & Child Psychology Certification',
        bio: 'Conducts daily sensory art, clay sculpting, and physical agility activities designed to build bilateral coordination and fine motor strength.',
        gender: 'female',
      },
    ],
    facilities: [
      {
        name: 'Natural Outdoor Play Lawn',
        description: 'Safe rubber-padded green lawn with swings, spiral slides, and balance beams.',
        icon: 'Trees',
      },
      {
        name: 'Montessori Activity Lab',
        description: 'Over 150 tactile wooden educational tools for math, sensorial, and language.',
        icon: 'Shapes',
      },
      {
        name: 'Audio-Visual Story Theater',
        description: 'Smart projector room for phonics songs, animated nature documentaries, and dance.',
        icon: 'Tv',
      },
      {
        name: 'Hygienic Dining & Rest Haven',
        description: 'Supervised dining area teaching table etiquette, plus clean cots for afternoon rest.',
        icon: 'Coffee',
      },
    ],
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80', title: 'Outdoor Lawn Play', category: 'Play' },
      { url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80', title: 'Creative Painting Circle', category: 'Art' },
      { url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80', title: 'Montessori Block Construction', category: 'Learning' },
      { url: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?auto=format&fit=crop&w=800&q=80', title: 'Guided Story Reading', category: 'Phonics' },
      { url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80', title: 'Classroom Activity Tables', category: 'Class' },
      { url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80', title: 'Little Explorers Day', category: 'Events' },
    ],
    aboutStory: {
      headline: 'Thirteen Years of Rooted Trust on Yellama Gutta Road',
      paragraphs: [
        'In 2013, AppleTree School opened its doors on Yellama Gutta Road with a simple, profound dream: to give Nizamabad families an early education center that prioritizes joy, warmth, and unhurried child development.',
        'Over the past 13+ years, AppleTree has grown into the educational root of hundreds of families. Parents who brought their eldest children a decade ago now bring their younger siblings with the same unshakeable trust.',
        'As our central trunk grew strong, our curriculum and educators established the gold standard for early childhood pedagogy in Nizamabad. Today, AppleTree stands tall as our foundational mother campus.',
      ],
      keyPoints: [
        'Over 1,500 happy alumni successfully transitioned to leading primary schools.',
        'Zero-stress, play-based Montessori framework that builds genuine love for learning.',
        'Consistent 4.6★ parent rating on Google based on real family feedback.',
      ],
    },
  },

  // =========================================================================
  // 2. APPLE SCHOOL - PRAGATHI NAGAR BRANCH (ACTIVE BRANCH)
  // =========================================================================
  'apple-school-pragathi-nagar': {
    id: 'apple-school-pragathi-nagar',
    aliases: ['apple-play-school', 'apple-school', 'pragathi-nagar'],
    name: 'Apple School - Pragathi Nagar Branch',
    shortName: 'Apple School',
    branchName: 'Pragathi Nagar Branch',
    logo: '/logos/apple-play-school-logo.png',
    status: 'active',
    establishedYear: 'Carrying 13+ Years Heritage',
    tagline: 'Born from the Tree. Carrying 13 Years of Excellence to Pragathi Nagar.',
    heroHeadline: 'Joyful Play, Bright Minds & Loving Care in Pragathi Nagar.',
    heroSubheadline:
      'Like an apple produced from the tree, Apple School blossomed from our trusted 13-year foundation to light up Pragathi Nagar (Gangasthan). Offering modern play spaces, experiential learning, and certified preschool care.',
    heritageBadge: 'Blossomed Sister Campus • 13 Yrs Pedagogy',
    rating: { score: 4.8, reviews: 12, source: 'Parent Reviews' },
    contact: {
      address: 'Behind Murali Krishna Mandir, Pragathi Nagar / Gangasthan, Nizamabad, Telangana – 503002',
      landmark: 'Behind Murali Krishna Mandir',
      area: 'Pragathi Nagar / Gangasthan',
      city: 'Nizamabad',
      postal: '503002',
      phone: '+91 94408 85678',
      email: 'pragathinagar@appleschool.in',
      mapsUrl: 'https://maps.google.com/?q=M4V9%2B2GM+Nizamabad+Telangana',
      embedUrl:
        'https://www.google.com/maps?q=M4V9%2B2GM,Nizamabad,Telangana&output=embed',
    },
    theme: {
      primaryColor: '#D9333F',
      accentColor: '#F45B65',
      softBg: '#FFF5F6',
      darkBg: '#8A1721',
      borderGlow: 'rgba(244, 91, 101, 0.4)',
    },
    classes: [
      {
        id: 'playgroup-pragathi',
        name: 'Playgroup (Apple Seedlings)',
        ageGroup: '1.5 – 2.5 Years',
        timings: '9:15 AM – 12:15 PM',
        badge: 'Gentle Transition & Playful Wonder',
        description:
          'Designed for tiny tots stepping out into the world. Soft play equipment, nursery rhyme singalongs, sensory clay work, and loving teacher hugs.',
        activities: [
          'Soft-play ball pool & balance mats',
          'Animal sounds & rhythm clap games',
          'Tactile water & kinetic sand tables',
          'Guided fruit tasting & healthy eating habits',
        ],
        focusAreas: ['Separation Ease', 'Sensory Delight', 'First Words', 'Happy Socializing'],
      },
      {
        id: 'nursery-pragathi',
        name: 'Nursery (Apple Blossoms)',
        ageGroup: '2.5 – 3.5 Years',
        timings: '9:00 AM – 12:30 PM',
        badge: 'Curious Talkers & Creative Hands',
        description:
          'Channeling endless energy into joyful discovery. Children learn conversational English, color recognition, finger painting, and fine motor dexterity.',
        activities: [
          'Puppet storytelling & role play',
          'Pegboard patterns & color matching',
          'Mini indoor jungle gym agility',
          'Alphabet phonics flashcard games',
        ],
        focusAreas: ['Expressive Speech', 'Pattern Recognition', 'Hand-Eye Coordination', 'Group Participation'],
      },
      {
        id: 'lkg-pragathi',
        name: 'LKG (Bright Apples)',
        ageGroup: '3.5 – 4.5 Years',
        timings: '9:00 AM – 1:00 PM',
        badge: 'Reading Sounds & Number Play',
        description:
          'Active, inquiry-based kindergarten. Children master alphabet phonetic sounds, practice stroke-based pre-writing, count up to 30, and explore plant life.',
        activities: [
          'Daily Phonics sound blending',
          'Number counting beads & dominoes',
          'Gardening & green thumb discovery',
          'Clay molding & theme craft projects',
        ],
        focusAreas: ['Phonic Reading', 'Number Sense', 'Creative Thinking', 'Task Completion'],
      },
      {
        id: 'ukg-pragathi',
        name: 'UKG (Young Scholars)',
        ageGroup: '4.5 – 5.5 Years',
        timings: '9:00 AM – 1:30 PM',
        badge: 'Primary Ready & Confident Leaders',
        description:
          'Comprehensive readiness for primary school. Children write short sentences, solve mental math puzzles, speak confidently, and enjoy collaborative team games.',
        activities: [
          'Sight word mastery & story reading',
          'Simple addition & subtraction with toys',
          'Annual stage skits & recitation',
          'Science experiments: sink vs float, magnets',
        ],
        focusAreas: ['Independent Reading', 'Math Logic', 'Stage Eloquence', 'Primary School Success'],
      },
    ],
    educationPillars: [
      {
        title: 'Activity-Centric Play-Way Learning',
        subtitle: 'Learning Feels Like Pure Play',
        description:
          'Every concept is embedded in a game, puzzle, or song. Children learn counting through supermarket role-play and science through planting seeds in the garden.',
        icon: 'sparkles',
        highlights: [
          'Theme-based monthly immersive modules',
          'Interactive role-playing corner (kitchen, doctor, store)',
          'Daily musical movement and rhythm drills',
        ],
      },
      {
        title: 'Central 13-Year Pedagogical Umbrella',
        subtitle: 'Backed by Nizamabad’s Most Trusted Curriculum',
        description:
          'Apple School Pragathi Nagar operates on the exact curriculum, teacher training standards, and safety rubrics perfected over 13+ years by AppleTree School.',
        icon: 'brain',
        highlights: [
          'Centrally audited academic milestones',
          'Unified teacher training and evaluation',
          'High benchmark of emotional and cognitive care',
        ],
      },
      {
        title: 'Modern Child-Centric Infrastructure',
        subtitle: 'Vibrant, Sunlit Classrooms in Pragathi Nagar',
        description:
          'Located in a peaceful residential pocket behind Murali Krishna Mandir, away from highway noise, featuring air-cooled rooms, clean play mats, and round-the-clock security.',
        icon: 'shield',
        highlights: [
          '100% CCTV monitored indoor and outdoor areas',
          'Non-toxic antibacterial classroom surfaces',
          'Dedicated female security and nanny staff',
        ],
      },
      {
        title: 'Parent Partnership & Real-Time Updates',
        subtitle: 'Transparency and Close Communication',
        description:
          'We believe early childhood growth is a shared journey between home and school. Parents receive photo updates, weekly progress diaries, and open teacher dialogue.',
        icon: 'heart',
        highlights: [
          'Monthly parent-teacher interactive coffee meets',
          'Digital photo highlights of classroom activities',
          'Personalized developmental milestone tracking',
        ],
      },
    ],
    staff: [
      {
        name: 'Mrs. M. Lavanya',
        role: 'Branch Head & Academic Incharge',
        experience: '9+ Years in Early Childhood Pedagogy',
        qualification: 'M.Sc. Child Psychology, B.Ed.',
        bio: 'Brings deep passion for child development and positive discipline. Dedicated to making every child feel cherished and capable.',
        gender: 'female',
      },
      {
        name: 'Ms. B. Priyanka',
        role: 'Senior Kindergarten & Speech Mentor',
        experience: '7 Years Experience',
        qualification: 'B.A. Literature, Early Childhood Diplomat',
        bio: 'Master of interactive storytelling and English phonetics. Transforms classroom lessons into theatrical adventures.',
        gender: 'female',
      },
      {
        name: 'Mrs. G. Sujatha',
        role: 'Toddler Care Specialist & Nursery Teacher',
        experience: '6 Years Experience',
        qualification: 'Montessori Early Years Certified',
        bio: 'Renowned among parents for her gentle, patient demeanor and unmatched ability to soothe first-time schoolgoers.',
        gender: 'female',
      },
      {
        name: 'Ms. D. Harika',
        role: 'Activity & Sensory Play Facilitator',
        experience: '5 Years Experience',
        qualification: 'B.Sc., Child Health & Nutrition Certified',
        bio: 'Coordinates kinesthetic learning games, balance obstacle tracks, and fun sensory nutrition workshops for preschoolers.',
        gender: 'female',
      },
    ],
    facilities: [
      {
        name: 'Sunlit Colorful Playrooms',
        description: 'Brightly lit, cheerful rooms with soft foam flooring, low wooden shelves, and child-height tables.',
        icon: 'Sun',
      },
      {
        name: 'Interactive Role-Play Arena',
        description: 'Equipped with mini kitchen, market counter, dress-up costumes, and puppet stage.',
        icon: 'Smile',
      },
      {
        name: 'Outdoor Toddler Splash & Sand Yard',
        description: 'Supervised water tables and sanitized white sand pit for sensory discovery.',
        icon: 'Waves',
      },
      {
        name: 'Safe Parent Waiting Lounge & CCTV Hub',
        description: 'Comfortable air-conditioned reception area for visiting parents with CCTV preview.',
        icon: 'Shield',
      },
    ],
    galleryImages: [
      { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80', title: 'Story Circle Time', category: 'Learning' },
      { url: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=800&q=80', title: 'Playful Laughter & Games', category: 'Play' },
      { url: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=800&q=80', title: 'Hands-on Color Painting', category: 'Art' },
      { url: 'https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=800&q=80', title: 'Stroke Pre-Writing Practice', category: 'Writing' },
      { url: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?auto=format&fit=crop&w=800&q=80', title: 'Garden Slide & Turf Play', category: 'Outdoors' },
      { url: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=800&q=80', title: 'Wonder in the Library Nook', category: 'Reading' },
    ],
    aboutStory: {
      headline: 'A Beautiful Blossom on the Nizamabad Tree of Education',
      paragraphs: [
        'For over a decade, families from Pragathi Nagar, Gangasthan, and surrounding neighborhoods traveled across town to send their little ones to AppleTree School on Yellama Gutta Road.',
        'To bring that same beloved 13-year warmth, proven play-based Montessori syllabus, and rigorous safety standards closer to home, Apple School was established right here in Pragathi Nagar.',
        'Today, our Pragathi Nagar campus thrives with joyful chatter, certified teachers, and vibrant classrooms designed specifically for early childhood discovery.',
      ],
      keyPoints: [
        'Close to home for Pragathi Nagar, Gangasthan, and Subhash Nagar families.',
        'Identical high standards of pedagogy, safety, and care backed by 13+ years heritage.',
        'High parent satisfaction with active parent-teacher collaborative community.',
      ],
    },
  },

  // =========================================================================
  // 3. APPLE SCHOOL - ARMOOR BRANCH (COMING SOON)
  // =========================================================================
  'apple-school-armoor': {
    id: 'apple-school-armoor',
    aliases: ['armoor-branch', 'armoor'],
    name: 'Apple School - Armoor Branch',
    shortName: 'Apple School',
    branchName: 'Armoor Branch',
    logo: '/logos/apple-play-school-logo.png',
    status: 'coming-soon',
    tagline: 'Bringing 13+ Years of Early Childhood Excellence to Armoor.',
    heroHeadline: 'Apple School is Coming Soon to Armoor!',
    heroSubheadline:
      'We are expanding our branches! Families in Armoor will soon enjoy our trusted 13-year play-based early education, certified Montessori educators, and child-safe campus right in town.',
    heritageBadge: 'New Branch Expansion • Coming Soon',
    contact: {
      address: 'Main Corridor Expansion Area, Armoor, Nizamabad District, Telangana – 503224',
      landmark: 'Near Armoor Town Central Hub',
      area: 'Armoor',
      city: 'Armoor',
      postal: '503224',
      phone: '+91 94408 89901',
      email: 'armoor@appleschool.in',
      mapsUrl: 'https://maps.google.com/?q=Armoor+Nizamabad+Telangana',
      embedUrl: 'https://www.google.com/maps?q=Armoor,Nizamabad,Telangana&output=embed',
    },
    theme: {
      primaryColor: '#D97706',
      accentColor: '#F59E0B',
      softBg: '#FFFBEB',
      darkBg: '#78350F',
      borderGlow: 'rgba(245, 158, 11, 0.4)',
    },
    classes: [],
    educationPillars: [],
    staff: [],
    facilities: [],
    galleryImages: [],
    aboutStory: {
      headline: 'Expanding Our Roots to Armoor',
      paragraphs: [
        'For 13+ years, AppleTree and Apple School have shaped the early childhood education landscape in Nizamabad. We are thrilled to announce that our next major branch is preparing to open in Armoor.',
        'Parents in Armoor will have access to our proven play-way curriculum, synthetic phonics instruction, and warm, loving preschool infrastructure without having to travel.',
      ],
      keyPoints: [
        'Admissions opening for Playgroup, Nursery, LKG & UKG.',
        'Fully air-cooled, CCTV-secured campus under construction.',
        'Pre-register now to receive early-bird admission priority.',
      ],
    },
  },

  // =========================================================================
  // 4. APPLE SCHOOL - KAMAREDDY BRANCH (COMING SOON)
  // =========================================================================
  'apple-school-kamareddy': {
    id: 'apple-school-kamareddy',
    aliases: ['kamareddy-branch', 'kamareddy'],
    name: 'Apple School - Kamareddy Branch',
    shortName: 'Apple School',
    branchName: 'Kamareddy Branch',
    logo: '/logos/apple-play-school-logo.png',
    status: 'coming-soon',
    tagline: 'Extending Trusted Play-Based Learning to Kamareddy Families.',
    heroHeadline: 'Apple School is Expanding to Kamareddy!',
    heroSubheadline:
      'A new chapter of joyful early learning is unfolding. Backed by our 13-year heritage, Apple School Kamareddy will bring child-first Montessori classrooms and joyful play to the community.',
    heritageBadge: 'Regional Expansion • Coming Soon',
    contact: {
      address: 'Central Residential Zone, Kamareddy District, Telangana – 503111',
      landmark: 'Near Kamareddy Central Corridor',
      area: 'Kamareddy',
      city: 'Kamareddy',
      postal: '503111',
      phone: '+91 94408 89902',
      email: 'kamareddy@appleschool.in',
      mapsUrl: 'https://maps.google.com/?q=Kamareddy+Telangana',
      embedUrl: 'https://www.google.com/maps?q=Kamareddy,Telangana&output=embed',
    },
    theme: {
      primaryColor: '#059669',
      accentColor: '#10B981',
      softBg: '#ECFDF5',
      darkBg: '#064E3B',
      borderGlow: 'rgba(16, 185, 129, 0.4)',
    },
    classes: [],
    educationPillars: [],
    staff: [],
    facilities: [],
    galleryImages: [],
    aboutStory: {
      headline: 'A Proud Leap to Kamareddy',
      paragraphs: [
        'Due to consistent demand from families across the district, Apple School is establishing a landmark campus in Kamareddy.',
        'Carrying the exact pedagogy, teacher training, and safety standards perfected at our flagship branches, this campus will provide world-class early schooling for children aged 1.5 to 5.5 years.',
      ],
      keyPoints: [
        'Central curriculum and teacher training from our 13-year foundation.',
        'Spacious indoor & outdoor play zones.',
        'Early admissions priority for registered families.',
      ],
    },
  },

  // =========================================================================
  // 5. APPLE SCHOOL - VINAYAKA NAGAR BRANCH (COMING SOON)
  // =========================================================================
  'apple-school-vinayaka-nagar': {
    id: 'apple-school-vinayaka-nagar',
    aliases: ['vinayaka-nagar-branch', 'vinayaka-nagar'],
    name: 'Apple School - Vinayaka Nagar Branch',
    shortName: 'Apple School',
    branchName: 'Vinayaka Nagar Branch',
    logo: '/logos/apple-play-school-logo.png',
    status: 'coming-soon',
    tagline: 'A Loving, Playful Neighborhood Sanctuary Coming to Vinayaka Nagar.',
    heroHeadline: 'Apple School Coming Soon to Vinayaka Nagar!',
    heroSubheadline:
      'We are bringing our trusted preschool closer to your doorstep in Vinayaka Nagar, Nizamabad. Look forward to experiential learning, CCTV security, and nurturing care right in your neighborhood.',
    heritageBadge: 'Neighborhood Campus • Coming Soon',
    contact: {
      address: 'Vinayaka Nagar Main Road, Nizamabad, Telangana – 503001',
      landmark: 'Vinayaka Nagar Residential Hub',
      area: 'Vinayaka Nagar',
      city: 'Nizamabad',
      postal: '503001',
      phone: '+91 94408 89903',
      email: 'vinayakanagar@appleschool.in',
      mapsUrl: 'https://maps.google.com/?q=Vinayaka+Nagar+Nizamabad+Telangana',
      embedUrl: 'https://www.google.com/maps?q=Vinayaka+Nagar,Nizamabad,Telangana&output=embed',
    },
    theme: {
      primaryColor: '#7C3AED',
      accentColor: '#8B5CF6',
      softBg: '#F5F3FF',
      darkBg: '#4C1D95',
      borderGlow: 'rgba(139, 92, 246, 0.4)',
    },
    classes: [],
    educationPillars: [],
    staff: [],
    facilities: [],
    galleryImages: [],
    aboutStory: {
      headline: 'Nurturing Neighborhood Roots in Vinayaka Nagar',
      paragraphs: [
        'Vinayaka Nagar is one of Nizamabad’s most vibrant family communities. Apple School is excited to open a cozy, state-of-the-art branch right in the heart of this neighborhood.',
        'Children will enjoy stress-free daily commutes, warm home-style classrooms, and the trusted 13-year curriculum that parents have relied on for generations.',
      ],
      keyPoints: [
        'Convenient neighborhood location for busy families.',
        'Complete playgroup, nursery, LKG, and UKG classrooms.',
        'Advance reservations opening shortly.',
      ],
    },
  },
};
