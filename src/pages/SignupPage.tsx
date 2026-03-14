import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/cn'
import { signupSchema, type SignupFormValues } from '@/lib/validation/signupSchema'
import { getPasswordStrength } from '@/lib/passwordStrength'
import { inputCls } from '@/lib/inputStyles'

/* ── Component ──────────────────────────────────────────── */
export default function SignupPage() {
  const navigate = useNavigate()
  const { signup, isLoading, error, clearError } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm,  setShowConfirm]  = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({ resolver: zodResolver(signupSchema) })

  const passwordValue = watch('password', '')
  const strength      = getPasswordStrength(passwordValue)

  const onSubmit = async (values: SignupFormValues) => {
    try {
      await signup({ name: values.name, email: values.email, password: values.password })
      navigate('/skills/setup', { replace: true })
    } catch {
      // error already in store
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black text-white mb-2">Create your account</h1>
        <p className="text-white/50 text-sm">Free forever · no credit card needed</p>
      </div>

      {/* Card */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 shadow-2xl">

        {/* Server error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-start gap-2.5 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
            <button onClick={clearError} className="ml-auto text-red-400/60 hover:text-red-400 transition-colors">✕</button>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

          {/* Full name */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-white/70">Full name</label>
            <input
              type="text"
              autoComplete="name"
              placeholder="Aryan Gupta"
              {...register('name')}
              className={inputCls(!!errors.name)}
            />
            {errors.name && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-white/70">Email address</label>
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              {...register('email')}
              onChange={() => { if (error) clearError() }}
              className={inputCls(!!errors.email)}
            />
            {errors.email && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-white/70">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Min 8 chars, 1 uppercase, 1 number"
                {...register('password')}
                className={cn(inputCls(!!errors.password), 'pr-11')}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Strength bar */}
            {passwordValue.length > 0 && (
              <div className="space-y-1">
                <div className="flex gap-1 h-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        'flex-1 rounded-full transition-all duration-300',
                        i <= strength.score ? strength.color : 'bg-white/10'
                      )}
                    />
                  ))}
                </div>
                {strength.label && (
                  <p className="text-xs text-white/30">
                    Strength: <span className="font-medium text-white/60">{strength.label}</span>
                  </p>
                )}
              </div>
            )}

            {errors.password && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm password */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-white/70">Confirm password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="••••••••"
                {...register('confirmPassword')}
                className={cn(inputCls(!!errors.confirmPassword), 'pr-11')}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Terms */}
          <p className="text-xs text-white/30 leading-relaxed">
            By signing up you agree to our{' '}
            <a href="#" className="text-emerald-400 hover:underline">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="text-emerald-400 hover:underline">Privacy Policy</a>.
          </p>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="w-full h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-500/25"
          >
            {isLoading
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account…</>
              : <><CheckCircle className="w-4 h-4" /> Create account <ArrowRight className="w-4 h-4" /></>
            }
          </motion.button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/8" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-transparent px-3 text-xs text-white/30">or continue with</span>
          </div>
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={() => window.location.href = `${import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'}/auth/google`}
          className="w-full h-11 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-sm font-medium flex items-center justify-center gap-2.5 transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
      </div>

      {/* Footer */}
      <p className="text-center text-sm text-white/40 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">
          Log in
        </Link>
      </p>
    </motion.div>
  )
}
