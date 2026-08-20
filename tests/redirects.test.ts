import { describe, expect, it } from 'vitest'

import { PATH_REDIRECTS } from '../src/config/redirects'

describe('PATH_REDIRECTS', () => {
  it('sends retired and alias URLs to published canonical paths', () => {
    expect(PATH_REDIRECTS['/company']).toBe('/about')
    expect(PATH_REDIRECTS['/solutions/b2b']).toBe('/solutions/b2b-commerce')
    expect(PATH_REDIRECTS['/markets/usa']).toBe('/markets/united-states')
    expect(PATH_REDIRECTS['/markets/uk']).toBe('/markets/united-kingdom')
    expect(PATH_REDIRECTS['/migrate/magento']).toBe('/migrate/adobe-commerce-to-medusa')
    expect(PATH_REDIRECTS['/migrate/webflow']).toBe('/migrate/webflow-to-medusa')
  })

  it('does not create redirect chains or self-loops', () => {
    const destinations = new Set(Object.values(PATH_REDIRECTS))
    for (const [from, to] of Object.entries(PATH_REDIRECTS)) {
      expect(from).not.toBe(to)
      expect(PATH_REDIRECTS[to]).toBeUndefined()
      expect(destinations.has(from)).toBe(false)
    }
  })
})
