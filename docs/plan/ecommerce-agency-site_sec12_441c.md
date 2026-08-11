## 12. Kimi Code Prompt Pack

This chapter packages chapter 11's phases into copy-paste prompts for Kimi Code (K2.x agent): one reusable skeleton, eight phase prompts (P0–P7), five verification/repair prompts, a reference map, and a quality checklist.

### 12.1 Prompt usage rules and prompt contract

#### 12.1.1 This report contains no code; these prompts instruct Kimi Code to write code at execution time; prompts are copy-paste complete and self-contained (never assume agent memory); one prompt per phase + optional sub-prompts for P4/P5; split if context overflow

Five rules govern the pack. **No code in this document** — each prompt instructs Kimi Code to write the code at execution time; prompts carry decisions, scope, and gates, not implementations. **Self-contained execution** — no prompt assumes the agent remembers earlier prompts or sessions, which is why the Context block repeats verbatim. **One prompt per phase, in order** — run P0→P7 along the chapter 11 critical path; start a prompt only after the previous phase's acceptance checks pass with runnable evidence. **Split on context overflow** — use the P4/P5 split guidance (12.7, 12.8) first; otherwise split at a Scope-in boundary, never mid-deliverable. **Separate content-copy prompts from code prompts** — copywriting against chapter 4 blueprints is the parallel content track (11.10), prompted separately so code acceptance is never blocked by prose drafts.

**Prompt-to-chapter reference map.**

| Phase prompt | Chapters referenced (paste as excerpts) | Key acceptance gate |
|---|---|---|
| P0 Foundation | 6.1, 6.2, 6.8; 9.2, 9.3 | Boots, `/admin` reachable, CI green |
| P1 Design system | 2.9; 4.2; 6.5; 10.3 | Catalog renders, axe zero violations |
| P2 CMS models | 5.1–5.11; 3.4 | Schema exact match, seeds idempotent, preview works |
| P3 Core pages | 3.2–3.3, 3.6–3.7; 4.2–4.10, 4.18; 2.3–2.6; 6.3 | 20 routes render from CMS, CTAs correct |
| P4 Proof engine | 4.11–4.16, 4.19–4.20; 3.7; 5.4–5.5; 8.8 | 26 routes render; anti-thinness gate passes |
| P5 Integrations | 7.1–7.9; 3.4; 6.8–6.9 | Booking, forms, newsletter end-to-end |
| P6 SEO/hardening | 8.3–8.5; 10.2–10.4, 10.7; 3.4; 6.3 | Lighthouse ≥90/100/≥95/100, merge-blocking |
| P7 Deployment | 9.1–9.8; 10.7 | Cutover executes; restore test signed off |

Usage note: the middle column is the client's paste list — attach those excerpts with the prompt so the agent reads the specification, not a summary.

### 12.2 The fixed 9-part prompt skeleton

#### 12.2.1 Mandatory structure in order: 1 Role & objective · 2 Context block (pinned stack versions, single-Dockerfile embedded-Payload architecture, GenMedha Hub convention, established file paths) · 3 References (explicit chapter/section pointers) · 4 Scope in · 5 Scope out (prevents drift) · 6 Deliverables (named files/artifacts) · 7 Acceptance criteria (binary, mirroring ch.11) · 8 Constraints (architecture invariants from ch.6, TypeScript strict, no new deps without justification) · 9 Stop conditions/escalation

The order is mandatory because each part constrains the next: scope-out (5) stops the drift scope-in (4) invites; stop conditions (9) define what happens when acceptance (7) cannot be met. Template:

```markdown
1. ROLE & OBJECTIVE
You are a senior TypeScript/Next.js engineer building the GenMedha Hub agency website.
Objective: <one sentence naming the capability this phase adds>.

2. CONTEXT
Stack pins: Next.js 16.2.x, Payload CMS 3.86.0, React 19, Tailwind CSS v4,
shadcn/ui, PostgreSQL. Single Dockerfile, output:'standalone', non-root, port
3000. TypeScript strict. Brand placeholder GenMedha Hub, domain genmedhahub.com. Plan
document sections referenced below are provided to you as excerpts.

3. REFERENCES
The relevant sections of the architecture plan are pasted below this prompt /
attached as file.
[[PASTE: chapter X, sections Y–Z]]

4. SCOPE IN
<exhaustive build list; anything unlisted is out>

5. SCOPE OUT
<exclusions, each with its owning phase>

6. DELIVERABLES
<named files, routes, scripts, configs>

7. ACCEPTANCE CRITERIA
<4–6 binary checks, phrased as verifiable commands or states>

8. CONSTRAINTS
<ch.6 architecture invariants; TypeScript strict; no unjustified new deps>

9. STOP CONDITIONS
Halt and report — never guess — on: conflicting plan sections; missing credential
or env var; ambiguous copy or field; any acceptance check failing after 2 fix
attempts. State what you tried, the exact error, and the decision needed.
```

