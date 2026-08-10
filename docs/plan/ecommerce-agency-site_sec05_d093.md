## 5. CMS Data Models and Editorial Operations

This chapter is the CMS contract: every collection, global, field, block, and access rule GenMedha Hub's Payload 3.86 instance must implement so that the 54 routes from chapter 3 render without further design decisions. The stack is fixed: Next.js 16.2.x + Payload CMS 3.86 (embedded, PostgreSQL) + React 19 + Tailwind CSS v4 + shadcn/ui, delivered as a single Dockerfile. Payload runs inside the Next.js app, so server components read these models through the Local API with no HTTP hop[^58^]; chapter 6 builds rendering on top, and chapter 7 wires the forms defined in 5.6.

**Scope update (Scope Addendum v2, decision D4).** The model surface expands to serve the three new Build & Grow pillars — Web App Development, Mobile App Development, and Digital Marketing, the latter with four child services — plus a new Markets collection backing the `/markets` index and three region pages (India, USA, UAE & GCC). The Services collection absorbs the new pillars through a `servicePillar` discriminator and extended `serviceCategory` values rather than a new collection (5.3.1); CaseStudies gains a `markets` relationship and extended metric types (5.4.1); the relationship matrix, seed checklist, and block library are extended in 5.8, 5.10, and 5.11. Per D4, no other schema changes: every existing collection, global, and block below remains valid as written.

### 5.1 Modeling principles

#### 5.1.1 Structured where the playbook enforces structure, flexible where marketing needs freedom

The modeling rule follows from the anti-thinness commitment (3.1.1): any page type whose quality depends on a mandatory section template is modeled as **typed fields**, not free-form blocks. MigrationPages and CaseStudies encode their chapter 4 blueprints as required fields and arrays — an editor cannot publish a migration page without `costOfStaying`, `whenNotToMigrate`, and `seoPreservation`; the blueprint is enforced at the data layer, not in review docs. Marketing pages get a `blocks` layout-builder field drawing from the closed block library (5.11) — editors compose, they do not invent layout. No one-off page models: a page type that appears once is a `Pages` document, never a new collection.

Four cross-cutting rules apply to every model below:

1. **Editor-safe fields.** Every editor-facing field carries `admin.description` guidance; validation lives in Payload (`required`, `minRows`/`maxRows`, `maxLength`, custom validators), never in frontend assumptions. Rich text only where inline links are needed; otherwise plain text so typography stays in components.
2. **Standard public-document field set.** Every public collection (Pages, Services, PlatformHubs, MigrationPages, Solutions, CaseStudies, Posts, LeadMagnets, Markets) includes, identically: `slug` (text, required, unique, auto-generated from `title` by a `beforeValidate` hook, lowercase-hyphen per 3.4.1), `seo` group (`metaTitle` text ≤60 chars, `metaDescription` textarea ≤160 chars, `ogImage` upload→Media, `noindex` checkbox default false), `publishedAt` (date, set once on first publish by hook, read-only in admin), and drafts via `versions.drafts` giving `_status` draft/published — required for Live Preview (5.9)[^56^]. Field tables below abbreviate this as **"Standard set (5.1.1)"** to avoid repetition.
3. **Preview support.** All public collections declare `admin.livePreview` and `admin.preview` URL functions pointing at the frontend route pattern, working through Next.js Draft Mode (5.9)[^56^].
4. **Timestamps.** Payload's automatic `createdAt`/`updatedAt` are kept everywhere and exposed to chapter 6 for `dateModified` schema output.

**Scope-expansion principle (addendum D4).** The expanded offer is absorbed by generalization, not by new model types: Services becomes a six-pillar collection via the `servicePillar` select (commerce | build-grow) rather than forking a second capability collection, and the four digital-marketing child services reuse the same collection through a self-referential `parentService` relationship — the no-one-off-models rule above holds. Exactly one genuinely new collection is added, Markets (5.3.2), because region pages carry structured fields (engagement logistics, compliance notes, proof links) that no existing collection has. The traceability convention (5.10.1) extends with the scope: fields that implement addendum decisions carry an `ad:D4` tag in `admin.description` alongside the existing `bp:` tags, so an auditor can grep the Payload config for `ad:` and diff against the addendum's decision list, the same mechanism used for blueprint traceability.

### 5.2 Global models

#### 5.2.1 Five globals carry site-wide configuration

Globals hold singleton data with no per-document workflow. Exactly five ship: SiteSettings, Navigation, SeoDefaults, Redirects, and CtaConfig. All are admin-role write, public-API read (5.9).

**Global: `site-settings`**

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| brandName | text | yes | maxLength 40 | — | "GenMedha Hub until brand finalization; used in title templates and schema Organization name" |
| tagline | text | yes | maxLength 90 | — | Approved positioning statement short form (ch. 2.3) |
| logo | upload | yes | — | → Media | SVG preferred; dark variant below |
| logoDark | upload | no | — | → Media | Rendered on dark sections |
| socialLinks | array | no | maxRows 6 | — | Rows: `platform` (select: linkedin/github/x/youtube), `url` (text, URL format) |
| defaultOgImage | upload | yes | — | → Media | Fallback when a document's `seo.ogImage` is empty; 1200×630 |
| contactEmail | text | yes | email format | — | Shown on /contact; feeds schema |
| foundingYear | number | no | min 2000 | — | Used in Organization schema |

Usage note: editors never edit this global; it is set at build handoff and changed by admins only.

