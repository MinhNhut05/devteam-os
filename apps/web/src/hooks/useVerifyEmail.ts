import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '@/services/api';

interface VerifyEmailResponse {
  message: string;
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: async (token: string) => {
      const response = await api.get<VerifyEmailResponse>(`/auth/verify-email/${token}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Email đã được xác thực thành công!');
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Xác thực email thất bại. Vui lòng thử lại.';
      toast.error(message);
    },
  });
}
