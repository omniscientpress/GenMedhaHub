import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor, publicReadPublished } from '../payload/access'
import { COMMERCE_MODEL_OPTIONS } from '../payload/constants'
import {
  previewUrlForPath,
  publicCollectionVersions,
  standardPublicFields,
} from '../payload/fields/standardPublicFields'
import { autoSlugFromOutcomeTitle } from '../payload/hooks/collectionHooks'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'outcomeTitle',
    defaultColumns: ['outcomeTitle', 'client', 'isPlaceholder', '_status'],
    livePreview: {
      url: ({ data }) => previewUrlForPath(`/work/${data?.slug as string}`),
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
      name: 'outcomeTitle',
      type: 'text',
      required: true,
      maxLength: 80,
      admin: { description: 'bp:4.13 — outcome-led headline, not client name.' },
    },
    { name: 'client', type: 'text', required: true, maxLength: 60 },
    { name: 'industry', type: 'text', required: true, maxLength: 60 },
    {
      name: 'platformFrom',
      type: 'relationship',
      relationTo: 'platform-hubs',
    },
    {
      name: 'platformTo',
      type: 'relationship',
      relationTo: 'platform-hubs',
      required: true,
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      required: true,
      minRows: 1,
      admin: { description: 'ad:D4 — single hasMany covers all five pillars.' },
    },
    {
      name: 'commerceModels',
      type: 'select',
      hasMany: true,
      required: true,
      options: [...COMMERCE_MODEL_OPTIONS],
      validate: (value) => {
        if (!value || (Array.isArray(value) && value.length < 1)) {
          return 'At least one commerce model is required.'
        }
        return true
      },
    },
    {
      name: 'markets',
      type: 'relationship',
      relationTo: 'markets',
      hasMany: true,
      maxRows: 3,
      admin: { description: 'ad:D4 — cross-references markets.proofLinks.' },
    },
    { name: 'challenge', type: 'richText', required: true },
    { name: 'approach', type: 'richText', required: true },
    { name: 'solution', type: 'richText', required: true },
    { name: 'results', type: 'richText', required: true },
    {
      name: 'metrics',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      admin: { description: 'bp:4.13 — context mandatory for every metric row.' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        { name: 'context', type: 'text', required: true },
      ],
    },
    {
      name: 'testimonial',
      type: 'relationship',
      relationTo: 'testimonials',
    },
    { name: 'liveUrl', type: 'text' },
    {
      name: 'gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      maxRows: 6,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'isPlaceholder',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      admin: { description: 'Build-in-public entries; excluded from headline claims (2.8).' },
    },
    ...standardPublicFields(),
  ],
  hooks: {
    beforeValidate: [autoSlugFromOutcomeTitle],
  },
}
