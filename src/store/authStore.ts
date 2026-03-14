/**
 * authStore.ts — Zustand auth store
 *
 * Responsibilities:
 *  • Persists user + accessToken in localStorage (via zustand/persist)
 *  • Refresh token is kept in a separate localStorage key (tokenStorage)
 *    so it isn't accidentally exposed in the serialised state object
 *  • Listens to two custom DOM events emitted by api.ts interceptors:
 *      auth:refreshed  — update state after a silent refresh
 *      auth:logout     — hard-clear state on refresh failure
 *  • Provides: login, signup, logout, refreshSession, clearError, updateUser
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { api, getApiError, tokenStorage } from '@/lib/api'
import type {
  User,
  LoginInput,
  SignupInput,
  AuthResponse,
  AuthPayload,
} from '@/types/auth'

// ── Store shape ───────────────────────────────────────────────────────────────

interface AuthStore {
  // State
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  isInitializing: boolean   // true during the boot-time silent refresh check
  error: string | null

  // Actions
  login: (input: LoginInput) => Promise<void>
  signup: (input: SignupInput) => Promise<void>
  logout: () => Promise<void>
  refreshSession: () => Promise<boolean>   // returns true if refresh succeeded
  clearError: () => void
  updateUser: (patch: Partial<User>) => void

  // Internal — called by DOM event listeners
  _applyTokens: (payload: AuthPayload) => void
  _clearSession: () => void
}

// ── Helper: apply a successful auth response to state ────────────────────────

function applyAuthPayload(
  set: (partial: Partial<AuthStore>) => void,
  payload: AuthPayload
) {
  tokenStorage.setRefresh(payload.refreshToken)
  set({
    user: payload.user,
    accessToken: payload.accessToken,
    isAuthenticated: true,
    isLoading: false,
    error: null,
  })
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // ── Initial state ────────────────────────────────────────────────────
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      isInitializing: true,
      error: null,

      // ── Login ────────────────────────────────────────────────────────────
      login: async (input) => {
        set({ isLoading: true, error: null })
        try {
          const { data } = await api.post<AuthResponse>('/auth/login', input)
          applyAuthPayload(set, data.data)
        } catch (err) {
          set({ error: getApiError(err), isLoading: false })
          throw err
        }
      },

      // ── Signup ───────────────────────────────────────────────────────────
      // Backend endpoint is POST /auth/register (not /signup)
      signup: async (input) => {
        set({ isLoading: true, error: null })
        try {
          const { data } = await api.post<AuthResponse>('/auth/register', input)
          applyAuthPayload(set, data.data)
        } catch (err) {
          set({ error: getApiError(err), isLoading: false })
          throw err
        }
      },

      // ── Silent refresh ───────────────────────────────────────────────────
      // Called on app boot; returns true when a valid session is restored.
      refreshSession: async () => {
        const refreshToken = tokenStorage.getRefresh()
        if (!refreshToken) {
          set({ isInitializing: false })
          return false
        }
        try {
          const { data } = await api.post<AuthResponse>('/auth/refresh', { refreshToken })
          applyAuthPayload(set, data.data)
          return true
        } catch {
          get()._clearSession()
          return false
        } finally {
          set({ isInitializing: false })
        }
      },

      // ── Logout ───────────────────────────────────────────────────────────
      logout: async () => {
        const refreshToken = tokenStorage.getRefresh()
        try {
          // Best-effort: ask backend to revoke the refresh token
          if (refreshToken) {
            await api.post('/auth/logout', { refreshToken })
          }
        } catch {
          // Ignore — local state is cleared regardless
        } finally {
          get()._clearSession()
        }
      },

      // ── Helpers ──────────────────────────────────────────────────────────
      clearError: () => set({ error: null }),

      updateUser: (patch) => {
        const current = get().user
        if (current) set({ user: { ...current, ...patch } })
      },

      // ── Internal ─────────────────────────────────────────────────────────
      _applyTokens: (payload) => applyAuthPayload(set, payload),

      _clearSession: () => {
        tokenStorage.clearAll()
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          isLoading: false,
          isInitializing: false,
          error: null,
        })
      },
    }),
    {
      name: 'auth-storage',
      // Only persist user + accessToken — refresh token has its own key
      partialize: (s) => ({
        user: s.user,
        accessToken: s.accessToken,
        isAuthenticated: s.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        // Once localStorage has been read, we know the real auth state.
        // Set isInitializing: false so ProtectedRoute doesn't fire a
        // needless refresh when a valid session is already in localStorage.
        if (state) {
          state.isInitializing = false
        }
      },
    }
  )
)

// ── DOM event listeners (wired up by api.ts interceptors) ────────────────────
// These run once when the module is first imported, before any component mounts.

window.addEventListener('auth:logout', () => {
  useAuthStore.getState()._clearSession()
})

window.addEventListener('auth:refreshed', (e) => {
  const { accessToken, user } = (e as CustomEvent<AuthPayload>).detail
  useAuthStore.getState()._applyTokens({ accessToken, user } as AuthPayload)
})
