import { FaBrain, FaFileUpload  } from "react-icons/fa";
import { FaFileZipper } from "react-icons/fa6";

const Features = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto">
            <FaFileUpload className="h-6 w-6 text-purple-500" />
          </div>
          <h3 className="font-semibold text-white">Easy Upload</h3>
          <p className="text-gray-400 text-sm">Simply drag and drop your PDF resume</p>
        </div>
        <div className="text-center space-y-2">
          <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto">
            <FaBrain className="h-6 w-6 text-purple-500" />
          </div>
          <h3 className="font-semibold text-white">AI Processing</h3>
          <p className="text-gray-400 text-sm">Advanced AI extracts and structures your data</p>
        </div>
        <div className="text-center space-y-2">
          <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto">
            <FaFileZipper className="h-6 w-6 text-purple-500" />
          </div>
          <h3 className="font-semibold text-white">Ready Portfolio</h3>
          <p className="text-gray-400 text-sm">Get your portfolio site in a ZIP file.</p>
        </div>
      </div>
  )
}

export default Features