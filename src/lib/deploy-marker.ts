/**
 * Source-level deploy marker — always present in /api/health as `deployMarker`.
 * Bump this string whenever admin/deploy fixes land so we can tell a real image
 * rebuild from a container restart that only reuses a cached BUILD_ID.
 */
export const DEPLOY_MARKER = 'admin-fix-v7-suspense'
