import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '@/services/api';
import type { AiSplitTaskRequest, AiSplitTaskResponse } from '@/types/ai';

export function useAiSplitTask() {
  return useMutation({
    mutationFn: async (data: AiSplitTaskRequest): Promise<AiSplitTaskResponse> => {
      const res = await api.post<AiSplitTaskResponse>('/ai/split-task', data);
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
