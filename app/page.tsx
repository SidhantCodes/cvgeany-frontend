"use client"

import { useState } from "react"
import { Toaster } from "@/components/ui/sonner"
import Uploader from "@/components/uploader"
import PortfolioEditor from "@/components/portfolio-editor"
import type { Portfolio } from "@/types/portfolio"
import Navbar from "@/components/navbar"

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
    <Navbar />
      <div className="container mx-auto px-4 py-8">
        {appState === "upload" && <Uploader onUploadSuccess={handleUploadSuccess} />}
        {appState === "edit" && portfolio && <PortfolioEditor portfolio={portfolio} onBack={handleBackToUpload} />}
      </div>
    <Toaster />
  </main>
)
}