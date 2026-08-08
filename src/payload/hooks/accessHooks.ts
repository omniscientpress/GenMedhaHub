import type { CollectionBeforeChangeHook } from 'payload'

function userRoles(req: { user?: { roles?: string[] } | null }): string[] {
  return (req.user as { roles?: string[] } | null)?.roles ?? []
}

/** Editors create/edit drafts only — cannot set _status to published (ch. 5.9). */
export const preventEditorPublish: CollectionBeforeChangeHook = ({ req, data }) => {
  if (data?._status === 'published' && !userRoles(req).includes('admin')) {
    throw new Error('Editors cannot publish — an admin must approve (ch. 5.9).')
  }
  return data
}
