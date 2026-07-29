import path from 'node:path'
import { fileURLToPath } from 'node:url'
// sharp: Payload's image processing library (required for Media upload resizing).
import sharp from 'sharp'
import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
// @payloadcms/db-postgres: production database adapter (PostgreSQL 16).
import { postgresAdapter } from '@payloadcms/db-postgres'
// @payloadcms/db-sqlite: dev/CI-only database adapter (file: URL).
import { sqliteAdapter } from '@payloadcms/db-sqlite'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { runHealthChecks } from './lib/health'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseUri = process.env.DATABASE_URI ?? 'file:./dev.db'
const isPostgres =
  databaseUri.startsWith('postgres://') || databaseUri.startsWith('postgresql://')

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  // Fallback keeps `next build` (phase-production-build) working in CI without
  // secrets; real boot is guarded by src/instrumentation.ts env validation.
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: isPostgres
    ? postgresAdapter({
        pool: {
          connectionString: databaseUri,
        },
      })
    : sqliteAdapter({
        client: {
          url: databaseUri,
        },
      }),
  sharp,
  endpoints: [
    {
      path: '/health',
      method: 'get',
      handler: async (req) => {
        const result = await runHealthChecks({
          payloadSecret: process.env.PAYLOAD_SECRET,
          checkDb: () => req.payload.find({ collection: 'users', limit: 1 }),
        })
        return Response.json(result.body, { status: result.statusCode })
      },
    },
  ],
})
