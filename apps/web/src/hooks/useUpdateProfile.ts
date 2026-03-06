import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '@/services/api';
import { useAuthStore } from '@/stores/auth.store';

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileDto) => {
      const response = await api.patch<{ user: User }>('/users/me', data);
      return response.data;
    },
    onSuccess: (data) => {
      updateUser(data.user);
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
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
