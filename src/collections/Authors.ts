import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrEditor, publicReadPublished } from '../payload/access'
import { autoSlugFromName } from '../payload/hooks/collectionHooks'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: { useAsTitle: 'name' },
  access: {
    read: publicReadPublished,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true, maxLength: 60 },
    { name: 'role', type: 'text', required: true, maxLength: 80 },
    { name: 'bio', type: 'textarea', required: true, maxLength: 400 },
    { name: 'headshot', type: 'upload', relationTo: 'media' },
    { name: 'socialUrl', type: 'text' },
    { name: 'slug', type: 'text', unique: true },
  ],
  hooks: { beforeValidate: [autoSlugFromName] },
}

function taxonomyFields(includeDescription: boolean) {
  const fields: CollectionConfig['fields'] = [
    { name: 'name', type: 'text', required: true, maxLength: 40, unique: true },
    { name: 'slug', type: 'text', required: true, unique: true },
  ]
  if (includeDescription) {
    fields.push({
      name: 'description',
      type: 'textarea',
      maxLength: 200,
      admin: { description: 'Categories only; internal reference.' },
    })
  }
  return fields
}

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: { useAsTitle: 'name' },
  access: {
    read: publicReadPublished,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: taxonomyFields(true),
  hooks: { beforeValidate: [autoSlugFromName] },
}

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: { useAsTitle: 'name' },
  access: {
    read: publicReadPublished,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: taxonomyFields(false),
  hooks: { beforeValidate: [autoSlugFromName] },
}
