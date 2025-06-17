# apps/client/Dockerfile
FROM node:18-alpine AS base
WORKDIR /app
# Enable pnpm
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Production Stage
FROM base AS production
COPY . .
RUN pnpm --filter=@finance-tracker/client build
CMD ["pnpm", "--filter=@my-mono-repo/client", "preview"]