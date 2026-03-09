import { cn } from '@/lib/cn'

interface AvatarProps {
  src?: string | null
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap = {
  xs: 'w-6  h-6  text-xs',
  sm: 'w-8  h-8  text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/** Deterministic colour from name */
function getColour(name: string) {
  const colours = [
    'bg-brand-200 text-brand-800',
    'bg-accent-50  text-accent-600',
    'bg-blue-100   text-blue-700',
    'bg-orange-100 text-orange-700',
    'bg-purple-100 text-purple-700',
    'bg-pink-100   text-pink-700',
  ]
  const idx = name.charCodeAt(0) % colours.length
  return colours[idx]
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn('rounded-full object-cover shrink-0', sizeMap[size], className)}
      />
    )
  }
  return (
    <span
      className={cn(
        'rounded-full shrink-0 flex items-center justify-center font-semibold',
        sizeMap[size],
        getColour(name),
        className
      )}
    >
      {getInitials(name)}
    </span>
  )
}
