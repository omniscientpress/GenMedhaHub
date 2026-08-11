// Full ch. 5.10.1 seed — idempotent on a fresh database.
// Usage: pnpm seed <admin-email> <admin-password> [--allow-remote] [--users-only] [--refresh-content]
//
// Creates admin + editor users, all globals, and one of every page type.
// --refresh-content  Re-apply layout/copy on existing CMS documents (safe for production).

for (const file of ['.env.local', '.env']) {
  try {
    process.loadEnvFile(file)
  } catch {
    // file missing — fine
  }
}

const args = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const allowRemote = process.argv.includes('--allow-remote')
const usersOnly = process.argv.includes('--users-only')
const refreshContent = process.argv.includes('--refresh-content')
const [adminEmail, adminPassword] = args

if (!adminEmail || !adminPassword) {
  console.error('Usage: pnpm seed <admin-email> <admin-password> [--allow-remote] [--users-only] [--refresh-content]')
  process.exit(1)
}

const databaseUri = process.env.DATABASE_URI ?? ''
const isPostgres =
  databaseUri.startsWith('postgres://') || databaseUri.startsWith('postgresql://')
if (isPostgres && !allowRemote) {
  console.error(
    `Refusing to seed: DATABASE_URI (${databaseUri.slice(0, 30)}...) is Postgres.\n` +
      'Pass --allow-remote if you really mean to do this.',
  )
  process.exit(1)
}

const { getPayload } = await import('payload')
const { default: config } = await import('../src/payload.config')
const {
  richText,
  richTextFromParagraphs,
  padText,
  upsertBySlug,
  upsertByWhere,
  setSeedUser,
} = await import('./seed/helpers')
const {
  homeLayout,
  richServiceLayout,
  platformLayout,
  solutionLayout,
  marketLayout,
  richIndexLayout,
  indexLayout,
  workIndexLayout,
  insightsIndexLayout,
  aboutLayout,
  pricingLayout,
  contactLayout,
  legalLayout,
  thankYouLayout,
} = await import('./seed/layouts')
const { CASE_STUDIES, postBody, padToWords } = await import('./seed/copy')
const {
  SERVICES,
  PLATFORMS,
  SOLUTIONS,
  MARKETS,
  MIGRATION_PAIRS,
} = await import('./seed/copy/catalog')
const { LAUNCH_CATEGORIES } = await import('../src/payload/constants')
const { PLATFORM_SLUG_NAMES } = await import('../src/payload/constants')

const payload = await getPayload({ config })

async function ensureUser(email: string, password: string, roles: ('admin' | 'editor')[]) {
  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })
  if (existing.totalDocs > 0) {
    console.log(`User ${email} exists`)
    return existing.docs[0].id
  }
  const user = await payload.create({
    collection: 'users',
    data: { email, password, roles },
  })
  console.log(`Created user ${email} (${roles.join(', ')})`)
  return user.id
}

await ensureUser(adminEmail, adminPassword, ['admin'])
await ensureUser('editor@genmedha.in', adminPassword, ['editor'])

const adminLookup = await payload.find({
  collection: 'users',
  where: { email: { equals: adminEmail } },
  limit: 1,
  overrideAccess: true,
})
const adminUser = adminLookup.docs[0]
if (!adminUser) {
  console.error(`Admin user ${adminEmail} not found after ensureUser.`)
  process.exit(1)
}
setSeedUser(adminUser as { id: string | number; roles?: ('admin' | 'editor')[] })

if (usersOnly) {
  console.log('Users-only seed complete.')
  process.exit(0)
}

// Skip full seed once homepage CMS document exists (brandName alone is not enough —
// operators may set logo/OG in Site Settings before running seed).
const homepage = await payload.find({
  collection: 'pages',
  where: { routePath: { equals: '/' } },
  limit: 1,
  overrideAccess: true,
})
if (homepage.totalDocs > 0 && !refreshContent) {
  console.log('Full seed already applied (homepage page exists). Skipping content.')
  console.log('Pass --refresh-content to re-apply layout and copy on existing documents.')
  process.exit(0)
}

const upsertOpts = { refresh: refreshContent }
const siteSettings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)

console.log(refreshContent ? 'Refreshing CMS content (ch. 5.10.1)...' : 'Running full ch. 5.10.1 seed...')

