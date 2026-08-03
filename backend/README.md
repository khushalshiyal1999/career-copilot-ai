# Job AI — Backend

Production-ready NestJS 11 API with Prisma 7 (PostgreSQL), BullMQ (Redis), JWT auth, Winston logging and Swagger docs.

## Getting started

```bash
cp .env.example .env        # adjust DATABASE_URL / JWT_SECRET
npm install                 # also runs `prisma generate` (postinstall)
npm run start:dev
```

- API base: `http://localhost:3001/api/v1`
- Swagger: `http://localhost:3001/api/docs`
- Liveness: `GET /api/v1/health` · Readiness: `GET /api/v1/health/ready`

### With Docker

```bash
docker compose up --build   # api + postgres + redis
```

## Folder structure

```
src/
  modules/        # Cross-cutting app modules (health, …)
  common/         # Filters, interceptors, guards, decorators, shared DTOs
  config/         # Env validation, typed configuration, Swagger setup
  prisma/         # PrismaService/Module + generated client (gitignored)
  auth/           # JWT/Passport strategy, global auth guard wiring
  users/          # Feature modules (empty shells — no business logic yet)
  jobs/
  companies/
  applications/
  resumes/
  automation/
  ai/
  notifications/
  logs/           # Winston logger configuration
  queues/         # BullMQ root config + queue name registry
  scheduler/      # @nestjs/schedule root
```

## Architecture decisions

- **Auth-by-default** — a global `JwtAuthGuard` protects every route; opt out per route/controller with `@Public()`.
- **Uniform responses** — `ResponseInterceptor` wraps success payloads (`{ success, data, path, timestamp }`); `AllExceptionsFilter` normalizes errors to the same envelope shape.
- **Validated env** — the app refuses to boot on invalid/missing env vars (`src/config/env.validation.ts`, class-validator).
- **Prisma 7** — driver-adapter client (`@prisma/adapter-pg`) generated into `src/prisma/generated`; schema has no models yet, they are added per feature.
- **Queues** — queue names live in `src/queues/queues.constants.ts`; inject with `@InjectQueue(QUEUES.<NAME>)`, processors live in their feature modules.
- **Probes** — `/health` (liveness, memory) and `/health/ready` (readiness, DB ping) map directly to k8s/compose health checks.

## Scripts

| Script                | Description                          |
| --------------------- | ------------------------------------ |
| `npm run start:dev`   | Dev server with watch                |
| `npm run build`       | Compile to `dist/`                   |
| `npm run start:prod`  | Run compiled app                     |
| `npm run lint`        | ESLint (auto-fix)                    |
| `npm run test`        | Unit tests                           |
| `npm run test:e2e`    | End-to-end tests                     |
| `npm run prisma:generate` | Regenerate Prisma client         |
| `npm run prisma:migrate`  | Create/apply dev migration       |
| `npm run prisma:deploy`   | Apply migrations (production)    |
