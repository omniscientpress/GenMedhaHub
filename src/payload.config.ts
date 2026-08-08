import path from 'node:path'
import { fileURLToPath } from 'node:url'
// @payloadcms/plugin-form-builder: Forms + FormSubmissions collections (ch. 5.6.1).
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
// @payloadcms/db-postgres: production database adapter (PostgreSQL 16).
import { postgresAdapter } from '@payloadcms/db-postgres'
// @payloadcms/db-sqlite: dev/CI-only database adapter (file: URL).
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
// @payloadcms/storage-s3: Media uploads to S3-compatible storage (R2, ch. 5.7).
import { s3Storage } from '@payloadcms/storage-s3'
// sharp: Payload's image processing library (required for Media upload resizing).
import sharp from 'sharp'

import { allCollections, Users } from './collections'
import { CtaConfig, Navigation, Redirects, SeoDefaults, SiteSettings } from './globals'
import { runHealthChecks } from './lib/health'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseUri = process.env.DATABASE_URI ?? 'file:./dev.db'
const isPostgres =
  databaseUri.startsWith('postgres://') || databaseUri.startsWith('postgresql://')

/** S3 plugin only when real credentials are set — placeholders keep local `media/` storage. */
function isRealS3Configured(): boolean {
  const endpoint = process.env.S3_ENDPOINT ?? ''
  const bucket = process.env.S3_BUCKET ?? ''
  const accessKey = process.env.S3_ACCESS_KEY_ID ?? ''
  const secretKey = process.env.S3_SECRET_ACCESS_KEY ?? ''
  if (!endpoint || !bucket || !accessKey || !secretKey) return false
  if (accessKey === 'placeholder' || secretKey === 'placeholder') return false
  if (endpoint.includes('example.com')) return false
  return true
}

const s3Configured = isRealS3Configured()

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: allCollections,
  globals: [SiteSettings, Navigation, SeoDefaults, Redirects, CtaConfig],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: isPostgres
    ? postgresAdapter({
        pool: { connectionString: databaseUri },
      })
    : sqliteAdapter({
        client: { url: databaseUri },
      }),
  sharp,
  plugins: [
    formBuilderPlugin({
      fields: {
        payment: false,
      },
      formSubmissionOverrides: {
        access: {
          create: () => true,
          read: ({ req }) =>
            ((req.user as { roles?: string[] } | null)?.roles ?? []).includes('admin'),
        },
      },
    }),
    ...(s3Configured
      ? [
          s3Storage({
            collections: {
              media: true,
            },
            bucket: process.env.S3_BUCKET!,
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID!,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
              },
              region: process.env.S3_REGION ?? 'auto',
              endpoint: process.env.S3_ENDPOINT!,
              forcePathStyle: true,
            },
          }),
        ]
      : []),
  ],
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
