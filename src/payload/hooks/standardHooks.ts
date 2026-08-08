import type { CollectionBeforeValidateHook, FieldHook } from 'payload'

import { slugify } from './slugify'

/** Auto-generate slug from title when slug is empty (ch. 5.8.1). */
export const autoSlugFromTitle: CollectionBeforeValidateHook = ({ data, operation }) => {
  if (!data) return data
  const title = data.title as string | undefined
  if (title && (!data.slug || operation === 'create')) {
    data.slug = slugify(title)
  }
  return data
}

/** Set publishedAt once on first publish; read-only thereafter. */
export const setPublishedAtOnPublish: FieldHook = ({ value, data, operation }) => {
  if (operation === 'create' || operation === 'update') {
    if (data?._status === 'published' && !value) {
      return new Date().toISOString()
    }
  }
  return value
}

/** Force noindex for thank-you pages (ch. 5.3.1). */
export const forceThankYouNoindex: CollectionBeforeValidateHook = ({ data }) => {
  if (data?.pageKind === 'thank-you' && data.seo) {
    data.seo.noindex = true
  }
  return data
}
