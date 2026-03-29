# Codebase Structure

**Analysis Date:** 2026-03-29

This is a Turbo + pnpm monorepo. All workspace members live under `apps/` (deployable applications) and `packages/` (shared internal libraries). The `apps/web` Next.js application is the only app. Shared packages use the `@repo/*` namespace and are consumed via TypeScript path aliases — no build step required for packages in development, as Next.js transpiles them directly via `transpilePackages`.

---

## Directory Layout

```
coffee-wiki/                        # Monorepo root
├── apps/
│   └── web/                        # Next.js 15 PWA (the only app)
│       ├── src/
│       │   ├── app/                # App Router: pages, layouts, global CSS
│       │   ├── components/         # Feature and layout React components
│       │   │   ├── cards/          # Card UI components
│       │   │   ├── layout/         # Header, footer, navigation
│       │   │   └── sections/       # Page section components
│       │   ├── hooks/              # Custom React hooks
│       │   ├── lib/                # App-level utilities, third-party wrappers
│       │   └── stores/             # Zustand global state stores
│       ├── public/                 # Static assets (favicon, images, manifest)
│       ├── next.config.js          # Next.js configuration
│       ├── tailwind.config.ts      # Tailwind theme + plugins
│       ├── tsconfig.json           # TypeScript config (extends base, adds paths)
│       ├── postcss.config.js       # PostCSS (Tailwind + Autoprefixer)
│       ├── .eslintrc.json          # ESLint (next/core-web-vitals + next/typescript)
│       └── package.json            # App dependencies
│
├── packages/
│   ├── ui/                         # @repo/ui — Shared React components + cn utility
│   │   └── src/
│   │       ├── lib/utils.ts        # cn() class merger (clsx + tailwind-merge)
│   │       └── index.ts            # Public exports
│   │
│   ├── database/                   # @repo/database — Supabase client + types
│   │   └── src/
│   │       ├── client.ts           # supabase (browser) + getSupabaseAdmin() (server)
│   │       ├── types.ts            # Database interface (scaffold for generated types)
│   │       └── index.ts            # Public exports
│   │
│   ├── utils/                      # @repo/utils — Pure utility functions
│   │   └── src/
│   │       ├── formatting.ts       # formatTemperature, formatAltitude, slugify, titleCase
│   │       ├── validation.ts       # Zod schemas: email, coordinates, slug, URL
│   │       └── index.ts            # Public exports
│   │
│   └── config/                     # Shared tool configurations (not a runtime package)
│       ├── eslint/                 # Shared ESLint base config
│       ├── tailwind/               # Shared Tailwind base config
│       └── typescript/
│           └── base.json           # Base tsconfig (strict mode + noUnchecked + noUnused)
│
├── coffee-wiki-design/             # Static HTML design prototypes (reference only)
│   ├── matcha_region_page_1/       # Landing page prototype
│   ├── matcha_region_page_2/       # ...
│   └── matcha_region_page_10/      # Brewing hub prototype
│
├── docs/                           # Project documentation
│   ├── ROADMAP.md                  # Project milestones
│   ├── IMPLEMENTATION_PLAN.md      # Phase plan
│   ├── GETTING_STARTED.md          # Dev onboarding
│   ├── SETUP_COMPLETE.md           # Setup completion notes
│   └── ROLE.md                     # AI agent role definition
│
├── scripts/                        # Build and maintenance scripts
├── turbo/generators/               # Turbo scaffold generators (pnpm turbo gen)
├── .claude/                        # Claude AI agent configs, skills, commands
├── .planning/codebase/             # GSD codebase analysis documents (this file)
├── .vscode/                        # VS Code workspace settings
├── package.json                    # Root — workspace scripts, devDependencies
├── pnpm-workspace.yaml             # Declares apps/* and packages/* as workspaces
├── turbo.json                      # Turbo pipeline (build, lint, type-check, test, dev)
├── .prettierrc.json                # Prettier config (no semi, single quotes, 100 col)
├── .env.example                    # Required env var template
└── CLAUDE.md                       # Navigation index for AI agents
```

---

## Directory Purposes

**`apps/web/src/app/`:**
- Purpose: Next.js App Router entrypoints — layouts, pages, and global styles
- Contains: `layout.tsx` (root layout), `page.tsx` (homepage), `globals.css` (Tailwind directives + CSS custom properties + animations)
- Key files: `apps/web/src/app/layout.tsx`, `apps/web/src/app/page.tsx`, `apps/web/src/app/globals.css`
- Naming: Route segments use lowercase with dashes per Next.js conventions (e.g., `coffee/`, `matcha/`, `regions/[slug]/`)

**`apps/web/src/components/`:**
- Purpose: All React components for the web app, organized by role
- Contains: `cards/` for card components, `layout/` for structural chrome (header, footer, nav), `sections/` for full page sections
- Key files: Empty at current stage — structure is established but components are pending implementation

**`apps/web/src/hooks/`:**
- Purpose: Custom React hooks for reusable stateful logic
- Contains: Hooks that wrap React Query queries, Zustand selectors, or browser APIs
- Key files: Empty at current stage

**`apps/web/src/lib/`:**
- Purpose: App-level helper functions and third-party client initializations (i18n setup, React Query client, etc.)
- Contains: Wrappers around external libraries; distinct from `@repo/utils` which is framework-agnostic
- Key files: Empty at current stage

**`apps/web/src/stores/`:**
- Purpose: Zustand global state stores
- Contains: One file per domain slice (e.g., `ui.ts` for theme/modal state, `user.ts` for auth state)
- Key files: Empty at current stage

