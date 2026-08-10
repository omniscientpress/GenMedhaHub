import type { ReactNode } from 'react'

import { AnnouncementBar } from '@/components/shell/announcement-bar'
import { MobileCtaBar } from '@/components/shell/mobile-cta-bar'
import { SiteFooter } from '@/components/shell/site-footer'
import { SiteHeader } from '@/components/shell/site-header'
import { SkipLink } from '@/components/shell/skip-link'
import { getCtaConfig, getNavigation, getSiteSettings } from '@/lib/cms/fetch'
import { resolveShellContent } from '@/lib/cms/navigation'

interface SiteShellProps {
  children: ReactNode
  breadcrumbs?: ReactNode
}

/** Global shell — CMS-backed nav when globals are seeded, config fallback otherwise. */
export async function SiteShell({ children, breadcrumbs }: SiteShellProps) {
  const [navigation, siteSettings, ctaConfig] = await Promise.all([
    getNavigation(),
    getSiteSettings(),
    getCtaConfig(),
  ])

  const bookCall = ctaConfig?.primaryCtas?.find((cta) => cta.key === 'book-call')
  const shell = resolveShellContent(
    navigation,
    siteSettings,
    bookCall ? { label: bookCall.label, href: bookCall.href } : undefined,
  )

  return (
    <>
      <SkipLink />
      <AnnouncementBar />
      <SiteHeader shell={shell} />
      {breadcrumbs}
      <main id="main-content" className="min-h-[calc(100vh-var(--header-height))] pb-[var(--mobile-cta-height)] md:pb-0">
        {children}
      </main>
      <SiteFooter shell={shell} />
      <MobileCtaBar shell={shell} />
    </>
  )
}
