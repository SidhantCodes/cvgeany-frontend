"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus, Trash2 } from "lucide-react"
import type { WorkExperience } from "@/types/portfolio"

interface WorkExperienceProps {
  workExperience: WorkExperience[]
  onUpdate: (workExperience: WorkExperience[]) => void
}

export function WorkExperienceSection({ workExperience, onUpdate }: WorkExperienceProps) {
  const updateWorkExperience = (index: number, updates: Partial<WorkExperience>) => {
    const newWorkExperience = [...workExperience]
    newWorkExperience[index] = { ...newWorkExperience[index], ...updates }
    onUpdate(newWorkExperience)
  }

  const addWorkExperience = () => {
    const newExp: WorkExperience = {
      title: "",
      company: "",
      duration: "",
      description: "",
    }
    onUpdate([...workExperience, newExp])
  }

  const removeWorkExperience = (index: number) => {
    const newWorkExperience = workExperience.filter((_, i) => i !== index)
    onUpdate(newWorkExperience)
  }

  return (
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
        {workExperience.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No work experience added yet.</p>
            <Button onClick={addWorkExperience} variant="outline" className="mt-2">
              Add Your First Experience
            </Button>
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-2">
            {workExperience.map((exp, index) => (
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
        )}
      </CardContent>
    </Card>
  )
}