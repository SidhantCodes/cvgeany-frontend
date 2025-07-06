"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, X, Edit3, Eye } from "lucide-react"
import type { Portfolio, Project, WorkExperience, SkillCategory, SocialLink } from '@/types/portfolio'

const page = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')
  
  // Initialize with default portfolio data
  const [portfolio, setPortfolio] = useState<Portfolio>({
    name: "John Doe",
    mail: "john@example.com",
    resumeLink: "https://example.com/resume.pdf",
    aboutme: "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating efficient, scalable solutions and staying up-to-date with the latest industry trends.",
    workExperience: [
      {
        title: "Senior Full Stack Developer",
        company: "Tech Solutions Inc",
        duration: "2022 - Present",
        description: "Leading development of web applications using React, Node.js, and cloud technologies."
      }
    ],
    projects: [
      {
        title: "E-commerce Platform",
        desc: "A full-featured e-commerce solution with payment integration",
        image: "/images/fullstack.webp",
        livelink: "https://example.com",
        repolink: "https://github.com/example/project"
      }
    ],
    skillsData: [
      {
        category: "Frontend",
        skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"]
      },
      {
        category: "Backend", 
        skills: ["Node.js", "Express", "PostgreSQL", "MongoDB"]
      }
    ],
    socials: [
      {
        name: "github",
        url: "https://github.com/johndoe"
      },
      {
        name: "linkedin",
        url: "https://linkedin.com/in/johndoe"
      }
    ],
    seoKeywords: ["Full Stack Developer", "React", "Node.js"],
    pdfLinks: null
  })

  // Send updated data to preview iframe
  useEffect(() => {
    const timer = setTimeout(() => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage({
          type: 'updatePortfolio',
          payload: portfolio
        }, '*')
        console.log('Portfolio data sent to iframe:', portfolio)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [portfolio])

  const updatePortfolio = (updates: Partial<Portfolio>) => {
    setPortfolio(prev => ({ ...prev, ...updates }))
  }

  const addProject = () => {
    const newProject: Project = {
      title: "New Project",
      desc: "Project description",
      image: "/images/fullstack.webp",
      livelink: "",
      repolink: ""
    }
    updatePortfolio({
      projects: [...portfolio.projects, newProject]
    })
  }

  const updateProject = (index: number, updates: Partial<Project>) => {
    const updatedProjects = [...portfolio.projects]
    updatedProjects[index] = { ...updatedProjects[index], ...updates }
    updatePortfolio({ projects: updatedProjects })
  }

  const removeProject = (index: number) => {
    const updatedProjects = portfolio.projects.filter((_, i) => i !== index)
    updatePortfolio({ projects: updatedProjects })
  }

  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      title: "New Position",
      company: "Company Name",
      duration: "Year - Year",
      description: "Job description"
    }
    updatePortfolio({
      workExperience: [...portfolio.workExperience, newExperience]
    })
  }

  const updateWorkExperience = (index: number, updates: Partial<WorkExperience>) => {
    const updatedExperience = [...portfolio.workExperience]
    updatedExperience[index] = { ...updatedExperience[index], ...updates }
    updatePortfolio({ workExperience: updatedExperience })
  }

  const removeWorkExperience = (index: number) => {
    const updatedExperience = portfolio.workExperience.filter((_, i) => i !== index)
    updatePortfolio({ workExperience: updatedExperience })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Dynamic Portfolio Editor</h1>
          <p className="text-gray-600">
            Edit portfolio data and see real-time updates in the preview iframe
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'edit' ? 'default' : 'outline'}
            onClick={() => setActiveTab('edit')}
            className="flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </Button>
          <Button
            variant={activeTab === 'preview' ? 'default' : 'outline'}
            onClick={() => setActiveTab('preview')}
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          {activeTab === 'edit' && (
            <div className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={portfolio.name}
                      onChange={(e) => updatePortfolio({ name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={portfolio.mail}
                      onChange={(e) => updatePortfolio({ mail: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="about">About Me</Label>
                    <Textarea
                      id="about"
                      value={portfolio.aboutme}
                      onChange={(e) => updatePortfolio({ aboutme: e.target.value })}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Projects */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Projects
                    <Button onClick={addProject} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Project
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolio.projects.map((project, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold">Project {index + 1}</h4>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeProject(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="space-y-3">
                          <Input
                            placeholder="Project Title"
                            value={project.title}
                            onChange={(e) => updateProject(index, { title: e.target.value })}
                          />
                          <Textarea
                            placeholder="Project Description"
                            value={project.desc}
                            onChange={(e) => updateProject(index, { desc: e.target.value })}
                            rows={2}
                          />
                          <Input
                            placeholder="Live Link"
                            value={project.livelink || ''}
                            onChange={(e) => updateProject(index, { livelink: e.target.value })}
                          />
                          <Input
                            placeholder="Repository Link"
                            value={project.repolink || ''}
                            onChange={(e) => updateProject(index, { repolink: e.target.value })}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Work Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Work Experience
                    <Button onClick={addWorkExperience} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolio.workExperience.map((experience, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold">Experience {index + 1}</h4>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeWorkExperience(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="space-y-3">
                          <Input
                            placeholder="Job Title"
                            value={experience.title}
                            onChange={(e) => updateWorkExperience(index, { title: e.target.value })}
                          />
                          <Input
                            placeholder="Company"
                            value={experience.company}
                            onChange={(e) => updateWorkExperience(index, { company: e.target.value })}
                          />
                          <Input
                            placeholder="Duration"
                            value={experience.duration}
                            onChange={(e) => updateWorkExperience(index, { duration: e.target.value })}
                          />
                          <Textarea
                            placeholder="Job Description"
                            value={experience.description}
                            onChange={(e) => updateWorkExperience(index, { description: e.target.value })}
                            rows={3}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Preview Panel */}
          <div className={`${activeTab === 'preview' ? 'lg:col-span-2' : ''}`}>
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <p className="text-sm text-gray-600">
                  Changes are automatically reflected in the preview below
                </p>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 p-2 border-b">
                    <span className="text-sm text-gray-600">
                      Portfolio Preview - {portfolio.name}
                    </span>
                  </div>
                  <iframe
                    ref={iframeRef}
                    src="/portfolio-preview/index.html"
                    width="100%"
                    height="600px"
                    frameBorder="0"
                    title="Portfolio Preview"
                    className="bg-white"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page