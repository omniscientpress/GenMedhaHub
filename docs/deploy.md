# Deploying genmedha.in (Dokploy)

**Do not start from scratch.**

## Root cause of the blank production admin (fixed in v9)

The admin panel worked locally but rendered a blank page (HTTP 200) on
`https://genmedha.in/admin`. Cause:

- `src/app/(payload)/admin/importMap.js` is generated at build time and committed
- The S3 storage plugin only loads when **real** credentials are set — true in
  production, false locally (`.env.example` uses placeholders)
- So the committed map was generated **without** S3 and lacked
  `@payloadcms/storage-s3/client#S3ClientUploadHandler`
- In production Payload logged `PayloadComponent not found in importMap`, the client
  config failed to serialize, and the admin page slot came back `null` → blank page

Reproduced and verified locally: with the entry missing the admin renders blank
(3 `parallelRouterKey`); with it present the login/create-first-user form renders
(4 `parallelRouterKey`).

`pnpm generate:importmap` now forces S3 on so the committed map is always a superset,
and `tests/importmap.test.ts` fails if the entry disappears again.

---

## START HERE

### 1. Check what is live

```bash
curl -s https://genmedha.in/api/health
```

You need **both**:

```json
{
  "status": "ok",
  "db": "connected",
  "buildId": "admin-fix-v8",
  "deployMarker": "admin-fix-v8-suspense"
}
```

| Field | Meaning |
| --- | --- |
| Missing `deployMarker` or not `admin-fix-v8-suspense` | **Stale source** — rebuild from latest `main` with **no cache** |
| `buildId` only (no matching marker) | Image was tagged/reused without rebuilding app code |
| `502 Bad Gateway` | Container crash loop / Traefik has no healthy backend |

### 2. Force a real rebuild in Dokploy

Webhook “success” often only **restarts** the old container.

1. Dokploy → app that serves **genmedha.in** (may be named staging)
2. **General**: branch **`main`**, build type **Dockerfile**, path **`Dockerfile`**, context **`/`**
3. **Environment**: all 16 vars; `NEXT_PUBLIC_SERVER_URL=https://genmedha.in`
4. **Advanced → Run Command**: **empty**
5. **Deploy / Rebuild** with **no cache** / clear build cache
6. Watch **Build logs** — must run `pnpm build` (not just restart)
7. Confirm health shows `deployMarker: admin-fix-v8-suspense`
8. Open **https://genmedha.in/admin/login**

### 3. If containers flip between `starting` / `unhealthy`

That is Docker HEALTHCHECK killing the task (exit 143), not a host port conflict.
Many apps can use internal port 3000; Traefik routes by hostname.

```bash
docker ps --format "table {{.Names}}\t{{.Status}}" | grep genmedha
```

You want **one** replica: `Up ... (healthy)`.

Latest `main` uses a longer healthcheck start-period (90s). Rebuild to pick it up.

### 4. Confirm admin RSC (optional)

```bash
curl -s https://genmedha.in/admin/login | grep -o 'parallelRouterKey' | wc -l
```

- **4** = page slot present (login should render)
- **3** = slot missing (blank admin — stale image)

---

## Dokploy build settings

| Setting | Value |
| --- | --- |
| Branch | `main` |
| Build type | Dockerfile |
| Dockerfile | `Dockerfile` |
| Context | `/` |
| Build arg | `NEXT_PUBLIC_SERVER_URL=https://genmedha.in` |

Optional: `BUILD_ID=admin-fix-v8`

---

## Not a host port conflict

Dokploy/Swarm containers listen on **internal** port 3000. Host port 3000 is usually
Dokploy’s UI. GenMedha does not need `0.0.0.0:3000` published.

---

## Container logs (normal)

```
▲ Next.js 16.2.12
✓ Ready in 0ms
[WARN] No email adapter provided...
```

Expected. Blank admin is an **image / routing** problem, not this log line.

---

## Media upload fails ("Failed to save 1 files")

If admin shows a generic upload error with no detail, check container logs:

```bash
docker logs <container> --tail 50 | grep -i EACCES
```

**Cause:** the `genmedha-media` volume at `/app/media` was owned by `root`, but the app
runs as `nextjs` (uid 1001).

**Fix (one-time on VPS):**

```bash
CID=$(docker ps --filter name=genmedhahub-genmedhahubstaging -q | head -1)
docker exec -u root $CID chown -R nextjs:nodejs /app/media
```

Until Cloudflare R2 credentials are set in Dokploy, uploads use this local volume.
After R2 is configured with real keys (not `PASTE_` / `YOUR_` placeholders), media
goes to object storage instead.

---

## Do **not** re-scaffold

`create-payload-app` would wipe collections, migrations, and domain setup.
Fix deploy with a real no-cache rebuild of `main`.
