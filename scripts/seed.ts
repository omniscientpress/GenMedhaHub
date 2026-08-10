// Full ch. 5.10.1 seed — idempotent on a fresh database.
// Usage: pnpm seed <admin-email> <admin-password> [--allow-remote] [--users-only]
//
// Creates admin + editor users, all globals, and one of every page type.

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
const [adminEmail, adminPassword] = args

if (!adminEmail || !adminPassword) {
  console.error('Usage: pnpm seed <admin-email> <admin-password> [--allow-remote] [--users-only]')
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
const { richText, padText, heroBlock, ctaBandBlock, upsertBySlug, upsertByWhere } = await import('./seed/helpers')
const { LAUNCH_CATEGORIES } = await import('../src/payload/constants')

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
if (homepage.totalDocs > 0) {
  console.log('Full seed already applied (homepage page exists). Skipping content.')
  process.exit(0)
}

const siteSettings = await payload.findGlobal({ slug: 'site-settings' }).catch(() => null)

console.log('Running full ch. 5.10.1 seed...')

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
      { label: 'Migrate', link: '/migrate', dropdown: [{ label: 'Magento to Medusa', link: '/migrate/magento-to-medusa' }] },
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
      { heading: 'Migrate', links: [{ label: 'Magento to Medusa', link: '/migrate/magento-to-medusa' }] },
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
  const { id } = await upsertBySlug(payload, 'services', s.slug, {
    title: s.title,
    servicePillar: s.pillar,
    serviceCategory: s.category,
    shortPitch: `${s.title} — outcome-first delivery with published-pricing posture.`,
    icon: s.icon,
    engagementModels: [{ name: 'Discovery', priceFrom: 'From $5K', typicalDuration: '2 weeks' }],
    proofPoints: s.pillar === 'build-grow'
      ? [{ text: 'Same Next.js/React/TypeScript core as this site — stack coherence proof (D1/D2).' }]
      : [],
    layout: [heroBlock(s.title), ctaBandBlock('Book a discovery call')],
  })
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
  const { id } = await upsertBySlug(payload, 'platform-hubs', p.slug, {
    name: p.name,
    tier: p.tier,
    positioningLine: `${p.name} — named platform guidance with sourced economics.`,
    economics: {
      costLine: p.slug === 'medusa' ? 'Medusa Cloud $29/$99/$299/mo, 0% GMV fee' : 'See footnote for partner estimates',
      licenseNote: 'License and hosting economics vary by deployment model.',
      source: 'Vendor documentation and partner estimates — GenMedha Hub sets final numbers.',
    },
    eosDate: 'eosDate' in p ? p.eosDate : undefined,
    services: [serviceIds['ecommerce-builds']],
    layout: [
      heroBlock(`${p.name} platform hub`, p.name),
      { blockType: 'faqAccordion', heading: 'FAQ', faqs: [
        { question: `When is ${p.name} the right fit?`, answer: richText('Fit depends on revenue band, B2B complexity, and ownership goals.') },
        { question: `When is ${p.name} wrong?`, answer: richText('Honest counter-cases are documented on every hub page.') },
      ], emitSchema: true },
      ctaBandBlock('Book a discovery call'),
    ],
  })
  platformIds[p.slug] = id
}

// --- Migration pairs (6) ---
const pairSeeds = [
  { slug: 'magento-to-medusa', title: 'Migrate Magento to Medusa', source: 'adobe-commerce', target: 'medusa' },
  { slug: 'shopify-to-medusa', title: 'Migrate Shopify to Medusa', source: 'shopify', target: 'medusa' },
  { slug: 'woocommerce-to-medusa', title: 'Migrate WooCommerce to Medusa', source: 'woocommerce', target: 'medusa' },
  { slug: 'shopify-to-vendure', title: 'Migrate Shopify to Vendure', source: 'shopify', target: 'vendure' },
  { slug: 'magento-to-vendure', title: 'Migrate Magento to Vendure', source: 'adobe-commerce', target: 'vendure' },
  { slug: 'adobe-commerce-to-accs', title: 'Migrate Adobe Commerce to ACCS', source: 'adobe-commerce', target: 'adobe-commerce-cloud-service' },
]

for (const pair of pairSeeds) {
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
    title: pair.title,
    sourcePlatform: platformIds[pair.source],
    targetPlatform: platformIds[pair.target],
    hero: { headline: pair.title, subhead: 'Zero-downtime migration with SEO preservation and rollback plan.' },
    costOfStaying: richText('GMV fees, license costs, and EOS exposure quantified with sourced math only.'),
    urgencyAnchor: { date: '2026-08-11', label: 'Magento 2.4.5/2.4.6 security support ends', source: 'Adobe/Magento EOS documentation' },
    tcoBlock: {
      comparisonRows: [{ item: 'Platform fees (3yr)', sourceCost: '$120K', targetCost: '$36K', note: 'Illustrative — footnoted at render' }],
      methodologyNote: 'TCO methodology documented; every figure carries a citation footnote.',
    },
    cutoverSteps: Array.from({ length: 5 }, (_, i) => ({
      stepTitle: `Cutover step ${i + 1}`,
      detail: 'Named step in zero-downtime sequence.',
      durationWeeks: '1',
    })),
    rollbackPlan: richText('Named rollback triggers and procedure — non-negotiable for de-risking.'),
    seoPreservation: [
      { action: 'Full crawl export pre-migration' },
      { action: '301 map with canonical validation' },
      { action: 'Post-launch monitoring for 90 days' },
    ],
    timelineBands: [
      { band: '6–8 weeks', scope: 'Simple catalog', priceFrom: 'From $75K' },
      { band: '12–16 weeks', scope: 'Mid-market B2B', priceFrom: 'From $150K' },
    ],
    whenNotToMigrate: richText('Hyvä rebuild in 4–8 weeks, version upgrades, or ACCS for Adobe-native shops may be the honest answer.'),
    faqs: Array.from({ length: 4 }, (_, i) => ({
      question: `Pair FAQ ${i + 1}?`,
      answer: richText('Pair-specific answer with sourced claims only.'),
    })),
  },
  )
}

