import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'accent';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  success:
    'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400',
  warning:
    'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400',
  danger:
    'bg-danger-100 text-danger-700 dark:bg-danger-900/30 dark:text-danger-400',
  info:
    'bg-info-100 text-info-700 dark:bg-info-900/30 dark:text-info-400',
  accent:
    'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
};

export default function Badge({
  variant = 'default',
  size = 'md',
  children,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}
