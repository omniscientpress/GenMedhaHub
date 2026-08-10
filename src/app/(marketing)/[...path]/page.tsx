import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { LayoutPage } from '@/components/cms/layout-page'
import { getPageByRoutePath } from '@/lib/cms/fetch'
import { metadataForLayoutDocument, publishedOrNotFound } from '@/lib/cms/layout-route'

export const revalidate = 300

interface CmsPageProps {
  params: Promise<{ path: string[] }>
}

function routePathFromSegments(segments: string[]): string {
  return `/${segments.join('/')}`
}

export async function generateMetadata({ params }: CmsPageProps): Promise<Metadata> {
  const { path } = await params
  const routePath = routePathFromSegments(path)
  const page = await getPageByRoutePath(routePath)

  return metadataForLayoutDocument({
    document: page,
    path: routePath,
    getTitle: (doc) => doc.title,
    getDescription: (doc) => doc.title,
    getSeo: (doc) => doc.seo,
  })
}

export default async function CmsCatchAllPage({ params }: CmsPageProps) {
  const { path } = await params
  const routePath = routePathFromSegments(path)
  const page = await getPageByRoutePath(routePath)
  const document = publishedOrNotFound(page)

  const segments = [{ label: 'Home', href: '/' }]
  const parts = path.slice()
  let current = ''
  for (const part of parts) {
    current += `/${part}`
    segments.push({
      label: part
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      href: current,
    })
  }

  if (segments.length === 1) notFound()

  return <LayoutPage layout={document.layout} breadcrumbs={segments} />
}
