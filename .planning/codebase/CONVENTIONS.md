# Coding Conventions

**Analysis Date:** 2026-03-29

This project uses TypeScript strict mode throughout a Turbo monorepo. All code is functional and declarative — no classes. Server Components are the default in Next.js App Router; Client Components are used only when interactivity requires it. The conventions below reflect patterns found in actual source files and the authoritative README.md.

---

## Naming Patterns

**Files:**
- React component files: PascalCase with `.tsx` extension (e.g., `Button.tsx`, `RootLayout`)
- Utility/helper files: camelCase with `.ts` extension (e.g., `formatting.ts`, `validation.ts`, `utils.ts`)
- Next.js App Router files: lowercase reserved names (`layout.tsx`, `page.tsx`, `globals.css`)
- Directory names: lowercase with dashes (e.g., `components/auth-wizard`, not `authWizard`)

**Functions:**
- Pure functions use the `function` keyword, not arrow function assignments
- Auxiliary verb prefixes for booleans: `isLoading`, `hasError`, `isOpen`
- Event handlers: `handle` prefix (e.g., `handleSubmit`, `handleClick`)

**Variables:**
- camelCase throughout
- Descriptive names with auxiliary verbs for boolean state

**Types and Interfaces:**
- PascalCase for all type names
- Prefer `interface` over `type` for object shapes
- Avoid enums — use literal types or const maps instead

**Components:**
- Named exports preferred over default exports for components and functions
- Exception: Next.js page/layout files use default exports (framework requirement)

---

## Code Style

**Formatter:** Prettier (`/.prettierrc.json`)

Key settings:
- No semicolons (`"semi": false`)
- Single quotes (`"singleQuote": true`)
- 2-space indentation (`"tabWidth": 2`)
- Trailing commas in ES5 positions (`"trailingComma": "es5"`)
- Max line width 100 characters (`"printWidth": 100`)
- Tailwind class sorting via `prettier-plugin-tailwindcss`

**Linter:** ESLint (`apps/web/.eslintrc.json`)

Extends `next/core-web-vitals` and `next/typescript`. No additional custom rules beyond those presets.

---

## TypeScript Patterns

**Strict mode is mandatory.** The base tsconfig (`packages/config/typescript/base.json`) enables:
- `strict: true`
- `noUncheckedIndexedAccess: true`
- `noImplicitOverride: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`

**Type definitions:**
- Use `interface` for object shapes, especially component props and database types
- Use `type` for unions, intersections, and utility types
- Avoid `any` — infer types from Zod schemas where possible

**Zod schemas for runtime validation:**
```ts
// packages/utils/src/validation.ts
import { z } from 'zod'

export const coordinatesSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
})

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format')
```

**Database types are defined as interfaces** in `packages/database/src/types.ts` and generated/extended from the Supabase schema.

**Import `type` syntax** is used for type-only imports (enforced by `isolatedModules: true` in `apps/web/tsconfig.json`):
```ts
import type { Metadata } from 'next'
import type { Database } from './types'
```

---

## Import Patterns

**Path aliases defined in `apps/web/tsconfig.json`:**
- `@/*` → `./src/*` (app-local alias)
- `@repo/ui` → `packages/ui/src`
- `@repo/database` → `packages/database/src`
- `@repo/utils` → `packages/utils/src`

**Import order (conventional):**
1. External packages (e.g., `next`, `react`, `zod`)
2. Monorepo packages (`@repo/ui`, `@repo/database`, `@repo/utils`)
3. App-local aliases (`@/components/...`, `@/lib/...`)
4. Relative imports (`./types`, `../utils`)
5. CSS/style imports last (`import './globals.css'`)

**Example from `apps/web/src/app/layout.tsx`:**
```ts
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
```

**Barrel files are used at package boundaries:**
- `packages/ui/src/index.ts` — exports all UI components
- `packages/utils/src/index.ts` — re-exports `formatting` and `validation` with `export * from`
- `packages/database/src/index.ts` — re-exports `client` and `types` with `export * from`

