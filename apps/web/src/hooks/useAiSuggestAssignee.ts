import type { AiSuggestAssigneeRequest, AiSuggestAssigneeResponse } from '@/types/ai';
import { useAiJob } from './useAiJob';

export function useAiSuggestAssignee() {
  return useAiJob<AiSuggestAssigneeRequest, AiSuggestAssigneeResponse>('/ai/suggest-assignee');
}
