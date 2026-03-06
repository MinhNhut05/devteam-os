import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '@/services/api';

interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (data: ChangePasswordDto) => {
      const response = await api.patch<{ message: string }>('/users/me/password', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Đổi mật khẩu thành công!');
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Đổi mật khẩu thất bại';
      toast.error(message);
    },
  });
}
