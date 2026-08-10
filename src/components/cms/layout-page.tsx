import type { ReactNode } from 'react'

import { BlockRenderer } from '@/components/blocks/block-renderer'
import { Breadcrumbs, type BreadcrumbSegment } from '@/components/shell/breadcrumbs'
import { SiteShell } from '@/components/shell/site-shell'
import type { BlockRenderContext } from '@/lib/cms/block-context'
import type { LayoutBlock } from '@/lib/cms/types'

interface LayoutPageProps {
  layout: LayoutBlock[]
  breadcrumbs: BreadcrumbSegment[]
  blockContext?: BlockRenderContext
  children?: ReactNode
}

/** Renders a CMS layout[] document inside the global site shell. */
export function LayoutPage({ layout, breadcrumbs, blockContext, children }: LayoutPageProps) {
  return (
    <SiteShell breadcrumbs={<Breadcrumbs segments={breadcrumbs} />}>
      <BlockRenderer blocks={layout} context={blockContext} />
      {children}
    </SiteShell>
  )
}
