## 6. Technical Architecture and Frontend System

This chapter is the system-design contract: every stack decision, route, component, environment variable, and caching rule is specified so a builder executes without further questions. The stack is fixed: Next.js 16.2.x + Payload CMS 3.86 (embedded, PostgreSQL) + React 19 + Tailwind CSS v4 + shadcn/ui, delivered as a single Dockerfile. Chapter 7 wires integrations against 6.8; chapter 9 operationalizes the Dockerfile; chapter 10 enforces budgets against 6.3; chapter 12 quotes the 6.9 invariants verbatim.

### 6.1 Architecture overview

#### 6.1.1 Single deployable unit

One application serves everything. Payload 3.86 installs inside the Next.js app via `withPayload`, so admin panel, REST/GraphQL APIs, and public frontend are one deployable unit; React Server Components (RSC) query PostgreSQL through Payload's Local API with no HTTP hop[^58^]. Consequence: one Dockerfile, one CI pipeline, one Dokploy app, one Postgres. The anchor fact: Payload supports Next.js 16.2.0+ since v3.73 and explicitly does not support 15.5–16.1.x[^1^]; Next.js 15 security support ends 2026-10-21[^2^].

**Stack decision record.**

| Layer | Choice + version | Alternatives rejected | Reason | Source |
|---|---|---|---|---|
| Framework | Next.js 16.2.x (App Router) | Next.js 15 | Payload requires 16.2.0+; 15 EOL 2026-10-21 | [^1^][^2^] |
| CMS | Payload 3.86, embedded | Astro + separate Payload service | One unit + Local API; app-shaped needs (booking, forms, preview) outweigh Astro's JS advantage | [^75^][^76^] |
| Language/runtime | TypeScript 5.x `strict`, Node.js 22 LTS | Plain JavaScript | Generated collection types make ch.5 a compile-time contract (judgment call) | (judgment call — platform baseline) |
| Database | PostgreSQL 16 | MongoDB; SQLite | Recommended production adapter; SQLite dev/CI only; one DB hosts Payload jobs — no Redis | [^56^] |
| Styling | Tailwind CSS v4.3, CSS-first `@theme` | tailwind.config.js-era v3 | 2026 standard; no config file; shadcn/ui ships on v4 | [^59^] |
| UI primitives | shadcn/ui (v4 build) | Runtime libraries (MUI, Chakra) | Source-owned, no runtime theme cost, accessible bases | [^59^] |
| Media storage | `@payloadcms/storage-s3` → Cloudflare R2 | MinIO (fallback); local disk | Zero egress; off-VPS durability | [^56^] |
| Email | Resend via `email-resend` adapter + React Email | Self-hosted SMTP | Free 3,000/mo (100/day), Pro $20/mo; EU residency needs Pro+ | [^64^][^65^] |
| Forms | `@payloadcms/plugin-form-builder` | Custom form engine | Maintained plugin; submissions in Postgres | [^3^] |
| Analytics | Umami (self-hosted) | GA4; Plausible CE | Cookieless, GDPR-friendly, same VPS | [^81^] |
| Booking | Cal.com Cloud embed + Routing Forms | Calendly | Calendly: no self-host, API gated; Cal.com: free tier, white-label | [^60^][^61^] |
| Newsletter | Listmonk + SES/Resend SMTP | Mailchimp; MailerLite-as-default | ~$8–10/mo vs $32–73/mo; data stays on VPS | [^66^] |
| Deployment | Dokploy VPS, `output: 'standalone'` Dockerfile | Vercel hosting | Client constraint: self-hosted Dokploy; standalone output documented | [^70^][^77^] |

The pattern is consolidation over best-of-breed: nine of thirteen layers run in or beside the single app container, which is what makes a solo-operated VPS realistic. The three external dependencies (R2, Resend, Cal.com Cloud) each carry a documented fallback (MinIO, SES SMTP, Cal.com self-host), so no vendor failure is unrecoverable. Two rejections are deliberate trade-offs: Astro's static purity loses because draft preview, booking embeds, and form handling are app-shaped, not page-shaped, requirements[^75^][^76^]; Vercel loses because the client mandates a Dokploy VPS, and the standalone-Dockerfile pattern keeps the codebase host-portable regardless[^78^].

