import type { ReactNode } from 'react'

import { AnnouncementBar } from '@/components/shell/announcement-bar'
import { MobileCtaBar } from '@/components/shell/mobile-cta-bar'
import { SiteFooter } from '@/components/shell/site-footer'
import { SiteHeader } from '@/components/shell/site-header'
import { SkipLink } from '@/components/shell/skip-link'

interface SiteShellProps {
  children: ReactNode
  breadcrumbs?: ReactNode
}

/** Global shell — header, nav, footer, announcement, mobile CTA (ch. 4.2). */
export function SiteShell({ children, breadcrumbs }: SiteShellProps) {
  return (
    <>
      <SkipLink />
      <AnnouncementBar />
      <SiteHeader />
      {breadcrumbs}
      <main id="main-content" className="min-h-[calc(100vh-var(--header-height))] pb-[var(--mobile-cta-height)] md:pb-0">
        {children}
      </main>
      <SiteFooter />
      <MobileCtaBar />
    </>
  )
}
