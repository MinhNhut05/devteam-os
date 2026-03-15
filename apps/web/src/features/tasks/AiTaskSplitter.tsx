import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAiSplitTask } from '@/hooks/useAiSplitTask';
import { useCreateSubtask } from '@/hooks/useCreateSubtask';
import type { AiSplitTaskSuggestion } from '@/types/ai';

interface AiTaskSplitterProps {
  taskDescription: string;
  projectId: string;
  taskId: string;
  onSubtaskCreated?: () => void;
}

const PRIORITY_COLORS: Record<AiSplitTaskSuggestion['priority'], string> = {
  URGENT: 'bg-red-500 text-white',
  HIGH: 'bg-orange-500 text-white',
  MEDIUM: 'bg-blue-500 text-white',
  LOW: 'bg-gray-400 text-white',
};

const PRIORITY_LABELS: Record<AiSplitTaskSuggestion['priority'], string> = {
  URGENT: 'Khẩn cấp',
  HIGH: 'Cao',
  MEDIUM: 'Trung bình',
  LOW: 'Thấp',
};

export function AiTaskSplitter({
  taskDescription,
  projectId,
  taskId,
  onSubtaskCreated,
}: AiTaskSplitterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState<Set<number>>(new Set());
  const [isCreating, setIsCreating] = useState(false);

  const aiSplitTask = useAiSplitTask();
  const createSubtask = useCreateSubtask();

  const canTrigger = taskDescription.trim().length >= 10;

  // Khi có suggestions mới → chọn tất cả mặc định
  useEffect(() => {
    if (aiSplitTask.data?.suggestions) {
      const allIndexes = new Set(aiSplitTask.data.suggestions.map((_, i) => i));
      setSelectedIndexes(allIndexes);
    }
  }, [aiSplitTask.data]);

  function handleTrigger() {
    setIsOpen(true);
    aiSplitTask.mutate({ description: taskDescription, taskId });
  }

  function toggleIndex(index: number) {
    setSelectedIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  async function handleCreate() {
    const suggestions = aiSplitTask.data?.suggestions ?? [];
    const toCreate = Array.from(selectedIndexes).map((i) => suggestions[i]);

    if (toCreate.length === 0) return;

    setIsCreating(true);
    try {
      for (const suggestion of toCreate) {
        await createSubtask.mutateAsync({
          projectId,
          taskId,
          data: { title: suggestion.title },
        });
      }
      toast.success(`Đã tạo ${toCreate.length} subtask`);
      onSubtaskCreated?.();
      setIsOpen(false);
      setSelectedIndexes(new Set());
      aiSplitTask.reset();
    } finally {
      setIsCreating(false);
    }
  }

  const suggestions = aiSplitTask.data?.suggestions ?? [];
  const hasParseError =
    !aiSplitTask.isPending &&
    aiSplitTask.data !== undefined &&
    suggestions.length === 0;

  return (
    <div className="mt-2">
      {/* Trigger button */}
      <button
        onClick={handleTrigger}
        disabled={!canTrigger || aiSplitTask.isPending || isCreating}
        title={!canTrigger ? 'Cần mô tả ít nhất 10 ký tự' : undefined}
        className="text-sm flex items-center gap-1.5 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span>🤖</span>
        <span>Gợi ý chia task</span>
      </button>

      {/* Collapsible panel */}
      {isOpen && (
        <div className="mt-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 space-y-2">
          {/* Loading */}
          {aiSplitTask.isPending && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 py-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>AI đang phân tích...</span>
            </div>
          )}

          {/* Parse error */}
          {hasParseError && (
            <p className="text-sm text-gray-500 dark:text-gray-400 py-2">
              AI không thể phân tích, vui lòng thử lại.
            </p>
          )}

          {/* Suggestions list */}
          {suggestions.length > 0 && (
            <>
              <ul className="space-y-1.5">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 rounded-md border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => toggleIndex(index)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIndexes.has(index)}
                      onChange={() => toggleIndex(index)}
                      onClick={(e) => e.stopPropagation()}
                      className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                    <span className="flex-1 text-sm text-gray-800 dark:text-gray-100">
                      {suggestion.title}
                    </span>
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded font-medium ${PRIORITY_COLORS[suggestion.priority]}`}
                    >
                      {PRIORITY_LABELS[suggestion.priority]}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                      {suggestion.estimatedTime}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Create button */}
              <button
                onClick={handleCreate}
                disabled={selectedIndexes.size === 0 || isCreating}
                className="w-full mt-1 py-1.5 rounded-md bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isCreating && <Loader2 className="h-4 w-4 animate-spin" />}
                {isCreating
                  ? 'Đang tạo...'
                  : `Tạo ${selectedIndexes.size} subtask đã chọn`}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