**Global: `navigation`**

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| primaryNav | array | yes | minRows 1, maxRows 9 | — | Rows: `label` (text), `link` (text, relative path), `dropdown` (array of `{label, link}`, maxRows 8). Order matches ch. 3.3 exactly |
| footerColumns | array | yes | minRows 4, maxRows 4 | — | Rows: `heading` (text), `links` (array of `{label, link}`); columns: Services, Platforms, Migrate, Company (3.3.1) |
| showTrustBadges | checkbox | yes | default false | — | "Render footer trust strip only once badges are earned (ch. 2.7)" |
| mobileCtaLabel | text | yes | maxLength 24 | — | Sticky mobile bar label; default "Book a call" |

**Global: `seo-defaults`**

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| titleTemplate | text | yes | must contain `%s` | — | e.g. `%s · GenMedha Hub`; applied when `seo.metaTitle` empty |
| defaultMetaDescription | textarea | yes | maxLength 160 | — | Fallback description |
| siteName | text | yes | — | — | OG `site_name` and schema `publisher` |
| twitterHandle | text | no | starts with @ | — | OG twitter:site |
| robotsPolicy | select | yes | options: allow-all, custom | — | Custom defers to chapter 6 robots.ts rules |

**Global: `redirects`** — the 301 map; the SEO-preservation discipline (crawl, 301 maps, canonicals, monitoring) applies to GenMedha Hub's own restructures[^48^].

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| redirects | array | yes | — | — | Rows: `from` (text, must start with `/`, no trailing slash), `to` (text), `type` (select: 301, 302; default 301), `note` (text) |
| enforceUniqueness | — | — | custom validator: no duplicate `from` | — | Build-time check fails on duplicates or redirect chains (5.8.1) |

**Global: `cta-config`** — one CTA vocabulary for the whole site, sourced from the chapter 2.9 language bank so block CTA fields pick from a list instead of free-typing.

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| primaryCtas | array | yes | minRows 2, maxRows 4 | — | Rows: `key` (select: book-call, get-audit, download-checklist, subscribe), `label` (text), `href` (text) |
| bookingUrl | text | yes | URL format | — | Cal.com base URL for embeds and links[^60^] |
| bookingEventTypes | array | yes | minRows 1 | — | Rows: `key` (select: discovery-30, audit-scoping), `calSlug` (text), `durationMin` (number) — booking metadata consumed by the Embed block (5.11) and /book shell |

### 5.3 Core marketing collections

#### 5.3.1 Pages, Services, PlatformHubs, MigrationPages, Solutions

**Collection: `pages`** — layout-builder documents for the homepage, all index pages (/services, /platforms, /migrate, /solutions, /work, /insights, /resources, /markets), About, Pricing, Contact, the three legal pages, and the three thank-you pages: every block-composed route in the ch. 3 inventory not owned by a typed collection. /404 is a static route per the ch. 3 route-group mapping, not a Pages document.

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| title | text | yes | maxLength 80 | — | H1 source |
| routePath | text | yes | must start with `/`, unique | — | "Full path, e.g. `/services` or `/legal/privacy` — decouples flat CMS slugs from nested URLs (3.2.1)" |
| pageKind | select | yes | options: home, index, about, pricing, contact, legal, thank-you | — | Drives blueprint QA in review (traceability, 5.10.1); no not-found kind — /404 is a static route, not a Pages document (ch. 3 route-group mapping) |
| layout | blocks | yes | minRows 1 | → 5.11 block library | Compose from the closed block library only |
| journeyPosition | select | no | options: problem-aware, solution-evaluating, proof-seeking, researching, price-checking, utility | — | Must match the ch. 3.6 CTA row for this page type |
| Standard set (5.1.1) | — | yes | — | — | `noindex` forced true for the thank-you kind via hook (the static /404 route sets `noindex` at render) |

**Collection: `services`** — six capability pillars in one collection: three Commerce (New Builds, Replatforming & Migration, Support & Retainers) and three Build & Grow (Web App Development, Mobile App Development, Digital Marketing), plus four digital-marketing child services (SEO/GEO, Performance Marketing, Content Marketing, Email Lifecycle) modeled in the same collection via the self-referential `parentService` field. Structured fields for the economics proof, blocks for narrative.

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| title | text | yes | maxLength 60 | — | e.g. "Replatforming & Migration", "Web App Development" |
| servicePillar | select | yes | options: commerce, build-grow | — | "Drives nav dropdown grouping (Commerce vs Build & Grow) and homepage band assignment; ad:D4" |
| serviceCategory | select | yes | options: new-build, replatforming-migration, support-retainer, web-app, mobile-app, digital-marketing, seo-geo, performance-marketing, content-marketing, email-lifecycle | — | "One service-taxonomy vocabulary site-wide; the four child values (seo-geo … email-lifecycle) are valid only when `parentService` is set — hook-enforced; ad:D4" |
| parentService | relationship | no | maxRows 1; target must have serviceCategory=digital-marketing | → Services (self, hasOne) | "Parent for the four marketing child pages (/services/digital-marketing/{slug}); top-level services leave empty; hook blocks cycles and grandparenting (child-of-child); ad:D4" |
| shortPitch | textarea | yes | maxLength 160 | — | Card copy on /services index, nav dropdown, and homepage Build & Grow band |
| icon | select | yes | options: build, migrate, support, web-app, mobile-app, marketing | — | Maps to shadcn/ui icon set |
| engagementModels | array | yes | minRows 1, maxRows 4 | — | Rows: `name` (text), `priceFrom` (text, e.g. "From $25K"), `typicalDuration` (text) — published-pricing posture (Pinelab, Ask Phill)[^22^][^30^] |
| proofPoints | array | no | maxRows 4 | — | Rows: `text` (textarea ≤120) — for Build & Grow services this carries the one-line stack-coherence proof (D1/D2), e.g. "Same Next.js/React/TypeScript core as this site" |
| relatedCaseStudies | relationship | no | maxRows 3 | → CaseStudies (hasMany) | Shown as case-study card list block at render |
| layout | blocks | yes | minRows 1 | → 5.11 | Body composition |
| Standard set (5.1.1) | — | yes | — | — | Route: `/services/{slug}`; child services render at `/services/digital-marketing/{slug}` via `parentService` (route config ch. 6) |

