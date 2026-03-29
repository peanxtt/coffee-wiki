# Testing Patterns

**Analysis Date:** 2026-03-29

The project declares a `pnpm test` command that delegates to `turbo test`, but **no test files, test framework configuration, or test runner packages exist in the codebase at this time**. The testing infrastructure is planned but not yet implemented. This document captures what is declared/intended per README.md and what is actually present, so that the first testing phase can be planned accurately.

---

## Test Framework (Planned)

**Unit / Integration Runner (planned):**
- Vitest — referenced in `README.md` under Development Tools
- Config file: not yet present (`vitest.config.*` absent)

**E2E Runner (planned):**
- Playwright or Cypress — referenced in `README.md`, not yet decided
- Config file: not yet present

**Assertion / Component Testing (planned):**
- React Testing Library — implied by README reference to "React (Jest, React Testing Library, Vitest)"
- No `@testing-library/*` packages in `apps/web/package.json` yet

**Run Commands:**
```bash
pnpm test              # Delegates to turbo test (runs test script in each workspace)
pnpm test --filter=web # Run tests in web app only
```

No `test` script exists in `apps/web/package.json` or the packages. The root `package.json` declares `"test": "turbo test"` but no workspace defines a `test` script to execute.

---

## Current State: No Tests Present

A search of the repository found:
- Zero `*.test.ts` files
- Zero `*.test.tsx` files
- Zero `*.spec.ts` files
- Zero `*.spec.tsx` files
- Zero `__tests__/` directories
- No `jest.config.*`, `vitest.config.*`, or `playwright.config.*` files
- No testing packages in any `package.json` (`devDependencies` in `apps/web/package.json` contains no test libraries)

---

## Test File Organization (Intended Pattern)

Based on README.md guidance and the monorepo structure, when tests are added they should follow:

**Location:**
- Co-located with source files using `.test.ts` / `.test.tsx` suffix, OR
- In `__tests__/` directories adjacent to the code under test

**Naming:**
- Unit/integration tests: `<filename>.test.ts` or `<filename>.test.tsx`
- E2E tests: separate directory, likely `apps/web/e2e/` or `apps/web/tests/`

**Suggested structure when implemented:**
```
packages/utils/src/
├── formatting.ts
├── formatting.test.ts       # Unit tests for formatting utilities
├── validation.ts
├── validation.test.ts       # Unit tests for Zod schemas
└── index.ts

packages/database/src/
├── client.ts
├── client.test.ts           # Integration tests for Supabase client
└── types.ts

apps/web/src/
├── components/
│   └── Button/
│       ├── Button.tsx
│       └── Button.test.tsx  # Component tests with React Testing Library
└── e2e/                     # E2E tests (Playwright/Cypress)
    └── navigation.spec.ts
```

---

## What README.md Specifies Should Be Tested

**Unit tests:**
- Zod validation schemas (`packages/utils/src/validation.ts`)
- Formatting utility functions (`packages/utils/src/formatting.ts`)
- Individual UI components (`packages/ui/src/`)

**Integration tests:**
- Supabase client operations (`packages/database/src/client.ts`)
- API route handlers
- Server Actions (when implemented)

**E2E tests (critical user flows):**
- Navigation between pages
- Search functionality
- Authentication flows (when implemented)
- Subscription/payment flows via Stripe (when implemented)

---

## Testing Gaps (Current)

**High Priority — Nothing is tested yet:**
- `packages/utils/src/formatting.ts` — 4 pure functions, ideal for unit tests, zero coverage
- `packages/utils/src/validation.ts` — 4 Zod schemas, zero coverage
- `packages/ui/src/lib/utils.ts` — `cn()` utility, zero coverage
- `packages/database/src/client.ts` — Supabase client initialization, zero coverage
- `apps/web/src/app/page.tsx` — Root page component, zero coverage
- `apps/web/src/app/layout.tsx` — Root layout, zero coverage

**Infrastructure missing before any tests can run:**
1. Install test runner: `vitest` (recommended per README)
2. Install `@testing-library/react` and `@testing-library/jest-dom`
3. Add `vitest.config.ts` to `apps/web/` and each package that needs tests
4. Add `"test": "vitest"` script to each `package.json`
5. Configure jsdom environment for React component tests

---

## Recommended Setup When Implementing

**Vitest config for packages (e.g., `packages/utils/vitest.config.ts`):**
```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
  },
})
```

**Vitest config for web app (`apps/web/vitest.config.ts`):**
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**Example unit test pattern for utilities:**
```ts
// packages/utils/src/formatting.test.ts
import { describe, it, expect } from 'vitest'
import { formatTemperature, slugify, titleCase } from './formatting'

describe('formatTemperature', () => {
  it('formats Celsius by default', () => {
    expect(formatTemperature(90)).toBe('90°C')
  })
  it('formats Fahrenheit when specified', () => {
    expect(formatTemperature(194, 'F')).toBe('194°F')
  })
})
```

**Example Zod schema test pattern:**
```ts
// packages/utils/src/validation.test.ts
import { describe, it, expect } from 'vitest'
import { slugSchema, coordinatesSchema } from './validation'

describe('slugSchema', () => {
  it('accepts valid slugs', () => {
    expect(slugSchema.safeParse('uji-region').success).toBe(true)
  })
  it('rejects slugs with uppercase', () => {
    expect(slugSchema.safeParse('Uji-Region').success).toBe(false)
  })
})
```

**Example React component test pattern:**
```tsx
// apps/web/src/components/Button/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Button } from '@repo/ui'

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Explore Coffee</Button>)
    expect(screen.getByRole('button', { name: 'Explore Coffee' })).toBeInTheDocument()
  })
})
```

---

## Coverage

**Requirements:** None enforced (no coverage config present)

**Recommended targets when testing is implemented:**
- Utilities (`packages/utils`): 100% (pure functions, easy to achieve)
- Validation schemas (`packages/utils`): 100%
- UI components (`packages/ui`): 80%+
- Application pages (`apps/web`): critical paths only via E2E

---

*Testing analysis: 2026-03-29*
