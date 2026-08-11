# GenMedha Hub — Project Scope (reconstructed)

This document reconstructs the agreed scope from the architecture plan (`docs/plan/`), the Opus strategic review PDF (*GenMedhaTech — Strategic Advisory Review*), and what is already built in this repo. Use it when you lose the thread.

---

## What this project is

**GenMedha Hub** (`genmedha.in`, brand kit tagline *Build. Launch. Grow.*) is an **ecommerce-first digital engineering studio** website:

- **Flagship (Commerce):** composable / headless commerce — Medusa core, plus Vendure, Shopify, Adobe Commerce/Magento — builds, replatforming, support & retainers.
- **Adjacent (Build & Grow):** Web App Development and Mobile App Development on the same TypeScript/React stack.
- **Markets:** India, USA, UAE & GCC (substantive `/markets/*` pages or unpublished).
- **Stack:** Next.js 16.2.x + Payload CMS 3.86 + PostgreSQL + Tailwind v4 + shadcn/ui, single Dockerfile, Dokploy VPS.

The Opus review PDF is the **business strategy** (positioning, ICP, pricing posture). The `docs/plan/` chapters are the **technical blueprint** (sitemap, CMS schema, phases, acceptance gates). They are related but not identical.

---

## Scope evolution (change log)

| Date | Decision | Effect |
| --- | --- | --- |
| 2026-07-28 | Brand locked | GenMedha Hub, `genmedhahub.com` → production uses `genmedha.in` |
| 2026-07-28 | **Addendum v2** | Added Web App, Mobile App, **Digital Marketing**, Markets (India/USA/UAE) |
| 2026-07-29 | Brand assets v2 | Logo kit final; gold/blue tokens for Phase 1 |
| 2026-07-29 | **Addendum v3** | HubSpot CRM (inbound), Apollo/Clay outbound, cold-domain separation |
| **2026-08-10** | **Addendum v4 (client)** | **Digital Marketing removed from public nav, footer, and homepage pillar band.** Offered as value-add for existing clients only — not a public pillar. Build & Grow = Web App + Mobile App only. |

### Addendum v4 — Digital Marketing (binding)

- **Not in primary nav** Services dropdown (Build & Grow group = Web App + Mobile App only).
- **Not in footer** Services column as a pillar link.
- **Not on homepage** PillarCards band (two cards, not three).
- **CMS:** Digital Marketing service category and child pages may remain in schema for internal/future use but **must not publish** as indexable marketing pages unless explicitly re-scoped.
- **Editorial:** `docs/editorial.md` already states: *Digital Marketing is not a pillar.*

---

## Service pillars (current)

### Commerce (flagship — hero, deepest proof)

1. Ecommerce Builds  
2. Replatforming & Migration  
3. Support & Retainers  

### Build & Grow (adjacent — stack coherence proof)

4. Web App Development  
5. Mobile App Development  

### Not a public pillar

- **Digital Marketing** — value-add for existing clients; no nav/footer/homepage promotion.

---

## Information architecture (54 routes → adjusted)

Full route inventory is in `docs/plan/ecommerce-agency-site_sec03_5f3f.md` (chapter 3). After **Addendum v4**, treat these as **deferred / noindex unless re-scoped**:

- `/services/digital-marketing`
- `/services/digital-marketing/*` (seo-geo, performance-marketing, content-marketing, email-lifecycle)

Everything else in the plan still applies: platforms, migrate pairs, solutions, work, insights, markets, pricing, company, book, contact, legal, resources (P5), tools (P5).

### Primary nav (current — post v4)

| # | Item | Notes |
| --- | --- | --- |
| 1 | Services | Commerce (3) + Build & Grow (2) |
| 2 | Platforms | Medusa first (flagship) |
| 3 | Migrate | Pair pages |
| 4 | Solutions | B2B, DTC, Marketplace, etc. |
| 5 | Work | Case studies |
| 6 | Markets | Index + regions (footer/contextual links OK) |
| 7 | Pricing | P4 content |
| 8 | Company | About |
| 9 | Insights | Blog |
| CTA | Book a call | `/book` — Cal.com in P5 |

*(Original plan had Digital Marketing in Services dropdown and 4 marketing child pages in P4 — superseded by v4.)*

---

## Development phases (P0–P7)

Engineering phases (chapter 11) are **not** the same as the Opus PDF’s “Phase 1/2/3 service maturity roadmap.”

