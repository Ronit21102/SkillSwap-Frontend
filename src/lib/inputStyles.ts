/**
 * inputStyles.ts — Reusable input class builder for dark forms
 *
 * Provides consistent styling for form inputs with error states
 */

import { cn } from './cn'

/**
 * Build Tailwind classes for dark-themed input elements
 * @param hasError Whether the input has a validation error
 * @returns Tailwind class string
 */
export function inputCls(hasError: boolean): string {
  return cn(
    'w-full h-11 rounded-xl border bg-white/5 px-4 text-sm text-white',
    'placeholder:text-white/25 outline-none transition-all',
    'focus:bg-white/8 focus:ring-2',
    hasError
      ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
      : 'border-white/10 focus:border-emerald-500/60 focus:ring-emerald-500/20'
  )
}
