/** Path-level 301s for slug aliases and retired URLs. Keep in sync with seed Redirects global. */
export const PATH_REDIRECTS: Record<string, string> = {
  '/company': '/about',
  '/solutions/b2b': '/solutions/b2b-commerce',
  '/solutions/dtc': '/solutions/dtc-commerce',
  '/markets/usa': '/markets/united-states',
  '/markets/uk': '/markets/united-kingdom',
  '/markets/uae': '/markets/uae-gcc',
  '/migrate/magento': '/migrate/adobe-commerce-to-medusa',
  '/migrate/magento-to-medusa': '/migrate/adobe-commerce-to-medusa',
  '/migrate/magento-to-vendure': '/migrate/adobe-commerce-to-vendure',
  '/migrate/webflow': '/migrate/webflow-to-medusa',
}
