/**
 * SkillSetupPage.tsx — /skills/setup
 *
 * Duolingo-inspired onboarding step where users choose:
 *   1. Skills they can TEACH
 *   2. Skills they want to LEARN
 *
 * Design language:
 *  • Dark background matching the AuthLayout shell
 *  • Two glowing card panels, green (teach) + violet (learn)
 *  • Progress bar at top
 *  • Animated section reveal
 *  • Toast-style error banner
 */

import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap, BookOpen, Dumbbell, ArrowRight,
  CheckCircle2, AlertCircle, Loader2, Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { SkillSelector } from '@/components/skills/SkillSelector'
import { useAllSkills, useAddUserSkill, useRemoveUserSkill } from '@/hooks/useSkills'
import type { Skill } from '@/types/skills'

// ─── Variants for section card entrance ──────────────────────────────────────

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const, delay },
  }),
}

// ─── Small helper: step dots ──────────────────────────────────────────────────

function StepDots({ active }: { active: number }) {
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            'rounded-full transition-all duration-300',
            i === active
              ? 'w-6 h-2 bg-emerald-400'
              : i < active
              ? 'w-2 h-2 bg-emerald-400/60'
              : 'w-2 h-2 bg-white/20'
          )}
        />
      ))}
    </div>
  )
}

// ─── Section card ─────────────────────────────────────────────────────────────

interface SectionCardProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  accentClass: string
  borderClass: string
  children: React.ReactNode
  delay?: number
}

function SectionCard({
  icon, title, subtitle, accentClass, borderClass, children, delay = 0,
}: SectionCardProps) {
  return (
    <motion.div
      custom={delay}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'rounded-2xl border bg-white/3 backdrop-blur-sm p-6 flex flex-col gap-5',
        borderClass
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className={cn('p-2 rounded-xl', accentClass)}>
          {icon}
        </div>
        <div>
          <h2 className="text-white font-semibold text-base leading-snug">{title}</h2>
          <p className="text-white/45 text-sm mt-0.5">{subtitle}</p>
        </div>
      </div>
      {children}
    </motion.div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function SkillSetupPage() {
  const navigate = useNavigate()

  // ── Remote data ────────────────────────────────────────────────────────────
  const { data: allSkills = [], isLoading: skillsLoading } = useAllSkills()
  const addMutation    = useAddUserSkill()
  const removeMutation = useRemoveUserSkill()

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
  const handleAddTeach = useCallback(async (skill: Skill) => {
    // Optimistic update
    setTeachSkills((prev) => [...prev, skill])
    setError(null)
    try {
      await addMutation.mutateAsync({ skillId: skill.id, type: 'TEACH' })
    } catch (err) {
      setTeachSkills((prev) => prev.filter((s) => s.id !== skill.id))
      setError((err as Error).message)
    }
  }, [addMutation])

  const handleAddLearn = useCallback(async (skill: Skill) => {
    setLearnSkills((prev) => [...prev, skill])
    setError(null)
    try {
      await addMutation.mutateAsync({ skillId: skill.id, type: 'LEARN' })
    } catch (err) {
      setLearnSkills((prev) => prev.filter((s) => s.id !== skill.id))
      setError((err as Error).message)
    }
  }, [addMutation])

  // ── Remove handlers ────────────────────────────────────────────────────────
  const handleRemoveTeach = useCallback(async (skill: Skill) => {
    setRemovingTeachId(skill.id)
    setError(null)
    try {
      await removeMutation.mutateAsync({ skillId: skill.id, type: 'TEACH' })
      setTeachSkills((prev) => prev.filter((s) => s.id !== skill.id))
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setRemovingTeachId(null)
    }
  }, [removeMutation])

  const handleRemoveLearn = useCallback(async (skill: Skill) => {
    setRemovingLearnId(skill.id)
    setError(null)
    try {
      await removeMutation.mutateAsync({ skillId: skill.id, type: 'LEARN' })
      setLearnSkills((prev) => prev.filter((s) => s.id !== skill.id))
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setRemovingLearnId(null)
    }
  }, [removeMutation])

  // ── Save / continue ────────────────────────────────────────────────────────
  async function handleSave() {
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
      navigate('/dashboard')
    } catch {
      setError('Could not save. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  // ── Derived ────────────────────────────────────────────────────────────────
  const totalSelected = teachSkills.length + learnSkills.length
  const canSkip = true

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-8 py-4">

      {/* ── Top: progress + headline ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="flex flex-col items-center gap-4 text-center"
      >
        {/* Duolingo-style step indicator */}
        <StepDots active={1} />

        {/* Icon */}
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-emerald-500 to-violet-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center">
            <Zap className="w-3 h-3 text-black" />
          </span>
        </div>

        {/* Headline */}
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Tell us about your skills
          </h1>
          <p className="text-white/50 text-sm mt-1.5 max-w-sm">
            This helps us match you with the right people to exchange skills with.
          </p>
        </div>

        {/* Progress pill */}
        {totalSelected > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/10 px-3 py-1 text-xs text-white/70"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            {totalSelected} skill{totalSelected !== 1 ? 's' : ''} added
          </motion.div>
        )}
      </motion.div>

      {/* ── Error banner ── */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{    opacity: 0, y: -8, height: 0 }}
            className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Section 1: TEACH ── */}
      <SectionCard
        delay={0.1}
        icon={<Dumbbell className="w-5 h-5 text-emerald-400" />}
        title="What can you TEACH?"
        subtitle="Share your expertise — others will learn from you."
        accentClass="bg-emerald-500/15"
        borderClass="border-emerald-500/20"
      >
        <SkillSelector
          variant="teach"
          allSkills={allSkills}
          selected={teachSkills}
          onAdd={handleAddTeach}
          onRemove={handleRemoveTeach}
          isLoading={skillsLoading}
          removingId={removingTeachId}
          placeholder="e.g. Gym Training, Guitar, Yoga…"
        />

        {teachSkills.length === 0 && !skillsLoading && (
          <p className="text-xs text-white/30 text-center py-1">
            Search and pick skills you can teach others.
          </p>
        )}
      </SectionCard>

      {/* ── Section 2: LEARN ── */}
      <SectionCard
        delay={0.2}
        icon={<BookOpen className="w-5 h-5 text-violet-400" />}
        title="What do you want to LEARN?"
        subtitle="Discover skills you've always wanted to pick up."
        accentClass="bg-violet-500/15"
        borderClass="border-violet-500/20"
      >
        <SkillSelector
          variant="learn"
          allSkills={allSkills}
          selected={learnSkills}
          onAdd={handleAddLearn}
          onRemove={handleRemoveLearn}
          isLoading={skillsLoading}
          removingId={removingLearnId}
          placeholder="e.g. Photography, Spanish, Cooking…"
        />

        {learnSkills.length === 0 && !skillsLoading && (
          <p className="text-xs text-white/30 text-center py-1">
            Search and pick skills you want to learn from others.
          </p>
        )}
      </SectionCard>

      {/* ── CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.35, ease: 'easeOut' }}
        className="flex flex-col gap-3 pb-6"
      >
        {/* Save button */}
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || saveSuccess}
          className={cn(
            'relative w-full h-12 rounded-xl font-semibold text-sm transition-all duration-200',
            'bg-linear-to-r from-emerald-500 to-emerald-400',
            'hover:from-emerald-400 hover:to-emerald-300',
            'text-black shadow-lg shadow-emerald-500/30',
            'disabled:opacity-60 disabled:pointer-events-none',
            'active:scale-[.98]',
            'flex items-center justify-center gap-2'
          )}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving…
            </>
          ) : saveSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Saved!
            </>
          ) : (
            <>
              Save Skills
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Skip link */}
        {canSkip && (
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="text-xs text-white/35 hover:text-white/60 transition-colors text-center py-1"
          >
            Skip for now — I'll add skills later
          </button>
        )}
      </motion.div>
    </div>
  )
}
