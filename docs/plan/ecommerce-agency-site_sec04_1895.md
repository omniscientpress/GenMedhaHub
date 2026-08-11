## 4. Page-by-Page Blueprints

This chapter is the per-page build contract for the 54 routes in chapter 3: chapter 6 renders these blueprints and chapter 12 prompts from them without further design decisions. Sections are named in terms of chapter 5 collections, fields, and the 13-block library — a section that cannot name its `collection.field` or block source fails review (5.10.1). Numbering note: chapter 3's route inventory "Blueprint ref" column cites this section numbering; refs resolve by page-type name. Scope Addendum v2 note: the eleven scope-directive routes are specified in appended sections 4.18–4.20; existing section numbers 4.1–4.17 are unchanged and the transition editor finalizes cross-references.

### 4.1 Blueprint format and completion rule

#### 4.1.1 Uniform per-page fields

Every page uses the same ten fields. The compact form (1–2 as prose, 4 as an ordered list, 5/6/10 as short lines) serves most pages; the verbose form is reserved for four template-defining pages: Homepage (4.3), Medusa hub (4.9), Migration-pair template (4.11), Case-study template (4.13).

```
PAGE BLUEPRINT — [route] (ref 4.x)
1.  Purpose: one sentence — the decision this page drives.
2.  Audience + intent: segment from ch. 2.2; search/buying intent served.
3.  Journey position: ch. 3.5 value; equals Pages.journeyPosition (5.3.1).
4.  Section sequence: ordered list; each entry =
    [block (ch. 5.11) or collection.field] · headline direction ·
    content goal · evidence source.
5.  CTA placement: primary CTA (ch. 2.9 bank) + position;
    secondary only where the ch. 3.6 row allows.
6.  Schema type: JSON-LD per ch. 8.4.1; FAQPage only if FAQ is visible.
7.  Internal links: required inbound / required outbound (ch. 3.7).
8.  CMS source: collection/global + fields populating the page.
9.  Analytics events: Umami events fired (vocabulary below).
10. Acceptance checks: 2–4 binary pass/fail items for launch QA.
```

**Completion rule:** all ten fields filled, plus four gates — (a) CTA matches the ch. 3.6 row; (b) schema matches ch. 8.4.1; (c) every section traces to a ch. 5 block or `bp:`-tagged field; (d) indexable pages specify ≥800 words unique copy (3.1.1).

**Analytics event vocabulary** (field 9, sitewide, Umami — ch.7.8): `cta_click`, `form_submit`, `booking_complete`, `download_complete`, `newsletter_subscribe`, `calculator_gate_submit`.

**Page inventory and status** (all 54 routes; phase per ch. 11; "spec" = buildable as written, copywriting still a phase task):

| Route(s) | Ref | Phase | Status |
|---|---|---|---|
| / | 4.3 | P3 | Verbose spec |
| 7 indexes: /services, /platforms, /migrate, /solutions, /work, /insights, /resources | 4.4–4.15 per page type | P3–P5 | Compact specs |
| /services/ecommerce-builds, /replatforming-migration, /support-retainers | 4.5–4.7 | P3 | Compact specs |
| /services/web-app-development, /mobile-app-development, /digital-marketing | 4.18 | P3 | Compact specs; pillar-locked CTAs |
| /services/digital-marketing/{seo-geo, performance-marketing, content-marketing, email-lifecycle} | 4.19 | P4 | Compact template ×4 + differentiators table; anti-thinness gate |
| /markets, /markets/{india, usa, uae-gcc} | 4.20 | P4 | Compact template; anti-thinness gate |
| /platforms/medusa | 4.9 | P3 | Verbose spec |
| /platforms/vendure, /shopify, /adobe-commerce | 4.10 | P3 | Compact specs |
| /migrate/* (6 pairs) | 4.11 | P4 | Verbose template + fixed per-pair anchors |
| /solutions/* (5) | 4.12 | P4 | Compact spec |
| /work/[slug] | 4.13 | P4 | Verbose template; 3 placeholder seeds |
| /insights/[slug] | 4.14 | P4 | Template + 3 seed articles (8.8) |
| /resources/*-migration-checklist (3 gated) | 4.15 | P5 | Compact spec |
| /tools/replatforming-calculator | 4.15 | P5 | Compact spec |
| /about, /contact, /book | 4.15 | P3 | Compact specs |
| /pricing | 4.16 | P4 | Spec; bands are market benchmarks |
| /legal/privacy, /terms, /cookies | 4.15 | P3 | Compact spec |
| /thank-you/booking, /download, /newsletter | 4.15 | P5 | Spec; noindex |
| /404 | 4.15 | P3 | Spec; noindex |

Usage note: no route outside this table may be added without a blueprint amendment (5.1.1).

### 4.2 Global shell

#### 4.2.1 Header, nav, footer, announcement, persistent CTA, breadcrumbs, consent surface, empty states

Built once in P3; consumed by every blueprint.

| Surface | Specification | CMS source |
|---|---|---|
| Header + primary nav | 9 items in exact ch. 3.3 order; dropdowns for Services, Platforms, Migrate, Solutions; sticky on scroll | `navigation.primaryNav` |
| Announcement bar | One dismissible line; dated urgency only (e.g., "Magento 2.4.5 security support ends 2026-08-11"[^44^]); never promotional | build-time config |
| Persistent CTA | Desktop "Book a call" header button; mobile sticky footer bar on scroll (3.3.1) | `cta-config`, `navigation.mobileCtaLabel` |
| Breadcrumbs | Every page below depth 1, matching URL hierarchy; emits BreadcrumbList | route path (3.4.1) |
| Consent surface | Cookieless Umami needs no tracking banner; consent checkbox on gated forms (5.6.1); /legal/cookies documents the posture | form-builder plugin |
| Footer | Five columns — Services (all six pillars grouped Commerce / Build & Grow, with the four marketing children nested under Digital Marketing), Platforms, Migrate, Markets (/markets + India, USA, UAE & GCC), Company — repeating every hub URL; markets strip reading "Serving India · USA · UAE & GCC" linking /markets (addendum D9); trust strip gated on `showTrustBadges`; newsletter module | `navigation.footerColumns`, `clients` |
| Empty states | /work without case studies shows OSS projects (Lambda Curry substitution[^13^]); zero-result filters link the nearest hub | query fallback (ch. 6) |

Acceptance: every hub reachable from nav AND footer; breadcrumbs validate at depth 3 (including `Home › Services › Digital Marketing › SEO & GEO` and `Home › Markets › UAE & GCC`); markets strip renders the exact string "Serving India · USA · UAE & GCC" and links /markets; mobile bar fires `cta_click` (`book-call`); trust strip empty while `showTrustBadges` is false.

### 4.3 Homepage

#### 4.3.1 Full blueprint — / (Pages, pageKind=home)

**Purpose:** position GenMedha Hub in one screen; route all four buyer segments (2.2) to their hub within two clicks. **Audience:** all segments; navigational/category intent. **Journey position:** mixed.

| # | Block / source | Headline direction | Content goal | Evidence |
|---|---|---|---|---|
| 1 | Hero (default) | Outcome + ownership promise: "Own your commerce stack: no GMV tax, no license fees, no lock-in" | Core promise; CTA Book a discovery call | Seeed, Agilo[^14^][^12^] |
| 2 | TrustStrip (clients; fallback oss) | "Proof, not promises" | OSS substitutes for the absent roster | [^13^] |
| 3 | FeatureGrid (3 ← `services.shortPitch`, Commerce pillar) | "Design, build, migrate, support" | Route to the three commerce capability pillars | Agilo lifecycle[^12^] |
| 4 | PillarCards (13th block, 5.11; `ad:D9`) | "Build & Grow: the same engineering core, beyond commerce" | Three pillar cards — Web Apps, Mobile Apps, Digital Marketing — each with a one-line stack-coherence proof (`proofLine` ≤120 chars ← `services.proofPoints`) and a link to its pillar route; FeatureGrid cannot serve this band (no per-item link field, 5.11) | Addendum D9; D1 anti-dilution (band is secondary to the commerce hero, never equal-depth) |
| 5 | CaseStudyCardList (manual, 1) | Outcome-led title, not client name | Proof preview; placeholder until real work ships | [^15^][^54^] |
| 6 | RichTextSection + MetricsCalloutRow (urgency block) | "Magento 2.4.5/2.4.6 security support ends 2026-08-11" | Route EOS anxiety to pair pages | [^44^] |
| 7 | FeatureGrid (4 ← `positioningLine` + `economics.costLine`) | "Four platforms, named — never 'any platform'" | Fluency signal; Medusa first, ~1.5× weight | 2.1; [^6^] |
| 8 | Latest insights (auto: 3 newest Posts) | Founder-voice deep-dives | CTO entry into the content engine | 2.2 |
| 9 | CtaBand | "Start with a fixed-price audit" | Primary Book a discovery call; secondary Get a Legacy Platform Audit | [^30^][^41^] |

**CTA:** primary "Book a discovery call" (hero + closing band); secondary "Get a Legacy Platform Audit" (closing band only); the Build & Grow band carries no offer CTA — its cards are navigational links, keeping "Scope my app" and "Get a growth audit" pillar-locked to their service pages (3.6.1). **Schema:** Organization + ProfessionalService + WebSite. **Links out:** all four axis hubs, the three Build & Grow pillar pages, featured case, 3 articles. **CMS:** `pages` (routePath `/`); sections 3–4 pull Services (filtered by `servicePillar`), section 7 pulls PlatformHubs. **Events:** `cta_click`, `newsletter_subscribe`.

Acceptance: hero stays ecommerce and carries the 2.4 ownership promise verbatim (addendum D9 — the band never displaces the hero); PillarCards renders exactly three cards, each linking its pillar route with a non-empty `proofLine`; urgency block shows 2026-08-11 with source footnote; all four hubs linked within one scroll; Lighthouse mobile targets pass (ch.10.2).

### 4.4 Services index

#### 4.4.1 Capability-pillar overview — /services

Purpose/audience: route capability-shoppers to the right pillar in one click; solution-evaluating. Sections: Hero ("Discovery → Build → Migrate → Support → Grow"[^12^]) → two grouped FeatureGrids mirroring the nav dropdown (Commerce: 3 cards; Build & Grow: 3 cards — ← `shortPitch`, `icon`, first `engagementModels.priceFrom`, grouped by `servicePillar`; Commerce group rendered first per the anti-dilution rule, 3.1.1) → CaseStudyCardList → CtaBand (Book a discovery call / View our work). Schema: BreadcrumbList. CMS: `pages` + Services query. Acceptance: each card shows a "from" price (published-pricing posture[^22^][^30^]) and links its pillar route; group labels render exactly "Commerce" and "Build & Grow"; the four marketing children are reachable from the Digital Marketing pillar page, not this index.

### 4.5 Ecommerce Builds page

#### 4.5.1 /services/ecommerce-builds (Services)

Purpose/audience: convert new-build demand from outgrowing merchants and B2B buyers. Sections: Hero ← `title`/`shortPitch` → FeatureGrid (engagement ladder Discovery → design → build → support ← `engagementModels`; Agilo sequence[^12^]) → ComparisonTable (platform-fit guidance: Medusa default, Vendure for complex B2B[^19^], standard Shopify below ~$5M revenue[^29^]) → RichTextSection (process: discovery output, architecture, sprints, handover) → CaseStudyCardList ← `relatedCaseStudies` → FaqAccordion (`emitSchema`) → CtaBand (Book a discovery call / View our work). Schema: Service + BreadcrumbList + FAQPage. Acceptance: four ladder phases each show a "from" price; FAQ validates; fit table holds at least one "don't build headless yet" row.

### 4.6 Replatforming and Migration page

#### 4.6.1 /services/replatforming-migration (Services)

Purpose/audience: convert switching demand; feed the six pair pages. Sections: Hero ("Outgrow legacy platforms without downtime"[^30^]) → RichTextSection (cost-of-staying reframe: GMV fees, license, EOS risk — sourced math only[^6^][^31^][^38^]) → FeatureGrid (named zero-downtime methodology + rollback, 5–6 step preview) → FeatureGrid (SEO-preservation workstream: crawl, 301 maps, canonicals, monitoring[^48^]) → ComparisonTable (3-year TCO framing) → CaseStudyCardList → FaqAccordion → CtaBand (primary Get a Legacy Platform Audit; secondary Book a discovery call) → link block to all six pairs, descriptive anchors (3.7). Schema: Service + BreadcrumbList + FAQPage. Acceptance: audit CTA routes to `/contact?offer=audit` (5.6.1); every TCO figure footnoted.

### 4.7 Support and Retainers page

#### 4.7.1 /services/support-retainers (Services)

Purpose/audience: sell the retainer as a first-class offer — maintenance converts when it is a named nav destination (306 Technologies[^16^]). Sections: Hero ("Support is a product, not an afterthought") → PricingTable (3 SLA tiers ← `engagementModels`: response/restore targets, included hours, "from" price inside the $2.5–20K/mo band, ~$14K ecommerce average[^52^]) → ComparisonTable (maintenance scope — patches, monitoring, backups — vs optimization — CRO, roadmap velocity) → Testimonial → FaqAccordion → CtaBand (Book a discovery call with Routing Form budget question[^60^]). Schema: Service + BreadcrumbList + FAQPage. Acceptance: SLA tiers state numeric response targets (placeholders until ops commits — judgment call); retainer price-from published; scope table draws a hard maintenance/optimization line.

### 4.8 Legacy Platform Audit page

#### 4.8.1 Fixed-scope paid entry product — offer surface on /pricing, /services/replatforming-migration, /contact?offer=audit

The audit is a named offer section template, not a separate route, backed by the audit-inquiry form (5.6.1). All elements mandatory wherever it renders:

| Element | Specification | Evidence |
|---|---|---|
| Deliverables | Architecture/code review; platform-spend/TCO analysis; migration feasibility memo; prioritized recommendation (migrate / modernize / stay) | Elogic audit $25–85K enterprise band[^41^] |
| Timeline | 2–4 weeks kickoff to readout (judgment call; inside Elogic's 1-month automated tier[^39^]) | — |
| Inputs | Read-only platform admin, 12 months of platform invoices, analytics access, one stakeholder interview (judgment call) | — |
| Pricing posture | Fixed price, credited against subsequent build/migration; below the $25–85K band, €5–15K lighter tier | [^41^]; lighter-tier benchmark (dim02) |
| Qualification rules | Spend/revenue threshold enforced by Routing Form; unqualified leads get the checklist | [^60^] |
| Booking flow | audit-inquiry form → scoping call (`audit-scoping` event type) → fixed proposal | 5.6.1 |

Acceptance: deliverables and timeline in numbers, never adjectives; pricing text carries "market benchmarks — GenMedha Hub sets final numbers"; every surface fires `form_submit` (`audit-inquiry`).

### 4.9 Platform hub template and Medusa hub

#### 4.9.1 Reusable template + flagship Medusa page — /platforms/medusa (PlatformHubs, tier=flagship)

**Reusable hub template** (applies verbatim to 4.10; Medusa adds depth, never different structure):

| # | Section | CMS source |
|---|---|---|
| 1 | Hero (variant platform): promise + fit line | `positioningLine` |
| 2 | Economics block: cost line, license note, source footnote | `economics` → ComparisonTable `footnote` |
| 3 | Capabilities grid: native platform strengths | FeatureGrid |
| 4 | Fit guidance: when right AND when wrong | RichTextSection |
| 5 | Ecosystem proof: OSS projects; badges only once earned | TrustStrip (oss) ← `open-source-projects` |
| 6 | Migration cross-links: pair pages touching this platform | `migrationPagesFrom` (3.7) |
| 7 | Solutions cross-links | `relatedSolutions` |
| 8 | FAQ accordion (required on every hub, 5.3.1) | FaqAccordion `emitSchema` |
| 9 | CtaBand: Book a discovery call / Read the migration guide | `cta-config` |

**Medusa hub additions (verbose).** Purpose: own "Medusa agency" demand — the P1 authority target (8.2.1). Capabilities name v2 facts: multi-region by default, price lists, promotions[^5^]; official recipes for B2B, marketplace, subscriptions, digital products[^8^]. Economics: Medusa Cloud $29/$99/$299/mo, 0.0% GMV fee[^6^]; client-owns-billing agency model as the lock-in answer[^7^]. Agentic readiness: MCP/agentic tooling on all Cloud tiers[^6^]. Ecosystem proof: GenMedha Hub OSS plugins first; the Expert badge renders only after listing (hard requirement: ≥1 project live on Medusa Cloud[^11^]; claiming earlier is prohibited, 2.8). Cross-links: all three *-to-medusa pairs. Schema: Service + BreadcrumbList + FAQPage.

Acceptance: all three Cloud tiers shown with footnote; ≥3 inbound links from Medusa-cluster articles (3.7); FAQ validates; no Expert claim in copy.

### 4.10 Vendure, Shopify, and Adobe Commerce pages

#### 4.10.1 Template applied with honest platform-fit guidance

- **/platforms/vendure.** Complex-B2B fit first (the vendor's own positioning); economics context: the managed Vendure Platform runs €40,000/yr flat, framing GenMedha Hub's self-hosted delivery as the ownership alternative[^19^]. License: v3.7.x, GPLv3 + dual commercial licensing since v3[^18^]. Trust line: only 17 official partners — pursued, never claimed, until accepted[^19^]. Cross-links: shopify-to-vendure, magento-to-vendure, /solutions/b2b.
- **/platforms/shopify.** Honesty is the differentiator: below ~$5M revenue the default is a standard Shopify build, not headless; Hydrogen builds run $50K–250K+ US / €150K–700K EU plus $3–8K/mo maintenance, payback above ~$5M[^29^][^31^]; Plus floor ~$2,300/mo[^31^]. The headless-tension claim appears only attributed: "some analysts argue Shopify's Winter '26 direction discourages headless"[^28^]. Cross-links: shopify-to-medusa, shopify-to-vendure.
- **/platforms/adobe-commerce.** Structured on the "three Magentos" frame: Magento Open Source (2.4.9, monthly patches, Mage-OS fork — never declared dead), Commerce PaaS/on-prem, ACCS SaaS (GA mid-2025)[^36^][^37^]. EOS ladder as urgency table: 2.4.4 → 2026-04-14; 2.4.5/2.4.6 → 2026-08-11; 2.4.8 → ~Apr–May 2028[^44^]. Licenses only as partner estimates ($22K–125K/yr on-prem, $40K–190K+/yr Cloud)[^38^]. Cross-links: magento-to-medusa, magento-to-vendure, adobe-commerce-to-accs (the honest stay-in-Adobe path).

Shared acceptance: each hub holds a "when this platform is wrong" paragraph; economics figures footnoted; FAQPage validates.

### 4.11 Migration-pair pages

#### 4.11.1 Mandatory fixed section template — all six pairs (MigrationPages)

Section order is fixed and enforced by required fields (5.3.1); no pair page reorders, skips, or adds. The template copies the pair-page structure proven at Elogic and SplitDev while rejecting Pointer Creative's thinness[^39^][^50^][^35^].

| # | Section (fixed order) | Content requirement | CMS field |
|---|---|---|---|
| 0 | Hero | "Migrate {source} to {target}" + pair-specific outcome subhead | `hero.headline/subhead` |
| 1 | Cost of staying | Quantified status quo: GMV fees, license, EOS exposure; sourced math only (2.4 Pillar 1) | `costOfStaying` |
| 2 | Urgency anchor | One dated, sourced event (per-pair table below) | `urgencyAnchor` |
| 3 | 3-year TCO math block | Line-item source-vs-target; methodology note; every figure footnoted | `tcoBlock` → ComparisonTable |
| 4 | Zero-downtime cutover + rollback | 5–12 named steps with durations; named rollback triggers + procedure | `cutoverSteps`, `rollbackPlan`[^30^] |
| 5 | SEO-preservation workstream | Crawl, 301 maps, canonicals, post-launch monitoring as a workstream, not a paragraph | `seoPreservation`[^48^] |
| 6 | Timeline bands | 6–8 weeks simple / 12–16 mid / 16–24 enterprise B2B (Oronts[^23^]; Elogic 1/3/5-month tiers as cross-check[^39^]); each band with scope and price-from | `timelineBands` |
| 7 | When NOT to migrate | Honest counter-cases: Hyvä in 4–8 weeks, version upgrades, ACCS for Adobe shops; never empty | `whenNotToMigrate`[^40^][^36^] |
| 8 | FAQ | 4–10 pair-specific Q&As, visible, emitted as FAQPage | `faqs` |
| 9 | CTA | Primary Get a Legacy Platform Audit (audit-inquiry form); secondary Book a discovery call; tertiary Download the checklist | CtaBand + `gatedAsset` |

**Per-pair urgency anchors (field 2 values, fixed here):**

| Pair | Urgency anchor | Source |
|---|---|---|
| magento-to-medusa | 2.4.5/2.4.6 security support ends 2026-08-11 (2.4.4 ended 2026-04-14); the only vendor-documented target path | [^44^][^9^] |
| shopify-to-medusa | Hydrogen cost reality ($50K–250K+ builds, $3–8K/mo maintenance[^29^]) + exit-to-owned narrative (0% GMV fee[^6^]) (framing: judgment call) | [^29^][^6^] |
| woocommerce-to-medusa | Maintenance/security burden of self-managed plugin stacks (judgment call — phrase as operational risk, never incident claims) | (judgment call) |
| shopify-to-vendure | B2B ceiling: complex B2B outgrows Shopify's model (framing: judgment call; anchored on Vendure's B2B positioning) | [^19^] |
| magento-to-vendure | Same EOS ladder as magento-to-medusa, aimed at B2B merchants | [^44^][^19^] |
| adobe-commerce-to-accs | Honest-alternative: EOS ladder + ACCS GA mid-2025; the "migration" is stay-in-Adobe — trust play, not bait page | [^44^][^36^][^40^] |

