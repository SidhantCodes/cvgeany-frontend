import { FileText } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                <span className="text-purple-500">CV</span>Geany
              </span>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar