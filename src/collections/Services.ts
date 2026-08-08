import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor, publicReadPublished } from '../payload/access'
import { layoutField } from '../payload/blocks'
import {
  SERVICE_CATEGORY_OPTIONS,
  SERVICE_ICON_OPTIONS,
  SERVICE_PILLAR_OPTIONS,
} from '../payload/constants'
import {
  previewUrlForPath,
  publicCollectionVersions,
  standardPublicFields,
} from '../payload/fields/standardPublicFields'
import { autoSlugFromTitle } from '../payload/hooks/standardHooks'
import { parentServiceGuardHook } from '../payload/hooks/collectionHooks'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'servicePillar', 'serviceCategory', '_status'],
    livePreview: {
      url: ({ data }) => previewUrlForPath(`/services/${data?.slug as string}`),
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
      maxLength: 60,
    },
    {
      name: 'servicePillar',
      type: 'select',
      required: true,
      options: [...SERVICE_PILLAR_OPTIONS],
      admin: { description: 'ad:D4 — nav grouping Commerce vs Build & Grow.' },
    },
    {
      name: 'serviceCategory',
      type: 'select',
      required: true,
      options: [...SERVICE_CATEGORY_OPTIONS],
      admin: { description: 'ad:D4/D16 — one service-taxonomy vocabulary site-wide.' },
    },
    {
      name: 'parentService',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        description: 'ad:D4/D16 — parent for future child services; none at launch.',
      },
    },
    {
      name: 'shortPitch',
      type: 'textarea',
      required: true,
      maxLength: 160,
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [...SERVICE_ICON_OPTIONS],
    },
    {
      name: 'engagementModels',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'priceFrom', type: 'text', required: true },
        { name: 'typicalDuration', type: 'text' },
      ],
    },
    {
      name: 'proofPoints',
      type: 'array',
      maxRows: 4,
      admin: { description: 'ad:D1/D2 — stack-coherence proof for Build & Grow services.' },
      fields: [{ name: 'text', type: 'textarea', maxLength: 120, required: true }],
    },
    {
      name: 'relatedCaseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      maxRows: 3,
    },
    layoutField(1),
    ...standardPublicFields(),
  ],
  hooks: {
    beforeValidate: [autoSlugFromTitle, parentServiceGuardHook],
  },
}
