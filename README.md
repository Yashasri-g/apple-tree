# Apple Play School & Appletree Play School

> **Two Little Worlds. One Big Beginning.**  
> A modern, minimal, high-performance website representing two sister preschools in Nizamabad, Telangana, built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 📖 The Brand Origin Story

> *"From the Tree, the Apple Blossoms."*

Our story is rooted in over **13 years of early childhood education excellence** in Nizamabad:

1. **🌳 Appletree Play School (The Foundation • Founded First)**
   - **Location:** 5-11-726, Yellama Gutta Road, Nizamabad, Telangana – 503001
   - **Heritage:** Founded first, building over **13 years of proven experience**, trusted educators, and generations of happy children.
   - **Rating:** 4.6★ on Google (Verified Reviews).
   - **Identity:** The deep roots and foundational tree of our educational family.

2. **🍎 Apple Play School (The Blossom • Sister Campus)**
   - **Location:** Behind Murali Krishna Mandir, Gangasthan, Nizamabad, Telangana – 503002
   - **Heritage:** Just as a fresh apple is naturally produced from a flourishing tree, Apple Play School was created to extend that exact 13-year heritage and loving, play-based care to the Gangasthan community.
   - **Google Maps Reference:** Plus Code `M4V9+2GM`.
   - **Identity:** The sweet fruit carrying the exact same values and dedication.

---

## ✨ Design Concept & Visual Language

- **Watermelon × Glass UI**: A refined palette inspired by natural watermelon hues — Watermelon Red (`#F45B65`), Fresh Leaf Green (`#75B86A`), Deep Green (`#285B40`), Soft Cream (`#FFF9F1`), and Charcoal (`#252A25`).
- **Sticky Glassmorphic Header**: Permanently anchored frosted glass navigation (`backdrop-blur-24px`, specular highlight borders) ensuring effortless access across all viewports.
- **Large & Clear Official Logos**: Both authentic school emblems are prominently featured with high-definition transparent rendering.
- **Decluttered & Minimal**: Intentional whitespace, concise telegraphic text, and calm editorial typography (`Fredoka` headings and `DM Sans` body text).
- **Interactive Storytelling**:
  - Interactive **Play-Led Curriculum** switcher with synchronized photography.
  - 4-Stage Developmental Milestones (**Playgroup, Nursery, LKG, UKG**).
  - Bento **Photo Gallery** with full-screen keyboard-accessible Lightbox.
  - Interactive **Admissions Enquiry Form** with dual-campus routing and immediate confirmation.
  - Dedicated individual campus pages for both [Apple Play School](/schools/apple-play-school) and [Appletree Play School](/schools/appletree-play-school).

---

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/) + PostCSS
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scrolling:** [@studio-freight/lenis](https://github.com/darkroomengineering/lenis)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** [React Router 7](https://reactrouter.com/)

---

## 📁 Project Structure

```text
apple-tree/
├── public/
│   ├── logos/
│   │   ├── apple-play-school-logo.png      # Authentic Apple Play School transparent logo
│   │   └── appletree-play-school-logo.png  # Authentic Appletree Play School transparent logo
│   ├── preschool-showcase.mp4              # Background video asset
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── tree/
│   │   │   ├── TreeGatewayExperience.tsx   # Master tree entry gateway & campus selector
│   │   │   ├── TreeCanvas.tsx              # Custom SVG living tree with organic roots, trunk & breeze canopy
│   │   │   ├── CampusApple.tsx             # Interactive glowing apples with breeze sway & hover preview cards
│   │   │   ├── TreeTrunkBrain.tsx          # Central brain neural core with illumination transition
│   │   │   ├── TreeAtmosphere.tsx          # Warm sunlight, soft radiance & floating ambient pollen particles
│   │   │   └── ComingSoonModal.tsx         # Accessible modal for future expansion branches
│   │   ├── sections/
│   │   │   ├── Hero.tsx                    # Minimal editorial hero with 13-yr heritage badge & interactive growth toggle
│   │   │   ├── SchoolStructure.tsx         # Comprehensive school structure (Roots, Trunk/Main Brain, Branches) & classes
│   │   │   ├── Schools.tsx                 # Dual campus presentation (Tree to Apple)
│   │   │   ├── Learning.tsx                # Play-based learning interactive explorer
│   │   │   ├── Programs.tsx                # Age stage milestones (Playgroup - UKG)
│   │   │   ├── Gallery.tsx                 # Bento photo grid & modal Lightbox
│   │   │   ├── About.tsx                   # 13-year story & core educational pillars
│   │   │   └── Enquire.tsx                 # Admission enquiry card & contact details
│   │   ├── SeedToTreeInteractive.tsx       # Embedded interactive Seed-to-Tree micro-engine
│   │   ├── Cursor.tsx                      # Subtle custom cursor
│   │   ├── EnquiryContext.tsx              # Modal & campus selection state
│   │   ├── EnquiryForm.tsx                 # Form component with validation
│   │   ├── EnquiryModal.tsx                # Overlay enquiry dialog
│   │   ├── Footer.tsx                      # Architectural dark footer with verified maps & hours
│   │   ├── Loader.tsx                      # Minimal entry splash coordinator
│   │   ├── Logo.tsx                        # Large, dual-brand header logo component with micro-animations
│   │   ├── Nav.tsx                         # Always-sticky glassmorphic header with quick anchors
│   │   ├── Shapes.tsx                      # SVG graphic marks
│   │   └── motion.tsx                      # Reusable motion & tilt utilities
│   ├── data/
│   │   ├── campuses.ts                     # Scalable campus dataset (active & future branches, coordinates)
│   │   └── site.ts                         # Single source of truth for all school data & copy
│   ├── lib/
│   │   ├── scroll.ts                       # Lenis smooth scroll manager
│   │   └── seo.ts                          # Dynamic meta titles & descriptions
│   ├── pages/
│   │   ├── Home.tsx                        # Unified single-page experience
│   │   └── SchoolPage.tsx                  # Dedicated deep-dive campus pages
│   ├── App.tsx                             # Application routes & providers
│   ├── index.css                           # Tailwind layer, glassmorphic styles & clamp typography
│   └── main.tsx                            # React DOM entrypoint
├── .gitignore                              # Clean git exclusion rules
├── index.html                              # Root HTML with Google Fonts & JSON-LD structured data
├── package.json                            # Scripts & dependencies
├── tailwind.config.js                      # Custom color palette & radii
├── tsconfig.json                           # TypeScript configuration
└── vite.config.ts                          # Vite build pipeline
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or later)
- npm or pnpm or yarn

### Installation

```bash
# Clone the repository (or navigate to workspace)
cd apple-tree

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Visit [http://localhost:5173/](http://localhost:5173/) to view the site live with Hot Module Replacement (HMR).

### Production Build

```bash
# Type check and build for production
npm run build

# Preview production build locally
npm run preview
```

The production output will be generated in the `dist/` directory.

---

## 📍 Verified School Information

| School | Address | Landmark / Area | Google Maps Reference | Details |
| :--- | :--- | :--- | :--- | :--- |
| **Appletree Play School** | 5-11-726, Yellama Gutta Road | Yellama Gutta, Nizamabad | Verified on Maps | Founded first &bull; **13+ Years Experience** &bull; **4.6★ (5 Reviews)** |
| **Apple Play School** | Behind Murali Krishna Mandir | Gangasthan, Nizamabad | Plus Code: `M4V9+2GM` | Sister Campus &bull; **Blossomed from Appletree** &bull; Gangasthan |

---

## 📄 License

Private & proprietary. All rights reserved by **Apple Play School** & **Appletree Play School**, Nizamabad, Telangana.