Acceptance (every pair): ≥800 words unique copy with TL;DR (8.5.1); a "why this pair differs" paragraph no sibling could carry; both platform hubs + /migrate + capability page linked (3.7); FAQPage validates.

### 4.12 Commerce-model solution pages

#### 4.12.1 /solutions/{b2b,dtc,marketplace,subscriptions,multi-region} (Solutions)

One compact blueprint for all five: Hero (model pain ← `painSummary`) → FeatureGrid ← `capabilityChecklist` (each row with `platformNote`, e.g. "Medusa recipe exists"[^8^]) → ComparisonTable (platform fit for the model) → CaseStudyCardList ← `relatedCaseStudies` → CtaBand (Book a discovery call / View our work). Schema: Service + BreadcrumbList. Fixed platform-fit mapping:

| Model | Primary platform fit | Evidence |
|---|---|---|
| B2B | Vendure first (native complex B2B); Medusa B2B recipe second | [^19^][^8^] |
| DTC | Medusa (ownership economics); standard Shopify below ~$5M | [^6^][^29^] |
| Marketplace | Medusa marketplace recipe | [^8^] |
| Subscriptions | Medusa subscriptions recipe | [^8^] |
| Multi-region | Medusa multi-region by default | [^5^] |

Acceptance: each page names at least one poor-fit platform for the model (honesty rule); `recommendedPlatforms` minRows 1 enforced.

