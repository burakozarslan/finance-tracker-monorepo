# apps/api/Dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Production Stage
FROM base AS production
COPY . .
RUN pnpm --filter=@finance-tracker/api build
CMD ["node", "apps/api/dist/main.js"]