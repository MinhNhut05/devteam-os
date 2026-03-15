import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '@/services/api';
import type { AiSuggestAssigneeRequest, AiSuggestAssigneeResponse } from '@/types/ai';

export function useAiSuggestAssignee() {
  return useMutation({
    mutationFn: async (data: AiSuggestAssigneeRequest): Promise<AiSuggestAssigneeResponse> => {
      const res = await api.post<AiSuggestAssigneeResponse>('/ai/suggest-assignee', data);
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
