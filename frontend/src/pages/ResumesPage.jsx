import { useState, useRef } from 'react'
import {
  Upload,
  Search,
  FileText,
  X,
  ChevronDown,
  Filter,
  Eye,
  Trash2,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  CloudUpload,
  File,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar
} from 'lucide-react'
import './ResumesPage.css'

// Mock data
const initialResumes = [
  {
    id: 1,
    fileName: 'Priya_Sharma_Resume.pdf',
    candidateName: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    phone: '+91 98765 43210',
    location: 'Hyderabad, India',
    experience: '6 years',
    currentRole: 'Senior Frontend Developer',
    education: 'B.Tech, Computer Science — IIT Hyderabad',
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'Next.js', 'GraphQL', 'Tailwind'],
    matchedJobs: 3,
    topMatch: 92,
    uploadedAt: '2 hours ago',
    status: 'processed',
    summary: 'Experienced frontend developer with 6 years of expertise in React ecosystem. Strong in building scalable web applications with TypeScript and modern CSS. Previously worked at TCS and Infosys.',
  },
  {
    id: 2,
    fileName: 'Rahul_Patel_CV.pdf',
    candidateName: 'Rahul Patel',
    email: 'rahul.patel@outlook.com',
    phone: '+91 87654 32109',
    location: 'Mumbai, India',
    experience: '4 years',
    currentRole: 'Python Developer',
    education: 'M.Tech, Software Engineering — NIT Mumbai',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Redis', 'REST APIs'],
    matchedJobs: 2,
    topMatch: 87,
    uploadedAt: '5 hours ago',
    status: 'processed',
    summary: 'Backend developer specializing in Python with strong experience in FastAPI and microservices architecture. Skilled in database optimization and containerized deployments.',
  },
  {
    id: 3,
    fileName: 'Ananya_Reddy_Resume.pdf',
    candidateName: 'Ananya Reddy',
    email: 'ananya.r@gmail.com',
    phone: '+91 76543 21098',
    location: 'Bangalore, India',
    experience: '5 years',
    currentRole: 'Full Stack Engineer',
    education: 'B.E, Information Technology — BITS Pilani',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS', 'TypeScript'],
    matchedJobs: 4,
    topMatch: 84,
    uploadedAt: '1 day ago',
    status: 'processed',
    summary: 'Versatile full stack engineer comfortable with both frontend and backend technologies. Experience with cloud deployments on AWS and CI/CD pipelines.',
  },
  {
    id: 4,
    fileName: 'Vikram_Singh_CV.pdf',
    candidateName: 'Vikram Singh',
    email: 'vikram.s@yahoo.com',
    phone: '+91 65432 10987',
    location: 'Delhi, India',
    experience: '7 years',
    currentRole: 'DevOps Lead',
    education: 'B.Tech, Computer Science — DTU Delhi',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Jenkins', 'CI/CD', 'Linux'],
    matchedJobs: 2,
    topMatch: 79,
    uploadedAt: '1 day ago',
    status: 'processed',
    summary: 'Senior DevOps engineer with extensive experience managing cloud infrastructure at scale. Expert in container orchestration and infrastructure as code.',
  },
  {
    id: 5,
    fileName: 'Meera_Nair_Portfolio.pdf',
    candidateName: 'Meera Nair',
    email: 'meera.nair@gmail.com',
    phone: '+91 54321 09876',
    location: 'Chennai, India',
    experience: '4 years',
    currentRole: 'UI/UX Designer',
    education: 'M.Des, Interaction Design — NID Ahmedabad',
    skills: ['Figma', 'Adobe XD', 'CSS', 'Prototyping', 'User Research', 'Design Systems'],
    matchedJobs: 1,
    topMatch: 75,
    uploadedAt: '2 days ago',
    status: 'processed',
    summary: 'Creative designer with a strong eye for detail and user-centered design philosophy. Skilled in creating design systems and interactive prototypes.',
  },
  {
    id: 6,
    fileName: 'Karthik_Resume.pdf',
    candidateName: 'Karthik Menon',
    email: 'karthik.m@gmail.com',
    phone: '+91 43210 98765',
    location: 'Pune, India',
    experience: '2 years',
    currentRole: 'Junior Data Analyst',
    education: 'B.Sc, Statistics — Fergusson College Pune',
    skills: ['Python', 'SQL', 'Pandas', 'Excel', 'Tableau'],
    matchedJobs: 1,
    topMatch: 68,
    uploadedAt: '3 days ago',
    status: 'processed',
    summary: 'Aspiring data professional with strong analytical skills and proficiency in Python for data analysis. Eager to transition into data science roles.',
  },
]

const statusOptions = ['All', 'Processed', 'Processing', 'Failed']

function getStatusIcon(status) {
  switch (status) {
    case 'processed': return <CheckCircle size={14} />
    case 'processing': return <Clock size={14} />
    case 'failed': return <AlertCircle size={14} />
    default: return null
  }
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

function getScoreColor(score) {
  if (score >= 90) return 'score-excellent'
  if (score >= 80) return 'score-good'
  if (score >= 70) return 'score-fair'
  return 'score-low'
}

function ResumesPage() {
  const [resumes, setResumes] = useState(initialResumes)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedResume, setSelectedResume] = useState(null)
  const [activeMenu, setActiveMenu] = useState(null)

  const filteredResumes = resumes.filter((r) => {
    const matchesSearch =
      r.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.currentRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesStatus =
      statusFilter === 'All' || r.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const handleUpload = (files) => {
    const newResumes = files.map((file, idx) => ({
      id: resumes.length + idx + 1,
      fileName: file.name,
      candidateName: file.name.replace(/[_-]/g, ' ').replace('.pdf', '').replace('.docx', ''),
      email: 'pending@extraction.com',
      phone: 'Extracting...',
      location: 'Extracting...',
      experience: 'Extracting...',
      currentRole: 'Processing...',
      education: 'Extracting...',
      skills: [],
      matchedJobs: 0,
      topMatch: 0,
      uploadedAt: 'Just now',
      status: 'processing',
      summary: 'Resume is being processed by AI. Skills and information will be extracted shortly.',
    }))
    setResumes([...newResumes, ...resumes])
    setShowUploadModal(false)

    // Simulate processing
    setTimeout(() => {
      setResumes(prev => prev.map(r => {
        if (r.status === 'processing') {
          return {
            ...r,
            status: 'processed',
            currentRole: 'Extracted Role',
            skills: ['Skill 1', 'Skill 2', 'Skill 3'],
            email: 'extracted@email.com',
            phone: '+91 XXXXX XXXXX',
            location: 'Extracted Location',
            experience: 'X years',
            education: 'Extracted Education',
            summary: 'AI-extracted summary will appear here once the backend is connected.',
          }
        }
        return r
      }))
    }, 3000)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      setResumes(resumes.filter(r => r.id !== id))
      setActiveMenu(null)
    }
  }

  return (
    <div className="resumes-page">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Resumes</h1>
          <p className="page-subtitle">Upload and manage candidate resumes with AI-powered skill extraction.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowUploadModal(true)}>
          <Upload size={17} />
          Upload Resumes
        </button>
      </div>

      {/* Stats Row */}
      <div className="resume-stats-row">
        <div className="resume-stat-pill">
          <FileText size={15} />
          <span><strong>{resumes.length}</strong> Total</span>
        </div>
        <div className="resume-stat-pill processed">
          <CheckCircle size={15} />
          <span><strong>{resumes.filter(r => r.status === 'processed').length}</strong> Processed</span>
        </div>
        <div className="resume-stat-pill processing">
          <Clock size={15} />
          <span><strong>{resumes.filter(r => r.status === 'processing').length}</strong> Processing</span>
        </div>
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
      </div>

      <p className="results-count">
        Showing <strong>{filteredResumes.length}</strong> of {resumes.length} resumes
      </p>

      {/* Resume Table */}
      <div className="resume-table-wrapper">
        <table className="resume-table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Role</th>
              <th>Skills</th>
              <th>Top Match</th>
              <th>Status</th>
              <th>Uploaded</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredResumes.map((resume) => (
              <tr key={resume.id} className="resume-row">
                <td>
                  <div className="resume-candidate">
                    <div className="resume-avatar">{getInitials(resume.candidateName)}</div>
                    <div>
                      <span className="resume-name">{resume.candidateName}</span>
                      <span className="resume-file">{resume.fileName}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="resume-role">{resume.currentRole}</span>
                </td>
                <td>
                  <div className="resume-skills">
                    {resume.skills.slice(0, 3).map(skill => (
                      <span className="skill-chip" key={skill}>{skill}</span>
                    ))}
                    {resume.skills.length > 3 && (
                      <span className="skill-chip skill-more">+{resume.skills.length - 3}</span>
                    )}
                  </div>
                </td>
                <td>
                  {resume.topMatch > 0 ? (
                    <span className={`match-score ${getScoreColor(resume.topMatch)}`}>
                      {resume.topMatch}%
                    </span>
                  ) : (
                    <span className="match-pending">—</span>
                  )}
                </td>
                <td>
                  <span className={`status-badge status-${resume.status}`}>
                    {getStatusIcon(resume.status)}
                    {resume.status}
                  </span>
                </td>
                <td>
                  <span className="resume-time">{resume.uploadedAt}</span>
                </td>
                <td>
                  <div className="resume-actions">
                    <button
                      className="action-btn"
                      onClick={() => setSelectedResume(resume)}
                      title="View Details"
                    >
                      <Eye size={15} />
                    </button>
                    <div className="job-menu-wrapper">
                      <button
                        className="action-btn"
                        onClick={() => setActiveMenu(activeMenu === resume.id ? null : resume.id)}
                      >
                        <MoreVertical size={15} />
                      </button>
                      {activeMenu === resume.id && (
                        <div className="job-dropdown">
                          <button
                            className="job-dropdown-item"
                            onClick={() => { setSelectedResume(resume); setActiveMenu(null) }}
                          >
                            <Eye size={14} /> View Details
                          </button>
                          <button
                            className="job-dropdown-item danger"
                            onClick={() => handleDelete(resume.id)}
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredResumes.length === 0 && (
        <div className="empty-state">
          <FileText size={40} strokeWidth={1.2} />
          <h3>No resumes found</h3>
          <p>Try adjusting your search or upload new resumes to get started.</p>
          <button className="btn-primary" onClick={() => setShowUploadModal(true)}>
            <Upload size={17} /> Upload Resumes
          </button>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
        />
      )}

      {/* Detail Modal */}
      {selectedResume && (
        <ResumeDetailModal
          resume={selectedResume}
          onClose={() => setSelectedResume(null)}
        />
      )}
    </div>
  )
}

/* ---- Upload Modal ---- */
function UploadModal({ onClose, onUpload }) {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState([])
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      f => f.type === 'application/pdf' || f.name.endsWith('.docx')
    )
    setFiles(prev => [...prev, ...droppedFiles])
  }

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(prev => [...prev, ...selectedFiles])
  }

  const removeFile = (idx) => {
    setFiles(files.filter((_, i) => i !== idx))
  }

  const handleSubmit = () => {
    if (files.length > 0) {
      onUpload(files)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Upload Resumes</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Drop zone */}
          <div
            className={`upload-dropzone ${dragActive ? 'active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <CloudUpload size={36} strokeWidth={1.3} />
            <h3>Drag & drop resumes here</h3>
            <p>or click to browse files</p>
            <span className="upload-formats">Supports PDF and DOCX files</span>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.docx"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="upload-file-list">
              <span className="upload-file-count">{files.length} file{files.length > 1 ? 's' : ''} selected</span>
              {files.map((file, idx) => (
                <div className="upload-file-item" key={idx}>
                  <File size={16} />
                  <div className="upload-file-info">
                    <span className="upload-file-name">{file.name}</span>
                    <span className="upload-file-size">{(file.size / 1024).toFixed(0)} KB</span>
                  </div>
                  <button className="upload-file-remove" onClick={(e) => { e.stopPropagation(); removeFile(idx) }}>
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="upload-info-box">
            <AlertCircle size={15} />
            <p>Uploaded resumes will be automatically processed by AI to extract skills, experience, and contact information.</p>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={handleSubmit}
              disabled={files.length === 0}
              style={{ opacity: files.length === 0 ? 0.5 : 1 }}
            >
              <Upload size={16} />
              Upload {files.length > 0 ? `${files.length} Resume${files.length > 1 ? 's' : ''}` : 'Resumes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---- Resume Detail Modal ---- */
function ResumeDetailModal({ resume, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-detail" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="detail-header-info">
            <div className="detail-avatar-lg">{getInitials(resume.candidateName)}</div>
            <div>
              <h2 className="modal-title">{resume.candidateName}</h2>
              <span className="modal-subtitle">{resume.currentRole}</span>
            </div>
          </div>
          <div className="modal-header-right">
            <span className={`status-badge status-${resume.status}`}>
              {getStatusIcon(resume.status)}
              {resume.status}
            </span>
            <button className="modal-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="modal-body">
          {/* Contact info */}
          <div className="detail-contact-grid">
            <div className="detail-contact-item">
              <Mail size={14} />
              <span>{resume.email}</span>
            </div>
            <div className="detail-contact-item">
              <Phone size={14} />
              <span>{resume.phone}</span>
            </div>
            <div className="detail-contact-item">
              <MapPin size={14} />
              <span>{resume.location}</span>
            </div>
            <div className="detail-contact-item">
              <Briefcase size={14} />
              <span>{resume.experience} experience</span>
            </div>
            <div className="detail-contact-item">
              <GraduationCap size={14} />
              <span>{resume.education}</span>
            </div>
            <div className="detail-contact-item">
              <Calendar size={14} />
              <span>Uploaded {resume.uploadedAt}</span>
            </div>
          </div>

          {/* Summary */}
          <div className="detail-section">
            <h3 className="detail-section-title">AI-Extracted Summary</h3>
            <p className="detail-description">{resume.summary}</p>
          </div>

          {/* Skills */}
          <div className="detail-section">
            <h3 className="detail-section-title">Extracted Skills</h3>
            <div className="detail-skills">
              {resume.skills.map(skill => (
                <span className="skill-chip" key={skill}>{skill}</span>
              ))}
            </div>
          </div>

          {/* Match stats */}
          <div className="detail-stats-row">
            <div className="detail-stat">
              <Briefcase size={18} />
              <div>
                <span className="detail-stat-value">{resume.matchedJobs}</span>
                <span className="detail-stat-label">Jobs Matched</span>
              </div>
            </div>
            <div className="detail-stat">
              <FileText size={18} />
              <div>
                <span className={`detail-stat-value ${getScoreColor(resume.topMatch)}`}>
                  {resume.topMatch > 0 ? `${resume.topMatch}%` : '—'}
                </span>
                <span className="detail-stat-label">Top Match Score</span>
              </div>
            </div>
            <div className="detail-stat">
              <File size={18} />
              <div>
                <span className="detail-stat-value" style={{ fontSize: '0.82rem' }}>{resume.fileName}</span>
                <span className="detail-stat-label">Source File</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumesPage
