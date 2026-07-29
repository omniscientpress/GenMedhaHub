// Validates the environment at server boot (Node.js runtime only).
// Skipped during `next build` so CI can build without real secrets.
export async function register() {
  if (
    process.env.NEXT_RUNTIME === 'nodejs' &&
    process.env.NEXT_PHASE !== 'phase-production-build'
  ) {
    const { validateEnv } = await import('./lib/env')
    validateEnv()
  }
}