Parts 2, 8, and 9 repeat across prompts by design — repetition is what makes each prompt safe in a fresh session.

### 12.3 Phase 0 prompt — Foundation and scaffold

#### 12.3.1 Refs ch.6 (versions, Dockerfile, env vars), ch.10 (CI gates); acceptance: boots, admin reachable, CI green

```markdown
1. ROLE & OBJECTIVE
You are a senior TypeScript/Next.js engineer building the GenMedha Hub agency website.
Objective: create the repo, tooling, baseline Next.js + Payload app, and CI/CD
pipeline so later phases build on working delivery machinery.

2. CONTEXT
Stack pins: Next.js 16.2.x, Payload CMS 3.86.0, React 19, Tailwind CSS v4,
shadcn/ui, PostgreSQL. Single Dockerfile, output:'standalone', non-root, port
3000. TypeScript strict. Brand placeholder GenMedha Hub, domain genmedhahub.com. Plan
document sections referenced below are provided to you as excerpts.

3. REFERENCES
The relevant sections of the architecture plan are pasted below this prompt /
attached as file.
[[PASTE: chapter 6, sections 6.1, 6.2, 6.8]]
[[PASTE: chapter 9, sections 9.2, 9.3]]

4. SCOPE IN
- Repo and src/ layout exactly per ch.6.2; Next.js 16.2.x with Payload 3.86.0
  embedded via withPayload; PostgreSQL 16 (SQLite dev/CI only).
- TypeScript strict, ESLint, Vitest; non-root multi-stage Dockerfile on standalone
  output.
- GitHub Actions CI per ch.9.3: lint, typecheck, test, image build, GHCR push,
  Dokploy webhook deploy to staging.
- GET /api/health reporting DB connectivity and PAYLOAD_SECRET presence.
- lib/env.ts validating all 16 ch.6.8 env vars with zod at boot; four environments
  per ch.9.2.

5. SCOPE OUT
Design tokens (P1); collections (P2); marketing routes (P3); production DNS (P7).

6. DELIVERABLES
Repo in the 6.2 layout; Dockerfile; .github/workflows/ci.yml; lib/env.ts;
/api/health; reachable staging URL.

7. ACCEPTANCE CRITERIA
- pnpm build completes with 0 errors; app boots locally against Postgres; /admin
  login succeeds.
- Full CI pipeline green on main; image in GHCR; Dokploy deploys to staging.
- GET /api/health returns 200 within 60 s of a staging deploy.
- Boot fails loudly, naming the variable, on any missing required ch.6.8 env var.

8. CONSTRAINTS
Ch.6 invariants: single Dockerfile, no second artifact; one PostgreSQL, no second
DB, no Redis; RSC-first; no new runtime dep without a justification comment;
TypeScript strict; env vars per ch.6.8 only — undocumented config fails CI.

9. STOP CONDITIONS
Halt and report — never guess — on: conflicting plan sections; missing credential
or env var; ambiguous instruction; any acceptance check failing after 2 fix
attempts. State what you tried, the exact error, and the decision needed.
```

### 12.4 Phase 1 prompt — Design system

#### 12.4.1 Refs ch.2 (voice), ch.6 (tokens, shadcn inventory); acceptance: token set + catalog page renders, a11y checks pass

```markdown
1. ROLE & OBJECTIVE
You are a senior TypeScript/Next.js engineer building the GenMedha Hub agency website.
Objective: implement the design system — tokens, primitives, layout primitives,
global shell — so every visual decision downstream pages need exists once, in code.

2. CONTEXT
Stack pins: Next.js 16.2.x, Payload CMS 3.86.0, React 19, Tailwind CSS v4,
shadcn/ui, PostgreSQL. Single Dockerfile, output:'standalone', non-root, port
3000. TypeScript strict. Brand placeholder GenMedha Hub, domain genmedhahub.com. Plan
document sections referenced below are provided to you as excerpts.

3. REFERENCES
The relevant sections of the architecture plan are pasted below this prompt /
attached as file.
[[PASTE: chapter 2, section 2.9 (voice); chapter 4, section 4.2 (global shell);
chapter 6, section 6.5 (tokens, component inventory); chapter 10, section 10.3
(interactive states, a11y budget)]]

4. SCOPE IN
- Tailwind v4 CSS-first @theme tokens in globals.css (color, type, spacing); no
  tailwind.config.js; every text/background pair at contrast >= 4.5:1.
- ~10 shadcn/ui primitives in components/ui/ per the 6.5 inventory; layout
  primitives (container, grid, section, stack).
- Global shell per ch.4.2: header; Services dropdown grouped Commerce (Ecommerce
  Builds, Replatforming & Migration, Support & Retainers) / Build & Grow (Web App,
  Mobile App, Digital Marketing); footer; breadcrumbs; sticky mobile CTA.
- Interactive states per ch.10.3: visible focus, hover, disabled, reduced motion.
- A noindex /dev/catalog page rendering every primitive in every state.

5. SCOPE OUT
Block renderers and page composition (P3); any real content.

6. DELIVERABLES
globals.css @theme tokens; components/ui/ library; layout primitives; shell
components; /dev/catalog.

7. ACCEPTANCE CRITERIA
- /dev/catalog renders all primitives in all states; axe reports zero violations.
- Visible focus indicator on every interactive element; prefers-reduced-motion
  honored.
- Shell renders the ch.3.3 nav order: grouped dropdown on desktop, accordion on
  mobile.
- pnpm build completes with 0 errors; tokens freeze at this gate.

8. CONSTRAINTS
Ch.6 invariants: single Dockerfile; one PostgreSQL, no Redis; RSC-first —
'use client' confined to disclosure, nav menu, mobile menu; no new runtime dep
without a justification comment; TypeScript strict; env vars per ch.6.8 only.

9. STOP CONDITIONS
Halt and report — never guess — on: conflicting plan sections; missing credential;
ambiguous token or blueprint value; any acceptance check failing after 2 fix
attempts. State what you tried, the exact error, and the decision needed.
```

