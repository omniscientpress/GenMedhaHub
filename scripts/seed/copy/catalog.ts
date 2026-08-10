/** Per-entity P4 copy — services, platforms, solutions, markets, migrations, index pages. */

import { BRAND } from '../copy'

export type FeatureItem = { icon: string; title: string; body: string }
export type FaqItem = { question: string; answer: string }

export const SERVICES: Record<
  string,
  {
    shortPitch: string
    intro: string
    features: FeatureItem[]
    faqs: FaqItem[]
    metrics: { label: string; value: string; context: string }[]
  }
> = {
  'ecommerce-builds': {
    shortPitch:
      'Greenfield headless storefronts on Medusa and Next.js — you own the code, data, and economics from day one.',
    intro: `We build ecommerce systems for teams that have outgrown template storefronts but are not ready to fund a six-month SI circus. ${BRAND.name} delivers catalog, cart, checkout, admin, and CMS on a stack you can inspect in our public repository and on this site.\n\nEvery build starts with discovery: integration map, hosting posture, payment and fulfillment paths, and a published timeline band. We do not start wireframes until sign-off on architecture and honest counter-cases — including "stay on current platform" when the math says so.`,
    features: [
      { icon: 'build', title: 'Architecture & discovery', body: 'Integration map, payment flows, ERP touchpoints, and CI/CD plan before UI sprints.' },
      { icon: 'build', title: 'Storefront & admin', body: 'Next.js storefront, Medusa backend, Payload for content — same core we dogfood.' },
      { icon: 'support', title: 'Launch & handover', body: 'Runbooks, observability, and optional retainer — no forced dependency.' },
    ],
    metrics: [
      { label: 'Typical build band', value: '8–14 wks', context: 'Catalog + B2C; B2B rules extend band' },
      { label: 'GMV fee (Medusa Cloud)', value: '0%', context: 'Vendor documentation Aug 2026' },
    ],
    faqs: [
      { question: 'Medusa only?', answer: 'Medusa is our flagship — we document Vendure and stay-put paths when fit differs.' },
      { question: 'Do you migrate data from our old store?', answer: 'New builds often include catalog import — scope in discovery.' },
      { question: 'Who owns the repo?', answer: 'You do — we deliver to your org with documentation and training.' },
    ],
  },
  'replatforming-migration': {
    shortPitch:
      'Zero-downtime replatforming with SEO preservation, sourced TCO, and a named rollback plan — not a big-bang rewrite.',
    intro: `Replatforming is where commerce projects die: cutover without rollback, SEO treated as an afterthought, and SI partners who disappear after go-live. We treat migration as an engineering discipline — crawl exports, 301 maps, parallel runs, and sign-off gates.\n\nEvery pair page on this site documents when not to migrate. Hyvä rebuilds, version upgrades, and ACCS paths are legitimate answers when economics support them.`,
    features: [
      { icon: 'migrate', title: 'TCO & pair fit', body: 'Sourced 3-year economics — platform fees, SI cost, internal load — footnoted at render.' },
      { icon: 'migrate', title: 'Cutover sequence', body: 'Named steps, duration bands, rollback triggers rehearsed before DNS switch.' },
      { icon: 'support', title: 'SEO preservation', body: 'Crawl export, canonical validation, 90-day monitoring post-launch.' },
    ],
    metrics: [
      { label: 'Simple catalog band', value: '6–8 wks', context: 'Pair and integration dependent' },
      { label: 'Mid-market B2B', value: '12–16 wks', context: 'Pricing rules + ERP sync' },
    ],
    faqs: [
      { question: 'Can you migrate without downtime?', answer: 'Zero-downtime is the default target — parallel run until sign-off.' },
      { question: 'What about our ERP?', answer: 'Scoped in discovery — event-driven sync with reconciliation jobs.' },
      { question: 'Magento EOS — how urgent?', answer: 'We anchor Adobe/Magento EOS dates with sourced documentation — not fear selling.' },
    ],
  },
  'support-retainers': {
    shortPitch:
      'Post-launch engineering capacity — incidents, upgrades, and roadmap work without ticket-queue agency bloat.',
    intro: `Launch is not the finish line. Medusa upgrades, Next.js security patches, payment provider changes, and catalog ops all need an owner. Our retainers pair principal engineers with clear SLAs — not a rotating cast of juniors reading runbooks for the first time.\n\nRetainers complement clean handover: some teams want us embedded monthly; others call us for quarterly upgrades. Both are valid — we document the operating model in discovery.`,
    features: [
      { icon: 'support', title: 'Incident response', body: 'Named on-call rotation, severity tiers, postmortems with action items.' },
      { icon: 'build', title: 'Platform upgrades', body: 'Medusa, Next.js, Payload version bumps with regression checklist.' },
      { icon: 'web-app', title: 'Roadmap slices', body: 'Small features and integrations billed as scoped slices inside retainer hours.' },
    ],
    metrics: [
      { label: 'Engagement shape', value: 'Monthly', context: 'Hour buckets or dedicated slice — SOW defines' },
      { label: 'Response SLA', value: 'Tiered', context: 'P1/P2 targets documented in MSA' },
    ],
    faqs: [
      { question: 'Do you support stacks you did not build?', answer: 'Yes — after a short audit sprint to establish runbooks.' },
      { question: 'Minimum term?', answer: 'Typically 3 months — month-to-month available after initial term.' },
    ],
  },
  'web-app-development': {
    shortPitch:
      'Customer portals, B2B ordering apps, and internal tools on Next.js/React — shared core with your commerce stack.',
    intro: `Build & Grow means product engineering beyond the storefront: dealer portals, subscription management UI, ops dashboards, and authenticated experiences that share types and APIs with Medusa.\n\nThis site is the proof — Payload admin, marketing routes, and block library are the same patterns we ship for clients. Stack coherence is not a slide; it is inspectable code.`,
    features: [
      { icon: 'web-app', title: 'Product discovery', body: 'User flows, auth model, API contracts, and release cadence agreed upfront.' },
      { icon: 'build', title: 'Full-stack delivery', body: 'Next.js App Router, PostgreSQL, CI/CD, observability.' },
      { icon: 'mobile-app', title: 'Mobile-ready APIs', body: 'Same backend serves web and React Native when you expand.' },
    ],
    metrics: [
      { label: 'Stack overlap with storefront', value: 'Shared', context: 'React/TS/types — D1/D2 proof' },
      { label: 'Typical MVP band', value: '10–16 wks', context: 'Scope-dependent' },
    ],
    faqs: [
      { question: 'Separate team from commerce?', answer: 'Same principals — shared repo strategy when possible.' },
      { question: 'Design included?', answer: 'We implement from your Figma or recommend design partners — scoped in SOW.' },
    ],
  },
  'mobile-app-development': {
    shortPitch:
      'React Native apps that share product logic with your web stack — one team, one domain model, no duplicate backends.',
    intro: `Mobile is not a silo. When your commerce APIs and auth already exist, mobile should consume them — not reinvent catalog sync in a separate agency codebase.\n\nWe deliver iOS and Android via React Native with shared TypeScript models, staged store releases, and the same published-pricing posture as web engagements.`,
    features: [
      { icon: 'mobile-app', title: 'Shared domain layer', body: 'Types and API clients reused from web where architecture allows.' },
      { icon: 'build', title: 'Store release pipeline', body: 'TestFlight / Play Console cadence, crash reporting, OTA strategy documented.' },
      { icon: 'support', title: 'Post-launch', body: 'Retainer or handover — App Store compliance updates included in scope.' },
    ],
    metrics: [
      { label: 'Typical MVP band', value: '12–20 wks', context: 'Auth + catalog + checkout flows' },
    ],
    faqs: [
      { question: 'Native or cross-platform?', answer: 'React Native default — native modules when hardware requires.' },
      { question: 'Backend included?', answer: 'We extend your existing Medusa/Next APIs — greenfield backend scoped separately.' },
    ],
  },
}

export const PLATFORMS: Record<
  string,
  {
    positioning: string
    intro: string
    rightFit: string
    wrongFit: string
    economics: string
    features: FeatureItem[]
    faqs: FaqItem[]
  }
> = {
  medusa: {
    positioning: 'Flagship ownership stack — 0% GMV fee on Medusa Cloud, MIT core, Next.js storefront recipes.',
    intro: `Medusa is our default recommendation when teams want to own commerce logic without Adobe licensing or Shopify GMV tax. Medusa Cloud offers hosted infrastructure at $29/$99/$299/mo tiers with no GMV fee (vendor docs, Aug 2026).\n\nWe ship Medusa for DTC, B2B, and marketplace recipes — with Payload for content and Next.js for storefront performance.`,
    rightFit: 'Revenue $2M–$100M+, custom checkout rules, B2B pricing, ownership mindset, internal or contracted ops team.',
    wrongFit: 'Needs overnight launch with zero engineering — Shopify may be faster to first sale.',
    economics: 'Medusa Cloud $29/$99/$299/mo + infra; 0% GMV. Compare to Shopify Plus % fees over 3-year TCO.',
    features: [
      { icon: 'build', title: 'Ownership', body: 'MIT core, self-host or cloud — no lock-in.' },
      { icon: 'migrate', title: 'Migration target', body: 'Primary target for Shopify, Woo, Magento pairs.' },
      { icon: 'support', title: 'Ecosystem', body: 'Plugins, recipes, active community — we contribute OSS.' },
    ],
    faqs: [
      { question: 'Medusa vs Vendure?', answer: 'Medusa for faster DTC/B2B recipes; Vendure for GraphQL-first enterprise patterns — we model both.' },
      { question: 'Hosting?', answer: 'Medusa Cloud, your AWS/GCP, or Dokploy-style VPS — discovery picks fit.' },
    ],
  },
  vendure: {
    positioning: 'GraphQL-first commerce framework — strong for complex catalog and multi-channel.',
    intro: `Vendure suits teams that want strict GraphQL APIs, NestJS backend patterns, and fine-grained catalog modeling. Economics are self-host license-free with infrastructure costs you control.\n\nWe recommend Vendure when GraphQL federation or existing NestJS investment aligns — not as a default for simple DTC.`,
    rightFit: 'Engineering-led orgs, GraphQL stack, complex product attributes, multi-channel from day one.',
    wrongFit: 'Small catalog, need fastest time-to-market on SaaS — Medusa or Shopify may win.',
    economics: 'OSS core; infra + SI cost — no GMV fee. Partner hosting estimates in discovery.',
    features: [
      { icon: 'build', title: 'GraphQL API', body: 'Strong typing for web, mobile, and partner integrations.' },
      { icon: 'migrate', title: 'Migration pairs', body: 'Shopify→Vendure, Magento→Vendure documented on /migrate.' },
      { icon: 'support', title: 'Operations', body: 'Admin UI and worker patterns for long-running jobs.' },
    ],
    faqs: [
      { question: 'Vendure vs Medusa?', answer: 'Vendure for GraphQL/Nest maturity; Medusa for faster recipe-based launches.' },
    ],
  },
  shopify: {
    positioning: 'Honest hub for when Shopify is the right answer — and when migration off Plus saves money.',
    intro: `Shopify wins on time-to-first-sale and app ecosystem. It loses on GMV fees and customization depth at scale. We document both — including migration to Medusa when 3-year TCO crosses your threshold.\n\nWe build Shopify when stay-put is correct; we migrate when ownership economics win.`,
    rightFit: 'Early-stage DTC, limited engineering, app-store workflows, fast merchandising experiments.',
    wrongFit: 'Complex B2B contract pricing, heavy ERP sync, GMV fees painful at volume — model migration.',
    economics: 'Plus subscription + transaction fees — model in TCO calculator (P5).',
    features: [
      { icon: 'build', title: 'Stay-put builds', body: 'Theme, custom apps, Plus optimizations when migration does not pay.' },
      { icon: 'migrate', title: 'Exit paths', body: 'Shopify→Medusa and Shopify→Vendure pairs with SEO plan.' },
      { icon: 'support', title: 'Counter-cases', body: 'We say "stay on Shopify" when math supports it.' },
    ],
    faqs: [
      { question: 'Do you only migrate off Shopify?', answer: 'No — we implement and optimize Shopify when it is the honest fit.' },
    ],
  },
  'adobe-commerce': {
    positioning: 'EOS-aware guidance for Magento / Adobe Commerce — upgrade, Hyvä, ACCS, or migrate.',
    intro: `Adobe Commerce (Magento) carries licensing cost, SI dependency, and EOS deadlines. Magento 2.4.5/2.4.6 security support ended 2026-08-11 (Adobe documentation). We help teams choose: version upgrade, Hyvä rebuild, ACCS move, or replatform to Medusa/Vendure.\n\nFear is not a strategy — sourced EOS dates and TCO are.`,
    rightFit: 'Existing Magento investment, B2B complexity, need phased exit or modernization.',
    wrongFit: 'Greenfield with no legacy — start on Medusa instead.',
    economics: 'License + hosting + SI hours — compare 3yr to owned stack in pair pages.',
    features: [
      { icon: 'migrate', title: 'EOS planning', body: 'Security patch timeline, risk register, decision matrix.' },
      { icon: 'build', title: 'Hyvä path', body: '4–8 week rebuild when platform stay-put wins.' },
      { icon: 'migrate', title: 'Medusa migration', body: 'Full pair page with rollback and SEO.' },
    ],
    faqs: [
      { question: 'ACCS vs self-hosted?', answer: 'Adobe Commerce Cloud Service pair page covers ACCS migration path.' },
    ],
  },
  woocommerce: {
    positioning: 'WordPress commerce — practical for content-heavy SMB, migration when plugin debt hurts.',
    intro: `WooCommerce fits WordPress-native businesses with moderate catalog complexity. Plugin accumulation, security patching, and performance at scale often trigger replatform conversations.\n\nWe migrate Woo→Medusa when ownership and performance matter; we optimize Woo when stay-put is rational.`,
    rightFit: 'Content-marketing-led SMB, WordPress skills in-house, moderate SKU count.',
    wrongFit: 'High SKU, complex B2B, performance SLAs — plan migration early.',
    economics: 'OSS + hosting + plugin costs; no GMV — infra scales with traffic.',
    features: [
      { icon: 'build', title: 'Optimization', body: 'Caching, checkout plugins, payment hardening on stay-put.' },
      { icon: 'migrate', title: 'Woo→Medusa', body: 'Catalog, customer, order migration with URL map.' },
      { icon: 'support', title: 'Security', body: 'Patch cadence and monitoring recommendations.' },
    ],
    faqs: [
      { question: 'WordPress content after migration?', answer: 'Payload or headless WP — scoped in discovery.' },
    ],
  },
  'adobe-commerce-cloud-service': {
    positioning: 'Adobe Commerce Cloud Service (ACCS) — when staying Adobe-native is the chosen path.',
    intro: `ACCS is Adobe's cloud-hosted Magento lineage for teams that want Adobe relationship continuity without self-host ops. We document migration from self-hosted Adobe Commerce to ACCS — and honest comparison to leaving Adobe entirely.\n\nChoose ACCS when Adobe contracts, extensions, and support tiers align; choose Medusa when ownership economics win.`,
    rightFit: 'Adobe enterprise agreements, need managed Magento-compatible cloud, SI partner ecosystem.',
    wrongFit: 'Want zero license escalator and full code ownership — model Medusa TCO.',
    economics: 'Adobe cloud subscription model — sourced in discovery from Adobe/partner quotes.',
    features: [
      { icon: 'migrate', title: 'Self-host→ACCS', body: 'Pair migration page with cutover plan.' },
      { icon: 'build', title: 'Extension audit', body: 'Compatibility matrix before move.' },
      { icon: 'support', title: 'Ops handover', body: 'Runbooks for cloud ops vs self-host differences.' },
    ],
    faqs: [
      { question: 'ACCS vs Medusa?', answer: 'ACCS preserves Adobe stack; Medusa removes license/GVM dynamics — TCO decides.' },
    ],
  },
}

export const SOLUTIONS: Record<
  string,
  {
    title: string
    pain: string
    intro: string
    capabilities: FeatureItem[]
    faqs: FaqItem[]
  }
> = {
  b2b: {
    title: 'B2B Commerce',
    pain: 'Contract pricing, quote workflows, customer-specific catalogs, and ERP sync break simple DTC storefronts.',
    intro: `B2B commerce needs customer groups, tiered pricing, PO/checkout rules, and approval flows. Medusa B2B recipes and custom modules cover mid-market patterns; enterprise may need Vendure or Adobe during transition.\n\nWe map your ERP truth source first — commerce is rarely the system of record for inventory and invoicing.`,
    capabilities: [
      { icon: 'build', title: 'Customer-specific pricing', body: 'Groups, contracts, and quote-to-order when required.' },
      { icon: 'migrate', title: 'ERP integration', body: 'Event-driven sync, reconciliation, idempotent jobs.' },
      { icon: 'support', title: 'Self-service portal', body: 'Reorder, invoice history, account users — web app pillar.' },
    ],
    faqs: [
      { question: 'Minimum scale for B2B replatform?', answer: 'Usually $5M+ B2B online revenue or strategic ERP pain — discovery validates.' },
    ],
  },
  dtc: {
    title: 'DTC Commerce',
    pain: 'GMV fees, theme limits, and app sprawl on SaaS platforms erode margin as you scale.',
    intro: `Direct-to-consumer brands outgrow Shopify themes when conversion optimization, content, and ownership economics collide. We build Medusa + Next.js DTC stacks with Payload for storytelling and performance budgets enforced in CI.`,
    capabilities: [
      { icon: 'build', title: 'Conversion-focused UX', body: 'Core Web Vitals in CI, A/B-ready component library.' },
      { icon: 'migrate', title: 'Shopify exit', body: 'Pair migrations with influencer URL preservation.' },
      { icon: 'support', title: 'Ops at scale', body: 'Fulfillment, returns, and CS integrations.' },
    ],
    faqs: [
      { question: 'When is Shopify enough?', answer: 'Under ~$3M online with simple catalog — we say stay until TCO flips.' },
    ],
  },
  marketplace: {
    title: 'Marketplace',
    pain: 'Multi-vendor payouts, commission rules, and seller onboarding exceed single-merchant storefront patterns.',
    intro: `Marketplaces require seller accounts, split payments, dispute flows, and catalog moderation. Medusa marketplace recipes provide a foundation; custom work scales with vendor count and payout jurisdictions.\n\nWe scope marketplace as a program — not a theme customization.`,
    capabilities: [
      { icon: 'build', title: 'Seller onboarding', body: 'KYC hooks, catalog approval, commission config.' },
      { icon: 'migrate', title: 'Payments split', body: 'Stripe Connect or regional providers — compliance scoped.' },
      { icon: 'support', title: 'Trust & safety', body: 'Moderation queues and SLA definitions.' },
    ],
    faqs: [
      { question: 'Launch MVP marketplace?', answer: 'Curated sellers + manual payout first — automate in phase 2.' },
    ],
  },
  subscriptions: {
    title: 'Subscriptions',
    pain: 'Recurring billing, dunning, and plan changes conflict with one-time checkout assumptions.',
    intro: `Subscriptions touch billing provider choice (Stripe Billing, Chargebee, etc.), entitlement logic, and customer portal UX. We integrate billing engines with Medusa cart/order models without double sources of truth.`,
    capabilities: [
      { icon: 'build', title: 'Plan catalog', body: 'Intervals, trials, upgrades/downgrades.' },
      { icon: 'web-app', title: 'Customer portal', body: 'Self-serve plan changes and payment method updates.' },
      { icon: 'support', title: 'Dunning & churn', body: 'Retry rules and cancellation flows documented.' },
    ],
    faqs: [
      { question: 'Subscription box vs SaaS billing?', answer: 'Physical subscription adds fulfillment cutoffs — scoped separately.' },
    ],
  },
  'multi-region': {
    title: 'Multi-region',
    pain: 'Currency, tax, inventory, and compliance multiply with every country you sell into.',
    intro: `Multi-region is not just translation — it is tax engines, payment methods, warehouse routing, and data residency. We design region profiles in Medusa with explicit fallback rules and document DPDP/GDPR/PDPL touchpoints per market pages.`,
    capabilities: [
      { icon: 'migrate', title: 'Tax & duty', body: 'Provider integration with test harness for rate changes.' },
      { icon: 'build', title: 'Locale & currency', body: 'Price lists, rounding rules, display conventions.' },
      { icon: 'support', title: 'Fulfillment routing', body: 'Nearest warehouse rules and split shipments.' },
    ],
    faqs: [
      { question: 'Single stack multi-region?', answer: 'Yes with region modules — vs separate stores when brand requires.' },
    ],
  },
}

export const MARKETS: Record<
  string,
  {
    context: string
    logistics: string
    compliance: string
    features: FeatureItem[]
  }
> = {
  india: {
    context: `India is a primary delivery hub for ${BRAND.name} — engineering leadership runs IST with overlap into EU mornings and US evenings. Demand spans D2C brands replatforming off marketplace dependency, B2B manufacturers modernizing dealer portals, and GCC-facing exporters needing multi-currency storefronts.\n\nWe sell remote-first: no physical-office claims. Contracting flows through Omniscient Press with USD/INR settlement options documented in the MSA.`,
    logistics:
      'IST (UTC+5:30) core hours 10:00–19:00 IST. Overlap: 4–6 hours with CET mornings; US East afternoon/evening overlap for standups and demos.',
    compliance:
      'India Digital Personal Data Protection Act 2023 — data processing summaries, consent flows, and cross-border transfer notes documented in privacy register. Payment integrations include Razorpay and international wire where required.',
    features: [
      { icon: 'support', title: 'Timezone overlap', body: 'EU morning + US evening coverage from IST.' },
      { icon: 'build', title: 'Contracting', body: 'INR/USD via Omniscient Press entity.' },
      { icon: 'migrate', title: 'Local payments', body: 'UPI-adjacent flows via gateway partners.' },
    ],
  },
  usa: {
    context: `United States clients typically engage for ownership economics — escaping Shopify Plus GMV fees, Adobe licensing, or failed SI replatforms. We deliver remote with US business-hours overlap (EST/PST) for workshops and cutover windows.\n\nEngagements are USD-denominated with US-friendly MSAs. We do not claim US physical offices — logistics are documented here for transparency.`,
    logistics:
      'US standups 9:00–12:00 ET where needed; engineering continues IST with handoff notes. Cutover windows scheduled for US low-traffic periods.',
    compliance:
      'CCPA/state privacy where applicable; PCI scope minimized via Stripe/partner tokenization. SOC2-ready logging patterns on request.',
    features: [
      { icon: 'build', title: 'USD contracting', body: 'Wire/ACH per MSA.' },
      { icon: 'migrate', title: 'US tax providers', body: 'Avalara/TaxJar integration patterns.' },
      { icon: 'support', title: 'Cutover windows', body: 'US overnight maintenance slots.' },
    ],
  },
  'uae-gcc': {
    context: `UAE and broader GCC engagements cover DTC brands, marketplace operators, and B2B distributors serving KSA, UAE, and Qatar. Buyers expect Arabic/English experiences, local payment methods, and PDPL-aware data handling.\n\nWe deliver remote with Gulf business hours overlap for steering committees — no fake Dubai office address on this site.`,
    logistics:
      'GST (UTC+4) overlap with IST is high — joint workshops 11:00–16:00 GST common. Saudi/Qatar clients align to similar bands.',
    compliance:
      'UAE PDPL and Saudi PDPL summaries in privacy register; data residency preferences scoped per SOW. Local payment methods (Mada, regional wallets) via gateway partners.',
    features: [
      { icon: 'migrate', title: 'Arabic/English', body: 'RTL storefront patterns in Next.js.' },
      { icon: 'build', title: 'Regional payments', body: 'Mada, Apple Pay GCC, BNPL where fit.' },
      { icon: 'support', title: 'PDPL', body: 'Processing records and DPA templates.' },
    ],
  },
}

export const MIGRATION_PAIRS: Record<
  string,
  {
    title: string
    subhead: string
    costOfStaying: string
    whenNotToMigrate: string
    rollbackPlan: string
    cutoverSteps: { stepTitle: string; detail: string; durationWeeks: string }[]
    faqs: FaqItem[]
    tcoNote: string
  }
> = {
  'adobe-commerce-to-medusa': {
    title: 'Migrate Magento / Adobe Commerce to Medusa',
    subhead: 'EOS-aware replatform with SEO preservation, B2B recipe option, and rehearsed rollback.',
    costOfStaying:
      'Adobe licensing, SI retainers, and security patch risk compound after EOS. Three-year TCO often exceeds owned Medusa infra + build — model yours in discovery with sourced license numbers only.',
    whenNotToMigrate:
      'Hyvä rebuild in 4–8 weeks may suffice if you are on supported Magento version and performance is the only pain. ACCS may win if Adobe enterprise contract is non-negotiable this year.',
    rollbackPlan:
      'Rollback triggers: order sync error rate above 2% for 15 minutes, payment capture failures, or organic traffic drop above agreed threshold at 48 hours post-cutover. Procedure: revert DNS to legacy origin, restore database snapshot taken at T-0, notify stakeholders via runbook channel. Rehearsed in staging one week before production cutover.',
    cutoverSteps: [
      { stepTitle: 'Discovery & crawl export', detail: 'Full URL inventory, redirect map draft, ERP/payment integration audit.', durationWeeks: '2' },
      { stepTitle: 'Parallel catalog sync', detail: 'Products, categories, customer groups replicated to Medusa with validation jobs.', durationWeeks: '3–4' },
      { stepTitle: 'Storefront & checkout parity', detail: 'Next.js storefront feature-complete; payment and fulfillment smoke tests.', durationWeeks: '3–4' },
      { stepTitle: 'Parallel run', detail: 'Both stacks live; order shadowing and SEO canonical checks.', durationWeeks: '2' },
      { stepTitle: 'Cutover & monitor', detail: 'DNS switch, 301 activation, 90-day SEO and order monitoring.', durationWeeks: '1+' },
    ],
    tcoNote: 'Illustrative 3yr platform fees: source $120K vs target $36K — footnoted methodology in pair render.',
    faqs: [
      { question: 'How long for 100K SKUs?', answer: '12–16 weeks typical with ERP — discovery narrows.' },
      { question: 'B2B pricing preserved?', answer: 'Yes — customer groups mapped in parallel run validation.' },
      { question: 'SEO risk?', answer: 'Full crawl + 301 map + 90-day monitoring included in scope.' },
      { question: 'Rollback?', answer: 'DNS revert + database snapshot triggers documented pre-cutover.' },
    ],
  },
  'shopify-to-medusa': {
    title: 'Migrate Shopify to Medusa',
    subhead: 'Remove GMV tax, own checkout, preserve URLs and influencer landing pages.',
    costOfStaying:
      'Shopify Plus fees plus app subscriptions scale with GMV. At $8M+ online, 0.5–1% fees exceed Medusa Cloud + infra within 18–24 months for many catalogs — your discovery models exacts.',
    whenNotToMigrate:
      'Under ~$3M with heavy Shopify app dependency and no engineering bench — optimize Plus first. Seasonal pop-ups may stay on Shopify while core catalog moves.',
    rollbackPlan:
      'Keep Shopify storefront live at rollback subdomain during parallel run. Triggers: checkout conversion drop beyond agreed band, inventory sync lag over 10 minutes, or payment reconciliation mismatch. Revert primary DNS to Shopify; Medusa stack remains warm for retry window.',
    cutoverSteps: [
      { stepTitle: 'App & data audit', detail: 'Inventory of Shopify apps, custom scripts, and metafields to replace or replicate.', durationWeeks: '1–2' },
      { stepTitle: 'Catalog & customer import', detail: 'Medusa import pipelines with idempotent jobs and reconciliation reports.', durationWeeks: '2–3' },
      { stepTitle: 'Checkout & payments', detail: 'Stripe direct integration; subscription and discount rule parity tests.', durationWeeks: '2–3' },
      { stepTitle: 'URL & content migration', detail: '301 map for collections, products, and influencer landing pages.', durationWeeks: '1–2' },
      { stepTitle: 'Parallel run & cutover', detail: 'Dual-write or read-only shadow period, then DNS cutover with monitoring.', durationWeeks: '2–4' },
    ],
    tcoNote: 'GMV fee elimination is the headline — transaction payment fees remain via Stripe.',
    faqs: [
      { question: 'Shopify Payments?', answer: 'Move to Stripe direct — parallel run validates payout continuity.' },
      { question: 'App replacements?', answer: 'App audit in discovery — many become native modules.' },
      { question: 'Headless already?', answer: 'Hydrogen migration path scoped separately.' },
    ],
  },
  'woocommerce-to-medusa': {
    title: 'Migrate WooCommerce to Medusa',
    subhead: 'Escape plugin debt and scale limits with owned headless stack.',
    costOfStaying:
      'Plugin conflicts, security patches, and DB bloat on WordPress host. Performance tuning hits ceiling when catalog and concurrent checkout grow.',
    whenNotToMigrate:
      'Content-heavy blog commerce under 2K SKUs with strong WordPress team — optimize caching and checkout first.',
    rollbackPlan:
      'WordPress remains on original host during parallel run. Rollback: repoint DNS to WP origin, disable Medusa cart webhooks. Database snapshots at each import milestone.',
    cutoverSteps: [
      { stepTitle: 'Plugin & theme audit', detail: 'Identify Woo extensions to replicate as Medusa modules or integrations.', durationWeeks: '1' },
      { stepTitle: 'Product & order export', detail: 'WP/Woo export to normalized CSV; validation against live store.', durationWeeks: '2' },
      { stepTitle: 'Content strategy', detail: 'Payload CMS setup or headless WP for blog — scoped in discovery.', durationWeeks: '2' },
      { stepTitle: 'Storefront build', detail: 'Next.js storefront with SEO URL parity and performance budget.', durationWeeks: '3–4' },
      { stepTitle: 'Cutover', detail: 'Maintenance window or blue-green DNS switch with 301 map.', durationWeeks: '1' },
    ],
    tcoNote: 'Hosting cost swap — WP managed → Medusa Cloud or VPS.',
    faqs: [
      { question: 'Blog content?', answer: 'Payload CMS or headless WP — content migration scoped.' },
      { question: 'Subscriptions?', answer: 'Billing provider migration plan required.' },
    ],
  },
  'shopify-to-vendure': {
    title: 'Migrate Shopify to Vendure',
    subhead: 'GraphQL-first target when engineering team prefers NestJS patterns.',
    costOfStaying: 'Same GMV dynamics as Shopify→Medusa — Vendure chosen for GraphQL/API architecture fit.',
    whenNotToMigrate: 'Non-technical merchant team — Medusa may be faster to operate.',
    rollbackPlan:
      'Shopify admin remains authoritative during parallel run. Rollback reactivates Shopify checkout links and pauses Vendure order ingestion.',
    cutoverSteps: [
      { stepTitle: 'GraphQL schema design', detail: 'Vendure entity model aligned to Shopify catalog structure.', durationWeeks: '2' },
      { stepTitle: 'Data migration', detail: 'Products, variants, customers via custom importers with audit logs.', durationWeeks: '3–4' },
      { stepTitle: 'Storefront (GraphQL)', detail: 'Next.js or existing headless client against Vendure Shop API.', durationWeeks: '3–4' },
      { stepTitle: 'Integration parity', detail: 'Fulfillment, tax, and payment providers wired and tested.', durationWeeks: '2' },
      { stepTitle: 'Go-live', detail: 'DNS cutover with SEO preservation checklist.', durationWeeks: '1–2' },
    ],
    tcoNote: 'Compare SI cost — Vendure builds often longer initial phase, lower plugin tax long-term.',
    faqs: [
      { question: 'Why Vendure over Medusa?', answer: 'GraphQL federation, NestJS alignment, enterprise catalog model.' },
    ],
  },
  'adobe-commerce-to-vendure': {
    title: 'Migrate Magento to Vendure',
    subhead: 'Enterprise catalog on GraphQL when Adobe exit targets typed APIs.',
    costOfStaying: 'Adobe license + Magento SI vs OSS Vendure + hosting — EOS adds security risk to staying.',
    whenNotToMigrate: 'Hyvä or ACCS paths on Adobe — see platform hubs.',
    rollbackPlan:
      'Magento origin kept warm with read-only mode option during parallel run. Rollback restores Magento checkout and disables Vendure API keys.',
    cutoverSteps: [
      { stepTitle: 'Catalog entity mapping', detail: 'B2B attributes, customer groups, and tier pricing mapped to Vendure.', durationWeeks: '3' },
      { stepTitle: 'ERP sync design', detail: 'Event-driven integration with reconciliation and dead-letter queues.', durationWeeks: '2–3' },
      { stepTitle: 'Admin & workflows', detail: 'Vendure admin configured for merchandising and ops teams.', durationWeeks: '2' },
      { stepTitle: 'Storefront & SEO', detail: 'URL map, canonical tags, and structured data validation.', durationWeeks: '2–3' },
      { stepTitle: 'Cutover rehearsal', detail: 'Full dress rehearsal with rollback timed and documented.', durationWeeks: '1–2' },
    ],
    tcoNote: 'B2B attribute complexity may extend timeline — discovery maps entity model.',
    faqs: [
      { question: 'ERP first or commerce first?', answer: 'Truth-source workshop in week 1 of discovery.' },
    ],
  },
  'adobe-commerce-to-accs': {
    title: 'Migrate Adobe Commerce to ACCS',
    subhead: 'Stay Adobe-native in cloud when contract and extensions require it.',
    costOfStaying: 'Self-host ops burden vs ACCS subscription — extension compatibility is gating factor.',
    whenNotToMigrate: 'When Medusa/Vendure TCO wins and Adobe lock-in is the pain — different pair page.',
    rollbackPlan:
      'Self-hosted snapshot before ACCS migration. Rollback restores on-prem infrastructure per Adobe runbook if cloud cutover fails acceptance tests.',
    cutoverSteps: [
      { stepTitle: 'Extension compatibility audit', detail: 'Matrix of Magento extensions vs ACCS-supported equivalents.', durationWeeks: '2–3' },
      { stepTitle: 'Environment provisioning', detail: 'ACCS instance setup, CI/CD, and secrets management.', durationWeeks: '2' },
      { stepTitle: 'Data migration', detail: 'Catalog, customers, orders per Adobe migration tooling or custom scripts.', durationWeeks: '3–4' },
      { stepTitle: 'Integration rewire', detail: 'ERP, OMS, and payment endpoints pointed to ACCS endpoints.', durationWeeks: '2–3' },
      { stepTitle: 'Cutover & hypercare', detail: 'Go-live with Adobe support window and 30-day hypercare.', durationWeeks: '1–2' },
    ],
    tcoNote: 'Adobe quote required — we do not invent ACCS pricing.',
    faqs: [
      { question: 'Extension audit?', answer: 'Mandatory pre-migration — incompatible extensions block move.' },
      { question: 'Timeline?', answer: 'Often 8–12 weeks for mid-market — data volume dependent.' },
    ],
  },
}

export const INDEX_PAGES = {
  services: {
    headline: 'Services',
    subhead: 'Five commerce pillars and two Build & Grow tracks — published pricing, honest counter-cases.',
    intro: `${BRAND.name} organizes delivery into commerce engineering (build, migrate, support) and Build & Grow (web and mobile apps). Digital marketing is not a public pillar — it is available to existing clients only.\n\nEvery service opens with discovery. We do not start sprints until architecture, timeline band, and economic model are signed off.`,
    features: [
      { icon: 'build', title: 'Ecommerce Builds', body: 'Greenfield Medusa + Next.js — /services/ecommerce-builds' },
      { icon: 'migrate', title: 'Replatforming & Migration', body: 'Pair migrations with rollback — /services/replatforming-migration' },
      { icon: 'support', title: 'Support & Retainers', body: 'Post-launch capacity — /services/support-retainers' },
      { icon: 'web-app', title: 'Web App Development', body: 'Portals and tools — /services/web-app-development' },
      { icon: 'mobile-app', title: 'Mobile App Development', body: 'React Native — /services/mobile-app-development' },
      { icon: 'build', title: 'Discovery first', body: 'From $5K — 2-week scoped sprint before build.' },
    ],
  },
  platforms: {
    headline: 'Platforms',
    subhead: 'Named hubs with sourced economics — Medusa flagship, honest Shopify/Woo/Adobe guidance.',
    intro: `Platform choice is a 3-year finance decision disguised as a tech decision. Each hub documents fit, counter-fit, and migration pairs.\n\nWe footnote vendor numbers at render time — no invented savings.`,
    features: [
      { icon: 'build', title: 'Medusa', body: '0% GMV — /platforms/medusa' },
      { icon: 'build', title: 'Vendure', body: 'GraphQL enterprise — /platforms/vendure' },
      { icon: 'support', title: 'Shopify', body: 'Stay or exit — /platforms/shopify' },
      { icon: 'migrate', title: 'Adobe Commerce', body: 'EOS-aware — /platforms/adobe-commerce' },
      { icon: 'build', title: 'WooCommerce', body: 'SMB to scale — /platforms/woocommerce' },
      { icon: 'migrate', title: 'ACCS', body: 'Adobe cloud — /platforms/adobe-commerce-cloud-service' },
    ],
  },
  migrate: {
    headline: 'Migrate',
    subhead: 'Six pair-specific playbooks — TCO, cutover, SEO, rollback, and when not to migrate.',
    intro: `Migration pages are the highest-stakes content on this site. Each pair includes cost-of-staying narrative, urgency anchors where EOS applies, timeline bands, and honest when-not-to-migrate sections.\n\nStart with the pair that matches your source platform — or book discovery if you are multi-brand.`,
    features: [
      { icon: 'migrate', title: 'Magento → Medusa', body: '/migrate/adobe-commerce-to-medusa' },
      { icon: 'migrate', title: 'Shopify → Medusa', body: '/migrate/shopify-to-medusa' },
      { icon: 'migrate', title: 'WooCommerce → Medusa', body: '/migrate/woocommerce-to-medusa' },
      { icon: 'migrate', title: 'Shopify → Vendure', body: '/migrate/shopify-to-vendure' },
      { icon: 'migrate', title: 'Magento → Vendure', body: '/migrate/adobe-commerce-to-vendure' },
      { icon: 'migrate', title: 'Adobe → ACCS', body: '/migrate/adobe-commerce-to-accs' },
    ],
  },
  solutions: {
    headline: 'Solutions',
    subhead: 'Commerce models — B2B, DTC, marketplace, subscriptions, multi-region.',
    intro: `Model pages describe pains, capability checklists, and recommended platforms without pretending one stack fits all.\n\nUse these pages to align stakeholders before platform hub deep-dives.`,
    features: [
      { icon: 'build', title: 'B2B Commerce', body: '/solutions/b2b' },
      { icon: 'build', title: 'DTC Commerce', body: '/solutions/dtc' },
      { icon: 'support', title: 'Marketplace', body: '/solutions/marketplace' },
      { icon: 'web-app', title: 'Subscriptions', body: '/solutions/subscriptions' },
      { icon: 'migrate', title: 'Multi-region', body: '/solutions/multi-region' },
      { icon: 'support', title: 'Discovery', body: 'Model workshop in 2-week sprint.' },
    ],
  },
  markets: {
    headline: 'Markets',
    subhead: 'India · USA · UAE & GCC — remote-first logistics, contracting, and compliance.',
    intro: `We document how we work in each region without fake local offices. Timezone overlap, currency, and privacy regimes are part of the SOW — not footnotes after signature.`,
    features: [
      { icon: 'support', title: 'India', body: '/markets/india' },
      { icon: 'build', title: 'United States', body: '/markets/usa' },
      { icon: 'migrate', title: 'UAE & GCC', body: '/markets/uae-gcc' },
      { icon: 'support', title: 'Remote-first', body: 'Principal engineers in every engagement.' },
      { icon: 'build', title: 'Contracting', body: 'USD/EUR/INR per MSA.' },
      { icon: 'web-app', title: 'Contact', body: '/contact for region-specific questions.' },
    ],
  },
  resources: {
    headline: 'Resources',
    subhead: 'Lead magnets, audits, and tooling — landing in Phase 5 integrations.',
    intro: `The resources hub will host downloadable TCO worksheets, migration checklists, and webinar replays once P5 forms and email integration ship. Until then, book discovery for the live templates we use on engagements.\n\nInsights articles cover migration economics in depth — start there for founder-voice analysis.`,
    features: [
      { icon: 'migrate', title: 'Migration TCO template', body: 'Available on discovery call today.' },
      { icon: 'build', title: 'Insights articles', body: '/insights — 800+ word deep-dives.' },
      { icon: 'support', title: 'Work & case studies', body: '/work — outcome-led proof.' },
      { icon: 'web-app', title: 'Platform hubs', body: '/platforms — economics by vendor.' },
      { icon: 'migrate', title: 'Pair pages', body: '/migrate — cutover playbooks.' },
      { icon: 'build', title: 'Book discovery', body: '/contact — get templates live.' },
    ],
  },
} as const
