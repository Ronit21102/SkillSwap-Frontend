import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-500 text-white hover:bg-brand-600 active:scale-[.98] shadow-sm',
        secondary:
          'bg-surface-100 text-surface-800 hover:bg-surface-200 active:scale-[.98]',
        outline:
          'border border-surface-200 bg-white text-surface-800 hover:bg-surface-50 active:scale-[.98]',
        ghost:
          'text-surface-700 hover:bg-surface-100 active:scale-[.98]',
        danger:
          'bg-red-500 text-white hover:bg-red-600 active:scale-[.98]',
        accent:
          'bg-accent-500 text-white hover:bg-accent-600 active:scale-[.98] shadow-sm',
      },
      size: {
        sm:  'h-8  px-3  text-xs',
        md:  'h-10 px-4  text-sm',
        lg:  'h-11 px-6  text-base',
        xl:  'h-12 px-8  text-base',
        icon:'h-9  w-9   text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size:    'md',
    },
  }
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { buttonVariants }
