FROM node:18-alpine AS base

# ------- Dependencies -------
FROM base AS deps

WORKDIR /app

COPY gizka/package.json gizka/yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# ------- Build -------
FROM base AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY gizka/ .

# Next.js collects anonymous telemetry — disable it
ENV NEXT_TELEMETRY_DISABLED=1

# DIST_DIR=build so that postbuild script (mv build .next) works correctly
ENV DIST_DIR=build

# Build arguments forwarded as env vars for the Next.js build
# (NEXT_PUBLIC_* vars must be present at build time)
ARG NEXT_PUBLIC_IMAGES_PREFIX_URL
ARG NEXT_PUBLIC_BFF_PREFIX_URL
ARG NEXT_PUBLIC_BFF_PREFIX_HOSTNAME
ARG NEXT_PUBLIC_PROTOCOL
ARG NEXT_PUBLIC_DISCORD_LINK

ENV NEXT_PUBLIC_IMAGES_PREFIX_URL=$NEXT_PUBLIC_IMAGES_PREFIX_URL
ENV NEXT_PUBLIC_BFF_PREFIX_URL=$NEXT_PUBLIC_BFF_PREFIX_URL
ENV NEXT_PUBLIC_BFF_PREFIX_HOSTNAME=$NEXT_PUBLIC_BFF_PREFIX_HOSTNAME
ENV NEXT_PUBLIC_PROTOCOL=$NEXT_PUBLIC_PROTOCOL
ENV NEXT_PUBLIC_DISCORD_LINK=$NEXT_PUBLIC_DISCORD_LINK

RUN yarn build

# ------- Production -------
FROM base AS production

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Hand ownership of the app dir to the built-in non-root "node" user.
RUN mkdir -p /app && chown node:node /app

USER node
WORKDIR /app

# Copy built application with correct ownership
COPY --chown=node:node --from=build /app/.next ./.next
COPY --chown=node:node --from=build /app/public ./public
COPY --chown=node:node --from=build /app/package.json ./
COPY --chown=node:node --from=build /app/yarn.lock ./
COPY --chown=node:node --from=build /app/next.config.js ./

# Install production dependencies only
RUN yarn install --frozen-lockfile --production=true

EXPOSE 3000

CMD ["yarn", "start:prod"]
