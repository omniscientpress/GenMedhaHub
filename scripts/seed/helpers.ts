import type { Config } from '../../src/payload-types'

type CollectionSlug = keyof Config['collections']
type GlobalSlug = keyof Config['globals']

/** Minimal Lexical rich-text document for seed placeholders. */
export function richText(text: string) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              version: 1,
            },
          ],
        },
      ],
    },
  }
}

/** Repeat text to satisfy minLength validators (e.g. markets marketContext 400 chars). */
export function padText(base: string, minLength: number): string {
  let out = base
  while (out.length < minLength) out += ` ${base}`
  return out.slice(0, minLength + base.length)
}

export function heroBlock(headline: string, subhead?: string) {
  return {
    blockType: 'hero' as const,
    headline,
    subhead,
    variant: 'default' as const,
    ctaKey: 'book-call' as const,
  }
}

export function ctaBandBlock(heading: string) {
  return {
    blockType: 'ctaBand' as const,
    heading,
    ctaKey: 'book-call' as const,
  }
}

export async function upsertByWhere<T extends Record<string, unknown>>(
  payload: import('payload').Payload,
  collection: CollectionSlug,
  where: import('payload').Where,
  data: T,
): Promise<{ id: string | number; created: boolean }> {
  const existing = await payload.find({
    collection,
    where,
    limit: 1,
    overrideAccess: true,
  })
  if (existing.docs[0]) {
    return { id: existing.docs[0].id, created: false }
  }
  const doc = await payload.create({
    collection,
    data: { ...data, _status: 'published' },
    draft: false,
    overrideAccess: true,
  })
  return { id: doc.id, created: true }
}

export async function upsertBySlug<T extends Record<string, unknown>>(
  payload: import('payload').Payload,
  collection: CollectionSlug,
  slug: string,
  data: T,
): Promise<{ id: string | number; created: boolean }> {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  })
  if (existing.docs[0]) {
    return { id: existing.docs[0].id, created: false }
  }
  const doc = await payload.create({
    collection,
    data: { ...data, slug, _status: 'published' },
    draft: false,
    overrideAccess: true,
  })
  return { id: doc.id, created: true }
}

export async function upsertGlobal(
  payload: import('payload').Payload,
  slug: GlobalSlug,
  data: Record<string, unknown>,
) {
  await payload.updateGlobal({ slug, data })
}
