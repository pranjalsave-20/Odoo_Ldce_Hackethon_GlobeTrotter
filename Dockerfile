# Stage 1: Dependency installation
FROM node:20-alpine AS deps
# Add compatibility layers for Alpine
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files from the safarset directory
COPY safarset/package.json safarset/package-lock.json ./
RUN npm ci

# Stage 2: Source builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY safarset/ .

# Disable telemetry during the build
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Stage 3: Production runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root system user and group for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone build, static assets, and public directory
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the non-root user
USER nextjs

# Expose the port Next.js standalone runs on
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# server.js is created by next build when output: "standalone" is configured
CMD ["node", "server.js"]
