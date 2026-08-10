# GenMedha Hub — Phase Prompt Pack (P0–P7, finalized)

**Status:** Finalized 2026-08-10 with **Scope Addendum v4** (Digital Marketing off public nav).  
**Supersedes:** uploaded `phase-prompts.md`, `p0-prompt-ready.docx`, `p1-prompt-ready.docx`.

Attach plan excerpts from `docs/plan/` where each prompt says `[[PASTE: …]]`.  
See `docs/project-scope.md` for the full scope reconstruction and build status.

---

## Scope Addendum v4 (2026-08-10)

Client decision (supersedes addendum v2/v3 where conflicting):

- **Digital Marketing** is **not** a public pillar. Value-add for existing clients only.
- **Build & Grow** nav/footer/homepage = **Web App Development** + **Mobile App Development** only.
- Do **not** publish `/services/digital-marketing` or child URLs as indexable pages unless explicitly re-scoped.
- CMS may retain marketing service categories for internal use; default = draft/unpublished.

---

## Prompt usage rules

1. **No code in this document** — prompts instruct the agent to write code at execution time.  
2. **Self-contained** — each prompt works in a fresh session; repeat Context/Constraints verbatim.  
3. **One prompt per phase, in order** — P0→P7; gate evidence before the next prompt.  
4. **Split on overflow** — P4A/P4B, P5A/P5B at Scope-in boundaries only.  
5. **Content copy** is a parallel track — never block code acceptance on prose drafts.

### Reference map

| Prompt | Paste from `docs/plan/` | Gate |
| --- | --- | --- |
| P0 | sec06 §6.1, 6.2, 6.8; sec09 §9.2, 9.3 | Boots, `/admin`, CI green |
| P1 | sec02 §2.9; sec04 §4.2; sec06 §6.5; sec10 §10.3 | Catalog, axe zero, shell nav |
| P2 | sec05 §5.1–5.11; sec03 §3.4; sec04 §4.3–4.20 | Schema match, seed idempotent |
| P3 | sec03 §3.2–3.3, 3.6–3.7; sec04 §4.2–4.10, 4.18; sec02 §2.3–2.6; sec06 §6.3 | Core routes 200, CTAs correct |
| P4 | sec04 §4.11–4.16, 4.19–4.20; sec03 §3.7; sec05 §5.4–5.5; sec08 §8.8 | Proof routes + anti-thinness |
| P5 | sec07 §7.1–7.10; sec03 §3.2; sec06 §6.8–6.9 | Booking, forms, CRM E2E |
| P6 | sec08 §8.3–8.5; sec10 §10.2–10.4, 10.7; sec03 §3.4; sec06 §6.3 | Lighthouse merge-blocking |
| P7 | sec09 §9.1–9.8; sec10 §10.7 | Cutover, restore, monitors |

---

## 9-part skeleton (mandatory order)

```markdown
1. ROLE & OBJECTIVE
2. CONTEXT
3. REFERENCES  [[PASTE: …]]
4. SCOPE IN
5. SCOPE OUT
6. DELIVERABLES
7. ACCEPTANCE CRITERIA
8. CONSTRAINTS
9. STOP CONDITIONS
```

**Shared CONTEXT block** (use verbatim in every phase prompt):

```markdown
2. CONTEXT
Stack pins: Next.js 16.2.x, Payload CMS 3.86.0, React 19, Tailwind CSS v4,
shadcn/ui, PostgreSQL. Single Dockerfile, output:'standalone', non-root, port
3000. TypeScript strict. Brand: GenMedha Hub. Production URL: https://genmedha.in
(staging: https://staging.genmedhahub.com). Plan excerpts attached below.

Scope Addendum v4: Digital Marketing is NOT a public nav/footer/homepage pillar —
value-add for existing clients only. Build & Grow = Web App + Mobile App.
```

**Shared CONSTRAINTS** (tailor per phase):

