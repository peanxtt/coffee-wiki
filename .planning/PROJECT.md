# The Global Grind & Whisk (The Scholarly Roaster)

## What This Is

A specialty coffee and matcha encyclopedia built as a Progressive Web App. It delivers rich, encyclopedic knowledge about coffee bean varieties, growing origins, brewing techniques, and roasting science to enthusiasts and professionals. The visual identity is "The Scholarly Roaster" — a dark, editorial-luxury design inspired by rare-books archives and specialty coffee culture.

## Core Value

A visually distinctive, deeply informative reference that makes exploring specialty coffee culture feel like consulting a rare-books collection.

## Current Milestone: v1.0 Base Frame

**Goal:** Implement the complete UI foundation — design system, navigation shell, landing page, and all main content page layouts.

**Target features:**
- Design system: fonts (Cormorant Garamond, Fraunces, Instrument Sans, Geist Mono) + updated Tailwind tokens for the dark "Scholarly Roaster" palette
- Navigation header: sticky top nav with logo, links (Archives, Origins, Techniques, Roastery), search bar
- Landing page: Hero, bento grid categories, editorial quote, stats grid, footer — faithful to Figma design
- Route stubs: /archives, /origins, /techniques, /roastery with correct layout shell
- Secondary page layouts from design wireframes: beans, article, brewing, drinks, world_map, journal

## Requirements

### Validated

(None yet — ship to validate)

### Active

*See REQUIREMENTS.md for full REQ-IDs and detail.*

- [ ] Design system foundation (fonts, Tailwind tokens, global CSS)
- [ ] Navigation header component
- [ ] Landing page implementation (matching Figma node 4:158)
- [ ] Core route stubs for main sections
- [ ] Secondary page layout implementations from /design/ wireframes

### Out of Scope

- Supabase database schema and data — this milestone is static UI only; real data wiring is a future milestone
- Authentication / user accounts — deferred to after content foundation is in place
- Search functionality (real search) — nav search bar is UI-only; functional search is future scope
- PWA service worker / manifest — deferred; focus is on the UI frame first
- Stripe / payments — no subscription features in base frame
- i18n / internationalization — deferred until content language is stable

## Context

- **Codebase state:** Monorepo scaffolded (Next.js 15, Turbo, pnpm), placeholder homepage only. No real pages, no DB schema, no auth wired.
- **Design source:** Figma file `id39ZAMVzb57f9G54I0aax` (node 4:158 = homepage). Additional wireframes in `/design/` subdirectory (home_page, beans, article, brewing, drinks, world_map, journal).
- **Design system doc:** `/design/journal/DESIGN.md` — detailed specs for "The Scholarly Roaster" (colors, typography, elevation, components).
- **Existing Tailwind theme:** Custom espresso/coffee/cream/matcha tokens — must be migrated/replaced to match the new dark palette.

## Constraints

- **Tech stack:** Next.js 15 App Router, React 19, TypeScript strict mode, Tailwind CSS, pnpm Turbo monorepo — no framework changes
- **Fonts:** Must use Cormorant Garamond, Fraunces, Instrument Sans, Geist Mono as specified in DESIGN.md — loaded via `next/font/google`
- **Static only:** No Supabase queries in v1.0; all content is hardcoded or placeholder
- **Desktop-first:** Design is 1280px desktop-first; responsive adaptation is best-effort in v1.0

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Replace existing Tailwind color tokens | Existing espresso/cream palette doesn't match the Figma dark design | — Pending |
| Use next/font/google for all custom fonts | Next.js optimization, no external CDN calls | — Pending |
| Static content for v1.0 | Database schema not designed yet; unblock UI work | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-29 — Milestone v1.0 Base Frame started*
