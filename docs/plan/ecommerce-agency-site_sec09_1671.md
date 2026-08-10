## 9. Hosting, CI/CD, and Operations

The operational model is one VPS, one pipeline, one on-call habit: chapter 6's single Dockerfile runs on one Dokploy-managed virtual private server (VPS), builds happen in GitHub Actions (never on the server), backups leave the machine, and one hosted external monitor watches the watcher.

### 9.1 Target infrastructure topology

#### 9.1.1 Single Dokploy VPS

Only Traefik exposes ports 80/443; all other containers ride the internal Docker network. The app runs the standalone Next.js build (non-root, port 3000) per 6.1[^77^]; no Redis exists (6.9 invariant).

**VPS component inventory.**

| Component | Container/image | Resources (est.) | Port exposure | Backup policy |
|---|---|---|---|---|
| App (Next.js 16.2.x + Payload 3.86) | Prebuilt GHCR image, `output: 'standalone'` | 1 vCPU / 1–1.5 GB | Internal :3000; Traefik fronts it | Stateless — image is the artifact |
| PostgreSQL 16 (app) | Dokploy one-click `postgres:16` | 0.5 vCPU / 0.5–1 GB | Internal only | `pg_dump` nightly, 30-day retention, rclone to off-VPS S3[^79^] |
| Listmonk | `listmonk/listmonk` v6.x | ~0.5 GB | Admin internal; IP-allowlist | Via its Postgres dump |
| Listmonk Postgres | `postgres:16` | 256–512 MB | Internal only | Same schedule as app DB[^79^] |
| Umami container | `ghcr.io/umami-software/umami` | 256–512 MB | `analytics.genmedhahub.com`, auth | Stateless; data in its Postgres[^81^] |
| Umami Postgres | `postgres:16` | 256 MB | Internal only | Same schedule as app DB |
| Uptime Kuma container | `louislam/uptime-kuma` | 128–256 MB | `status.genmedhahub.com`, auth | Named volume synced weekly off-VPS[^82^] |
| MinIO (optional) | `minio/minio` | 512 MB + disk | Internal; console allowlisted | Only if R2 unavailable; weekly sync to S3[^56^] |
| Traefik (Dokploy-managed) | Dokploy-installed | ~128 MB | Public :80/:443, Let's Encrypt TLS | In Dokploy internal DB backup[^79^] |

Usage note: resource figures are planning estimates (judgment call); the three Postgres instances follow the 9.5 checklist.

**Sizing guidance (judgment call).** Start on a medium VPS (4 vCPU / 8 GB), not small (2 vCPU / 4 GB). The workload above idles at roughly 3–4.5 GB; on 4 GB there is no headroom for ISR revalidation bursts or Postgres checkpoints, and memory exhaustion is the most common self-host failure mode. Choose small only if Listmonk and Umami run elsewhere; the ~$15–25/mo delta is cheaper than one outage.

### 9.2 Environments and domains

#### 9.2.1 Four environments, one placeholder convention

`genmedhahub.com` denotes the production domain throughout. Isolation rules: each environment owns its database, R2 bucket (or prefix), and `PAYLOAD_SECRET`; production data flows downhill only as an anonymized dump; previews are seeded, never restored from production. SQLite is permitted locally and in CI only — never on the VPS (ch.6 invariant).

**Environment/domain matrix.**

| Env | URL pattern | Database | Data source | Deploy trigger |
|---|---|---|---|---|
| Local | `localhost:3000` | SQLite (dev) or local Postgres | `scripts/seed.ts` fixtures | `pnpm dev` |
| Branch preview | `preview-{branch}.staging.genmedhahub.com` | Per-branch Postgres, Dokploy-provisioned | Seed on first boot | PR open/sync |
| Staging | `staging.genmedhahub.com` | Shared staging Postgres | Curated seed + editor sandbox | Merge to `main` |
| Production | `genmedhahub.com` (+ `www` redirect) | Production Postgres, internal | Editorial content | Manual approval (9.4) |

Usage note: each environment sets `NEXT_PUBLIC_SERVER_URL` to its own URL; previews and staging emit `X-Robots-Tag: noindex`.

### 9.3 CI pipeline

#### 9.3.1 GitHub Actions builds, Dokploy only pulls

