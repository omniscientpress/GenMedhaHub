import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { LayoutPage } from '@/components/cms/layout-page'
import type { BlockRenderContext } from '@/lib/cms/block-context'
import { isPublishedDocument, type LayoutDocument } from '@/lib/cms/document'
import { buildPageMetadata } from '@/lib/cms/seo'

export const revalidate = 300

interface LayoutDocumentSeo {
  metaTitle?: string | null
  metaDescription?: string | null
  ogImage?: unknown
  noindex?: boolean | null
}

interface RenderLayoutDocumentOptions<T extends LayoutDocument> {
  document: T | null
  path: string
  breadcrumbs: { label: string; href: string }[]
  getTitle: (doc: T) => string
  getDescription: (doc: T) => string
  getSeo?: (doc: T) => LayoutDocumentSeo | null | undefined
  getBlockContext?: (doc: T) => BlockRenderContext | undefined
}

export function renderLayoutDocument<T extends LayoutDocument>({
  document,
  breadcrumbs,
  getBlockContext,
}: Pick<RenderLayoutDocumentOptions<T>, 'document' | 'breadcrumbs' | 'getBlockContext'> &
  Partial<Pick<RenderLayoutDocumentOptions<T>, 'path' | 'getTitle' | 'getDescription' | 'getSeo'>>) {
  if (!isPublishedDocument(document)) {
    notFound()
  }

  return (
    <LayoutPage
      layout={document.layout}
      breadcrumbs={breadcrumbs}
      blockContext={getBlockContext?.(document)}
    />
  )
}

export async function metadataForLayoutDocument<T extends LayoutDocument>({
  document,
  path,
  getTitle,
  getDescription,
  getSeo,
}: Omit<RenderLayoutDocumentOptions<T>, 'breadcrumbs' | 'getBlockContext'>): Promise<Metadata> {
  if (!document) {
    return { title: 'Not found' }
  }

  const seo = getSeo?.(document)
  return buildPageMetadata({
    title: seo?.metaTitle?.trim() || getTitle(document),
    description: seo?.metaDescription?.trim() || getDescription(document),
    ogImage: seo?.ogImage as Parameters<typeof buildPageMetadata>[0]['ogImage'],
    noindex: seo?.noindex,
    path,
  })
}

export function publishedOrNotFound<T extends { _status?: 'draft' | 'published' | null }>(
  document: T | null,
): T {
  if (!document || document._status !== 'published') {
    notFound()
  }
  return document
}
