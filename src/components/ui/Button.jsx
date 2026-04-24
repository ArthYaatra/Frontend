// src/components/ui/Button.jsx
import { forwardRef } from 'react';

/**
 * Button variants: 'primary' | 'secondary' | 'ghost' | 'danger'
 * Sizes: 'sm' | 'md' | 'lg'
 */
const variants = {
  primary:   'bg-gradient-to-br from-primary to-primary-mid text-white shadow-primary hover:opacity-90 active:scale-[0.98]',
  secondary: 'bg-surface-high text-on-surface hover:bg-surface-highest active:scale-[0.98]',
  ghost:     'bg-transparent text-primary hover:bg-primary/8 active:scale-[0.98]',
  outline:   'bg-transparent border border-primary/30 text-primary hover:bg-primary/5 active:scale-[0.98]',
  danger:    'bg-error/10 text-error hover:bg-error/20 active:scale-[0.98]',
};

const sizes = {
  sm: 'px-3 py-2 text-xs font-semibold rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-sm font-bold rounded-xl gap-2',
  lg: 'px-6 py-3 text-md font-bold rounded-xl gap-2',
};

export const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', icon, iconRight, fullWidth, disabled, className = '', children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center whitespace-nowrap font-headline transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
        className,
      ].join(' ')}
      {...props}
    >
      {icon && <span className="material-symbols-outlined" style={{ fontSize: size === 'sm' ? 14 : 18, lineHeight: 1 }}>{icon}</span>}
      {children}
      {iconRight && <span className="material-symbols-outlined" style={{ fontSize: size === 'sm' ? 14 : 18, lineHeight: 1 }}>{iconRight}</span>}
    </button>
  );
});