### 12.5 Phase 2 prompt — CMS models

#### 12.5.1 Refs ch.5 (all collection/block tables + traceability), ch.4 (template fields); acceptance: schema exact match, seeds present, preview works

```markdown
1. ROLE & OBJECTIVE
You are a senior TypeScript/Next.js engineer building the GenMedha Hub agency website.
Objective: implement the entire chapter 5 content model as running Payload config —
schema, not pages, is this phase's product.

2. CONTEXT
Stack pins: Next.js 16.2.x, Payload CMS 3.86.0, React 19, Tailwind CSS v4,
shadcn/ui, PostgreSQL. Single Dockerfile, output:'standalone', non-root, port
3000. TypeScript strict. Brand placeholder GenMedha Hub, domain genmedhahub.com. Plan
document sections referenced below are provided to you as excerpts.

3. REFERENCES
The relevant sections of the architecture plan are pasted below this prompt /
attached as file.
[[PASTE: chapter 5, sections 5.1–5.11 (all collection, global, block, hook,
workflow, and seed tables); chapter 3, section 3.4 (slug rules); chapter 4,
sections 4.3–4.20 (template field consumption)]]

4. SCOPE IN
- All 16 collections and 5 globals per the ch.5 field tables, including Services
  with servicePillar (commerce | build-grow) and parentService; the Markets
  collection (marketContext, engagementLogistics, complianceNotes, proofLinks);
  CaseStudies extended metrics plus serviceCategories/markets relationships.
- The 13-block layout-builder schema incl. PillarCards (ch.5.11).
- Media via @payloadcms/storage-s3 to Cloudflare R2, alt mandatory, three sizes
  per ch.5.7.
- Slug/redirect/cycle-guard hooks per ch.5.8 and ch.3.4.1, incl. {source}-to-
  {target} pair slugs.
- Drafts and the two-role access matrix (Editor cannot publish); Live Preview via
  Next.js Draft Mode.
- The full ch.5.10.1 seed, incl. three substantive Markets seeds, idempotent on a
  fresh database.

5. SCOPE OUT
Block renderers and templates (P3); editorial copy (content track); form wiring
beyond plugin install (P5).

6. DELIVERABLES
Collection/global configs; generated types; scripts/seed.ts; docs/editorial.md.

7. ACCEPTANCE CRITERIA
- Grep-level audit: every ch.5 collection, global, and required field exists;
  traceability tags complete per ch.5.10.1.
- Fresh-database seed runs idempotently, creating every ch.5.10.1 checklist item.
- Editor role cannot publish; Live Preview renders a draft via Draft Mode.
- Hooks reject invalid pair slugs and parentService cycles; pnpm build completes
  with 0 errors against generated types.

8. CONSTRAINTS
Ch.6 invariants: single Dockerfile; one PostgreSQL — content, forms, jobs share
it; no Redis; Payload-generated types are the single source for collection shapes;
no new runtime dep without a justification comment; TypeScript strict; env vars
per ch.6.8 only.

9. STOP CONDITIONS
Halt and report — never guess — on: conflicting field or slug rules; missing R2
credentials; ambiguous field table; any acceptance check failing after 2 fix
attempts. State what you tried, the exact error, and the decision needed.
```

### 12.6 Phase 3 prompt — Core marketing pages

#### 12.6.1 Refs ch.3 (sitemap/nav), ch.4 (blueprints), ch.2.3–2.6 (positioning statement, message hierarchy, service/platform narratives); acceptance: all P3 URLs render from CMS; scope-out: no embeds

