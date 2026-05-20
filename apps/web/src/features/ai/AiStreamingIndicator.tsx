import { type FC } from 'react';

interface AiStreamingIndicatorProps {
  label?: string;
}

export const AiStreamingIndicator: FC<AiStreamingIndicatorProps> = ({
  label = 'AI đang xử lý...',
}) => {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
      <div className="flex gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500 [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-500" />
      </div>
      <span>{label}</span>
    </div>
  );
};