```markdown
8. CONSTRAINTS
Ch.6 invariants: single Dockerfile; one PostgreSQL (no Redis); RSC-first;
'use client' only for disclosure, nav, forms, embeds, calculator; no new
runtime dep without justification comment; TypeScript strict; env vars per
ch.6.8 only. Addendum v4: no indexable Digital Marketing routes.
```

**Shared STOP CONDITIONS:**

```markdown
9. STOP CONDITIONS
Halt and report — never guess — on: conflicting plan sections; missing credential
or env var; ambiguous copy or field; any acceptance check failing after 2 fix
attempts. State what you tried, the exact error, and the decision needed.
```

---

## P0 — Foundation and scaffold

```markdown
1. ROLE & OBJECTIVE
Senior TypeScript/Next.js engineer. Objective: repo, tooling, baseline Next.js +
Payload app, CI/CD — delivery machinery for later phases.

3. REFERENCES
[[PASTE: docs/plan/ecommerce-agency-site_sec06_7ea0.md — §6.1, 6.2, 6.8]]
[[PASTE: docs/plan/ecommerce-agency-site_sec09_1671.md — §9.2, 9.3]]

4. SCOPE IN
- Repo layout per ch.6.2; Next.js 16.2.x + Payload 3.86 via withPayload; Postgres 16
  (SQLite dev/CI only).
- TypeScript strict, ESLint, Vitest; non-root multi-stage Dockerfile (standalone).
- GitHub Actions CI: lint, typecheck, test, build, Docker, Trivy, GHCR push,
  Dokploy webhook + health poll.
- GET /api/health (DB + PAYLOAD_SECRET).
- lib/env.ts — all 16 ch.6.8 env vars validated with zod at boot.

5. SCOPE OUT
Design tokens (P1); collections (P2); marketing routes (P3); production DNS (P7).

6. DELIVERABLES
Repo layout; Dockerfile; .github/workflows/ci.yml; lib/env.ts; /api/health;
staging deploy path.

7. ACCEPTANCE CRITERIA
- pnpm build 0 errors; app boots; /admin login works.
- CI green on main; image in GHCR; staging deploy succeeds.
- GET /api/health → 200 within 60s of deploy.
- Boot fails loudly naming any missing ch.6.8 env var.
```

**Repo status:** ✅ Done (see `/api/health`, CI, Dockerfile).

---

## P1 — Design system

```markdown
1. ROLE & OBJECTIVE
Objective: design system — tokens, primitives, layout, global shell — frozen at this gate.

3. REFERENCES
[[PASTE: sec02 §2.9; sec04 §4.2; sec06 §6.5; sec10 §10.3]]

4. SCOPE IN
- Tailwind v4 @theme in globals.css; contrast ≥ 4.5:1; no tailwind.config.js.
- ~10 shadcn/ui primitives; layout primitives (container, grid, section, stack).
- Global shell (ch.4.2): header; Services dropdown —
  **Commerce:** Ecommerce Builds, Replatforming & Migration, Support & Retainers;
  **Build & Grow:** Web App Development, Mobile App Development
  (**NOT Digital Marketing** — Addendum v4);
  footer; breadcrumbs; sticky mobile CTA; markets strip
  "Serving India · USA · UAE & GCC" → /markets.
- Interactive states (ch.10.3): focus, hover, disabled, reduced motion.
- noindex /dev/catalog — every primitive in every state.

5. SCOPE OUT
Block renderers (P3); real CMS content.

6. DELIVERABLES
globals.css tokens; components/ui/; layout + shell components; /dev/catalog.

7. ACCEPTANCE CRITERIA
- /dev/catalog renders all states; axe zero violations.
- Focus visible; prefers-reduced-motion honored.
- Shell nav order matches ch.3.3 **as amended by v4** (5 service pillars in dropdown).
- pnpm build 0 errors; tokens frozen.
```

**Repo status:** ✅ Done (`/dev/catalog`, shell, tokens). Nav already v4-compliant in `src/config/navigation.ts`.

---

## P2 — CMS models

