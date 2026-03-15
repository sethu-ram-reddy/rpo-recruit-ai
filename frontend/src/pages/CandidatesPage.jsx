import { useState } from 'react'
import {
  Search,
  Filter,
  ChevronDown,
  X,
  Eye,
  Briefcase,
  Users,
  Star,
  ArrowUpDown,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  FileText,
  Calendar,
  TrendingUp,
  Award
} from 'lucide-react'
import './CandidatesPage.css'

// Mock jobs for the job selector
const jobs = [
  { id: 0, title: 'All Jobs' },
  { id: 1, title: 'Senior Frontend Developer' },
  { id: 2, title: 'Backend Engineer (Python)' },
  { id: 3, title: 'DevOps Engineer' },
  { id: 4, title: 'UI/UX Designer' },
  { id: 5, title: 'Data Scientist' },
  { id: 6, title: 'Project Manager' },
]

// Mock candidates with per-job match scores
const allCandidates = [
  {
    id: 1,
    name: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    phone: '+91 98765 43210',
    location: 'Hyderabad, India',
    experience: '6 years',
    currentRole: 'Senior Frontend Developer',
    education: 'B.Tech, Computer Science — IIT Hyderabad',
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'Next.js', 'GraphQL', 'Tailwind'],
    summary: 'Experienced frontend developer with 6 years of expertise in React ecosystem. Strong in building scalable web applications.',
    appliedDate: '2 hours ago',
    status: 'shortlisted',
    jobMatches: {
      1: { score: 92, matchedSkills: ['React', 'TypeScript', 'JavaScript', 'CSS'], missingSkills: ['REST APIs'] },
      2: { score: 45, matchedSkills: ['JavaScript'], missingSkills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'] },
      5: { score: 38, matchedSkills: [], missingSkills: ['Python', 'Machine Learning', 'NLP'] },
    },
  },
  {
    id: 2,
    name: 'Rahul Patel',
    email: 'rahul.patel@outlook.com',
    phone: '+91 87654 32109',
    location: 'Mumbai, India',
    experience: '4 years',
    currentRole: 'Python Developer',
    education: 'M.Tech, Software Engineering — NIT Mumbai',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Redis', 'REST APIs'],
    summary: 'Backend developer specializing in Python with strong experience in FastAPI and microservices architecture.',
    appliedDate: '5 hours ago',
    status: 'new',
    jobMatches: {
      2: { score: 87, matchedSkills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'REST APIs'], missingSkills: [] },
      3: { score: 52, matchedSkills: ['Docker'], missingSkills: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD'] },
      5: { score: 61, matchedSkills: ['Python'], missingSkills: ['Machine Learning', 'NLP', 'TensorFlow'] },
    },
  },
  {
    id: 3,
    name: 'Ananya Reddy',
    email: 'ananya.r@gmail.com',
    phone: '+91 76543 21098',
    location: 'Bangalore, India',
    experience: '5 years',
    currentRole: 'Full Stack Engineer',
    education: 'B.E, Information Technology — BITS Pilani',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS', 'TypeScript'],
    summary: 'Versatile full stack engineer comfortable with both frontend and backend technologies.',
    appliedDate: '1 day ago',
    status: 'interview',
    jobMatches: {
      1: { score: 84, matchedSkills: ['React', 'TypeScript'], missingSkills: ['CSS', 'JavaScript', 'REST APIs'] },
      2: { score: 41, matchedSkills: [], missingSkills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'REST APIs'] },
      3: { score: 48, matchedSkills: ['AWS'], missingSkills: ['Docker', 'Kubernetes', 'Terraform', 'CI/CD'] },
    },
  },
  {
    id: 4,
    name: 'Vikram Singh',
    email: 'vikram.s@yahoo.com',
    phone: '+91 65432 10987',
    location: 'Delhi, India',
    experience: '7 years',
    currentRole: 'DevOps Lead',
    education: 'B.Tech, Computer Science — DTU Delhi',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Jenkins', 'CI/CD', 'Linux'],
    summary: 'Senior DevOps engineer with extensive experience managing cloud infrastructure at scale.',
    appliedDate: '1 day ago',
    status: 'new',
    jobMatches: {
      3: { score: 94, matchedSkills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD'], missingSkills: [] },
      2: { score: 35, matchedSkills: ['Docker'], missingSkills: ['Python', 'FastAPI', 'PostgreSQL', 'REST APIs'] },
    },
  },
  {
    id: 5,
    name: 'Meera Nair',
    email: 'meera.nair@gmail.com',
    phone: '+91 54321 09876',
    location: 'Chennai, India',
    experience: '4 years',
    currentRole: 'UI/UX Designer',
    education: 'M.Des, Interaction Design — NID Ahmedabad',
    skills: ['Figma', 'Adobe XD', 'CSS', 'Prototyping', 'User Research', 'Design Systems'],
    summary: 'Creative designer with a strong eye for detail and user-centered design philosophy.',
    appliedDate: '2 days ago',
    status: 'shortlisted',
    jobMatches: {
      4: { score: 91, matchedSkills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'], missingSkills: [] },
      1: { score: 32, matchedSkills: ['CSS'], missingSkills: ['React', 'TypeScript', 'JavaScript', 'REST APIs'] },
    },
  },
  {
    id: 6,
    name: 'Karthik Menon',
    email: 'karthik.m@gmail.com',
    phone: '+91 43210 98765',
    location: 'Pune, India',
    experience: '2 years',
    currentRole: 'Junior Data Analyst',
    education: 'B.Sc, Statistics — Fergusson College Pune',
    skills: ['Python', 'SQL', 'Pandas', 'Excel', 'Tableau'],
    summary: 'Aspiring data professional with strong analytical skills and proficiency in Python for data analysis.',
    appliedDate: '3 days ago',
    status: 'rejected',
    jobMatches: {
      5: { score: 68, matchedSkills: ['Python', 'SQL'], missingSkills: ['Machine Learning', 'NLP', 'TensorFlow'] },
      2: { score: 42, matchedSkills: ['Python'], missingSkills: ['FastAPI', 'PostgreSQL', 'Docker', 'REST APIs'] },
    },
  },
  {
    id: 7,
    name: 'Sneha Gupta',
    email: 'sneha.g@gmail.com',
    phone: '+91 32109 87654',
    location: 'Hyderabad, India',
    experience: '3 years',
    currentRole: 'React Developer',
    education: 'B.Tech, ECE — JNTU Hyderabad',
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Redux', 'REST APIs'],
    summary: 'Frontend developer with 3 years building React applications. Comfortable with state management and API integration.',
    appliedDate: '4 days ago',
    status: 'new',
    jobMatches: {
      1: { score: 78, matchedSkills: ['React', 'JavaScript', 'CSS', 'REST APIs'], missingSkills: ['TypeScript'] },
      4: { score: 29, matchedSkills: ['CSS'], missingSkills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'] },
    },
  },
  {
    id: 8,
    name: 'Arjun Das',
    email: 'arjun.das@gmail.com',
    phone: '+91 21098 76543',
    location: 'Kolkata, India',
    experience: '5 years',
    currentRole: 'Senior Python Engineer',
    education: 'M.Tech, Computer Science — Jadavpur University',
    skills: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Docker', 'REST APIs', 'Celery'],
    summary: 'Experienced Python backend engineer with expertise in Django and FastAPI frameworks. Strong database and API skills.',
    appliedDate: '5 days ago',
    status: 'interview',
    jobMatches: {
      2: { score: 91, matchedSkills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'REST APIs'], missingSkills: [] },
      3: { score: 46, matchedSkills: ['Docker'], missingSkills: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD'] },
      5: { score: 55, matchedSkills: ['Python'], missingSkills: ['Machine Learning', 'NLP', 'TensorFlow', 'SQL'] },
    },
  },
]

const statusOptions = ['All', 'New', 'Shortlisted', 'Interview', 'Rejected']

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

function getScoreColor(score) {
  if (score >= 90) return 'score-excellent'
  if (score >= 80) return 'score-good'
  if (score >= 70) return 'score-fair'
  if (score >= 50) return 'score-low'
  return 'score-poor'
}

function getScoreLabel(score) {
  if (score >= 90) return 'Excellent'
  if (score >= 80) return 'Good'
  if (score >= 70) return 'Fair'
  if (score >= 50) return 'Low'
  return 'Poor'
}

function getStatusInfo(status) {
  switch (status) {
    case 'new': return { icon: <Clock size={13} />, label: 'New' }
    case 'shortlisted': return { icon: <Star size={13} />, label: 'Shortlisted' }
    case 'interview': return { icon: <Users size={13} />, label: 'Interview' }
    case 'rejected': return { icon: <XCircle size={13} />, label: 'Rejected' }
    default: return { icon: <Clock size={13} />, label: status }
  }
}

function CandidatesPage() {
  const [selectedJobId, setSelectedJobId] = useState(0) // 0 = All Jobs
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortBy, setSortBy] = useState('score') // 'score' | 'name' | 'date'
  const [selectedCandidate, setSelectedCandidate] = useState(null)

  // Get candidates for selected job
  const getCandidatesForJob = () => {
    if (selectedJobId === 0) {
      // All jobs: show each candidate with their best match
      return allCandidates.map(c => {
        const bestMatch = Object.entries(c.jobMatches).reduce(
          (best, [jobId, match]) => (match.score > best.score ? { jobId: Number(jobId), ...match } : best),
          { jobId: 0, score: 0, matchedSkills: [], missingSkills: [] }
        )
        const matchedJob = jobs.find(j => j.id === bestMatch.jobId)
        return { ...c, matchScore: bestMatch.score, matchedJob: matchedJob?.title || '', matchData: bestMatch }
      })
    }

    // Specific job: filter and show match scores for that job
    return allCandidates
      .filter(c => c.jobMatches[selectedJobId])
      .map(c => ({
        ...c,
        matchScore: c.jobMatches[selectedJobId].score,
        matchData: c.jobMatches[selectedJobId],
        matchedJob: jobs.find(j => j.id === selectedJobId)?.title || '',
      }))
  }

  let candidates = getCandidatesForJob()

  // Apply search
  candidates = candidates.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.currentRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus =
      statusFilter === 'All' || c.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Apply sort
  candidates = [...candidates].sort((a, b) => {
    if (sortBy === 'score') return b.matchScore - a.matchScore
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'date') return 0 // Would use real dates in production
    return 0
  })

  const handleStatusChange = (candidateId, newStatus) => {
    // In production, this would call the API
    console.log(`Update candidate ${candidateId} to ${newStatus}`)
  }

  return (
    <div className="candidates-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Candidates</h1>
          <p className="page-subtitle">Review AI-matched candidates ranked by compatibility score.</p>
        </div>
      </div>

      {/* Job Selector */}
      <div className="job-selector">
        <Briefcase size={16} className="job-selector-icon" />
        <span className="job-selector-label">Matching for:</span>
        <select
          className="job-selector-select"
          value={selectedJobId}
          onChange={(e) => setSelectedJobId(Number(e.target.value))}
        >
          {jobs.map(job => (
            <option key={job.id} value={job.id}>{job.title}</option>
          ))}
        </select>
        <ChevronDown size={14} className="job-selector-chevron" />
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="search-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, role, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery('')}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="filter-group">
          <div className="filter-select-wrapper">
            <Filter size={14} className="filter-icon" />
            <select
              className="filter-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map(opt => (
                <option key={opt} value={opt}>{opt === 'All' ? 'All Status' : opt}</option>
              ))}
            </select>
            <ChevronDown size={14} className="filter-chevron" />
          </div>

          <div className="filter-select-wrapper">
            <ArrowUpDown size={14} className="filter-icon" />
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="score">Sort by Score</option>
              <option value="name">Sort by Name</option>
              <option value="date">Sort by Date</option>
            </select>
            <ChevronDown size={14} className="filter-chevron" />
          </div>
        </div>
      </div>

      <p className="results-count">
        Showing <strong>{candidates.length}</strong> candidates
        {selectedJobId !== 0 && ` for ${jobs.find(j => j.id === selectedJobId)?.title}`}
      </p>

      {/* Candidate Cards */}
      <div className="candidate-cards">
        {candidates.map((candidate, index) => (
          <div className="candidate-card" key={candidate.id}>
            <div className="candidate-card-rank">#{index + 1}</div>

            <div className="candidate-card-main">
              <div className="candidate-card-top">
                <div className="candidate-card-identity">
                  <div className="candidate-card-avatar">{getInitials(candidate.name)}</div>
                  <div>
                    <h3 className="candidate-card-name">{candidate.name}</h3>
                    <p className="candidate-card-role">{candidate.currentRole}</p>
                    <div className="candidate-card-meta-row">
                      <span><MapPin size={12} /> {candidate.location}</span>
                      <span><Briefcase size={12} /> {candidate.experience}</span>
                    </div>
                  </div>
                </div>

                <div className="candidate-card-score-area">
                  <div className={`candidate-score-circle ${getScoreColor(candidate.matchScore)}`}>
                    <span className="score-number">{candidate.matchScore}%</span>
                    <span className="score-label">{getScoreLabel(candidate.matchScore)}</span>
                  </div>
                </div>
              </div>

              {/* Matched job label */}
              {selectedJobId === 0 && candidate.matchedJob && (
                <div className="candidate-matched-job">
                  <Award size={13} />
                  Best match: <strong>{candidate.matchedJob}</strong>
                </div>
              )}

              {/* Skills match */}
              <div className="candidate-card-skills-section">
                {candidate.matchData.matchedSkills.length > 0 && (
                  <div className="skills-match-row">
                    <CheckCircle size={13} className="skills-match-icon match" />
                    <div className="skills-match-chips">
                      {candidate.matchData.matchedSkills.map(s => (
                        <span className="skill-chip skill-matched" key={s}>{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {candidate.matchData.missingSkills.length > 0 && (
                  <div className="skills-match-row">
                    <XCircle size={13} className="skills-match-icon missing" />
                    <div className="skills-match-chips">
                      {candidate.matchData.missingSkills.map(s => (
                        <span className="skill-chip skill-missing" key={s}>{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="candidate-card-footer">
                <div className="candidate-card-footer-left">
                  <span className={`candidate-status status-${candidate.status}`}>
                    {getStatusInfo(candidate.status).icon}
                    {getStatusInfo(candidate.status).label}
                  </span>
                  <span className="candidate-applied-date">
                    <Clock size={12} /> {candidate.appliedDate}
                  </span>
                </div>
                <div className="candidate-card-footer-actions">
                  <button
                    className="btn-small btn-outline"
                    onClick={() => setSelectedCandidate(candidate)}
                  >
                    <Eye size={14} /> View Profile
                  </button>
                  {candidate.status === 'new' && (
                    <button
                      className="btn-small btn-accent"
                      onClick={() => handleStatusChange(candidate.id, 'shortlisted')}
                    >
                      <Star size={14} /> Shortlist
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {candidates.length === 0 && (
        <div className="empty-state">
          <Users size={40} strokeWidth={1.2} />
          <h3>No candidates found</h3>
          <p>Try selecting a different job or adjusting your filters.</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedCandidate && (
        <CandidateDetailModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  )
}

/* ---- Candidate Detail Modal ---- */
function CandidateDetailModal({ candidate, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-detail" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="detail-header-info">
            <div className="detail-avatar-lg">{getInitials(candidate.name)}</div>
            <div>
              <h2 className="modal-title">{candidate.name}</h2>
              <span className="modal-subtitle">{candidate.currentRole}</span>
            </div>
          </div>
          <div className="modal-header-right">
            <div className={`candidate-score-badge ${getScoreColor(candidate.matchScore)}`}>
              {candidate.matchScore}% Match
            </div>
            <button className="modal-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="modal-body">
          {/* Contact */}
          <div className="detail-contact-grid">
            <div className="detail-contact-item">
              <Mail size={14} />
              <span>{candidate.email}</span>
            </div>
            <div className="detail-contact-item">
              <Phone size={14} />
              <span>{candidate.phone}</span>
            </div>
            <div className="detail-contact-item">
              <MapPin size={14} />
              <span>{candidate.location}</span>
            </div>
            <div className="detail-contact-item">
              <Briefcase size={14} />
              <span>{candidate.experience} experience</span>
            </div>
            <div className="detail-contact-item">
              <GraduationCap size={14} />
              <span>{candidate.education}</span>
            </div>
            <div className="detail-contact-item">
              <Calendar size={14} />
              <span>Applied {candidate.appliedDate}</span>
            </div>
          </div>

          {/* Summary */}
          <div className="detail-section">
            <h3 className="detail-section-title">Summary</h3>
            <p className="detail-description">{candidate.summary}</p>
          </div>

          {/* All skills */}
          <div className="detail-section">
            <h3 className="detail-section-title">All Skills</h3>
            <div className="detail-skills">
              {candidate.skills.map(skill => (
                <span
                  className={`skill-chip ${
                    candidate.matchData.matchedSkills.includes(skill) ? 'skill-matched' : ''
                  }`}
                  key={skill}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Match breakdown */}
          <div className="detail-section">
            <h3 className="detail-section-title">Match Breakdown</h3>
            <div className="match-breakdown">
              <div className="match-breakdown-item">
                <CheckCircle size={16} />
                <div>
                  <span className="breakdown-label">Matched Skills</span>
                  <span className="breakdown-value matched">
                    {candidate.matchData.matchedSkills.length} skills matched
                  </span>
                </div>
              </div>
              <div className="match-breakdown-item">
                <XCircle size={16} />
                <div>
                  <span className="breakdown-label">Missing Skills</span>
                  <span className="breakdown-value missing">
                    {candidate.matchData.missingSkills.length} skills missing
                  </span>
                </div>
              </div>
              <div className="match-breakdown-item">
                <TrendingUp size={16} />
                <div>
                  <span className="breakdown-label">Overall Score</span>
                  <span className={`breakdown-value ${getScoreColor(candidate.matchScore)}`}>
                    {candidate.matchScore}% — {getScoreLabel(candidate.matchScore)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* All job matches */}
          <div className="detail-section">
            <h3 className="detail-section-title">All Job Matches</h3>
            <div className="all-job-matches">
              {Object.entries(candidate.jobMatches)
                .sort(([, a], [, b]) => b.score - a.score)
                .map(([jobId, match]) => {
                  const job = jobs.find(j => j.id === Number(jobId))
                  return (
                    <div className="job-match-row" key={jobId}>
                      <div className="job-match-info">
                        <Briefcase size={14} />
                        <span className="job-match-title">{job?.title || `Job #${jobId}`}</span>
                      </div>
                      <div className="job-match-bar-wrapper">
                        <div className="job-match-bar">
                          <div
                            className={`job-match-bar-fill ${getScoreColor(match.score)}`}
                            style={{ width: `${match.score}%` }}
                          />
                        </div>
                        <span className={`job-match-score ${getScoreColor(match.score)}`}>
                          {match.score}%
                        </span>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidatesPage
