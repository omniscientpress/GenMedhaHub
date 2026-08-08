import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor, publicReadPublished } from '../payload/access'
import { layoutField } from '../payload/blocks'
import {
  previewUrlForPath,
  publicCollectionVersions,
  standardPublicFields,
} from '../payload/fields/standardPublicFields'
import { autoSlugFromTitle } from '../payload/hooks/standardHooks'

export const LeadMagnets: CollectionConfig = {
  slug: 'lead-magnets',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'listmonkListId', '_status'],
    livePreview: {
      url: ({ data }) => previewUrlForPath(`/resources/${data?.slug as string}`),
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
    { name: 'title', type: 'text', required: true, maxLength: 80 },
    {
      name: 'assetFile',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'PDF served via signed URL after capture (5.6.1).' },
    },
    layoutField(1),
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    {
      name: 'migrationPage',
      type: 'relationship',
      relationTo: 'migration-pages',
    },
    {
      name: 'listmonkListId',
      type: 'number',
      required: true,
      min: 1,
    },
    ...standardPublicFields(),
  ],
  hooks: {
    beforeValidate: [autoSlugFromTitle],
  },
}
