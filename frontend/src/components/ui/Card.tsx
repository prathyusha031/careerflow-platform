import type { HTMLAttributes } from 'react';
import clsx from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function Card({ className, hover, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl border border-surface-200/80 shadow-sm',
        hover && 'hover:shadow-md hover:border-surface-200 transition-all duration-200 cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
