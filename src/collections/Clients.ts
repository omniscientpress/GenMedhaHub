import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor, publicReadPublished } from '../payload/access'

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'kind', 'displayOrder'] },
  access: {
    read: publicReadPublished,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 60 },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'Client', value: 'client' },
        { label: 'Partner Badge', value: 'partner-badge' },
      ],
    },
    {
      name: 'badgeUrl',
      type: 'text',
      admin: { description: 'Required when kind=partner-badge.' },
    },
    { name: 'url', type: 'text' },
    { name: 'displayOrder', type: 'number' },
  ],
}
