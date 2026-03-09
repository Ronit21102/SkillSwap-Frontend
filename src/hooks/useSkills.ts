/**
 * useSkills.ts — React Query hooks for all skills-related data fetching
 *
 * Hooks:
 *  • useAllSkills()      — fetches the full skill catalogue (GET /skills)
 *  • useMySkills()       — fetches the current user's skills (GET /users/me/skills)
 *  • useAddUserSkill()   — mutation: POST /users/me/skills
 *  • useRemoveUserSkill() — mutation: DELETE /users/me/skills/:id
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query'
import {
  fetchAllSkills,
  fetchMySkills,
  addUserSkill,
  removeUserSkill,
} from '@/lib/skillsApi'
import type {
  Skill,
  UserSkill,
  AddUserSkillInput,
  RemoveUserSkillInput,
} from '@/types/skills'

// ── Query key constants ───────────────────────────────────────────────────────
export const skillsKeys = {
  all:    ['skills', 'all']     as const,
  mine:   ['skills', 'mine']    as const,
}

// ── useAllSkills ──────────────────────────────────────────────────────────────

/**
 * Fetches the full catalogue of skills from GET /skills.
 * Cached for 10 minutes — skill list changes infrequently.
 */
export function useAllSkills(): UseQueryResult<Skill[], Error> {
  return useQuery({
    queryKey: skillsKeys.all,
    queryFn:  fetchAllSkills,
    staleTime: 10 * 60 * 1000,   // 10 min
  })
}

// ── useMySkills ───────────────────────────────────────────────────────────────

/**
 * Fetches the authenticated user's linked skills from GET /users/me/skills.
 */
export function useMySkills(): UseQueryResult<UserSkill[], Error> {
  return useQuery({
    queryKey: skillsKeys.mine,
    queryFn:  fetchMySkills,
  })
}

// ── useAddUserSkill ───────────────────────────────────────────────────────────

/**
 * Mutation: POST /users/me/skills
 * Optimistically invalidates the user's skills list after success.
 */
export function useAddUserSkill(): UseMutationResult<UserSkill, Error, AddUserSkillInput> {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: addUserSkill,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: skillsKeys.mine })
    },
  })
}

// ── useRemoveUserSkill ────────────────────────────────────────────────────────

/**
 * Mutation: DELETE /users/me/skills/:skillId
 * Optimistically invalidates the user's skills list after success.
 */
export function useRemoveUserSkill(): UseMutationResult<void, Error, RemoveUserSkillInput> {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: removeUserSkill,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: skillsKeys.mine })
    },
  })
}
