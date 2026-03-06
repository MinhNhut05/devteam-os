# Phase 04a — ProfilePage

> **Tab rieng.** Doc file nay roi lam theo. KHONG lam gi ngoai scope.
> **TUAN TU** — chi lam SAU KHI Phase 3 da xong va duoc verify.

---

## Truoc khi code — BAT BUOC doc

1. `.context/branches/02/CONTRACTS.md` — types, imports, patterns
2. `.context/research/CONVENTIONS.md` — coding rules
3. `apps/web/src/hooks/useCurrentUser.ts` — da co, dung luon
4. `apps/web/src/stores/auth.store.ts` — updateUser action

---

## Scope

Tao 2 files:

### 1. `src/hooks/useUpdateProfile.ts`

```
Endpoint: PATCH /api/users/me
Body: { name?: string, theme?: 'LIGHT' | 'DARK' | 'SYSTEM' }
Response: { user }
```

- useMutation
- onSuccess: updateUser (store) + toast.success + invalidate queryKey ['currentUser']
- onError: extract message

### 2. `src/features/auth/pages/ProfilePage.tsx`

- Route: `/settings/profile` (can them route vao App.tsx — ghi vao Notes)
- Dung `useCurrentUser()` de lay data hien tai
- Form fields:
  - Name (input text)
  - Theme (select: Light / Dark / System)
  - Avatar (hien thi avatar hien tai, chua can upload — Phase 5)
- Zod schema: name min 2
- UI:
  - Title: "Thong tin ca nhan"
  - Hien thi email (read-only, khong cho sua)
  - Hien thi provider badge (LOCAL / GOOGLE)
  - Button: "Luu thay doi" / "Dang luu..."
- Dark mode support

---

## File ownership

| File | Owned by this task |
|------|-------------------|
| `src/hooks/useUpdateProfile.ts` | YES — tao moi |
| `src/features/auth/pages/ProfilePage.tsx` | YES — tao moi |
| Moi file khac | KHONG DUOC SUA |

---

## Khi xong

1. Append vao `.context/branches/02/PROGRESS.md`:
```
### Phase 04a: ProfilePage
- Status: done
- Files created: src/hooks/useUpdateProfile.ts, src/features/auth/pages/ProfilePage.tsx
- Notes: Can them route /settings/profile vao App.tsx (T1 se lam)
```
2. KHONG commit
3. Bao: "Phase 04a xong"
