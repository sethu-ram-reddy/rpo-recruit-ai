import { useState } from 'react'
import {
  Plus,
  Search,
  Filter,
  MapPin,
  Clock,
  Users,
  Briefcase,
  ChevronDown,
  X,
  DollarSign,
  FileText,
  Eye,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react'
import './JobsPage.css'

// Mock data — will be replaced with API calls
const initialJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Hyderabad, India',
    type: 'Full-time',
    experience: '5-8 years',
    salary: '₹18L - ₹28L',
    applicants: 34,
    matched: 12,
    posted: '2 days ago',
    status: 'active',
    description: 'We are looking for an experienced Frontend Developer proficient in React, TypeScript, and modern CSS frameworks to build and maintain our web applications.',
    skills: ['React', 'TypeScript', 'CSS', 'JavaScript', 'REST APIs'],
  },
  {
    id: 2,
    title: 'Backend Engineer (Python)',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    experience: '3-6 years',
    salary: '₹15L - ₹24L',
    applicants: 21,
    matched: 8,
    posted: '4 days ago',
    status: 'active',
    description: 'Seeking a skilled Python developer with experience in FastAPI, PostgreSQL, and building scalable REST APIs.',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'REST APIs'],
  },
  {
    id: 3,
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Bangalore, India',
    type: 'Contract',
    experience: '4-7 years',
    salary: '₹20L - ₹30L',
    applicants: 15,
    matched: 5,
    posted: '1 week ago',
    status: 'active',
    description: 'Looking for a DevOps professional to manage CI/CD pipelines, cloud infrastructure, and containerized deployments.',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
  },
  {
    id: 4,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Hyderabad, India',
    type: 'Full-time',
    experience: '3-5 years',
    salary: '₹12L - ₹20L',
    applicants: 42,
    matched: 15,
    posted: '1 week ago',
    status: 'closed',
    description: 'We need a creative UI/UX designer with strong Figma skills who can design user-centered interfaces for our SaaS products.',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
  },
  {
    id: 5,
    title: 'Data Scientist',
    department: 'AI/ML',
    location: 'Remote',
    type: 'Full-time',
    experience: '2-5 years',
    salary: '₹14L - ₹22L',
    applicants: 28,
    matched: 10,
    posted: '3 days ago',
    status: 'active',
    description: 'Join our AI team to build machine learning models for candidate-job matching and predictive analytics.',
    skills: ['Python', 'Machine Learning', 'NLP', 'TensorFlow', 'SQL'],
  },
  {
    id: 6,
    title: 'Project Manager',
    department: 'Operations',
    location: 'Hyderabad, India',
    type: 'Full-time',
    experience: '6-10 years',
    salary: '₹16L - ₹26L',
    applicants: 19,
    matched: 7,
    posted: '5 days ago',
    status: 'active',
    description: 'Experienced project manager needed to coordinate cross-functional teams and drive delivery of recruitment platform features.',
    skills: ['Agile', 'Scrum', 'JIRA', 'Stakeholder Management', 'Risk Management'],
  },
]

const statusOptions = ['All', 'Active', 'Closed']
const typeOptions = ['All', 'Full-time', 'Part-time', 'Contract', 'Remote']

function JobsPage() {
  const [jobs, setJobs] = useState(initialJobs)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [activeMenu, setActiveMenu] = useState(null)

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus =
      statusFilter === 'All' || job.status.toLowerCase() === statusFilter.toLowerCase()

    const matchesType =
      typeFilter === 'All' || job.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const handleCreateJob = (newJob) => {
    const job = {
      ...newJob,
      id: jobs.length + 1,
      applicants: 0,
      matched: 0,
      posted: 'Just now',
      status: 'active',
    }
    setJobs([job, ...jobs])
    setShowCreateModal(false)
  }

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      setJobs(jobs.filter(j => j.id !== jobId))
      setActiveMenu(null)
    }
  }

  const handleToggleStatus = (jobId) => {
    setJobs(jobs.map(j => {
      if (j.id === jobId) {
        return { ...j, status: j.status === 'active' ? 'closed' : 'active' }
      }
      return j
    }))
    setActiveMenu(null)
  }

  return (
    <div className="jobs-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Jobs</h1>
          <p className="page-subtitle">
            Manage your job postings and track applicants.
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
          <Plus size={17} />
          Create Job
        </button>
      </div>

      {/* Filters Bar */}
      <div className="filters-bar">
        <div className="search-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search jobs, skills, departments..."
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
            <Briefcase size={14} className="filter-icon" />
            <select
              className="filter-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              {typeOptions.map(opt => (
                <option key={opt} value={opt}>{opt === 'All' ? 'All Types' : opt}</option>
              ))}
            </select>
            <ChevronDown size={14} className="filter-chevron" />
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="results-count">
        Showing <strong>{filteredJobs.length}</strong> of {jobs.length} jobs
      </p>

      {/* Jobs Grid */}
      <div className="jobs-grid">
        {filteredJobs.map((job) => (
          <div className="job-card" key={job.id}>
            <div className="job-card-header">
              <div className="job-card-title-row">
                <h3 className="job-card-title">{job.title}</h3>
                <div className="job-card-actions">
                  <span className={`job-badge badge-${job.status}`}>
                    {job.status}
                  </span>
                  <div className="job-menu-wrapper">
                    <button
                      className="job-menu-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveMenu(activeMenu === job.id ? null : job.id)
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {activeMenu === job.id && (
                      <div className="job-dropdown">
                        <button
                          className="job-dropdown-item"
                          onClick={() => { setSelectedJob(job); setActiveMenu(null) }}
                        >
                          <Eye size={14} /> View Details
                        </button>
                        <button
                          className="job-dropdown-item"
                          onClick={() => handleToggleStatus(job.id)}
                        >
                          <Edit size={14} />
                          {job.status === 'active' ? 'Close Job' : 'Reopen Job'}
                        </button>
                        <button
                          className="job-dropdown-item danger"
                          onClick={() => handleDeleteJob(job.id)}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <span className="job-card-dept">{job.department}</span>
            </div>

            <p className="job-card-desc">{job.description}</p>

            <div className="job-card-meta">
              <span className="meta-item">
                <MapPin size={13} /> {job.location}
              </span>
              <span className="meta-item">
                <Briefcase size={13} /> {job.type}
              </span>
              <span className="meta-item">
                <Clock size={13} /> {job.experience}
              </span>
              <span className="meta-item">
                <DollarSign size={13} /> {job.salary}
              </span>
            </div>

            <div className="job-card-skills">
              {job.skills.map(skill => (
                <span className="skill-chip" key={skill}>{skill}</span>
              ))}
            </div>

            <div className="job-card-footer">
              <div className="job-card-stats">
                <span className="footer-stat">
                  <Users size={14} />
                  <strong>{job.applicants}</strong> applicants
                </span>
                <span className="footer-stat matched">
                  <FileText size={14} />
                  <strong>{job.matched}</strong> matched
                </span>
              </div>
              <span className="job-posted">{job.posted}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="empty-state">
          <Briefcase size={40} strokeWidth={1.2} />
          <h3>No jobs found</h3>
          <p>Try adjusting your search or filters, or create a new job posting.</p>
          <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={17} /> Create Job
          </button>
        </div>
      )}

      {/* Create Job Modal */}
      {showCreateModal && (
        <CreateJobModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateJob}
        />
      )}

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  )
}

