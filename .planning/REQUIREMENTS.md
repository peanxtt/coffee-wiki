# Requirements: The Scholarly Roaster

**Defined:** 2026-03-29
**Core Value:** A visually distinctive, deeply informative reference that makes exploring specialty coffee culture feel like consulting a rare-books collection.

## v1 Requirements

### Design System

- [ ] **DS-01**: Developer can load custom fonts (Cormorant Garamond, Fraunces, Instrument Sans, Geist Mono) via next/font/google with correct CSS variable names
- [ ] **DS-02**: All Tailwind color tokens reflect the Scholarly Roaster dark palette (`surface-floor` #0F0B08, `surface-low` #1F1B17, `surface` #241F1B, `surface-high` #2E2925, `primary` #C2783C, `on-surface` #EBE0DA, `on-surface-dim` #D8C2B5)
- [ ] **DS-03**: Global CSS applies a 3% noise/grain texture overlay across all pages
- [ ] **DS-04**: Tailwind typography plugin is configured for rich prose content rendering
- [ ] **DS-05**: App defaults to dark mode (no light mode in v1.0)

### Navigation & Layout

- [ ] **NAV-01**: Root layout applies all font CSS variables and surface-floor background to every page
- [ ] **NAV-02**: Top navigation bar renders the logo "The Scholarly Roaster" in Cormorant Garamond Semi Bold Italic with copper (#C2783C) color
- [ ] **NAV-03**: Navigation contains links: Archives, Origins, Techniques, Roastery — with active-link underline treatment
- [ ] **NAV-04**: Navigation search bar renders as a styled input with search icon (UI only — no search functionality)
- [ ] **NAV-05**: Navigation is sticky/fixed at the top with frosted-glass backdrop blur effect on scroll

### Landing Page

- [ ] **LP-01**: Hero section renders a 12-column asymmetric grid with large Cormorant display heading (mixed weight: Light + Semi Bold Italic), tagline in Fraunces, and two CTA buttons
- [ ] **LP-02**: Hero section includes a desaturated coffee pour-over image occupying the right 5 columns, with a floating amber score badge overlapping the image
- [ ] **LP-03**: Bento grid section renders 4 archive category cards (Bean Varieties, Global Origins, The Science, The Roastery) in a 4-column, 2-row layout with surface-tier backgrounds
- [ ] **LP-04**: Editorial quote section renders a full-width dark band with a large Cormorant Semi Bold Italic blockquote and attribution line
- [ ] **LP-05**: Stats grid section renders 4 scientific metrics (1,450+ varietals, 42 countries, 2.4k extraction profiles, 0.01g precision) with Geist Mono data display and left-border accent treatment
- [ ] **LP-06**: Footer renders the brand name, 4 footer links, and copyright notice in the correct typographic treatment
- [ ] **LP-07**: Volume/issue label ("Volume IV • Issue II") renders in Geist Mono uppercase copper above the hero heading

### Secondary Page Layouts

- [ ] **PAGE-01**: Beans/Varieties page layout implemented from `/design/beans/` wireframe — accessible at `/archives/beans` or `/origins/beans`
- [ ] **PAGE-02**: Article/encyclopedia entry page layout implemented from `/design/article/` wireframe — accessible at `/archives/[slug]`
- [ ] **PAGE-03**: Brewing methods page layout implemented from `/design/brewing/` wireframe — accessible at `/techniques/brewing`
- [ ] **PAGE-04**: Drinks/recipes page layout implemented from `/design/drinks/` wireframe — accessible at `/archives/drinks`
- [ ] **PAGE-05**: World origins map page layout implemented from `/design/world_map/` wireframe — accessible at `/origins`
- [ ] **PAGE-06**: Roastery journal page layout implemented following the DESIGN.md system — accessible at `/roastery`

## v2 Requirements

### Data & Content

- **DATA-01**: Supabase schema created for regions, cultivars, processing_methods, brewing_methods, articles tables
- **DATA-02**: User can browse a list of bean varieties fetched from the database
- **DATA-03**: User can view a detailed article page with real content from Supabase
- **DATA-04**: User can use the search bar to find content by keyword

### Authentication

- **AUTH-01**: User can sign up and sign in with email/password via Supabase Auth
- **AUTH-02**: User session persists across browser refresh
- **AUTH-03**: Premium content is gated behind a subscription tier

### PWA

- **PWA-01**: App is installable on mobile and desktop via web app manifest
- **PWA-02**: Core pages are accessible offline via service worker cache

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real search functionality | No database content yet; UI stub is sufficient for v1.0 |
| Supabase database & real data | Schema design is a separate milestone after UI is validated |
| Authentication & user accounts | No content to gate; defer until data layer exists |
| Stripe / payments | No premium content exists yet |
| PWA service worker | Foundation must be solid before adding offline capabilities |
| i18n / internationalization | Content language not finalized; defer |
| Mobile-first responsive | v1.0 is desktop-first; mobile polish is v1.1+ |

## Traceability

*Populated by roadmapper — see ROADMAP.md*

| Requirement | Phase | Status |
|-------------|-------|--------|
| DS-01 | Phase 1 | Pending |
| DS-02 | Phase 1 | Pending |
| DS-03 | Phase 1 | Pending |
| DS-04 | Phase 1 | Pending |
| DS-05 | Phase 1 | Pending |
| NAV-01 | Phase 1 | Pending |
| NAV-02 | Phase 2 | Pending |
| NAV-03 | Phase 2 | Pending |
| NAV-04 | Phase 2 | Pending |
| NAV-05 | Phase 2 | Pending |
| LP-01 | Phase 3 | Pending |
| LP-02 | Phase 3 | Pending |
| LP-03 | Phase 3 | Pending |
| LP-04 | Phase 3 | Pending |
| LP-05 | Phase 3 | Pending |
| LP-06 | Phase 3 | Pending |
| LP-07 | Phase 3 | Pending |
| PAGE-01 | Phase 4 | Pending |
| PAGE-02 | Phase 4 | Pending |
| PAGE-03 | Phase 4 | Pending |
| PAGE-04 | Phase 5 | Pending |
| PAGE-05 | Phase 5 | Pending |
| PAGE-06 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 23 total
- Mapped to phases: 23 (Phase 1: 6, Phase 2: 4, Phase 3: 7, Phase 4: 3, Phase 5: 3)
- Unmapped: 0

---
*Requirements defined: 2026-03-29*
*Last updated: 2026-03-29 — Traceability populated by roadmapper*
