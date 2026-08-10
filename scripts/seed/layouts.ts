import { BRAND, HOME } from './copy'
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
      'Placeholder studies are marked "Build in public." Client names stay confidential until approved. Every metric on this site carries a context footnote — no vanity numbers.',
    ),
    {
      blockType: 'caseStudyCardList' as const,
      heading: 'Case studies',
      source: 'manual' as const,
      caseStudies: caseStudyIds,
    },
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
      'Articles cluster around migration TCO, platform comparison, and Build & Grow stack coherence. Expand in admin or via seed refresh.',
    ),
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
      `${BRAND.name} helps mid-market and growth-stage brands own their commerce stack. We build on Medusa, Next.js, and Payload — the same technology powering this site — so prospects audit our standards directly.\n\nWe are the execution layer replatforming consultants forget to include: discovery, build, migration, apps, and retainers under one protocol. Digital marketing stays a client-only value-add — not a public nav pillar.`,
    ),
    metricsCalloutRowBlock([
      { label: 'Founded', value: '2024', context: 'Omniscient Press entity' },
      { label: 'Delivery', value: 'Remote-first', context: 'Markets pages document timezone overlap' },
      { label: 'Open source', value: '2+ repos', context: 'Commerce tooling on GitHub' },
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
      'For migration audits, include current platform, catalog SKU band, and EOS deadlines. For Build & Grow apps, describe users and must-have integrations.',
    ),
    ctaBandBlock('Prefer a call?', 'Pick a slot that works for your timezone.', 'book-call'),
  ]
}

export function legalLayout(title: string) {
  return [
    heroBlock(title),
    richTextSectionBlock(
      'Placeholder legal copy — replace with counsel-approved text before public launch. This document validates CMS legal routes and block composition.',
    ),
  ]
}

export function thankYouLayout(title: string) {
  return [
    heroBlock(title, 'Thanks — we received your submission.'),
    richTextSectionBlock('You can close this tab or return to the homepage.'),
  ]
}
