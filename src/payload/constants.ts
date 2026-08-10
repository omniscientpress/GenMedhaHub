/** Shared taxonomy — one vocabulary site-wide (ch. 5.8.1). */

export const COMMERCE_MODEL_OPTIONS = [
  { label: 'B2B', value: 'b2b' },
  { label: 'DTC', value: 'dtc' },
  { label: 'Marketplace', value: 'marketplace' },
  { label: 'Subscriptions', value: 'subscriptions' },
  { label: 'Multi-region', value: 'multi-region' },
] as const

export const SERVICE_PILLAR_OPTIONS = [
  { label: 'Commerce', value: 'commerce' },
  { label: 'Build & Grow', value: 'build-grow' },
] as const

export const SERVICE_CATEGORY_OPTIONS = [
  { label: 'New Build', value: 'new-build' },
  { label: 'Replatforming & Migration', value: 'replatforming-migration' },
  { label: 'Support & Retainer', value: 'support-retainer' },
  { label: 'Web App', value: 'web-app' },
  { label: 'Mobile App', value: 'mobile-app' },
] as const

export const SERVICE_ICON_OPTIONS = [
  { label: 'Build', value: 'build' },
  { label: 'Migrate', value: 'migrate' },
  { label: 'Support', value: 'support' },
  { label: 'Web App', value: 'web-app' },
  { label: 'Mobile App', value: 'mobile-app' },
] as const

export const CTA_KEY_OPTIONS = [
  { label: 'Book a discovery call', value: 'book-call' },
  { label: 'Get a Legacy Platform Audit', value: 'get-audit' },
  { label: 'Scope my app', value: 'scope-app' },
  { label: 'Download the checklist', value: 'download-checklist' },
  { label: 'Subscribe', value: 'subscribe' },
  { label: 'View our work', value: 'view-work' },
  { label: 'Read the migration guide', value: 'read-migration-guide' },
] as const

export const PAGE_KIND_OPTIONS = [
  { label: 'Home', value: 'home' },
  { label: 'Index', value: 'index' },
  { label: 'About', value: 'about' },
  { label: 'Pricing', value: 'pricing' },
  { label: 'Contact', value: 'contact' },
  { label: 'Legal', value: 'legal' },
  { label: 'Thank You', value: 'thank-you' },
] as const

export const MARKET_REGION_OPTIONS = [
  { label: 'India', value: 'india' },
  { label: 'USA', value: 'usa' },
  { label: 'UAE & GCC', value: 'uae-gcc' },
] as const

export const PLATFORM_TIER_OPTIONS = [
  { label: 'Flagship', value: 'flagship' },
  { label: 'Hub', value: 'hub' },
] as const

export const LAUNCH_CATEGORIES = [
  'Medusa engineering',
  'Migration economics',
  'B2B commerce',
  'Platform comparisons',
  'Performance',
  'Agency operations',
] as const

/** Canonical platform short names for pair slugs (ch. 3.4.1). */
export const PLATFORM_SLUG_NAMES: Record<string, string> = {
  medusa: 'medusa',
  vendure: 'vendure',
  shopify: 'shopify',
  'adobe-commerce': 'adobe-commerce',
  magento: 'magento',
  woocommerce: 'woocommerce',
  accs: 'accs',
  'adobe-commerce-cloud-service': 'accs',
}
