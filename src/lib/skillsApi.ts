/**
 * skillsApi.ts — Skills API service
 *
 * Wraps all skills-related HTTP calls using the shared `api` Axios instance
 * (which already handles auth token injection and silent refresh).
 */

import { api, getApiError } from '@/lib/api'
import type {
  Skill,
  UserSkill,
  AddUserSkillInput,
  RemoveUserSkillInput,
  SkillsListResponse,
  UserSkillsResponse,
  AddUserSkillResponse,
} from '@/types/skills'

// ── Fetch all available skills ────────────────────────────────────────────────

/**
 * GET /skills
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
 * GET /users/me/skills
 * Returns the authenticated user's linked skills (teach + learn).
 */
export async function fetchMySkills(): Promise<UserSkill[]> {
  try {
    const { data } = await api.get<UserSkillsResponse>('/users/me/skills')
    return data.data
  } catch (err) {
    throw new Error(getApiError(err))
  }
}

// ── Add a skill to the current user ──────────────────────────────────────────

/**
 * POST /users/me/skills
 * Links a skill (with a TEACH or LEARN type) to the authenticated user.
 */
export async function addUserSkill(input: AddUserSkillInput): Promise<UserSkill> {
  try {
    const { data } = await api.post<AddUserSkillResponse>('/users/me/skills', input)
    return data.data
  } catch (err) {
    throw new Error(getApiError(err))
  }
}

// ── Remove a skill from the current user ─────────────────────────────────────

/**
 * DELETE /users/me/skills/:skillId?type=TEACH|LEARN
 * Unlinks a skill from the authenticated user.
 */
export async function removeUserSkill(input: RemoveUserSkillInput): Promise<void> {
  try {
    await api.delete(`/users/me/skills/${input.skillId}`, {
      params: { type: input.type },
    })
  } catch (err) {
    throw new Error(getApiError(err))
  }
}
