# The Global Grind & Whisk

A comprehensive coffee and matcha encyclopedia built as a Progressive Web App with Next.js, Supabase, and modern TypeScript.

## Overview

**The Global Grind & Whisk** is a coffee and matcha encyclopedia/wiki website that celebrates both coffee (global) and matcha (Japanese) traditions through an educational, interactive experience.

### Current State
This repository contains design mockups and prototypes (static HTML) for various pages, serving as the visual reference for the full implementation.

### Planned Implementation
The project will be built as a **Progressive Web App (PWA)** using a modern TypeScript monorepo architecture with Next.js, Supabase backend, and desktop-first responsive design.

## Project Structure

This is a Turbo monorepo containing:

```
coffee-wiki/
├── apps/
│   └── web/                 # Next.js 15 application (App Router)
├── packages/
│   ├── ui/                  # Shared UI components (Tamagui)
│   ├── database/            # Supabase client & types
│   ├── utils/               # Shared utilities
│   └── config/              # Shared configurations (ESLint, Tailwind, TypeScript)
├── coffee-wiki-design/      # Original HTML prototypes (design reference)
├── docs/                    # Project documentation
├── scripts/                 # Build and utility scripts
├── turbo/                   # Turbo generators
├── ROADMAP.md              # Project roadmap
├── CLAUDE.md               # Navigation index
└── README.md               # This file (architecture documentation)
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation

1. **Install dependencies:**

```bash
pnpm install
```

2. **Set up environment variables:**

```bash
cp .env.example apps/web/.env.local
```

Edit `apps/web/.env.local` and add your Supabase credentials.

3. **Run the development server:**

```bash
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Available Commands

```bash
# Development
pnpm dev              # Start all apps in development mode
pnpm dev --filter=web # Start only the web app

# Building
pnpm build            # Build all apps and packages
pnpm build --filter=web # Build only the web app

# Code Quality
pnpm lint             # Lint all packages
pnpm type-check       # Type check all packages
pnpm format           # Format code with Prettier

# Testing
pnpm test             # Run tests in all packages

# Clean
pnpm clean            # Remove all node_modules and build artifacts

# Generators
pnpm turbo gen        # Create new components/routes with Turbo generators
```

### Viewing Design Prototypes

```bash
# Open directly in browser
open coffee-wiki-design/matcha_region_page_1/code.html

# Or use a local server
python3 -m http.server 8000
# Navigate to http://localhost:8000/coffee-wiki-design/matcha_region_page_1/code.html
```

## Architecture

### Technology Stack

**Core Framework:**
- **Next.js 15** - React framework with App Router for production web application
- **React 19** - UI library
- **TypeScript 5** - Type-safe development
- **PWA** - Progressive Web App capabilities (offline support, installable)

**UI & Styling:**
- **Tamagui** - Cross-platform UI components and styling system
- **Tailwind CSS** - Utility-first CSS (compatible with design mockups)
- **Material Symbols** - Icon system (as per design mockups)

**State Management & Data:**
- **Zustand** - Lightweight global state management
- **TanStack React Query** - Server state, data fetching, caching, and synchronization
- **Zod** - Runtime schema validation and type inference

**Backend & Database:**
- **Supabase** - Backend-as-a-Service (Auth, Database, Storage, Realtime)
- **PostgreSQL** - Database (via Supabase)

**Internationalization:**
- **i18next** - Internationalization framework
- **react-i18next** - React bindings for i18next

**Payments:**
- **Stripe** - Payment processing and subscription management

**Monorepo Management:**
- **Turbo** - High-performance build system for monorepos
- **pnpm** - Package manager with workspace support

**Development Tools:**
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Unit testing
- **Playwright/Cypress** - E2E testing

### Design System

The app uses a warm, earthy color palette inspired by coffee and matcha:

#### Color Palette

**Coffee Colors:**
- Espresso: `#4B3621`, `#4A3B32`
- Coffee accent: `#A67B5B`, `#D4A373`
- Cream/Beige: `#FDFBF7`, `#F5F1E8`, `#F5F2EB`

