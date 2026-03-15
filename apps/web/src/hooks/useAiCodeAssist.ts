import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '@/services/api';
import type { AiCodeAssistRequest, AiCodeAssistResponse } from '@/types/ai';

export function useAiCodeAssist() {
  return useMutation({
    mutationFn: async (data: AiCodeAssistRequest): Promise<AiCodeAssistResponse> => {
      const res = await api.post<AiCodeAssistResponse>('/ai/code-assist', data);
      return res.data;
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'AI không phản hồi, thử lại sau';
      toast.error(message);
    },
  });
}
