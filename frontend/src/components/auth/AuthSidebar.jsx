import { Brain, FileSearch, BarChart3, Users } from 'lucide-react'

function AuthSidebar({ mode }) {
  return (
    <aside className="auth-sidebar">
      <div className="sidebar-content">
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect x="3" y="3" width="14" height="14" rx="3" fill="#2a9d5e" />
              <rect x="23" y="3" width="14" height="14" rx="3" fill="#5cb882" opacity="0.7" />
              <rect x="3" y="23" width="14" height="14" rx="3" fill="#5cb882" opacity="0.7" />
              <rect x="23" y="23" width="14" height="14" rx="3" fill="#2a9d5e" />
            </svg>
          </div>
          <span className="sidebar-logo-text">RPO Recruit AI</span>
        </div>

        {/* Headline */}
        <h1 className="sidebar-headline">
          Smarter hiring,<br />
          powered by <span className="accent">AI</span>.
        </h1>
        <p className="sidebar-subtitle">
          Automatically match resumes to job descriptions using semantic AI.
          Spend less time screening, more time connecting with top talent.
        </p>

        {/* Features */}
        <div className="sidebar-features">
          <div className="sidebar-feature">
            <div className="feature-icon">
              <Brain size={18} />
            </div>
            <div className="feature-text">
              <h4>AI-Powered Matching</h4>
              <p>Semantic similarity ranks candidates intelligently</p>
            </div>
          </div>

          <div className="sidebar-feature">
            <div className="feature-icon">
              <FileSearch size={18} />
            </div>
            <div className="feature-text">
              <h4>Resume Processing</h4>
              <p>Automatic skill extraction from uploaded PDFs</p>
            </div>
          </div>

          <div className="sidebar-feature">
            <div className="feature-icon">
              <BarChart3 size={18} />
            </div>
            <div className="feature-text">
              <h4>Match Scoring</h4>
              <p>Visual candidate ranking with confidence scores</p>
            </div>
          </div>

          <div className="sidebar-feature">
            <div className="feature-icon">
              <Users size={18} />
            </div>
            <div className="feature-text">
              <h4>Recruiter Dashboard</h4>
              <p>Manage jobs, candidates, and decisions in one place</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <p>
          Built by <span className="company-name">Unifind Networks LLP</span>
          <br />
          Transforming recruitment with intelligent automation.
        </p>
      </div>
    </aside>
  )
}

export default AuthSidebar