The VPS never compiles. A push to `main` runs install, lint, typecheck, tests, and the build in GitHub Actions, pushes one image to GitHub Container Registry (GHCR), and calls the Dokploy deploy webhook with the prebuilt tag[^78^]. Any "block" gate stops the pipeline; no deploy occurs.

**CI stage-gate table.**

| Stage | Tool | Trigger | Failure behavior |
|---|---|---|---|
| Install | `pnpm install --frozen-lockfile` | Every push/PR | Block |
| Lint | ESLint | Every push/PR | Block |
| Typecheck | `tsc --noEmit` (strict) | Every push/PR | Block |
| Unit tests | Vitest | Every push/PR | Block |
| Build | `next build` | Push to `main` | Block |
| Docker build + scan | `docker buildx` + Trivy | After build | Block; Trivy MEDIUM: warn |
| Push GHCR | Tag `app:{sha}` + `:latest` | After scan | Block |
| Deploy webhook | HTTPS POST to Dokploy deploy URL | `main` only | Block (retry ×3, then alert) |
| Post-deploy health check | `GET /api/health`, 200 within 60s | After webhook | Block release; arm 9.4 rollback |

Usage note: pull requests run the first four gates only (~5 minutes feedback, judgment call); image stages run on `main`.

**Figure — deploy pipeline (describe to designer).** Left-to-right: "Developer: `git push` to `main`" → "GitHub Actions: install → lint → typecheck → test → build" → diamond "All gates green?" (NO loops back to the developer) → "GHCR: image `app:{git-sha}`" → "Dokploy webhook: pulls image, swaps container" (annotate "build load stays off VPS"[^78^]) → "Traefik: TLS routes to healthy container" → terminal "Live on `genmedhahub.com`". Dashed side-lane: "PRs → gates 1–4 → Dokploy branch preview".

### 9.4 Deployment and rollback model

#### 9.4.1 Prebuilt-image deploys with an armed rollback

Deploys swap a running container for a prebuilt GHCR image. **Migrations:** `pnpm payload migrate` runs as a one-off step in the new container before Traefik cuts traffic; non-zero exit keeps the old container live and fails the deploy. **Health checks:** Dokploy polls `/api/health` (DB connectivity, `PAYLOAD_SECRET` presence); three consecutive failures mark the release unhealthy. **Release approval:** production requires manual GitHub environment approval; staging is automatic. **Rollback triggers (judgment-call thresholds):** health-check failure, LCP regression >20% post-deploy, error rate >1% over 5 minutes, or CMS write failure.

**Rollback runbook.** Order is conditional: for destructive migrations, restore the latest `pg_dump` (step 3) BEFORE redeploying the app image (step 2); for non-destructive rollbacks, redeploy first, then restore only if needed.

1. Identify the previous good tag `app:{previous-git-sha}` in the Actions run log. Verify: tag exists in GHCR.
2. Redeploy the Dokploy app service pinned to that tag (never `latest`). Verify: `/api/health` returns 200.
3. If the failed release ran destructive migrations, restore the latest `pg_dump` per 9.5 first. Verify: row counts match the pre-deploy snapshot.
4. Smoke-test homepage, one service page, /admin login, one form submission. Verify: all four pass.
5. Open a post-incident note within 24 hours (trigger, timeline, detection gap, preventive action). Verify: note linked from the failed CI run.

### 9.5 Data, backups, and disaster recovery

#### 9.5.1 Scheduled dumps off the VPS, tested restores

Dokploy backups run `pg_dump` on cron with retention and ship dumps via rclone to off-VPS S3 storage; only named volumes are backed up, and Dokploy's own internal database must be exported too[^79^][^80^].

**Backup/DR checklist.**

- [ ] `pg_dump` cron for all three Postgres instances (app, Listmonk, Umami): nightly 03:00 UTC, staggered 15 minutes.
- [ ] Retention: 30 daily, 8 weekly, 6 monthly dumps per database.
- [ ] rclone ships every dump to an off-VPS S3/R2 bucket, credentials separate from media storage[^79^].
- [ ] Dokploy internal database (app definitions, domains, Traefik state) exported weekly to the same bucket.
- [ ] Named-volumes-only rule enforced: no state on bind mounts or container layers.
- [ ] Uptime Kuma and Listmonk uploads volumes synced weekly off-VPS.
- [ ] Quarterly restore test: full app-database rebuild into a throwaway Dokploy instance, dated sign-off.
- [ ] Recovery objectives (judgment-call targets): recovery point objective ≤24 hours; recovery time objective ≤4 hours for full VPS replacement from image + dumps.

