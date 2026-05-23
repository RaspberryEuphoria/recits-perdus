FROM node:18-alpine AS base

# ------- Dependencies -------
FROM base AS deps

WORKDIR /app

COPY holocron/package.json holocron/yarn.lock ./
RUN yarn install --frozen-lockfile --production=false

# ------- Build -------
FROM base AS build

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY holocron/ .

# Generate Prisma Client
RUN npx prisma generate

# Compile TypeScript
RUN yarn build

# ------- Production -------
FROM base AS production

ENV NODE_ENV=production

# Create app dir, upload dirs, and hand ownership to the built-in non-root
# "node" user (uid 1000) that ships with every node:alpine image.
RUN mkdir -p /app/public/images/posts/illustrations \
             /app/public/images/users/avatars \
             /app/public/images/logos \
    && chown -R node:node /app

USER node
WORKDIR /app

# Copy compiled output and runtime essentials with correct ownership
COPY --chown=node:node --from=build /app/build ./build
COPY --chown=node:node holocron/prisma ./prisma
COPY --chown=node:node holocron/package.json holocron/yarn.lock ./

# Install production dependencies only
RUN yarn install --frozen-lockfile --production=true

# Generate Prisma Client for production runtime
RUN npx prisma generate

EXPOSE 8080

# Run migrations then start the server
CMD ["sh", "-c", "npx prisma migrate deploy && node build/src/index.js"]
