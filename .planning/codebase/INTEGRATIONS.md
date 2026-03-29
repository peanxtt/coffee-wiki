# External Integrations

**Analysis Date:** 2026-03-29

This project integrates with Supabase as its primary backend (database, auth, storage, realtime), Mapbox for interactive maps, and Stripe for payments. As of Phase 1, only the Supabase client is scaffolded. Mapbox, Stripe, and i18next are documented as planned but not yet installed.

## APIs & External Services

### Supabase (Primary Backend)
- **What it's used for:** PostgreSQL database, user authentication, file storage, realtime subscriptions
- **SDK:** `@supabase/supabase-js` 2.47.10
- **Client location:** `packages/database/src/client.ts`
- **Export:** `supabase` (anon client), `getSupabaseAdmin()` (service-role server-side client)
- **Auth:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- **Status:** Client scaffolded. Database schema not yet defined (`packages/database/src/types.ts` has empty placeholder tables).
- **RLS:** Row Level Security policies planned per README guidelines.

### Mapbox (Interactive Maps)
- **What it's used for:** Interactive world map showing coffee/matcha growing regions; pin markers, hover tooltips, zoom/pan controls
- **SDK/Client:** Mapbox GL JS (planned — not yet installed)
- **Auth:** `NEXT_PUBLIC_MAPBOX_TOKEN`
- **Status:** Not yet implemented. README references Mapbox GL JS or Leaflet as candidates.

### Stripe (Payments)
- **What it's used for:** Payment processing and subscription management; tiered access (free vs premium content)
- **SDK/Client:** Stripe SDK (planned — not yet installed)
- **Auth:** `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- **Integration plan:**
  - Stripe Customer Portal for subscription self-management
  - Webhook handlers for subscription lifecycle events (created, updated, cancelled)
  - Subscription status synced to user data in Supabase
- **Status:** Not yet implemented.

## Data Storage

**Databases:**
- PostgreSQL via Supabase
  - Connection: `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Admin connection: `SUPABASE_SERVICE_ROLE_KEY`
  - Client: `@supabase/supabase-js` with generated `Database` type at `packages/database/src/types.ts`
  - Planned entities: Regions, Cultivars, Processing Methods, Brewing Methods, Articles, Users, Subscriptions

**File Storage:**
- Supabase Storage (planned for user uploads, article images)

**Caching:**
- TanStack React Query client-side cache (in-memory, no persistent cache configured yet)

## Authentication & Identity

**Auth Provider:**
- Supabase Auth
  - Client-side: `supabase.auth.*` methods via `@repo/database` client
  - Server-side: `getSupabaseAdmin()` in API routes / Server Actions
  - OAuth pattern: Google user avatar domain (`lh3.googleusercontent.com`) already allowlisted in `apps/web/next.config.js` image config — indicates Google OAuth is planned

## Internationalization

**Provider:**
- i18next + react-i18next (planned — not yet installed)
- Purpose: Multi-language support for encyclopedia content
- Status: Not yet implemented.

## Google Fonts

**Provider:** Google Fonts via `next/font/google`
- Plus Jakarta Sans — sans-serif body font, loaded in `apps/web/src/app/layout.tsx`
- Playfair Display — serif heading font, loaded in `apps/web/src/app/layout.tsx`
- Font domain `fonts.gstatic.com` allowlisted in `apps/web/next.config.js`

## Monitoring & Observability

**Error Tracking:** Not configured.
**Logs:** Not configured beyond Next.js defaults.

## CI/CD & Deployment

**Hosting:** Not explicitly configured. Vercel strongly implied by project patterns (Next.js, `turbo.json` output caching structure).
**CI Pipeline:** None configured.

## Environment Configuration

**Required env vars (from `.env.example`):**

| Variable | Scope | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Client + Server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client + Server | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Supabase admin access |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Client | Mapbox map rendering |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Client | Stripe client-side |
| `STRIPE_SECRET_KEY` | Server only | Stripe server-side |
| `STRIPE_WEBHOOK_SECRET` | Server only | Stripe webhook verification |
| `NEXT_PUBLIC_APP_URL` | Client + Server | Base URL (default: http://localhost:3000) |

**Secrets location:** `apps/web/.env.local` (not committed). Template at root `.env.example`.

**Setup:** Copy `.env.example` to `apps/web/.env.local` and fill in Supabase credentials to run locally.

## Webhooks & Callbacks

**Incoming (planned):**
- Stripe webhooks — subscription lifecycle events. Route not yet created. Will need `STRIPE_WEBHOOK_SECRET` for signature verification.

**Outgoing:**
- None configured.

---

*Integration audit: 2026-03-29*
