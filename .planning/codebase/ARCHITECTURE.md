# Architecture

**Analysis Date:** 2026-03-29

This is a Turbo monorepo containing a single Next.js 15 web application backed by Supabase (PostgreSQL + Auth + Storage). The architecture follows a layered approach: shared packages provide typed database access, utilities, and UI primitives consumed by the `apps/web` Next.js app, which uses the App Router with React Server Components as the default rendering strategy. The project is in early foundation phase — the app scaffolding, shared packages, and design tokens are in place but most features remain unimplemented.

---

## Pattern Overview

**Overall:** Turbo monorepo with layered shared packages feeding a single Next.js App Router application

**Key Characteristics:**
- Server Components by default; Client Components used only when interactivity requires it
- Supabase as the sole backend — no custom API server; data access goes through the `@repo/database` package
- Shared packages are consumed via TypeScript path aliases (`@repo/ui`, `@repo/database`, `@repo/utils`)
- Workspace packages point directly at TypeScript source (`"main": "./src/index.ts"`) — no build step for packages, transpiled by Next.js via `transpilePackages`
- Strict TypeScript throughout (`strict: true`, `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`)

---

## Layers

**Shared Config Layer:**
- Purpose: Provide reusable TypeScript, ESLint, and Tailwind base configs consumed by all packages
- Location: `packages/config/`
- Contains: `typescript/base.json`, ESLint configs, Tailwind configs
- Depends on: Nothing
- Used by: All packages and apps via `extends`

