/**
 * SkillTag.tsx — Pill tag that represents a selected skill.
 *
 * Variants:
 *  • teach  — green palette
 *  • learn  — blue / violet palette
 *
 * Features:
 *  • Animated mount / unmount via framer-motion
 *  • Optional remove (×) button
 *  • Loading spinner state while a remove call is in-flight
 */

import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/cn'

export type SkillTagVariant = 'teach' | 'learn'

interface SkillTagProps {
  label: string
  variant: SkillTagVariant
  onRemove?: () => void
  isRemoving?: boolean
  className?: string
}

const variantStyles: Record<SkillTagVariant, string> = {
  teach: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:border-emerald-400/60',
  learn: 'bg-violet-500/15  text-violet-400  border border-violet-500/30  hover:border-violet-400/60',
}

const removeButtonStyles: Record<SkillTagVariant, string> = {
  teach: 'hover:bg-emerald-500/25 text-emerald-400',
  learn: 'hover:bg-violet-500/25  text-violet-400',
}

export function SkillTag({ label, variant, onRemove, isRemoving, className }: SkillTagProps) {
  return (
    <AnimatePresence>
      <motion.span
        layout
        initial={{ opacity: 0, scale: 0.8, y: 4 }}
        animate={{ opacity: 1, scale: 1,   y: 0 }}
        exit={{    opacity: 0, scale: 0.8, y: 4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium transition-colors select-none',
          variantStyles[variant],
          isRemoving && 'opacity-50 pointer-events-none',
          className
        )}
      >
        {label}

        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            disabled={isRemoving}
            aria-label={`Remove ${label}`}
            className={cn(
              'flex items-center justify-center w-4 h-4 rounded-full transition-colors cursor-pointer',
              removeButtonStyles[variant]
            )}
          >
            {isRemoving ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <X className="w-3 h-3" />
            )}
          </button>
        )}
      </motion.span>
    </AnimatePresence>
  )
}
