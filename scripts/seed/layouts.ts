import { BRAND, HOME, LEGAL } from './copy'
import {
  INDEX_PAGES,
  MARKETS,
  PLATFORMS,
  SERVICES,
  SOLUTIONS,
} from './copy/catalog'
import {
  comparisonTableBlock,
  ctaBandBlock,
  faqAccordionBlock,
  featureGridBlock,
  heroBlock,
  metricsCalloutRowBlock,
  pillarCardsBlock,
  richTextSectionBlock,
} from './helpers'

export function homeLayout(caseStudyIds: (string | number)[], heroMediaId?: string | number) {
  const { comparison } = HOME
  return [
    heroBlock(HOME.headline, HOME.subhead, HOME.eyebrow, heroMediaId),
    richTextSectionBlock(HOME.actionLayer),
    metricsCalloutRowBlock([
      { label: 'GMV fee (Medusa Cloud)', value: '0%', context: 'Vendor docs Aug 2026 — vs marketplace take rates' },
      { label: 'Typical migration window', value: '6–16 wks', context: 'Catalog complexity dependent' },
      { label: 'Discovery sprint', value: '2 wks', context: 'Roadmap you keep either way' },
      { label: 'Markets served', value: '3', context: 'India · USA · UAE & GCC remote-first' },
    ]),
    richTextSectionBlock(HOME.outcomesIntro, true),
    featureGridBlock('If you\'re looking to:', [...HOME.lookingTo]),
    comparisonTableBlock(
      comparison.heading,
      [...comparison.columns],
      comparison.rows.map((row) => ({ criterion: row.criterion, cells: [...row.cells] })),
      comparison.footnote,
    ),
    pillarCardsBlock('Build & Grow — two pillars, one stack', [
      {
        icon: 'web-app',
        title: 'Web App Development',
        proofLine: 'Same Next.js/React/TypeScript core as this site — inspect our engineering standards live.',
        link: '/services/web-app-development',
      },
      {
        icon: 'mobile-app',
        title: 'Mobile App Development',
        proofLine: 'Shared product logic with your web stack — one team, one codebase philosophy.',
        link: '/services/mobile-app-development',
      },
    ]),
    featureGridBlock('Commerce services — five pillars', [
      {
        icon: 'build',
        title: 'Ecommerce Builds',
        body: 'Headless storefronts on Medusa — you own code, data, and economics.',
      },
      {
        icon: 'migrate',
        title: 'Replatforming & Migration',
        body: 'Zero-downtime cutover, SEO preservation, sourced TCO before commit.',
      },
      {
        icon: 'support',
        title: 'Support & Retainers',
        body: 'Post-launch capacity without ticket-queue black holes.',
      },
    ]),
    {
      blockType: 'caseStudyCardList' as const,
      heading: 'Featured work',
      source: 'manual' as const,
      caseStudies: caseStudyIds,
    },
    {
      blockType: 'pricingTable' as const,
      heading: 'Engagement models',
      tiers: [
        {
          name: 'Discovery',
          priceFrom: 'From $5K',
          features: [{ feature: 'Architecture + TCO' }, { feature: 'Honest go/no-go' }, { feature: '2 weeks' }],
          ctaKey: 'book-call' as const,
        },
        {
          name: 'Build',
          priceFrom: 'From $75K',
          features: [{ feature: 'Headless storefront' }, { feature: 'CMS + CI/CD' }, { feature: 'Launch support' }],
          ctaKey: 'book-call' as const,
        },
        {
          name: 'Migration',
          priceFrom: 'From $150K',
          features: [{ feature: 'Zero-downtime cutover' }, { feature: 'SEO 301 map' }, { feature: 'Rollback plan' }],
          ctaKey: 'get-audit' as const,
        },
      ],
      footnote: 'Illustrative bands — final SOW after discovery.',
    },
    faqAccordionBlock('Frequently asked questions', [...HOME.faqs]),
    ctaBandBlock(
      `Your ${BRAND.name} discovery call`,
      'In 45 minutes: highest-ROI path, readiness read, rough architecture, timeline band, and recommended engagement model. Yours whether we work together or not.',
      'book-call',
    ),
  ]
}

