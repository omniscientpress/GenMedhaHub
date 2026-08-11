## 1. Build Mandate, Locked Decisions, and Success Contract

This chapter states the contract the remaining twelve chapters fulfill: what will be built, on which locked baseline, against which gates, with which exclusions.

### 1.1 Engagement outcome and intended readers

#### 1.1.1 An executable build contract: executives read ch.1–3; builders read ch.4–13

The engagement outcome is a launched, lead-generating marketing site for GenMedha Hub on genmedhahub.com. This document is the build contract for that outcome: a dev team or AI coding agent must be able to execute from it without asking questions, because every table and checklist is a decision, not a topic. Two reader tracks apply: executives and the client-side approver read chapters 1–3 (mandate, positioning, information architecture) and return only for the open decisions in 13.3 and the gates in 1.5; builders read chapters 4–13 as the executable specification. Chapter 12 operationalizes the contract for AI execution, packaging chapter 11's phases into copy-paste Kimi Code prompts whose acceptance criteria quote this document verbatim — the agent is measured against the contract, not its own judgment.

### 1.2 Business scope and launch definition

#### 1.2.1 Final approved scope — commerce flagship, Build & Grow pillars, three markets, audit entry offer — and what "launched" means

The approved scope is an ecommerce-first digital engineering studio. The flagship **Commerce pillars** sell composable commerce across four named platforms — Medusa (core competency), Vendure, Shopify, Adobe Commerce — as ecommerce builds, legacy-to-modern replatforming/migration, and support & retainers, with the paid **Legacy Platform Audit** as the fixed-price entry offer. The adjacent **Build & Grow pillars** — Web App Development, Mobile App Development, Digital Marketing — extend the same TypeScript/React engineering core, for clients across **India, the USA, and the UAE & GCC**. Chapter 2 fixes the positioning; chapter 3 fixes the 54 launch routes. The brand appears only as the placeholder `GenMedha Hub` and the domain as `genmedhahub.com`, replaced by global find-replace once the naming decision (13.3) closes. **Launch definition:** launched means every phase gate P0–P7 (chapter 11) closed on runnable evidence and the 1.5 launch acceptance checklist passing against production on genmedhahub.com. Scope evolves only through change control (13.4); the 54-route baseline is the frozen truth.

### 1.3 Locked technical decisions

#### 1.3.1 Non-negotiable baseline, rationale chain, and the locked-decision register

The non-negotiable baseline: Next.js 16.2.x + Payload CMS 3.86 (embedded, PostgreSQL) + React 19 + Tailwind CSS v4 + shadcn/ui, delivered as a single Dockerfile. The rationale chain runs through the CMS: Payload's embedded model (one deployable unit, Local API without an HTTP hop) chose Next.js over Astro, because draft preview, booking embeds, and form handling are app-shaped requirements; Payload's support matrix then chose the version — Next.js 16.2.0+ supported since Payload v3.73.0, 15.5–16.1.x unsupported[^1^], Next.js 15 security support ending 2026-10-21[^2^].

**Locked-decision register.**

| Decision | Value | Rationale | Chapter ref |
|---|---|---|---|
| Framework | Next.js 16.2.x (App Router) | Payload requires 16.2.0+; 15.5–16.1.x unsupported[^1^]; 15 EOL 2026-10-21[^2^] | 6.1 |
| CMS | Payload CMS 3.86, embedded via `withPayload` | One deployable unit; Astro rejected | 6.1 |
| Language/runtime | TypeScript 5.x `strict`, Node.js 22 LTS | Generated types make ch.5 compile-time | 6.1 |
| Database | PostgreSQL 16 | Recommended adapter; jobs on Postgres — no Redis | 6.1, 6.8 |
| Styling | Tailwind CSS v4.3, CSS-first `@theme` | 2026 standard; shadcn/ui ships on v4 | 6.5 |
| UI primitives | shadcn/ui (v4 build) | Source-owned; accessible bases | 6.5 |
| Media storage | `@payloadcms/storage-s3` → Cloudflare R2; MinIO fallback | Zero egress; off-VPS durability | 6.7 |
| Email | Resend via `email-resend` + React Email | Free 3,000/mo; Pro $20/mo[^64^] | 7.4 |
| Forms | `@payloadcms/plugin-form-builder` | Maintained plugin; submissions in Postgres | 7.3 |
| Booking | Cal.com Cloud embed + Routing Forms | Free tier; self-host escape hatch | 7.2 |
| CRM (inbound) | HubSpot Free, private-app API | CRM of record; 1,000 contacts / 2 users free; Starter $20/seat deferred to triggers[^94^] | 7.10 |
| Newsletter | Listmonk + SES/Resend SMTP, double opt-in | ~$8–10/mo vs MailerLite $32–73/mo[^66^] | 7.5 |
| Analytics | Umami, self-hosted | Cookieless; no banner trigger | 7.8 |
| Hosting/CI | Dokploy VPS, standalone Dockerfile; GitHub Actions → GHCR → webhook | Client mandates self-hosting | 9.2, 9.3 |

Usage note: the register condenses the ch.6 stack decision record and ch.7/ch.9 choices; changing any row is a 13.4 change-control event.

### 1.4 Build-contract conventions

#### 1.4.1 Must/should/may, evidence labels, the no-code rule, and the terminology glossary

Three requirement levels apply: **must** is mandatory and gate-blocking; **should** is a strong recommendation whose deviation needs a recorded justification; **may** is a permitted option. Three evidence labels qualify factual statements: **verified fact** carries a registry citation; **(judgment call)** marks a defensible decision without a cited source; **open assumption** marks an unverified or client-input item tracked in 13.2/13.3. The **no-code rule**: this document specifies, never implements — code is written at execution time from chapter 12's prompts.

**Placeholder and terminology glossary.**

| Term | Meaning |
|---|---|
| `GenMedha Hub` / `genmedhahub.com` | Brand and domain placeholders; global find-replace pre-launch (13.5) |
| "the studio" / "the agency" | GenMedha Hub itself, the site owner |
| P0–P7 | The 8 build phases of chapter 11; each independently shippable |
| "Commerce pillars" | Ecommerce Builds, Replatforming & Migration, Support & Retainers |
| "Build & Grow" | Web App Development, Mobile App Development, Digital Marketing |
| Verified fact / judgment call / open assumption | Evidence labels defined above |

Usage note: exact service, pillar, and market spellings are enforced per 2.9.

### 1.5 Acceptance gates and launch criteria

#### 1.5.1 Phase-gate definitions and the launch acceptance checklist

Four gate types govern the build — shippable phase, accepted page, accepted integration, launch-ready site.

| Gate | Meaning | Evidence required |
|---|---|---|
| Phase gate (P-gate) | A phase P0–P7 is accepted; one failure keeps it open | Runnable evidence per ch.11 binary criteria — URL, CI run, admin state, scripted test; never prose (11.1) |
| Page gate | A single page is accepted | Renders from CMS content; matches its ch.4 blueprint; CTA matches its 3.6 row; ≥800 words unique copy; 3.7 linking passes |
| Integration gate | A lead flow is accepted | Ch.7 contract tests end-to-end: Postgres row first, downstream action confirmed, fallback renders (6.9) |
| Launch gate | The site is launch-ready | Full 10.7 checklist green; 9.8 cutover runbook executed; restore test signed off |

Usage note: gates are binary and close only on evidence attached to the gate record.

**Launch acceptance checklist** (rolls up ch.10's quality gate, ch.11's phase gates, and ch.13's pre-P0 decisions):

- [ ] All P0–P7 phase gates closed on runnable evidence (11.2–11.9)
- [ ] All 54 launch routes return 200; no orphan routes (3.2, 3.7)
- [ ] Lighthouse mobile ≥90/100/≥95/100 (Performance/Accessibility/Best Practices/SEO) on all 6 key templates, merge-blocking (10.2)
- [ ] CWV field eligibility: CrUX collecting; origin summary live in PageSpeed Insights (10.7)
- [ ] WCAG 2.2 AA checklist 100% on key templates; sign-off dated (10.3)
- [ ] JSON-LD validates on every template; sitemap.xml enumerates exactly the launch URLs; robots.txt live (10.7)
- [ ] Booking, launch forms, and newsletter verified end-to-end against production (10.7)
- [ ] Anti-thinness gate: no indexable page under 800 words unique copy (3.1.1)
- [ ] Restore test signed off; external monitor and Uptime Kuma green; rollback armed (9.4–9.6)
- [ ] Compliance register re-verified; counsel sign-off on jurisdiction rows (10.5)
- [ ] Claims-hygiene checklist passed; no prohibited claims live (13.5)
- [ ] `GenMedha Hub`/`genmedhahub.com` replaced globally; build-gating open decisions closed (13.3, 13.5)

### 1.6 Out-of-scope items and change triggers

#### 1.6.1 Excluded capabilities, and formal scope change vs informal drift

The matrix freezes the build boundary; each Out row records whether the capability is a future option.

| In scope (launch) | Out of scope | Future option? |
|---|---|---|
| 54 routes across 8 route groups (ch.3) | Multilingual / hreflang — single-language launch | Yes (13.3) |
| 16 collections, 5 globals, 13 block renderers (ch.5) | Ecommerce on GenMedha Hub's own site (cart, checkout) | No |
| 5 integration flows + analytics per ch.7 | Client portal / authenticated customer area | No |
| Quality gates: CWV, Lighthouse, WCAG 2.2 AA, security (ch.10) | Native iOS/Android outside React Native (Expo) | No |
| Single-Dockerfile Dokploy deployment, backups, monitoring, cutover (ch.9) | Ad-account ownership transfers — client-owned properties, agency admin (13.3) | No |
| 85–116 person-day estimate, P0–P7 (11.10) | Post-launch items per ch.13: Medusa Expert application, Apple/Google developer accounts, paid media | Yes — post-launch roadmap |

Usage note: anything unlisted is out. Two change triggers exist: **formal scope change** — touching any lock (stack pins, 54-route scope, integration matrix, budgets, estimates) requires the 13.4 change-request template and named client approval; **informal drift** — undocumented additions during execution — is prohibited: chapter 12's scope-outs and stop conditions halt the phase and escalate rather than absorb.

Every build decision in chapters 2–13 resolves back to the positioning statement approved in 2.3.1, quoted here verbatim as the north star:

> "GenMedha Hub is an ecommerce-first digital engineering studio. Our flagship practice designs, builds, migrates, and supports composable commerce — with Medusa as our core competency, plus Vendure, Shopify, and Adobe Commerce. The same TypeScript/React engineering core delivers web applications and mobile apps, and our digital marketing practice grows what we build — for clients across India, the USA, and the GCC/UAE."
