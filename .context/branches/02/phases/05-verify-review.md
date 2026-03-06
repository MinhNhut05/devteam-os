# Phase 05 — Verify + Integration + Review

> **T1 (Orchestrator) lam phase nay.** KHONG phai T2.
> Chay SAU KHI Phase 3 + Phase 4 da xong.

---

## Scope

### Buoc 1: Integrate pages vao App.tsx

T1 sua `src/App.tsx`:
- Import cac pages moi: ForgotPasswordPage, ResetPasswordPage, VerifyEmailPage, ProfilePage, ChangePasswordPage
- Thay placeholder routes bang components that
- Them routes: `/settings/profile`, `/settings/password` (protected)

### Buoc 2: Verify bang agents

```
Tab moi: "Dung devteam-arch-checker verify toan bo src/features/auth/ va src/hooks/"

Tab moi: "Dung devteam-reviewer review toan bo src/features/auth/, src/hooks/, src/services/api.ts, src/stores/auth.store.ts"
```

### Buoc 3: Fix issues (neu co)

Doc REVIEW output, fix tung issue.

### Buoc 4: Chay devteam-tester (optional)

```
Tab moi: "Dung devteam-tester viet tests cho src/hooks/ — tat ca auth hooks"
```

### Buoc 5: Update docs

```
Tab moi: "Dung devteam-doc-writer update docs cho branch 02"
```

### Buoc 6: Commit

Khi moi thu xong:
```
/commit
```

---

## Checklist

- [ ] ForgotPasswordPage integrate vao App.tsx
- [ ] ResetPasswordPage integrate vao App.tsx
- [ ] VerifyEmailPage integrate vao App.tsx
- [ ] ProfilePage integrate vao App.tsx (route: /settings/profile)
- [ ] ChangePasswordPage integrate vao App.tsx (route: /settings/password)
- [ ] devteam-arch-checker: pass
- [ ] devteam-reviewer: no critical issues
- [ ] Fix issues tu review
- [ ] devteam-doc-writer: STATE.md + PROGRESS.md updated
- [ ] Commit
