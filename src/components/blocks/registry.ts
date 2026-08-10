import type { ComponentType } from 'react'

import type { BlockRenderContext } from '@/lib/cms/block-context'
import type { LayoutBlock } from '@/lib/cms/types'

import { CaseStudyCardListBlockRenderer } from './case-study-card-list-block'
import { ComparisonTableBlockRenderer } from './comparison-table-block'
import { CtaBandBlockRenderer } from './cta-band-block'
import { EmbedBlockRenderer } from './embed-block'
import { FaqAccordionBlockRenderer } from './faq-accordion-block'
import { FeatureGridBlockRenderer } from './feature-grid-block'
import { HeroBlockRenderer } from './hero-block'
import { MetricsCalloutRowBlockRenderer } from './metrics-callout-row-block'
import { PillarCardsBlockRenderer } from './pillar-cards-block'
import { PricingTableBlockRenderer } from './pricing-table-block'
import { RichTextSectionBlockRenderer } from './rich-text-section-block'
import { TestimonialBlockRenderer } from './testimonial-block'
import { TrustStripBlockRenderer } from './trust-strip-block'

export type BlockRendererProps<T extends LayoutBlock = LayoutBlock> = {
  block: T
  context?: BlockRenderContext
}

export type BlockRendererComponent = ComponentType<BlockRendererProps>

export const blockRegistry: Record<LayoutBlock['blockType'], BlockRendererComponent> = {
  hero: HeroBlockRenderer as BlockRendererComponent,
  richTextSection: RichTextSectionBlockRenderer as BlockRendererComponent,
  featureGrid: FeatureGridBlockRenderer as BlockRendererComponent,
  pillarCards: PillarCardsBlockRenderer as BlockRendererComponent,
  metricsCalloutRow: MetricsCalloutRowBlockRenderer as BlockRendererComponent,
  caseStudyCardList: CaseStudyCardListBlockRenderer as BlockRendererComponent,
  ctaBand: CtaBandBlockRenderer as BlockRendererComponent,
  faqAccordion: FaqAccordionBlockRenderer as BlockRendererComponent,
  trustStrip: TrustStripBlockRenderer as BlockRendererComponent,
  pricingTable: PricingTableBlockRenderer as BlockRendererComponent,
  embed: EmbedBlockRenderer as BlockRendererComponent,
  testimonial: TestimonialBlockRenderer as BlockRendererComponent,
  comparisonTable: ComparisonTableBlockRenderer as BlockRendererComponent,
}

export function getBlockRenderer(blockType: LayoutBlock['blockType']): BlockRendererComponent | null {
  return blockRegistry[blockType] ?? null
}

export const implementedBlockTypes = Object.keys(blockRegistry) as LayoutBlock['blockType'][]

export function isImplementedBlockType(blockType: string): blockType is LayoutBlock['blockType'] {
  return blockType in blockRegistry
}
