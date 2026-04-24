// src/components/ui/Input.jsx
import { forwardRef } from 'react';

export const Input = forwardRef(function Input(
  { label, prefix, suffix, icon, error, hint, className = '', ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <span className="material-symbols-outlined absolute left-3 text-outline pointer-events-none"
            style={{ fontSize: 18, lineHeight: 1 }}>
            {icon}
          </span>
        )}
        {prefix && (
          <span className="absolute left-3 text-sm font-semibold text-on-surface-variant pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          className={[
            'w-full bg-surface-highest rounded-lg border-none outline-none',
            'text-on-surface text-sm font-medium',
            'transition-all duration-150',
            'focus:bg-white focus:ring-2 focus:ring-primary/20 focus:shadow-sm',
            'placeholder:text-outline',
            icon   ? 'pl-9 pr-4 py-2.5'  : '',
            prefix ? 'pl-8 pr-4 py-2.5'  : '',
            suffix ? 'pl-4 pr-9 py-2.5'  : '',
            !icon && !prefix && !suffix ? 'px-4 py-2.5' : '',
            error  ? 'ring-2 ring-error/30 bg-error/5' : '',
            className,
          ].join(' ')}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 text-sm font-semibold text-on-surface-variant pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-error">{error}</p>}
      {hint && !error && <p className="text-xs text-on-surface-variant">{hint}</p>}
    </div>
  );
});

export const RangeInput = ({ label, value, displayValue, min, max, step, onChange }) => (
  <div className="flex flex-col gap-3">
    <div className="flex justify-between items-end">
      <label className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant">{label}</label>
      <span className="text-lg font-extrabold font-headline text-primary">{displayValue}</span>
    </div>
    <input
      type="range" min={min} max={max} step={step} value={value} onChange={onChange}
      className="w-full accent-primary h-1 rounded-full appearance-none bg-surface-highest cursor-pointer"
    />
  </div>
);
