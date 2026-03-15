// ============================================================
// AI API Types — match BE DTOs + service return types
// ============================================================

// --- Split Task ---

export interface AiSplitTaskRequest {
  taskId?: string;
  description: string;
  projectContext?: string;
}

export interface AiSplitTaskSuggestion {
  title: string;
  priority: 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW';
  estimatedTime: string;
}

export interface AiSplitTaskResponse {
  suggestions: AiSplitTaskSuggestion[];
  raw?: string;
}

// --- Analyze Progress ---

export interface AiAnalyzeProgressRequest {
  projectId: string;
}

export interface AiProgressRisk {
  description: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface AiAnalyzeProgressResponse {
  analysis: string;
  overallHealth: 'GOOD' | 'AT_RISK' | 'CRITICAL' | 'UNKNOWN';
  risks: AiProgressRisk[];
  recommendations: string[];
}

// --- Suggest Assignee ---

export interface AiSuggestAssigneeRequest {
  taskId: string;
  projectId: string;
  workspaceId: string;
}

export interface AiAssigneeSuggestion {
  userId: string;
  reason: string;
  currentWorkload: number;
}

export interface AiSuggestAssigneeResponse {
  suggestions: AiAssigneeSuggestion[];
}

// --- Code Assist ---

export interface AiCodeAssistRequest {
  prompt: string;
  projectContext?: string;
}

export interface AiCodeAssistResponse {
  instruction: string;
}
