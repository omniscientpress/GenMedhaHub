import type { FooterColumn, NavGroup, NavItem, NavLink } from '@/config/navigation'
import { footerColumns as fallbackFooter, primaryNav as fallbackNav } from '@/config/navigation'
import type { Navigation, SiteSetting } from '@/payload-types'

export interface ShellContent {
  brandName: string
  primaryNav: NavItem[]
  footerColumns: FooterColumn[]
  showTrustBadges: boolean
  marketsStrip: string
  marketsHref: string
  headerCtaLabel: string
  headerCtaHref: string
  mobileCtaLabel: string
  mobileCtaHref: string
}

function cmsPrimaryNav(navigation: Navigation): NavItem[] {
  return navigation.primaryNav.map((item) => {
    if (item.dropdown?.length) {
      const group: NavGroup = {
        label: item.label,
        ...(item.link ? { href: item.link } : {}),
        items: item.dropdown.map((link) => ({ label: link.label, href: link.link })),
      }
      return group
    }

    if (item.link) {
      return { label: item.label, href: item.link } satisfies NavLink
    }

    return { label: item.label, href: '#' } satisfies NavLink
  })
}

function cmsFooterColumns(navigation: Navigation): FooterColumn[] {
  return navigation.footerColumns.map((column) => ({
    heading: column.heading,
    items: (column.links ?? []).map((link) => ({ label: link.label, href: link.link })),
  }))
}

export function resolveShellContent(
  navigation: Navigation | null,
  siteSettings: SiteSetting | null,
  ctaHeader?: { label: string; href: string },
): ShellContent {
  const bookCall = ctaHeader ?? { label: 'Book a call', href: '/contact' }

  return {
    brandName: siteSettings?.brandName ?? 'GenMedha Hub',
    primaryNav: navigation ? cmsPrimaryNav(navigation) : fallbackNav,
    footerColumns: navigation ? cmsFooterColumns(navigation) : fallbackFooter,
    showTrustBadges: navigation?.showTrustBadges ?? false,
    marketsStrip: navigation?.marketsStrip ?? 'Serving India · USA · UAE & GCC',
    marketsHref: navigation?.marketsHref ?? '/markets',
    headerCtaLabel: bookCall.label,
    headerCtaHref: bookCall.href,
    mobileCtaLabel: navigation?.mobileCtaLabel ?? bookCall.label,
    mobileCtaHref: bookCall.href,
  }
}
