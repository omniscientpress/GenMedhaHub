import type { Metadata } from 'next'

import { getSolutionBySlug } from '@/lib/cms/fetch'
import { metadataForLayoutDocument, renderLayoutDocument } from '@/lib/cms/layout-route'

export const revalidate = 300

interface SolutionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params
  const solution = await getSolutionBySlug(slug)
  return metadataForLayoutDocument({
    document: solution,
    path: `/solutions/${slug}`,
    getTitle: (doc) => doc.title,
    getDescription: (doc) => doc.painSummary,
    getSeo: (doc) => doc.seo,
  })
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params
  const solution = await getSolutionBySlug(slug)

  return renderLayoutDocument({
    document: solution,
    path: `/solutions/${slug}`,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Solutions', href: '/solutions' },
      { label: solution?.title ?? slug, href: `/solutions/${slug}` },
    ],
    getTitle: (doc) => doc.title,
    getDescription: (doc) => doc.painSummary,
    getBlockContext: (doc) => ({ relatedCaseStudies: doc.relatedCaseStudies }),
  })
}
