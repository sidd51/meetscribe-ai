import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()
  // useLocation() is a React Router hook that tells you the current URL path — we use it to highlight the active nav link.
  const linkClass = (path) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      location.pathname === path
        ? 'bg-blue-600 text-white'
        : 'text-gray-600 hover:text-blue-600'
    }`

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg text-blue-600">
          MeetScribe AI
        </Link>
        <div className="flex gap-2">
          <Link to="/" className={linkClass('/')}>Upload</Link>
          <Link to="/history" className={linkClass('/history')}>History</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar