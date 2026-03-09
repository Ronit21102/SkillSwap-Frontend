import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { MobileNav } from './MobileNav'

/**
 * Main shell for all authenticated pages.
 * Desktop: sidebar + main content area
 * Mobile:  top navbar + bottom tab bar
 */
export function AppLayout() {
  return (
    <div className="min-h-screen flex bg-surface-50">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top navbar (shown on mobile only — desktop uses sidebar) */}
        <div className="lg:hidden">
          <Navbar />
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <div className="mx-auto max-w-5xl px-4 md:px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  )
}
