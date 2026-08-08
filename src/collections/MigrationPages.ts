import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor, publicReadPublished } from '../payload/access'
import {
  previewUrlForPath,
  publicCollectionVersions,
  standardPublicFields,
} from '../payload/fields/standardPublicFields'
import { autoSlugFromTitle } from '../payload/hooks/standardHooks'
import { migrationPairSlugHook } from '../payload/hooks/collectionHooks'

export const MigrationPages: CollectionConfig = {
  slug: 'migration-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status'],
    livePreview: {
      url: ({ data }) => previewUrlForPath(`/migrate/${data?.slug as string}`),
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
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 80,
    },
    {
      name: 'sourcePlatform',
      type: 'relationship',
      relationTo: 'platform-hubs',
      required: true,
    },
    {
      name: 'targetPlatform',
      type: 'relationship',
      relationTo: 'platform-hubs',
      required: true,
    },
    {
      name: 'hero',
      type: 'group',
      required: true,
      fields: [
        { name: 'headline', type: 'text', required: true, maxLength: 80 },
        { name: 'subhead', type: 'textarea', required: true, maxLength: 200 },
      ],
    },
    {
      name: 'costOfStaying',
      type: 'richText',
      required: true,
      admin: { description: 'bp:4.11 — quantified cost of status quo; sourced math only.' },
    },
    {
      name: 'urgencyAnchor',
      type: 'group',
      required: true,
      fields: [
        { name: 'date', type: 'date', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'source', type: 'text', required: true },
      ],
    },
    {
      name: 'tcoBlock',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'comparisonRows',
          type: 'array',
          required: true,
          fields: [
            { name: 'item', type: 'text', required: true },
            { name: 'sourceCost', type: 'text', required: true },
            { name: 'targetCost', type: 'text', required: true },
            { name: 'note', type: 'text' },
          ],
        },
        { name: 'methodologyNote', type: 'textarea', required: true },
      ],
    },
    {
      name: 'cutoverSteps',
      type: 'array',
      required: true,
      minRows: 5,
      maxRows: 12,
      fields: [
        { name: 'stepTitle', type: 'text', required: true },
        { name: 'detail', type: 'textarea', required: true },
        { name: 'durationWeeks', type: 'text', required: true },
      ],
    },
    {
      name: 'rollbackPlan',
      type: 'richText',
      required: true,
    },
    {
      name: 'seoPreservation',
      type: 'array',
      required: true,
      minRows: 3,
      fields: [{ name: 'action', type: 'text', required: true }],
    },
    {
      name: 'timelineBands',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 4,
      fields: [
        { name: 'band', type: 'text', required: true },
        { name: 'scope', type: 'text', required: true },
        { name: 'priceFrom', type: 'text', required: true },
      ],
    },
    {
      name: 'whenNotToMigrate',
      type: 'richText',
      required: true,
      admin: { description: 'bp:4.11 — honest counter-cases; never empty.' },
    },
    {
      name: 'faqs',
      type: 'array',
      required: true,
      minRows: 4,
      maxRows: 10,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'richText', required: true },
      ],
    },
    {
      name: 'gatedAsset',
      type: 'relationship',
      relationTo: 'lead-magnets',
    },
    {
      name: 'relatedCaseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      maxRows: 3,
    },
    ...standardPublicFields(),
  ],
  hooks: {
    beforeValidate: [autoSlugFromTitle, migrationPairSlugHook],
  },
}
