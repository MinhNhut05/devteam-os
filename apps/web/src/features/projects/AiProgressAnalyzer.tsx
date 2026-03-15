import { useState } from 'react';
import { Bot, X, Loader2 } from 'lucide-react';
import { useAiAnalyzeProgress } from '@/hooks/useAiAnalyzeProgress';
import type { AiAnalyzeProgressResponse, AiProgressRisk } from '@/types/ai';

// ─── Helper functions ────────────────────────────────────────────────────────

function healthBadgeClass(health: AiAnalyzeProgressResponse['overallHealth']): string {
  switch (health) {
    case 'GOOD':
      return 'inline-flex px-2.5 py-1 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300';
    case 'AT_RISK':
      return 'inline-flex px-2.5 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300';
    case 'CRITICAL':
      return 'inline-flex px-2.5 py-1 rounded text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300';
    default:
      return 'inline-flex px-2.5 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400';
  }
}

const healthLabels: Record<string, string> = {
  GOOD: '🟢 TỐT',
  AT_RISK: '🟡 CÓ RỦI RO',
  CRITICAL: '🔴 NGHIÊM TRỌNG',
  UNKNOWN: '⚪ KHÔNG XÁC ĐỊNH',
};

function healthLabel(health: AiAnalyzeProgressResponse['overallHealth']): string {
  return healthLabels[health] ?? healthLabels['UNKNOWN'];
}

function riskSeverityClass(severity: AiProgressRisk['severity']): string {
  switch (severity) {
    case 'HIGH':
      return 'font-medium text-red-600 dark:text-red-400';
    case 'MEDIUM':
      return 'font-medium text-yellow-600 dark:text-yellow-400';
    default:
      return 'font-medium text-gray-500 dark:text-gray-400';
  }
}

// ─── Props ───────────────────────────────────────────────────────────────────

interface AiProgressAnalyzerProps {
  projectId: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function AiProgressAnalyzer({ projectId }: AiProgressAnalyzerProps) {
  const [result, setResult] = useState<AiAnalyzeProgressResponse | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { mutate, isPending } = useAiAnalyzeProgress();

  function handleAnalyze() {
    setResult(null);
    setIsVisible(true);
    mutate(
      { projectId },
      {
        onSuccess: (data) => {
          setResult(data);
        },
        onError: () => {
          setIsVisible(false);
        },
      },
    );
  }

  function handleClose() {
    setResult(null);
    setIsVisible(false);
  }

  return (
    <div className="space-y-3">
      {/* Trigger button */}
      <button
        onClick={handleAnalyze}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        <Bot className="h-4 w-4" />
        🤖 Phân tích tiến độ
      </button>

      {/* Result / Loading panel */}
      {isVisible && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 space-y-4 dark:border-gray-700 dark:bg-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Phân tích AI
            </h3>
            <button
              onClick={handleClose}
              className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              aria-label="Đóng"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Loading state */}
          {isPending && !result && (
            <div className="flex items-center gap-3 py-4 text-gray-500 dark:text-gray-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>AI đang phân tích dữ liệu project...</span>
            </div>
          )}

          {/* Result state */}
          {result && (
            <>
              {/* Overall health badge */}
              <div>
                <span className={healthBadgeClass(result.overallHealth)}>
                  {healthLabel(result.overallHealth)}
                </span>
              </div>

              {/* Nhận xét tổng quan */}
              <p className="text-sm text-gray-700 dark:text-gray-300">{result.analysis}</p>

              {/* Rủi ro */}
              {result.risks.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">⚠️ Rủi ro:</p>
                  <ul className="space-y-1">
                    {result.risks.map((risk, i) => (
                      <li key={i} className="text-sm">
                        <span className={riskSeverityClass(risk.severity)}>[{risk.severity}]</span>{' '}
                        {risk.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Đề xuất */}
              {result.recommendations.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">💡 Đề xuất:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {result.recommendations.map((rec, i) => (
                      <li key={i} className="text-sm text-gray-700 dark:text-gray-300">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
