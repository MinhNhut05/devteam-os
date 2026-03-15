import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { SkeletonAvatar, SkeletonLine } from '@/components/Skeleton';

const profileSchema = z.object({
  name: z.string().min(2, 'Tên tối thiểu 2 ký tự'),
  theme: z.enum(['LIGHT', 'DARK', 'SYSTEM']),
});

type ProfileForm = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { data: user, isLoading } = useCurrentUser();
  const updateProfileMutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({ name: user.name, theme: user.theme });
    }
  }, [user, reset]);

  const onSubmit = (data: ProfileForm) => {
    updateProfileMutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Avatar + name */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <SkeletonAvatar size="lg" />
          <div className="flex-1 space-y-2">
            <SkeletonLine width="10rem" height="1rem" />
            <SkeletonLine width="6rem" height="0.75rem" />
          </div>
        </div>
        {/* Form fields */}
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-2 animate-pulse">
            <SkeletonLine width="5rem" height="0.75rem" />
            <SkeletonLine height="2.5rem" />
          </div>
        ))}
        {/* Actions */}
        <div className="animate-pulse">
          <SkeletonLine width="8rem" height="2.5rem" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Thông tin cá nhân</h2>

      {/* Avatar + Email info */}
      <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-2xl font-bold text-indigo-600 dark:text-indigo-400 overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            user.name.charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <p className="text-gray-900 dark:text-white font-medium">{user.email}</p>
          <span
            className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${
              user.provider === 'GOOGLE'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            {user.provider === 'GOOGLE' ? 'Google' : 'Email'}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="label">
            Tên hiển thị
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="input"
            placeholder="Nhập tên của bạn"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="theme" className="label">
            Giao diện
          </label>
          <select id="theme" {...register('theme')} className="input">
            <option value="LIGHT">Sáng</option>
            <option value="DARK">Tối</option>
            <option value="SYSTEM">Theo hệ thống</option>
          </select>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={updateProfileMutation.isPending || !isDirty}
            className="btn-primary"
          >
            {updateProfileMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang lưu...
              </>
            ) : (
              'Lưu thay đổi'
            )}
          </button>
          <Link
            to="/settings/password"
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium"
          >
            Đổi mật khẩu
          </Link>
        </div>
      </form>
    </div>
  );
}