// --- Globals ---
await payload.updateGlobal({
  slug: 'site-settings',
  data: {
    brandName: siteSettings?.brandName ?? 'GenMedha Hub',
    tagline:
      siteSettings?.tagline ??
      'Own your commerce stack — no GMV tax, no license fees, no lock-in.',
    contactEmail: siteSettings?.contactEmail ?? 'hello@genmedha.in',
    foundingYear: siteSettings?.foundingYear ?? 2024,
    // Preserve operator-uploaded logo + OG image (required before seed on production).
    ...(siteSettings?.logo ? { logo: siteSettings.logo } : {}),
    ...(siteSettings?.defaultOgImage ? { defaultOgImage: siteSettings.defaultOgImage } : {}),
  },
})

await payload.updateGlobal({
  slug: 'navigation',
  data: {
    primaryNav: [
      { label: 'Services', link: '/services', dropdown: [
        { label: 'Ecommerce Builds', link: '/services/ecommerce-builds' },
        { label: 'Web App Development', link: '/services/web-app-development' },
      ]},
      { label: 'Platforms', link: '/platforms', dropdown: [{ label: 'Medusa', link: '/platforms/medusa' }] },
      { label: 'Migrate', link: '/migrate', dropdown: [{ label: 'Magento to Medusa', link: '/migrate/adobe-commerce-to-medusa' }] },
      { label: 'Solutions', link: '/solutions', dropdown: [{ label: 'B2B Commerce', link: '/solutions/b2b' }] },
      { label: 'Work', link: '/work' },
      { label: 'Markets', link: '/markets' },
      { label: 'Pricing', link: '/pricing' },
      { label: 'Company', link: '/company' },
      { label: 'Insights', link: '/insights' },
    ],
    footerColumns: [
      { heading: 'Services', links: [
        { label: 'Ecommerce Builds', link: '/services/ecommerce-builds' },
        { label: 'Web App Development', link: '/services/web-app-development' },
      ]},
      { heading: 'Platforms', links: [{ label: 'Medusa', link: '/platforms/medusa' }] },
      { heading: 'Migrate', links: [{ label: 'Magento to Medusa', link: '/migrate/adobe-commerce-to-medusa' }] },
      { heading: 'Company', links: [{ label: 'About', link: '/company' }, { label: 'Contact', link: '/contact' }] },
    ],
    showTrustBadges: false,
    mobileCtaLabel: 'Book a call',
    marketsStrip: 'Serving India · USA · UAE & GCC',
    marketsHref: '/markets',
  },
})

await payload.updateGlobal({
  slug: 'seo-defaults',
  data: {
    titleTemplate: '%s · GenMedha Hub',
    defaultMetaDescription: 'GenMedha Hub — commerce engineering, migration, and Build & Grow app development.',
    siteName: 'GenMedha Hub',
    robotsPolicy: 'allow-all',
  },
})

// Redirects global requires ≥1 row — leave operator-managed; do not seed empty.

await payload.updateGlobal({
  slug: 'cta-config',
  data: {
    bookingUrl: process.env.CALCOM_EMBED_URL ?? 'https://cal.com/genmedhahub',
    primaryCtas: [
      { key: 'book-call', label: 'Book a discovery call', href: '/book' },
      { key: 'get-audit', label: 'Get a Legacy Platform Audit', href: '/contact?offer=audit' },
      { key: 'scope-app', label: 'Scope my app', href: '/book' },
      { key: 'view-work', label: 'View our work', href: '/work' },
    ],
    bookingEventTypes: [
      { key: 'discovery-30', calSlug: 'discovery-30', durationMin: 30 },
      { key: 'audit-scoping', calSlug: 'audit-scoping', durationMin: 45 },
    ],
  },
})

// --- Taxonomies ---
for (const name of LAUNCH_CATEGORIES) {
  await upsertBySlug(payload, 'categories', name.toLowerCase().replace(/\s+/g, '-'), { name })
}

const tagNames = ['medusa', 'migration', 'b2b', 'headless', 'nextjs', 'payload', 'tco', 'eos']
for (const name of tagNames) {
  await upsertBySlug(payload, 'tags', name, { name })
}

const { id: authorId } = await upsertBySlug(payload, 'authors', 'founder', {
  name: 'Founder',
  role: 'Founder & Principal Engineer',
  bio: 'Principal engineer building commerce systems. Verified credentials only — expand before publish.',
})

// --- Services (5 pillars, no Digital Marketing) ---
const serviceSeeds = [
  { slug: 'ecommerce-builds', title: 'Ecommerce Builds', pillar: 'commerce', category: 'new-build', icon: 'build' },
  { slug: 'replatforming-migration', title: 'Replatforming & Migration', pillar: 'commerce', category: 'replatforming-migration', icon: 'migrate' },
  { slug: 'support-retainers', title: 'Support & Retainers', pillar: 'commerce', category: 'support-retainer', icon: 'support' },
  { slug: 'web-app-development', title: 'Web App Development', pillar: 'build-grow', category: 'web-app', icon: 'web-app' },
  { slug: 'mobile-app-development', title: 'Mobile App Development', pillar: 'build-grow', category: 'mobile-app', icon: 'mobile-app' },
] as const

const serviceIds: Record<string, string | number> = {}
for (const s of serviceSeeds) {
  const copy = SERVICES[s.slug]
  const { id } = await upsertBySlug(
    payload,
    'services',
    s.slug,
    {
      title: s.title,
      servicePillar: s.pillar,
      serviceCategory: s.category,
      shortPitch: copy?.shortPitch ?? `${s.title} — outcome-first delivery with published-pricing posture.`,
      icon: s.icon,
      engagementModels: [{ name: 'Discovery', priceFrom: 'From $5K', typicalDuration: '2 weeks' }],
      proofPoints: s.pillar === 'build-grow'
        ? [{ text: 'Same Next.js/React/TypeScript core as this site — stack coherence proof (D1/D2).' }]
        : [],
      layout: richServiceLayout(s.slug, s.title, s.icon),
    },
    upsertOpts,
  )
  serviceIds[s.slug] = id
}

// --- Platform hubs ---
const platformSeeds = [
  { slug: 'medusa', name: 'Medusa', tier: 'flagship' },
  { slug: 'vendure', name: 'Vendure', tier: 'hub' },
  { slug: 'shopify', name: 'Shopify', tier: 'hub' },
  { slug: 'adobe-commerce', name: 'Adobe Commerce', tier: 'hub', eosDate: '2026-08-11' },
  { slug: 'woocommerce', name: 'WooCommerce', tier: 'hub' },
  { slug: 'adobe-commerce-cloud-service', name: 'Adobe Commerce Cloud Service', tier: 'hub' },
] as const

const platformIds: Record<string, string | number> = {}
for (const p of platformSeeds) {
  const copy = PLATFORMS[p.slug]
  const { id } = await upsertBySlug(
    payload,
    'platform-hubs',
    p.slug,
    {
      name: p.name,
      tier: p.tier,
      positioningLine: copy?.positioning ?? `${p.name} — named platform guidance with sourced economics.`,
      economics: {
        costLine: copy?.economics.split('.')[0] ?? (p.slug === 'medusa' ? 'Medusa Cloud $29/$99/$299/mo, 0% GMV fee' : 'See footnote for partner estimates'),
        licenseNote: copy?.economics ?? 'License and hosting economics vary by deployment model.',
        source: 'Vendor documentation and partner estimates — GenMedha Hub sets final numbers.',
      },
      eosDate: 'eosDate' in p ? p.eosDate : undefined,
      services: [serviceIds['ecommerce-builds']],
      layout: platformLayout(p.slug, p.name),
    },
    upsertOpts,
  )
  platformIds[p.slug] = id
}

// --- Migration pairs (6) ---
const pairSeeds = [
  { source: 'adobe-commerce', target: 'medusa' },
  { source: 'shopify', target: 'medusa' },
  { source: 'woocommerce', target: 'medusa' },
  { source: 'shopify', target: 'vendure' },
  { source: 'adobe-commerce', target: 'vendure' },
  { source: 'adobe-commerce', target: 'adobe-commerce-cloud-service' },
] as const

function migrationPairSlug(source: string, target: string): string {
  const sourceSlug = PLATFORM_SLUG_NAMES[source] ?? source
  const targetSlug = PLATFORM_SLUG_NAMES[target] ?? target
  return `${sourceSlug}-to-${targetSlug}`
}

const DEFAULT_CUTOVER = [
  { stepTitle: 'Discovery & architecture', detail: 'Integration map, data audit, and timeline band sign-off.', durationWeeks: '2' },
  { stepTitle: 'Build & sync', detail: 'Target platform configured; catalog sync with validation jobs.', durationWeeks: '3–4' },
  { stepTitle: 'Storefront parity', detail: 'Checkout, payments, and fulfillment smoke tests.', durationWeeks: '2–3' },
  { stepTitle: 'Parallel run', detail: 'Both stacks live; SEO and order reconciliation.', durationWeeks: '2' },
  { stepTitle: 'Cutover & monitor', detail: 'DNS switch, 301 map, 90-day monitoring.', durationWeeks: '1+' },
]

for (const pair of pairSeeds) {
  const pairKey = migrationPairSlug(pair.source, pair.target)
  const copy = MIGRATION_PAIRS[`${pair.source}-to-${pair.target}`]
  const isAdobeSource = pair.source === 'adobe-commerce'
  await upsertByWhere(
    payload,
    'migration-pages',
    {
      and: [
        { sourcePlatform: { equals: platformIds[pair.source] } },
        { targetPlatform: { equals: platformIds[pair.target] } },
      ],
    },
    {
      slug: pairKey,
      title: copy?.title ?? `Migrate ${pair.source} to ${pair.target}`,
      sourcePlatform: platformIds[pair.source],
      targetPlatform: platformIds[pair.target],
      hero: {
        headline: copy?.title ?? `Migrate to ${pair.target}`,
        subhead: copy?.subhead ?? 'Zero-downtime migration with SEO preservation and rollback plan.',
      },
      costOfStaying: richText(copy?.costOfStaying ?? 'Platform fees and operational risk quantified with sourced math only.'),
      urgencyAnchor: {
        date: '2026-08-11',
        label: isAdobeSource
          ? 'Magento 2.4.5/2.4.6 security support ends'
          : 'Evaluate TCO annually — GMV fees compound with growth',
        source: isAdobeSource ? 'Adobe/Magento EOS documentation' : 'GenMedha Hub TCO methodology',
      },
      tcoBlock: {
        comparisonRows: [{
          item: 'Platform fees (3yr)',
          sourceCost: '$120K',
          targetCost: '$36K',
          note: copy?.tcoNote ?? 'Illustrative — footnoted at render',
        }],
        methodologyNote: 'TCO methodology documented; every figure carries a citation footnote.',
      },
      cutoverSteps: copy?.cutoverSteps ?? DEFAULT_CUTOVER,
      rollbackPlan: richText(copy?.rollbackPlan ?? 'Named rollback triggers and procedure — rehearsed before cutover.'),
      seoPreservation: [
        { action: 'Full crawl export pre-migration' },
        { action: '301 map with canonical validation' },
        { action: 'Post-launch monitoring for 90 days' },
      ],
      timelineBands: [
        { band: '6–8 weeks', scope: 'Simple catalog', priceFrom: 'From $75K' },
        { band: '12–16 weeks', scope: 'Mid-market B2B', priceFrom: 'From $150K' },
      ],
      whenNotToMigrate: richText(copy?.whenNotToMigrate ?? 'Hyvä rebuild, version upgrades, or stay-put may be the honest answer.'),
      faqs: (copy?.faqs ?? []).map((faq) => ({
        question: faq.question,
        answer: richText(faq.answer),
      })).concat(
        Array.from({ length: Math.max(0, 4 - (copy?.faqs.length ?? 0)) }, (_, i) => ({
          question: `Migration FAQ ${i + 1}?`,
          answer: richText('Pair-specific answer with sourced claims only.'),
        })),
      ),
    },
    upsertOpts,
  )
}

// --- Solutions (5) ---
for (const [, modelKey, title] of [
  ['b2b', 'b2b', 'B2B Commerce'],
  ['dtc', 'dtc', 'DTC Commerce'],
  ['marketplace', 'marketplace', 'Marketplace'],
  ['subscriptions', 'subscriptions', 'Subscriptions'],
  ['multi-region', 'multi-region', 'Multi-region'],
] as const) {
  const copy = SOLUTIONS[modelKey]
  await upsertByWhere(
    payload,
    'solutions',
    { modelKey: { equals: modelKey } },
    {
      title,
      modelKey,
      painSummary: copy?.pain ?? `${title} — model-specific pain summary.`,
      capabilityChecklist: copy?.capabilities.map((c) => ({
        capability: c.title,
        platformNote: c.body,
      })) ?? [
        { capability: 'Core commerce flows', platformNote: 'Medusa recipe exists' },
        { capability: 'Operational tooling', platformNote: 'Platform-dependent' },
        { capability: 'Scale path', platformNote: 'Ownership economics considered' },
      ],
      recommendedPlatforms: [platformIds.medusa],
      layout: solutionLayout(modelKey, title),
    },
    upsertOpts,
  )
}

// --- Markets (3 substantive) ---
const marketSeeds = [
  { slug: 'india', name: 'India', region: 'india' },
  { slug: 'usa', name: 'United States', region: 'usa' },
  { slug: 'uae-gcc', name: 'UAE & GCC', region: 'uae-gcc' },
] as const

for (const m of marketSeeds) {
  const copy = MARKETS[m.region]
  await upsertByWhere(payload, 'markets', { region: { equals: m.region } }, {
    name: m.name,
    region: m.region,
    marketContext: richTextFromParagraphs(copy?.context ?? padText(
      `${m.name} market context: demand landscape, buyer behavior, and sector notes.`,
      400,
    )),
    engagementLogistics: {
      timezoneOverlap: copy?.logistics.split('.')[0] ?? (m.region === 'india' ? 'IST = UTC+5:30; 4–6 h overlap with CET mornings' : 'US business hours overlap with IST evenings'),
      contractingNotes: copy?.logistics ?? 'USD/EUR contracting via Omniscient Press entity; jurisdiction documented in MSA.',
      paymentNotes: copy?.context.includes('INR') ? 'INR/USD via Omniscient Press; international wire where required.' : 'USD wire, Wise, and local options where applicable.',
    },
    complianceNotes: richTextFromParagraphs(copy?.compliance ?? (
      m.region === 'india'
        ? 'India DPDP Act 2023 — data protection summary cross-referencing privacy register (D7).'
        : 'UAE PDPL and Saudi PDPL for GCC engagements — cross-referencing privacy register (D7).'
    )),
    layout: marketLayout(m.region, m.name),
  },
    upsertOpts,
  )
}

// --- Case studies (P4 launch set) ---
const legacyCaseTitles = [
  'Store performance uplift phase 1',
  'Store performance uplift phase 2',
  'Store performance uplift phase 3',
]
const caseStudyIds: (string | number)[] = []
for (let i = 0; i < CASE_STUDIES.length; i++) {
  const cs = CASE_STUDIES[i]
  const { id } = await upsertByWhere(
    payload,
    'case-studies',
    refreshContent
      ? {
          or: [
            { outcomeTitle: { equals: cs.outcomeTitle } },
            { outcomeTitle: { equals: legacyCaseTitles[i] } },
          ],
        }
      : { outcomeTitle: { equals: cs.outcomeTitle } },
    {
      outcomeTitle: cs.outcomeTitle,
      client: cs.client,
      industry: cs.industry,
      platformTo: platformIds.medusa,
      services: [serviceIds['ecommerce-builds']],
      commerceModels: ['dtc'],
      challenge: richTextFromParagraphs(cs.challenge),
      approach: richTextFromParagraphs(cs.approach),
      solution: richTextFromParagraphs(cs.solution),
      results: richTextFromParagraphs(cs.results),
      metrics: [...cs.metrics],
      isPlaceholder: cs.client === 'GenMedha Hub',
    },
    upsertOpts,
  )
  caseStudyIds.push(id)
}

// --- Testimonials, clients, OSS ---
await upsertByWhere(
  payload,
  'testimonials',
  { authorName: { equals: 'CTO' }, company: { equals: 'Confidential' } },
  {
    quote: 'Placeholder testimonial — replace with verified client quote before publish.',
    authorName: 'CTO',
    authorRole: 'Chief Technology Officer',
    company: 'Confidential',
  },
)
await upsertByWhere(
  payload,
  'testimonials',
  { authorName: { equals: 'VP Engineering' }, company: { equals: 'Confidential' } },
  {
    quote: 'Second placeholder — engineering-led delivery with clear outcomes.',
    authorName: 'VP Engineering',
    authorRole: 'VP Engineering',
    company: 'Confidential',
  },
)

for (let i = 1; i <= 4; i++) {
  try {
    await upsertByWhere(payload, 'clients', { name: { equals: `Client ${i}` } }, {
      name: `Client ${i}`,
      kind: 'client',
      displayOrder: i,
    })
  } catch (err) {
    console.warn(`Skipped client-${i} (logo upload required):`, err instanceof Error ? err.message : err)
  }
}

for (const [, name] of [['medusa-plugin', 'GenMedha Medusa Plugin'], ['next-starter', 'Commerce Starter']] as const) {
  await upsertByWhere(payload, 'open-source-projects', { name: { equals: name } }, {
    name,
    repoUrl: 'https://github.com/omniscientpress/GenMedhaHub',
    description: 'Open-source commerce tooling — OSS proof at launch.',
    platform: platformIds.medusa,
    status: 'active',
  })
}

