import { useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { useAiSuggestAssignee } from '@/hooks/useAiSuggestAssignee';
import { useWorkspaceMembers } from '@/hooks/useWorkspaceMembers';

interface AiSuggestAssigneeProps {
  taskId: string;
  projectId: string;
  workspaceId: string;
  onAssign?: (userId: string) => void;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function getWorkloadBadgeColor(workload: number): string {
  if (workload >= 5) return 'bg-red-100 text-red-700';
  if (workload >= 2) return 'bg-yellow-100 text-yellow-700';
  return 'bg-green-100 text-green-700';
}

export function AiSuggestAssignee({
  taskId,
  projectId,
  workspaceId,
  onAssign,
}: AiSuggestAssigneeProps) {
  const [isOpen, setIsOpen] = useState(false);

  const aiSuggest = useAiSuggestAssignee();
  const { data: members } = useWorkspaceMembers(workspaceId);

  function handleTrigger() {
    setIsOpen(true);
    aiSuggest.mutate({ taskId, projectId, workspaceId });
  }

  function handleAssign(userId: string) {
    onAssign?.(userId);
    setIsOpen(false);
  }

  function handleDismiss() {
    setIsOpen(false);
  }

  const suggestions = aiSuggest.data?.suggestions?.slice(0, 3) ?? [];

  return (
    <div className="relative w-full space-y-2">
      {/* Trigger button */}
      <button
        onClick={handleTrigger}
        disabled={aiSuggest.isPending}
        className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <span>🤖</span>
        <span>Gợi ý người làm</span>
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-auto mt-1.5 w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Gợi ý người phụ trách
            </span>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Đóng"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content */}
          <div className="py-1">
            {/* Loading */}
            {aiSuggest.isPending && (
              <div className="flex items-center gap-2 px-3 py-3 text-sm text-gray-500 dark:text-gray-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Đang phân tích...</span>
              </div>
            )}

            {/* No suggestions */}
            {!aiSuggest.isPending && aiSuggest.data && suggestions.length === 0 && (
              <p className="px-3 py-3 text-sm text-gray-500 dark:text-gray-400">
                Không tìm được gợi ý phù hợp.
              </p>
            )}

            {/* Suggestions list */}
            {suggestions.length > 0 && (
              <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                {suggestions.map((suggestion, index) => {
                  const member = members?.find((m) => m.userId === suggestion.userId);
                  const displayName = member?.user.name ?? 'Không rõ';
                  const initials = getInitials(displayName);
                  const badgeColor = getWorkloadBadgeColor(suggestion.currentWorkload);

                  return (
                    <li key={index} className="px-3 py-2.5">
                      {/* Name row */}
                      <div className="flex items-center gap-2 mb-1">
                        {/* Avatar */}
                        <div className="h-7 w-7 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-semibold text-purple-700 dark:text-purple-300">
                            {initials}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-100 flex-1 truncate">
                          {displayName}
                        </span>
                      </div>

                      {/* Reason */}
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 pl-9 leading-relaxed">
                        &ldquo;{suggestion.reason}&rdquo;
                      </p>

                      {/* Footer row: workload badge + assign button */}
                      <div className="flex items-center justify-between pl-9">
                        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${badgeColor}`}>
                          {suggestion.currentWorkload} task đang xử lý
                        </span>
                        <button
                          onClick={() => handleAssign(suggestion.userId)}
                          className="text-xs px-2.5 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
                        >
                          Giao việc
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
