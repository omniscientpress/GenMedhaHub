import { describe, expect, it } from 'vitest'

import { primaryNav } from '../src/config/navigation'
import { resolveShellContent } from '../src/lib/cms/navigation'

describe('resolveShellContent', () => {
  it('falls back to static nav when CMS globals are absent', () => {
    const shell = resolveShellContent(null, null)
    expect(shell.primaryNav).toEqual(primaryNav)
    expect(shell.brandName).toBe('GenMedha Hub')
  })

  it('maps CMS navigation into shell props', () => {
    const shell = resolveShellContent(
      {
        id: 1,
        primaryNav: [{ label: 'Services', link: '/services', dropdown: [{ label: 'Builds', link: '/services/builds' }] }],
        footerColumns: [{ heading: 'Company', links: [{ label: 'About', link: '/about' }] }],
        showTrustBadges: true,
        mobileCtaLabel: 'Talk to us',
        marketsStrip: 'India · USA',
        marketsHref: '/markets',
      },
      { id: 1, brandName: 'GenMedha', tagline: 'tagline', logo: 1, defaultOgImage: 1, contactEmail: 'a@b.c' },
      { label: 'Book now', href: '/contact' },
    )

    expect(shell.brandName).toBe('GenMedha')
    expect(shell.primaryNav[0]).toMatchObject({ label: 'Services' })
    expect(shell.headerCtaLabel).toBe('Book now')
    expect(shell.showTrustBadges).toBe(true)
  })
})
