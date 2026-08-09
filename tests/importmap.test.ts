import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

// The S3 plugin only loads when real credentials are present (production), but the
// import map is generated at build time and committed. When it was generated without
// S3 env vars the `S3ClientUploadHandler` entry was dropped, Payload logged
// "PayloadComponent not found in importMap", and the whole admin panel rendered blank
// in production while working locally. `pnpm generate:importmap` now forces S3 on so
// the committed map stays a superset — this test guards that.
//
// Read as text rather than importing: the map pulls in Payload client bundles that
// import .css, which Node cannot load in a plain vitest environment.
const importMapSource = readFileSync(
  path.resolve(import.meta.dirname, '../src/app/(payload)/admin/importMap.js'),
  'utf8',
)

describe('admin importMap', () => {
  it('includes the S3 client upload handler used when S3 storage is configured', () => {
    expect(importMapSource).toContain('@payloadcms/storage-s3/client#S3ClientUploadHandler')
  })

  it('includes the lexical RSC entrypoints', () => {
    expect(importMapSource).toContain('@payloadcms/richtext-lexical/rsc#RscEntryLexicalField')
  })
})
