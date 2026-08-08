import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor, publicReadPublished } from '../payload/access'
import { preventEditorPublish } from '../payload/hooks/accessHooks'
import { autoSlugFromTitle, forceThankYouNoindex } from '../payload/hooks/standardHooks'
import {
  previewUrlForPath,
  publicCollectionVersions,
  standardPublicFields,
} from '../payload/fields/standardPublicFields'
import { layoutField } from '../payload/blocks'
import { PAGE_KIND_OPTIONS } from '../payload/constants'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'routePath', 'pageKind', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data }) => previewUrlForPath((data?.routePath as string) ?? '/'),
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
      admin: { description: 'H1 source.' },
    },
    {
      name: 'routePath',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Full path e.g. /services — decouples slug from nested URLs (3.2.1).',
      },
    },
    {
      name: 'pageKind',
      type: 'select',
      required: true,
      options: [...PAGE_KIND_OPTIONS],
      admin: { description: 'Drives blueprint QA; no not-found kind — /404 is static.' },
    },
    layoutField(1),
    {
      name: 'journeyPosition',
      type: 'select',
      options: [
        { label: 'Problem aware', value: 'problem-aware' },
        { label: 'Solution evaluating', value: 'solution-evaluating' },
        { label: 'Proof seeking', value: 'proof-seeking' },
        { label: 'Researching', value: 'researching' },
        { label: 'Price checking', value: 'price-checking' },
        { label: 'Utility', value: 'utility' },
      ],
    },
    ...standardPublicFields(),
  ],
  hooks: {
    beforeValidate: [autoSlugFromTitle, forceThankYouNoindex],
    beforeChange: [preventEditorPublish],
  },
}
