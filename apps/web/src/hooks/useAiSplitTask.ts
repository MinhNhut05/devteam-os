import type { AiSplitTaskRequest, AiSplitTaskResponse } from '@/types/ai';
import { useAiJob } from './useAiJob';

export function useAiSplitTask() {
  return useAiJob<AiSplitTaskRequest, AiSplitTaskResponse>('/ai/split-task');
}
