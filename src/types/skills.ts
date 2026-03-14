// ─────────────────────────────────────────────────────────────────────────────
// Skills Types — matches the Spring Boot backend contract
// ─────────────────────────────────────────────────────────────────────────────

import type { ApiEnvelope } from './auth'

/** A skill returned from GET /api/skills */
export interface Skill {
  id: string
  name: string
  category: string
}

/** Skill type discriminator */
export type SkillType = 'TEACH' | 'LEARN'

/**
 * Shape returned by GET /api/users/me/skills
 *  • teach — names of skills the user can teach
 *  • learn — names of skills the user wants to learn
 */
export interface UserSkills {
  teach: string[]
  learn: string[]
}

/** POST /api/users/me/skills body */
export interface AddUserSkillInput {
  skillId: string
  type: SkillType
}

/** POST /api/users/me/skills body (alias kept for explicit request typing) */
export type AddUserSkillRequest = AddUserSkillInput

// ── API response aliases ──────────────────────────────────────────────────────
export type SkillsListResponse   = ApiEnvelope<Skill[]>
export type UserSkillsResponse   = ApiEnvelope<UserSkills>
/** data is null on success — only success/message matter */
export type AddUserSkillResponse = ApiEnvelope<null>
