# GenMedha Hub

Agency website platform — Phase 0 baseline: delivery machinery only (no design tokens,
collections, or marketing routes yet).

## Stack pins

- Next.js **16.2.x** (App Router, `output: 'standalone'`)
- Payload CMS **3.86.0** embedded via `withPayload` (all `@payloadcms/*` pinned to 3.86.0)
- React **19**, TypeScript **5.x** (`strict: true`)
- Tailwind CSS **v4** (CSS-first `@theme`, no `tailwind.config.js`), shadcn/ui placeholder (`components.json`)
- PostgreSQL 16 in production via `@payloadcms/db-postgres`; SQLite (`file:` URL) via `@payloadcms/db-sqlite` for **dev/CI only** — adapter selected by `DATABASE_URI` scheme
- Node **22** LTS production runtime (see `Dockerfile`)

## Setup

```bash
cp .env.example .env.local   # sqlite dev defaults included
pnpm install                 # postinstall generates Payload import map + types
pnpm dev                     # http://localhost:3000 (admin at /admin)
```

Useful scripts: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`,
`pnpm seed <email> <password>` (local only; `--allow-remote` required for Postgres),
`node scripts/check-env-docs.mjs`.

## Environments

| Environment | URL | Notes |
| --- | --- | --- |
| local | http://localhost:3000 | sqlite `dev.db` |
| preview | `https://preview-{branch}.staging.genmedhahub.com` | `X-Robots-Tag: noindex` |
| staging | https://staging.genmedhahub.com | `X-Robots-Tag: noindex` |
| production | https://genmedhahub.com | |

## CI (`.github/workflows/ci.yml`)

Stage gates — PRs run gates 1–4; `main` runs everything:

1. `pnpm lint` (blocking)
2. `pnpm typecheck` (blocking)
3. `pnpm test` (blocking)
4. `node scripts/check-env-docs.mjs` (blocking)
5. `pnpm build` (main only, blocking)
6. Docker build → Trivy (HIGH/CRITICAL block, MEDIUM warn) → push `ghcr.io/omniscientpress/genmedhahub:{sha}` + `:latest` (main only)
7. Dokploy webhook deploy + post-deploy health poll of `/api/health` (main only, blocking)

## Environment variables (16, validated at boot by `src/lib/env.ts` via zod)

`DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, `RESEND_API_KEY`,
`EMAIL_FROM`, `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`,
`S3_REGION`, `CALCOM_EMBED_URL`, `LISTMONK_URL`, `LISTMONK_API_USER`,
`LISTMONK_API_TOKEN`, `UMAMI_SCRIPT_URL`, `UMAMI_WEBSITE_ID`.

Validation runs in `src/instrumentation.ts` at server boot and is skipped during
`next build`. Boot fails fast naming every missing/invalid variable.
`scripts/check-env-docs.mjs` (CI gate 4) fails if any `process.env.X` used in `src/`
is not declared in `src/lib/env.ts` and documented in `.env.example`.

## Dependency policy

No new runtime dependency without a short justification comment above its import
(or here). Current runtime deps beyond the pinned stack:

- `graphql` — required peer for Payload's GraphQL endpoint
- `sharp` — Payload image processing (Media uploads)
- `zod` — env validation schema in `src/lib/env.ts`

Dev-only: `tsx` — run TS scripts (`scripts/seed.ts`) without a build step.
