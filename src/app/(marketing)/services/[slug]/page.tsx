import type { Metadata } from 'next'

import { getServiceBySlug } from '@/lib/cms/fetch'
import { metadataForLayoutDocument, renderLayoutDocument } from '@/lib/cms/layout-route'

export const revalidate = 300

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  return metadataForLayoutDocument({
    document: service,
    path: `/services/${slug}`,
    getTitle: (doc) => doc.title,
    getDescription: (doc) => doc.shortPitch,
    getSeo: (doc) => doc.seo,
  })
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  return renderLayoutDocument({
    document: service,
    path: `/services/${slug}`,
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: service?.title ?? slug, href: `/services/${slug}` },
    ],
    getTitle: (doc) => doc.title,
    getDescription: (doc) => doc.shortPitch,
    getBlockContext: (doc) => ({ relatedCaseStudies: doc.relatedCaseStudies }),
  })
}
