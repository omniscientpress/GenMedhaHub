import { cache } from 'react'

import { getPayloadClient } from '@/lib/payload'
import type {
  CaseStudy,
  CtaConfig,
  Market,
  MigrationPage,
  Navigation,
  Page,
  PlatformHub,
  Post,
  SeoDefault,
  Service,
  SiteSetting,
  Solution,
} from '@/payload-types'

type FetchOptions = {
  draft?: boolean
}

async function findPublishedBySlug<T extends { slug: string }>(
  collection:
    | 'services'
    | 'platform-hubs'
    | 'solutions'
    | 'markets'
    | 'case-studies'
    | 'posts'
    | 'migration-pages',
  slug: string,
  options: FetchOptions = {},
): Promise<T | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
    draft: options.draft,
    overrideAccess: options.draft,
  })

  return (result.docs[0] as unknown as T | undefined) ?? null
}

export const getServiceBySlug = cache((slug: string, options?: FetchOptions) =>
  findPublishedBySlug<Service>('services', slug, options),
)

export const getPlatformBySlug = cache((slug: string, options?: FetchOptions) =>
  findPublishedBySlug<PlatformHub>('platform-hubs', slug, options),
)

export const getSolutionBySlug = cache((slug: string, options?: FetchOptions) =>
  findPublishedBySlug<Solution>('solutions', slug, options),
)

export const getMarketBySlug = cache((slug: string, options?: FetchOptions) =>
  findPublishedBySlug<Market>('markets', slug, options),
)

export const getCaseStudyBySlug = cache((slug: string, options?: FetchOptions) =>
  findPublishedBySlug<CaseStudy>('case-studies', slug, options),
)

export const getPostBySlug = cache((slug: string, options?: FetchOptions) =>
  findPublishedBySlug<Post>('posts', slug, options),
)

export const getMigrationPageBySlug = cache((slug: string, options?: FetchOptions) =>
  findPublishedBySlug<MigrationPage>('migration-pages', slug, options),
)

export const getPageByRoutePath = cache(async (routePath: string, options: FetchOptions = {}): Promise<Page | null> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    where: { routePath: { equals: routePath } },
    depth: 2,
    limit: 1,
    draft: options.draft,
    overrideAccess: options.draft,
  })

  return result.docs[0] ?? null
})

export const getNavigation = cache(async (): Promise<Navigation | null> => {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'navigation' }).catch(() => null)
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

export const getTrustStripClients = cache(async () => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'clients',
    where: { kind: { equals: 'client' } },
    sort: 'displayOrder',
    depth: 1,
    limit: 12,
  })
  return result.docs
})

export const getTrustStripPartnerBadges = cache(async () => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'clients',
    where: { kind: { equals: 'partner-badge' } },
    sort: 'displayOrder',
    depth: 1,
    limit: 12,
  })
  return result.docs
})

export const getTrustStripOpenSource = cache(async () => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'open-source-projects',
    where: { status: { not_equals: 'archived' } },
    sort: '-starsSnapshot',
    depth: 1,
    limit: 8,
  })
  return result.docs
})
