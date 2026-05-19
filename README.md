# DevTeamOS

Project management platform for small teams.

DevTeamOS is a Kanban-style project management system for freelancers and startup teams. It combines workspace/project structure, task tracking, role-based access, and a monorepo setup that is easy to extend.

## Highlights

- Workspace and project management
- Kanban board for task planning and execution
- Role-based access control for Owner, Admin, Member, and Viewer
- Shared package structure for frontend and backend code
- Docker and pnpm workflows for local development

## Stack

- Frontend: React 18, Vite, Tailwind CSS
- Backend: NestJS, Prisma ORM
- Database: PostgreSQL
- Infra: Docker, pnpm workspaces

## Local development

```bash
git clone https://github.com/MinhNhut05/devteam-os.git
cd devteam-os
pnpm install
docker compose up -d
pnpm dev
```

## Repository layout

```
├── apps/
│   ├── api/          # Backend NestJS
│   └── web/          # Frontend React
├── packages/
│   └── shared/       # Shared types
└── docker-compose.yml
```
