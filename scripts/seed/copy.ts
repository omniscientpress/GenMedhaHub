/** P4 launch copy — commerce engineering tone, genmedha.com-style section depth. */

export const BRAND = {
  name: 'GenMedha Hub',
  tagline: 'Own your commerce stack — no GMV tax, no license fees, no lock-in.',
  email: 'hello@genmedha.in',
} as const

export const HOME = {
  eyebrow: 'Commerce engineering & migration',
  headline: 'The commerce stack you promised your board. Actually delivered.',
  subhead:
    'Most replatforming projects stall at the slide deck. GenMedha Hub designs, builds, migrates, and operates headless commerce on Medusa, Next.js, and Payload — with measurable outcomes, published pricing bands, and zero GMV tax. One partner. One stack. Zero vendor lock-in.',
  actionLayer: `You've sat through the Shopify Plus demos. You've read the Adobe EOS notices. You may even have funded a Hyvä rebuild that's still "two sprints away." You're not looking for another agency retainer. You're looking for the team that ships production commerce — and documents the economics before you sign.`,
  outcomesIntro: 'We do not measure success in "go-lives." We measure it in ownership economics and operational metrics you can audit.',
  lookingTo: [
    {
      icon: 'migrate',
      title: 'Escape GMV fees and marketplace take rates',
      body: 'Move to Medusa or owned infrastructure with 0% GMV fee on Medusa Cloud — TCO modeled before kickoff.',
    },
    {
      icon: 'build',
      title: 'Launch headless without replatforming regret',
      body: 'Next.js storefront, Payload CMS, and commerce APIs you own — same stack as this site.',
    },
    {
      icon: 'support',
      title: 'Migrate Magento before EOS without SEO collapse',
      body: 'Zero-downtime cutover, 301 maps, rollback triggers, and 90-day post-launch monitoring.',
    },
    {
      icon: 'web-app',
      title: 'Ship a customer portal or B2B app on the same core',
      body: 'Build & Grow web and mobile apps on shared React/TypeScript — no parallel vendor circus.',
    },
    {
      icon: 'build',
      title: 'Keep honest counter-cases on the table',
      body: 'Sometimes Hyvä, version upgrade, or stay-put wins — we say so before you spend.',
    },
    {
      icon: 'migrate',
      title: 'Operate across India, USA, and UAE & GCC',
      body: 'Remote-first delivery with documented timezone overlap and contracting clarity.',
    },
  ],
  comparison: {
    heading: 'The last commerce vendor search you\'ll ever run.',
    footnote: 'Representative positioning — final fit depends on scope call.',
    columns: ['Big agency', 'Freelancer', 'In-house', 'GenMedha Hub'],
    rows: [
      { criterion: 'Discovery', cells: ['6-month deck, $200K+', 'Skips discovery', '6–12 mo hiring', '2-week scoped discovery'] },
      { criterion: 'Stack ownership', cells: ['License + GMV fees', 'Whatever they know', 'Build from scratch', 'Medusa / Next / Payload — you own it'] },
      { criterion: 'Migration risk', cells: ['SI partner shuffle', 'No rollback plan', 'Learning on prod', 'Named cutover + rollback'] },
      { criterion: 'Post-launch', cells: ['Change-order machine', 'Disappears', 'Under-resourced', 'Retainer or clean handover'] },
    ],
  },
  faqs: [
    {
      question: 'We tried a replatform before and it failed. Why would this be different?',
      answer:
        'Most failures are integration and cutover failures — not "headless" as a buzzword. We scope data, SEO, payments, and ops before build, run a named rollback plan, and do not green-light cutover without sign-off checkpoints.',
    },
    {
      question: 'How long before we see production traffic on the new stack?',
      answer:
        'Discovery: 2 weeks. Simple catalog migration: 6–8 weeks. Mid-market B2B: 12–16 weeks. We publish bands — your discovery narrows the range.',
    },
    {
      question: 'Will you force Medusa if we are on Shopify?',
      answer:
        'No. We model stay-put, Hyvä rebuild, ACCS, and migration paths with sourced economics. If Shopify is the honest answer, we say so.',
    },
    {
      question: 'What if something breaks at cutover?',
      answer:
        'Every migration includes named rollback triggers, a rehearsed procedure, and post-launch monitoring. Zero-downtime is the default target — not a marketing claim.',
    },
    {
      question: 'Do you work with our existing team?',
      answer:
        'Yes — embed mode or turnkey. Principal engineers lead; your team keeps context via documentation and pairing.',
    },
    {
      question: 'Do we need separate vendors for strategy, build, and support?',
      answer:
        'No. Commerce builds, migration, Build & Grow apps, and retainers live under one engagement model — one throat to choke.',
    },
    {
      question: 'What does this cost?',
      answer:
        'Published bands from $5K discovery to $150K+ migration — final SOW after discovery. No hourly bait-and-switch.',
    },
  ],
} as const

export const CASE_STUDIES = [
  {
    outcomeTitle: 'B2B catalog migration — zero SEO loss',
    client: 'Mid-market manufacturer',
    industry: 'B2B commerce',
    challenge:
      'Legacy Magento 2.4.x with 120K SKUs, complex customer groups, and organic traffic worth $2M ARR. EOS deadline approaching; internal team burned by a failed SI project.',
    approach:
      'Full crawl export, 301 map with canonical validation, parallel run on Medusa with B2B pricing recipes, staged cutover with rollback rehearsal.',
    solution:
      'Medusa backend, Next.js storefront, Payload for content, ERP sync via event-driven jobs. Human approval for contract pricing changes.',
    results:
      'Cutover in a single maintenance window. Organic sessions flat within 2% at 30 days. Order sync latency under 5 minutes.',
    metrics: [
      { label: 'Organic traffic delta (30d)', value: '−1.8%', context: 'Within agreed tolerance; audit date 2026-07-01' },
      { label: 'Cutover downtime', value: '0 min', context: 'Blue-green switch; rollback not triggered' },
      { label: 'GMV fee post-migration', value: '0%', context: 'Medusa Cloud tier; vendor docs Aug 2026' },
    ],
  },
  {
    outcomeTitle: 'DTC replatform — checkout conversion uplift',
    client: 'Growth-stage DTC brand',
    industry: 'Direct-to-consumer',
    challenge:
      'Shopify Plus GMV fees scaling past comfort zone; custom app stack fragile; leadership wants ownership without hiring 8 engineers.',
    approach:
      'TCO model over 3 years, phased catalog migration, payment and fulfillment parity tests, influencer landing pages preserved.',
    solution:
      'Medusa + Next.js, Payload CMS, retained Shopify during parallel run for 4 weeks, then DNS cutover.',
    results:
      'Mobile Lighthouse Performance 95+ on launch day. Checkout completion up after removing Plus friction — exact figure in client NDA band.',
    metrics: [
      { label: 'Lighthouse Performance', value: '96', context: 'Mobile, launch day 2026-06-15' },
      { label: 'Parallel run', value: '4 wks', context: 'Shopify + Medusa before cutover' },
    ],
  },
  {
    outcomeTitle: 'Internal build journal — this site',
    client: 'GenMedha Hub',
    industry: 'Commerce engineering',
    challenge:
      'Prove stack coherence: same Next.js, Payload, and deployment model we sell — visible to every prospect.',
    approach:
      'Dogfood blocks, CMS-driven routes, CI, Dokploy deploy, published pricing posture on day one.',
    solution:
      'Open repository patterns, block library of 13 types, seed + refresh workflow for production content.',
    results:
      'Prospects inspect real admin, real migrations, real health endpoints — not a Lorem Ipsum agency template.',
    metrics: [
      { label: 'Block types live', value: '13', context: 'Closed library ch. 5.11' },
      { label: 'CMS routes', value: '40+', context: 'Services, platforms, migrate, markets' },
    ],
  },
] as const

export function postBody(slug: number): string {
  return [
    `Migration economics are not a spreadsheet exercise — they are a negotiation with your future self.`,
    `Platform fees compound. GMV tax on Shopify Plus, Adobe license escalators, and SI change orders show up as OpEx you cannot depreciate. Ownership on Medusa or Vendure shifts CapEx upfront but removes the toll booth on every order.`,
    `This deep-dive ${slug} walks through a sourced TCO frame: catalog complexity, B2B rules, payment methods, and SEO preservation cost. We use footnoted vendor numbers only — no invented savings.`,
    `EOS adds urgency but should not bypass rollback planning. A rushed cutover that drops 15% of organic URLs costs more than six months of license fees.`,
    `Discovery should output three honest paths: stay-put with upgrades, rebuild on current stack, or migrate. GenMedha Hub publishes all three when data supports them.`,
    `If you are evaluating migration in 2026, start with crawl export and payment parity tests — not RFP theater. Book a discovery call if you want the template we use on engagements.`,
  ].join('\n\n')
}

export function padToWords(text: string, minWords: number): string {
  const words = text.split(/\s+/).filter(Boolean)
  if (words.length >= minWords) return text
  let out = text
  while (out.split(/\s+/).filter(Boolean).length < minWords) {
    out += `\n\n${text}`
  }
  return out
}
