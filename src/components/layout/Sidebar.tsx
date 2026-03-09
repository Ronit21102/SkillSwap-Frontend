import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Search,
  ArrowLeftRight,
  MessageCircle,
  CalendarDays,
  UserCircle,
  Settings,
  Zap,
} from 'lucide-react'
import { cn } from '@/lib/cn'

const NAV_ITEMS = [
  { label: 'Dashboard',  to: '/dashboard', icon: LayoutDashboard },
  { label: 'Explore',    to: '/explore',   icon: Search          },
  { label: 'My Swaps',   to: '/swaps',     icon: ArrowLeftRight  },
  { label: 'Messages',   to: '/chat',      icon: MessageCircle   },
  { label: 'Schedule',   to: '/schedule',  icon: CalendarDays    },
  { label: 'Profile',    to: '/profile',   icon: UserCircle      },
]

const BOTTOM_ITEMS = [
  { label: 'Settings', to: '/settings', icon: Settings },
]

interface SidebarProps {
  /** When true the sidebar is collapsed to icon-only mode */
  collapsed?: boolean
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col h-screen sticky top-0 bg-white border-r border-surface-100 transition-all duration-300',
        collapsed ? 'w-16' : 'w-56'
      )}
    >
      {/* Logo area */}
      <div className={cn('flex items-center gap-2 px-4 h-14 border-b border-surface-100 shrink-0', collapsed && 'justify-center')}>
        <span className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-white" />
        </span>
        {!collapsed && (
          <span className="font-bold text-surface-900" style={{ fontFamily: 'var(--font-display)' }}>
            SkillSwap
          </span>
        )}
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group',
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-surface-500 hover:text-surface-900 hover:bg-surface-100',
                collapsed && 'justify-center px-2'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={cn(
                    'w-5 h-5 shrink-0',
                    isActive ? 'text-brand-600' : 'text-surface-400 group-hover:text-surface-700'
                  )}
                />
                {!collapsed && <span>{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="px-2 pb-4 flex flex-col gap-0.5 border-t border-surface-100 pt-3">
        {BOTTOM_ITEMS.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group',
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-surface-500 hover:text-surface-900 hover:bg-surface-100',
                collapsed && 'justify-center px-2'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className={cn(
                    'w-5 h-5 shrink-0',
                    isActive ? 'text-brand-600' : 'text-surface-400 group-hover:text-surface-700'
                  )}
                />
                {!collapsed && <span>{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </aside>
  )
}