### 4.13 Work index and case-study detail

#### 4.13.1 /work filters + case-study template (CaseStudies)

**/work index.** Filters on the three tag sets (platform, service type, commerce model) as `noindex,follow` query views (3.4.1); cards show outcome-led title, platform from/to, top metric.

**Case-study template (verbose; fields match ch. 5 CaseStudies one-to-one):**

1. **Outcome-led title** ← `outcomeTitle` — the result, not the client name[^15^]; `client`/`industry` as subline.
2. **Context strip** ← `platformFrom` (empty for greenfield), `platformTo`, `services`, `commerceModels` — the three tag sets driving the closing block (3.7).
3. **Metric callout row** ← `metrics` — display rules: 2–4 callouts; format signed value + metric ("+38% AOV") with a mandatory context line naming period and baseline ("90 days post-launch vs prior 90"); bare numbers and unsourced superlatives rejected (Domaine/ConversionTeam patterns[^32^][^54^]).
4. **Challenge → Approach → Solution → Results** ← the four richText fields[^55^]; Results repeats the metrics inline with context.
5. **Testimonial pull-quote** ← `testimonial` (optional).
6. **Gallery** ← `gallery` (alt enforced, 5.7) + **live link** ← `liveUrl`.
7. **Related block** — computed from tag sets: one platform hub, one capability page, one solution page. Schema: Article + about (8.4.1).

**Placeholder-state editorial rules.** Until real projects land, build-in-public entries use the identical schema with `isPlaceholder: true`: a "project in progress" badge renders, Challenge/Approach come from the build journal, and only real metrics appear (own-store performance, dated Lighthouse scores). Placeholders are excluded from every headline claim and aggregate stat (2.8); a real engagement replaces the placeholder — it is never edited into a client story.

Acceptance: three-tag rule renders three working related links; every metric row has non-empty `context`; placeholder badge visible when flagged.

### 4.14 Insights index and article template

#### 4.14.1 /insights + /insights/[slug] (Posts)

**Index:** filters over the fixed six categories (5.8.1) as noindexed query views. **Article layout:** TL;DR block (3–5 bullets) under the H1 (8.5.1) → answer-first H2s, each opening with a 1–3 sentence direct answer → body → visible FAQ only where FAQPage is emitted → related band ← `relatedService` (required) + `relatedMigrationPage` → author card ← `author` (bio + `sameAs` — entity authority for generative engines[^69^]). **Newsletter points:** after the TL;DR and at article end, both feeding Listmonk (`newsletter_subscribe`). Schema: BlogPosting + BreadcrumbList with `dateModified` (8.9). Acceptance: ≥1 in-body capability link (3.7); TL;DR present; author card with sameAs.

### 4.15 About, contact, booking, lead-magnet, and utility pages

#### 4.15.1 Compact specs (Pages documents unless noted)

- **/about** — Studio story + founder bio from the ch. 2.9 template (verified facts only); Approach/Process lives here as a section (no separate route in ch. 3); TrustStrip. Schema: AboutPage + Person. CTA: Book a discovery call.
- **/contact** — contact-general form + audit-inquiry prefill when `?offer=audit`; email ← `site-settings.contactEmail`. Schema: ContactPage. Fires `form_submit`.
- **/book** — Cal.com inline embed ← `cta-config.bookingUrl` + `bookingEventTypes` (discovery-30, audit-scoping); Routing Form qualifies budget and project type before slots show[^60^]. Fires `booking_complete`.
- **/resources/{slug} (×3, LeadMagnets)** — landingContent: Hero (asset promise) → RichTextSection (contents) → form gate (leadmagnet-gate) → FaqAccordion → signed-URL delivery → /thank-you/download; linked from its pair page (3.2.1). Fires `download_complete`.
- **/tools/replatforming-calculator** — sliders → line-item estimate + 3-year TCO; results email-gated into Listmonk[^51^]; post-gate pitch: Get a Legacy Platform Audit. Schema: WebPage + SoftwareApplication. Fires `calculator_gate_submit`.
- **/thank-you/{booking,download,newsletter}** — confirmation + exactly one next step; `noindex` forced by hook; excluded from sitemap.xml.
- **/legal/privacy, /terms, /cookies** — RichTextSection documents; cookies page states the cookieless-analytics posture.
- **/404** — noindex; recovery links to the four axis hubs; never a dead end.

Acceptance: booking embed loads both event types; signed URL only after form submit; thank-you and 404 pages carry `noindex`.

### 4.16 Engagement models and pricing bands

#### 4.16.1 Pricing page spec — /pricing (Pages, pageKind=pricing)

**Page structure:** Hero (published-pricing posture — Pinelab/Ask Phill[^22^][^30^]) → PricingTable block with three named engagement models — **Fixed-scope project**, **Monthly retainer**, **Dedicated squad** — each with "from" price and features → ComparisonTable (bands below) → RichTextSection (audit credit against project work, 4.8) → CtaBand (primary Get a Legacy Platform Audit; secondary Book a discovery call). Schema: WebPage + OfferCatalog, one `itemListElement` per model with price-from (8.4.1).

**Benchmark bands (rendered on-page under the label "Market benchmarks — GenMedha Hub sets final numbers"):**

| Model | What it includes | Market benchmark band | Benchmark source |
|---|---|---|---|
| Fixed project (build) | Discovery-output build, fixed scope/price | $50–250K+ mid-market; Ask Phill €20–60k / €50–200k / €200k+; Pinelab full setup €8,500 | [^53^][^30^][^22^] |
| Migration (fixed) | Zero-downtime replatform + SEO workstream | $75–300K+; Elogic B2B $75–150K, enterprise $200–500K+ | [^53^][^41^] |
| Monthly retainer | SLA-backed maintenance + optimization hours | $2.5–20K/mo (~$14K ecommerce avg); full-service $10–50K+/mo | [^52^][^53^] |
| Dedicated squad | Named team, monthly | Elogic $35–60K/mo; $25K minimum engagement | [^41^] |
| Hourly | Ad hoc senior engineering | $75–250/hr US/EU | [^53^] |
| Hybrid | Project + retainer bundle (default for $10M+ brands) | e.g., $100K redesign + $15K/mo retainer | [^53^] |
| Paid audit | Fixed-scope Legacy Platform Audit (4.8) | $25–85K enterprise; €5–15K lighter tier | [^41^]; dim02 benchmark |
| Paid workshop | 2-day discovery/alignment | Pinelab €1,800 precedent | [^22^] |

Interpretation: three signals should shape GenMedha Hub's final numbers. First, the transparency outliers outperform: Pinelab publishes exact figures (€8,500 setup, €1,800 workshop) and Ask Phill publishes full tiers — both weaponize published price as trust, exactly what a no-roster agency needs. Second, the audit band is the wedge: the $25–85K enterprise audit sits at the top of the market, leaving the €5–15K lighter tier under-served by specialists; pricing the Legacy Platform Audit there converts cost-pressured merchants into a low-risk first engagement that earns the build phase. Third, retainers are the stability target — the $2.5–20K/mo band with a ~$14K ecommerce average shows the market accepts five-figure monthly commitments when SLA scope is explicit, which is why 4.7 sells scope tables rather than hours. GenMedha Hub should publish "from" prices inside these bands, never above the cited medians at launch (judgment call).

Scope addendum: the marketing-retainer band ($3–15K/mo by channel mix — judgment call anchored to the sourced ecommerce retainer band[^52^]) is specified in chapter 2.5.1 and cross-referenced here rather than duplicated; /pricing renders it as an additional row under the same "Market benchmarks" label, and the growth audit's fixed price follows the lighter-audit tier logic (4.8) with final numbers reserved to GenMedha Hub.

### 4.17 Cross-page matrices

#### 4.17.1 Page → CMS source, page → schema, page → CTA

**Matrix A — page → CMS source** (all 54 routes):

