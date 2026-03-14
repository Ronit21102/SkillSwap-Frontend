/**
 * useSkills.ts — React Query hooks for all skills-related data fetching
 *
 * Hooks:
 *  • useAllSkills()    — fetches the full skill catalogue (GET /api/skills)
 *  • useMySkills()     — fetches the current user's skills (GET /api/users/me/skills)
 *  • useAddUserSkill() — mutation: POST /api/users/me/skills
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
} from '@/lib/skillsApi'
import type {
  Skill,
  UserSkills,
  AddUserSkillInput,
} from '@/types/skills'

// ── Query key constants ───────────────────────────────────────────────────────
export const skillsKeys = {
  all:    ['skills', 'all']     as const,
  mine:   ['skills', 'mine']    as const,
}

// ── useAllSkills ──────────────────────────────────────────────────────────────

/**
 * Fetches the full catalogue of skills from GET /api/skills.
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
 * Fetches the authenticated user's skills from GET /api/users/me/skills.
 * Returns { teach: string[], learn: string[] }
 */
export function useMySkills(): UseQueryResult<UserSkills, Error> {
  return useQuery({
    queryKey: skillsKeys.mine,
    queryFn:  fetchMySkills,
  })
}

// ── useAddUserSkill ───────────────────────────────────────────────────────────

/**
 * Mutation: POST /api/users/me/skills
 * Invalidates the user's skills list after success so it re-fetches.
 */
export function useAddUserSkill(): UseMutationResult<void, Error, AddUserSkillInput> {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: addUserSkill,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: skillsKeys.mine })
    },
  })
}
