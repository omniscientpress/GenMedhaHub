// CI gate: every `process.env.X` used in src/ must be declared in src/lib/env.ts
// AND documented in .env.example. Next.js built-ins are allowlisted.
// Run: node scripts/check-env-docs.mjs (also wired into .github/workflows/ci.yml).
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))

// Next.js / Node built-ins that are not project configuration.
// BUILD_ID is stamped by the Dockerfile at image build time (reported by /api/health to
// verify a deploy actually rebuilt) — deliberately not a boot-validated app setting.
const ALLOWLIST = new Set(['NEXT_PHASE', 'NEXT_RUNTIME', 'NODE_ENV', 'BUILD_ID'])

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry)
    if (statSync(full).isDirectory()) yield* walk(full)
    else if (/\.(ts|tsx|mts|mjs)$/.test(entry)) yield full
  }
}

// 1. Collect process.env.X usage across src/
const used = new Map() // var -> Set<file>
for (const file of walk(path.join(root, 'src'))) {
  const content = readFileSync(file, 'utf8')
  for (const match of content.matchAll(/process\.env\.([A-Z][A-Z0-9_]*)/g)) {
    const name = match[1]
    if (ALLOWLIST.has(name)) continue
    if (!used.has(name)) used.set(name, new Set())
    used.get(name).add(path.relative(root, file))
  }
}

// 2. Declared vars in src/lib/env.ts (schema keys look like `  KEY: z.`)
const envTs = readFileSync(path.join(root, 'src/lib/env.ts'), 'utf8')
const declared = new Set([...envTs.matchAll(/^\s*([A-Z][A-Z0-9_]*):\s*z\./gm)].map((m) => m[1]))

// 3. Documented vars in .env.example (`KEY=...` lines)
const envExample = readFileSync(path.join(root, '.env.example'), 'utf8')
const documented = new Set([...envExample.matchAll(/^([A-Z][A-Z0-9_]*)=/gm)].map((m) => m[1]))

const failures = []
for (const [name, files] of used) {
  if (!declared.has(name)) {
    failures.push(`${name} used in ${[...files].join(', ')} but not declared in src/lib/env.ts`)
  }
  if (!documented.has(name)) {
    failures.push(`${name} used in ${[...files].join(', ')} but not documented in .env.example`)
  }
}

if (failures.length > 0) {
  console.error('check-env-docs FAILED:\n' + failures.map((f) => `  - ${f}`).join('\n'))
  process.exit(1)
}

console.log(
  `check-env-docs OK: ${used.size} env var(s) in src/ all declared in src/lib/env.ts and .env.example`,
)