export function richServiceLayout(slug: string, title: string, icon: string) {
  const copy = SERVICES[slug]
  if (!copy) return serviceLayout(title, `${title} — outcome-first delivery.`, icon)

  return [
    heroBlock(title, copy.shortPitch, 'Services'),
    richTextSectionBlock(copy.intro),
    featureGridBlock('What you get', copy.features),
    ...(copy.metrics.length > 0
      ? [metricsCalloutRowBlock(copy.metrics)]
      : []),
    comparisonTableBlock(
      'Why teams choose us for this service',
      ['Typical agency', 'GenMedha Hub'],
      [
        { criterion: 'Pricing', cells: ['Hourly + change orders', 'Published bands + fixed discovery'] },
        { criterion: 'Stack', cells: ['Vendor-partner preferred', 'Ownership stack you inspect'] },
        { criterion: 'Counter-cases', cells: ['Rarely documented', 'Stay-put path when data supports it'] },
      ],
    ),
    faqAccordionBlock('Common questions', copy.faqs),
    ctaBandBlock(
      `Scope ${title.toLowerCase()}`,
      'Tell us platform, timeline, and team shape — we respond with an honest fit assessment.',
      'get-audit',
    ),
  ]
}

export function platformLayout(slug: string, name: string) {
  const copy = PLATFORMS[slug]
  if (!copy) {
    return [
      heroBlock(`${name} platform hub`, name, 'Platforms'),
      ctaBandBlock('Book a discovery call', 'Platform choice is economics — we model TCO before you commit.'),
    ]
  }

  return [
    heroBlock(name, copy.positioning, 'Platforms'),
    richTextSectionBlock(copy.intro),
    featureGridBlock('Platform strengths', copy.features),
    comparisonTableBlock(
      'Fit assessment',
      ['Right fit', 'Wrong fit'],
      [
        { criterion: 'When to choose', cells: [copy.rightFit, '—'] },
        { criterion: 'When to avoid', cells: ['—', copy.wrongFit] },
      ],
    ),
    richTextSectionBlock(`Economics: ${copy.economics}`),
    faqAccordionBlock(`${name} FAQ`, copy.faqs),
    ctaBandBlock(
      `Model ${name} TCO`,
      'Platform choice is a 3-year finance decision — discovery outputs sourced numbers.',
      'book-call',
    ),
  ]
}

export function solutionLayout(modelKey: string, title: string) {
  const copy = SOLUTIONS[modelKey]
  if (!copy) return indexLayout(title, `${title} — model-specific capabilities.`, [])

  return [
    heroBlock(copy.title, copy.pain, 'Solutions'),
    richTextSectionBlock(copy.intro),
    featureGridBlock('Capabilities', copy.capabilities),
    comparisonTableBlock(
      'Platform guidance for this model',
      ['Medusa', 'Shopify', 'Legacy'],
      [
        { criterion: 'Typical fit', cells: ['Primary recipe', 'Early-stage DTC', 'Transition only'] },
        { criterion: 'Ownership', cells: ['Full code ownership', 'SaaS trade-offs', 'EOS/licensing risk'] },
        { criterion: 'Our posture', cells: ['Default recommendation', 'Honest stay-put', 'Migration pairs documented'] },
      ],
    ),
    faqAccordionBlock(`${copy.title} FAQ`, copy.faqs),
    ctaBandBlock(
      `Scope ${copy.title.toLowerCase()}`,
      'Book a model workshop in our 2-week discovery sprint.',
      'book-call',
    ),
  ]
}

