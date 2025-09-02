import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, disabled, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="flex items-start space-x-3">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              className={cn(
                // Hide default checkbox
                'sr-only',
                className
              )}
              ref={ref}
              disabled={disabled}
              {...props}
            />
            
            {/* Custom checkbox */}
            <div className={cn(
              'flex h-4 w-4 items-center justify-center rounded border-2 transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              
              // States
              disabled 
                ? 'border-gray-300 bg-gray-100 cursor-not-allowed'
                : error
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 bg-white hover:border-blue-400',
              
              // Checked state
              props.checked && !disabled && (
                error 
                  ? 'bg-red-500 border-red-500'
                  : 'bg-blue-600 border-blue-600'
              ),
              
              // Focus
              'focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2'
            )}>
              {props.checked && (
                <Check className={cn(
                  'h-3 w-3 text-white',
                  disabled && 'text-gray-400'
                )} />
              )}
            </div>
          </div>
          
          {(label || description) && (
            <div className="flex-1 min-w-0">
              {label && (
                <label className={cn(
                  'block text-sm font-medium cursor-pointer',
                  disabled 
                    ? 'text-gray-400 cursor-not-allowed'
                    : error 
                      ? 'text-red-700'
                      : 'text-gray-700'
                )}>
                  {label}
                  {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
              )}
              
              {description && (
                <p className={cn(
                  'text-xs mt-1',
                  disabled 
                    ? 'text-gray-400'
                    : 'text-gray-500'
                )}>
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
        
        {error && (
          <p className="mt-1 text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };

