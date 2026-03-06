# Branch 02 — CONTRACTS.md

> T2/T3 PHAI doc file nay TRUOC khi code. Day la cac interfaces, imports, patterns bat buoc.

---

## Files da co (KHONG sua, chi import)

| File | Export | Muc dich |
|------|--------|---------|
| `src/services/api.ts` | `api` (default), `{ api }` (named) | Axios instance voi interceptor |
| `src/stores/auth.store.ts` | `{ useAuthStore }` | Zustand auth store |
| `src/hooks/useLogin.ts` | `{ useLogin }` | useMutation login |
| `src/hooks/useRegister.ts` | `{ useRegister }` | useMutation register |
| `src/hooks/useLogout.ts` | `{ useLogout }` | useMutation logout |
| `src/hooks/useCurrentUser.ts` | `{ useCurrentUser }` | useQuery GET /users/me |
| `src/components/ProtectedRoute.tsx` | default `ProtectedRoute` | Route guard |
| `src/components/PublicRoute.tsx` | default `PublicRoute` | Public route guard |
| `src/layouts/AuthLayout.tsx` | default `AuthLayout` | Layout cho auth pages |
| `src/features/auth/components/GoogleLoginButton.tsx` | default `GoogleLoginButton` | Google OAuth button |

---

## API Endpoints (Backend da co)

```
POST   /api/auth/register         → { user }
POST   /api/auth/login            → { accessToken, user }  (+ refresh cookie)
POST   /api/auth/logout           → { message }
POST   /api/auth/refresh          → { accessToken, user }  (+ refresh cookie)
GET    /api/auth/google           → redirect Google OAuth
POST   /api/auth/forgot-password  → { message }
POST   /api/auth/reset-password   → { message }
GET    /api/auth/verify-email/:token → { message }

GET    /api/users/me              → { user }
PATCH  /api/users/me              → { user }
PATCH  /api/users/me/password     → { message }
POST   /api/users/me/avatar       → { user } (multipart/form-data)
```

---

## Types bat buoc

```typescript
// User type — dung cho tat ca components
interface User {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  provider: 'LOCAL' | 'GOOGLE';
  theme: 'LIGHT' | 'DARK' | 'SYSTEM';
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}
```

---

## Error Response Pattern

```typescript
// Backend tra loi loi theo format nay:
interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}

// Cach extract message trong hook:
const message =
  (error as { response?: { data?: { message?: string } } })
    ?.response?.data?.message || 'Fallback message';
```

---

## Hook Pattern bat buoc

```typescript
// useMutation pattern (xem useLogin.ts lam mau)
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '@/services/api';

export function useXxx() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: XxxDto) => {
      const response = await api.post('/endpoint', data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('Message');
      navigate('/path', { replace: true });
    },
    onError: (error: unknown) => {
      const message = (error as { response?: { data?: { message?: string } } })
        ?.response?.data?.message || 'Fallback';
      toast.error(message);
    },
  });
}
```

---

## Page Pattern bat buoc

```typescript
// Page pattern (xem LoginPage.tsx lam mau)
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

// 1. Zod schema
const xxxSchema = z.object({ ... });
type XxxForm = z.infer<typeof xxxSchema>;

// 2. Component
export default function XxxPage() {
  const mutation = useXxx();
  const { register, handleSubmit, formState: { errors } } = useForm<XxxForm>({
    resolver: zodResolver(xxxSchema),
  });

  const onSubmit = (data: XxxForm) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Title</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* inputs */}
        <button type="submit" disabled={mutation.isPending} className="btn-primary w-full">
          {mutation.isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Loading...</> : 'Submit'}
        </button>
      </form>
    </div>
  );
}
```

---

## CSS Classes co san

| Class | Muc dich |
|-------|---------|
| `.btn-primary` | Nut chinh (indigo) |
| `.btn-secondary` | Nut phu (gray) |
| `.btn-danger` | Nut nguy hiem (red) |
| `.input` | Input field |
| `.label` | Label cho input |
| `.card` | Card container |

---

## Rules

1. **KHONG import tu file chua ton tai** — doc CONTRACTS truoc
2. **KHONG sua file ngoai scope** — chi tao/sua files duoc giao
3. **Dung `@/` alias** — VD: `import api from '@/services/api'`
4. **Form validation = Zod** — schema rieng cho moi form
5. **UI text tieng Viet** — labels, messages, placeholders
6. **Dark mode support** — dung `dark:` prefix cho moi style
7. **Khi xong** — cap nhat `.context/branches/02/PROGRESS.md`, KHONG commit
