import { AiCodeAssistant } from '@/features/ai/AiCodeAssistant';

export function AiAssistantPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hỗ trợ AI</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Hỏi AI để nhận hướng dẫn kỹ thuật và gợi ý triển khai.
        </p>
      </div>

      <AiCodeAssistant />
    </div>
  );
}
