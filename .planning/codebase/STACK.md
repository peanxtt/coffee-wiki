# Technology Stack

**Analysis Date:** 2026-03-29

This is a Turbo monorepo PWA (Progressive Web App) built with Next.js 15 (App Router), React 19, and TypeScript 5. The project is in early Phase 1 — the monorepo scaffolding, config, and shared packages are in place but most application features are not yet implemented.

## Languages

**Primary:**
- TypeScript 5.7.2 - All application code across all packages

**Secondary:**
- CSS (Tailwind utility classes + custom CSS in `apps/web/src/app/globals.css`)

## Runtime

**Environment:**
- Node.js >=20.0.0 (enforced via `engines` in root `package.json`)

**Package Manager:**
- pnpm 9.15.0 (enforced via `engines` and `packageManager` field)
- Lockfile: `pnpm-lock.yaml` present

## Frameworks

**Core:**
- Next.js 15.1.3 - React framework with App Router, SSR/SSG, image optimization
- React 19.0.0 - UI library
- React DOM 19.0.0

**Build/Dev:**
- Turbo 2.3.0 - Monorepo task orchestration (build, dev, lint, test, type-check)
- `@turbo/gen` 2.3.0 - Turbo generators for scaffolding new components/routes

**Testing:**
- Vitest 2.1.8 - Unit testing (configured in `packages/utils/`)
- Playwright or Cypress planned for E2E (not yet installed)

**Formatting/Linting:**
- Prettier 3.3.3 - Code formatting
- `prettier-plugin-tailwindcss` 0.6.9 - Tailwind class sorting
- ESLint 9.17.0 - Linting
- `eslint-config-next` 15.1.3 - Next.js ESLint rules

## Styling

**Framework:**
- Tailwind CSS 3.4.17 - Utility-first CSS
- `@tailwindcss/forms` 0.5.9 - Form reset and styling
- `@tailwindcss/typography` 0.5.15 - Prose content styling
- PostCSS 8.4.49, Autoprefixer 10.4.20 - CSS processing pipeline

**Config:** `apps/web/tailwind.config.ts`

**Design System:**
- Custom color palette: espresso, coffee, cream, beige, matcha tokens
- Dark mode: `class`-based strategy (`darkMode: 'class'`)
- Typography: Plus Jakarta Sans (sans, `--font-sans`), Playfair Display (serif, `--font-serif`) loaded via `next/font/google`

**Component Utilities:**
- `class-variance-authority` 0.7.1 - Variant-based className construction
- `clsx` 2.1.1 - Conditional className joining
- `tailwind-merge` 2.6.0 - Conflict resolution for Tailwind classes (used in `packages/ui/src/lib/utils.ts`)

**Note:** Tamagui is listed in README/CLAUDE.md as planned but is NOT present in any `package.json`. UI components currently use plain Tailwind. Tamagui is not yet installed.

## State Management

**Client State:**
- Zustand 5.0.2 - Global state stores (planned in `apps/web/src/stores/`)

**Server State:**
- TanStack React Query 5.62.8 - Data fetching, caching, synchronization

**Validation:**
- Zod 3.24.1 - Schema validation and type inference (used in `packages/database/` and `packages/utils/`)

## Key Dependencies

**Critical:**
- `@supabase/supabase-js` 2.47.10 - Supabase client (database, auth, storage, realtime). Installed in both `apps/web` and `packages/database`.
- `next` 15.1.3 - Core framework
- `zod` 3.24.1 - Runtime validation at all data boundaries

**Image Processing:**
- Next.js Image component with AVIF/WebP format support configured in `apps/web/next.config.js`
- Remote pattern allowlist: `lh3.googleusercontent.com` (Google user avatars), `fonts.gstatic.com`

## Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Root workspace config, scripts, engines |
| `pnpm-workspace.yaml` | Workspace package globs (`apps/*`, `packages/*`) |
| `turbo.json` | Turbo pipeline: build, lint, type-check, dev, test, clean |
| `apps/web/next.config.js` | Next.js config: strict mode, transpilePackages, image patterns, optimizeCss |
| `apps/web/tailwind.config.ts` | Tailwind theme: custom colors, fonts, shadows |
| `apps/web/tsconfig.json` | TypeScript config for web app |
| `.prettierrc.json` | Prettier formatting rules |

## Monorepo Package Aliases

| Alias | Path | Purpose |
|-------|------|---------|
| `@repo/ui` | `packages/ui/` | Shared React components |
| `@repo/database` | `packages/database/` | Supabase client + DB types |
| `@repo/utils` | `packages/utils/` | Shared utility functions |

## Platform Requirements

**Development:**
- Node.js 20+, pnpm 9+
- Dev server at http://localhost:3000 via `pnpm dev`

**Production:**
- Next.js server deployment (Vercel is implied by project patterns)
- PWA capabilities planned (`next-pwa` or similar — not yet installed)

---

*Stack analysis: 2026-03-29*
