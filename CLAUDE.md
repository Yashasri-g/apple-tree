# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` (the type-check is the only lint step; `strict`, `noUnusedLocals` and `noUnusedParameters` are on, so unused imports fail the build)
- `npm run preview` — serve the built `dist/`

There is no test runner and no ESLint/Prettier config.

## Architecture

Marketing site for two sister preschools in Nizamabad, Telangana (React 19 + TS + Vite + Tailwind 3 + Framer Motion + Lenis smooth scroll). Client-side routing only (`react-router-dom` v7 `BrowserRouter`); no backend — the enquiry form is front-end only.

### Routing (`src/App.tsx`)
- `/` → `Home`, which renders only `TreeGatewayExperience` (an SVG tree in `components/tree/`). Each apple on the tree is a campus; clicking one navigates to its school page, or opens `ComingSoonModal` for `coming-soon` campuses.
- `/schools/:slug` → `SchoolPage`, a fully independent per-school site (own nav, hero, classes, staff, gallery, enquiry, footer in `components/school/`). Everything else is a `<Navigate>` redirect to `/` or `/schools/appletree-school`.
- Global providers/chrome mounted in `App`: `MotionConfig reducedMotion="user"`, `EnquiryProvider`, `SmoothScroll`, `Loader`, `Cursor`, `EnquiryModal`. `ScrollTop` resets scroll via the Lenis instance exported from `lib/scroll.ts`.

### Data-driven school sites
- `data/schoolsData.ts` — `SCHOOLS_DATA` keyed by `SchoolBranchId` (`appletree-school`, `apple-school-pragathi-nagar`, plus `armoor`/`kamareddy`/`vinayaka-nagar` branches). `SchoolPage` resolves `:slug` by id **or** by `aliases`, and shows `BranchComingSoonPage` when `status === 'coming-soon'`. Adding a branch = add a data entry (and a campus entry below), not a new page.
- `data/campuses.ts` — `CAMPUSES` for the tree gateway: `route`, `status`, and `applePosition` (x/y coordinates on the SVG tree). Slugs in `route` must match `schoolsData` ids/aliases.
- `lib/seo.ts` — `useSeo(title, description)` sets document title/meta per page.

### Legacy code to be aware of
The repo is mid-redesign (many files uncommitted). Two generations coexist:
- **Current:** `components/tree/*`, `components/school/*`, `data/campuses.ts`, `data/schoolsData.ts`, `components/EnquiryContext.tsx` (`useEnquiry`/`openEnquiry`, campus choice `apple-play-school | appletree-play-school | not-sure`).
- **Older single-page site:** `components/sections/*` (Hero, Schools, Programs, Gallery, …), `Nav`, `Footer`, `EnquiryForm`, and `data/site.ts` (Unsplash photo map, old `SchoolId` of `apple-play-school`/`appletree-play-school`). `Home` no longer renders these sections. Note `SchoolId` in `data/site.ts` differs from `SchoolBranchId` in `data/schoolsData.ts`.
- `src/context/EnquiryContext.tsx` is a duplicate of `components/EnquiryContext.tsx` and is not imported anywhere; use the `components/` one.

Verify what's imported before editing a file in the older group.

## Conventions
- Brand palette (README): watermelon red `#F45B65`, leaf green `#75B86A`, deep green `#285B40`, cream `#FFF9F1`/`#FAF6EE`, charcoal `#252A25`; fonts Fredoka (headings) and DM Sans (body). Tailwind config is in `tailwind.config.js`.
- School logos live in `public/logos/`; `public/` also has `robots.txt` and `sitemap.xml`.
