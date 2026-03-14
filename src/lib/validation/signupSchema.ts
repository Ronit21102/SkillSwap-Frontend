/**
 * signupSchema.ts — Zod validation schema for user signup
 *
 * Validates:
 *  • name: 2-60 characters
 *  • email: valid email format
 *  • password: min 8 chars, 1 uppercase, 1 number
 *  • confirmPassword: must match password
 */

import { z } from 'zod'

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name is too long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email'),
  password: z
    .string()
    .min(8, 'At least 8 characters')
    .regex(/[A-Z]/, 'Include at least one uppercase letter')
    .regex(/[0-9]/, 'Include at least one number'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export type SignupFormValues = z.infer<typeof signupSchema>
