import type { LayoutBlock } from '@/lib/cms/types'

export interface LayoutDocument {
  layout: LayoutBlock[]
  _status?: 'draft' | 'published' | null
}

export function isPublishedDocument(doc: LayoutDocument | null | undefined): doc is LayoutDocument {
  return Boolean(doc && doc._status === 'published')
}
