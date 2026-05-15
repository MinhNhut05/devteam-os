# 02-feat-auth-fe — Progress

> **Trang thai:** Done
> **Cap nhat:** 2026-03-07

---

## Phase 1: Fix Foundation (DONE)

### Task 1.1: Fix auth.store.ts
- Status: done
- Files changed: src/stores/auth.store.ts
- Changes: Bo persist accessToken, them isHydrated, them onRehydrateStorage, them provider/emailVerified vao User interface
- Verified by: devteam-reviewer + devteam-arch-checker

### Task 1.2: Fix api.ts
- Status: done
- Files changed: src/services/api.ts
- Changes: Them auto refresh token interceptor, withCredentials, failedQueue pattern, skip /auth/logout
- Verified by: devteam-reviewer + devteam-arch-checker

---

## Phase 2: Hooks + Pages co ban (DONE)

### Task 2.1: TanStack Query hooks
- Status: done
- Files created: src/hooks/useLogin.ts, src/hooks/useRegister.ts, src/hooks/useLogout.ts, src/hooks/useCurrentUser.ts

### Task 2.2: Route guards
- Status: done
- Files created: src/components/ProtectedRoute.tsx, src/components/PublicRoute.tsx
- Notes: Dung isHydrated tranh flash redirect

### Task 2.3: Refactor LoginPage + RegisterPage
- Status: done
- Files changed: src/features/auth/LoginPage.tsx, src/features/auth/RegisterPage.tsx
- Changes: Dung hooks thay vi api.post truc tiep, them link "Quen mat khau"

### Task 2.4: GoogleLoginButton
- Status: done
- Files created: src/features/auth/components/GoogleLoginButton.tsx
- Notes: Redirect sang BE /api/auth/google

### Task 2.5: Update App.tsx
- Status: done
- Files changed: src/App.tsx
- Changes: Import ProtectedRoute/PublicRoute tu file rieng, them placeholder routes Phase 3

---

## Phase 3: Email Features (DONE)

### Phase 03a: ForgotPasswordPage
- Status: done
- Files created: src/hooks/useForgotPassword.ts, src/features/auth/pages/ForgotPasswordPage.tsx
- Notes: Form email + success state thay form, dark mode support, KHONG them route (file ownership)

### Phase 03b: ResetPasswordPage
- Status: done
- Files created: src/hooks/useResetPassword.ts, src/features/auth/pages/ResetPasswordPage.tsx
- Notes: 2 fields (password + confirmPassword) voi independent show/hide toggle, token tu URL params, KHONG them route (file ownership)

### Phase 03c: VerifyEmailPage
- Status: done
- Files created: src/hooks/useVerifyEmail.ts, src/features/auth/pages/VerifyEmailPage.tsx
- Notes: useVerifyEmail hook + auto mutate khi mount, 3 states (loading/success/error), dark mode, KHONG them route (file ownership)

### Phase 3 Review Fixes
- Status: done
- Issues fixed:
  - CRITICAL: Extract useVerifyEmail.ts hook (contract compliance)
  - CRITICAL: Fix VerifyEmailPage infinite spinner khi token undefined
  - CRITICAL: Fix ResetPasswordPage silent fail khi token undefined (hien error page)
  - WARNING: Them dark:text-indigo-400 cho ResetPasswordPage link
- Verified by: devteam-arch-checker + devteam-reviewer + tsc --noEmit

---

## Phase 4: User Profile (DONE)

### Phase 04a: ProfilePage
- Status: done
- Files created: src/hooks/useUpdateProfile.ts, src/features/auth/pages/ProfilePage.tsx
- Notes: useCurrentUser + useUpdateProfile, avatar display, provider badge, theme select, dark mode. Can them route /settings/profile vao App.tsx (Phase 5)

### Phase 04b: ChangePasswordPage
- Status: done
- Files created: src/hooks/useChangePassword.ts, src/features/auth/pages/ChangePasswordPage.tsx
- Notes: 3 fields (current/new/confirm), Zod double refine (khong giong cu + khop), show/hide toggle, reset form on success. Can them route /settings/password vao App.tsx (Phase 5)

---

## Phase 5: Verify + Review (DONE)

### Task 5.1: Integrate pages vao App.tsx
- Status: done
- Files changed: src/App.tsx
- Changes: Import 5 pages moi, thay placeholder routes bang components, them /settings/profile + /settings/password (protected)

### Task 5.2: Final review
- Status: done
- Arch-checker: 16 PASS, 3 WARN, 0 CRITICAL/FAIL
  - WARN: ProtectedRoute/PublicRoute dung React.ReactNode khong import React (fragile but works)
  - WARN: User interface duplicated across 4 files (tech debt, khong block merge)
  - WARN: useLogout onError skip toast (intentional)
- Reviewer: 3 CRITICAL (da fix truoc do), 5 WARNING (non-blocking), 3 SUGGESTION
  - Warnings: directory structure inconsistency, eslint-disable comment, duplicate error pattern, password validation
  - Suggestions: extract api error util, document double-callback, share ApiMessageResponse
- Ket luan: All critical issues fixed, remaining items la tech debt cho branch sau
