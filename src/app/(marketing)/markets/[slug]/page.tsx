import type { Metadata } from 'next'

import type { CaseStudy } from '@/payload-types'

import { getMarketBySlug } from '@/lib/cms/fetch'
import { metadataForLayoutDocument, renderLayoutDocument } from '@/lib/cms/layout-route'

export const revalidate = 300

interface MarketPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: MarketPageProps): Promise<Metadata> {
  const { slug } = await params
  const market = await getMarketBySlug(slug)
  return metadataForLayoutDocument({
    document: market,
    path: `/markets/${slug}`,
    getTitle: (doc) => doc.name,
    getDescription: (doc) => `Serving ${doc.name} — engagement logistics and compliance notes.`,
    getSeo: (doc) => doc.seo,
  })
}

export default async function MarketPage({ params }: MarketPageProps) {
  const { slug } = await params
  const market = await getMarketBySlug(slug)

  return renderLayoutDocument({
    document: market,
    path: `/markets/${slug}`,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Markets', href: '/markets' },
      { label: market?.name ?? slug, href: `/markets/${slug}` },
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
