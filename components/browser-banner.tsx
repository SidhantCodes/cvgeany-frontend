"use client"

import { useState } from "react"
import { Info, Chrome, X } from "lucide-react"

const BrowserBanner = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return null
  }

  return (
    <div className="bg-blue-900/20 border-b border-blue-800/30 sticky top-[73px] z-40">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center space-x-2 text-xs text-blue-200 flex-1">
            <Info className="h-3 w-3 text-blue-400" />
            <span>For the best experience, use Chrome or a Chromium-based browser.</span>
            <Chrome className="h-3 w-3 text-blue-400" />
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 p-1 text-blue-300 hover:text-white hover:bg-blue-800/30 rounded transition-colors duration-200"
            aria-label="Close browser recommendation"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default BrowserBanner
