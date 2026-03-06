# Branch 02 — Huong dan Multi-Tab Workflow

> File nay huong dan cach chay branch 02-feat-auth-fe theo mo hinh T1/T2 song song.
> Doc TU TREN XUONG, lam theo TUNG BUOC.

---

## Trang thai hien tai

| Phase | Status | Ghi chu |
|-------|--------|---------|
| Phase 1: Fix Foundation | DONE | auth.store.ts + api.ts da fix |
| Phase 2: Hooks + Pages co ban | DONE | useLogin, useRegister, useLogout, useCurrentUser, ProtectedRoute, PublicRoute, LoginPage, RegisterPage, GoogleLoginButton |
| **Phase 3: Email Features** | **TIEP THEO** | ForgotPassword + ResetPassword + VerifyEmail |
| Phase 4: User Profile | Chua lam | ProfilePage + ChangePasswordPage |
| Phase 5: Verify + Review | Chua lam | Integrate + review + commit |

---

## BUOC 1 — Phase 3: Chay 3 tabs SONG SONG

> 3 pages doc lap, khong dung chung file → chay song song an toan.

### Mo 3 terminal moi, moi terminal chay 1 lenh:

**Terminal A:**
```bash
cd ~/projects/PROGRESS_MANAGEMENT_SYSTEM
claude "Doc .context/branches/02/phases/03a-forgot-password.md roi lam theo. Doc CONTRACTS.md truoc khi code."
```

**Terminal B:**
```bash
cd ~/projects/PROGRESS_MANAGEMENT_SYSTEM
claude "Doc .context/branches/02/phases/03b-reset-password.md roi lam theo. Doc CONTRACTS.md truoc khi code."
```

**Terminal C:**
```bash
cd ~/projects/PROGRESS_MANAGEMENT_SYSTEM
claude "Doc .context/branches/02/phases/03c-verify-email.md roi lam theo. Doc CONTRACTS.md truoc khi code."
```

### Lam sao biet 3 tabs da xong?

**Cach 1 (don gian):** Nhin tung terminal — khi tab nao in "Phase 03x xong" la xong.
Khi ca 3 tab deu in xong → chay: `cat .context/branches/02/PROGRESS.md`

**Cach 2 (tu dong):** Mo them 1 terminal, chay watch script:
```bash
bash .context/branches/02/watch-progress.sh --phase3
```
Script se tu dong check moi 5 giay va BAO khi du 3 tab xong, kem luon lenh buoc tiep theo.

### Cho 3 tabs xong

- Moi tab se bao "Phase 03x xong" khi hoan thanh
- Kiem tra `.context/branches/02/PROGRESS.md` — 3 entries moi phai co
- Kiem tra files da tao:
  ```
  src/hooks/useForgotPassword.ts        ← tu 03a
  src/hooks/useResetPassword.ts         ← tu 03b
  src/features/auth/pages/ForgotPasswordPage.tsx  ← tu 03a
  src/features/auth/pages/ResetPasswordPage.tsx   ← tu 03b
  src/features/auth/pages/VerifyEmailPage.tsx     ← tu 03c
  ```

---

## BUOC 2 — Verify Phase 3 bang Agent Teams

> Sau khi 3 tabs xong, dung agent teams de review song song.

### Mo terminal moi:

```bash
cd ~/projects/PROGRESS_MANAGEMENT_SYSTEM
claude "Dung devteam-arch-checker verify cac file moi trong src/features/auth/pages/ va src/hooks/. Check imports, types match CONTRACTS.md, khong circular deps."
```

### Hoac dung /agent-teams:team-review (manh hon):

```bash
cd ~/projects/PROGRESS_MANAGEMENT_SYSTEM
claude "/agent-teams:team-review Review Phase 3 files: src/features/auth/pages/ForgotPasswordPage.tsx, src/features/auth/pages/ResetPasswordPage.tsx, src/features/auth/pages/VerifyEmailPage.tsx, src/hooks/useForgotPassword.ts, src/hooks/useResetPassword.ts"
```

### Neu co issues: fix trong terminal moi

