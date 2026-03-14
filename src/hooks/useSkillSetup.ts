/**
 * useSkillSetup.ts — Custom hook for skill setup page state management
 *
 * Consolidates all skill selection, error handling, and save state logic
 * for the skill setup onboarding flow.
 *
 * Returns:
 *  • teachSkills, learnSkills — selected skills arrays
 *  • handleAddTeach, handleAddLearn — add skill handlers
 *  • handleRemoveTeach, handleRemoveLearn — remove skill handlers
 *  • handleSave — validation and save handler
 *  • error, isSaving, saveSuccess — state flags
 *  • removingTeachId, removingLearnId — track which skills are being removed
 *  • totalSelected — computed total of selected skills
 */

import { useState, useCallback } from 'react'
import { useAddUserSkill } from './useSkills'
import type { Skill } from '@/types/skills'

interface UseSkillSetupReturn {
  // Local state
  teachSkills: Skill[]
  learnSkills: Skill[]
  removingTeachId: string | null
  removingLearnId: string | null
  error: string | null
  isSaving: boolean
  saveSuccess: boolean

  // Handlers
  handleAddTeach: (skill: Skill) => Promise<void>
  handleAddLearn: (skill: Skill) => Promise<void>
  handleRemoveTeach: (skill: Skill) => Promise<void>
  handleRemoveLearn: (skill: Skill) => Promise<void>
  handleSave: () => Promise<void>

  // Derived
  totalSelected: number
  canSkip: boolean
}

export function useSkillSetup(): UseSkillSetupReturn {
  // ── Remote data ────────────────────────────────────────────────────────────
  const addMutation = useAddUserSkill()

  // ── Local selected state (mirrors server after each mutation) ──────────────
  const [teachSkills, setTeachSkills] = useState<Skill[]>([])
  const [learnSkills, setLearnSkills] = useState<Skill[]>([])

  // IDs currently being removed (to show spinner on tag)
  const [removingTeachId, setRemovingTeachId] = useState<string | null>(null)
  const [removingLearnId, setRemovingLearnId] = useState<string | null>(null)

  // ── Inline errors ──────────────────────────────────────────────────────────
  const [error, setError] = useState<string | null>(null)

  // ── Save state ────────────────────────────────────────────────────────────
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // ── Add handlers ──────────────────────────────────────────────────────────
  const handleAddTeach = useCallback(
    async (skill: Skill) => {
      // Optimistic update
      setTeachSkills((prev) => [...prev, skill])
      setError(null)
      try {
        await addMutation.mutateAsync({ skillId: skill.id, type: 'TEACH' })
      } catch (err) {
        setTeachSkills((prev) => prev.filter((s) => s.id !== skill.id))
        setError((err as Error).message)
      }
    },
    [addMutation]
  )

  const handleAddLearn = useCallback(
    async (skill: Skill) => {
      setLearnSkills((prev) => [...prev, skill])
      setError(null)
      try {
        await addMutation.mutateAsync({ skillId: skill.id, type: 'LEARN' })
      } catch (err) {
        setLearnSkills((prev) => prev.filter((s) => s.id !== skill.id))
        setError((err as Error).message)
      }
    },
    [addMutation]
  )

  // ── Remove handlers (local-only — no DELETE endpoint in API contract) ──────
  const handleRemoveTeach = useCallback(async (skill: Skill) => {
    setRemovingTeachId(skill.id)
    setTeachSkills((prev) => prev.filter((s) => s.id !== skill.id))
    setRemovingTeachId(null)
  }, [])

  const handleRemoveLearn = useCallback(async (skill: Skill) => {
    setRemovingLearnId(skill.id)
    setLearnSkills((prev) => prev.filter((s) => s.id !== skill.id))
    setRemovingLearnId(null)
  }, [])

  // ── Save / continue ────────────────────────────────────────────────────────
  const handleSave = useCallback(async () => {
    if (teachSkills.length === 0 && learnSkills.length === 0) {
      setError('Please add at least one skill before continuing.')
      return
    }
    setIsSaving(true)
    setSaveSuccess(false)
    setError(null)

    // Short success flash, then navigate
    try {
      setSaveSuccess(true)
      await new Promise((r) => setTimeout(r, 700))
    } catch {
      setError('Could not save. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }, [teachSkills, learnSkills])

  // ── Derived ────────────────────────────────────────────────────────────────
  const totalSelected = teachSkills.length + learnSkills.length
  const canSkip = true

  return {
    teachSkills,
    learnSkills,
    removingTeachId,
    removingLearnId,
    error,
    isSaving,
    saveSuccess,
    handleAddTeach,
    handleAddLearn,
    handleRemoveTeach,
    handleRemoveLearn,
    handleSave,
    totalSelected,
    canSkip,
  }
}