export function marketLayout(region: string, name: string) {
  const copy = MARKETS[region]
  if (!copy) return indexLayout(`Serving ${name}`, `Remote-first delivery for ${name}.`, [])

  return [
    heroBlock(
      `Serving ${name}`,
      `Remote-first commerce engineering — timezone overlap, contracting, and compliance documented.`,
      'Markets',
    ),
    richTextSectionBlock(copy.context),
    featureGridBlock(`Working in ${name}`, copy.features),
    metricsCalloutRowBlock([
      { label: 'Timezone overlap', value: region === 'india' ? 'IST core' : region === 'usa' ? 'US hours' : 'GST overlap', context: copy.logistics.split('.')[0] ?? copy.logistics },
      { label: 'Contracting', value: 'MSA-ready', context: copy.logistics.split('.').slice(1).join('.').trim() || copy.logistics },
      { label: 'Compliance', value: region === 'india' ? 'DPDP 2023' : region === 'usa' ? 'CCPA/state' : 'PDPL', context: copy.compliance.split('.')[0] ?? copy.compliance },
    ]),
    richTextSectionBlock(`Compliance & data protection\n\n${copy.compliance}`),
    ctaBandBlock(
      `Engage from ${name}`,
      'Tell us your timezone and contracting preference — we respond within two business days.',
      'book-call',
    ),
  ]
}

export function richIndexLayout(pageKey: keyof typeof INDEX_PAGES) {
  const page = INDEX_PAGES[pageKey]
  return [
    heroBlock(page.headline, page.subhead),
    richTextSectionBlock(page.intro),
    featureGridBlock(`Explore ${page.headline.toLowerCase()}`, [...page.features]),
    ctaBandBlock(
      'Not sure where to start?',
      'Book a discovery call — we map your situation to the right path with honest counter-cases.',
      'book-call',
    ),
  ]
}

export function serviceLayout(
  title: string,
  shortPitch: string,
  icon: string,
  extraFaqs?: { question: string; answer: string }[],
) {
  return [
    heroBlock(title, shortPitch, 'Services'),
    richTextSectionBlock(
      `${title} at ${BRAND.name} follows a published-pricing, outcome-first model. Every engagement opens with discovery — architecture, TCO where relevant, and named deliverables — before write code. We embed with your team or deliver turnkey.\n\nPrincipal engineers lead implementation. CI, observability, documentation, and handover runbooks are non-negotiable. Post-launch, you choose a retainer or clean handover — no forced dependency.`,
    ),
    featureGridBlock('What you get', [
      {
        icon,
        title: 'Discovery & architecture',
        body: 'Scoped SOW, timeline band, stack choices, and honest counter-cases documented upfront.',
      },
      {
        icon: 'build',
        title: 'Engineering delivery',
        body: 'Medusa, Next.js, Payload — patterns visible in this site and our open-source work.',
      },
      {
        icon: 'support',
        title: 'Launch & transition',
        body: 'Cutover support, training, optional retainer — no account-manager shell game.',
      },
    ]),
    comparisonTableBlock(
      'Why teams choose us for this service',
      ['Typical agency', 'GenMedha Hub'],
      [
        { criterion: 'Pricing', cells: ['Hourly + change orders', 'Published bands + fixed discovery'] },
        { criterion: 'Stack', cells: ['Vendor-partner preferred', 'Ownership stack you inspect'] },
        { criterion: 'Counter-cases', cells: ['Rarely documented', 'Stay-put path when data supports it'] },
      ],
    ),
    faqAccordionBlock('Common questions', [
      {
        question: `How long does ${title.toLowerCase()} take?`,
        answer: 'See pricing bands — discovery narrows the range for your catalog, B2B rules, and integrations.',
      },
      {
        question: 'Do you work with our existing team?',
        answer: 'Yes — pair programming and shared repos, or turnkey delivery with documented handover.',
      },
      {
        question: 'What stacks do you use?',
        answer: 'Medusa, Next.js, Payload, PostgreSQL — same core as genmedha.in. Platform hubs document alternatives.',
      },
      ...(extraFaqs ?? []),
    ]),
    ctaBandBlock(
      `Scope ${title.toLowerCase()}`,
      'Tell us platform, timeline, and team shape — we respond with an honest fit assessment.',
      'get-audit',
    ),
  ]
}

export function indexLayout(
  title: string,
  subhead: string,
  items: { icon: string; title: string; body: string }[],
  extraRichText?: string,
) {
  const blocks = [
    heroBlock(title, subhead),
    ...(extraRichText ? [richTextSectionBlock(extraRichText)] : []),
    featureGridBlock(`Explore ${title.toLowerCase()}`, items),
    ctaBandBlock(
      'Not sure where to start?',
      'Book a discovery call — we map your situation to the right path with honest counter-cases.',
    ),
  ]
  return blocks
}

