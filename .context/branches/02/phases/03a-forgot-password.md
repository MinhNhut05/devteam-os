# Phase 03a — ForgotPasswordPage

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

### 1. `src/hooks/useForgotPassword.ts`

```
Endpoint: POST /api/auth/forgot-password
Body: { email: string }
Response: { message: string }
```

- useMutation
- onSuccess: toast.success('Email reset password da duoc gui!')
- onError: extract message tu error response
- KHONG navigate (user o lai trang, thay thong bao thanh cong)

### 2. `src/features/auth/pages/ForgotPasswordPage.tsx`

- Route: `/forgot-password`
- Form: 1 field email
- Zod schema: email required + valid format
- UI:
  - Title: "Quen mat khau"
  - Description: "Nhap email de nhan link dat lai mat khau"
  - Button: "Gui email" / "Dang gui..."
  - Link: "Quay lai dang nhap" → `/login`
  - Khi thanh cong: hien thong bao "Vui long kiem tra email" (thay form)
- Dark mode support

---

## File ownership

| File | Owned by this task |
|------|-------------------|
| `src/hooks/useForgotPassword.ts` | YES — tao moi |
| `src/features/auth/pages/ForgotPasswordPage.tsx` | YES — tao moi |
| Moi file khac | KHONG DUOC SUA |

---

## Khi xong

1. Append vao `.context/branches/02/PROGRESS.md`:
```
### Phase 03a: ForgotPasswordPage
- Status: done
- Files created: src/hooks/useForgotPassword.ts, src/features/auth/pages/ForgotPasswordPage.tsx
- Notes: [ghi chu neu co]
```
2. KHONG commit
3. Bao: "Phase 03a xong"
