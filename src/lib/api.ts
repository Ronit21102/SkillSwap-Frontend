/**
 * api.ts — Production-grade Axios instance
 *
 * Features:
 *  • Automatic Bearer token injection on every request
 *  • Silent token refresh on 401 (one in-flight refresh at a time)
 *  • Request queue — requests that arrive while a refresh is in flight
 *    are held and replayed with the new token once refresh completes
 *  • Refresh token rotation — new refresh token is persisted on every refresh
 *  • Hard logout on refresh failure (token expired / revoked)
 *  • Human-readable error extraction from the backend envelope format
 */

import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios'
import type { AuthPayload, AuthResponse, RefreshRequest } from '@/types/auth'

// ── Base URL ──────────────────────────────────────────────────────────────────
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api'

// ── Axios instance ────────────────────────────────────────────────────────────
export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
})

// ── Token storage helpers ─────────────────────────────────────────────────────
// Access token lives in Zustand/localStorage (via the persist middleware).
// Refresh token is stored in a module-level variable AND in localStorage
// under its own key so it survives a page reload without being bundled
// into the auth store's persisted state (keeps things decoupled).

const REFRESH_TOKEN_KEY = 'ss_rt'   // "ss" = SkillSwap

export const tokenStorage = {
  getAccess(): string | null {
    try {
      const raw = localStorage.getItem('auth-storage')
      if (!raw) return null
      const parsed = JSON.parse(raw) as { state?: { accessToken?: string } }
      return parsed?.state?.accessToken ?? null
    } catch {
      return null
    }
  },

  getRefresh(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  },

  setRefresh(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, token)
  },

  clearAll(): void {
    localStorage.removeItem('auth-storage')
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  },
}

// ── Refresh state ─────────────────────────────────────────────────────────────
// These module-level variables make the refresh flow race-condition-proof:
// only one refresh request flies at a time; others queue up and drain once done.

let isRefreshing = false
type QueueEntry = { resolve: (token: string) => void; reject: (err: unknown) => void }
let failedQueue: QueueEntry[] = []

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((entry) => {
    if (error) {
      entry.reject(error)
    } else {
      entry.resolve(token as string)
    }
  })
  failedQueue = []
}

// ── Hard logout helper ────────────────────────────────────────────────────────
function hardLogout() {
  tokenStorage.clearAll()
  // Notify the Zustand store without importing it (avoids circular dependency)
  window.dispatchEvent(new Event('auth:logout'))
  window.location.replace('/login')
}

// ── Request interceptor — attach access token ─────────────────────────────────
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getAccess()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ── Response interceptor — silent refresh on 401 ─────────────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }

    // Only intercept 401s that we haven't already retried
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    // Don't intercept 401s on the auth endpoints themselves
    const url = originalRequest.url ?? ''
    if (url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/refresh')) {
      return Promise.reject(error)
    }

    const refreshToken = tokenStorage.getRefresh()
    if (!refreshToken) {
      hardLogout()
      return Promise.reject(error)
    }

    if (isRefreshing) {
      // Queue this request — it will be replayed once the ongoing refresh completes
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then((newToken) => {
          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`
          }
          return api(originalRequest)
        })
        .catch((queueError) => Promise.reject(queueError))
    }

    // This is the first 401 — kick off the refresh
    originalRequest._retry = true
    isRefreshing = true

    try {
      const { data } = await axios.post<AuthResponse>(
        `${BASE_URL}/auth/refresh`,
        { refreshToken } satisfies RefreshRequest,
        { headers: { 'Content-Type': 'application/json' } }
      )

      const payload: AuthPayload = data.data
      const newAccessToken = payload.accessToken
      const newRefreshToken = payload.refreshToken

      // Persist the rotated refresh token
      tokenStorage.setRefresh(newRefreshToken)

      // Patch the Zustand store with the new access token (without a full re-render)
      // We fire a custom event that authStore listens to
      window.dispatchEvent(
        new CustomEvent<{ accessToken: string; user: AuthPayload['user'] }>('auth:refreshed', {
          detail: { accessToken: newAccessToken, user: payload.user },
        })
      )

      // Drain the queue with the new token
      processQueue(null, newAccessToken)

      // Replay the original request
      if (originalRequest.headers) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
      }
      return api(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError, null)
      hardLogout()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)

// ── Error message extractor ───────────────────────────────────────────────────
/**
 * Converts any thrown value into a human-readable string.
 * Handles the backend envelope shape:
 *   { success: false, message: string, errors?: Record<string,string> }
 */
export function getApiError(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as {
      message?: string | string[]
      errors?: Record<string, string>
    } | undefined

    if (data?.errors) {
      // Return first field-level validation message
      const first = Object.values(data.errors)[0]
      if (first) return first
    }

    if (typeof data?.message === 'string' && data.message.length > 0) {
      return data.message
    }
    if (Array.isArray(data?.message) && (data?.message?.length ?? 0) > 0) {
      return (data?.message as string[])[0]
    }

    // Network / timeout errors
    if (err.code === 'ECONNABORTED') return 'Request timed out. Please try again.'
    if (!err.response) return 'Network error. Please check your connection.'
  }

  if (err instanceof Error) return err.message
  return 'Something went wrong. Please try again.'
}
