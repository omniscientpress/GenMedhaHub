import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlockRenderer } from '@/components/blocks/block-renderer'
import { Breadcrumbs } from '@/components/shell/breadcrumbs'
import { SiteShell } from '@/components/shell/site-shell'
import { getServiceBySlug } from '@/lib/cms/fetch'
import { buildPageMetadata } from '@/lib/cms/seo'

export const revalidate = 300

interface ServicePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) {
    return { title: 'Service not found' }
  }

  return buildPageMetadata({
    title: service.seo?.metaTitle?.trim() || service.title,
    description: service.seo?.metaDescription?.trim() || service.shortPitch,
    ogImage: service.seo?.ogImage,
    noindex: service.seo?.noindex,
    path: `/services/${service.slug}`,
  })
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service || service._status !== 'published') {
    notFound()
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: service.title, href: `/services/${service.slug}` },
  ]

  return (
    <SiteShell breadcrumbs={<Breadcrumbs segments={breadcrumbs} />}>
      <BlockRenderer blocks={service.layout} />
    </SiteShell>
  )
}
