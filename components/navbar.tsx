import { FileText, SquareArrowOutUpRight } from "lucide-react"
import Link from "next/link"

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

          {/* Navigation Link */}
          <div className="flex items-center">
            <Link
              href="/how-to-deploy"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
            >
              <span>deploying your portfolio</span> <SquareArrowOutUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
