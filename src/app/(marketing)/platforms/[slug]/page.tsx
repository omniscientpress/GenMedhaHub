import type { Metadata } from 'next'

import {
  metadataForCollectionOrCmsPage,
  renderCollectionOrCmsPage,
} from '@/lib/cms/collection-or-page'
import { getPlatformBySlug } from '@/lib/cms/fetch'

export const revalidate = 300

interface PlatformPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PlatformPageProps): Promise<Metadata> {
  const { slug } = await params
  const platform = await getPlatformBySlug(slug)
  return metadataForCollectionOrCmsPage({
    document: platform,
    routePath: `/platforms/${slug}`,
    getTitle: (doc) => doc.name,
    getDescription: (doc) => doc.positioningLine,
  })
}

export default async function PlatformPage({ params }: PlatformPageProps) {
  const { slug } = await params
  const platform = await getPlatformBySlug(slug)
  const routePath = `/platforms/${slug}`

  return renderCollectionOrCmsPage({
    document: platform,
    routePath,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Platforms', href: '/platforms' },
      { label: platform?.name ?? slug, href: routePath },
    ],
    getTitle: (doc) => doc.name,
    getDescription: (doc) => doc.positioningLine,
  })
}
