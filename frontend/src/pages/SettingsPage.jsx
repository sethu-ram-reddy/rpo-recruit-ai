import { useState } from 'react'
import {
  User,
  Lock,
  Bell,
  Shield,
  Save,
  Camera,
  Mail,
  Phone,
  Building2,
  MapPin,
  Eye,
  EyeOff,
  CheckCircle,
  Trash2,
  LogOut
} from 'lucide-react'
import './SettingsPage.css'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'password', label: 'Password', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'account', label: 'Account', icon: Shield },
]

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [saved, setSaved] = useState(false)

  const showSaved = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your account preferences and configurations.</p>
        </div>
      </div>

      {/* Save toast */}
      {saved && (
        <div className="save-toast">
          <CheckCircle size={16} />
          Changes saved successfully!
        </div>
      )}

      <div className="settings-layout">
        {/* Tab nav */}
        <nav className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={17} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Tab content */}
        <div className="settings-content">
          {activeTab === 'profile' && <ProfileTab onSave={showSaved} />}
          {activeTab === 'password' && <PasswordTab onSave={showSaved} />}
          {activeTab === 'notifications' && <NotificationsTab onSave={showSaved} />}
          {activeTab === 'account' && <AccountTab />}
        </div>
      </div>
    </div>
  )
}

/* ---- Profile Tab ---- */
function ProfileTab({ onSave }) {
  const [form, setForm] = useState({
    fullName: 'Sethu Ram',
    email: 'sethu.ram@unifind.com',
    phone: '+91 98765 43210',
    company: 'Unifind Networks LLP',
    role: 'Senior Recruiter',
    location: 'Hyderabad, India',
    bio: 'Experienced recruiter specializing in tech talent acquisition. Passionate about using AI to streamline the hiring process.',
  })

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Connect to API
    console.log('Profile saved:', form)
    onSave()
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <h2 className="settings-section-title">Profile Information</h2>
      <p className="settings-section-desc">Update your personal details and public profile.</p>

      {/* Avatar */}
      <div className="avatar-section">
        <div className="avatar-large">SR</div>
        <div className="avatar-actions">
          <button type="button" className="btn-small btn-outline">
            <Camera size={14} /> Change Photo
          </button>
          <span className="avatar-hint">JPG, PNG or GIF. Max 2MB.</span>
        </div>
      </div>

      <div className="form-grid">
        <div className="settings-field">
          <label className="settings-label">
            <User size={14} /> Full Name
          </label>
          <input
            className="settings-input"
            value={form.fullName}
            onChange={handleChange('fullName')}
          />
        </div>

        <div className="settings-field">
          <label className="settings-label">
            <Mail size={14} /> Email Address
          </label>
          <input
            className="settings-input"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
          />
        </div>

        <div className="settings-field">
          <label className="settings-label">
            <Phone size={14} /> Phone Number
          </label>
          <input
            className="settings-input"
            value={form.phone}
            onChange={handleChange('phone')}
          />
        </div>

        <div className="settings-field">
          <label className="settings-label">
            <Building2 size={14} /> Company
          </label>
          <input
            className="settings-input"
            value={form.company}
            onChange={handleChange('company')}
          />
        </div>

        <div className="settings-field">
          <label className="settings-label">
            <Shield size={14} /> Role
          </label>
          <input
            className="settings-input"
            value={form.role}
            onChange={handleChange('role')}
          />
        </div>

        <div className="settings-field">
          <label className="settings-label">
            <MapPin size={14} /> Location
          </label>
          <input
            className="settings-input"
            value={form.location}
            onChange={handleChange('location')}
          />
        </div>
      </div>

      <div className="settings-field full-width">
        <label className="settings-label">Bio</label>
        <textarea
          className="settings-textarea"
          rows={3}
          value={form.bio}
          onChange={handleChange('bio')}
        />
      </div>

      <div className="settings-actions">
        <button type="submit" className="btn-primary">
          <Save size={16} /> Save Changes
        </button>
      </div>
    </form>
  )
}

/* ---- Password Tab ---- */
function PasswordTab({ onSave }) {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!form.currentPassword) newErrors.currentPassword = 'Current password is required'
    if (!form.newPassword) newErrors.newPassword = 'New password is required'
    else if (form.newPassword.length < 8) newErrors.newPassword = 'Must be at least 8 characters'
    if (form.newPassword !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'

    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      console.log('Password updated')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      onSave()
    }
  }

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <h2 className="settings-section-title">Change Password</h2>
      <p className="settings-section-desc">Ensure your account stays secure by using a strong password.</p>

      <div className="password-fields">
        <div className="settings-field">
          <label className="settings-label">Current Password</label>
          <div className="settings-input-wrapper">
            <input
              className={`settings-input ${errors.currentPassword ? 'error' : ''}`}
              type={showCurrent ? 'text' : 'password'}
              placeholder="Enter current password"
              value={form.currentPassword}
              onChange={handleChange('currentPassword')}
            />
            <button
              type="button"
              className="settings-eye-btn"
              onClick={() => setShowCurrent(!showCurrent)}
            >
              {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.currentPassword && <span className="settings-error">{errors.currentPassword}</span>}
        </div>

        <div className="settings-field">
          <label className="settings-label">New Password</label>
          <div className="settings-input-wrapper">
            <input
              className={`settings-input ${errors.newPassword ? 'error' : ''}`}
              type={showNew ? 'text' : 'password'}
              placeholder="Enter new password"
              value={form.newPassword}
              onChange={handleChange('newPassword')}
            />
            <button
              type="button"
              className="settings-eye-btn"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.newPassword && <span className="settings-error">{errors.newPassword}</span>}
        </div>

        <div className="settings-field">
          <label className="settings-label">Confirm New Password</label>
          <input
            className={`settings-input ${errors.confirmPassword ? 'error' : ''}`}
            type="password"
            placeholder="Confirm new password"
            value={form.confirmPassword}
            onChange={handleChange('confirmPassword')}
          />
          {errors.confirmPassword && <span className="settings-error">{errors.confirmPassword}</span>}
        </div>
      </div>

      <div className="settings-actions">
        <button type="submit" className="btn-primary">
          <Lock size={16} /> Update Password
        </button>
      </div>
    </form>
  )
}

