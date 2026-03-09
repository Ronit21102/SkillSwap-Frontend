import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Zap, Bell, LogOut } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { useAuthStore } from '@/store/authStore'

const NAV_LINKS = [
  { label: 'Explore',   to: '/explore'  },
  { label: 'My Swaps',  to: '/swaps'    },
  { label: 'Schedule',  to: '/schedule' },
]

/** Top navbar — shown on mobile inside the AppLayout */
export function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const { user, isAuthenticated, logout } = useAuthStore()

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-surface-100">
      <div className="mx-auto max-w-7xl flex items-center h-14 px-4 md:px-6 gap-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-1.5 font-bold text-lg text-surface-900 mr-4"
        >
          <span className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </span>
          <span style={{ fontFamily: 'var(--font-display)' }}>SkillSwap</span>
        </Link>

        {/* Desktop nav */}
        {isAuthenticated && (
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {NAV_LINKS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto">
          {isAuthenticated && user ? (
            <>
              {/* Notifications */}
              <button className="relative p-2 rounded-xl text-surface-500 hover:bg-surface-100 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent-500" />
              </button>

              {/* Avatar / profile */}
              <Link to="/profile" className="flex items-center gap-2 p-1 rounded-xl hover:bg-surface-100 transition-colors">
                <Avatar name={user.name} src={user.avatar} size="sm" />
                <span className="hidden sm:block text-sm font-medium text-surface-700 max-w-25 truncate">
                  {user.name.split(' ')[0]}
                </span>
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="hidden md:flex p-2 rounded-xl text-surface-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign up</Button>
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          {isAuthenticated && (
            <button
              className="md:hidden p-2 rounded-xl text-surface-500 hover:bg-surface-100 transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav drawer */}
      {isAuthenticated && open && (
        <nav className="md:hidden border-t border-surface-100 bg-white px-4 pb-4 pt-2 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-100'
                )
              }
            >
              {label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-1"
          >
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </nav>
      )}
    </header>
  )
}