// --- Solutions (5) ---
for (const [slug, modelKey, title] of [
  ['b2b', 'b2b', 'B2B Commerce'],
  ['dtc', 'dtc', 'DTC Commerce'],
  ['marketplace', 'marketplace', 'Marketplace'],
  ['subscriptions', 'subscriptions', 'Subscriptions'],
  ['multi-region', 'multi-region', 'Multi-region'],
] as const) {
  await upsertBySlug(payload, 'solutions', slug, {
    title,
    modelKey,
    painSummary: `${title} — model-specific pain summary for index cards.`,
    capabilityChecklist: [
      { capability: 'Core commerce flows', platformNote: 'Medusa recipe exists' },
      { capability: 'Operational tooling', platformNote: 'Platform-dependent' },
      { capability: 'Scale path', platformNote: 'Ownership economics considered' },
    ],
    recommendedPlatforms: [platformIds.medusa],
    layout: [heroBlock(title), ctaBandBlock('Book a discovery call')],
  })
}

// --- Markets (3 substantive) ---
const marketSeeds = [
  { slug: 'india', name: 'India', region: 'india' },
  { slug: 'usa', name: 'United States', region: 'usa' },
  { slug: 'uae-gcc', name: 'UAE & GCC', region: 'uae-gcc' },
] as const

for (const m of marketSeeds) {
  await upsertBySlug(payload, 'markets', m.slug, {
    name: m.name,
    region: m.region,
    marketContext: richText(padText(
      `${m.name} market context: demand landscape, buyer behavior, and sector notes. Logistical facts only — no physical-office claims (D5). Remote-first delivery with timezone overlap and contracting clarity.`,
      400,
    )),
    engagementLogistics: {
      timezoneOverlap: m.region === 'india' ? 'IST = UTC+5:30; 4–6 h overlap with CET mornings' : 'US business hours overlap with IST evenings',
      contractingNotes: 'USD/EUR contracting via Omniscient Press entity; jurisdiction documented in MSA.',
      paymentNotes: 'USD wire, Wise, and local options where applicable.',
    },
    complianceNotes: richText(
      m.region === 'india'
        ? 'India DPDP Act 2023 — data protection summary cross-referencing privacy register (D7).'
        : 'UAE PDPL and Saudi PDPL for GCC engagements — cross-referencing privacy register (D7).',
    ),
    layout: [heroBlock(`Serving ${m.name}`), ctaBandBlock('Book a discovery call')],
  })
}

// --- Case studies (3 placeholders) ---
for (let i = 1; i <= 3; i++) {
  await upsertBySlug(payload, 'case-studies', `build-in-public-${i}`, {
    outcomeTitle: `Store performance uplift phase ${i}`,
    client: 'Internal project',
    industry: 'Commerce engineering',
    platformTo: platformIds.medusa,
    services: [serviceIds['ecommerce-builds']],
    commerceModels: ['dtc'],
    challenge: richText('Challenge narrative from build journal.'),
    approach: richText('Approach documented with verifiable steps.'),
    solution: richText('Solution using Medusa and Next.js stack.'),
    results: richText('Results with dated metrics only.'),
    metrics: [{ label: 'Lighthouse Performance', value: '95+', context: 'Mobile score, audit date 2026-07-01' }],
    isPlaceholder: true,
  })
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

for (const [slug, name] of [['medusa-plugin', 'GenMedha Medusa Plugin'], ['next-starter', 'Commerce Starter']] as const) {
  await upsertBySlug(payload, 'open-source-projects', slug, {
    name,
    repoUrl: 'https://github.com/omniscientpress/GenMedhaHub',
    description: 'Open-source commerce tooling — OSS proof at launch.',
    platform: platformIds.medusa,
    status: 'active',
  })
}

// --- Posts (3) ---
for (let i = 1; i <= 3; i++) {
  await upsertBySlug(payload, 'posts', `migration-cluster-${i}`, {
    title: `Migration economics deep-dive ${i}`,
    excerpt: 'Founder-voice analysis of migration TCO and EOS risk.',
    author: authorId,
    categories: [(await payload.find({ collection: 'categories', limit: 1 })).docs[0]?.id],
    body: richText('Answer-first article body — expand in content track.'),
    relatedService: [serviceIds['replatforming-migration']],
  })
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

for (const p of pageRoutes) {
  const slug = p.routePath === '/' ? 'home' : p.routePath.replace(/^\//, '').replace(/\//g, '-')
  await upsertBySlug(payload, 'pages', slug, {
    title: p.title,
    routePath: p.routePath,
    pageKind: p.pageKind,
    layout: [heroBlock(p.title), ctaBandBlock('Book a discovery call')],
    seo: p.pageKind === 'thank-you' ? { noindex: true } : { noindex: false },
  })
}

console.log('Full seed complete.')
process.exit(0)

export {}
