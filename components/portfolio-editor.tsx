"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus, Trash2, Edit3, FileText } from "lucide-react"
import type { Portfolio, WorkExperience, Project, SkillCategory, SocialLink } from "@/types/portfolio"
import DownloadButton from "./download-button"

interface PortfolioEditorProps {
  portfolio: Portfolio
  onBack: () => void
}

export default function PortfolioEditor({ portfolio: initialPortfolio, onBack }: PortfolioEditorProps) {
  const [portfolio, setPortfolio] = useState<Portfolio>(initialPortfolio)

  const updatePortfolio = (updates: Partial<Portfolio>) => {
    setPortfolio((prev) => ({ ...prev, ...updates }))
  }

  const updateWorkExperience = (index: number, updates: Partial<WorkExperience>) => {
    const newWorkExperience = [...portfolio.workExperience]
    newWorkExperience[index] = { ...newWorkExperience[index], ...updates }
    updatePortfolio({ workExperience: newWorkExperience })
  }

  const addWorkExperience = () => {
    const newExp: WorkExperience = {
      title: "",
      company: "",
      duration: "",
      description: "",
    }
    updatePortfolio({ workExperience: [...portfolio.workExperience, newExp] })
  }

  const removeWorkExperience = (index: number) => {
    const newWorkExperience = portfolio.workExperience.filter((_, i) => i !== index)
    updatePortfolio({ workExperience: newWorkExperience })
  }

  const updateProject = (index: number, updates: Partial<Project>) => {
    const newProjects = [...portfolio.projects]
    newProjects[index] = { ...newProjects[index], ...updates }
    updatePortfolio({ projects: newProjects })
  }

  const addProject = () => {
    const newProject: Project = {
      title: "",
      desc: "",
      image: "/images/project-placeholder.png",
      livelink: "",
      repolink: "",
    }
    updatePortfolio({ projects: [...portfolio.projects, newProject] })
  }

  const removeProject = (index: number) => {
    const newProjects = portfolio.projects.filter((_, i) => i !== index)
    updatePortfolio({ projects: newProjects })
  }

  const updateSkillCategory = (index: number, updates: Partial<SkillCategory>) => {
    const newSkillsData = [...portfolio.skillsData]
    newSkillsData[index] = { ...newSkillsData[index], ...updates }
    updatePortfolio({ skillsData: newSkillsData })
  }

  const addSkillCategory = () => {
    const newCategory: SkillCategory = {
      category: "",
      skills: [],
    }
    updatePortfolio({ skillsData: [...portfolio.skillsData, newCategory] })
  }

  const removeSkillCategory = (index: number) => {
    const newSkillsData = portfolio.skillsData.filter((_, i) => i !== index)
    updatePortfolio({ skillsData: newSkillsData })
  }

  const updateSocial = (index: number, updates: Partial<SocialLink>) => {
    const newSocials = [...portfolio.socials]
    newSocials[index] = { ...newSocials[index], ...updates }
    updatePortfolio({ socials: newSocials })
  }

  const addSocial = () => {
    const newSocial: SocialLink = {
      url: "",
      name: "",
    }
    updatePortfolio({ socials: [...portfolio.socials, newSocial] })
  }

  const removeSocial = (index: number) => {
    const newSocials = portfolio.socials.filter((_, i) => i !== index)
    updatePortfolio({ socials: newSocials })
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
          {/* Basic Information */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Edit3 className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300">Name</label>
                  <Input
                    value={portfolio.name}
                    onChange={(e) => updatePortfolio({ name: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300">Email</label>
                  <Input
                    value={portfolio.mail}
                    onChange={(e) => updatePortfolio({ mail: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">About Me</label>
                <Textarea
                  value={portfolio.aboutme}
                  onChange={(e) => updatePortfolio({ aboutme: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">Resume Link</label>
                <Input
                  value={portfolio.resumeLink}
                  onChange={(e) => updatePortfolio({ resumeLink: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Work Experience */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Work Experience</CardTitle>
                <Button onClick={addWorkExperience} size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {portfolio.workExperience.map((exp, index) => (
                  <AccordionItem key={index} value={`exp-${index}`} className="border-gray-700">
                    <AccordionTrigger className="text-white hover:text-purple-400">
                      {exp.title || "New Experience"} {exp.company && `at ${exp.company}`}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Job Title"
                          value={exp.title}
                          onChange={(e) => updateWorkExperience(index, { title: e.target.value })}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                        <Input
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => updateWorkExperience(index, { company: e.target.value })}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                      <Input
                        placeholder="Duration (e.g., Jan 2020 - Present)"
                        value={exp.duration}
                        onChange={(e) => updateWorkExperience(index, { duration: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                      <Textarea
                        placeholder="Job Description"
                        value={exp.description}
                        onChange={(e) => updateWorkExperience(index, { description: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                      <Button onClick={() => removeWorkExperience(index)} variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Projects</CardTitle>
                <Button onClick={addProject} size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {portfolio.projects.map((project, index) => (
                  <AccordionItem key={index} value={`project-${index}`} className="border-gray-700">
                    <AccordionTrigger className="text-white hover:text-purple-400">
                      {project.title || "New Project"}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <Input
                        placeholder="Project Title"
                        value={project.title}
                        onChange={(e) => updateProject(index, { title: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                      <Textarea
                        placeholder="Project Description"
                        value={project.desc}
                        onChange={(e) => updateProject(index, { desc: e.target.value })}
                        className="bg-gray-800 border-gray-600 text-white"
                      />
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Live Link (optional)"
                          value={project.livelink || ""}
                          onChange={(e) => updateProject(index, { livelink: e.target.value })}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                        <Input
                          placeholder="Repository Link (optional)"
                          value={project.repolink || ""}
                          onChange={(e) => updateProject(index, { repolink: e.target.value })}
                          className="bg-gray-800 border-gray-600 text-white"
                        />
                      </div>
                      <Button onClick={() => removeProject(index)} variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Skills</CardTitle>
                <Button onClick={addSkillCategory} size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {portfolio.skillsData.map((skillCategory, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Category (e.g., Frontend, Backend)"
                      value={skillCategory.category}
                      onChange={(e) => updateSkillCategory(index, { category: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white flex-1"
                    />
                    <Button onClick={() => removeSkillCategory(index)} variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Skills (comma-separated)"
                    value={skillCategory.skills.join(", ")}
                    onChange={(e) =>
                      updateSkillCategory(index, {
                        skills: e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter((s) => s),
                      })
                    }
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="bg-purple-600/20 text-purple-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Social Links</CardTitle>
                <Button onClick={addSocial} size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Social
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {portfolio.socials.map((social, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder="Platform (e.g., github, linkedin)"
                    value={social.name}
                    onChange={(e) => updateSocial(index, { name: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <Input
                    placeholder="URL"
                    value={social.url}
                    onChange={(e) => updateSocial(index, { url: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white flex-1"
                  />
                  <Button onClick={() => removeSocial(index)} variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* SEO Keywords */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">SEO Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="SEO Keywords (comma-separated)"
                value={portfolio.seoKeywords.join(", ")}
                onChange={(e) =>
                  updatePortfolio({
                    seoKeywords: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter((s) => s),
                  })
                }
                className="bg-gray-800 border-gray-600 text-white"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {portfolio.seoKeywords.map((keyword, index) => (
                  <Badge key={index} variant="outline" className="border-purple-500 text-purple-300">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview Card */}
          <Card className="bg-gray-900 border-gray-700 sticky top-6">
            <CardHeader>
              <CardTitle className="text-white">Portfolio Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <div className="h-16 w-16 bg-purple-600 rounded-full mx-auto flex items-center justify-center text-white font-bold text-xl">
                  {portfolio.name.charAt(0).toUpperCase()}
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
              </div>

              <DownloadButton portfolio={portfolio} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