export function workIndexLayout(caseStudyIds: (string | number)[]) {
  return [
    heroBlock(
      'Work',
      'Outcome-led case studies and build-in-public journals — metrics include context lines and audit dates.',
      'Proof',
    ),
    richTextSectionBlock(
      'Every case study on this site carries footnoted metrics — organic traffic deltas, cutover downtime, and GMV fee context. Client names stay confidential until approved. The "Internal build journal" entry documents this site itself: same Next.js, Payload, and deployment model we ship for clients.\n\nUse these studies to benchmark timeline bands and SEO preservation expectations for your stack.',
    ),
    {
      blockType: 'caseStudyCardList' as const,
      heading: 'Case studies',
      source: 'manual' as const,
      caseStudies: caseStudyIds,
    },
    comparisonTableBlock(
      'What we document in every engagement',
      ['Vanity case study', 'GenMedha Hub standard'],
      [
        { criterion: 'Metrics', cells: ['"% uplift"', 'Value + context + audit date'] },
        { criterion: 'Rollback', cells: ['Not mentioned', 'Named triggers + procedure'] },
        { criterion: 'Counter-cases', cells: ['Omitted', 'When stay-put won'] },
      ],
    ),
    ctaBandBlock('See something similar to your stack?', 'Book a discovery call — we walk through comparable engagements.', 'book-call'),
  ]
}

export function insightsIndexLayout() {
  return [
    heroBlock(
      'Insights',
      'Founder-voice analysis on migration economics, EOS risk, and ownership stacks — answer-first articles.',
      'Research',
    ),
    richTextSectionBlock(
      'Articles cluster around migration TCO, platform comparison, and Build & Grow stack coherence. Each post is 800+ words with sourced vendor numbers only — no invented savings.\n\nStart with the migration economics series if you are evaluating replatform timing, EOS exposure, or Shopify Plus GMV fees.',
    ),
    featureGridBlock('Topics we cover', [
      { icon: 'migrate', title: 'Migration TCO', body: '3-year models with footnoted platform fees and SI cost bands.' },
      { icon: 'build', title: 'Ownership stacks', body: 'Medusa, Next.js, Payload — why we dogfood the same core.' },
      { icon: 'support', title: 'EOS & risk', body: 'Adobe/Magento deadlines with sourced documentation.' },
      { icon: 'web-app', title: 'Build & Grow', body: 'Portals and apps on shared React/TypeScript.' },
    ]),
    ctaBandBlock('Want the TCO template we use?', 'Mention "audit" on the contact form or book a call.', 'get-audit'),
  ]
}

export function aboutLayout() {
  return [
    heroBlock(
      `About ${BRAND.name}`,
      'Remote-first commerce engineering for India, USA, and UAE & GCC. Verifiable delivery — no vanity office claims.',
      'Company',
    ),
    richTextSectionBlock(
      `${BRAND.name} helps mid-market and growth-stage brands own their commerce stack. We build on Medusa, Next.js, and Payload — the same technology powering this site — so prospects audit our standards directly.\n\nWe are the execution layer replatforming consultants forget to include: discovery, build, migration, apps, and retainers under one protocol. Digital marketing stays a client-only value-add — not a public nav pillar.\n\nFounded 2024 under Omniscient Press. Principal engineers lead every engagement — no account-manager shell game.`,
    ),
    metricsCalloutRowBlock([
      { label: 'Founded', value: '2024', context: 'Omniscient Press entity' },
      { label: 'Delivery', value: 'Remote-first', context: 'Markets pages document timezone overlap' },
      { label: 'Open source', value: '2+ repos', context: 'Commerce tooling on GitHub' },
      { label: 'Stack', value: 'Medusa + Next + Payload', context: 'Same core as genmedha.in' },
    ]),
    featureGridBlock('How we work', [
      { icon: 'build', title: 'Discovery first', body: '2-week sprint with architecture, TCO, and honest go/no-go.' },
      { icon: 'migrate', title: 'Migration discipline', body: 'Rollback plans, SEO maps, and parallel runs — non-negotiable.' },
      { icon: 'support', title: 'Post-launch', body: 'Retainer or clean handover — your choice.' },
      { icon: 'web-app', title: 'Build & Grow', body: 'Web and mobile apps on shared React/TypeScript.' },
    ]),
    ctaBandBlock('Work with us', 'Principal engineers on every engagement.', 'book-call'),
  ]
}

export function pricingLayout() {
  return [
    heroBlock(
      'Pricing',
      'Published bands and discovery-scoped quotes — no surprise change orders after kickoff.',
    ),
    richTextSectionBlock(
      'Every figure on this page is illustrative until discovery scopes your catalog, B2B rules, integrations, and cutover complexity. We footnote vendor economics at render time where required.',
    ),
    {
      blockType: 'pricingTable' as const,
      heading: 'Engagement bands',
      tiers: [
        {
          name: 'Discovery',
          priceFrom: 'From $5K',
          features: [{ feature: 'Architecture review' }, { feature: 'TCO model' }, { feature: 'Go/no-go recommendation' }],
          ctaKey: 'book-call' as const,
        },
        {
          name: 'Build',
          priceFrom: 'From $75K',
          features: [{ feature: 'Headless storefront' }, { feature: 'CMS integration' }, { feature: 'Launch support' }],
          ctaKey: 'book-call' as const,
        },
        {
          name: 'Migration',
          priceFrom: 'From $150K',
          features: [{ feature: 'Zero-downtime cutover' }, { feature: 'SEO preservation' }, { feature: 'Rollback plan' }],
          ctaKey: 'get-audit' as const,
        },
      ],
      footnote: 'Illustrative bands — final SOW after discovery.',
    },
    faqAccordionBlock('Pricing FAQ', [
      { question: 'Do you bill hourly?', answer: 'Discovery and builds are scoped fixed-fee bands — not open-ended T&M.' },
      { question: 'What changes the band?', answer: 'Catalog size, B2B complexity, payment methods, ERP integrations, and cutover window.' },
    ]),
    ctaBandBlock('Get a scoped quote', 'Discovery publishes the range before you commit.', 'book-call'),
  ]
}

export function contactLayout() {
  return [
    heroBlock(
      'Contact',
      `Tell us platform, timeline, and team — we respond within two business days at ${BRAND.email}.`,
    ),
    richTextSectionBlock(
      'For migration audits, include current platform, catalog SKU band, and EOS deadlines. For Build & Grow apps, describe users and must-have integrations.\n\nIndia · USA · UAE & GCC — remote-first with timezone overlap documented on market pages. No physical-office claims; contracting via Omniscient Press with USD/INR options.',
    ),
    featureGridBlock('What to include', [
      { icon: 'migrate', title: 'Migration inquiries', body: 'Source platform, revenue band, SEO dependency, and target go-live window.' },
      { icon: 'build', title: 'New builds', body: 'Catalog size, B2B rules, payment methods, and existing ERP.' },
      { icon: 'web-app', title: 'Build & Grow', body: 'User roles, auth model, and integrations.' },
      { icon: 'support', title: 'Retainers', body: 'Current stack, incident history, and desired SLA tier.' },
    ]),
    ctaBandBlock('Prefer a call?', 'Pick a slot that works for your timezone.', 'book-call'),
  ]
}

export function legalLayout(title: string) {
  const key = title.toLowerCase().includes('privacy')
    ? 'privacy'
    : title.toLowerCase().includes('cookie')
      ? 'cookies'
      : 'terms'
  const doc = LEGAL[key]
  return [
    heroBlock(doc.title, `Last updated August 2026 — ${BRAND.name} / Omniscient Press.`),
    richTextSectionBlock(doc.body),
    ctaBandBlock('Questions?', `Email ${BRAND.email} for privacy or legal inquiries.`),
  ]
}

export function thankYouLayout(title: string) {
  return [
    heroBlock(title, 'Thanks — we received your submission.'),
    richTextSectionBlock('You can close this tab or return to the homepage.'),
  ]
}
