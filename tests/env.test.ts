import { describe, expect, it } from 'vitest'

import { validateEnv } from '../src/lib/env'

const validEnv: Record<string, string> = {
  DATABASE_URI: 'file:./dev.db',
  PAYLOAD_SECRET: 'test-secret',
  NEXT_PUBLIC_SERVER_URL: 'http://localhost:3000',
  RESEND_API_KEY: 're_test',
  EMAIL_FROM: 'GenMedha Hub <hello@genmedhahub.com>',
  S3_ENDPOINT: 'https://s3.example.com',
  S3_BUCKET: 'bucket',
  S3_ACCESS_KEY_ID: 'key',
  S3_SECRET_ACCESS_KEY: 'secret',
  S3_REGION: 'eu-central-1',
  CALCOM_EMBED_URL: 'https://cal.com/genmedhahub',
  LISTMONK_URL: 'https://lists.example.com',
  LISTMONK_API_USER: 'user',
  LISTMONK_API_TOKEN: 'token',
  UMAMI_SCRIPT_URL: 'https://analytics.example.com/script.js',
  UMAMI_WEBSITE_ID: '00000000-0000-0000-0000-000000000000',
}

describe('validateEnv', () => {
  it('passes with a complete valid environment', () => {
    const env = validateEnv(validEnv)
    expect(env.PAYLOAD_SECRET).toBe('test-secret')
    expect(Object.keys(env)).toHaveLength(16)
  })

  it('throws naming the specific missing variable (PAYLOAD_SECRET)', () => {
    const incomplete = { ...validEnv }
    delete incomplete.PAYLOAD_SECRET
    expect(() => validateEnv(incomplete)).toThrowError(/PAYLOAD_SECRET/)
  })

  it('names every missing variable in a single error', () => {
    expect(() => validateEnv({})).toThrowError(
      /DATABASE_URI[\s\S]*PAYLOAD_SECRET[\s\S]*UMAMI_WEBSITE_ID/,
    )
  })

  it('rejects invalid URLs', () => {
    expect(() => validateEnv({ ...validEnv, NEXT_PUBLIC_SERVER_URL: 'not-a-url' })).toThrowError(
      /NEXT_PUBLIC_SERVER_URL/,
    )
  })
})
