import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor, publicReadPublished } from '../payload/access'
import { layoutField } from '../payload/blocks'
import { MARKET_REGION_OPTIONS } from '../payload/constants'
import {
  previewUrlForPath,
  publicCollectionVersions,
  standardPublicFields,
} from '../payload/fields/standardPublicFields'
import { autoSlugFromName, marketRegionUniqueHook } from '../payload/hooks/collectionHooks'

function marketContextMinLength(value: unknown): true | string {
  if (typeof value !== 'object' || value === null) return 'Market context is required.'
  const text = JSON.stringify(value)
  const plain = text.replace(/[{}"[\],:]/g, ' ').trim()
  if (plain.length < 400) {
    return `marketContext must be at least 400 characters (currently ~${plain.length}). ad:D4 anti-thinness.`
  }
  return true
}

export const Markets: CollectionConfig = {
  slug: 'markets',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'region', '_status'],
    livePreview: {
      url: ({ data }) => previewUrlForPath(`/markets/${data?.slug as string}`),
    },
  },
  access: {
    read: publicReadPublished,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  versions: publicCollectionVersions,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 60,
      admin: { description: 'ad:D4 — H1 source e.g. "India", "UAE & GCC".' },
    },
    {
      name: 'region',
      type: 'select',
      required: true,
      options: [...MARKET_REGION_OPTIONS],
      admin: { description: 'ad:D4 — one published document per region value.' },
    },
    {
      name: 'marketContext',
      type: 'richText',
      required: true,
      validate: marketContextMinLength,
      admin: {
        description:
          'ad:D4/D5 — demand landscape; logistical facts only, no physical-office claims.',
      },
    },
    {
      name: 'engagementLogistics',
      type: 'group',
      required: true,
      admin: { description: 'ad:D4 — all three sub-fields required.' },
      fields: [
        { name: 'timezoneOverlap', type: 'text', required: true },
        { name: 'contractingNotes', type: 'textarea', required: true },
        { name: 'paymentNotes', type: 'textarea', required: true },
      ],
    },
    {
      name: 'complianceNotes',
      type: 'richText',
      required: true,
      admin: { description: 'ad:D4/D7 — data-protection summary per region.' },
    },
    {
      name: 'proofLinks',
      type: 'array',
      maxRows: 6,
      admin: { description: 'ad:D4 — polymorphic proof; hides when empty at render.' },
      fields: [
        {
          name: 'doc',
          type: 'relationship',
          relationTo: ['case-studies', 'posts'],
          required: true,
        },
      ],
    },
    layoutField(1),
    ...standardPublicFields(),
  ],
  hooks: {
    beforeValidate: [autoSlugFromName, marketRegionUniqueHook],
  },
}
