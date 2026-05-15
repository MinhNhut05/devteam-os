// Skeleton components — dùng chung cho toàn app

interface SkeletonLineProps {
  width?: string;
  height?: string;
}

const shimmerClass =
  'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer';

export function SkeletonLine({ width = '100%', height = '1rem' }: SkeletonLineProps) {
  return (
    <div
      style={{ width, height }}
      className={`rounded ${shimmerClass}`}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="card p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className={`h-10 w-10 rounded-xl flex-shrink-0 ${shimmerClass}`} />
        <div className="flex-1 space-y-2">
          <SkeletonLine width="8rem" height="1rem" />
          <SkeletonLine height="0.75rem" />
          <SkeletonLine width="66%" height="0.75rem" />
        </div>
      </div>
      <SkeletonLine width="6rem" height="1.25rem" />
    </div>
  );
}

interface SkeletonTableRowProps {
  cols: number;
}

export function SkeletonTableRow({ cols }: SkeletonTableRowProps) {
  return (
    <div className="flex gap-4 py-2">
      {Array.from({ length: cols }).map((_, index) => (
        <SkeletonLine key={index} height="1rem" />
      ))}
    </div>
  );
}

type AvatarSize = 'sm' | 'md' | 'lg';

const avatarSizeClasses: Record<AvatarSize, string> = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

interface SkeletonAvatarProps {
  size?: AvatarSize;
}

export function SkeletonAvatar({ size = 'md' }: SkeletonAvatarProps) {
  return (
    <div
      className={`${avatarSizeClasses[size]} rounded-full flex-shrink-0 ${shimmerClass}`}
    />
  );
}
