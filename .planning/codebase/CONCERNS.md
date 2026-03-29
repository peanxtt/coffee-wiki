# Codebase Concerns

**Analysis Date:** 2026-03-29

## Executive Summary

The project is at the very beginning of Phase 2 of a 10-phase roadmap. Phase 1 (infrastructure setup) is complete, but almost zero application features have been implemented. The codebase is essentially a skeleton: one placeholder landing page, three empty shared packages, no test infrastructure, no Supabase schema, no UI components, and no authentication. The primary risks are:

1. **No working product exists** — the app is a single static page linking to routes that do not exist.
2. **Supabase is completely unprovisioned** — no project, no schema, no RLS policies, no types.
3. **Tamagui is documented but not installed** — the stated UI framework appears nowhere in any `package.json`.
4. **Zero test infrastructure** — no test runner, no test files, no coverage configuration.
5. **Design prototypes use divergent color tokens** — the 10 HTML prototypes use different token names than the Tailwind config.
6. **Multiple empty directories** referenced by documentation do not contain any files.

---

## CRITICAL

### No Supabase Project or Database Schema

- **Files:** `packages/database/src/types.ts`, `packages/database/src/client.ts`, `.env.example`
- **Description:** The `Database` interface in `types.ts` is a completely empty stub — all table, view, function, and enum sections contain only comments. The Supabase client in `client.ts` falls back to empty strings when env vars are missing (`|| ''`), which means it will silently create an invalid client rather than throwing. No Supabase project has been created, no schema exists, no RLS policies exist, and no migrations exist.
- **Impact:** Every data-dependent feature (regions, brewing methods, search, auth, users) is blocked. The `getSupabaseAdmin()` function will return a broken client in any environment without `SUPABASE_SERVICE_ROLE_KEY`, with no error surfaced.
- **Fix:** Create the Supabase project, design the schema from the data models in `docs/ROADMAP.md`, run `supabase gen types typescript` to populate `types.ts`, and add validation that throws on missing env vars instead of silently falling back to empty strings.

---

### Routes `/coffee` and `/matcha` Do Not Exist

- **Files:** `apps/web/src/app/page.tsx`
- **Description:** The landing page contains two prominent `<a>` links — "Explore Coffee" (`/coffee`) and "Explore Matcha" (`/matcha`) — but neither route exists anywhere in the app. Clicking either link results in a Next.js 404.
- **Impact:** The only visible UI of the application leads to dead ends immediately.
- **Fix:** Create `apps/web/src/app/coffee/page.tsx` and `apps/web/src/app/matcha/page.tsx` as at minimum placeholder pages before linking to them.

---

### Tamagui Listed as Core Framework But Not Installed

- **Files:** `README.md`, `docs/ROLE.md`, `docs/ROADMAP.md`, all `package.json` files
- **Description:** The README, ROLE.md, ROADMAP.md, and the component inventory all specify Tamagui as the primary component system. However, `@tamagui` packages appear in zero `package.json` files across the entire monorepo. The `packages/ui` package has no Tamagui dependency. `docs/ROLE.md` and `README.md` both contain instructions for using Tamagui tokens and theming.
- **Impact:** Any developer following the documented conventions will write Tamagui component syntax that will not compile. The component strategy is undefined — either Tamagui needs to be installed and configured, or documentation must be updated to reflect the actual stack (Tailwind + CVA, which is what is currently installed).
- **Fix:** Make a decision: either install and configure Tamagui (significant setup effort including its bundler config), or update all documentation to remove Tamagui references and commit to Tailwind CSS + CVA as the component approach.

---

## HIGH

### No Test Infrastructure Exists

- **Files:** Root `package.json`, `turbo.json`, all package `package.json` files
- **Description:** The `turbo.json` includes a `test` task, and `pnpm test` is documented as a command, but there is no Vitest config, no Jest config, no Playwright config, and zero test files anywhere in the codebase. The ROADMAP targets >80% overall coverage and >85% for UI components, but these cannot be measured.
- **Impact:** `pnpm test` will succeed vacuously (no tests = no failures), giving false confidence in CI. All coverage targets from the roadmap are meaningless without a runner.
- **Fix:** Install Vitest and `@vitest/coverage-v8`, create `vitest.config.ts` in `apps/web`, add a test script to each package's `package.json`. For E2E, create a `playwright.config.ts` when routes exist.

---

### Entire Component Library Is Missing

- **Files:** `apps/web/src/components/cards/`, `apps/web/src/components/layout/`, `apps/web/src/components/sections/`, `packages/ui/src/`
- **Description:** All three component subdirectories (`cards/`, `layout/`, `sections/`) exist as empty directories. The `packages/ui/src/index.ts` exports only the `cn` utility function — no Button, Card, Badge, Input, Typography, Icon, Header, Footer, Navigation, RegionCard, BrewingMethodCard, or any other component listed in the ROADMAP's component inventory. There is no design system implementation whatsoever.
- **Impact:** Phases 2 through 10 all depend on components that do not exist. The landing page cannot be properly built. No reuse is possible.
- **Fix:** Begin Phase 2 immediately — implement primitives in `packages/ui/src/` starting with Button, Card, Badge. Then build layout components in `apps/web/src/components/layout/`.

---

### Design Prototypes Use Different Color Token Names Than Tailwind Config

- **Files:** `coffee-wiki-design/matcha_region_page_1/code.html`, `coffee-wiki-design/matcha_region_page_5/code.html`, `apps/web/tailwind.config.ts`
- **Description:** The 10 HTML prototypes use inconsistent and divergent color token names compared to the production Tailwind config:
  - Prototypes use `espresso-light`, `beige-dark`, `coffee-accent` (flat tokens)
  - Production config uses `coffee.accent`, `beige.dark`, `espresso.light` (nested objects)
  - Page 5 introduces an entirely different token set: `brand-brown`, `brand-beige`, `brand-cream`, `brand-green`, `brand-text`, `brand-accent` — none of which exist in the production config
  - Page 5 uses `background-light: '#FAF9F6'` vs. production `background-light: '#FDFBF7'` (different hex values)
  - Page 1 uses serif font `Lora`; page 5 uses `Playfair Display`; production config includes both but the homepage renders `Playfair Display` only
- **Impact:** Directly copying Tailwind classes from any prototype into React components will produce broken styling. Developers must manually translate every token reference.
- **Fix:** Create a token mapping document or normalize all prototype color references to the production Tailwind config before beginning component extraction.

---

### Supabase Client Has No Environment Validation

- **Files:** `packages/database/src/client.ts`
- **Description:** Both `supabaseUrl` and `supabaseAnonKey` default to empty strings (`|| ''`). The `getSupabaseAdmin()` function also uses the module-level `supabaseUrl` which may already be an empty string. A client created with empty strings will not throw at construction time — errors will only surface on the first network request, making the failure mode hard to diagnose.
- **Impact:** In any environment where env vars are not set (CI, a new developer's machine, staging), every database operation will fail silently or with opaque network errors.
- **Fix:** Add explicit validation: `if (!process.env.NEXT_PUBLIC_SUPABASE_URL) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')`. Consider using a library like `@t3-oss/env-nextjs` for structured env validation.

---

### `next.config.js` Uses Legacy `.js` Format and `experimental.optimizeCss`

- **Files:** `apps/web/next.config.js`
- **Description:** Next.js 15 prefers `next.config.ts` (TypeScript). Additionally, `experimental.optimizeCss: true` requires the `critters` package as a peer dependency; if it is not installed, the build will emit a warning or fail silently. The `remotePatterns` for images includes `fonts.gstatic.com` which is a font CDN, not an image host — this suggests it was added without verifying actual image sources.
- **Impact:** Minor build fragility; `optimizeCss` may cause unexpected build failures if `critters` is not present.
- **Fix:** Migrate to `next.config.ts`. Verify `critters` is installed if `optimizeCss` is kept. Audit `remotePatterns` to include only actual image hostnames (e.g., your Supabase Storage bucket URL).

---

## MEDIUM

### `hooks/`, `lib/`, and `stores/` Source Directories Are Empty

- **Files:** `apps/web/src/hooks/`, `apps/web/src/lib/`, `apps/web/src/stores/`
- **Description:** All three directories listed in `apps/web/src/CLAUDE.md` as key source directories exist on disk but contain no files. Zustand stores (documented as the state management approach), custom hooks, and utility wrappers (Supabase client, React Query setup) are all absent.
- **Impact:** Theme toggle, search state, and data fetching plumbing needed by Phase 5+ cannot be built without this foundation.
- **Fix:** Create at minimum: `stores/theme.ts` (Zustand dark mode store), `lib/query-client.ts` (React Query client factory), and a QueryClientProvider wrapper in the root layout when ready to fetch data.

---

### `scripts/` and `turbo/generators/` Are Empty

- **Files:** `scripts/` directory, `turbo/generators/` directory
- **Description:** Both directories are empty. The README documents `scripts/` as containing "Build and utility scripts" and `turbo/generators/` as containing Turbo generators for scaffolding. Neither contains any files. The `pnpm turbo gen` command documented in the README will fail or do nothing.
- **Impact:** Developers cannot use the documented generator workflow to scaffold new components or routes. Seed scripts for populating Supabase with encyclopedia content do not exist.
- **Fix:** Create at minimum a component generator in `turbo/generators/` and a database seed script in `scripts/` when the schema is ready.

---

### `packages/config/eslint/` and `packages/config/tailwind/` Are Empty

- **Files:** `packages/config/eslint/`, `packages/config/tailwind/`
- **Description:** The `packages/config/` structure includes `eslint/` and `tailwind/` subdirectories (documented in `packages/config/CLAUDE.md`) but both are empty. Currently, ESLint config lives only in `apps/web/.eslintrc.json` and Tailwind config in `apps/web/tailwind.config.ts`. There is no sharing mechanism.
- **Impact:** When additional apps or packages need ESLint or Tailwind, there is no shared config to extend, leading to duplication.
- **Fix:** Move base ESLint and Tailwind configs into the respective `packages/config/` subdirectories when the second app or package needs them. Not urgent for a single-app monorepo.

---

### Dark Mode Has No Runtime Toggle

- **Files:** `apps/web/src/app/layout.tsx`, `apps/web/tailwind.config.ts`
- **Description:** Tailwind is configured with `darkMode: 'class'`, and `layout.tsx` uses `suppressHydrationWarning` on `<html>` (indicating intent to apply dark class client-side). However, no Zustand theme store exists, no toggle component exists, and no mechanism to apply/persist the dark class to `<html>` exists. The design prototypes include a dark mode toggle in the header.
- **Impact:** Dark mode is visually designed but completely non-functional. Users see no toggle. The `dark:` Tailwind variants in layout.tsx are inert.
- **Fix:** Create `apps/web/src/stores/theme.ts` with a Zustand store that persists preference to `localStorage`, and a `ThemeProvider` client component that applies the class to `<html>`.

---

### `packages/database` Exports From Non-Compiled Source

- **Files:** `packages/database/package.json`, `packages/utils/package.json`, `packages/ui/package.json`
- **Description:** All three shared packages declare `"main": "./src/index.ts"` and `"types": "./src/index.ts"` — they point directly to TypeScript source, not compiled output. This works only because `apps/web/next.config.js` lists them in `transpilePackages`. This is a non-standard setup that bypasses the normal package build pipeline. There is no `build` script in any of the shared packages.
- **Impact:** If any consumer outside of Next.js (e.g., a script, a separate tool, or a test runner not configured for TypeScript) tries to import these packages, it will fail. Turbo's `build` task has no output for these packages.
- **Fix:** Either add a build step to each package (e.g., using `tsup`) that emits `dist/`, or document explicitly that these packages are Next.js-transpiled-only and not standalone publishable packages.

---

### `titleCase` Uses Deprecated `substr`

- **Files:** `packages/utils/src/formatting.ts` line 35
- **Description:** The `titleCase` function calls `txt.substr(1)`. `String.prototype.substr` is deprecated in the ECMAScript spec and removed in some strict environments. It should be `txt.slice(1)`.
- **Impact:** Low immediate risk, but will trigger linting warnings and may break in future runtimes.
- **Fix:** Replace `txt.substr(1)` with `txt.slice(1)` in `packages/utils/src/formatting.ts`.

---

### No PWA Configuration

- **Files:** `apps/web/next.config.js`, `apps/web/` (no `public/manifest.json`)
- **Description:** The README and ROADMAP describe this as a Progressive Web App with offline support, service workers, and installability (Phase 7). No `next-pwa` or `@ducanh2912/next-pwa` package is installed. No `manifest.json` exists in `public/`. No service worker configuration exists.
- **Impact:** The app cannot be installed or used offline. This is a Phase 7 item but noted here because `next-pwa` configuration affects `next.config.js` in ways that require planning.
- **Fix:** Install `next-pwa` when Phase 7 begins, create `public/manifest.json` with app metadata, and configure the service worker in `next.config.js`.

---

### No i18n Configuration Despite Being Listed as a Dependency

- **Files:** `README.md`, all `package.json` files
- **Description:** README lists `i18next` and `react-i18next` as part of the tech stack, and `docs/ROLE.md` includes i18n setup instructions. However, neither package is installed in any `package.json`. There are no translation files anywhere.
- **Impact:** All user-facing text added during development will be hardcoded strings. Retrofitting i18n later requires touching every component. This is a low-urgency issue for a first launch but can be expensive to add retroactively.
- **Fix:** Decide whether i18n is in scope for v1. If yes, install `next-intl` (the current Next.js App Router standard), create `messages/en.json`, and wrap the root layout before content is written. If no, remove from documentation.

---

### No Stripe Integration Despite Being Listed as Planned

- **Files:** `.env.example`, `README.md`, `docs/ROLE.md`
- **Description:** `.env.example` includes `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, and `STRIPE_WEBHOOK_SECRET`. Stripe is listed in the README and ROLE.md tech stack. However, no Stripe package is installed, no webhook route exists, and no subscription model is defined.
- **Impact:** The env template creates security confusion — developers may think Stripe keys are currently required. The payment model is entirely undefined.
- **Fix:** Remove Stripe env vars from `.env.example` until the integration is actively being built. Add them back in the phase where Stripe is implemented.

---

## LOW

### No `public/` Directory or Favicon

- **Files:** `apps/web/` (expected `public/` directory)
- **Description:** No `public/` directory exists in `apps/web/`. Next.js expects `public/` for static assets including `favicon.ico`, `robots.txt`, and the future PWA `manifest.json`. Without a favicon, the browser tab shows the default browser icon.
- **Fix:** Create `apps/web/public/` and add a placeholder `favicon.ico` and `robots.txt`.

---

### Design Prototype Map Images Use External URLs

- **Files:** `coffee-wiki-design/matcha_region_page_5/code.html` line 52
- **Description:** The region profile prototype loads a map background image from an `lh3.googleusercontent.com` URL (a Google-hosted image). These URLs are temporary and may expire. The `next.config.js` image `remotePatterns` already includes `lh3.googleusercontent.com`, suggesting an intent to use this source in production.
- **Impact:** If map images are sourced from user-uploaded Google Photos URLs in production, they will be ephemeral. This is unsuitable for encyclopedia content.
- **Fix:** Use Supabase Storage or a CDN for all production map and region images. Use Mapbox or Leaflet for interactive maps rather than static image backgrounds.

---

### No `CHANGELOG.md` or Conventional Commits Enforcement

- **Files:** Root `package.json`, `.gitignore`
- **Description:** The README specifies Conventional Commits but there is no `commitlint`, no `husky`, and no `.commitlintrc` to enforce this. The git history has no commits at all (initial state).
- **Impact:** Commit message convention will drift without tooling enforcement.
- **Fix:** Add `commitlint` + `husky` pre-commit hooks when the team begins active development. Low priority for a solo project.

---

### `noUnusedLocals` and `noUnusedParameters` Set in Base TypeScript Config

- **Files:** `packages/config/typescript/base.json`
- **Description:** The base TypeScript config enables `noUnusedLocals: true` and `noUnusedParameters: true`. During rapid early-stage development, these flags frequently cause type errors on stub/scaffold code and can slow iteration. However, `apps/web/tsconfig.json` does not extend `packages/config/typescript/base.json` — it has its own inline config — so this is only active for packages that do extend the base.
- **Impact:** Minor friction during scaffolding phases for packages extending the base config.
- **Fix:** Acceptable as a long-term quality gate. Consider prefixing unused params with `_` during scaffolding phases to satisfy the compiler.

---

## Test Coverage Gaps

**Entire application is untested:**
- What's not tested: All application code — routing, layout, utilities, database client, validation schemas
- Files: `packages/utils/src/formatting.ts`, `packages/utils/src/validation.ts`, `packages/database/src/client.ts`, `apps/web/src/app/page.tsx`
- Risk: Any regression in the utility functions or Supabase client setup goes undetected
- Priority: HIGH — establish the test runner before any feature code is written, so coverage grows with the codebase rather than being retrofitted

---

*Concerns audit: 2026-03-29*