```markdown
1. ROLE & OBJECTIVE
You are a senior TypeScript/Next.js engineer building the GenMedha Hub agency website.
Objective: make the navigation's money surface live and CMS-driven — all six
capability pillars, platform hubs, and utility routes.

2. CONTEXT
Stack pins: Next.js 16.2.x, Payload CMS 3.86.0, React 19, Tailwind CSS v4,
shadcn/ui, PostgreSQL. Single Dockerfile, output:'standalone', non-root, port
3000. TypeScript strict. Brand placeholder GenMedha Hub, domain genmedhahub.com. Plan
document sections referenced below are provided to you as excerpts.

3. REFERENCES
The relevant sections of the architecture plan are pasted below this prompt /
attached as file.
[[PASTE: chapter 3, sections 3.2, 3.3, 3.6, 3.7 (sitemap, nav, CTA table,
linking); chapter 4, sections 4.2–4.10, 4.18 (blueprints incl. Build & Grow);
chapter 2, sections 2.3–2.6 (positioning statement, message hierarchy,
service/platform narratives); chapter 6, sections
6.3, 6.4 (rendering, layouts, metadata)]]

4. SCOPE IN
- All 13 block renderers (ch.5.11) as RSC-first components, each with a defined
  empty state.
- 20 routes: / with the Build & Grow PillarCards band; /services + six pillars
  (ecommerce-builds, replatforming-migration, support-retainers,
  web-app-development, mobile-app-development, digital-marketing); /platforms +
  four hubs (medusa, vendure, shopify, adobe-commerce); /about; /contact
  (display-only); /book (static shell, empty embed slot); /legal/* x3; /404.
- Nav/footer from the Navigation global; baseline metadata via generateMetadata
  reading the ch.5 seo group with SeoDefaults fallbacks.
- Rendering per ch.6.3: SSG + ISR, 3,600 s + on-demand revalidation.

5. SCOPE OUT
Do NOT build booking embeds, forms wiring, analytics events, lead magnets, or the
TCO calculator — those are Phase 5. No P4 routes (/work, /insights, /migrate,
/solutions, /markets, marketing child pages). No JSON-LD (P6).

6. DELIVERABLES
Block renderer library; the 20 routes; metadata helper; nav/footer wiring.

7. ACCEPTANCE CRITERIA
- Every listed route returns 200 from seeded CMS content; /book renders with the
  embed slot empty; /contact is display-only.
- Each page's primary CTA matches its ch.3.6 row; offer CTAs pillar-locked
  (ch.3.6.1).
- Nav dropdown renders both groups; breadcrumbs match URL hierarchy at depth 2+;
  no orphan routes (ch.3.7).
- Every indexable route renders complete HTML at first response; pnpm build
  completes with 0 errors.

8. CONSTRAINTS
Ch.6 invariants: single Dockerfile; one PostgreSQL; RSC-first — no client-side
fetching of indexable content; 'use client' confined to FAQ disclosure and nav
widgets; no new runtime dep without a justification comment; TypeScript strict;
budgets LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1, first-load JS <= 200KB checked
from this phase on.

9. STOP CONDITIONS
Halt and report — never guess — on: blueprint conflicting with the CMS schema;
missing or ambiguous copy; undefined CTA row for a route; any acceptance check
failing after 2 fix attempts. State what you tried, the exact error, and the
decision needed.
```

### 12.7 Phase 4 prompt — Proof and content engine

#### 12.7.1 Refs ch.4 (case-study + migration templates), ch.8 (launch set, anti-thinness); acceptance: 26 routes render from CMS content, anti-thinness gate passes