**Figure 1 — system context (describe to designer).** Center: one rectangle, "Next.js 16.2.x + Payload 3.86 container (port 3000)", inside a "Dokploy VPS" boundary. Left: "Browser" → "Traefik (Let's Encrypt TLS)" → container. Inside the boundary, internal-network arrows from the container to "PostgreSQL 16" (content, forms, jobs), "Listmonk + its Postgres", and "Uptime Kuma" (annotate "pair with one hosted external monitor"[^83^]); a "Umami" node receives a browser-beacon arrow. Outside: dashed arrows from the container to "Cloudflare R2 (media)" and "Resend (mail)"; from the browser to "Cal.com Cloud (embed)". Top CI/CD lane: "GitHub → GitHub Actions (lint, typecheck, test, image build) → GHCR → Dokploy webhook → container swap"[^78^]. Solid = request path; dashed = integration; dotted = CI/CD.

### 6.2 Repository and application topology

#### 6.2.1 One repository, route groups mirroring the sitemap

Single repo; no workspace split. Build exactly this layout:

```
src/
  app/
    (marketing)/   # /, /services/*, /platforms/*, /migrate/*, /solutions/*, /about, /pricing, /contact, /legal/*
                   # /markets, /markets/[region]  (index + 3 region pages)
    (work)/        # /work, /work/[slug]
    (insights)/    # /insights, /insights/[slug]
    (resources)/   # gated landings
    (tools)/       # /tools/replatforming-calculator
    (utility)/     # /book, /thank-you/*, 404
    (payload)/     # /admin, /api — Payload-owned
  collections/  globals/        # 16 collections, 5 globals per ch.5
  blocks/       components/     # 13 block renderers; ui/ primitives + composed
  lib/  payload.config.ts       # payload client, seo/JSON-LD builders
scripts/seed.ts  tests/  Dockerfile  .github/workflows/ci.yml
```

Usage note: route groups mirror chapter 3's sitemap, so the IA audit (3.7) maps to directories.

### 6.3 Rendering, data access, and caching strategy

#### 6.3.1 Static first, islands where interaction demands it

All indexable content is statically generated with Incremental Static Regeneration (ISR); server components fetch via the Local API with `draft: false`, so cache hits never touch the database. Revalidation is dual-triggered: time-based fallback plus on-demand `revalidatePath` from Payload `afterChange` hooks, making publishes visible within seconds. Draft preview is fully dynamic under Next.js Draft Mode, never cached. Client islands are confined to forms, FAQ disclosure, the Cal.com embed, the calculator, and the mobile menu; everything else stays RSC. `/admin` is excluded from Core Web Vitals budgets; public targets: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1, TTFB <800ms[^84^][^85^].

**Route-to-rendering matrix.**

| Page type (ch.3) | Route group | Rendering mode | Revalidation rule |
|---|---|---|---|
| Homepage; indexes; pillars; hubs; solutions; about/pricing/contact | (marketing) | SSG + ISR | 3,600s + on-demand on publish |
| Migration-pair pages | (marketing) | SSG + ISR | 3,600s + on-demand (EOS-date content) |
| Case studies; articles | (work), (insights) | SSG + ISR via `generateStaticParams` | 3,600s + on-demand |
| Gated landings | (resources) | Static shell + client form island | 3,600s + on-demand |
| TCO calculator | (tools) | Static shell + client island | No per-request CMS fetch |
| /book | (utility) | Static shell + Cal.com embed island | None |
| Legal pages | (marketing) | SSG + ISR | 86,400s |
| Thank-you pages; 404 | (utility) | Static, `noindex`, excluded from sitemap.xml | None |
| Draft preview (all collections) | Shared preview route | Dynamic; Draft Mode session required | Never cached |
| /admin, /api | (payload) | Dynamic | Excluded from CWV budgets |

Usage note: a page that cannot state its row fails review; query-filtered views (`?tag=`) are dynamic, `noindex,follow` (3.4.1).

**Figure 2 — request flow (describe to designer).** Two swim-lanes. Lane A "Public page request": Browser → Traefik → Next.js → diamond "ISR cache hit?" — YES: serve cached HTML ("TTFB <800ms target"); NO: RSC render → "Payload Local API" → Postgres → HTML → "write ISR cache" → response. Lane B "Editor preview": Payload admin Live Preview panel → preview route with Draft Mode cookie → Local API with `draft: true` → Postgres drafts → draft streamed into the admin iframe via `@payloadcms/live-preview-react` ("never written to ISR cache"). A dashed arrow from "Payload afterChange hook" to "revalidatePath → ISR cache" connects editorial action to Lane A.

