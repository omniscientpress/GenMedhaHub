// Minimal seed: create an initial admin user via the Payload local API.
// Usage: pnpm seed <email> <password> [--allow-remote]
//
// Safety: refuses to run against a postgres DATABASE_URI (i.e. any remote/shared
// database) unless --allow-remote is passed explicitly.

// Load env like Next.js would (.env.local first, then .env) — no dotenv dependency.
// This must happen BEFORE importing the Payload config (which reads process.env),
// hence the dynamic imports below.
for (const file of ['.env.local', '.env']) {
  try {
    process.loadEnvFile(file)
  } catch {
    // file missing — fine
  }
}

const args = process.argv.slice(2).filter((a) => a !== '--allow-remote')
const allowRemote = process.argv.includes('--allow-remote')
const [email, password] = args

if (!email || !password) {
  console.error('Usage: pnpm seed <email> <password> [--allow-remote]')
  process.exit(1)
}

const databaseUri = process.env.DATABASE_URI ?? ''
const isPostgres =
  databaseUri.startsWith('postgres://') || databaseUri.startsWith('postgresql://')
if (isPostgres && !allowRemote) {
  console.error(
    `Refusing to seed: DATABASE_URI (${databaseUri.slice(0, 30)}...) is a remote Postgres database.\n` +
      'Pass --allow-remote if you really mean to do this.',
  )
  process.exit(1)
}

const { getPayload } = await import('payload')
const { default: config } = await import('../src/payload.config')

const payload = await getPayload({ config })

const existing = await payload.find({
  collection: 'users',
  where: { email: { equals: email } },
  limit: 1,
})

if (existing.totalDocs > 0) {
  console.log(`User ${email} already exists — nothing to do.`)
} else {
  await payload.create({ collection: 'users', data: { email, password } })
  console.log(`Created admin user: ${email}`)
}

process.exit(0)

export {}
