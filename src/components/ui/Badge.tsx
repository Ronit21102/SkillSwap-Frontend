import { cn } from '@/lib/cn'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'accent' | 'surface' | 'success' | 'warning' | 'danger'
}

const variantMap: Record<NonNullable<BadgeProps['variant']>, string> = {
  brand:   'bg-brand-100   text-brand-700',
  accent:  'bg-accent-50   text-accent-600',
  surface: 'bg-surface-100 text-surface-600',
  success: 'bg-green-100   text-green-700',
  warning: 'bg-yellow-100  text-yellow-700',
  danger:  'bg-red-100     text-red-700',
}

export function Badge({ variant = 'surface', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantMap[variant],
        className
      )}
      {...props}
    />
  )
}
