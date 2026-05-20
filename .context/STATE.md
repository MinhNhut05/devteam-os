# Project State

## Project Reference

See: .context/PROJECT.md
**Core value:** UX/UI xuat sac + AI features tich hop
**Current focus:** Production scale cleanup/restructure — Phase 2 done

## Current Position

Phase: Production Scale Phase 3 (DB Hardening) — DONE
Branch: `main` (code truc tiep tren main)
Status: MVP complete; production-grade cleanup/restructure in progress
Last activity: 2026-05-20 — Phase 3 indexes + baseline migration squash
Progress: MVP [####################] 100%; Production cleanup Phase 3 done

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

- Phase 4: Redis + Socket.IO adapter
- Then Phase 5: BullMQ for email/notifications/AI

## Known Warnings (non-blocking)

- invite het han van chan re-invite (check duplicate ko xet expiresAt)
- slug race condition chua map Prisma P2002
- Vite build large chunk warning (>500kB) — code-split neu can
- Lint baseline has existing API prettier issues + 2 web react-hooks warnings

## Session Log

### 2026-05-20

- Phase 3: added 9 hot-path indexes (Task, Project, Comment, Attachment, ChecklistItem, Activity, Notification, WorkspaceMember)
- Squashed 4 dev migrations into single `20260520111322_baseline` (no prod data; clean slate)
- Backed up local dev DB to `database/devteamos_dump.sql` (gitignored) before reset
- Added `MIGRATIONS.md` at repo root: policy, backup/restore, destructive guard rules
- Verified pnpm -r typecheck, pnpm -r build, /health smoke pass

### 2026-05-15

- Phase 2: added nestjs-pino request logging + Sentry API/web init
- Added Sentry exception filter for non-HttpException capture
- Replaced API console logs in bootstrap/tasks/comments with Nest Logger
- Verified pnpm -r typecheck, pnpm -r build, and /health smoke pass
- Phase 1: added packages/config-typescript, config-eslint, contracts, ui, utils
- Wired API/web tsconfig + ESLint to shared config packages
- Merged packages/shared content into packages/contracts and removed packages/shared
- Verified pnpm -r typecheck and pnpm -r build pass

### 2026-05-14

- Phase 0A: updated gitignore, moved legacy test-api script, archived closed branch contexts
- Phase 0B: added typecheck scripts, standardized dev port 3001, added /health endpoint
- Started production-scale cleanup/restructure plan; next is Phase 1 monorepo packages

---

*This file must stay under 100 lines. Move old entries to archive when needed.*
*Last updated: 2026-05-20*
