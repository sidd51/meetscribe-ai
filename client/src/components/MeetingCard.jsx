import { Link } from 'react-router-dom'
import { Calendar, FileAudio, ChevronRight } from 'lucide-react'

const sentimentColors = {
  positive: 'bg-green-50 text-green-700 border-green-100',
  neutral:  'bg-gray-50 text-gray-500 border-gray-100',
  negative: 'bg-red-50 text-red-600 border-red-100'
}

function MeetingCard({ meeting }) {
  const sentiment = meeting.analysis?.sentiment || 'neutral'
  const summary   = meeting.analysis?.summary   || 'No summary available'

  return (
    <Link
      to={`/meeting/${meeting._id}`}
      className="block bg-white border border-gray-100 rounded-2xl p-5 hover:border-blue-200 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">

          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="font-semibold text-gray-900 text-sm truncate">  {/*cuts overflowing text with an ellipsis on a single line */}
              {meeting.title}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${sentimentColors[sentiment]}`}>
              {sentiment}
            </span>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-3">
            {summary}
          </p>

          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(meeting.createdAt).toLocaleDateString('en-IN', {
                day: 'numeric', month: 'short', year: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-1">
              <FileAudio className="w-3 h-3" />
              {meeting.fileSize}
            </span>
          </div>

        </div>
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0 mt-1" />
      </div>
    </Link>
  )
}

export default MeetingCard