/* ---- Notifications Tab ---- */
function NotificationsTab({ onSave }) {
  const [prefs, setPrefs] = useState({
    emailNewCandidate: true,
    emailMatchFound: true,
    emailWeeklyReport: false,
    emailJobExpiry: true,
    pushNewCandidate: true,
    pushMatchFound: true,
    pushWeeklyReport: false,
    pushJobExpiry: false,
  })

  const togglePref = (key) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Notifications saved:', prefs)
    onSave()
  }

  const NotifRow = ({ label, desc, emailKey, pushKey }) => (
    <div className="notif-row">
      <div className="notif-info">
        <span className="notif-label">{label}</span>
        <span className="notif-desc">{desc}</span>
      </div>
      <div className="notif-toggles">
        <label className="toggle-wrapper" title="Email">
          <input
            type="checkbox"
            className="toggle-input"
            checked={prefs[emailKey]}
            onChange={() => togglePref(emailKey)}
          />
          <span className="toggle-slider" />
        </label>
        <label className="toggle-wrapper" title="Push">
          <input
            type="checkbox"
            className="toggle-input"
            checked={prefs[pushKey]}
            onChange={() => togglePref(pushKey)}
          />
          <span className="toggle-slider" />
        </label>
      </div>
    </div>
  )

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <h2 className="settings-section-title">Notification Preferences</h2>
      <p className="settings-section-desc">Choose how you want to be notified about activity.</p>

      <div className="notif-header-row">
        <span />
        <div className="notif-column-labels">
          <span>Email</span>
          <span>Push</span>
        </div>
      </div>

      <div className="notif-list">
        <NotifRow
          label="New candidate applied"
          desc="When a new resume is uploaded for your jobs"
          emailKey="emailNewCandidate"
          pushKey="pushNewCandidate"
        />
        <NotifRow
          label="AI match found"
          desc="When AI finds a high-scoring candidate match"
          emailKey="emailMatchFound"
          pushKey="pushMatchFound"
        />
        <NotifRow
          label="Weekly summary report"
          desc="A weekly overview of your recruitment activity"
          emailKey="emailWeeklyReport"
          pushKey="pushWeeklyReport"
        />
        <NotifRow
          label="Job posting expiry"
          desc="Reminder when a job posting is about to expire"
          emailKey="emailJobExpiry"
          pushKey="pushJobExpiry"
        />
      </div>

      <div className="settings-actions">
        <button type="submit" className="btn-primary">
          <Save size={16} /> Save Preferences
        </button>
      </div>
    </form>
  )
}

/* ---- Account Tab ---- */
function AccountTab() {
  return (
    <div className="settings-form">
      <h2 className="settings-section-title">Account Settings</h2>
      <p className="settings-section-desc">Manage your account status and data.</p>

      <div className="account-info-card">
        <div className="account-info-row">
          <span className="account-info-label">Account Type</span>
          <span className="account-info-value">Recruiter (Admin)</span>
        </div>
        <div className="account-info-row">
          <span className="account-info-label">Member Since</span>
          <span className="account-info-value">March 2026</span>
        </div>
        <div className="account-info-row">
          <span className="account-info-label">Organization</span>
          <span className="account-info-value">Unifind Networks LLP</span>
        </div>
        <div className="account-info-row">
          <span className="account-info-label">Plan</span>
          <span className="account-plan-badge">Pro</span>
        </div>
      </div>

      <div className="danger-zone">
        <h3 className="danger-zone-title">Danger Zone</h3>
        <div className="danger-zone-actions">
          <div className="danger-item">
            <div>
              <span className="danger-item-title">Sign out of all devices</span>
              <span className="danger-item-desc">This will log you out from all active sessions.</span>
            </div>
            <button className="btn-small btn-outline danger-btn">
              <LogOut size={14} /> Sign Out All
            </button>
          </div>
          <div className="danger-item">
            <div>
              <span className="danger-item-title">Delete account</span>
              <span className="danger-item-desc">Permanently delete your account and all associated data. This action cannot be undone.</span>
            </div>
            <button className="btn-small btn-danger">
              <Trash2 size={14} /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
