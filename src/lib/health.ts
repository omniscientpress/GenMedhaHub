// Health-check logic for GET /api/health, factored out of the Payload endpoint
// handler so it is unit-testable without booting Payload (see tests/health.test.ts).

export interface HealthBody {
  status: 'ok' | 'error'
  db: 'connected' | 'error'
  payloadSecret: boolean
  error?: string
  timestamp: string
}

export interface HealthResult {
  statusCode: 200 | 503
  body: HealthBody
}

export async function runHealthChecks(options: {
  payloadSecret: string | undefined
  checkDb: () => Promise<unknown>
}): Promise<HealthResult> {
  const failures: string[] = []

  const payloadSecret = Boolean(options.payloadSecret)
  if (!payloadSecret) failures.push('payloadSecret: PAYLOAD_SECRET is not set')

  let db: HealthBody['db'] = 'connected'
  try {
    await options.checkDb()
  } catch (err) {
    db = 'error'
    failures.push(`db: ${err instanceof Error ? err.message : 'unknown database error'}`)
  }

  const ok = payloadSecret && db === 'connected'
  return {
    statusCode: ok ? 200 : 503,
    body: {
      status: ok ? 'ok' : 'error',
      db,
      payloadSecret,
      ...(failures.length > 0 ? { error: failures.join('; ') } : {}),
      timestamp: new Date().toISOString(),
    },
  }
}
