"use client"

import { useState } from "react"
import { Toaster } from "@/components/ui/sonner"
import Uploader from "@/components/uploader"
import PortfolioEditor from "@/components/portfolio-editor"
import type { Portfolio } from "@/types/portfolio"
import Navbar from "@/components/navbar"

type AppState = "upload" | "edit"

export default function TestWithEditor() {
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

  // You can also start directly with sample data for testing
  const loadSampleData = () => {
    const samplePortfolio: Portfolio = {
      name: "Jane Smith",
      mail: "jane.smith@example.com",
      resumeLink: "https://example.com/resume.pdf",
      aboutme: "I'm a passionate full-stack developer with 5+ years of experience in building scalable web applications. I love working with modern technologies and creating user-friendly solutions.",
      workExperience: [
        {
          title: "Senior Full Stack Developer",
          company: "TechCorp Solutions",
          duration: "2022 - Present",
          description: "Leading development of enterprise web applications using React, Node.js, and cloud technologies. Mentoring junior developers and establishing best practices."
        },
        {
          title: "Full Stack Developer",
          company: "Digital Innovations",
          duration: "2020 - 2022",
          description: "Developed and maintained client projects using modern JavaScript frameworks. Collaborated with designers and product managers to deliver high-quality user experiences."
        }
      ],
      projects: [
        {
          title: "E-commerce Dashboard",
          desc: "A comprehensive admin dashboard for e-commerce management with real-time analytics and inventory tracking.",
          image: "/images/fullstack.webp",
          livelink: "https://ecommerce-dashboard.example.com",
          repolink: "https://github.com/example/ecommerce-dashboard"
        },
        {
          title: "Social Media Gateway",
          desc: "A social media management platform for scheduling posts and analyzing engagement across multiple platforms.",
          image: "/images/gatewaygram.webp",
          livelink: "https://social-gateway.example.com",
          repolink: "https://github.com/example/social-gateway"
        }
      ],
      skillsData: [
        {
          category: "Frontend",
          skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"]
        },
        {
          category: "Backend",
          skills: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB"]
        },
        {
          category: "DevOps",
          skills: ["Docker", "AWS", "GitHub Actions", "Vercel"]
        }
      ],
      socials: [
        {
          name: "github",
          url: "https://github.com/janesmith"
        },
        {
          name: "linkedin",
          url: "https://linkedin.com/in/janesmith"
        },
        {
          name: "twitter",
          url: "https://twitter.com/janesmith"
        }
      ],
      seoKeywords: ["Full Stack Developer", "React", "Node.js", "TypeScript", "Web Development"],
      pdfLinks: null
    }
    
    setPortfolio(samplePortfolio)
    setAppState("edit")
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {appState === "upload" && (
          <div className="space-y-6">
            <Uploader onUploadSuccess={handleUploadSuccess} />
            <div className="text-center">
              <p className="text-gray-400 mb-4">Or test with sample data:</p>
              <button
                onClick={loadSampleData}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Load Sample Portfolio Data
              </button>
            </div>
          </div>
        )}
        {appState === "edit" && portfolio && (
          <PortfolioEditor portfolio={portfolio} onBack={handleBackToUpload} />
        )}
      </div>
      <Toaster />
    </main>
  )
}