| Phase | Name | Scope center | Repo status |
| --- | --- | --- | --- |
| **P0** | Foundation | Repo, CI, Docker, health, env validation | **Done** |
| **P1** | Design system | Tokens, shadcn primitives, global shell, `/dev/catalog` | **Done** |
| **P2** | CMS models | 16 collections, 5 globals, 13 blocks, seed script | **Done** (prod seed blocked: logo + defaultOgImage) |
| **P3** | Core pages | Block renderers, services/platforms/utility routes, CMS shell | **Mostly done** (routes extended into P4 territory; prod not seeded) |
| **P4** | Proof engine | Work, insights, migrate, solutions, markets, pricing + launch copy | **Routes exist; content/seed pending** |
| **P5** | Integrations | Cal.com, forms, Resend, Listmonk, HubSpot, calculator, Umami | **Not started** |
| **P6** | SEO / hardening | JSON-LD, sitemap, Lighthouse CI, a11y register | **Not started** |
| **P7** | Deploy / ops | Cutover, backups, restore test, monitoring | **Partial** (manual SSH deploys; webhook empty) |

**Total estimate (original plan):** 87–119 person-days (1–2 devs, 10–14 weeks with parallel content track).

---

## What “launched” means

From chapter 1 / agent final summary:

- Every phase gate **P0–P7** closed with runnable evidence (URL, CI run, scripted test).
- All **indexable** launch routes return 200 from real CMS content (not placeholders).
- Anti-thinness gate: no indexable page under ~800 words without client sign-off.
- Integrations (booking, forms, newsletter) work end-to-end on production.
- Lighthouse mobile ≥90 / A11y 100 / BP ≥95 / SEO 100 on key templates (P6).

---

## Strategic alignment (Opus PDF vs blueprint)

| Topic | Opus PDF | This repo / plan |
| --- | --- | --- |
| Positioning | Composable commerce + marketplace studio | Ecommerce-first engineering studio (aligned) |
| Nav simplicity | Solutions · Work · Approach · Insights · Company | Richer IA: Services, Platforms, Migrate, Solutions… (blueprint wins for CMS) |
| Digital Marketing | Cut from front door | **Addendum v4** — matches Opus |
| Markets | No fake regional pages until proof | `/markets/*` in schema; publish only when substantive |
| CTA | Book commerce architecture audit | Book a call / Legacy Platform Audit (CMS CTA keys) |
| Brand name | GenMedhaTech | GenMedha Hub |

---

## Key file locations

| Purpose | Path |
| --- | --- |
| Full plan (chapters 1–13) | `docs/plan/ecommerce-agency-site_sec*.md` |
| Scope addenda v2–v3 | `docs/plan/scope-addendum-v2-v3.md` |
| Scope addendum v4 | This file + `docs/phase-prompts.md` header |
| Phase prompts (final) | `docs/phase-prompts.md` |
| Deploy runbook | `docs/deploy.md` |
| Editorial rules | `docs/editorial.md` |
| Nav (code) | `src/config/navigation.ts` |
| CMS schema | `src/payload/`, `src/collections/` |

---

## Immediate next work (recommended order)

1. Upload **logo** (216×62) + **defaultOgImage** in Admin → Globals → Site Settings.  
2. Run **production seed** (`pnpm seed … --allow-remote`) on VPS.  
3. Close **P4 content** (case studies, migration copy, markets copy).  
4. **P5** — Cal.com, forms, HubSpot, Listmonk.  
5. Set **`DOKPLOY_DEPLOY_WEBHOOK_URL`** secret for CI deploys.  
6. **P6** — JSON-LD, sitemap, Lighthouse CI gate.

---

## Document map (uploaded files → repo)

| Your filename | Repo path |
| --- | --- |
| `ecommerce-agency-site_sec01.md` … `sec13.md` | `docs/plan/ecommerce-agency-site_sec01_*.md` … |
| `ecommerce-agency-site_ref.md` | `docs/plan/sources.md` |
| `ecommerce-agency-site.outline-addendum.md` | `docs/plan/scope-addendum-v2-v3.md` |
| `ecommerce-agency-site.agent.final.md` | `docs/plan/agent-final-summary.md` |
| `plan.md` | `docs/plan/meta-plan.md` |
| `phase-prompts.md` (original) | Superseded by `docs/phase-prompts.md` |
| `p0-prompt-ready.docx` / `p1-prompt-ready.docx` | Superseded by `docs/phase-prompts.md` (v4 updates) |
| `GMT Review by opus.pdf` | Strategic review only — not the build spec |