**`packages/database/src/`:**
- Purpose: The sole interface between the application and Supabase
- Key files: `packages/database/src/client.ts`, `packages/database/src/types.ts`
- Note: `types.ts` is a hand-written scaffold; will be replaced by `supabase gen types typescript` output once schema exists

**`packages/ui/src/`:**
- Purpose: Reusable React components shared across apps; currently contains only the `cn` utility
- Key files: `packages/ui/src/lib/utils.ts`, `packages/ui/src/index.ts`
- Note: Components are added here and exported via barrel; Tailwind classes are safe to use because `apps/web/tailwind.config.ts` includes `../../packages/ui/src/**` in its `content` array

**`packages/utils/src/`:**
- Purpose: Pure TypeScript utility functions with no React or Next.js dependencies
- Key files: `packages/utils/src/formatting.ts`, `packages/utils/src/validation.ts`

**`packages/config/`:**
- Purpose: Sharable config files extended by package-level `tsconfig.json`, `.eslintrc`, and `tailwind.config`
- Not a runtime package — no `main` or `exports` field; consumed via `extends` in config files

**`coffee-wiki-design/`:**
- Purpose: Static HTML/CSS design prototypes generated as visual reference for the implementation
- Contains: 10 page variants (`matcha_region_page_1` through `matcha_region_page_10`), each with a `code.html` file
- Not deployed; serves as pixel-level design spec

---

## Key Configuration Files

| File | Purpose |
|------|---------|
| `package.json` (root) | Workspace scripts, devDependencies (turbo, prettier, typescript) |
| `pnpm-workspace.yaml` | Declares `apps/*` and `packages/*` as pnpm workspaces |
| `turbo.json` | Task pipeline: build depends on `^build`, dev is persistent/uncached |
| `.prettierrc.json` | No semicolons, single quotes, 100-char width, tailwindcss class sorting |
| `.env.example` | Template for `apps/web/.env.local` — Supabase URL and key vars |
| `apps/web/next.config.js` | `transpilePackages`, image optimization (AVIF/WebP), CSS optimization |
| `apps/web/tailwind.config.ts` | Custom color palette, font families, shadows; scans `packages/ui/src` |
| `apps/web/tsconfig.json` | Path aliases: `@/*` → `./src/*`, `@repo/ui/database/utils` → package src |
| `packages/config/typescript/base.json` | Base tsconfig: strict + noUncheckedIndexedAccess + noUnusedLocals |

---

## Package Naming Conventions

**Workspace packages use the `@repo/` namespace:**
- `@repo/ui` — `packages/ui/`
- `@repo/database` — `packages/database/`
- `@repo/utils` — `packages/utils/`

**Config packages have no runtime name** — consumed only via file path in `extends`.

---

## File Naming Conventions

**Files:**
- React components: PascalCase (e.g., `Button.tsx`, `RegionCard.tsx`)
- Utilities and hooks: camelCase (e.g., `formatting.ts`, `useRegion.ts`)
- Next.js App Router special files: lowercase as required (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`)
- Config files: framework-convention (e.g., `tailwind.config.ts`, `next.config.js`)

**Directories:**
- Route segments: lowercase with dashes (e.g., `brewing-methods/`, `region/[slug]/`)
- Component grouping dirs: lowercase with dashes (e.g., `components/auth-wizard/`)
- Package src directories: always `src/`

---

## Where to Add New Code

**New App Router page/route:**
- Create directory: `apps/web/src/app/[route-name]/`
- Add: `page.tsx` (required), `layout.tsx` (if route-specific layout needed), `loading.tsx` / `error.tsx` as needed

**New React component (app-specific):**
- Implementation: `apps/web/src/components/[category]/ComponentName.tsx`
- Categories: `cards/`, `layout/`, `sections/`, or a new subdirectory for a feature

**New shared UI component (cross-app reuse):**
- Implementation: `packages/ui/src/ComponentName.tsx`
- Export: Add named export to `packages/ui/src/index.ts`
- Import in app: `import { ComponentName } from '@repo/ui'`

**New Zustand store:**
- Implementation: `apps/web/src/stores/[domain].ts`
- Pattern: One file per domain slice; export the store hook as default

**New custom hook:**
- Implementation: `apps/web/src/hooks/use-[feature].ts`
- Naming: Always prefix with `use`

**New utility function (pure/framework-agnostic):**
- Implementation: `packages/utils/src/[category].ts` or add to existing file
- Export: Add to `packages/utils/src/index.ts` barrel
- Import: `import { myUtil } from '@repo/utils'`

**New database operation:**
- Add query/mutation functions to `packages/database/src/` (create new file per domain, e.g., `regions.ts`)
- Export from `packages/database/src/index.ts`

**New lib helper (app-level, framework-aware):**
- Implementation: `apps/web/src/lib/[name].ts`

---

## Special Directories

**`.planning/codebase/`:**
- Purpose: GSD codebase analysis documents written by map-codebase agents
- Generated: By Claude agents
- Committed: Yes

**`.claude/`:**
- Purpose: Claude AI agent definitions, custom commands, and skill definitions
- Generated: No (hand-authored)
- Committed: Yes

**`apps/web/.next/`:**
- Purpose: Next.js build output and dev server cache
- Generated: Yes
- Committed: No (in `.gitignore`)

**`node_modules/`** (root and per-package):
- Purpose: pnpm-managed dependencies
- Generated: Yes
- Committed: No

---

*Structure analysis: 2026-03-29*
