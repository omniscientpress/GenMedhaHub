# Plan — Specialist Ecommerce Agency Website: Complete Architecture Plan (No Code)

## Goal
Produce an end-to-end architecture plan for a specialist ecommerce engineering agency site:
build / support / legacy-to-modern transformation, with **Medusa as core competency**,
plus Vendure, Shopify, Adobe Commerce (Magento). No code written. Final deliverable
includes phase-wise, copy-paste-ready development prompts (Kimi Code / K2.x style).

## Deliverables
- `ecommerce-agency-architecture-plan.md` — master plan document
- `ecommerce-agency-architecture-plan.docx` — Word version
- `phase-prompts.md` — standalone phase-wise prompt pack (also embedded in master doc)

## Stage 0 — Clarify (mshtools-ask_user)
Decision points that materially change the architecture:
1. Site tech stack: Next.js 15 vs Astro vs orchestrator recommendation
2. Feature scope: blog, case studies, booking, lead capture, etc.
3. Content management: Payload CMS / Strapi / MDX / Sanity

## Stage 1 — Research (parallel explore subagents, foreground wave)
Skills: none (Orchestrator-designed research briefs). Web search only.
- R1: Medusa ecosystem (2026 state: Medusa v2, Medusa Cloud, partner program) + how top
  Medusa-specialist agencies structure services/messaging/pages.
- R2: Vendure / Shopify Plus / Adobe Commerce agency site structures — service taxonomies,
  migration ("replatforming") messaging, trust signals, pricing/engagement models.
- R3: Technical stack benchmarking — Next.js 15 App Router + headless CMS options,
  booking integrations (Cal.com), forms/CRM, analytics, SEO+GEO (llms.txt, schema.org),
  Dokploy/VPS deployment patterns, performance budgets.
Output: validated research brief per agent → synthesized into writing inputs.

## Stage 2 — Writing (report-writing skill)
Load `/app/.agents/skills/report-writing/SKILL.md` and follow its pipeline:
outline design → chapter writers (subagents) → assembly → final `.md`.
Planned chapters:
1. Executive summary & positioning (Medusa-first specialist narrative)
2. Brand & messaging architecture (service taxonomy, ICP, tone)
3. Information architecture & full sitemap
4. Page-by-page blueprints (sections, content blocks, conversion elements)
5. Technical architecture (stack, repo structure, rendering strategy)
6. CMS data models (collections, fields, relationships)
7. Integrations (booking, forms/CRM, analytics, email, chat)
8. SEO/GEO/content strategy (schema, llms.txt, editorial plan)
9. Hosting, CI/CD & environments (Dokploy/VPS, GitHub flow)
10. Security, performance, accessibility, compliance budgets
11. Phase-wise development plan (scope, deliverables, acceptance criteria, estimates)
12. Phase-wise Kimi Code prompt pack (ready to paste)
13. Risks, assumptions, open questions

## Stage 3 — Formatting (docx skill)
Load `/app/.agents/skills/docx/SKILL.md`, convert final `.md` → `.docx`.

## Stage 4 — Deliver
Files under `/mnt/agents/output/` + summary + KIMI_REF tags.

## Scope change log
- 2026-07-28 (post-delivery): brand locked by client — GenMedha Hub, genmedhahub.com (Genmedha Solutions Pvt Ltd).
  Placeholder pass applied ({{BRAND}}/{{DOMAIN}} resolved) across final md + prompt pack; docx regenerated.
- 2026-07-28 (mid-Stage-2): client added Web App development, Mobile App development, Digital Marketing
  (markets: India, USA, GCC/UAE). Resolution: ecommerce stays flagship; new pillars = "Build & Grow";
  see /mnt/agents/output/ecommerce-agency-site.outline-addendum.md (supersedes outline where conflicting).
  Affected chapters 2,3,4,5,8,10 get revision waves; 11,12,13,1 written against addendum directly.

## Scope change log (brand assets)
- 2026-07-29: client supplied GenMedha Hub logo (brain-circuit GM mark, gold gradient + royal blue,
  tagline "Build. Launch. Grow."). Web-ready kit produced at /mnt/agents/output/brand-assets/
  (transparent full lockup, icon, wordmark, no-tagline lockup, favicon 16–512). Palette extracted
  for Phase 1 tokens: gold #f0c040/#e0a020/#b07000, blue #0030c0/#0020b0/#0020a0.
  Tagline mapping: public tagline = "Build. Launch. Grow."; service lifecycle stays "Build → Migrate → Support → Grow".
  WCAG note: gold gradient fails text contrast — tokens must use solid accessible derivatives.

## Scope change log (CRM/outbound)
- 2026-07-29: client added HubSpot (CRM) + Apollo + Clay outreach, free tiers initially.
  Resolution: Scope Addendum v3 (D10–D15) — HubSpot Free = inbound CRM of record; Apollo Free =
  outbound prospecting/sending (no CRM sync on free); Clay Free = evaluation only; cold-outreach
  domain separation mandated; Resend/Listmonk roles unchanged. Ch.7 revised; 1/11/12/13 patched;
  total estimate 87–119 person-days. Sources [^94^]–[^98^] added.

## Scope change log (brand assets v2)
- 2026-07-29: client supplied designer-cut logo pieces (gold icon on white; wordmark, silver icon,
  full lockup on black). Backgrounds removed (white/black unblend + gamma edge pass). Final kit at
  /mnt/agents/output/brand-assets/: icon-gold, icon-silver (dark-bg), wordmark, lockup-notagline,
  tagline lockup (from first upload), avatar 1200², favicon 16–512, OG card 1200×630 (dark, gold frame).
  Logo status: FINAL for build purposes.
- 2026-07-29 (later): final tagline lockups supplied — image(5) (already-transparent full logo) trimmed →
  canonical tagline lockup for light backgrounds; image(6) kept as dark-bg card + transparent dark variant.
  OG card regenerated with tagline lockup. Brand kit complete (16 files).

## Validation gates
- Gate 0: user answers resolve all Stage-0 decisions.
- Gate 1: research briefs cover all four platforms + stack benchmarks; contradictions resolved.
- Gate 2: every plan chapter present, phase prompts are self-contained and code-free
  (prompts describe what to build; no implementation written by us).
- Gate 3: docx renders cleanly (headings, tables, TOC).
