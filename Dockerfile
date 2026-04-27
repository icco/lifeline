# Install dependencies only when needed
FROM node:25-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock .npmrc ./
RUN --mount=type=secret,id=GITHUB_TOKEN \
    GITHUB_TOKEN=$(cat /run/secrets/GITHUB_TOKEN) \
    yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:25-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN rm -f .npmrc && yarn build

# Production image, copy all the files and run next
FROM node:25-alpine AS runner

LABEL org.opencontainers.image.source=https://github.com/icco/lifeline
LABEL org.opencontainers.image.description="A page to show my life."
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# You only need to copy next.config.js if you are NOT using the default configuration
#COPY --from=builder /app/next.config.js ./

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/.next
USER nextjs

EXPOSE 8080

CMD ["yarn", "start"]
