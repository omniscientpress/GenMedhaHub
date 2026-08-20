import type { Metadata } from 'next'

import type { CaseStudy } from '@/payload-types'

import {
  metadataForCollectionOrCmsPage,
  renderCollectionOrCmsPage,
} from '@/lib/cms/collection-or-page'
import { getMarketBySlug } from '@/lib/cms/fetch'
import { isPublishedDocument } from '@/lib/cms/document'
import { renderLayoutDocument } from '@/lib/cms/layout-route'

export const revalidate = 300

interface MarketPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: MarketPageProps): Promise<Metadata> {
  const { slug } = await params
  const market = await getMarketBySlug(slug)
  return metadataForCollectionOrCmsPage({
    document: market,
    routePath: `/markets/${slug}`,
    getTitle: (doc) => doc.name,
    getDescription: (doc) => `Serving ${doc.name} — engagement logistics and compliance notes.`,
  })
}

export default async function MarketPage({ params }: MarketPageProps) {
  const { slug } = await params
  const market = await getMarketBySlug(slug)
  const routePath = `/markets/${slug}`

  if (isPublishedDocument(market) && market.layout?.length) {
    return renderLayoutDocument({
      document: market,
      path: routePath,
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Markets', href: '/markets' },
        { label: market.name, href: routePath },
      ],
      getTitle: (doc) => doc.name,
      getDescription: (doc) => `Serving ${doc.name}`,
      getBlockContext: (doc) => ({
        relatedCaseStudies:
          doc.proofLinks
            ?.filter((link) => link.doc.relationTo === 'case-studies')
            .map((link) => link.doc.value as number | CaseStudy) ?? null,
      }),
    })
  }

  return renderCollectionOrCmsPage({
    document: market,
    routePath,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Markets', href: '/markets' },
      { label: market?.name ?? slug, href: routePath },
    ],
    getTitle: (doc) => doc.name,
    getDescription: (doc) => `Serving ${doc.name}`,
  })
}
