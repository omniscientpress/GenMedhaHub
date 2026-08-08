/**
 * Primary navigation structure (ch. 3.3 order).
 * Placeholder until CMS `navigation.primaryNav` is wired in a later phase.
 *
 * Nine top-level items; dropdowns on Services, Platforms, Migrate, Solutions.
 * Scope note: Digital Marketing is not a pillar — Web App + Mobile App only under Build & Grow.
 * Marketing may be offered as a complimentary add-on on request, not surfaced in nav/footer.
 */

export interface NavLink {
  label: string
  href: string
}

export interface NavGroup {
  label: string
  href?: string
  groups?: { heading: string; items: NavLink[] }[]
  items?: NavLink[]
}

export type NavItem = NavLink | NavGroup

export function isNavGroup(item: NavItem): item is NavGroup {
  return 'groups' in item || 'items' in item
}

/** ch. 3.3 primary nav — exact order preserved for shell acceptance. */
export const primaryNav: NavItem[] = [
  {
    label: 'Services',
    groups: [
      {
        heading: 'Commerce',
        items: [
          { label: 'Ecommerce Builds', href: '/services/ecommerce-builds' },
          { label: 'Replatforming & Migration', href: '/services/replatforming-migration' },
          { label: 'Support & Retainers', href: '/services/support-retainers' },
        ],
      },
      {
        heading: 'Build & Grow',
        items: [
          { label: 'Web App Development', href: '/services/web-app-development' },
          { label: 'Mobile App Development', href: '/services/mobile-app-development' },
        ],
      },
    ],
  },
  {
    label: 'Platforms',
    items: [
      { label: 'Medusa', href: '/platforms/medusa' },
      { label: 'Vendure', href: '/platforms/vendure' },
      { label: 'Shopify & Shopify Plus', href: '/platforms/shopify' },
      { label: 'Hydrogen', href: '/platforms/hydrogen' },
      { label: 'Adobe Commerce', href: '/platforms/adobe-commerce' },
      { label: 'Magento Open Source', href: '/platforms/magento-open-source' },
    ],
  },
  {
    label: 'Migrate',
    items: [
      { label: 'Magento to Medusa', href: '/migrate/magento-to-medusa' },
      { label: 'Shopify to Medusa', href: '/migrate/shopify-to-medusa' },
      { label: 'Webflow Migration', href: '/migrate/webflow' },
      { label: 'Legacy Platform Audit', href: '/migrate/legacy-audit' },
    ],
  },
  {
    label: 'Solutions',
    items: [
      { label: 'B2B Commerce', href: '/solutions/b2b-commerce' },
      { label: 'D2C Launch', href: '/solutions/d2c-launch' },
      { label: 'Marketplace', href: '/solutions/marketplace' },
      { label: 'Headless Storefront', href: '/solutions/headless-storefront' },
    ],
  },
  { label: 'Work', href: '/work' },
  { label: 'Markets', href: '/markets' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Company', href: '/company' },
  { label: 'Insights', href: '/insights' },
]

/** Footer column structure (ch. 4.2) — five columns repeating every hub URL. */
export interface FooterColumn {
  heading: string
  groups?: { heading: string; items: NavLink[] }[]
  items?: NavLink[]
}

export const footerColumns: FooterColumn[] = [
  {
    heading: 'Services',
    groups: [
      {
        heading: 'Commerce',
        items: [
          { label: 'Ecommerce Builds', href: '/services/ecommerce-builds' },
          { label: 'Replatforming & Migration', href: '/services/replatforming-migration' },
          { label: 'Support & Retainers', href: '/services/support-retainers' },
        ],
      },
      {
        heading: 'Build & Grow',
        items: [
          { label: 'Web App Development', href: '/services/web-app-development' },
          { label: 'Mobile App Development', href: '/services/mobile-app-development' },
        ],
      },
    ],
  },
  {
    heading: 'Platforms',
    items: [
      { label: 'Medusa', href: '/platforms/medusa' },
      { label: 'Vendure', href: '/platforms/vendure' },
      { label: 'Shopify & Shopify Plus', href: '/platforms/shopify' },
      { label: 'Hydrogen', href: '/platforms/hydrogen' },
      { label: 'Adobe Commerce', href: '/platforms/adobe-commerce' },
      { label: 'Magento Open Source', href: '/platforms/magento-open-source' },
    ],
  },
  {
    heading: 'Migrate',
    items: [
      { label: 'Magento to Medusa', href: '/migrate/magento-to-medusa' },
      { label: 'Shopify to Medusa', href: '/migrate/shopify-to-medusa' },
      { label: 'Webflow Migration', href: '/migrate/webflow' },
      { label: 'Legacy Platform Audit', href: '/migrate/legacy-audit' },
    ],
  },
  {
    heading: 'Markets',
    items: [
      { label: 'All Markets', href: '/markets' },
      { label: 'India', href: '/markets/india' },
      { label: 'USA', href: '/markets/usa' },
      { label: 'UAE & GCC', href: '/markets/uae-gcc' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'About', href: '/company' },
      { label: 'Work', href: '/work' },
      { label: 'Insights', href: '/insights' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
      { label: 'Legal', href: '/legal' },
    ],
  },
]

/** Breadcrumb validation fixtures (ch. 4.2 acceptance). Digital Marketing removed from pillar scope. */
export const breadcrumbFixtures = [
  [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Web App Development', href: '/services/web-app-development' },
  ],
  [
    { label: 'Home', href: '/' },
    { label: 'Markets', href: '/markets' },
    { label: 'UAE & GCC', href: '/markets/uae-gcc' },
  ],
] as const
