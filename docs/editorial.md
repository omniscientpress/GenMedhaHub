# Editorial guide — GenMedha Hub CMS

This document covers the publish workflow, tagging rules, and content discipline enforced by the Payload schema (ch. 5).

## Roles and publish workflow

| Role | Can create/edit drafts | Can publish |
| --- | --- | --- |
| Admin | Yes | Yes |
| Editor | Yes | No — submit for admin review |

Every public collection uses `versions.drafts`. Editors save `_status: draft` only; attempting to publish throws an error until an admin approves.

## Three-tag rule (case studies)

Every case study must tag:

1. **Platform** — `platformTo` (and `platformFrom` when migration)
2. **Service** — `services` relationship (one or more of the five pillars)
3. **Commerce model** — `commerceModels` select (shared vocabulary with Solutions)

These drive the closing related-links block at render time (P3). Do not maintain manual link lists.

## Metrics context rule

Every row in `metrics` (case studies) or `MetricsCalloutRow` blocks requires:

- **label** — what was measured
- **value** — signed number or percentage
- **context** — period and baseline (e.g. "90 days post-launch vs prior 90")

Bare numbers and unsourced superlatives are rejected in review.

## Slug discipline

- Lowercase-hyphen only; auto-generated from title on create
- Migration pairs: `{source}-to-{target}` — hook-enforced, no manual override
- Posts: flat `/insights/{slug}` — no dates in URLs
- Pages: `routePath` carries full path (e.g. `/legal/privacy`)
- Renames require a 301 entry in **Redirects** global

## Scope notes (addendum D4)

- **Digital Marketing is not a pillar.** Five services only: three Commerce + two Build & Grow.
- **Markets** — logistical claims only; no fake local-office presence (D5).
- **Placeholder case studies** — set `isPlaceholder: true`; excluded from headline claims.

## Traceability tags

Grep the Payload config for:

- `bp:` — blueprint field mappings (ch. 4)
- `ad:` — addendum decision mappings (D4, D9, etc.)

A blueprint section without a tagged field fails chapter 12 QA.

## Forms (plugin-form-builder)

Four launch forms (ch. 5.6.1):

| Key | Used on |
| --- | --- |
| newsletter-footer | Footer module |
| leadmagnet-gate | `/resources/{slug}` |
| audit-inquiry | Migration pages, pricing, contact |
| contact-general | `/contact` |

Booking uses Cal.com embeds via **CTA Config** — not Payload forms.

## Live Preview

All public collections expose Live Preview URLs pointing at `/api/draft?path=…` (Draft Mode, P3). Drafts never appear on the public site.
