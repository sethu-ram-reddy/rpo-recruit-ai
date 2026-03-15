import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email address'
    }
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true)
      // TODO: Connect to backend API
      console.log('Login submitted:', { email, rememberMe })

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        alert('Login successful! (Backend not connected yet)')
      }, 1200)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.65rem',
        fontWeight: 600,
        color: 'var(--ink-900)',
        marginBottom: '6px',
        letterSpacing: '-0.01em'
      }}>
        Welcome back
      </h2>
      <p style={{
        fontSize: '0.9rem',
        color: 'var(--ink-400)',
        marginBottom: 'var(--space-xl)'
      }}>
        Sign in to access your recruiter dashboard
      </p>

      {/* Email */}
      <div className="form-group">
        <label className="form-label" htmlFor="login-email">Email Address</label>
        <div className="form-input-wrapper">
          <span className="form-input-icon"><Mail size={17} /></span>
          <input
            id="login-email"
            type="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>
        {errors.email && <p className="form-error-text">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="form-group">
        <label className="form-label" htmlFor="login-password">Password</label>
        <div className="form-input-wrapper">
          <span className="form-input-icon"><Lock size={17} /></span>
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            className={`form-input ${errors.password ? 'error' : ''}`}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
        {errors.password && <p className="form-error-text">{errors.password}</p>}
      </div>

      {/* Remember + Forgot */}
      <div className="form-checkbox-row">
        <label className="form-checkbox-label">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember me
        </label>
        <button type="button" className="form-forgot-link">
          Forgot password?
        </button>
      </div>

      {/* Submit */}
      <button type="submit" className="form-submit-btn" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>

      {/* Divider */}
      <div className="form-divider">
        <div className="form-divider-line" />
        <span className="form-divider-text">or</span>
        <div className="form-divider-line" />
      </div>

      {/* Google */}
      <button type="button" className="form-social-btn">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>
    </form>
  )
}

export default LoginForm