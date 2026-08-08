import type { Access, FieldAccess, PayloadRequest } from 'payload'

type UserWithRoles = {
  roles?: ('admin' | 'editor')[]
}

function userRoles(req: PayloadRequest): ('admin' | 'editor')[] {
  const user = req.user as UserWithRoles | null
  return user?.roles ?? []
}

export const isAdmin: Access = ({ req }) => userRoles(req).includes('admin')

export const isAdminOrEditor: Access = ({ req }) => {
  const roles = userRoles(req)
  return roles.includes('admin') || roles.includes('editor')
}

/** Editors create/edit drafts; only admins publish (ch. 5.9). */
export const canPublish: Access = ({ req }) => userRoles(req).includes('admin')

export const publicReadPublished: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}

export const adminOnlyField: FieldAccess = ({ req }) => userRoles(req).includes('admin')

export const publicCreateFormSubmissions: Access = () => true

export const adminReadFormSubmissions: Access = ({ req }) => userRoles(req).includes('admin')
