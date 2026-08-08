import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { footerColumns } from '@/config/navigation'
import { ctaConfig, siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/20" role="contentinfo">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h2 className="text-foreground mb-4 text-sm font-semibold tracking-wide uppercase">
                {column.heading}
              </h2>
              {column.groups ? (
                <div className="space-y-6">
                  {column.groups.map((group) => (
                    <div key={group.heading}>
                      <h3 className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
                        {group.heading}
                      </h3>
                      <ul className="space-y-2">
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="text-foreground/80 hover:text-foreground text-sm underline-offset-2 hover:underline"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-2">
                  {column.items?.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-foreground/80 hover:text-foreground text-sm underline-offset-2 hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="border-border mt-10 border-t pt-6">
          <p className="text-center text-sm">
            <Link
              href={siteConfig.marketsHref}
              className="text-primary font-medium underline-offset-2 hover:underline"
            >
              {siteConfig.marketsStrip}
            </Link>
          </p>
        </div>

        {siteConfig.showTrustBadges ? (
          <div className="mt-6 flex justify-center gap-4" aria-label="Trust badges">
            {/* Trust strip renders partner badges once earned (ch. 4.2) */}
          </div>
        ) : null}

        <div className="text-muted-foreground mt-8 flex flex-col items-center justify-between gap-2 text-sm sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/legal/privacy" className="hover:text-foreground underline-offset-2 hover:underline">
              Privacy
            </Link>
            <Link href="/legal/cookies" className="hover:text-foreground underline-offset-2 hover:underline">
              Cookies
            </Link>
            <Link href="/contact" className="hover:text-foreground underline-offset-2 hover:underline">
              {ctaConfig.headerLabel}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

/** Utility for catalog preview of footer trust strip state. */
export function TrustStripPlaceholder({ show }: { show: boolean }) {
  return (
    <div
      className={cn(
        'flex justify-center gap-4 rounded-md border border-dashed p-4 text-sm',
        show ? 'border-border' : 'border-muted text-muted-foreground',
      )}
      aria-hidden={!show}
    >
      {show ? 'Partner badges render here once earned.' : 'Trust strip hidden (showTrustBadges is false).'}
    </div>
  )
}
