# syntax=docker/dockerfile:1

# ---- deps: install dependencies with a frozen lockfile ----
FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
# --ignore-scripts: postinstall runs `payload generate:*`, which needs tsconfig.json
# and src/ — not copied in this stage. Both artifacts (importMap.js, payload-types.ts)
# are committed per Payload convention and land via COPY in the builder stage.
RUN pnpm install --frozen-lockfile --ignore-scripts

# ---- builder: compile the standalone Next.js build ----
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable
# Public URL is baked into client bundles at build time.
ARG NEXT_PUBLIC_SERVER_URL=http://localhost:3000
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Env validation is skipped during build (NEXT_PHASE=phase-production-build),
# so no real secrets are needed here.
RUN pnpm build

# ---- runner: minimal production image ----
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -S nodejs && adduser -S nextjs -u 1001

# musl compatibility shim for native modules (sharp) on Alpine.
RUN apk add --no-cache libc6-compat

# Strip npm/corepack from the runtime image: it only runs `node server.js`, and the
# bundled npm dependency tree (tar, sigstore, brace-expansion) is what Trivy flags
# in the base image. Justification: runtime hardening, no runtime cost.
RUN rm -rf /usr/local/lib/node_modules/npm \
           /usr/local/lib/node_modules/corepack \
           /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Standalone output tracing omits @img/sharp-libvips-linuxmusl-x64 (sharp#4543).
COPY --from=builder /app/node_modules/.pnpm/@img+sharp-libvips-linuxmusl-x64@*/node_modules/@img/sharp-libvips-linuxmusl-x64 /tmp/sharp-libvips-linuxmusl-x64
RUN set -e; \
  for img_dir in $(find ./node_modules -type d -path '*/@img/sharp-linuxmusl-x64' -exec dirname {} \;); do \
    rm -rf "$img_dir/sharp-libvips-linuxmusl-x64"; \
    cp -a /tmp/sharp-libvips-linuxmusl-x64 "$img_dir/sharp-libvips-linuxmusl-x64"; \
  done; \
  rm -rf /tmp/sharp-libvips-linuxmusl-x64

RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

# NOTE: database migrations are applied at deploy time (Payload `migrate` on boot
# or a Dokploy job) — intentionally not baked into this image.
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/api/health || exit 1

CMD ["node", "server.js"]
