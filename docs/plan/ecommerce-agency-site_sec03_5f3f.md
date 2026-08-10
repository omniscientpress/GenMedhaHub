## 3. Information Architecture, Sitemap, and Conversion System

This chapter fixes where every page lives, how visitors move between pages, and how each route converts. Chapter 4 writes the blueprints referenced here; chapter 5 models the CMS collections that serve these routes; chapter 8 maps keywords to these URLs; chapter 11 schedules them into phases P0–P7.

### 3.1 IA principles

#### 3.1.1 Hybrid model and the anti-thinness rule

GenMedha Hub's information architecture (IA) is a five-axis hybrid, because no single-axis model fits a studio that sells commerce capabilities, application engineering, growth services, platforms, migrations, and commerce models at once:

1. **Capability pillars, split into two groups.** The **Commerce** group holds the three original pages matching the service taxonomy: Ecommerce Builds, Replatforming & Migration, Support & Retainers (Domaine's capability-pillar pattern[^32^]; Agilo's lifecycle sequence[^12^]). The **Build & Grow** group holds the three adjacent pillars added by the client scope directive: Web App Development, Mobile App Development, and Digital Marketing — the last with four child pages (SEO/GEO, Performance Marketing, Content Marketing, Email & Lifecycle). Per the anti-dilution rule (chapter 2), the groups are never presented as equal-depth: Commerce carries the certification and open-source proof; Build & Grow carries stack-coherence proof (same Next.js/React/TypeScript core) and own-engine proof (chapter 8).
2. **Platform hubs** — one hub per named platform, with Medusa as the flagship, deepest hub (byte5's per-technology pillar pattern[^17^]; 1Digital's per-platform service-page model[^49^]).
3. **Migration-pair pages** — one page per source-to-target pair, the proven search-engine optimization (SEO) workhorse observed at Elogic, Pointer Creative, and SplitDev[^39^][^35^][^50^].
4. **Commerce-model solutions** — B2B, DTC, Marketplace, Subscriptions, Multi-region, mirroring the "Medusa Cases" filter taxonomy buyers already use on the Medusa Experts directory[^10^] and Medusa's official recipes[^8^].
5. **Market pages** — a /markets index plus one page per target region (India, USA, UAE & GCC). These qualify and route regional visitors with market context, engagement logistics, and region-relevant proof; they are not a second service taxonomy and stay out of the primary nav (3.3).

**Anti-thinness warning (copy the structure, never the thinness).** Pointer Creative programmatically generates migration-pair and city pages at high coverage with thin content[^35^]. GenMedha Hub copies the pair-page *URL structure* but rejects the production method: every pair page is hand-written to a fixed blueprint (chapter 4) with pair-specific cost math, an honest "when not to migrate" section[^40^], and sourced EOS anchors[^44^]. Hard rules: no indexable page ships under 800 words of unique copy (judgment call on the floor); every pair page must answer "why does this pair differ from its siblings"; six pairs are the launch ceiling — more are added only after the first six rank (3.8). The same rule binds the two new IA elements. Region pages under /markets are substantive or they do not publish: each carries market context, engagement logistics (timezone overlap, contracting, payments), compliance notes, and region-relevant proof — never doorway or city-level pages, the exact pattern the Pointer warning flags[^35^]. Digital-marketing child pages ship only when each stands alone with unique copy plus the practice's own proof artifacts (the agency's own rankings, schema, and Core Web Vitals, per chapter 8); a child page that cannot demonstrate the discipline it sells stays unpublished until it can.

### 3.2 Complete sitemap

#### 3.2.1 Sitemap tree and route inventory

Indented tree (indentation = URL hierarchy; `[slug]` = CMS-driven template route):

```
/
├── services/
│   ├── ecommerce-builds            (Commerce group)
│   ├── replatforming-migration     (Commerce group)
│   ├── support-retainers           (Commerce group)
│   ├── web-app-development         (Build & Grow group)
│   ├── mobile-app-development      (Build & Grow group)
│   └── digital-marketing/          (Build & Grow group)
│       ├── seo-geo
│       ├── performance-marketing
│       ├── content-marketing
│       └── email-lifecycle
├── markets/
│   ├── india
│   ├── usa
│   └── uae-gcc
├── platforms/
│   ├── medusa                 (flagship — deepest hub)
│   ├── vendure
│   ├── shopify
│   └── adobe-commerce
├── migrate/
│   ├── magento-to-medusa
│   ├── shopify-to-medusa
│   ├── woocommerce-to-medusa
│   ├── shopify-to-vendure
│   ├── magento-to-vendure
│   └── adobe-commerce-to-accs (honest-alternative page)
├── solutions/
│   ├── b2b
│   ├── dtc
│   ├── marketplace
│   ├── subscriptions
│   └── multi-region
├── work/
│   └── [case-study-slug]
├── insights/
│   └── [article-slug]
├── resources/
│   ├── magento-migration-checklist    (gated)
│   ├── shopify-migration-checklist    (gated)
│   └── woocommerce-migration-checklist (gated)
├── tools/
│   └── replatforming-calculator
├── about
├── pricing
├── book
├── contact
├── legal/
│   ├── privacy
│   ├── terms
│   └── cookies
├── thank-you/
│   ├── booking
│   ├── download
│   └── newsletter
└── 404
```

Route inventory — every launch page. "Blueprint ref" points to the chapter 4 section that specifies the page; phase numbers match chapter 11 (P0–P7).

| URL | Page type | Parent | Blueprint ref (ch.4) | Primary intent | Phase |
|---|---|---|---|---|---|
| / | Homepage | — | 4.3 Homepage | Position + route all audience segments (ch.2); ecommerce stays hero, Build & Grow as secondary band | P3 |
| /services | Index | / | 4.4 Services index | Route to capability pillar | P3 |
| /services/ecommerce-builds | Capability pillar | /services | 4.5 Ecommerce Builds | Convert "new build" demand | P3 |
| /services/replatforming-migration | Capability pillar | /services | 4.6 Replatforming & Migration | Convert switching demand; feed /migrate | P3 |
| /services/support-retainers | Capability pillar (Commerce) | /services | 4.7 Support & Retainers | Sell retainers ($2.5–20K/mo band[^52^]) | P3 |
| /services/web-app-development | Capability pillar (Build & Grow) | /services | 4.18 Build & Grow capability pages | Convert app-build demand; stack-coherence proof | P3 |
| /services/mobile-app-development | Capability pillar (Build & Grow) | /services | 4.18 Build & Grow capability pages | Convert mobile mandate (React Native/Expo) | P3 |
| /services/digital-marketing | Capability pillar (Build & Grow) | /services | 4.18 Build & Grow capability pages | Convert growth demand; own-engine proof | P3 |
| /services/digital-marketing/seo-geo | Marketing child page | /services/digital-marketing | 4.19 Marketing child pages | SEO/GEO service intent; own rankings as proof artifact | P4 |
| /services/digital-marketing/performance-marketing | Marketing child page | /services/digital-marketing | 4.19 Marketing child pages | Google/Meta Ads demand; feed growth-audit offer | P4 |
| /services/digital-marketing/content-marketing | Marketing child page | /services/digital-marketing | 4.19 Marketing child pages | Content-program demand; ch.8 engine as living case | P4 |
| /services/digital-marketing/email-lifecycle | Marketing child page | /services/digital-marketing | 4.19 Marketing child pages | Lifecycle-email demand; Listmonk stack as dogfood proof[^66^] | P4 |
| /platforms | Index | / | 4.9 Platform hub template (index) | Signal platform fluency | P3 |
| /platforms/medusa | Platform hub (flagship) | /platforms | 4.9 Medusa hub | Own "Medusa agency" demand; deepest hub | P3 |
| /platforms/vendure | Platform hub | /platforms | 4.10 Platform hubs | Capture complex-B2B demand[^19^] | P3 |
| /platforms/shopify | Platform hub | /platforms | 4.10 Platform hubs | Honest Hydrogen economics[^29^][^31^] | P3 |
| /platforms/adobe-commerce | Platform hub | /platforms | 4.10 Platform hubs | EOS-driven demand[^44^] | P3 |
| /migrate | Migration hub | / | 4.11 Migration-pair pages (hub) | Consolidate pair pages; methodology | P4 |
| /migrate/magento-to-medusa | Migration pair | /migrate | 4.11 Migration-pair pages | EOS urgency anchor[^44^]; officially documented path[^9^] | P4 |
| /migrate/shopify-to-medusa | Migration pair | /migrate | 4.11 Migration-pair pages | Underserved SEO gap (3.2.2) | P4 |
| /migrate/woocommerce-to-medusa | Migration pair | /migrate | 4.11 Migration-pair pages | Underserved SEO gap (3.2.2) | P4 |
| /migrate/shopify-to-vendure | Migration pair | /migrate | 4.11 Migration-pair pages | B2B movers off Shopify | P4 |
| /migrate/magento-to-vendure | Migration pair | /migrate | 4.11 Migration-pair pages | B2B movers off Magento | P4 |
| /migrate/adobe-commerce-to-accs | Honest-alternative | /migrate | 4.11 Migration-pair pages | Stay-in-Adobe path; trust play[^40^] | P4 |
| /solutions | Index | / | 4.12 Commerce-model solution pages (index) | Route by commerce model | P4 |
| /solutions/b2b | Solution page | /solutions | 4.12 Commerce-model solution pages | B2B segment; Vendure cross-link[^19^] | P4 |
| /solutions/dtc | Solution page | /solutions | 4.12 Commerce-model solution pages | DTC brand demand | P4 |
| /solutions/marketplace | Solution page | /solutions | 4.12 Commerce-model solution pages | Marketplace builds; Medusa recipe[^8^] | P4 |
| /solutions/subscriptions | Solution page | /solutions | 4.12 Commerce-model solution pages | Subscription builds; Medusa recipe[^8^] | P4 |
| /solutions/multi-region | Solution page | /solutions | 4.12 Commerce-model solution pages | Multi-region; Medusa default capability[^5^] | P4 |
| /markets | Index | / | 4.20 Market pages (index) | Route by region; consolidate regional intent | P4 |
| /markets/india | Market page | /markets | 4.20 Market pages | India regional intent; engagement logistics + proof | P4 |
| /markets/usa | Market page | /markets | 4.20 Market pages | USA regional intent; engagement logistics + proof | P4 |
| /markets/uae-gcc | Market page | /markets | 4.20 Market pages | UAE & GCC regional intent; compliance notes (ch.10) | P4 |
| /work | Case-study index | / | 4.13 Work index and case-study detail | Proof browsing; tag filters | P4 |
| /work/[case-study-slug] | Case-study detail | /work | 4.13 Case-study detail template | Outcome proof; links 3 hubs (3.7) | P4 |
| /insights | Blog index | / | 4.14 Insights index and article template | CTO-segment content engine | P4 |
| /insights/[article-slug] | Article | /insights | 4.14 Article template | Organic acquisition; links ≥1 service page | P4 |
| /resources | Index | / | 4.15 Lead-magnet and utility pages (index) | Lead-magnet shelf | P5 |
| /resources/magento-migration-checklist | Gated landing | /resources | 4.15 Lead-magnet landings | Email capture → Listmonk | P5 |
| /resources/shopify-migration-checklist | Gated landing | /resources | 4.15 Lead-magnet landings | Email capture → Listmonk | P5 |
| /resources/woocommerce-migration-checklist | Gated landing | /resources | 4.15 Lead-magnet landings | Email capture → Listmonk | P5 |
| /tools/replatforming-calculator | Interactive tool | / | 4.15 Utility pages (calculator) | TCO proof; email-gated results[^51^] | P5 |
| /about | About | / | 4.15 About | Founder authority; trust | P3 |
| /pricing | Pricing | / | 4.16 Pricing | "From" prices per engagement model | P4 |
| /book | Booking | / | 4.15 Booking | Cal.com embed destination[^60^] | P3 |
| /contact | Contact | / | 4.15 Contact | Low-friction fallback conversion | P3 |
| /legal/privacy | Legal | / | 4.15 Legal | Compliance | P3 |
| /legal/terms | Legal | / | 4.15 Legal | Compliance | P3 |
| /legal/cookies | Legal | / | 4.15 Legal | Compliance | P3 |
| /thank-you/booking | Utility | / | 4.15 Thank-you | Post-booking confirmation + next step | P5 |
| /thank-you/download | Utility | / | 4.15 Thank-you | Deliver asset; pitch audit | P5 |
| /thank-you/newsletter | Utility | / | 4.15 Thank-you | Confirm subscription; set expectations | P5 |
| /404 | Utility | — | 4.15 404 (static route) | Recover lost visitors to hubs | P3 |

Route-group → CMS source mapping — all 54 routes resolve to exactly one owning model in chapter 5:

| Route group | Routes covered | CMS source (ch.5) |
|---|---|---|
| /services/* | /services index + 6 pillar pages + 4 digital-marketing child pages | Services collection — child services via the self-referential `parentService` field (5.3.1) |
| /platforms/* | /platforms index + 4 hub pages | PlatformHubs collection (5.3.1) |
| /migrate/* | /migrate hub + 6 pair pages | MigrationPages collection (5.3.1) |
| /solutions/* | /solutions index + 5 model pages | Solutions collection (5.3.1) |
| /markets/* | /markets index + 3 region pages | Markets collection (5.3.2) |
| /work/* | /work index + case-study detail template | CaseStudies collection (5.4) |
| /insights/* | /insights index + article template | Posts collection, with Authors, Categories, and Tags taxonomies (5.5) |
| /resources/* | /resources index + 3 gated checklist landings | LeadMagnets collection (5.5) |
| /, /about, /pricing, /book, /contact, /legal/*, /thank-you/* | Homepage, About, Pricing, Booking, Contact, 3 legal pages, 3 thank-you pages | Pages collection — layout-builder blocks (5.3, 5.11) |
| /tools/replatforming-calculator | 1 interactive tool | Pages collection + `@payloadcms/plugin-form-builder` form config (5.6) |
| /404 | 1 utility route | Static route — no CMS document |
| header/footer | Site chrome on every route | Navigation + SiteSettings globals (5.2) |

Usage note: index routes (/services, /platforms, /migrate, /solutions, /work, /insights, /resources, /markets) render as Pages documents per 5.3; the collections listed own their detail routes, and no route resolves to more than one owning model.

Usage note: 54 routes total (43 pre-scope-change rows plus the eleven added by the scope directive; the prior note's count of 42 undercounted by one and is corrected here). /pricing is assigned P4 (not in the P3 core list) because its copy depends on finalized pricing bands from chapter 2.5; chapter 11 confirms. The three gated checklist landings pair with the three priority migration pairs so every gated asset has an organic traffic source from day one. The scope directive adds eleven routes: the three Build & Grow pillar pages land in P3 alongside the Commerce pillars so the primary nav never ships a half-built Services dropdown; the four marketing child pages and the four /markets pages land in P4 because each must clear the anti-thinness gate (3.1.1) before launch, and chapter 11 re-rolls the P3/P4 effort estimates upward ~30–40% accordingly.

#### 3.2.2 SEO gap callout: Shopify→Medusa and WooCommerce→Medusa are the priority assets

Medusa's official documentation ships exactly one platform-migration guide — Magento — and no Shopify or WooCommerce equivalent[^9^]. The vendor has ceded two high-intent query clusters ("migrate Shopify to Medusa", "WooCommerce to Medusa") to whoever writes them first: the Magento pair competes against the vendor's own guide and every established Magento agency, while the other two compete against almost no specialist content. Consequence: the content calendar (chapter 8) prioritizes the underserved pairs — each receives a gated checklist and at least two deep-dive articles before the Magento pair gets supporting content. This is a sequencing decision, not a scope decision: all six pairs launch in P4, but supporting-content effort allocates roughly 2:2:1 across Shopify, WooCommerce, and Magento (judgment call). The four /markets pages play the parallel role for regional intent: they give queries with geographic qualifiers ("web app development company India", "ecommerce digital marketing UAE") a substantive landing target, backed by Search Console geo-signals and localized proof rather than hreflang (single-language launch; hreflang stays a documented future option). Chapter 8 owns the keyword-to-URL mapping and geo-targeting detail; this chapter fixes only the routes and the substantive-or-don't-publish gate.

### 3.3 Navigation model

#### 3.3.1 Primary navigation, footer, and mobile behavior

Primary nav, exact left-to-right order:

| Item | Label | Destination | Dropdown contents | Evidence |
|---|---|---|---|---|
| 1 | Services | /services | Two labeled groups — **Commerce:** Ecommerce Builds · Replatforming & Migration · Support & Retainers; **Build & Grow:** Web App Development · Mobile App Development · Digital Marketing (each linking its pillar page; marketing children reachable from the pillar, not the dropdown) | Capability pillars in nav (Domaine[^32^]); lifecycle sequence (Agilo[^12^]); grouped dropdown keeps six pillars scannable without a seventh nav item (judgment call) |
| 2 | Platforms | /platforms | Medusa (flagship, listed first) · Vendure · Shopify · Adobe Commerce | Top-level Medusa page (Lambda Curry[^13^]); per-technology pages (byte5[^17^]) |
| 3 | Migrate | /migrate | All six pair pages, grouped by target | Pair pages as SEO workhorse (Elogic[^39^], SplitDev[^50^]) |
| 4 | Solutions | /solutions | B2B · DTC · Marketplace · Subscriptions · Multi-region | Commerce-model taxonomy (Medusa Experts "Cases"[^10^]; Lambda Curry markets[^13^]) |
| 5 | Work | /work | — | "Work" as nav staple (Agilo, Lambda Curry, Tinloof)[^12^][^13^][^15^] |
| 6 | Insights | /insights | — | "Blog" in every specialist teardown[^12^][^13^][^16^] |
| 7 | About | /about | Markets group: /markets index · India · USA · UAE & GCC | Standard trust route (all teardowns); regional qualifiers live under the trust item, not as a tenth top-level entry |
| 8 | Pricing | /pricing | — | Published-pricing posture (Pinelab, Ask Phill)[^22^][^30^] |
| 9 | Book a call (button) | /book | — | Persistent single-action button: "Let's talk" (Agilo[^12^]), "Get A Quote" (306[^16^]) |

Support & Retainers lives in the Services dropdown rather than as a tenth top-level item; 306 Technologies shows maintenance converts when it is a named, visible nav destination, not a footer afterthought[^16^]. Markets likewise stays out of the primary nav by design: the teardown set reserves top-level slots for demand-capture hubs (capabilities, platforms, pair pages), while region pages qualify visitors rather than capture query demand — so they surface through the About dropdown, the footer, and contextual service-page links (judgment call, consistent with the no-top-nav decision in the scope directive).

**Footer.** Five link columns — Services (all six pillars, grouped Commerce / Build & Grow, with the four marketing children nested under Digital Marketing), Platforms, Migrate, Markets (/markets index plus India, USA, UAE & GCC), Company (About, Pricing, Insights, Contact, legal ×3) — plus a trust-badge strip (Medusa Expert, Vendure partner, Shopify Partner — rendered only once earned, per chapter 2.7), a single-field newsletter module feeding Listmonk[^66^], and a markets strip reading "Serving India · USA · UAE & GCC" that links the /markets index. The footer repeats every hub URL so no hub depends on a dropdown for crawlable discovery — with eleven new routes, the Markets column and nested Services links are what keep the new pages out of orphan territory (3.7).

**Mobile behavior.** Hamburger opens a full-screen accordion: Services (rendering its Commerce and Build & Grow groups as nested sub-accordions), Platforms, Migrate, Solutions, and About (with the Markets group) expand in place; Work, Insights, Pricing are direct links; the "Book a call" button is a sticky footer bar on scroll (persistent low-friction CTA, decision 6 of the research synthesis). **Breadcrumbs** render on every page below depth 1 (`Home › Migrate › Shopify to Medusa`; `Home › Services › Digital Marketing › SEO & GEO`; `Home › Markets › UAE & GCC`), matching the URL hierarchy exactly; case studies and articles get `Work › [title]` / `Insights › [title]`.

### 3.4 URL and slug taxonomy

#### 3.4.1 Rules

- [ ] All slugs lowercase, hyphen-separated; no underscores, no camelCase, no trailing parameters for content pages.
- [ ] Migration pairs follow exactly `/migrate/{source}-to-{target}`; source and target use the canonical short names (`magento`, `shopify`, `woocommerce`, `medusa`, `vendure`, `adobe-commerce`, `accs`) — never synonyms (`magento2`, `woo`).
- [ ] Digital-marketing child pages follow exactly `/services/digital-marketing/{child}` with the canonical child slugs (`seo-geo`, `performance-marketing`, `content-marketing`, `email-lifecycle`); the tree stops at this depth — no grandchildren (no `/services/digital-marketing/seo-geo/technical-seo`), further specializations live as page sections or articles.
- [ ] Market pages follow exactly `/markets/{region}` with region slugs from the canonical set (`india`, `usa`, `uae-gcc`); city- or state-level pages are prohibited outright (Pointer doorway-page warning[^35^]), and new regions enter the canonical set only through the scalability gate (3.8).
- [ ] No dates in URLs; article freshness is expressed in on-page timestamps and schema, never in `/insights/2026/07/...` paths.
- [ ] CMS slug routes are flat: `/work/{slug}`, `/insights/{slug}` — no category segments in URLs (categories live as tags and filters).
- [ ] Trailing-slash policy: canonical form is **no trailing slash**; the app 301-redirects the slashed variant, and every page emits a self-referencing `<link rel="canonical">` to the unslashed URL.
- [ ] Renames are forbidden without a 301 map; the SEO-preservation workstream pattern (crawl, 301 maps, canonicals, monitoring) applies to GenMedha Hub's own site on every restructure[^48^].
- [ ] One page, one URL: filtered views of /work and /insights are query parameters excluded from indexing (`noindex,follow`), never duplicate crawlable paths.

### 3.5 Conversion architecture

#### 3.5.1 Journey map

Four primary journeys, all terminating in a Cal.com booking with a routing form for qualification[^60^]:

1. **Problem-aware → booking.** Organic landing on an article or migration-pair page (problem-aware: "our platform is costing us / blocking us") → capability or platform hub (solution framing + economics proof) → proof assets (case study, TCO calculator, Expert badge) → **Get a Legacy Platform Audit** offer (fixed-price, low-risk first engagement) → **Book a discovery call**. The audit precedes the call for cost-pressured visitors; CTO-segment visitors often skip to the call after consuming technical proof.
2. **Lead-magnet → nurture → booking.** Gated checklist landing → email capture into Listmonk (~$8–10/mo with SES vs MailerLite $32–73/mo[^66^]) → 4-email nurture sequence (chapters 7.4–7.5) delivering migration economics → audit offer → discovery call.
3. **App-mandate → booking.** Startup/SME founder lands on /services/web-app-development or /services/mobile-app-development (nav, referral, or regional-intent search via /markets) → stack-coherence proof (same Next.js/React/TypeScript core as the site itself; React Native/Expo for mobile; dogfooding narrative, chapter 2) → relevant case study or OSS proof → **Scope my app** offer (structured scoping form feeding the booking routing form's app track) → **Book a discovery call**. The scoping step qualifies budget and timeline before the call, mirroring the audit's role in journey 1.
4. **Marketing-mandate → booking.** Founder/CMO in a target region lands on a digital-marketing child page or the pillar (organic, via the ch.8 keyword clusters) → own-engine proof block (the agency's own rankings, traffic, and newsletter growth as the living case study — "we practice on ourselves first") → **Get a growth audit** offer (paid, fixed-scope audit of the prospect's acquisition funnel) → **Book a discovery call**. The growth audit is the marketing analogue of the Legacy Platform Audit: a low-risk paid entry product that precedes any retainer conversation.

Every page declares its journey position (chapter 4 blueprints carry the field) and offers exactly one primary CTA from the chapter 2.9 language bank as extended by the pillar-locked offers in 3.6.1.

### 3.6 CTA hierarchy and routing rules

#### 3.6.1 CTA decision table

| Visitor state | Page type | Primary CTA | Secondary CTA | Destination | Evidence |
|---|---|---|---|---|---|
| Problem-aware, high intent | Migration-pair page | Get a Legacy Platform Audit | Book a discovery call | /contact?offer=audit → /book | Paid-audit entry product (Elogic $25–85K band[^41^]; Ask Phill paid discovery[^30^]) |
| Solution-evaluating | Platform hub | Book a discovery call | Read the migration guide | /book; /migrate hub | Persistent booking CTA via Cal.com embed[^60^] |
| Capability-shopping | Capability page | Book a discovery call | View our work | /book; /work | "Let's talk"/"Get A Quote" primacy[^12^][^16^] |
| App-mandate (founder) | Web App / Mobile App service page | Scope my app | View relevant work | /book routing form (app track); /work | Scoping-before-call qualification via routing forms[^60^]; booking CTA primacy[^12^][^16^] |
| Marketing-mandate (founder/CMO) | Digital Marketing pillar or child page | Get a growth audit | See our own-engine results | /contact?offer=growth-audit → /book; ch.8 proof content | Paid-audit entry product pattern (Elogic[^41^]; Ask Phill paid discovery[^30^]); own engine as living case study (ch.8) |
| Region-qualifying | Market page (/markets/*) | Book a discovery call | Explore services for your region | /book; contextual service page | Regional intent routed to booking; logistics-led claims only (ch.2) |
| Proof-seeking | Case study, /work | Book a discovery call | See the open-source plugins | /book | Outcome-led cases convert on evidence[^54^] |
| Researching (CTO) | Article, /insights | Read the migration guide | Newsletter signup | Related pair page; footer module | CTO converts on content, not calls (ch. 2.2) |
| Price-checking | /pricing | Get a Legacy Platform Audit | Book a discovery call | /contact?offer=audit | Published-pricing posture[^22^][^30^] |
| Tool-using | TCO calculator | Email-gate results → Get a Legacy Platform Audit | Book a discovery call | Listmonk → /contact | Calculator benchmark[^51^] |
| Lead-magnet seeking | Gated landing | Download the checklist | — | Listmonk + /thank-you/download | Per-platform checklists as magnets[^13^] |

Usage note: blueprints enforce this table — a page whose CTA does not match its row is rejected in review. "Read the migration guide" is never primary on a money page; booking and audit never appear as co-primary. Offer CTAs are pillar-locked: "Get a Legacy Platform Audit" appears only on Commerce-group and platform/migration pages, "Scope my app" only on the two app service pages, "Get a growth audit" only on Digital Marketing pages — cross-pillar leakage of offer CTAs fails review because it blurs the anti-dilution line (3.1.1).

### 3.7 Internal-linking model

#### 3.7.1 Hub-and-spoke rules

The graph is hub-and-spoke: platform hubs, capability pages (all six pillars), the migration hub, the digital-marketing pillar (hub for its four children), and the /markets index are hubs; case studies, articles, solutions, pair pages, marketing child pages, and region pages are spokes that must connect hubs to each other.

**IA tree figure (describe to designer, three levels deep).** Level 1: the homepage as the root node. Level 2: eight branch nodes in nav order — Services, Platforms, Migrate, Solutions, Work, Insights, About, Pricing — plus a Markets branch drawn hanging from About/footer (not the nav bar, marking its qualifier role), and a detached conversion node (Book) drawn as a filled terminal because every branch converges on it. Level 3: child leaves — under Services, two labeled group containers: the Commerce group with three capability pills (Ecommerce Builds, Replatforming & Migration, Support & Retainers) and the Build & Grow group with three pills (Web App Development, Mobile App Development, Digital Marketing), the Digital Marketing pill fanning to four child chips (SEO/GEO, Performance Marketing, Content Marketing, Email & Lifecycle); under Platforms, four hub cards with Medusa drawn ~1.5× larger to mark flagship depth; under Migrate, six pair chips; under Solutions, five model chips; under Markets, three region chips (India, USA, UAE & GCC); under Work and Insights, stacked cards marked "[slug] template". Annotate five spoke-relationship arrows: (a) a solid arrow from each case-study card fanning out to one platform hub, one capability pill, and one solution chip — the three-tag rule; (b) a double-headed arrow between each migration-pair chip and the two platform hubs it connects; (c) a dashed arrow from every article card to at least one capability pill; (d) an upward arrow from each marketing child chip to the Digital Marketing pill, plus a dashed arrow across to the Insights stack (own-engine proof content); (e) arrows from each region chip fanning out to the service pills it contextualizes. Orphan test: any leaf with no incoming arrow fails QA.

```mermaid
graph TD
  H[/] --> S[Services] & P[Platforms] & M[Migrate] & SO[Solutions] & W[Work] & I[Insights] & A[About] & PR[Pricing]
  S --> SC[Commerce group] & SG[Build & Grow group]
  SC --> S1[Ecommerce Builds] & S2[Replatforming & Migration] & S3[Support & Retainers]
  SG --> S4[Web App Development] & S5[Mobile App Development] & S6[Digital Marketing]
  S6 --> D1[seo-geo] & D2[performance-marketing] & D3[content-marketing] & D4[email-lifecycle]
  P --> P1[Medusa — flagship] & P2[Vendure] & P3[Shopify] & P4[Adobe Commerce]
  M --> M1[magento→medusa] & M2[shopify→medusa] & M3[woocommerce→medusa] & M4[shopify→vendure] & M5[magento→vendure] & M6[adobe-commerce→accs]
  SO --> SO1[B2B] & SO2[DTC] & SO3[Marketplace] & SO4[Subscriptions] & SO5[Multi-region]
  A --> MK[Markets — footer/About linked]
  MK --> R1[India] & R2[USA] & R3[UAE & GCC]
  W --> CS[case-study-slug] -. 3-tag links .-> P1 & S2 & SO1
  I --> AR[article-slug] -. ≥1 service link .-> S1
  M2 <--> P1 & P3
  D1 & D2 & D3 & D4 -. own-engine proof .-> I
  R1 & R2 & R3 --> S1 & S4 & S6
  S1 & S2 & S3 & S4 & S5 & S6 & P1 & P2 & P3 & P4 & M & SO & MK --> B((Book a call))
```

Verifiable rules for review:

- [ ] Every case study carries exactly three tag sets — platform, service, commerce model — and links the corresponding platform hub, capability page, and solution page in its closing "related" block.
- [ ] Every migration-pair page links **both** platform hubs it connects (source and target), the Replatforming & Migration capability page, and the /migrate hub.
- [ ] The /migrate hub links all six pair pages; all six link back.
- [ ] Every article links at least one service (capability) page within body copy — not only in a template sidebar.
- [ ] Every digital-marketing child page links UP to /services/digital-marketing (body copy, not only breadcrumb) and ACROSS to at least one own-engine proof artifact — the chapter 8 build-in-public articles and metrics posts that demonstrate the practice being sold.
- [ ] /services/digital-marketing links all four child pages; all four link back, and each links at least one sibling where disciplines overlap (e.g., seo-geo ↔ content-marketing).
- [ ] Every market page links the /markets index and every service page it contextualizes — at minimum one Commerce pillar and, where regionally relevant, Build & Grow pillars — plus at least one proof asset (case study or own-engine proof); a market page whose only exit is the contact form fails QA.
- [ ] The /markets index links all three region pages; each region page links back to the index. Region pages do not cross-link laterally to each other (no region-to-region mesh that reads as doorway interlinking).
- [ ] Web App Development and Mobile App Development cross-link to relevant case studies and, where commerce-adjacent, to platform pages (e.g., the web-app page links the Medusa hub for headless-commerce-adjacent builds); platform hubs reciprocate with a single contextual link in their "related services" block.
- [ ] Every platform hub links its relevant pair pages, relevant solutions, and at least one case study (placeholder state until work ships: link the OSS plugin proof instead).
- [ ] Medusa hub receives at least one inbound body link from every article in the Medusa topic cluster.
- [ ] Breadcrumbs, footer, and sitemap.xml expose every indexable route — no orphan pages (a route reachable only by direct URL fails launch QA).
- [ ] Gated landings are linked from their matching pair page; thank-you pages are `noindex` and excluded from sitemap.xml.
- [ ] Cross-links use descriptive anchor text naming the destination entity ("migrate Shopify to Medusa"), never "click here".

### 3.8 Scalability rules

#### 3.8.1 Growth without restructure

The IA absorbs six growth vectors without URL changes:

- **New platforms** (e.g., commercetools, Saleor): add one hub under /platforms, one dropdown row, one footer link. Pair pages are added only after the hub ranks — the Pointer lesson (3.1.1) caps programmatic expansion.
- **New markets/regions** (e.g., Singapore, UK): add one page under /markets/{region} (slug joins the canonical set per 3.4.1), one footer-column link, one About-dropdown row — no nav restructure, no new top-level route. The page ships only after clearing the anti-thinness gate (3.1.1): market context, engagement logistics, compliance notes, and region-relevant proof in place on day one.
- **New marketing sub-services** (e.g., analytics/CRO as a standalone offer): add one child under /services/digital-marketing/{child}, one nested footer link, one sibling cross-link from each overlapping child page. A sub-service graduates to its own top-level pillar only when it generates repeated inbound demand and its own proof portfolio — the same demand-earned rule applied to industries below.
- **New industries**: never new top-level pages. Industries are case-study and article tags; only an industry generating repeated inbound demand earns a /solutions child page.
- **New authors**: authors are an article attribute with an archive at /insights?author= (query-filtered, noindexed per 3.4.1); no /authors URL tree at launch scale.
- **Localized content**: Payload localization serves translated pages at the same slug with locale-prefixed paths (`/de/...`) natively[^56^]; the language switcher ships only with the first complete locale. Partial locales are prohibited — half-translated hubs replicate the thinness failure this chapter exists to prevent. Geo-targeting at launch is single-language (regional /markets pages plus Search Console signals); hreflang is a documented future option owned by chapter 8, not a launch dependency.
