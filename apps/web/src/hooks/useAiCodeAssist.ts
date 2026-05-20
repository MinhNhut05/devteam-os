import type { AiCodeAssistRequest, AiCodeAssistResponse } from '@/types/ai';
import { useAiJob } from './useAiJob';

export function useAiCodeAssist() {
  return useAiJob<AiCodeAssistRequest, AiCodeAssistResponse>('/ai/code-assist');
}