```bash
claude "Doc .context/branches/02/PROGRESS.md de biet Phase 3 da lam gi. Fix cac issues sau: [paste issues tu review]"
```

---

## BUOC 3 — Phase 4: Chay 2 tabs SONG SONG

> ProfilePage va ChangePasswordPage doc lap → song song.

**Terminal D:**
```bash
cd ~/projects/PROGRESS_MANAGEMENT_SYSTEM
claude "Doc .context/branches/02/phases/04a-profile-page.md roi lam theo. Doc CONTRACTS.md truoc khi code."
```

**Terminal E:**
```bash
cd ~/projects/PROGRESS_MANAGEMENT_SYSTEM
claude "Doc .context/branches/02/phases/04b-change-password.md roi lam theo. Doc CONTRACTS.md truoc khi code."
```

### Cho 2 tabs xong

- Kiem tra files da tao:
  ```
  src/hooks/useUpdateProfile.ts          ← tu 04a
  src/hooks/useChangePassword.ts         ← tu 04b
  src/features/auth/pages/ProfilePage.tsx         ← tu 04a
  src/features/auth/pages/ChangePasswordPage.tsx  ← tu 04b
  ```

---

## BUOC 4 — Phase 5: Integrate + Review (T1 tab)

> Buoc nay lam trong 1 tab duy nhat (T1 — Orchestrator).

### Mo terminal moi (T1):

```bash
cd ~/projects/PROGRESS_MANAGEMENT_SYSTEM
claude "Doc .context/branches/02/phases/05-verify-review.md roi lam theo. Integrate tat ca pages moi vao App.tsx, chay devteam-arch-checker, devteam-reviewer."
```

### Hoac lam thu cong tung buoc:

**Buoc 4.1: Integrate vao App.tsx**
```bash
claude "Import ForgotPasswordPage, ResetPasswordPage, VerifyEmailPage, ProfilePage, ChangePasswordPage vao App.tsx. Thay placeholder routes bang components that. Them /settings/profile va /settings/password la protected routes."
```

**Buoc 4.2: Arch check**
```bash
claude "Dung devteam-arch-checker verify toan bo src/features/auth/, src/hooks/, src/components/, src/stores/auth.store.ts, src/services/api.ts"
```

**Buoc 4.3: Code review**
```bash
claude "Dung devteam-reviewer review toan bo auth frontend. Focus: security (token handling), architecture (hooks pattern), performance (re-renders), code quality."
```

**Buoc 4.4: Tests (optional)**
```bash
claude "Dung devteam-tester viet unit tests cho src/hooks/ — tat ca auth hooks"
```

**Buoc 4.5: Update docs**
```bash
claude "Dung devteam-doc-writer update .context/STATE.md va .context/branches/02/PROGRESS.md cho branch 02"
```

**Buoc 4.6: Commit**
```bash
claude "/commit"
```

---

## TONG KET TIMELINE

```
                    SONG SONG
                ┌─── Terminal A: 03a-forgot-password
BUOC 1 ─────────┼─── Terminal B: 03b-reset-password
(Phase 3)       └─── Terminal C: 03c-verify-email
                        │
                        ▼
BUOC 2 ──────── Terminal: team-review / arch-checker
(Verify P3)             │
                        ▼
                    SONG SONG
BUOC 3 ─────────┌─── Terminal D: 04a-profile-page
(Phase 4)       └─── Terminal E: 04b-change-password
                        │
                        ▼
BUOC 4 ──────── Terminal T1: integrate + review + commit
(Phase 5)
```

---

## TIPS

1. **Moi terminal = 1 task nho** — khong nhoi nhieu task vao 1 tab
2. **Doc CONTRACTS.md** — moi T2 phai doc truoc khi code
3. **Khong sua file ngoai scope** — moi tab chi duoc tao/sua files trong scope cua no
4. **PROGRESS.md la nguon su that** — moi tab append progress khi xong
5. **T1 (Orchestrator) quyet dinh** — khi co conflict hoac issue, quay ve T1
6. **Commit chi o cuoi** — khi moi thu da verify xong

---

*Created: 2026-03-07*
