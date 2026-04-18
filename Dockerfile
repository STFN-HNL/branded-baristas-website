# syntax=docker/dockerfile:1.7
FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.33.0 --activate
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Dummy env vars so `pnpm build` doesn't crash on env validation at prerender time.
# Real values are injected at runtime by Railway.
ENV NEXT_PUBLIC_SITE_URL=https://placeholder.example.com
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=placeholder
ENV NEXT_PUBLIC_SANITY_DATASET=production
ENV SANITY_API_READ_TOKEN=placeholder
ENV SANITY_WEBHOOK_SECRET=placeholder
ENV NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
ENV SUPABASE_SERVICE_ROLE_KEY=placeholder
ENV RESEND_API_KEY=placeholder
ENV RESEND_FROM_EMAIL=hello@branded-baristas.com
RUN pnpm build

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