```markdown
1. ROLE & OBJECTIVE
You are a senior TypeScript/Next.js engineer building the GenMedha Hub agency website.
Objective: bring every trust-and-search surface live — case studies, insights,
migration, solutions, marketing child, and market pages — with launch content.

2. CONTEXT
Stack pins: Next.js 16.2.x, Payload CMS 3.86.0, React 19, Tailwind CSS v4,
shadcn/ui, PostgreSQL. Single Dockerfile, output:'standalone', non-root, port
3000. TypeScript strict. Brand placeholder GenMedha Hub, domain genmedhahub.com. Plan
document sections referenced below are provided to you as excerpts.

3. REFERENCES
The relevant sections of the architecture plan are pasted below this prompt /
attached as file.
[[PASTE: chapter 4, sections 4.11–4.16, 4.19, 4.20 (migration, solutions, work,
insights, pricing, marketing child, market templates); chapter 3, section 3.7
(linking); chapter 5, sections 5.4–5.5 (proof and editorial collections);
chapter 8, section 8.8 (launch set)]]

4. SCOPE IN
- /work + filters + case-study template with the three-tag related block (ch.3.7).
- /insights + article template with authors/categories.
- /migrate hub + six pair pages on the fixed ch.4.11 template, incl.
  whenNotToMigrate.
- /solutions + five model pages (b2b, dtc, marketplace, subscriptions,
  multi-region).
- Four digital-marketing child pages (seo-geo, performance-marketing,
  content-marketing, email-lifecycle) with parentService set.
- /markets index + three region pages (india, usa, uae-gcc) with market context,
  engagement logistics, compliance notes — substantive or unpublished.
- /pricing per ch.4.16.
- Launch content set: >= 3 case studies (placeholder-flagged, ch.5.4.1), >= 3
  posts, six pair pages written to blueprint.

5. SCOPE OUT
Gated landings and TCO calculator (P5); newsletter module (P5); sitemap, robots,
remaining schema, performance hardening (P6).

6. DELIVERABLES
26 routes/templates; launch content set loaded.

7. ACCEPTANCE CRITERIA
- All 26 routes return 200 from CMS documents; the ch.3.7 linking checklist passes
  per template (three-tag rule, pair-hub, child-pillar, region-service links).
- Anti-thinness gate: no indexable page under 800 words unique copy; marketing
  child pages carry own-engine proof; region pages carry context, logistics,
  compliance notes.
- Every migration page's mandatory fields populated, incl. sourced EOS anchors
  (2.4.4 -> 2026-04-14; 2.4.5/2.4.6 -> 2026-08-11).
- Every case-study metrics row carries its context line; no bare-number stat.
- pnpm build completes with 0 errors.

8. CONSTRAINTS
Ch.6 invariants: single Dockerfile; one PostgreSQL; RSC-first — no client-side
fetching of indexable content; 'use client' confined to FAQ disclosure; no new
runtime dep without a justification comment; TypeScript strict; regional claims
logistical only (timezones, engagement models) — never claim physical offices.

9. STOP CONDITIONS
Halt and report — never guess — on: launch copy missing for a mandatory section;
unsourced EOS date or metric; blueprint conflicting with schema; any acceptance
check failing after 2 fix attempts. State what you tried, the exact error, and
the decision needed.
```

**Optional split (P4A/P4B).** Split only on context overflow or staggered copy delivery. **P4A:** /work + case-study template, /insights + article template (refs ch.4.13–4.14, 5.4–5.5). **P4B:** /migrate + six pair pages, /solutions + five pages, four marketing child pages, /markets + three region pages, /pricing (refs ch.4.11–4.12, 4.16, 4.19–4.20). Each half keeps the full skeleton with its own Scope-in slice and acceptance checks; the anti-thinness gate applies to both.

### 12.8 Phase 5 prompt — Conversion and integrations

#### 12.8.1 Refs ch.7 (all integration specs), ch.3 (thank-you URLs); acceptance: booking end-to-end, form→email+Listmonk, events in Umami

```markdown
1. ROLE & OBJECTIVE
You are a senior TypeScript/Next.js engineer building the GenMedha Hub agency website.
Objective: make every chapter 7 lead flow work end to end — booking, forms, email,
newsletter, lead magnets, calculator, analytics — so the site captures demand.

2. CONTEXT
Stack pins: Next.js 16.2.x, Payload CMS 3.86.0, React 19, Tailwind CSS v4,
shadcn/ui, PostgreSQL. Single Dockerfile, output:'standalone', non-root, port
3000. TypeScript strict. Brand placeholder GenMedha Hub, domain genmedhahub.com. Plan
document sections referenced below are provided to you as excerpts.

3. REFERENCES
The relevant sections of the architecture plan are pasted below this prompt /
attached as file.
[[PASTE: chapter 7, sections 7.1–7.9 (all integration specs and failure rules);
chapter 3, section 3.2 (thank-you URLs); chapter 6, sections 6.8, 6.9 (env vars,
degradation behavior)]]

4. SCOPE IN
- Cal.com Cloud per ch.7.2: inline embed on /book, pop-up, Routing Form
  qualification; booking-link fallback card when the embed is disabled or fails.
- The five ch.7.3.1 forms via @payloadcms/plugin-form-builder with honeypot,
  time-to-submit, and rate-limit controls; every submission lands a Postgres row
  FIRST, then downstream actions.
- Four React Email templates via the email-resend adapter (ch.7.4.1); Resend
  failure retries via a Payload job.
- Listmonk sync per ch.7.5: double opt-in, queued retry, nightly reconciliation.
- HubSpot CRM sync per ch.7.3.1/7.10: contact upsert after every Postgres-first
  form submission, booking upsert via the Cal.com webhook relay, D15 source-tag
  taxonomy (organic/booking/lead-magnet/calculator/outreach) with landing URL +
  first-touch UTMs, and a nightly CRM reconciliation job. HubSpot failure is a
  retryable Payload job — never visitor-visible.
- Three gated checklist landings + /resources with signed-URL delivery
  (ch.7.6–7.7).
- TCO calculator island per ch.7.6.1: email-gated results, estimate disclaimer in
  the result email.
- Eight-event Umami inventory per ch.7.8.1, no PII in event props.
- /thank-you/booking, /thank-you/download, /thank-you/newsletter: static,
  noindex, excluded from sitemap.

5. SCOPE OUT
Schema, sitemap, performance work (P6); production cutover (P7); new marketing
routes.

6. DELIVERABLES
Booking surface (three patterns + fallback); form renderers + server hooks; four
email templates; Listmonk sync + reconciliation jobs; HubSpot contact/booking
upserts + source-tag properties + CRM reconciliation job; calculator island;
Umami wiring; three thank-you routes.

7. ACCEPTANCE CRITERIA
- Booking end-to-end per ch.7.2: routing form qualifies, slot confirms,
  booking_completed fires, /thank-you/booking renders; fallback card renders with
  the embed disabled.
- Each of the five forms lands a Postgres row first, then its downstream action —
  scripted staging submission per form.
- Newsletter path verified in Listmonk: subscribe -> double opt-in -> list entry
  -> unsubscribe.
- Calculator result email carries the estimate disclaimer; all eight Umami events
  fire with no PII in props; pnpm build completes with 0 errors.
- HubSpot receives each staged form lead and the test booking as upserted
  contacts carrying the correct source tag; the CRM reconciliation job reports
  zero drift against Postgres.

8. CONSTRAINTS
Ch.6 invariants: single Dockerfile; one PostgreSQL — submissions, jobs, content
share it; no Redis; 'use client' confined to forms, embeds, calculator island; no
new runtime dep without a justification comment; TypeScript strict; structured
stdout logs with no personal data; env vars per ch.6.8 only.

9. STOP CONDITIONS
Halt and report — never guess — on: missing third-party credential (Cal.com,
Resend, Listmonk, R2, Umami, HubSpot private-app token) or flaky sandbox;
ambiguous ch.7 spec; acceptance flow unevidenced on staging; any check failing
after 2 fix attempts. State what you tried, the exact error, and the decision
needed.
```

