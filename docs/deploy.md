# Deploying genmedha.in (Dokploy)

The app **code is fine** — health, DB, and homepage work. A blank `/admin` means
Dokploy is still running an **old Docker image**, not the latest `main` build.

## Quick check

```bash
curl -s https://genmedha.in/api/health
```

You want:

```json
{"status":"ok","db":"connected","buildId":"admin-fix-v6",...}
```

If `buildId` is **missing** or not `admin-fix-v6`, the new image is **not** live yet.
`/admin/login` will stay blank until it is.

## Force rebuild in Dokploy (required)

The deploy webhook often returns success but only **restarts** the old container.
You must trigger a **full image rebuild**:

1. Open Dokploy → app **genmedha.in**
2. **General** → branch **`main`**, Dockerfile path **`Dockerfile`**, context **`/`**
3. **Environment** → confirm all 16 vars (especially `NEXT_PUBLIC_SERVER_URL=https://genmedha.in`)
4. **Advanced → Run Command** → must be **empty** (no migrate/seed here)
5. Click **Deploy** / **Rebuild** (use **no cache** / clear build cache if offered)
6. Open **Build logs** — wait until you see `pnpm build` finish and the image starts
7. Confirm health:

   ```bash
   curl -s https://genmedha.in/api/health | jq .
   ```

8. Open **https://genmedha.in/admin/login** — you should see Email / Password / Login

## Dokploy build settings

| Setting | Value |
| --- | --- |
| Build type | Dockerfile |
| Dockerfile | `Dockerfile` |
| Context | `/` |
| Build arg | `NEXT_PUBLIC_SERVER_URL=https://genmedha.in` |

Optional build arg (for traceability):

```
BUILD_ID=admin-fix-v6
```

## After deploy — admin login

- URL: **https://genmedha.in/admin/login**
- If you forgot the password, reset via SSH one-off container (see README) or create a new user with `pnpm seed`

## Do **not** start from scratch

Re-scaffolding with `create-payload-app` would delete your collections, migrations,
seed data, and domain setup. The fix is already on `main` — you only need a real
Docker rebuild.

## Container logs (normal)

```
▲ Next.js 16.2.12
✓ Ready in 0ms
[WARN] No email adapter provided...
```

These are **expected**. The email warning is fine until you add a real Resend key.
A blank admin page is **not** a log problem — it is an **old image** problem.
