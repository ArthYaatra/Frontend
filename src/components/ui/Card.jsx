// src/components/ui/Card.jsx

/**
 * Card variants: 'default' | 'raised' | 'surface' | 'primary' | 'ghost'
 */
const variants = {
  default: 'bg-white rounded-xl shadow-card border border-outline-variant/15',
  raised:  'bg-white rounded-xl shadow-card-lg border border-outline-variant/10',
  surface: 'bg-surface-low rounded-xl border border-transparent',
  primary: 'bg-gradient-to-br from-primary to-primary-mid rounded-xl shadow-primary text-white overflow-hidden relative',
  ghost:   'bg-transparent rounded-xl border border-outline-variant/30',
};

export function Card({ variant = 'default', className = '', children, ...props }) {
  return (
    <div className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-5 ${className}`}>
      <div className="min-w-0">
        <h3 className="font-headline text-base sm:text-lg font-bold text-[#164e5f] leading-tight">{title}</h3>
        {subtitle && <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="sm:flex-shrink-0 sm:ml-4">{action}</div>}
    </div>
  );
}

export function CardContent({ className = '', children }) {
  return <div className={`p-4 sm:p-5 lg:p-6 ${className}`}>{children}</div>;
}

export function CardFooter({ className = '', children }) {
  return (
    <div className={`px-4 sm:px-5 lg:px-6 py-4 border-t border-surface-container flex items-center justify-between ${className}`}>
      {children}
    </div>
  );
}
