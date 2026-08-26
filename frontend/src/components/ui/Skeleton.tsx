import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'animate-pulse bg-surface-200 rounded',
        className,
      )}
    />
  );
}
