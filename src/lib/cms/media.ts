import type { Media } from '@/payload-types'

export function isPopulatedMedia(value: number | Media | null | undefined): value is Media {
  return typeof value === 'object' && value !== null && 'url' in value
}

export function mediaUrl(media: Media | null | undefined): string | null {
  if (!media?.url) return null
  if (media.url.startsWith('http')) return media.url
  const base = process.env.NEXT_PUBLIC_SERVER_URL ?? ''
  return base ? `${base.replace(/\/$/, '')}${media.url}` : media.url
}
