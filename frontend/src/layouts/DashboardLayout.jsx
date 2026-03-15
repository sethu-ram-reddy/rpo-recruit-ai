import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown
} from 'lucide-react'
import './DashboardLayout.css'

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/dashboard/jobs', icon: Briefcase, label: 'Jobs' },
    { to: '/dashboard/resumes', icon: FileText, label: 'Resumes' },
    { to: '/dashboard/candidates', icon: Users, label: 'Candidates' },
    { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    navigate('/auth')
  }

  return (
    <div className="dashboard-layout">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <rect x="3" y="3" width="14" height="14" rx="3" fill="#2a9d5e" />
              <rect x="23" y="3" width="14" height="14" rx="3" fill="#5cb882" opacity="0.7" />
              <rect x="3" y="23" width="14" height="14" rx="3" fill="#5cb882" opacity="0.7" />
              <rect x="23" y="23" width="14" height="14" rx="3" fill="#2a9d5e" />
            </svg>
            <span className="sidebar-brand-text">RPO Recruit</span>
          </div>
          <button
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <span className="nav-section-label">Menu</span>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'active' : ''}`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">SR</div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">Sethu Ram</span>
              <span className="sidebar-user-role">Recruiter</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="dashboard-main">
        {/* Top bar */}
        <header className="topbar">
          <button
            className="topbar-menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div className="topbar-spacer" />

          <div className="topbar-right">
            <div
              className="topbar-profile"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="topbar-avatar">SR</div>
              <span className="topbar-username">Sethu Ram</span>
              <ChevronDown size={14} className={`topbar-chevron ${profileOpen ? 'open' : ''}`} />

              {profileOpen && (
                <div className="profile-dropdown">
                  <button className="profile-dropdown-item" onClick={() => { setProfileOpen(false); navigate('/dashboard/settings') }}>
                    <Settings size={15} />
                    Settings
                  </button>
                  <button className="profile-dropdown-item" onClick={handleLogout}>
                    <LogOut size={15} />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
