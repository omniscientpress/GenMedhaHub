import { describe, expect, it } from 'vitest'

import { runHealthChecks } from '../src/lib/health'

describe('runHealthChecks', () => {
  it('returns 200 with connected db when everything is healthy', async () => {
    const result = await runHealthChecks({
      payloadSecret: 'secret',
      checkDb: async () => [],
    })
    expect(result.statusCode).toBe(200)
    expect(result.body.status).toBe('ok')
    expect(result.body.db).toBe('connected')
    expect(result.body.payloadSecret).toBe(true)
    expect(result.body.deployMarker).toBe('admin-fix-v8-suspense')
    expect(result.body.timestamp).toBeTypeOf('string')
  })

  it('returns 503 when the db check fails', async () => {
    const result = await runHealthChecks({
      payloadSecret: 'secret',
      checkDb: async () => {
        throw new Error('connection refused')
      },
    })
    expect(result.statusCode).toBe(503)
    expect(result.body.status).toBe('error')
    expect(result.body.db).toBe('error')
    expect(result.body.error).toContain('connection refused')
  })

  it('returns 503 when PAYLOAD_SECRET is missing', async () => {
    const result = await runHealthChecks({
      payloadSecret: undefined,
      checkDb: async () => [],
    })
    expect(result.statusCode).toBe(503)
    expect(result.body.payloadSecret).toBe(false)
    expect(result.body.error).toContain('PAYLOAD_SECRET')
  })
})
