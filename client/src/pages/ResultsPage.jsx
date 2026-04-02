import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, Calendar, Clock, Download,
  ChevronDown, ChevronUp, Copy, Check
} from 'lucide-react'
import SummaryCard from '../components/SummaryCard.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { getMeetingById } from '../services/api.js'

function ResultsPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const [meeting, setMeeting] = useState(location.state?.meeting || null)
  const [loading, setLoading] = useState(!meeting)
  const [error, setError] = useState(null)
  const [transcriptOpen, setTranscriptOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!meeting) {
      getMeetingById(id)
        .then(res => setMeeting(res.data.meeting))
        .catch(() => setError('Could not load meeting'))
        .finally(() => setLoading(false))
    }
  }, [id])

  const handleCopyTranscript = () => {
    navigator.clipboard.writeText(meeting.transcript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const content = `
MEETING: ${meeting.title}
DATE: ${new Date(meeting.createdAt).toLocaleDateString()}
DURATION: ${meeting.analysis.duration}

SUMMARY
${meeting.analysis.summary}

ACTION ITEMS
${meeting.analysis.actionItems.map((a, i) => `${i + 1}. ${a}`).join('\n')}

DECISIONS
${meeting.analysis.decisions.map((d, i) => `${i + 1}. ${d}`).join('\n')}

KEY TOPICS
${meeting.analysis.keyTopics.join(', ')}

TRANSCRIPT
${meeting.transcript}
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${meeting.title.replace(/\s+/g, '-')}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (loading) return <LoadingSpinner message="Loading meeting..." />

  if (error) return (
    <div className="text-center py-16">
      <p className="text-red-500 mb-4">{error}</p>
      <Link to="/" className="text-blue-500 hover:underline text-sm">
        Go back home
      </Link>
    </div>
  )

  return (
    <div className="flex flex-col gap-5">

      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 text-sm bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-gray-500" />
          Download
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-5">
        <h1 className="text-xl font-bold text-gray-900 mb-3">{meeting.title}</h1>
        <div className="flex flex-wrap gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(meeting.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {meeting.analysis.duration}
          </span>
          <span className="text-gray-300">·</span>
          <span>{meeting.fileSize}</span>
        </div>
      </div>

      <SummaryCard analysis={meeting.analysis} />

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <button
          onClick={() => setTranscriptOpen(prev => !prev)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm font-medium text-gray-700">Full Transcript</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">
              {meeting.transcript.split(' ').length} words
            </span>
            {transcriptOpen
              ? <ChevronUp className="w-4 h-4 text-gray-400" />
              : <ChevronDown className="w-4 h-4 text-gray-400" />
            }
          </div>
        </button>

        {transcriptOpen && (
          <div className="border-t border-gray-100">
            <div className="flex justify-end px-5 py-2 border-b border-gray-50">
              <button
                onClick={handleCopyTranscript}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                {copied
                  ? <><Check className="w-3.5 h-3.5 text-green-500" /> Copied</>
                  : <><Copy className="w-3.5 h-3.5" /> Copy</>
                }
              </button>
            </div>
            <div className="px-5 py-4 max-h-64 overflow-y-auto">
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                {meeting.transcript}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Link
          to="/"
          className="flex-1 py-2.5 text-center text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Upload another
        </Link>
        <Link
          to="/history"
          className="flex-1 py-2.5 text-center text-sm bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-colors"
        >
          View all meetings
        </Link>
      </div>

    </div>
  )
}

export default ResultsPage