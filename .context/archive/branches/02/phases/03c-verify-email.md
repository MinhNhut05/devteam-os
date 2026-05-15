# Phase 03c — VerifyEmailPage

> **Tab rieng.** Doc file nay roi lam theo. KHONG lam gi ngoai scope.

---

## Truoc khi code — BAT BUOC doc

1. `.context/branches/02/CONTRACTS.md` — types, imports, patterns
2. `.context/research/CONVENTIONS.md` — coding rules

---

## Scope

Tao 1 file:

### `src/features/auth/pages/VerifyEmailPage.tsx`

- Route: `/verify-email/:token`
- Lay `token` tu URL params: `useParams()`
- KHONG co form — tu dong goi API khi trang load

Logic:
```
1. Component mount → goi GET /api/auth/verify-email/:token
2. Dang verify: hien loading spinner
3. Thanh cong: hien "Email da duoc xac thuc!" + link "Dang nhap" → /login
4. That bai: hien error message (token expired, invalid) + link "Quay lai" → /login
```

Implementation:
- Dung `useEffect` + `useState` (KHONG can useMutation/useQuery vi chi goi 1 lan)
- Hoac dung `useMutation` + tu dong mutate khi mount
- States: `loading`, `success`, `error`

UI:
- Loading: Loader2 spinner + "Dang xac thuc email..."
- Success: CheckCircle icon (lucide-react) + "Email da duoc xac thuc thanh cong!"
  + Button "Dang nhap" → /login
- Error: XCircle icon (lucide-react) + error message
  + Button "Quay lai dang nhap" → /login
- Dark mode support

---

## File ownership

| File | Owned by this task |
|------|-------------------|
| `src/features/auth/pages/VerifyEmailPage.tsx` | YES — tao moi |
| Moi file khac | KHONG DUOC SUA |

---

## Khi xong

1. Append vao `.context/branches/02/PROGRESS.md`:
```
### Phase 03c: VerifyEmailPage
- Status: done
- Files created: src/features/auth/pages/VerifyEmailPage.tsx
- Notes: [ghi chu neu co]
```
2. KHONG commit
3. Bao: "Phase 03c xong"
