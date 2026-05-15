---
paths:
  - "packages/contracts/**/*.ts"
  - "packages/utils/**/*.ts"
  - "packages/ui/**/*.ts"
  - "packages/ui/**/*.tsx"
---

# Shared Workspace Package Rules

## Purpose

Workspace packages chua contract/domain types, pure utilities, va UI primitives dung chung giua `apps/api` va `apps/web`.

## Structure

```
packages/contracts/src/
├── index.ts          # Re-exports
└── types.ts          # Shared domain TypeScript types

packages/utils/src/   # Pure helpers only
packages/ui/src/      # Reusable React components
```

## Rules

- `packages/contracts`: chi chua types, interfaces, schemas, constants, va future ts-rest contracts
- `packages/utils`: pure helpers, khong phu thuoc React/Nest/Prisma
- `packages/ui`: reusable React components, khong import tu feature code
- KHONG import tu `apps/api` hay `apps/web` (packages la dependency, khong phu thuoc nguoc)
- Moi type/interface PHAI export tu `index.ts`
- Naming: PascalCase cho types/interfaces, UPPER_SNAKE_CASE cho constants

## Export Pattern

```typescript
// packages/contracts/src/index.ts
export * from './types';
```

## Import Pattern (tu apps)

```typescript
// Trong apps/api hoac apps/web
import type { User } from '@devteamos/contracts';
```