**Optional split (P5A/P5B).** Split only on context overflow or late account provisioning. **P5A:** Cal.com booking, five forms, four email templates (refs ch.7.2–7.4). **P5B:** Listmonk sync, lead magnets + /resources, TCO calculator, Umami events (refs ch.7.5–7.8). Both halves keep the full skeleton, the Postgres-first submission rule, and the ch.7.9 failure rules.

### 12.9 Phase 6 prompt — SEO/GEO and hardening

#### 12.9.1 Refs ch.8 (schema map, sitemap/robots/llms.txt), ch.10 (budget register); acceptance: Lighthouse ≥90/100/≥95/100 on key templates, schema validation clean

```markdown
1. ROLE & OBJECTIVE
You are a senior TypeScript/Next.js engineer building the GenMedha Hub agency website.
Objective: make the site pass the chapter 10 quality register as a release-blocking
gate — structured data, indexation, performance, accessibility, security. The
site's scores are its own sales evidence.

2. CONTEXT
Stack pins: Next.js 16.2.x, Payload CMS 3.86.0, React 19, Tailwind CSS v4,
shadcn/ui, PostgreSQL. Single Dockerfile, output:'standalone', non-root, port
3000. TypeScript strict. Brand placeholder GenMedha Hub, domain genmedhahub.com. Plan
document sections referenced below are provided to you as excerpts.

3. REFERENCES
The relevant sections of the architecture plan are pasted below this prompt /
attached as file.
[[PASTE: chapter 8, sections 8.3–8.5 (technical SEO, schema map, llms.txt);
chapter 10, sections 10.2–10.4, 10.7 (budgets, a11y checklist, security controls,
release gates); chapter 3, section 3.4; chapter 6, section 6.3]]

4. SCOPE IN
- JSON-LD builders: Organization, Service, Article, FAQPage, BreadcrumbList per
  the ch.8.4 matrix.
- app/sitemap.ts over published documents; app/robots.ts with the ch.8 crawler
  policy (AI crawlers not blocked); per-page OG images (explicit or next/og);
  llms.txt as hygiene.
- Redirects validation: no chains; trailing-slash canonicalization (ch.3.4.1).
- Performance to ch.10.2: text-LCP templates, image caps, first-load JS <= 200KB,
  TTFB < 800 ms against the staging ISR cache.
- WCAG 2.2 AA remediation against the ch.10.3 checklist; every ch.10.4 security
  control verified row by row.
- Lighthouse CI + axe stages added to the pipeline, merge-blocking (ch.10.7).

5. SCOPE OUT
New routes, features, content; DNS and cutover (P7).

6. DELIVERABLES
Schema/metadata builders; sitemap.ts, robots.ts, llms.txt; hardened templates;
Lighthouse CI + axe stages; dated audit artifacts.

7. ACCEPTANCE CRITERIA
- Lighthouse mobile on home, a platform hub, and a migration-pair template:
  Performance >= 90, Accessibility 100, Best Practices >= 95, SEO 100 —
  merge-blocking in CI.
- TTFB < 800 ms on key templates against the staging ISR cache.
- JSON-LD validates with zero errors on every template; sitemap enumerates exactly
  the launch URLs; robots.txt live.
- ch.10.3 checklist passes 100% on key templates with dated sign-off; every
  ch.10.4 row verified.

8. CONSTRAINTS
Ch.6 invariants: single Dockerfile; one PostgreSQL; RSC-first — remediation must
not push indexable content into client components; /admin and /api excluded from
public budgets; no new runtime dep without a justification comment; TypeScript
strict; env vars per ch.6.8 only.

9. STOP CONDITIONS
Halt and report — never guess — on: a budget unmet without P3/P4 rework; a schema
type with no valid data source; an ambiguous ch.10 item; any acceptance check
failing after 2 fix attempts. State what you tried, the exact error, and the
decision needed.
```

