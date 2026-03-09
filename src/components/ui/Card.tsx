import { cn } from '@/lib/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export function Card({ hover = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-white border border-surface-100 shadow-(--shadow-card)',
        hover && 'transition-shadow hover:shadow-(--shadow-elevated) cursor-pointer',
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-5 pt-5 pb-3', className)} {...props} />
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-5 pb-5', className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('px-5 py-3 border-t border-surface-100', className)}
      {...props}
    />
  )
}
