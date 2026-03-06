# Phase 03b — ResetPasswordPage

> **Tab rieng.** Doc file nay roi lam theo. KHONG lam gi ngoai scope.

---

## Truoc khi code — BAT BUOC doc

1. `.context/branches/02/CONTRACTS.md` — types, imports, patterns
2. `.context/research/CONVENTIONS.md` — coding rules
3. `apps/web/src/hooks/useLogin.ts` — lam mau cho hook pattern
4. `apps/web/src/features/auth/LoginPage.tsx` — lam mau cho page pattern

---

## Scope

Tao 2 files:

### 1. `src/hooks/useResetPassword.ts`

```
Endpoint: POST /api/auth/reset-password
Body: { token: string, password: string }
Response: { message: string }
```

- useMutation
- onSuccess: toast.success('Dat lai mat khau thanh cong!'), navigate('/login')
- onError: extract message tu error response (token expired, invalid token...)

### 2. `src/features/auth/pages/ResetPasswordPage.tsx`

- Route: `/reset-password/:token`
- Lay `token` tu URL params: `useParams()`
- Form: 2 fields — password, confirmPassword
- Zod schema:
  - password: min 6 ky tu
  - confirmPassword: phai khop password
- UI:
  - Title: "Dat lai mat khau"
  - Button: "Dat lai mat khau" / "Dang xu ly..."
  - Hien thi show/hide password toggle (nhu LoginPage)
  - Link: "Quay lai dang nhap" → `/login`
- Dark mode support
- Khi submit: gui `{ token, password }` (token tu URL, KHONG hien thi cho user)

---

## File ownership

| File | Owned by this task |
|------|-------------------|
| `src/hooks/useResetPassword.ts` | YES — tao moi |
| `src/features/auth/pages/ResetPasswordPage.tsx` | YES — tao moi |
| Moi file khac | KHONG DUOC SUA |

---

## Khi xong

1. Append vao `.context/branches/02/PROGRESS.md`:
```
### Phase 03b: ResetPasswordPage
- Status: done
- Files created: src/hooks/useResetPassword.ts, src/features/auth/pages/ResetPasswordPage.tsx
- Notes: [ghi chu neu co]
```
2. KHONG commit
3. Bao: "Phase 03b xong"
