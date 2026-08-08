import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

// Derived only from the documented env vars (see src/lib/env.ts).
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? ''
const isStagingOrPreview = serverUrl.includes('staging') || serverUrl.includes('preview-')

const nextConfig: NextConfig = {
  output: 'standalone',
  // Keep sharp external so standalone traces native @img/* deps (see scripts/fix-standalone-sharp.mjs).
  serverExternalPackages: ['sharp'],
  // Standalone trace misses sharp's platform @img/* binaries (Payload Media uploads).
  outputFileTracingIncludes: {
    '/**/*': ['./node_modules/sharp/**/*', './node_modules/@img/**/*'],
  },
  async headers() {
    // Keep staging/preview deployments out of search indexes.
    if (!isStagingOrPreview) return []
    return [
      {
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ]
  },
}

export default withPayload(nextConfig)
