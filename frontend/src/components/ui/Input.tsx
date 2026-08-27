import { type InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-surface-700 mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full rounded-lg border px-3 py-2 text-sm transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            error
              ? 'border-danger-300 focus:ring-danger-500 focus:border-danger-500'
              : 'border-surface-200',
            'placeholder:text-surface-400',
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-danger-600">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
