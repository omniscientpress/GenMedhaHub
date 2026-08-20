import { BRAND, COMPANY, HOME, LEGAL } from './copy'
import {
  INDEX_PAGES,
  MARKETS,
  MIGRATION_PAIRS,
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

/** Dual-currency engagement bands — India is the primary market; USD shown for US/UK/UAE/GCC prospects.
 *  INR figures are rounded, illustrative reference points (approximate FX) — final currency and
 *  quote are confirmed in the proposal, never invented as precise conversions. */
export const PRICING_FOOTNOTE =
  'Illustrative bands — INR shown for India-based engagements, USD for international. Approximate reference exchange rate; final currency and quote confirmed in your proposal after discovery.'

export const ENGAGEMENT_TIERS = [
  {
    name: 'Discovery',
    priceFrom: 'From ₹4,00,000 / $5,000',
    features: [{ feature: 'Architecture + TCO' }, { feature: 'Honest go/no-go' }, { feature: '2 weeks' }],
    ctaKey: 'book-call' as const,
  },
  {
    name: 'Build',
    priceFrom: 'From ₹60,00,000 / $75,000',
    features: [{ feature: 'Headless storefront' }, { feature: 'CMS + CI/CD' }, { feature: 'Launch support' }],
    ctaKey: 'book-call' as const,
  },
  {
    name: 'Migration',
    priceFrom: 'From ₹1,20,00,000 / $150,000',
    features: [{ feature: 'Zero-downtime cutover' }, { feature: 'SEO 301 map' }, { feature: 'Rollback plan' }],
    ctaKey: 'get-audit' as const,
  },
]

export function homeLayout(caseStudyIds: (string | number)[], heroMediaId?: string | number) {
  const { comparison } = HOME
  return [
    heroBlock(HOME.headline, HOME.subhead, HOME.eyebrow, heroMediaId),
    richTextSectionBlock(HOME.actionLayer),
    metricsCalloutRowBlock([
      { label: 'GMV fee (Medusa Cloud)', value: '0%', context: 'Vendor docs Aug 2026 — vs marketplace take rates' },
      { label: 'Typical migration window', value: '6–16 wks', context: 'Catalog complexity dependent' },
      { label: 'Discovery sprint', value: '2 wks', context: 'Roadmap you keep either way' },
      { label: 'Markets served', value: '4', context: 'India · USA · UK · UAE & GCC remote-first' },
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
      tiers: ENGAGEMENT_TIERS,
      footnote: PRICING_FOOTNOTE,
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
    ...(copy.metrics.length >= 2
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
      {
        label: 'Timezone overlap',
        value:
          region === 'india'
            ? 'IST core'
            : region === 'usa'
              ? 'US hours'
              : region === 'united-kingdom'
                ? 'UK hours'
                : 'GST overlap',
        context: copy.logistics.split('.')[0] ?? copy.logistics,
      },
      { label: 'Contracting', value: 'MSA-ready', context: copy.logistics.split('.').slice(1).join('.').trim() || copy.logistics },
      {
        label: 'Compliance',
        value:
          region === 'india'
            ? 'DPDP 2023'
            : region === 'usa'
              ? 'CCPA/state'
              : region === 'united-kingdom'
                ? 'UK GDPR'
                : 'PDPL',
        context: copy.compliance.split('.')[0] ?? copy.compliance,
      },
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
      `${BRAND.name} helps mid-market and growth-stage brands own their commerce stack. We build on Medusa, Next.js, and Payload — the same technology powering this site — so prospects audit our standards directly.\n\nWe are the execution layer replatforming consultants forget to include: discovery, build, migration, apps, and retainers under one protocol.\n\n${BRAND.name} is a brand of ${COMPANY.legalName}, an Indian private limited company. Our sister site, ${BRAND.sisterSite.url.replace('https://', '')}, covers ${BRAND.sisterSite.focus} — a separate line of work from the commerce engineering and Build & Grow services on this site.`,
    ),
    metricsCalloutRowBlock([
      { label: 'Legal entity', value: COMPANY.legalName, context: 'Registered private limited company, India' },
      { label: 'Delivery', value: 'Remote-first', context: 'Markets pages document timezone overlap' },
      { label: 'Offices', value: '2 (India)', context: 'Vijayawada (registered) and Hyderabad' },
      { label: 'Stack', value: 'Medusa + Next + Payload', context: 'Same core as genmedha.in' },
    ]),
    featureGridBlock('How we work', [
      { icon: 'build', title: 'Discovery first', body: '2-week sprint with architecture, TCO, and honest go/no-go.' },
      { icon: 'migrate', title: 'Migration discipline', body: 'Rollback plans, SEO maps, and parallel runs — non-negotiable.' },
      { icon: 'support', title: 'Post-launch', body: 'Retainer or clean handover — your choice.' },
      { icon: 'web-app', title: 'Build & Grow', body: 'Web and mobile apps on shared React/TypeScript.' },
    ]),
    richTextSectionBlock(
      `Our offices\n\n${COMPANY.offices.map((o) => `${o.label}: ${o.address}`).join('\n\n')}`,
    ),
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
      tiers: ENGAGEMENT_TIERS,
      footnote: PRICING_FOOTNOTE,
    },
    faqAccordionBlock('Pricing FAQ', [
      { question: 'Do you bill hourly?', answer: 'Discovery and builds are scoped fixed-fee bands — not open-ended T&M.' },
      { question: 'What changes the band?', answer: 'Catalog size, B2B complexity, payment methods, ERP integrations, and cutover window.' },
      { question: 'Do you invoice in INR or USD?', answer: 'Both — INR for India-based clients, USD for international clients. GST applies to INR invoices as per Indian law.' },
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
      `For migration audits, include current platform, catalog SKU band, and EOS deadlines. For Build & Grow apps, describe users and must-have integrations.\n\nIndia · USA · UK · UAE & GCC — remote-first delivery with timezone overlap documented on market pages. ${BRAND.name} is a brand of ${COMPANY.legalName}. Invoicing available in INR or USD.`,
    ),
    featureGridBlock('What to include', [
      { icon: 'migrate', title: 'Migration inquiries', body: 'Source platform, revenue band, SEO dependency, and target go-live window.' },
      { icon: 'build', title: 'New builds', body: 'Catalog size, B2B rules, payment methods, and existing ERP.' },
      { icon: 'web-app', title: 'Build & Grow', body: 'User roles, auth model, and integrations.' },
      { icon: 'support', title: 'Retainers', body: 'Current stack, incident history, and desired SLA tier.' },
    ]),
    richTextSectionBlock(
      `Our offices\n\n${COMPANY.offices.map((o) => `${o.label}: ${o.address}`).join('\n\n')}\n\nGrievance Officer: ${COMPANY.grievanceOfficer.name}, ${COMPANY.grievanceOfficer.role} — ${COMPANY.grievanceOfficer.phone}`,
    ),
    ctaBandBlock('Prefer a call?', 'Pick a slot that works for your timezone.', 'book-call'),
  ]
}

export function webflowMigrateLayout() {
  const copy = MIGRATION_PAIRS['webflow-to-medusa']
  return [
    heroBlock(copy.title, copy.subhead, 'Migrate'),
    richTextSectionBlock(copy.costOfStaying),
    richTextSectionBlock(`When not to migrate\n\n${copy.whenNotToMigrate}`),
    featureGridBlock(
      'Cutover sequence',
      copy.cutoverSteps.slice(0, 3).map((step) => ({
        icon: 'migrate',
        title: step.stepTitle,
        body: `${step.detail} (${step.durationWeeks} wks)`,
      })),
    ),
    richTextSectionBlock(`Rollback\n\n${copy.rollbackPlan}`),
    faqAccordionBlock('Webflow migration FAQ', copy.faqs),
    ctaBandBlock('Scope a Webflow exit', 'Tell us SKU count, CMS collections, and whether marketing should stay on Webflow.', 'get-audit'),
  ]
}

export function bookLayout() {
  return [
    heroBlock(
      'Book a discovery call',
      'Forty-five minutes: highest-ROI path, readiness read, rough architecture, timeline band, and recommended engagement model. Yours whether we work together or not.',
      'Start here',
    ),
    richTextSectionBlock(
      `Cal.com scheduling is not live on this site yet. Until it is, send a short brief via the contact form or email ${BRAND.email} — we reply within two business days and propose a slot in your timezone.\n\nCome prepared with current platform, catalog size (SKU band), whether B2B rules or ERP sync matter, and any EOS or contract dates. We will not sell a replatform if stay-put, Hyvä, or a version upgrade is the honest answer.`,
    ),
    featureGridBlock('What you walk away with', [
      { icon: 'migrate', title: 'Path, not a pitch deck', body: 'Stay-put, rebuild, or migrate — named, with a why.' },
      { icon: 'build', title: 'Architecture sketch', body: 'Stack, integrations, and the first risks we would de-risk.' },
      { icon: 'support', title: 'Timeline band', body: 'Weeks, not “it depends” without a range. Discovery then tightens it.' },
      { icon: 'web-app', title: 'Engagement shape', body: 'Discovery sprint, build, migration, or retainer — mapped to your team.' },
    ]),
    comparisonTableBlock(
      'Who should book',
      ['Good fit', 'Wrong room'],
      [
        { criterion: 'Commerce', cells: ['Catalog, checkout, migration, or portal work', 'Pure brand/creative with no engineering need'] },
        { criterion: 'Decision', cells: ['You can sponsor a 2-week discovery', 'You need a same-week theme tweak only'] },
        { criterion: 'Geography', cells: ['India, USA, UK, UAE & GCC overlap', 'On-site-only staff augmentation'] },
      ],
    ),
    faqAccordionBlock('Before you write', [
      { question: 'Is this a sales demo?', answer: 'No. If we are a poor fit we will say so and point at the counter-case.' },
      { question: 'Do you sign NDAs?', answer: 'Yes, after a first pass on scope. Send your paper to hello@genmedha.in.' },
      { question: 'INR or USD?', answer: 'Both. India-based work is typically INR; US/UK/UAE/GCC typically USD or GBP as agreed in the MSA.' },
    ]),
    ctaBandBlock(
      'Send a brief',
      `Use the contact form — we will schedule the call by email until booking software is wired. ${BRAND.email}`,
      'scope-app',
    ),
  ]
}

export function careersLayout() {
  return [
    heroBlock(
      'Careers',
      `We are hiring. ${BRAND.name} is a brand of ${COMPANY.legalName} — commerce engineering, not an AI lab. If you want to ship Medusa, Next.js, and migrations that survive cutover, write to us.`,
      'Join the bench',
    ),
    richTextSectionBlock(
      `We hire principal-minded engineers, not ticket queues. You will work on client commerce systems and on this site — same stack, same standards.\n\nOffices: ${COMPANY.offices.map((o) => o.address).join('; ')}. Delivery is remote-first across India with overlap into US, UK, and Gulf hours. We do not invent headcount or “Google-style perks” we do not run.\n\nOpen roles are scoped to delivery demand. There is no public ATS yet — apply by email.`,
    ),
    featureGridBlock('Roles we hire for', [
      { icon: 'build', title: 'Commerce engineer (Medusa / Next.js)', body: 'Catalog, checkout, integrations, CI. TypeScript daily.' },
      { icon: 'web-app', title: 'Full-stack (Payload / React)', body: 'CMS, admin, storefront, and the unglamorous glue.' },
      { icon: 'mobile-app', title: 'Mobile (React Native)', body: 'When a client’s portal needs a companion app on the same domain model.' },
      { icon: 'migrate', title: 'Migration engineer', body: 'ETL, 301 maps, parallel runs, rollback drills — calm under DNS cutover.' },
      { icon: 'support', title: 'How to apply', body: `Email ${BRAND.email} with role interest, CV or GitHub, and a short note on a system you are proud of.` },
      { icon: 'build', title: 'What to send', body: 'No cover-letter theatre. A repo, a postmortem, or a migration story beats adjectives.' },
    ]),
    faqAccordionBlock('Working here', [
      { question: 'Visa sponsorship?', answer: 'India-based employment is the default. Cross-border contractor arrangements are case-by-case in the MSA — ask in your email.' },
      { question: 'Internships?', answer: 'Not a standing programme. If we open one we will say so on this page.' },
      { question: 'Is this genmedha.com hiring too?', answer: 'Different site, different work (AI / agentic). Apply here for commerce engineering on genmedha.in.' },
    ]),
    ctaBandBlock('Apply', `Send your note to ${BRAND.email} with the subject line “Careers — [role]”.`, 'scope-app'),
  ]
}

export function legalIndexLayout() {
  return [
    heroBlock(
      'Legal',
      `${BRAND.name} is a brand of ${COMPANY.legalName}. Policies for genmedha.in.`,
      'Policies',
    ),
    richTextSectionBlock(
      `Registered Office: ${COMPANY.offices[0]!.address}\n\nCorporate Office: ${COMPANY.offices[1]!.address}\n\nGrievance Officer (DPDP Act 2023): ${COMPANY.grievanceOfficer.name}, ${COMPANY.grievanceOfficer.role} — ${COMPANY.grievanceOfficer.phone} — ${COMPANY.grievanceOfficer.email}`,
    ),
    featureGridBlock('Documents', [
      { icon: 'support', title: 'Privacy Policy', body: 'Personal data, subprocessors, DPDP grievance route — /legal/privacy' },
      { icon: 'build', title: 'Terms of Service', body: 'Website use, SOW/MSA relationship, Indian jurisdiction — /legal/terms' },
      { icon: 'web-app', title: 'Cookie Policy', body: 'Essential vs analytics cookies, calendar embeds — /legal/cookies' },
      { icon: 'migrate', title: 'Questions', body: `Email ${BRAND.email}. We do not offer legal advice through this form.` },
    ]),
    ctaBandBlock('Need a DPA or MSA template?', 'Those sit in contracting, not on this page. Start with a discovery brief.', 'scope-app'),
  ]
}

export function legacyAuditLayout() {
  return [
    heroBlock(
      'Legacy Platform Audit',
      'A two-week discovery that tells you whether to stay, rebuild, or migrate — with sourced TCO, not a slide that only recommends our favourite stack.',
      'Migrate',
    ),
    richTextSectionBlock(
      `Most “audits” are presales. Ours is a paid discovery sprint: architecture, integration map, SEO risk, EOS dates where they apply, and three named paths (stay-put, rebuild on current platform, migrate).\n\nYou keep the artefacts whether you hire us to implement or not. Pricing sits in the Discovery band on /pricing (from ₹4,00,000 / $5,000 — illustrative until scoped).`,
    ),
    featureGridBlock('What the audit produces', [
      { icon: 'migrate', title: 'Platform & integration map', body: 'Commerce engine, OMS/ERP, payments, search, CMS, custom apps.' },
      { icon: 'build', title: 'TCO frame', body: '3-year fees, SI load, internal cost — vendor numbers footnoted, never invented.' },
      { icon: 'support', title: 'SEO & cutover risk', body: 'URL inventory method, 301 approach, rollback posture — even if you stay.' },
      { icon: 'web-app', title: 'Go / no-go', body: 'A written recommendation including “do not migrate this year” when that is true.' },
    ]),
    comparisonTableBlock(
      'Audit vs full migration',
      ['Legacy Platform Audit', 'Migration engagement'],
      [
        { criterion: 'Duration', cells: ['2 weeks', '6–16 weeks typical'] },
        { criterion: 'Output', cells: ['Decision pack you keep', 'Production cutover'] },
        { criterion: 'Commitment', cells: ['Discovery SOW only', 'Implementation SOW after sign-off'] },
      ],
    ),
    faqAccordionBlock('Audit FAQ', [
      { question: 'Which platforms?', answer: 'Magento / Adobe, Magento Open Source, Shopify, WooCommerce, Webflow Ecommerce, and mixed estates.' },
      { question: 'Do you need production access?', answer: 'Read-only where possible. We document the access list in week 1. No standing production keys after the sprint unless a retainer starts.' },
      { question: 'What if the answer is stay-put?', answer: 'Then that is the deliverable. We would rather lose a migration than win a regret.' },
    ]),
    ctaBandBlock('Request an audit', 'Tell us platform, SKU band, and any EOS date — we reply with fit and a draft SOW.', 'get-audit'),
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
    heroBlock(doc.title, `Last updated August 2026 — ${BRAND.name}, a brand of ${COMPANY.legalName}.`),
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
