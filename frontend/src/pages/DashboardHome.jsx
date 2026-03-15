import {
  Briefcase,
  FileText,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MapPin,
  ChevronRight,
  Plus
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './DashboardHome.css'

// Mock data — will be replaced with API calls
const stats = [
  {
    label: 'Active Jobs',
    value: '12',
    change: '+3',
    trend: 'up',
    icon: Briefcase,
    color: 'blue',
  },
  {
    label: 'Total Resumes',
    value: '248',
    change: '+28',
    trend: 'up',
    icon: FileText,
    color: 'green',
  },
  {
    label: 'Candidates Matched',
    value: '86',
    change: '+12',
    trend: 'up',
    icon: Users,
    color: 'purple',
  },
  {
    label: 'Avg Match Score',
    value: '78%',
    change: '+5%',
    trend: 'up',
    icon: TrendingUp,
    color: 'amber',
  },
]

const recentJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Unifind Networks',
    location: 'Hyderabad, India',
    type: 'Full-time',
    applicants: 34,
    posted: '2 days ago',
    status: 'active',
  },
  {
    id: 2,
    title: 'Backend Engineer (Python)',
    company: 'Unifind Networks',
    location: 'Remote',
    type: 'Full-time',
    applicants: 21,
    posted: '4 days ago',
    status: 'active',
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    company: 'Unifind Networks',
    location: 'Bangalore, India',
    type: 'Contract',
    applicants: 15,
    posted: '1 week ago',
    status: 'active',
  },
  {
    id: 4,
    title: 'UI/UX Designer',
    company: 'Unifind Networks',
    location: 'Hyderabad, India',
    type: 'Full-time',
    applicants: 42,
    posted: '1 week ago',
    status: 'closed',
  },
]

const recentCandidates = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Frontend Developer',
    matchScore: 92,
    skills: ['React', 'TypeScript', 'CSS'],
    applied: '1 hour ago',
  },
  {
    id: 2,
    name: 'Rahul Patel',
    role: 'Python Developer',
    matchScore: 87,
    skills: ['Python', 'FastAPI', 'PostgreSQL'],
    applied: '3 hours ago',
  },
  {
    id: 3,
    name: 'Ananya Reddy',
    role: 'Full Stack Engineer',
    matchScore: 84,
    skills: ['React', 'Node.js', 'MongoDB'],
    applied: '5 hours ago',
  },
  {
    id: 4,
    name: 'Vikram Singh',
    role: 'DevOps Engineer',
    matchScore: 79,
    skills: ['Docker', 'AWS', 'Kubernetes'],
    applied: '1 day ago',
  },
  {
    id: 5,
    name: 'Meera Nair',
    role: 'UI Designer',
    matchScore: 75,
    skills: ['Figma', 'Adobe XD', 'CSS'],
    applied: '1 day ago',
  },
]

function getScoreColor(score) {
  if (score >= 90) return 'score-excellent'
  if (score >= 80) return 'score-good'
  if (score >= 70) return 'score-fair'
  return 'score-low'
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

function DashboardHome() {
  const navigate = useNavigate()

  return (
    <div className="dashboard-home">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back! Here's your recruitment overview.</p>
        </div>
        <button className="btn-primary" onClick={() => navigate('/dashboard/jobs')}>
          <Plus size={17} />
          Post New Job
        </button>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <div className={`stat-card stat-${stat.color}`} key={stat.label}>
            <div className="stat-header">
              <div className={`stat-icon stat-icon-${stat.color}`}>
                <stat.icon size={18} />
              </div>
              <div className={`stat-trend trend-${stat.trend}`}>
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Content Grid: Jobs + Candidates */}
      <div className="dashboard-grid">
        {/* Recent Jobs */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">Recent Jobs</h2>
            <button className="card-link" onClick={() => navigate('/dashboard/jobs')}>
              View all <ChevronRight size={14} />
            </button>
          </div>
          <div className="jobs-list">
            {recentJobs.map((job) => (
              <div className="job-item" key={job.id}>
                <div className="job-info">
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-meta">
                    <span className="job-meta-item">
                      <MapPin size={13} />
                      {job.location}
                    </span>
                    <span className="job-meta-item">
                      <Clock size={13} />
                      {job.posted}
                    </span>
                  </div>
                </div>
                <div className="job-right">
                  <span className={`job-status status-${job.status}`}>
                    {job.status}
                  </span>
                  <span className="job-applicants">
                    {job.applicants} applicants
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Candidates */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2 className="card-title">Top Candidates</h2>
            <button className="card-link" onClick={() => navigate('/dashboard/candidates')}>
              View all <ChevronRight size={14} />
            </button>
          </div>
          <div className="candidates-list">
            {recentCandidates.map((candidate) => (
              <div className="candidate-item" key={candidate.id}>
                <div className="candidate-avatar">
                  {getInitials(candidate.name)}
                </div>
                <div className="candidate-info">
                  <h3 className="candidate-name">{candidate.name}</h3>
                  <p className="candidate-role">{candidate.role}</p>
                  <div className="candidate-skills">
                    {candidate.skills.map((skill) => (
                      <span className="skill-tag" key={skill}>{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="candidate-score-wrapper">
                  <div className={`candidate-score ${getScoreColor(candidate.matchScore)}`}>
                    {candidate.matchScore}%
                  </div>
                  <span className="candidate-applied">{candidate.applied}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome
