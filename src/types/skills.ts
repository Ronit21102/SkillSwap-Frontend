// ─────────────────────────────────────────────────────────────────────────────
// Skills Types — matches the Spring Boot backend contract
// ─────────────────────────────────────────────────────────────────────────────

import type { ApiEnvelope } from './auth'

/** A skill returned from GET /skills */
export interface Skill {
  id: string
  name: string
  category?: string
  icon?: string
}

/** Skill type discriminator */
export type SkillType = 'TEACH' | 'LEARN'

/** A user's linked skill (with type) returned from GET /users/me/skills */
export interface UserSkill {
  id: string
  skill: Skill
  type: SkillType
}

/** POST /users/me/skills body */
export interface AddUserSkillInput {
  skillId: string
  type: SkillType
}

/** DELETE /users/me/skills/:skillId body */
export interface RemoveUserSkillInput {
  skillId: string
  type: SkillType
}

// ── API response aliases ──────────────────────────────────────────────────────
export type SkillsListResponse  = ApiEnvelope<Skill[]>
export type UserSkillsResponse  = ApiEnvelope<UserSkill[]>
export type AddUserSkillResponse = ApiEnvelope<UserSkill>
