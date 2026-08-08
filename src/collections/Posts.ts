import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor, publicReadPublished } from '../payload/access'
import {
  previewUrlForPath,
  publicCollectionVersions,
  standardPublicFields,
} from '../payload/fields/standardPublicFields'
import { estimateReadingTimeHook } from '../payload/hooks/collectionHooks'
import { autoSlugFromTitle } from '../payload/hooks/standardHooks'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', '_status', 'publishedAt'],
    livePreview: {
      url: ({ data }) => previewUrlForPath(`/insights/${data?.slug as string}`),
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
    { name: 'title', type: 'text', required: true, maxLength: 90 },
    { name: 'excerpt', type: 'textarea', required: true, maxLength: 200 },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 2,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      maxRows: 5,
    },
    { name: 'body', type: 'richText', required: true },
    {
      name: 'relatedService',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      required: true,
      minRows: 1,
    },
    {
      name: 'relatedMigrationPage',
      type: 'relationship',
      relationTo: 'migration-pages',
    },
    {
      name: 'readingTimeMin',
      type: 'number',
      min: 1,
      admin: { description: 'Auto-estimated by hook; editor-overridable.' },
    },
    ...standardPublicFields(),
  ],
  hooks: {
    beforeValidate: [autoSlugFromTitle, estimateReadingTimeHook],
  },
}
