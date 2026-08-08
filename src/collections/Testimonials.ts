import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor, publicReadPublished } from '../payload/access'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: { useAsTitle: 'authorName', defaultColumns: ['authorName', 'company'] },
  access: {
    read: publicReadPublished,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    { name: 'quote', type: 'textarea', required: true, maxLength: 400 },
    { name: 'authorName', type: 'text', required: true, maxLength: 60 },
    { name: 'authorRole', type: 'text', required: true, maxLength: 80 },
    { name: 'company', type: 'text', required: true, maxLength: 60 },
    { name: 'headshot', type: 'upload', relationTo: 'media' },
    { name: 'platform', type: 'relationship', relationTo: 'platform-hubs' },
  ],
}
