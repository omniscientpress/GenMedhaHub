import type { LayoutBlock } from '@/lib/cms/types'

import { getBlockRenderer } from './registry'
import { UnsupportedBlock } from './unsupported-block'

interface BlockRendererProps {
  blocks: LayoutBlock[]
}

/** Maps CMS layout[] blocks to React renderers. Unknown blocks are skipped in production. */
export function BlockRenderer({ blocks }: BlockRendererProps) {
  return blocks.map((block, index) => {
    const Component = getBlockRenderer(block.blockType)
    const key = block.id ?? `${block.blockType}-${index}`

    if (!Component) {
      if (process.env.NODE_ENV === 'development') {
        return <UnsupportedBlock key={key} blockType={block.blockType} />
      }
      return null
    }

    return <Component key={key} block={block} />
  })
}
