import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor } from '../payload/access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { useAsTitle: 'filename' },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  upload: {
    staticDir: 'media',
    focalPoint: true,
    imageSizes: [
      { name: 'card', width: 800 },
      { name: 'hero', width: 1920 },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      maxLength: 125,
      admin: {
        description: 'Required at upload — frontend refuses images without alt (5.7, 6.7).',
      },
    },
    { name: 'caption', type: 'text', maxLength: 200 },
    { name: 'credit', type: 'text', maxLength: 120 },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Document', value: 'document' },
        { label: 'Video Embed Poster', value: 'video-embed-poster' },
      ],
    },
  ],
}
