import type { CollectionBeforeValidateHook } from 'payload'

import { PLATFORM_SLUG_NAMES } from '../constants'
import { slugify } from './slugify'

/** Enforce {source}-to-{target} slug from platform relationships (ch. 5.8.1). */
export const migrationPairSlugHook: CollectionBeforeValidateHook = async ({
  data,
  req,
  operation,
}) => {
  if (!data?.sourcePlatform || !data?.targetPlatform) return data

  const sourceId =
    typeof data.sourcePlatform === 'object' ? data.sourcePlatform.id : data.sourcePlatform
  const targetId =
    typeof data.targetPlatform === 'object' ? data.targetPlatform.id : data.targetPlatform

  if (sourceId === targetId) {
    throw new Error('targetPlatform must differ from sourcePlatform.')
  }

  const sourceDoc = await req.payload.findByID({
    collection: 'platform-hubs',
    id: sourceId as string | number,
  })
  const targetDoc = await req.payload.findByID({
    collection: 'platform-hubs',
    id: targetId as string | number,
  })

  const sourceSlug = PLATFORM_SLUG_NAMES[sourceDoc.slug] ?? sourceDoc.slug
  const targetSlug = PLATFORM_SLUG_NAMES[targetDoc.slug] ?? targetDoc.slug
  const expected = `${sourceSlug}-to-${targetSlug}`

  if (operation === 'update' && data.slug && data.slug !== expected) {
    throw new Error(`Migration pair slug must be "${expected}" — manual override blocked (5.8.1).`)
  }

  data.slug = expected
  return data
}

/** Block parentService cycles and grandparenting (ad:D4/D16). */
export const parentServiceGuardHook: CollectionBeforeValidateHook = async ({
  data,
  req,
  originalDoc,
}) => {
  if (!data?.parentService) return data

  const parentId =
    typeof data.parentService === 'object' ? data.parentService.id : data.parentService
  const selfId = originalDoc?.id ?? data.id

  if (selfId && parentId === selfId) {
    throw new Error('parentService cannot reference self.')
  }

  const parent = await req.payload.findByID({
    collection: 'services',
    id: parentId as string | number,
  })

  if (parent.parentService) {
    throw new Error('parentService target must be a top-level service (no grandparenting).')
  }

  return data
}

/** Exactly one published flagship platform hub (ch. 5.3.1). */
export const flagshipPlatformHook: CollectionBeforeValidateHook = async ({
  data,
  req,
  originalDoc,
}) => {
  if (data?.tier !== 'flagship') return data

  const existing = await req.payload.find({
    collection: 'platform-hubs',
    where: {
      and: [
        { tier: { equals: 'flagship' } },
        ...(originalDoc?.id ? [{ id: { not_equals: originalDoc.id } }] : []),
      ],
    },
    limit: 1,
  })

  if (existing.totalDocs > 0) {
    throw new Error('Exactly one platform hub may have tier=flagship (Medusa).')
  }

  return data
}

/** One published document per region value (ad:D4). */
export const marketRegionUniqueHook: CollectionBeforeValidateHook = async ({
  data,
  req,
  originalDoc,
}) => {
  if (!data?.region || data._status !== 'published') return data

  const existing = await req.payload.find({
    collection: 'markets',
    where: {
      and: [
        { region: { equals: data.region } },
        { _status: { equals: 'published' } },
        ...(originalDoc?.id ? [{ id: { not_equals: originalDoc.id } }] : []),
      ],
    },
    limit: 1,
  })

  if (existing.totalDocs > 0) {
    throw new Error(`A published market document already exists for region "${data.region}".`)
  }

  return data
}

/** Auto slug from name field variant. */
export const autoSlugFromName: CollectionBeforeValidateHook = ({ data, operation }) => {
  if (!data) return data
  const name = data.name as string | undefined
  if (name && (!data.slug || operation === 'create')) {
    data.slug = slugify(name)
  }
  return data
}

/** Auto slug from outcomeTitle for case studies. */
export const autoSlugFromOutcomeTitle: CollectionBeforeValidateHook = ({ data, operation }) => {
  if (!data) return data
  const title = data.outcomeTitle as string | undefined
  if (title && (!data.slug || operation === 'create')) {
    data.slug = slugify(title)
  }
  return data
}

/** Auto-estimate reading time from body (Posts). */
export const estimateReadingTimeHook: CollectionBeforeValidateHook = ({ data }) => {
  if (!data?.body || data.readingTimeMin) return data
  const text = JSON.stringify(data.body)
  const words = text.split(/\s+/).length
  data.readingTimeMin = Math.max(1, Math.ceil(words / 200))
  return data
}
