import type { CollectionConfig } from 'payload'

// Minimal auth collection — full schema (roles, profile fields) is a later phase.
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [],
}
