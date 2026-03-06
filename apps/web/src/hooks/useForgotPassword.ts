import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '@/services/api';

interface ForgotPasswordDto {
  email: string;
}

interface ForgotPasswordResponse {
  message: string;
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (data: ForgotPasswordDto) => {
      const response = await api.post<ForgotPasswordResponse>('/auth/forgot-password', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Email reset password đã được gửi!');
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Gửi email thất bại';
      toast.error(message);
    },
  });
}
