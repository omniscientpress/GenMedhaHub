# syntax=docker/dockerfile:1

# ---- deps: install dependencies with a frozen lockfile ----
# Debian/glibc builder: Alpine/musl production builds were serializing Payload's
# RootProvider children as null, which left /admin blank after hydration.
FROM node:22-bookworm-slim AS deps
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
# --ignore-scripts: postinstall runs `payload generate:*`, which needs tsconfig.json
# and src/ — not copied in this stage. Both artifacts (importMap.js, payload-types.ts)
# are committed per Payload convention and land via COPY in the builder stage.
RUN pnpm install --frozen-lockfile --ignore-scripts

# ---- builder: compile the standalone Next.js build ----
FROM node:22-bookworm-slim AS builder
WORKDIR /app
RUN corepack enable
# Public URL is baked into client bundles at build time.
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3000
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
# Bumped when admin/deploy fixes change — visible at /api/health as buildId.
ARG BUILD_ID=admin-fix-v9
ENV BUILD_ID=$BUILD_ID
# Postgres scheme at build time keeps sqlite/libsql out of the standalone server bundle.
ARG DATABASE_URI=postgresql://build:build@127.0.0.1:5432/build
ENV DATABASE_URI=$DATABASE_URI
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Env validation is skipped during build (NEXT_PHASE=phase-production-build),
# so no real secrets are needed here.
RUN pnpm build

# ---- runner: minimal production image ----
FROM node:22-bookworm-slim AS runner
WORKDIR /app

ARG BUILD_ID=admin-fix-v9

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    BUILD_ID=$BUILD_ID

RUN groupadd --system nodejs && useradd --system --gid nodejs --uid 1001 nextjs \
  && apt-get update \
  && apt-get install -y --no-install-recommends wget ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Strip npm/corepack from the runtime image: it only runs `node server.js`, and the
# bundled npm dependency tree (tar, sigstore, brace-expansion) is what Trivy flags
# in the base image. Justification: runtime hardening, no runtime cost.
RUN rm -rf /usr/local/lib/node_modules/npm \
           /usr/local/lib/node_modules/corepack \
           /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Local Payload uploads (when S3/R2 is not configured) land in media/.
# Swarm may bind-mount a volume here — ownership must be nextjs, not root.
RUN mkdir -p /app/media && chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

# NOTE: database migrations are applied at deploy time (Payload `migrate` on boot
# or a Dokploy job) — intentionally not baked into this image.
# start-period must cover cold boot + first Payload/DB query; too short (15s) caused
# Swarm to kill healthy containers with "unhealthy container" / exit 143.
HEALTHCHECK --interval=30s --timeout=10s --start-period=90s --retries=5 \
  CMD wget -qO- http://127.0.0.1:3000/api/health | grep -q '"status":"ok"' || exit 1

CMD ["node", "server.js"]
