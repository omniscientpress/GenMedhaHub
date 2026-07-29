import type { CollectionConfig } from 'payload'

// Minimal upload collection — image sizes/focal point etc. are a later phase.
export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: true,
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
