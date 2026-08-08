import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor, publicReadPublished } from '../payload/access'
import { autoSlugFromName } from '../payload/hooks/collectionHooks'

export const OpenSourceProjects: CollectionConfig = {
  slug: 'open-source-projects',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'status'] },
  access: {
    read: publicReadPublished,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 60 },
    {
      name: 'repoUrl',
      type: 'text',
      required: true,
      admin: { description: 'Must be github.com host.' },
    },
    { name: 'description', type: 'textarea', required: true, maxLength: 200 },
    {
      name: 'platform',
      type: 'relationship',
      relationTo: 'platform-hubs',
      required: true,
    },
    { name: 'starsSnapshot', type: 'number', min: 0 },
    { name: 'asOf', type: 'date' },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Maintained', value: 'maintained' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    { name: 'slug', type: 'text', unique: true, admin: { hidden: true } },
  ],
  hooks: {
    beforeValidate: [autoSlugFromName],
  },
}
