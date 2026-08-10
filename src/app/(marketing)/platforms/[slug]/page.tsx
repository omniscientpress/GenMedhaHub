import type { Metadata } from 'next'

import { getPlatformBySlug } from '@/lib/cms/fetch'
import { metadataForLayoutDocument, renderLayoutDocument } from '@/lib/cms/layout-route'

export const revalidate = 300

interface PlatformPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PlatformPageProps): Promise<Metadata> {
  const { slug } = await params
  const platform = await getPlatformBySlug(slug)
  return metadataForLayoutDocument({
    document: platform,
    path: `/platforms/${slug}`,
    getTitle: (doc) => doc.name,
    getDescription: (doc) => doc.positioningLine,
    getSeo: (doc) => doc.seo,
  })
}

export default async function PlatformPage({ params }: PlatformPageProps) {
  const { slug } = await params
  const platform = await getPlatformBySlug(slug)

  return renderLayoutDocument({
    document: platform,
    path: `/platforms/${slug}`,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Platforms', href: '/platforms' },
      { label: platform?.name ?? slug, href: `/platforms/${slug}` },
    ],
    getTitle: (doc) => doc.name,
    getDescription: (doc) => doc.positioningLine,
  })
}
