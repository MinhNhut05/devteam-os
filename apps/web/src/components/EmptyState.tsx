// EmptyState component — dùng chung cho toàn app

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  compact?: boolean;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  compact = false,
}: EmptyStateProps) {
  if (compact) {
    return (
      <div className="py-4 text-center">
        {icon && (
          <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <span className="w-5 h-5 text-gray-400 dark:text-gray-500 [&>svg]:w-5 [&>svg]:h-5">
              {icon}
            </span>
          </div>
        )}
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</p>
        {description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        )}
      </div>
    );
  }

  return (
    <div className="py-12 text-center">
      {icon && (
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <span className="w-8 h-8 text-gray-400 dark:text-gray-500 [&>svg]:w-8 [&>svg]:h-8">
            {icon}
          </span>
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{description}</p>
      )}
      {action && (
        <button type="button" onClick={action.onClick} className="btn-primary">
          {action.label}
        </button>
      )}
    </div>
  );
}
