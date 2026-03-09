/**
 * SkillSelector.tsx — Search + dropdown + selected tags, all in one.
 *
 * Props:
 *  variant     — 'teach' | 'learn'   controls colour theme
 *  allSkills   — full skill catalogue (from useAllSkills)
 *  selected    — currently selected skill IDs
 *  onAdd       — called with a Skill when user picks from dropdown
 *  onRemove    — called with a Skill when user removes a tag
 *  isLoading   — shows skeleton while catalogue loads
 *  removingId  — skillId currently being removed (shows spinner on its tag)
 */

import { useState, useRef, useEffect, useId, useMemo } from 'react'
import { Search, ChevronDown, Loader2, BookOpen, Dumbbell } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/cn'
import { SkillTag } from './SkillTag'
import type { Skill } from '@/types/skills'
import type { SkillTagVariant } from './SkillTag'

// ── Types ─────────────────────────────────────────────────────────────────────

interface SkillSelectorProps {
  variant: SkillTagVariant
  allSkills: Skill[]
  selected: Skill[]
  onAdd: (skill: Skill) => void
  onRemove: (skill: Skill) => void
  isLoading?: boolean
  removingId?: string | null
  placeholder?: string
}

// ── Colour maps ───────────────────────────────────────────────────────────────

const inputRingStyles: Record<SkillTagVariant, string> = {
  teach: 'focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:border-emerald-500/60',
  learn: 'focus-within:ring-2 focus-within:ring-violet-500/50  focus-within:border-violet-500/60',
}

const highlightStyles: Record<SkillTagVariant, string> = {
  teach: 'bg-emerald-500/10 text-emerald-300',
  learn: 'bg-violet-500/10  text-violet-300',
}

const activeItemStyles: Record<SkillTagVariant, string> = {
  teach: 'bg-emerald-500/15',
  learn: 'bg-violet-500/15',
}

const iconColorStyles: Record<SkillTagVariant, string> = {
  teach: 'text-emerald-400',
  learn: 'text-violet-400',
}

// ── Component ─────────────────────────────────────────────────────────────────

export function SkillSelector({
  variant,
  allSkills,
  selected,
  onAdd,
  onRemove,
  isLoading = false,
  removingId = null,
  placeholder = 'Search skills…',
}: SkillSelectorProps) {
  const [query, setQuery]         = useState('')
  const [isOpen, setIsOpen]       = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef  = useRef<HTMLInputElement>(null)
  const listRef   = useRef<HTMLUListElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const listId    = useId()

  const selectedIds = useMemo(() => new Set(selected.map((s) => s.id)), [selected])

  // Filter + exclude already-selected skills
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return allSkills.filter(
      (s) => !selectedIds.has(s.id) && (!q || s.name.toLowerCase().includes(q))
    )
  }, [allSkills, selectedIds, query])

  // Reset active index when filtered list changes
  useEffect(() => { setActiveIdx(0) }, [filtered])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return
    const item = listRef.current.querySelectorAll('li')[activeIdx]
    item?.scrollIntoView({ block: 'nearest' })
  }, [activeIdx])

  // ── Handlers ─────────────────────────────────────────────────────────────

  function handleSelect(skill: Skill) {
    onAdd(skill)
    setQuery('')
    setIsOpen(false)
    inputRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') setIsOpen(true)
      return
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActiveIdx((i) => Math.min(i + 1, filtered.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActiveIdx((i) => Math.max(i - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (filtered[activeIdx]) handleSelect(filtered[activeIdx])
        break
      case 'Escape':
        setIsOpen(false)
        break
      case 'Backspace':
        if (query === '' && selected.length > 0) {
          onRemove(selected[selected.length - 1])
        }
        break
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* ── Input ── */}
      <div
        className={cn(
          'flex items-center gap-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 transition-all',
          inputRingStyles[variant]
        )}
        onClick={() => { setIsOpen(true); inputRef.current?.focus() }}
      >
        {isLoading ? (
          <Loader2 className={cn('w-4 h-4 shrink-0 animate-spin', iconColorStyles[variant])} />
        ) : (
          <Search className="w-4 h-4 shrink-0 text-white/40" />
        )}
        <input
          ref={inputRef}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={listId}
          aria-activedescendant={filtered[activeIdx] ? `${listId}-${filtered[activeIdx].id}` : undefined}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true) }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={isLoading ? 'Loading skills…' : placeholder}
          disabled={isLoading}
          className="flex-1 bg-transparent text-sm text-white placeholder:text-white/35 outline-none min-w-0 disabled:opacity-50"
        />
        <ChevronDown
          className={cn(
            'w-4 h-4 shrink-0 text-white/40 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </div>

      {/* ── Dropdown ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute z-50 mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 shadow-2xl shadow-black/40 overflow-hidden"
          >
            <ul
              id={listId}
              ref={listRef}
              role="listbox"
              className="max-h-56 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-white/10"
            >
              {filtered.length === 0 ? (
                <li className="flex flex-col items-center gap-2 py-8 text-center text-white/40 text-sm select-none">
                  {query ? (
                    <>
                      <Search className="w-6 h-6 opacity-50" />
                      <span>No skills match <strong className="text-white/60">"{query}"</strong></span>
                    </>
                  ) : (
                    <>
                      {variant === 'teach' ? (
                        <Dumbbell className="w-6 h-6 opacity-50" />
                      ) : (
                        <BookOpen className="w-6 h-6 opacity-50" />
                      )}
                      <span>All skills already added!</span>
                    </>
                  )}
                </li>
              ) : (
                filtered.map((skill, idx) => (
                  <li
                    key={skill.id}
                    id={`${listId}-${skill.id}`}
                    role="option"
                    aria-selected={idx === activeIdx}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onMouseDown={(e) => { e.preventDefault(); handleSelect(skill) }}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 cursor-pointer text-sm text-white/80 transition-colors',
                      idx === activeIdx && activeItemStyles[variant]
                    )}
                  >
                    {/* Category dot */}
                    <span
                      className={cn(
                        'w-2 h-2 rounded-full shrink-0',
                        variant === 'teach' ? 'bg-emerald-400' : 'bg-violet-400'
                      )}
                    />
                    <span className="flex-1">{skill.name}</span>
                    {skill.category && (
                      <span
                        className={cn(
                          'text-xs px-2 py-0.5 rounded-full',
                          highlightStyles[variant]
                        )}
                      >
                        {skill.category}
                      </span>
                    )}
                  </li>
                ))
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Selected tags ── */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          <AnimatePresence>
            {selected.map((skill) => (
              <SkillTag
                key={skill.id}
                label={skill.name}
                variant={variant}
                onRemove={() => onRemove(skill)}
                isRemoving={removingId === skill.id}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
