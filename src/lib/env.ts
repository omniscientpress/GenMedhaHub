// Central validation of every environment variable the platform relies on.
// zod is used here (and by Payload internally) for schema validation — single source
// of truth for required env vars; see scripts/check-env-docs.mjs which keeps this
// file and .env.example in sync with actual process.env usage in src/.
import { z } from 'zod'

const envSchema = z.object({
  // postgres:// / postgresql:// in production, file:... for local sqlite dev
  DATABASE_URI: z.string().min(1),
  PAYLOAD_SECRET: z.string().min(1),
  NEXT_PUBLIC_SERVER_URL: z.url(),
  // Transactional email (Resend)
  RESEND_API_KEY: z.string().min(1),
  EMAIL_FROM: z.string().min(1),
  // S3-compatible object storage
  S3_ENDPOINT: z.string().min(1),
  S3_BUCKET: z.string().min(1),
  S3_ACCESS_KEY_ID: z.string().min(1),
  S3_SECRET_ACCESS_KEY: z.string().min(1),
  S3_REGION: z.string().min(1),
  // Cal.com scheduling embed
  CALCOM_EMBED_URL: z.url(),
  // Listmonk newsletter
  LISTMONK_URL: z.url(),
  LISTMONK_API_USER: z.string().min(1),
  LISTMONK_API_TOKEN: z.string().min(1),
  // Umami analytics
  UMAMI_SCRIPT_URL: z.url(),
  UMAMI_WEBSITE_ID: z.string().min(1),
})

export type Env = z.infer<typeof envSchema>

/**
 * Validates the environment. Throws an Error naming EVERY missing/invalid
 * variable. Pass an explicit `source` in tests.
 */
export function validateEnv(source: Record<string, string | undefined> = process.env): Env {
  const result = envSchema.safeParse(source)
  if (!result.success) {
    const problems = result.error.issues.map(
      (issue) => `  - ${issue.path.join('.')}: ${issue.message}`,
    )
    throw new Error(
      `Invalid environment configuration. Missing/invalid variables:\n${problems.join('\n')}`,
    )
  }
  return result.data
}
