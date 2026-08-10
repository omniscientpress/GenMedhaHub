import {
  ctaBandBlock,
  faqAccordionBlock,
  featureGridBlock,
  heroBlock,
  metricsCalloutRowBlock,
  pillarCardsBlock,
  richTextSectionBlock,
} from './helpers'

const TAGLINE =
  'Own your commerce stack — no GMV tax, no license fees, no lock-in.'

export function homeLayout(caseStudyIds: (string | number)[]) {
  return [
    heroBlock(
      'GenMedha Hub',
      TAGLINE,
      'Commerce engineering & migration',
    ),
    featureGridBlock('Commerce services', [
      {
        icon: 'build',
        title: 'Ecommerce Builds',
        body: 'Headless storefronts on Medusa and modern stacks — you own the code and the economics.',
      },
      {
        icon: 'migrate',
        title: 'Replatforming & Migration',
        body: 'Zero-downtime cutover, SEO preservation, and honest TCO math before you commit.',
      },
      {
        icon: 'support',
        title: 'Support & Retainers',
        body: 'Post-launch engineering capacity without agency bloat or ticket-queue black holes.',
      },
    ]),
    pillarCardsBlock('Build & Grow', [
      {
        icon: 'web-app',
        title: 'Web App Development',
        proofLine: 'Same Next.js/React/TypeScript core as this site — stack coherence you can inspect.',
        link: '/services/web-app-development',
      },
      {
        icon: 'mobile-app',
        title: 'Mobile App Development',
        proofLine: 'Shared product logic with your web stack — one team, one codebase philosophy.',
        link: '/services/mobile-app-development',
      },
    ]),
    metricsCalloutRowBlock([
      { label: 'GMV fee on Medusa Cloud', value: '0%', context: 'Vendor docs, Aug 2026 — vs marketplace take rates' },
      { label: 'Typical migration band', value: '6–16 wks', context: 'Scope-dependent — discovery call for your catalog' },
      { label: 'Markets served', value: '3', context: 'India · USA · UAE & GCC — remote-first delivery' },
    ]),
    {
      blockType: 'caseStudyCardList' as const,
      heading: 'Build in public',
      source: 'manual' as const,
      caseStudies: caseStudyIds,
    },
    ctaBandBlock(
      'Ready to scope your stack?',
      'Book a discovery call — we’ll tell you honestly if migration, rebuild, or stay-put is the right move.',
      'get-audit',
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
    heroBlock(title, shortPitch),
    richTextSectionBlock(
      `We deliver ${title.toLowerCase()} with published-pricing posture and outcome-first milestones. Every engagement starts with a scoped discovery — no bait-and-switch SOWs.`,
    ),
    featureGridBlock('What you get', [
      {
        icon,
        title: 'Discovery & architecture',
        body: 'Named deliverables, timeline bands, and stack choices documented before build starts.',
      },
      {
        icon: 'build',
        title: 'Engineering delivery',
        body: 'Principal-led implementation with CI, observability, and handover runbooks.',
      },
      {
        icon: 'support',
        title: 'Launch & transition',
        body: 'Cutover support, knowledge transfer, and optional retainer path.',
      },
    ]),
    faqAccordionBlock('Common questions', [
      {
        question: `How long does a typical ${title.toLowerCase()} engagement take?`,
        answer: 'Timeline bands are published on the pricing page — discovery narrows the range for your scope.',
      },
      {
        question: 'Do you work with our existing team?',
        answer: 'Yes — we embed with your engineers or deliver turnkey, depending on capacity and preference.',
      },
      ...(extraFaqs ?? []),
    ]),
    ctaBandBlock(
      `Scope ${title.toLowerCase()}`,
      'Tell us about your stack, timeline, and constraints — we respond with an honest fit assessment.',
    ),
  ]
}

export function indexLayout(
  title: string,
  subhead: string,
  items: { icon: string; title: string; body: string }[],
) {
  return [
    heroBlock(title, subhead),
    featureGridBlock(`Explore ${title.toLowerCase()}`, items),
    ctaBandBlock(
      'Not sure where to start?',
      'Book a discovery call — we’ll map your situation to the right service or platform path.',
    ),
  ]
}

export function aboutLayout() {
  return [
    heroBlock(
      'About GenMedha Hub',
      'Remote-first commerce engineering — India, USA, and UAE & GCC. No vanity office claims; verifiable delivery only.',
      'Company',
    ),
    richTextSectionBlock(
      'GenMedha Hub helps mid-market and growth-stage brands own their commerce stack. We build on Medusa, Next.js, and Payload — the same stack powering this site — so prospects can inspect our engineering standards directly.',
    ),
    metricsCalloutRowBlock([
      { label: 'Founded', value: '2024', context: 'Omniscient Press entity — see legal pages for contracting' },
      { label: 'Delivery model', value: 'Remote-first', context: 'Timezone overlap documented per market page' },
    ]),
    ctaBandBlock('Work with us', 'Principal engineers on every engagement — no account-manager telephone game.'),
  ]
}

export function pricingLayout() {
  return [
    heroBlock(
      'Pricing',
      'Published bands and discovery-scoped quotes — no surprise change orders after kickoff.',
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
      footnote: 'Illustrative bands — final SOW after discovery. All figures footnoted at render.',
    },
    ctaBandBlock('Get a scoped quote', 'Every project starts with discovery — we publish the range before you commit.'),
  ]
}

export function contactLayout() {
  return [
    heroBlock(
      'Contact',
      'Tell us about your platform, timeline, and team — we respond within two business days.',
    ),
    richTextSectionBlock(
      'Use the form below or book a discovery call directly. For migration audits, mention your current platform and catalog complexity in the message.',
    ),
    ctaBandBlock('Prefer a call?', 'Pick a slot that works for your timezone.', 'book-call'),
  ]
}

export function legalLayout(title: string) {
  return [
    heroBlock(title),
    richTextSectionBlock(
      'Placeholder legal copy — replace with counsel-approved text before launch. This seed document exists so routes and CMS structure validate end-to-end.',
    ),
  ]
}

export function thankYouLayout(title: string) {
  return [
    heroBlock(title, 'Thanks — we received your submission.'),
    richTextSectionBlock('You can close this tab or return to the homepage.'),
  ]
}