| Route(s) | CMS source |
|---|---|
| /, 8 indexes (incl. /markets), /about, /pricing, /contact, /book, legal ×3, thank-you ×3, /404 | `pages` (routePath, pageKind, layout blocks) |
| /services/* (6 pillars: 3 Commerce + 3 Build & Grow) | `services` (`servicePillar`, `proofPoints`) + blocks |
| /services/digital-marketing/* (4 children) | `services` (`parentService` → digital-marketing, child `serviceCategory`) + blocks |
| /markets/* (3 region pages) | `markets` (typed fields 5.3.2 + `layout` blocks) + `case-studies`/`posts` via `proofLinks` |
| /platforms/* (4 hubs) | `platform-hubs` + blocks + `open-source-projects`, `clients` |
| /migrate/* (6 pairs) | `migration-pages` (typed fields, field-for-field with 4.11.1) |
| /solutions/* (5) | `solutions` + blocks |
| /work, /work/[slug] | `case-studies` + `testimonials` + `tags` |
| /insights, /insights/[slug] | `posts` + `authors` + `categories`/`tags` |
| /resources/* (3 gated) | `lead-magnets` + form-builder `forms` + `media` |
| /tools/replatforming-calculator | `pages` + calculator component (ch. 6) |
| Header/footer/shell | `site-settings`, `navigation`, `seo-defaults`, `cta-config`, `redirects` |

**Matrix B — page → schema** (matches ch. 8.4.1; population sources as in Matrix A). The rule below is confirmed identical in both chapters after the scope-addendum reconciliation: services = Service + BreadcrumbList; markets = Article + `about` + BreadcrumbList, never Service — service pages carry the Service offer schema, while region pages' structured `marketContext` content is editorial rather than an offer, so they take the Article + `about` pattern (as on case studies):

| Page type | JSON-LD |
|---|---|
| Sitewide shell | Organization + ProfessionalService + WebSite |
| Capability pillars (6) | Service + BreadcrumbList (+ FAQPage where FAQ visible) |
| Marketing child pages (4) | Service + BreadcrumbList (+ FAQPage where FAQ visible) |
| Market pages (4) | /markets index: WebPage + BreadcrumbList; region pages: Article + about + BreadcrumbList |
| Platform hubs (4) | Service + BreadcrumbList + FAQPage |
| Migration pairs (6) | Service + FAQPage + BreadcrumbList |
| Solution pages (5) | Service + BreadcrumbList |
| Case studies | Article + about |
| Articles | BlogPosting + BreadcrumbList |
| Lead-magnet landings (3) | WebPage + BreadcrumbList |
| TCO calculator | WebPage + SoftwareApplication |
| About | AboutPage + Person |
| Pricing | WebPage + OfferCatalog |
| Contact / book | ContactPage |
| Legal, thank-you, 404 | none (noindex) |

**Matrix C — page → CTA** (matches ch. 3.6 and the ch. 2.9 language bank; one primary per page):

| Page type | Primary CTA | Secondary CTA | Destination |
|---|---|---|---|
| Homepage | Book a discovery call | Get a Legacy Platform Audit | /book; /contact?offer=audit |
| Services index, Builds, Support | Book a discovery call | View our work | /book; /work |
| Replatforming page | Get a Legacy Platform Audit | Book a discovery call | /contact?offer=audit |
| Platform hubs (4) | Book a discovery call | Read the migration guide | /book; /migrate |
| Migration pairs (6) | Get a Legacy Platform Audit | Book a discovery call; Download the checklist (tertiary) | audit-inquiry; /book; `gatedAsset` |
| Solution pages (5) | Book a discovery call | View our work | /book; /work |
| App service pages (Web App, Mobile App) | Scope my app | View relevant work | /book routing form (app track); /work |
| Digital Marketing pillar + child pages (5) | Get a growth audit | See our own-engine results | /contact?offer=growth-audit; ch. 8 proof content |
| Market pages (/markets + 3 regions) | Book a discovery call | Explore services for your region | /book; contextual service pages |
| /work + case studies | Book a discovery call | See the open-source plugins | /book |
| /insights + articles | Read the migration guide | Newsletter signup | related pair page; footer module |
| /pricing | Get a Legacy Platform Audit | Book a discovery call | /contact?offer=audit |
| Calculator | Email-gate results → Get a Legacy Platform Audit | Book a discovery call | Listmonk → audit |
| Gated landings (3) | Download the checklist | — | Listmonk → /thank-you/download |
| About / contact / book | Book a discovery call | — | /book |

Usage note: specification matrices — a route failing any row fails chapter 12 QA. "Read the migration guide" is never primary on a money page; booking and audit never co-primary (3.6.1); every CTA key resolves against `cta-config.primaryCtas` (5.2.1). Offer CTAs are pillar-locked (3.6.1): "Scope my app" renders only on the two app service pages, "Get a growth audit" only on Digital Marketing pages, and "Get a Legacy Platform Audit" never on Build & Grow or market pages — cross-pillar leakage fails review because it blurs the anti-dilution line (3.1.1).

### 4.18 Build & Grow capability pages

#### 4.18.1 /services/web-app-development, /services/mobile-app-development, /services/digital-marketing (Services, servicePillar=build-grow)

These three pages carry the full service-page structure of the Commerce pillars (4.5–4.7) at compact-spec depth, with proof strategy per addendum D2/D5: app pages prove through stack coherence and dogfooding; the marketing page proves through the agency's own engine. Per the anti-dilution rule (3.1.1), none of the three claims certification or roster depth — that proof class stays Commerce-only.

- **/services/web-app-development.** Purpose/audience: convert the startup/SME founder with an app mandate (ch. 2.2) into a qualified scoping submission; solution-evaluating intent on "web app development company" queries incl. regional qualifiers (8.2). Sections: Hero ← `title`/`shortPitch` ("One engineering core, end to end") → RichTextSection (dogfooding narrative: every client app ships on the site's own stack — Next.js 16.2.x + Payload CMS 3.86 (embedded, PostgreSQL) + React 19 + Tailwind CSS v4 + shadcn/ui, delivered as a single Dockerfile — and this site is the running artifact) → FeatureGrid (engagement ladder scope → architecture → build → launch ← `engagementModels` with `priceFrom`, published-pricing posture[^22^][^30^]) → RichTextSection (when a web app is the wrong spend — honest-fit paragraph mirroring the hub rule) → CaseStudyCardList ← `relatedCaseStudies` (placeholder state: OSS projects, Lambda Curry substitution[^13^]) → FaqAccordion (`emitSchema`) → CtaBand (primary Scope my app → /book routing form app track[^60^]; secondary View relevant work → /work). Schema: Service + BreadcrumbList + FAQPage. Links out: /work; the Medusa hub for commerce-adjacent builds (3.7 cross-link rule, reciprocated in the hub's related-services block). Acceptance: the pinned stack sentence appears verbatim; ≥800 words unique copy; no Commerce offer CTA anywhere on the page; FAQ validates.
- **/services/mobile-app-development.** Purpose/audience: convert the same app-mandate segment where the product is mobile-first; "React Native app development" intent (8.2 P2 cluster). Sections: Hero ← `title`/`shortPitch` ("Launch discipline: MVP first, store submission inside the engagement") → FeatureGrid (stack ← `proofPoints`: React Native (Expo) with TypeScript; native modules where required; one codebase, two stores) → RichTextSection (delivery model: MVP-first scoping, phased roadmap, app-store submission as a scoped engagement phase — judgment call per addendum D2) → FeatureGrid (engagement ladder ← `engagementModels` with `priceFrom`) → RichTextSection (honest-fit paragraph: when native-only development or a PWA is the better answer) → CaseStudyCardList ← `relatedCaseStudies` → FaqAccordion (`emitSchema`) → CtaBand (primary Scope my app; secondary View relevant work). Schema: Service + BreadcrumbList + FAQPage. Links out: /work; /services/web-app-development as sibling. Acceptance: TypeScript/Expo stack named exactly; store submission named as an in-scope phase; ≥800 words unique copy; no Commerce offer CTA; FAQ validates.
- **/services/digital-marketing.** Purpose/audience: convert the marketing-mandate buyer (founder/CMO in India, the USA, or the UAE & GCC, ch. 2.2) into a growth-audit inquiry; hub for the four child pages (4.19). Sections: Hero ← `title`/`shortPitch` ("We rank ourselves first") → RichTextSection (scope definition: SEO/GEO, performance marketing (Google/Meta Ads), content marketing, lifecycle email, analytics/CRO — explicitly not a full-service creative scope, addendum D2) → own-engine proof block: RichTextSection + MetricsCalloutRow (the agency's own rankings, organic traffic, and newsletter growth as the living case study — every metric with a context line naming period and baseline, per the 4.13 metric display rules; build-in-public posts linked, ch. 8) → PillarCards-style link band to the four child pages (rendered from `services` where `parentService` = this document) → FeatureGrid (retainer engagement ← `engagementModels`; $3–15K/mo band per ch. 2.5.1, judgment call) → FaqAccordion (`emitSchema`) → CtaBand (primary Get a growth audit → /contact?offer=growth-audit; secondary See our own-engine results → ch. 8 proof content). Schema: Service + BreadcrumbList + FAQPage. Links out: all four child pages (3.7); ≥1 proof article. Acceptance: all four children linked with descriptive anchors; own-engine metrics present with context lines or the proof block does not ship (anti-thinness gate, 3.1.1); the page itself demonstrates the practice — valid schema, passing Core Web Vitals, ranking-target metadata (addendum D6); ≥800 words unique copy.

### 4.19 Digital marketing child pages

#### 4.19.1 Compact template applied 4× — /services/digital-marketing/{seo-geo, performance-marketing, content-marketing, email-lifecycle} (Services, parentService set)

One fixed compact template for all four children; the differentiators table below carries the per-child content. Sections (fixed order): Hero ← `title`/`shortPitch` → RichTextSection (discipline scope + named deliverables, per-child table) → own-engine proof block: RichTextSection + MetricsCalloutRow (the per-child proof artifact below; metrics carry context lines) → RichTextSection (process: 4–6 named steps) → sibling/parent link band (up-link to /services/digital-marketing in body copy; ≥1 sibling cross-link; ≥1 ch. 8 proof artifact — all three are hard 3.7 rules) → FaqAccordion (`emitSchema`) → CtaBand (primary Get a growth audit; secondary See our own-engine results). Schema: Service + BreadcrumbList (+ FAQPage where FAQ visible). CMS: `services` documents with `parentService` → digital-marketing and the child `serviceCategory` (hook-enforced, 5.3.1).

**Per-child differentiators:**

| Child page | Discipline scope | Own-engine proof artifact | Distinguishing content |
|---|---|---|---|
| seo-geo | Technical SEO + generative-engine optimization (GEO) | GenMedha Hub's own keyword rankings and the site's own emitted JSON-LD as inspectable artifacts (8.4.1); entity-first markup with stable `@id` and `sameAs`[^69^] | GEO method: answer-first sections, TL;DR blocks, entity authority (8.5.1) |
| performance-marketing | Google Ads + Meta Ads management | Build-in-public campaign metrics using the marketing metric types (ROAS, CPL, CAC) added to CaseStudies (5.4.1, `ad:D4`) | Landing-page/CRO loop: paid traffic converts on pages the same team builds |
| content-marketing | Content programs for commerce and app brands | The chapter 8 engine itself: article cadence, topic clusters, newsletter growth | Editorial method preview: brief template, cluster mapping, measurement |
| email-lifecycle | Lifecycle email: capture, nurture, retention | The site's own stack as dogfood: Listmonk + SES at ~$8–10/mo vs MailerLite $32–73/mo[^66^], plus the live 4-email nurture sequence (ch.7.5) | Sample sequence walkthrough; deliverability and consent posture |

Acceptance (every child): ≥800 words unique copy with a "why this discipline differs from its siblings" paragraph (3.1.1 gate — a child that cannot demonstrate the discipline it sells stays unpublished); up-link, ≥1 sibling link, and ≥1 proof-artifact link present in body copy; own-engine proof block populated or the page does not ship; FAQ validates; no CTA other than the pillar-locked pair.

### 4.20 Market pages

#### 4.20.1 Market page template — /markets index + /markets/{india, usa, uae-gcc} (Pages / Markets)

**/markets index** (`pages`, routePath `/markets`). Purpose: consolidate regional intent and route region-qualifying visitors to their region page or a contextual service page; it is a qualifier hub, not a demand-capture hub (3.3). Sections: Hero ("Serving India · USA · UAE & GCC — one remote-first engineering studio") → three region cards ← `markets` (`name`, `marketContext` excerpt) → RichTextSection (engagement model: remote-first delivery, logistics-led claims only — no physical-office claims, addendum D5) → CtaBand (primary Book a discovery call; secondary Explore services for your region). Schema: WebPage + BreadcrumbList. Acceptance: all three region pages linked; no region-to-region cross-links.

**Region page template** (`markets`, one document per region — fixed section order, fields per 5.3.2):

| # | Section | CMS field | Content requirement |
|---|---|---|---|
| 1 | Hero | `name` | Region H1 + one-line engagement promise; logistical claims only |
| 2 | Market context | `marketContext` (minLength 400 chars, hook-enforced) | Demand landscape, buyer behavior, sector notes; market and logistical facts only |
| 3 | Engagement logistics | `engagementLogistics` (`timezoneOverlap`, `contractingNotes`, `paymentNotes`) | Rendered as a three-row specification table: timezone overlap windows, contracting entity/currency/jurisdiction, invoicing rails |
| 4 | Compliance notes | `complianceNotes` | Data-protection summary cross-referencing the ch. 10 privacy register — India: DPDP Act 2023; UAE & GCC: UAE PDPL and Saudi PDPL (addendum D7) |
| 5 | Proof links | `proofLinks` (→ CaseStudies, Posts; hides when empty) | Region-relevant proof card list; empty state renders nothing, never a placeholder |
| 6 | Service cross-links | `layout` blocks (RichTextSection / FeatureGrid) | ≥1 Commerce pillar plus regionally relevant Build & Grow pillars, descriptive anchors (3.7) |
| 7 | FAQ | FaqAccordion (`emitSchema`) | 4–6 region Q&As: timezones, contracting, payments, engagement start |
| 8 | CTA | CtaBand | Primary Book a discovery call; secondary Explore services for your region (3.6 row) |

Schema: Article + about + BreadcrumbList (4.17 Matrix B default; ch. 8 is final and confirms the identical rule — markets = Article + about + BreadcrumbList, never Service). Links: /markets index up-link; the UAE & GCC page covers the whole region in one document — `marketContext` carries per-country notes (UAE, Saudi Arabia, and remaining GCC states) rather than separate country pages, and city- or state-level pages are prohibited outright (3.4.1; Pointer doorway-page warning[^35^]).

**Anti-thinness acceptance rule (every region page):** the page publishes only with substantive unique content — ≥800 words unique copy, every required 5.3.2 field non-empty, logistics table populated with real values, and at least one proof link attached or the proof block confirmed hidden; a region page that fails any item stays unpublished (draft) rather than shipping thin (3.1.1). No local-office or fake-presence claims anywhere on the page (addendum D5).
