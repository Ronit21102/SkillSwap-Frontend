import { Outlet, Link } from 'react-router-dom'
import { Zap } from 'lucide-react'
import { GridBackground } from '@/components/aceternity/GridBackground'

/**
 * Minimal centered layout for auth pages (login, signup, onboarding).
 */
export function AuthLayout() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      <GridBackground />

      {/* Minimal header */}
      <header className="relative z-10 flex items-center h-14 px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-white">
          <span className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-black" />
          </span>
          SkillSwap
        </Link>
      </header>

      {/* Centered content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
