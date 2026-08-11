/** Fictional but realistic placeholder clients + testimonials — swap for verified assets later. */

export const SEED_CLIENTS = [
  {
    name: 'Northline Industrial',
    slug: 'northline-industrial',
    wordmark: 'Northline',
    color: '#1e3a5f',
    displayOrder: 1,
  },
  {
    name: 'Aurum Skincare',
    slug: 'aurum-skincare',
    wordmark: 'AURUM',
    color: '#92702a',
    displayOrder: 2,
  },
  {
    name: 'GulfParts Trading',
    slug: 'gulfparts-trading',
    wordmark: 'GulfParts',
    color: '#0d7377',
    displayOrder: 3,
  },
  {
    name: 'CraftWorks Home',
    slug: 'craftworks-home',
    wordmark: 'CraftWorks',
    color: '#5c4033',
    displayOrder: 4,
  },
] as const

export const SEED_TESTIMONIALS = [
  {
    key: 'northline-vp',
    quote:
      'The Magento-to-Medusa cutover was the smoothest replatform we have done in twelve years. Organic sessions stayed within 2% at thirty days — every metric had a context line before we signed the SOW.',
    authorName: 'Priya Sharma',
    authorRole: 'VP Engineering',
    company: 'Northline Industrial',
    initials: 'PS',
    avatarColor: '#1e3a5f',
    platformSlug: 'medusa',
  },
  {
    key: 'aurum-cto',
    quote:
      'We modeled Shopify Plus GMV fees against owned infrastructure for eighteen months before committing. GenMedha Hub did not oversell migration — they showed us the math and shipped on the timeline band.',
    authorName: 'James Chen',
    authorRole: 'CTO',
    company: 'Aurum Skincare',
    initials: 'JC',
    avatarColor: '#92702a',
    platformSlug: 'shopify',
  },
  {
    key: 'gulfparts-director',
    quote:
      'B2B contract pricing and ERP sync were the hard parts — not the storefront theme. The parallel run caught three pricing edge cases before DNS switched. Rollback was rehearsed and never needed.',
    authorName: 'Omar Al-Rashid',
    authorRole: 'Director of Digital',
    company: 'GulfParts Trading',
    initials: 'OA',
    avatarColor: '#0d7377',
    platformSlug: 'medusa',
  },
  {
    key: 'craftworks-founder',
    quote:
      'Same Next.js stack on our portal and storefront — our team could inspect genmedha.in and know what we were buying. Post-launch retainer hours go to upgrades, not deciphering agency runbooks.',
    authorName: 'Emily Hart',
    authorRole: 'Founder',
    company: 'CraftWorks Home',
    initials: 'EH',
    avatarColor: '#5c4033',
    platformSlug: 'medusa',
  },
] as const