### 12.10 Phase 7 prompt — Deployment and operations

#### 12.10.1 Refs ch.9 (pipeline, components, backups, monitoring); acceptance: GHCR image, webhook deploy, TLS live, backup + restore test, monitors active

```markdown
1. ROLE & OBJECTIVE
You are a senior TypeScript/Next.js engineer and release operator for the GenMedha Hub
website. Objective: take the site live on genmedhahub.com with proven recovery, armed
rollback, active monitoring, and a named operator.

2. CONTEXT
Stack pins: Next.js 16.2.x, Payload CMS 3.86.0, React 19, Tailwind CSS v4,
shadcn/ui, PostgreSQL. Single Dockerfile, output:'standalone', non-root, port
3000. TypeScript strict. Brand placeholder GenMedha Hub, domain genmedhahub.com. Plan
document sections referenced below are provided to you as excerpts.

3. REFERENCES
The relevant sections of the architecture plan are pasted below this prompt /
attached as file.
[[PASTE: chapter 9, sections 9.1–9.8 (topology, CI, deploy/rollback, backups,
monitoring, cutover); chapter 10, section 10.7 (pre-launch gates)]]

4. SCOPE IN
- The nine-step ch.9.8 cutover runbook: DNS TTL 300 s, TLS issuance, cache
  warming, smoke tests, analytics verification.
- Production deploy path: Dokploy pulls the prebuilt GHCR image via webhook — no
  builds on the VPS.
- Nightly pg_dump for all three Postgres instances (app, Listmonk, Umami), rclone
  off-VPS (ch.9.5).
- One full restore test: production dumps rebuild a throwaway Dokploy instance
  with matching row counts.
- The ch.9.6 monitoring matrix: Uptime Kuma plus one hosted external monitor.
- Rollback armed: previous GHCR tag recorded; runbook rehearsed on staging (9.4).
- Operational handover (patch calendar, alert triage, upgrade policy); +14-day
  review of CrUX field data against ch.10.2 budgets.

5. SCOPE OUT
Any feature or content work; scaling changes (trigger-based per ch.9.8 only).

6. DELIVERABLES
Live site on genmedhahub.com; backup/restore evidence; monitor dashboard; rollback
record; handover document; +14-day review note.

7. ACCEPTANCE CRITERIA
- Every ch.10.7 launch checklist item passes, incl. form, booking, and newsletter
  end-to-end tests against production.
- The ch.9.8 runbook executes in order: HTTPS 200 with valid certificates on /,
  /services, /work, /insights, /contact; second-pass TTFB < 800 ms.
- Restore test signed off — production dumps rebuild a throwaway instance with
  matching row counts.
- External monitor and Uptime Kuma both green; rollback runbook step 1 output
  recorded.

8. CONSTRAINTS
Ch.6 invariants: single Dockerfile; no builds on the VPS — Dokploy pulls prebuilt
GHCR images; one PostgreSQL per service; secrets only in the Dokploy env store,
never the repo; no new runtime dep without a justification comment; TypeScript
strict.

9. STOP CONDITIONS
Halt and report — never guess — on: DNS or TLS stalling; restore failure or row
mismatch; missing monitor or credential; any acceptance check failing after 2 fix
attempts. State what you tried, the exact error, and the decision needed.
```

### 12.11 Cross-phase verification and repair prompts

#### 12.11.1 Five repair prompts: acceptance-criteria audit, broken-integration diagnosis, a11y remediation, performance remediation, scope-drift check

Five compact prompts cover failure modes that survive phase gates. Each runs in a fresh session, cites the chapter section owning the standard, and fixes only within current-phase ownership — anything deeper becomes a stop-condition report.

**Repair prompt 1 — acceptance-criteria audit.**

```markdown
Audit the GenMedha Hub website build against the phase acceptance criteria in the
architecture plan (chapter 11, sections 11.2–11.9, pasted below).
[[PASTE: chapter 11, sections 11.2–11.9]]
For every gate up to the current phase, re-run each checkbox as a verifiable
command or state (build output, HTTP status, admin behavior, CI run, scripted
test). Produce a pass/fail table with the evidence command and result per
criterion. Fix only failures owned by the current phase; for failures owned by
earlier phases, report criterion, evidence, and owning phase — do not patch
silently. Stop and report after 2 failed fix attempts on any criterion.
```

