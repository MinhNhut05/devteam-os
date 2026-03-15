import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '@/services/api';
import type { AiAnalyzeProgressRequest, AiAnalyzeProgressResponse } from '@/types/ai';

export function useAiAnalyzeProgress() {
  return useMutation({
    mutationFn: async (data: AiAnalyzeProgressRequest): Promise<AiAnalyzeProgressResponse> => {
      const res = await api.post<AiAnalyzeProgressResponse>('/ai/analyze-progress', data);
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
