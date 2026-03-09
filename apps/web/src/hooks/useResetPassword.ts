import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '@/services/api';

interface ResetPasswordDto {
  token: string;
  newPassword: string;
}

export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: ResetPasswordDto) => {
      const response = await api.post<{ message: string }>('/auth/reset-password', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Đặt lại mật khẩu thành công!');
      navigate('/login', { replace: true });
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Đặt lại mật khẩu thất bại';
      toast.error(message);
    },
  });
}