**Database Layer:**
- Purpose: Typed Supabase client initialization and database type definitions
- Location: `packages/database/src/`
- Contains: `client.ts` (browser + admin client factories), `types.ts` (Database interface scaffold for generated types), `index.ts` (barrel)
- Depends on: `@supabase/supabase-js`, environment variables `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- Used by: `apps/web` (server components, server actions, API routes)

**Utils Layer:**
- Purpose: Pure, framework-agnostic utility functions
- Location: `packages/utils/src/`
- Contains: `formatting.ts` (temperature, altitude, slug, titleCase helpers), `validation.ts` (Zod schemas: email, coordinates, slug, URL), `index.ts` (barrel)
- Depends on: `zod`
- Used by: Any package or app

**UI Layer:**
- Purpose: Shared, headless-compatible React UI components and the `cn` class-merging utility
- Location: `packages/ui/src/`
- Contains: `lib/utils.ts` (`cn` — clsx + tailwind-merge), `index.ts` (barrel exporting `cn`; components to be added)
- Depends on: `clsx`, `tailwind-merge`, `class-variance-authority`, React 19
- Used by: `apps/web`

**Application Layer:**
- Purpose: The full Next.js 15 PWA (pages, routes, components, state, styling)
- Location: `apps/web/src/`
- Contains: App Router pages/layouts, React components, Zustand stores, custom hooks, lib helpers
- Depends on: All `@repo/*` packages, Next.js 15, React 19, TanStack React Query, Zustand, Zod, Tailwind CSS

---

## Data Flow

**Standard Read (Server Component):**

1. Browser navigates to a route under `apps/web/src/app/`
2. Next.js renders the React Server Component on the server
3. Server component imports `supabase` from `@repo/database` and calls Supabase directly (no intermediate API layer)
4. Supabase returns typed data (typed via the `Database` interface in `packages/database/src/types.ts`)
5. Component renders HTML with data — zero JS bundle cost for data fetching logic

**Client-Side Data Fetching (Client Component):**

1. Client component uses TanStack React Query (`@tanstack/react-query`) for caching and synchronization
2. Query functions call Supabase client (`supabase` from `@repo/database`) directly from the browser
3. Supabase uses Row Level Security (RLS) with the anon key for client-safe access
4. React Query manages cache, loading states, and background refresh

**Mutations / Privileged Operations:**

1. Server Actions or API routes use `getSupabaseAdmin()` from `@repo/database/src/client.ts`
2. Admin client uses `SUPABASE_SERVICE_ROLE_KEY` — server-only, never exposed to browser

**State Management:**
- Global client state: Zustand stores in `apps/web/src/stores/`
- Server/async state: TanStack React Query
- Local component state: React `useState`/`useReducer`

---

## Key Abstractions

**Database Client (`packages/database/src/client.ts`):**
- Purpose: Single source of truth for Supabase client initialization
- Exports: `supabase` (browser client, typed), `getSupabaseAdmin()` (server-only admin client)
- Pattern: Two separate clients — anon for browser/RLS, service role for server-side privileged ops

**Database Types (`packages/database/src/types.ts`):**
- Purpose: TypeScript interface scaffold for Supabase-generated types
- Current state: Placeholder — `Database.public.Tables/Views/Functions/Enums` are empty
- Pattern: Will be populated by `supabase gen types typescript` CLI once schema is created

**`cn` Utility (`packages/ui/src/lib/utils.ts`):**
- Purpose: Merge Tailwind classes safely (deduplication + conditional)
- Pattern: `twMerge(clsx(inputs))` — standard shadcn/ui pattern

**Zod Validation Schemas (`packages/utils/src/validation.ts`):**
- Purpose: Runtime-validated, type-inferred schemas for boundary data
- Exports: `emailSchema`, `coordinatesSchema`, `slugSchema`, `urlSchema`
- Pattern: Used at API boundaries and form inputs; infer TypeScript types with `z.infer<>`

---

## Entry Points

**Root Layout (`apps/web/src/app/layout.tsx`):**
- Location: `apps/web/src/app/layout.tsx`
- Triggers: Every page render
- Responsibilities: Loads Google Fonts (Plus Jakarta Sans, Playfair Display), applies font CSS variables, sets metadata template, renders `<html>` and `<body>` with Tailwind color tokens

**Home Page (`apps/web/src/app/page.tsx`):**
- Location: `apps/web/src/app/page.tsx`
- Triggers: `GET /`
- Responsibilities: Landing page placeholder — heading, two CTA links to `/coffee` and `/matcha`

**Next.js Config (`apps/web/next.config.js`):**
- Location: `apps/web/next.config.js`
- Responsibilities: Enables `reactStrictMode`, declares `transpilePackages` for all `@repo/*` packages, configures image optimization (AVIF/WebP), enables experimental CSS optimization

---

## Authentication / Authorization

**Provider:** Supabase Auth (planned; not yet wired into the application layer)

**Approach:**
- Browser-facing auth uses the anon Supabase client with Supabase Auth APIs
- Row Level Security (RLS) policies enforce data access at the database level
- Server-side privileged operations use the admin client (`getSupabaseAdmin()`) in Server Actions or Route Handlers
- Planned: Stripe subscription sync with Supabase user records for tiered access (free vs. premium content)

---

## Error Handling

**Strategy:** Early-return / guard-clause pattern at function boundaries; Zod validation at data entry points

**Patterns:**
- Validate external data (API responses, form inputs) with Zod schemas from `@repo/utils`
- Handle errors at the top of functions; avoid deep nesting
- Use custom error types/factories for consistent error shapes (planned convention)
- Display user-friendly messages; log technical details

---

## Database Schema (Planned)

The schema is not yet created. Based on design mockups documented in `README.md`, the intended entities are:

**Core Tables:**
- `regions` — Coffee/matcha growing regions (geography, climate, elevation, terroir)
- `cultivars` — Plant varieties (Samidori, Caturra, Heirloom, etc.)
- `processing_methods` — Washed, natural, anaerobic fermentation, etc.
- `brewing_methods` — V60, French Press, Espresso, Usucha, Koicha, etc.
- `articles` — Encyclopedia content entries
- `users` — Auth users (Supabase Auth manages the `auth.users` table)
- `subscriptions` — Newsletter and premium tier subscription state

**Relationships:**
- `regions` ↔ `cultivars` (many-to-many)
- `regions` ↔ `processing_methods` (many-to-many)
- `articles` → `regions`/`cultivars`/`methods` (tagged/linked content)

**Access Pattern:** All types will be generated into `packages/database/src/types.ts` via Supabase CLI after schema creation.

---

## Cross-Cutting Concerns

**Styling:** Tailwind CSS with a custom warm/earthy theme defined in `apps/web/tailwind.config.ts`. Dark mode via `class` strategy. `prettier-plugin-tailwindcss` enforces class ordering.

**Fonts:** Next.js font optimization (`next/font/google`) for Plus Jakarta Sans (sans) and Playfair Display (serif), loaded once in the root layout and applied as CSS variables.

**Internationalization:** i18next / react-i18next planned; not yet implemented.

**Payments:** Stripe planned for subscription management; not yet implemented.

**PWA:** `next-pwa` or similar planned for service worker + manifest; not yet implemented.

**Image Optimization:** Next.js `<Image>` component with AVIF/WebP formats; Google user content and Google Fonts CDN whitelisted as remote patterns.

---

*Architecture analysis: 2026-03-29*
