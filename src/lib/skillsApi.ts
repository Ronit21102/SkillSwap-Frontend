/**
 * skillsApi.ts — Skills API service
 *
 * Wraps all skills-related HTTP calls using the shared `api` Axios instance
 * (which already handles auth token injection and silent refresh).
 */

import { api, getApiError } from '@/lib/api'
import type {
  Skill,
  UserSkills,
  AddUserSkillInput,
  SkillsListResponse,
  UserSkillsResponse,
  AddUserSkillResponse,
} from '@/types/skills'

// ── Fetch all available skills ────────────────────────────────────────────────

/**
 * GET /api/skills
 * Returns the full catalogue of skills available on the platform.
 */
export async function fetchAllSkills(): Promise<Skill[]> {
  try {
    const { data } = await api.get<SkillsListResponse>('/skills')
    return data.data
  } catch (err) {
    throw new Error(getApiError(err))
  }
}

// ── Fetch the current user's skills ──────────────────────────────────────────

/**
 * GET /api/users/me/skills
 * Returns the authenticated user's linked skills grouped by type.
 * Shape: { teach: string[], learn: string[] }
 */
export async function fetchMySkills(): Promise<UserSkills> {
  try {
    const { data } = await api.get<UserSkillsResponse>('/users/me/skills')
    return data.data
  } catch (err) {
    throw new Error(getApiError(err))
  }
}

// ── Add a skill to the current user ──────────────────────────────────────────

/**
 * POST /api/users/me/skills
 * Links a skill (with a TEACH or LEARN type) to the authenticated user.
 * The backend returns data: null on success — only success/message matter.
 */
export async function addUserSkill(input: AddUserSkillInput): Promise<void> {
  try {
    await api.post<AddUserSkillResponse>('/users/me/skills', input)
  } catch (err) {
    throw new Error(getApiError(err))
  }
}
