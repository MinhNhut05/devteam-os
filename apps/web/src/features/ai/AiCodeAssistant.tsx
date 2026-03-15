import { useState } from 'react';
import { Loader2, Bot } from 'lucide-react';
import { useAiCodeAssist } from '@/hooks/useAiCodeAssist';

// ─── Skeleton loading ────────────────────────────────────────────────────────

function SkeletonResult() {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6" />
      <p className="text-xs text-gray-400 mt-2">AI đang soạn câu trả lời...</p>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function AiCodeAssistant() {
  const [prompt, setPrompt] = useState('');
  const [projectContext, setProjectContext] = useState('');
  const mutation = useAiCodeAssist();

  const isDisabled = prompt.trim().length < 5 || mutation.isPending;

  function handleSubmit() {
    mutation.mutate({
      prompt: prompt.trim(),
      projectContext: projectContext.trim() || undefined,
    });
  }

  return (
    <div className="card p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Bot className="h-5 w-5 text-indigo-500" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Hỗ trợ kỹ thuật</h2>
      </div>

      {/* Prompt input */}
      <div>
        <label className="label" htmlFor="ai-prompt">
          Câu hỏi kỹ thuật
        </label>
        <textarea
          id="ai-prompt"
          className="input min-h-24 resize-y"
          placeholder="Nhập câu hỏi kỹ thuật... (ít nhất 5 ký tự)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      {/* Project context input */}
      <div>
        <label className="label" htmlFor="ai-context">
          Ngữ cảnh dự án{' '}
          <span className="text-xs font-normal text-gray-400 dark:text-gray-500">(tùy chọn)</span>
        </label>
        <textarea
          id="ai-context"
          className="input min-h-16 resize-y"
          placeholder="Mô tả ngữ cảnh project để AI trả lời chính xác hơn..."
          value={projectContext}
          onChange={(e) => setProjectContext(e.target.value)}
        />
      </div>

      {/* Submit button */}
      <div className="flex justify-end">
        <button className="btn-primary gap-2" disabled={isDisabled} onClick={handleSubmit}>
          {mutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Đang hỏi...
            </>
          ) : (
            '🤖 Hỏi AI'
          )}
        </button>
      </div>

      {/* Loading skeleton */}
      {mutation.isPending && <SkeletonResult />}

      {/* Result */}
      {mutation.data && !mutation.isPending && (
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900">
          <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Kết quả:</p>
          <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
            {mutation.data.instruction}
          </pre>
        </div>
      )}
    </div>
  );
}
