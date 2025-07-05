"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import type { Portfolio } from "@/types/portfolio"
import { BasicInformation } from "./BasicInformation"
import { WorkExperienceSection } from "./WorkExpirience"
import { ProjectsSection } from "./ProjectsSection"
import { SkillsSection } from "./SkillsSection"
import { SocialLinksSection } from "./SocialLinksSection"
import { SEOKeywordsSection } from "./SEOKeywordsSection"
import { PreviewSidebar } from "./PreviewSidebar"

interface PortfolioEditorProps {
  portfolio: Portfolio
  onBack: () => void
}

export default function PortfolioEditor({ portfolio: initialPortfolio, onBack }: PortfolioEditorProps) {
  const [portfolio, setPortfolio] = useState<Portfolio>(initialPortfolio)

  const updatePortfolio = (updates: Partial<Portfolio>) => {
    setPortfolio((prev) => ({ ...prev, ...updates }))
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">
              <span className="text-purple-500">CV</span>Geany Editor
            </h1>
            <p className="text-gray-400">Make any adjustments before generating your portfolio</p>
          </div>
        </div>
        <Button variant="outline" onClick={onBack}>
          Upload New Resume
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <BasicInformation portfolio={portfolio} onUpdate={updatePortfolio} />
          
          <WorkExperienceSection 
            workExperience={portfolio.workExperience} 
            onUpdate={(workExperience) => updatePortfolio({ workExperience })} 
          />
          
          <ProjectsSection
            projects={portfolio.projects} 
            onUpdate={(projects) => updatePortfolio({ projects })} 
          />
          
          <SkillsSection
            skillsData={portfolio.skillsData} 
            onUpdate={(skillsData) => updatePortfolio({ skillsData })} 
          />
          
          <SocialLinksSection
            socials={portfolio.socials} 
            onUpdate={(socials) => updatePortfolio({ socials })} 
          />
          
          <SEOKeywordsSection 
            seoKeywords={portfolio.seoKeywords} 
            onUpdate={(seoKeywords) => updatePortfolio({ seoKeywords })} 
          />
        </div>
        <div className="space-y-6">
          <PreviewSidebar portfolio={portfolio} />
        </div>
      </div>
    </div>
  )
}