Usage note: `servicePillar` and `serviceCategory` are separate fields on purpose — the pillar is a presentation grouping (nav, homepage), the category is the taxonomy key other collections filter on; conflating them would force a rename to fork the vocabulary (the same one-vocabulary rule as `commerceModels`, 5.8.1).

**Collection: `platform-hubs`** — Medusa (flagship), Vendure, Shopify, Adobe Commerce.

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| name | text | yes | maxLength 40 | — | Canonical short name: `medusa`, `vendure`, `shopify`, `adobe-commerce` (drives 3.4.1 slug rules) |
| tier | select | yes | options: flagship, hub | — | Exactly one `flagship` (Medusa); validated by hook |
| positioningLine | textarea | yes | maxLength 160 | — | Hub hero subhead |
| economics | group | yes | — | — | Sub-fields: `costLine` (text, e.g. "Medusa Cloud $29/$99/$299/mo, 0% GMV fee"[^6^]), `licenseNote` (textarea), `source` (text — citation note shown in footnote slot) |
| eosDate | date | no | — | — | "For platforms with published EOS (Magento 2.4.4 → 2026-04-14; 2.4.5/2.4.6 → 2026-08-11)[^44^]; feeds urgency anchors on pair pages" |
| services | relationship | yes | minRows 1 | → Services (hasMany) | Capabilities offered on this platform |
| migrationPagesFrom | relationship | no | — | → MigrationPages (hasMany) | Denormalized hub cross-link list; keeps 3.7 rule renderable without reverse queries |
| relatedSolutions | relationship | no | — | → Solutions (hasMany) | — |
| layout | blocks | yes | minRows 2 | → 5.11 | Must include one FAQ accordion block (blueprint 4.9) |
| Standard set (5.1.1) | — | yes | — | — | — |

**Collection: `migration-pages`** — the six pair pages. This collection is the playbook made data: every mandatory section of the ch. 4.11 pair-page template is a required field, so the anti-thinness rule (3.1.1) is enforced by the schema. The honest "when not to migrate" section is a first-class required field, following Elogic's counter-narrative pattern[^40^].

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| title | text | yes | maxLength 80 | — | e.g. "Migrate Shopify to Medusa" |
| sourcePlatform | relationship | yes | — | → PlatformHubs | Drives ch. 3.7 cross-links and breadcrumb |
| targetPlatform | relationship | yes | must differ from sourcePlatform | → PlatformHubs | Same |
| hero | group | yes | — | — | Sub-fields: `headline` (text ≤80), `subhead` (textarea ≤200) |
| costOfStaying | richText | yes | — | — | "Quantified cost of the status quo: GMV fees, license, EOS risk; sourced math only (ch. 2.4 Pillar 1)" |
| urgencyAnchor | group | yes | — | — | Sub-fields: `date` (date), `label` (text, e.g. "Magento 2.4.4 end of security support"), `source` (text — e.g. Scandiweb EOS anchors[^44^]) |
| tcoBlock | group | yes | — | — | Sub-fields: `comparisonRows` (array, rows: `item` text, `sourceCost` text, `targetCost` text, `note` text), `methodologyNote` (textarea) |
| cutoverSteps | array | yes | minRows 5, maxRows 12 | — | Rows: `stepTitle` (text), `detail` (textarea), `durationWeeks` (text); zero-downtime sequence per Ask Phill methodology[^30^] |
| rollbackPlan | richText | yes | — | — | Named rollback triggers and procedure; non-negotiable for the de-risking pillar |
| seoPreservation | array | yes | minRows 3 | — | Rows: `action` (text) — crawl, 301 map, canonicals, monitoring workstream[^48^] |
| timelineBands | array | yes | minRows 2, maxRows 4 | — | Rows: `band` (text, e.g. "1–3 months"), `scope` (text), `priceFrom` (text) — Elogic tier pattern[^39^] |
| whenNotToMigrate | richText | yes | — | — | "Honest counter-cases; never leave empty — trust play[^40^]" |
| faqs | array | yes | minRows 4, maxRows 10 | — | Rows: `question` (text), `answer` (richText); rendered as FAQPage schema by chapter 6 |
| gatedAsset | relationship | no | — | → LeadMagnets | Matching checklist landing (3.2.1 pairing rule) |
| relatedCaseStudies | relationship | no | maxRows 3 | → CaseStudies (hasMany) | — |
| Standard set (5.1.1) | — | yes | — | — | Slug pattern `{source}-to-{target}` enforced by hook against the two platform relationships (3.4.1) |

**Collection: `solutions`** — the five commerce-model pages (B2B, DTC, Marketplace, Subscriptions, Multi-region), mirroring the Medusa Experts "Cases" taxonomy[^10^].

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| title | text | yes | maxLength 60 | — | e.g. "B2B Commerce" |
| modelKey | select | yes | options: b2b, dtc, marketplace, subscriptions, multi-region | — | Must equal the CaseStudies `commerceModels` option set (5.4.1) — one vocabulary |
| painSummary | textarea | yes | maxLength 200 | — | Index card copy |
| capabilityChecklist | array | yes | minRows 3 | — | Rows: `capability` (text), `platformNote` (text — e.g. "Medusa recipe exists"[^8^]) |
| recommendedPlatforms | relationship | yes | minRows 1 | → PlatformHubs (hasMany) | B2B → Vendure first[^19^] |
| relatedCaseStudies | relationship | no | maxRows 3 | → CaseStudies (hasMany) | — |
| layout | blocks | yes | minRows 1 | → 5.11 | — |
| Standard set (5.1.1) | — | yes | — | — | — |

#### 5.3.2 Collection: `markets` — region pages for India, USA, and UAE & GCC

**Collection: `markets`** — one document per region page (`/markets/india`, `/markets/usa`, `/markets/uae-gcc`); the `/markets` index itself stays a `pages` document with `routePath` `/markets`. Region pages must be substantive — market context, engagement logistics, compliance notes, relevant proof — not doorway pages (3.1.1 anti-thinness; addendum D3). The schema enforces that with required rich-text and group fields rather than relying on editorial discipline, and the claims discipline of D5 applies at the data layer: regional claims are logistical (timezones, contracting, payments), never local-office claims.

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| name | text | yes | maxLength 60 | — | e.g. "India", "United States", "UAE & GCC" — H1 source; ad:D4 |
| region | select | yes | options: india, usa, uae-gcc; one published document per value | — | Drives route `/markets/{slug}`; hook rejects a second published document with the same region value; ad:D4 |
| marketContext | richText | yes | minLength 400 chars (custom validator) | — | "Demand landscape, buyer behavior, sector notes for the region — market and logistical facts only, no physical-office claims (D5 claims discipline); ad:D4" |
| engagementLogistics | group | yes | all three sub-fields required | — | Sub-fields: `timezoneOverlap` (text, e.g. "IST = UTC+5:30; 4–6 h overlap with CET mornings"), `contractingNotes` (textarea — contracting entity, currency, jurisdiction), `paymentNotes` (textarea — invoicing rails: USD wire, Wise, local options where applicable); ad:D4 |
| complianceNotes | richText | yes | — | — | "Data-protection summary per region (India DPDP Act 2023; UAE PDPL, Saudi PDPL for GCC) cross-referencing the ch. 10 privacy register; ad:D4" |
| proofLinks | array | no | maxRows 6 | rows: `doc` (relationship → CaseStudies, Posts — polymorphic `relationTo`) | "Region-relevant proof rendered as a card list; when empty the render block hides itself rather than shipping a placeholder (anti-thinness); ad:D4" |
| layout | blocks | yes | minRows 1 | → 5.11 | Body composition between the structured fields and the closing CtaBand |
| Standard set (5.1.1) | — | yes | — | — | Route: `/markets/{slug}` |

Usage note: `proofLinks` is polymorphic — Payload models each array row as a relationship field with `relationTo: ['case-studies', 'posts']`, so editors attach either proof type through one field; the reverse direction (a case study tagged to a region) lives on `case-studies.markets` (5.4.1), and the two are deliberately both stored because they serve different render paths (region-page card list vs. case-study region chips).

### 5.4 Proof collections

#### 5.4.1 CaseStudies, Testimonials, Clients/PartnerBadges, OpenSourceProjects

**Collection: `case-studies`** — outcome-led proof; metrics array follows the ConversionTeam/Helium pattern of stat blocks with context, not bare numbers[^54^][^55^].

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| outcomeTitle | text | yes | maxLength 80 | — | "Outcome-led headline, not client name (Tinloof pattern)[^15^]" |
| client | text | yes | maxLength 60 | — | — |
| industry | text | yes | maxLength 60 | — | — |
| platformFrom | relationship | no | — | → PlatformHubs | Empty for greenfield builds |
| platformTo | relationship | yes | — | → PlatformHubs | Drives case-study → hub link (3.7) |
| services | relationship | yes | minRows 1 | → Services (hasMany) | "Drives capability link; covers all six pillars including Build & Grow services (web-app, mobile-app, digital-marketing and its child services) — D4's 'serviceCategories relationship' is realized by this single existing hasMany field, not a second relationship, so service tagging stays one-vocabulary (reconciliation note; ad:D4)" |
| commerceModels | select (hasMany) | yes | minRows 1; options: b2b, dtc, marketplace, subscriptions, multi-region | — | Third tag set; completes the three-tag rule (3.7.1) |
| markets | relationship | no | maxRows 3 | → Markets (hasMany) | "Regions served by the engagement; renders as region chips on the case study and cross-references `markets.proofLinks` (5.3.2); ad:D4" |
| challenge | richText | yes | — | — | Challenge/Approach/Solution/Results narrative skeleton[^55^] |
| approach | richText | yes | — | — | — |
| solution | richText | yes | — | — | — |
| results | richText | yes | — | — | — |
| metrics | array | yes | minRows 1, maxRows 6 | — | Rows: `label` (text, e.g. "Conversion rate"), `value` (text, e.g. "+38%"), `context` (text, e.g. "90 days post-launch vs prior 90") — context is mandatory, unsourced superlatives rejected. Valid metric types extend per pillar (ad:D4): marketing metrics (ROAS, CPL, CAC, organic growth %) and app metrics (launch timeline, crash-free sessions %, store rating) are first-class `label`/`value` pairs; the context rule applies equally (e.g. "ROAS 4.2x, 90-day blended, platform-reported", "99.7% crash-free, first 30 days post-launch") |
| testimonial | relationship | no | maxRows 1 | → Testimonials | Rendered as pull-quote |
| liveUrl | text | no | URL format | — | — |
| gallery | upload (hasMany) | no | maxRows 6 | → Media | Screenshots; alt text enforced by Media model (5.7) |
| tags | relationship | no | — | → Tags (hasMany) | Free tags for /work filters |
| isPlaceholder | checkbox | yes | default false | — | "Build-in-public entries only; renders a 'project in progress' badge and excludes the document from headline claims (ch. 2.8 proof discipline)" |
| Standard set (5.1.1) | — | yes | — | — | Route: `/work/{slug}` |

