import { LayoutPage } from '@/components/cms/layout-page'
import { isPublishedDocument, type LayoutDocument } from '@/lib/cms/document'
import { getPageByRoutePath } from '@/lib/cms/fetch'
import { metadataForLayoutDocument, renderLayoutDocument } from '@/lib/cms/layout-route'

type Breadcrumb = { label: string; href: string }

export async function renderCollectionOrCmsPage<T extends LayoutDocument>(opts: {
  document: T | null
  routePath: string
  breadcrumbs: Breadcrumb[]
  getTitle: (doc: T) => string
  getDescription: (doc: T) => string
}) {
  if (isPublishedDocument(opts.document) && opts.document.layout?.length) {
    return renderLayoutDocument({
      document: opts.document,
      path: opts.routePath,
      breadcrumbs: opts.breadcrumbs,
      getTitle: opts.getTitle,
      getDescription: opts.getDescription,
    })
  }

  const page = await getPageByRoutePath(opts.routePath)
  if (isPublishedDocument(page)) {
    return (
      <LayoutPage
        layout={page.layout}
        breadcrumbs={opts.breadcrumbs.map((segment) =>
          segment.href === opts.routePath ? { ...segment, label: page.title } : segment,
        )}
      />
    )
  }

  return renderLayoutDocument({
    document: null,
    path: opts.routePath,
    breadcrumbs: opts.breadcrumbs,
    getTitle: opts.getTitle,
    getDescription: opts.getDescription,
  })
}

export async function metadataForCollectionOrCmsPage<T extends LayoutDocument>(opts: {
  document: T | null
  routePath: string
  getTitle: (doc: T) => string
  getDescription: (doc: T) => string
}) {
  if (opts.document) {
    return metadataForLayoutDocument({
      document: opts.document,
      path: opts.routePath,
      getTitle: opts.getTitle,
      getDescription: opts.getDescription,
    })
  }

  const page = await getPageByRoutePath(opts.routePath)
  return metadataForLayoutDocument({
    document: page,
    path: opts.routePath,
    getTitle: (doc) => doc.title,
    getDescription: (doc) => doc.title,
    getSeo: (doc) => doc.seo,
  })
}
