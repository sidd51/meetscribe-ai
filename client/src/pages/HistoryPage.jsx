import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Upload, Inbox } from 'lucide-react'
import MeetingCard from '../components/MeetingCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { getMeetings } from '../services/api'

function HistoryPage() {
  const [meetings, setMeetings]     = useState([])
  const [filtered, setFiltered]     = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getMeetings()
      .then(res => {
        setMeetings(res.data.meetings)
        setFiltered(res.data.meetings)
      })
      .catch(() => setError('Could not load meetings'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFiltered(meetings)
      return
    }
    const q = searchQuery.toLowerCase()
    setFiltered(
      meetings.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.analysis?.summary?.toLowerCase().includes(q) ||
        m.analysis?.keyTopics?.some(t => t.toLowerCase().includes(q))
      )
    )
  }, [searchQuery, meetings])

  if (loading) return <LoadingSpinner message="Loading your meetings..." />

  if (error) return (
    <div className="text-center py-16 text-red-500 text-sm">{error}</div>
  )

  return (
    <div className="flex flex-col gap-5">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Meeting History</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {meetings.length} meeting{meetings.length !== 1 ? 's' : ''} processed
          </p>
        </div>
        <Link
          to="/"
          className="flex items-center gap-1.5 text-sm bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Upload className="w-3.5 h-3.5" />
          New upload
        </Link>
      </div>

      {meetings.length > 0 && (
        <div className="relative">
          <Search className="w-4 h-4 text-gray-300 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by title, summary or topic..."
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {meetings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="bg-gray-50 p-5 rounded-2xl">
            <Inbox className="w-8 h-8 text-gray-300" />
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-600">No meetings yet</p>
            <p className="text-sm text-gray-400 mt-1">
              Upload your first meeting audio to get started
            </p>
          </div>
          <Link
            to="/"
            className="text-sm bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Upload a meeting
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm">
            No meetings match "<span className="text-gray-600">{searchQuery}</span>"
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-blue-500 text-sm mt-2 hover:underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(meeting => (
            <MeetingCard key={meeting._id} meeting={meeting} />
          ))}
        </div>
      )}

    </div>
  )
}

export default HistoryPage