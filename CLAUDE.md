# The Global Grind & Whisk

A coffee and matcha encyclopedia built as a Progressive Web App with Next.js, Supabase, and modern TypeScript.

## Files

| File                  | What                                      | When to read                                               |
| --------------------- | ----------------------------------------- | ---------------------------------------------------------- |
| `README.md`           | Architecture and development guide        | Understanding project structure, tech stack, conventions   |
| `package.json`        | Root workspace configuration              | Adding dependencies, configuring scripts                   |
| `pnpm-workspace.yaml` | pnpm workspace definition                 | Modifying monorepo structure, adding packages              |
| `turbo.json`          | Turbo pipeline configuration              | Optimizing builds, configuring task dependencies           |
| `.env.example`        | Environment variable template             | Setting up local environment, required config              |
| `.gitignore`          | Git ignore patterns                       | Adding files to ignore, debugging git issues               |
| `.prettierrc.json`    | Prettier formatting configuration         | Modifying code formatting rules                            |

## Subdirectories

| Directory              | What                                      | When to read                                               |
| ---------------------- | ----------------------------------------- | ---------------------------------------------------------- |
| `apps/`                | Next.js web application                   | Implementing features, pages, app-level code               |
| `packages/`            | Shared packages (ui, database, utils)     | Creating reusable components, utilities, database clients  |
| `coffee-wiki-design/`  | Static HTML design prototypes             | Extracting design patterns, converting to components       |
| `docs/`                | Project documentation                     | Understanding processes, guidelines, additional specs      |
| `scripts/`             | Build and utility scripts                 | Running maintenance tasks, automation                      |
| `turbo/`               | Turbo generators for scaffolding          | Generating new components, routes, packages                |

## Build

```bash
pnpm install  # Install dependencies
pnpm build    # Build all apps and packages
```

## Test

```bash
pnpm test        # Run all tests
pnpm type-check  # Type check all packages
pnpm lint        # Lint all packages
```

## Development

### Setup

1. Install dependencies: `pnpm install`
2. Copy `.env.example` to `apps/web/.env.local` and add Supabase credentials
3. Run dev server: `pnpm dev` (available at http://localhost:3000)

### Key Commands

- `pnpm dev` - Start all apps in development mode
- `pnpm dev --filter=web` - Start only web app
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Lint all packages
- `pnpm format` - Format code with Prettier
- `pnpm turbo gen` - Generate new components/routes

### Tech Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript 5
- **UI**: Tamagui, Tailwind CSS, Material Symbols
- **State**: Zustand, TanStack React Query, Zod
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Monorepo**: Turbo, pnpm workspaces

### Workflow

- Desktop-first responsive design (1280px+ → tablet → mobile)
- TypeScript strict mode (all code must be type-safe)
- Functional programming patterns (prefer functions over classes)
- Server Components by default (use Client Components only when needed)
- See `README.md` for detailed architecture, conventions, and guidelines
