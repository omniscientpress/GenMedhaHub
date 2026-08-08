import type { CollectionConfig, Field } from 'payload'

import { setPublishedAtOnPublish } from '../hooks/standardHooks'

/** Standard public-document field set (ch. 5.1.1). */
export function standardPublicFields(): Field[] {
  return [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Lowercase-hyphen URL segment; auto-generated from title on create (ch. 3.4.1).',
      },
    },
    {
      name: 'seo',
      type: 'group',
      admin: { description: 'Standard set (5.1.1) — meta tags and OG image.' },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          maxLength: 60,
          admin: { description: '≤60 chars; falls back to seo-defaults titleTemplate.' },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
          admin: { description: '≤160 chars; falls back to seo-defaults.' },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: { description: '1200×630 OG image; falls back to site-settings.defaultOgImage.' },
        },
        {
          name: 'noindex',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Exclude from search indexes when checked.' },
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Set once on first publish by hook; exposed for schema dateModified (5.1.1).',
      },
      hooks: { beforeChange: [setPublishedAtOnPublish] },
    },
  ]
}

export const publicCollectionVersions: NonNullable<CollectionConfig['versions']> = {
  drafts: {
    autosave: { interval: 375 },
  },
  maxPerDoc: 50,
}

/** Live Preview URL via Next.js Draft Mode (ch. 5.9). Renderers ship in P3. */
export function previewUrlForPath(path: string) {
  const base = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'
  return `${base}/api/draft?path=${encodeURIComponent(path)}`
}
