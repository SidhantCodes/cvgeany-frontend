"use client"

import { useState } from "react"
import { Toaster } from "@/components/ui/toaster"
import Uploader from "@/components/uploader"
import PortfolioEditor from "@/components/portfolio-editor"
import type { Portfolio } from "@/types/portfolio"
import { FileText } from "lucide-react"
import Footer from "@/components/footer"

type AppState = "upload" | "edit"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("upload")
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)

  const handleUploadSuccess = (portfolioData: Portfolio) => {
    setPortfolio(portfolioData)
    setAppState("edit")
  }

  const handleBackToUpload = () => {
    setAppState("upload")
    setPortfolio(null)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation Header */}
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
            <div className="text-sm text-gray-400">AI-Powered Portfolio Generator</div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {appState === "upload" && <Uploader onUploadSuccess={handleUploadSuccess} />}

        {appState === "edit" && portfolio && <PortfolioEditor portfolio={portfolio} onBack={handleBackToUpload} />}
      </div>
      <Footer />
      <Toaster />
    </main>
  )
}
