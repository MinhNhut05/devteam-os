import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '@/services/api';
import { useAuthStore } from '@/stores/auth.store';
import { useThemeStore } from '@/stores/theme.store';

interface UpdateProfileDto {
  name?: string;
  theme?: 'LIGHT' | 'DARK' | 'SYSTEM';
}

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

export function useUpdateProfile() {
  const updateUser = useAuthStore((state) => state.updateUser);
  const setTheme = useThemeStore((state) => state.setTheme);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileDto) => {
      const response = await api.patch<User>('/users/me', data);
      return response.data;
    },
    onSuccess: (data) => {
      updateUser(data);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      // Sync theme store so App.tsx picks up the change
      const themeMap = { LIGHT: 'light', DARK: 'dark', SYSTEM: 'system' } as const;
      setTheme(themeMap[data.theme]);
      toast.success('Cập nhật thông tin thành công!');
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Cập nhật thông tin thất bại';
      toast.error(message);
    },
  });
}
