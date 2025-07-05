"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus, Trash2 } from "lucide-react"
import type { Project } from "@/types/portfolio"

interface ProjectsProps {
  projects: Project[]
  onUpdate: (projects: Project[]) => void
}

export function ProjectsSection({ projects, onUpdate }: ProjectsProps) {
  const updateProject = (index: number, updates: Partial<Project>) => {
    const newProjects = [...projects]
    newProjects[index] = { ...newProjects[index], ...updates }
    onUpdate(newProjects)
  }

  const addProject = () => {
    const newProject: Project = {
      title: "",
      desc: "",
      image: "/images/project-placeholder.png",
      livelink: "",
      repolink: "",
    }
    onUpdate([...projects, newProject])
  }

  const removeProject = (index: number) => {
    const newProjects = projects.filter((_, i) => i !== index)
    onUpdate(newProjects)
  }

  return (
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
        {projects.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No projects added yet.</p>
            <Button onClick={addProject} variant="outline" className="mt-2">
              Add Your First Project
            </Button>
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-2">
            {projects.map((project, index) => (
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
        )}
      </CardContent>
    </Card>
  )
}