**Collection: `testimonials`**

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| quote | textarea | yes | maxLength 400 | — | — |
| authorName | text | yes | maxLength 60 | — | — |
| authorRole | text | yes | maxLength 80 | — | — |
| company | text | yes | maxLength 60 | — | — |
| headshot | upload | no | — | → Media | — |
| platform | relationship | no | — | → PlatformHubs | Lets hubs surface relevant quotes |

**Collection: `clients`** — logo wall and partner badges in one model (badges render only once earned, per the trust-strip rule in ch. 2.7).

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| name | text | yes | maxLength 60 | — | — |
| logo | upload | yes | — | → Media | SVG preferred |
| kind | select | yes | options: client, partner-badge | — | partner-badge rows need `badgeUrl` |
| badgeUrl | text | no | URL format; required when kind=partner-badge | — | e.g. Medusa Experts listing once earned[^10^] |
| url | text | no | URL format | — | — |
| displayOrder | number | no | — | — | Trust strip ordering |

**Collection: `open-source-projects`** — the Pillar 3 engineering-depth proof; OSS plugins and starters substitute for a client roster at launch (Lambda Curry pattern)[^13^].

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| name | text | yes | maxLength 60 | — | — |
| repoUrl | text | yes | URL format, github.com host | — | — |
| description | textarea | yes | maxLength 200 | — | Card copy |
| platform | relationship | yes | — | → PlatformHubs | Which hub claims it |
| starsSnapshot | number | no | min 0 | — | Manual snapshot; refresh quarterly, label with `asOf` |
| asOf | date | no | — | — | Date of starsSnapshot |
| status | select | yes | options: active, maintained, archived | — | Archived projects are delisted from blocks |

### 5.5 Editorial collections

#### 5.5.1 Posts, Authors, Categories, Tags, LeadMagnets

**Collection: `posts`** — the /insights engine.

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| title | text | yes | maxLength 90 | — | — |
| excerpt | textarea | yes | maxLength 200 | — | Index card + fallback meta description |
| author | relationship | yes | — | → Authors | Bylined authority (GEO entity signal) |
| categories | relationship | yes | minRows 1, maxRows 2 | → Categories (hasMany) | Taxonomy limit enforced (5.8.1) |
| tags | relationship | no | maxRows 5 | → Tags (hasMany) | — |
| body | richText | yes | — | — | Answer-first structure; chapter 8 briefs enforce |
| relatedService | relationship | yes | minRows 1 | → Services | "Every article links ≥1 capability page in body copy (3.7) — this field drives the closing CTA band; the in-body link remains the writer's job" |
| relatedMigrationPage | relationship | no | maxRows 1 | → MigrationPages | Cluster support for pair pages |
| readingTimeMin | number | no | min 1 | — | Auto-estimated by hook; editor-overridable |
| Standard set (5.1.1) | — | yes | — | — | Route: `/insights/{slug}`; dates on-page, never in URL (3.4.1) |

**Collection: `authors`**

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| name | text | yes | maxLength 60 | — | — |
| role | text | yes | maxLength 80 | — | e.g. "Founder, principal engineer" |
| bio | textarea | yes | maxLength 400 | — | Feeds Article schema author block |
| headshot | upload | no | — | → Media | — |
| socialUrl | text | no | URL format | — | LinkedIn/GitHub for sameAs |

**Collection: `categories`** and **`tags`** — one field table; both are minimal taxonomies.

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| name | text | yes | maxLength 40, unique | — | — |
| slug | text | yes | unique, auto from name | — | Used in query filters only — no crawlable `/category/` URLs (3.4.1); filtered views are `noindex,follow` |
| description | textarea | no | maxLength 200 | — | Categories only; internal reference |

**Collection: `lead-magnets`** — gated assets (the three migration checklists at launch).

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| title | text | yes | maxLength 80 | — | e.g. "Magento Migration Checklist" |
| assetFile | upload | yes | — | → Media | PDF; served via signed URL after capture (5.6.1) |
| landingContent | blocks | yes | minRows 1 | → 5.11 | Landing-page composition (blueprint 4.15) |
| form | relationship | yes | — | → Forms (plugin) | The gate; chapter 7 wires submission → Listmonk |
| migrationPage | relationship | no | maxRows 1 | → MigrationPages | Pair-page cross-link both ways (3.2.1) |
| listmonkListId | number | yes | min 1 | — | Target list for double opt-in nurture[^66^] |
| Standard set (5.1.1) | — | yes | — | — | Route: `/resources/{slug}` |

### 5.6 Conversion collections and plugin boundaries

#### 5.6.1 plugin-form-builder owns Forms and FormSubmissions; nothing is re-invented

