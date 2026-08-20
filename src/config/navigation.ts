/**
 * Fallback nav when CMS navigation global is empty.
 * Must only contain URLs that exist on genmedha.in.
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
      { label: 'Shopify', href: '/platforms/shopify' },
      { label: 'Hydrogen', href: '/platforms/hydrogen' },
      { label: 'Adobe Commerce', href: '/platforms/adobe-commerce' },
      { label: 'Magento Open Source', href: '/platforms/magento-open-source' },
      { label: 'Webflow', href: '/platforms/webflow' },
    ],
  },
  {
    label: 'Migrate',
    items: [
      { label: 'Magento to Medusa', href: '/migrate/adobe-commerce-to-medusa' },
      { label: 'Shopify to Medusa', href: '/migrate/shopify-to-medusa' },
      { label: 'Webflow to Medusa', href: '/migrate/webflow-to-medusa' },
      { label: 'Legacy Platform Audit', href: '/migrate/legacy-audit' },
    ],
  },
  {
    label: 'Solutions',
    items: [
      { label: 'B2B Commerce', href: '/solutions/b2b-commerce' },
      { label: 'DTC Commerce', href: '/solutions/dtc-commerce' },
      { label: 'D2C Launch', href: '/solutions/d2c-launch' },
      { label: 'Headless Storefront', href: '/solutions/headless-storefront' },
      { label: 'Marketplace', href: '/solutions/marketplace' },
    ],
  },
  { label: 'Work', href: '/work' },
  { label: 'Markets', href: '/markets' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Company', href: '/about' },
  { label: 'Insights', href: '/insights' },
]

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
      { label: 'Hydrogen', href: '/platforms/hydrogen' },
      { label: 'Magento Open Source', href: '/platforms/magento-open-source' },
      { label: 'Webflow', href: '/platforms/webflow' },
    ],
  },
  {
    heading: 'Migrate',
    items: [
      { label: 'Magento to Medusa', href: '/migrate/adobe-commerce-to-medusa' },
      { label: 'Webflow to Medusa', href: '/migrate/webflow-to-medusa' },
      { label: 'Legacy Platform Audit', href: '/migrate/legacy-audit' },
    ],
  },
  {
    heading: 'Markets',
    items: [
      { label: 'All Markets', href: '/markets' },
      { label: 'India', href: '/markets/india' },
      { label: 'USA', href: '/markets/united-states' },
      { label: 'United Kingdom', href: '/markets/united-kingdom' },
      { label: 'UAE & GCC', href: '/markets/uae-gcc' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Work', href: '/work' },
      { label: 'Insights', href: '/insights' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
      { label: 'Legal', href: '/legal' },
    ],
  },
]

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
