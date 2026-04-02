import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mic, Zap, FileText } from 'lucide-react'
import UploadZone from '../components/UploadZone.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import { uploadMeeting } from '../services/api.js'
function UploadPage() {

  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingStage, setLoadingStage] = useState('')
  const [error, setError] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const navigate = useNavigate()

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    setError(null)
    setLoadingStage('Uploading audio file...')

    try {
      const formData = new FormData()
      formData.append('audio', file)
      if (title) formData.append('title', title)

      //passing a callback function to track upload progress
      const response = await uploadMeeting(formData, (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total //loaded → bytes uploaded total → total file size
        )
        setUploadProgress(percent)
        if (percent === 100) {
          setLoadingStage('Transcribing with Whisper AI...')
          setTimeout(() => setLoadingStage('Generating summary with Llama 3...'), 6000)
        }
      })

      navigate(`/results/${response.data.meeting._id}`, {
        state: { meeting: response.data.meeting } //sending meeting data in router state
      })

    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-xl mx-auto">
        <LoadingSpinner
          message={loadingStage}
          subMessage="This takes 10–30 seconds depending on file length"
        />
        {uploadProgress < 100 && (
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Uploading</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto">

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl mb-4">
          <Mic className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Meeting Summarizer</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Upload any meeting audio and get instant AI summaries, action items and decisions
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-5">

        <UploadZone
          file={file}
          onFileSelect={setFile}
          onFileRemove={() => setFile(null)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Meeting title <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Q3 Sprint Planning, Client Call..."
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file}
          className={`w-full py-3 rounded-xl font-medium text-sm transition-all ${
            file
              ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {file ? 'Summarize Meeting' : 'Select a file to continue'}
        </button>

      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        {[
          { icon: Mic, label: 'Whisper v3', sub: 'Transcription' },
          { icon: Zap, label: 'Llama 3', sub: 'Summarization' },
          { icon: FileText, label: 'Structured', sub: 'Action items' }
        ].map(({ icon: Icon, label, sub }) => (
          <div key={label} className="bg-white rounded-xl p-3 text-center border border-gray-100">
            <Icon className="w-4 h-4 text-blue-500 mx-auto mb-1.5" />
            <p className="text-xs font-medium text-gray-700">{label}</p>
            <p className="text-xs text-gray-400">{sub}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default UploadPage