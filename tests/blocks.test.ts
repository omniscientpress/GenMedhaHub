import { describe, expect, it } from 'vitest'

import { getBlockRenderer, implementedBlockTypes, isImplementedBlockType } from '../src/components/blocks/registry'

describe('block registry', () => {
  it('registers hero and richTextSection renderers', () => {
    expect(implementedBlockTypes).toContain('hero')
    expect(implementedBlockTypes).toContain('richTextSection')
    expect(getBlockRenderer('hero')).toBeTruthy()
    expect(getBlockRenderer('richTextSection')).toBeTruthy()
  })

  it('returns null for unimplemented block types', () => {
    expect(getBlockRenderer('ctaBand')).toBeNull()
    expect(getBlockRenderer('featureGrid')).toBeNull()
  })

  it('type-guards implemented block slugs', () => {
    expect(isImplementedBlockType('hero')).toBe(true)
    expect(isImplementedBlockType('faqAccordion')).toBe(false)
  })
})