/* ---- Create Job Modal ---- */
function CreateJobModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    experience: '',
    salary: '',
    description: '',
    skillsText: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = 'Job title is required'
    if (!form.department.trim()) newErrors.department = 'Department is required'
    if (!form.location.trim()) newErrors.location = 'Location is required'
    if (!form.description.trim()) newErrors.description = 'Description is required'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      onCreate({
        ...form,
        skills: form.skillsText
          .split(',')
          .map(s => s.trim())
          .filter(Boolean),
      })
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Create New Job</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="modal-form-grid">
            <div className="modal-field">
              <label className="modal-label">Job Title *</label>
              <input
                className={`modal-input ${errors.title ? 'error' : ''}`}
                placeholder="e.g. Senior Frontend Developer"
                value={form.title}
                onChange={handleChange('title')}
              />
              {errors.title && <span className="modal-error">{errors.title}</span>}
            </div>

            <div className="modal-field">
              <label className="modal-label">Department *</label>
              <input
                className={`modal-input ${errors.department ? 'error' : ''}`}
                placeholder="e.g. Engineering"
                value={form.department}
                onChange={handleChange('department')}
              />
              {errors.department && <span className="modal-error">{errors.department}</span>}
            </div>

            <div className="modal-field">
              <label className="modal-label">Location *</label>
              <input
                className={`modal-input ${errors.location ? 'error' : ''}`}
                placeholder="e.g. Hyderabad, India"
                value={form.location}
                onChange={handleChange('location')}
              />
              {errors.location && <span className="modal-error">{errors.location}</span>}
            </div>

            <div className="modal-field">
              <label className="modal-label">Job Type</label>
              <select
                className="modal-input"
                value={form.type}
                onChange={handleChange('type')}
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Remote</option>
              </select>
            </div>

            <div className="modal-field">
              <label className="modal-label">Experience</label>
              <input
                className="modal-input"
                placeholder="e.g. 3-5 years"
                value={form.experience}
                onChange={handleChange('experience')}
              />
            </div>

            <div className="modal-field">
              <label className="modal-label">Salary Range</label>
              <input
                className="modal-input"
                placeholder="e.g. ₹15L - ₹24L"
                value={form.salary}
                onChange={handleChange('salary')}
              />
            </div>
          </div>

          <div className="modal-field">
            <label className="modal-label">Job Description *</label>
            <textarea
              className={`modal-textarea ${errors.description ? 'error' : ''}`}
              rows={4}
              placeholder="Describe the role, responsibilities, and what you're looking for..."
              value={form.description}
              onChange={handleChange('description')}
            />
            {errors.description && <span className="modal-error">{errors.description}</span>}
          </div>

          <div className="modal-field">
            <label className="modal-label">Required Skills</label>
            <input
              className="modal-input"
              placeholder="Comma-separated: React, TypeScript, CSS"
              value={form.skillsText}
              onChange={handleChange('skillsText')}
            />
            <span className="modal-hint">Separate skills with commas</span>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Plus size={16} /> Create Job
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ---- Job Detail Modal ---- */
function JobDetailModal({ job, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-detail" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{job.title}</h2>
            <span className="modal-subtitle">{job.department}</span>
          </div>
          <div className="modal-header-right">
            <span className={`job-badge badge-${job.status}`}>{job.status}</span>
            <button className="modal-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="modal-body">
          <div className="detail-meta-grid">
            <div className="detail-meta-item">
              <MapPin size={15} />
              <div>
                <span className="detail-meta-label">Location</span>
                <span className="detail-meta-value">{job.location}</span>
              </div>
            </div>
            <div className="detail-meta-item">
              <Briefcase size={15} />
              <div>
                <span className="detail-meta-label">Job Type</span>
                <span className="detail-meta-value">{job.type}</span>
              </div>
            </div>
            <div className="detail-meta-item">
              <Clock size={15} />
              <div>
                <span className="detail-meta-label">Experience</span>
                <span className="detail-meta-value">{job.experience}</span>
              </div>
            </div>
            <div className="detail-meta-item">
              <DollarSign size={15} />
              <div>
                <span className="detail-meta-label">Salary</span>
                <span className="detail-meta-value">{job.salary}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3 className="detail-section-title">Description</h3>
            <p className="detail-description">{job.description}</p>
          </div>

          <div className="detail-section">
            <h3 className="detail-section-title">Required Skills</h3>
            <div className="detail-skills">
              {job.skills.map(skill => (
                <span className="skill-chip" key={skill}>{skill}</span>
              ))}
            </div>
          </div>

          <div className="detail-stats-row">
            <div className="detail-stat">
              <Users size={18} />
              <div>
                <span className="detail-stat-value">{job.applicants}</span>
                <span className="detail-stat-label">Total Applicants</span>
              </div>
            </div>
            <div className="detail-stat">
              <FileText size={18} />
              <div>
                <span className="detail-stat-value">{job.matched}</span>
                <span className="detail-stat-label">AI Matched</span>
              </div>
            </div>
            <div className="detail-stat">
              <Clock size={18} />
              <div>
                <span className="detail-stat-value">{job.posted}</span>
                <span className="detail-stat-label">Posted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobsPage
