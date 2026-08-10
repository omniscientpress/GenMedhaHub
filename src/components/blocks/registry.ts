import type { ComponentType } from 'react'

import type { LayoutBlock } from '@/lib/cms/types'

import { HeroBlockRenderer } from './hero-block'
import { RichTextSectionBlockRenderer } from './rich-text-section-block'

export type BlockRendererProps<T extends LayoutBlock = LayoutBlock> = {
  block: T
}

export type BlockRendererComponent = ComponentType<BlockRendererProps>

export const blockRegistry: Partial<Record<LayoutBlock['blockType'], BlockRendererComponent>> = {
  hero: HeroBlockRenderer as BlockRendererComponent,
  richTextSection: RichTextSectionBlockRenderer as BlockRendererComponent,
}

export function getBlockRenderer(blockType: LayoutBlock['blockType']): BlockRendererComponent | null {
  return blockRegistry[blockType] ?? null
}

export const implementedBlockTypes = Object.keys(blockRegistry) as LayoutBlock['blockType'][]

export function isImplementedBlockType(blockType: string): blockType is keyof typeof blockRegistry {
  return blockType in blockRegistry
}
