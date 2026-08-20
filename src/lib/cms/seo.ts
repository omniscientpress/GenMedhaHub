import type { Metadata } from 'next'

import { getSeoDefaults, getSiteSettings } from '@/lib/cms/fetch'
import { isPopulatedMedia, mediaUrl } from '@/lib/cms/media'
import type { Media } from '@/payload-types'

interface PageSeoInput {
  title: string
  description?: string | null
  ogImage?: number | Media | null
  noindex?: boolean | null
  path?: string
}

function applyTitleTemplate(title: string, template: string): string {
  if (template.includes('%s')) {
    return template.replace('%s', title)
  }
  return `${title} · ${template}`
}

export async function buildPageMetadata(input: PageSeoInput): Promise<Metadata> {
  const [seoDefaults, siteSettings] = await Promise.all([getSeoDefaults(), getSiteSettings()])
  const template = seoDefaults?.titleTemplate ?? '%s · GenMedha Hub'
  const siteName = seoDefaults?.siteName ?? siteSettings?.brandName ?? 'GenMedha Hub'

  const title = applyTitleTemplate(input.title, template)
  const description =
    input.description?.trim() ||
    seoDefaults?.defaultMetaDescription ||
    siteSettings?.tagline ||
    'GenMedha Hub — commerce engineering, migration, and Build & Grow app development.'

  let ogImageUrl: string | undefined
  if (isPopulatedMedia(input.ogImage)) {
    ogImageUrl = mediaUrl(input.ogImage) ?? undefined
  } else if (siteSettings?.defaultOgImage && isPopulatedMedia(siteSettings.defaultOgImage)) {
    ogImageUrl = mediaUrl(siteSettings.defaultOgImage) ?? undefined
  }

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'
  const canonical = input.path ? new URL(input.path, serverUrl).toString() : undefined

  return {
    title,
    description,
    ...(input.noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title,
      description,
      siteName,
      type: 'website',
      ...(canonical ? { url: canonical } : {}),
      ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
    },
    ...(canonical ? { alternates: { canonical } } : {}),
  }
}