### 9.6 Monitoring and alerting

#### 9.6.1 Watch the watcher

Uptime Kuma monitors internal services, but a monitor that dies with its host reports nothing — one hosted external monitor (vendor open; examples: Better Stack, UptimeRobot, Checkly) watches production from outside[^82^][^83^]. Sentry is optional (judgment call).

**Monitoring/alert matrix.**

| Check | Tool | Threshold | Alert route |
|---|---|---|---|
| Homepage + key templates HTTP 200 | Uptime Kuma container | Down ≥2 min | Email + chat webhook |
| External production probe | Hosted external monitor | Down ≥2 min, 2 regions | SMS/email independent of VPS[^83^] |
| `/api/health` | Uptime Kuma | Non-200 ×3 | Email + chat |
| TLS certificate expiry | Uptime Kuma cert check | <14 days remaining | Email |
| CPU / RAM / disk | Dokploy resource metrics | CPU/RAM >85% for 15 min; disk >80% | Email + chat |
| Backup job success | Dokploy backup notifications | Any failure or >26h gap | Email |
| Umami event ingestion | Umami dashboard, weekly manual | Zero events >24h | Manual review |

Usage note: the external-monitor row is non-negotiable — the only signal that survives a total VPS loss[^83^].

### 9.7 Infrastructure security and maintenance

#### 9.7.1 Patch on a calendar, upgrade on a policy

**Patching:** OS security updates weekly via unattended-upgrades; base-image and dependency rebuilds monthly; Dokploy/Traefik security releases within 14 days. **Containers:** all images non-root (6.1); databases and admin UIs never bind public ports. **Network:** only Traefik exposes 80/443; SSH key-only, non-standard port, fail2ban. **Secrets:** only in the Dokploy env store and local `.env` per the 6.8 table; rotating `PAYLOAD_SECRET` or `S3_SECRET_ACCESS_KEY` is a rehearsed procedure. **Dependencies:** Dependabot weekly, grouped minors; majors need a recorded decision on the 6.1 record. **Upgrade policy:** stay on Next.js 16.2.x patches and Payload 3.x minors; adopt Payload 4.0 only once stable with a migration guide — a standing watch item[^57^].

### 9.8 Launch cutover and operational handover

#### 9.8.1 Cutover runbook, then metric-driven scaling

**Launch cutover runbook.**

1. Freeze content 24 hours ahead; run the final seed/import on staging. Verify: staging page count equals launch sitemap.
2. Lower DNS TTL to 300s at least 24 hours ahead. Verify: TTL visible via `dig`.
3. Point `genmedhahub.com` A/AAAA records at the VPS; add the domain in Dokploy; issue Let's Encrypt certificates. Verify: HTTPS 200, valid cert, on `/`, `/services`, `/work`, `/insights`, `/contact`.
4. Warm the cache: crawl the full sitemap twice to populate ISR. Verify: second-pass TTFB <800ms on key templates[^85^].
5. Smoke tests: form submission end-to-end (Postgres row + Resend email), /admin login, draft preview, 404. Verify: all pass.
6. Send one test pageview and one custom event. Verify: both visible in Umami within 5 minutes[^81^].
7. Run a manual backup of all three databases. Verify: new objects in the off-VPS backup bucket[^79^].
8. Arm rollback: previous GHCR tag identified; external monitor live. Verify: rollback step 1 output recorded.
9. Restore DNS TTL to 3,600s after 48 stable hours. Verify: no critical alerts in the window.

**Post-launch responsibilities:** weekly patch window, monthly dependency rebuild, quarterly restore test, alert-triage ownership transferred per the handover clause.

**Scaling triggers — metrics, not dates (judgment-call thresholds).** Move to managed Postgres when DB CPU exceeds 70% for 7 days, connections exceed 80% of `max_connections`, or a contract sets RPO below 24 hours. Retire MinIO for R2 when media exceeds 5 GB on VPS disk or egress charges appear. Add a second VPS (app/state split) when p95 response exceeds 1.5s for 7 days with CPU >70%, or a contract demands >99.9% availability.
