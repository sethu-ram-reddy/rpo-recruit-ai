import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AuthPage from './pages/AuthPage.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import DashboardHome from './pages/DashboardHome.jsx'
import JobsPage from './pages/JobsPage.jsx'
import ResumesPage from './pages/ResumesPage.jsx'
import CandidatesPage from './pages/CandidatesPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Dashboard (protected in future) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="resumes" element={<ResumesPage />} />
          <Route path="candidates" element={<CandidatesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  )
}

export default App