```markdown
1. ROLE & OBJECTIVE
Objective: entire ch.5 content model as Payload config — schema is the product.

3. REFERENCES
[[PASTE: sec05 §5.1–5.11; sec03 §3.4; sec04 §4.3–4.20]]

4. SCOPE IN
- 16 collections, 5 globals per ch.5 (Services with servicePillar, parentService;
  Markets; CaseStudies metrics + relationships; 13 layout blocks incl. PillarCards).
- S3/R2 media; slug/redirect/cycle hooks; drafts; Editor cannot publish; Live Preview.
- Seed script ch.5.10.1 — idempotent; **five public service pillars** (3 Commerce +
  2 Build & Grow); Digital Marketing **excluded from seed** (v4).
- docs/editorial.md.

5. SCOPE OUT
Block renderers (P3); form wiring beyond plugin install (P5).

7. ACCEPTANCE CRITERIA
- Grep audit: every ch.5 field exists; bp:/ad: tags complete.
- Fresh DB seed idempotent; Editor cannot publish; Live Preview works.
- Slug hooks enforce pair slugs + parentService cycle guard.
```

**Repo status:** ✅ Done. **Prod seed blocked** until logo + defaultOgImage uploaded.

---

## P3 — Core marketing pages

```markdown
1. ROLE & OBJECTIVE
Objective: money surface live and CMS-driven — **five** capability pillars, platform hubs,
utility routes.

3. REFERENCES
[[PASTE: sec03 §3.2, 3.3, 3.6, 3.7; sec04 §4.2–4.10, 4.18; sec02 §2.3–2.6; sec06 §6.3]]

4. SCOPE IN
- All 13 block renderers (ch.5.11), RSC-first, empty states defined.
- Routes (~19, v4-adjusted):
  / with Build & Grow PillarCards band (**2 cards**: Web App, Mobile App);
  /services + **five** pillars (3 Commerce + 2 Build & Grow);
  /platforms + hubs (medusa, vendure, shopify, adobe-commerce minimum);
  /company or /about; /contact (display-only); /book (empty embed slot);
  /legal/* ×3; /404.
- Nav/footer from Navigation global; generateMetadata + SeoDefaults.
- SSG + ISR 3600s + on-demand revalidation.

5. SCOPE OUT
**No** /services/digital-marketing routes (v4).
No booking/forms/analytics (P5). No /work, /insights, /migrate, /solutions, /markets
content engine (P4). No JSON-LD (P6).

7. ACCEPTANCE CRITERIA
- Listed routes 200 from seeded CMS; /book empty embed; /contact display-only.
- Primary CTA per ch.3.6 row; nav dropdown Commerce + Build & Grow (2 items).
- Breadcrumbs depth 2+; no orphan routes (ch.3.7).
- LCP/INP/CLS budgets checked from this phase.
```

**Repo status:** ⚠️ Mostly done; routes include P4 paths early; prod not seeded.

---

## P4 — Proof and content engine

```markdown
1. ROLE & OBJECTIVE
Objective: trust-and-search surfaces — case studies, insights, migrations, solutions,
markets, pricing.

3. REFERENCES
[[PASTE: sec04 §4.11–4.16, 4.19, 4.20; sec03 §3.7; sec05 §5.4–5.5; sec08 §8.8]]

4. SCOPE IN
- /work + case-study template (three-tag related block).
- /insights + article template.
- /migrate hub + six pair pages (whenNotToMigrate, EOS anchors).
- /solutions + five model pages.
- /markets index + india, usa, uae-gcc (substantive or unpublished).
- /pricing.
- Launch set: ≥3 case studies (placeholder OK), ≥3 posts, six pair pages written.

5. SCOPE OUT
**No** digital-marketing child pages (v4 — deferred/unpublished).
Gated landings, TCO calculator (P5); JSON-LD (P6).

7. ACCEPTANCE CRITERIA
- All P4 routes 200 from CMS; ch.3.7 linking checklist passes.
- Anti-thinness: no indexable page <800 words; region pages have context/logistics/compliance.
- Migration EOS dates sourced; case-study metrics have context lines.
```

**Optional split:** **P4A** = work + insights. **P4B** = migrate + solutions + markets + pricing.

**Repo status:** ⚠️ Routes/templates exist; launch content + prod seed pending.

---

## P5 — Conversion and integrations

```markdown
1. ROLE & OBJECTIVE
Objective: ch.7 lead flows end-to-end.

3. REFERENCES
[[PASTE: sec07 §7.1–7.10; sec03 §3.2; sec06 §6.8, 6.9]]

4. SCOPE IN
- Cal.com: inline + pop-up + Routing Form; fallback card.
- Five forms (plugin-form-builder): Postgres row FIRST, then downstream.
- Resend + 4 React Email templates; Listmonk double opt-in + reconciliation.
- HubSpot contact/booking upserts + D15 source tags + reconciliation job.
- Lead magnets + /resources; TCO calculator; 8 Umami events (no PII).
- /thank-you/booking, /download, /newsletter (noindex).

5. SCOPE OUT
Schema/sitemap/perf (P6); cutover (P7).

7. ACCEPTANCE CRITERIA
- Booking E2E + fallback; each form Postgres-first; Listmonk path verified.
- HubSpot upserts with correct source tag; calculator disclaimer in email.
```

**Optional split:** **P5A** = Cal.com + forms + email. **P5B** = Listmonk + magnets + calculator + Umami.

**Repo status:** ❌ Not started.

---

## P6 — SEO / GEO and hardening

```markdown
1. ROLE & OBJECTIVE
Objective: ch.10 register as merge-blocking gate.

3. REFERENCES
[[PASTE: sec08 §8.3–8.5; sec10 §10.2–10.4, 10.7; sec03 §3.4; sec06 §6.3]]

4. SCOPE IN
- JSON-LD: Organization, Service, Article, FAQPage, BreadcrumbList.
- sitemap.ts, robots.ts, llms.txt, OG images, redirect validation.
- Perf to ch.10.2; WCAG 2.2 AA ch.10.3; security ch.10.4.
- Lighthouse CI + axe merge-blocking.

7. ACCEPTANCE CRITERIA
- Lighthouse mobile: Perf ≥90, A11y 100, BP ≥95, SEO 100 (home, platform hub, migrate pair).
- TTFB <800ms; JSON-LD zero errors; sitemap = launch URLs only (no v4-deferred marketing URLs).
```

**Repo status:** ❌ Not started.

---

## P7 — Deployment and operations

```markdown
1. ROLE & OBJECTIVE
Objective: live on genmedha.in with recovery, rollback, monitoring, handover.

3. REFERENCES
[[PASTE: sec09 §9.1–9.8; sec10 §10.7]]

4. SCOPE IN
- ch.9.8 nine-step cutover; Dokploy pulls GHCR (no VPS builds).
- Nightly pg_dump ×3, rclone off-VPS; one full restore test.
- Uptime Kuma + external monitor; rollback rehearsed.
- Operational handover; +14d CrUX review.

7. ACCEPTANCE CRITERIA
- ch.10.7 checklist passes on production.
- HTTPS 200 on /, /services, /work, /insights, /contact; restore signed off.
```

**Repo status:** ⚠️ Partial (manual deploys; set DOKPLOY_DEPLOY_WEBHOOK_URL).

---

## Repair prompts (quick reference)

1. **Acceptance audit** — re-run ch.11 gates; pass/fail table.  
2. **Broken integration** — ch.7 symptom diagnosis; Postgres-first rule.  
3. **A11y remediation** — ch.10.3 at token/primitive level.  
4. **Performance remediation** — ch.10.2; no client-side indexable content.  
5. **Scope drift** — diff built artifacts vs Scope-in lists; flag v4 marketing leaks.

---

## Pre-flight checklist (before pasting any prompt)

- [ ] Context block includes v4 Digital Marketing rule  
- [ ] All `[[PASTE: …]]` replaced with actual `docs/plan/` excerpts  
- [ ] Previous phase gate evidence in hand  
- [ ] Production domain `genmedha.in` noted where relevant  
- [ ] Content track running parallel from P2 for P4 anti-thinness gate
