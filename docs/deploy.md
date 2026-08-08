# Deploying genmedha.in (Dokploy)

**Do not start from scratch.** The code on `main` is correct. A blank `/admin/login`
means Dokploy is still serving an **old Docker image** — not a code or config bug.

---

## START HERE (5 steps)

### 1. Check what is live right now

```bash
curl -s https://genmedha.in/api/health
```

| What you see | Meaning |
| --- | --- |
| No `buildId` field | **Old image** — admin will stay blank |
| `"buildId":"admin-fix-v6"` | **New image** — admin should work |

Right now production is still on the **old** image (no `buildId`).

### 2. Open Dokploy and force a real rebuild

The deploy **webhook is not enough** — it often returns `"Application deployed successfully"`
but only **restarts** the old container without rebuilding.

1. Open Dokploy → application **genmedha.in**
2. **General** tab:
   - Branch: **`main`**
   - Build type: **Dockerfile**
   - Dockerfile: **`Dockerfile`**
   - Context: **`/`**
3. **Environment** tab: confirm all 16 variables (especially `NEXT_PUBLIC_SERVER_URL=https://genmedha.in`)
4. **Advanced → Run Command**: must be **empty**
5. Click **Deploy** / **Rebuild** — choose **no cache** / clear build cache if offered
6. Watch **Build logs** until `pnpm build` finishes and the container starts

### 3. Confirm the new image is live

```bash
curl -s https://genmedha.in/api/health
```

You must see `"buildId":"admin-fix-v6"`. Until you do, `/admin/login` will stay blank.

### 4. Open the admin login page

**https://genmedha.in/admin/login** — you should see Email, Password, and Login.

### 5. Log in

Use your admin credentials. Change the password after first login.

---

## Your container logs are normal

If Dokploy logs show:

```
▲ Next.js 16.2.12
- Local:         http://localhost:3000
- Network:       http://0.0.0.0:3000
✓ Ready in 0ms
[WARN] No email adapter provided...
```

That is **expected and healthy**:

- `Ready in 0ms` + `0.0.0.0:3000` = production standalone server (`node server.js`)
- The email warning is fine until you add a real Resend API key
- These logs do **not** explain a blank admin — only an **old image** does

---

## Dokploy build settings

| Setting | Value |
| --- | --- |
| Build type | Dockerfile |
| Dockerfile | `Dockerfile` |
| Context | `/` |
| Branch | `main` |
| Build arg | `NEXT_PUBLIC_SERVER_URL=https://genmedha.in` |

Optional build arg (traceability):

```
BUILD_ID=admin-fix-v6
```

---

## Verify admin RSC (optional, technical)

After deploy, this should print **4** (not 3):

```bash
curl -s https://genmedha.in/admin/login | grep -o 'parallelRouterKey' | wc -l
```

- **3** = old broken build (blank page)
- **4** = fixed build (login form renders)

---

## Local dev (to prove code works on your machine)

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

Open **http://localhost:3000/admin/login** — login form should appear.
(If port 3000 is busy, Next.js picks another port — check the terminal output.)

For a production-like local test after `pnpm build`:

```bash
node .next/standalone/server.js
```

Do **not** use `pnpm start` — standalone output requires `node server.js` directly.

---

## Do **not** re-scaffold

Running `create-payload-app` again would delete your collections, migrations, seed
data, and domain setup. Everything is already fixed on `main` — you only need Dokploy
to build and run the latest image.
