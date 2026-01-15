import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Label } from '../components/ui/label'
import { cn } from '../components/ui/utils'

type AuthMode = 'login' | 'signup'

interface AuthFormData {
  email: string
  password: string
  confirmPassword?: string
}

interface AuthProps {
  initialMode?: AuthMode
}

export function Auth({ initialMode = 'login' }: AuthProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<AuthFormData>()

  const password = watch('password')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    reset()
  }, [mode, reset])

  const onSubmit = async (data: AuthFormData) => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (mode === 'login') {
      toast.success('Welcome back!')
    } else {
      toast.success('Account created successfully!')
    }

    console.log('Form submitted:', data)
    navigate('/dashboard')
  }

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login')
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Decorative */}
      <div
        className={cn(
          "hidden lg:flex lg:w-1/2 xl:w-[45%] relative overflow-hidden",
          "bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f1a]",
          "dark:from-[#0d0d14] dark:via-[#0a0a12] dark:to-[#050508]",
          "transition-transform duration-500 ease-out",
          isVisible ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Geometric shapes */}
        <div className="absolute top-20 left-16 w-32 h-32 rounded-full bg-accent/20 blur-2xl" />
        <div className="absolute top-40 right-20 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-32 left-24 w-24 h-24 rounded-full bg-accent/15 blur-xl" />

        {/* Floating rings */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full border border-accent/20" />
        <div className="absolute top-1/3 left-1/3 w-56 h-56 rounded-full border border-accent/10" />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full border border-accent/15" />

        {/* Accent lines */}
        <div className="absolute top-0 left-1/3 w-px h-1/2 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
        <div className="absolute bottom-0 right-1/3 w-px h-1/2 bg-gradient-to-t from-transparent via-accent/20 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="font-bold text-lg text-white">P</span>
            </div>
            <span className="font-semibold text-xl">Paso</span>
          </Link>

          {/* Tagline */}
          <div className="max-w-md">
            <h1 className="text-4xl xl:text-5xl font-semibold leading-tight mb-6">
              Manage tasks at the{' '}
              <span className="text-accent">speed of thought</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              A blazing-fast task management system built for developers who live in the terminal.
            </p>
          </div>

          {/* Bottom decoration */}
          <div className="flex items-center gap-4 text-white/40 text-sm">
            <div className="w-12 h-px bg-white/20" />
            <span className="font-mono">paso.dev</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div
        className={cn(
          "flex-1 flex items-center justify-center p-6 sm:p-12",
          "transition-all duration-500 ease-out delay-100",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden flex items-center gap-3 mb-12 group">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="font-bold text-lg text-white">P</span>
            </div>
            <span className="font-semibold text-xl">Paso</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h2
              className={cn(
                "text-3xl font-semibold mb-2 transition-all duration-300",
                mode === 'login' ? "opacity-100" : "opacity-100"
              )}
            >
              {mode === 'login' ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-muted-foreground">
              {mode === 'login'
                ? 'Enter your credentials to access your account'
                : 'Fill in the details below to get started'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div
              className="space-y-2"
              style={{ animationDelay: '0ms' }}
            >
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={cn(
                  "h-11",
                  errors.email && "border-red-500 focus-visible:ring-red-500/50"
                )}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div
              className="space-y-2"
              style={{ animationDelay: '50ms' }}
            >
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {mode === 'login' && (
                  <Link
                    to="/forgot-password"
                    className="text-sm text-accent hover:text-accent/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className={cn(
                  "h-11",
                  errors.password && "border-red-500 focus-visible:ring-red-500/50"
                )}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password - Only for signup */}
            <div
              className={cn(
                "space-y-2 overflow-hidden transition-all duration-300",
                mode === 'signup'
                  ? "max-h-24 opacity-100"
                  : "max-h-0 opacity-0"
              )}
              style={{ animationDelay: '100ms' }}
            >
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className={cn(
                  "h-11",
                  errors.confirmPassword && "border-red-500 focus-visible:ring-red-500/50"
                )}
                {...register('confirmPassword', {
                  validate: value => {
                    if (mode === 'signup') {
                      if (!value) return 'Please confirm your password'
                      if (value !== password) return 'Passwords do not match'
                    }
                    return true
                  }
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-accent hover:bg-accent/90 text-white font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12" cy="12" r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                mode === 'login' ? 'Sign in' : 'Create account'
              )}
            </Button>
          </form>

          {/* Toggle mode */}
          <p className="mt-8 text-center text-muted-foreground">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-accent hover:text-accent/80 font-medium transition-colors"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-accent hover:text-accent/80 font-medium transition-colors"
                >
                  Sign in
                </button>
              </>
            )}
          </p>

          {/* Terms */}
          <p className="mt-6 text-center text-xs text-muted-foreground/60">
            By continuing, you agree to our{' '}
            <Link to="/terms" className="underline hover:text-muted-foreground transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="underline hover:text-muted-foreground transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
