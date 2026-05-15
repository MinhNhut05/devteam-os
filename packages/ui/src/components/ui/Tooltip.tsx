import type { ReactNode } from 'react';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  content: string;
  position?: TooltipPosition;
  children: ReactNode;
}

const positionClasses: Record<TooltipPosition, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

export default function Tooltip({
  content,
  position = 'top',
  children,
}: TooltipProps) {
  return (
    <div className="relative group inline-flex">
      {children}
      <span
        className={`absolute ${positionClasses[position]} z-50 hidden group-hover:block px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-md whitespace-nowrap pointer-events-none animate-fadeIn`}
        role="tooltip"
      >
        {content}
      </span>
    </div>
  );
}
