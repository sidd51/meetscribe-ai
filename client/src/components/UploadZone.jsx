import { useDropzone } from 'react-dropzone' //custom react hook
import { Upload, File, X} from 'lucide-react'

// file → comes from parent
// onFileSelect → updates parent state
// onFileRemove → clears state

function UploadZone({ file, onFileSelect, onFileRemove }){
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: {
        'audio/*': ['.mp3', '.wav', '.webm', '.m4a', '.ogg']
      },
      maxSize: 25 * 1024 * 1024,
      multiple: false,
      onDrop: (acceptedFiles, rejectedFiles) =>{
        if(rejectedFiles.length >0){
          const error =rejectedFiles[0].errors[0]
          if(error.code === 'file-too-large'){
            alert('File is too large. Maximum size is 25MB.')
          }else{
            alert('Only audio files are allowed')
          }
          return 
        }
        if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0])
      }
      }
  })
  if(file){
    return(
      <div className="border-2 border-blue-200 bg-blue-50 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <File className="w-5 h-5 text-blue-600" />
            </div>
          <div>
          <p className="font-medium text-gray-800 text-sm">{file.name}</p>
          <p className="text-xs text-gray-500 mt-0.5"> {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
      </div>
      <button
            onClick={onFileRemove}
            className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    )
  }
  return (
    <div {...getRootProps()}
    className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
      isDragActive 
      ? 'border-blue-500 bg-blue-50 scale-[1.02]'
      : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'

    }`}
    >
    <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-3">
        <div className={`p-4 rounded-full transition-colors ${
          isDragActive ? 'bg-blue-100' : 'bg-gray-100'
        }`}>
          <Upload className={`w-7 h-7 transition-colors ${
            isDragActive ? 'text-blue-600' : 'text-gray-400'
          }`} />
        </div>
        <div>
          <p className="font-medium text-gray-700">
            {isDragActive ? 'Drop your audio file here' : 'Drag & drop your meeting audio'}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            or <span className="text-blue-500 underline">browse files</span>
          </p>
        </div>
        <p className="text-xs text-gray-400">
          MP3, WAV, WEBM, M4A up to 25MB
        </p>
      </div>
    </div>
  )
}
export default UploadZone