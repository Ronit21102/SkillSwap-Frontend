import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Search, ArrowLeftRight, MessageCircle, CalendarDays } from 'lucide-react'
import { cn } from '@/lib/cn'

const ITEMS = [
  { label: 'Home',     to: '/dashboard', icon: LayoutDashboard },
  { label: 'Explore',  to: '/explore',   icon: Search          },
  { label: 'Swaps',    to: '/swaps',     icon: ArrowLeftRight  },
  { label: 'Chat',     to: '/chat',      icon: MessageCircle   },
  { label: 'Schedule', to: '/schedule',  icon: CalendarDays    },
]

/** Sticky bottom navigation bar — visible on mobile only */
export function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-surface-100 flex items-center">
      {ITEMS.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              'flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-medium transition-colors',
              isActive ? 'text-brand-600' : 'text-surface-400'
            )
          }
        >
          {({ isActive }) => (
            <>
              <Icon className={cn('w-5 h-5', isActive && 'text-brand-600')} />
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
