

const LoadingSpinner = ({ message='Processing...', subMessage}) => {
  return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-4 border-blue-100"/>
            <div className="w-14 h-14 rounded-full border-4 border-blue-600 border-t-transparent animate-spin absolute inset-0"/>

          </div>
          <div className="text-center">
              <p className="font-medium text-gray-700">{message}</p>
            {subMessage && (
          <p className="text-sm text-gray-400 mt-1">{subMessage}</p>
           )}
          </div>
      </div>
  )
}
//animate-spin is a Tailwind utility that applies a CSS rotation animation 

export default LoadingSpinner