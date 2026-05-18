# Commands: DevTeamOS

---

## Development

```bash
# Start all services (requires Docker for PostgreSQL)
docker compose up -d              # Start database (port 5433)
pnpm dev                          # Start both API and web in parallel

# Start individual apps
pnpm --filter api dev             # NestJS API on localhost:3001
pnpm --filter web dev             # Vite frontend on localhost:5173
```

## Database (Prisma)

```bash
cd apps/api
npx prisma generate               # Generate Prisma client
npx prisma migrate dev            # Run migrations
npx prisma studio                 # Open Prisma Studio GUI
npx prisma db push                # Push schema changes (dev only)
```

## Build & Test

```bash
pnpm build                        # Build all packages
pnpm --filter api build           # Build API only
pnpm --filter web build           # Build frontend only
pnpm -r typecheck                 # Type-check all packages
pnpm --filter api test            # Run API tests (Jest)
pnpm --filter api test:watch      # Run tests in watch mode
```

---

## Environment Variables

### API (.env in apps/api)

```env
DATABASE_URL="postgresql://user:password@localhost:5433/devteamos"
JWT_SECRET="your-jwt-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

GOOGLE_CLIENT_ID="xxx"
GOOGLE_CLIENT_SECRET="xxx"
GOOGLE_CALLBACK_URL="http://localhost:3001/api/auth/google/callback"

SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="app-password"
EMAIL_FROM="DevTeamOS <noreply@devteamos.com>"

AI_API_URL="https://manager.devteamos.me/v1/messages"

FRONTEND_URL="http://localhost:5173"
UPLOAD_DIR="./uploads"
PORT=3001
LOG_LEVEL="info"
LOG_PRETTY="true"
SENTRY_DSN=""
SENTRY_ENVIRONMENT="development"
SENTRY_TRACES_SAMPLE_RATE=0.1
```

### Web (.env in apps/web)

```env
VITE_API_URL="http://localhost:3001/api"
VITE_WS_URL="ws://localhost:3001"
VITE_SENTRY_DSN=""
VITE_SENTRY_ENVIRONMENT="development"
VITE_SENTRY_TRACES_SAMPLE_RATE=0.1
```

---

*Last updated: 2026-05-15*
