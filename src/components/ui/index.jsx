// src/components/ui/Toggle.jsx
export function Toggle({ on, onToggle, label }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={[
        'relative inline-flex items-center w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 flex-shrink-0',
        on ? 'bg-primary' : 'bg-surface-highest',
      ].join(' ')}
    >
      <span
        className={[
          'inline-block w-5 h-5 bg-white rounded-full shadow transition-transform duration-200',
          on ? 'translate-x-5' : 'translate-x-0.5',
        ].join(' ')}
      />
      {label && <span className="sr-only">{label}</span>}
    </button>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
const badgeVariants = {
  default:  'bg-surface-high text-on-surface-variant',
  primary:  'bg-primary/10 text-primary',
  success:  'bg-[#d1fae5] text-[#065f46]',
  warning:  'bg-[#fef3c7] text-[#92400e]',
  error:    'bg-error-container text-error',
  tertiary: 'bg-[#ffdcc1] text-[#6b3b06]',
};

export function Badge({ variant = 'default', icon, children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 text-2xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${badgeVariants[variant]} ${className}`}>
      {icon && <span className="material-symbols-outlined" style={{ fontSize: 12, lineHeight: 1 }}>{icon}</span>}
      {children}
    </span>
  );
}

// ─── ProgressBar ──────────────────────────────────────────────────────────────
export function ProgressBar({ value, color = 'bg-primary', height = 'h-1.5', className = '' }) {
  return (
    <div className={`w-full ${height} bg-surface-container rounded-full overflow-hidden ${className}`}>
      <div
        className={`h-full ${color} rounded-full transition-all duration-500`}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}

// ─── Icon ─────────────────────────────────────────────────────────────────────
export function Icon({ name, filled = false, size = 20, className = '' }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontVariationSettings: filled
          ? "'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24"
          : "'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24",
        fontSize: size,
        lineHeight: 1,
        display: 'inline-block',
        userSelect: 'none',
        verticalAlign: 'middle',
      }}
    >
      {name}
    </span>
  );
}

// ─── StatusChip ───────────────────────────────────────────────────────────────
const STATUS_MAP = {
  'ON TRACK':     { bg: 'bg-[#d1fae5]', text: 'text-[#065f46]' },
  'PAID':         { bg: 'bg-[#d1fae5]', text: 'text-[#065f46]' },
  'PENDING':      { bg: 'bg-[#fef3c7]', text: 'text-[#92400e]' },
  'UPCOMING':     { bg: 'bg-surface-high', text: 'text-on-surface-variant' },
  'HIGH INT.':    { bg: 'bg-[#ffdcc1]', text: 'text-[#6b3b06]' },
  'LIMIT REACHED':{ bg: 'bg-error-container', text: 'text-error' },
  'PLANNED':      { bg: 'bg-surface-highest', text: 'text-on-surface-variant' },
  'Recommended':  { bg: 'bg-[#006778]', text: 'text-white' },
  'CREDITED':     { bg: 'bg-[#d1fae5]', text: 'text-[#065f46]' },
  'DEBITED':      { bg: 'bg-error-container', text: 'text-error' },
};

export function StatusChip({ status }) {
  const s = STATUS_MAP[status] || { bg: 'bg-surface-high', text: 'text-on-surface-variant' };
  return (
    <span className={`inline-block text-2xs font-bold uppercase tracking-wide px-2 py-0.5 rounded ${s.bg} ${s.text}`}>
      {status}
    </span>
  );
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
export function StatCard({ label, value, badge, badgeVariant = 'default', icon, iconBg = 'bg-surface-low', iconColor = 'text-primary', sub, trend, trendUp, progress, progressColor = 'bg-primary' }) {
  return (
    <div className="bg-white rounded-xl shadow-card border border-outline-variant/15 p-4 sm:p-5">
      <div className="flex justify-between items-start mb-3">
        {icon && (
          <div className={`w-9 h-9 rounded-full ${iconBg} ${iconColor} flex items-center justify-center`}>
            <Icon name={icon} size={18} />
          </div>
        )}
        {badge && <Badge variant={badgeVariant}>{badge}</Badge>}
      </div>
      <p className="text-2xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">{label}</p>
      <p className="font-headline text-xl sm:text-2xl font-extrabold text-on-surface break-words">{value}</p>
      {trend && (
        <div className={`flex items-center gap-1 mt-1.5 text-xs font-bold ${trendUp ? 'text-[#059669]' : 'text-error'}`}>
          <Icon name={trendUp ? 'trending_up' : 'trending_down'} size={14} />
          {trend}
        </div>
      )}
      {sub && <p className="text-xs text-on-surface-variant mt-1">{sub}</p>}
      {progress !== undefined && <ProgressBar value={progress} color={progressColor} className="mt-3" />}
    </div>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────
export function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-5">
      <div className="min-w-0">
        <h3 className="font-headline text-base sm:text-lg font-bold text-[#164e5f]">{title}</h3>
        {subtitle && <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// ─── PageHeader ───────────────────────────────────────────────────────────────
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-6 sm:mb-8">
      <div className="min-w-0">
        <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">{title}</h1>
        {subtitle && <p className="text-sm sm:text-base text-on-surface-variant mt-1 max-w-3xl">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2 sm:gap-3">{actions}</div>}
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────
export function EmptyState({ icon = 'inbox', title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-surface-low flex items-center justify-center mb-4">
        <Icon name={icon} size={32} className="text-on-surface-variant" />
      </div>
      <h3 className="font-headline text-lg font-bold text-on-surface mb-2">{title}</h3>
      {description && <p className="text-sm text-on-surface-variant max-w-xs mb-6">{description}</p>}
      {action}
    </div>
  );
}

// ─── Re-exports from Card ─────────────────────────────────────────────────────
export { Card, CardHeader, CardContent, CardFooter } from './Card.jsx';
