import { useState } from 'react'
import LoginForm from '../components/auth/LoginForm.jsx'
import SignupForm from '../components/auth/SignupForm.jsx'
import AuthSidebar from '../components/auth/AuthSidebar.jsx'
import './AuthPage.css'

function AuthPage() {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [isTransitioning, setIsTransitioning] = useState(false)

  const switchMode = (newMode) => {
    if (newMode === mode) return
    setIsTransitioning(true)
    setTimeout(() => {
      setMode(newMode)
      setIsTransitioning(false)
    }, 250)
  }

  return (
    <div className="auth-page">
      {/* Left: Branding Panel */}
      <AuthSidebar mode={mode} />

      {/* Right: Form Panel */}
      <div className="auth-form-panel">
        <div className="auth-form-container">
          {/* Logo for mobile */}
          <div className="auth-mobile-logo">
            <div className="auth-logo-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="2" y="2" width="10" height="10" rx="2" fill="var(--accent-500)" />
                <rect x="16" y="2" width="10" height="10" rx="2" fill="var(--accent-300)" />
                <rect x="2" y="16" width="10" height="10" rx="2" fill="var(--accent-300)" />
                <rect x="16" y="16" width="10" height="10" rx="2" fill="var(--accent-500)" />
              </svg>
            </div>
            <span className="auth-logo-text">RPO Recruit</span>
          </div>

          {/* Tab Switcher */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => switchMode('login')}
            >
              Sign In
            </button>
            <button
              className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => switchMode('signup')}
            >
              Create Account
            </button>
            <div
              className="auth-tab-indicator"
              style={{ transform: mode === 'signup' ? 'translateX(100%)' : 'translateX(0)' }}
            />
          </div>

          {/* Form Area */}
          <div className={`auth-form-area ${isTransitioning ? 'transitioning' : ''}`}>
            {mode === 'login' ? <LoginForm /> : <SignupForm />}
          </div>

          {/* Footer */}
          <p className="auth-footer-text">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button className="auth-link" onClick={() => switchMode('signup')}>
                  Create one now
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button className="auth-link" onClick={() => switchMode('login')}>
                  Sign in instead
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthPage