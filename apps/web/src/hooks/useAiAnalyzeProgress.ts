import type { AiAnalyzeProgressRequest, AiAnalyzeProgressResponse } from '@/types/ai';
import { useAiJob } from './useAiJob';

export function useAiAnalyzeProgress() {
  return useAiJob<AiAnalyzeProgressRequest, AiAnalyzeProgressResponse>('/ai/analyze-progress');
}
