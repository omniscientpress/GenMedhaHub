import type { Metadata } from 'next'

import {
  metadataForCollectionOrCmsPage,
  renderCollectionOrCmsPage,
} from '@/lib/cms/collection-or-page'
import { getSolutionBySlug } from '@/lib/cms/fetch'

export const revalidate = 300

interface SolutionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params
  const solution = await getSolutionBySlug(slug)
  return metadataForCollectionOrCmsPage({
    document: solution,
    routePath: `/solutions/${slug}`,
    getTitle: (doc) => doc.title,
    getDescription: (doc) => doc.painSummary,
  })
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params
  const solution = await getSolutionBySlug(slug)
  const routePath = `/solutions/${slug}`

  return renderCollectionOrCmsPage({
    document: solution,
    routePath,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Solutions', href: '/solutions' },
      { label: solution?.title ?? slug, href: routePath },
    ],
    getTitle: (doc) => doc.title,
    getDescription: (doc) => doc.painSummary,
  })
}
