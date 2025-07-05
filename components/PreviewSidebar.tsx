"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Portfolio } from "@/types/portfolio"
import DownloadButton from "./download-button"

interface PreviewSidebarProps {
  portfolio: Portfolio
}

export function PreviewSidebar({ portfolio }: PreviewSidebarProps) {
  return (
    <Card className="bg-gray-900 border-gray-700 sticky top-6">
      <CardHeader>
        <CardTitle className="text-white">Portfolio Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <div className="h-16 w-16 bg-purple-600 rounded-full mx-auto flex items-center justify-center text-white font-bold text-xl">
            {portfolio.name.charAt(0).toUpperCase() || "?"}
          </div>
          <h3 className="font-semibold text-white">{portfolio.name || "Your Name"}</h3>
          <p className="text-gray-400 text-sm">{portfolio.mail || "your.email@example.com"}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Work Experience</span>
            <span className="text-white">{portfolio.workExperience.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Projects</span>
            <span className="text-white">{portfolio.projects.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Skill Categories</span>
            <span className="text-white">{portfolio.skillsData.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Social Links</span>
            <span className="text-white">{portfolio.socials.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">SEO Keywords</span>
            <span className="text-white">{portfolio.seoKeywords.length}</span>
          </div>
        </div>

        <DownloadButton portfolio={portfolio} />
      </CardContent>
    </Card>
  )
}