// --- Posts (P4 — ≥800 words each) ---
for (let i = 1; i <= 3; i++) {
  const title = `Migration economics deep-dive ${i}`
  await upsertByWhere(
    payload,
    'posts',
    { title: { equals: title } },
    {
      title,
      excerpt:
        'Founder-voice analysis of migration TCO, EOS risk, and when stay-put beats replatforming — sourced math only.',
      author: authorId,
      categories: [(await payload.find({ collection: 'categories', limit: 1, overrideAccess: true })).docs[0]?.id],
      body: richTextFromParagraphs(padToWords(postBody(i), 820)),
      relatedService: [serviceIds['replatforming-migration']],
    },
    upsertOpts,
  )
}

// --- Pages (block-composed routes) ---
const pageRoutes = [
  { routePath: '/', pageKind: 'home', title: 'GenMedha Hub' },
  { routePath: '/services', pageKind: 'index', title: 'Services' },
  { routePath: '/platforms', pageKind: 'index', title: 'Platforms' },
  { routePath: '/migrate', pageKind: 'index', title: 'Migrate' },
  { routePath: '/solutions', pageKind: 'index', title: 'Solutions' },
  { routePath: '/work', pageKind: 'index', title: 'Work' },
  { routePath: '/insights', pageKind: 'index', title: 'Insights' },
  { routePath: '/resources', pageKind: 'index', title: 'Resources' },
  { routePath: '/markets', pageKind: 'index', title: 'Markets' },
  { routePath: '/about', pageKind: 'about', title: 'About' },
  { routePath: '/pricing', pageKind: 'pricing', title: 'Pricing' },
  { routePath: '/contact', pageKind: 'contact', title: 'Contact' },
  { routePath: '/legal/privacy', pageKind: 'legal', title: 'Privacy Policy' },
  { routePath: '/legal/terms', pageKind: 'legal', title: 'Terms of Service' },
  { routePath: '/legal/cookies', pageKind: 'legal', title: 'Cookie Policy' },
  { routePath: '/thank-you/booking', pageKind: 'thank-you', title: 'Thank You — Booking' },
  { routePath: '/thank-you/download', pageKind: 'thank-you', title: 'Thank You — Download' },
  { routePath: '/thank-you/newsletter', pageKind: 'thank-you', title: 'Thank You — Newsletter' },
] as const

const heroMediaId =
  siteSettings?.logo && typeof siteSettings.logo === 'object'
    ? siteSettings.logo.id
    : typeof siteSettings?.logo === 'number' || typeof siteSettings?.logo === 'string'
      ? siteSettings.logo
      : undefined

function layoutForPage(p: (typeof pageRoutes)[number]) {
  switch (p.pageKind) {
    case 'home':
      return homeLayout(caseStudyIds, heroMediaId)
    case 'index':
      if (p.routePath === '/work') {
        return workIndexLayout(caseStudyIds)
      }
      if (p.routePath === '/insights') {
        return insightsIndexLayout()
      }
      if (p.routePath === '/services') {
        return richIndexLayout('services')
      }
      if (p.routePath === '/platforms') {
        return richIndexLayout('platforms')
      }
      if (p.routePath === '/migrate') {
        return richIndexLayout('migrate')
      }
      if (p.routePath === '/solutions') {
        return richIndexLayout('solutions')
      }
      if (p.routePath === '/markets') {
        return richIndexLayout('markets')
      }
      if (p.routePath === '/resources') {
        return richIndexLayout('resources')
      }
      return indexLayout('Index', 'Browse content — CMS-driven index from Payload.', [
        { icon: 'build', title: 'Explore', body: 'Explore related content from navigation.' },
        { icon: 'support', title: 'Proof', body: 'Case studies and insights linked from nav.' },
        { icon: 'web-app', title: 'Contact', body: 'Book a discovery call to scope your path.' },
      ])
    case 'about':
      return aboutLayout()
    case 'pricing':
      return pricingLayout()
    case 'contact':
      return contactLayout()
    case 'legal':
      return legalLayout(p.title)
    case 'thank-you':
      return thankYouLayout(p.title)
  }
}

for (const p of pageRoutes) {
  await upsertByWhere(
    payload,
    'pages',
    { routePath: { equals: p.routePath } },
    {
      title: p.title,
      routePath: p.routePath,
      pageKind: p.pageKind,
      layout: layoutForPage(p),
      seo: p.pageKind === 'thank-you' ? { noindex: true } : { noindex: false },
    },
    upsertOpts,
  )
}

console.log(refreshContent ? 'Content refresh complete.' : 'Full seed complete.')
process.exit(0)

export {}
