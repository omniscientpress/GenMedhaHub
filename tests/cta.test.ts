import { describe, expect, it } from 'vitest'

import { resolveCta } from '../src/lib/cms/cta'

describe('resolveCta', () => {
  it('uses CMS config when available', () => {
    const cta = resolveCta('book-call', {
      id: 1,
      primaryCtas: [{ key: 'book-call', label: 'Schedule now', href: '/book' }],
      bookingUrl: 'https://cal.com/test',
      bookingEventTypes: [{ key: 'discovery-30', calSlug: 'discovery', durationMin: 30 }],
    })
    expect(cta).toEqual({
      label: 'Schedule now',
      href: '/book',
      variant: 'cta-primary',
    })
  })

  it('falls back when config is missing', () => {
    const cta = resolveCta('scope-app', null)
    expect(cta?.label).toBe('Scope my app')
    expect(cta?.variant).toBe('cta-scope')
  })
})
