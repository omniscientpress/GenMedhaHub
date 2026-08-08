/**
 * Build-time site configuration.
 * CMS-backed values (navigation.primaryNav, cta-config) will replace these in a later phase.
 */

/** Dismissible announcement — dated urgency only, never promotional (ch. 4.2). */
export const announcementConfig = {
  enabled: true,
  message: 'Magento 2.4.5 security support ends 2026-08-11',
  href: '/migrate/magento',
  dismissKey: 'gmh-announcement-2026-magento-eol',
} as const

export const ctaConfig = {
  headerLabel: 'Book a call',
  headerHref: '/contact',
  mobileLabel: 'Book a call',
  mobileHref: '/contact',
  /** Analytics event name for mobile sticky CTA (ch. 4.2 acceptance). */
  mobileEventName: 'cta_click',
  mobileEventPayload: { action: 'book-call' },
} as const

export const siteConfig = {
  name: 'GenMedha Hub',
  domain: 'genmedha.in',
  /** Legacy domain — middleware 301s all traffic to domain (genmedha.in). */
  legacyDomain: 'genmedhahub.com',
  marketsStrip: 'Serving India · USA · UAE & GCC',
  marketsHref: '/markets',
  showTrustBadges: false,
} as const
