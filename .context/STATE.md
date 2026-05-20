# Project State

## Project Reference

See: .context/PROJECT.md
**Core value:** UX/UI xuat sac + AI features tich hop
**Current focus:** Production scale cleanup/restructure — Phase 2 done

## Current Position

Phase: Production Scale Phase 5 (BullMQ Background Jobs) — DONE
Branch: `main` (code truc tiep tren main)
Status: MVP complete; production-grade cleanup/restructure in progress
Last activity: 2026-05-20 — Phase 5 BullMQ for email/notifications/AI + async AI contract
Progress: MVP [####################] 100%; Production cleanup Phase 5 done

## What's Done (Summary)

**Phase 1** (AUTH): 13 endpoints BE + FE auth flows — DONE
**Phase 2** (WS): 10 endpoints BE + FE workspace/team — DONE

**Phase 3 BE** (branch 05):
- Project module: CRUD + stats (6 endpoints)
- Task module: CRUD + reorder, subtasks, assignees (9+ endpoints)
- Sub-features: checklist CRUD, file attachments upload/delete

**Phase 3 FE** (branch 06):
- 5 hooks: useProjects, useProject, useTasks, useTask + mutations
- 2 pages: ProjectListPage, ProjectDetailPage
- TaskDetailModal + SubtaskList + ChecklistSection + AttachmentSection

**Phase 3 AI** (branch 07):
- AI module: 4 endpoints (split-task, analyze-progress, suggest-assignee, code-assist)

**Phase 4** (branch 09):
- Kanban Board: KanbanPage, KanbanColumn, TaskCard, drag-drop, filter, quick add
- KAN-01..07 DONE

**Phase 5** (BE branch 10 + FE main):
- Comments + Notifications modules, WebSocket Gateway
- CommentSection + MentionInput, NotificationBell + NotificationDropdown
- RT-01..10 DONE

**Phase 6** (main):
- Dashboard stats API + Activity feed + 5 widgets
- DASH-01..07 DONE

**Phase 7** (main):
- DEPLOY-01: ErrorBoundary class component + toast (via hooks)
- DEPLOY-02: Skeleton components (SkeletonLine, SkeletonCard, SkeletonTableRow, SkeletonAvatar)
- DEPLOY-03: EmptyState component (compact + full mode)
- DEPLOY-04: Responsive sidebar drawer + hamburger menu

## What's Next

- Phase 6: Soft delete + admin trash
- Then Phase 7: ts-rest contracts pilot (Notifications)

## Known Warnings (non-blocking)

- invite het han van chan re-invite (check duplicate ko xet expiresAt)
- slug race condition chua map Prisma P2002
- Vite build large chunk warning (>500kB) — code-split neu can
- Lint baseline has existing API prettier issues + 2 web react-hooks warnings

## Session Log

### 2026-05-20

- Phase 5: added QueueModule (Bull root) + 3 queues (email, notifications, ai)
- Email processor in EmailModule; notifications processor in NotificationsModule; AI processor in AiModule
- AuthService/WorkspacesService enqueue `send-mail` jobs (4 callsites); OTP/reset/verify/invite
- TasksService/CommentsService enqueue `emit-workspace`/`emit-user` (6 callsites); no direct gateway calls
- AI endpoints now return `{ jobId, status: 'pending' }` (HTTP 202); FE uses `useAiJob` + polling `GET /ai/jobs/:jobId` (1.5s interval)
- New AiJobsController + AiStreamingIndicator (basic)
- Verified: OTP enqueue → mailpit captures (OTP visible), bull:email:completed has the job
- Phase 4: added RedisModule (global, ioredis), RedisIoAdapter for Socket.IO scaling
- Auth CacheModule swapped to cache-manager-ioredis-yet (OTP survives restart)
- docker-compose.yml: added redis:7-alpine + mailpit + explicit bridge network
- docker-compose.prod.yml + Caddyfile skeleton (finalized in Phase 11)
- Verified: typecheck, build, /health, OTP smoke (Redis key + 296s TTL)
- Phase 3: 9 hot-path indexes; squashed 4 dev migrations → `20260520111322_baseline`; backup at `database/devteamos_dump.sql` (gitignored); `MIGRATIONS.md` at root

### 2026-05-15

- Phase 2: nestjs-pino + Sentry (API/web init + non-HttpException filter); replaced bootstrap/tasks/comments console logs
- Phase 1: added packages/config-typescript, config-eslint, contracts, ui, utils; merged shared → contracts; wired API/web extends

---

*This file must stay under 100 lines. Move old entries to archive when needed.*
*Last updated: 2026-05-20*
