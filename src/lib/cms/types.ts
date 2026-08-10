import type { Service } from '@/payload-types'

/** Shared layout block union from collections that use layoutField(). */
export type LayoutBlock = Service['layout'][number]

export type HeroBlock = Extract<LayoutBlock, { blockType: 'hero' }>
export type RichTextSectionBlock = Extract<LayoutBlock, { blockType: 'richTextSection' }>

export type CtaKey = NonNullable<HeroBlock['ctaKey']>
