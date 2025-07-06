"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Eye, Edit3, ExternalLink, Monitor, Smartphone } from "lucide-react"
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
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit' as const)
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop' as const)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const updatePortfolio = (updates: Partial<Portfolio>) => {
    setPortfolio((prev) => ({ ...prev, ...updates }))
  }

  // Send updated data to preview iframe - this is the key logic for dynamic updates
  useEffect(() => {
    const sendDataToIframes = () => {
      // Send to main preview iframe only if it's loaded
      if (iframeRef.current?.contentWindow && iframeLoaded) {
        try {
          iframeRef.current.contentWindow.postMessage({
            type: 'updatePortfolio',
            payload: portfolio
          }, '*')
          console.log('Portfolio data sent to main iframe:', portfolio.name)
        } catch (error) {
          console.error('Error sending data to main iframe:', error)
        }
      }
    }

    // Only send data if at least one iframe is loaded
    if (iframeLoaded) {
      // Debounce the data sending to prevent excessive updates
      const timer = setTimeout(sendDataToIframes, 300)
      return () => clearTimeout(timer)
    }
  }, [portfolio, iframeLoaded])

  // Handle iframe load event to send initial data
  const handleIframeLoad = useCallback(() => {
    if (iframeRef.current?.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage({
          type: 'updatePortfolio',
          payload: portfolio
        }, '*')
        console.log('Initial portfolio data sent to main iframe:', portfolio.name)
      } catch (error) {
        console.error('Error sending initial data to main iframe:', error)
      }
    }
  }, [portfolio])

  // Generate preview URL with current portfolio data
  const generatePreviewUrl = () => {
    // Use the local static preview site - assets now copied to public/_next
    return "/portfolio-preview/index.html"
  }

  const handleDeployPortfolio = () => {
    console.log("Deploying portfolio with data:", portfolio)
  }

  const handleOpenInNewTab = useCallback(() => {
    // Create a new window with the portfolio data
    const newWindow = window.open(generatePreviewUrl(), '_blank')
    
    // Wait for the new window to load and then send data
    if (newWindow) {
      const checkIfLoaded = setInterval(() => {
        try {
          if (newWindow.document.readyState === 'complete') {
            clearInterval(checkIfLoaded)
            setTimeout(() => {
              newWindow.postMessage({
                type: 'updatePortfolio',
                payload: portfolio
              }, '*')
              console.log('Portfolio data sent to new tab:', portfolio.name)
            }, 1000)
          }
        } catch (e) {
          // Handle cross-origin issues
          console.error('Error with new tab:', e)
          clearInterval(checkIfLoaded)
        }
      }, 100)
      
      // Cleanup after 10 seconds to prevent memory leaks
      setTimeout(() => {
        clearInterval(checkIfLoaded)
      }, 10000)
    }
  }, [portfolio])

  if (activeTab === 'preview') {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Preview Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setActiveTab('edit')}
              className="flex items-center space-x-2"
            >
              <Edit3 className="h-4 w-4" />
              <span>Back to Editor</span>
            </Button>
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-purple-500" />
              <h1 className="text-2xl font-bold text-white">
                Portfolio Preview
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Device Toggle */}
            <div className="flex items-center space-x-2 bg-gray-800 p-1 rounded-lg">
              <Button
                variant={previewDevice === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewDevice('desktop')}
                className="flex items-center space-x-1"
              >
                <Monitor className="h-4 w-4" />
                <span>Desktop</span>
              </Button>
              <Button
                variant={previewDevice === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewDevice('mobile')}
                className="flex items-center space-x-1"
              >
                <Smartphone className="h-4 w-4" />
                <span>Mobile</span>
              </Button>
            </div>
            
            <Button
              variant="outline"
              onClick={handleOpenInNewTab}
              className="flex items-center space-x-2"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Open in New Tab</span>
            </Button>
            
          </div>
        </div>

        {/* Preview Container */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              {portfolio.name}'s Portfolio
            </div>
          </div>
          
          {/* iframe Container */}
          <div className={`mx-auto bg-white rounded-lg overflow-hidden shadow-2xl ${
            previewDevice === 'desktop' ? 'w-full' : 'w-96'
          }`}>
            <div className={`transition-all duration-300 ${
              previewDevice === 'desktop' ? 'h-[800px]' : 'h-[600px]'
            }`}>
              <iframe
                ref={iframeRef}
                src={generatePreviewUrl()}
                className="w-full h-full border-0"
                title="Portfolio Preview"
                sandbox="allow-scripts allow-same-origin"
                onLoad={handleIframeLoad}
              />
            </div>
          </div>
        </div>
      </div>
    )
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
            <p className="text-gray-400">Make any adjustments before generating your portfolio. <br /> Please verify all generated Links</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={onBack}>
            Upload New Resume
          </Button>
        </div>
      </div>

      <div className="flex space-x-1 p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'edit' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('edit')}
          className={`flex items-center space-x-2 ${activeTab === 'edit' ? `text-purple-500` : `text-white` }`}
        >
          <Edit3 className="h-4 w-4" />
          <span>Edit</span>
        </Button>
        <Button
          variant={activeTab === 'edit' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('preview')}
          className={`flex items-center space-x-2 ${activeTab === 'edit' ? `text-black` : `text-purple-500` }`}
        >
          <Eye className="h-4 w-4" />
          <span>Preview</span>
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