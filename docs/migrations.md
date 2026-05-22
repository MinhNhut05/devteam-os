# Database Migrations

Prisma migrations for the DevTeamOS Postgres database.

## Policy

| Environment | Command | Behavior |
|---|---|---|
| Local dev | `pnpm --filter api exec prisma migrate dev --name <name>` | Generates migration SQL, applies it, regenerates client. Interactive. |
| CI test | `pnpm --filter api exec prisma migrate deploy` | Applies pending migrations only. Non-interactive. No SQL generation. |
| Production | `pnpm --filter api exec prisma migrate deploy` | Same as CI. Run from deploy pipeline before booting the new API container. |

Never run `migrate dev` against production. It can reset data.

## Backup / restore dev DB

```bash
# Backup (dumps to a gitignored file)
docker compose exec -T postgres pg_dump -U devteamos devteamos > database/devteamos_dump.sql

# Restore from dump
docker compose exec -T postgres psql -U devteamos -d devteamos < database/devteamos_dump.sql

# Wipe and recreate (destructive — only when no useful local data)
pnpm --filter api exec prisma migrate reset --force --skip-seed --skip-generate
```

The `database/` directory is gitignored. Backups never reach the repo.

## Baseline rationale

`20260520111322_baseline` replaces four prior migrations:

- `20260120112955_init`
- `20260217085431_init_schema`
- `20260306104557_auth_security_fixes`
- `20260314160743_add_project_image`

We squashed because there is no production data yet, the prior migration history mixed schema fixes with feature work, and Phase 3 added hot-path indexes that would otherwise have lived in a fifth migration on top of messy ancestors. The baseline is the full current schema (15 models, 8 enums) plus all required indexes.

If real production data lands after this baseline, future squashes are no longer free — see "Squashing after production" below.

## Adding a migration

```bash
# 1. Edit apps/api/prisma/schema.prisma
# 2. Generate + apply the migration locally
pnpm --filter api exec prisma migrate dev --name short_descriptive_name

# 3. Inspect the generated SQL
cat apps/api/prisma/migrations/<timestamp>_<name>/migration.sql

# 4. Commit schema.prisma + the new migration folder together
git add apps/api/prisma/schema.prisma apps/api/prisma/migrations/
```

Name migrations in `snake_case`, short and descriptive: `add_task_due_date`, `index_comments_taskid`, `soft_delete_and_audit`.

## Destructive migration guard

Phase 11 adds a CI workflow that fails on any migration containing:

- `DROP TABLE`
- `DROP COLUMN`
- `ALTER TYPE ... DROP VALUE`
- `ALTER TABLE ... DROP CONSTRAINT` on a non-FK constraint

Bypass requires the PR to carry the `migration-approved` label. Reviewer must confirm:

- A backfill or data-preservation plan exists
- The change is gated behind a feature flag or staged release
- Rollback path is documented

Adding columns, indexes, or non-destructive `ALTER TYPE ADD VALUE` does not need the label.

## Squashing after production

Once real production data exists, do not squash. Instead:

1. Create new migrations on top of history.
2. If history truly needs flattening, follow Prisma's [baselining for production](https://www.prisma.io/docs/orm/prisma-migrate/workflows/baselining) procedure: snapshot current schema as a `0_init` migration, mark it applied via `prisma migrate resolve --applied`, then continue.

## Troubleshooting

- **"Drift detected"**: dev DB does not match migration history. Either you edited the DB outside Prisma or deleted a migration folder. Fix: `prisma migrate reset --force --skip-seed` (data loss — back up first).
- **"P1001 Can't reach database"**: postgres container not running. `docker compose up -d postgres` and wait for healthy.
- **`migration_lock.toml` missing**: regenerate by running any migrate command; do not commit a stale lock from another provider.
