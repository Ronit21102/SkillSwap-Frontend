import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

/**
 * ── ProtectedRoute ──────────────────────────────────────────────────────────
 *
 * Wraps routes that require authentication.
 *
 * Boot-time behaviour:
 *   1. On first render, isInitializing === true (set by the store default).
 *   2. We call refreshSession() once which either restores the session from a
 *      valid refresh token or clears state.
 *   3. While isInitializing is true we render a full-screen spinner so the
 *      user never sees a flash of the /login redirect.
 *   4. Once resolved, unauthenticated users are sent to /login with the
 *      original destination saved in location state.
 */
export function ProtectedRoute() {
  const { isAuthenticated, isInitializing, refreshSession } = useAuthStore((s) => ({
    isAuthenticated: s.isAuthenticated,
    isInitializing: s.isInitializing,
    refreshSession: s.refreshSession,
  }))
  const location = useLocation()

  useEffect(() => {
    // Only attempt a silent refresh if we don't already have a confirmed session
    if (isInitializing && !isAuthenticated) {
      refreshSession()
    } else if (isInitializing) {
      // Already authenticated (token was in localStorage) — no refresh needed
      useAuthStore.setState({ isInitializing: false })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-emerald-500 animate-spin" />
          <p className="text-white/40 text-sm">Restoring your session…</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}

/**
 * ── GuestOnlyRoute ──────────────────────────────────────────────────────────
 *
 * Wraps routes that should NOT be accessible when already logged in
 * (login, signup). Redirects to dashboard.
 */
export function GuestOnlyRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const location = useLocation()

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/dashboard'

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  return <Outlet />
}