The conversion layer uses `@payloadcms/plugin-form-builder` (maintained, UI improvements in v3.83.0)[^3^] exactly as shipped. The plugin creates two collections — `forms` (editor-built definitions) and `form-submissions` (stored in PostgreSQL) — and chapter 7 renders them with the official React pattern. No custom form engine, no custom submission collection; the boundary is: **Payload owns capture and storage; delivery (Resend transactional mail, Listmonk subscriber sync) happens in chapter 7 server-side hooks, not in the CMS schema.** Resend covers transactional email (free 3,000/mo, Pro $20/mo)[^64^]; Listmonk + SES covers newsletter at ~$8–10/mo versus MailerLite $32–73/mo[^66^].

Four configured forms ship at launch (documents in the plugin's `forms` collection, defined in seed 5.10.1):

| Form key | Fields (plugin builder) | Destination | Used on |
|---|---|---|---|
| newsletter-footer | email (required, email format) | Listmonk subscribe → /thank-you/newsletter | Footer module, sitewide |
| leadmagnet-gate | name, email, company (optional), consent (required checkbox) | Listmonk list per LeadMagnet + signed asset URL → /thank-you/download | /resources/{slug} |
| audit-inquiry | name, email, company, currentPlatform (select matching PlatformHubs keys), monthlyPlatformSpend (select band), message | Resend notification + stored submission → /contact?offer=audit prefill | MigrationPages, /pricing, /contact |
| contact-general | name, email, message | Resend notification → /thank-you pattern | /contact |

Usage note: booking is **not** a Payload form — Cal.com Cloud embeds and Routing Forms (budget, project-type qualification) own scheduling metadata[^60^]; the CMS stores only `bookingUrl` and `bookingEventTypes` (CtaConfig) so embeds stay config-driven. There is no subscribers collection: Listmonk is the subscriber store, avoiding dual-write drift.

### 5.7 Media and asset model

#### 5.7.1 One `media` collection, S3/R2-backed, alt text mandatory

**Collection: `media`** — served through `@payloadcms/storage-s3` to S3-compatible object storage (Cloudflare R2 preferred: zero egress; MinIO as self-hosted fallback)[^56^].

| Field | Type | Required | Validation | Relationship | Admin notes |
|---|---|---|---|---|---|
| alt | text | yes | maxLength 125 | — | "Required at upload — the frontend refuses to render an image without alt (Lighthouse Accessibility 100 target)" |
| caption | text | no | maxLength 200 | — | Rendered under images in rich content |
| credit | text | no | maxLength 120 | — | Attribution line when licensed |
| focalPoint | — | yes | auto | — | Payload's built-in focal point; editors set it on hero crops |
| kind | select | yes | options: image, document, video-embed-poster | — | Documents (PDFs) carry no focal point; validation hook enforces |

Video embeds are **not** Media documents: the Embed block (5.11) takes an external URL (YouTube/Vimeo/Cal.com) plus an optional poster upload to Media, keeping heavy assets off the frontend bundle. Image sizes are generated per chapter 6's `imageSizes` config (card 800w, hero 1920w, OG 1200×630); originals stay in R2.

### 5.8 Relationships, slugs, and taxonomy rules

#### 5.8.1 The graph implements chapter 3's internal-linking rules; slugs are machine-enforced

**Relationship matrix.** Rows hold the field; columns are targets. Cell: `field (cardinality)`; `—` = none. Reverse display (a hub listing its case studies) is computed by query at render, never stored — except `platform-hubs.migrationPagesFrom`, deliberately denormalized so the 3.7 cross-link block always renders.

| ↓ holds field → | PlatformHubs | Services | Solutions | CaseStudies | MigrationPages | Testimonials | LeadMagnets | Authors | Categories/Tags | Markets | Media | Forms |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Pages | — | — | — | — | — | — | — | — | — | — | ogImage (N:1) | — |
| Services | — | parentService (1:1, self) | — | relatedCaseStudies (1:N) | — | — | — | — | — | — | ogImage (N:1) | — |
| PlatformHubs | — | services (N:N) | relatedSolutions (N:N) | — | migrationPagesFrom (1:N) | — | — | — | — | — | logo via ogImage (N:1) | — |
| MigrationPages | source+targetPlatform (N:2 fixed) | — | — | relatedCaseStudies (1:N) | — | — | gatedAsset (1:1) | — | — | — | ogImage (N:1) | — |
| Solutions | recommendedPlatforms (N:N) | — | — | relatedCaseStudies (1:N) | — | — | — | — | — | — | ogImage (N:1) | — |
| CaseStudies | platformFrom/To (N:1 each) | services (N:N) | via commerceModels (N:N, select-keyed) | — | — | testimonial (1:1) | — | — | tags (N:N) | markets (N:N) | gallery, ogImage (1:N) | — |
| Posts | — | relatedService (N:1) | — | — | relatedMigrationPage (N:1) | — | — | author (N:1) | categories, tags (N:N) | — | ogImage (N:1) | — |
| LeadMagnets | — | — | — | — | migrationPage (1:1) | — | — | — | — | — | assetFile, ogImage (N:1) | form (1:1) |
| Testimonials | platform (N:1) | — | — | — | — | — | — | — | — | — | headshot (N:1) | — |
| OpenSourceProjects | platform (N:1) | — | — | — | — | — | — | — | — | — | — | — |
| Markets | — | — | — | proofLinks (1:N, polymorphic with Posts) | — | — | — | — | — | — | ogImage (N:1) | — |

Usage note: the matrix shows the CaseStudy three-tag rule (platform, service, commerce model) is fully relational — chapter 6 can render the closing "related" block from joins alone, with no editor-maintained link lists. Two addendum extensions are visible here: `services.parentService` is the only self-relationship in the schema and is cycle-guarded by hook (5.3.1), and the Markets↔CaseStudies pair (`markets.proofLinks` outward, `case-studies.markets` inward) is the second deliberate denormalization after `platform-hubs.migrationPagesFrom` — each direction serves a different render path, and an `afterChange` validation warning flags drift when a case study is linked from a region page but not tagged to it (judgment call).

**Slug and redirect rules.**

| Rule | Applies to | Implementation | Enforcement |
|---|---|---|---|
| Lowercase-hyphen slugs, auto-generated from title | All public collections | `beforeValidate` hook (slugify); manual edit allowed pre-publish only | Hook + unique index |
| Pair slug = `{source}-to-{target}` | MigrationPages | Hook derives slug from the two platform relationships; manual override blocked | Hook; mismatch rejects save |
| No dates in URLs | Posts | Route is flat `/insights/{slug}` | Route config (ch. 6) |
| Nested paths decoupled from slugs | Pages | `routePath` field carries the full path | Unique index on `routePath` |
| Rename requires 301 | All | Any slug/routePath change prompts a Redirects entry (admin warning via `afterChange` hook) | Redirects global (5.2.1); duplicate `from` rejected[^48^] |
| No redirect chains | Redirects | Build-time script validates from→to targets resolve in one hop | CI check fails the build |
| Trailing slash canonicalization | All routes | App-level 301 to unslashed form + self-canonical (3.4.1) | Middleware (ch. 6) |

**Taxonomy limits.** Categories: launch set is fixed at six (Medusa engineering, Migration economics, B2B commerce, Platform comparisons, Performance, Agency operations); new categories require admin role. Tags cap at five per post/case study; commerce-model values exist in exactly one place — the shared option set used by `solutions.modelKey` and `case-studies.commerceModels` — so a rename never forks the vocabulary.

### 5.9 Workflow, access, drafts, and preview

#### 5.9.1 Two editorial roles, drafts everywhere, Live Preview through Draft Mode

`versions.drafts` is enabled on every public collection — the editorial safety net and a hard prerequisite for Live Preview with Next.js Draft Mode[^56^]. Drafts render only in preview; the public frontend queries with `draft: false`. Localization is config-ready (per-field opt-in stub) but **off** at launch: the first complete locale ships with the language switcher, and partial locales are prohibited (3.8.1)[^56^].

**Access/workflow matrix.**

| Capability | admin | editor | Public API (frontend) |
|---|---|---|---|
| Create/edit any document, any state | yes | yes (own drafts + others' drafts) | no |
| Publish / change `_status` to published | yes | no — submits for review (draft only) | no |
| Delete documents | yes | no | no |
| Edit globals (SiteSettings, Navigation, SeoDefaults, CtaConfig) | yes | no | read (published values) |
| Manage Redirects | yes | propose only (draft note) | read at build/runtime |
| Create forms / view FormSubmissions | yes | create forms yes; submissions no (personal data minimization) | create submissions only (public create access, no read) |
| Media upload/delete | yes | upload yes; delete no | read published assets via signed URLs for gated files |
| Manage users and roles | yes | no | no |
| Draft Mode preview / Live Preview | yes | yes | no — Draft Mode session required[^56^] |
| Read published content | yes | yes | yes (published only) |

Usage note: editor-cannot-publish is deliberate even for a solo founder — it forces every page through a second-pair-of-eyes state transition (judgment call).

### 5.10 Seed content and editorial operations

#### 5.10.1 Seed one of every page type so every blueprint renders on first boot

The seed script (idempotent, run at container init when the database is empty) creates exactly the content that lets chapter 6's templates and chapter 4's blueprints be verified visually before real copy exists.

- [ ] 1 admin user (from env credentials) + 1 editor user
- [ ] Globals populated: SiteSettings (GenMedha Hub placeholders, default OG), Navigation (exact ch. 3.3 order, trust badges off), SeoDefaults, CtaConfig (booking event types `discovery-30`, `audit-scoping`), Redirects (empty array, validated)
- [ ] 6 Services — the three Commerce pillars plus the three new Build & Grow pillars (Web App Development, Mobile App Development, Digital Marketing), each with `servicePillar` set and engagement-model rows (ad:D4)
- [ ] 1 digital-marketing child service seed (`/services/digital-marketing/seo-geo`) wired via `parentService` to the Digital Marketing parent, `serviceCategory=seo-geo` (ad:D4)
- [ ] 3 Markets documents — one per region (india, usa, uae-gcc) — with all required richText/group fields filled with substantive placeholder content; thin region seeds fail the anti-thinness gate and block P4 sign-off (ad:D4)
- [ ] 4 PlatformHubs (Medusa flagged `flagship`; Adobe Commerce carrying EOS dates[^44^])
- [ ] 6 MigrationPages, all required fields filled with sourced placeholder math; every `gatedAsset` wired where a checklist exists
- [ ] 5 Solutions (one per `modelKey`)
- [ ] 3 CaseStudies flagged `isPlaceholder: true` (build-in-public entries), each with ≥2 metrics rows carrying context
- [ ] 2 Testimonials, 4 Clients (kind=client only — no partner badges until earned), 2 OpenSourceProjects
- [ ] 6 Categories, 8 Tags, 2 Authors, 3 Posts (one per priority migration cluster, 3.2.2)
- [ ] 3 LeadMagnets with the four plugin forms (5.6.1) and their PDF placeholders uploaded to R2
- [ ] Pages documents for all block-composed routes: home, eight indexes (incl. /markets), about, pricing, contact, 3 legal, 3 thank-you — each with a minimal valid block composition (/404 excluded: static route, no CMS document)
- [ ] Editor documentation: a `docs/editorial.md` in the repo covering the three-tag rule, metrics-context rule, slug discipline, and the publish-approval flow (5.9)

**Ch.4↔Ch.5 traceability approach.** Traceability runs through two mechanisms, not prose cross-references: (1) every chapter 4 blueprint section header names its source as `collection.field` (e.g., "4.11 costOfStaying ← `migration-pages.costOfStaying`"); (2) every required field here that implements a blueprint mandate carries a `bp:4.x` tag in its `admin.description`, so an auditor can grep the Payload config for `bp:` and diff against chapter 4's section list. With the scope addendum, a second tag family applies: fields implementing addendum decisions carry `ad:Dx` tags (all ch. 5 additions are `ad:D4`, plus `ad:D9` on the PillarCards block), greppable the same way against the addendum's decision list. Review rule: a blueprint section without a `bp:`-tagged field, an addendum decision without an `ad:`-tagged field, or a tag pointing at a renumbered section, fails chapter 12 QA. Highest-risk mappings pinned: MigrationPages ↔ 4.11 template (field-for-field, 5.3.1); CaseStudies `metrics` ↔ 4.13 metric-callout rules; `faqs` array + FAQ accordion block ↔ 4.9/4.11 FAQ sections feeding the same FAQPage schema.

### 5.11 Block library

#### 5.11.1 Thirteen closed blocks; each maps to one renderer component

Editors compose `layout` fields (and LeadMagnet `landingContent`) from this library only; field names are exact, renderers are React Server Components unless interactivity forces a client boundary (chapter 6 decides). The FAQ accordion is the structured-data workhorse: its rows feed FAQPage JSON-LD, a priority schema type for classic and generative search[^68^][^69^].

| Block | Fields | Renderer component | Used in |
|---|---|---|---|
| Hero | `eyebrow` (text), `headline` (text, req), `subhead` (textarea), `ctaKey` (select from CtaConfig), `media` (upload→Media, opt), `variant` (select: default, platform, migration) | `<HeroBlock />` | Pages, Services, PlatformHubs, Solutions, LeadMagnets |
| RichTextSection | `content` (richText, req), `maxWidth` (select: prose, wide) | `<RichTextBlock />` | All block-composed types |
| FeatureGrid | `heading` (text), `items` (array 2–6: `icon` select, `title` text, `body` textarea, req) | `<FeatureGridBlock />` | Homepage, Services, Solutions |
| PillarCards | `heading` (text), `cards` (array exactly 3: `title` text, `proofLine` textarea ≤120, `link` text relative path, `icon` select — all req) | `<PillarCardsBlock />` | Homepage Build & Grow band only (ad:D9/D4) — FeatureGrid cannot serve this band because its items carry no per-item `link` field |
| MetricsCalloutRow | `metrics` (array 2–4: `label`, `value`, `context` — mirrors CaseStudies row shape, req) | `<MetricsRowBlock />` | Homepage, PlatformHubs, MigrationPages (manual) — CaseStudies render their own array |
| CaseStudyCardList | `heading` (text), `source` (select: manual, related), `caseStudies` (relationship→CaseStudies, required when manual) | `<CaseStudyCardsBlock />` | Homepage, Services, PlatformHubs, Solutions |
| CtaBand | `heading` (text, req), `body` (textarea), `ctaKey` (select from CtaConfig, req), `secondaryCtaKey` (select, opt) | `<CtaBandBlock />` | All money pages; CTA must match the ch. 3.6 row for the page type |
| FaqAccordion | `heading` (text), `faqs` (array 2–12: `question` text, `answer` richText, req), `emitSchema` (checkbox, default true) | `<FaqAccordionBlock />` (client for disclosure) | PlatformHubs, MigrationPages, Services, LeadMagnets — drives FAQPage schema[^68^] |
| TrustStrip | `source` (select: clients, partner-badges, oss), `heading` (text, opt) | `<TrustStripBlock />` | Homepage, Services, About — partner-badges source renders empty until earned |
| PricingTable | `heading` (text), `tiers` (array 2–4: `name`, `priceFrom` text, `features` array of text, `ctaKey` select, req), `footnote` (textarea) | `<PricingTableBlock />` | /pricing page, Services |
| Embed | `embedKind` (select: cal-inline, cal-popup, video, req), `url` (text URL, req), `eventTypeKey` (select from CtaConfig.bookingEventTypes, cal kinds only), `poster` (upload→Media, video only) | `<EmbedBlock />` (client: Cal.com embed script[^60^]) | /book shell, CtaBand-adjacent booking sections, video on About/CaseStudies |
| Testimonial | `testimonial` (relationship→Testimonials, req), `layout` (select: quote, card) | `<TestimonialBlock />` | Homepage, PlatformHubs, Services |
| ComparisonTable | `heading` (text), `columns` (array 2–4: `label` text), `rows` (array: `criterion` text, `cells` array of text matching columns, req), `footnote` (textarea — citation slot) | `<ComparisonTableBlock />` | MigrationPages (TCO), PlatformHubs, /pricing |

Usage note: `MetricsCalloutRow` and `ComparisonTable` mandate a `context`/`footnote` slot — every quantitative claim on the site is sourced. `PillarCards` is the single addendum-driven block addition: the homepage Build & Grow band needs exactly three cards, each with a one-line stack-coherence proof and a link to its service page (addendum D9), and FeatureGrid's link-less items cannot express that — so the library grows from twelve to thirteen blocks, and the band's card `link` values point at the three Build & Grow service slugs. New blocks require a code change plus a chapter 4 blueprint amendment; editors never request ad-hoc layout (5.1.1).