### 6.4 Routing and layout architecture

#### 6.4.1 Layouts, metadata, redirects, admin/public separation

Each route group owns one `layout.tsx`: marketing, work, insights, and resources share a header/footer shell driven by the Navigation global; (utility) renders a minimal booking-focused shell; (payload) is Payload's own, never touched. Every page implements `generateMetadata` reading the ch.5 `seo` group with SeoDefaults fallbacks; `app/sitemap.ts` enumerates published documents dynamically; `app/robots.ts` emits the ch.8 crawler policy — AI crawlers are not blocked[^69^]. Middleware loads the Redirects global and executes 301s before routing, enforcing the no-trailing-slash canonical (3.4.1); `not-found.tsx` implements the ch.4 404 blueprint. Nothing under (payload) inherits public layouts, budgets, or analytics.

### 6.5 Design system architecture

#### 6.5.1 CSS-first tokens, owned primitives, closed composed set

Tailwind v4 configuration lives entirely in CSS: `@theme` in `globals.css` declares color, typography, and spacing tokens — no `tailwind.config.js`[^59^]. shadcn/ui primitives are installed into `components/ui/` and owned by the repo. Ownership rule: primitives change only with a design-token amendment; composed components only with a chapter 4 blueprint amendment (5.11).

**Component inventory.**

| Component | Type | Renders block | Notes |
|---|---|---|---|
| Button, Badge, Card, Separator, Table | Primitive | — | CTA variants keyed to CtaConfig; Card/Table base the card and table blocks |
| Accordion, NavigationMenu, Sheet, Dialog | Primitive | — | Client; disclosure, nav, mobile menu, Cal.com pop-up |
| Input, Textarea, Select, Checkbox, Label, Form | Primitive | — | plugin-form-builder render pattern[^3^] |
| `<HeroBlock />` | Composed | Hero | Variants: default, platform, migration |
| `<RichTextBlock />` | Composed | RichTextSection | Prose width via `maxWidth` |
| `<FeatureGridBlock />` | Composed | FeatureGrid | 2–6 items, icon select |
| `<MetricsRowBlock />` | Composed | MetricsCalloutRow | Context line mandatory |
| `<CaseStudyCardsBlock />` | Composed | CaseStudyCardList | Manual or relationship-sourced |
| `<CtaBandBlock />` | Composed | CtaBand | CTA must match the ch.3.6 row |
| `<FaqAccordionBlock />` | Composed | FaqAccordion | Client island; emits FAQPage JSON-LD[^68^] |
| `<TrustStripBlock />` | Composed | TrustStrip | Partner badges only once earned |
| `<PricingTableBlock />` | Composed | PricingTable | "From" prices per engagement model |
| `<EmbedBlock />` | Composed | Embed | Client; cal-inline, cal-popup, video[^60^] |
| `<TestimonialBlock />` | Composed | Testimonial | Quote or card layout |
| `<ComparisonTableBlock />` | Composed | ComparisonTable | Footnote citation slot mandatory |
| `<PillarCardsBlock />` | Composed | PillarCards | Homepage Build & Grow band; exactly 3 cards with per-card link (5.11, ad:D9) |

Usage note: block renderers are RSC by default; only FaqAccordion, Embed, forms, and nav disclosure cross the client boundary.

### 6.6 Content preview and editorial experience

#### 6.6.1 Live Preview through Draft Mode

Every public collection declares `admin.livePreview` and `admin.preview` URL functions; the admin iframe loads a shared preview route that enables Next.js Draft Mode and re-queries with `draft: true`, while `@payloadcms/live-preview-react` updates in place as the editor types[^56^]. Hence `versions.drafts` is mandatory (5.9): without it, preview reads published state and lies to editors. Preview routes are excluded from ISR, robots, and analytics, and require an authenticated session.

### 6.7 Media and image pipeline

#### 6.7.1 R2-backed responsive images, dynamic OG, alt text enforced

Uploads land in Cloudflare R2 via `@payloadcms/storage-s3` (region `auto`, custom endpoint; MinIO fallback)[^56^]. Media generates three sizes (card 800w, hero 1920w, OG 1200×630, per 5.7); the frontend renders `next/image` with `srcset`, AVIF/WebP, lazy loading below the fold, `priority` on the LCP hero. Alt text is required at upload — the renderer refuses an image without it, protecting the Lighthouse Accessibility 100 target. Gated PDFs serve via signed URLs after form capture. Pages without an explicit `seo.ogImage` get dynamic OG images from `next/og`, so every shared link carries an image[^70^].

