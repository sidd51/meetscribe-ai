import { CheckCircle2, AlertCircle, MinusCircle } from 'lucide-react'

const sentimentConfig = {
  positive: {
    icon: CheckCircle2,
    label: 'Positive',
    classes: 'bg-green-50 text-green-700 border-green-100'
  },
  neutral: {
    icon: MinusCircle,
    label: 'Neutral',
    classes: 'bg-gray-50 text-gray-600 border-gray-100'
  },
  negative: {
    icon: AlertCircle,
    label: 'Needs Attention',
    classes: 'bg-red-50 text-red-600 border-red-100'
  }
}

function SummaryCard({ analysis }) {
  const sentiment = sentimentConfig[analysis.sentiment] || sentimentConfig.neutral
  const SentimentIcon = sentiment.icon

  return (
    <div className="flex flex-col gap-4">

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-sm font-medium text-blue-800 mb-1">AI Summary</p>
        <p className="text-gray-700 text-sm leading-relaxed">{analysis.summary}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">

        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
            Action Items
          </p>
          {analysis.actionItems?.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {analysis.actionItems.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded border-2 border-blue-300 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No action items found</p>
          )}
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
            Decisions Made
          </p>
          {analysis.decisions?.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {analysis.decisions.map((decision, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0 mt-1.5" />
                  <span className="text-sm text-gray-700 leading-snug">{decision}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No decisions recorded</p>
          )}
        </div>

      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
          Key Topics
        </p>
        <div className="flex flex-wrap gap-2">
          {analysis.keyTopics?.map((topic, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm w-fit ${sentiment.classes}`}>
        <SentimentIcon className="w-4 h-4" />
        <span className="font-medium">Meeting tone: {sentiment.label}</span>
      </div>

    </div>
  )
}

export default SummaryCard