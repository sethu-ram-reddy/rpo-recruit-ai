import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, User, Building2 } from 'lucide-react'

function SignupForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
    // Clear error on change
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the terms'
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
      console.log('Signup submitted:', formData)

      setTimeout(() => {
        setIsLoading(false)
        alert('Account created! (Backend not connected yet)')
      }, 1200)
    }
  }

  // Password strength indicator
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { level: 0, label: '', color: '' }
    let score = 0
    if (pwd.length >= 8) score++
    if (pwd.length >= 12) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++

    if (score <= 1) return { level: 1, label: 'Weak', color: 'var(--error)' }
    if (score <= 2) return { level: 2, label: 'Fair', color: 'var(--warm-500)' }
    if (score <= 3) return { level: 3, label: 'Good', color: 'var(--accent-400)' }
    return { level: 4, label: 'Strong', color: 'var(--accent-600)' }
  }

  const strength = getPasswordStrength(formData.password)

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
        Create your account
      </h2>
      <p style={{
        fontSize: '0.9rem',
        color: 'var(--ink-400)',
        marginBottom: 'var(--space-xl)'
      }}>
        Start matching candidates with AI in minutes
      </p>

      {/* Full Name */}
      <div className="form-group">
        <label className="form-label" htmlFor="signup-name">Full Name</label>
        <div className="form-input-wrapper">
          <span className="form-input-icon"><User size={17} /></span>
          <input
            id="signup-name"
            type="text"
            className={`form-input ${errors.fullName ? 'error' : ''}`}
            placeholder="Your full name"
            value={formData.fullName}
            onChange={handleChange('fullName')}
            autoComplete="name"
          />
        </div>
        {errors.fullName && <p className="form-error-text">{errors.fullName}</p>}
      </div>

      {/* Company (optional) */}
      <div className="form-group">
        <label className="form-label" htmlFor="signup-company">
          Company <span style={{ color: 'var(--ink-300)', fontWeight: 400 }}>(optional)</span>
        </label>
        <div className="form-input-wrapper">
          <span className="form-input-icon"><Building2 size={17} /></span>
          <input
            id="signup-company"
            type="text"
            className="form-input"
            placeholder="Your company name"
            value={formData.company}
            onChange={handleChange('company')}
            autoComplete="organization"
          />
        </div>
      </div>

      {/* Email */}
      <div className="form-group">
        <label className="form-label" htmlFor="signup-email">Email Address</label>
        <div className="form-input-wrapper">
          <span className="form-input-icon"><Mail size={17} /></span>
          <input
            id="signup-email"
            type="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder="you@company.com"
            value={formData.email}
            onChange={handleChange('email')}
            autoComplete="email"
          />
        </div>
        {errors.email && <p className="form-error-text">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="form-group">
        <label className="form-label" htmlFor="signup-password">Password</label>
        <div className="form-input-wrapper">
          <span className="form-input-icon"><Lock size={17} /></span>
          <input
            id="signup-password"
            type={showPassword ? 'text' : 'password'}
            className={`form-input ${errors.password ? 'error' : ''}`}
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange('password')}
            autoComplete="new-password"
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

        {/* Password strength bar */}
        {formData.password && (
          <div style={{ marginTop: '8px' }}>
            <div style={{
              display: 'flex',
              gap: '4px',
              marginBottom: '4px'
            }}>
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: '3px',
                    borderRadius: '2px',
                    background: i <= strength.level ? strength.color : 'var(--ink-100)',
                    transition: 'background 300ms ease'
                  }}
                />
              ))}
            </div>
            <p style={{
              fontSize: '0.75rem',
              color: strength.color,
              fontWeight: 500
            }}>
              {strength.label}
            </p>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="form-group">
        <label className="form-label" htmlFor="signup-confirm">Confirm Password</label>
        <div className="form-input-wrapper">
          <span className="form-input-icon"><Lock size={17} /></span>
          <input
            id="signup-confirm"
            type={showConfirmPassword ? 'text' : 'password'}
            className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            autoComplete="new-password"
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            tabIndex={-1}
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
        {errors.confirmPassword && <p className="form-error-text">{errors.confirmPassword}</p>}
      </div>

      {/* Terms */}
      <div style={{ marginBottom: 'var(--space-lg)' }}>
        <label className="form-checkbox-label">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          I agree to the{' '}
          <button type="button" className="form-forgot-link" style={{ padding: 0 }}>
            Terms of Service
          </button>{' '}
          and{' '}
          <button type="button" className="form-forgot-link" style={{ padding: 0 }}>
            Privacy Policy
          </button>
        </label>
        {errors.terms && <p className="form-error-text" style={{ marginTop: '4px' }}>{errors.terms}</p>}
      </div>

      {/* Submit */}
      <button type="submit" className="form-submit-btn" disabled={isLoading}>
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>

      {/* Divider */}
      <div className="form-divider">
        <div className="form-divider-line" />
        <span className="form-divider-text">or</span>
        <div className="form-divider-line" />
      </div>

      {/* Google */}
      <button type="button" className="form-social-btn">
        <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
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

export default SignupForm