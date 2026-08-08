import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor, publicReadPublished } from '../payload/access'
import { layoutField } from '../payload/blocks'
import { PLATFORM_TIER_OPTIONS } from '../payload/constants'
import {
  previewUrlForPath,
  publicCollectionVersions,
  standardPublicFields,
} from '../payload/fields/standardPublicFields'
import { autoSlugFromName, flagshipPlatformHook } from '../payload/hooks/collectionHooks'

export const PlatformHubs: CollectionConfig = {
  slug: 'platform-hubs',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'tier', '_status'],
    livePreview: {
      url: ({ data }) => previewUrlForPath(`/platforms/${data?.slug as string}`),
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
      maxLength: 40,
      admin: { description: 'Canonical short name; drives slug rules (3.4.1).' },
    },
    {
      name: 'tier',
      type: 'select',
      required: true,
      options: [...PLATFORM_TIER_OPTIONS],
    },
    {
      name: 'positioningLine',
      type: 'textarea',
      required: true,
      maxLength: 160,
    },
    {
      name: 'economics',
      type: 'group',
      required: true,
      fields: [
        { name: 'costLine', type: 'text', required: true },
        { name: 'licenseNote', type: 'textarea', required: true },
        { name: 'source', type: 'text', required: true },
      ],
    },
    { name: 'eosDate', type: 'date' },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      required: true,
      minRows: 1,
    },
    {
      name: 'migrationPagesFrom',
      type: 'relationship',
      relationTo: 'migration-pages',
      hasMany: true,
      admin: { description: 'Denormalized cross-link list (3.7); updated via hook/seed.' },
    },
    {
      name: 'relatedSolutions',
      type: 'relationship',
      relationTo: 'solutions',
      hasMany: true,
    },
    layoutField(2),
    ...standardPublicFields(),
  ],
  hooks: {
    beforeValidate: [autoSlugFromName, flagshipPlatformHook],
  },
}
