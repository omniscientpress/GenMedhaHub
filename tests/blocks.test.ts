import { describe, expect, it } from 'vitest'

import { getBlockRenderer, implementedBlockTypes, isImplementedBlockType } from '../src/components/blocks/registry'

const allBlockTypes = [
  'hero',
  'richTextSection',
  'featureGrid',
  'pillarCards',
  'metricsCalloutRow',
  'caseStudyCardList',
  'ctaBand',
  'faqAccordion',
  'trustStrip',
  'pricingTable',
  'embed',
  'testimonial',
  'comparisonTable',
] as const

describe('block registry', () => {
  it('registers all 13 layout block renderers', () => {
    expect(implementedBlockTypes).toHaveLength(13)
    for (const blockType of allBlockTypes) {
      expect(implementedBlockTypes).toContain(blockType)
      expect(getBlockRenderer(blockType)).toBeTruthy()
    }
  })

  it('type-guards implemented block slugs', () => {
    expect(isImplementedBlockType('hero')).toBe(true)
    expect(isImplementedBlockType('unknown-block')).toBe(false)
  })
})
