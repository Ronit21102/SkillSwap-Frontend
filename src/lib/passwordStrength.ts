/**
 * passwordStrength.ts — Password strength calculator
 *
 * Evaluates password quality based on:
 *  • Length (8+ chars)
 *  • Uppercase letters
 *  • Numbers
 *  • Special characters
 */

interface StrengthResult {
  score: number
  label: string
  color: string
}

/**
 * Calculate password strength and return score, label, and color
 * @param password The password to evaluate
 * @returns Object with score (0-4), label, and Tailwind color class
 */
export function getPasswordStrength(password: string): StrengthResult {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  const map: Array<Omit<StrengthResult, 'score'>> = [
    { label: '', color: 'bg-white/10' },
    { label: 'Weak', color: 'bg-red-500' },
    { label: 'Fair', color: 'bg-yellow-500' },
    { label: 'Good', color: 'bg-emerald-400' },
    { label: 'Strong', color: 'bg-emerald-500' },
  ]
  return { score, ...map[score] }
}
