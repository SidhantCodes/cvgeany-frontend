import { FileText } from 'lucide-react'
import React from 'react'

const Hero = () => {
  return (
    <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="h-12 w-12 bg-purple-600 rounded-lg flex items-center justify-center">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            <span className="text-purple-500">CV</span>Geany
          </h1>
        </div>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Resume to SEO-optimized website—fast and easy
        </p>
        <p className="text-sm text-gray-400">Powered by AI • No signup required</p>
      </div>
  )
}

export default Hero