### 6.8 Configuration, environments, and secrets

#### 6.8.1 Sixteen environment variables, validated at boot

Three environments: local (`.env.local`; SQLite permitted for dev/CI only), staging (Dokploy branch preview), production (Dokploy env store). Secrets live only in Dokploy and local `.env` files — never in the repo, never in `NEXT_PUBLIC_*` unless genuinely public. `lib/env.ts` validates all variables at boot with zod; the container refuses to start on a missing value. No Redis: Payload jobs run on Postgres; Redis appears only if Cal.com is later self-hosted[^62^].

**Environment-variable table.**

| Name | Purpose | Where set | Secret? |
|---|---|---|---|
| DATABASE_URI | Postgres connection (content, forms, jobs) | Dokploy env | Yes |
| PAYLOAD_SECRET | Payload session/encryption key | Dokploy env | Yes |
| NEXT_PUBLIC_SERVER_URL | Canonical public URL (metadata, OG, sitemap) | Build args + env | No |
| RESEND_API_KEY | Transactional email | Dokploy env | Yes |
| EMAIL_FROM | Verified sender identity | Dokploy env | No |
| S3_ENDPOINT | R2 endpoint (or MinIO URL) | Dokploy env | No |
| S3_BUCKET | Media bucket | Dokploy env | No |
| S3_ACCESS_KEY_ID | R2 API token ID | Dokploy env | Yes |
| S3_SECRET_ACCESS_KEY | R2 API token secret | Dokploy env | Yes |
| S3_REGION | `auto` for R2 | Dokploy env | No |
| CALCOM_EMBED_URL | Cal.com Cloud embed base URL | Dokploy env | No |
| LISTMONK_URL | Internal Listmonk API URL (Docker network) | Dokploy env | No |
| LISTMONK_API_USER | Listmonk API username | Dokploy env | Yes |
| LISTMONK_API_TOKEN | Listmonk API token | Dokploy env | Yes |
| UMAMI_SCRIPT_URL | Umami tracker script URL | Dokploy env | No (public) |
| UMAMI_WEBSITE_ID | Umami site identifier | Dokploy env | No (public) |

Usage note: chapter 7 consumes every row; adding an integration means adding a row here first, and CI fails on undocumented variables.

### 6.9 Errors, empty states, and observability hooks

#### 6.9.1 Degrade gracefully, log without personal data, hold the invariants

Three failure classes, each with specified behavior. **Application errors:** `error.tsx` per route group renders a branded recovery state with hub links; unhandled errors fall to the ch.4 404/500 templates. **CMS-empty states:** every block renderer defines an empty render — a TrustStrip with no clients falls back to OSS projects, an empty /work index shows the build-in-public notice, and a `metrics` row missing context blocks publish rather than rendering an unsourced number. **Integration failures:** Resend failure retains the FormSubmission in Postgres and retries via a Payload job; Listmonk unreachable queues subscriber sync; Cal.com script failure falls back to a booking-link card; a blocked Umami is silent by design. Logging: structured logs to stdout (Dokploy viewer), no personal data in log lines; Uptime Kuma plus one hosted external monitor cover availability[^82^][^83^].

**Architecture invariants (chapter 12 quotes these verbatim).**

- [ ] Single Dockerfile deploys the entire application (`output: 'standalone'`); no second build artifact.
- [ ] No second database: content, forms, and jobs share one PostgreSQL.
- [ ] No Redis unless Cal.com is self-hosted in a later phase (recorded decision required).
- [ ] RSC-first: no client-side fetching of indexable content; all indexable content is fully server-rendered.
- [ ] `'use client'` is minimal and confined to forms, embeds, disclosure widgets, and the calculator.
- [ ] No new runtime dependency without a recorded justification appended to the 6.1 decision record.
- [ ] TypeScript `strict` everywhere; Payload-generated types are the single source for collection shapes.
- [ ] `/admin` and `/api` are excluded from public CWV budgets; public budgets are LCP ≤2.5s, INP ≤200ms, CLS ≤0.1, TTFB <800ms[^84^][^85^].
- [ ] Every indexable route renders complete HTML at first response — no skeleton-first content.
- [ ] Environment variables exist only in the 6.8 table; undocumented configuration fails CI.
