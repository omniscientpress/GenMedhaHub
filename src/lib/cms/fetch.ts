import { cache } from 'react'

import { getPayloadClient } from '@/lib/payload'
import type { CtaConfig, SeoDefault, Service, SiteSetting } from '@/payload-types'

type FetchOptions = {
  draft?: boolean
}

export const getServiceBySlug = cache(async (slug: string, options: FetchOptions = {}): Promise<Service | null> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
    draft: options.draft,
    overrideAccess: options.draft,
  })

  return result.docs[0] ?? null
})

export const getCtaConfig = cache(async (): Promise<CtaConfig | null> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'cta-config' }).catch(() => null)
})

export const getSeoDefaults = cache(async (): Promise<SeoDefault | null> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'seo-defaults' }).catch(() => null)
})

export const getSiteSettings = cache(async (): Promise<SiteSetting | null> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'site-settings' }).catch(() => null)
})
