# Roadmap: The Scholarly Roaster — v1.0 Base Frame

## Overview

This milestone delivers the complete UI foundation for the encyclopedia: design tokens and typography established first, then the navigation shell, then the landing page, then all secondary page layouts. Each phase produces a verifiable visual output building on the previous. No database wiring — static content throughout.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Design System Foundation** - Fonts, color tokens, noise texture, typography plugin, dark mode default, and root layout shell
- [ ] **Phase 2: Navigation** - Sticky top nav with logo, links, search bar, and frosted-glass scroll effect
- [ ] **Phase 3: Landing Page** - Hero, bento grid, editorial quote, stats grid, footer — faithful to Figma
- [ ] **Phase 4: Secondary Pages Part 1** - Beans/varieties, article/encyclopedia, and brewing methods layouts
- [ ] **Phase 5: Secondary Pages Part 2** - Drinks/recipes, world origins map, and roastery journal layouts

## Phase Details

### Phase 1: Design System Foundation
**Goal**: The app has a complete, consistent visual foundation — every page inherits the correct fonts, dark palette, grain texture, and typography baseline
**Depends on**: Nothing (first phase)
**Requirements**: DS-01, DS-02, DS-03, DS-04, DS-05, NAV-01
**Success Criteria** (what must be TRUE):
  1. All four custom fonts (Cormorant Garamond, Fraunces, Instrument Sans, Geist Mono) load via next/font/google and their CSS variables are present on the root `<html>` element
  2. Tailwind color tokens use the Scholarly Roaster dark palette — `surface-floor` resolves to #0F0B08, `primary` to #C2783C, and `on-surface` to #EBE0DA in the compiled CSS
  3. Every page displays a visible grain/noise texture overlay across the full viewport
  4. The `@tailwindcss/typography` plugin is active and prose blocks render with correct dark-mode styling
  5. Opening the app in any browser shows a dark background (no white flash) with no light-mode override possible
**Plans**: TBD
**UI hint**: yes

### Phase 2: Navigation
**Goal**: A polished, sticky navigation header is present on every page with the brand identity, section links, and UI-only search bar
**Depends on**: Phase 1
**Requirements**: NAV-02, NAV-03, NAV-04, NAV-05
**Success Criteria** (what must be TRUE):
  1. The logo "The Scholarly Roaster" renders in Cormorant Garamond Semi Bold Italic in copper (#C2783C) at the top of every page
  2. Navigation links for Archives, Origins, Techniques, and Roastery are visible and the active link has the correct underline treatment
  3. A styled search input with search icon is visible in the nav (clicking it does nothing — UI only)
  4. Scrolling down any page causes the nav to remain fixed at the top with a visible frosted-glass backdrop blur effect
**Plans**: TBD
**UI hint**: yes

### Phase 3: Landing Page
**Goal**: The homepage faithfully reproduces the Figma design — hero, bento grid, quote band, stats, and footer are all present with correct typography and layout
**Depends on**: Phase 2
**Requirements**: LP-01, LP-02, LP-03, LP-04, LP-05, LP-06, LP-07
**Success Criteria** (what must be TRUE):
  1. The hero section shows a 12-column asymmetric grid with the volume/issue label in Geist Mono copper, a large mixed-weight Cormorant heading, a Fraunces tagline, two CTA buttons, and a desaturated pour-over image with a floating amber score badge
  2. The bento grid section shows four archive category cards (Bean Varieties, Global Origins, The Science, The Roastery) in a 4-column 2-row arrangement with surface-tier backgrounds
  3. A full-width dark band displays a large Cormorant Semi Bold Italic blockquote with an attribution line below it
  4. The stats grid shows four scientific metrics with Geist Mono data display and left-border copper accent treatment
  5. A footer renders with the brand name, four footer links, and a copyright notice at the correct typographic scale
**Plans**: TBD
**UI hint**: yes

### Phase 4: Secondary Pages Part 1
**Goal**: The beans/varieties, article/encyclopedia entry, and brewing methods page layouts are implemented and accessible at their routes with placeholder content
**Depends on**: Phase 3
**Requirements**: PAGE-01, PAGE-02, PAGE-03
**Success Criteria** (what must be TRUE):
  1. Navigating to `/archives/beans` (or `/origins/beans`) renders the beans/varieties page layout matching the `/design/beans/` wireframe with placeholder content
  2. Navigating to `/archives/[slug]` renders the article/encyclopedia entry layout matching the `/design/article/` wireframe with placeholder content
  3. Navigating to `/techniques/brewing` renders the brewing methods layout matching the `/design/brewing/` wireframe with placeholder content
  4. All three routes use the navigation shell from Phase 2 and inherit the design system from Phase 1
**Plans**: TBD
**UI hint**: yes

### Phase 5: Secondary Pages Part 2
**Goal**: The drinks/recipes, world origins map, and roastery journal page layouts are implemented and accessible at their routes with placeholder content
**Depends on**: Phase 4
**Requirements**: PAGE-04, PAGE-05, PAGE-06
**Success Criteria** (what must be TRUE):
  1. Navigating to `/archives/drinks` renders the drinks/recipes layout matching the `/design/drinks/` wireframe with placeholder content
  2. Navigating to `/origins` renders the world origins map layout matching the `/design/world_map/` wireframe with a placeholder map region and placeholder content
  3. Navigating to `/roastery` renders the roastery journal layout following the DESIGN.md system with placeholder content
  4. All three routes use the navigation shell from Phase 2 and all six secondary page layouts are accessible without JavaScript errors
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design System Foundation | 0/TBD | Not started | - |
| 2. Navigation | 0/TBD | Not started | - |
| 3. Landing Page | 0/TBD | Not started | - |
| 4. Secondary Pages Part 1 | 0/TBD | Not started | - |
| 5. Secondary Pages Part 2 | 0/TBD | Not started | - |