**Matcha Colors:**
- Matcha green: `#8FA668`, `#8C9E84`
- Matcha dark: `#5F7144`, `#5C6B56`

**Base Colors:**
- Text: `#2C241B`, `#2C2420`
- Background light: `#FDFBF7`, `#FAF9F6`
- Background dark: `#1C1917`, `#1E1B18`

#### Typography Hierarchy

- **Sans-serif**: Plus Jakarta Sans (UI, body text)
- **Serif**: Playfair Display, Lora (headings, titles)

Hierarchy:
- **H1**: 4xl to 6xl, font-black or font-extrabold, serif
- **H2**: 2xl to 3xl, font-bold, serif
- **H3**: lg to xl, font-semibold or font-medium, serif
- **Body**: sm to lg, font-normal or font-light, sans
- **Labels/Badges**: xs to sm, font-bold, uppercase, tracked

#### Layout Patterns

- **Max container width**: `7xl` (1280px)
- **Responsive breakpoints**: Desktop-first (lg → md → sm)
- **Card components**: Rounded corners (xl to 3xl), soft shadows
- **Header**: Sticky with backdrop blur
- **Interactive elements**: Pin markers on maps, hover tooltips

### Responsive Design Strategy

**Desktop-First Approach:**
- Design and develop for desktop (1280px+) first
- Scale down to tablet (768px - 1279px)
- Adapt to mobile (< 768px) with simplified layouts
- Hide or collapse complex UI elements on smaller screens
- Ensure touch targets are appropriately sized on tablet/mobile
- Test responsive behavior at common breakpoints: 1920px, 1440px, 1280px, 1024px, 768px, 640px, 375px

## Code Style and Structure

### TypeScript Conventions

- Write concise, technical TypeScript code with accurate examples
- Use functional and declarative programming patterns; avoid classes
- Prefer iteration and modularization over code duplication
- Use descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`)
- Structure files: exported components, subcomponents, helpers, static content, types
- Favor named exports for components and functions
- Use lowercase with dashes for directory names (e.g., `components/auth-wizard`)

### TypeScript and Zod Usage

- Use TypeScript for all code; prefer interfaces over types for object shapes
- Utilize Zod for schema validation and type inference
- Avoid enums; use literal types or maps instead
- Implement functional components with TypeScript interfaces for props

### Syntax and Formatting

- Use the `function` keyword for pure functions
- Write declarative JSX with clear and readable structure
- Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements

## State Management and Data Fetching

- Use **Zustand** for global state management
- Use **TanStack React Query** for server state, data fetching, caching, and synchronization
- Minimize the use of `useEffect` and `setState`; favor derived state and memoization when possible
- Keep state as close to where it's used as possible

## Error Handling and Validation

- Prioritize error handling and edge cases
- Handle errors and edge cases at the beginning of functions
- Use early returns for error conditions to avoid deep nesting
- Utilize guard clauses to handle preconditions and invalid states early
- Implement proper error logging and user-friendly error messages
- Use custom error types or factories for consistent error handling
- Use Zod schemas to validate data at boundaries (API responses, user inputs)

## Performance Optimization

- Optimize for web performance (desktop and responsive)
- Use dynamic imports for code splitting in Next.js
- Implement lazy loading for non-critical components
- Optimize images: use appropriate formats (WebP, AVIF), include size data, implement lazy loading
- Leverage Next.js Image component for automatic optimization
- Implement proper caching strategies with React Query
- Use Server Components where appropriate (Next.js App Router)

## Backend and Database (Supabase)

- Use **Supabase** for backend services (authentication, database, storage, realtime)
- Follow Supabase guidelines for Row Level Security (RLS) policies
- Use Zod schemas to validate data exchanged with the backend
- Implement proper error handling for database operations
- Use Supabase client-side for auth and realtime features
- Consider server-side Supabase client for secure operations

### Database Schema Considerations

Based on the design mockups, the database should support:

**Core Entities:**
- **Regions** - Coffee and matcha growing regions (Uji, Yirgacheffe, etc.)
  - Geography data (coordinates, climate, elevation)
  - Terroir characteristics
- **Cultivars** - Plant varieties (Samidori, Caturra, Heirloom, etc.)
- **Processing Methods** - Washed, natural, anaerobic fermentation, etc.
- **Brewing Methods** - V60, French Press, Espresso, Usucha, Koicha, etc.
- **Articles/Guides** - Encyclopedia content
- **Users** - For authentication and personalization
- **Subscriptions** - For newsletter and premium features

**Relationships:**
- Regions → Cultivars (many-to-many)
- Regions → Processing Methods (many-to-many)
- Articles → Regions/Cultivars/Methods (tagged content)

## Internationalization

- Use **i18next** and **react-i18next** for the web application
- Ensure all user-facing text is internationalized and supports localization
- Structure translation files by feature/page for maintainability
- Support English and additional languages as needed

## Stripe Integration and Subscription Model

- Implement **Stripe** for payment processing and subscription management
- Use Stripe's Customer Portal for subscription management
- Implement webhook handlers for Stripe events (subscription created, updated, cancelled)
- Ensure proper error handling and security measures for Stripe integration
- Sync subscription status with user data in Supabase
- Consider tiered access: free (basic content) → premium (advanced guides, exclusive regions)

## Progressive Web App (PWA) Features

- Configure Next.js for PWA capabilities using `next-pwa` or similar
- Implement service worker for offline support
- Create manifest.json for installability
- Support offline reading of cached encyclopedia articles
- Implement proper caching strategies for static assets and API responses
- Add "Add to Home Screen" prompts for desktop and mobile browsers

## Content Architecture

### Page Types (from design mockups)

1. **Home/Landing Page** (`matcha_region_page_1`)
   - Hero section with interactive world map
   - Category cards for Coffee vs Matcha
   - Topic browsing grid
   - Newsletter signup

2. **Region Profile Pages** (`matcha_region_page_5`)
   - Geographic information with interactive map
   - Climate and terroir data cards
   - Cultivar information
   - Flavor profile visualizations
   - Related regions/topics

3. **Brewing & Preparation Hubs** (`matcha_region_page_10`)
   - Method category sections (Coffee/Matcha separated)
   - Brewing technique cards
   - Equipment guides

4. **Encyclopedia/Index Pages** (`matcha_region_page_9`)
   - Alphabetical or categorical listings
   - Search and filter functionality

### Key UI Components to Implement

**Interactive Map:**
- Map library: Mapbox GL JS or Leaflet
- Pulsing animation on region pins
- Hover tooltips with location details
- Coffee regions use coffee-accent color
- Matcha regions use matcha green color
- Zoom and pan controls

**Card Layouts:**
- Hover effects with shadow elevation
- Icon + heading + description pattern
- Arrow indicators for links
- Badge labels for categories

**Navigation:**
- Sticky header with search
- Breadcrumb navigation on detail pages
- Primary nav with active state underline
- Search with autocomplete

**Search:**
- Full-text search across regions, cultivars, articles
- Filter by category (coffee/matcha, region, method)
- Debounced input for performance

## Testing and Quality Assurance

- Write unit and integration tests for critical components
- Use testing libraries compatible with React (Jest, React Testing Library, Vitest)
- Test Zod schemas separately
- Test API integrations with Supabase
- Ensure code coverage and quality metrics meet the project's requirements
- E2E testing for critical user flows (Playwright or Cypress)

## Migration from Prototypes to Production

When implementing features from the HTML prototypes:

1. **Extract Design Tokens:**
   - Convert Tailwind classes to Tamagui theme tokens
   - Preserve color palette, spacing, typography scales
   - Maintain animation timings and easing functions

2. **Component Breakdown:**
   - Identify reusable UI patterns in prototypes
   - Create Tamagui components matching the design
   - Ensure components are accessible (ARIA labels, keyboard navigation)

3. **Data Integration:**
   - Replace static content with Supabase queries
   - Implement loading and error states
   - Add skeleton screens for better UX

4. **Interactive Features:**
   - Implement functional search with Supabase full-text search
   - Add map interactivity with Mapbox/Leaflet
   - Build working theme toggle (light/dark mode)
   - Create functional newsletter signup with validation

## Design Philosophy

The site aims to feel:
- **Educational yet approachable** - Encyclopedia content without being dry
- **Warm and inviting** - Earth tones, rounded corners, generous whitespace
- **Detail-oriented** - Data-rich cards for climate, cultivars, flavor profiles
- **Cross-cultural** - Celebrating both coffee (global) and matcha (Japanese) traditions
- **Interactive** - Maps, hover states, visual hierarchies guide exploration
- **Fast and responsive** - Optimized performance, smooth animations, instant feedback
- **Accessible** - WCAG 2.1 AA compliance, keyboard navigation, screen reader support

## Development Guidelines

### Key Principles

- **Desktop-first responsive design**
- **TypeScript strict mode** - All code must be type-safe
- **Functional programming** - Prefer functions over classes
- **Component composition** - Build reusable, composable components
- **Server Components by default** - Use Client Components only when needed
- **Accessibility first** - WCAG 2.1 AA compliance
- **Avoid over-engineering** - Only make changes that are directly requested or clearly necessary
- **Keep solutions simple and focused**

### Monorepo Management

- Follow best practices using **Turbo** for monorepo setups
- Ensure packages are properly isolated and dependencies are correctly managed
- Use shared configurations and scripts where appropriate
- Utilize the workspace structure as defined in the root `package.json`
- Use Turbo generators for creating consistent components, screens, and API routes

### Environment Configuration

- Use `dotenv` for environment variable management
- Follow patterns for environment-specific configurations in `next.config.js`
- Never commit `.env` files; use `.env.example` as template

### Key Conventions

- Use descriptive and meaningful commit messages (Conventional Commits)
- Ensure code is clean, well-documented, and follows the project's coding standards
- Implement error handling and logging consistently across the application
- Keep components small and focused (Single Responsibility Principle)
- Prefer composition over inheritance
- Document complex logic with comments
- Use JSDoc for component props when TypeScript types aren't self-explanatory

## Package Development

### Creating a New Component

Components should be created in `packages/ui/src/` and exported from `packages/ui/src/index.ts`:

```tsx
// packages/ui/src/Button.tsx
import { forwardRef } from 'react'
import { cn } from './lib/utils'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return <button className={cn('...', className)} ref={ref} {...props} />
  }
)
```

### Using Shared Packages

Import from package aliases:

```tsx
import { Button } from '@repo/ui'
import { supabase } from '@repo/database'
import { formatTemperature } from '@repo/utils'
```

## Project Status

**Current Phase**: Phase 1 - Foundation & Setup ✅

See [ROADMAP.md](./ROADMAP.md) for detailed project timeline and milestones.

### Completed
- ✅ Monorepo initialized with Turbo
- ✅ Next.js app configured
- ✅ Tailwind CSS with custom theme
- ✅ TypeScript configured
- ✅ Shared packages structure
- ✅ Development tooling

### Next Steps
- [ ] Set up Supabase project
- [ ] Create database schema
- [ ] Build UI component library
- [ ] Implement landing page
- [ ] Convert HTML prototypes to Next.js pages

## Contributing

1. Follow the code style defined above
2. Write tests for new features
3. Update documentation as needed
4. Ensure all checks pass: `pnpm lint && pnpm type-check && pnpm test`

## Additional Resources

- Follow official documentation for Next.js, Tamagui, Supabase, and other technologies
- Stay updated with Next.js App Router best practices
- Refer to Supabase documentation for auth patterns and RLS policies
- Consult Stripe documentation for webhook implementation and security

## License

Private project - All rights reserved

## Support

For questions or issues, please refer to:
- [CLAUDE.md](./CLAUDE.md) - Navigation index for codebase
- [ROADMAP.md](./ROADMAP.md) - Project roadmap
