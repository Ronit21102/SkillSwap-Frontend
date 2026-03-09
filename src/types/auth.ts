// ─────────────────────────────────────────────────────────────────────────────
// Auth Types — matches the Spring Boot backend contract exactly
// ─────────────────────────────────────────────────────────────────────────────

export type UserRole = 'USER' | 'ADMIN'

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  // Extended profile fields (populated after onboarding)
  avatar?: string | null
  bio?: string | null
  location?: string | null
  isOnboarded?: boolean
  createdAt?: string
}

// ── Token payload returned by every auth endpoint ────────────────────────────
export interface AuthTokens {
  accessToken: string
  refreshToken: string
  tokenType: 'Bearer'
  expiresIn: number   // seconds — 900 (15 min) for access token
}

// ── Standard API envelope ────────────────────────────────────────────────────
export interface ApiEnvelope<T> {
  success: boolean
  message: string
  data: T
  timestamp: string
}

// ── Validation error envelope ────────────────────────────────────────────────
export interface ApiErrorEnvelope {
  success: false
  message: string
  errors?: Record<string, string>   // field-level validation errors
  timestamp: string
}

// ── Auth data payload inside data:{} ─────────────────────────────────────────
export interface AuthPayload extends AuthTokens {
  user: User
}

// ── Convenience alias for the full auth response ─────────────────────────────
export type AuthResponse = ApiEnvelope<AuthPayload>

// ── Refresh token request/response ───────────────────────────────────────────
export interface RefreshRequest {
  refreshToken: string
}

// ── Form input types ─────────────────────────────────────────────────────────

/** POST /api/auth/login */
export interface LoginInput {
  email: string
  password: string
}

/** POST /api/auth/register */
export interface SignupInput {
  name: string
  email: string
  password: string
}

// ── Local auth state shape ────────────────────────────────────────────────────
export interface AuthState {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  isInitializing: boolean   // true while silent-refresh is in flight on app boot
}
