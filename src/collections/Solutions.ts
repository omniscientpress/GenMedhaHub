import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor, publicReadPublished } from '../payload/access'
import { layoutField } from '../payload/blocks'
import { COMMERCE_MODEL_OPTIONS } from '../payload/constants'
import {
  previewUrlForPath,
  publicCollectionVersions,
  standardPublicFields,
} from '../payload/fields/standardPublicFields'
import { autoSlugFromTitle } from '../payload/hooks/standardHooks'

export const Solutions: CollectionConfig = {
  slug: 'solutions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'modelKey', '_status'],
    livePreview: {
      url: ({ data }) => previewUrlForPath(`/solutions/${data?.slug as string}`),
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
      name: 'modelKey',
      type: 'select',
      required: true,
      options: [...COMMERCE_MODEL_OPTIONS],
      admin: { description: 'Must match case-studies.commerceModels vocabulary (5.8.1).' },
    },
    {
      name: 'painSummary',
      type: 'textarea',
      required: true,
      maxLength: 200,
    },
    {
      name: 'capabilityChecklist',
      type: 'array',
      required: true,
      minRows: 3,
      fields: [
        { name: 'capability', type: 'text', required: true },
        { name: 'platformNote', type: 'text', required: true },
      ],
    },
    {
      name: 'recommendedPlatforms',
      type: 'relationship',
      relationTo: 'platform-hubs',
      hasMany: true,
      required: true,
      minRows: 1,
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
    beforeValidate: [autoSlugFromTitle],
  },
}
