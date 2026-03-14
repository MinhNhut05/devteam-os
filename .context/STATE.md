# Project State

## Project Reference

See: .context/PROJECT.md
**Core value:** UX/UI xuat sac + AI features tich hop
**Current focus:** Phase 2 DONE — Phase 3 next

## Current Position

Phase: 2 of 7 (Workspace & Team) — DONE
Branch: `main` (branches 03 + 04 merged)
Status: Phase 2 hoan thanh — BE + FE workspace, san sang Phase 3
Last activity: 2026-03-11 — Fixed Google OAuth redirect mismatch; workspace UX/state fixes merged to main (see commit 3287823)
Progress: [############________] 55%

## What's Done (Phase 2 BE — branch 03)

- DTOs: create/update workspace, invite member, update member role
- WorkspaceRoles decorator + WorkspaceRoleGuard
- Workspace CRUD: create, list, detail, update, delete (5 endpoints)
- Members & invitation: list, invite, remove, update role, join by token (5 endpoints)
- Security: email-bound invite validation, route protection
- Build: `nest build` pass, Postman 10 endpoints pass

## What's Done (Phase 2 FE — branch 04)

- Workspace store (Zustand + persist currentWorkspace)
- 10 hooks (TanStack Query): useWorkspaces, useWorkspace, useWorkspaceMembers, + 7 mutations
- 4 pages: WorkspaceListPage, WorkspaceSettingsPage, MembersPage, JoinInvitationPage
- 3 components: WorkspaceSwitcher, CreateWorkspaceModal, InviteMemberModal
- Fixes: invite redirect flow, clear workspace on logout, role from route data, error states
- Build: `tsc --noEmit` pass

## What's Next

1. Tiep tuc Phase 3: Project, Task & AI (branches 05-08)
2. Branch 05-feat-project-task-be → Project + Task CRUD backend
3. Branch 06-feat-project-task-fe → Project + Task frontend

## Blockers/Concerns

- None — Phase 2 hoan thanh

## Known Warnings (non-blocking)

- invite het han van chan re-invite (check duplicate ko xet expiresAt)
- slug race condition chua map Prisma P2002

## Accumulated Decisions

- Context restructured to `.context/` with GSD concepts (2026-02-27)
- Google OAuth + Email features: lam luon trong MVP (2026-02-15)
- Refresh token: Database + Cookie (2026-02-15)
- 4 AI Features tich hop vao MVP (2026-02-15)
- Auth hardening session: NestJS CacheModule cho Google one-time code exchange (2026-03-06)
- Workspace BE before FE, sequential merge flow (2026-03-08)
- Email-bound invite validation: joinByToken check user email match invitation (2026-03-08)

## Session Log

### 2026-03-08

- Branch 03 BE: 3 phases (DTOs+Guard → CRUD → Members+Invite), 10 endpoints
- Review: fix security blocker (email-bound invite), commit + merge
- Branch 04 FE Phase 1: expand store + 10 hooks (Tab 3A)
- Branch 04 FE Phase 2+3: 4 pages + 3 components + routing (Tab 3B)
- Review: fix invite redirect flow, clear ws on logout, role from route data, error states
- Commit + merge branch 04 to main, push origin
- Phase 2 DONE — WS-01..WS-14 all checked

### 2026-03-11

- Fixed Google OAuth frontend redirect mismatch by aligning dev URLs to port 5173
- Workspace UX/state fixes merged to main:
  - workspace logo upload/preset handling improvements
  - asset URL normalization for /uploads/... so logos render correctly against API origin
  - currentWorkspace recovery/sync after login and workspace selection improvements
  - workspace switcher/list/settings/join/members flow fixes
- Commit pushed on main: 3287823 fix(workspace): sync logo and current workspace state

---

*This file must stay under 100 lines. Move old entries to archive when needed.*
*Last updated: 2026-03-11*
