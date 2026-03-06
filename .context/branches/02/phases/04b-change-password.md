# Phase 04b — ChangePasswordPage

> **Tab rieng.** Doc file nay roi lam theo. KHONG lam gi ngoai scope.
> **SONG SONG** voi Phase 04a — khong dung chung file.

---

## Truoc khi code — BAT BUOC doc

1. `.context/branches/02/CONTRACTS.md` — types, imports, patterns
2. `.context/research/CONVENTIONS.md` — coding rules
3. `apps/web/src/features/auth/LoginPage.tsx` — form pattern mau

---

## Scope

Tao 2 files:

### 1. `src/hooks/useChangePassword.ts`

```
Endpoint: PATCH /api/users/me/password
Body: { currentPassword: string, newPassword: string }
Response: { message: string }
```

- useMutation
- onSuccess: toast.success('Doi mat khau thanh cong!'), reset form
- onError: extract message (VD: "Current password is incorrect")

### 2. `src/features/auth/pages/ChangePasswordPage.tsx`

- Route: `/settings/password` (can them route — ghi vao Notes)
- Form fields:
  - Current password (input password + toggle show/hide)
  - New password (input password + toggle show/hide)
  - Confirm new password (input password)
- Zod schema:
  - currentPassword: min 6
  - newPassword: min 6
  - confirmNewPassword: phai khop newPassword
  - newPassword KHONG duoc giong currentPassword
- UI:
  - Title: "Doi mat khau"
  - Button: "Doi mat khau" / "Dang xu ly..."
  - Link: "Quay lai profile" → `/settings/profile`
- Dark mode support

---

## File ownership

| File | Owned by this task |
|------|-------------------|
| `src/hooks/useChangePassword.ts` | YES — tao moi |
| `src/features/auth/pages/ChangePasswordPage.tsx` | YES — tao moi |
| Moi file khac | KHONG DUOC SUA |

---

## Khi xong

1. Append vao `.context/branches/02/PROGRESS.md`:
```
### Phase 04b: ChangePasswordPage
- Status: done
- Files created: src/hooks/useChangePassword.ts, src/features/auth/pages/ChangePasswordPage.tsx
- Notes: Can them route /settings/password vao App.tsx (T1 se lam)
```
2. KHONG commit
3. Bao: "Phase 04b xong"