Within a package, import directly from the module file rather than the barrel.

---

## React Patterns

**Component structure order (within a file):**
1. Exported component(s)
2. Subcomponents
3. Helper functions
4. Static content / constants
5. Type definitions

**Server Components by default.** Only add `'use client'` when the component requires:
- Browser APIs or event handlers
- React hooks (`useState`, `useEffect`, etc.)
- Zustand store access
- TanStack Query

**Component definition style:**
```tsx
// Default export for Next.js pages/layouts
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      ...
    </main>
  )
}
```

```tsx
// Named export with forwardRef for shared UI components (packages/ui)
import { forwardRef } from 'react'
import { cn } from './lib/utils'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return <button className={cn('...', className)} ref={ref} {...props} />
  }
)
```

**Props typing:** Use interfaces, not inline types:
```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}
```

**State management:**
- Zustand for global client state (`src/stores/`)
- TanStack React Query for server/async state
- `useState`/`useReducer` for local component state only
- Minimize `useEffect` — prefer derived state and React Query

**Tailwind class merging** via `cn()` from `@repo/ui`:
```ts
import { cn } from '@repo/ui'
// or within packages/ui itself:
import { cn } from './lib/utils'

cn('base-class', conditionalClass && 'applied-when-true', className)
```

---

## Styling Conventions

**Tailwind CSS** with project-specific design tokens defined in `apps/web/tailwind.config.ts`.

Custom color tokens (use these, not raw hex values):
- `espresso`, `espresso-light` — dark coffee browns
- `coffee-accent`, `coffee-light`, `coffee-dark` — mid-range browns
- `cream` — off-white background (`#FDFBF7`)
- `matcha`, `matcha-dark`, `matcha-light` — greens
- `text-main` — primary text
- `background-light`, `background-dark` — page backgrounds
- `border-subtle` — dividers

Custom shadow tokens: `shadow-soft`, `shadow-card`, `shadow-hover`

Custom font families: `font-sans` (Plus Jakarta Sans), `font-serif` (Playfair Display)

**Dark mode** uses the `class` strategy — add `dark:` variants alongside light variants.

**Headings default to serif** via `globals.css`:
```css
h1, h2, h3, h4, h5, h6 {
  @apply font-serif;
}
```

**Material Symbols icons** use the CSS class `material-symbols-outlined`. Apply `.filled` class for filled variant.

---

## Error Handling

- Handle errors at the beginning of functions using guard clauses and early returns
- Avoid deep nesting — use early returns for invalid/error states
- Use Zod schemas to validate data at all boundaries (API responses, form inputs)
- Use custom error types or factories for consistent error handling across modules
- Implement proper error logging alongside user-friendly messages

---

## Comments and Documentation

- Document complex logic with inline comments
- Use JSDoc for exported utility functions (pattern observed in `packages/utils/`):
```ts
/**
 * Format a number as a temperature string
 */
export function formatTemperature(temp: number, unit: 'C' | 'F' = 'C'): string {
  return `${temp}°${unit}`
}
```
- Use JSDoc for component props when TypeScript types alone are not self-explanatory
- Barrel index files include comments explaining intent (e.g., `// Export all UI components here`)

---

## Module Design

**Exports:**
- Named exports preferred for all components and functions
- Default exports only for Next.js special files (`page.tsx`, `layout.tsx`, `error.tsx`, etc.)

**Barrel files** exist at the top of each package's `src/` directory. Re-export using `export * from`:
```ts
// packages/utils/src/index.ts
export * from './formatting'
export * from './validation'
```

**Package boundaries** are enforced via monorepo aliases. Code in `apps/web` must import shared code via `@repo/*` — never via relative paths that cross package boundaries.

---

## Functional Programming Patterns

- Prefer pure functions; avoid side effects except at explicit boundaries
- No classes — use factory functions or plain objects
- Prefer iteration and modularization over duplication
- Compose small focused functions rather than large multi-purpose ones
- Keep components small and focused (Single Responsibility Principle)

---

*Convention analysis: 2026-03-29*