**Repair prompt 2 — broken-integration diagnosis.**

```markdown
Diagnose a broken lead-flow integration on the GenMedha Hub website. Symptom:
<DESCRIBE SYMPTOM HERE>. The plan's integration specs and failure rules are
pasted below.
[[PASTE: chapter 7, sections 7.2–7.9; chapter 6, sections 6.8, 6.9]]
Booking (ch.7.2): check embed script load, Routing Form config, and whether the
booking-link fallback card renders with the embed disabled. Forms (ch.7.3–7.4):
verify the Postgres row lands BEFORE downstream actions, then check the Resend
retry job. Listmonk (ch.7.5): check queued sync, double opt-in state, and the
nightly reconciliation job. Reproduce with structured logs (no personal data),
fix the root cause, then re-run the Phase 5 acceptance flow as evidence. Missing
credential or unreachable sandbox: stop and report.
```

**Repair prompt 3 — accessibility remediation.**

```markdown
Remediate accessibility on the GenMedha Hub website against the plan's WCAG 2.2 AA
checklist (chapter 10, section 10.3, pasted below).
[[PASTE: chapter 10, section 10.3; chapter 6, section 6.5]]
Run axe on every key template and /dev/catalog; manually walk keyboard path,
focus visibility, reduced motion, and contrast >= 4.5:1. Fix at the token or
primitive level (globals.css @theme, components/ui/) — never per-page overrides
that fork the design system. Re-run axe to zero violations and re-verify the
checklist 100%. If a fix requires changing a frozen design token, stop and
report the conflict.
```

**Repair prompt 4 — performance remediation.**

```markdown
Remediate performance on the GenMedha Hub website against the plan's budget register
(chapter 10, section 10.2, pasted below).
[[PASTE: chapter 10, section 10.2; chapter 6, section 6.3]]
Measure first: Lighthouse mobile on the failing template; bundle analyzer for
first-load JS (<= 200KB); TTFB < 800 ms against the staging ISR cache; LCP <=
2.5 s, INP <= 200 ms, CLS <= 0.1. Check in order: image weight and priority
hints; 'use client' creep beyond forms, embeds, disclosure, calculator; dynamic
rendering on routes that should be SSG + ISR; new dependencies. Remediate without
violating RSC-first. Re-run the budget checks as evidence. If a budget cannot be
met without reworking earlier-phase templates, stop and report.
```

**Repair prompt 5 — scope-drift check.**

```markdown
Check the GenMedha Hub website build for scope drift against the plan's phase
scope-in/scope-out lists (chapter 11, sections 11.2–11.9, pasted below).
[[PASTE: chapter 11, sections 11.2–11.9]]
Inventory built routes, components, integrations, and dependencies; diff against
each completed phase's Scope-in list. Flag: (a) artifacts in no Scope-in list
(drift); (b) Scope-in items not yet built (gaps); (c) dependencies without a
justification comment. Remove or defer drift items to their owning phase; list
gaps as remaining work; anything needing a plan amendment rather than deletion
is a change-control decision — stop and report it.
```

### 12.12 Prompt quality checklist

#### 12.12.1 Self-contained, version-pinned, scope-out explicit, acceptance binary, stop conditions present; content-copy prompts separated from code prompts

Run this checklist before pasting any prompt — phase, sub-prompt, or repair — into Kimi Code. A prompt that fails any row is rewritten, not sent.

- [ ] Self-contained: works in a fresh session with no memory of earlier prompts; Context block present and unedited.
- [ ] Version-pinned: Next.js 16.2.x, Payload CMS 3.86.0, React 19, Tailwind CSS v4, shadcn/ui, PostgreSQL appear verbatim.
- [ ] References attached: every `[[PASTE: ...]]` placeholder replaced by the actual chapter excerpts.
- [ ] Scope-in exhaustive; anything unlisted treated as out.
- [ ] Scope-out explicit, naming the owning phase for each exclusion.
- [ ] Acceptance binary: each check a runnable command or observable state, mirroring chapter 11.
- [ ] Constraints carry the ch.6 invariants: single Dockerfile, one PostgreSQL, RSC-first, minimal `'use client'`, no unjustified dependencies, TypeScript strict.
- [ ] Stop conditions present, including the 2-fix-attempts escalation rule.
- [ ] Content-copy prompts separated from code prompts — no prompt mixes implementation with copywriting acceptance.
- [ ] Split if context overflow: at a Scope-in boundary (P4A/P4B, P5A/P5B first), never mid-deliverable.
- [ ] Placeholders `GenMedha Hub` and `genmedhahub.com` either intentionally kept or globally substituted — never half-replaced.
- [ ] Previous phase's gate evidence (URL, CI run, scripted test) in hand before the next prompt is sent.
